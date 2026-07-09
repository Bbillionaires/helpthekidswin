/**
 * Pathway recommendation engine.
 *
 * `generatePathwayRecommendations` is the single seam between the intake
 * interview and an LLM. The current implementation is a deterministic
 * weighted scorer so the product works end-to-end without an API key. To
 * go live, replace the body with a call to your LLM provider (e.g. the
 * Claude Messages API) using the same signature — prompt it with the
 * applicant's answers plus PATHWAYS, and parse its response into the same
 * RecommendationResult shape. Keep the "advisory only" framing in the
 * explanation text: the applicant always makes the final choice.
 */

import { PATHWAYS, type CareerPathway } from "@/lib/pathways";
import type { IntakeResponse } from "@/lib/ai/guide";
import type { PathwayRecommendation } from "@/types";

const INTEREST_TAG_MAP: Record<string, string[]> = {
  Technology: ["technology", "remote-friendly"],
  "Caring for people": ["healthcare", "caregiving", "service"],
  "Building things": ["trades", "hands-on", "apprenticeship"],
  "Public safety": ["public-safety"],
  Travel: ["travel", "maritime"],
  Logistics: ["logistics"],
  "Leadership / service": ["leadership", "service", "discipline"],
};

const MOTIVATION_TAG_MAP: Record<string, string[]> = {
  "Helping others": ["caregiving", "service"],
  "Mastering a craft": ["trades", "apprenticeship", "engineering"],
  "Recognition / advancement": ["leadership"],
  "Structure and routine": ["discipline", "union"],
  Independence: ["remote-friendly", "independence"],
};

const TEAM_STYLE_TAG_MAP: Record<string, string[]> = {
  Alone: ["remote-friendly", "independence"],
  "Small crew": ["trades", "apprenticeship", "union"],
  "Leading a team": ["leadership", "service"],
};

function answerOf(responses: IntakeResponse[], questionId: string): string | string[] | undefined {
  return responses.find((r) => r.questionId === questionId)?.answer;
}

function scaleOf(responses: IntakeResponse[], questionId: string): number {
  const raw = answerOf(responses, questionId);
  const n = typeof raw === "string" ? Number(raw) : NaN;
  return Number.isFinite(n) ? n : 3; // default to the midpoint if unanswered
}

/**
 * Hard disqualifiers remove a pathway from consideration entirely.
 * Caution flags dock points and surface a note, but don't block it —
 * many of these are things a program can work around (a GED in
 * progress, a conditional background review) rather than a wall.
 */
interface Disqualifier {
  questionId: string;
  triggerAnswers: string[];
  affectedSlugs: string[] | "all";
  severity: "hard" | "caution";
  note: string;
}

const DISQUALIFIERS: Disqualifier[] = [
  {
    questionId: "qualify-work-authorization",
    triggerAnswers: ["No"],
    affectedSlugs: "all",
    severity: "hard",
    note: "Every pathway here requires legal authorization to work in the U.S. — this doesn't disqualify you from other support, but it does block a direct match today.",
  },
  {
    questionId: "qualify-age",
    triggerAnswers: ["Under 16"],
    affectedSlugs: ["military", "police-officer", "firefighter", "truck-driver", "merchant-marine", "longshoremen"],
    severity: "hard",
    note: "This pathway has a minimum age requirement (typically 18) that you haven't reached yet.",
  },
  {
    questionId: "qualify-felony",
    triggerAnswers: ["Yes"],
    affectedSlugs: ["police-officer", "military"],
    severity: "hard",
    note: "A felony conviction generally disqualifies this pathway's background review.",
  },
  {
    questionId: "qualify-felony",
    triggerAnswers: ["Yes"],
    affectedSlugs: ["cybersecurity", "healthcare", "firefighter", "merchant-marine", "longshoremen"],
    severity: "caution",
    note: "A felony conviction may affect this pathway's background review depending on the offense — some programs review case by case.",
  },
  {
    questionId: "qualify-dui",
    triggerAnswers: ["Yes"],
    affectedSlugs: ["truck-driver"],
    severity: "hard",
    note: "A DUI/DWI conviction generally disqualifies commercial driving licensure.",
  },
  {
    questionId: "qualify-dui",
    triggerAnswers: ["Yes"],
    affectedSlugs: ["police-officer", "military", "longshoremen", "merchant-marine"],
    severity: "caution",
    note: "A DUI/DWI conviction may come up in this pathway's background or driving review.",
  },
  {
    questionId: "qualify-education",
    triggerAnswers: ["Some high school"],
    affectedSlugs: ["healthcare", "cybersecurity", "ai-architect", "police-officer", "firefighter", "military"],
    severity: "caution",
    note: "This pathway typically expects a high school diploma or GED — many programs let you enroll in one concurrently.",
  },
];

function disqualifiersFor(responses: IntakeResponse[], slug: string) {
  return DISQUALIFIERS.filter((d) => {
    const answer = answerOf(responses, d.questionId);
    const matchesAnswer = typeof answer === "string" && d.triggerAnswers.includes(answer);
    const matchesSlug = d.affectedSlugs === "all" || d.affectedSlugs.includes(slug);
    return matchesAnswer && matchesSlug;
  });
}

function baseScore(pathway: CareerPathway, responses: IntakeResponse[]): number {
  let score = 0;

  const interests = (answerOf(responses, "interests") ?? []) as string[];
  const motivations = (answerOf(responses, "psych-motivation") ?? []) as string[];
  const environment = answerOf(responses, "environment") as string | undefined;
  const teamStyle = answerOf(responses, "team-style") as string | undefined;

  const relevantTags = new Set<string>([
    ...interests.flatMap((i) => INTEREST_TAG_MAP[i] ?? []),
    ...motivations.flatMap((m) => MOTIVATION_TAG_MAP[m] ?? []),
    ...(teamStyle ? TEAM_STYLE_TAG_MAP[teamStyle] ?? [] : []),
  ]);

  if (environment === "Remote / independent") relevantTags.add("remote-friendly");
  if (environment === "Outdoors") relevantTags.add("maritime");
  if (environment === "Hands-on / physical") relevantTags.add("hands-on");

  score += pathway.tags.filter((tag) => relevantTags.has(tag)).length * 8;

  // Risk tolerance and physical fitness vs. the pathway's physical demand.
  const riskTolerance = scaleOf(responses, "risk-tolerance");
  const fitness = scaleOf(responses, "health-fitness-rating");
  const physicalSignal = (riskTolerance + fitness) / 2;
  if (pathway.physicalDemand === "high") score += (physicalSignal - 3) * 6;
  if (pathway.physicalDemand === "low") score += (3 - physicalSignal) * 6;

  // Science/aptitude signal — correct answers nudge technical and
  // safety-conscious pathways.
  if (answerOf(responses, "science-math-aptitude") === "9") {
    score += pathway.tags.some((t) => ["technology", "engineering"].includes(t)) ? 10 : 0;
  }
  if (answerOf(responses, "science-safety-scenario") === "Move away and alert a supervisor immediately") {
    score += pathway.tags.some((t) => ["public-safety", "trades", "maritime"].includes(t)) ? 6 : 0;
  }

  // Skill level and willingness to train — small boost toward
  // certification-heavy pathways when someone's already invested.
  const skillLevel = answerOf(responses, "skill-self-rating");
  if (skillLevel === "Certified / experienced" || skillLevel === "Trained but not certified") {
    score += pathway.requirements.some((r) => /cert|license/i.test(r)) ? 8 : 0;
  }

  return Math.max(0, score);
}

export interface PickedFitResult {
  pathwaySlug: string;
  fitScore: number; // 0-100
  eligible: boolean;
  explanation: string;
  cautionNotes: string[];
}

export interface RecommendationResult {
  picked: PickedFitResult;
  /** Other pathways, ranked, that may fit as well or better — the contingency options. */
  alternates: PathwayRecommendation[];
}

function normalize(raw: number, maxRaw: number): number {
  if (maxRaw <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((raw / maxRaw) * 100)));
}

export function generatePathwayRecommendations(
  responses: IntakeResponse[],
  pickedSlug: string,
): RecommendationResult {
  const scored = PATHWAYS.map((pathway) => {
    const disqualifiers = disqualifiersFor(responses, pathway.slug);
    const hard = disqualifiers.filter((d) => d.severity === "hard");
    const caution = disqualifiers.filter((d) => d.severity === "caution");
    const raw = baseScore(pathway, responses) - caution.length * 12;
    return { pathway, raw: Math.max(0, raw), eligible: hard.length === 0, hard, caution };
  });

  const maxRaw = Math.max(1, ...scored.map((s) => s.raw));

  const pickedEntry = scored.find((s) => s.pathway.slug === pickedSlug);
  const picked: PickedFitResult = pickedEntry
    ? {
        pathwaySlug: pickedSlug,
        fitScore: normalize(pickedEntry.raw, maxRaw),
        eligible: pickedEntry.eligible,
        explanation: pickedEntry.eligible
          ? `Based on your answers, this door lines up well with what you told us — this is advisory, and you decide whether to lock it in.`
          : `Your answers raised a screening concern for this specific door: ${pickedEntry.hard.map((d) => d.note).join(" ")}`,
        cautionNotes: pickedEntry.caution.map((d) => d.note),
      }
    : {
        pathwaySlug: pickedSlug,
        fitScore: 0,
        eligible: false,
        explanation: "We couldn't score this pathway.",
        cautionNotes: [],
      };

  const alternates = scored
    .filter((s) => s.pathway.slug !== pickedSlug && s.eligible)
    .sort((a, b) => b.raw - a.raw)
    .slice(0, 3)
    .map((entry, index) => {
      const fitScore = normalize(entry.raw, maxRaw);
      const betterFit = fitScore > picked.fitScore;
      const cautionText = entry.caution.length
        ? ` Worth knowing: ${entry.caution.map((d) => d.note).join(" ")}`
        : "";
      return {
        pathwaySlug: entry.pathway.slug,
        rank: (index + 1) as 1 | 2 | 3,
        confidence: Math.round((fitScore / 100) * 100) / 100,
        explanation: `${entry.pathway.name} scores ${fitScore}% on your answers${
          betterFit ? " — a stronger match than the door you walked through" : " as a contingency option"
        }.${cautionText} This is a suggestion — you decide which door to walk through.`,
      } satisfies PathwayRecommendation;
    });

  return { picked, alternates };
}
