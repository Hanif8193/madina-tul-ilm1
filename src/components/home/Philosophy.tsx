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

        <div className="mt-14 flex flex-col gap-8 lg:flex-row">
          {philosophy.steps.map((word, index) => (
            <div
              key={word}
              className={`relative flex flex-col items-center gap-3 py-2 lg:flex-1 lg:border-e lg:border-[var(--line)] lg:px-7 lg:first:border-e-0 lg:first:pe-0 ${
                index > 0
                  ? "border-t border-[var(--line)] pt-8 lg:border-t-0"
                  : "pt-2"
              }`}
            >
              <span
                className="font-display text-[20px] font-bold leading-none text-gold"
                aria-hidden="true"
              >
                {NUMBERS[index]}
              </span>
              <span className="font-display text-[19px] font-bold text-ink">
                {word}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
