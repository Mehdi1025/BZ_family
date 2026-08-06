"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { TextReveal } from "@/components/shared/TextReveal";
import { FadeUp } from "@/components/shared/FadeUp";
import { siteImages } from "@/lib/data/images";

export function VolunteerCTA() {
  return (
    <section className="relative min-h-[85vh] bg-white lg:grid lg:min-h-[90vh] lg:grid-cols-2">
      <div className="relative min-h-[45vh] lg:min-h-full">
        <Image
          src={siteImages.actions.social}
          alt="Bénévoles BZ Family lors d'une fête de quartier"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-encre/20 lg:bg-transparent" />
      </div>

      <div className="flex flex-col justify-center px-6 py-20 sm:px-10 lg:px-16 lg:py-24 xl:px-24">
        <FadeUp>
          <p className="kicker mb-8">Rejoignez-nous</p>
        </FadeUp>

        <TextReveal
          as="h2"
          text="Votre temps change des vies."
          className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-tight text-gradient-dark"
          delay={0.08}
        />

        <FadeUp delay={0.3}>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Devenez bénévole, faites un don, ou passez nous voir à la maison de
            quartier. Chaque geste compte — vraiment.
          </p>
        </FadeUp>

        <FadeUp delay={0.45}>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/devenir-benevole"
              className="group inline-flex h-14 items-center gap-3 bg-encre px-8 text-sm font-semibold text-white transition-all hover:bg-primary"
            >
              Devenir bénévole
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/faire-un-don"
              className="inline-flex h-14 items-center border border-line px-8 text-sm font-semibold text-encre transition-colors hover:border-encre"
            >
              Faire un don
            </Link>
          </div>
        </FadeUp>

        <FadeUp delay={0.6}>
          <p className="mt-8 text-xs text-muted-foreground">
            Reçu fiscal — 66&nbsp;% de votre don déductible des impôts
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
