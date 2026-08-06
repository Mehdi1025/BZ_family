import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MediaImage } from "@/components/shared/MediaImage";
import { getActionImage } from "@/lib/data/images";

const actionsData: Record<
  string,
  { title: string; category: string; content: string }
> = {
  "aide-alimentaire": {
    title: "Aide alimentaire",
    category: "Solidarité",
    content:
      "Chaque semaine, nos bénévoles préparent et distribuent des paniers alimentaires aux familles du quartier. En partenariat avec la Banque Alimentaire, nous collectons et redistribuons plus de 2 tonnes de denrées par mois.",
  },
  "accompagnement-scolaire": {
    title: "Accompagnement scolaire",
    category: "Éducation",
    content:
      "Notre programme de soutien scolaire gratuit accueille 50 enfants chaque semaine. Des bénévoles et enseignants retraités les accompagnent dans leurs devoirs et leur orientation.",
  },
  "lien-social": {
    title: "Lien social & événements",
    category: "Social",
    content:
      "Fêtes de quartier, ateliers cuisine, sorties culturelles… Nous organisons plus de 30 événements par an pour renforcer les liens entre les habitants.",
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const action = actionsData[slug];
  if (!action) return { title: "Action introuvable" };
  return {
    title: action.title,
    description: action.content.slice(0, 160),
  };
}

export default async function ActionDetailPage({ params }: Props) {
  const { slug } = await params;
  const action = actionsData[slug];
  if (!action) notFound();

  return (
    <article className="section-padding">
      <div className="container-bz max-w-3xl">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/nos-actions">
            <ArrowLeft className="h-4 w-4" />
            Retour aux actions
          </Link>
        </Button>
        <MediaImage
          src={getActionImage(slug)}
          alt={action.title}
          containerClassName="mb-8 aspect-[16/9] rounded-2xl"
        />
        <Badge variant="accent">{action.category}</Badge>
        <h1 className="mt-4 text-4xl font-bold">{action.title}</h1>
        <div className="prose prose-lg mt-8 max-w-none">
          <p>{action.content}</p>
        </div>
      </div>
    </article>
  );
}
