import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  HandHeart,
  HeartHandshake,
  MapPinned,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeUp, SectionIntro } from "@/components/shared/FadeUp";
import { MediaImage } from "@/components/shared/MediaImage";
import { aboutTimeline, aboutValues } from "@/lib/data/ramzi-pages";
import { siteImages } from "@/lib/data/images";

export const metadata: Metadata = {
  title: "À propos de BZ Family",
  description:
    "Découvrez l'histoire, la mission et les valeurs de BZ Family, association de quartier engagée pour la solidarité, l'inclusion et le lien social.",
};

const valueIcons = [HandHeart, UsersRound, MapPinned, ShieldCheck];

const teamPlaceholders = [
  { role: "Présidence", initials: "P" },
  { role: "Trésorerie", initials: "T" },
  { role: "Secrétariat", initials: "S" },
  { role: "Coordination bénévole", initials: "C" },
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-encre text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.35),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(217,119,6,0.25),transparent_30%)]" />
        <div className="container-bz relative grid min-h-[72vh] items-center gap-12 py-28 lg:grid-cols-[1fr_0.85fr] lg:py-36">
          <FadeUp>
            <h1 className="sr-only">Qui sommes-nous ?</h1>
            <SectionIntro
              label="Notre histoire"
              title="Qui sommes-nous ?"
              description="BZ Family est une association de quartier née d'une conviction simple : quand les habitants s'organisent ensemble, la solidarité devient plus proche, plus humaine et plus efficace."
              theme="dark"
            />
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button variant="accent" size="lg" asChild>
                <Link href="/devenir-benevole">Devenir bénévole</Link>
              </Button>
              <Button variant="inverse" size="lg" asChild>
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="glass glow-primary rounded-[2rem] p-4">
              <MediaImage
                src={siteImages.about}
                alt="Membres de BZ Family réunis autour d'une action associative"
                priority
                containerClassName="aspect-[4/5] rounded-[1.5rem]"
              />
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-bz">
          <SectionIntro
            label="Repères"
            title="Une association construite sur le terrain"
            description="Notre histoire avance par étapes : des premières initiatives citoyennes à une structure capable d'accompagner durablement les familles."
          />

          <div className="relative mx-auto max-w-5xl before:absolute before:bottom-4 before:left-[1.15rem] before:top-4 before:w-px before:bg-gradient-to-b before:from-primary before:via-primary/35 before:to-transparent md:before:left-[8.45rem]">
            {aboutTimeline.map((item, index) => (
              <FadeUp key={item.year} delay={index * 0.08}>
                <article className="relative grid gap-5 pb-12 pl-14 last:pb-0 md:grid-cols-[7rem_1fr] md:gap-12 md:pl-0">
                  <span className="absolute left-3 top-2 z-10 h-3.5 w-3.5 rounded-full border-[3px] border-white bg-primary shadow-[0_0_0_5px_rgba(30,64,175,0.12)] md:left-[8rem]" />
                  <span className="font-display text-3xl font-bold text-primary md:text-right">
                    {item.year}
                  </span>
                  <div className="rounded-2xl border border-line bg-papier-deep p-6 transition-transform duration-300 hover:-translate-y-1 md:p-8">
                    <h2 className="font-display text-2xl font-bold text-encre">
                      {item.title}
                    </h2>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-papier">
        <div className="container-bz grid gap-12 lg:grid-cols-2 lg:items-center">
          <FadeUp>
            <SectionIntro
              label="Mission & vision"
              title="Agir maintenant, construire durablement"
              description="BZ Family répond aux urgences du quotidien tout en créant des espaces où chacun peut participer à la vie du quartier."
            />
            <div className="grid gap-5">
              <div className="rounded-2xl border border-line bg-white p-7 shadow-card">
                <HeartHandshake className="mb-5 h-8 w-8 text-primary" />
                <h2 className="font-display text-2xl font-bold text-encre">Notre mission</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Soutenir les familles, accompagner les enfants et renforcer le lien
                  social grâce à des actions concrètes, accessibles et régulières.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-white p-7 shadow-card">
                <MapPinned className="mb-5 h-8 w-8 text-accent" />
                <h2 className="font-display text-2xl font-bold text-encre">Notre vision</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Faire du quartier un lieu plus solidaire, où les habitants ne sont
                  pas seulement bénéficiaires, mais aussi acteurs des solutions.
                </p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <MediaImage
              src={siteImages.about}
              alt="Bénévoles et habitants mobilisés lors d'une action BZ Family"
              containerClassName="aspect-[4/5] rounded-[2rem] shadow-card"
            />
          </FadeUp>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-bz">
          <SectionIntro
            label="Valeurs"
            title="Ce qui guide chaque action"
            description="Nos valeurs ne sont pas des slogans : elles structurent la manière dont nous accueillons, décidons et agissons."
            align="center"
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {aboutValues.map((value, index) => {
              const Icon = valueIcons[index];
              return (
                <FadeUp key={value.title} delay={index * 0.08}>
                  <article className="h-full rounded-2xl border border-line bg-papier-deep p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card">
                    <Icon className="mb-5 h-8 w-8 text-primary" />
                    <h2 className="font-display text-xl font-bold text-encre">
                      {value.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {value.text}
                    </p>
                  </article>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-encre text-white">
        <div className="container-bz">
          <SectionIntro
            label="Bureau & bénévoles"
            title="Une équipe locale, disponible et engagée"
            description="Les noms et portraits seront ajoutés après validation par l'association. Cette présentation permet déjà de visualiser la composition du bureau sans inventer d'informations."
            theme="dark"
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {teamPlaceholders.map((member, index) => (
              <FadeUp key={member.role} delay={index * 0.08}>
                <article className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-lg font-bold text-accent">
                    {member.initials}
                  </div>
                  <h2 className="mt-6 font-display text-xl font-bold text-white">
                    Membre à confirmer
                  </h2>
                  <p className="mt-2 text-sm text-white/60">{member.role}</p>
                  <UserRound className="mt-6 h-5 w-5 text-white/35" aria-hidden="true" />
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-accent text-white">
        <div className="container-bz">
          <FadeUp>
            <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="kicker mb-5 text-white/80">Agir avec nous</p>
                <h2 className="max-w-4xl font-display text-[clamp(2.5rem,6vw,4.75rem)] font-bold leading-[1.02] tracking-tight">
                  Chaque engagement peut faire grandir la solidarité du quartier.
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
                  Rejoignez les bénévoles de BZ Family ou contactez l&apos;association pour
                  proposer une idée, un partenariat ou une action locale.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button variant="inverse" size="lg" asChild>
                  <Link href="/devenir-benevole">
                    Devenir bénévole <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
                <Button variant="inverse" size="lg" asChild>
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
