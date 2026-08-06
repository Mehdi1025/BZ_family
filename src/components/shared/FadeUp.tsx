"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { TextReveal } from "@/components/shared/TextReveal";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

export function FadeUp({
  children,
  delay = 0,
  className,
  y = 40,
}: FadeUpProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface SectionIntroProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
}

export function SectionIntro({
  label,
  title,
  description,
  align = "left",
  theme = "light",
}: SectionIntroProps) {
  const isLight = theme === "light";

  return (
    <div
      className={
        align === "center"
          ? "mx-auto mb-16 max-w-3xl text-center lg:mb-24"
          : "mb-16 max-w-4xl lg:mb-24"
      }
    >
      <FadeUp>
        <p
          className={cn(
            "kicker mb-6",
            isLight && "[&::before]:from-primary [&::before]:to-primary/20"
          )}
        >
          {label}
        </p>
      </FadeUp>
      <TextReveal
        as="h2"
        text={title}
        className={cn(
          "font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight",
          isLight ? "text-gradient-dark" : "text-gradient"
        )}
        delay={0.1}
      />
      {description && (
        <FadeUp delay={0.3}>
          <p
            className={cn(
              "mt-6 text-lg leading-relaxed",
              isLight ? "text-muted-foreground" : "text-zinc-400"
            )}
          >
            {description}
          </p>
        </FadeUp>
      )}
    </div>
  );
}
