/**
 * Minor Protection Policy — the single gate every mentor/applicant
 * communication channel must pass through.
 *
 * No mentor, educator, recruiter, volunteer, contractor, or employer may
 * directly communicate with a minor until every flag below is true. This
 * function is the enforcement point: call it before opening any
 * messaging UI, revealing contact details, or activating an email alias.
 * It must be re-checked server-side on every message send, not just once
 * at match approval — any flag can be revoked later (e.g. a background
 * review gets flagged) and access must be revoked immediately.
 */

import type { MinorProtectionGate } from "@/types";

export interface MinorProtectionCheck {
  authorized: boolean;
  missing: Array<keyof MinorProtectionGate>;
}

const REQUIRED_FLAGS: Array<keyof MinorProtectionGate> = [
  "guardianConsent",
  "adminApproval",
  "mentorVerified",
  "backgroundReviewCleared",
  "communicationAuthorized",
];

export function evaluateMinorProtection(
  gate: MinorProtectionGate,
  isMinor: boolean,
): MinorProtectionCheck {
  if (!isMinor) {
    // Adult applicants still require admin approval and mentor
    // verification, but not guardian consent.
    const missing = REQUIRED_FLAGS.filter(
      (flag) => flag !== "guardianConsent" && !gate[flag],
    );
    return { authorized: missing.length === 0, missing };
  }

  const missing = REQUIRED_FLAGS.filter((flag) => !gate[flag]);
  return { authorized: missing.length === 0, missing };
}

export const FLAG_LABELS: Record<keyof MinorProtectionGate, string> = {
  guardianConsent: "Parent or guardian consent",
  adminApproval: "Administrator approval",
  mentorVerified: "Mentor verification",
  backgroundReviewCleared: "Background review cleared",
  communicationAuthorized: "Communication authorization",
};
