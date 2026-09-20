"use client";

import Link from "next/link";
import { useLang } from "@/components/language/LanguageProvider";
import { wrap } from "@/lib/utils";

export default function AboutIntro() {
  const { t, dir, lang } = useLang();
  const isUrdu = lang === "ur";
  const who = t.who;

  return (
    <section id="about" aria-labelledby="about-heading" className="bg-beige">
      <div className={wrap}>
        {/* Two-column grid: copy left, stats right — stacks on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 md:py-28">
          {/* Left column — text content */}
          <div dir={dir}>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#C5A265]">
              {who.eyebrow}
            </p>
            <h2
              id="about-heading"
              className={`font-display text-4xl lg:text-5xl text-[#1B362A] ${
                isUrdu ? "font-normal" : "font-medium"
              } leading-[1.15] tracking-[-0.02em]`}
            >
              {who.title}
              {who.titleLine2 ? (
                <>
                  <br />
                  {who.titleLine2}
                </>
              ) : null}
              <br />
              <em className="font-normal text-green">{who.titleEm}</em>
            </h2>
            {who.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="mt-6 max-w-xl text-base leading-relaxed text-stone-600"
              >
                {paragraph}
              </p>
            ))}
            <Link
              href="/about"
              className="group mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-[#1B362A] underline-offset-4 transition-colors duration-200 hover:text-[#C5A265] hover:underline"
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
                className="transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Right column — 2x2 stats grid separated by 1px green/10 lines.
              Drawn per-cell (inline-start on column 2, top on row 2) instead
              of divide-x/y, which would paint stray outer edges; logical
              `border-s` flips automatically in RTL. */}
          <div dir={dir} className="grid grid-cols-2">
            {who.stats.map((item, i) => (
              <div
                key={item.label}
                className={`flex flex-col items-start p-7 md:p-8 lg:p-10 ${
                  i % 2 === 1 ? "border-s border-green/10" : ""
                } ${i > 1 ? "border-t border-green/10" : ""}`}
              >
                <div className="font-display text-[40px] font-medium leading-tight text-[#1B362A]">
                  {item.value}
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">
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
