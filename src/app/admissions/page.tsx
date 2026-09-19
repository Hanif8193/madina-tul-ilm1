import type { Metadata } from "next";
import AdmissionsContent from "@/components/admissions/AdmissionsContent";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Admissions and course schedule for Madina-Tul-Ilm Islamic College — Nazra, Hifz, Dars-e-Nizami, Tafseer, Arabic and more.",
};

export default function AdmissionsPage() {
  return <AdmissionsContent />;
}
