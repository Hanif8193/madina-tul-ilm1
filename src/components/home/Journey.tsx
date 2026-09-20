"use client";

import { useLang } from "@/components/language/LanguageProvider";
import { wrap } from "@/lib/utils";

// Timeline years stay Latin numerals in both languages.
const YEARS = ["2016", "2017–20", "2021–24", "2025", "Present"];

export default function Journey() {
  const { t } = useLang();
  const story = t.story;

  return (
    <section className="bg-beige py-20 md:py-28" aria-labelledby="journey-heading">
      <div className={wrap}>
        {/* Section header */}
        <div className="mb-14">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
            {story.eyebrow}
          </p>
          <h2
            id="journey-heading"
            className="font-display text-4xl font-normal leading-[1.15] tracking-[-0.02em] text-ink lg:text-5xl"
          >
            {story.title}
          </h2>
        </div>

        {/* Horizontal 5-column timeline (reference: repeat(5, 1fr)). All
            nodes align flush at the top; 1px green/10 dividers sit between
            the cards; 9px gold dots sit on the shared top line at each
            column's inline-start edge (flips in RTL). Mobile: single
            column stack. */}
        <div className="grid grid-cols-1 gap-y-10 border-t border-green/10 md:grid-cols-5 md:gap-y-0">
          {story.milestones.map((entry, index) => (
            <article
              key={`${YEARS[index]}-${entry.title}`}
              className={`relative pt-8 ${
                index > 0
                  ? "border-t border-green/10 md:border-s md:border-t-0 md:ps-6"
                  : ""
              } md:pe-6 ${index === 0 ? "md:ps-0" : ""}`}
            >
              {/* 9px gold dot on the top line, aligned to each column's
                  start edge; hidden on mobile where cards stack */}
              <span
                aria-hidden="true"
                className="absolute -top-[4.5px] start-0 hidden h-[9px] w-[9px] rounded-full bg-gold md:block"
              />
              <div className="mb-2 font-display text-[22px] font-normal leading-none tracking-[-0.01em] text-green">
                {YEARS[index]}
              </div>
              <div className="mb-2 text-[13px] font-bold tracking-[0.02em] text-ink">
                {entry.title}
              </div>
              <p className="text-[13px] leading-[1.6] text-muted">
                {entry.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
