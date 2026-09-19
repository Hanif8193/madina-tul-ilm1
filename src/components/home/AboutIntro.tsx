"use client";

import Link from "next/link";
import { useLang } from "@/components/language/LanguageProvider";
import { wrap } from "@/lib/utils";

export default function AboutIntro() {
  const { t } = useLang();
  const who = t.who;

  return (
    <section id="about" aria-labelledby="about-heading">
      <div className={wrap}>
        {/* 2-column grid: copy left, stats right — stacks on mobile */}
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16">
          {/* Left column */}
          <div>
            <p className="mb-[18px] text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
              {who.eyebrow}
            </p>
            <h2
              id="about-heading"
              className="font-display text-[clamp(28px,3.4vw,42px)] font-normal leading-[1.15] tracking-[-0.02em]"
            >
              {who.title}
              <br />
              <em className="text-green">{who.titleEm}</em>
            </h2>
            {who.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="mb-4 mt-5 max-w-[56ch] text-[16px] leading-[1.8] text-muted last:mb-0"
              >
                {paragraph}
              </p>
            ))}
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border-b border-green pb-0.5 text-[14px] font-semibold text-green transition-opacity duration-200 hover:opacity-70"
            >
              {who.link}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
                className="rtl:rotate-180"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Right column — 2x2 stats grid with subtle 1px dividers
              (gap-px over a line-colored background, as in the original) */}
          <div className="grid grid-cols-2 gap-px bg-green/10">
            {who.stats.map((item) => (
              <div key={item.label} className="flex flex-col gap-2 bg-beige p-7 md:p-8">
                <div className="font-display text-[40px] font-normal leading-tight tracking-[-0.02em] text-green">
                  {item.value}
                </div>
                <div className="text-[12px] font-semibold uppercase tracking-[0.1em] text-muted">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
