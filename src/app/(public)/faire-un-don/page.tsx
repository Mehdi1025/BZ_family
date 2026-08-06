import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { DonationForm } from "@/components/forms/DonationForm";
import { Heart, Shield, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Faire un don",
  description:
    "Soutenez BZ Family par un don. 100% des fonds sont reversés à nos actions solidaires.",
};

const fundUses = [
  {
    icon: Heart,
    title: "Aide alimentaire",
    description: "40% — Distribution de paniers et repas chauds",
  },
  {
    icon: Target,
    title: "Accompagnement",
    description: "35% — Soutien scolaire et social",
  },
  {
    icon: Shield,
    title: "Événements",
    description: "25% — Organisation d'événements de quartier",
  },
];

export default function DonationPage() {
  return (
    <>
      <section className="bg-accent/10 section-padding">
        <div className="container-bz">
          <SectionHeading
            eyebrow="Soutenez-nous"
            title="Faire un don"
            description="Votre générosité finance directement nos actions sur le terrain. Chaque euro compte."
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-bz grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-bold">Où vont vos dons ?</h2>
            <div className="space-y-4">
              {fundUses.map((use) => (
                <div
                  key={use.title}
                  className="flex gap-4 rounded-xl border border-border p-5"
                >
                  <use.icon className="h-8 w-8 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-semibold">{use.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {use.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              BZ Family est une association reconnue d&apos;intérêt général.
              Vos dons peuvent ouvrir droit à une réduction fiscale de 66%.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-white p-8 shadow-card">
            <DonationForm />
          </div>
        </div>
      </section>
    </>
  );
}
