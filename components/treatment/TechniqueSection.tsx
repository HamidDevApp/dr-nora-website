import Image from "next/image";
import type { Technique } from "@/lib/treatments/types";
import { whatsappUrl } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowIcon, CheckIcon } from "@/components/ui/icons";

// Section "rich text" d'une technique : grande image, chapeau, puis
// Comment ça marche ? / Indications / Déroulement, repères et FAQ.
export function TechniqueSection({ t, index }: { t: Technique; index: number }) {
  return (
    <article id={t.id} aria-labelledby={`${t.id}-title`} className="scroll-mt-40 border-t border-line pt-16 first:border-t-0 first:pt-0 lg:scroll-mt-28">
      <Reveal>
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-champagne-700">
          <span className="font-serif text-base normal-case tracking-normal">{String(index + 1).padStart(2, "0")}</span>
          {t.kicker}
          {t.placeholder && (
            <span className="rounded-full border border-dashed border-champagne px-2 py-0.5 text-[10px] tracking-[0.12em]">
              À confirmer
            </span>
          )}
        </p>
        <h2 id={`${t.id}-title`} className="mt-4 font-serif text-4xl leading-[1.1] text-ink sm:text-5xl">
          {t.title}
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone">{t.lead}</p>
      </Reveal>

      <Reveal delay={0.05} className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[2rem] bg-sand">
        <Image src={t.image.src} alt={t.image.alt} fill sizes="(min-width: 1024px) 60vw, 92vw" className="object-cover" />
      </Reveal>

      {/* Repères indicatifs */}
      <Reveal delay={0.05}>
        <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {t.facts.map((f) => (
            <div key={f.label} className="bg-ivory px-5 py-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-champagne-700">{f.label}</dt>
              <dd className="mt-1 text-[15px] text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className="mt-14 grid gap-12 xl:grid-cols-2">
        <Reveal>
          <h3 className="font-serif text-2xl text-ink">Comment ça marche ?</h3>
          <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-stone">
            {t.how.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h3 className="font-serif text-2xl text-ink">Indications</h3>
          <ul className="mt-4 space-y-3">
            {t.indications.map((ind) => (
              <li key={ind} className="flex gap-3 text-[16px] leading-relaxed text-ink">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-600">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {ind}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Déroulement : frise numérotée */}
      <Reveal className="mt-14">
        <h3 className="font-serif text-2xl text-ink">Déroulement de la séance</h3>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2">
          {t.steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl bg-sand/70 p-6">
              <span className="font-serif text-3xl text-champagne">{i + 1}</span>
              <p className="mt-2 font-medium text-ink">{s.title}</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-stone">{s.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      {t.faq.length > 0 && (
        <Reveal className="mt-14">
          <h3 className="mb-2 font-serif text-2xl text-ink">Vos questions</h3>
          <Accordion items={t.faq} />
        </Reveal>
      )}

      <Reveal className="mt-10 flex flex-col gap-4 rounded-2xl border border-line p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-champagne-700">Sur devis</p>
          <p className="mt-1 text-[15px] text-stone">Prix défini après consultation médicale</p>
        </div>
        <a
          href={whatsappUrl(`Bonjour Dr Nora, je souhaite un rendez-vous pour : ${t.title}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-ivory transition-colors hover:bg-ink/90"
        >
          Demander une consultation
          <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </Reveal>
    </article>
  );
}
