import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { HallwayBackdrop } from "@/components/HallwayBackdrop";
import { Emblem } from "@/components/Emblem";
import { MOCK_MENTORS } from "@/data/mock";
import { MentorsGalleryClient } from "./MentorsGalleryClient";

export default function MentorsHallPage() {
  return (
    <>
      <Navbar />
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
        <Link
          href="/mentor/signup"
          className="mt-2 rounded-full bg-hallway-gold px-6 py-2 text-sm font-semibold text-hallway-void transition hover:brightness-110"
        >
          Become a Mentor
        </Link>
      </div>

      <div className="relative z-10 mx-auto mt-8 max-w-5xl">
        <MentorsGalleryClient mentors={MOCK_MENTORS} />
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
    </>
  );
}
