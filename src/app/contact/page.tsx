import type { Metadata } from "next";
import ContactContent from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Madina-Tul-Ilm Islamic College — message us on WhatsApp, visit us in Bahadurabad, Karachi, or follow us on Facebook and Instagram.",
};

export default function ContactPage() {
  return <ContactContent />;
}
