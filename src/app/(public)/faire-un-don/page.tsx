import type { Metadata } from "next";
import { Gift, Heart, ShieldCheck } from "lucide-react";
import { DonationForm } from "@/components/forms/DonationForm";
import { Badge } from "@/components/ui/badge";
import { FadeUp, SectionIntro } from "@/components/shared/FadeUp";

export const metadata: Metadata = {
  title: "Faire un don",
  description:
    "Soutenez BZ Family par un don sécurisé. Vos contributions financent l'aide alimentaire, l'accompagnement scolaire et les actions de lien social.",
};

const fundUses = [
  {
    label: "Aide alimentaire",
    percent: 40,
    text: "Achat de denrées, paniers solidaires, repas chauds et logistique de distribution.",
  },
  {
    label: "Accompagnement scolaire",
    percent: 35,
    text: "Matériel pédagogique, ateliers, fournitures et organisation des séances.",
  },
  {
    label: "Lien social",
    percent: 25,
    text: "Événements de quartier, sorties familles, ateliers et temps de rencontre.",
  },
];

export default function DonatePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-encre text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(217,119,6,0.32),transparent_35%),radial-gradient(circle_at_85%_20%,rgba(59,130,246,0.24),transparent_32%)]" />
        <div className="container-bz relative py-28 lg:py-36">
          <SectionIntro
            label="Soutenir"
            title="Faire un don"
            description="Chaque contribution aide BZ Family à financer des actions concrètes et visibles pour les familles du quartier."
            theme="dark"
          />
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-bz grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <FadeUp>
            <div className="rounded-[2rem] border border-line bg-papier p-8">
              <Badge variant="accent" className="mb-6">Impact direct</Badge>
              <h2 className="font-display text-4xl font-bold text-encre">
                Où vont vos dons ?
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Les dons permettent de sécuriser les actions essentielles de
                l&apos;association et de répondre plus vite aux besoins du terrain.
              </p>

              <div className="mt-8 space-y-6">
                {fundUses.map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <span className="font-semibold text-encre">{item.label}</span>
                      <span className="font-display text-xl font-bold text-primary">
                        {item.percent}%
                      </span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-white">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="rounded-[2rem] border border-line bg-white p-8 shadow-card">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Gift className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-display text-3xl font-bold text-encre">
                    Don sécurisé
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Paiement en ligne via Stripe.
                  </p>
                </div>
              </div>
              <DonationForm />
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-papier py-20">
        <div className="container-bz grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-7 shadow-soft">
            <Heart className="mb-5 h-8 w-8 text-accent" />
            <h2 className="font-display text-2xl font-bold text-encre">
              Un don, même petit, compte
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              La régularité des soutiens permet d&apos;anticiper les besoins et de
              maintenir les actions dans la durée.
            </p>
          </div>
          <div className="rounded-2xl bg-encre p-7 text-white shadow-soft">
            <ShieldCheck className="mb-5 h-8 w-8 text-jaune" />
            <h2 className="font-display text-2xl font-bold">
              Réduction fiscale possible
            </h2>
            <p className="mt-3 leading-relaxed text-white/70">
              Selon votre situation, un don à une association peut ouvrir droit à
              une réduction fiscale pouvant aller jusqu&apos;à 66 %. Un reçu peut être
              fourni si nécessaire.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
