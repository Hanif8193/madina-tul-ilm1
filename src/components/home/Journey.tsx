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
        <div className="mb-16">
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

        {/* Horizontal 5-step timeline; dots sit on the shared border line */}
        <div className="grid grid-cols-1 gap-10 border-t border-green/12 pt-8 md:grid-cols-5 md:gap-0 md:border-t-0 md:pt-0">
          {story.milestones.map((entry, index) => (
            <article
              key={`${YEARS[index]}-${entry.title}`}
              className={`relative ${
                index === 0
                  ? "md:border-s-0 md:ps-0 md:pe-6"
                  : "md:border-s md:border-green/12 md:ps-6 md:pe-6"
              }`}
            >
              {/* Gold dot centered on the top of the border line (start side),
                  hidden on mobile like the original */}
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -start-[5px] -top-1 hidden h-2.5 w-2.5 rounded-full bg-gold md:block"
                />
              )}
              <div className="mb-2 font-display text-[22px] font-normal leading-none tracking-[-0.01em] text-green">
                {YEARS[index]}
              </div>
              <div className="mb-2 text-[13px] font-bold tracking-[0.02em] text-ink">
                {entry.title}
              </div>
              <p className="text-[13px] leading-[1.6] text-muted">{entry.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
