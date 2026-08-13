import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Share2, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MediaImage } from "@/components/shared/MediaImage";
import { getNewsImage } from "@/lib/data/images";
import { latestNews } from "@/lib/data/mock";
import { formatDate, siteConfig } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

type ArticleDetail = {
  author: string;
  readingTime: string;
  body: string[];
};

const articleDetails: Record<string, ArticleDetail> = {
  "collecte-alimentaire-printemps": {
    author: "Équipe BZ Family",
    readingTime: "4 min",
    body: [
      "La grande collecte alimentaire de printemps a mobilisé les habitants, les bénévoles et plusieurs partenaires locaux autour d'un objectif simple : renforcer les stocks de produits essentiels pour les familles accompagnées par l'association. Pendant plusieurs jours, chacun a pu contribuer selon ses moyens en déposant des denrées non périssables, des produits d'hygiène ou des articles de première nécessité.",
      "Cette opération a permis de collecter plus de deux tonnes de produits. Au-delà du volume récolté, l'action a surtout montré la capacité du quartier à se mobiliser rapidement lorsqu'un besoin concret est identifié. Les dons ont ensuite été triés, rangés et préparés par les bénévoles afin d'être redistribués dans de bonnes conditions.",
      "L'organisation d'une telle collecte demande une préparation importante. Il faut informer les habitants, coordonner les points de dépôt, vérifier les dates de consommation, séparer les produits par catégorie et préparer les paniers destinés aux familles. Chaque étape repose sur une logistique précise et sur l'engagement régulier des personnes impliquées.",
      "Pour BZ Family, cette collecte n'est pas seulement une réponse ponctuelle à une urgence sociale. Elle s'inscrit dans une démarche plus large de solidarité de proximité, où les habitants deviennent eux-mêmes acteurs de l'entraide locale. Cette dynamique renforce la confiance entre les familles, les bénévoles et les structures partenaires.",
      "Les produits récoltés permettront d'assurer plusieurs distributions dans les semaines à venir. L'association souhaite continuer à développer ce type d'initiative afin de maintenir un soutien régulier, tout en sensibilisant le public aux besoins réels présents dans le quartier.",
    ],
  },
  "programme-accompagnement-scolaire": {
    author: "Équipe pédagogique",
    readingTime: "5 min",
    body: [
      "BZ Family lance un nouveau programme d'accompagnement scolaire gratuit destiné aux enfants du quartier. Ce dispositif a été pensé pour offrir un soutien régulier aux élèves qui ont besoin d'aide dans leurs devoirs, d'un cadre de travail calme ou d'un accompagnement méthodologique plus personnalisé.",
      "Le programme concerne dans un premier temps cinquante enfants. Les séances sont organisées plusieurs fois par semaine avec l'aide de bénévoles, d'étudiants et de personnes ayant une expérience dans l'accompagnement éducatif. L'objectif n'est pas de remplacer l'école, mais de compléter le travail réalisé en classe en apportant un suivi de proximité.",
      "Chaque enfant est accueilli dans un cadre bienveillant, avec une attention particulière portée à son rythme, à ses difficultés et à sa confiance en lui. Les bénévoles aident les participants à comprendre les consignes, à organiser leur travail et à progresser dans les matières où ils rencontrent le plus de blocages.",
      "Au-delà de l'aide aux devoirs, ce programme vise aussi à renforcer le lien avec les familles. Les parents peuvent échanger avec l'association, suivre l'évolution de leur enfant et exprimer leurs besoins. Cette relation de confiance est essentielle pour construire un accompagnement durable.",
      "L'association prévoit d'évaluer régulièrement le dispositif afin de l'adapter aux retours des enfants, des familles et des bénévoles. Si les résultats sont positifs, le programme pourra être étendu à davantage de participants et enrichi avec des ateliers de lecture, d'orientation ou de découverte culturelle.",
    ],
  },
  "fete-quartier-succes": {
    author: "Coordination événements",
    readingTime: "4 min",
    body: [
      "La fête de quartier organisée par BZ Family a réuni plus de cinq cents personnes autour d'un moment convivial et intergénérationnel. Habitants, familles, bénévoles, partenaires et visiteurs se sont retrouvés pour partager une journée placée sous le signe de la rencontre, de la musique et de la solidarité.",
      "L'événement proposait plusieurs espaces : animations pour les enfants, stands d'information, repas partagé, ateliers participatifs et temps d'échange avec les membres de l'association. Cette organisation a permis à chacun de trouver sa place, qu'il vienne pour participer, aider, découvrir l'association ou simplement passer un moment agréable.",
      "La préparation de cette fête a demandé une forte mobilisation. Les bénévoles ont participé à l'installation, à l'accueil du public, à la gestion des stands, à la sécurité des espaces et au rangement final. Leur engagement a été déterminant pour assurer le bon déroulement de la journée.",
      "Cette réussite montre l'importance des événements locaux dans la construction du lien social. En créant un espace ouvert et accessible, BZ Family permet aux habitants de se rencontrer autrement, de mieux connaître les actions menées et de s'impliquer progressivement dans la vie du quartier.",
      "L'association souhaite s'appuyer sur cette dynamique pour préparer les prochains rendez-vous. Les retours recueillis permettront d'améliorer l'organisation, de proposer de nouvelles activités et de continuer à faire de ces temps forts des moments utiles pour toute la communauté.",
    ],
  },
};

export function generateStaticParams() {
  return latestNews.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = latestNews.find((a) => a.slug === slug);
  if (!article) return { title: "Article introuvable" };

  const imageUrl = getNewsImage(slug);
  const pageUrl = `${siteConfig.url}/actualites/${article.slug}`;
  const title = `${article.title} | ${siteConfig.name}`;

  return {
    title,
    description: article.excerpt,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      url: pageUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = latestNews.find((a) => a.slug === slug);
  if (!article) notFound();

  const detail = articleDetails[article.slug];
  const relatedArticles = latestNews
    .filter((relatedArticle) => relatedArticle.slug !== article.slug)
    .slice(0, 2);
  const pageUrl = `${siteConfig.url}/actualites/${article.slug}`;

  return (
    <article className="section-padding">
      <div className="container-bz">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/actualites">
            <ArrowLeft className="h-4 w-4" />
            Retour aux actualités
          </Link>
        </Button>

        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Badge variant="accent">{article.category}</Badge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <UserRound className="h-4 w-4" />
              {detail.author}
            </span>
          </div>

          <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight text-encre md:text-5xl lg:text-6xl">
            {article.title}
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-8 text-muted-foreground">
            {article.excerpt}
          </p>

          <MediaImage
            src={getNewsImage(slug)}
            alt={article.title}
            priority
            containerClassName="mt-10 aspect-[16/9] rounded-3xl shadow-card"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="prose prose-lg max-w-none">
              <p className="lead">{article.excerpt}</p>
              {detail.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
                <p className="kicker text-muted-foreground">Lecture</p>
                <p className="mt-4 font-display text-2xl font-bold text-encre">
                  {detail.readingTime}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Article publié par {detail.author.toLowerCase()}.
                </p>
              </div>

              <div className="rounded-3xl border border-line bg-papier-deep p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-encre">
                  <Share2 className="h-4 w-4 text-primary" />
                  Partager
                </div>
                <div className="mt-4 grid gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Facebook
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <section className="mx-auto mt-20 max-w-5xl">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="kicker text-muted-foreground">A lire aussi</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-encre">
                Articles similaires
              </h2>
            </div>
            <Button variant="outline" asChild>
              <Link href="/actualites">Toutes les actualités</Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {relatedArticles.map((relatedArticle) => (
              <Card
                key={relatedArticle.id}
                className="group overflow-hidden rounded-3xl transition-shadow hover:shadow-card"
              >
                <Link href={`/actualites/${relatedArticle.slug}`}>
                  <MediaImage
                    src={getNewsImage(relatedArticle.slug)}
                    alt={relatedArticle.title}
                    containerClassName="aspect-[16/10]"
                  />
                </Link>
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="accent">{relatedArticle.category}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(relatedArticle.publishedAt)}
                    </span>
                  </div>
                  <Link href={`/actualites/${relatedArticle.slug}`}>
                    <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-encre transition-colors group-hover:text-primary">
                      {relatedArticle.title}
                    </h3>
                  </Link>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {relatedArticle.excerpt}
                  </p>
                  <Button variant="ghost" size="sm" asChild className="mt-5">
                    <Link href={`/actualites/${relatedArticle.slug}`}>
                      Lire l&apos;article
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
