"use client";

import Link from "next/link";
import { SCHEDULE_CAPTION } from "@/lib/data";
import { useLang } from "@/components/language/LanguageProvider";

export default function AdmissionsTable() {
  const { t } = useLang();
  const schedule = t.schedule;

  return (
    <div>
      <div className="overflow-x-auto rounded-md border border-[var(--line)]">
        <table className="w-full min-w-[720px] border-collapse text-[14.5px]">
          <caption className="p-0 text-start">
            <span className="sr-only">{SCHEDULE_CAPTION}</span>
          </caption>
          <thead>
            <tr>
              {schedule.columns.map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="whitespace-nowrap bg-beige px-[18px] py-3.5 text-start text-[12px] font-bold uppercase tracking-[0.04em] text-muted"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schedule.rows.map((row) => (
              <tr key={`${row.course}-${row.days}-${row.time}-${row.fee}`}>
                <td className="whitespace-nowrap border-b border-[var(--line)] px-[18px] py-3.5">
                  {row.course}
                </td>
                <td className="whitespace-nowrap border-b border-[var(--line)] px-[18px] py-3.5">
                  {row.days}
                </td>
                <td className="whitespace-nowrap border-b border-[var(--line)] px-[18px] py-3.5">
                  {row.time}
                </td>
                <td className="whitespace-nowrap border-b border-[var(--line)] px-[18px] py-3.5">
                  {row.format}
                </td>
                <td className="whitespace-nowrap border-b border-[var(--line)] px-[18px] py-3.5 font-bold text-green">
                  {row.fee}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 text-[14.5px] text-muted">
        {schedule.footerHint}{" "}
        <Link href="/contact" className="font-bold text-green underline decoration-gold underline-offset-2">
          {schedule.footerLink}
        </Link>{" "}
        {schedule.footerTail}
      </p>
    </div>
  );
}
