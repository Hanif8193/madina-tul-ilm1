"use server";

import { revalidatePath } from "next/cache";

import { Prisma } from "@/generated/prisma/client";
import { uniqueCourseSlug } from "@/lib/admin-identifiers";
import {
  CourseActiveSchema,
  CourseIdSchema,
  CourseInputSchema,
  CourseUpdateSchema,
  bilingual,
  formCheckbox,
  formString,
} from "@/lib/admin-schemas";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";

export type CourseActionState = {
  ok?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
} | null;

function toState(error: unknown): CourseActionState {
  // Deliberately opaque: the message reaches the browser, and Prisma errors
  // carry table, column and value detail. The server log keeps the detail.
  console.error("[courses] action failed", error);
  return { error: "Something went wrong. Please try again." };
}

function toFieldErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const fieldErrors: Record<string, string> = {};

  for (const issue of issues) {
    const field = String(issue.path[0] ?? "");
    // First message wins, so a field shows its own problem rather than
    // whatever cross-field rule also complained about it.
    if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
  }

  return fieldErrors;
}

/** Prisma's unique-constraint error, the only one worth naming to the user. */
function isUniqueViolation(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  );
}

/** Prisma's "record required for this query does not exist". */
function isMissingRecord(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  );
}

/**
 * Every action re-authorises itself. The layout's `requireAdmin()` is not a
 * boundary: a Server Action is a public HTTP endpoint.
 */
export async function createCourseAction(
  _prev: CourseActionState,
  formData: FormData,
): Promise<CourseActionState> {
  await requireAdmin();

  const parsed = CourseInputSchema.safeParse({
    code: formString(formData, "code"),
    titleEn: formString(formData, "titleEn"),
    titleUr: formString(formData, "titleUr"),
    durationEn: formString(formData, "durationEn"),
    durationUr: formString(formData, "durationUr"),
    descriptionEn: formString(formData, "descriptionEn"),
    descriptionUr: formString(formData, "descriptionUr"),
  });

  if (!parsed.success) {
    return {
      error: "Please correct the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error.issues),
    };
  }

  const input = parsed.data;

  try {
    // The slug is derived rather than typed: two courses with different names
    // must not collide on `tashkil-ki-usool`, which is a natural thing to
    // retype and an unnatural thing to make unique by hand.
    const slug = await uniqueCourseSlug(input.titleEn);

    await db.course.create({
      data: {
        slug,
        code: input.code,
        titleEn: input.titleEn,
        // `titleUr` is NOT NULL, so an omitted translation falls back to the
        // English source rather than storing "" and rendering a blank gap.
        titleUr: bilingual(input.titleEn, input.titleUr),
        durationEn: input.durationEn,
        durationUr: input.durationUr ?? null,
        descriptionEn: input.descriptionEn,
        descriptionUr: input.descriptionUr,
        isPublished: formCheckbox(formData, "isPublished"),
        isActive: true,
      },
    });

    revalidatePath("/admin/courses");

    return { ok: `“${input.titleEn}” created.` };
  } catch (error) {
    if (isUniqueViolation(error)) {
      // An admin who typed a code that already exists should correct one
      // field, not re-enter the whole form.
      return {
        error: "Please correct the highlighted fields.",
        fieldErrors: { code: "That course code is already in use." },
      };
    }

    return toState(error);
  }
}

export async function updateCourseAction(
  _prev: CourseActionState,
  formData: FormData,
): Promise<CourseActionState> {
  await requireAdmin();

  const parsed = CourseUpdateSchema.safeParse({
    courseId: formString(formData, "courseId"),
    code: formString(formData, "code"),
    titleEn: formString(formData, "titleEn"),
    titleUr: formString(formData, "titleUr"),
    durationEn: formString(formData, "durationEn"),
    durationUr: formString(formData, "durationUr"),
    descriptionEn: formString(formData, "descriptionEn"),
    descriptionUr: formString(formData, "descriptionUr"),
  });

  if (!parsed.success) {
    return {
      error: "Please correct the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error.issues),
    };
  }

  const { courseId, ...input } = parsed.data;

  try {
    const course = await db.course.findUnique({
      where: { id: courseId },
      select: { id: true, titleEn: true, titleUr: true, durationEn: true },
    });

    if (!course) {
      return { error: "That course no longer exists. Refresh the list." };
    }

    // The slug is deliberately left alone: it is the public URL, and any page
    // already shared for this course must keep working after a rename.
    await db.course.update({
      where: { id: courseId },
      data: {
        code: input.code,
        titleEn: input.titleEn,
        // Only fall back when the staff member cleared the Urdu box. Otherwise
        // a saved translation survives a rename.
        titleUr: input.titleUr ?? bilingual(course.titleEn, course.titleUr),
        durationEn: input.durationEn,
        // The box is always rendered, so "omitted" means the staff member
        // cleared it, which should clear the column rather than preserve it.
        durationUr: input.durationUr ?? null,
        descriptionEn: input.descriptionEn,
        descriptionUr: input.descriptionUr,
        isPublished: formCheckbox(formData, "isPublished"),
      },
    });

    revalidatePath("/admin/courses");
    // A course title is shown in the student directory.
    revalidatePath("/admin/students");

    return { ok: `“${input.titleEn}” updated.` };
  } catch (error) {
    if (isUniqueViolation(error)) {
      return {
        error: "Please correct the highlighted fields.",
        fieldErrors: { code: "That course code is already in use." },
      };
    }

    return toState(error);
  }
}

/**
 * Retires or restores a course.
 *
 * A state flag rather than a delete. `isActive` is not `isPublished`:
 * archiving withdraws a course from intake without pulling the page students
 * who are already enrolled read, which a delete or an unpublish would do.
 */
export async function setCourseActiveAction(
  _prev: CourseActionState,
  formData: FormData,
): Promise<CourseActionState> {
  await requireAdmin();

  const parsed = CourseActiveSchema.safeParse({
    courseId: formString(formData, "courseId"),
    isActive: formString(formData, "isActive"),
  });

  if (!parsed.success) {
    return { error: "Please refresh the page and try again." };
  }

  const { courseId, isActive } = parsed.data;
  const active = isActive === "true";

  try {
    await db.course.update({ where: { id: courseId }, data: { isActive: active } });

    revalidatePath("/admin/courses");

    return { ok: active ? "Course restored." : "Course archived." };
  } catch (error) {
    if (isMissingRecord(error)) {
      return { error: "That course no longer exists. Refresh the list." };
    }

    return toState(error);
  }
}

export async function deleteCourseAction(
  _prev: CourseActionState,
  formData: FormData,
): Promise<CourseActionState> {
  await requireAdmin();

  const parsed = CourseIdSchema.safeParse({
    courseId: formString(formData, "courseId"),
  });

  if (!parsed.success) {
    return { error: "That course reference is not valid. Refresh the list." };
  }

  const { courseId } = parsed.data;

  try {
    // Counted first, scoped to this course's own sessions, so the refusal names
    // the blocker instead of surfacing a raw foreign-key error the admin cannot
    // act on.
    const sessions = await db.courseSession.count({ where: { courseId } });
    const enrolled = await db.enrollment.count({
      where: { session: { courseId } },
    });
    const applicants = await db.admission.count({
      where: { session: { courseId } },
    });

    if (sessions > 0 || enrolled > 0 || applicants > 0) {
      const parts = [];

      if (sessions > 0) {
        parts.push(`${sessions} session${sessions === 1 ? "" : "s"}`);
      }
      if (enrolled > 0) {
        parts.push(`${enrolled} enrolled student${enrolled === 1 ? "" : "s"}`);
      }
      if (applicants > 0) {
        parts.push(`${applicants} application${applicants === 1 ? "" : "s"}`);
      }

      return {
        error: `This course still has ${parts.join(", ")}. Archive it instead of deleting.`,
      };
    }

    await db.course.delete({ where: { id: courseId } });

    revalidatePath("/admin/courses");

    return { ok: "Course deleted." };
  } catch (error) {
    // A double click, or a delete that landed after the row was already gone.
    if (isMissingRecord(error)) {
      return { error: "That course no longer exists. Refresh the list." };
    }

    return toState(error);
  }
}