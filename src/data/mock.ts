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
