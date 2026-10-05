"use client";

import { useRef } from "react";
import { SITE } from "@/lib/site";
import { visibleReviews } from "@/lib/reviews";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarRating } from "@/components/ui/StarRating";
import { ChevronIcon, GoogleIcon } from "@/components/ui/icons";

export default function Reviews() {
  const reviews = visibleReviews();
  const track = useRef<HTMLUListElement>(null);

  // Carrousel natif : défilement horizontal avec "scroll-snap", sans librairie.
  // Les flèches font défiler d'une carte ; au doigt, le glissement suffit.
  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="avis" aria-labelledby="avis-title" className="overflow-hidden bg-sand/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              id="avis-title"
              eyebrow="Avis patientes"
              title={
                <>
                  Elles nous font <em className="text-sage-600">confiance.</em>
                </>
              }
            />
          </div>

          {/* Note globale Google : chiffres réels de la fiche du cabinet */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 rounded-3xl border border-line bg-ivory p-6 transition-shadow hover:shadow-[0_20px_50px_-30px_rgba(31,42,46,0.4)]"
            >
              <span className="font-serif text-6xl leading-none text-ink">
                {SITE.rating.value.toLocaleString("fr-FR")}
              </span>
              <span className="flex-1">
                <StarRating value={SITE.rating.value} className="h-5 w-5" />
                <span className="mt-2 flex items-center gap-2 text-sm text-stone">
                  <GoogleIcon className="h-4 w-4" />
                  Sur {SITE.rating.count} avis Google
                </span>
              </span>
              <ChevronIcon className="h-5 w-5 text-stone" />
            </a>
          </Reveal>
        </div>

        {reviews.length > 0 && (
          <>
            <ul
              ref={track}
              className="-mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
              aria-label="Avis Google"
            >
              {reviews.map((r, i) => (
                <li
                  key={i}
                  className={`flex w-[85%] shrink-0 snap-start flex-col rounded-3xl bg-ivory p-8 sm:w-[46%] lg:w-[31.5%] ${
                    r.placeholder ? "border border-dashed border-champagne" : "border border-line"
                  }`}
                >
                  <StarRating value={r.rating} />
                  <blockquote className="mt-5 flex-1 font-serif text-xl italic leading-snug text-ink">
                    « {r.text} »
                  </blockquote>
                  <footer className="mt-6 flex items-center justify-between text-sm">
                    <span className="font-medium text-ink">{r.author}</span>
                    <span className="flex items-center gap-1.5 text-stone">
                      <GoogleIcon className="h-3.5 w-3.5" />
                      {r.date ?? "Avis Google"}
                    </span>
                  </footer>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Avis précédent"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ivory"
              >
                <ChevronIcon className="h-4 w-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Avis suivant"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ivory"
              >
                <ChevronIcon className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
