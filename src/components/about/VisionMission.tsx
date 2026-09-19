"use client";

import { useLang } from "@/components/language/LanguageProvider";

export default function VisionMission() {
  const { t } = useLang();
  const { visionMission } = t.pages.about;
  return (
    <section className="bg-ivory py-24" aria-label="Vision and Mission">
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <div className="grid gap-px bg-[rgba(31,58,46,0.1)] min-[901px]:grid-cols-2">
          <div className="bg-ivory px-12 py-14">
            <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
              {visionMission.vision.tag}
            </p>
            <p className="font-display text-[clamp(20px,2.5vw,30px)] font-normal leading-[1.4] tracking-[-0.01em] text-ink">
              &quot;{visionMission.vision.quote}&quot;
            </p>
          </div>
          <div className="bg-ivory px-12 py-14">
            <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
              {visionMission.mission.tag}
            </p>
            <p className="font-display text-[clamp(18px,2.2vw,26px)] font-normal leading-[1.5] tracking-[-0.01em] text-ink">
              &quot;{visionMission.mission.quote}&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
