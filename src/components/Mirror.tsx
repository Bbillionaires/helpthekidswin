import Link from "next/link";

/**
 * The first thing an applicant clicks in a pathway room — leads to the
 * intake interview. Styled as an ornate freestanding mirror so it reads
 * as "look into this to see where you could go" rather than a plain CTA.
 */
export function Mirror({ href }: { href: string }) {
  return (
    <Link href={href} className="group flex flex-col items-center gap-3">
      <div className="relative h-48 w-32 rounded-t-full border-[10px] border-hallway-gold/70 bg-gradient-to-b from-slate-200/20 via-slate-400/10 to-slate-700/20 shadow-[0_10px_30px_rgba(0,0,0,0.7)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:border-hallway-gold">
        <div className="pointer-events-none absolute inset-1 rounded-t-full bg-gradient-to-br from-white/20 via-white/5 to-transparent" />
        <div className="pointer-events-none absolute inset-x-4 top-3 h-16 rounded-t-full bg-white/10 blur-sm" />
        <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="font-display text-xs font-semibold uppercase tracking-widest text-white drop-shadow-[0_0_6px_rgba(0,0,0,0.9)]">
            Look Closer
          </span>
        </div>
      </div>
      <p className="font-display text-sm font-semibold uppercase tracking-wide text-hallway-gold">
        Begin Your Interview
      </p>
    </Link>
  );
}
