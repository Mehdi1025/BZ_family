"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { actionPillars } from "@/lib/data/mock";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

function PillarImage({
  pillar,
  index,
  scrollYProgress,
}: {
  pillar: (typeof actionPillars)[number];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const count = actionPillars.length;
  const step = 1 / count;

  const opacity = useTransform(scrollYProgress, (v) => {
    const start = index * step;
    const end = start + step;
    const fade = step * 0.35;
    if (v < start) return 0;
    if (v > end) return 0;
    if (v < start + fade) return (v - start) / fade;
    if (v > end - fade) return (end - v) / fade;
    return 1;
  });

  const scale = useTransform(scrollYProgress, (v) => {
    const start = index * step;
    const mid = start + step / 2;
    const dist = Math.abs(v - mid) / (step / 2);
    return 1 + dist * 0.06;
  });

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      style={{ opacity, scale }}
    >
      <Image
        src={pillar.image}
        alt={pillar.title}
        fill
        sizes="60vw"
        className="object-cover"
        priority={index === 0}
      />
      <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-encre/40 via-transparent to-transparent" />
      <div className="absolute bottom-12 right-12">
        <span className="font-display text-[clamp(5rem,14vw,11rem)] font-bold leading-none text-white/10">
          0{index + 1}
        </span>
      </div>
    </motion.div>
  );
}

function MobilePillars() {
  const [expanded, setExpanded] = useState(0);

  return (
    <section className="bg-white py-20 lg:hidden">
      <div className="container-bz mb-10">
        <p className="kicker">01 · Nos piliers</p>
        <h2 className="mt-5 font-display text-3xl font-bold text-encre">
          Trois actions, un seul objectif
        </h2>
      </div>

      <div className="flex flex-col gap-1 px-3">
        {actionPillars.map((pillar, i) => {
          const isOpen = expanded === i;
          return (
            <button
              key={pillar.id}
              type="button"
              onClick={() => setExpanded(i)}
              className={cn(
                "group relative overflow-hidden rounded-sm text-left transition-[height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isOpen ? "h-[420px]" : "h-20"
              )}
            >
              <Image
                src={pillar.image}
                alt={pillar.title}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-encre/55 transition-colors duration-500 group-hover:bg-encre/45" />

              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                      0{i + 1} · {pillar.label}
                    </span>
                    <h3 className="font-display text-xl font-bold text-white">
                      {pillar.title}
                    </h3>
                  </div>
                  <ArrowUpRight
                    className={cn(
                      "h-5 w-5 shrink-0 text-white transition-transform duration-500",
                      isOpen && "rotate-90"
                    )}
                  />
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-sm leading-relaxed text-white/75">
                        {pillar.description}
                      </p>
                      <p className="mt-3 text-xs font-medium text-accent-300">
                        {pillar.metric}
                      </p>
                      <Link
                        href={`/nos-actions#${pillar.slug}`}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        En savoir plus
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
          );
        })}
      </div>

      <div className="container-bz mt-8">
        <Link
          href="/nos-actions"
          className="text-sm font-semibold text-primary hover:underline"
        >
          Voir toutes nos actions →
        </Link>
      </div>
    </section>
  );
}

export function Actions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      actionPillars.length - 1,
      Math.max(0, Math.floor(v * actionPillars.length))
    );
    setActive(idx);
  });

  const current = actionPillars[active];
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (reduced) {
    return (
      <section className="bg-white py-24">
        <div className="container-bz space-y-12">
          <div>
            <p className="kicker">01 · Nos piliers</p>
            <h2 className="mt-5 font-display text-4xl font-bold">Trois actions, un seul objectif</h2>
          </div>
          {actionPillars.map((pillar) => (
            <Link key={pillar.id} href={`/nos-actions#${pillar.slug}`} className="grid gap-6 border-t border-line pt-8 lg:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image src={pillar.image} alt={pillar.title} fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold">{pillar.title}</h3>
                <p className="mt-2 text-muted-foreground">{pillar.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      <MobilePillars />

      <section
        ref={containerRef}
        className="relative hidden bg-white lg:block"
        style={{ height: "320vh" }}
      >
        <div className="sticky top-0 h-screen">
          <div className="grid h-full grid-cols-12">
            {/* Contenu gauche */}
            <div className="col-span-5 flex flex-col justify-between px-12 py-14 xl:col-span-4">
              <div>
                <p className="kicker">01 · Nos piliers</p>
                <h2 className="mt-6 font-display text-[clamp(2.25rem,3.5vw,3.5rem)] font-bold leading-[1.05] text-encre">
                  Trois actions,
                  <br />
                  un seul objectif
                </h2>
              </div>

              <div className="flex-1 py-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <span className="font-display text-[7rem] font-bold leading-none text-primary/[0.08] xl:text-[8rem]">
                      0{active + 1}
                    </span>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
                      {current.label}
                    </p>
                    <h3 className="mt-4 font-display text-4xl font-bold text-encre xl:text-5xl">
                      {current.title}
                    </h3>
                    <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                      {current.description}
                    </p>
                    <p className="mt-5 text-sm font-medium text-accent">
                      {current.metric}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <Link
                  href={`/nos-actions#${current.slug}`}
                  className="group mt-10 inline-flex items-center gap-4"
                >
                  <span className="text-sm font-semibold text-encre transition-colors group-hover:text-primary">
                    Découvrir cette action
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </Link>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {actionPillars.map((pillar, i) => (
                    <button
                      key={pillar.id}
                      type="button"
                      aria-label={pillar.title}
                      onClick={() => {
                        if (!containerRef.current) return;
                        const top = containerRef.current.offsetTop;
                        const h = containerRef.current.offsetHeight;
                        window.scrollTo({
                          top: top + (h / actionPillars.length) * i + 1,
                          behavior: "smooth",
                        });
                      }}
                      className={cn(
                        "font-display text-sm font-bold tabular-nums transition-colors duration-300",
                        i === active ? "text-primary" : "text-line hover:text-muted-foreground"
                      )}
                    >
                      0{i + 1}
                    </button>
                  ))}
                </div>
                <Link
                  href="/nos-actions"
                  className="text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
                >
                  Tout voir →
                </Link>
              </div>
            </div>

            {/* Images droite — crossfade scroll-driven */}
            <div className="relative col-span-7 xl:col-span-8">
              {actionPillars.map((pillar, i) => (
                <PillarImage
                  key={pillar.id}
                  pillar={pillar}
                  index={i}
                  scrollYProgress={scrollYProgress}
                />
              ))}

              <div className="absolute bottom-14 right-10 top-14 w-px bg-white/25">
                <motion.div
                  className="h-full w-full origin-top bg-white"
                  style={{ scaleY: barScale }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
