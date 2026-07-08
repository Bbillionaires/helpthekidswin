export function FloorMedallion({ size = 180 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className="opacity-70">
      <circle cx="100" cy="100" r="96" fill="none" stroke="#e8b86d" strokeWidth="1.5" opacity="0.5" />
      <circle cx="100" cy="100" r="80" fill="none" stroke="#e8b86d" strokeWidth="1" opacity="0.35" />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (360 / 8) * i;
        return (
          <polygon
            key={i}
            points="100,20 108,100 100,100 92,100"
            fill="rgba(232,184,109,0.25)"
            stroke="rgba(232,184,109,0.5)"
            strokeWidth="0.5"
            transform={`rotate(${angle} 100 100)`}
          />
        );
      })}
      <circle cx="100" cy="100" r="14" fill="#120b18" stroke="#e8b86d" strokeWidth="1.5" />
    </svg>
  );
}
