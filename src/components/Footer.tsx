"use client";

import Image from "next/image";
import Link from "next/link";
import { CONTACT_INFO } from "@/lib/data";
import { useLang } from "@/components/language/LanguageProvider";
import logoImg from "../../public/Logo.png";

const FOOTER_NAV = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/courses", key: "courses" },
  { href: "/admissions", key: "admissions" },
  { href: "/gallery", key: "gallery" },
  { href: "/contact", key: "contact" },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();
  const { t, dir, lang } = useLang();
  const isUrdu = lang === "ur";

  // 3-column footer per the reference: brand+description+social, navigation,
  // contact info. Copyright bar: © year · brand · EST. 2016.
  return (
    <footer className="bg-green-dark text-ivory/80 pt-20 pb-8">
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: logo, description, social links */}
          <div dir={dir}>
            <Link href="/" aria-label="Madina-Tul-Ilm Islamic College — Home" className="inline-block">
              <Image
                src={logoImg}
                alt="Madina-Tul-Ilm Logo"
                className="h-12 w-auto brightness-0 invert md:h-14"
              />
            </Link>
            <p className={`mt-[18px] max-w-[34ch] text-[14.5px] text-ivory/60 ${isUrdu ? "font-urdu" : ""}`}>
              {t.footer.about}
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href={CONTACT_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-semibold uppercase tracking-[0.1em] text-ivory/75 transition-colors hover:text-gold-light"
              >
                {t.footer.facebook}
              </a>
              <a
                href={CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-semibold uppercase tracking-[0.1em] text-ivory/75 transition-colors hover:text-gold-light"
              >
                {t.footer.instagram}
              </a>
            </div>
          </div>

          {/* Column 2: navigation */}
          <div dir={dir}>
            <h5 className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.05em] text-ivory/50">
              {t.footer.navigate}
            </h5>
            <ul className="flex list-none flex-col gap-3 p-0 m-0">
              {FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14.5px] text-ivory/85 transition-colors hover:text-gold-light"
                  >
                    {t.nav[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: contact info */}
          <div dir={dir}>
            <h5 className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.05em] text-ivory/50">
              {t.footer.contact}
            </h5>
            <ul className="flex list-none flex-col gap-3 p-0 m-0">
              <li>
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14.5px] text-ivory/85 transition-colors hover:text-gold-light"
                >
                  {t.footer.whatsappLabel}
                </a>
              </li>
              <li className="text-[14.5px] text-ivory/75">{CONTACT_INFO.location}</li>
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-[14.5px] text-ivory/85 transition-colors hover:text-gold-light"
                  dir="ltr"
                  style={{ unicodeBidi: "isolate" }}
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-ivory/14 pt-6">
          <span className="text-[13px] text-ivory/50">
            © {year} Madina-Tul-Ilm Islamic College. {t.footer.copyright}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold/70">
            EST. 2016
          </span>
        </div>
      </div>
    </footer>
  );
}
