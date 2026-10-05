"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { SITE, whatsappUrl } from "@/lib/site";
import { SERVICE_CATEGORIES, type ServiceCategory } from "@/lib/services";
import { IMAGES, unsplash } from "@/lib/images";
import { EASE } from "@/lib/motion";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import { StarRating } from "@/components/ui/StarRating";
import { ArrowIcon, PinIcon, WhatsAppIcon } from "@/components/ui/icons";

/* -------------------------------------------------------------------------- */
/*  Médias                                                                     */
/* -------------------------------------------------------------------------- */

// Vidéo du Hero. Le navigateur essaie les sources dans l'ordre : déposer un
// fichier dans public/videos/hero.mp4 suffit pour qu'il passe en premier
// (recommandé : plus rapide et indépendant d'un CDN tiers). Sinon, B-roll
// gratuit Pexels. Si aucune vidéo ne charge, l'image `poster` reste affichée.
const HERO_VIDEO = {
  sources: [
    "/videos/hero.mp4",
    "https://videos.pexels.com/video-files/3997831/3997831-uhd_2560_1440_25fps.mp4",
    // Secours : soin du visage en cabinet (Mixkit, licence gratuite). Le lien
    // Pexels ci-dessus renvoie une erreur 403 hors de pexels.com.
    "https://assets.mixkit.co/videos/52153/52153-720.mp4",
  ],
  poster: unsplash("photo-1552693673-1bf958298935", 2000),
};

// Visuels des trois expertises : tons chauds et neutres, harmonisés par un
// léger filtre commun (voir WARM_TONE). Provisoires, comme dans lib/images.ts.
const DISCIPLINE_IMAGES: Record<ServiceCategory["id"], { src: string; alt: string }> = {
  laser: {
    src: unsplash("photo-1761718210089-ba3bb5ccb54f", 1800),
    alt: "Soin laser de rajeunissement du visage en cabinet",
  },
  esthetique: {
    src: unsplash("photo-1570172619644-dfd03ed5d881", 1800),
    alt: "Soin du visage en cabinet de médecine esthétique",
  },
  nutrition: {
    src: unsplash("photo-1675270882554-ab6817fb44f3", 1800),
    alt: "Consultation de nutrition autour d'une alimentation équilibrée",
  },
};

// Filtre commun : rapproche des photos d'origines différentes d'une même
// lumière chaude et douce.
const WARM_TONE = "[filter:sepia(0.14)_saturate(0.88)_contrast(1.02)_brightness(1.02)]";

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

const APPROACH =
  "Chaque visage a son histoire. Avant tout geste, un diagnostic médical. Puis des soins mesurés, choisis pour votre peau, pour un résultat qui vous ressemble.";

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

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

// Header, Footer et bouton WhatsApp sont communs à toutes les pages et vivent
// dans app/layout.tsx. Avis et formulaire de rendez-vous restent dans leurs
// composants (logique du formulaire inchangée).
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Approach />
      <Disciplines />
      <Doctor />
      <Reviews />
      <Contact />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero cinématique                                                           */
/* -------------------------------------------------------------------------- */

const HERO_LINES: { text: string; italic?: boolean }[] = [
  { text: "La médecine" },
  { text: "esthétique," },
  { text: "avec justesse.", italic: true },
];

function Hero() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // La vidéo s'éloigne doucement et le texte remonte au défilement.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);
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
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-obsidian text-alabaster"
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
          initial={reduce ? false : { scale: 1.12 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 3.2, ease: EASE }}
          className={`h-full w-full object-cover ${WARM_TONE}`}
        >
          {HERO_VIDEO.sources.map((src) => (
            <source key={src} src={src} type="video/mp4" />
          ))}
        </motion.video>
      </motion.div>

      {/* Voile : dégradé sombre + vignette dorée très discrète */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_80%,rgba(197,168,128,0.16),transparent_55%)]"
      />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="mx-auto w-full max-w-7xl px-5 pt-36 pb-24 sm:px-8 md:pb-28 lg:pb-32"
      >
        <div className="grid items-end gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.32em" }}
              transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
              className="flex items-center gap-4 text-[11px] font-medium uppercase text-gold-light"
            >
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
                className="block h-px w-10 origin-left bg-gold"
              />
              Cabinet médico-laser · Baie d&apos;Agadir
            </motion.p>

            {/* Révélation ligne par ligne, chaque ligne sort d'un masque */}
            <h1
              id="hero-title"
              className="mt-8 font-serif text-[3.1rem] leading-[0.98] font-normal tracking-[-0.02em] sm:text-7xl lg:text-[6.5rem]"
            >
              {HERO_LINES.map((line, i) => (
                <span key={line.text} className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    initial={reduce ? false : { y: "110%", rotate: 2 }}
                    animate={{ y: "0%", rotate: 0 }}
                    transition={{ duration: 1.3, ease: EASE, delay: 0.45 + i * 0.14 }}
                    className={`block origin-bottom-left ${line.italic ? "italic text-gold-light" : ""}`}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 1.05 }}
              className="mt-8 max-w-xl text-[16px] leading-[1.8] font-light text-alabaster/80 sm:text-[17px]"
            >
              Laser, injections et nutrition, réunis par le Dr Nora Leghzaoui dans un cabinet
              médical face à la baie. Un diagnostic d&apos;abord, puis des soins mesurés pour des
              résultats naturels.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 1.25 }}
              className="mt-11 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-9"
            >
              <Magnetic>
                <a
                  href="#contact"
                  className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full border border-gold/60 bg-white/[0.07] px-7 text-[12px] font-medium whitespace-nowrap uppercase tracking-[0.16em] sm:px-9 sm:text-[13px] sm:tracking-[0.2em] text-alabaster shadow-[0_0_0_0_rgba(212,185,150,0)] backdrop-blur-xl transition-[border-color,box-shadow,background-color] duration-700 hover:border-gold-light hover:bg-white/[0.12] hover:shadow-[0_0_40px_-6px_rgba(212,185,150,0.55)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
                >
                  {/* Reflet qui balaie le verre au survol */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-gold-light/25 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[320%]"
                  />
                  <span className="relative">Réserver une consultation</span>
                  <ArrowIcon className="relative h-4 w-4 text-gold-light transition-transform duration-500 group-hover:translate-x-1" />
                </a>
              </Magnetic>

              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 text-[14px] text-alabaster/80 transition-colors hover:text-alabaster"
              >
                <WhatsAppIcon className="h-4 w-4 text-gold-light" />
                <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                  Écrire sur WhatsApp
                </span>
              </a>
            </motion.div>
          </div>

          {/* Carte de verre : vraie photo du Dr Nora + note Google réelle */}
          <motion.a
            href="#avis"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 1.5 }}
            className="group hidden items-center gap-5 justify-self-end rounded-2xl border border-white/15 bg-white/[0.06] p-4 pr-6 backdrop-blur-xl transition-colors duration-500 hover:border-gold/50 lg:col-span-4 lg:flex"
          >
            <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-1 ring-gold/60 ring-offset-2 ring-offset-transparent">
              <Image
                src={IMAGES.aboutMedallion.src}
                alt={IMAGES.aboutMedallion.alt}
                fill
                sizes="64px"
                className="object-cover"
              />
            </span>
            <span>
              <span className="block font-serif text-xl leading-tight">{SITE.name}</span>
              <span className="mt-0.5 block text-[11px] uppercase tracking-[0.2em] text-alabaster/60">
                Médecin · Agadir Bay
              </span>
              <span className="mt-2 flex items-center gap-2 text-[13px] text-alabaster/80">
                <StarRating value={SITE.rating.value} className="h-3.5 w-3.5" />
                {SITE.rating.value.toLocaleString("fr-FR")} · {SITE.rating.count} avis
              </span>
            </span>
          </motion.a>
        </div>
      </motion.div>

      {/* Indicateur de défilement */}
      <motion.a
        href="#approche"
        aria-label="Défiler vers la suite"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-alabaster/60 md:flex"
      >
        Défiler
        <span className="relative block h-12 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-gold-light"
            animate={reduce ? undefined : { y: ["-100%", "200%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>

      {/* Pause de la vidéo (accessibilité : tout mouvement > 5 s doit pouvoir s'arrêter) */}
      <button
        type="button"
        onClick={toggleVideo}
        aria-label={playing ? "Mettre la vidéo en pause" : "Lire la vidéo"}
        className="absolute left-5 bottom-8 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-alabaster/70 backdrop-blur-md transition-colors hover:border-gold/60 hover:text-alabaster sm:left-8"
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

/* -------------------------------------------------------------------------- */
/*  Bandeau défilant des soins                                                 */
/* -------------------------------------------------------------------------- */

function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div aria-hidden className="relative overflow-hidden border-y border-gold/15 bg-obsidian py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-obsidian to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-obsidian to-transparent" />
      <div className="animate-marquee flex w-max items-center">
        {items.map((label, i) => (
          <span key={i} className="flex items-center">
            <span className="px-8 font-serif text-2xl italic text-alabaster/70">{label}</span>
            <span className="text-[10px] text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  L'approche : texte qui s'éclaire au fil du défilement                      */
/* -------------------------------------------------------------------------- */

function Approach() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = APPROACH.split(" ");

  return (
    <section id="approche" aria-labelledby="approche-title" className="bg-alabaster py-32 md:py-48">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Eyebrow id="approche-title">L&apos;approche</Eyebrow>
        <p
          ref={ref}
          className="mt-10 font-serif text-[2rem] leading-[1.25] tracking-[-0.01em] text-graphite sm:text-5xl md:text-[3.6rem]"
        >
          {words.map((word, i) => (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
              static={!!reduce}
            >
              {word}
            </Word>
          ))}
        </p>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.6, ease: EASE }}
          className="mt-16 h-px w-40 origin-left bg-gold"
        />
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
  static: isStatic,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  static: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity: isStatic ? 1 : opacity }} className="inline-block pr-[0.25em]">
      {children}
    </motion.span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Les trois expertises                                                       */
/* -------------------------------------------------------------------------- */

function Disciplines() {
  return (
    <section id="soins" aria-labelledby="soins-title" className="bg-cashmere py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <FadeIn className="lg:col-span-7">
            <Eyebrow>Expertises</Eyebrow>
            <h2
              id="soins-title"
              className="mt-6 font-serif text-[2.6rem] leading-[1.05] tracking-[-0.015em] text-graphite sm:text-6xl"
            >
              Trois disciplines, <em className="text-gold-deep">un même regard médical.</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="text-[15px] leading-[1.85] font-light text-stone">
              Tous les soins sont réalisés par le Dr Nora, après consultation. Aucun tarif
              n&apos;est affiché en ligne : il est défini en consultation médicale, selon votre
              peau et vos objectifs.
            </p>
          </FadeIn>
        </div>

        <div className="mt-20 space-y-24 md:mt-28 md:space-y-36">
          {SERVICE_CATEGORIES.map((c, i) => (
            <DisciplineRow key={c.id} category={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DisciplineRow({ category, index }: { category: ServiceCategory; index: number }) {
  const flipped = index % 2 === 1;
  const image = DISCIPLINE_IMAGES[category.id];

  return (
    <article className="relative grid items-center lg:grid-cols-12">
      <div className={`relative lg:col-span-8 lg:row-start-1 ${flipped ? "lg:col-start-5" : ""}`}>
        <ParallaxImage
          src={image.src}
          alt={image.alt}
          sizes="(min-width: 1024px) 62vw, 92vw"
          className="aspect-[4/3] rounded-[2px] lg:aspect-[16/10]"
        />
        <span
          aria-hidden
          className={`pointer-events-none absolute -top-10 font-serif text-[7rem] leading-none italic text-gold-light/90 mix-blend-multiply sm:text-[9rem] ${
            flipped ? "right-4 lg:-right-6" : "left-4 lg:-left-8"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Carte de verre qui chevauche l'image */}
      <FadeIn
        delay={0.15}
        className={`relative z-10 -mt-16 mx-3 sm:mx-10 lg:row-start-1 lg:mx-0 lg:mt-0 lg:col-span-5 ${
          flipped ? "lg:col-start-1" : "lg:col-start-8"
        }`}
      >
        <div className="group border border-gold/30 bg-alabaster/90 p-8 shadow-[0_40px_90px_-45px_rgba(18,18,18,0.45)] backdrop-blur-xl transition-[transform,box-shadow] duration-700 ease-out hover:-translate-y-1 hover:shadow-[0_50px_110px_-45px_rgba(18,18,18,0.55)] sm:p-11">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-champagne-700">
            {category.shortLabel}
          </p>
          <h3 className="mt-4 font-serif text-4xl leading-tight text-graphite">{category.label}</h3>
          <p className="mt-4 text-[15px] leading-[1.8] font-light text-stone">{category.intro}</p>

          <ul className="mt-8 divide-y divide-line border-y border-line">
            {category.services.map((s) => (
              <li key={s.title}>
                <a
                  href={whatsappUrl(`Bonjour Dr Nora, je souhaite un devis pour : ${s.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/item flex items-baseline justify-between gap-4 py-3.5 text-[14px] text-graphite transition-colors hover:text-gold-deep"
                >
                  <span className="transition-transform duration-500 group-hover/item:translate-x-1">
                    {s.title}
                  </span>
                  <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-stone/80">
                    Sur devis
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <Link
            href={`/${category.id}`}
            className="group/link mt-8 inline-flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.18em] text-graphite"
          >
            <span className="bg-[linear-gradient(var(--color-gold),var(--color-gold))] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover/link:bg-[length:0%_1px]">
              Découvrir la page {category.shortLabel}
            </span>
            <ArrowIcon className="h-3.5 w-3.5 text-gold-deep transition-transform duration-500 group-hover/link:translate-x-1.5" />
          </Link>
        </div>
      </FadeIn>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Le Dr Nora                                                                 */
/* -------------------------------------------------------------------------- */

function Doctor() {
  const stats = [
    { value: SITE.rating.value.toLocaleString("fr-FR"), label: "Note Google sur 5" },
    { value: String(SITE.rating.count), label: "Avis patients" },
    { value: "3", label: "Expertises réunies" },
  ];

  return (
    <section
      id="cabinet"
      aria-labelledby="cabinet-title"
      className="relative overflow-hidden bg-obsidian py-28 text-alabaster md:py-40"
    >
      {/* Halo doré, à peine perceptible */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 h-[40rem] w-[40rem] rounded-full bg-gold/10 blur-[140px]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-20 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        {/* Portrait : arche asymétrique, filet champagne décalé, ombre ambrée */}
        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <motion.div
            aria-hidden
            initial={{ opacity: 0, x: -12, y: -12 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.4 }}
            className="absolute inset-0 translate-x-5 translate-y-5 rounded-t-[999px] rounded-br-[3rem] border border-gold/50"
          />
          <ParallaxImage
            src={IMAGES.hero.src}
            alt={IMAGES.hero.alt}
            sizes="(min-width: 1024px) 40vw, 90vw"
            strength={6}
            className="aspect-[4/5] rounded-t-[999px] rounded-br-[3rem] shadow-[0_50px_120px_-40px_rgba(197,168,128,0.35)]"
          />
          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE, delay: 0.6 }}
            className="absolute -bottom-8 -right-2 border border-gold/30 bg-obsidian-soft/90 px-6 py-4 backdrop-blur-md sm:-right-8"
          >
            <figcaption>
              <span className="block font-serif text-xl">{SITE.name}</span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.25em] text-gold-light">
                Médecin · Agadir Bay
              </span>
            </figcaption>
          </motion.figure>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <FadeIn>
            <Eyebrow tone="dark">Le Dr Nora</Eyebrow>
            <h2
              id="cabinet-title"
              className="mt-6 font-serif text-[2.6rem] leading-[1.05] tracking-[-0.015em] sm:text-6xl"
            >
              Une médecine, un cabinet,{" "}
              <em className="text-gold-light">au cœur d&apos;Agadir Bay.</em>
            </h2>
            <p className="mt-7 max-w-xl text-[16px] leading-[1.85] font-light text-alabaster/70">
              Médecin, le Dr Nora Leghzaoui a réuni dans un même cabinet la médecine laser, la
              médecine esthétique et la nutrition. Sa conviction : la beauté de la peau se travaille
              de l&apos;intérieur comme de l&apos;extérieur, avec rigueur et douceur.
            </p>
          </FadeIn>

          <dl className="mt-14 grid grid-cols-3 border-y border-white/10">
            {stats.map((s, i) => (
              <FadeIn
                key={s.label}
                delay={0.08 * i}
                className={`py-7 ${i > 0 ? "border-l border-white/10 pl-5 sm:pl-8" : ""}`}
              >
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-serif text-5xl leading-none text-gold-light sm:text-6xl">
                    {s.value}
                  </span>
                  <span className="mt-3 block text-[11px] uppercase tracking-[0.18em] text-alabaster/55">
                    {s.label}
                  </span>
                </dd>
              </FadeIn>
            ))}
          </dl>

          {SITE.credentials.length > 0 && (
            <FadeIn delay={0.1}>
              <ul className="mt-10 space-y-2.5">
                {SITE.credentials.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-[15px] text-alabaster/80">
                    <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-gold" />
                    {c}
                  </li>
                ))}
              </ul>
            </FadeIn>
          )}

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {PILLARS.map((p, i) => (
              <FadeIn key={p.title} delay={0.1 + 0.08 * i}>
                <h3 className="font-serif text-xl text-alabaster">{p.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.75] font-light text-alabaster/60">{p.text}</p>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2} className="mt-14 flex flex-col gap-7 sm:flex-row sm:items-center sm:gap-10">
            <Magnetic>
              <Link
                href="/cabinet"
                className="group inline-flex h-14 items-center gap-3 rounded-full border border-gold/60 px-9 text-[12px] font-medium uppercase tracking-[0.2em] text-alabaster transition-[background-color,box-shadow,color] duration-700 hover:bg-gold hover:text-obsidian hover:shadow-[0_0_40px_-8px_rgba(212,185,150,0.6)]"
              >
                Découvrir le cabinet
                <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 text-[13px] leading-relaxed text-alabaster/60 transition-colors hover:text-alabaster"
            >
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" />
              <span>
                {SITE.address.line1}, {SITE.address.line2}
                <br />
                {SITE.address.city} · <span className="underline-offset-4 group-hover:underline">Itinéraire</span>
              </span>
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Petites briques de mouvement                                               */
/* -------------------------------------------------------------------------- */

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
        tone === "dark" ? "text-gold-light" : "text-champagne-700"
      }`}
    >
      <span aria-hidden className="block h-px w-10 bg-gold" />
      {children}
    </p>
  );
}

// Fondu d'opacité très doux, une seule fois à l'entrée dans l'écran.
function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

// Image révélée par un rideau (clip-path), puis en léger parallaxe au défilement.
function ParallaxImage({
  src,
  alt,
  sizes,
  className = "",
  strength = 10,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : [`-${strength}%`, `${strength}%`]
  );

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.5, ease: EASE }}
      className={`relative overflow-hidden bg-cashmere ${className}`}
    >
      <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0">
        <motion.div
          initial={reduce ? false : { scale: 1.18 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, ease: EASE }}
          className="relative h-full w-full"
        >
          <Image src={src} alt={alt} fill sizes={sizes} className={`object-cover ${WARM_TONE}`} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Attraction « magnétique » : l'élément suit légèrement le curseur.
// Désactivée sur écran tactile et si l'utilisateur réduit les animations.
function Magnetic({ children, strength = 0.28 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });

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
      className="inline-flex w-fit"
    >
      {children}
    </motion.div>
  );
}
