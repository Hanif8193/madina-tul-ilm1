import { z } from "zod";

// Shared by the change-password Server Action (src/app/admin/actions.ts) and the
// client form, so validation rules are stated once.
//
// Deliberately NOT a "server-only" module, for the same reason as
// src/lib/login-schema.ts: the form imports the inferred types and the length
// constants to render its own hint text, and nothing here touches the database
// or reads a secret.

export const MIN_PASSWORD_LENGTH = 8;

/**
 * bcrypt hashes at most the first 72 bytes of a password and silently ignores the
 * rest. Two passwords that share a 72-byte prefix would therefore be
 * interchangeable, so the upper bound is enforced rather than left implicit.
 */
export const MAX_PASSWORD_LENGTH = 72;

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { error: "Enter your current password." }),
    newPassword: z
      .string()
      .min(MIN_PASSWORD_LENGTH, {
        error: `Use at least ${MIN_PASSWORD_LENGTH} characters.`,
      })
      .max(MAX_PASSWORD_LENGTH, {
        error: `Use ${MAX_PASSWORD_LENGTH} characters or fewer.`,
      }),
    confirmPassword: z
      .string()
      .min(1, { error: "Re-enter your new password." }),
  })
  // Both refinements attach to a specific field so the message renders next to the
  // input that caused it rather than as a detached form-level error.
  .refine((values) => values.newPassword === values.confirmPassword, {
    error: "The two passwords do not match.",
    path: ["confirmPassword"],
  })
  .refine((values) => values.newPassword !== values.currentPassword, {
    error: "Your new password must differ from your current password.",
    path: ["newPassword"],
  });

export type ChangePasswordValues = z.infer<typeof ChangePasswordSchema>;

export type PasswordFieldErrors = {
  currentPassword?: string[];
  newPassword?: string[];
  confirmPassword?: string[];
};

/**
 * Flattens a ZodError into per-field messages for rendering next to inputs.
 *
 * Every message is a fixed string defined above — no submitted value is ever
 * echoed back into an error message.
 */
export function toPasswordFieldErrors(
  error: z.ZodError<ChangePasswordValues>,
): PasswordFieldErrors {
  const { fieldErrors } = z.flattenError(error);
  return {
    ...(fieldErrors.currentPassword
      ? { currentPassword: fieldErrors.currentPassword }
      : {}),
    ...(fieldErrors.newPassword ? { newPassword: fieldErrors.newPassword } : {}),
    ...(fieldErrors.confirmPassword
      ? { confirmPassword: fieldErrors.confirmPassword }
      : {}),
  };
}