import Link from "next/link";
import { FLAGSHIP_INITIATIVE, PARENT_ORGANIZATION } from "@/lib/organization";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="pointer-events-none absolute inset-0 bg-hallway-floor" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          {PARENT_ORGANIZATION.name}
        </p>

        <h1 className="font-display text-5xl font-bold text-white sm:text-7xl">
          {FLAGSHIP_INITIATIVE.name}
        </h1>

        <p className="font-display text-lg italic text-hallway-gold">
          &ldquo;{FLAGSHIP_INITIATIVE.tagline}&rdquo;
        </p>

        <p className="max-w-xl text-balance text-white/70">
          {PARENT_ORGANIZATION.mission}
        </p>

        <Link
          href="/hall-of-opportunity"
          className="mt-6 rounded-full border border-hallway-gold/60 bg-hallway-gold/10 px-8 py-3 font-semibold text-hallway-gold transition hover:bg-hallway-gold hover:text-hallway-void"
        >
          Enter the Hall of Opportunity
        </Link>
      </div>
    </main>
  );
}
