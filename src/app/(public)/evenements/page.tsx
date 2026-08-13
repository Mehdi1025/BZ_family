import type { Metadata } from "next";
import Link from "next/link";
import type { Event } from "@prisma/client";
import { ArrowUpRight, Calendar, Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/shared/FadeUp";
import { MediaImage } from "@/components/shared/MediaImage";
import prisma from "@/lib/prisma";
import { getEventImage, siteImages } from "@/lib/data/images";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Événements",
  description:
    "Découvrez et inscrivez-vous aux prochains événements de BZ Family.",
};

export const dynamic = "force-dynamic";

function getEventGroups(events: Event[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return {
    upcoming: sortedEvents.filter((event) => new Date(event.date) >= today),
    past: sortedEvents
      .filter((event) => new Date(event.date) < today)
      .reverse(),
  };
}

function EventCard({
  event,
  index,
}: {
  event: Event;
  index: number;
}) {
  const spotsLeft = event.capacity - event.registeredCount;
  const imageUrl = event.imageUrl ?? getEventImage(event.slug);

  return (
    <FadeUp delay={index * 0.08}>
      <article className="group h-full overflow-hidden rounded-[2rem] border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <Link href={`/evenements/${event.slug}`} className="block h-full">
          <div className="relative">
            <MediaImage
              src={imageUrl}
              alt={event.title}
              containerClassName="aspect-[16/10]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
            />
            <div className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-encre shadow-sm">
              {formatDate(event.date)}
            </div>
            {spotsLeft <= 10 && spotsLeft > 0 && (
              <Badge className="absolute bottom-4 right-4" variant="accent">
                {spotsLeft} places restantes
              </Badge>
            )}
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <span className="font-display text-xs font-bold tabular-nums text-primary/45">
                  0{index + 1}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-encre transition-colors group-hover:text-primary">
                  {event.title}
                </h3>
              </div>
              <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-line transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
            </div>

            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {event.description}
            </p>

            <div className="mt-6 grid gap-3 border-t border-line pt-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                {event.time}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                {event.location}
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                {event.registeredCount}/{event.capacity} inscrits
              </span>
            </div>
          </div>
        </Link>
      </article>
    </FadeUp>
  );
}

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: {
      date: "asc",
    },
  });

  const { upcoming, past } = getEventGroups(events);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-encre text-white">
        <MediaImage
          src={siteImages.events.cuisine}
          alt="Atelier solidaire organisé par BZ Family"
          priority
          sizes="100vw"
          containerClassName="absolute inset-0 -z-20"
          className="scale-105 opacity-70"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,15,28,0.98)_0%,rgba(8,15,28,0.82)_45%,rgba(8,15,28,0.35)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(217,119,6,0.30),transparent_36%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.25),transparent_34%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-encre to-transparent" />

        <div className="container-bz relative grid min-h-[72vh] items-end gap-10 py-24 lg:grid-cols-[1.05fr_0.75fr] lg:py-32">
          <div className="max-w-4xl">
            <p className="kicker mb-6 text-white/70 before:from-accent before:to-accent/20">
              Agenda
            </p>
            <h1 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[0.95] tracking-tight">
              Nos événements
              <span className="block text-gradient">solidaires</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">
              Ateliers, marches solidaires et rencontres de terrain : retrouvez
              les prochains rendez-vous de BZ Family et inscrivez-vous en
              quelques clics.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="#evenements-a-venir"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-encre shadow-soft transition hover:bg-accent hover:text-white"
              >
                À venir
              </Link>
              <Link
                href="#evenements-passes"
                className="rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/15"
              >
                Passés
              </Link>
            </div>
          </div>

          <div className="hidden rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-card backdrop-blur-md lg:block">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/50">
              Agenda en bref
            </p>
            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                <span className="text-3xl font-bold">{upcoming.length}</span>
                <p className="mt-1 text-sm text-white/60">
                  rendez-vous à venir
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                <span className="text-3xl font-bold">{past.length}</span>
                <p className="mt-1 text-sm text-white/60">
                  actions déjà organisées
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="evenements-a-venir" className="section-padding bg-white">
        <div className="container-bz">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="kicker">Prochains rendez-vous</p>
              <h2 className="mt-4 font-display text-4xl font-bold text-encre md:text-5xl">
                À venir
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              Choisissez un atelier, une rencontre ou une action solidaire et
              consultez les informations complètes avant de vous inscrire.
            </p>
          </div>

          {upcoming.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {upcoming.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <FadeUp>
              <div className="rounded-[2rem] border border-dashed border-line bg-papier-deep p-8 text-center">
                <Calendar className="mx-auto h-10 w-10 text-primary" />
                <h3 className="mt-4 font-display text-2xl font-bold text-encre">
                  Aucun événement à venir pour le moment
                </h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  L&apos;agenda sera mis à jour prochainement. Vous pouvez nous
                  contacter pour proposer une action ou rejoindre l&apos;équipe
                  bénévole.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
                >
                  Nous contacter
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </FadeUp>
          )}
        </div>
      </section>

      <section id="evenements-passes" className="section-padding bg-papier-deep">
        <div className="container-bz">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="kicker">Archives</p>
              <h2 className="mt-4 font-display text-4xl font-bold text-encre md:text-5xl">
                Événements passés
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              Retrouvez les actions déjà organisées par l&apos;association et
              gardez une trace des temps forts du quartier.
            </p>
          </div>

          {past.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {past.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <FadeUp>
              <div className="rounded-[2rem] border border-dashed border-line bg-white p-8 text-center">
                <Calendar className="mx-auto h-10 w-10 text-primary" />
                <h3 className="mt-4 font-display text-2xl font-bold text-encre">
                  Aucun événement passé à afficher
                </h3>
              </div>
            </FadeUp>
          )}
        </div>
      </section>
    </>
  );
}
