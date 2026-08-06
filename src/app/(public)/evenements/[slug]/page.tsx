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
import { upcomingEvents } from "@/lib/data/mock";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = upcomingEvents.find((e) => e.slug === slug);
  if (!event) return { title: "Événement introuvable" };
  return {
    title: event.title,
    description: event.description,
    openGraph: {
      type: "website",
      title: event.title,
      description: event.description,
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = upcomingEvents.find((e) => e.slug === slug);
  if (!event) notFound();

  const spotsLeft = event.capacity - event.registeredCount;
  const isFull = spotsLeft <= 0;

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
              src={getEventImage(slug)}
              alt={event.title}
              containerClassName="mb-6 aspect-[16/9] rounded-2xl"
            />
            <h1 className="text-4xl font-bold">{event.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {event.description}
            </p>

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
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Inscription</CardTitle>
                {isFull ? (
                  <Badge variant="secondary">Complet</Badge>
                ) : (
                  <Badge variant="accent">{spotsLeft} places disponibles</Badge>
                )}
              </CardHeader>
              <CardContent>
                {isFull ? (
                  <p className="text-sm text-muted-foreground">
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
