"use client";

import { useLang } from "@/components/language/LanguageProvider";

export default function AboutHero() {
  const { t } = useLang();
  const { hero } = t.pages.about;
  return (
    <section className="relative overflow-hidden bg-green pb-24 pt-16" aria-labelledby="about-hero-heading">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[100px] -end-[100px] h-[400px] w-[400px] rounded-full border border-gold/[0.06]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[60px] -end-[60px] h-[280px] w-[280px] rounded-full border border-gold/[0.04]"
      />
      <div className="relative mx-auto w-full max-w-[1240px] px-6">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-gold/80">
          {hero.eyebrow}
        </p>
        <h1
          id="about-hero-heading"
          className="max-w-[720px] font-display text-[clamp(40px,6vw,80px)] font-normal leading-[1.05] tracking-[-0.03em] text-ivory max-[899px]:max-w-none"
        >
          <span className="block whitespace-nowrap max-[899px]:whitespace-normal">{hero.heading}</span>
          {hero.headingEm ? (
            <em className="block whitespace-nowrap text-gold max-[899px]:whitespace-normal">{hero.headingEm}</em>
          ) : null}
        </h1>
      </div>
    </section>
  );
}
