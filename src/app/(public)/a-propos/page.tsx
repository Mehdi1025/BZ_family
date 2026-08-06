import type { Metadata } from "next";
import Link from "next/link";
import { HeartHandshake, HandHeart, MapPinned, ShieldCheck, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-encre text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.35),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(217,119,6,0.25),transparent_30%)]" />
        <div className="container-bz relative grid min-h-[72vh] items-center gap-12 py-28 lg:grid-cols-[1fr_0.85fr] lg:py-36">
          <FadeUp>
            <Badge variant="inverse" className="mb-6">Notre histoire</Badge>
            <h1 className="font-display text-display-lg font-bold leading-none tracking-tight text-gradient">
              Qui sommes-nous ?
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/72">
              BZ Family est une association de quartier née d&apos;une conviction simple :
              quand les habitants s&apos;organisent ensemble, la solidarité devient plus
              proche, plus humaine et plus efficace.
            </p>
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

          <div className="grid gap-5 lg:grid-cols-4">
            {aboutTimeline.map((item, index) => (
              <FadeUp key={item.year} delay={index * 0.08}>
                <article className="h-full rounded-2xl border border-line bg-papier p-6 shadow-soft">
                  <span className="font-display text-4xl font-bold text-primary">
                    {item.year}
                  </span>
                  <h2 className="mt-6 font-display text-2xl font-bold text-encre">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
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
          </FadeUp>
          <div className="grid gap-5">
            <FadeUp delay={0.1}>
              <div className="rounded-2xl border border-line bg-white p-7 shadow-card">
                <HeartHandshake className="mb-5 h-8 w-8 text-primary" />
                <h2 className="font-display text-2xl font-bold text-encre">Notre mission</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Soutenir les familles, accompagner les enfants et renforcer le lien
                  social grâce à des actions concrètes, accessibles et régulières.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="rounded-2xl border border-line bg-white p-7 shadow-card">
                <MapPinned className="mb-5 h-8 w-8 text-accent" />
                <h2 className="font-display text-2xl font-bold text-encre">Notre vision</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Faire du quartier un lieu plus solidaire, où les habitants ne sont
                  pas seulement bénéficiaires, mais aussi acteurs des solutions.
                </p>
              </div>
            </FadeUp>
          </div>
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
                  <article className="h-full rounded-2xl border border-line bg-white p-6 shadow-soft transition-transform hover:-translate-y-1 hover:shadow-card">
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
        <div className="container-bz grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <FadeUp>
            <p className="kicker mb-6">Bureau & bénévoles</p>
            <h2 className="font-display text-display-sm font-bold text-gradient">
              Une équipe locale, disponible et engagée.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <p className="text-lg leading-relaxed text-white/75">
                L&apos;association s&apos;appuie sur un bureau, des bénévoles réguliers et des
                habitants mobilisés ponctuellement. Cette organisation souple permet
                d&apos;agir vite, tout en gardant une vraie proximité avec les besoins du
                quartier.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {["45 bénévoles actifs", "850 familles accompagnées", "120 rendez-vous"].map((stat) => (
                  <div key={stat} className="rounded-xl border border-white/10 p-4">
                    <p className="text-sm font-semibold text-white">{stat}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
