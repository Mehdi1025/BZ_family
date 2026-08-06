import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeUp, SectionIntro } from "@/components/shared/FadeUp";
import { MediaImage } from "@/components/shared/MediaImage";
import { actionDetails } from "@/lib/data/ramzi-pages";

export const metadata: Metadata = {
  title: "Nos actions solidaires",
  description:
    "Découvrez les actions de BZ Family : aide alimentaire, accompagnement scolaire et lien social au service des familles du quartier.",
};

export default function ActionsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-encre text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,119,6,0.28),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.22),transparent_35%)]" />
        <div className="container-bz relative py-28 lg:py-36">
          <SectionIntro
            label="Terrain"
            title="Nos actions"
            description="Trois piliers structurent notre engagement : aider, accompagner et rassembler. Chaque action répond à un besoin concret identifié avec les habitants."
            theme="dark"
          />
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-bz grid gap-8 lg:grid-cols-3">
          {actionDetails.map((action, index) => (
            <FadeUp key={action.slug} delay={index * 0.1}>
              <Link
                href={`/nos-actions/${action.slug}`}
                className="group block h-full overflow-hidden rounded-[2rem] border border-line bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <MediaImage
                  src={action.image}
                  alt={action.title}
                  containerClassName="aspect-[4/3]"
                />
                <div className="p-7">
                  <Badge variant="accent">{action.label}</Badge>
                  <h2 className="mt-5 font-display text-3xl font-bold text-encre">
                    {action.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {action.summary}
                  </p>
                  <div className="mt-6 rounded-xl bg-papier p-4 text-sm font-semibold text-primary">
                    {action.metric}
                  </div>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Lire la fiche action
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="bg-papier py-20">
        <div className="container-bz rounded-[2rem] bg-encre p-8 text-white lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="kicker mb-5">Participer</p>
              <h2 className="font-display text-4xl font-bold text-gradient">
                Vous voulez aider une action à grandir ?
              </h2>
              <p className="mt-5 max-w-2xl text-white/70">
                Donner du temps, partager une compétence ou soutenir financièrement :
                chaque contribution peut renforcer l&apos;impact de BZ Family.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button variant="accent" size="lg" asChild>
                <Link href="/faire-un-don">Faire un don</Link>
              </Button>
              <Button variant="inverse" size="lg" asChild>
                <Link href="/devenir-benevole">Devenir bénévole</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
