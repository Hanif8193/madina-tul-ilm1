"use client";

import { useActionState, useEffect, useId, useRef } from "react";

import {
  changePasswordAction,
  type ChangePasswordState,
} from "@/app/admin/actions";
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "@/lib/password-schema";

const INITIAL_STATE: ChangePasswordState = {};

/// Mirrors the input styling already used by the login form, keeping the two
/// staff-facing forms visually identical.
const inputClass =
  "w-full rounded-none border border-[rgba(23,32,28,0.2)] bg-white px-4 py-3 text-[15px] text-ink transition-colors duration-200 hover:border-green/40 focus:border-green";

const labelClass =
  "text-[11px] font-bold uppercase tracking-[0.14em] text-muted";

export default function ChangePasswordForm() {
  const [state, formAction, isPending] = useActionState(
    changePasswordAction,
    INITIAL_STATE,
  );

  const formRef = useRef<HTMLFormElement>(null);

  // Clear the three fields once the change succeeds, so the new password is not
  // left sitting in the DOM and so a second submit starts from a clean form.
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state]);

  // Stable, collision-free ids so every input is tied to its label and its error
  // message.
  const currentId = useId();
  const newId = useId();
  const confirmId = useId();
  const currentErrorId = `${currentId}-error`;
  const newErrorId = `${newId}-error`;
  const confirmErrorId = `${confirmId}-error`;
  const alertId = `${currentId}-alert`;

  const currentError = state.fieldErrors?.currentPassword?.[0];
  const newError = state.fieldErrors?.newPassword?.[0];
  const confirmError = state.fieldErrors?.confirmPassword?.[0];

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-5"
      aria-describedby={state.error || state.success ? alertId : undefined}
      noValidate
    >
      {/*
        One live region for both outcomes, so a screen reader announces whichever
        appears. `role="alert"` for the failure (assertive) and `role="status"` for
        the success (polite) differ in urgency, which matches what each means.
      */}
      <div aria-live="polite">
        {state.error ? (
          <p
            id={alertId}
            role="alert"
            className="border-l-[3px] border-[#a4342b] bg-[#a4342b]/[0.06] px-4 py-3 text-[14px] text-[#8c2c24]"
          >
            {state.error}
          </p>
        ) : null}

        {state.success ? (
          <p
            id={alertId}
            role="status"
            className="border-l-[3px] border-green bg-green/[0.06] px-4 py-3 text-[14px] text-green"
          >
            Your password has been changed. Other devices that are still signed in
            stay signed in until their session expires.
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={currentId} className={labelClass}>
          Current Password
        </label>
        <input
          id={currentId}
          name="currentPassword"
          type="password"
          required
          autoComplete="current-password"
          aria-invalid={currentError ? true : undefined}
          aria-describedby={currentError ? currentErrorId : undefined}
          className={inputClass}
        />
        {currentError ? (
          <p id={currentErrorId} className="text-[13px] text-[#8c2c24]">
            {currentError}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={newId} className={labelClass}>
          New Password
        </label>
        <input
          id={newId}
          name="newPassword"
          type="password"
          required
          autoComplete="new-password"
          minLength={MIN_PASSWORD_LENGTH}
          maxLength={MAX_PASSWORD_LENGTH}
          aria-invalid={newError ? true : undefined}
          aria-describedby={`${newError ? newErrorId : ""} ${newId}-hint`}
          className={inputClass}
        />
        {newError ? (
          <p id={newErrorId} className="text-[13px] text-[#8c2c24]">
            {newError}
          </p>
        ) : null}
        <p id={`${newId}-hint`} className="text-[13px] text-muted">
          At least {MIN_PASSWORD_LENGTH} characters. A short passphrase is
          stronger than a short password with symbols forced in.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={confirmId} className={labelClass}>
          Confirm New Password
        </label>
        <input
          id={confirmId}
          name="confirmPassword"
          type="password"
          required
          autoComplete="new-password"
          aria-invalid={confirmError ? true : undefined}
          aria-describedby={confirmError ? confirmErrorId : undefined}
          className={inputClass}
        />
        {confirmError ? (
          <p id={confirmErrorId} className="text-[13px] text-[#8c2c24]">
            {confirmError}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-1 inline-flex items-center justify-center gap-2 self-start rounded-none border-2 border-green bg-green px-6 py-3.5 text-[13px] font-semibold text-ivory transition-[background-color,border-color] duration-200 hover:border-green-dark hover:bg-green-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}