"use client";

import { useLang } from "@/components/language/LanguageProvider";
import { wrap } from "@/lib/utils";

// Content reproduced exactly from the original contact.html source.
const WHATSAPP_URL = "https://wa.me/923133502333";
const FACEBOOK_URL = "https://m.facebook.com/Madinatulilmislamicacademy";
const INSTAGRAM_URL = "https://www.instagram.com/madinatulilmislamiccollege";
const MAPS_URL = "https://maps.google.com/?q=Bahadurabad,Karachi";

const WhatsAppIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);

// Embedded Google Maps URL for the campus address (Bahadurabad, Karachi).
const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=House%20238%20Block-3%20Street%2013%20Bahadurabad%20Karachi&t=&z=16&ie=UTF8&iwloc=&output=embed";

export default function ContactContent() {
  const { t } = useLang();
  const contact = t.pages.contact;

  const contactCards = [
    { key: "whatsapp", icon: <WhatsAppIcon />, label: contact.cards[0].label, value: contact.cards[0].value, href: WHATSAPP_URL },
    { key: "facebook", icon: <FacebookIcon />, label: contact.cards[1].label, value: contact.cards[1].value, href: FACEBOOK_URL },
    { key: "instagram", icon: <InstagramIcon />, label: contact.cards[2].label, value: contact.cards[2].value, href: INSTAGRAM_URL },
    { key: "email", icon: <EmailIcon />, label: contact.cards[3].label, value: contact.cards[3].value, href: `mailto:${"madinatulilm.edu.pk@gmail.com"}` },
  ];

  return (
    <>
      {/* ---------- HERO ---------- (contact.html .contact-hero) */}
      <section className="relative overflow-hidden bg-green px-6 pb-24 pt-[76px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-[100px] -end-[80px] h-[420px] w-[420px] rounded-full border border-gold/[0.07]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-[60px] -end-[40px] h-[280px] w-[280px] rounded-full border border-gold/[0.05]"
        />
        <div className={`relative z-[1] ${wrap} pt-16`}>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-gold/80">
            {contact.hero.eyebrow}
          </p>
          <h1 className="max-w-[680px] font-display text-[clamp(36px,5.5vw,72px)] font-normal leading-[1.05] tracking-[-0.03em] text-ivory">
            {contact.hero.heading}
            {contact.hero.headingEm ? (
              <>
                <br />
                <em className="text-gold">{contact.hero.headingEm}</em>
              </>
            ) : null}
          </h1>
        </div>
      </section>

      {/* ---------- CONTACT CHANNELS ---------- (contact.html .three-col + .whatsapp-banner) */}
      <section className="bg-ivory px-6 py-24">
        <div className={wrap}>
          <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
            {contact.channelsEyebrow}
          </div>
          <h2 className="mb-12 font-display text-[clamp(26px,3vw,42px)] font-normal leading-[1.15] tracking-[-0.02em]">
            {contact.channelsTitle}
          </h2>

          <div className="mb-12 grid grid-cols-1 gap-4 min-[901px]:grid-cols-3">
            {contactCards.map((card) => (
              <a
                key={card.key}
                href={card.href}
                target={card.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={card.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="flex h-full flex-col gap-3 border-t-[3px] border-t-transparent bg-beige p-8 transition-colors duration-200 hover:border-t-gold hover:bg-[#E4DFD4]"
              >
                <span className="text-green">{card.icon}</span>
                <span>
                  <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
                    {card.label}
                  </span>
                  <span className="block text-[15px] font-medium leading-[1.5] break-words text-ink">
                    {card.value}
                  </span>
                </span>
              </a>
            ))}
          </div>

          {/* WhatsApp callout banner (contact.html .whatsapp-banner) */}
          <div className="flex flex-wrap items-center justify-between gap-6 bg-green p-12 max-[600px]:p-8 max-[600px]:px-6">
            <div>
              <div className="mb-2 font-display text-[clamp(20px,2.5vw,30px)] font-normal leading-[1.2] tracking-[-0.01em] text-ivory">
                {contact.banner.heading}
              </div>
              <div className="text-[15px] leading-[1.6] text-beige/65">
                {contact.banner.sub}
              </div>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2.5 bg-gold px-8 py-[15px] text-[14px] font-bold tracking-[0.02em] text-green transition-colors duration-200 hover:bg-gold-light"
            >
              <WhatsAppIcon size={18} />
              {contact.banner.cta}
            </a>
          </div>
        </div>
      </section>

      {/* ---------- LOCATION ---------- (contact.html .two-col + .map-box) */}
      <section className="bg-beige px-6 py-24">
        <div className={`${wrap} grid grid-cols-1 items-start gap-10 min-[901px]:grid-cols-2 min-[901px]:gap-20`}>
          <div>
            <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
              {contact.find.eyebrow}
            </div>
            <h2 className="mb-8 font-display text-[clamp(26px,3vw,42px)] font-normal leading-[1.15] tracking-[-0.02em]">
              {contact.find.title}
            </h2>

            <div className="mb-8">
              <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
                {contact.find.addressLabel}
              </div>
              <address className="text-[16px] not-italic leading-[1.8] text-ink">
                {contact.find.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>

            <div className="mb-8">
              <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
                {contact.find.landmarksLabel}
              </div>
              <div className="text-[14px] leading-[1.7] text-muted">
                {contact.find.landmarks}
              </div>
            </div>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 border border-green/30 px-6 py-3 text-[13px] font-semibold text-green transition-colors duration-200 hover:border-green"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {contact.find.mapsLink}
            </a>
          </div>

          {/* Live Google Maps embed (replaces the styled .map-box placeholder) */}
          <div className="aspect-[4/3] h-full min-h-[350px] w-full rounded-none border border-[#1F3A2E]/20 shadow-sm">
            <iframe
              src={MAPS_EMBED_URL}
              title="Madina-Tul-Ilm Islamic College — Bahadurabad, Karachi"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          </div>
        </div>
      </section>
    </>
  );
}
