import { AdmissionStatus } from "@/generated/prisma/enums";

/**
 * Presentation-only helpers shared by the three staff modules.
 *
 * Everything here is deterministic. Dates are formatted in a fixed timezone
 * (Pakistan, where the college actually operates) rather than the server's, so
 * the same record never renders as two different days depending on where the
 * code runs, and a client component can be handed a finished string instead of
 * a `Date` that would have to be re-formatted after hydration.
 */

const INSTITUTE_TIME_ZONE = "Asia/Karachi";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: INSTITUTE_TIME_ZONE,
});

const dateTimeFormat = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: INSTITUTE_TIME_ZONE,
});

export function formatDate(value: Date): string {
  return dateFormat.format(value);
}

export function formatDateTime(value: Date): string {
  return dateTimeFormat.format(value);
}

/** En dash for a missing optional field, so empty cells still read as a row. */
export function orDash(value: string | null | undefined): string {
  return value !== null && value !== undefined && value.length > 0
    ? value
    : "—";
}

type BadgeTone = {
  label: string;
  className: string;
};

const ADMISSION_STATUS_TONES: Record<AdmissionStatus, BadgeTone> = {
  PENDING: {
    label: "Pending",
    className: "border-gold/60 bg-gold/10 text-[#8a6d1f]",
  },
  UNDER_REVIEW: {
    label: "Under review",
    className: "border-[#8fa3b8] bg-[#eef2f7] text-[#3f5468]",
  },
  APPROVED: {
    label: "Approved",
    className: "border-[#7fae8f] bg-[#edf5ef] text-[#2c5c3c]",
  },
  ENROLLED: {
    label: "Enrolled",
    className: "border-green bg-green/10 text-green",
  },
  REJECTED: {
    label: "Rejected",
    className: "border-[#c99a9a] bg-[#f9eeee] text-[#8c3a3a]",
  },
  WITHDRAWN: {
    label: "Withdrawn",
    className: "border-[#b6b0a6] bg-[#f2efe9] text-[#6b6357]",
  },
};

export function admissionStatusTone(status: AdmissionStatus): BadgeTone {
  return ADMISSION_STATUS_TONES[status];
}

/** Human labels for the status filter, in the order staff think about them. */
export const ADMISSION_STATUS_FILTERS: ReadonlyArray<{
  value: AdmissionStatus;
  label: string;
}> = [
  { value: "PENDING", label: "Pending" },
  { value: "UNDER_REVIEW", label: "Under review" },
  { value: "APPROVED", label: "Approved" },
  { value: "ENROLLED", label: "Enrolled" },
  { value: "REJECTED", label: "Rejected" },
  { value: "WITHDRAWN", label: "Withdrawn" },
];

const ACTIVE_TONE: BadgeTone = {
  label: "Active",
  className: "border-[#7fae8f] bg-[#edf5ef] text-[#2c5c3c]",
};

const INACTIVE_TONE: BadgeTone = {
  label: "Inactive",
  className: "border-[#b6b0a6] bg-[#f2efe9] text-[#6b6357]",
};

export function activeTone(isActive: boolean): BadgeTone {
  return isActive ? ACTIVE_TONE : INACTIVE_TONE;
}

export const BADGE_BASE_CLASS =
  "inline-flex items-center rounded-none border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]";

/** Shared empty-state block so all three modules read the same way. */
export function emptyStateMessage(subject: string): string {
  return `No ${subject} match the current filters.`;
}