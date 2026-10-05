"use client";

import { useActionState, useEffect, useId, useRef } from "react";

import {
  createCourseAction,
  updateCourseAction,
  type CourseActionState,
} from "./actions";

export type CourseFormValues = {
  id: string;
  code: string;
  titleEn: string;
  titleUr: string;
  descriptionEn: string;
  descriptionUr: string;
  durationEn: string;
  durationUr: string;
  isPublished: boolean;
};

const EMPTY: CourseFormValues = {
  id: "",
  code: "",
  titleEn: "",
  titleUr: "",
  descriptionEn: "",
  descriptionUr: "",
  durationEn: "",
  durationUr: "",
  isPublished: false,
};

const INPUT_CLASS =
  "rounded-none border border-[rgba(23,32,28,0.2)] bg-white px-3 py-2 text-[14px] text-ink outline-none transition-colors duration-200 focus:border-green";

/**
 * One dialog component for both "Add course" and "Edit course".
 *
 * The two modes differ only in which Server Action runs and whether an `id` is
 * posted, so they share one form rather than two near-identical copies that
 * could drift apart.
 */
export default function CourseDialog({
  mode,
  course,
}: {
  mode: "create" | "edit";
  course?: CourseFormValues;
}) {
  const isEdit = mode === "edit";
  const action = isEdit ? updateCourseAction : createCourseAction;

  const [state, formAction, isPending] = useActionState<
    CourseActionState,
    FormData
  >(action, null);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const titleId = useId();
  const ids = {
    code: useId(),
    titleEn: useId(),
    titleUr: useId(),
    durationEn: useId(),
    durationUr: useId(),
    descriptionEn: useId(),
    descriptionUr: useId(),
    published: useId(),
  };

  const values = course ?? EMPTY;

  // Close on success. On failure the dialog stays open with the entered values
  // and the field messages, which is the only way to act on them.
  useEffect(() => {
    if (state?.ok) {
      dialogRef.current?.close();
      formRef.current?.reset();
    }
  }, [state]);

  const errors = state?.fieldErrors ?? {};
  const fieldError = (name: string) => errors[name]?.[0];

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className={
          isEdit
            ? "rounded-none border border-[rgba(23,32,28,0.2)] bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted transition-colors duration-200 hover:border-green hover:text-green"
            : "rounded-none border-2 border-green bg-green px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-ivory transition-colors duration-200 hover:bg-green-dark"
        }
      >
        {isEdit ? "Edit" : "Add course"}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="m-auto w-[min(620px,94vw)] border border-[rgba(23,32,28,0.16)] bg-white p-0 text-ink backdrop:bg-green-dark/50"
      >
        <div className="max-h-[88vh] overflow-y-auto border-t-[3px] border-t-gold border-x border-b border-[rgba(23,32,28,0.12)] bg-white px-6 py-6">
          <div className="flex items-start justify-between gap-4">
            <h2
              id={titleId}
              className="font-display text-[22px] leading-tight tracking-[-0.02em] text-ink"
            >
              {isEdit ? "Edit course" : "Add course"}
            </h2>
            <form method="dialog">
              <button
                type="submit"
                aria-label="Close"
                className="rounded-none border border-[rgba(23,32,28,0.2)] px-2.5 py-1 text-[13px] leading-none text-muted transition-colors duration-200 hover:border-ink hover:text-ink"
              >
                &#x2715;
              </button>
            </form>
          </div>

          {state?.error ? (
            <p
              role="alert"
              className="mt-4 border border-[#c99a9a] bg-[#f9eeee] px-3 py-2 text-[13px] text-[#8c3a3a]"
            >
              {state.error}
            </p>
          ) : null}

          <form ref={formRef} action={formAction} className="mt-5 flex flex-col gap-4">
            {isEdit ? (
              <input type="hidden" name="courseId" value={values.id} />
            ) : null}

            <div className="grid gap-4 sm:grid-cols-[minmax(0,10rem)_1fr]">
              <Field label="Code" htmlFor={ids.code} error={fieldError("code")}>
                <input
                  id={ids.code}
                  name="code"
                  defaultValue={values.code}
                  required
                  maxLength={32}
                  placeholder="QUR-101"
                  aria-describedby={fieldError("code") ? `${ids.code}-error` : undefined}
                  aria-invalid={Boolean(fieldError("code"))}
                  className={`${INPUT_CLASS} font-mono uppercase`}
                />
              </Field>

              <Field
                label="Title (English)"
                htmlFor={ids.titleEn}
                error={fieldError("titleEn")}
              >
                <input
                  id={ids.titleEn}
                  name="titleEn"
                  defaultValue={values.titleEn}
                  required
                  maxLength={200}
                  aria-describedby={
                    fieldError("titleEn") ? `${ids.titleEn}-error` : undefined
                  }
                  aria-invalid={Boolean(fieldError("titleEn"))}
                  className={INPUT_CLASS}
                />
              </Field>
            </div>

            <Field label="Title (Urdu)" htmlFor={ids.titleUr} hint="Optional. Falls back to the English title.">
              <input
                id={ids.titleUr}
                name="titleUr"
                defaultValue={values.titleUr}
                maxLength={200}
                dir="rtl"
                lang="ur"
                className={INPUT_CLASS}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Duration (English)" htmlFor={ids.durationEn}>
                <input
                  id={ids.durationEn}
                  name="durationEn"
                  defaultValue={values.durationEn}
                  maxLength={80}
                  placeholder="6 months"
                  className={INPUT_CLASS}
                />
              </Field>

              <Field label="Duration (Urdu)" htmlFor={ids.durationUr}>
                <input
                  id={ids.durationUr}
                  name="durationUr"
                  defaultValue={values.durationUr}
                  maxLength={80}
                  dir="rtl"
                  lang="ur"
                  className={INPUT_CLASS}
                />
              </Field>
            </div>

            <Field label="Description (English)" htmlFor={ids.descriptionEn}>
              <textarea
                id={ids.descriptionEn}
                name="descriptionEn"
                defaultValue={values.descriptionEn}
                rows={4}
                maxLength={4000}
                className={`${INPUT_CLASS} resize-y`}
              />
            </Field>

            <Field label="Description (Urdu)" htmlFor={ids.descriptionUr}>
              <textarea
                id={ids.descriptionUr}
                name="descriptionUr"
                defaultValue={values.descriptionUr}
                rows={4}
                maxLength={4000}
                dir="rtl"
                lang="ur"
                className={`${INPUT_CLASS} resize-y`}
              />
            </Field>

            <div className="flex items-start gap-2.5 border-t border-[rgba(23,32,28,0.1)] pt-4">
              <input
                id={ids.published}
                name="isPublished"
                type="checkbox"
                defaultChecked={values.isPublished}
                className="mt-0.5 size-4 accent-green"
              />
              <label
                htmlFor={ids.published}
                className="text-[13px] leading-snug text-ink"
              >
                Show on the public site
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[rgba(23,32,28,0.1)] pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="rounded-none border-2 border-green bg-green px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-ivory transition-colors duration-200 hover:bg-green-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? "Saving…" : isEdit ? "Save changes" : "Create course"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted"
      >
        {label}
      </label>
      {children}
      {hint && !error ? (
        <p className="text-[12px] text-muted">{hint}</p>
      ) : null}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-[12px] text-[#8c3a3a]">
          {error}
        </p>
      ) : null}
    </div>
  );
}