"use client";

import Link from "next/link";
import { useLang } from "@/components/language/LanguageProvider";
import { sectionPadding, wrap } from "@/lib/utils";

export default function Programs() {
  const { t, dir, lang } = useLang();
  const isUrdu = lang === "ur";
  const programs = t.programs;

  return (
    <section id="programs" className={`${sectionPadding} bg-beige`} aria-labelledby="programs-heading">
      <div className={wrap}>
        {/* Section header: gold PROGRAMS badge above, serif heading left,
            "View All Courses →" link right (aligned with the heading) */}
        <div dir={dir} className="mb-12">
          <p className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.06em] text-gold">
            {programs.eyebrow}
          </p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2
              id="programs-heading"
              className="font-display text-[clamp(28px,3.5vw,46px)] font-normal leading-[1.15] tracking-[-0.02em] text-green"
            >
              {programs.heading}
            </h2>
            <Link
              href="/courses"
              className="group inline-flex items-center gap-2 text-[13px] font-semibold text-green underline-offset-4 transition-colors hover:text-gold hover:underline"
            >
              {programs.viewAll}
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* 2×2 card grid (reference: repeat(2, 1fr)); stretch keeps the
            two cards in each row equal height despite different list lengths */}
        <div
          dir={dir}
          className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2"
        >
          {programs.cards.map((card) => (
            <article
              key={card.n}
              className={`flex flex-col bg-ivory px-9 py-10 ${isUrdu ? "text-right font-urdu" : ""}`}
            >
              {/* Card header: gold Fraunces number + serif title */}
              <div className="flex items-baseline gap-4">
                <span className="font-display text-[20px] font-bold text-gold">
                  {card.n}
                </span>
                <h3 className="font-display text-2xl font-semibold text-green">
                  {card.title}
                </h3>
              </div>

              {/* List: 14px/1.8 items with 4px gold square bullets */}
              <ul className="mt-6 list-none space-y-[9px] p-0 m-0">
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-[14px] leading-[1.8] text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 shrink-0 bg-gold"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Card footer: Learn More → pinned to the card bottom */}
              <div className="mt-auto border-t border-green/10 pt-5">
                <Link
                  href="/courses"
                  className="group inline-flex items-center gap-2 text-[14px] font-semibold text-green underline-offset-4 transition-colors hover:text-gold hover:underline"
                >
                  {programs.learnMore}
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
