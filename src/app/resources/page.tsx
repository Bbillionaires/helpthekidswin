import Link from "next/link";

const RESOURCES = [
  { title: "Applicant Guide", description: "What to expect from intake through your first milestone." },
  { title: "Mentor Handbook", description: "Verification steps, expectations, and communication rules." },
  { title: "Minor Protection Policy", description: "The safeguards every match must satisfy before contact." },
  { title: "Financial Aid & Scholarships", description: "Coming soon as pathways add certification costs." },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-hallway-void px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-white">Resources</h1>
        <p className="mt-2 text-white/60">
          Guides and policies for applicants, mentors, and administrators.
        </p>

        <div className="mt-8 space-y-4">
          {RESOURCES.map((resource) => (
            <div
              key={resource.title}
              className="rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <h2 className="font-display text-lg font-semibold text-hallway-gold">
                {resource.title}
              </h2>
              <p className="mt-1 text-sm text-white/60">{resource.description}</p>
            </div>
          ))}
        </div>

        <Link
          href="/"
          className="mt-10 inline-block rounded-full border border-white/30 px-6 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Back to the Hall of Opportunity
        </Link>
      </div>
    </main>
  );
}
