"use client";

import { useState, type FormEvent } from "react";
import { CONTACT_INFO } from "@/lib/data";
import { useLang } from "@/components/language/LanguageProvider";

export default function WhatsAppForm() {
  const { t } = useLang();
  const form = t.pages.contact.form;
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedMessage = message.trim();
    if (!name.trim()) {
      setError(form.errors.name);
      return;
    }
    if (!trimmedMessage) {
      setError(form.errors.message);
      return;
    }
    setError("");
    const text = `Assalamu A'laikum, my name is ${name.trim()}. ${trimmedMessage}`;
    window.open(
      `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md border border-[var(--line)] bg-ivory p-8 md:p-10"
    >
      <h2 className="font-display text-[24px] font-semibold">{form.heading}</h2>
      <p className="mt-2 text-[14.5px] text-muted">
        {form.sub}
      </p>

      <div className="mt-8 space-y-5">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-[13px] font-bold text-ink">
            {form.nameLabel}
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-[3px] border border-[var(--line)] bg-ivory px-4 py-3 text-[15px] text-ink placeholder:text-muted focus:border-green focus:outline-none"
            placeholder={form.namePlaceholder}
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-2 block text-[13px] font-bold text-ink">
            {form.messageLabel}
          </label>
          <textarea
            id="contact-message"
            required
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="w-full resize-y rounded-[3px] border border-[var(--line)] bg-ivory px-4 py-3 text-[15px] text-ink placeholder:text-muted focus:border-green focus:outline-none"
            placeholder={form.messagePlaceholder}
          />
        </div>

        {error ? (
          <p role="alert" className="text-[14px] font-semibold text-[#9d2c22]">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-[3px] border-[1.5px] border-transparent bg-green px-6 py-3.5 text-[13px] font-semibold text-ivory transition-colors hover:bg-green-dark sm:w-auto"
        >
          {form.submit}
        </button>
      </div>
    </form>
  );
}
