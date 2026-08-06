import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Merci pour votre don",
  description: "Votre don a bien été enregistré. Merci pour votre générosité !",
};

export default function DonationSuccessPage() {
  return (
    <section className="section-padding">
      <div className="container-bz mx-auto max-w-lg text-center">
        <CheckCircle className="mx-auto mb-6 h-16 w-16 text-green-500" />
        <h1 className="text-3xl font-bold">Merci pour votre don !</h1>
        <p className="mt-4 text-muted-foreground">
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
    </section>
  );
}
