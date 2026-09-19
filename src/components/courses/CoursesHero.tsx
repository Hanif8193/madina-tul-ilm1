"use client";

import { useLang } from "@/components/language/LanguageProvider";

// Hero — recreated from the original courses.html source.
export default function CoursesHero() {
  const { t } = useLang();
  const { hero } = t.pages.courses;

  return (
    <section className="relative overflow-hidden bg-beige px-6 pb-24 pt-[84px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -end-[120px] h-[480px] w-[480px] -translate-y-1/2 rounded-full border border-green/8"
      />
      <div className="relative z-[1] mx-auto w-full max-w-[1240px]">
        <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
          {hero.eyebrow}
        </div>
        <h1 className="mb-6 max-w-[720px] font-display text-[clamp(40px,6vw,80px)] font-normal leading-[1.05] tracking-[-0.03em]">
          {hero.heading}
          {hero.headingEm ? (
            <>
              <br />
              <em className="text-green">{hero.headingEm}</em>
            </>
          ) : null}
        </h1>
        <p className="max-w-[520px] text-[17px] leading-[1.7] text-muted">
          {hero.description}
        </p>
      </div>
    </section>
  );
}
