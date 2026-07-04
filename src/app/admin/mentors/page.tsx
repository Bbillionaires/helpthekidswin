import { Navbar } from "@/components/Navbar";
import { MOCK_MENTORS } from "@/data/mock";

export default function AdminMentorsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-10">
        <h1 className="font-display text-3xl font-bold text-white">Mentor Approvals</h1>

        <div className="space-y-4">
          {MOCK_MENTORS.map((mentor) => (
            <div
              key={mentor.id}
              className="rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-white">
                  {mentor.displayName}
                </h2>
                <span className="text-sm text-white/50">{mentor.employer}</span>
              </div>
              <p className="mt-1 text-sm text-white/60">{mentor.biography}</p>

              <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                <VerificationBadge label="Identity" ok={mentor.verification.identityVerified} />
                <VerificationBadge label="Credentials" ok={mentor.verification.credentialsVerified} />
                <VerificationBadge
                  label="Background review"
                  ok={mentor.verification.backgroundReviewStatus === "cleared"}
                  detail={mentor.verification.backgroundReviewStatus}
                />
              </div>

              <div className="mt-4 flex gap-3">
                <button className="rounded-full bg-hallway-gold px-5 py-2 text-sm font-semibold text-hallway-void transition hover:brightness-110">
                  Approve
                </button>
                <button className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/70 transition hover:bg-white/10">
                  Request More Info
                </button>
                <button className="rounded-full border border-red-500/40 px-5 py-2 text-sm text-red-300 transition hover:bg-red-500/10">
                  Suspend
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

function VerificationBadge({
  label,
  ok,
  detail,
}: {
  label: string;
  ok: boolean;
  detail?: string;
}) {
  return (
    <div
      className={`rounded-lg border px-3 py-2 ${
        ok ? "border-emerald-500/40 text-emerald-300" : "border-amber-500/40 text-amber-300"
      }`}
    >
      <p className="text-xs uppercase tracking-widest">{label}</p>
      <p className="font-semibold">{detail ?? (ok ? "Verified" : "Pending")}</p>
    </div>
  );
}
