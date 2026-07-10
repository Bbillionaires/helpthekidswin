/**
 * Shared domain types used across the applicant, mentor, workspace, and
 * admin surfaces. These mirror prisma/schema.prisma; keep them in sync
 * until the Prisma client is wired into the app (see ARCHITECTURE.md).
 */

export type UserRole = "APPLICANT" | "MENTOR" | "ADMIN" | "GUARDIAN";

export interface ApplicantProfile {
  id: string;
  userId: string;
  displayName: string;
  dateOfBirth?: string;
  isMinor: boolean;
  /** The pathway whose room door the applicant first walked through and completed the mini-profile at — their "own" industry for completion-tracking purposes (see the Library, ARCHITECTURE.md §7b). Set once and never overwritten by later room visits. */
  primaryPathwaySlug?: string;
  careerProfile: {
    goals: string;
    interests: string[];
    availability: string;
  };
  personality: Record<string, string>;
  skills: string[];
  education: string;
  certifications: string[];
  accomplishments: string[];
  physicalRequirementsAck: boolean;
  transportation: "own-vehicle" | "public-transit" | "needs-assistance" | "not-applicable";
  location: {
    city: string;
    state: string;
    zip: string;
  };
  resumeUrl?: string;
  assessments: AssessmentResult[];
  readinessScore?: number;
}

export interface AssessmentResult {
  id: string;
  type: "pre-test" | "quiz" | "skills-assessment";
  pathwaySlug: string;
  score: number;
  maxScore: number;
  completedAt: string;
  /** Raw intake question/answer pairs, kept alongside the score so a mentor or admin can see exactly how the applicant answered. */
  responses?: Array<{ questionId: string; answer: string | string[] }>;
}

export interface PathwayRecommendation {
  pathwaySlug: string;
  rank: 1 | 2 | 3;
  confidence: number;
  explanation: string;
}

export interface MentorProfile {
  id: string;
  userId: string;
  displayName: string;
  biography: string;
  experienceYears: number;
  certifications: string[];
  careerSpecialties: string[];
  teachingSpecialties: string[];
  availability: string;
  maxApprentices: number;
  currentApprentices: number;
  employer?: string;
  accomplishments: string[];
  verification: MentorVerificationStatus;
}

export interface MentorVerificationStatus {
  identityVerified: boolean;
  backgroundReviewStatus: "not-started" | "pending" | "cleared" | "flagged";
  credentialsVerified: boolean;
}

export type MatchStatus = "requested" | "admin-review" | "approved" | "declined" | "ended";

export interface Match {
  id: string;
  applicantId: string;
  mentorId: string;
  pathwaySlug: string;
  status: MatchStatus;
  minorProtection: MinorProtectionGate;
  requestedAt: string;
  approvedAt?: string;
}

export interface MinorProtectionGate {
  guardianConsent: boolean;
  adminApproval: boolean;
  mentorVerified: boolean;
  backgroundReviewCleared: boolean;
  communicationAuthorized: boolean;
}

export interface WorkspaceMilestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  body: string;
  sentAt: string;
  loggedForAudit: true;
}

export interface Certificate {
  id: string;
  matchId: string;
  title: string;
  issuedAt: string;
  pathwaySlug: string;
  applicantName: string;
  mentorName: string;
  grade: number | null;
  speedLabel: string;
}
