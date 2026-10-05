import type { TreatmentPage } from "@/lib/treatments/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "./PageHero";
import { TechniqueNav } from "./TechniqueNav";
import { TechniqueSection } from "./TechniqueSection";
import { BentoGrid } from "./BentoGrid";
import { ConsultBand } from "./ConsultBand";

// Gabarit complet d'une page de soins, alimenté par un objet TreatmentPage :
// hero → techniques (sommaire collant + sections) → bento → FAQ → rendez-vous.
export function TreatmentPageView({ data }: { data: TreatmentPage }) {
  const navItems = data.techniques.map((t) => ({ id: t.id, label: t.navLabel }));

  return (
    <>
      <PageHero
        eyebrow={data.eyebrow}
        title={data.title}
        titleEm={data.titleEm}
        intro={data.intro}
        image={data.heroImage}
        highlights={data.highlights}
      />

      <section aria-label={data.techniquesTitle} className="bg-ivory pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="border-t border-line pt-16">
            <h2 className="max-w-2xl font-serif text-3xl leading-tight text-ink sm:text-4xl">{data.techniquesTitle}</h2>
          </Reveal>

          <div className="mt-10 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-16">
            <aside className="contents lg:col-span-3 lg:block">
              <TechniqueNav items={navItems} title="Sur cette page" />
            </aside>
            <div className="mt-10 space-y-24 lg:col-span-9 lg:mt-0">
              {data.techniques.map((t, i) => (
                <TechniqueSection key={t.id} t={t} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby={`${data.slug}-bento`} className="bg-sand/60 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            id={`${data.slug}-bento`}
            eyebrow={data.bentoEyebrow}
            title={data.bentoTitle}
            intro={data.bentoIntro}
          />
          <div className="mt-14">
            <BentoGrid items={data.bento} />
          </div>
        </div>
      </section>

      <section aria-labelledby={`${data.slug}-faq`} className="bg-ivory py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id={`${data.slug}-faq`} eyebrow="Questions fréquentes" title="Ce que l'on nous demande souvent" />
          </div>
          <Reveal delay={0.05} className="lg:col-span-8">
            <Accordion items={data.faq} defaultOpen={0} />
          </Reveal>
        </div>
      </section>

      <ConsultBand topic={data.eyebrow} />
    </>
  );
}
