import Link from "next/link";
import { HallwayBackdrop } from "@/components/HallwayBackdrop";
import { PictureFrame } from "@/components/PictureFrame";
import { Emblem } from "@/components/Emblem";
import { MOCK_MENTORS } from "@/data/mock";

export default function MentorsHallPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-hallway-void px-4 py-12">
      <HallwayBackdrop />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-2 text-center">
        <Emblem size={56} />
        <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-hallway-gold sm:text-4xl">
          The Mentor Gallery
        </h1>
        <p className="max-w-xl text-white/60">
          Every mentor who has opened a door for an apprentice hangs on this wall.
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-10 grid max-w-5xl grid-cols-2 justify-items-center gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
        {MOCK_MENTORS.map((mentor) => (
          <PictureFrame
            key={mentor.id}
            href={`/mentors/${mentor.id}`}
            label={mentor.displayName}
            sublabel={mentor.careerSpecialties[0]}
            initials={mentor.displayName
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto mt-14 flex max-w-5xl justify-center">
        <Link
          href="/?entered=1"
          className="rounded-full border border-white/30 px-6 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Back to the Hall of Opportunity
        </Link>
      </div>
    </main>
  );
}
