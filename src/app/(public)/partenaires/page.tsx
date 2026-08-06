import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { partners } from "@/lib/data/mock";

export const metadata: Metadata = {
  title: "Partenaires",
  description: "Découvrez les partenaires qui soutiennent BZ Family.",
};

export default function PartnersPage() {
  return (
    <>
      <section className="bg-primary section-padding text-white">
        <div className="container-bz">
          <SectionHeading
            eyebrow="Réseau"
            title="Nos partenaires"
            description="Ensemble, nous allons plus loin. Merci à tous nos partenaires."
            align="left"
            className="text-white [&_h2]:text-white [&_p]:text-white/80 [&_span]:bg-white/10 [&_span]:text-white"
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-bz grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <Card key={partner.id}>
              <CardHeader>
                <div className="flex h-20 items-center justify-center rounded-lg bg-surface-muted">
                  <span className="text-lg font-bold text-muted-foreground">
                    {partner.name}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">Partenaire</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
