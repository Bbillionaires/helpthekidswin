"use client";

import { useState } from "react";
import Link from "next/link";

export function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-hallway-void px-6 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="font-display text-2xl font-bold text-white">
          Forgot Your Password or Email?
        </h1>

        {!submitted ? (
          <>
            <p className="mt-2 text-sm text-white/60">
              Self-service password reset isn&apos;t wired up on this preview yet — there&apos;s
              no email service connected to send reset links. Enter the email you signed up
              with below and our team will follow up to help you regain access.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-6 space-y-4"
            >
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-white/80">
                  Email you signed up with
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
                Request Help
              </button>
            </form>
          </>
        ) : (
          <div className="mt-6 rounded-lg border border-hallway-gold/30 bg-hallway-gold/10 p-4 text-center text-sm text-hallway-gold">
            Thanks — a real person will reach out to verify your identity and help you regain
            access. You can also reach us directly on the{" "}
            <Link href="/contact" className="underline">
              Contact page
            </Link>
            .
          </div>
        )}

        <p className="mt-6 text-center text-xs text-white/50">
          Remembered it after all?{" "}
          <Link href="/login" className="text-hallway-gold hover:underline">
            Back to Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
