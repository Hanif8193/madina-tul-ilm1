import type { Metadata } from "next";
import Link from "next/link";

import ChangePasswordForm from "@/app/admin/(dashboard)/ChangePasswordForm";
import { requireAdmin } from "@/lib/dal";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Madina-Tul-Ilm staff dashboard.",
  robots: { index: false, follow: false },
};

const MODULES = [
  {
    href: "/admin/admissions",
    title: "Admissions",
    blurb:
      "Review incoming applications and approve or reject them. Approval assigns a roll number and enrols the student.",
  },
  {
    href: "/admin/students",
    title: "Students",
    blurb:
      "Everyone on record, searchable by name or roll number, with per-student detail.",
  },
  {
    href: "/admin/courses",
    title: "Courses",
    blurb:
      "The catalogue admissions are taken against. Add, edit, deactivate or delete courses.",
  },
] as const;

/**
 * Staff-area landing page.
 *
 * The `requireAdmin()` call is the point of this file, not the markup: it is
 * what turns an ADMIN session into access, and it re-checks the role against the
 * database on every visit. The layout's own check is not sufficient on its own.
 *
 * The three module pages each re-check the role for themselves rather than
 * trusting this landing page or the shared layout.
 */
export default async function AdminDashboardPage() {
  const admin = await requireAdmin();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-[clamp(26px,3vw,40px)] leading-[1.15] tracking-[-0.02em] text-ink">
          Welcome, {admin.name}
        </h1>
        <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.65] text-muted">
          You are signed in to the staff area. Pick a module to begin.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
          Modules
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {MODULES.map((module) => (
            <Link
              key={module.href}
              href={module.href}
              className="group border-t-[3px] border-t-gold border-x border-b border-[rgba(23,32,28,0.12)] bg-white px-5 py-6 transition-colors duration-200 hover:border-t-green"
            >
              <h2 className="font-display text-[19px] leading-tight tracking-[-0.02em] text-ink group-hover:text-green">
                {module.title}
              </h2>
              <p className="mt-2 text-[13px] leading-[1.6] text-muted">
                {module.blurb}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/*
        Account security. The form posts to `changePasswordAction`, which
        re-verifies the session itself rather than relying on this page's
        `requireAdmin()` call — a Server Action is reachable directly by URL.
      */}
      <div className="border-t-[3px] border-t-gold border-x border-b border-[rgba(23,32,28,0.12)] bg-white px-6 py-8 sm:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
          Account Security
        </p>
        <h2 className="mt-2 font-display text-[clamp(20px,2vw,26px)] leading-tight tracking-[-0.02em] text-ink">
          Change your password
        </h2>
        <p className="mt-3 mb-8 max-w-[62ch] text-[15px] leading-[1.65] text-muted">
          Choose something you do not use on any other site. You will stay signed
          in here afterwards with your new password.
        </p>

        <div className="max-w-[420px]">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}