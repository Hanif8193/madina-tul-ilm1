import "server-only";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma 7 requires a driver adapter; there is no default engine any more.
// The URL is read from DATABASE_URL and passed explicitly so it never has to
// be duplicated in prisma/schema.prisma. Throws fast at module load if the
// variable is missing, rather than on the first query.
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Fill it in in .env (see .env.example for the template).",
  );
}

// Next.js dev-mode hot reload re-evaluates modules on every edit. Without a
// cached instance that means one new PrismaClient (and one new connection
// pool) per save, until Postgres refuses new connections. The global cache
// keeps a single client across reloads; in production each server process
// gets exactly one anyway.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
    log:
      process.env.NODE_ENV === "development"
        ? ["warn", "error"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}