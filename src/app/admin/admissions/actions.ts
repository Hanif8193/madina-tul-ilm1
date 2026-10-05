"use server";

import { revalidatePath } from "next/cache";

import { AdmissionStatus } from "@/generated/prisma/enums";
import { nextRollNumber } from "@/lib/admin-identifiers";
import {
  AdmissionStatusUpdateSchema,
  formString,
} from "@/lib/admin-schemas";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";

export type AdmissionActionState = {
  ok?: string;
  error?: string;
} | null;

/** Statuses that undo the enrolment created when an application was approved. */
const STATUSES_THAT_RELEASE_A_SEAT = new Set<AdmissionStatus>([
  "REJECTED",
  "WITHDRAWN",
]);

/**
 * Moves an application through the admissions pipeline.
 *
 * On approval it does three things in one go, which is the whole point of the
 * module — an approver should not have to also remember to open a second screen
 * and create the student:
 *
 *  1. Assigns a roll number if the student does not have one yet.
 *  2. Creates the `Enrollment` that makes the student visible in the directory,
 *     when the application is tied to a `CourseSession`.
 *  3. Stamps `reviewedById` / `reviewedAt` so the record shows who decided and
 *     when.
 *
 * On "Student already exists?": this schema does not create a Student at
 * approval time, because `Admission.studentId` is NOT NULL — an applicant is
 * already a `Student` row the moment they apply. Approval therefore promotes
 * that existing row rather than creating a duplicate person, which is also why
 * the directory can list an applicant before they are enrolled.
 */
export async function updateAdmissionStatusAction(
  _prev: AdmissionActionState,
  formData: FormData,
): Promise<AdmissionActionState> {
  // Every action re-authorises itself. The layout's `requireAdmin()` is not a
  // boundary: a Server Action is a public HTTP endpoint.
  const admin = await requireAdmin();

  const parsed = AdmissionStatusUpdateSchema.safeParse({
    admissionId: formString(formData, "admissionId"),
    status: formString(formData, "status"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "That change could not be applied.",
    };
  }

  const { admissionId, status } = parsed.data;

  try {
    const admission = await db.admission.findUnique({
      where: { id: admissionId },
      select: {
        id: true,
        reference: true,
        status: true,
        sessionId: true,
        studentId: true,
        student: { select: { fullName: true, rollNumber: true } },
      },
    });

    if (!admission) {
      return { error: "That application no longer exists. Refresh the list." };
    }

    if (admission.status === status) {
      return { ok: `${admission.reference} is already marked ${labelFor(status)}.` };
    }

    // Refusing beats silently deleting: an applicant who has actually turned up
    // on a course session must be removed from that session deliberately, not as
    // a side effect of somebody changing a status dropdown.
    if (
      STATUSES_THAT_RELEASE_A_SEAT.has(status) &&
      admission.status === "ENROLLED"
    ) {
      return {
        error: `${admission.reference} is already enrolled. Remove the enrolment from the student record first, then change this status.`,
      };
    }

    const reviewed = {
      status,
      reviewedById: admin.id,
      reviewedAt: new Date(),
    };

    if (status === "APPROVED") {
      await ensureRollNumber(admission.studentId, admission.student.rollNumber);
    }

    if (STATUSES_THAT_RELEASE_A_SEAT.has(status)) {
      await db.$transaction([
        db.enrollment.deleteMany({ where: { admissionId } }),
        db.admission.update({ where: { id: admissionId }, data: reviewed }),
      ]);
    } else {
      // `upsert` on the (studentId, sessionId) unique makes a double click, or
      // a retry after a dropped connection, idempotent instead of a crash.
      const seat =
        status === "APPROVED" && admission.sessionId
          ? db.enrollment.upsert({
              where: {
                studentId_sessionId: {
                  studentId: admission.studentId,
                  sessionId: admission.sessionId,
                },
              },
              create: {
                studentId: admission.studentId,
                sessionId: admission.sessionId,
                admissionId,
              },
              update: {},
            })
          : null;

      await db.$transaction([
        ...(seat ? [seat] : []),
        db.admission.update({ where: { id: admissionId }, data: reviewed }),
      ]);
    }

    revalidatePath("/admin/admissions");
    // Approval also writes to `students` (roll number) and `enrollments`.
    revalidatePath("/admin/students");

    return {
      ok:
        status === "APPROVED"
          ? `${admission.reference} approved. ${admission.student.fullName} is enrolled${
              admission.sessionId ? "." : ", and has a roll number — assign a session to create the enrolment."
            }`
          : `${admission.reference} marked ${labelFor(status)}.`,
    };
  } catch {
    // Deliberately opaque: the message reaches the browser, and Prisma errors
    // carry table, column and value detail. The server log keeps the detail.
    return { error: "That change could not be saved. Please try again." };
  }
}

/**
 * Assigns a roll number once, without racing.
 *
 * The `rollNumber: null` guard makes this a compare-and-set: if two approvals
 * run at the same time, the loser's update matches zero rows instead of
 * overwriting the winner's number. A collision on the unique index makes
 * `nextRollNumber` hand out the same candidate twice, so that case simply tries
 * again.
 */
async function ensureRollNumber(
  studentId: string,
  currentRollNumber: string | null,
): Promise<void> {
  if (currentRollNumber !== null) return;

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const candidate = await nextRollNumber();

    const result = await db.student.updateMany({
      where: { id: studentId, rollNumber: null },
      data: { rollNumber: candidate },
    });

    if (result.count > 0) return;

    // Lost the race, or the candidate was taken. If another request already
    // filled the field there is nothing left to do.
    const current = await db.student.findUnique({
      where: { id: studentId },
      select: { rollNumber: true },
    });
    if (current?.rollNumber) return;
  }
}

function labelFor(status: AdmissionStatus): string {
  switch (status) {
    case "PENDING":
      return "pending";
    case "UNDER_REVIEW":
      return "under review";
    case "APPROVED":
      return "approved";
    case "ENROLLED":
      return "enrolled";
    case "REJECTED":
      return "rejected";
    case "WITHDRAWN":
      return "withdrawn";
  }
}