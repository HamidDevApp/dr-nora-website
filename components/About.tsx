import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon, PinIcon } from "@/components/ui/icons";

const PILLARS = [
  {
    title: "Une approche médicale",
    text: "Chaque soin est précédé d'un diagnostic et adapté à votre peau, à votre histoire et à vos attentes.",
  },
  {
    title: "Des résultats naturels",
    text: "Corriger sans transformer : l'objectif est un visage reposé et une peau en meilleure santé.",
  },
  {
    title: "Un suivi dans la durée",
    text: "Esthétique et nutrition se répondent, pour des résultats qui tiennent dans le temps.",
  },
];

export default function About() {
  return (
    <section id="cabinet" aria-labelledby="cabinet-title" className="bg-ivory py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-12">
        {/* Visuels : photo du médecin + photo du cabinet en médaillon */}
        <Reveal className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand">
            <Image
              src={IMAGES.aboutMain.src}
              alt={IMAGES.aboutMain.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -right-4 hidden aspect-square w-44 overflow-hidden rounded-3xl border-4 border-ivory bg-sand shadow-[0_20px_50px_-25px_rgba(31,42,46,0.4)] sm:block lg:-right-10 lg:w-52">
            <Image
              src={IMAGES.aboutMedallion.src}
              alt={IMAGES.aboutMedallion.alt}
              fill
              sizes="208px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-7 lg:pl-10">
          <SectionHeading
            id="cabinet-title"
            eyebrow="À propos"
            title={
              <>
                Le Dr Nora Leghzaoui, <em className="text-sage-600">au cœur d&apos;Agadir Bay.</em>
              </>
            }
            intro="Médecin, le Dr Nora a réuni dans un même cabinet la médecine laser, la médecine esthétique et la nutrition. Sa conviction : la beauté de la peau se travaille de l'intérieur comme de l'extérieur, avec rigueur et douceur."
          />

          {SITE.credentials.length > 0 && (
            <Reveal delay={0.1}>
              <ul className="mt-8 space-y-2.5">
                {SITE.credentials.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-[15px] text-ink">
                    <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-sage-600" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={0.08 * i} className="border-t border-line pt-6">
                <h3 className="font-serif text-xl text-ink">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-stone">{p.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <Link
              href="/cabinet"
              className="mt-10 inline-flex items-center gap-2 text-[15px] font-medium text-ink underline-offset-4 hover:underline"
            >
              Découvrir le cabinet et le parcours du Dr Nora
              <span aria-hidden>→</span>
            </Link>
          </Reveal>

          <Reveal delay={0.2}>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 flex items-start gap-4 rounded-3xl bg-sand/70 p-6 transition-colors hover:bg-sand"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory text-sage-600">
                <PinIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-medium text-ink">Un cabinet à Agadir Bay</span>
                <span className="mt-1 block text-[15px] leading-relaxed text-stone">
                  Face à la baie, dans le quartier Agadir Bay : {SITE.address.line1},{" "}
                  {SITE.address.line2}, {SITE.address.city}.
                </span>
                <span className="mt-2 inline-block text-sm font-medium text-sage-600 underline-offset-4 hover:underline">
                  Voir l&apos;itinéraire
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
