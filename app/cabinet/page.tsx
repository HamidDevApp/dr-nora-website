import type { Metadata } from "next";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { IMAGES, unsplash } from "@/lib/images";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon, PinIcon } from "@/components/ui/icons";
import { BentoGrid } from "@/components/treatment/BentoGrid";
import { ConsultBand } from "@/components/treatment/ConsultBand";
import type { BentoItem, Step } from "@/lib/treatments/types";

export const metadata: Metadata = {
  title: "Le cabinet · Dr Nora Leghzaoui, médecine esthétique à Agadir Bay",
  description:
    "Le parcours du Dr Nora Leghzaoui, les standards d'hygiène du cabinet et l'expérience patiente au cœur d'Agadir Bay.",
};

// Standards d'hygiène et de sécurité : à valider avec le cabinet avant la mise en ligne.
const HYGIENE: BentoItem[] = [
  {
    title: "Matériel stérile et à usage unique",
    text: "Aiguilles, canules, embouts et kits de prélèvement sont stériles et à usage unique, ouverts devant vous.",
    tag: "Asepsie",
    span: "big",
    image: { src: unsplash("photo-1719461341347-dac3e2087b59"), alt: "Préparation d'un soin avec des gants stériles" },
  },
  {
    title: "Désinfection entre chaque patiente",
    text: "Surfaces, pièces à main et appareils sont désinfectés selon un protocole écrit.",
    tag: "Protocole",
  },
  {
    title: "Traçabilité des produits",
    text: "Le numéro de lot de chaque produit injecté est consigné dans votre dossier.",
    tag: "Sécurité",
  },
  {
    title: "Dossier médical confidentiel",
    text: "Vos antécédents, photos de suivi et comptes rendus sont conservés dans le respect du secret médical et de la loi 09-08.",
    tag: "Confidentialité",
    span: "wide",
  },
];

const JOURNEY: Step[] = [
  { title: "L'accueil", text: "Un espace calme et lumineux, sans attente inutile : votre rendez-vous est préparé à l'avance." },
  { title: "La consultation", text: "Un temps d'écoute et d'examen pour comprendre vos attentes, vos antécédents et poser un diagnostic." },
  { title: "Le protocole", text: "Le Dr Nora vous explique les options, les résultats attendus, les suites et le tarif, avant toute décision." },
  { title: "Le soin", text: "Réalisé dans une salle dédiée, avec des réglages et des gestes adaptés à votre peau." },
  { title: "Le suivi", text: "Conseils écrits après la séance, rendez-vous de contrôle et cabinet joignable pour toute question." },
];

const GALLERY = [
  { src: unsplash("photo-1787496994323-59ac5cff09f9"), alt: "Salon d'attente aux tons crème et bois", className: "md:col-span-2 md:row-span-2" },
  { src: unsplash("photo-1786937680099-779e1da6f7f7", 1000), alt: "Couloir lumineux du cabinet", className: "" },
  { src: unsplash("photo-1762625570087-6d98fca29531", 1000), alt: "Espace d'accueil moderne", className: "" },
];

export default function CabinetPage() {
  return (
    <>
      {/* Hero : portrait réel du Dr Nora */}
      <section className="bg-ivory pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne-700">Le cabinet & l&apos;expertise</p>
              <h1 className="mt-6 font-serif text-[2.6rem] leading-[1.05] tracking-[-0.01em] text-ink sm:text-6xl lg:text-7xl">
                Le Dr Nora Leghzaoui, <em className="text-sage-600">médecin avant tout.</em>
              </h1>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-stone">
                <p>
                  Médecin, le Dr Nora a choisi de réunir trois disciplines qui se répondent : la médecine laser, la
                  médecine esthétique et la nutrition. Une conviction guide sa pratique : la beauté de la peau se
                  travaille de l&apos;intérieur comme de l&apos;extérieur.
                </p>
                <p>
                  Au cabinet, chaque traitement repose sur un diagnostic médical, des indications posées avec rigueur
                  et un suivi personnalisé. L&apos;objectif n&apos;est jamais de transformer, mais de révéler la
                  meilleure version de votre peau et de votre silhouette.
                </p>
              </div>
            </Reveal>

            {SITE.credentials.length > 0 && (
              <Reveal delay={0.1}>
                <h2 className="mt-10 font-serif text-2xl text-ink">Formation et parcours</h2>
                <ul className="mt-4 space-y-2.5">
                  {SITE.credentials.map((c) => (
                    <li key={c} className="flex items-start gap-3 text-[15px] text-ink">
                      <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-sage-600" />
                      {c}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.1} className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand">
              <Image src={IMAGES.hero.src} alt={IMAGES.hero.alt} fill priority sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover" />
              <div aria-hidden className="pointer-events-none absolute inset-3 rounded-[1.6rem] ring-1 ring-champagne/40" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Hygiène et sécurité */}
      <section aria-labelledby="hygiene-title" className="bg-sand/60 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            id="hygiene-title"
            eyebrow="Hygiène et sécurité"
            title={
              <>
                Des standards d&apos;hygiène <em className="text-sage-600">sans compromis.</em>
              </>
            }
            intro="La médecine esthétique est un acte médical. Le cabinet applique les mêmes exigences d'asepsie et de traçabilité qu'une structure de soins."
          />
          <div className="mt-14">
            <BentoGrid items={HYGIENE} />
          </div>
        </div>
      </section>

      {/* Expérience patiente */}
      <section aria-labelledby="experience-title" className="bg-ivory py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            id="experience-title"
            eyebrow="L'expérience patiente"
            title={
              <>
                Un parcours pensé <em className="text-sage-600">pour votre sérénité.</em>
              </>
            }
            intro="De la prise de rendez-vous au suivi, chaque étape est conçue pour que vous vous sentiez écoutée, informée et en confiance."
          />
          <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-5">
            {JOURNEY.map((s, i) => (
              <Reveal as="li" key={s.title} delay={0.05 * i} className="bg-ivory p-7">
                <span className="font-serif text-4xl text-champagne">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-4 font-serif text-2xl text-ink">{s.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-stone">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Le lieu */}
      <section aria-labelledby="lieu-title" className="bg-ivory pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionHeading
                id="lieu-title"
                eyebrow="Agadir Bay"
                title={
                  <>
                    Un cadre apaisant, <em className="text-sage-600">face à la baie.</em>
                  </>
                }
                intro="Le cabinet est situé dans le quartier Agadir Bay. Lumière naturelle, matières douces et salles de soins dédiées : tout est pensé pour que la visite soit un moment de calme."
              />
            </div>
            <Reveal delay={0.05} className="lg:col-span-5">
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-3xl bg-sand/70 p-6 transition-colors hover:bg-sand"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory text-sage-600">
                  <PinIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-medium text-ink">{SITE.address.line1}</span>
                  <span className="mt-1 block text-[15px] text-stone">
                    {SITE.address.line2}, {SITE.address.city}
                  </span>
                  <span className="mt-2 inline-block text-sm font-medium text-sage-600">Voir l&apos;itinéraire</span>
                </span>
              </a>
            </Reveal>
          </div>

          {/* Galerie : photos provisoires à remplacer par celles du cabinet */}
          <div className="mt-14 grid auto-rows-[220px] gap-4 md:grid-cols-3 md:auto-rows-[260px]">
            {GALLERY.map((g, i) => (
              <Reveal key={g.src} delay={0.05 * i} className={`relative overflow-hidden rounded-3xl bg-sand ${g.className}`}>
                <Image src={g.src} alt={g.alt} fill sizes="(min-width: 768px) 60vw, 92vw" className="object-cover" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ConsultBand topic="première consultation" />
    </>
  );
}
