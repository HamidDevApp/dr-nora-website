"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react";
import { SITE, whatsappUrl } from "@/lib/site";
import { SERVICE_CATEGORIES, type ServiceCategory } from "@/lib/services";
import { IMAGES, unsplash } from "@/lib/images";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import { StarRating } from "@/components/ui/StarRating";
import { ArrowIcon, PinIcon, WhatsAppIcon } from "@/components/ui/icons";

/* -------------------------------------------------------------------------- */
/*  Réglages                                                                   */
/* -------------------------------------------------------------------------- */

// Courbe « luxe » : départ franc, arrivée très longue et feutrée.
const LUXE = [0.16, 1, 0.3, 1] as const;

// Vidéo du Hero : fichier local d'abord (rapide), lien Mixkit en secours.
// Si rien ne charge, l'image `poster` reste affichée.
const HERO_VIDEO = {
  sources: ["/videos/hero.mp4", "https://assets.mixkit.co/videos/52153/52153-720.mp4"],
  poster: unsplash("photo-1552693673-1bf958298935", 2000),
};

// Visuels des trois expertises (provisoires, comme dans lib/images.ts),
// harmonisés par un filtre chaud commun (WARM_TONE).
const DISCIPLINE_IMAGES: Record<ServiceCategory["id"], { src: string; alt: string }> = {
  laser: {
    src: unsplash("photo-1746806942799-b4db209e9a6b", 1800),
    alt: "Séance de médecine laser en cabinet",
  },
  esthetique: {
    src: unsplash("photo-1570172619644-dfd03ed5d881", 1800),
    alt: "Soin du visage en cabinet de médecine esthétique",
  },
  nutrition: {
    src: unsplash("photo-1490645935967-10de6ba17061", 1800),
    alt: "Assiette de légumes frais et équilibrée sur une table en bois",
  },
};

const WARM_TONE = "[filter:sepia(0.2)_saturate(0.8)_contrast(1.02)_brightness(0.98)]";

const MARQUEE = [
  "Épilation laser",
  "Taches pigmentaires",
  "Acide hyaluronique",
  "Skinboosters",
  "Photoréjuvénation",
  "Peelings médicaux",
  "PRP",
  "Bilan nutritionnel",
];

const STEPS = [
  { n: "I", title: "Consultation", text: "Un temps d'écoute et un diagnostic médical de votre peau." },
  { n: "II", title: "Protocole", text: "Des soins choisis et dosés pour vous, jamais standardisés." },
  { n: "III", title: "Suivi", text: "Des résultats naturels, accompagnés dans la durée." },
];

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

// Deux matières, obsidienne et os, séparées par des filets d'or d'un pixel
// (<Seam />) : aucune transition brumeuse.
// Header, Footer et bouton WhatsApp vivent dans app/layout.tsx ; avis et
// formulaire de rendez-vous restent dans leurs composants.
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Seam />
      <Approach />
      <Seam />
      <Disciplines />
      <Seam />
      <Doctor />
      <div className="border-t border-gold/20 bg-bone">
        <Reviews />
      </div>
      <Seam />
      <Contact />
      <Seam />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero cinéma                                                                */
/* -------------------------------------------------------------------------- */

function Hero() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Au défilement : la vidéo s'enfonce, le titre remonte et s'efface.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-14%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-obsidian text-bone"
    >
      {/* Vidéo d'ambiance : muette, en boucle, purement décorative */}
      <motion.div aria-hidden style={{ y: videoY }} className="absolute inset-0 -z-20">
        <motion.video
          ref={videoRef}
          autoPlay={!reduce}
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          poster={HERO_VIDEO.poster}
          initial={reduce ? false : { scale: 1.14 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 3.4, ease: LUXE }}
          className={`h-full w-full object-cover ${WARM_TONE}`}
        >
          {HERO_VIDEO.sources.map((src) => (
            <source key={src} src={src} type="video/mp4" />
          ))}
        </motion.video>
      </motion.div>

      {/* Voile de cinéma, très fin */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-obsidian via-black/40 to-black/70" />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="mx-auto w-full max-w-[90rem] px-5 pt-36 pb-28 sm:px-8 lg:px-12 lg:pb-32"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.34em" }}
          transition={{ duration: 1.8, ease: LUXE, delay: 0.2 }}
          className="flex items-center gap-4 text-[10px] font-medium uppercase text-gold-light sm:text-[11px]"
        >
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: LUXE, delay: 0.3 }}
            className="block h-px w-12 origin-left bg-gold"
          />
          Cabinet médico-laser · Baie d&apos;Agadir
        </motion.p>

        <h1
          id="hero-title"
          className="mt-8 font-serif text-[clamp(3.3rem,10vw,10.5rem)] leading-[0.9] font-light tracking-[-0.025em]"
        >
          <MaskLines
            delay={0.45}
            lines={[
              "La médecine",
              "esthétique,",
              <em key="k" className="text-gold-light">
                avec justesse.
              </em>,
            ]}
          />
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease: LUXE, delay: 1.1 }}
            className="max-w-md text-[15px] leading-[1.9] font-light text-mist sm:text-[16px] lg:col-span-5"
          >
            Laser, injections et nutrition, réunis par le Dr Nora Leghzaoui dans un cabinet médical
            face à la baie. Un diagnostic d&apos;abord, puis des soins mesurés pour des résultats
            naturels.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease: LUXE, delay: 1.3 }}
            className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-9 lg:col-span-7 lg:justify-end"
          >
            <Magnetic halo>
              <a
                href="#contact"
                className="shimmer group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full border border-gold/60 bg-white/[0.04] px-8 text-[12px] font-medium whitespace-nowrap uppercase tracking-[0.2em] text-bone backdrop-blur-2xl transition-[border-color,background-color] duration-700 hover:border-gold-light hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light sm:px-10"
              >
                Réserver une consultation
                <ArrowIcon className="h-4 w-4 text-gold-light transition-transform duration-500 group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 text-[14px] text-mist transition-colors hover:text-bone"
            >
              <WhatsAppIcon className="h-4 w-4 text-gold-light" />
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                Écrire sur WhatsApp
              </span>
            </a>
          </motion.div>
        </div>

        {/* Badges de verre (mobile : en ligne sous les boutons) */}
        <div className="mt-12 flex flex-wrap gap-3 lg:hidden">
          <GlassBadge delay={1.6}>
            <StarRating value={SITE.rating.value} className="h-3 w-3" />
            {SITE.rating.value.toLocaleString("fr-FR")}/5 · {SITE.rating.count} avis Google
          </GlassBadge>
          <GlassBadge delay={1.7}>
            <PinIcon className="h-3.5 w-3.5 text-gold-light" />
            {SITE.address.line2}
          </GlassBadge>
        </div>
      </motion.div>

      {/* Badges flottants, ancrés par des épingles dorées (grand écran) */}
      <FloatingBadge className="right-[6%] top-[24%]" delay={1.7} drift={8}>
        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-gold/60">
          <Image src={IMAGES.aboutMedallion.src} alt="" fill sizes="48px" className="object-cover" />
        </span>
        <span>
          <span className="block font-serif text-lg leading-tight text-bone">{SITE.name}</span>
          <span className="mt-0.5 block text-[10px] uppercase tracking-[0.22em] text-mist/70">
            Médecin · {SITE.credentials[0] ?? "Agadir Bay"}
          </span>
          <span className="mt-1.5 flex items-center gap-2 text-[12px] text-mist">
            <StarRating value={SITE.rating.value} className="h-3 w-3" />
            {SITE.rating.value.toLocaleString("fr-FR")}/5 · {SITE.rating.count} avis Google
          </span>
        </span>
      </FloatingBadge>
      <FloatingBadge className="right-[22%] top-[52%]" delay={1.9} drift={-6}>
        <PinIcon className="h-4 w-4 text-gold-light" />
        <span className="text-[11px] uppercase tracking-[0.22em] text-mist">
          {SITE.address.line2} · {SITE.address.city.replace(/\s*\d+/, "")}
        </span>
      </FloatingBadge>

      {/* Indicateur de défilement */}
      <motion.a
        href="#approche"
        aria-label="Défiler vers la suite"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-mist/60 md:flex"
      >
        Défiler
        <span className="relative block h-12 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-gold"
            animate={reduce ? undefined : { y: ["-100%", "200%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>

      {/* Pause de la vidéo (accessibilité : tout mouvement > 5 s doit pouvoir s'arrêter) */}
      <button
        type="button"
        onClick={toggleVideo}
        aria-label={playing ? "Mettre la vidéo en pause" : "Lire la vidéo"}
        className="absolute bottom-8 left-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-mist backdrop-blur-md transition-colors hover:border-gold/60 hover:text-bone sm:left-8 lg:left-12"
      >
        {playing ? (
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor" aria-hidden>
            <rect x="3" y="2" width="3.5" height="12" rx="1" />
            <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor" aria-hidden>
            <path d="M4 2.5v11a.5.5 0 0 0 .76.43l9-5.5a.5.5 0 0 0 0-.86l-9-5.5A.5.5 0 0 0 4 2.5z" />
          </svg>
        )}
      </button>
    </section>
  );
}

function GlassBadge({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: LUXE, delay }}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] tracking-wide text-mist backdrop-blur-2xl"
    >
      {children}
    </motion.span>
  );
}

// Badge de verre suspendu à une épingle dorée (filet + perle), qui dérive
// très lentement. Décoratif : l'information existe aussi ailleurs sur la page.
function FloatingBadge({
  children,
  className,
  delay,
  drift,
}: {
  children: React.ReactNode;
  className: string;
  delay: number;
  drift: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, ease: LUXE, delay }}
      className={`absolute hidden lg:block ${className}`}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, drift, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center"
      >
        <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_12px_rgba(197,168,128,0.8)]" />
        <span className="h-10 w-px bg-gradient-to-b from-gold to-gold/10" />
        <div className="shimmer group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 backdrop-blur-2xl transition-colors duration-700 hover:border-gold/50">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Bandeau défilant + jointures architecturales                               */
/* -------------------------------------------------------------------------- */

function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div aria-hidden className="velvet overflow-hidden border-t border-gold/20 bg-obsidian py-7">
      <div className="animate-marquee flex w-max items-center">
        {items.map((label, i) => (
          <span key={i} className="flex items-center">
            <span className="px-10 font-serif text-2xl font-light italic text-mist/70">{label}</span>
            <span className="h-1.5 w-1.5 rotate-45 border border-gold/70" />
          </span>
        ))}
      </div>
    </div>
  );
}

// Jointure entre deux sections : filet d'or brossé d'un pixel et losange central.
function Seam() {
  return (
    <div aria-hidden className="relative z-10 h-0">
      <div className="hairline-gold absolute inset-x-0 top-0" />
      <span className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold bg-obsidian" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  L'approche                                                                 */
/* -------------------------------------------------------------------------- */

function Approach() {
  return (
    <section id="approche" aria-labelledby="approche-title" className="bg-bone py-32 md:py-44">
      <div className="mx-auto grid max-w-[90rem] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-3">
          <Eyebrow id="approche-title">L&apos;approche</Eyebrow>
        </div>
        <div className="lg:col-span-9">
          <p className="font-serif text-[clamp(2.1rem,4.6vw,4.4rem)] leading-[1.12] font-light tracking-[-0.015em] text-graphite">
            <MaskLines
              inView
              lines={[
                "Chaque visage a son histoire.",
                <>
                  Avant tout geste, <em className="text-gold-ink">un diagnostic médical.</em>
                </>,
                "Puis des soins mesurés, pour un résultat",
                <em key="r" className="text-gold-ink">
                  qui vous ressemble.
                </em>,
              ]}
            />
          </p>

          <div className="mt-20 grid border-t border-gold/25 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.2, ease: LUXE, delay: 0.1 * i }}
                className={`py-8 sm:pr-8 ${i > 0 ? "border-t border-gold/25 sm:border-t-0 sm:border-l sm:pl-8" : ""}`}
              >
                <p className="font-serif text-xl text-gold-ink italic">{s.n}</p>
                <h3 className="mt-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-graphite">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.8] font-light text-taupe">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Les trois expertises : cartes « atelier » empilées au défilement           */
/* -------------------------------------------------------------------------- */

function Disciplines() {
  const stackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const stacked = desktop && !reduce; // mobile / animations réduites : simple pile
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });
  const total = SERVICE_CATEGORIES.length;

  return (
    <section id="soins" aria-labelledby="soins-title" className="velvet bg-obsidian text-mist">
      <div className="mx-auto max-w-[90rem] px-5 pt-32 sm:px-8 md:pt-44 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow tone="dark">Expertises</Eyebrow>
            <h2
              id="soins-title"
              className="mt-8 font-serif text-[clamp(2.6rem,6vw,6rem)] leading-[0.98] font-light tracking-[-0.02em] text-bone"
            >
              <MaskLines
                inView
                lines={[
                  "Trois disciplines,",
                  <em key="m" className="text-gold-light">
                    un même regard médical.
                  </em>,
                ]}
              />
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-[1.9] font-light text-mist/80 lg:col-span-4">
            Tous les soins sont réalisés par le Dr Nora, après consultation. Aucun tarif n&apos;est
            affiché en ligne : il est défini en consultation médicale, selon votre peau et vos
            objectifs.
          </p>
        </div>
      </div>

      <div ref={stackRef} className="relative mx-auto mt-20 max-w-[90rem] px-5 pb-32 sm:px-8 md:mt-28 lg:px-12 lg:pb-44">
        {SERVICE_CATEGORIES.map((c, i) => (
          <AtelierCard
            key={c.id}
            category={c}
            index={i}
            total={total}
            progress={scrollYProgress}
            stacked={stacked}
          />
        ))}
      </div>
    </section>
  );
}

function AtelierCard({
  category,
  index,
  total,
  progress,
  stacked,
}: {
  category: ServiceCategory;
  index: number;
  total: number;
  progress: MotionValue<number>;
  stacked: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const image = DISCIPLINE_IMAGES[category.id];
  const num = String(index + 1).padStart(2, "0");

  // Pile : chaque carte recule légèrement quand la suivante la recouvre.
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, stacked ? targetScale : 1]);
  const veil = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [0, stacked && index < total - 1 ? 0.45 : 0]
  );

  // Profondeur : la photo dézoome à mesure que la carte arrive.
  const { scrollYProgress: enter } = useScroll({ target: wrapRef, offset: ["start end", "start start"] });
  const imgScale = useTransform(enter, [0, 1], [stacked ? 1.18 : 1.06, 1]);
  const imgY = useTransform(enter, [0, 1], ["-6%", "0%"]);

  return (
    <div
      ref={wrapRef}
      className={stacked ? "sticky top-0 flex h-[100svh] items-center" : "mb-8 last:mb-0"}
    >
      <motion.article
        style={stacked ? { scale, top: `${index * 28}px` } : undefined}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.2, ease: LUXE }}
        className="relative w-full origin-top overflow-hidden rounded-[4px] border border-gold/15 bg-obsidian-soft shadow-[0_60px_120px_-50px_rgba(0,0,0,0.9)] lg:h-[min(78svh,760px)]"
      >
        {/* Halo d'ambiance doré */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_90%_at_100%_0%,rgba(197,168,128,0.10),transparent_60%)]"
        />

        <div className="relative grid h-full lg:grid-cols-12">
          {/* Photo */}
          <div className="relative aspect-[4/3] overflow-hidden lg:col-span-7 lg:aspect-auto lg:h-full">
            <motion.div style={{ scale: imgScale, y: imgY }} className="absolute -inset-y-[6%] inset-x-0 will-change-transform">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 55vw, 92vw"
                className={`object-cover ${WARM_TONE}`}
              />
            </motion.div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-obsidian-soft/70 lg:to-obsidian-soft" />
            <span
              aria-hidden
              className="absolute top-6 left-6 font-serif text-[5.5rem] leading-none font-light italic text-gold-light/90 sm:text-[7rem] lg:top-8 lg:left-10"
            >
              {num}
            </span>
          </div>

          {/* Panneau de verre */}
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-5 lg:p-12">
            <div className="shimmer group relative overflow-hidden rounded-[4px] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-2xl transition-colors duration-700 hover:border-gold/50 sm:p-9">
              <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-light">
                <span className="font-serif text-sm font-normal tracking-normal italic">{num}</span>
                <span aria-hidden className="h-px w-6 bg-gold/60" />
                {category.shortLabel}
              </p>
              <h3 className="mt-5 font-serif text-[2.4rem] leading-[1.05] font-light text-bone sm:text-5xl">
                {category.label}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.85] font-light text-mist/85">{category.intro}</p>

              <ul className="mt-7 divide-y divide-white/[0.07] border-y border-white/[0.07]">
                {category.services.map((s) => (
                  <li key={s.title}>
                    <a
                      href={whatsappUrl(`Bonjour Dr Nora, je souhaite un devis pour : ${s.title}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/item flex items-baseline justify-between gap-4 py-3 text-[14px] text-mist transition-colors hover:text-gold-light"
                    >
                      <span className="transition-transform duration-500 group-hover/item:translate-x-1">
                        {s.title}
                      </span>
                      <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-mist/45">
                        Sur devis
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <Link
                href={`/${category.id}`}
                className="group/link mt-7 inline-flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.2em] text-bone"
              >
                <span className="bg-[linear-gradient(var(--color-gold),var(--color-gold))] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover/link:bg-[length:0%_1px]">
                  Découvrir la page {category.shortLabel}
                </span>
                <ArrowIcon className="h-3.5 w-3.5 text-gold transition-transform duration-500 group-hover/link:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Assombrit la carte quand la suivante passe devant */}
        <motion.div aria-hidden style={{ opacity: veil }} className="pointer-events-none absolute inset-0 bg-obsidian" />
      </motion.article>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Le sanctuaire du Dr Nora                                                   */
/* -------------------------------------------------------------------------- */

function Doctor() {
  // Uniquement des chiffres réels. Les champs optionnels de lib/site.ts
  // n'apparaissent qu'une fois renseignés.
  const stats: { value: number; decimals?: number; suffix?: string; label: string }[] = [
    { value: SITE.rating.value, decimals: 1, suffix: "/5", label: "Note Google" },
    { value: SITE.rating.count, label: "Avis Google" },
    ...(SITE.experienceYears != null ? [{ value: SITE.experienceYears, label: "Années d'expérience" }] : []),
    ...(SITE.patientsCount != null ? [{ value: SITE.patientsCount, suffix: "+", label: "Patients suivis" }] : []),
    { value: SERVICE_CATEGORIES.length, label: "Expertises réunies" },
  ];

  return (
    <section id="cabinet" aria-labelledby="cabinet-title" className="overflow-hidden bg-bone py-32 md:py-44">
      <div className="mx-auto grid max-w-[90rem] items-center gap-24 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        {/* Portrait : canevas en arche, filet champagne flottant, rétroéclairage */}
        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          {/* Rétroéclairage chaud derrière l'arche */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-10 bg-[radial-gradient(closest-side,rgba(197,168,128,0.28),rgba(197,168,128,0.08)_60%,transparent)]"
          />
          {/* Filet flottant décalé */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, x: -8, y: -8 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: LUXE, delay: 0.4 }}
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-[140px] rounded-b-[4px] border border-gold/40"
          />
          <ArchPortrait />
          {/* Reflet au sol, comme une vitrine */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-10 -bottom-12 h-16 bg-[radial-gradient(ellipse_at_center,rgba(197,168,128,0.35),transparent_70%)]"
          />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Eyebrow>Le Dr Nora</Eyebrow>
          <h2
            id="cabinet-title"
            className="mt-8 font-serif text-[clamp(2.6rem,5.4vw,5.4rem)] leading-[0.98] font-light tracking-[-0.02em] text-graphite"
          >
            <MaskLines
              inView
              lines={[
                "Une médecine, un cabinet,",
                <em key="a" className="text-gold-ink">
                  au cœur d&apos;Agadir Bay.
                </em>,
              ]}
            />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, ease: LUXE, delay: 0.2 }}
            className="mt-8 max-w-xl text-[16px] leading-[1.9] font-light text-taupe"
          >
            Médecin, le Dr Nora Leghzaoui a réuni dans un même cabinet la médecine laser, la médecine
            esthétique et la nutrition. Sa conviction : la beauté de la peau se travaille de
            l&apos;intérieur comme de l&apos;extérieur, avec rigueur et douceur.
          </motion.p>

          {SITE.credentials.length > 0 && (
            <ul className="mt-8 space-y-2.5">
              {SITE.credentials.map((c) => (
                <li key={c} className="flex items-start gap-3 text-[15px] text-taupe">
                  <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-gold" />
                  {c}
                </li>
              ))}
            </ul>
          )}

          <dl className="mt-14 grid grid-cols-3 border-y border-gold/25">
            {stats.slice(0, 3).map((s, i) => (
              <div key={s.label} className={`py-8 ${i > 0 ? "border-l border-gold/25 pl-5 sm:pl-8" : ""}`}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-serif text-[clamp(2.6rem,5vw,4.5rem)] leading-none font-light text-graphite">
                    <CountUp value={s.value} decimals={s.decimals} />
                    {s.suffix && <span className="text-[0.45em] text-gold-ink">{s.suffix}</span>}
                  </span>
                  <span className="mt-3 block text-[10px] font-medium uppercase tracking-[0.24em] text-gold-ink">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10">
            <Magnetic halo>
              <Link
                href="/cabinet"
                className="shimmer group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-obsidian px-9 text-[12px] font-medium uppercase tracking-[0.2em] text-bone transition-colors duration-700 hover:bg-graphite"
              >
                Découvrir le cabinet
                <ArrowIcon className="h-4 w-4 text-gold-light transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 text-[13px] leading-relaxed text-taupe transition-colors hover:text-graphite"
            >
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                {SITE.address.line1}, {SITE.address.line2}
                <br />
                {SITE.address.city} · <span className="underline-offset-4 group-hover:underline">Itinéraire</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-5%", "5%"]);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.6, ease: LUXE }}
      className="relative aspect-[4/5] overflow-hidden rounded-t-[140px] rounded-b-[4px] bg-bone-deep shadow-[0_50px_100px_-40px_rgba(138,111,72,0.55)]"
    >
      <motion.div style={{ y }} className="absolute -inset-y-[6%] inset-x-0 will-change-transform">
        <Image
          src={IMAGES.hero.src}
          alt={IMAGES.hero.alt}
          fill
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-cover"
        />
      </motion.div>
      {/* Lueur chaude venue du haut de l'arche */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gold/15 via-transparent to-transparent mix-blend-soft-light" />
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Briques de mouvement                                                       */
/* -------------------------------------------------------------------------- */

// Typographie cinétique : chaque ligne glisse vers le haut depuis un masque.
// Le déclencheur est le bloc parent (visible), pas les lignes masquées.
const maskParent = (delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: delay } },
});

const maskLine: Variants = {
  hidden: { y: "115%", rotate: 1.5 },
  show: { y: "0%", rotate: 0, transition: { duration: 1.4, ease: LUXE } },
};

function MaskLines({
  lines,
  delay = 0,
  inView = false,
}: {
  lines: React.ReactNode[];
  delay?: number;
  inView?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className="block"
      variants={maskParent(delay)}
      initial={reduce ? false : "hidden"}
      {...(inView
        ? { whileInView: "show", viewport: { once: true, margin: "-40px" } }
        : { animate: "show" })}
    >
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
          <motion.span variants={maskLine} className="block will-change-transform" style={{ transformOrigin: "0% 100%" }}>
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

// Compteur qui monte jusqu'à la valeur réelle à l'entrée dans l'écran.
function CountUp({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const fmt = (v: number) =>
    v.toLocaleString("fr-FR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    if (reduce) {
      el.textContent = fmt(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 2.4,
      ease: LUXE,
      onUpdate: (v) => {
        el.textContent = fmt(v);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  return (
    <span ref={ref} aria-label={fmt(value)}>
      {fmt(0)}
    </span>
  );
}

function Eyebrow({
  children,
  id,
  tone = "light",
}: {
  children: React.ReactNode;
  id?: string;
  tone?: "light" | "dark";
}) {
  return (
    <p
      id={id}
      className={`flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.32em] ${
        tone === "dark" ? "text-gold-light" : "text-gold-ink"
      }`}
    >
      <span aria-hidden className="block h-px w-10 bg-gold" />
      {children}
    </p>
  );
}

// Attraction « magnétique » + halo champagne qui pulse doucement.
// Désactivée sur écran tactile et si l'utilisateur réduit les animations.
function Magnetic({
  children,
  strength = 0.3,
  halo = false,
}: {
  children: React.ReactNode;
  strength?: number;
  halo?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 170, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 170, damping: 15, mass: 0.4 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className="relative inline-flex w-fit"
    >
      {halo && !reduce && (
        <>
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full border border-gold/60"
            animate={{ scale: [1, 1.22], opacity: [0.55, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full shadow-[0_0_36px_6px_rgba(197,168,128,0.35)]"
            animate={{ opacity: [0.25, 0.7, 0.25] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
      {children}
    </motion.div>
  );
}

// Vrai sur grand écran (après hydratation) : active la pile de cartes.
function useMediaQuery(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return match;
}
