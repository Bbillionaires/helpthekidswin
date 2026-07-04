import { Navbar } from "@/components/Navbar";
import { MOCK_APPLICANTS } from "@/data/mock";

export default function MentorBrowsePage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-12">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">
            Qualified Applicants
          </h1>
          <p className="mt-1 text-white/60">
            Browse applicants inside your career pathway. Requesting an apprentice sends
            the match to an administrator for approval — you will not receive contact
            details until every safety requirement is met.
          </p>
        </div>

        <div className="space-y-4">
          {MOCK_APPLICANTS.map((applicant) => (
            <div
              key={applicant.id}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-lg font-semibold text-white">
                    {applicant.displayName}
                  </h2>
                  {applicant.isMinor && (
                    <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-300">
                      Minor — extra protections apply
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-white/60">
                  {applicant.careerProfile.goals}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {applicant.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-xs text-white/40">
                  Readiness score: {applicant.readinessScore ?? "N/A"}
                </p>
              </div>
              <button className="shrink-0 rounded-full bg-hallway-gold px-5 py-2 text-sm font-semibold text-hallway-void transition hover:brightness-110">
                Request Apprentice
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
