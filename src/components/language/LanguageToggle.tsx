"use client";

import { LANG_LABELS, type Lang } from "@/lib/i18n";
import { useLang } from "./LanguageProvider";

/**
 * Inline "EN | اردو" switcher for the light (ivory) header and mobile drawer.
 * Both languages are always visible; the active one gets a filled green chip.
 * aria-pressed marks the active language for assistive tech.
 */
export function LanguageToggleInline({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();

  const button = (target: Lang, label: string) => {
    const active = lang === target;
    return (
      <button
        type="button"
        onClick={() => setLang(target)}
        aria-pressed={active}
        className={`inline-flex items-center justify-center rounded-[2px] px-2.5 py-1 transition-colors duration-200 ${
          active
            ? "bg-green text-ivory"
            : "bg-transparent text-ink/55 hover:text-ink"
        } ${
          target === "ur"
            ? "font-urdu text-[14px] leading-none"
            : "text-[12px] font-bold tracking-[0.08em]"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-[3px] border border-green/30 bg-ivory p-0.5 ${className}`}
      role="group"
      aria-label="Switch language"
    >
      {button("en", LANG_LABELS.en)}
      <span aria-hidden="true" className="h-3.5 w-px bg-green/20" />
      {button("ur", LANG_LABELS.ur)}
    </div>
  );
}

/**
 * Floating fallback button for pages whose headers don't include the inline
 * switcher. Bottom-left in LTR, bottom-right in RTL (logical inset).
 */
export function LanguageToggleFloating() {
  const { lang, toggle } = useLang();

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed bottom-5 end-auto start-5 z-50 inline-flex items-center gap-2 rounded-[3px] border border-gold/40 bg-green px-4 py-2.5 text-[13px] font-semibold text-ivory shadow-lg transition-colors duration-200 hover:border-gold hover:bg-green-dark"
      aria-label={lang === "en" ? "Switch to Urdu" : "انگریزی میں دیکھیں"}
    >
      <span aria-hidden="true" className="text-gold">
        ⌘
      </span>
      {lang === "en" ? "اردو" : "English"}
    </button>
  );
}
