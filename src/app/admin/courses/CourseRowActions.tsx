"use client";

import { useActionState, useState } from "react";

import {
  deleteCourseAction,
  setCourseActiveAction,
  type CourseActionState,
} from "./actions";

const BASE_BUTTON =
  "rounded-none border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

/**
 * Per-row course actions: activate/deactivate, edit (via the shared dialog) and
 * delete.
 *
 * Delete is a two-step inline confirm rather than `window.confirm`: it is
 * keyboard reachable, it is announced to screen readers, and it does not block
 * the main thread. The Server Action still refuses to delete a course that
 * history points at, so the confirm is a courtesy, not the safety net.
 */
export default function CourseRowActions({
  course,
}: {
  course: { id: string; titleEn: string; isActive: boolean };
}) {
  const [toggleState, toggleAction, togglePending] = useActionState<
    CourseActionState,
    FormData
  >(setCourseActiveAction, null);

  const [deleteState, deleteAction, deletePending] = useActionState<
    CourseActionState,
    FormData
  >(deleteCourseAction, null);

  const [confirming, setConfirming] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <form action={toggleAction}>
          <input type="hidden" name="courseId" value={course.id} />
          <input
            type="hidden"
            name="isActive"
            value={String(!course.isActive)}
          />
          <button
            type="submit"
            disabled={togglePending}
            className={`${BASE_BUTTON} ${
              course.isActive
                ? "border-[#b6b0a6] bg-white text-[#6b6357] hover:border-[#6b6357]"
                : "border-[#7fae8f] bg-white text-[#2c5c3c] hover:border-[#2c5c3c]"
            }`}
          >
            {togglePending ? "…" : course.isActive ? "Deactivate" : "Activate"}
          </button>
        </form>

        {confirming ? null : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className={`${BASE_BUTTON} border-[#c99a9a] bg-white text-[#8c3a3a] hover:border-[#8c3a3a]`}
          >
            Delete
          </button>
        )}
      </div>

      {confirming ? (
        <form action={deleteAction} className="flex flex-wrap items-center gap-2">
          <input type="hidden" name="courseId" value={course.id} />
          <span className="text-[12px] text-[#8c3a3a]">
            Delete “{course.titleEn}”?
          </span>
          <button
            type="submit"
            disabled={deletePending}
            className={`${BASE_BUTTON} border-[#c99a9a] bg-[#8c3a3a] text-ivory hover:border-[#6f2c2c]`}
          >
            {deletePending ? "…" : "Confirm"}
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className={`${BASE_BUTTON} border-[rgba(23,32,28,0.2)] bg-white text-muted hover:border-ink`}
          >
            Cancel
          </button>
        </form>
      ) : null}

      {toggleState?.error || deleteState?.error ? (
        <p role="alert" className="max-w-[34ch] text-[12px] leading-snug text-[#8c3a3a]">
          {deleteState?.error ?? toggleState?.error}
        </p>
      ) : null}

      {toggleState?.ok || deleteState?.ok ? (
        <p
          role="status"
          className="max-w-[34ch] text-[12px] leading-snug text-[#2c5c3c]"
        >
          {deleteState?.ok ?? toggleState?.ok}
        </p>
      ) : null}
    </div>
  );
}