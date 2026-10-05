import type { DefaultSession } from "next-auth";
import type { Role } from "@/generated/prisma/enums";

// Auth.js does not know about this application's `users.role` column, so the
// claims carried on the JWT and exposed on the session are declared here.
//
// NOTE: this augmentation makes `session.user` non-optional, which holds because
// `session` is only ever produced by the `session` callback in src/auth.ts, which
// always populates `id` and `role` from the token.
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    role?: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** Mirrors `User.id`; `sub` is Auth.js' own claim for the same value. */
    userId?: string;
    role?: Role;
  }
}