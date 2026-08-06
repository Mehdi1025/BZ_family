import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Heart, Target, Users, HandHeart } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez l'histoire, la mission et les valeurs de l'association BZ Family.",
};

const values = [
  {
    icon: Heart,
    title: "Solidarité",
    description:
      "Nous croyons en la force du collectif pour surmonter les difficultés.",
  },
  {
    icon: Users,
    title: "Inclusion",
    description:
      "Chacun a sa place, quels que soient son origine, son âge ou sa situation.",
  },
  {
    icon: Target,
    title: "Impact local",
    description:
      "Nos actions sont ancrées dans le quartier, au plus près des besoins réels.",
  },
  {
    icon: HandHeart,
    title: "Transparence",
    description:
      "Nous rendons compte de l'utilisation des dons et de l'impact de nos actions.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-primary section-padding text-white">
        <div className="container-bz">
          <SectionHeading
            eyebrow="Notre histoire"
            title="Qui sommes-nous ?"
            description="BZ Family est née de la volonté d'habitants engagés de créer du lien et de la solidarité dans leur quartier."
            align="left"
            className="text-white [&_h2]:text-white [&_p]:text-white/80 [&_span]:bg-white/10 [&_span]:text-white"
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-bz">
          <div className="prose prose-lg max-w-3xl">
            <p>
              Fondée en 2018, BZ Family est une association loi 1901 à but non
              lucratif qui œuvre pour le bien-être des familles et la cohésion
              sociale dans notre quartier parisien.
            </p>
            <p>
              De la distribution alimentaire à l&apos;accompagnement scolaire,
              en passant par l&apos;organisation d&apos;événements culturels et
              sportifs, nous intervenons là où le besoin se fait sentir.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-muted">
        <div className="container-bz">
          <SectionHeading
            eyebrow="Nos valeurs"
            title="Ce qui nous guide"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl bg-white p-6 shadow-soft"
              >
                <value.icon className="mb-4 h-10 w-10 text-primary" />
                <h3 className="mb-2 text-lg font-bold">{value.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
