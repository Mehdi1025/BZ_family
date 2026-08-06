"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { TextReveal } from "@/components/shared/TextReveal";
import { FadeUp } from "@/components/shared/FadeUp";
import { siteImages } from "@/lib/data/images";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={reduced ? undefined : { y: imageY }}
      >
        <Image
          src={siteImages.hero}
          alt="Bénévoles de BZ Family lors d'une distribution dans le quartier"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-[#0a0a0f]/40 to-[#0a0a0f]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/80 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </motion.div>

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-accent/15 blur-[100px]"
      />

      <motion.div
        className="relative z-10 w-full pb-16 pt-32 lg:pb-24 lg:pt-40"
        style={reduced ? undefined : { y: contentY, opacity }}
      >
        <div className="container-bz">
          <FadeUp>
            <p className="kicker mb-8 text-zinc-400">
              Association loi 1901 · Depuis 2019
            </p>
          </FadeUp>

          <TextReveal
            as="h1"
            text="Ensemble, on change le quartier pour de vrai."
            className="max-w-5xl font-display text-[clamp(2.75rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-tight text-gradient"
            delay={0.15}
          />

          <FadeUp delay={0.5}>
            <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-zinc-400 sm:text-xl">
              BZ Family réunit habitants, bénévoles et partenaires autour de
              trois choses simples&nbsp;: nourrir, accompagner, rassembler.
            </p>
          </FadeUp>

          <FadeUp delay={0.65}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/faire-un-don"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-white px-8 text-sm font-semibold text-[#0a0a0f] transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Faire un don
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/devenir-benevole"
                className="inline-flex h-14 items-center rounded-full border border-white/25 px-8 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
              >
                Devenir bénévole
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.8}>
            <div className="mt-16 flex flex-wrap items-end justify-between gap-8 border-t border-white/10 pt-8">
              <div>
                <p className="font-display text-5xl font-bold text-white lg:text-6xl">
                  850+
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  Familles accompagnées
                </p>
              </div>
              <div>
                <p className="font-display text-5xl font-bold text-white lg:text-6xl">
                  45
                </p>
                <p className="mt-1 text-sm text-zinc-500">Bénévoles actifs</p>
              </div>
              <div className="hidden sm:block">
                <p className="font-display text-5xl font-bold text-white lg:text-6xl">
                  3 200+
                </p>
                <p className="mt-1 text-sm text-zinc-500">Repas distribués</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden />
                Scroll
              </div>
            </div>
          </FadeUp>
        </div>
      </motion.div>
    </section>
  );
}
