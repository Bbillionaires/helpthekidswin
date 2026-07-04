/**
 * In-memory demo data. Replace with real queries once Prisma is wired to
 * a live database (see prisma/schema.prisma and ARCHITECTURE.md).
 */

import type { ApplicantProfile, MentorProfile, Match } from "@/types";

export const MOCK_APPLICANTS: ApplicantProfile[] = [
  {
    id: "app_1",
    userId: "user_1",
    displayName: "Jordan M.",
    isMinor: true,
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
