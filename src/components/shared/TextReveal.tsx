"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p" | "span";
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  as = "span",
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const Comp = motion[as];

  if (reduced) {
    const Static = as;
    return <Static className={className}>{text}</Static>;
  }

  return (
    <Comp className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.04,
              ease: EASE,
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}
