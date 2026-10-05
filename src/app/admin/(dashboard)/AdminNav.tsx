"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/admissions", label: "Admissions" },
  { href: "/admin/students", label: "Students" },
  { href: "/admin/courses", label: "Courses" },
] as const;

/**
 * Staff-area navigation.
 *
 * A client component purely for the active-state highlight: `usePathname` has
 * no Server Component equivalent. The links themselves are plain `<Link>`s, so
 * navigation still works if hydration is slow.
 *
 * `/admin` matches exactly, and the section links match on a `/` boundary.
 * Without that, `/admin` would light up on every staff page because it is a
 * prefix of all of them, and `/admin/courses-archive` would light up as Courses.
 */
function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin sections" className="lg:w-[210px] lg:shrink-0">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
        Modules
      </p>

      <ul className="mt-3 flex flex-wrap gap-1.5 lg:flex-col lg:gap-0">
        {LINKS.map((link) => {
          const active = isActive(pathname, link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`block border px-3.5 py-2 text-[13px] font-semibold transition-colors duration-200 lg:border-x-0 lg:border-t-0 lg:border-b lg:px-3 lg:py-2.5 ${
                  active
                    ? "border-green bg-green text-ivory lg:border-green"
                    : "border-[rgba(23,32,28,0.14)] bg-white text-muted hover:border-green hover:text-green lg:border-transparent lg:bg-transparent"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}