"use client";

import { CONTACT_INFO } from "@/lib/data";
import { useLang } from "@/components/language/LanguageProvider";

export default function CourseSchedule() {
  const { t } = useLang();
  const page = t.pages.admissions;
  const { table } = page;

  return (
    <>
      {/* Desktop table — hidden below 900px, matching the original */}
      <div className="hidden overflow-x-auto min-[900px]:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green">
              {table.columns.map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="px-4 py-3.5 text-start text-[11px] font-bold tracking-[0.12em] whitespace-nowrap text-gold uppercase"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr
                key={`${row.course}-${row.days}-${row.time}-${row.fee}`}
                className="odd:bg-ivory even:bg-beige transition-colors duration-150 hover:bg-gold-light/20"
              >
                <td className="border-b border-green/[0.06] px-4 py-3.5 text-[14px] font-semibold whitespace-nowrap text-ink">
                  {row.course}
                </td>
                <td className="border-b border-green/[0.06] px-4 py-3.5 text-[13px] whitespace-nowrap text-muted">
                  {row.days}
                </td>
                <td
                  className={`border-b border-green/[0.06] px-4 py-3.5 text-[13px] whitespace-nowrap text-muted ${
                    row.tbc ? "text-gold" : ""
                  }`}
                >
                  {row.time}
                </td>
                <td className="border-b border-green/[0.06] px-4 py-3.5 text-[13px] whitespace-nowrap text-muted">
                  <ModeBadge mode={row.mode} />
                </td>
                <td className="border-b border-green/[0.06] px-4 py-3.5 text-[13px] whitespace-nowrap text-gold">
                  {table.toBeConfirmed}
                </td>
                <td className="border-b border-green/[0.06] px-4 py-3.5 text-[14px] font-semibold whitespace-nowrap text-ink">
                  {row.fee}
                </td>
                <td className="border-b border-green/[0.06] px-4 py-3.5 text-[13px] whitespace-nowrap text-muted">
                  <a
                    href={CONTACT_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block whitespace-nowrap bg-green px-3.5 py-1.5 text-[12px] font-semibold text-ivory transition-colors duration-200 hover:bg-green-dark"
                  >
                    {table.columns[6]}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards — shown below 900px, matching the original */}
      <div className="flex flex-col gap-4 min-[900px]:hidden">
        {table.rows.map((row) => (
          <div
            key={`m-${row.course}-${row.days}-${row.time}-${row.fee}`}
            className="border border-green/[0.08] bg-beige p-6"
          >
            <div className="mb-3 text-[16px] font-bold">{row.course}</div>
            <div className="mb-4 grid grid-cols-2 gap-3">
              <div>
                <div className="mb-1 text-[10px] font-bold tracking-[0.12em] text-gold uppercase">
                  {table.mobile.days}
                </div>
                <div className="text-[13px] text-muted">{row.days}</div>
              </div>
              <div>
                <div className="mb-1 text-[10px] font-bold tracking-[0.12em] text-gold uppercase">
                  {table.mobile.time}
                </div>
                <div className="text-[13px] text-muted">{row.time}</div>
              </div>
              <div>
                <div className="mb-1 text-[10px] font-bold tracking-[0.12em] text-gold uppercase">
                  {table.mobile.mode}
                </div>
                <div className="text-[13px] text-muted">{row.mode}</div>
              </div>
              <div>
                <div className="mb-1 text-[10px] font-bold tracking-[0.12em] text-gold uppercase">
                  {table.mobile.fee}
                </div>
                <div className="text-[13px] text-muted">{row.fee}</div>
              </div>
            </div>
            <div className="mb-4">
              <div className="mb-1 text-[10px] font-bold tracking-[0.12em] text-gold uppercase">
                {table.mobile.requirements}
              </div>
              <div className="text-[13px] text-gold">{table.toBeConfirmed}</div>
            </div>
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-green px-5 py-3 text-center text-[13px] font-semibold text-ivory"
            >
              {table.mobile.enroll}
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

function ModeBadge({ mode }: { mode: string }) {
  const isOnline = mode === "Online" || mode === "آن لائن";
  if (mode === "—") {
    return <span>–</span>;
  }
  return (
    <span
      className={`px-2.5 py-[3px] text-[11px] font-bold uppercase tracking-[0.08em] ${
        isOnline ? "bg-green/[0.08] text-green" : "bg-gold/[0.12] text-[#8B6B1A]"
      }`}
    >
      {mode}
    </span>
  );
}
