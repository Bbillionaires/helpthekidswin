/**
 * Gold monogram badge with sunburst rays, used atop the grand hall and
 * the guide screen for a consistent heraldic mark.
 */
export function Emblem({ size = 72 }: { size?: number }) {
  const rays = Array.from({ length: 16 });
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-[0_0_12px_rgba(232,184,109,0.5)]">
      {rays.map((_, i) => {
        const angle = (360 / rays.length) * i;
        return (
          <line
            key={i}
            x1="50"
            y1="4"
            x2="50"
            y2="12"
            stroke="rgba(232,184,109,0.8)"
            strokeWidth="1.5"
            transform={`rotate(${angle} 50 50)`}
          />
        );
      })}
      <circle cx="50" cy="50" r="30" fill="none" stroke="#e8b86d" strokeWidth="2" />
      <circle cx="50" cy="50" r="25" fill="#120b18" stroke="#e8b86d" strokeWidth="1" />
      <text
        x="50"
        y="59"
        textAnchor="middle"
        fontSize="26"
        fontFamily="Georgia, serif"
        fill="#e8b86d"
      >
        H
      </text>
    </svg>
  );
}
