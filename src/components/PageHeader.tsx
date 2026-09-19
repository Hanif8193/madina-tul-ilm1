"use client";

import { sectionPadding, wrap } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className={`bg-beige ${sectionPadding}`}>
      <div className={wrap}>
        <p className="mb-[18px] flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.06em] text-green">
          <span aria-hidden="true" className="inline-block h-[1.5px] w-[22px] bg-gold" />
          {eyebrow}
        </p>
        <h1 className="max-w-[16ch] font-display text-[clamp(34px,5vw,54px)] font-normal leading-[1.08]">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-[56ch] text-[17px] text-muted">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
