/**
 * In-memory demo data. Replace with real queries once Prisma is wired to
 * a live database (see prisma/schema.prisma and ARCHITECTURE.md).
 */

import type { ApplicantProfile, AssessmentResult, Certificate, MentorProfile, Match } from "@/types";

export const MOCK_APPLICANTS: ApplicantProfile[] = [
  {
    id: "app_1",
    userId: "user_1",
    displayName: "Jordan M.",
    isMinor: true,
    primaryPathwaySlug: "construction-skilled-trades",
    careerProfile: {
      goals: "Become a certified electrician within 3 years.",
      interests: ["Building things", "Leadership / service"],
      availability: "Weekday afternoons, all day Saturday",
    },
    personality: { workStyle: "hands-on", pace: "steady" },
    skills: ["Basic wiring", "Blueprint reading"],
    education: "High school junior",
    certifications: [],
    accomplishments: ["Built a working solar charger for a science fair"],
    physicalRequirementsAck: true,
    transportation: "public-transit",
    location: { city: "Tampa", state: "FL", zip: "33602" },
    assessments: [],
    readinessScore: 72,
  },
  {
    id: "app_2",
    userId: "user_2",
    displayName: "Priya S.",
    isMinor: false,
    primaryPathwaySlug: "cybersecurity",
    careerProfile: {
      goals: "Transition from retail into cybersecurity within a year.",
      interests: ["Technology"],
      availability: "Evenings and weekends",
    },
    personality: { workStyle: "analytical", pace: "fast" },
    skills: ["Networking basics", "Python fundamentals"],
    education: "Associate's degree in progress",
    certifications: ["CompTIA A+ (in progress)"],
    accomplishments: [],
    physicalRequirementsAck: true,
    transportation: "own-vehicle",
    location: { city: "Austin", state: "TX", zip: "78701" },
    assessments: [],
    readinessScore: 81,
  },
];

export const MOCK_MENTORS: MentorProfile[] = [
  {
    id: "mentor_1",
    userId: "user_10",
    displayName: "Marcus T.",
    biography:
      "Master electrician with 18 years in commercial and residential trades. Loves teaching apprentices who ask questions.",
    experienceYears: 18,
    certifications: ["Master Electrician License"],
    careerSpecialties: ["Construction & Skilled Trades"],
    teachingSpecialties: ["Hands-on demonstration", "Safety-first training"],
    availability: "Weekday evenings",
    maxApprentices: 3,
    currentApprentices: 1,
    employer: "Bright Line Electric",
    accomplishments: ["Trained 40+ apprentices to licensure"],
    verification: {
      identityVerified: true,
      backgroundReviewStatus: "cleared",
      credentialsVerified: true,
    },
  },
  {
    id: "mentor_2",
    userId: "user_11",
    displayName: "Dana K.",
    biography:
      "Security engineer turned mentor, passionate about helping career-changers break into cybersecurity.",
    experienceYears: 9,
    certifications: ["CISSP", "Security+"],
    careerSpecialties: ["Cybersecurity"],
    teachingSpecialties: ["Interview prep", "Home-lab building"],
    availability: "Weekends",
    maxApprentices: 2,
    currentApprentices: 0,
    employer: "Northwind Security",
    accomplishments: ["Built the company's internal SOC training program"],
    verification: {
      identityVerified: true,
      backgroundReviewStatus: "pending",
      credentialsVerified: true,
    },
  },
  {
    id: "mentor_3",
    userId: "user_12",
    displayName: "Renata O.",
    biography:
      "20 years sailing merchant vessels, now a licensed captain training the next generation of mariners.",
    experienceYears: 20,
    certifications: ["USCG Master Captain's License"],
    careerSpecialties: ["Merchant Marine"],
    teachingSpecialties: ["Navigation", "Shipboard safety"],
    availability: "Rotating schedule, 2 weeks on / 2 off",
    maxApprentices: 2,
    currentApprentices: 0,
    employer: "Gulf Coast Shipping Co.",
    accomplishments: ["Commanded 6 vessels across 3 oceans"],
    verification: {
      identityVerified: true,
      backgroundReviewStatus: "cleared",
      credentialsVerified: true,
    },
  },
  {
    id: "mentor_4",
    userId: "user_13",
    displayName: "Sgt. Malik B.",
    biography:
      "Retired Army sergeant, now helps young recruits prepare physically and mentally for military service.",
    experienceYears: 14,
    certifications: ["Army Recruiter Certification"],
    careerSpecialties: ["Military"],
    teachingSpecialties: ["Physical training", "ASVAB prep"],
    availability: "Weekday mornings",
    maxApprentices: 4,
    currentApprentices: 2,
    employer: "U.S. Army (Ret.)",
    accomplishments: ["Two combat tours", "Recruiter of the Year 2021"],
    verification: {
      identityVerified: true,
      backgroundReviewStatus: "cleared",
      credentialsVerified: true,
    },
  },
  {
    id: "mentor_5",
    userId: "user_14",
    displayName: "Officer Priya D.",
    biography:
      "Patrol officer and community liaison, mentoring cadets through the academy application process.",
    experienceYears: 11,
    certifications: ["POST Certification"],
    careerSpecialties: ["Police Officer"],
    teachingSpecialties: ["Academy prep", "De-escalation training"],
    availability: "Weekends",
    maxApprentices: 2,
    currentApprentices: 1,
    employer: "Metro Police Department",
    accomplishments: ["Community Policing Award 2023"],
    verification: {
      identityVerified: true,
      backgroundReviewStatus: "cleared",
      credentialsVerified: true,
    },
  },
  {
    id: "mentor_6",
    userId: "user_15",
    displayName: "Captain Luis F.",
    biography:
      "Fire captain with two decades of experience, guiding recruits through CPAT prep and EMT certification.",
    experienceYears: 21,
    certifications: ["EMT-Paramedic", "Fire Officer III"],
    careerSpecialties: ["Firefighter"],
    teachingSpecialties: ["CPAT training", "EMT exam prep"],
    availability: "Weekday evenings",
    maxApprentices: 3,
    currentApprentices: 1,
    employer: "City Fire Department",
    accomplishments: ["Led 200+ live rescue operations"],
    verification: {
      identityVerified: true,
      backgroundReviewStatus: "cleared",
      credentialsVerified: true,
    },
  },
  {
    id: "mentor_7",
    userId: "user_16",
    displayName: "Denise W., RN",
    biography:
      "Charge nurse who mentors CNAs and LPNs pursuing their RN licensure through night school.",
    experienceYears: 16,
    certifications: ["RN", "BSN"],
    careerSpecialties: ["Healthcare (CNA, LPN, RN)"],
    teachingSpecialties: ["NCLEX prep", "Clinical rotations"],
    availability: "Weekday afternoons",
    maxApprentices: 3,
    currentApprentices: 0,
    employer: "St. Vincent Medical Center",
    accomplishments: ["Mentored 25+ nurses to RN licensure"],
    verification: {
      identityVerified: true,
      backgroundReviewStatus: "cleared",
      credentialsVerified: true,
    },
  },
  {
    id: "mentor_8",
    userId: "user_17",
    displayName: "Tomás R.",
    biography:
      "Long-haul CDL driver and fleet trainer, teaching new drivers the road and the business.",
    experienceYears: 13,
    certifications: ["CDL Class A", "DOT Certified Trainer"],
    careerSpecialties: ["Truck Driver"],
    teachingSpecialties: ["Road test prep", "Logbook compliance"],
    availability: "Flexible",
    maxApprentices: 2,
    currentApprentices: 0,
    employer: "Highline Freight",
    accomplishments: ["2 million accident-free miles"],
    verification: {
      identityVerified: true,
      backgroundReviewStatus: "cleared",
      credentialsVerified: true,
    },
  },
  {
    id: "mentor_9",
    userId: "user_18",
    displayName: "Aisha K.",
    biography:
      "Dockworker turned crane operator, mentoring apprentices through union registration and safety certification.",
    experienceYears: 15,
    certifications: ["Crane Operator Certification"],
    careerSpecialties: ["Longshoremen"],
    teachingSpecialties: ["Equipment safety", "Union onboarding"],
    availability: "Weekday mornings",
    maxApprentices: 2,
    currentApprentices: 0,
    employer: "Port Authority Local 40",
    accomplishments: ["15 years without a safety incident"],
    verification: {
      identityVerified: true,
      backgroundReviewStatus: "cleared",
      credentialsVerified: true,
    },
  },
  {
    id: "mentor_10",
    userId: "user_19",
    displayName: "Sam P.",
    biography:
      "ML engineer building recommendation systems, mentoring self-taught developers into AI careers.",
    experienceYears: 7,
    certifications: [],
    careerSpecialties: ["AI Architect"],
    teachingSpecialties: ["Portfolio review", "System design"],
    availability: "Evenings",
    maxApprentices: 2,
    currentApprentices: 1,
    employer: "Vantage AI",
    accomplishments: ["Shipped ML systems used by 10M+ users"],
    verification: {
      identityVerified: true,
      backgroundReviewStatus: "cleared",
      credentialsVerified: true,
    },
  },
  {
    id: "mentor_11",
    userId: "user_20",
    displayName: "Vivian C., Esq.",
    biography:
      "Litigation attorney mentoring students through the LSAT, law school applications, and early bar prep.",
    experienceYears: 12,
    certifications: ["State Bar License"],
    careerSpecialties: ["Attorney"],
    teachingSpecialties: ["LSAT prep", "Law school application review"],
    availability: "Weekday evenings",
    maxApprentices: 2,
    currentApprentices: 0,
    employer: "Carrow & Bennett LLP",
    accomplishments: ["Pro bono counsel on 50+ cases"],
    verification: {
      identityVerified: true,
      backgroundReviewStatus: "cleared",
      credentialsVerified: true,
    },
  },
  {
    id: "mentor_12",
    userId: "user_21",
    displayName: "Nathaniel B., CPA",
    biography:
      "CPA at a mid-size firm, mentoring students through accounting fundamentals and the CPA exam pathway.",
    experienceYears: 10,
    certifications: ["CPA"],
    careerSpecialties: ["Accounting"],
    teachingSpecialties: ["CPA exam prep", "Bookkeeping fundamentals"],
    availability: "Weekends",
    maxApprentices: 3,
    currentApprentices: 0,
    employer: "Marsh & Coyle CPAs",
    accomplishments: ["Managed audits for 30+ small businesses"],
    verification: {
      identityVerified: true,
      backgroundReviewStatus: "cleared",
      credentialsVerified: true,
    },
  },
  {
    id: "mentor_13",
    userId: "user_22",
    displayName: "Regina F.",
    biography:
      "Acquired and turned around three small businesses, now mentoring first-time buyers through due diligence and deal structuring.",
    experienceYears: 15,
    certifications: [],
    careerSpecialties: ["Business Acquisition"],
    teachingSpecialties: ["Due diligence", "Deal structuring"],
    availability: "Flexible",
    maxApprentices: 2,
    currentApprentices: 0,
    employer: "Fairfield Holdings",
    accomplishments: ["Closed 3 acquisitions totaling $12M in revenue"],
    verification: {
      identityVerified: true,
      backgroundReviewStatus: "cleared",
      credentialsVerified: true,
    },
  },
  {
    id: "mentor_14",
    userId: "user_23",
    displayName: "Oscar M.",
    biography:
      "Licensed trader mentoring beginners on reading markets, risk management, and building a disciplined trading plan.",
    experienceYears: 11,
    certifications: ["Series 65"],
    careerSpecialties: ["Stock Trading"],
    teachingSpecialties: ["Technical analysis", "Risk management"],
    availability: "Weekday mornings",
    maxApprentices: 2,
    currentApprentices: 0,
    employer: "Ridgeline Capital",
    accomplishments: ["12 consecutive years of positive annual returns"],
    verification: {
      identityVerified: true,
      backgroundReviewStatus: "cleared",
      credentialsVerified: true,
    },
  },
  {
    id: "mentor_15",
    userId: "user_24",
    displayName: "Bianca S.",
    biography:
      "Creative director mentoring aspiring advertisers on pitch decks, brand strategy, and building a portfolio.",
    experienceYears: 9,
    certifications: [],
    careerSpecialties: ["Advertiser"],
    teachingSpecialties: ["Portfolio review", "Pitch deck workshops"],
    availability: "Weekday afternoons",
    maxApprentices: 3,
    currentApprentices: 0,
    employer: "Brightmark Agency",
    accomplishments: ["Led campaigns for 3 national brands"],
    verification: {
      identityVerified: true,
      backgroundReviewStatus: "cleared",
      credentialsVerified: true,
    },
  },
  {
    id: "mentor_16",
    userId: "user_25",
    displayName: "Devon L.",
    biography:
      "Full-stack developer mentoring self-taught coders into their first web development role.",
    experienceYears: 8,
    certifications: [],
    careerSpecialties: ["Web Development & Programming"],
    teachingSpecialties: ["Code review", "Technical interview prep"],
    availability: "Evenings",
    maxApprentices: 3,
    currentApprentices: 1,
    employer: "Fielding Software",
    accomplishments: ["Mentored 15+ developers into their first tech job"],
    verification: {
      identityVerified: true,
      backgroundReviewStatus: "cleared",
      credentialsVerified: true,
    },
  },
];

export const MOCK_MATCHES: Match[] = [
  {
    id: "match_1",
    applicantId: "app_1",
    mentorId: "mentor_1",
    pathwaySlug: "construction-skilled-trades",
    status: "approved",
    minorProtection: {
      guardianConsent: true,
      adminApproval: true,
      mentorVerified: true,
      backgroundReviewCleared: true,
      communicationAuthorized: true,
    },
    requestedAt: "2026-05-01T12:00:00Z",
    approvedAt: "2026-05-10T12:00:00Z",
  },
  {
    id: "match_2",
    applicantId: "app_2",
    mentorId: "mentor_2",
    pathwaySlug: "cybersecurity",
    status: "admin-review",
    minorProtection: {
      guardianConsent: false,
      adminApproval: false,
      mentorVerified: true,
      backgroundReviewCleared: false,
      communicationAuthorized: false,
    },
    requestedAt: "2026-06-20T12:00:00Z",
  },
];

export function getMentorsForPathway(pathwayName: string): MentorProfile[] {
  const target = pathwayName.toLowerCase();
  return MOCK_MENTORS.filter((mentor) =>
    mentor.careerSpecialties.some((specialty) => {
      const s = specialty.toLowerCase();
      return target.includes(s) || s.includes(target);
    }),
  );
}

function ageFromDateOfBirth(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth);
  if (Number.isNaN(dob.getTime())) return 18;
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const hasHadBirthdayThisYear =
    now.getMonth() > dob.getMonth() ||
    (now.getMonth() === dob.getMonth() && now.getDate() >= dob.getDate());
  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
}

/**
 * Mutates MOCK_APPLICANTS in place so every server-rendered page in this
 * process (admin, mentor, workspace) sees the new applicant immediately —
 * there's no persisted User/ApplicantProfile table yet (see
 * ARCHITECTURE.md §8), so this in-memory array is the applicant "database"
 * until Prisma is wired to a real Postgres instance. It resets on every
 * server restart / cold start, same limitation as src/lib/auth/users.ts.
 */
export function createApplicantProfile(input: {
  userId: string;
  displayName: string;
  dateOfBirth?: string;
}): ApplicantProfile {
  const profile: ApplicantProfile = {
    id: `app_${input.userId}`,
    userId: input.userId,
    displayName: input.displayName,
    dateOfBirth: input.dateOfBirth,
    isMinor: input.dateOfBirth ? ageFromDateOfBirth(input.dateOfBirth) < 18 : false,
    careerProfile: { goals: "", interests: [], availability: "" },
    personality: {},
    skills: [],
    education: "",
    certifications: [],
    accomplishments: [],
    physicalRequirementsAck: false,
    transportation: "not-applicable",
    location: { city: "", state: "", zip: "" },
    assessments: [],
    readinessScore: undefined,
  };
  MOCK_APPLICANTS.push(profile);
  return profile;
}

export function getApplicantByUserId(userId: string): ApplicantProfile | undefined {
  return MOCK_APPLICANTS.find((applicant) => applicant.userId === userId);
}

export function updateApplicantProfile(
  userId: string,
  patch: Partial<Omit<ApplicantProfile, "id" | "userId" | "assessments">>,
): ApplicantProfile | undefined {
  const applicant = getApplicantByUserId(userId);
  if (!applicant) return undefined;
  Object.assign(applicant, patch);
  return applicant;
}

/** Stores the intake score and raw answers on the applicant's own profile. */
export function recordIntakeAssessment(
  userId: string,
  result: { pathwaySlug: string; score: number; responses: Array<{ questionId: string; answer: string | string[] }> },
): AssessmentResult | undefined {
  const applicant = getApplicantByUserId(userId);
  if (!applicant) return undefined;

  const assessment: AssessmentResult = {
    id: `assess_${applicant.id}_${applicant.assessments.length + 1}`,
    type: "skills-assessment",
    pathwaySlug: result.pathwaySlug,
    score: result.score,
    maxScore: 100,
    completedAt: new Date().toISOString(),
    responses: result.responses,
  };
  applicant.assessments.push(assessment);
  applicant.readinessScore = result.score;
  return assessment;
}

export const MOCK_CERTIFICATES: Certificate[] = [];

function formatSpeed(fromIso: string, toIso: string): string {
  const days = Math.max(
    0,
    Math.round((new Date(toIso).getTime() - new Date(fromIso).getTime()) / (1000 * 60 * 60 * 24)),
  );
  if (days === 0) return "Same day";
  if (days === 1) return "1 day";
  if (days < 14) return `${days} days`;
  return `${Math.round(days / 7)} weeks`;
}

/**
 * Issues a Hall of Opportunity certificate for a completed match. There's
 * no real workspace task/milestone completion tracking yet (see
 * ARCHITECTURE.md §8), so this is available on demand from the
 * Certificates tab rather than gated on an automated "100% done" check —
 * a mentor or admin issues it once they've confirmed the applicant is
 * ready.
 */
export function issueCertificate(match: Match, applicant?: ApplicantProfile, mentor?: MentorProfile): Certificate {
  const issuedAt = new Date().toISOString();
  const certificate: Certificate = {
    id: `cert_${match.id}_${MOCK_CERTIFICATES.length + 1}`,
    matchId: match.id,
    title: "Certificate of Completion",
    issuedAt,
    pathwaySlug: match.pathwaySlug,
    applicantName: applicant?.displayName ?? "Unknown Applicant",
    mentorName: mentor?.displayName ?? "Unassigned Mentor",
    grade: applicant?.readinessScore ?? null,
    speedLabel: formatSpeed(match.requestedAt, issuedAt),
  };
  MOCK_CERTIFICATES.push(certificate);
  return certificate;
}

export function getCertificatesForMatch(matchId: string): Certificate[] {
  return MOCK_CERTIFICATES.filter((c) => c.matchId === matchId);
}

/**
 * Mutates MOCK_MENTORS in place, same in-memory-only caveat as
 * createApplicantProfile above. A self-signed-up mentor starts
 * unverified — identityVerified/credentialsVerified/backgroundReview
 * all start false/pending, same as the minor-protection gate requires
 * for any mentor before they can message an applicant.
 */
export function createMentorProfile(input: {
  userId: string;
  displayName: string;
  biography: string;
  careerSpecialties: string[];
  experienceYears: number;
  employer?: string;
}): MentorProfile {
  const mentor: MentorProfile = {
    id: `mentor_${input.userId}`,
    userId: input.userId,
    displayName: input.displayName,
    biography: input.biography,
    experienceYears: input.experienceYears,
    certifications: [],
    careerSpecialties: input.careerSpecialties,
    teachingSpecialties: [],
    availability: "",
    maxApprentices: 1,
    currentApprentices: 0,
    employer: input.employer,
    accomplishments: [],
    verification: {
      identityVerified: false,
      backgroundReviewStatus: "pending",
      credentialsVerified: false,
    },
  };
  MOCK_MENTORS.push(mentor);
  return mentor;
}

export function getMentorByUserId(userId: string): MentorProfile | undefined {
  return MOCK_MENTORS.find((mentor) => mentor.userId === userId);
}

export function getMentorById(mentorId: string): MentorProfile | undefined {
  return MOCK_MENTORS.find((mentor) => mentor.id === mentorId);
}

export function updateMentorProfile(
  userId: string,
  patch: Partial<Omit<MentorProfile, "id" | "userId" | "verification">>,
): MentorProfile | undefined {
  const mentor = getMentorByUserId(userId);
  if (!mentor) return undefined;
  Object.assign(mentor, patch);
  return mentor;
}

export function submitMentorForVerification(userId: string): MentorProfile | undefined {
  const mentor = getMentorByUserId(userId);
  if (!mentor) return undefined;
  if (mentor.verification.backgroundReviewStatus === "not-started") {
    mentor.verification.backgroundReviewStatus = "pending";
  }
  return mentor;
}
