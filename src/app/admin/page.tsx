import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { PATHWAYS } from "@/lib/pathways";
import { MOCK_APPLICANTS, MOCK_MENTORS, MOCK_MATCHES } from "@/data/mock";

const ADMIN_SECTIONS = [
  { href: "/admin/applicants", label: "Applicants", description: "Review applicants and AI recommendations" },
  { href: "/admin/mentors", label: "Mentors", description: "Approve mentors and recruiters" },
  { href: "/admin/rooms", label: "Rooms", description: "Assign mentors to room frames, toggle clickability" },
  { href: "/admin/communications", label: "Communications", description: "Audit messages and reports" },
];

export default function AdminDashboardPage() {
  const pendingMentors = MOCK_MENTORS.filter((m) => !m.verification.identityVerified || m.verification.backgroundReviewStatus !== "cleared");
  const pendingMatches = MOCK_MATCHES.filter((m) => m.status === "admin-review");

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl space-y-8 px-6 py-10">
        <h1 className="font-display text-3xl font-bold text-white">Administrator Dashboard</h1>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label="Applicants" value={MOCK_APPLICANTS.length} />
          <Stat label="Mentors" value={MOCK_MENTORS.length} />
          <Stat label="Pathways" value={PATHWAYS.length} />
          <Stat label="Matches pending review" value={pendingMatches.length} />
        </div>

        {pendingMentors.length > 0 && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
            {pendingMentors.length} mentor(s) awaiting verification before they can be approved.
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {ADMIN_SECTIONS.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-hallway-gold/50"
            >
              <h2 className="font-display text-lg font-semibold text-white">
                {section.label}
              </h2>
              <p className="mt-1 text-sm text-white/60">{section.description}</p>
            </Link>
          ))}
        </div>

        <div>
          <h2 className="mb-3 font-display text-xl font-semibold text-white">
            Pathway Statistics
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {PATHWAYS.map((pathway) => (
              <div
                key={pathway.slug}
                className="rounded-lg border border-white/10 bg-white/5 p-3 text-center"
              >
                <span className="text-2xl">{pathway.icon}</span>
                <p className="mt-1 text-xs text-white/70">{pathway.name}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
      <p className="font-display text-3xl font-bold text-hallway-gold">{value}</p>
      <p className="text-xs uppercase tracking-widest text-white/50">{label}</p>
    </div>
  );
}
