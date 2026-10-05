import Image from "next/image";
import Link from "next/link";
import type { Fact, Img } from "@/lib/treatments/types";
import { Reveal } from "@/components/ui/Reveal";

// En-tête des pages intérieures : fil d'Ariane, titre serif, chapeau,
// repères clés et grande image.
export function PageHero({
  eyebrow,
  title,
  titleEm,
  intro,
  image,
  highlights,
}: {
  eyebrow: string;
  title: string;
  titleEm: string;
  intro: string;
  image: Img;
  highlights: Fact[];
}) {
  return (
    <section className="bg-ivory pt-32 pb-16 md:pt-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <nav aria-label="Fil d'Ariane" className="text-sm text-stone">
            <Link href="/" className="hover:text-ink">
              Accueil
            </Link>
            <span className="mx-2 text-line">/</span>
            <span className="text-ink">{eyebrow}</span>
          </nav>
          <h1 className="mt-8 max-w-4xl font-serif text-[2.6rem] leading-[1.05] tracking-[-0.01em] text-ink sm:text-6xl lg:text-7xl">
            {title} <em className="text-sage-600">{titleEm}</em>
          </h1>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <Reveal delay={0.05} className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-stone">{intro}</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <dl className="divide-y divide-line border-y border-line">
              {highlights.map((h) => (
                <div key={h.label} className="flex items-baseline justify-between gap-6 py-3.5">
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-champagne-700">{h.label}</dt>
                  <dd className="text-right text-[15px] text-ink">{h.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="relative mt-14 aspect-[16/10] overflow-hidden rounded-[2rem] bg-sand sm:aspect-[21/9]">
          <Image src={image.src} alt={image.alt} fill priority sizes="92vw" className="object-cover" />
          <div aria-hidden className="pointer-events-none absolute inset-3 rounded-[1.6rem] ring-1 ring-ivory/30" />
        </div>
      </div>
    </section>
  );
}
