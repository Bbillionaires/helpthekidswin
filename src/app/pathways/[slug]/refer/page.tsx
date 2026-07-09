"use client";

import { useState } from "react";
import Link from "next/link";
import { getPathway } from "@/lib/pathways";

export default function ReferPage({ params }: { params: { slug: string } }) {
  const pathway = getPathway(params.slug);
  const [submitted, setSubmitted] = useState(false);

  if (!pathway) return null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-hallway-void px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8">
        <p className="text-xs uppercase tracking-widest text-hallway-gold">{pathway.name}</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-white">Refer a Recruit</h1>
        <p className="mt-2 text-sm text-white/60">
          Know someone who&apos;d be great in this pathway? Send them an invitation.
        </p>

        {!submitted ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="mt-6 space-y-4"
          >
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-white/80">
                Their name
              </span>
              <input
                required
                type="text"
                className="w-full rounded-lg border border-white/15 bg-hallway-void/60 px-3 py-2 text-white focus:border-hallway-gold focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-white/80">
                Their email
              </span>
              <input
                required
                type="email"
                className="w-full rounded-lg border border-white/15 bg-hallway-void/60 px-3 py-2 text-white focus:border-hallway-gold focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-hallway-gold py-2.5 font-semibold text-hallway-void transition hover:brightness-110"
            >
              Send Invitation
            </button>
          </form>
        ) : (
          <div className="mt-6 rounded-lg border border-hallway-gold/30 bg-hallway-gold/10 p-4 text-center text-sm text-hallway-gold">
            Thanks — they&apos;ll receive an invitation to explore {pathway.name}.
          </div>
        )}

        <Link
          href={`/pathways/${pathway.slug}`}
          className="mt-6 block text-center text-sm text-white/50 hover:text-white"
        >
          Back to the Room
        </Link>
      </div>
    </main>
  );
}
