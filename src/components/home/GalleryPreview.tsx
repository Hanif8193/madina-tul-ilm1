"use client";

import { useLang } from "@/components/language/LanguageProvider";
import { wrap } from "@/lib/utils";

export default function GalleryPreview() {
  const { t, dir } = useLang();
  const gallery = t.gallery;

  return (
    <section
      className="bg-beige py-20 md:py-28"
      id="gallery"
      aria-labelledby="gallery-heading"
    >
      <div className={wrap}>
        {/* Section header — top padding comes from the section's py-20
            (80px), keeping the heading clear of the fixed header; the
            shared wrap aligns edges with the navbar/hero above. */}
        <div className="mb-10" dir={dir}>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
            {gallery.eyebrow}
          </p>
          <h2
            id="gallery-heading"
            className="mb-2 font-display text-4xl font-normal leading-[1.15] tracking-[-0.02em] text-ink lg:text-5xl"
          >
            {gallery.title}
          </h2>
          <p className="text-[14px] text-muted">{gallery.subtitle}</p>
        </div>

        {/* 3-column asymmetric grid (reference: 1.2fr 1fr 1fr) with a tight
            uniform 16px gap. Card 1 "Campus Life" spans rows 1–2 in column
            1; Mehfli/Competition/Celebration/Campus—Jamia fill the 2x2.
            Tile aspect ratios define row heights, and the spanning card
            stretches across both rows, so all bottom edges align. Mobile:
            single column stack. */}
        <div dir={dir} className="grid grid-cols-1 gap-4 md:grid-cols-[1.2fr_1fr_1fr]">
          {/* Card 1 — spans 2 rows vertically (grid-row: 1 / 3) */}
          <div className="flex min-h-[320px] flex-col items-center justify-center bg-green p-6 text-center md:min-h-0 md:row-span-2">
            <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">
              {gallery.featureLabel}
            </div>
            <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.1em] text-gold/60">
              {gallery.photoNeeded}
            </div>
          </div>

          {/* Cards 2–5 — the remaining 2x2 grid spaces */}
          {gallery.tiles.map((label) => (
            <div
              key={label}
              className="flex aspect-[4/3] flex-col items-center justify-center bg-green-dark p-6 text-center"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">
                {label}
              </div>
              <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.1em] text-gold/60">
                {gallery.photoNeeded}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
