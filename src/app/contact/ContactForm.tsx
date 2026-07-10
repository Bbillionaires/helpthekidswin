"use client";

import { useState } from "react";
import Link from "next/link";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-hallway-void px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="font-display text-2xl font-bold text-white">Contact Us</h1>
        <p className="mt-2 text-sm text-white/60">
          Questions about a pathway, a mentor match, or the platform itself? Reach out.
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
              <span className="mb-1 block text-sm font-medium text-white/80">Name</span>
              <input
                required
                type="text"
                className="w-full rounded-lg border border-white/15 bg-hallway-void/60 px-3 py-2 text-white focus:border-hallway-gold focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-white/80">Email</span>
              <input
                required
                type="email"
                className="w-full rounded-lg border border-white/15 bg-hallway-void/60 px-3 py-2 text-white focus:border-hallway-gold focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-white/80">Message</span>
              <textarea
                required
                rows={4}
                className="w-full rounded-lg border border-white/15 bg-hallway-void/60 px-3 py-2 text-white focus:border-hallway-gold focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-hallway-gold py-2.5 font-semibold text-hallway-void transition hover:brightness-110"
            >
              Send Message
            </button>
          </form>
        ) : (
          <div className="mt-6 rounded-lg border border-hallway-gold/30 bg-hallway-gold/10 p-4 text-center text-sm text-hallway-gold">
            Thanks for reaching out — we&apos;ll respond soon.
          </div>
        )}

        <Link href="/" className="mt-6 block text-center text-sm text-white/50 hover:text-white">
          Back to the Hall of Opportunity
        </Link>
      </div>
    </main>
  );
}
