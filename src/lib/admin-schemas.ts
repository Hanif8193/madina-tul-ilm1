import { AdmissionStatus } from "@/generated/prisma/enums";
import { z } from "zod";

/**
 * Validation for the three staff modules (Admissions, Students, Courses).
 *
 * Kept out of the page/action files on purpose: the Server Action parses with
 * exactly the same schema the form was rendered against, so a field can never
 * drift between what the UI accepts and what the server accepts.
 */

/** Trimmed free text. A blank box becomes `undefined` so the column stores NULL. */
const optionalText = (max: number, label: string) =>
  z
    .string()
    .trim()
    .max(max, `${label} must be ${max} characters or fewer.`)
    .transform((value) => (value.length === 0 ? undefined : value))
    .optional();

const requiredText = (max: number, label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .max(max, `${label} must be ${max} characters or fewer.`);

// --- FormData helpers ------------------------------------------------------

/**
 * An unticked checkbox is simply absent from `FormData`, so there is no
 * `"false"` string to check — only a missing key or a truthy marker.
 */
export function formCheckbox(formData: FormData, name: string): boolean {
  const value = formData.get(name);
  return value === "on" || value === "true" || value === "1";
}

/** Always yields a string, so a `null` or a `File` can never reach Zod as one. */
export function formString(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

/** Collapses `{ [key]: string | string[] | undefined }` to a single value. */
export function firstParam(
  value: string | string[] | undefined,
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/**
 * The public site renders every course field twice (`*En` / `*Ur`). Urdu is
 * stored NOT NULL, so an omitted translation falls back to the English source
 * rather than storing an empty string that would render as a blank gap on the
 * public page. Filling both fields in the form is always better.
 */
export function bilingual(en: string, ur: string | undefined): string {
  return ur !== undefined && ur.length > 0 ? ur : en;
}

// --- Courses ---------------------------------------------------------------

/**
 * Staff-facing code, e.g. "QUR-101". Normalised to upper case so `qur-101` and
 * `QUR-101` cannot both exist. Uniqueness is enforced by the database, which is
 * authoritative; the action turns that error into a field message.
 */
const courseCode = z
  .string()
  .trim()
  .min(2, "Code must be at least 2 characters.")
  .max(32, "Code must be 32 characters or fewer.")
  .regex(
    /^[A-Za-z0-9][A-Za-z0-9-]*$/,
    "Use letters, digits and hyphens only.",
  )
  .transform((value) => value.toUpperCase());

export const CourseInputSchema = z.object({
  code: courseCode,
  titleEn: requiredText(200, "English title"),
  titleUr: optionalText(200, "Urdu title"),
  descriptionEn: optionalText(4000, "English description"),
  descriptionUr: optionalText(4000, "Urdu description"),
  durationEn: optionalText(80, "English duration"),
  durationUr: optionalText(80, "Urdu duration"),
});
export type CourseInput = z.infer<typeof CourseInputSchema>;

export const CourseUpdateSchema = CourseInputSchema.extend({
  courseId: z.string().uuid("That course reference is not valid."),
});
export type CourseUpdateInput = z.infer<typeof CourseUpdateSchema>;

export const CourseIdSchema = z.object({
  courseId: z.string().uuid("That course reference is not valid."),
});

export const CourseActiveSchema = z.object({
  courseId: z.string().uuid("That course reference is not valid."),
  isActive: z.enum(["true", "false"], {
    message: "Choose whether the course is active.",
  }),
});

// --- Admissions ------------------------------------------------------------

const admissionStatusValues = Object.values(AdmissionStatus) as [
  AdmissionStatus,
  ...AdmissionStatus[],
];

export const AdmissionStatusUpdateSchema = z.object({
  admissionId: z.string().uuid("That application reference is not valid."),
  status: z.enum(admissionStatusValues, {
    message: "Choose a valid status.",
  }),
});
export type AdmissionStatusUpdateInput = z.infer<
  typeof AdmissionStatusUpdateSchema
>;

// --- List queries ----------------------------------------------------------

/**
 * These validate the URL, not a form post. A hand-edited `?status=NONSENSE`
 * must degrade to "no filter" rather than throw, so an unrecognised value is
 * dropped instead of surfaced as an error.
 */
export const AdmissionsQuerySchema = z.object({
  q: z.string().trim().max(120).optional(),
  // `.optional()` first, then `.catch()`: the catch has to be able to produce
  // `undefined`, which is only in the type once optionality is applied.
  status: z.enum(admissionStatusValues).optional().catch(undefined),
});
export type AdmissionsQuery = z.infer<typeof AdmissionsQuerySchema>;

export const StudentsQuerySchema = z.object({
  q: z.string().trim().max(120).optional(),
});
export type StudentsQuery = z.infer<typeof StudentsQuerySchema>;

export const CoursesQuerySchema = z.object({
  q: z.string().trim().max(120).optional(),
  state: z.enum(["ACTIVE", "INACTIVE"]).optional().catch(undefined),
});
export type CoursesQuery = z.infer<typeof CoursesQuerySchema>;