import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import type { Role } from "@/generated/prisma/enums";

/**
 * Data Access Layer — the real authorization boundary for staff-only data.
 *
 * `src/proxy.ts` is a *routing* convenience that runs before rendering. It is
 * optimistic by design: it reads the session cookie and nothing else, because it
 * must not touch the database on prefetched requests. It can be skipped, so no
 * page, Server Action or Route Handler may rely on it.
 *
 * Everything privileged goes through this module instead:
 *
 *   - Server Components call `requireAdmin()` / `verifySession()` before reading
 *     staff data.
 *   - Server Actions must call one of them on entry, because a Server Action is
 *     an unauthenticated public HTTP endpoint that merely *looks* like a button.
 *   - Route Handlers must do the same and answer 401/403 instead of redirecting.
 *
 * Because the JWT is stateless, a session cookie stays valid until it expires.
 * Re-reading the user here is what makes deactivating an account or demoting an
 * ADMIN take effect immediately rather than up to `session.maxAge` later.
 */

export const ADMIN_AREA_PATH = "/admin";
export const ADMIN_LOGIN_PATH = "/admin/login";

/// Destination for a signed-in user whose role is not permitted in `/admin`.
///
/// This is deliberately NOT `/admin/login`: the proxy bounces any ADMIN session
/// away from the login page, so redirecting there would ping-pong. It is also
/// deliberately not `signOut()`, because cookies cannot be written while a
/// Server Component is rendering, and because destroying a valid session over a
/// role check would be a surprising side effect.
const ROLE_DENIED_PATH = "/";

/// The subset of `User` that is safe to hand to a Server Component or serialise
/// into a page. `passwordHash` is not in the `select` below, so it cannot leak
/// through this type — the compiler enforces the omission, not discipline.
export type AuthenticatedUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

const SAFE_USER_SELECT = {
  id: true,
  email: true,
  name: true,
  role: true,
  isActive: true,
} as const;

/**
 * Confirms there is a live session backed by a real, active database user and
 * returns that user.
 *
 * `cache()` memoises the result for the lifetime of a single React render pass,
 * so a layout and the page beneath it cost one database round trip between them,
 * while still issuing a fresh query on every navigation.
 *
 * Redirects when there is no usable session.
 */
export const verifySession = cache(async (): Promise<AuthenticatedUser> => {
  const session = await auth();
  const sessionUserId = session?.user?.id;

  if (!session?.user || !sessionUserId) {
    redirect(ADMIN_LOGIN_PATH);
  }

  // Authoritative, not advisory: the role and active flag come from the row, so
  // neither a stale cookie nor a forged claim can widen access.
  const user = await db.user.findUnique({
    where: { id: sessionUserId },
    select: SAFE_USER_SELECT,
  });

  if (!user || !user.isActive) {
    redirect(ADMIN_LOGIN_PATH);
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
});

/**
 * `verifySession()` plus an ADMIN-only role check, for the `/admin` area.
 *
 * Call this instead of `verifySession()` on any page or action that must not be
 * reachable by an EDITOR.
 */
export const requireAdmin = cache(async (): Promise<AuthenticatedUser> => {
  const user = await verifySession();

  if (user.role !== "ADMIN") {
    redirect(ROLE_DENIED_PATH);
  }

  return user;
});