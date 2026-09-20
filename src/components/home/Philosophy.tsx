"use client";

import { useLang } from "@/components/language/LanguageProvider";
import { sectionPadding, wrap } from "@/lib/utils";

// Step numerals stay Latin in both languages (decorative).
const NUMBERS = ["01", "02", "03", "04"];

export default function Philosophy() {
  const { t } = useLang();
  const philosophy = t.philosophy;

  return (
    <section className={sectionPadding} aria-labelledby="philosophy-heading">
      <div className={wrap}>
        <div className="mx-auto max-w-[640px] text-center">
          <p className="mb-[18px] flex items-center justify-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.06em] text-green">
            <span aria-hidden="true" className="inline-block h-[1.5px] w-[22px] bg-gold" />
            {philosophy.eyebrow}
          </p>
          <h2 id="philosophy-heading" className="font-display text-[clamp(28px,3.4vw,42px)] font-normal leading-[1.15]">
            {philosophy.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-[17px] text-muted">
            {philosophy.description}
          </p>
        </div>

        {/* 4-step grid (reference: repeat(4, 1fr)). Grid default stretch
            keeps all cells equal height; each cell centers its content
            vertically and horizontally. Stack per card: gold index number,
            green serif title, gold arrow with a consistent mt. Dividers sit
            only BETWEEN cells (inline-end border on all but the last, which
            flips in RTL); horizontal separators on mobile. */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-4">
          {philosophy.steps.map((word, index) => (
            <div
              key={word}
              className={`flex flex-col items-center justify-center px-7 py-10 text-center lg:py-14 ${
                index > 0 ? "border-t border-green/10 lg:border-t-0" : ""
              } ${
                index < philosophy.steps.length - 1
                  ? "lg:border-e lg:border-green/10"
                  : ""
              }`}
            >
              <span
                className="font-display text-[20px] font-bold leading-none text-gold"
                aria-hidden="true"
              >
                {NUMBERS[index]}
              </span>
              <span className="mt-3 font-display text-[19px] font-bold text-green">
                {word}
              </span>
              {/* Gold right-arrow icon (flips in RTL) */}
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mt-5 text-gold rtl:rotate-180"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
