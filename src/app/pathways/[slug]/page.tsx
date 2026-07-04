import Link from "next/link";
import { notFound } from "next/navigation";
import { getPathway, PATHWAYS } from "@/lib/pathways";

export function generateStaticParams() {
  return PATHWAYS.map((pathway) => ({ slug: pathway.slug }));
}

export default function PathwayDoorPage({ params }: { params: { slug: string } }) {
  const pathway = getPathway(params.slug);
  if (!pathway) notFound();

  return (
    <main
      className={`relative flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b ${pathway.gradient} px-6 text-center text-white`}
    >
      <span className="text-6xl">{pathway.icon}</span>
      <h1 className="font-display text-4xl font-bold">{pathway.name}</h1>
      <p className="max-w-xl text-white/80">{pathway.atmosphere}</p>
      <p className="max-w-xl text-white/70">{pathway.shortDescription}</p>

      <div className="mt-4 max-w-md rounded-xl border border-white/20 bg-black/20 p-4 text-left text-sm">
        <p className="mb-2 font-semibold text-white/90">Typical requirements</p>
        <ul className="list-inside list-disc space-y-1 text-white/70">
          {pathway.requirements.map((req) => (
            <li key={req}>{req}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex gap-4">
        <Link
          href={`/pathways/${pathway.slug}/intake`}
          className="rounded-full bg-white px-6 py-3 font-semibold text-hallway-void transition hover:brightness-95"
        >
          Begin Intake Interview
        </Link>
        <Link
          href="/hall-of-opportunity"
          className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
        >
          Back to the Hallway
        </Link>
      </div>
    </main>
  );
}
