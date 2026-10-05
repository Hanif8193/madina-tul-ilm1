import type { Metadata } from "next";
import Link from "next/link";

import AdmissionStatusControls from "@/app/admin/admissions/AdmissionStatusControls";
import {
  ADMISSION_STATUS_FILTERS,
  BADGE_BASE_CLASS,
  admissionStatusTone,
  emptyStateMessage,
  formatDate,
  orDash,
} from "@/lib/admin-format";
import { AdmissionsQuerySchema, firstParam } from "@/lib/admin-schemas";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { Prisma } from "@/generated/prisma/client";

export const metadata: Metadata = {
  title: "Admissions",
  description: "Review and action incoming student applications.",
  robots: { index: false, follow: false },
};

/**
 * An admissions list is unbounded but almost never read past the first screen,
 * so it is capped rather than paginated. `total` is still counted so the UI can
 * say how much is hidden instead of implying the page is complete.
 */
const PAGE_SIZE = 100;

export default async function AdmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Re-checked on the page itself, not inherited from the layout.
  await requireAdmin();

  const params = await searchParams;
  const { q, status } = AdmissionsQuerySchema.parse({
    q: firstParam(params.q),
    status: firstParam(params.status),
  });

  const where: Prisma.AdmissionWhereInput = {
    ...(status ? { status } : {}),
    ...(q
      ? {
          OR: [
            { student: { fullName: { contains: q, mode: "insensitive" } } },
            { reference: { contains: q, mode: "insensitive" } },
            { student: { email: { contains: q, mode: "insensitive" } } },
            { course: { titleEn: { contains: q, mode: "insensitive" } } },
          ],
        }
      : {}),
  };

  const [admissions, total, counts] = await Promise.all([
    db.admission.findMany({
      where,
      orderBy: [{ appliedAt: "desc" }],
      take: PAGE_SIZE,
      select: {
        id: true,
        reference: true,
        status: true,
        appliedAt: true,
        reviewedAt: true,
        sessionId: true,
        student: {
          select: {
            fullName: true,
            email: true,
            phone: true,
            rollNumber: true,
          },
        },
        course: { select: { titleEn: true, code: true } },
        reviewedBy: { select: { name: true } },
      },
    }),
    db.admission.count({ where }),
    // Counts ignore the current filter so the tabs always show the whole
    // pipeline, not just what is already selected.
    db.admission.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);

  const countByStatus = new Map(
    counts.map((row) => [row.status, row._count._all]),
  );
  const allCount = counts.reduce((sum, row) => sum + row._count._all, 0);
  const filtered = q !== undefined || status !== undefined;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-[clamp(26px,3vw,40px)] leading-[1.15] tracking-[-0.02em] text-ink">
          Admissions
        </h1>
        <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.65] text-muted">
          Every incoming application. Approving one assigns a roll number and
          enrols the student in the selected session.
        </p>
      </div>

      {/*
        Filters are a plain GET form, so filtering needs no client JavaScript and
        the result stays linkable and bookmarkable. Submitting it rewrites the
        query string, which is the whole state.
      */}
      <div className="border-t-[3px] border-t-gold border-x border-b border-[rgba(23,32,28,0.12)] bg-white px-6 py-6 sm:px-8">
        <form
          method="get"
          action="/admin/admissions"
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex flex-1 flex-col gap-1.5">
              <label
                htmlFor="admission-search"
                className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted"
              >
                Search
              </label>
              <input
                id="admission-search"
                name="q"
                type="search"
                defaultValue={q ?? ""}
                placeholder="Name, reference, email or course"
                className="rounded-none border border-[rgba(23,32,28,0.2)] bg-white px-3 py-2 text-[14px] text-ink outline-none transition-colors duration-200 focus:border-green"
              />
            </div>

            <button
              type="submit"
              className="rounded-none border-2 border-green bg-green px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-ivory transition-colors duration-200 hover:bg-green-dark"
            >
              Apply
            </button>

            {filtered ? (
              <Link
                href="/admin/admissions"
                className="rounded-none border-2 border-transparent px-2 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-muted transition-colors duration-200 hover:text-ink"
              >
                Clear
              </Link>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2 border-t border-[rgba(23,32,28,0.1)] pt-4">
            <StatusChip
              href="/admin/admissions"
              label="All"
              count={allCount}
              active={status === undefined}
            />
            {ADMISSION_STATUS_FILTERS.map((filter) => (
              <StatusChip
                key={filter.value}
                href={`/admin/admissions?status=${filter.value}`}
                label={filter.label}
                count={countByStatus.get(filter.value) ?? 0}
                active={status === filter.value}
              />
            ))}
          </div>
        </form>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-[13px] text-muted">
          Showing {admissions.length} of {total} application
          {total === 1 ? "" : "s"}
          {total > admissions.length ? " &mdash; refine the filters to see the rest." : "."}
        </p>

        {admissions.length === 0 ? (
          <p className="border border-[rgba(23,32,28,0.12)] bg-white px-6 py-10 text-center text-[14px] text-muted">
            {emptyStateMessage("applications")}
          </p>
        ) : (
          <div className="overflow-x-auto border border-[rgba(23,32,28,0.12)] bg-white">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[rgba(23,32,28,0.12)] bg-beige/40">
                  <Th>Reference</Th>
                  <Th>Applicant</Th>
                  <Th>Contact</Th>
                  <Th>Course</Th>
                  <Th>Applied</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {admissions.map((admission) => {
                  const tone = admissionStatusTone(admission.status);

                  return (
                    <tr
                      key={admission.id}
                      className="border-b border-[rgba(23,32,28,0.08)] align-top last:border-b-0"
                    >
                      <Td>
                        <span className="font-mono text-[13px] text-ink">
                          {admission.reference}
                        </span>
                      </Td>

                      <Td>
                        <span className="block font-semibold text-ink">
                          {admission.student.fullName}
                        </span>
                        <span className="block text-[12px] text-muted">
                          {orDash(admission.student.rollNumber)}
                        </span>
                      </Td>

                      <Td>
                        <span className="block text-[13px] text-ink">
                          {orDash(admission.student.email)}
                        </span>
                        <span className="block text-[12px] text-muted">
                          {orDash(admission.student.phone)}
                        </span>
                      </Td>

                      <Td>
                        <span className="block text-[13px] text-ink">
                          {admission.course ? admission.course.titleEn : "Not chosen"}
                        </span>
                        <span className="block text-[12px] text-muted">
                          {admission.course?.code
                            ? `${admission.course.code} · `
                            : ""}
                          {admission.sessionId ? "Session set" : "No session"}
                        </span>
                      </Td>

                      <Td>
                        <span className="block text-[13px] text-ink">
                          {formatDate(admission.appliedAt)}
                        </span>
                        {admission.reviewedBy ? (
                          <span className="block text-[12px] text-muted">
                            by {admission.reviewedBy.name}
                          </span>
                        ) : null}
                      </Td>

                      <Td>
                        <span
                          className={`${BADGE_BASE_CLASS} ${tone.className}`}
                        >
                          {tone.label}
                        </span>
                      </Td>

                      <Td>
                        <AdmissionStatusControls
                          admissionId={admission.id}
                          status={admission.status}
                          reference={admission.reference}
                        />
                      </Td>
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

function StatusChip({
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

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      scope="col"
      className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted"
    >
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 text-[13px]">{children}</td>;
}