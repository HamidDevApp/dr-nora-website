"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE } from "@/lib/motion";

export type AccordionItem = { q: string; a: string };

// Accordéon accessible (bouton + région liée), ouverture animée en hauteur.
// Plusieurs panneaux peuvent rester ouverts en même temps.
export function Accordion({
  items,
  tone = "light",
  defaultOpen = -1,
}: {
  items: AccordionItem[];
  tone?: "light" | "dark";
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState<Set<number>>(() => new Set(defaultOpen >= 0 ? [defaultOpen] : []));
  const base = useId();
  const dark = tone === "dark";

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className={`divide-y border-y ${dark ? "divide-ivory/15 border-ivory/15" : "divide-line border-line"}`}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const btnId = `${base}-b${i}`;
        const panelId = `${base}-p${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className={`flex w-full items-center justify-between gap-6 py-5 text-left text-[16px] font-medium transition-colors ${
                  dark ? "text-ivory hover:text-ivory/80" : "text-ink hover:text-sage-600"
                }`}
              >
                {item.q}
                <span
                  aria-hidden
                  className={`relative h-4 w-4 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                >
                  <span className={`absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 ${dark ? "bg-ivory" : "bg-ink"}`} />
                  <span className={`absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 ${dark ? "bg-ivory" : "bg-ink"}`} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className={`max-w-3xl pb-6 text-[15px] leading-relaxed ${dark ? "text-ivory/75" : "text-stone"}`}>
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
