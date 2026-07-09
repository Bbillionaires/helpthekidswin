"use client";

import { useState } from "react";
import Link from "next/link";
import { getPathway } from "@/lib/pathways";

const QUESTIONS = [
  {
    prompt: "How comfortable are you following a strict safety checklist every shift?",
    choices: ["Very comfortable", "Somewhat comfortable", "Prefer flexibility"],
  },
  {
    prompt: "Can you commit to a consistent weekly schedule for training?",
    choices: ["Yes, fully available", "Mostly, with some conflicts", "Not yet"],
  },
  {
    prompt: "How do you handle being corrected by a supervisor in front of others?",
    choices: ["I take it in stride", "It's uncomfortable but I adjust", "I'd rather get feedback privately"],
  },
  {
    prompt: "Are you willing to start in an entry-level role and work up?",
    choices: ["Absolutely", "If the path is clear", "I'd prefer to skip ahead"],
  },
];

export default function PracticeTestPage({ params }: { params: { slug: string } }) {
  const pathway = getPathway(params.slug);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!pathway) return null;

  const answeredCount = Object.keys(answers).length;
  const readiness = Math.round((answeredCount / QUESTIONS.length) * 100);

  return (
    <main className="min-h-screen bg-hallway-void px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs uppercase tracking-widest text-hallway-gold">{pathway.name}</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-white">Practice Test</h1>
        <p className="mt-2 text-sm text-white/60">
          A quick readiness check — not scored against other applicants, just for you.
        </p>

        {!submitted ? (
          <div className="mt-8 space-y-6">
            {QUESTIONS.map((q, i) => (
              <div key={q.prompt} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <p className="mb-3 font-medium text-white">
                  {i + 1}. {q.prompt}
                </p>
                <div className="flex flex-col gap-2">
                  {q.choices.map((choice) => (
                    <button
                      key={choice}
                      onClick={() => setAnswers((prev) => ({ ...prev, [i]: choice }))}
                      className={`rounded-lg border px-4 py-2 text-left text-sm transition ${
                        answers[i] === choice
                          ? "border-hallway-gold bg-hallway-gold/20 text-hallway-gold"
                          : "border-white/15 text-white/80 hover:border-white/40"
                      }`}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={() => setSubmitted(true)}
              disabled={answeredCount < QUESTIONS.length}
              className="w-full rounded-full bg-hallway-gold py-3 font-semibold text-hallway-void transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Submit ({answeredCount}/{QUESTIONS.length} answered)
            </button>
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-hallway-gold/30 bg-white/5 p-6 text-center">
            <p className="text-sm uppercase tracking-widest text-hallway-gold">Readiness Score</p>
            <p className="mt-2 font-display text-5xl font-bold text-white">{readiness}%</p>
            <p className="mt-3 text-sm text-white/60">
              This is a self-check, not a pass/fail gate. A mentor can help you build on any
              answer above.
            </p>
            <Link
              href={`/pathways/${pathway.slug}`}
              className="mt-6 inline-block rounded-full border border-white/30 px-6 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Back to the Room
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
