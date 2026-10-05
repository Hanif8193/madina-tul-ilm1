/// Bootstraps the first ADMIN account from environment variables.
///
/// Run explicitly with `npm run db:seed` (or `npx prisma db seed`). Never part of
/// `build`, `postinstall` or `migrate`: seeding an account is a deliberate,
/// one-time human action, and `migrate` runs on machines that should not be
/// creating credentials.
///
/// Requires in `.env`:
///   ADMIN_EMAIL     — the address to create or verify
///   ADMIN_PASSWORD  — plaintext, used once here and never written anywhere
///
/// Both are read from the environment only. Nothing is hardcoded, and neither the
/// password nor the resulting hash is ever printed.
///
/// Idempotent: re-running with an existing address reports the existing account
/// and leaves its password alone. Resetting a password is a separate, explicit
/// operation, not something a bootstrap script may do silently.
///
/// Run through `jiti` (see package.json `db:seed`): Prisma 7's generated client is
/// TypeScript with extensionless relative imports, which Node's native type
/// stripping cannot resolve on its own.

import "dotenv/config";

import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role } from "../src/generated/prisma/client";

/// Bcrypt work factor for new passwords. 12 is the usual interactive-login
/// balance on current hardware.
const BCRYPT_COST = 12;

function fail(message: string): never {
  console.error(`\n[seed] ${message}\n`);
  process.exit(1);
}

function readEnv(name: string): string {
  const raw = process.env[name];
  const value = raw?.trim();

  if (!value) {
    fail(
      `${name} is missing or empty.\n` +
        `        Add it to .env (never to a committed file) and run again.`,
    );
  }

  return value;
}

async function main() {
  const adminEmail = readEnv("ADMIN_EMAIL").toLowerCase();
  const adminPassword = readEnv("ADMIN_PASSWORD");

  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) {
    fail(
      "DATABASE_URL is missing or empty.\n" +
        "        Add it to .env and run again.",
    );
  }

  if (adminPassword.length < 12) {
    fail(
      "ADMIN_PASSWORD must be at least 12 characters.\n" +
        "        Use a long passphrase; length matters more than symbols here.",
    );
  }

  const db = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });

  try {
    const existing = await db.user.findUnique({
      where: { email: adminEmail },
      select: { id: true, role: true, isActive: true },
    });

    if (existing) {
      // Deliberately non-destructive. Overwriting a password here would let a
      // routine re-run lock a real staff member out of their own account.
      console.log(
        `[seed] A user already exists for ${adminEmail} ` +
          `(role=${existing.role}, isActive=${existing.isActive}). ` +
          "Leaving it untouched — password not changed.",
      );
      return;
    }

    // Hashed before the write; the plaintext is never passed to Prisma, never
    // interpolated into SQL, and never logged.
    const passwordHash = await bcrypt.hash(adminPassword, BCRYPT_COST);

    await db.user.create({
      data: {
        email: adminEmail,
        name: process.env.ADMIN_NAME?.trim() || "Administrator",
        passwordHash,
        role: Role.ADMIN,
        isActive: true,
      },
      select: { id: true },
    });

    // The email is echoed because it is the one input the operator needs to
    // confirm; the password is not, by design.
    console.log(`[seed] Created ADMIN account for ${adminEmail}.`);
    console.log(
      "[seed] You can now remove ADMIN_PASSWORD from .env — it is no longer needed.",
    );
  } finally {
    await db.$disconnect();
  }
}

await main();