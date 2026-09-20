"use client";

import Button from "@/components/Button";
import { useLang } from "@/components/language/LanguageProvider";
import { wrap } from "@/lib/utils";

function DiamondArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Thin gold diamond ring overlay at 10% opacity per the reference */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 aspect-square w-[min(45%,280px)] -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold/10"
      />
      {/* Centered all-caps placeholder text */}
      <div className="relative z-10 flex flex-col items-center gap-2 px-6 text-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold/70">
          Real Institutional Photograph
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory/40">
          Client Asset Needed
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();
  const hero = t.hero;

  return (
    <section className="relative lg:min-h-[92vh]">
      {/* Desktop: solid forest green art panel bleeds across the right half
          of the viewport (left half in RTL), full section height. The copy
          column below uses the shared container, so its left edge aligns
          with the navbar and every other section. */}
      <div className="absolute inset-y-0 end-0 hidden overflow-hidden bg-green lg:block">
        <DiamondArt />
      </div>

      <div className={`${wrap} relative grid items-stretch gap-10 lg:grid-cols-2`}>
        {/* Text column — aligned to the global container edges */}
        <div className="flex flex-col items-start justify-center py-16 md:py-24 lg:pe-12">
          <p className="mb-8 flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.06em] text-green">
            <span aria-hidden="true" className="inline-block h-[1.5px] w-[22px] bg-gold" />
            {hero.eyebrow}
          </p>
          <h1 className="font-display text-[clamp(38px,4.6vw,68px)] font-light leading-[1.1]">
            {hero.headline}
            {hero.headlineEm ? (
              <>
                <br />
                <em className="text-green">{hero.headlineEm}</em>
              </>
            ) : null}
          </h1>
          <p className="mt-6 max-w-[46ch] text-[19px] text-muted">{hero.lede}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/courses">
              {t.actions.exploreCourses}
              <span aria-hidden="true" className="rtl:rotate-180">→</span>
            </Button>
            <Button href="/admissions" variant="outline">
              {t.actions.enrollNow}
            </Button>
          </div>
          <div className="mt-9 inline-flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-ivory px-4 py-[7px] text-[13px] font-bold text-green">
            <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
            {hero.tag}
          </div>
        </div>

        {/* Mobile/tablet: art panel renders as a block below the copy */}
        <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-green md:min-h-[560px] lg:hidden">
          <DiamondArt />
        </div>
      </div>
    </section>
  );
}
