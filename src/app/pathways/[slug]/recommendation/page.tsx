"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { RecommendationResult } from "@/lib/ai/recommend";
import { getPathway } from "@/lib/pathways";
import { INTAKE_STORAGE_KEY } from "@/lib/ai/session";

export default function RecommendationPage() {
  const router = useRouter();
  const [result, setResult] = useState<RecommendationResult | null>(null);

  useEffect(() => {
    // The score is computed server-side by /api/intake/submit (so it can be
    // persisted to the applicant's profile) and handed off here via
    // sessionStorage — a placeholder for a real server-side session, see
    // ARCHITECTURE.md.
    const raw = sessionStorage.getItem(INTAKE_STORAGE_KEY);
    if (raw) setResult(JSON.parse(raw));
  }, []);

  if (!result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-hallway-void text-white/60">
        Analyzing your answers...
      </main>
    );
  }

  const pickedPathway = getPathway(result.picked.pathwaySlug);
  const topAlternate = result.alternates[0];

  return (
    <main className="min-h-screen bg-hallway-void px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-center font-display text-3xl font-bold text-white">
          Your Fit Assessment
        </h1>
        <p className="mb-10 text-center text-white/60">
          This is advisory only — you make the final decision on which door to walk
          through.
        </p>

        {pickedPathway && (
          <div className="mb-6 rounded-xl border border-hallway-gold/40 bg-hallway-gold/5 p-6">
            <div className="mb-2 flex items-center gap-3">
              <span className="text-3xl">{pickedPathway.icon}</span>
              <div>
                <p className="text-xs uppercase tracking-widest text-hallway-gold">
                  The door you walked through
                </p>
                <h2 className="font-display text-xl font-semibold text-white">
                  {pickedPathway.name}
                </h2>
              </div>
              <span className="ml-auto font-display text-2xl font-bold text-hallway-gold">
                {result.picked.fitScore}%
              </span>
            </div>
            <p className="mb-2 text-sm text-white/70">{result.picked.explanation}</p>
            {result.picked.cautionNotes.map((note, i) => (
              <p key={i} className="mt-2 text-xs text-amber-300/90">
                ⚠ {note}
              </p>
            ))}
            {result.picked.eligible && (
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() =>
                    router.push(`/apply/profile?pathway=${result.picked.pathwaySlug}`)
                  }
                  className="rounded-full bg-hallway-gold px-6 py-2 font-semibold text-hallway-void transition hover:brightness-110"
                >
                  Lock This Door
                </button>
                <Link
                  href="/?entered=1"
                  className="rounded-full border border-white/30 px-6 py-2 font-semibold text-white transition hover:bg-white/10"
                >
                  Explore Another Door
                </Link>
              </div>
            )}
          </div>
        )}

        {result.alternates.length > 0 && (
          <>
            <p className="mb-3 mt-8 text-center text-sm uppercase tracking-widest text-white/40">
              {topAlternate && topAlternate.confidence * 100 > result.picked.fitScore
                ? "A stronger fit — and a contingency worth considering"
                : "Other doors worth exploring as a contingency"}
            </p>
            <div className="space-y-4">
              {result.alternates.map((rec) => {
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
                            #{rec.rank} Alternate
                          </p>
                          <h2 className="font-display text-xl font-semibold text-white">
                            {pathway.name}
                          </h2>
                        </div>
                      </div>
                    </div>
                    <p className="mb-4 text-sm text-white/70">{rec.explanation}</p>
                    {rec.rank === 1 && (
                      <button
                        onClick={() => router.push(`/apply/profile?pathway=${pathway.slug}`)}
                        className="rounded-full border border-hallway-gold/50 px-6 py-2 font-semibold text-hallway-gold transition hover:bg-hallway-gold/10"
                      >
                        Consider This Instead
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {!result.picked.eligible && (
          <div className="mt-8 text-center">
            <Link
              href="/?entered=1"
              className="rounded-full border border-white/30 px-6 py-2 font-semibold text-white transition hover:bg-white/10"
            >
              Explore Another Door
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
