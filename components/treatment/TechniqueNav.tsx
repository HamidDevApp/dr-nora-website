"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

type Item = { id: string; label: string };

// Navigation entre les techniques d'une page :
// - desktop : colonne latérale collante (sticky) avec indicateur animé ;
// - mobile : barre d'onglets horizontale collée sous l'en-tête.
// La technique visible à l'écran est suivie automatiquement (scroll-spy).
export function TechniqueNav({ items, title }: { items: Item[]; title: string }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Une section devient "active" quand elle traverse le tiers haut de l'écran.
      { rootMargin: "-25% 0px -65% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  // Garde l'onglet actif visible dans la barre mobile.
  useEffect(() => {
    document.getElementById(`chip-${active}`)?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [active]);

  return (
    <>
      {/* Mobile : onglets horizontaux */}
      <nav
        aria-label={title}
        className="sticky top-[72px] z-30 -mx-5 border-y border-line bg-ivory/90 backdrop-blur-md sm:-mx-8 lg:hidden"
      >
        <ul className="flex gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden">
          {items.map((item) => (
            <li key={item.id} className="shrink-0">
              <a
                id={`chip-${item.id}`}
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={`block rounded-full px-4 py-2 text-sm transition-colors ${
                  active === item.id ? "bg-ink text-ivory" : "bg-sand text-ink/75"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop : sommaire latéral collant */}
      <nav aria-label={title} className="sticky top-32 hidden lg:block">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne-700">{title}</p>
        <ul className="relative mt-6 border-l border-line">
          {items.map((item, i) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="technique-indicator"
                    className="absolute -left-px top-0 h-full w-0.5 bg-ink"
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                )}
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex items-baseline gap-3 py-3 pl-5 text-[15px] transition-colors ${
                    isActive ? "text-ink" : "text-stone hover:text-ink"
                  }`}
                >
                  <span className="font-serif text-sm text-champagne-700">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
