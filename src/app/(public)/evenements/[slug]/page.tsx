import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventRegisterForm } from "@/components/forms/EventRegisterForm";
import { MediaImage } from "@/components/shared/MediaImage";
import { getEventImage } from "@/lib/data/images";
import prisma from "@/lib/prisma";
import { formatDate, siteConfig } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

const eventEditorialDetails: Record<
  string,
  {
    longDescription: string[];
    schedule: { time: string; title: string; description: string }[];
    practicalInfo: { title: string; description: string }[];
  }
> = {
  "atelier-cuisine-solidaire": {
    longDescription: [
      "Cet atelier cuisine solidaire propose aux familles et aux habitants du quartier un moment convivial autour de recettes simples, accessibles et équilibrées. L'objectif est de montrer qu'il est possible de préparer des repas de qualité avec des ingrédients du quotidien et un budget maîtrisé.",
      "L'événement est aussi pensé comme un temps d'échange entre participants, bénévoles et membres de l'association. Chacun peut partager ses habitudes, découvrir de nouvelles astuces et repartir avec des idées faciles à reproduire à la maison.",
      "Au-delà de la cuisine, cet atelier contribue à renforcer le lien social dans le quartier. Il permet de créer un espace bienveillant où les habitants se rencontrent, apprennent ensemble et participent à une action locale utile.",
    ],
    schedule: [
      {
        time: "14:00",
        title: "Accueil des participants",
        description:
          "Présentation de l'équipe, installation des familles et rappel du déroulé de l'atelier.",
      },
      {
        time: "14:30",
        title: "Préparation des recettes",
        description:
          "Réalisation collective de recettes simples avec l'aide des bénévoles.",
      },
      {
        time: "16:00",
        title: "Dégustation et échanges",
        description:
          "Temps de partage autour des plats préparés et discussion sur les astuces anti-gaspillage.",
      },
      {
        time: "17:00",
        title: "Clôture de l'atelier",
        description:
          "Distribution des fiches recettes et rangement collectif de l'espace.",
      },
    ],
    practicalInfo: [
      {
        title: "Accessibilité",
        description:
          "La salle est accessible aux personnes à mobilité réduite. Les bénévoles peuvent accompagner les participants à leur arrivée si besoin.",
      },
      {
        title: "Transport",
        description:
          "Le lieu est accessible en transports en commun. Quelques places de stationnement sont également disponibles autour de la maison de quartier.",
      },
      {
        title: "Contact",
        description:
          "Pour toute question avant l'événement, les participants peuvent contacter l'association via la page contact du site.",
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug },
  });

  if (!event) return { title: "Événement introuvable" };

  const imageUrl = event.imageUrl ?? getEventImage(slug);
  const pageUrl = `${siteConfig.url}/evenements/${event.slug}`;
  const title = `${event.title} | ${siteConfig.name}`;

  return {
    title,
    description: event.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      title,
      description: event.description,
      url: pageUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          alt: event.title,
        },
      ],
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug },
  });

  if (!event) notFound();

  const spotsLeft = event.capacity - event.registeredCount;
  const isFull = spotsLeft <= 0;
  const imageUrl = event.imageUrl ?? getEventImage(slug);
  const editorialDetails = eventEditorialDetails[event.slug];
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`;

  return (
    <article className="section-padding">
      <div className="container-bz">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/evenements">
            <ArrowLeft className="h-4 w-4" />
            Retour aux événements
          </Link>
        </Button>

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MediaImage
              src={imageUrl}
              alt={event.title}
              containerClassName="mb-6 aspect-[16/9] rounded-2xl"
            />
            <h1 className="text-4xl font-bold">{event.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {event.description}
            </p>

            {editorialDetails?.longDescription && (
              <section className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-encre">
                  À propos de l&apos;événement
                </h2>
                <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground">
                  {editorialDetails.longDescription.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            )}

            {editorialDetails?.schedule && (
              <section className="mt-8 rounded-2xl border border-line bg-papier-deep p-6">
                <h2 className="font-display text-2xl font-bold text-encre">
                  Programme
                </h2>
                <div className="mt-6 space-y-4">
                  {editorialDetails.schedule.map((item) => (
                    <div
                      key={`${item.time}-${item.title}`}
                      className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm sm:grid-cols-[90px_1fr]"
                    >
                      <span className="font-display text-sm font-bold text-primary">
                        {item.time}
                      </span>
                      <div>
                        <h3 className="font-semibold text-encre">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {editorialDetails?.practicalInfo && (
              <section className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-encre">
                  Infos pratiques
                </h2>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {editorialDetails.practicalInfo.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-line bg-papier p-4"
                    >
                      <h3 className="font-semibold text-encre">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border p-4">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-semibold">{formatDate(event.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border p-4">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Heure</p>
                  <p className="font-semibold">{event.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border p-4">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Lieu</p>
                  <p className="font-semibold">{event.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border p-4">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Places</p>
                  <p className="font-semibold">
                    {event.registeredCount}/{event.capacity} inscrits
                  </p>
                </div>
              </div>
            </div>

            <section className="mt-8 overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
              <div className="p-6">
                <h2 className="font-display text-2xl font-bold text-encre">
                  Localisation
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Retrouvez l&apos;adresse de l&apos;association et préparez
                  votre trajet avant l&apos;événement.
                </p>
              </div>
              <iframe
                title={`Carte Google Maps - ${event.title}`}
                src={mapUrl}
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </section>
          </div>

          <div>
            <Card className="overflow-hidden rounded-3xl border-line shadow-soft lg:sticky lg:top-24">
              <CardHeader className="bg-encre text-white">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                      Participation
                    </p>
                    <CardTitle className="mt-2 text-2xl">
                      Réserver sa place
                    </CardTitle>
                  </div>
                  {isFull ? (
                    <Badge variant="secondary">Complet</Badge>
                  ) : (
                    <Badge variant="accent">{spotsLeft} places</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="rounded-2xl bg-papier p-4">
                  <div className="grid gap-4 text-sm">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-primary" />
                      <span>
                        {event.registeredCount}/{event.capacity} inscrits
                      </span>
                    </div>
                  </div>
                </div>

                {isFull ? (
                  <p className="rounded-2xl border border-line bg-papier p-4 text-sm leading-6 text-muted-foreground">
                    Cet événement est complet. Contactez-nous pour la liste
                    d&apos;attente.
                  </p>
                ) : (
                  <EventRegisterForm
                    eventId={event.id}
                    eventTitle={event.title}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </article>
  );
}
