/**
 * The AI guide that welcomes visitors into the Hall of Opportunity and
 * conducts the intake interview. The welcome script is fixed copy; the
 * intake questions feed src/lib/ai/recommend.ts.
 */

export const GUIDE_WELCOME_MESSAGE = [
  "Every successful future begins with one decision.",
  "Behind every door is a different opportunity.",
  "Let's discover which one fits you best.",
];

export interface IntakeQuestion {
  id: string;
  prompt: string;
  kind: "text" | "choice" | "multi-choice" | "scale";
  choices?: string[];
}

export const INTAKE_QUESTIONS: IntakeQuestion[] = [
  {
    id: "goals",
    prompt: "What does success look like for you in the next 3-5 years?",
    kind: "text",
  },
  {
    id: "environment",
    prompt: "Do you prefer working outdoors, hands-on, in an office, or remotely?",
    kind: "choice",
    choices: ["Outdoors", "Hands-on / physical", "Office / structured", "Remote / independent"],
  },
  {
    id: "team-style",
    prompt: "Do you prefer working alone, in a small crew, or leading a team?",
    kind: "choice",
    choices: ["Alone", "Small crew", "Leading a team"],
  },
  {
    id: "risk-tolerance",
    prompt: "How comfortable are you with physically demanding or high-stakes work?",
    kind: "scale",
  },
  {
    id: "interests",
    prompt: "Which of these sound interesting to you?",
    kind: "multi-choice",
    choices: [
      "Technology",
      "Caring for people",
      "Building things",
      "Public safety",
      "Travel",
      "Logistics",
      "Leadership / service",
    ],
  },
  {
    id: "timeline",
    prompt: "How soon are you hoping to start training or working?",
    kind: "choice",
    choices: ["Immediately", "Within 6 months", "Within a year", "Still exploring"],
  },
];

export interface IntakeResponse {
  questionId: string;
  answer: string | string[];
}

/**
 * Pathway-specific follow-up questions, appended after INTAKE_QUESTIONS so
 * every room's mirror leads into an interview that actually reflects that
 * career — not just the same six generic questions everywhere. Question
 * ids are prefixed with the pathway slug to stay unique across pathways.
 *
 * generatePathwayRecommendations() (src/lib/ai/recommend.ts) only reads the
 * base questions' ids ("interests", "environment") today, so these answers
 * are captured and stored but not yet scored — same seam documented in
 * ARCHITECTURE.md for the future LLM integration to pick up.
 */
export const PATHWAY_INTAKE_QUESTIONS: Record<string, IntakeQuestion[]> = {
  "merchant-marine": [
    {
      id: "merchant-marine-time-away",
      prompt: "Are you comfortable being away from home for weeks at a time aboard a vessel?",
      kind: "choice",
      choices: ["Yes, comfortable with that", "Not sure yet", "No, that's a dealbreaker"],
    },
    {
      id: "merchant-marine-conditions",
      prompt: "How do you feel about physically demanding work in all weather conditions?",
      kind: "scale",
    },
  ],
  longshoremen: [
    {
      id: "longshoremen-machinery",
      prompt: "Are you comfortable operating heavy machinery like cranes and forklifts?",
      kind: "choice",
      choices: ["Yes", "Willing to learn", "Not for me"],
    },
    {
      id: "longshoremen-pace",
      prompt: "How do you feel about working outdoors in a fast-paced, physical dock environment?",
      kind: "scale",
    },
  ],
  military: [
    {
      id: "military-discipline",
      prompt: "How prepared are you for structured discipline, chain of command, and physical training?",
      kind: "scale",
    },
    {
      id: "military-branch",
      prompt: "Which branch interests you most, if any?",
      kind: "choice",
      choices: ["Army", "Navy", "Air Force", "Marines", "Coast Guard", "Not sure yet"],
    },
  ],
  "police-officer": [
    {
      id: "police-deescalation",
      prompt: "How comfortable are you with de-escalating high-stress situations?",
      kind: "scale",
    },
    {
      id: "police-background",
      prompt: "Would a background review of your history raise any concerns?",
      kind: "choice",
      choices: ["No concerns", "Some concerns", "Not sure"],
    },
  ],
  firefighter: [
    {
      id: "firefighter-risk",
      prompt: "Are you comfortable entering physically dangerous situations to help others?",
      kind: "scale",
    },
    {
      id: "firefighter-emt",
      prompt: "Are you willing to pursue EMT certification alongside firefighter training?",
      kind: "choice",
      choices: ["Yes", "Maybe", "No"],
    },
  ],
  "truck-driver": [
    {
      id: "truck-driver-solo",
      prompt: "Are you comfortable spending long hours alone on the road, including overnight trips?",
      kind: "choice",
      choices: ["Yes", "Occasionally", "Prefer to be home most nights"],
    },
    {
      id: "truck-driver-record",
      prompt: "Do you have a clean driving record, or a plan to get one?",
      kind: "choice",
      choices: ["Yes", "Working on it", "Not sure"],
    },
  ],
  "construction-skilled-trades": [
    {
      id: "construction-trade",
      prompt: "Which trade interests you most?",
      kind: "multi-choice",
      choices: ["Electrical", "Plumbing", "Carpentry", "HVAC", "Welding", "Not sure yet"],
    },
    {
      id: "construction-physical",
      prompt: "How comfortable are you with hands-on physical work on job sites?",
      kind: "scale",
    },
  ],
  healthcare: [
    {
      id: "healthcare-level",
      prompt: "Which level of care interests you first?",
      kind: "choice",
      choices: ["CNA", "LPN", "RN", "Not sure yet"],
    },
    {
      id: "healthcare-emotional",
      prompt: "How comfortable are you with the emotional demands of caring for people who are sick or in pain?",
      kind: "scale",
    },
  ],
  cybersecurity: [
    {
      id: "cybersecurity-selftaught",
      prompt: "Have you done any self-teaching in networking, coding, or security?",
      kind: "choice",
      choices: ["Yes, a lot", "A little", "Not yet"],
    },
    {
      id: "cybersecurity-independent",
      prompt: "Are you comfortable with mostly independent, screen-based work?",
      kind: "scale",
    },
  ],
  "ai-architect": [
    {
      id: "ai-architect-projects",
      prompt: "Have you built any programming projects, even small ones?",
      kind: "choice",
      choices: ["Yes, several", "One or two", "Not yet"],
    },
    {
      id: "ai-architect-abstract",
      prompt: "How comfortable are you with abstract, math-heavy problem solving?",
      kind: "scale",
    },
  ],
};

export function getIntakeQuestions(slug: string): IntakeQuestion[] {
  return [...INTAKE_QUESTIONS, ...(PATHWAY_INTAKE_QUESTIONS[slug] ?? [])];
}
