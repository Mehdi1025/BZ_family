"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.2, 0.8, 0.2, 1] as const;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  /** Décalage vertical initial, en pixels */
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}

/** Apparition au défilement — courte, retenue, coupée si l'utilisateur
 *  a demandé moins d'animation. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Comp = motion[as];

  return (
    <Comp
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}
