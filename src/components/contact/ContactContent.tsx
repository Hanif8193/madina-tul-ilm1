"use client";

import PageHeader from "@/components/PageHeader";
import WhatsAppForm from "@/components/contact/WhatsAppForm";
import { CONTACT_INFO } from "@/lib/data";
import { useLang } from "@/components/language/LanguageProvider";
import { sectionPadding, wrap } from "@/lib/utils";

export default function ContactContent() {
  const { t } = useLang();
  const contact = t.pages.contact;

  const cards = [
    {
      key: "whatsapp",
      title: contact.cards[0].title,
      body: CONTACT_INFO.whatsappLabel,
      detail: contact.cards[0].detail,
      href: CONTACT_INFO.whatsappUrl,
      external: true,
    },
    {
      key: "location",
      title: contact.cards[1].title,
      body: CONTACT_INFO.location,
      detail: contact.cards[1].detail,
      href: undefined,
      external: false,
    },
    {
      key: "follow",
      title: contact.cards[2].title,
      body: "Facebook & Instagram",
      detail: contact.cards[2].detail,
      href: CONTACT_INFO.facebookUrl,
      external: true,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={contact.eyebrow}
        title={contact.title}
        description={contact.description}
      />

      <section className={sectionPadding} aria-label="Contact details and message form">
        <div className={`${wrap} grid gap-12 lg:grid-cols-[0.9fr_1.1fr]`}>
          <div className="flex flex-col gap-6">
            {cards.map((card) => {
              const content = (
                <>
                  <h2 className="font-display text-[20px] font-semibold">{card.title}</h2>
                  <p className="mt-1 text-[16px] font-bold text-green">{card.body}</p>
                  {card.detail ? (
                    <p className="mt-1 text-[14.5px] text-muted">{card.detail}</p>
                  ) : null}
                </>
              );
              return card.href ? (
                <a
                  key={card.key}
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  className="block rounded-md border border-[var(--line)] bg-beige/60 p-7 transition-colors hover:border-green md:p-8"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={card.key}
                  className="rounded-md border border-[var(--line)] bg-beige/60 p-7 md:p-8"
                >
                  {content}
                </div>
              );
            })}

            <a
              href={CONTACT_INFO.instagramUrl}
              className="block text-[14.5px] font-bold text-green underline decoration-gold underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.instagramLink}
            </a>
          </div>

          <WhatsAppForm />
        </div>
      </section>
    </>
  );
}
