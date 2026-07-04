import { Navbar } from "@/components/Navbar";
import { MOCK_APPLICANTS } from "@/data/mock";
import { getPathway } from "@/lib/pathways";

export default function AdminApplicantsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-10">
        <h1 className="font-display text-3xl font-bold text-white">
          Applicant Review
        </h1>
        <p className="text-white/60">
          Review applicant profiles and the AI's pathway recommendations. Recommendations
          are advisory — the applicant makes the final decision.
        </p>

        <div className="space-y-4">
          {MOCK_APPLICANTS.map((applicant) => (
            <div
              key={applicant.id}
              className="rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-semibold text-white">
                  {applicant.displayName}
                </h2>
                {applicant.isMinor && (
                  <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-300">
                    Minor
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-white/60">{applicant.careerProfile.goals}</p>
              <p className="mt-2 text-xs text-white/40">
                Readiness score: {applicant.readinessScore ?? "N/A"} · Location:{" "}
                {applicant.location.city}, {applicant.location.state}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {applicant.careerProfile.interests.map((interest) => {
                  const match = getPathway(
                    interest.toLowerCase().replace(/\s+/g, "-"),
                  );
                  return (
                    <span
                      key={interest}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70"
                    >
                      {match?.name ?? interest}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
