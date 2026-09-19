"use client";

import AboutHeading from "@/components/about/AboutHeading";
import { useLang } from "@/components/language/LanguageProvider";

export default function HistoryTimeline() {
  const { t, lang } = useLang();
  const { history } = t.pages.about;
  return (
    <section className="bg-beige py-24" aria-labelledby="history-heading">
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <AboutHeading eyebrow={history.eyebrow} title={history.title} id="history-heading" />
        <div>
          {history.entries.map((entry, index) => {
            const isLast = index === history.entries.length - 1;
            return (
              <article
                key={`${entry.year}-${entry.title}`}
                className={`grid grid-cols-1 gap-y-2 min-[601px]:grid-cols-[100px_1px_1fr] min-[601px]:gap-x-5 min-[901px]:grid-cols-[180px_1px_1fr] min-[901px]:gap-x-10 ${
                  isLast ? "" : "pb-12"
                }`}
              >
                {/* Years stay Latin numerals; text alignment flips via text-start/text-end */}
                <div className="pt-1 text-start font-display text-[22px] font-normal tracking-[-0.01em] text-green min-[601px]:text-end">
                  {entry.year}
                </div>
                <div className="hidden flex-col items-center min-[601px]:flex">
                  <span className="mt-2 h-[9px] w-[9px] shrink-0 rounded-full bg-gold" />
                  {!isLast && <span className="mt-2 w-px flex-1 bg-[rgba(31,58,46,0.15)]" />}
                </div>
                <div className="pt-0.5">
                  <h3 className="mb-2.5 text-[16px] font-bold text-ink">{entry.title}</h3>
                  <p className="text-[15px] leading-[1.7] text-muted">{entry.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
