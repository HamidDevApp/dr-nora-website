"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { SITE, whatsappUrl } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { EASE, fadeUp, stagger } from "@/lib/motion";
import { btnPrimary, btnSecondary } from "@/components/ui/buttons";
import { ArrowIcon, CheckIcon, WhatsAppIcon } from "@/components/ui/icons";
import { StarRating } from "@/components/ui/StarRating";

const TRUST = ["Approche médicale", "Laser, esthétique et nutrition", "Suivi personnalisé"];

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-ivory pt-28 pb-20 md:pt-36 md:pb-28"
    >
      {/* Halo décoratif très léger derrière le portrait */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[36rem] w-[36rem] rounded-full bg-sand blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        {/* Colonne texte */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="lg:col-span-6">
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne-700"
          >
            Cabinet médico-laser · Baie d&apos;Agadir
          </motion.p>

          <motion.h1
            id="hero-title"
            variants={fadeUp}
            className="mt-5 font-serif text-[2.6rem] leading-[1.05] tracking-[-0.01em] text-ink sm:text-6xl lg:text-7xl"
          >
            La médecine esthétique, <em className="text-sage-600">avec justesse.</em>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-[17px] leading-relaxed text-stone">
            Laser, soins esthétiques et nutrition réunis dans un même parcours, pensé par le
            Dr Nora Leghzaoui pour des résultats naturels et durables.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#contact" className={`group ${btnPrimary}`}>
              Réserver une consultation
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
              <WhatsAppIcon className="h-4 w-4 text-sage-600" />
              Écrire sur WhatsApp
            </a>
          </motion.div>

          <motion.ul variants={fadeUp} className="mt-10 flex flex-wrap gap-2" aria-label="Nos engagements">
            {TRUST.map((label) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full bg-sage-100 px-3.5 py-1.5 text-[13px] text-ink"
              >
                <CheckIcon className="h-3.5 w-3.5 text-sage-600" />
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Colonne portrait */}
        <motion.div
          // Pas de fondu sur le portrait : il reste visible dès le premier
          // rendu (bon pour le LCP), seul un léger dézoom l'anime.
          initial={reduce ? false : { scale: 1.03 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="relative lg:col-span-6 lg:pl-8"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-sand lg:max-w-none">
            <Image
              src={IMAGES.hero.src}
              alt={IMAGES.hero.alt}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
            {/* Filet doré intérieur, signature visuelle */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-3 rounded-[1.6rem] ring-1 ring-champagne/40"
            />
          </div>

          {/* Carte flottante : note Google réelle */}
          <motion.a
            href="#avis"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
            className="absolute -bottom-6 left-2 rounded-2xl border border-line bg-ivory/90 px-5 py-4 shadow-[0_12px_40px_-12px_rgba(31,42,46,0.25)] backdrop-blur transition-colors hover:bg-ivory sm:left-0 lg:-left-4"
          >
            <StarRating value={SITE.rating.value} />
            <p className="mt-1.5 text-sm text-ink">
              <span className="font-semibold">{SITE.rating.value.toLocaleString("fr-FR")}/5</span>
              <span className="text-stone"> · {SITE.rating.count} avis Google</span>
            </p>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
