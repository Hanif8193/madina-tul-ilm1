import type { Metadata } from "next";
import Link from "next/link";

import { BRAND } from "@/lib/data";
import LoginForm from "@/app/admin/login/LoginForm";

export const metadata: Metadata = {
  title: "Staff Sign In",
  description: "Sign in to the Madina-Tul-Ilm staff area.",
  // A staff-only page has no business in a search index.
  robots: { index: false, follow: false },
};

/**
 * Sign-in page.
 *
 * Deliberately outside the `(dashboard)` route group, so it does not inherit the
 * admin layout's `requireAdmin()` guard — an unauthenticated visitor must be able
 * to render this page. Because a route group is invisible to the URL, this file
 * still serves `/admin/login`, which is what the proxy redirects to.
 */
export default function AdminLoginPage() {
  return (
    <section className="bg-ivory px-5 py-[72px] md:px-8 md:py-[110px]">
      <div className="mx-auto w-full max-w-[460px]">
        <div className="border-t-[3px] border-t-gold border-x border-b border-[rgba(23,32,28,0.12)] bg-white px-6 py-9 sm:px-10 sm:py-11">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
            Staff Access
          </p>
          <h1 className="font-display text-[clamp(26px,3vw,38px)] leading-[1.15] tracking-[-0.02em] text-ink">
            Sign in to continue
          </h1>
          <p className="mt-4 text-[15px] leading-[1.6] text-muted">
            Authorised staff only. If you do not have an account, please contact
            the administration office.
          </p>

          <LoginForm />
        </div>

        <p className="mt-8 text-center text-[14px] text-muted">
          <Link
            href="/"
            className="border-b border-transparent pb-0.5 text-green transition-colors duration-200 hover:border-green"
          >
            &larr; Back to {BRAND.name}
          </Link>
        </p>
      </div>
    </section>
  );
}