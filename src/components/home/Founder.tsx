"use client";

import ImagePlaceholder from "@/components/ImagePlaceholder";
import { useLang } from "@/components/language/LanguageProvider";
import { sectionPadding, wrap } from "@/lib/utils";

export default function Founder() {
  const { t } = useLang();
  const founder = t.founder;

  return (
    <section className={sectionPadding} aria-labelledby="founder-heading">
      <div className={`${wrap} grid items-center gap-16 lg:grid-cols-[0.85fr_1.15fr]`}>
        <ImagePlaceholder
          className="aspect-[4/5] rounded-md"
          tone="green"
          label={founder.photoLabel}
          subLabel="[Placeholder — replace with photograph]"
        />
        <div>
          <p className="mb-2.5 text-[13.5px] font-bold uppercase tracking-[0.04em] text-gold">
            {founder.role}
          </p>
          <h2 id="founder-heading" className="font-display text-[clamp(26px,3vw,36px)] font-bold">
            {founder.name}
          </h2>
          <blockquote className="my-[26px] border-s-[3px] border-gold ps-5 font-display text-[19px] font-medium leading-relaxed">
            {founder.quote}
          </blockquote>
          {founder.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mb-4 text-[16px] text-muted last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
