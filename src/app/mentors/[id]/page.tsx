import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { MOCK_MENTORS } from "@/data/mock";
import { getPathway } from "@/lib/pathways";

export function generateStaticParams() {
  return MOCK_MENTORS.map((mentor) => ({ id: mentor.id }));
}

export default function MentorDetailPage({ params }: { params: { id: string } }) {
  const mentor = MOCK_MENTORS.find((m) => m.id === params.id);
  if (!mentor) notFound();

  return (
    <>
      <Navbar />
      <main className="bg-hallway-void px-4 py-8 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mx-auto mb-6 flex h-28 w-24 items-center justify-center rounded-sm border-[6px] border-hallway-gold/70 bg-gradient-to-b from-[#241a30] to-[#120b18]">
          <span className="font-display text-2xl font-bold text-hallway-gold/80">
            {mentor.displayName
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </span>
        </div>

        <h1 className="text-center font-display text-3xl font-bold text-white">
          {mentor.displayName}
        </h1>
        <p className="mt-1 text-center text-sm text-hallway-gold">{mentor.employer}</p>

        <p className="mt-6 text-white/70">{mentor.biography}</p>

        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-white/40">Experience</p>
            <p className="text-white">{mentor.experienceYears} years</p>
          </div>
          <div>
            <p className="text-white/40">Availability</p>
            <p className="text-white">{mentor.availability}</p>
          </div>
          <div>
            <p className="text-white/40">Career Specialties</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {mentor.careerSpecialties.map((specialty) => {
                const pathway = getPathway(
                  specialty.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, ""),
                );
                return (
                  <span
                    key={specialty}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70"
                  >
                    {pathway?.name ?? specialty}
                  </span>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-white/40">Certifications</p>
            <p className="text-white">
              {mentor.certifications.length > 0 ? mentor.certifications.join(", ") : "—"}
            </p>
          </div>
        </div>

        {mentor.accomplishments.length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-white/40">Accomplishments</p>
            <ul className="mt-1 list-inside list-disc text-sm text-white/70">
              {mentor.accomplishments.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <Link
          href="/mentors"
          className="mt-10 inline-block rounded-full border border-white/30 px-6 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Back to the Mentor Gallery
        </Link>
      </div>
      </main>
    </>
  );
}
