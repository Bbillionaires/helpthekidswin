"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TRANSPORTATION_CHOICES: Array<{ value: string; label: string }> = [
  { value: "own-vehicle", label: "Own vehicle" },
  { value: "public-transit", label: "Public transit" },
  { value: "needs-assistance", label: "Need assistance" },
  { value: "not-applicable", label: "Not applicable" },
];

const AVAILABILITY_CHOICES = ["Weekday mornings", "Weekday afternoons", "Weekday evenings", "Weekends", "Flexible"];

export default function CreateProfilePage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [goals, setGoals] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [availability, setAvailability] = useState("");
  const [transportation, setTransportation] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    setSubmitting(true);
    await fetch("/api/profile/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goals, city, state, availability, transportation }),
    });
    router.push(`/pathways/${params.slug}`);
  }

  const canSubmit = goals.trim().length > 0 && availability && transportation;

  return (
    <main className="flex min-h-screen items-center justify-center bg-hallway-void px-6">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 p-8">
        <p className="mb-1 text-xs uppercase tracking-widest text-hallway-gold">Before You Go In</p>
        <h1 className="mb-2 font-display text-2xl font-semibold text-white">Create Your Profile</h1>
        <p className="mb-6 text-sm text-white/60">
          A few quick questions so mentors and admins know who's walking through this door. This
          takes less than a minute — the full interview happens later, at the mirror inside.
        </p>

        <div className="space-y-5">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-white/80">
              What are your career goals?
            </span>
            <textarea
              rows={3}
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-hallway-void/60 px-3 py-2 text-white focus:border-hallway-gold focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-white/80">Where are you located?</span>
            <div className="grid grid-cols-2 gap-3">
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="w-full rounded-lg border border-white/15 bg-hallway-void/60 px-3 py-2 text-white focus:border-hallway-gold focus:outline-none"
              />
              <input
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
                className="w-full rounded-lg border border-white/15 bg-hallway-void/60 px-3 py-2 text-white focus:border-hallway-gold focus:outline-none"
              />
            </div>
          </label>

          <div>
            <span className="mb-1 block text-sm font-medium text-white/80">What's your availability?</span>
            <div className="flex flex-wrap gap-2">
              {AVAILABILITY_CHOICES.map((choice) => (
                <button
                  key={choice}
                  type="button"
                  onClick={() => setAvailability(choice)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    availability === choice
                      ? "border-hallway-gold bg-hallway-gold/20 text-hallway-gold"
                      : "border-white/15 text-white/80 hover:border-white/40"
                  }`}
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="mb-1 block text-sm font-medium text-white/80">Do you have reliable transportation?</span>
            <div className="flex flex-wrap gap-2">
              {TRANSPORTATION_CHOICES.map((choice) => (
                <button
                  key={choice.value}
                  type="button"
                  onClick={() => setTransportation(choice.value)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    transportation === choice.value
                      ? "border-hallway-gold bg-hallway-gold/20 text-hallway-gold"
                      : "border-white/15 text-white/80 hover:border-white/40"
                  }`}
                >
                  {choice.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={submit}
          disabled={!canSubmit || submitting}
          className="mt-8 w-full rounded-full bg-hallway-gold py-3 font-semibold text-hallway-void transition hover:brightness-110 disabled:opacity-40"
        >
          {submitting ? "Saving..." : "Enter the Room"}
        </button>
      </div>
    </main>
  );
}
