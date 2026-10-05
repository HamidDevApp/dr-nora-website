// Étoiles avec remplissage fractionné : 4,6 affiche 4 étoiles pleines
// et une étoile remplie à 60 %.

const STAR =
  "M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z";

export function StarRating({
  value,
  className = "h-4 w-4",
}: {
  value: number;
  className?: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`${value.toLocaleString("fr-FR")} sur 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className={`relative inline-block ${className}`}>
            <svg viewBox="0 0 20 20" className="absolute inset-0 h-full w-full text-line" fill="currentColor" aria-hidden>
              <path d={STAR} />
            </svg>
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <svg viewBox="0 0 20 20" className={`${className} text-champagne`} fill="currentColor" aria-hidden>
                <path d={STAR} />
              </svg>
            </span>
          </span>
        );
      })}
    </span>
  );
}
