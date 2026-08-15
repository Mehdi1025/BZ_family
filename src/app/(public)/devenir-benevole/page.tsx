import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  CalendarCheck,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  HelpCircle,
  MessageCircleHeart,
  PackageCheck,
  School,
  Share2,
  UsersRound,
} from "lucide-react";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeUp, SectionIntro } from "@/components/shared/FadeUp";
import { testimonials } from "@/lib/data/mock";

export const metadata: Metadata = {
  title: "Devenir benevole",
  description:
    "Rejoignez l'equipe de benevoles BZ Family et participez aux actions solidaires du quartier.",
};

const reasons = [
  {
    title: "Agir concretement",
    description:
      "Participer a des actions utiles : distribution, ateliers, accompagnement et evenements de proximite.",
    Icon: HandHeart,
  },
  {
    title: "Rejoindre une equipe locale",
    description:
      "Echanger avec des habitants engages et avancer dans un cadre bienveillant, simple et organise.",
    Icon: UsersRound,
  },
  {
    title: "S'engager a son rythme",
    description:
      "Contribuer selon vos disponibilites, ponctuellement ou regulierement, avec un accompagnement adapte.",
    Icon: CalendarCheck,
  },
];

const opportunities = [
  {
    title: "Distribution alimentaire",
    description:
      "Preparation des paniers, accueil des familles et aide pendant les temps de distribution.",
    Icon: PackageCheck,
  },
  {
    title: "Accompagnement scolaire",
    description:
      "Soutien aux enfants, aide aux devoirs et animation de petits groupes de travail.",
    Icon: School,
  },
  {
    title: "Animation d'evenements",
    description:
      "Organisation des ateliers, forums, marches solidaires et rencontres de quartier.",
    Icon: HeartHandshake,
  },
  {
    title: "Communication",
    description:
      "Aide sur les reseaux sociaux, photos, affiches et valorisation des actions de terrain.",
    Icon: Share2,
  },
  {
    title: "Logistique",
    description:
      "Installation, rangement, transport du materiel et coordination pratique des actions.",
    Icon: GraduationCap,
  },
];

const volunteerFaq = [
  {
    question: "Faut-il une experience particuliere ?",
    answer:
      "Non. Les missions sont accessibles et l'equipe accompagne les nouveaux benevoles lors des premieres actions.",
  },
  {
    question: "Quel est l'engagement minimum ?",
    answer:
      "Il n'y a pas d'obligation rigide. Vous pouvez aider ponctuellement ou rejoindre une mission plus reguliere.",
  },
  {
    question: "Y a-t-il une formation ?",
    answer:
      "Oui, les benevoles sont orientes selon les missions et recoivent les informations utiles avant de commencer.",
  },
  {
    question: "Peut-on venir en groupe ?",
    answer:
      "Oui, l'association peut accueillir des groupes pour certaines actions, selon les besoins et les places disponibles.",
  },
];

export default function VolunteerPage() {
  const karimTestimonial =
    testimonials.find((testimonial) => testimonial.name === "Karim B.") ??
    testimonials[0];

  return (
    <>
      <section className="relative overflow-hidden bg-encre text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(59,130,246,0.32),transparent_36%),radial-gradient(circle_at_82%_8%,rgba(217,119,6,0.24),transparent_30%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-encre to-transparent" />

        <div className="container-bz relative grid gap-12 py-20 lg:grid-cols-[1fr_0.72fr] lg:items-center lg:py-24 xl:py-28">
          <FadeUp>
            <SectionIntro
              label="Engagement"
              title="Devenez benevole"
              description="Votre temps peut aider une famille, soutenir un enfant ou renforcer une action de quartier. BZ Family vous propose des missions utiles, humaines et accessibles."
              theme="dark"
            />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="accent" size="lg" asChild>
                <a href="#candidature">
                  Proposer mon aide
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
              <Button variant="inverse" size="lg" asChild>
                <a href="#missions">Voir les missions</a>
              </Button>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="glass glow-primary rounded-[2rem] p-6 lg:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
                Benevolat terrain
              </p>
              <p className="mt-3 font-display text-3xl font-bold text-white">
                Des missions simples, utiles et accompagnees
              </p>
              <div className="mt-6 grid gap-3">
                {["Accueil", "Distribution", "Ateliers", "Evenements"].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3"
                    >
                      <span className="text-sm font-semibold text-white">
                        {item}
                      </span>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">
                        Mission
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="container-bz">
          <SectionIntro
            label="Pourquoi"
            title="Pourquoi devenir benevole ?"
            description="S'engager avec BZ Family, c'est rejoindre une dynamique locale ou chaque heure donnee peut produire un impact concret."
          />

          <div className="grid gap-5 md:grid-cols-3">
            {reasons.map(({ title, description, Icon }, index) => (
              <FadeUp key={title} delay={index * 0.08}>
                <article className="h-full rounded-[2rem] border border-line bg-papier-deep p-7 transition-all hover:-translate-y-1 hover:shadow-card">
                  <Icon className="mb-5 h-8 w-8 text-primary" />
                  <h2 className="font-display text-2xl font-bold text-encre">
                    {title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {description}
                  </p>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section id="missions" className="bg-papier py-20 lg:py-24">
        <div className="container-bz grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <FadeUp>
            <SectionIntro
              label="Missions"
              title="Des opportunites adaptees a chaque profil"
              description="Les missions peuvent etre ponctuelles ou regulieres. L'objectif est de trouver une place utile selon vos envies, vos competences et vos disponibilites."
            />
          </FadeUp>

          <div className="grid gap-4 sm:grid-cols-2">
            {opportunities.map(({ title, description, Icon }, index) => (
              <FadeUp key={title} delay={index * 0.06}>
                <article className="group h-full rounded-[1.75rem] border border-line bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-card">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-encre">
                    {title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {description}
                  </p>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="container-bz">
          <FadeUp>
            <div className="grid overflow-hidden rounded-[2rem] border border-line bg-encre text-white shadow-card lg:grid-cols-[0.75fr_1.25fr]">
              <div className="relative min-h-72">
                <Image
                  src={karimTestimonial.avatar}
                  alt={`Portrait de ${karimTestimonial.name}`}
                  fill
                  sizes="(min-width: 1024px) 35vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-encre/80 to-transparent" />
              </div>

              <div className="p-8 lg:p-12">
                <MessageCircleHeart className="mb-8 h-9 w-9 text-accent" />
                <p className="kicker mb-6 text-white/50 before:from-accent before:to-accent/20">
                  Temoignage benevole
                </p>
                <blockquote className="font-display text-2xl font-bold leading-snug text-white md:text-3xl">
                  &ldquo;{karimTestimonial.content}&rdquo;
                </blockquote>
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="font-semibold text-white">
                    {karimTestimonial.name}
                  </p>
                  <p className="mt-1 text-sm text-white/55">
                    {karimTestimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section id="candidature" className="bg-papier py-20 lg:py-24">
        <div className="container-bz grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <FadeUp>
            <div className="rounded-[2rem] bg-encre p-8 text-white shadow-card lg:p-10">
              <p className="kicker mb-6 text-white/55 before:from-accent before:to-accent/20">
                Candidature
              </p>
              <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
                Dites-nous comment vous souhaitez aider
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/65">
                Le formulaire permet a l&apos;equipe de comprendre vos disponibilites,
                vos competences et le type d&apos;engagement qui vous convient.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="rounded-[2rem] border border-line bg-white p-6 shadow-card md:p-8">
              <VolunteerForm />
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-white pb-24 lg:pb-32">
        <div className="container-bz">
          <SectionIntro
            label="FAQ"
            title="Questions frequentes"
            description="Les points essentiels avant de rejoindre une mission benevole."
            align="center"
          />

          <div className="grid gap-5 md:grid-cols-2">
            {volunteerFaq.map((item, index) => (
              <FadeUp key={item.question} delay={index * 0.06}>
                <Card className="h-full rounded-[2rem]">
                  <CardContent className="p-7">
                    <HelpCircle className="mb-5 h-7 w-7 text-primary" />
                    <h2 className="font-display text-xl font-bold text-encre">
                      {item.question}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {item.answer}
                    </p>
                  </CardContent>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
