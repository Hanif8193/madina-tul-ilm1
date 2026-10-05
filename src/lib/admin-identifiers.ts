import "server-only";

import { randomUUID } from "node:crypto";

import { db } from "@/lib/db";

/**
 * Human-facing identifiers the staff actually read out over the phone:
 * roll numbers for students, URL slugs for courses.
 */

/**
 * Next roll number for the current year, e.g. `MTI-2026-0042`.
 *
 * Reads the highest existing number in the year and adds one. That is a
 * best-effort sequence, not a lock: two admissions approved in the same moment
 * can compute the same candidate. The `@@unique` constraint on
 * `students.rollNumber` is the real guarantee — the caller retries when it
 * loses that race, so correctness never depends on this function.
 *
 * Lexicographic ordering is only equivalent to numeric ordering because the
 * tail is zero-padded to four digits. Past `MTI-2026-9999`, or if someone types
 * an unpadded number by hand, the ordering can misbehave and a number may be
 * skipped. A gap in roll numbers is harmless; a duplicate is not, and that case
 * is handled by the constraint.
 */
export async function nextRollNumber(): Promise<string> {
  const prefix = `MTI-${new Date().getUTCFullYear()}-`;
  const highest = await db.student.findFirst({
    where: { rollNumber: { startsWith: prefix } },
    orderBy: { rollNumber: "desc" },
    select: { rollNumber: true },
  });

  const tail = highest?.rollNumber?.slice(prefix.length) ?? "";
  const parsed = Number.parseInt(tail, 10);
  const next = (Number.isFinite(parsed) ? parsed : 0) + 1;

  return prefix + String(next).padStart(4, "0");
}

/** Lower-case, hyphenated, ASCII-only. May be empty for an all-Urdu title. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    // Strip the combining accents NFKD just split off, e.g. "é" -> "e" + U+0301.
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 110);
}

/**
 * A slug that is not taken. Only ever used when creating a course — an edit
 * deliberately leaves `slug` alone, because changing it would break any public
 * URL already shared for that course.
 */
export async function uniqueCourseSlug(titleEn: string): Promise<string> {
  // An Urdu-only title slugs to "", so fall back rather than write "" (which
  // would collide with every other Urdu-only title on the unique index).
  const base = slugify(titleEn) || "course";

  for (let attempt = 0; attempt < 50; attempt += 1) {
    const candidate =
      attempt === 0 ? base : `${base.slice(0, 115)}-${attempt + 1}`;
    const taken = await db.course.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });
    if (!taken) return candidate;
  }

  // 50 titles sharing one slug means the helper is being hammered; a random
  // suffix still returns something valid instead of looping forever.
  return `${base.slice(0, 100)}-${randomUUID().slice(0, 8)}`;
}