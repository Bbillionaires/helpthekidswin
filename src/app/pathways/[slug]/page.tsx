import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getPathway, PATHWAYS } from "@/lib/pathways";
import { getMentorsForPathway, getApplicantByUserId, getMentorById } from "@/data/mock";
import { getRoomArt } from "@/lib/pathwayRooms";
import { isFrameClickable, resolveFrameMentorId } from "@/lib/roomFrameSettings";

export function generateStaticParams() {
  return PATHWAYS.map((pathway) => ({ slug: pathway.slug }));
}

export default async function PathwayRoomPage({ params }: { params: { slug: string } }) {
  const pathway = getPathway(params.slug);
  if (!pathway) notFound();

  // Anyone can browse the hallway and see every door — registration is
  // only required once someone actually walks through one, so mentors and
  // admins have a profile to track and a completed interview has an
  // account to attach to (see ARCHITECTURE.md §2a).
  const session = await auth();
  if (!session?.user) {
    redirect(`/register?callbackUrl=${encodeURIComponent(`/pathways/${pathway.slug}`)}`);
  }

  // A one-time, 4-question profile (goals/location/availability/
  // transportation) is required at the first room door an applicant
  // walks through — not the full interview, which stays behind the
  // mirror inside. Once complete, it isn't asked again for later rooms.
  const applicant = getApplicantByUserId(session.user.id);
  if (applicant && !applicant.careerProfile.goals) {
    redirect(`/pathways/${pathway.slug}/profile`);
  }

  const mentors = getMentorsForPathway(pathway.name);
  const room = getRoomArt(pathway.slug);

  if (!room) {
    // Fallback for any pathway without room art yet.
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-hallway-void px-6 text-center text-white">
        <span className="text-5xl">{pathway.icon}</span>
        <h1 className="font-display text-3xl font-bold">{pathway.name}</h1>
        <p className="max-w-md text-white/60">{pathway.atmosphere}</p>
        <Link
          href={`/pathways/${pathway.slug}/intake`}
          className="mt-4 rounded-full bg-hallway-gold px-6 py-3 font-semibold text-hallway-void"
        >
          Begin Intake Interview
        </Link>
        <Link href="/?entered=1" className="text-sm text-white/50 hover:text-white">
          Back to the Hallway
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-hallway-void px-3 py-6">
      <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-hallway-gold/30 shadow-2xl">
        <Image
          src={room.image}
          alt={`${pathway.name} room`}
          width={room.imageWidth ?? 1536}
          height={room.imageHeight ?? 1024}
          className="h-auto w-full"
          priority
        />

        {/* Mentor frames — filled left to right with mentors matched to this
            pathway by default; admin can reassign or disable any frame from
            /admin/rooms (src/lib/roomFrameSettings.ts). Every frame is
            clickable — one with no mentor assigned links to the Mentor Hall
            instead of rendering a dead div. */}
        {room.mentorFrames.map((frame, i) => {
          const style = {
            top: `${frame.top}%`,
            left: `${frame.left}%`,
            width: `${frame.width}%`,
            height: `${frame.height}%`,
          };

          if (!isFrameClickable(pathway.slug, i)) {
            return <div key={i} className="absolute" style={style} />;
          }

          const resolvedMentorId = resolveFrameMentorId(pathway.slug, i, mentors[i]?.id);
          const mentor = resolvedMentorId ? getMentorById(resolvedMentorId) : undefined;

          if (!mentor) {
            return (
              <Link
                key={i}
                href="/mentors"
                title="Meet Our Mentors"
                className="group absolute flex flex-col items-center justify-center gap-1 rounded-sm transition"
                style={style}
              >
                <span className="absolute inset-0 rounded-sm ring-0 ring-hallway-gold/0 transition group-hover:bg-hallway-gold/10 group-hover:ring-2 group-hover:ring-hallway-gold/70" />
                <span className="relative px-1 text-center text-[10px] font-semibold uppercase tracking-wide text-white/60 opacity-0 drop-shadow-[0_0_4px_rgba(0,0,0,0.9)] transition group-hover:opacity-100 sm:text-xs">
                  Meet Our Mentors
                </span>
              </Link>
            );
          }

          const initials = mentor.displayName
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2);
          return (
            <Link
              key={mentor.id}
              href={`/mentors/${mentor.id}`}
              title={mentor.displayName}
              className="group absolute flex flex-col items-center justify-center gap-1 rounded-sm transition"
              style={style}
            >
              <span className="absolute inset-0 rounded-sm ring-0 ring-hallway-gold/0 transition group-hover:bg-hallway-gold/10 group-hover:ring-2 group-hover:ring-hallway-gold/70" />
              <span className="relative font-display text-2xl font-bold text-hallway-gold/70 drop-shadow-[0_0_4px_rgba(0,0,0,0.9)] sm:text-3xl">
                {initials}
              </span>
              <span className="relative px-1 text-center text-[10px] font-semibold uppercase tracking-wide text-white drop-shadow-[0_0_4px_rgba(0,0,0,0.9)] sm:text-xs">
                {mentor.displayName}
              </span>
            </Link>
          );
        })}

        {/* Practice Test / Application / Refer a Recruit — already labeled in the art */}
        <Link
          href={`/pathways/${pathway.slug}/practice-test`}
          title="Practice Test"
          className="group absolute rounded-sm transition"
          style={{
            top: `${room.practiceTestFrame.top}%`,
            left: `${room.practiceTestFrame.left}%`,
            width: `${room.practiceTestFrame.width}%`,
            height: `${room.practiceTestFrame.height}%`,
          }}
        >
          <span className="block h-full w-full rounded-sm ring-0 ring-hallway-gold/0 transition group-hover:bg-hallway-gold/10 group-hover:ring-2 group-hover:ring-hallway-gold/70" />
        </Link>
        <Link
          href={`/apply/profile?pathway=${pathway.slug}`}
          title="Application"
          className="group absolute rounded-sm transition"
          style={{
            top: `${room.applicationFrame.top}%`,
            left: `${room.applicationFrame.left}%`,
            width: `${room.applicationFrame.width}%`,
            height: `${room.applicationFrame.height}%`,
          }}
        >
          <span className="block h-full w-full rounded-sm ring-0 ring-hallway-gold/0 transition group-hover:bg-hallway-gold/10 group-hover:ring-2 group-hover:ring-hallway-gold/70" />
        </Link>
        <Link
          href={`/pathways/${pathway.slug}/refer`}
          title="Refer a Recruit"
          className="group absolute rounded-sm transition"
          style={{
            top: `${room.referFrame.top}%`,
            left: `${room.referFrame.left}%`,
            width: `${room.referFrame.width}%`,
            height: `${room.referFrame.height}%`,
          }}
        >
          <span className="block h-full w-full rounded-sm ring-0 ring-hallway-gold/0 transition group-hover:bg-hallway-gold/10 group-hover:ring-2 group-hover:ring-hallway-gold/70" />
        </Link>

        {/* The mirror — first click for a new applicant */}
        <Link
          href={`/pathways/${pathway.slug}/intake`}
          title="Begin Your Interview"
          className="group absolute flex items-center justify-center rounded-sm transition"
          style={{
            top: `${room.mirror.top}%`,
            left: `${room.mirror.left}%`,
            width: `${room.mirror.width}%`,
            height: `${room.mirror.height}%`,
          }}
        >
          <span className="absolute inset-0 rounded-sm ring-0 ring-hallway-gold/0 transition group-hover:bg-hallway-gold/10 group-hover:ring-2 group-hover:ring-hallway-gold/70" />
          <span className="relative font-display text-sm font-semibold uppercase tracking-widest text-white opacity-0 drop-shadow-[0_0_6px_rgba(0,0,0,0.9)] transition group-hover:opacity-100">
            Begin Interview
          </span>
        </Link>

        {/* A few rooms have more than one literal mirror (e.g. flanking a central display) — every one leads to the same interview */}
        {room.additionalMirrors?.map((slot, i) => (
          <Link
            key={i}
            href={`/pathways/${pathway.slug}/intake`}
            title="Begin Your Interview"
            className="group absolute flex items-center justify-center rounded-sm transition"
            style={{
              top: `${slot.top}%`,
              left: `${slot.left}%`,
              width: `${slot.width}%`,
              height: `${slot.height}%`,
            }}
          >
            <span className="absolute inset-0 rounded-sm ring-0 ring-hallway-gold/0 transition group-hover:bg-hallway-gold/10 group-hover:ring-2 group-hover:ring-hallway-gold/70" />
            <span className="relative font-display text-sm font-semibold uppercase tracking-widest text-white opacity-0 drop-shadow-[0_0_6px_rgba(0,0,0,0.9)] transition group-hover:opacity-100">
              Begin Interview
            </span>
          </Link>
        ))}

        {/* Rooms shared by more than one pathway (e.g. Technology) render
            the OTHER pathways' own gateways too, each linking straight to
            that specific pathway's intake — so every gateway is visible
            no matter which of the shared pathways you're on. */}
        {room.crossPathwayMirrors?.map((slot, i) => {
          const otherPathway = getPathway(slot.pathwaySlug);
          return (
            <Link
              key={i}
              href={`/pathways/${slot.pathwaySlug}/intake`}
              title={otherPathway ? `Begin Interview — ${otherPathway.name}` : "Begin Your Interview"}
              className="group absolute flex items-center justify-center rounded-sm transition"
              style={{
                top: `${slot.top}%`,
                left: `${slot.left}%`,
                width: `${slot.width}%`,
                height: `${slot.height}%`,
              }}
            >
              <span className="absolute inset-0 rounded-sm ring-0 ring-hallway-gold/0 transition group-hover:bg-hallway-gold/10 group-hover:ring-2 group-hover:ring-hallway-gold/70" />
              <span className="relative px-1 text-center font-display text-xs font-semibold uppercase tracking-widest text-white opacity-0 drop-shadow-[0_0_6px_rgba(0,0,0,0.9)] transition group-hover:opacity-100">
                {otherPathway?.name ?? "Begin Interview"}
              </span>
            </Link>
          );
        })}

        {/* Some art bakes in its own "return to hall" graphic — overlay a real link on it */}
        {room.returnToHallway && (
          <Link
            href="/?entered=1"
            title="Return to Hall"
            className="group absolute rounded-sm transition"
            style={{
              top: `${room.returnToHallway.top}%`,
              left: `${room.returnToHallway.left}%`,
              width: `${room.returnToHallway.width}%`,
              height: `${room.returnToHallway.height}%`,
            }}
          >
            <span className="block h-full w-full rounded-sm ring-0 ring-hallway-gold/0 transition group-hover:bg-hallway-gold/10 group-hover:ring-2 group-hover:ring-hallway-gold/70" />
          </Link>
        )}
      </div>

      <div className="mx-auto mt-6 flex max-w-6xl flex-col items-center gap-2 text-center">
        <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-hallway-gold">
          {pathway.name}
        </h1>
        <p className="max-w-xl text-sm text-white/60">{pathway.atmosphere}</p>
        <Link
          href="/?entered=1"
          className="mt-2 rounded-full border border-white/30 px-6 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Back to the Hallway
        </Link>
      </div>
    </main>
  );
}
