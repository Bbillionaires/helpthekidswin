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
