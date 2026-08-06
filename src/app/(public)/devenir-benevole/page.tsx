import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { VolunteerForm } from "@/components/forms/VolunteerForm";

export const metadata: Metadata = {
  title: "Devenir bénévole",
  description:
    "Rejoignez l'équipe de bénévoles BZ Family et participez à nos actions solidaires.",
};

const opportunities = [
  "Distribution alimentaire",
  "Accompagnement scolaire",
  "Animation d'événements",
  "Communication & réseaux sociaux",
  "Logistique & organisation",
];

export default function VolunteerPage() {
  return (
    <>
      <section className="bg-primary section-padding text-white">
        <div className="container-bz">
          <SectionHeading
            eyebrow="Engagement"
            title="Devenez bénévole"
            description="Votre temps est notre plus grande richesse. Rejoignez une communauté engagée et bienveillante."
            align="left"
            className="text-white [&_h2]:text-white [&_p]:text-white/80 [&_span]:bg-white/10 [&_span]:text-white"
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-bz grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-bold">Opportunités de bénévolat</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {opportunities.map((opp) => (
                <Card key={opp}>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Badge variant="secondary">{opp}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-6 text-muted-foreground">
              Aucune expérience requise — seulement l&apos;envie de donner et de
              partager. Nous vous accompagnons à chaque étape.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface-muted p-8">
            <h2 className="mb-6 text-xl font-bold">Formulaire de candidature</h2>
            <VolunteerForm />
          </div>
        </div>
      </section>
    </>
  );
}
