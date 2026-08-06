"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/data/mock";
import { EditorialHeading } from "@/components/shared/EditorialHeading";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  const prev = () =>
    setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1));
  const next = () =>
    setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1));

  return (
    <section className="relative bg-white py-24 lg:py-40">
      <div className="container-bz">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <EditorialHeading
              index="04"
              label="Témoignages"
              title="Ils font vivre le quartier"
            />
          </div>

          <div className="relative lg:col-span-8 lg:pl-8">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-display text-[clamp(1.5rem,3.5vw,2.75rem)] font-medium leading-[1.2] tracking-tight text-gradient-dark">
                  &ldquo;{current.content}&rdquo;
                </p>

                <footer className="mt-10 flex items-center gap-5">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full">
                    <Image
                      src={current.avatar}
                      alt={current.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <cite className="not-italic font-semibold text-encre">
                      {current.name}
                    </cite>
                    <p className="text-sm text-muted-foreground">
                      {current.role}
                    </p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-12 flex items-center gap-6">
              <button
                type="button"
                onClick={prev}
                aria-label="Témoignage précédent"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-muted-foreground transition-colors hover:border-encre hover:text-encre"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex gap-3">
                {testimonials.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    aria-label={`Témoignage ${i + 1}`}
                    onClick={() => setActive(i)}
                    className={`font-display text-sm font-bold tabular-nums transition-colors ${
                      i === active ? "text-primary" : "text-line hover:text-muted-foreground"
                    }`}
                  >
                    0{i + 1}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                aria-label="Témoignage suivant"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-muted-foreground transition-colors hover:border-encre hover:text-encre"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
