import "server-only";

import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { db } from "@/lib/db";
import { LoginCredentialsSchema } from "@/lib/login-schema";

/// bcrypt hash of a throwaway random string, used to keep the "no such user"
/// path roughly as expensive as a real comparison. Without it, response timing
/// would reveal whether an email is registered even though the error message is
/// identical. This is NOT a credential: it belongs to nothing and grants nothing.
const TIMING_DECOY_HASH =
  "$2b$12$UuX83yxeMNzJ/Z1lWLmEK.xwhDrYsA1.LiEU2XJO.OJri24iKuAh.";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // JWT sessions, deliberately: Auth.js only needs a database adapter for
  // database sessions, so `Account` / `Session` / `VerificationToken` models are
  // unnecessary. Revocation is handled by re-reading the user on every request
  // (see src/lib/dal.ts) rather than by deleting a session row.
  session: {
    strategy: "jwt",
    // Staff sessions are short-lived. A stolen cookie is useless long before the
    // login password would need rotating.
    maxAge: 8 * 60 * 60,
  },
  pages: {
    // Keeps Auth.js from rendering its own unstyled sign-in page, and makes the
    // error redirect land back on our form.
    signIn: "/admin/login",
    error: "/admin/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      /// Called only by Auth.js on the server. Every rejection path returns
      /// `null` so that Auth.js raises the same `CredentialsSignin` error for a
      /// malformed body, an unknown email, a deactivated account, an account
      /// with no local password, and a wrong password — the response cannot be
      /// used to enumerate staff accounts.
      async authorize(credentials) {
        const parsed = LoginCredentialsSchema.safeParse({
          email: credentials?.email,
          password: credentials?.password,
        });
        if (!parsed.success) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: parsed.data.email },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            passwordHash: true,
            isActive: true,
          },
        });

        if (!user?.isActive || !user?.passwordHash) {
          await bcrypt.compare(parsed.data.password, TIMING_DECOY_HASH);
          return null;
        }

        const passwordMatches = await bcrypt.compare(
          parsed.data.password,
          user.passwordHash,
        );
        if (!passwordMatches) {
          return null;
        }

        await db.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        // Only these four fields leave this function. `passwordHash` is
        // deliberately absent, so it cannot reach the JWT or any client bundle.
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    /// Runs on sign-in and again on every session read. Copying the role onto the
    /// token is what lets src/proxy.ts make an optimistic routing decision from
    /// the cookie alone. It is a hint, not a grant: src/lib/dal.ts re-reads the
    /// role from the database before any protected data is returned.
    jwt({ token, user }) {
      if (user?.id) {
        token.userId = user.id;
      }
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token.userId) {
        session.user.id = token.userId;
      }
      if (token.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },
});