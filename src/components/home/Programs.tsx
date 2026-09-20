"use client";

import Link from "next/link";
import { useLang } from "@/components/language/LanguageProvider";
import { sectionPadding, wrap } from "@/lib/utils";

export default function Programs() {
  const { t, dir, lang } = useLang();
  const isUrdu = lang === "ur";
  const programs = t.programs;

  return (
    <section id="programs" className={sectionPadding} aria-labelledby="programs-heading">
      <div className={wrap}>
        {/* Section header: serif title left, "View All Courses →" link right */}
        <div dir={dir} className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2
            id="programs-heading"
            className="font-display text-[clamp(28px,3.5vw,46px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink"
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

        {/* 2×2 card grid */}
        <div
          dir={dir}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {programs.cards.map((card) => (
            <article
              key={card.n}
              className={`bg-[#F9F7F2] p-8 md:p-10 ${isUrdu ? "text-right font-urdu" : ""}`}
            >
              {/* Card header: muted gold number + serif title */}
              <div className="flex items-baseline gap-4">
                <span className="text-[15px] font-bold tracking-[0.08em] text-[#C5A265]">
                  {card.n}
                </span>
                <h3 className="font-display text-2xl font-semibold text-stone-900">
                  {card.title}
                </h3>
              </div>

              {/* Bulleted list with small gold square bullets */}
              <ul className="mt-6 list-none space-y-3.5 p-0 m-0">
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-[15.5px] text-stone-600"
                  >
                    <span
                      aria-hidden="true"
                      className="h-[7px] w-[7px] shrink-0 bg-[#C5A265]"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Card footer: Learn More → */}
              <div className="mt-8 border-t border-stone-900/10 pt-5">
                <Link
                  href="/courses"
                  className="group inline-flex items-center gap-2 text-[14px] font-semibold text-stone-900 underline-offset-4 transition-colors hover:text-[#C5A265] hover:underline"
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
