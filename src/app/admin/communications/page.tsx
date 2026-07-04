import { Navbar } from "@/components/Navbar";
import { MOCK_MATCHES, MOCK_APPLICANTS, MOCK_MENTORS } from "@/data/mock";
import { evaluateMinorProtection, FLAG_LABELS } from "@/lib/safety/minorProtection";

export default function AdminCommunicationsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-10">
        <h1 className="font-display text-3xl font-bold text-white">
          Communication &amp; Safety Review
        </h1>
        <p className="text-white/60">
          Every match is gated by the Minor Protection Policy. All messages are logged
          and available here for audit.
        </p>

        <div className="space-y-4">
          {MOCK_MATCHES.map((match) => {
            const applicant = MOCK_APPLICANTS.find((a) => a.id === match.applicantId);
            const mentor = MOCK_MENTORS.find((m) => m.id === match.mentorId);
            const protection = evaluateMinorProtection(
              match.minorProtection,
              applicant?.isMinor ?? false,
            );

            return (
              <div
                key={match.id}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-semibold text-white">
                    {applicant?.displayName} &amp; {mentor?.displayName}
                  </h2>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      protection.authorized
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-amber-500/20 text-amber-300"
                    }`}
                  >
                    {protection.authorized ? "Communication authorized" : "Communication locked"}
                  </span>
                </div>

                {!protection.authorized && (
                  <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-amber-200/80">
                    {protection.missing.map((flag) => (
                      <li key={flag}>{FLAG_LABELS[flag]} — outstanding</li>
                    ))}
                  </ul>
                )}

                <button className="mt-4 rounded-full border border-white/20 px-5 py-2 text-sm text-white/70 transition hover:bg-white/10">
                  View Message History
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
