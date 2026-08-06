"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TextReveal } from "@/components/shared/TextReveal";
import { FadeUp } from "@/components/shared/FadeUp";
import { siteImages } from "@/lib/data/images";

const MANIFESTO =
  "La solidarité n'est pas un slogan. C'est ce qui se passe quand des voisins décident d'agir ensemble, chaque semaine, sans attendre.";

const WORDS = MANIFESTO.split(" ");
const PILLARS = ["Nourrir", "Accompagner", "Rassembler"];

function ScrollWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = 0.08 + (index / total) * 0.55;
  const end = start + 0.55 / total;

  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const y = useTransform(progress, [start, end], [14, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="mr-[0.28em] inline-block will-change-transform"
    >
      {word}
    </motion.span>
  );
}

function OutlineMarquee() {
  const items = ["Solidarité", "Proximité", "Quartier", "Ensemble", "BZ Family"];
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-t border-line py-5">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-8 font-display text-[clamp(2.5rem,6vw,5rem)] font-bold uppercase tracking-tighter text-transparent"
            style={{ WebkitTextStroke: "1px rgba(17,24,39,0.12)" }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function MobileManifesto() {
  return (
    <section className="bg-white lg:hidden">
      <div className="container-bz py-20">
        <FadeUp>
          <p className="kicker">Notre conviction</p>
        </FadeUp>
        <TextReveal
          as="p"
          text={MANIFESTO}
          className="mt-8 font-display text-[clamp(1.75rem,6vw,2.5rem)] font-medium leading-[1.15] tracking-tight text-gradient-dark"
          delay={0.1}
        />
        <FadeUp delay={0.35}>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            BZ Family est née d&apos;un geste simple&nbsp;: voir un besoin dans le
            quartier et y répondre. Aujourd&apos;hui, 45 bénévoles continuent
            cette histoire.
          </p>
        </FadeUp>
        <FadeUp delay={0.45}>
          <div className="mt-8 flex flex-wrap gap-2">
            {PILLARS.map((p) => (
              <span
                key={p}
                className="rounded-full border border-line px-4 py-2 text-xs font-semibold uppercase tracking-wider text-encre"
              >
                {p}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>
      <div className="relative mx-5 aspect-[4/3] overflow-hidden rounded-sm">
        <Image
          src={siteImages.about}
          alt="Membres de BZ Family dans le quartier"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <OutlineMarquee />
    </section>
  );
}

export function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const subOpacity = useTransform(scrollYProgress, [0.62, 0.78], [0, 1]);
  const subY = useTransform(scrollYProgress, [0.62, 0.78], [24, 0]);
  const pillsOpacity = useTransform(scrollYProgress, [0.72, 0.88], [0, 1]);
  const linkOpacity = useTransform(scrollYProgress, [0.82, 0.95], [0, 1]);
  const lineScale = useTransform(scrollYProgress, [0, 0.22], [0, 1]);

  if (reduced) {
    return (
      <section className="bg-white py-24">
        <div className="container-bz max-w-4xl">
          <p className="kicker">Notre conviction</p>
          <p className="mt-8 font-display text-4xl font-medium leading-tight text-encre">
            {MANIFESTO}
          </p>
        </div>
        <OutlineMarquee />
      </section>
    );
  }

  return (
    <>
      <MobileManifesto />

      <section
        ref={containerRef}
        className="relative hidden bg-white lg:block"
        style={{ height: "220vh" }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="container-bz grid h-full grid-cols-12 items-center gap-10">
            {/* Image parallax */}
            <div className="relative col-span-5 h-[62vh] overflow-hidden rounded-sm">
              <motion.div
                className="absolute inset-0"
                style={{ y: imageY, scale: imageScale }}
              >
                <Image
                  src={siteImages.about}
                  alt="Membres de BZ Family dans le quartier"
                  fill
                  sizes="42vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-encre/30 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div className="rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-md">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                    Loi 1901
                  </p>
                  <p className="font-display text-lg font-bold text-white">
                    Depuis 2019
                  </p>
                </div>
                <motion.div
                  className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                >
                  <span className="text-[9px] font-semibold uppercase tracking-widest text-white">
                    BZ · Family
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Texte scroll-driven */}
            <div className="col-span-7 flex flex-col justify-center py-12">
              <div className="mb-10 flex items-center gap-4">
                <p className="kicker shrink-0">Notre conviction</p>
                <motion.div
                  className="h-px flex-1 origin-left bg-primary/30"
                  style={{ scaleX: lineScale }}
                />
              </div>

              <p className="font-display text-[clamp(2.25rem,3.8vw,3.75rem)] font-medium leading-[1.12] tracking-tight text-encre">
                {WORDS.map((word, i) => (
                  <ScrollWord
                    key={`${word}-${i}`}
                    word={word}
                    index={i}
                    total={WORDS.length}
                    progress={scrollYProgress}
                  />
                ))}
              </p>

              <motion.p
                style={{ opacity: subOpacity, y: subY }}
                className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground"
              >
                BZ Family est née de ce geste simple&nbsp;: voir un besoin dans
                le quartier et y répondre. Aujourd&apos;hui, 45 bénévoles
                poursuivent cette histoire au quotidien.
              </motion.p>

              <motion.div
                style={{ opacity: pillsOpacity }}
                className="mt-8 flex flex-wrap gap-2"
              >
                {PILLARS.map((pillar) => (
                  <span
                    key={pillar}
                    className="rounded-full border border-line bg-papier px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-encre"
                  >
                    {pillar}
                  </span>
                ))}
              </motion.div>

              <motion.div style={{ opacity: linkOpacity }}>
                <Link
                  href="/a-propos"
                  className="group mt-10 inline-flex items-center gap-4"
                >
                  <span className="text-sm font-semibold text-encre transition-colors group-hover:text-primary">
                    Découvrir notre histoire
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Indicateur scroll */}
          <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
            <motion.div
              className="h-12 w-px origin-top bg-line"
              style={{ scaleY: scrollYProgress }}
            />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Scroll
            </span>
          </div>
        </div>
      </section>

      <div className="hidden lg:block">
        <OutlineMarquee />
      </div>
    </>
  );
}
