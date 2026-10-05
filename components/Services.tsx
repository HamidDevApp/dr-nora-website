"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { SERVICE_CATEGORIES, type ServiceCategory } from "@/lib/services";
import { whatsappUrl } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { EASE } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon, LeafIcon, ShieldIcon, SparkIcon } from "@/components/ui/icons";

const CATEGORY_ICON: Record<ServiceCategory["id"], React.ComponentType<{ className?: string }>> = {
  laser: SparkIcon,
  esthetique: ShieldIcon,
  nutrition: LeafIcon,
};

export default function Services() {
  const [active, setActive] = useState<ServiceCategory["id"]>("laser");
  const category = SERVICE_CATEGORIES.find((c) => c.id === active)!;

  return (
    <section id="soins" aria-labelledby="soins-title" className="bg-sand/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="soins-title"
            eyebrow="Nos soins"
            title={
              <>
                Trois expertises, <em className="text-sage-600">un seul parcours.</em>
              </>
            }
            intro="Chaque protocole commence par une consultation médicale. C'est là que le Dr Nora définit avec vous le soin, le nombre de séances et le tarif."
          />

          {/* Onglets de catégories : boutons ARIA "tab" accessibles au clavier */}
          <div
            role="tablist"
            aria-label="Catégories de soins"
            className="grid w-full grid-cols-3 gap-1 rounded-full border border-line bg-ivory p-1 lg:flex lg:w-auto"
          >
            {SERVICE_CATEGORIES.map((c) => {
              const selected = c.id === active;
              return (
                <button
                  key={c.id}
                  role="tab"
                  type="button"
                  id={`tab-${c.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${c.id}`}
                  onClick={() => setActive(c.id)}
                  className={`relative rounded-full px-3 py-2.5 sm:px-5 text-sm font-medium transition-colors ${
                    selected ? "text-ivory" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="services-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ duration: 0.45, ease: EASE }}
                    />
                  )}
                  <span className="relative sm:hidden">{c.shortLabel}</span>
                  <span className="relative hidden sm:inline">{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={category.id}
            id={`panel-${category.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${category.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-14"
          >
            <div className="grid gap-5 lg:grid-cols-12">
              {/* Visuel de la catégorie, avec son introduction en surimpression */}
              <figure className="relative min-h-[320px] overflow-hidden rounded-3xl bg-sand lg:col-span-4 lg:min-h-0">
                <Image
                  src={IMAGES.services[category.id].src}
                  alt={IMAGES.services[category.id].alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 90vw"
                  className="object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-serif text-3xl text-ivory">{category.label}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ivory/85">{category.intro}</p>
                  <Link
                    href={`/${category.id}`}
                    className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-ivory px-5 text-sm font-medium text-ink transition-colors hover:bg-sand"
                  >
                    Découvrir la page {category.shortLabel}
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </Link>
                </figcaption>
              </figure>

              <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
                {category.services.map((s, i) => (
                  <ServiceCard
                    key={s.title}
                    index={i}
                    title={s.title}
                    description={s.description}
                    Icon={CATEGORY_ICON[category.id]}
                  />
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="mt-12 text-center text-sm text-stone">
          Conformément à la réglementation marocaine, aucun tarif n&apos;est affiché en ligne. Le
          prix est défini après consultation médicale.
        </p>
      </div>
    </section>
  );
}

function ServiceCard({
  index,
  title,
  description,
  Icon,
}: {
  index: number;
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.06 }}
      className="group flex flex-col rounded-3xl border border-line bg-ivory p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_-30px_rgba(31,42,46,0.35)]"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-100 text-sage-600">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-6 font-serif text-2xl leading-tight text-ink">{title}</h3>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-stone">{description}</p>

      <div className="mt-7 border-t border-line pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-champagne-700">
          Sur devis
        </p>
        <p className="mt-1 text-[13px] text-stone">Prix défini après consultation médicale</p>
        <a
          href={whatsappUrl(`Bonjour Dr Nora, je souhaite un devis pour : ${title}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink underline-offset-4 group-hover:underline"
        >
          Demander un devis
          <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </motion.li>
  );
}
