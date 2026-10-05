"use client";

import { MotionConfig } from "motion/react";

// Coupe automatiquement les animations pour les visiteurs qui ont activé
// "réduire les animations" dans leur système.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
