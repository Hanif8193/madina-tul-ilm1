import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import type { JWT } from "next-auth/jwt";

/**
 * Optimistic, cookie-only routing gate for the staff area.
 *
 * `middleware.ts` is deprecated in Next.js 16 — the convention is now `proxy.ts`.
 *
 * This runs before rendering, so it is the cheapest place to keep anonymous
 * visitors out of `/admin` and to bounce signed-in ADMINs away from the login
 * form. It is deliberately NOT a security boundary:
 *
 *   - It reads the session cookie only. No database query happens here, because
 *     Proxy also runs for prefetched requests and a per-request lookup would
 *     cost a round trip on navigation.
 *   - A role claim taken from a cookie is a hint, not a grant. Anyone can reach
 *     a page that skips this file, and the cookie can outlive a role change.
 *
 * The actual enforcement is `requireAdmin()` in `src/lib/dal.ts`, which every
 * protected page, Server Action and Route Handler must call.
 */

const ADMIN_PREFIX = "/admin";
const ADMIN_LOGIN_PATH = "/admin/login";
const ADMIN_ROLE = "ADMIN";

/**
 * Mirrors how Auth.js itself decides between the plain and `__Secure-` prefixed
 * session cookie names, so this file reads the same cookie Auth.js wrote.
 * See @auth/core/lib/init.js: `useSecureCookies ?? url.protocol === "https:"`.
 */
function usesSecureCookies(request: NextRequest): boolean {
  const authUrl = process.env.AUTH_URL;
  if (authUrl) {
    try {
      return new URL(authUrl).protocol === "https:";
    } catch {
      // Fall through to the request's own protocol.
    }
  }
  return request.nextUrl.protocol === "https:";
}

/**
 * Reads and verifies the session cookie. Returns `null` when there is no usable
 * session.
 *
 * Fails closed: if `AUTH_SECRET` is missing or empty, no cookie can be
 * verified, so every caller is treated as signed out instead of the request
 * erroring out with a server error.
 */
async function readSessionToken(request: NextRequest): Promise<JWT | null> {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    return null;
  }

  try {
    return await getToken({
      req: request,
      secret,
      secureCookie: usesSecureCookies(request),
    });
  } catch {
    return null;
  }
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only ever reached for paths matched by `config.matcher` below.
  const token = await readSessionToken(request);

  if (pathname === ADMIN_LOGIN_PATH) {
    // Only an ADMIN is sent onward; an EDITOR holding a valid session stays put
    // rather than being bounced into a loop between here and the DAL.
    if (token?.role === ADMIN_ROLE) {
      return NextResponse.redirect(new URL(ADMIN_PREFIX, request.url));
    }
    return NextResponse.next();
  }

  const isAdminRoute =
    pathname === ADMIN_PREFIX || pathname.startsWith(`${ADMIN_PREFIX}/`);

  if (isAdminRoute && !token?.userId) {
    return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Scoped to the staff area, which is narrower than the usual
  // "/((?!api|_next/static|_next/image).*)" matcher: nothing outside `/admin`
  // needs the gate, so public pages pay nothing. `/api/auth/*` is excluded by
  // construction — the Auth.js handlers are never intercepted — and Next.js
  // serves build output from `/_next`, which this matcher cannot reach.
  matcher: ["/admin", "/admin/:path*"],
};