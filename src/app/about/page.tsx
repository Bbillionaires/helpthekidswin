import Link from "next/link";
import { PARENT_ORGANIZATION, FLAGSHIP_INITIATIVE, INITIATIVES } from "@/lib/organization";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-hallway-void px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs uppercase tracking-widest text-hallway-gold">
          {PARENT_ORGANIZATION.name}
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-white">
          About {FLAGSHIP_INITIATIVE.name}
        </h1>
        <p className="mt-4 text-white/70">{PARENT_ORGANIZATION.mission}</p>
        <p className="mt-4 text-white/60">{FLAGSHIP_INITIATIVE.focus}</p>

        <h2 className="mt-10 font-display text-lg font-semibold text-hallway-gold">
          Every Help the World Win Initiative
        </h2>
        <ul className="mt-3 space-y-2">
          {INITIATIVES.map((initiative) => (
            <li
              key={initiative.slug}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70"
            >
              <span className="font-semibold text-white">{initiative.name}</span>
              {" — "}
              {initiative.focus}
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="mt-10 inline-block rounded-full border border-white/30 px-6 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Back to the Hall of Opportunity
        </Link>
      </div>
    </main>
  );
}
