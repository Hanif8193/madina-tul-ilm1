import { z } from "zod";

// Shared by the Credentials `authorize()` callback (src/auth.ts) and the login
// Server Action (src/app/admin/actions.ts), so both agree on what counts as a
// well-formed submission.
//
// Deliberately NOT a "server-only" module: the login form imports the schema's
// inferred types, and nothing here reads a secret or touches the database.
//
// The email is normalised (trimmed + lower-cased) so that lookups hit the
// case-insensitive-by-convention `User.email` column consistently. The schema
// accepts anything zod's `email` accepts; minimum length is deliberately not
// enforced here — password strength is an account-creation concern, not a
// sign-in one, and a stricter rule would only leak that a password is "wrong".
export const LoginCredentialsSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email({ error: "Enter a valid email address." })),
  password: z.string().min(1, { error: "Enter your password." }),
});

export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;

export type LoginFieldErrors = {
  email?: string[];
  password?: string[];
};

/** Flattens a ZodError into per-field messages for rendering next to inputs. */
export function toLoginFieldErrors(
  error: z.ZodError<LoginCredentials>,
): LoginFieldErrors {
  const { fieldErrors } = z.flattenError(error);
  return {
    ...(fieldErrors.email ? { email: fieldErrors.email } : {}),
    ...(fieldErrors.password ? { password: fieldErrors.password } : {}),
  };
}