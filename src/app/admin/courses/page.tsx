import type { Metadata } from "next";
import Link from "next/link";

import CourseDialog, {
  type CourseFormValues,
} from "@/app/admin/courses/CourseDialog";
import CourseRowActions from "@/app/admin/courses/CourseRowActions";
import {
  BADGE_BASE_CLASS,
  activeTone,
  emptyStateMessage,
  formatDate,
  orDash,
} from "@/lib/admin-format";
import { CoursesQuerySchema, firstParam } from "@/lib/admin-schemas";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { Prisma } from "@/generated/prisma/client";

export const metadata: Metadata = {
  title: "Courses",
  description: "Manage the course catalogue.",
  robots: { index: false, follow: false },
};

const PAGE_SIZE = 100;

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await requireAdmin();

  const params = await searchParams;
  const { q, state } = CoursesQuerySchema.parse({
    q: firstParam(params.q),
    state: firstParam(params.state),
  });

  const where: Prisma.CourseWhereInput = {
    ...(state === "ACTIVE" ? { isActive: true } : {}),
    ...(state === "INACTIVE" ? { isActive: false } : {}),
    ...(q
      ? {
          OR: [
            { titleEn: { contains: q, mode: "insensitive" } },
            { titleUr: { contains: q, mode: "insensitive" } },
            { code: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [courses, total, activeCount, inactiveCount] = await Promise.all([
    db.course.findMany({
      where,
      orderBy: [{ code: "asc" }],
      take: PAGE_SIZE,
      select: {
        id: true,
        code: true,
        slug: true,
        titleEn: true,
        titleUr: true,
        descriptionEn: true,
        durationEn: true,
        isActive: true,
        isPublished: true,
        createdAt: true,
        _count: { select: { sessions: true, admissions: true } },
      },
    }),
    db.course.count({ where }),
    db.course.count({ where: { isActive: true } }),
    db.course.count({ where: { isActive: false } }),
  ]);

  const formValues: CourseFormValues[] = courses.map((course) => ({
    id: course.id,
    code: course.code ?? "",
    titleEn: course.titleEn,
    titleUr: course.titleUr,
    descriptionEn: course.descriptionEn ?? "",
    descriptionUr: "",
    durationEn: course.durationEn ?? "",
    durationUr: "",
    isPublished: course.isPublished,
  }));

  const filtered = q !== undefined || state !== undefined;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-[clamp(26px,3vw,40px)] leading-[1.15] tracking-[-0.02em] text-ink">
          Courses
        </h1>
        <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.65] text-muted">
          The catalogue admissions can be taken against. Deactivating a course
          withdraws it from intake while keeping its page and its history.
        </p>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <CourseDialog mode="create" />

        {/*
          Filters are a GET form: no client JavaScript, and the filtered view is
          a shareable URL.
        */}
        <form
          method="get"
          action="/admin/courses"
          className="flex flex-wrap items-end gap-3"
        >
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="course-search"
              className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted"
            >
              Search
            </label>
            <input
              id="course-search"
              name="q"
              type="search"
              defaultValue={q ?? ""}
              placeholder="Title or code"
              className="rounded-none border border-[rgba(23,32,28,0.2)] bg-white px-3 py-2 text-[14px] text-ink outline-none transition-colors duration-200 focus:border-green"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="course-state"
              className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted"
            >
              State
            </label>
            <select
              id="course-state"
              name="state"
              defaultValue={state ?? ""}
              className="rounded-none border border-[rgba(23,32,28,0.2)] bg-white px-3 py-2 text-[14px] text-ink outline-none transition-colors duration-200 focus:border-green"
            >
              <option value="">All</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <button
            type="submit"
            className="rounded-none border-2 border-green bg-green px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-ivory transition-colors duration-200 hover:bg-green-dark"
          >
            Apply
          </button>

          {filtered ? (
            <Link
              href="/admin/courses"
              className="rounded-none border-2 border-transparent px-2 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-muted transition-colors duration-200 hover:text-ink"
            >
              Clear
            </Link>
          ) : null}
        </form>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <StateChip href="/admin/courses" label="All" count={activeCount + inactiveCount} active={state === undefined} />
        <StateChip
          href="/admin/courses?state=ACTIVE"
          label="Active"
          count={activeCount}
          active={state === "ACTIVE"}
        />
        <StateChip
          href="/admin/courses?state=INACTIVE"
          label="Inactive"
          count={inactiveCount}
          active={state === "INACTIVE"}
        />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-[13px] text-muted">
          Showing {courses.length} of {total} course
          {total === 1 ? "" : "s"}
          {total > courses.length ? " &mdash; refine the filters to see the rest." : "."}
        </p>

        {courses.length === 0 ? (
          <p className="border border-[rgba(23,32,28,0.12)] bg-white px-6 py-10 text-center text-[14px] text-muted">
            {emptyStateMessage("courses")}
          </p>
        ) : (
          <div className="overflow-x-auto border border-[rgba(23,32,28,0.12)] bg-white">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[rgba(23,32,28,0.12)] bg-beige/40">
                  <th scope="col" className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">Code</th>
                  <th scope="col" className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">Title</th>
                  <th scope="col" className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">Duration</th>
                  <th scope="col" className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">History</th>
                  <th scope="col" className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">Visibility</th>
                  <th scope="col" className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => {
                  const tone = activeTone(course.isActive);

                  return (
                    <tr
                      key={course.id}
                      className="border-b border-[rgba(23,32,28,0.08)] align-top last:border-b-0"
                    >
                      <td className="px-4 py-3 font-mono text-[13px] text-ink">
                        {orDash(course.code)}
                      </td>

                      <td className="px-4 py-3">
                        <span className="block font-semibold text-ink">
                          {course.titleEn}
                        </span>
                        <span
                          dir="rtl"
                          lang="ur"
                          className="block text-[13px] text-muted"
                        >
                          {course.titleUr}
                        </span>
                        <span className="block text-[12px] text-muted">
                          /{course.slug}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-[13px] text-ink">
                        {orDash(course.durationEn)}
                      </td>

                      <td className="px-4 py-3 text-[13px] text-muted">
                        <span className="block">
                          {course._count.sessions} session
                          {course._count.sessions === 1 ? "" : "s"}
                        </span>
                        <span className="block">
                          {course._count.admissions} application
                          {course._count.admissions === 1 ? "" : "s"}
                        </span>
                        <span className="block text-[12px]">
                          Added {formatDate(course.createdAt)}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <span className="flex flex-col gap-1.5">
                          <span
                            className={`${BADGE_BASE_CLASS} ${tone.className} w-fit`}
                          >
                            {tone.label}
                          </span>
                          <span
                            className={`${BADGE_BASE_CLASS} w-fit ${
                              course.isPublished
                                ? "border-[#8fa3b8] bg-[#eef2f7] text-[#3f5468]"
                                : "border-[rgba(23,32,28,0.16)] bg-white text-muted"
                            }`}
                          >
                            {course.isPublished ? "Published" : "Unpublished"}
                          </span>
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex flex-wrap items-start gap-2">
                          <CourseDialog mode="edit" course={formValues[index]} />
                          <CourseRowActions
                            course={{
                              id: course.id,
                              titleEn: course.titleEn,
                              isActive: course.isActive,
                            }}
                          />
                        </div>
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

function StateChip({
  href,
  label,
  count,
  active,
}: {
  href: string;
  label: string;
  count: number;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-none border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ${
        active
          ? "border-green bg-green text-ivory"
          : "border-[rgba(23,32,28,0.2)] bg-white text-muted hover:border-green hover:text-green"
      }`}
    >
      {label} <span className="tabular-nums">{count}</span>
    </Link>
  );
}