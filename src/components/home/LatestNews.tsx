"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { latestNews } from "@/lib/data/mock";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

function NewsRow({
  article,
  index,
  isActive,
  onActivate,
}: {
  article: (typeof latestNews)[number];
  index: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (inView) onActivate();
  }, [inView, onActivate]);

  return (
    <Link
      ref={ref}
      href={`/actualites/${article.slug}`}
      onMouseEnter={onActivate}
      className={cn(
        "group relative block border-t border-white/10 py-10 transition-colors lg:py-14",
        isActive && "border-white/20"
      )}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <span
              className={cn(
                "font-display text-sm font-bold tabular-nums transition-colors duration-500",
                isActive ? "text-primary" : "text-white/20"
              )}
            >
              0{index + 1}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {article.category}
            </span>
          </div>

          <h3
            className={cn(
              "mt-4 font-display text-[clamp(1.5rem,3vw,2.75rem)] font-bold leading-[1.08] tracking-tight transition-colors duration-500",
              isActive ? "text-white" : "text-white/40 group-hover:text-white/70"
            )}
          >
            {article.title}
          </h3>

          <motion.p
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              height: isActive ? "auto" : 0,
            }}
            transition={{ duration: 0.45, ease: EASE }}
            className="mt-4 overflow-hidden text-sm leading-relaxed text-zinc-400"
          >
            {article.excerpt}
          </motion.p>

          <time className="mt-4 block text-xs text-zinc-600">
            {formatDate(article.publishedAt)}
          </time>
        </div>

        <ArrowUpRight
          className={cn(
            "mt-2 h-5 w-5 shrink-0 transition-all duration-500",
            isActive
              ? "translate-x-0 translate-y-0 text-primary"
              : "text-white/20 group-hover:text-white/50"
          )}
        />
      </div>

      {/* Mobile image inline */}
      <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-sm lg:hidden">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Active indicator line */}
      <motion.div
        className="absolute left-0 top-0 h-px bg-primary"
        initial={false}
        animate={{ width: isActive ? "100%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
      />
    </Link>
  );
}

export function LatestNews() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const current = latestNews[active];

  return (
    <section className="relative bg-encre text-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-2">
        {/* Liste éditoriale */}
        <div className="container-bz flex flex-col justify-center py-24 lg:py-32 xl:pr-16">
          <div className="mb-14 lg:mb-20">
            <div className="mb-8 flex items-center gap-4">
              <span className="font-display text-sm font-bold tabular-nums text-white/25">
                03
              </span>
              <span className="kicker text-zinc-500 before:from-primary before:to-primary/20">
                Actualités
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold leading-[1.02] tracking-tight text-gradient">
              Ce qui se passe
              <br />
              dans le quartier
            </h2>
          </div>

          <div>
            {latestNews.map((article, i) => (
              <NewsRow
                key={article.id}
                article={article}
                index={i}
                isActive={active === i}
                onActivate={() => setActive(i)}
              />
            ))}
          </div>

          <Link
            href="/actualites"
            className="group mt-10 inline-flex items-center gap-4 border-t border-white/10 pt-10"
          >
            <span className="text-sm font-semibold text-zinc-400 transition-colors group-hover:text-white">
              Toutes les actualités
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-all group-hover:border-white group-hover:bg-white group-hover:text-encre">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        {/* Panneau image sticky — desktop */}
        <div className="relative hidden lg:block">
          <div className="sticky top-0 h-screen overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={reduced ? false : { opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="absolute inset-0"
              >
                <Image
                  src={current.imageUrl}
                  alt={current.title}
                  fill
                  sizes="50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-encre/20 to-encre/80" />
                <div className="absolute inset-0 bg-gradient-to-t from-encre/60 via-transparent to-encre/30" />
              </motion.div>
            </AnimatePresence>

            {/* Overlay contenu image */}
            <div className="absolute inset-0 flex flex-col justify-between p-10 xl:p-14">
              <div className="flex items-start justify-between">
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                  {current.category}
                </span>
                <span className="font-display text-8xl font-bold leading-none text-white/10">
                  0{active + 1}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <time className="text-xs text-zinc-400">
                    {formatDate(current.publishedAt)}
                  </time>
                  <p className="mt-3 max-w-md font-display text-2xl font-bold leading-tight text-white xl:text-3xl">
                    {current.title}
                  </p>
                  <Link
                    href={`/actualites/${current.slug}`}
                    className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white"
                  >
                    Lire l&apos;article
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Barre progression articles */}
            <div className="absolute bottom-10 left-10 right-10 flex gap-2">
              {latestNews.map((article, i) => (
                <button
                  key={article.id}
                  type="button"
                  aria-label={article.title}
                  onClick={() => setActive(i)}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-all duration-500",
                    i === active ? "bg-white" : "bg-white/20 hover:bg-white/40"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
