"use client";

import { useLang } from "@/components/language/LanguageProvider";
import { wrap } from "@/lib/utils";

// Faded serif numerals for the six approach cards, as in the original.
const NUMBERS = ["01", "02", "03", "04", "05", "06"];

export default function Why() {
  const { t } = useLang();
  const why = t.why;

  return (
    <section className="bg-ivory py-20 md:py-28" aria-labelledby="why-heading">
      <div className={wrap}>
        {/* Section header */}
        <div className="mb-16 max-w-[480px]">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
            {why.eyebrow}
          </p>
          <h2
            id="why-heading"
            className="font-display text-4xl font-normal leading-[1.15] tracking-[-0.02em] lg:text-5xl"
          >
            {why.title}
            <br />
            {why.titleLine2}
          </h2>
        </div>

        {/* 3-column card grid with thin internal borders */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {why.cards.map((card, index) => (
            <article
              key={card.title}
              className={`border-t border-green/12 px-8 py-10 transition-colors duration-200 hover:bg-beige ${
                index % 3 !== 0 ? "md:border-s md:border-green/12" : ""
              }`}
            >
              <div className="mb-4 font-display text-5xl font-light leading-none tracking-[-0.03em] text-green/15">
                {NUMBERS[index]}
              </div>
              <h3 className="mb-2.5 text-[16px] font-semibold leading-[1.3] text-ink">
                {card.title}
              </h3>
              <p className="text-[14px] leading-[1.65] text-muted">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
