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

export type IntakeQuestionCategory =
  | "core"
  | "pathway-specific"
  | "skill-level"
  | "psychology"
  | "health-fitness"
  | "science-awareness"
  | "qualifying";

export interface IntakeQuestion {
  id: string;
  prompt: string;
  kind: "text" | "choice" | "multi-choice" | "scale";
  choices?: string[];
  category: IntakeQuestionCategory;
}

export const INTAKE_QUESTIONS: IntakeQuestion[] = [
  {
    id: "goals",
    prompt: "What does success look like for you in the next 3-5 years?",
    kind: "text",
    category: "core",
  },
  {
    id: "environment",
    prompt: "Do you prefer working outdoors, hands-on, in an office, or remotely?",
    kind: "choice",
    choices: ["Outdoors", "Hands-on / physical", "Office / structured", "Remote / independent"],
    category: "core",
  },
  {
    id: "team-style",
    prompt: "Do you prefer working alone, in a small crew, or leading a team?",
    kind: "choice",
    choices: ["Alone", "Small crew", "Leading a team"],
    category: "core",
  },
  {
    id: "risk-tolerance",
    prompt: "How comfortable are you with physically demanding or high-stakes work?",
    kind: "scale",
    category: "core",
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
    category: "core",
  },
  {
    id: "timeline",
    prompt: "How soon are you hoping to start training or working?",
    kind: "choice",
    choices: ["Immediately", "Within 6 months", "Within a year", "Still exploring"],
    category: "core",
  },
];

export interface IntakeResponse {
  questionId: string;
  answer: string | string[];
}

/**
 * Pathway-specific follow-up questions, inserted right after the core
 * questions so every room's mirror leads into an interview that actually
 * reflects that career — not just the same questions shown everywhere.
 * Question ids are prefixed with the pathway slug to stay unique.
 */
export const PATHWAY_INTAKE_QUESTIONS: Record<string, IntakeQuestion[]> = {
  "merchant-marine": [
    {
      id: "merchant-marine-time-away",
      prompt: "Are you comfortable being away from home for weeks at a time aboard a vessel?",
      kind: "choice",
      choices: ["Yes, comfortable with that", "Not sure yet", "No, that's a dealbreaker"],
      category: "pathway-specific",
    },
    {
      id: "merchant-marine-conditions",
      prompt: "How do you feel about physically demanding work in all weather conditions?",
      kind: "scale",
      category: "pathway-specific",
    },
  ],
  longshoremen: [
    {
      id: "longshoremen-machinery",
      prompt: "Are you comfortable operating heavy machinery like cranes and forklifts?",
      kind: "choice",
      choices: ["Yes", "Willing to learn", "Not for me"],
      category: "pathway-specific",
    },
    {
      id: "longshoremen-pace",
      prompt: "How do you feel about working outdoors in a fast-paced, physical dock environment?",
      kind: "scale",
      category: "pathway-specific",
    },
  ],
  military: [
    {
      id: "military-discipline",
      prompt: "How prepared are you for structured discipline, chain of command, and physical training?",
      kind: "scale",
      category: "pathway-specific",
    },
    {
      id: "military-branch",
      prompt: "Which branch interests you most, if any?",
      kind: "choice",
      choices: ["Army", "Navy", "Air Force", "Marines", "Coast Guard", "Not sure yet"],
      category: "pathway-specific",
    },
  ],
  "police-officer": [
    {
      id: "police-deescalation",
      prompt: "How comfortable are you with de-escalating high-stress situations?",
      kind: "scale",
      category: "pathway-specific",
    },
    {
      id: "police-background",
      prompt: "Would a background review of your history raise any concerns?",
      kind: "choice",
      choices: ["No concerns", "Some concerns", "Not sure"],
      category: "pathway-specific",
    },
  ],
  firefighter: [
    {
      id: "firefighter-risk",
      prompt: "Are you comfortable entering physically dangerous situations to help others?",
      kind: "scale",
      category: "pathway-specific",
    },
    {
      id: "firefighter-emt",
      prompt: "Are you willing to pursue EMT certification alongside firefighter training?",
      kind: "choice",
      choices: ["Yes", "Maybe", "No"],
      category: "pathway-specific",
    },
  ],
  "truck-driver": [
    {
      id: "truck-driver-solo",
      prompt: "Are you comfortable spending long hours alone on the road, including overnight trips?",
      kind: "choice",
      choices: ["Yes", "Occasionally", "Prefer to be home most nights"],
      category: "pathway-specific",
    },
    {
      id: "truck-driver-record",
      prompt: "Do you have a clean driving record, or a plan to get one?",
      kind: "choice",
      choices: ["Yes", "Working on it", "Not sure"],
      category: "pathway-specific",
    },
  ],
  "construction-skilled-trades": [
    {
      id: "construction-trade",
      prompt: "Which trade interests you most?",
      kind: "multi-choice",
      choices: ["Electrical", "Plumbing", "Carpentry", "HVAC", "Welding", "Not sure yet"],
      category: "pathway-specific",
    },
    {
      id: "construction-physical",
      prompt: "How comfortable are you with hands-on physical work on job sites?",
      kind: "scale",
      category: "pathway-specific",
    },
  ],
  healthcare: [
    {
      id: "healthcare-level",
      prompt: "Which level of care interests you first?",
      kind: "choice",
      choices: ["CNA", "LPN", "RN", "Not sure yet"],
      category: "pathway-specific",
    },
    {
      id: "healthcare-emotional",
      prompt: "How comfortable are you with the emotional demands of caring for people who are sick or in pain?",
      kind: "scale",
      category: "pathway-specific",
    },
  ],
  cybersecurity: [
    {
      id: "cybersecurity-selftaught",
      prompt: "Have you done any self-teaching in networking, coding, or security?",
      kind: "choice",
      choices: ["Yes, a lot", "A little", "Not yet"],
      category: "pathway-specific",
    },
    {
      id: "cybersecurity-independent",
      prompt: "Are you comfortable with mostly independent, screen-based work?",
      kind: "scale",
      category: "pathway-specific",
    },
  ],
  "ai-architect": [
    {
      id: "ai-architect-projects",
      prompt: "Have you built any programming projects, even small ones?",
      kind: "choice",
      choices: ["Yes, several", "One or two", "Not yet"],
      category: "pathway-specific",
    },
    {
      id: "ai-architect-abstract",
      prompt: "How comfortable are you with abstract, math-heavy problem solving?",
      kind: "scale",
      category: "pathway-specific",
    },
  ],
  "web-development-programming": [
    {
      id: "web-dev-projects",
      prompt: "Have you built any web or software projects, even small ones?",
      kind: "choice",
      choices: ["Yes, several", "One or two", "Not yet"],
      category: "pathway-specific",
    },
    {
      id: "web-dev-independent",
      prompt: "Are you comfortable with mostly independent, screen-based work?",
      kind: "scale",
      category: "pathway-specific",
    },
  ],
  "business-acquisition": [
    {
      id: "business-acquisition-experience",
      prompt: "Have you ever run, managed, or helped operate a business?",
      kind: "choice",
      choices: ["Yes", "Some exposure", "Not yet"],
      category: "pathway-specific",
    },
    {
      id: "business-acquisition-risk",
      prompt: "How comfortable are you with financial risk in pursuit of growth?",
      kind: "scale",
      category: "pathway-specific",
    },
  ],
  "stock-trading": [
    {
      id: "stock-trading-experience",
      prompt: "Have you traded stocks or studied the markets before?",
      kind: "choice",
      choices: ["Yes, actively", "A little", "Not yet"],
      category: "pathway-specific",
    },
    {
      id: "stock-trading-risk",
      prompt: "How comfortable are you with market ups and downs?",
      kind: "scale",
      category: "pathway-specific",
    },
  ],
  attorney: [
    {
      id: "attorney-education",
      prompt: "Are you prepared for the years of schooling and the bar exam law requires?",
      kind: "scale",
      category: "pathway-specific",
    },
    {
      id: "attorney-argument",
      prompt: "How comfortable are you with debate, argument, and public speaking?",
      kind: "scale",
      category: "pathway-specific",
    },
  ],
  accounting: [
    {
      id: "accounting-detail",
      prompt: "How comfortable are you with detailed, numbers-heavy work?",
      kind: "scale",
      category: "pathway-specific",
    },
    {
      id: "accounting-cpa",
      prompt: "Are you open to pursuing a CPA certification?",
      kind: "choice",
      choices: ["Yes", "Maybe", "Not sure yet"],
      category: "pathway-specific",
    },
  ],
  advertiser: [
    {
      id: "advertiser-creative",
      prompt: "How comfortable are you pitching creative ideas to others?",
      kind: "scale",
      category: "pathway-specific",
    },
    {
      id: "advertiser-portfolio",
      prompt: "Do you have any creative work (writing, design, video, campaigns) you could show?",
      kind: "choice",
      choices: ["Yes, a portfolio", "A little", "Not yet"],
      category: "pathway-specific",
    },
  ],
};

/** Shared across every pathway — self-assessed skill level and training readiness. */
export const SKILL_LEVEL_QUESTIONS: IntakeQuestion[] = [
  {
    id: "skill-self-rating",
    prompt: "How would you rate your current skill level in this field?",
    kind: "choice",
    choices: ["Complete beginner", "Some exposure", "Trained but not certified", "Certified / experienced"],
    category: "skill-level",
  },
  {
    id: "skill-certifications",
    prompt: "Do you already hold any certifications, licenses, or formal training related to this field?",
    kind: "text",
    category: "skill-level",
  },
  {
    id: "skill-learning-willingness",
    prompt: "How willing are you to spend months in training or an apprenticeship before you're fully qualified?",
    kind: "scale",
    category: "skill-level",
  },
];

/** Shared across every pathway — work-style psychology signals. */
export const PSYCHOLOGY_QUESTIONS: IntakeQuestion[] = [
  {
    id: "psych-stress-response",
    prompt: "When things go wrong under pressure, what do you usually do?",
    kind: "choice",
    choices: [
      "Stay calm and problem-solve",
      "Get anxious but push through",
      "Need a moment to reset first",
      "Not sure — haven't been tested much",
    ],
    category: "psychology",
  },
  {
    id: "psych-decision-style",
    prompt: "How do you usually make important decisions?",
    kind: "choice",
    choices: [
      "Quickly, on instinct",
      "After weighing pros and cons carefully",
      "By asking others for input",
      "I tend to avoid deciding until I have to",
    ],
    category: "psychology",
  },
  {
    id: "psych-motivation",
    prompt: "What motivates you most in a job?",
    kind: "multi-choice",
    choices: [
      "Helping others",
      "Financial stability",
      "Mastering a craft",
      "Recognition / advancement",
      "Structure and routine",
      "Independence",
    ],
    category: "psychology",
  },
  {
    id: "psych-resilience",
    prompt: "How comfortable are you with failing at something and trying again?",
    kind: "scale",
    category: "psychology",
  },
];

/** Shared across every pathway — health and fitness self-awareness. */
export const HEALTH_FITNESS_QUESTIONS: IntakeQuestion[] = [
  {
    id: "health-fitness-rating",
    prompt: "How would you rate your current physical fitness level?",
    kind: "scale",
    category: "health-fitness",
  },
  {
    id: "health-conditions-awareness",
    prompt:
      "Do you have any health or medical conditions that could affect your ability to do physically demanding work? This stays confidential and is only used for safe matching.",
    kind: "choice",
    choices: ["No known conditions", "Yes, but manageable", "Yes, it may limit some roles", "Prefer not to say"],
    category: "health-fitness",
  },
  {
    id: "health-physical-exam",
    prompt: "Are you able to pass a physical fitness or medical exam if the role requires one?",
    kind: "choice",
    choices: ["Yes", "Not sure", "No"],
    category: "health-fitness",
  },
];

/** Shared across every pathway — basic science/situational-awareness signal. */
export const SCIENCE_AWARENESS_QUESTIONS: IntakeQuestion[] = [
  {
    id: "science-safety-scenario",
    prompt:
      "You notice a container labeled \"Corrosive\" leaking next to one labeled \"Flammable.\" What's the safest first step?",
    kind: "choice",
    choices: [
      "Move away and alert a supervisor immediately",
      "Try to separate them yourself",
      "Ignore it — it's probably fine",
      "Pour water on both",
    ],
    category: "science-awareness",
  },
  {
    id: "science-math-aptitude",
    prompt:
      "A task calls for mixing 2 parts of Solution A with 3 parts of Solution B. If you use 6 parts of Solution A, how many parts of Solution B do you need?",
    kind: "choice",
    choices: ["4", "6", "9", "12"],
    category: "science-awareness",
  },
  {
    id: "science-general-aptitude",
    prompt: "How comfortable are you with reading instructions, diagrams, or manuals to learn how something works?",
    kind: "scale",
    category: "science-awareness",
  },
];

/**
 * Shared across every pathway — qualifying / disqualifying screening
 * questions. Answers here feed the hard/soft disqualification logic in
 * src/lib/ai/recommend.ts (e.g. a felony conviction rules out Police
 * Officer and Military, a DUI rules out Truck Driver). Nothing in this
 * file decides eligibility itself — this is just the raw question bank.
 */
export const QUALIFYING_QUESTIONS: IntakeQuestion[] = [
  {
    id: "qualify-age",
    prompt: "What is your age range?",
    kind: "choice",
    choices: ["Under 16", "16-17", "18-24", "25-39", "40+"],
    category: "qualifying",
  },
  {
    id: "qualify-education",
    prompt: "What is the highest level of education you've completed?",
    kind: "choice",
    choices: [
      "Some high school",
      "High school diploma / GED",
      "Some college or trade school",
      "Associate's degree",
      "Bachelor's degree or higher",
    ],
    category: "qualifying",
  },
  {
    id: "qualify-work-authorization",
    prompt: "Are you legally authorized to work in the United States?",
    kind: "choice",
    choices: ["Yes", "No", "Not sure"],
    category: "qualifying",
  },
  {
    id: "qualify-felony",
    prompt: "Have you ever been convicted of a felony?",
    kind: "choice",
    choices: ["No", "Yes", "Prefer not to say"],
    category: "qualifying",
  },
  {
    id: "qualify-dui",
    prompt: "Do you have any DUI/DWI convictions on your driving record?",
    kind: "choice",
    choices: ["No", "Yes", "Not applicable — I don't drive", "Prefer not to say"],
    category: "qualifying",
  },
  {
    id: "qualify-background-check",
    prompt: "Are you willing to consent to a background check if a mentor match requires one?",
    kind: "choice",
    choices: ["Yes", "No", "Need more information"],
    category: "qualifying",
  },
];

/**
 * Full interview for a given pathway: core → that pathway's own follow-ups
 * → skill level → psychology → health/fitness → science awareness →
 * qualifying screening. Capped well under the 33-question limit (27 today)
 * so there's room to grow without hitting it.
 */
export function getIntakeQuestions(slug: string): IntakeQuestion[] {
  return [
    ...INTAKE_QUESTIONS,
    ...(PATHWAY_INTAKE_QUESTIONS[slug] ?? []),
    ...SKILL_LEVEL_QUESTIONS,
    ...PSYCHOLOGY_QUESTIONS,
    ...HEALTH_FITNESS_QUESTIONS,
    ...SCIENCE_AWARENESS_QUESTIONS,
    ...QUALIFYING_QUESTIONS,
  ];
}

/** Looks up a question's human-readable prompt by id, for rendering stored answers (e.g. on the admin applicant review page). */
export function findQuestionPrompt(pathwaySlug: string, questionId: string): string {
  return getIntakeQuestions(pathwaySlug).find((q) => q.id === questionId)?.prompt ?? questionId;
}
