import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MediaImage } from "@/components/shared/MediaImage";
import { getActionImage } from "@/lib/data/images";

export const metadata: Metadata = {
  title: "Nos actions",
  description: "Découvrez les actions solidaires menées par BZ Family dans le quartier.",
};

const actions = [
  {
    slug: "aide-alimentaire",
    title: "Aide alimentaire",
    summary: "Distribution hebdomadaire de paniers et repas chauds aux familles.",
    category: "Solidarité",
  },
  {
    slug: "accompagnement-scolaire",
    title: "Accompagnement scolaire",
    summary: "Soutien gratuit pour les enfants du quartier en difficulté scolaire.",
    category: "Éducation",
  },
  {
    slug: "lien-social",
    title: "Lien social & événements",
    summary: "Fêtes de quartier, ateliers et activités pour créer du lien.",
    category: "Social",
  },
];

export default function ActionsPage() {
  return (
    <>
      <section className="bg-primary section-padding text-white">
        <div className="container-bz">
          <SectionHeading
            eyebrow="Nos missions"
            title="Nos actions sur le terrain"
            description="Des initiatives concrètes pour améliorer le quotidien des habitants."
            align="left"
            className="text-white [&_h2]:text-white [&_p]:text-white/80 [&_span]:bg-white/10 [&_span]:text-white"
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-bz grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {actions.map((action) => (
            <Card key={action.slug} className="group overflow-hidden transition-shadow hover:shadow-card">
              <MediaImage
                src={getActionImage(action.slug)}
                alt={action.title}
                containerClassName="aspect-[16/10]"
              />
              <CardHeader>
                <Badge variant="accent">{action.category}</Badge>
                <Link href={`/nos-actions/${action.slug}`}>
                  <h3 className="mt-2 text-xl font-bold group-hover:text-primary">
                    {action.title}
                  </h3>
                </Link>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{action.summary}</p>
                <Button variant="ghost" size="sm" className="mt-4" asChild>
                  <Link href={`/nos-actions/${action.slug}`}>
                    En savoir plus
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
