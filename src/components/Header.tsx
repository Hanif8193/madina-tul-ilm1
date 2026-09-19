"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/data";
import Button from "@/components/Button";
import { LanguageToggleInline } from "@/components/language/LanguageToggle";
import { useLang } from "@/components/language/LanguageProvider";
import logoImg from "../../public/Logo.png";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hash, setHash] = useState("");
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    const initialSync = window.setTimeout(onHashChange, 0);
    return () => {
      window.clearTimeout(initialSync);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isActive = (href: string) => {
    if (href.includes("#")) {
      const [path, anchor] = href.split("#");
      return pathname === path && hash === `#${anchor}`;
    }
    return pathname === href;
  };

  const logo = (
    <Link
      href="/"
      aria-label="Madina-Tul-Ilm Islamic College — Home"
      className="shrink-0"
    >
      <Image
        src={logoImg}
        alt="Madina-Tul-Ilm Logo"
        priority
        className="h-8 w-auto md:h-10"
      />
    </Link>
  );

  return (
    <header
      className={`sticky top-0 z-[100] border-b backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "border-[var(--line)] bg-ivory/95 shadow-[0_1px_0_rgba(23,32,28,0.06)]"
          : "border-transparent bg-ivory/95"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-6 px-5 py-4 md:px-8">
        {logo}

        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Primary"
        >
          <ul className="flex list-none gap-6 p-0 m-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`border-b border-transparent pb-[3px] text-[12px] font-bold uppercase tracking-[0.1em] transition-colors ${
                    isActive(link.href)
                      ? "border-gold text-green"
                      : "text-ink hover:text-green"
                  }`}
                >
                  {t.nav[link.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          {/* Language switcher — next to Enroll Now; always visible from md up */}
          <LanguageToggleInline className="hidden md:inline-flex" />
          <Button href="/admissions" className="hidden lg:inline-flex">
            {t.actions.enrollNow}
          </Button>
          <button
            type="button"
            className="cursor-pointer border-none bg-transparent p-1.5 text-ink lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`block h-0.5 w-6 bg-ink transition-transform duration-250 ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`my-1 block h-0.5 w-6 bg-ink transition-opacity duration-250 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-ink transition-transform duration-250 ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed inset-0 z-[150] flex flex-col bg-ivory px-7 py-6 transition-transform duration-300 lg:hidden ${
          menuOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          {logo}
          <button
            type="button"
            className="cursor-pointer border-none bg-transparent p-1 text-3xl leading-none text-ink"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
        </div>

        <nav aria-label="Mobile" className="mt-12 flex flex-col gap-1.5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
              className={`border-b border-[var(--line)] py-3.5 text-[16px] font-semibold ${
                isActive(link.href) ? "text-green" : "text-ink"
              }`}
            >
              {t.nav[link.key]}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 pt-10">
          {/* Full "EN | اردو" switcher, bordered, inside the mobile drawer */}
          <LanguageToggleInline className="w-full justify-center py-2.5" />
          <Button href="/admissions" onClick={() => setMenuOpen(false)} className="w-full">
            {t.actions.enrollNow}
          </Button>
          <Button
            href="/courses"
            variant="ghost"
            onClick={() => setMenuOpen(false)}
            className="w-full"
          >
            {t.actions.exploreCourses}
          </Button>
        </div>
      </div>
    </header>
  );
}
