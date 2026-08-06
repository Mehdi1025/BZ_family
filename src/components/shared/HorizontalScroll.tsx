"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  /** Hauteur de scroll en multiples de 100vh */
  scrollHeight?: number;
}

export function HorizontalScroll({
  children,
  className = "",
  scrollHeight = 2.5,
}: HorizontalScrollProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  if (reduced) {
    return (
      <section className={`overflow-x-auto ${className}`}>
        <div className="flex gap-6 px-5 sm:px-8 lg:px-12">{children}</div>
      </section>
    );
  }

  return (
    <div
      ref={targetRef}
      className="relative"
      style={{ height: `${scrollHeight * 100}vh` }}
    >
      <div className={`sticky top-0 flex h-screen items-center overflow-hidden ${className}`}>
        <motion.div style={{ x }} className="flex will-change-transform">
          {children}
        </motion.div>
      </div>
    </div>
  );
}
