import Link from "next/link";

import AdminNav from "@/app/admin/(dashboard)/AdminNav";
import { signOutAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/dal";

/**
 * Shell for the staff area.
 *
 * NOTE ON LOCATION: this layout lives in the `(dashboard)` route group rather
 * than directly in `app/admin/`. Route groups are invisible to the URL, so this
 * still serves `/admin` — but it no longer wraps `app/admin/login/`. That
 * separation is required, not cosmetic: a layout in `app/admin/` would gate the
 * login page too, so an anonymous visitor to `/admin/login` would be redirected
 * to `/admin/login` by the very check that is meant to protect them, forever.
 *
 * The DAL call here gates the chrome (nav, identity, sign-out). It is *not* the
 * authorization boundary on its own: under Next.js partial rendering a layout
 * does not re-run on every navigation, and a layout cannot stop sibling segments
 * or Server Actions from executing. Every page beneath this one, and every
 * action it calls, calls `requireAdmin()` again for itself.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();

  return (
    <div className="flex min-h-full flex-col bg-ivory">
      <header className="border-b border-[rgba(23,32,28,0.12)] bg-green">
        <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-between gap-4 px-5 py-5 md:px-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold/80">
              Staff Area
            </p>
            <p className="mt-1 font-display text-[20px] leading-tight text-ivory">
              Admin Dashboard
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[14px] font-semibold text-ivory">{admin.name}</p>
              <p className="text-[13px] text-beige/60">{admin.email}</p>
            </div>
            {/*
              A Server Action posted from a Server Component; no client
              JavaScript is required to sign out.
            */}
            <form action={signOutAction}>
              <button
                type="submit"
                className="rounded-none border-2 border-white/40 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-ivory transition-colors duration-200 hover:border-gold hover:text-gold-light"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col gap-8 px-5 py-10 md:px-8 md:py-14 lg:flex-row lg:gap-12">
        <AdminNav />

        <main className="min-w-0 flex-1">{children}</main>
      </div>

      <footer className="border-t border-[rgba(23,32,28,0.12)]">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-5 md:px-8">
          <Link
            href="/"
            className="text-[13px] text-muted transition-colors duration-200 hover:text-green"
          >
            &larr; Back to the public site
          </Link>
        </div>
      </footer>
    </div>
  );
}