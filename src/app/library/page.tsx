import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Navbar } from "@/components/Navbar";
import { getPathway } from "@/lib/pathways";
import { getApplicantByUserId } from "@/data/mock";
import { LIBRARY_SHELVES, UNSHELVED_PATHWAY_SLUGS } from "@/lib/libraryShelves";

export default async function LibraryPage() {
  const session = await auth();
  if (!session?.user) {
    redirect(`/register?callbackUrl=${encodeURIComponent("/library")}`);
  }

  const role = session.user.role;
  const isApplicant = role === "APPLICANT" || role === "GUARDIAN";
  const applicant = isApplicant ? getApplicantByUserId(session.user.id) : undefined;

  // The Library is a browse-everything room, but an applicant has to pick
  // a room door first (which is where the required mini-profile lives) —
  // otherwise there's no "own industry" to focus their certification on.
  if (isApplicant && !applicant?.primaryPathwaySlug) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center gap-4 bg-hallway-void px-6 text-center">
          <h1 className="font-display text-2xl font-bold text-white">Pick a Room First</h1>
          <p className="max-w-md text-sm text-white/60">
            The Library opens up once you've walked through a door in the Hall of Opportunity and
            started a pathway. Head back and choose one — you can always come browse every
            industry here afterward.
          </p>
          <Link
            href="/?entered=1"
            className="mt-2 rounded-full bg-hallway-gold px-6 py-3 font-semibold text-hallway-void transition hover:brightness-110"
          >
            Back to the Hall of Opportunity
          </Link>
        </main>
      </>
    );
  }

  const primarySlug = applicant?.primaryPathwaySlug;
  const primaryPathway = primarySlug ? getPathway(primarySlug) : undefined;
  const unshelvedPathways = UNSHELVED_PATHWAY_SLUGS.map(getPathway).filter(Boolean);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl space-y-8 px-6 py-12">
        <div>
          <p className="text-xs uppercase tracking-widest text-hallway-gold">Practice Library</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-white">
            Explore Every Industry
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/60">
            Browse study material from any pathway.{" "}
            {primaryPathway && (
              <>
                You're focused on <strong className="text-hallway-gold">{primaryPathway.name}</strong> —
                you're welcome to look around everywhere else, but{" "}
                <strong className="text-hallway-gold">only your own pathway counts toward your completion certificate.</strong>{" "}
                Stay focused there to finish strong.
              </>
            )}
          </p>
        </div>

        <div className="relative mx-auto w-full overflow-hidden rounded-2xl border border-hallway-gold/30 shadow-2xl">
          <Image
            src="/images/hall of opportunity library.png"
            alt="The Practice Library"
            width={1536}
            height={1024}
            className="h-auto w-full"
            priority
          />

          {LIBRARY_SHELVES.map((shelf) => {
            const isOwn = primarySlug ? shelf.pathwaySlugs.includes(primarySlug) : false;
            return (
              <Link
                key={shelf.label}
                href={shelf.href}
                title={shelf.label}
                className={`group absolute rounded-sm transition ${
                  isOwn ? "ring-2 ring-hallway-gold/80" : ""
                }`}
                style={{
                  top: `${shelf.top}%`,
                  left: `${shelf.left}%`,
                  width: `${shelf.width}%`,
                  height: `${shelf.height}%`,
                }}
              >
                <span className="absolute inset-0 rounded-sm ring-0 ring-hallway-gold/0 transition group-hover:bg-hallway-gold/10 group-hover:ring-2 group-hover:ring-hallway-gold/70" />
                {isOwn && (
                  <span className="absolute left-1/2 top-1 -translate-x-1/2 rounded-full bg-hallway-gold px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-hallway-void">
                    Your Pathway
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {unshelvedPathways.length > 0 && (
          <div>
            <p className="mb-3 text-sm text-white/50">
              Not pictured on the shelves above:
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {unshelvedPathways.map((pathway) => {
                if (!pathway) return null;
                const isOwn = primarySlug === pathway.slug;
                return (
                  <Link
                    key={pathway.slug}
                    href={`/pathways/${pathway.slug}/practice-test`}
                    className={`rounded-xl border p-4 transition hover:border-hallway-gold/60 ${
                      isOwn ? "border-hallway-gold/60 bg-hallway-gold/10" : "border-white/10 bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="font-display text-sm font-semibold text-white">
                        {pathway.icon} {pathway.name}
                      </h2>
                      {isOwn && (
                        <span className="rounded-full bg-hallway-gold/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-hallway-gold">
                          Yours
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
