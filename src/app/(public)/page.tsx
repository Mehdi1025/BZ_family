import type { Metadata } from "next";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { Stats } from "@/components/home/Stats";
import { Actions } from "@/components/home/Actions";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { LatestNews } from "@/components/home/LatestNews";
import { Testimonials } from "@/components/home/Testimonials";
import { Partners } from "@/components/home/Partners";
import { VolunteerCTA } from "@/components/home/VolunteerCTA";

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "BZ Family — Association de quartier loi 1901. Aide alimentaire, accompagnement scolaire et lien social. Devenez bénévole ou faites un don.",
  openGraph: {
    title: "BZ Family — Ensemble, on change le quartier pour de vrai",
    description:
      "Association de quartier : nourrir, accompagner, rassembler. 850 familles accompagnées.",
  },
};

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <div className="bg-white text-encre">
        <Manifesto />
        <Stats />
        <Actions />
        <UpcomingEvents />
        <LatestNews />
        <Testimonials />
        <Partners />
        <VolunteerCTA />
      </div>
    </>
  );
}

