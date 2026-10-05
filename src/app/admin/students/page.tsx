import type { Metadata } from "next";
import Link from "next/link";

import StudentDetailDialog, {
  type StudentDetail,
} from "@/app/admin/students/StudentDetailDialog";
import {
  BADGE_BASE_CLASS,
  activeTone,
  emptyStateMessage,
  formatDate,
  orDash,
} from "@/lib/admin-format";
import { StudentsQuerySchema, firstParam } from "@/lib/admin-schemas";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { Prisma } from "@/generated/prisma/client";

export const metadata: Metadata = {
  title: "Students",
  description: "Directory of enrolled students.",
  robots: { index: false, follow: false },
};

const PAGE_SIZE = 100;

export default async function StudentsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await requireAdmin();

  const params = await searchParams;
  const { q } = StudentsQuerySchema.parse({ q: firstParam(params.q) });

  const where: Prisma.StudentWhereInput = q
    ? {
        OR: [
          { fullName: { contains: q, mode: "insensitive" } },
          { rollNumber: { contains: q, mode: "insensitive" } },
          { email: { contains: q, mode: "insensitive" } },
          { phone: { contains: q, mode: "insensitive" } },
        ],
      }
    : {};

  const [students, total] = await Promise.all([
    db.student.findMany({
      where,
      orderBy: [{ createdAt: "desc" }],
      take: PAGE_SIZE,
      select: {
        id: true,
        fullName: true,
        rollNumber: true,
        email: true,
        phone: true,
        guardianName: true,
        guardianPhone: true,
        isActive: true,
        createdAt: true,
        enrollments: {
          select: {
            id: true,
            session: {
              select: {
                daysLabel: true,
                timeLabel: true,
                course: { select: { titleEn: true, code: true } },
              },
            },
          },
        },
      },
    }),
    db.student.count({ where }),
  ]);

  const details: StudentDetail[] = students.map((student) => ({
    id: student.id,
    fullName: student.fullName,
    rollNumber: student.rollNumber,
    email: student.email,
    phone: student.phone,
    guardianName: student.guardianName,
    guardianPhone: student.guardianPhone,
    isActive: student.isActive,
    // Formatted here, on the server, in a fixed timezone: passing a `Date` to a
    // client component would re-format after hydration and could shift a day.
    createdAt: formatDate(student.createdAt),
    courses: student.enrollments.map((enrolment) => ({
      courseTitle: enrolment.session.course.titleEn,
      courseCode: enrolment.session.course.code,
      daysLabel: enrolment.session.daysLabel,
      timeLabel: enrolment.session.timeLabel,
    })),
  }));

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-[clamp(26px,3vw,40px)] leading-[1.15] tracking-[-0.02em] text-ink">
          Students
        </h1>
        <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.65] text-muted">
          Everyone on record, including applicants who have not been enrolled
          yet. Search by name or roll number.
        </p>
      </div>

      <div className="border-t-[3px] border-t-gold border-x border-b border-[rgba(23,32,28,0.12)] bg-white px-6 py-6 sm:px-8">
        <form
          method="get"
          action="/admin/students"
          className="flex flex-col gap-4 sm:flex-row sm:items-end"
        >
          <div className="flex flex-1 flex-col gap-1.5">
            <label
              htmlFor="student-search"
              className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted"
            >
              Search
            </label>
            <input
              id="student-search"
              name="q"
              type="search"
              defaultValue={q ?? ""}
              placeholder="Name, roll number, email or phone"
              className="rounded-none border border-[rgba(23,32,28,0.2)] bg-white px-3 py-2 text-[14px] text-ink outline-none transition-colors duration-200 focus:border-green"
            />
          </div>

          <button
            type="submit"
            className="rounded-none border-2 border-green bg-green px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-ivory transition-colors duration-200 hover:bg-green-dark"
          >
            Search
          </button>

          {q ? (
            <Link
              href="/admin/students"
              className="rounded-none border-2 border-transparent px-2 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-muted transition-colors duration-200 hover:text-ink"
            >
              Clear
            </Link>
          ) : null}
        </form>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-[13px] text-muted">
          Showing {students.length} of {total} student
          {total === 1 ? "" : "s"}
          {total > students.length ? " &mdash; refine the search to see the rest." : "."}
        </p>

        {students.length === 0 ? (
          <p className="border border-[rgba(23,32,28,0.12)] bg-white px-6 py-10 text-center text-[14px] text-muted">
            {q ? `No student matches “${q}”.` : emptyStateMessage("students")}
          </p>
        ) : (
          <div className="overflow-x-auto border border-[rgba(23,32,28,0.12)] bg-white">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[rgba(23,32,28,0.12)] bg-beige/40">
                  <th
                    scope="col"
                    className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted"
                  >
                    Roll no.
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted"
                  >
                    Contact
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted"
                  >
                    Courses
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted"
                  >
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => {
                  const tone = activeTone(student.isActive);
                  const detail = details[index];
                  const firstCourse = detail.courses[0];

                  return (
                    <tr
                      key={student.id}
                      className="border-b border-[rgba(23,32,28,0.08)] align-middle last:border-b-0"
                    >
                      <td className="px-4 py-3 font-mono text-[13px] text-ink">
                        {orDash(student.rollNumber)}
                      </td>

                      <td className="px-4 py-3">
                        <span className="block font-semibold text-ink">
                          {student.fullName}
                        </span>
                        <span className="block text-[12px] text-muted">
                          Added {formatDate(student.createdAt)}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <span className="block text-[13px] text-ink">
                          {orDash(student.email)}
                        </span>
                        <span className="block text-[12px] text-muted">
                          {orDash(student.phone)}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-[13px]">
                        {detail.courses.length === 0 ? (
                          <span className="text-muted">Not enrolled</span>
                        ) : (
                          <span className="block text-ink">
                            {firstCourse?.courseTitle}
                            {detail.courses.length > 1 ? (
                              <span className="text-muted">
                                {" "}
                                +{detail.courses.length - 1} more
                              </span>
                            ) : null}
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`${BADGE_BASE_CLASS} ${tone.className}`}
                        >
                          {tone.label}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <StudentDetailDialog student={detail} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}