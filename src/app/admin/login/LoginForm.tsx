"use client";

import { useActionState, useId } from "react";

import { signInAction, type SignInState } from "@/app/admin/actions";

const INITIAL_STATE: SignInState = {};

const inputClass =
  "w-full rounded-none border border-[rgba(23,32,28,0.2)] bg-white px-4 py-3 text-[15px] text-ink placeholder:text-muted/70 transition-colors duration-200 hover:border-green/40 focus:border-green";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    signInAction,
    INITIAL_STATE,
  );

  // Stable, collision-free ids so every input is programmatically tied to its
  // label and its error message.
  const emailId = useId();
  const passwordId = useId();
  const emailErrorId = `${emailId}-error`;
  const passwordErrorId = `${passwordId}-error`;
  const formErrorId = `${emailId}-form-error`;

  const emailError = state.fieldErrors?.email?.[0];
  const passwordError = state.fieldErrors?.password?.[0];

  return (
    <form
      action={formAction}
      className="mt-10 flex flex-col gap-5"
      aria-describedby={state.error ? formErrorId : undefined}
      noValidate
    >
      {/*
        Announced to screen readers when it appears. `role="alert"` plus
        `aria-live` is deliberate: this is the only feedback a rejected sign-in
        produces, and it must be perceivable without moving focus.
      */}
      <div aria-live="polite" role="alert">
        {state.error ? (
          <p
            id={formErrorId}
            className="border-l-[3px] border-[#a4342b] bg-[#a4342b]/[0.06] px-4 py-3 text-[14px] text-[#8c2c24]"
          >
            {state.error}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor={emailId}
          className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted"
        >
          Email
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          autoComplete="username"
          autoFocus
          spellCheck={false}
          placeholder="you@example.com"
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? emailErrorId : undefined}
          className={inputClass}
        />
        {emailError ? (
          <p id={emailErrorId} className="text-[13px] text-[#8c2c24]">
            {emailError}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor={passwordId}
          className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted"
        >
          Password
        </label>
        <input
          id={passwordId}
          name="password"
          type="password"
          required
          autoComplete="current-password"
          aria-invalid={passwordError ? true : undefined}
          aria-describedby={passwordError ? passwordErrorId : undefined}
          className={inputClass}
        />
        {passwordError ? (
          <p id={passwordErrorId} className="text-[13px] text-[#8c2c24]">
            {passwordError}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-none border-2 border-green bg-green px-6 py-3.5 text-[13px] font-semibold text-ivory transition-[background-color,border-color] duration-200 hover:border-green-dark hover:bg-green-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}