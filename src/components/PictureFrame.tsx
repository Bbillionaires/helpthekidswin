import Link from "next/link";

export function PictureFrame({
  href,
  label,
  sublabel,
  icon,
  initials,
}: {
  href: string;
  label: string;
  sublabel?: string;
  icon?: string;
  initials?: string;
}) {
  return (
    <Link href={href} className="group flex flex-col items-center gap-2">
      <div className="relative h-28 w-24 rounded-sm border-[6px] border-hallway-gold/70 bg-gradient-to-b from-[#241a30] to-[#120b18] shadow-[0_6px_16px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:border-hallway-gold">
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/40" />
        <div className="flex h-full w-full items-center justify-center">
          {icon ? (
            <span className="text-3xl">{icon}</span>
          ) : (
            <span className="font-display text-2xl font-bold text-hallway-gold/80">
              {initials}
            </span>
          )}
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 animate-flicker bg-gradient-to-b from-white/10 to-transparent" />
      </div>
      <div className="text-center">
        <p className="font-display text-xs font-semibold uppercase tracking-wide text-hallway-gold">
          {label}
        </p>
        {sublabel && <p className="text-[10px] text-white/50">{sublabel}</p>}
      </div>
    </Link>
  );
}
