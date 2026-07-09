/**
 * Grand marble hall backdrop: dark stone walls with fluted column
 * pilasters, a gold-inlaid floor medallion, and a warm dome glow above —
 * styled after a classical rotunda rather than an abstract corridor.
 * Fixed to the viewport so it stays put as door rows scroll past it.
 */
export function HallwayBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Base stone */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#1a1420_0%,#0a0710_55%,#050308_100%)]" />

      {/* Fluted column pilasters across the walls */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0px, transparent 84px, rgba(232,184,109,0.08) 85px, rgba(0,0,0,0.25) 88px, transparent 92px)",
        }}
      />

      {/* Dome glow at the top */}
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full bg-amber-100/10 blur-[100px]" />
      <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-100/20 blur-3xl" />

      {/* Gold cornice line near the top of the hall */}
      <div className="absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-hallway-gold/40 to-transparent" />

      {/* Floor */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0d0710] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-hallway-gold/40 to-transparent" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
