import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Merci pour votre don",
  description:
    "Votre don a bien été enregistré. Merci pour votre générosité et votre soutien aux actions de BZ Family.",
};

export default function DonationSuccessPage() {
  return (
    <section className="section-padding bg-papier">
      <div className="container-bz mx-auto max-w-2xl text-center">
        <div className="rounded-[2rem] border border-line bg-white p-10 shadow-card">
          <CheckCircle className="mx-auto mb-6 h-16 w-16 text-green-500" />
          <p className="kicker mb-5 justify-center">Don confirmé</p>
          <h1 className="font-display text-4xl font-bold text-encre">
            Merci pour votre don !
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Votre générosité nous permet de continuer nos actions solidaires.
            Un email de confirmation vous a été envoyé.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href="/">Retour à l&apos;accueil</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/nos-actions">Voir nos actions</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
