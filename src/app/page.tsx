import Hero from "@/components/home/Hero";
import AboutIntro from "@/components/home/AboutIntro";
import Why from "@/components/home/Why";
import Programs from "@/components/home/Programs";
import DarsNizami from "@/components/home/DarsNizami";
import Philosophy from "@/components/home/Philosophy";
import Journey from "@/components/home/Journey";
import Founder from "@/components/home/Founder";
import GalleryPreview from "@/components/home/GalleryPreview";
import FinalCta from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <Why />
      <Programs />
      <DarsNizami />
      <Philosophy />
      <Journey />
      <Founder />
      <GalleryPreview />
      <FinalCta />
    </>
  );
}