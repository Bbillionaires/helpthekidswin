import { Dancing_Script } from "next/font/google";
import type { Certificate as CertificateData } from "@/types";
import type { CareerPathway } from "@/lib/pathways";

// A self-hosted script font for the orchestrator's signature — the CSS
// generic "cursive" family has no reliable fallback on many systems
// (notably Linux), so this guarantees the signature actually looks
// handwritten everywhere instead of silently falling back to serif.
const signatureFont = Dancing_Script({ subsets: ["latin"], weight: "700" });

export function Certificate({
  certificate,
  pathway,
}: {
  certificate: CertificateData;
  pathway?: CareerPathway;
}) {
  const issued = new Date(certificate.issuedAt);

  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-hallway-gold/60 bg-gradient-to-br from-hallway-panel to-hallway-void p-8 text-center shadow-2xl">
      <div className="pointer-events-none absolute inset-3 rounded-xl border border-hallway-gold/30" />

      <p className="relative text-xs uppercase tracking-[0.3em] text-hallway-gold/80">
        Hall of Opportunity
      </p>
      <h2 className="relative mt-2 font-display text-3xl font-bold text-white">
        {certificate.title}
      </h2>
      <p className="relative mt-4 text-sm text-white/70">This certifies that</p>
      <p className="relative mt-1 font-display text-2xl font-semibold text-hallway-gold">
        {certificate.applicantName}
      </p>
      <p className="relative mt-1 text-sm text-white/70">
        has completed the{" "}
        <span className="font-semibold text-white">{pathway?.name ?? certificate.pathwaySlug}</span>{" "}
        pathway
      </p>

      <div className="relative mx-auto mt-6 grid max-w-md grid-cols-2 gap-4 text-left text-xs">
        <Field label="Industry" value={pathway?.name ?? certificate.pathwaySlug} />
        <Field label="Date" value={issued.toLocaleDateString()} />
        <Field label="Time" value={issued.toLocaleTimeString()} />
        <Field label="Speed" value={certificate.speedLabel} />
        <Field label="Grade" value={certificate.grade != null ? `${certificate.grade}%` : "N/A"} />
        <Field label="Mentor" value={certificate.mentorName} />
      </div>

      <div className="relative mt-8 flex items-end justify-between border-t border-white/10 pt-4 text-left">
        <div>
          <p className={`${signatureFont.className} text-4xl text-hallway-gold`}>De&apos;Aris Henry</p>
          <p className="mt-1 text-[10px] uppercase tracking-widest text-white/50">
            Orchestrator, Help the Kids Win
          </p>
        </div>
        <p className="text-[10px] italic text-white/50">
          Powered by Greenwood 100Inc and Help The Kids Win
        </p>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-white/40">{label}</p>
      <p className="text-white/90">{value}</p>
    </div>
  );
}
