import type { Metadata } from "next";
import type { Partner, PartnerType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Handshake, Network, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FadeUp, SectionIntro } from "@/components/shared/FadeUp";
import { partnerTestimonials } from "@/lib/data/mock";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

const partnershipLevels = [
  {
    title: "Partenaires institutionnels",
    description:
      "Collectivités et structures publiques qui accompagnent les actions avec des moyens, des relais et une reconnaissance locale.",
  },
  {
    title: "Associations partenaires",
    description:
      "Acteurs de terrain qui participent aux collectes, aux événements, à l'orientation des familles et aux projets communs.",
  },
  {
    title: "Mécènes et entreprises",
    description:
      "Fondations, entreprises ou soutiens privés qui contribuent par des dons, du matériel, des compétences ou un appui durable.",
  },
] as const;

const partnerTypeLabels: Record<PartnerType, string> = {
  INSTITUTIONAL: "Partenaire institutionnel",
  CORPORATE: "Entreprise partenaire",
  COMMUNITY: "Association partenaire",
  MEDIA: "Partenaire média",
};

const partnerTypeOrder: PartnerType[] = [
  "INSTITUTIONAL",
  "COMMUNITY",
  "CORPORATE",
  "MEDIA",
];

export const metadata: Metadata = {
  title: "Partenaires",
  description: "Découvrez les partenaires qui soutiennent BZ Family.",
};

async function getPartners() {
  try {
    return await prisma.partner.findMany({
      orderBy: [{ type: "asc" }, { name: "asc" }],
    });
  } catch (error) {
    console.error("Unable to load partners", error);

    return [];
  }
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function PartnerLogo({ partner }: { partner: Partner }) {
  if (!partner.logoUrl) {
    return (
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-xl font-bold text-primary shadow-sm">
        {getInitials(partner.name)}
      </div>
    );
  }

  return (
    <Image
      src={partner.logoUrl}
      alt={`Logo ${partner.name}`}
      width={220}
      height={110}
      className="max-h-16 w-auto object-contain"
    />
  );
}

export default async function PartnersPage() {
  const partners = await getPartners();
  const featuredTestimonial = partnerTestimonials[0];
  const partnersByType = partnerTypeOrder
    .map((type) => ({
      type,
      partners: partners.filter((partner) => partner.type === type),
    }))
    .filter((group) => group.partners.length > 0);

  return (
    <>
      <section className="relative overflow-hidden bg-encre text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(59,130,246,0.34),transparent_36%),radial-gradient(circle_at_78%_12%,rgba(217,119,6,0.24),transparent_32%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-encre to-transparent" />

        <div className="container-bz relative grid gap-12 py-20 lg:grid-cols-[1fr_0.72fr] lg:items-center lg:py-24 xl:py-28">
          <FadeUp>
            <SectionIntro
              label="Réseau"
              title="Nos partenaires"
              description="BZ Family avance avec un réseau d'acteurs engagés : institutions, entreprises, associations et mécènes qui soutiennent les actions de terrain."
              theme="dark"
            />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="accent" size="lg" asChild>
                <Link href="#liste-partenaires">
                  Découvrir le réseau
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="inverse" size="lg" asChild>
                <Link href="/contact?subject=partenariat">
                  Devenir partenaire
                </Link>
              </Button>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="glass glow-primary rounded-[2rem] p-6 lg:p-7">
              <div className="mb-6 flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
                    Réseau actif
                  </p>
                  <p className="mt-3 font-display text-3xl font-bold text-white">
                    {partners.length} partenaires
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white">
                  <Network className="h-6 w-6" />
                </div>
              </div>

              <div className="grid gap-3">
                {partners.slice(0, 4).map((partner) => (
                  <div
                    key={partner.id}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/10 px-4 py-3"
                  >
                    <span className="text-sm font-semibold text-white">
                      {partner.name}
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">
                      {partnerTypeLabels[partner.type]}
                    </span>
                  </div>
                ))}

                {partners.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-5 text-sm text-white/65">
                    Aucun partenaire n&apos;est publié pour le moment.
                  </div>
                ) : null}
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <Network className="mb-3 h-5 w-5 text-accent" />
                  <p className="text-sm font-semibold text-white">
                    Réseau local
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/60">
                    Des relais utiles pour renforcer l&apos;impact des projets.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <Handshake className="mb-3 h-5 w-5 text-accent" />
                  <p className="text-sm font-semibold text-white">
                    Engagement durable
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/60">
                    Des soutiens construits autour des besoins du terrain.
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section id="liste-partenaires" className="pb-12 pt-24 lg:pb-16 lg:pt-32 xl:pt-40">
        <div className="container-bz space-y-10">
          {partnersByType.length > 0 ? (
            partnersByType.map((group) => (
              <div key={group.type} className="space-y-5">
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-primary/35" />
                  <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">
                    {partnerTypeLabels[group.type]}
                  </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.partners.map((partner) => (
                    <Card
                      key={partner.id}
                      className="group overflow-hidden rounded-[2rem] transition-all hover:-translate-y-1 hover:shadow-card"
                    >
                      <CardHeader>
                        <div className="flex h-28 items-center justify-center rounded-2xl bg-papier-deep p-6">
                          <PartnerLogo partner={partner} />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        <div>
                          <Badge variant="secondary">
                            {partnerTypeLabels[partner.type]}
                          </Badge>
                          <h3 className="mt-4 font-display text-2xl font-bold text-encre">
                            {partner.name}
                          </h3>
                          {partner.description ? (
                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                              {partner.description}
                            </p>
                          ) : null}
                        </div>

                        {partner.websiteUrl ? (
                          <a
                            href={partner.websiteUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
                          >
                            Voir le site partenaire
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        ) : (
                          <p className="text-sm font-semibold text-muted-foreground">
                            Site partenaire à venir
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <Card className="rounded-[2rem] border-dashed">
              <CardContent className="py-12 text-center">
                <h2 className="font-display text-2xl font-bold text-encre">
                  Aucun partenaire disponible pour le moment.
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                  Les partenaires seront affichés ici dès leur ajout dans
                  l&apos;espace d&apos;administration.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section className="bg-papier pb-24 pt-12 lg:pb-32 lg:pt-16 xl:pb-40">
        <div className="container-bz">
          <SectionIntro
            label="Niveaux"
            title="Plusieurs façons de soutenir le terrain"
            description="Chaque partenariat peut prendre une forme différente selon les moyens, les expertises et les besoins de l'association."
          />

          <div className="grid gap-5 md:grid-cols-3">
            {partnershipLevels.map((level, index) => (
              <FadeUp key={level.title} delay={index * 0.08}>
                <article className="h-full rounded-[2rem] border border-line bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-card">
                  <span className="font-display text-sm font-bold tabular-nums text-primary/45">
                    0{index + 1}
                  </span>
                  <h2 className="mt-5 font-display text-2xl font-bold leading-tight text-encre">
                    {level.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {level.description}
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
              <div className="flex min-h-64 items-center justify-center bg-[radial-gradient(circle_at_30%_25%,rgba(217,119,6,0.28),transparent_36%),radial-gradient(circle_at_70%_75%,rgba(59,130,246,0.25),transparent_34%)] p-8">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/10">
                  <Quote className="h-9 w-9 text-accent" />
                </div>
              </div>

              <div className="p-8 lg:p-12">
                <p className="kicker mb-6 text-white/50 before:from-accent before:to-accent/20">
                  Témoignage partenaire
                </p>
                <blockquote className="font-display text-2xl font-bold leading-snug text-white md:text-3xl">
                  “{featuredTestimonial.quote}”
                </blockquote>
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="font-semibold text-white">
                    {featuredTestimonial.author}
                  </p>
                  <p className="mt-1 text-sm text-white/55">
                    {featuredTestimonial.role} · {featuredTestimonial.organization}
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-papier pb-24">
        <div className="container-bz">
          <FadeUp>
            <div className="rounded-[2rem] bg-accent p-8 text-white shadow-card lg:p-12">
              <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
                <div>
                  <p className="kicker mb-5 text-white/80 before:from-white before:to-white/20">
                    Agir ensemble
                  </p>
                  <h2 className="max-w-3xl font-display text-4xl font-bold leading-tight md:text-5xl">
                    Vous souhaitez soutenir les actions de BZ Family ?
                  </h2>
                  <p className="mt-5 max-w-2xl text-white/80">
                    Contactez l&apos;association pour proposer un partenariat,
                    un soutien matériel, une aide financière ou une action commune.
                  </p>
                </div>
                <Button variant="inverse" size="lg" asChild>
                  <Link href="/contact?subject=partenariat">
                    Devenir partenaire
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
