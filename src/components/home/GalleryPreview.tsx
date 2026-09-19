"use client";

import { useLang } from "@/components/language/LanguageProvider";
import { wrap } from "@/lib/utils";

export default function GalleryPreview() {
  const { t } = useLang();
  const gallery = t.gallery;

  return (
    <section className="bg-beige py-20 md:py-28" id="gallery" aria-labelledby="gallery-heading">
      <div className={wrap}>
        {/* Section header */}
        <div className="mb-10">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
            {gallery.eyebrow}
          </p>
          <h2
            id="gallery-heading"
            className="mb-2 font-display text-4xl font-normal leading-[1.15] tracking-[-0.02em] text-ink lg:text-5xl"
          >
            {gallery.title}
          </h2>
          <p className="text-[14px] text-muted">
            {gallery.subtitle}
          </p>
        </div>

        {/* Asymmetrical grid: tall feature card left, 2x2 placeholders right */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
          {/* Left feature card — spans both rows on desktop */}
          <div className="flex min-h-[400px] flex-col items-center justify-center border border-gold/20 bg-green p-6 text-center md:row-span-2 lg:min-h-[500px]">
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold/60">
              {gallery.featureLabel}
            </div>
            <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gold/40">
              {gallery.photoNeeded}
            </div>
          </div>

          {/* Right 2x2 cards */}
          {gallery.tiles.map((label) => (
            <div
              key={label}
              className="flex aspect-[4/3] flex-col items-center justify-center border border-gold/20 bg-green-dark p-6 text-center"
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold/60">
                {label}
              </div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gold/40">
                {gallery.photoNeeded}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
