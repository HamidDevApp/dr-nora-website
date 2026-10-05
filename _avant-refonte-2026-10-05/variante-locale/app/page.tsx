"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { SITE, whatsappUrl } from "@/lib/site";
import { SERVICE_CATEGORIES } from "@/lib/services";
import { IMAGES } from "@/lib/images";
import { EASE } from "@/lib/motion";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import { StarRating } from "@/components/ui/StarRating";
import { ArrowIcon, PinIcon, WhatsAppIcon } from "@/components/ui/icons";

// Page d'accueil « signature » : hero vidéo cinématique, trois disciplines en
// mise en page éditoriale, portrait du Dr Nora, avis et prise de rendez-vous.
// Header, Footer et bouton WhatsApp vivent dans app/layout.tsx.

const TREATMENT_IMAGES = IMAGES.services;
const TREATMENT_HREF = { laser: "/laser", esthetique: "/esthetique", nutrition: "/nutrition" } as const;

const TICKER = [
  "Épilation laser",
  "Taches pigmentaires",
  "Acide hyaluronique",
  "Skinboosters",
  "Photoréjuvénation",
  "Peelings médicaux",
  "Bilan nutritionnel",
  "Micronutrition",
];

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Approach />
      <Treatments />
      <SerumBand />
      <Doctor />
      <Reviews />
      <Contact />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Petits outils de mouvement                                          */
/* ------------------------------------------------------------------ */

// Bouton « magnétique » : suit légèrement le curseur, revient en douceur.
function Magnetic({ children, strength = 0.25 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className="inline-block"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

// Titre révélé ligne par ligne (chaque ligne glisse hors d'un masque).
function RevealLines({
  lines,
  className,
  delay = 0,
  inView = false,
}: {
  lines: React.ReactNode[];
  className?: string;
  delay?: number;
  inView?: boolean;
}) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            {...(inView
              ? { whileInView: { y: "0%" }, viewport: { once: true, margin: "-60px" } }
              : { animate: { y: "0%" } })}
            transition={{ duration: 1.2, ease: EASE, delay: delay + i * 0.12 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Image qui se dévoile (rideau) puis glisse en parallaxe au défilement.
function ParallaxImage({
  src,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  intensity = 60,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  intensity?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-intensity, intensity]);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: "inset(12% 8% 12% 8%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.4, ease: EASE }}
    >
      <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="photo-warm object-cover" />
      </motion.div>
    </motion.div>
  );
}

function Eyebrow({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <p
      className={`flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.32em] ${
        tone === "dark" ? "text-champagne-light" : "text-champagne-700"
      }`}
    >
      <span className={`h-px w-10 ${tone === "dark" ? "bg-champagne-light/60" : "bg-champagne"}`} />
      {children}
    </p>
  );
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 1, ease: EASE, delay },
});

/* ------------------------------------------------------------------ */
/* 1. Hero vidéo                                                        */
/* ------------------------------------------------------------------ */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      aria-label="Présentation du cabinet"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-obsidian text-alabaster"
    >
      {/* Vidéo d'ambiance */}
      <motion.div style={{ y: videoY, scale: videoScale }} className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={IMAGES.heroVideo.poster}
          aria-hidden
        >
          <source src={IMAGES.heroVideo.src} type="video/mp4" media="(min-width: 1024px)" />
          <source src={IMAGES.heroVideo.fallback} type="video/mp4" />
        </video>
      </motion.div>

      {/* Voiles : dégradé principal + vignette chaude */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,transparent_0%,rgba(18,18,18,0.55)_75%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-obsidian to-transparent" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto w-full max-w-7xl px-5 pt-40 pb-20 sm:px-8 md:pb-28"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <Eyebrow tone="dark">Médecine esthétique · Baie d&apos;Agadir</Eyebrow>
        </motion.div>

        <h1 className="mt-8 max-w-5xl font-serif text-[clamp(3rem,8.5vw,8rem)] leading-[0.95] font-normal tracking-[-0.01em]">
          <RevealLines
            delay={0.35}
            lines={[
              "La beauté,",
              <>
                <em className="font-light text-champagne-light">avec justesse</em> et
              </>,
              "précision médicale.",
            ]}
          />
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.95 }}
            className="max-w-md text-[15px] leading-relaxed text-alabaster/75 md:col-span-5"
          >
            Laser, injections et nutrition, réunis par le Dr Nora Leghzaoui dans un cabinet médical
            face à la baie. Un diagnostic d&apos;abord, puis des soins mesurés pour des résultats naturels.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 1.1 }}
            className="flex flex-wrap items-center gap-4 md:col-span-7 md:justify-end"
          >
            <Magnetic>
              <Link
                href="/#contact"
                className="group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full border border-champagne-light/70 bg-white/[0.08] px-8 text-[13px] font-medium uppercase tracking-[0.2em] text-alabaster shadow-[0_0_0_rgba(212,185,150,0)] backdrop-blur-xl transition-[box-shadow,border-color,background-color] duration-500 hover:border-champagne-light hover:bg-white/[0.14] hover:shadow-[0_0_40px_rgba(212,185,150,0.35)]"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-champagne-light/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                Réserver une consultation
                <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-2.5 rounded-full px-5 text-[13px] font-medium uppercase tracking-[0.2em] text-alabaster/80 transition-colors hover:text-alabaster"
            >
              <WhatsAppIcon className="h-4 w-4 text-champagne-light" />
              WhatsApp
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-alabaster/15 pt-6 text-[12px] tracking-[0.18em] text-alabaster/60 uppercase"
        >
          <span className="flex items-center gap-3">
            <StarRating value={SITE.rating.value} className="h-3.5 w-3.5" />
            <span>
              {SITE.rating.value.toLocaleString("fr-FR")} · {SITE.rating.count} avis Google
            </span>
          </span>
          <span className="flex items-center gap-2">
            <PinIcon className="h-4 w-4 text-champagne-light" />
            {SITE.address.line2}, {SITE.address.city.replace(/\s*\d+/, "")}
          </span>
          <span className="hidden items-center gap-3 md:flex">
            Défiler
            <span className="relative block h-10 w-px overflow-hidden bg-alabaster/20">
              <motion.span
                className="absolute inset-x-0 top-0 h-1/2 bg-champagne-light"
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Bandeau défilant des soins                                        */
/* ------------------------------------------------------------------ */

function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="overflow-hidden border-y border-champagne/20 bg-obsidian py-6 text-alabaster/70" aria-hidden>
      <div className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-12 font-serif text-2xl italic">
            {t}
            <span className="h-1 w-1 rotate-45 bg-champagne" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. L'approche                                                        */
/* ------------------------------------------------------------------ */

function Approach() {
  return (
    <section aria-labelledby="approche-title" className="bg-alabaster py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <motion.div {...fade()}>
            <Eyebrow>L&apos;approche</Eyebrow>
          </motion.div>
          <h2
            id="approche-title"
            className="mt-8 font-serif text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1.05] font-normal text-graphite"
          >
            <RevealLines
              inView
              lines={[
                "Chaque visage a son histoire.",
                <>
                  Avant tout geste, <em className="text-champagne-700">un regard</em>
                </>,
                <>
                  <em className="text-champagne-700">médical.</em>
                </>,
              ]}
            />
          </h2>
          <motion.p {...fade(0.2)} className="mt-10 max-w-xl text-[16px] leading-[1.9] text-graphite/75">
            Un diagnostic de votre peau, de votre histoire et de vos attentes. Puis des soins choisis pour
            vous, dosés avec retenue : l&apos;objectif n&apos;est pas de transformer, mais de révéler un
            résultat qui vous ressemble.
          </motion.p>

          <motion.dl {...fade(0.3)} className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-champagne/30 pt-8">
            {[
              { k: "01", v: "Consultation & diagnostic" },
              { k: "02", v: "Protocole sur mesure" },
              { k: "03", v: "Suivi dans la durée" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="font-serif text-3xl text-champagne">{s.k}</dt>
                <dd className="mt-2 text-[13px] leading-snug text-graphite/70">{s.v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="relative lg:col-span-5">
          <ParallaxImage
            src={IMAGES.ritual.src}
            alt={IMAGES.ritual.alt}
            className="aspect-[4/5] rounded-t-[240px] rounded-b-sm shadow-[0_40px_80px_-30px_rgba(43,43,42,0.35)]"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <div className="pointer-events-none absolute -bottom-6 -left-6 hidden h-40 w-40 border-b border-l border-champagne/60 lg:block" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Trois disciplines                                                 */
/* ------------------------------------------------------------------ */

function Treatments() {
  return (
    <section id="soins" aria-labelledby="soins-title" className="bg-cashmere py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <motion.div {...fade()}>
              <Eyebrow>Expertises</Eyebrow>
            </motion.div>
            <h2
              id="soins-title"
              className="mt-8 font-serif text-[clamp(2.4rem,5vw,4.8rem)] leading-[1.02] font-normal text-graphite"
            >
              <RevealLines
                inView
                lines={[
                  "Trois disciplines,",
                  <>
                    <em className="text-champagne-700">un même regard.</em>
                  </>,
                ]}
              />
            </h2>
          </div>
          <motion.p {...fade(0.2)} className="max-w-sm text-[15px] leading-relaxed text-graphite/70 lg:col-span-4">
            Tous les soins sont réalisés par le Dr Nora, après consultation. Aucun tarif affiché : il est
            défini après examen, selon votre peau et vos objectifs.
          </motion.p>
        </div>

        <div className="mt-24 space-y-28 md:space-y-40">
          {SERVICE_CATEGORIES.map((cat, i) => {
            const img = TREATMENT_IMAGES[cat.id];
            const reversed = i % 2 === 1;
            return (
              <article key={cat.id} className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
                <div className={`relative lg:col-span-7 ${reversed ? "lg:order-2" : ""}`}>
                  <Link href={TREATMENT_HREF[cat.id]} className="group block" aria-label={`Découvrir : ${cat.label}`}>
                    <ParallaxImage
                      src={img.src}
                      alt={img.alt}
                      className="aspect-[5/4] rounded-sm shadow-[0_50px_90px_-40px_rgba(43,43,42,0.45)] transition-transform duration-700 group-hover:scale-[0.985]"
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      intensity={50}
                    />
                  </Link>
                  <span
                    className={`pointer-events-none absolute -top-12 font-serif text-[clamp(5rem,11vw,10rem)] leading-none font-light text-champagne/50 ${
                      reversed ? "-right-2 lg:-right-8" : "-left-2 lg:-left-8"
                    }`}
                    aria-hidden
                  >
                    0{i + 1}
                  </span>
                </div>

                <div className={`lg:col-span-5 ${reversed ? "lg:order-1" : ""}`}>
                  <motion.p {...fade()} className="text-[11px] font-medium uppercase tracking-[0.32em] text-champagne-700">
                    {cat.shortLabel}
                  </motion.p>
                  <motion.h3 {...fade(0.08)} className="mt-4 font-serif text-[clamp(2rem,3.4vw,3.2rem)] leading-tight text-graphite">
                    {cat.label}
                  </motion.h3>
                  <motion.p {...fade(0.16)} className="mt-5 text-[15px] leading-relaxed text-graphite/70">
                    {cat.intro}
                  </motion.p>

                  <motion.ul {...fade(0.24)} className="mt-8 border-t border-champagne/30">
                    {cat.services.map((s) => (
                      <li
                        key={s.title}
                        className="group/item flex items-baseline justify-between gap-6 border-b border-champagne/30 py-4"
                      >
                        <span className="font-serif text-xl text-graphite transition-transform duration-500 group-hover/item:translate-x-2">
                          {s.title}
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.2em] text-graphite/40">Sur devis</span>
                      </li>
                    ))}
                  </motion.ul>

                  <motion.div {...fade(0.32)} className="mt-10">
                    <Magnetic strength={0.2}>
                      <Link
                        href={TREATMENT_HREF[cat.id]}
                        className="group inline-flex items-center gap-4 text-[12px] font-medium uppercase tracking-[0.24em] text-graphite"
                      >
                        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-champagne transition-all duration-500 group-hover:bg-obsidian group-hover:text-champagne-light group-hover:shadow-[0_0_30px_rgba(197,168,128,0.4)]">
                          <ArrowIcon className="h-4 w-4" />
                        </span>
                        Découvrir la page {cat.shortLabel}
                      </Link>
                    </Magnetic>
                  </motion.div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Bandeau sombre cinématique                                        */
/* ------------------------------------------------------------------ */

function SerumBand() {
  return (
    <section aria-label="Notre philosophie" className="grain relative overflow-hidden bg-obsidian text-alabaster">
      <div className="absolute inset-0 opacity-60">
        <ParallaxImage src={IMAGES.serum.src} alt="" className="h-full w-full" sizes="100vw" intensity={80} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-obsidian/20" />
      <div className="relative mx-auto max-w-7xl px-5 py-32 sm:px-8 md:py-48">
        <motion.div {...fade()}>
          <Eyebrow tone="dark">Notre philosophie</Eyebrow>
        </motion.div>
        <blockquote className="mt-10 max-w-3xl font-serif text-[clamp(2rem,4.4vw,4rem)] leading-[1.1] font-light">
          <RevealLines
            inView
            lines={[
              "« Le plus beau résultat",
              <>
                est celui que <em className="text-champagne-light">l&apos;on ne remarque pas</em>,
              </>,
              "mais que l'on ressent. »",
            ]}
          />
        </blockquote>
        <motion.p {...fade(0.3)} className="mt-10 text-[12px] uppercase tracking-[0.3em] text-alabaster/60">
          Dr Nora Leghzaoui
        </motion.p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Le Dr Nora                                                        */
/* ------------------------------------------------------------------ */

function Doctor() {
  return (
    <section aria-labelledby="docteur-title" className="overflow-hidden bg-alabaster py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-20 px-5 sm:px-8 lg:grid-cols-12 lg:items-center">
        {/* Portrait : arche asymétrique, filet champagne décalé, ombre ambiante */}
        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, x: -20, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
            className="pointer-events-none absolute inset-0 translate-x-5 translate-y-5 rounded-t-[999px] rounded-br-[120px] border border-champagne"
            aria-hidden
          />
          <ParallaxImage
            src={IMAGES.hero.src}
            alt={IMAGES.hero.alt}
            className="aspect-[4/5] rounded-t-[999px] rounded-br-[120px] shadow-[0_60px_120px_-40px_rgba(138,111,76,0.55)]"
            sizes="(min-width: 1024px) 40vw, 90vw"
            intensity={30}
          />
          <motion.div
            {...fade(0.5)}
            className="absolute -bottom-8 -left-4 rounded-sm border border-champagne/40 bg-alabaster/90 px-6 py-5 shadow-[0_20px_50px_-20px_rgba(43,43,42,0.3)] backdrop-blur-md sm:-left-10"
          >
            <p className="font-serif text-2xl text-graphite">Dr Nora Leghzaoui</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-champagne-700">Médecin · Agadir</p>
          </motion.div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <motion.div {...fade()}>
            <Eyebrow>Le Dr Nora</Eyebrow>
          </motion.div>
          <h2
            id="docteur-title"
            className="mt-8 font-serif text-[clamp(2.4rem,4.8vw,4.4rem)] leading-[1.04] font-normal text-graphite"
          >
            <RevealLines
              inView
              lines={[
                "Une médecin, un cabinet,",
                <>
                  <em className="text-champagne-700">au cœur d&apos;Agadir Bay.</em>
                </>,
              ]}
            />
          </h2>
          <motion.p {...fade(0.2)} className="mt-8 max-w-lg text-[16px] leading-[1.9] text-graphite/75">
            Médecin, le Dr Nora Leghzaoui a réuni dans un même cabinet la médecine laser, la médecine
            esthétique et la nutrition. Sa conviction : la beauté de la peau se travaille de
            l&apos;intérieur comme de l&apos;extérieur, avec rigueur et douceur.
          </motion.p>

          <motion.dl {...fade(0.3)} className="mt-12 grid grid-cols-3 gap-6 border-y border-champagne/30 py-8">
            <div>
              <dt className="sr-only">Note Google</dt>
              <dd className="font-serif text-5xl text-graphite">{SITE.rating.value.toLocaleString("fr-FR")}</dd>
              <dd className="mt-2 text-[12px] text-graphite/60">Note Google sur 5</dd>
            </div>
            <div>
              <dt className="sr-only">Avis</dt>
              <dd className="font-serif text-5xl text-graphite">{SITE.rating.count}</dd>
              <dd className="mt-2 text-[12px] text-graphite/60">Avis patients</dd>
            </div>
            <div>
              <dt className="sr-only">Expertises</dt>
              <dd className="font-serif text-5xl text-graphite">3</dd>
              <dd className="mt-2 text-[12px] text-graphite/60">Expertises réunies</dd>
            </div>
          </motion.dl>

          <motion.div {...fade(0.4)} className="mt-12 flex flex-wrap items-center gap-6">
            <Magnetic>
              <Link
                href="/cabinet"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-obsidian px-8 text-[12px] font-medium uppercase tracking-[0.22em] text-alabaster transition-shadow duration-500 hover:shadow-[0_0_40px_rgba(197,168,128,0.45)]"
              >
                Découvrir le cabinet
                <ArrowIcon className="h-4 w-4 text-champagne-light transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] text-graphite/70 underline-offset-4 hover:text-graphite hover:underline"
            >
              <PinIcon className="h-4 w-4 text-champagne" />
              {SITE.address.line1}, {SITE.address.line2}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
