"use client";

import PageHeader from "@/components/PageHeader";
import { useLang } from "@/components/language/LanguageProvider";
import { sectionPadding, wrap } from "@/lib/utils";

export default function GalleryContent() {
  const { t } = useLang();
  const gallery = t.pages.gallery;

  return (
    <>
      <PageHeader
        eyebrow={gallery.eyebrow}
        title={gallery.title}
        description={gallery.description}
      />
      <section className={`bg-beige ${sectionPadding}`}>
        <div className={wrap}>
          <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.tiles.map((tile) => (
              <figure
                key={tile.label}
                className="relative m-0 flex aspect-square flex-col justify-end overflow-hidden bg-beige p-5"
              >
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full opacity-55"
                  viewBox="0 0 200 200"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                >
                  <rect width="200" height="200" fill="#1F3A2E" opacity="0.08" />
                  <g stroke="#1F3A2E" strokeWidth="0.6" fill="none" opacity="0.5">
                    <path d="M60 180 V120 C60 86 78 62 100 62 C122 62 140 86 140 120 V180" />
                    <circle cx="100" cy="44" r="7" />
                  </g>
                </svg>
                <figcaption className="relative">
                  <span className="block text-[14.5px] font-bold text-ink">{tile.label}</span>
                  {tile.sub ? (
                    <span className="mt-[3px] block text-[12px] text-muted">{tile.sub}</span>
                  ) : null}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-5 text-[13.5px] text-muted">{gallery.note}</p>
        </div>
      </section>
    </>
  );
}
