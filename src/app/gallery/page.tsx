import type { Metadata } from "next";
import GalleryContent from "@/components/gallery/GalleryContent";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A glimpse of life at Madina-Tul-Ilm Islamic College — campus life, mehfils, competitions, celebrations and institutional moments.",
};

export default function GalleryPage() {
  return <GalleryContent />;
}
