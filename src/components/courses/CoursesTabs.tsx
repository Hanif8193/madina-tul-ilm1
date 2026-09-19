"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/language/LanguageProvider";

export default function CoursesTabs() {
  const { t } = useLang();
  const { categories, tabsLabel, enroll } = t.pages.courses;
  const [activeId, setActiveId] = useState<string>(categories[0].id);

  return (
    <>
      {/* Tabs */}
      <section className="bg-ivory px-6">
        <div className="mx-auto w-full max-w-[1240px] border-b border-green/12">
          <div className="flex overflow-x-auto" role="tablist" aria-label={tabsLabel}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                id={`courses-tab-${cat.id}`}
                aria-selected={cat.id === activeId}
                aria-controls={`courses-panel-${cat.id}`}
                onClick={() => setActiveId(cat.id)}
                className={`-mb-px cursor-pointer whitespace-nowrap border-b-2 px-7 py-5 text-[13.5px] transition-colors duration-200 ${
                  cat.id === activeId
                    ? "border-gold font-semibold text-green"
                    : "border-transparent font-medium text-muted"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category panels */}
      {categories.map((cat) => (
        <section
          key={cat.id}
          id={`courses-panel-${cat.id}`}
          role="tabpanel"
          aria-labelledby={`courses-tab-${cat.id}`}
          className={`bg-ivory px-6 py-[72px] ${cat.id === activeId ? "block" : "hidden"}`}
        >
          <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 items-start gap-10 min-[900px]:grid-cols-[1fr_2fr] min-[900px]:gap-20">
            <div>
              <div className="mb-2 font-display text-[64px] font-light leading-none tracking-[-0.03em] text-green/12">
                {cat.n}
              </div>
              <h2 className="mb-5 font-display text-[clamp(24px,3vw,36px)] font-medium leading-[1.2] tracking-[-0.02em]">
                {cat.title}
              </h2>
              <p className="mb-8 text-[15px] leading-[1.7] text-muted">{cat.desc}</p>
              <Link
                href="/admissions"
                className="inline-block bg-green px-6 py-3 text-[13px] font-semibold text-ivory transition-colors duration-200 hover:bg-green-dark"
              >
                {enroll} <span aria-hidden="true" className="rtl:rotate-180">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-px bg-green/10 min-[900px]:grid-cols-2">
              {cat.courses.map((course) => (
                <div
                  key={course.name}
                  className="bg-ivory px-6 py-7 transition-colors duration-200 hover:bg-beige"
                >
                  <div className="mb-2 text-[15px] font-semibold leading-[1.3]">{course.name}</div>
                  <div className="text-[13px] leading-[1.55] text-muted">{course.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
