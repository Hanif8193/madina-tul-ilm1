"use client";

import AboutHeading from "@/components/about/AboutHeading";
import AboutPlaceholder from "@/components/about/AboutPlaceholder";
import { useLang } from "@/components/language/LanguageProvider";

export default function Leadership() {
  const { t } = useLang();
  const { leadership } = t.pages.about;
  return (
    <section className="bg-beige py-24" aria-labelledby="leadership-heading">
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <AboutHeading eyebrow={leadership.eyebrow} title={leadership.title} id="leadership-heading" />
        <div className="grid items-start gap-8 min-[901px]:grid-cols-[280px_1fr] min-[901px]:gap-16">
          <div>
            <AboutPlaceholder
              className="aspect-[3/4] max-w-[280px] min-[901px]:max-w-none"
              cornerSize={24}
              cornerOffset={16}
              label={leadership.photo.label}
              subLabel={leadership.photo.subLabel}
            />
            <div className="mt-5">
              <div className="mb-1 font-display text-[26px] font-medium text-ink">{leadership.name}</div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
                {leadership.role}
              </div>
            </div>
          </div>
          <div className="pt-4">
            <p className="mb-6 text-[17px] font-normal leading-[1.8] text-muted">
              &quot;{leadership.quote}&quot;
            </p>
            {leadership.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mb-6 text-[16px] leading-[1.8] text-muted last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
