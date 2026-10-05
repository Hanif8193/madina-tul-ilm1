"use client";

import { useId, useRef } from "react";

export type StudentDetail = {
  id: string;
  fullName: string;
  rollNumber: string | null;
  email: string | null;
  phone: string | null;
  guardianName: string | null;
  guardianPhone: string | null;
  isActive: boolean;
  createdAt: string;
  courses: Array<{
    courseTitle: string;
    courseCode: string | null;
    daysLabel: string | null;
    timeLabel: string | null;
  }>;
};

/**
 * Read-only student detail in a native `<dialog>`.
 *
 * `<dialog>` is used instead of a hand-rolled overlay because it brings the
 * parts that are easy to get wrong: Escape closes it, focus moves into it and
 * is restored to the trigger on close, it is inert to the page behind it, and
 * it is announced as a dialog without any ARIA.
 */
export default function StudentDetailDialog({ student }: { student: StudentDetail }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  const open = () => dialogRef.current?.showModal();

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="rounded-none border border-[rgba(23,32,28,0.2)] bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted transition-colors duration-200 hover:border-green hover:text-green"
      >
        Details
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="m-auto w-[min(560px,92vw)] border border-[rgba(23,32,28,0.16)] bg-white p-0 text-ink backdrop:bg-green-dark/50"
      >
        <div className="border-t-[3px] border-t-gold border-x border-b border-[rgba(23,32,28,0.12)] bg-white px-6 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id={titleId}
                className="font-display text-[22px] leading-tight tracking-[-0.02em] text-ink"
              >
                {student.fullName}
              </h2>
              <p className="mt-1 text-[12px] uppercase tracking-[0.1em] text-muted">
                {student.rollNumber ?? "No roll number"} &middot;{" "}
                {student.isActive ? "Active" : "Inactive"}
              </p>
            </div>

            {/*
              `formMethod="dialog"` closes without any JS handler: the button
              submits the surrounding <form method="dialog">, which the HTML
              dialog contract defines as "close".
            */}
            <form method="dialog">
              <button
                type="submit"
                aria-label="Close student details"
                className="rounded-none border border-[rgba(23,32,28,0.2)] px-2.5 py-1 text-[13px] leading-none text-muted transition-colors duration-200 hover:border-ink hover:text-ink"
              >
                &#x2715;
              </button>
            </form>
          </div>

          <dl className="mt-6 grid grid-cols-[minmax(0,9rem)_1fr] gap-x-4 gap-y-2.5 text-[13px]">
            <Row label="Roll number">{student.rollNumber ?? "—"}</Row>
            <Row label="Email">{student.email ?? "—"}</Row>
            <Row label="Phone">{student.phone ?? "—"}</Row>
            <Row label="Guardian">
              {student.guardianName ?? "—"}
              {student.guardianPhone ? ` · ${student.guardianPhone}` : ""}
            </Row>
            <Row label="On record since">{student.createdAt}</Row>
          </dl>

          <h3 className="mt-7 text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
            Enrolments
          </h3>

          {student.courses.length === 0 ? (
            <p className="mt-2 text-[13px] text-muted">
              Not enrolled in any course session yet. An applicant appears here
              once their admission is approved against a session.
            </p>
          ) : (
            <ul className="mt-2 flex flex-col gap-2">
              {student.courses.map((course) => (
                <li
                  key={`${course.courseTitle}-${course.daysLabel ?? ""}-${course.timeLabel ?? ""}`}
                  className="flex flex-wrap items-baseline gap-x-2 border border-[rgba(23,32,28,0.1)] bg-beige/30 px-3 py-2 text-[13px]"
                >
                  <span className="font-semibold text-ink">
                    {course.courseTitle}
                  </span>
                  {course.courseCode ? (
                    <span className="font-mono text-[12px] text-muted">
                      {course.courseCode}
                    </span>
                  ) : null}
                  <span className="text-[12px] text-muted">
                    {[course.daysLabel, course.timeLabel]
                      .filter(Boolean)
                      .join(" · ") || "No schedule set"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </dialog>
    </>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <dt className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted">
        {label}
      </dt>
      <dd className="text-ink">{children}</dd>
    </>
  );
}