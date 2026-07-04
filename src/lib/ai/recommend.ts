/**
 * Pathway recommendation engine.
 *
 * `generatePathwayRecommendations` is the single seam between the intake
 * interview and an LLM. The current implementation is a deterministic
 * tag-overlap scorer so the product works end-to-end without an API key.
 * To go live, replace the body with a call to your LLM provider (e.g. the
 * Claude Messages API) using the same signature — prompt it with the
 * applicant's answers and PATHWAYS, and parse its response into
 * PathwayRecommendation[]. Keep the "advisory only" framing in the
 * explanation text: the applicant always makes the final choice.
 */

import { PATHWAYS } from "@/lib/pathways";
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

export function generatePathwayRecommendations(
  responses: IntakeResponse[],
): PathwayRecommendation[] {
  const interests = (responses.find((r) => r.questionId === "interests")
    ?.answer ?? []) as string[];
  const environment = responses.find((r) => r.questionId === "environment")
    ?.answer as string | undefined;

  const relevantTags = new Set<string>(
    interests.flatMap((interest) => INTEREST_TAG_MAP[interest] ?? []),
  );

  if (environment === "Remote / independent") relevantTags.add("remote-friendly");
  if (environment === "Outdoors") relevantTags.add("maritime");
  if (environment === "Hands-on / physical") relevantTags.add("hands-on");

  const scored = PATHWAYS.map((pathway) => {
    const overlap = pathway.tags.filter((tag) => relevantTags.has(tag)).length;
    return { pathway, score: overlap };
  }).sort((a, b) => b.score - a.score);

  const top3 = scored.slice(0, 3);
  const maxScore = Math.max(1, top3[0]?.score ?? 1);

  return top3.map((entry, index) => ({
    pathwaySlug: entry.pathway.slug,
    rank: (index + 1) as 1 | 2 | 3,
    confidence: Math.round((entry.score / maxScore) * 100) / 100,
    explanation: `${entry.pathway.name} lines up with what you told us: ${entry.pathway.tags
      .filter((tag) => relevantTags.has(tag))
      .join(", ") || "a strong overall fit based on your goals"}. This is a suggestion — you decide which door to walk through.`,
  }));
}
