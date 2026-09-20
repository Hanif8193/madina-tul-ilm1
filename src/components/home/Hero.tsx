"use client";

import Button from "@/components/Button";
import { useLang } from "@/components/language/LanguageProvider";
import { wrap } from "@/lib/utils";

function HeroArt() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#1B362A]">
      {/* Thin golden diamond (rotated square) outline centered in the panel.
          Sized so its 45°-rotated bounding box (≈1.41× width) stays inside
          the container at every breakpoint. */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 aspect-square w-[min(45%,280px)] -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold/60"
      />

      {/* Centered all-caps placeholder text inside the diamond */}
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
    <section className="relative">
      {/* True 50/50 split on desktop: no gap, art cell bleeds flush to the
          right screen edge. Text cell padding provides the gutter. */}
      <div className="grid items-stretch lg:grid-cols-2">
        <div
          className={`${wrap} flex flex-col items-start justify-center py-16 md:py-24 lg:pe-12`}
        >
          <p className="mb-8 flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.06em] text-green">
            <span aria-hidden="true" className="inline-block h-[1.5px] w-[22px] bg-gold" />
            {hero.eyebrow}
          </p>
          <h1 className="font-display text-[clamp(38px,5vw,64px)] font-light leading-[1.05]">
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
            <Button href="/courses">{t.actions.exploreCourses}</Button>
            <Button href="/admissions" variant="outline">
              {t.actions.enrollNow}
            </Button>
          </div>
          <div className="mt-9 inline-flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-ivory px-4 py-[7px] text-[13px] font-bold text-green">
            <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
            {hero.tag}
          </div>
        </div>

        {/* Right half: solid dark forest green, full height, flush to the
            right screen edge on desktop (left half in RTL). */}
        <div className="relative min-h-[420px] md:min-h-[560px] lg:min-h-[600px]">
          <HeroArt />
        </div>
      </div>
    </section>
  );
}
