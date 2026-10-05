"use server";

import { AuthError } from "next-auth";

import { signIn, signOut } from "@/auth";
import { verifySession } from "@/lib/dal";
import { db } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";
import {
  ChangePasswordSchema,
  toPasswordFieldErrors,
  type PasswordFieldErrors,
} from "@/lib/password-schema";
import {
  LoginCredentialsSchema,
  toLoginFieldErrors,
  type LoginFieldErrors,
} from "@/lib/login-schema";

/// Returned to the form when Auth.js rejects the sign-in. Identical for every
/// failure mode — malformed input is caught by the schema below, and an unknown
/// email, a deactivated account, an account with no local password and a wrong
/// password all fail inside `authorize()` as the same `CredentialsSignin` error.
/// The message must never distinguish between them.
const GENERIC_AUTH_ERROR = "Invalid email or password.";

export type SignInState = {
  error?: string;
  fieldErrors?: LoginFieldErrors;
};

/**
 * Credentials sign-in. Runs on the server, so the password travels from the
 * form to this function and on to Auth.js without ever being exposed to client
 * JavaScript.
 *
 * `redirectTo` is a constant, never derived from user input, so this cannot be
 * turned into an open redirect.
 *
 * On success Auth.js does not return: it throws a redirect to `/admin`.
 */
export async function signInAction(
  _previousState: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const parsed = LoginCredentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { fieldErrors: toLoginFieldErrors(parsed.error) };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/admin",
    });
  } catch (error) {
    // `CredentialsSignin` is the expected rejection and carries no useful detail
    // for the visitor. Anything else is a genuine fault — rethrow it so it is
    // reported rather than being disguised as a wrong password.
    if (error instanceof AuthError) {
      return { error: GENERIC_AUTH_ERROR };
    }
    throw error;
  }

  /// Auth.js reports success by throwing a redirect, so control does not reach
  /// this line. It keeps the function total for the compiler and keeps the state
  /// identical to a rejected sign-in if that ever stops being true.
  return { error: GENERIC_AUTH_ERROR };
}

/**
 * Signs the current user out.
 *
 * Deliberately takes no arguments. A logout that accepted a caller-supplied
 * return URL would be an open redirect, and this action only ever needs one
 * destination.
 */
export async function signOutAction(): Promise<void> {
  await signOut({ redirectTo: "/admin/login" });
}

export type ChangePasswordState = {
  success?: boolean;
  error?: string;
  fieldErrors?: PasswordFieldErrors;
};

/**
 * Changes the password of the currently signed-in user.
 *
 * A Server Action is an unauthenticated public HTTP endpoint that merely looks
 * like a button, so the session is verified first — before the submitted input is
 * even parsed. `verifySession()` redirects to the login page when there is no
 * live session, and re-reads `isActive` from the database, so a deactivated
 * account cannot change its password with a still-valid cookie.
 *
 * `verifySession()` is role-agnostic on purpose: changing your own password is not
 * an admin-only privilege, so this stays correct if EDITOR accounts are given a
 * dashboard later.
 *
 * Nothing here logs, returns, or echoes a submitted password. The state returned
 * to the client carries only success flags and fixed message strings, so the
 * action is safe to expose as a public endpoint.
 */
export async function changePasswordAction(
  _previousState: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  const user = await verifySession();

  const parsed = ChangePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { fieldErrors: toPasswordFieldErrors(parsed.error) };
  }

  // Re-read the row for the hash. `verifySession()`'s select deliberately omits
  // `passwordHash`, so this cannot be served from the session check's result.
  const record = await db.user.findUnique({
    where: { id: user.id },
    select: { passwordHash: true },
  });

  if (!record?.passwordHash) {
    // A credential-less account cannot confirm a current password. Reachable once
    // OAuth sign-in exists; until then it indicates a partially set-up account.
    return {
      error:
        "This account has no password set, so it cannot be changed here. Ask the administration office to reset it.",
    };
  }

  const currentPasswordMatches = await verifyPassword(
    parsed.data.currentPassword,
    record.passwordHash,
  );

  if (!currentPasswordMatches) {
    // Safe to be specific here, unlike sign-in: the caller is already proven to be
    // this account, so there is no account-existence information to leak.
    return {
      fieldErrors: {
        currentPassword: ["That is not your current password."],
      },
    };
  }

  const passwordHash = await hashPassword(
    parsed.data.newPassword,
    record.passwordHash,
  );

  await db.user.update({
    where: { id: user.id },
    data: { passwordHash },
  });

  return { success: true };
}