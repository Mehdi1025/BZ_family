"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { upcomingEvents } from "@/lib/data/mock";
import { EditorialHeading } from "@/components/shared/EditorialHeading";
import { formatDate } from "@/lib/utils";

export function UpcomingEvents() {
  return (
    <section className="relative bg-white">
      <div className="lg:grid lg:grid-cols-2">
        {/* Sticky intro */}
        <div className="container-bz py-24 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
          <EditorialHeading
            index="02"
            label="Agenda"
            title="Prochains rendez-vous"
            description="Ateliers, marches, forums — des moments concrets pour agir et se rencontrer dans le quartier."
            href="/evenements"
            linkLabel="Voir l'agenda complet"
          />
        </div>

        {/* Scrolling events list */}
        <div className="border-t border-line lg:border-l lg:border-t-0">
          {upcomingEvents.map((event, i) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group border-b border-line last:border-b-0"
            >
              <Link
                href={`/evenements/${event.slug}`}
                className="grid gap-6 p-6 sm:grid-cols-[140px_1fr] sm:items-center sm:p-10 lg:p-12"
              >
                <div className="relative aspect-square overflow-hidden rounded-sm sm:aspect-[4/5]">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    sizes="140px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-display text-xs font-bold tabular-nums text-primary/50">
                        0{i + 1}
                      </span>
                      <time className="mt-2 block text-sm font-medium text-primary">
                        {formatDate(event.date)} · {event.time}
                      </time>
                    </div>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-line transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-bold text-encre transition-colors group-hover:text-primary lg:text-3xl">
                    {event.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span>{event.location}</span>
                    <span className="hidden h-1 w-1 rounded-full bg-line sm:block" />
                    <span>
                      {event.registeredCount}/{event.capacity} inscrits
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
