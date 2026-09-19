"use client";

import SectionHeading from "@/components/SectionHeading";
import AdmissionsTable from "@/components/AdmissionsTable";
import { useLang } from "@/components/language/LanguageProvider";
import { sectionPadding, wrap } from "@/lib/utils";

export default function Admissions() {
  const { t } = useLang();
  const schedule = t.schedule;

  return (
    <section id="admissions" className={sectionPadding} aria-labelledby="admissions-heading">
      <div className={wrap}>
        <SectionHeading
          eyebrow={schedule.eyebrow}
          title={schedule.title}
          description={schedule.note}
          id="admissions-heading"
        />
        <AdmissionsTable />
      </div>
    </section>
  );
}
