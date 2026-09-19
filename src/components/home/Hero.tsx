"use client";

import Button from "@/components/Button";
import { useLang } from "@/components/language/LanguageProvider";
import { wrap } from "@/lib/utils";

function HeroArt() {
  return (
    <div className="relative mx-auto max-w-[520px] overflow-hidden rounded-sm bg-gradient-to-b from-green to-green-dark aspect-[10/11] flex items-center justify-center">
      <svg
        className="w-[88%] h-auto pointer-events-none"
        viewBox="0 0 520 560"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hero-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1F3A2E" />
            <stop offset="100%" stopColor="#152A22" />
          </linearGradient>
        </defs>
        <rect width="520" height="560" fill="none" />
        <g stroke="#D6B45C" strokeWidth="1" opacity="0.35">
          <line x1="40" y1="80" x2="480" y2="80" />
          <line x1="40" y1="120" x2="480" y2="120" />
          <line x1="40" y1="160" x2="480" y2="160" />
        </g>
        <path d="M110 520 V300 C110 210 180 150 260 150 C340 150 410 210 410 300 V520" fill="none" stroke="#F7F4EC" strokeWidth="3" opacity="0.3" />
        <path d="M150 520 V310 C150 240 197 190 260 190 C323 190 370 240 370 310 V520" fill="none" stroke="#D6B45C" strokeWidth="2" />
        <g stroke="#D6B45C" strokeWidth="1.4" fill="none" opacity="0.8">
          <path d="M260 150 C255 130 265 118 260 100" />
          <circle cx="260" cy="96" r="4" fill="#D6B45C" stroke="none" />
        </g>
        <g stroke="#F7F4EC" strokeWidth="1" opacity="0.2">
          <line x1="40" y1="520" x2="480" y2="520" />
        </g>
        <text x="260" y="470" textAnchor="middle" fontFamily="Georgia, serif" fontSize="72" fontWeight="700" fill="#F7F4EC" opacity="0.9">10</text>
        <text x="260" y="498" textAnchor="middle" fontFamily="sans-serif" fontSize="14" fontWeight="700" letterSpacing="2" fill="#68736D">YEARS OF TARBIYAH</text>
      </svg>
      <span className="absolute bottom-4 right-4 rounded bg-green-dark/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ivory/55 backdrop-blur-sm">
        Replace with photograph
      </span>
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();
  const hero = t.hero;

  return (
    <section className="relative pt-14 pb-20 md:pt-[72px] md:pb-24">
      <div className={`${wrap} grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]`}>
        <div className="flex flex-col items-start">
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
          <p className="mt-6 max-w-[46ch] text-[19px] text-muted">
            {hero.lede}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/courses">{t.actions.exploreCourses}</Button>
            <Button href="/admissions" variant="dark" className="px-6 py-2! self-center">
              {t.actions.enrollNow}
            </Button>
          </div>
          <div className="mt-9 inline-flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-ivory px-4 py-[7px] text-[13px] font-bold text-green">
            <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
            {hero.tag}
          </div>
        </div>
        <HeroArt />
      </div>
    </section>
  );
}
