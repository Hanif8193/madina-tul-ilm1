"use client";

import { useActionState, useEffect, useId, useRef } from "react";

import type { AdmissionStatus } from "@/generated/prisma/enums";

import { updateAdmissionStatusAction, type AdmissionActionState } from "./actions";

const BASE_BUTTON =
  "rounded-none border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

/**
 * Which transitions to offer for a given status.
 *
 * Only sensible moves are rendered rather than one control per enum value.
 *
 * `APPROVED` offers `ENROLLED` because that is the only way that status is
 * reachable: approval already reserves the seat and assigns the roll number, so
 * marking the student enrolled is the confirming click that follows it. Without
 * this the pipeline would dead-end at approved and `ENROLLED` would be a badge
 * the module can never show.
 *
 * `ENROLLED` itself offers nothing. The action refuses to release a seat from an
 * enrolled applicant, and a button that always errors is worse than no button.
 */
function transitionsFor(status: AdmissionStatus): AdmissionStatus[] {
  switch (status) {
    case "PENDING":
      return ["UNDER_REVIEW", "APPROVED", "REJECTED"];
    case "UNDER_REVIEW":
      return ["APPROVED", "REJECTED", "PENDING"];
    case "APPROVED":
      return ["ENROLLED", "REJECTED", "PENDING"];
    case "ENROLLED":
      return [];
    case "REJECTED":
    case "WITHDRAWN":
      return ["PENDING", "APPROVED"];
  }
}

const LABELS: Record<AdmissionStatus, string> = {
  PENDING: "Reopen",
  UNDER_REVIEW: "Under review",
  APPROVED: "Approve",
  ENROLLED: "Enrolled",
  REJECTED: "Reject",
  WITHDRAWN: "Withdrawn",
};

function toneFor(status: AdmissionStatus): string {
  switch (status) {
    case "APPROVED":
    case "UNDER_REVIEW":
      return "border-[#7fae8f] bg-white text-[#2c5c3c] hover:border-[#2c5c3c]";
    case "REJECTED":
      return "border-[#c99a9a] bg-white text-[#8c3a3a] hover:border-[#8c3a3a]";
    case "WITHDRAWN":
      return "border-[#b6b0a6] bg-white text-[#6b6357] hover:border-[#6b6357]";
    case "PENDING":
    case "ENROLLED":
      return "border-[#c9c2b4] bg-white text-muted hover:border-ink";
  }
}

export default function AdmissionStatusControls({
  admissionId,
  status,
  reference,
}: {
  admissionId: string;
  status: AdmissionStatus;
  reference: string;
}) {
  const [state, formAction, isPending] = useActionState<
    AdmissionActionState,
    FormData
  >(updateAdmissionStatusAction, null);

  const formRef = useRef<HTMLFormElement>(null);
  const alertId = useId();

  // Drop a stale banner once a fresh submission starts, so a success message
  // cannot sit next to an unrelated error.
  useEffect(() => {
    if (state) formRef.current?.reset();
  }, [state]);

  const transitions = transitionsFor(status);
  const message = state?.ok ?? state?.error;

  if (transitions.length === 0) {
    return (
      <p className="text-[12px] text-muted">
        Enrolled &mdash; remove the seat from the student record before
        changing this.
      </p>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-2"
      aria-label={`Status actions for application ${reference}`}
    >
      <input type="hidden" name="admissionId" value={admissionId} />

      <div className="flex flex-wrap gap-2">
        {transitions.map((next) => (
          <button
            key={next}
            type="submit"
            name="status"
            value={next}
            disabled={isPending}
            className={`${BASE_BUTTON} ${toneFor(next)}`}
          >
            {LABELS[next]}
          </button>
        ))}
      </div>

      {message ? (
        <p
          id={alertId}
          role={state?.error ? "alert" : "status"}
          className={`max-w-[30ch] text-[12px] leading-snug ${
            state?.error ? "text-[#8c3a3a]" : "text-[#2c5c3c]"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}