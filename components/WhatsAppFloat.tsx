"use client";

import { motion } from "motion/react";
import { whatsappUrl } from "@/lib/site";
import { EASE } from "@/lib/motion";
import { WhatsAppIcon } from "@/components/ui/icons";

// Pastille WhatsApp discrète en bas à droite (encre + icône ivoire, pas le
// vert WhatsApp criard). Apparaît après un court délai pour ne pas gêner le Hero.
export default function WhatsAppFloat() {
  return (
    <motion.a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Réserver via WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE, delay: 1.2 }}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-ivory ring-1 ring-ivory/30 shadow-[0_12px_30px_-10px_rgba(31,42,46,0.6)] transition-transform hover:scale-105"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </motion.a>
  );
}
