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
        className="h-12 w-auto md:h-14"
      />
    </Link>
  );

  return (
    <>
    <header
      className={`sticky top-0 z-[100] h-[76px] border-b backdrop-blur-[8px] transition-colors duration-300 ${
        scrolled
          ? "border-[rgba(31,58,46,0.08)] bg-[rgba(247,244,236,0.96)] shadow-[0_1px_0_rgba(23,32,28,0.06)]"
          : "border-transparent bg-[rgba(247,244,236,0.96)]"
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-[1240px] items-center justify-between gap-6 px-5 md:px-8">
        {logo}

        <nav
          className="hidden items-center gap-6 md:flex"
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
                      : "text-muted hover:text-green"
                  }`}
                >
                  {t.nav[link.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          {/* Wrapper divs (not display classes on the components) guarantee
              these stay hidden on mobile: the Button's own `inline-flex` base
              class out-cascades `hidden` in Tailwind v4's utility order,
              which previously forced the Enroll button onto mobile and
              pushed the hamburger out of the 76px bar. */}
          <div className="hidden md:block">
            <LanguageToggleInline />
          </div>
          <div className="hidden lg:block">
            <Button href="/admissions" className="px-6! py-[11px]!">
              {t.actions.enrollNow}
            </Button>
          </div>
          {/* Hamburger: 24x24 forest-green icon, visible only below md,
              raised above siblings */}
          <button
            type="button"
            className="relative z-[110] flex h-9 w-9 cursor-pointer flex-col items-center justify-center border-none bg-transparent p-0 md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`block h-[2px] w-6 bg-green transition-transform duration-250 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`my-[5px] block h-[2px] w-6 bg-green transition-opacity duration-250 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-[2px] w-6 bg-green transition-transform duration-250 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>
    </header>

      {/* Mobile drawer rendered OUTSIDE <header>: the header's backdrop-blur
          creates a CSS containing block that would trap this fixed overlay
          inside the 76px header bar instead of covering the viewport, letting
          page content bleed through. Outside, inset-0 spans the real viewport
          over an opaque ivory base. */}
      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed inset-0 z-[150] flex min-h-screen w-full flex-col bg-ivory px-7 py-6 transition-transform duration-300 lg:hidden ${
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
              className={`block border-b px-6 py-4 text-[16px] font-semibold text-green transition-colors ${
                isActive(link.href) ? "border-gold" : "border-[var(--line)]"
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
          </Button>          </div>
      </div>
    </>
  );
}
