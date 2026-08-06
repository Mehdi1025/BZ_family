import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MediaImage } from "@/components/shared/MediaImage";
import { upcomingEvents } from "@/lib/data/mock";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Événements",
  description: "Découvrez et inscrivez-vous aux prochains événements de BZ Family.",
};

export default function EventsPage() {
  return (
    <>
      <section className="bg-primary section-padding text-white">
        <div className="container-bz">
          <SectionHeading
            eyebrow="Agenda"
            title="Nos événements"
            description="Rencontres, ateliers, marches solidaires… Rejoignez-nous !"
            align="left"
            className="text-white [&_h2]:text-white [&_p]:text-white/80 [&_span]:bg-white/10 [&_span]:text-white"
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-bz grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => {
            const spotsLeft = event.capacity - event.registeredCount;
            return (
              <Card key={event.id} className="group overflow-hidden transition-shadow hover:shadow-card">
                <div className="relative">
                  <MediaImage
                    src={event.imageUrl}
                    alt={event.title}
                    containerClassName="aspect-[16/10]"
                  />
                  {spotsLeft <= 10 && spotsLeft > 0 && (
                    <Badge className="absolute right-3 top-3" variant="accent">
                      {spotsLeft} places restantes
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <Link href={`/evenements/${event.slug}`}>
                    <h3 className="text-lg font-bold group-hover:text-primary">
                      {event.title}
                    </h3>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    {formatDate(event.date)}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    {event.time}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {event.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    {event.registeredCount}/{event.capacity} inscrits
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" asChild>
                    <Link href={`/evenements/${event.slug}`}>
                      Voir & s&apos;inscrire
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
}
