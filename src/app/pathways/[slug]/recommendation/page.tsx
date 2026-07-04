"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { generatePathwayRecommendations } from "@/lib/ai/recommend";
import { getPathway } from "@/lib/pathways";
import { INTAKE_STORAGE_KEY } from "@/lib/ai/session";
import type { IntakeResponse } from "@/lib/ai/guide";
import type { PathwayRecommendation } from "@/types";

export default function RecommendationPage() {
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<PathwayRecommendation[] | null>(
    null,
  );

  useEffect(() => {
    const raw = sessionStorage.getItem(INTAKE_STORAGE_KEY);
    const responses: IntakeResponse[] = raw ? JSON.parse(raw) : [];
    setRecommendations(generatePathwayRecommendations(responses));
  }, []);

  if (!recommendations) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-hallway-void text-white/60">
        Analyzing your answers...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-hallway-void px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-center font-display text-3xl font-bold text-white">
          Your Recommended Pathways
        </h1>
        <p className="mb-10 text-center text-white/60">
          This is advisory only — you make the final decision on which door to walk
          through.
        </p>

        <div className="space-y-4">
          {recommendations.map((rec) => {
            const pathway = getPathway(rec.pathwaySlug);
            if (!pathway) return null;
            return (
              <div
                key={rec.pathwaySlug}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{pathway.icon}</span>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-hallway-gold">
                        #{rec.rank} Recommendation
                      </p>
                      <h2 className="font-display text-xl font-semibold text-white">
                        {pathway.name}
                      </h2>
                    </div>
                  </div>
                </div>
                <p className="mb-4 text-sm text-white/70">{rec.explanation}</p>
                {rec.rank === 1 && (
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => router.push(`/apply/profile?pathway=${pathway.slug}`)}
                      className="rounded-full bg-hallway-gold px-6 py-2 font-semibold text-hallway-void transition hover:brightness-110"
                    >
                      Lock This Door
                    </button>
                    <Link
                      href="/hall-of-opportunity"
                      className="rounded-full border border-white/30 px-6 py-2 font-semibold text-white transition hover:bg-white/10"
                    >
                      Explore Another Door
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
