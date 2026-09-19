"use client";

import AboutHeading from "@/components/about/AboutHeading";
import AboutPlaceholder from "@/components/about/AboutPlaceholder";
import { useLang } from "@/components/language/LanguageProvider";

export default function WhoWeAre() {
  const { t } = useLang();
  const { who } = t.pages.about;
  return (
    <section className="bg-ivory py-24" aria-labelledby="who-we-are-heading">
      <div className="mx-auto grid w-full max-w-[1240px] items-start gap-10 px-6 min-[901px]:grid-cols-2 min-[901px]:gap-20">
        <div>
          <AboutHeading
            eyebrow={who.eyebrow}
            id="who-we-are-heading"
            titleMargin="mb-8"
            title={
              <>
                {who.heading}
                <br />
                {who.headingTwo}
              </>
            }
          />
          {who.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mb-5 text-[16px] leading-[1.8] text-muted last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
        <AboutPlaceholder
          className="aspect-[3/4]"
          label={who.photo.label}
          subLabel={who.photo.subLabel}
        />
      </div>
    </section>
  );
}
