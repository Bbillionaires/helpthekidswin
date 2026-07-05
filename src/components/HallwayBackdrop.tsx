/**
 * Pure-CSS mansion corridor: a vanishing-point floor, ceiling, and side
 * walls built from clip-path trapezoids. Sits behind the door grid so the
 * doors read as standing inside a hallway rather than floating on a flat
 * background.
 *
 * Trim/molding lines are each a separate thin quadrilateral parallel to a
 * single edge — combining both edges of a trapezoid into one clip-path
 * produces a self-intersecting "bowtie" polygon that renders as crossed
 * triangles instead of a clean line.
 */
export function HallwayBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Base void */}
      <div className="absolute inset-0 bg-[#120b18]" />

      {/* Ceiling */}
      <div
        className="absolute inset-x-0 top-0 h-[42%] bg-gradient-to-b from-[#332750] via-[#1f1836] to-[#120b18]"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 56% 100%, 44% 100%)" }}
      />
      {/* Crown molding along each slanted ceiling edge */}
      <div
        className="absolute inset-x-0 top-0 h-[42%] opacity-70"
        style={{
          clipPath: "polygon(0% 0%, 1.2% 0%, 45.2% 100%, 44% 100%)",
          backgroundColor: "rgba(232,184,109,0.35)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[42%] opacity-70"
        style={{
          clipPath: "polygon(98.8% 0%, 100% 0%, 56% 100%, 54.8% 100%)",
          backgroundColor: "rgba(232,184,109,0.35)",
        }}
      />
      {/* Chandelier glows on the ceiling */}
      <div className="absolute left-[20%] top-4 h-20 w-20 rounded-full bg-amber-100/15 blur-2xl" />
      <div className="absolute left-1/2 top-0 h-28 w-28 -translate-x-1/2 rounded-full bg-amber-100/25 blur-3xl" />
      <div className="absolute right-[20%] top-4 h-20 w-20 rounded-full bg-amber-100/15 blur-2xl" />

      {/* Left wall */}
      <div
        className="absolute inset-y-0 left-0 w-[36%] bg-gradient-to-r from-[#2c2038] via-[#241c30] to-[#160f20]"
        style={{ clipPath: "polygon(0% 0%, 100% 32%, 100% 68%, 0% 100%)" }}
      />
      {/* Wainscoting stripes on left wall */}
      <div
        className="absolute inset-y-0 left-0 w-[36%] opacity-40"
        style={{
          clipPath: "polygon(0% 0%, 100% 32%, 100% 68%, 0% 100%)",
          backgroundImage:
            "repeating-linear-gradient(100deg, transparent 0px, transparent 34px, rgba(232,184,109,0.25) 35px, transparent 36px)",
        }}
      />

      {/* Right wall (mirrored) */}
      <div
        className="absolute inset-y-0 right-0 w-[36%] bg-gradient-to-l from-[#2c2038] via-[#241c30] to-[#160f20]"
        style={{ clipPath: "polygon(100% 0%, 0% 32%, 0% 68%, 100% 100%)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-[36%] opacity-40"
        style={{
          clipPath: "polygon(100% 0%, 0% 32%, 0% 68%, 100% 100%)",
          backgroundImage:
            "repeating-linear-gradient(80deg, transparent 0px, transparent 34px, rgba(232,184,109,0.25) 35px, transparent 36px)",
        }}
      />

      {/* Floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#4a3218] via-[#28190e] to-[#120b18]"
        style={{ clipPath: "polygon(0% 100%, 100% 100%, 56% 0%, 44% 0%)" }}
      />
      {/* Baseboard along each slanted floor edge */}
      <div
        className="absolute inset-x-0 bottom-0 h-[42%] opacity-70"
        style={{
          clipPath: "polygon(0% 100%, 1.2% 100%, 45.2% 0%, 44% 0%)",
          backgroundColor: "rgba(232,184,109,0.35)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[42%] opacity-70"
        style={{
          clipPath: "polygon(98.8% 100%, 100% 100%, 56% 0%, 54.8% 0%)",
          backgroundColor: "rgba(232,184,109,0.35)",
        }}
      />
      {/* Floorboards converging toward the vanishing point */}
      <div
        className="absolute inset-x-0 bottom-0 h-[42%] opacity-25"
        style={{
          clipPath: "polygon(0% 100%, 100% 100%, 56% 0%, 44% 0%)",
          backgroundImage:
            "repeating-linear-gradient(100deg, transparent 0px, transparent 44px, rgba(0,0,0,0.5) 45px, transparent 46px)",
        }}
      />
      {/* Runner rug leading toward the vanishing point */}
      <div
        className="absolute inset-x-0 bottom-0 mx-auto h-[42%] w-full max-w-6xl bg-gradient-to-t from-red-800 via-red-900/70 to-red-900/0"
        style={{ clipPath: "polygon(24% 100%, 76% 100%, 54% 0%, 46% 0%)" }}
      />
      {/* Gold trim along each rug edge */}
      <div
        className="absolute inset-x-0 bottom-0 mx-auto h-[42%] w-full max-w-6xl opacity-80"
        style={{
          clipPath: "polygon(24% 100%, 25.2% 100%, 47% 0%, 46% 0%)",
          backgroundColor: "rgba(232,184,109,0.5)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 mx-auto h-[42%] w-full max-w-6xl opacity-80"
        style={{
          clipPath: "polygon(74.8% 100%, 76% 100%, 54% 0%, 53% 0%)",
          backgroundColor: "rgba(232,184,109,0.5)",
        }}
      />

      {/* Vanishing-point glow at the far end of the hall */}
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-hallway-gold/20 blur-[90px]" />

      {/* Vignette to frame the scene */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
}
