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

function FacebookMark() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#1877F2] text-[11px] font-bold leading-none text-white"
    >
      f
    </span>
  );
}

function LinkedInMark() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-4 w-4 items-center justify-center rounded-[3px] bg-[#0A66C2] text-[9px] font-bold leading-none text-white"
    >
      in
    </span>
  );
}

const articleDetails: Record<string, ArticleDetail> = {
  "collecte-alimentaire-printemps": {
    author: "Equipe BZ Family",
    readingTime: "4 min",
    body: [
      "La grande collecte alimentaire de printemps a mobilise les habitants, les benevoles et plusieurs partenaires locaux autour d'un objectif simple : renforcer les stocks de produits essentiels pour les familles accompagnees par l'association. Pendant plusieurs jours, chacun a pu contribuer selon ses moyens en deposant des denrees non perissables, des produits d'hygiene ou des articles de premiere necessite.",
      "Cette operation a permis de collecter plus de deux tonnes de produits. Au-dela du volume recolte, l'action a surtout montre la capacite du quartier a se mobiliser rapidement lorsqu'un besoin concret est identifie. Les dons ont ensuite ete tries, ranges et prepares par les benevoles afin d'etre redistribues dans de bonnes conditions.",
      "L'organisation d'une telle collecte demande une preparation importante. Il faut informer les habitants, coordonner les points de depot, verifier les dates de consommation, separer les produits par categorie et preparer les paniers destines aux familles. Chaque etape repose sur une logistique precise et sur l'engagement regulier des personnes impliquees.",
      "Pour BZ Family, cette collecte n'est pas seulement une reponse ponctuelle a une urgence sociale. Elle s'inscrit dans une demarche plus large de solidarite de proximite, ou les habitants deviennent eux-memes acteurs de l'entraide locale. Cette dynamique renforce la confiance entre les familles, les benevoles et les structures partenaires.",
      "Les produits recoltes permettront d'assurer plusieurs distributions dans les semaines a venir. L'association souhaite continuer a developper ce type d'initiative afin de maintenir un soutien regulier, tout en sensibilisant le public aux besoins reels presents dans le quartier.",
    ],
  },
  "programme-accompagnement-scolaire": {
    author: "Equipe pedagogique",
    readingTime: "5 min",
    body: [
      "BZ Family lance un nouveau programme d'accompagnement scolaire gratuit destine aux enfants du quartier. Ce dispositif a ete pense pour offrir un soutien regulier aux eleves qui ont besoin d'aide dans leurs devoirs, d'un cadre de travail calme ou d'un accompagnement methodologique plus personnalise.",
      "Le programme concerne dans un premier temps cinquante enfants. Les seances sont organisees plusieurs fois par semaine avec l'aide de benevoles, d'etudiants et de personnes ayant une experience dans l'accompagnement educatif. L'objectif n'est pas de remplacer l'ecole, mais de completer le travail realise en classe en apportant un suivi de proximite.",
      "Chaque enfant est accueilli dans un cadre bienveillant, avec une attention particuliere portee a son rythme, a ses difficultes et a sa confiance en lui. Les benevoles aident les participants a comprendre les consignes, a organiser leur travail et a progresser dans les matieres ou ils rencontrent le plus de blocages.",
      "Au-dela de l'aide aux devoirs, ce programme vise aussi a renforcer le lien avec les familles. Les parents peuvent echanger avec l'association, suivre l'evolution de leur enfant et exprimer leurs besoins. Cette relation de confiance est essentielle pour construire un accompagnement durable.",
      "L'association prevoit d'evaluer regulierement le dispositif afin de l'adapter aux retours des enfants, des familles et des benevoles. Si les resultats sont positifs, le programme pourra etre etendu a davantage de participants et enrichi avec des ateliers de lecture, d'orientation ou de decouverte culturelle.",
    ],
  },
  "fete-quartier-succes": {
    author: "Coordination evenements",
    readingTime: "4 min",
    body: [
      "La fete de quartier organisee par BZ Family a reuni plus de cinq cents personnes autour d'un moment convivial et intergenerationnel. Habitants, familles, benevoles, partenaires et visiteurs se sont retrouves pour partager une journee placee sous le signe de la rencontre, de la musique et de la solidarite.",
      "L'evenement proposait plusieurs espaces : animations pour les enfants, stands d'information, repas partage, ateliers participatifs et temps d'echange avec les membres de l'association. Cette organisation a permis a chacun de trouver sa place, qu'il vienne pour participer, aider, decouvrir l'association ou simplement passer un moment agreable.",
      "La preparation de cette fete a demande une forte mobilisation. Les benevoles ont participe a l'installation, a l'accueil du public, a la gestion des stands, a la securite des espaces et au rangement final. Leur engagement a ete determinant pour assurer le bon deroulement de la journee.",
      "Cette reussite montre l'importance des evenements locaux dans la construction du lien social. En creant un espace ouvert et accessible, BZ Family permet aux habitants de se rencontrer autrement, de mieux connaitre les actions menees et de s'impliquer progressivement dans la vie du quartier.",
      "L'association souhaite s'appuyer sur cette dynamique pour preparer les prochains rendez-vous. Les retours recueillis permettront d'ameliorer l'organisation, de proposer de nouvelles activites et de continuer a faire de ces temps forts des moments utiles pour toute la communaute.",
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
    <article className="pb-24 pt-10 lg:pb-32 lg:pt-14 xl:pb-40">
      <div className="container-bz">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/actualites">
            <ArrowLeft className="h-4 w-4" />
            Retour aux actualites
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
                  Article publie par {detail.author.toLowerCase()}.
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
                      <FacebookMark />
                      Facebook
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <LinkedInMark />
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
              <Link href="/actualites">Toutes les actualites</Link>
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
