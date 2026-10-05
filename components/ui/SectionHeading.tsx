import { Reveal } from "./Reveal";

// Sur-titre doré + titre serif + texte d'introduction, utilisé par chaque section.
export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  const center = align === "center";
  const dark = tone === "dark";
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        className={`text-xs font-semibold uppercase tracking-[0.2em] ${
          dark ? "text-champagne" : "text-champagne-700"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-4 font-serif text-4xl leading-[1.1] tracking-[-0.01em] sm:text-5xl ${
          dark ? "text-ivory" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-5 text-[17px] leading-relaxed ${
            dark ? "text-ivory/75" : "text-stone"
          }`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
