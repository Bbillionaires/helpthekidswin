import Link from "next/link";
import { notFound } from "next/navigation";
import { getPathway, PATHWAYS } from "@/lib/pathways";
import { getMentorsForPathway } from "@/data/mock";
import { HallwayBackdrop } from "@/components/HallwayBackdrop";
import { PictureFrame } from "@/components/PictureFrame";
import { Mirror } from "@/components/Mirror";

export function generateStaticParams() {
  return PATHWAYS.map((pathway) => ({ slug: pathway.slug }));
}

export default function PathwayRoomPage({ params }: { params: { slug: string } }) {
  const pathway = getPathway(params.slug);
  if (!pathway) notFound();

  const mentors = getMentorsForPathway(pathway.name);

  return (
    <main className="relative min-h-screen overflow-hidden bg-hallway-void px-4 py-10">
      <HallwayBackdrop />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-2 text-center">
        <span className="text-4xl">{pathway.icon}</span>
        <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-hallway-gold sm:text-4xl">
          {pathway.name}
        </h1>
        <p className="max-w-xl text-white/70">{pathway.atmosphere}</p>
        <p className="max-w-xl text-sm text-white/50">{pathway.shortDescription}</p>
      </div>

      {/* Mentor wall */}
      <section className="relative z-10 mx-auto mt-10 max-w-5xl">
        <h2 className="mb-4 text-center font-display text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
          Mentors in This Room
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {mentors.length > 0 ? (
            mentors.map((mentor) => (
              <PictureFrame
                key={mentor.id}
                href={`/mentors/${mentor.id}`}
                label={mentor.displayName}
                sublabel={mentor.employer}
                initials={mentor.displayName
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              />
            ))
          ) : (
            <p className="text-sm text-white/40">
              No mentors have joined this pathway yet — check back soon.
            </p>
          )}
        </div>
      </section>

      {/* Practice test / apply / refer wall */}
      <section className="relative z-10 mx-auto mt-12 max-w-5xl">
        <h2 className="mb-4 text-center font-display text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
          On This Wall
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <PictureFrame
            href={`/pathways/${pathway.slug}/practice-test`}
            label="Practice Test"
            sublabel="Check your readiness"
            icon="📝"
          />
          <PictureFrame
            href={`/apply/profile?pathway=${pathway.slug}`}
            label="Application"
            sublabel="Register for this pathway"
            icon="📋"
          />
          <PictureFrame
            href={`/pathways/${pathway.slug}/refer`}
            label="Refer a Recruit"
            sublabel="Bring a friend in"
            icon="🤝"
          />
        </div>
      </section>

      {/* The mirror — first click for a new applicant */}
      <section className="relative z-10 mx-auto mt-14 flex max-w-5xl flex-col items-center">
        <Mirror href={`/pathways/${pathway.slug}/intake`} />
        <p className="mt-3 max-w-sm text-center text-xs text-white/40">
          New here? Start with the mirror — a short interview that helps match you
          to the right pathway. It&apos;s advisory only; you always make the final call.
        </p>
      </section>

      <div className="relative z-10 mx-auto mt-12 flex max-w-5xl justify-center">
        <Link
          href="/"
          className="rounded-full border border-white/30 px-6 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Back to the Hallway
        </Link>
      </div>
    </main>
  );
}
