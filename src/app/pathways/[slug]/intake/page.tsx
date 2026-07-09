"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getIntakeQuestions, type IntakeResponse } from "@/lib/ai/guide";
import { INTAKE_STORAGE_KEY } from "@/lib/ai/session";

export default function IntakePage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string | string[]>>({});
  const [submitting, setSubmitting] = useState(false);

  const questions = getIntakeQuestions(params.slug);
  const question = questions[step] ?? questions[0]!;
  const isLast = step === questions.length - 1;

  function setAnswer(value: string | string[]) {
    setResponses((prev) => ({ ...prev, [question.id]: value }));
  }

  async function next() {
    if (isLast) {
      setSubmitting(true);
      const payload: IntakeResponse[] = questions.map((q) => ({
        questionId: q.id,
        answer: responses[q.id] ?? "",
      }));
      const res = await fetch("/api/intake/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pathwaySlug: params.slug, responses: payload }),
      });
      const result = await res.json();
      sessionStorage.setItem(INTAKE_STORAGE_KEY, JSON.stringify(result));
      router.push(`/pathways/${params.slug}/recommendation`);
      return;
    }
    setStep((s) => s + 1);
  }

  const currentAnswer = responses[question.id];

  return (
    <main className="flex min-h-screen items-center justify-center bg-hallway-void px-6">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 p-8">
        <p className="mb-2 text-xs uppercase tracking-widest text-hallway-gold">
          Question {step + 1} of {questions.length}
        </p>
        <h1 className="mb-6 font-display text-2xl font-semibold text-white">
          {question.prompt}
        </h1>

        {question.kind === "text" && (
          <textarea
            rows={4}
            value={(currentAnswer as string) ?? ""}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-hallway-void/60 px-3 py-2 text-white focus:border-hallway-gold focus:outline-none"
          />
        )}

        {question.kind === "choice" && (
          <div className="flex flex-col gap-2">
            {question.choices?.map((choice) => (
              <button
                key={choice}
                onClick={() => setAnswer(choice)}
                className={`rounded-lg border px-4 py-2 text-left transition ${
                  currentAnswer === choice
                    ? "border-hallway-gold bg-hallway-gold/20 text-hallway-gold"
                    : "border-white/15 text-white/80 hover:border-white/40"
                }`}
              >
                {choice}
              </button>
            ))}
          </div>
        )}

        {question.kind === "multi-choice" && (
          <div className="flex flex-wrap gap-2">
            {question.choices?.map((choice) => {
              const selected = ((currentAnswer as string[]) ?? []).includes(choice);
              return (
                <button
                  key={choice}
                  onClick={() => {
                    const current = (currentAnswer as string[]) ?? [];
                    setAnswer(
                      selected
                        ? current.filter((c) => c !== choice)
                        : [...current, choice],
                    );
                  }}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    selected
                      ? "border-hallway-gold bg-hallway-gold/20 text-hallway-gold"
                      : "border-white/15 text-white/80 hover:border-white/40"
                  }`}
                >
                  {choice}
                </button>
              );
            })}
          </div>
        )}

        {question.kind === "scale" && (
          <div className="flex gap-2">
            {["1", "2", "3", "4", "5"].map((n) => (
              <button
                key={n}
                onClick={() => setAnswer(n)}
                className={`h-10 w-10 rounded-full border transition ${
                  currentAnswer === n
                    ? "border-hallway-gold bg-hallway-gold/20 text-hallway-gold"
                    : "border-white/15 text-white/80 hover:border-white/40"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={next}
          disabled={submitting}
          className="mt-8 w-full rounded-full bg-hallway-gold py-3 font-semibold text-hallway-void transition hover:brightness-110 disabled:opacity-60"
        >
          {submitting ? "Analyzing your answers..." : isLast ? "See My Recommendations" : "Next"}
        </button>
      </div>
    </main>
  );
}
