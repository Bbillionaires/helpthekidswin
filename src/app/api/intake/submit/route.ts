import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { generatePathwayRecommendations } from "@/lib/ai/recommend";
import { recordIntakeAssessment } from "@/data/mock";
import type { IntakeResponse } from "@/lib/ai/guide";

export async function POST(request: Request) {
  const body = await request.json();
  const pathwaySlug = body?.pathwaySlug;
  const responses = body?.responses as IntakeResponse[] | undefined;

  if (typeof pathwaySlug !== "string" || !Array.isArray(responses)) {
    return NextResponse.json({ error: "pathwaySlug and responses are required" }, { status: 400 });
  }

  const result = generatePathwayRecommendations(responses, pathwaySlug);

  const session = await auth();
  if (session?.user?.id) {
    recordIntakeAssessment(session.user.id, {
      pathwaySlug,
      score: result.picked.fitScore,
      responses,
    });
  }

  return NextResponse.json(result);
}
