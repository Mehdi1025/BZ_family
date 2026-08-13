import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MediaImage } from "@/components/shared/MediaImage";
import { latestNews } from "@/lib/data/mock";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Suivez l'actualité de BZ Family : actions, événements et impact local.",
};

const categories = ["Toutes", "Solidarité", "Éducation", "Événement"];

interface NewsPageProps {
  searchParams?: Promise<{ categorie?: string }>;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;
  const selectedCategory = params?.categorie ?? "Toutes";
  const filteredArticles =
    selectedCategory === "Toutes"
      ? latestNews
      : latestNews.filter((article) => article.category === selectedCategory);
  const featuredArticle = filteredArticles[0];
  const otherArticles = filteredArticles.slice(1);

  return (
    <>
      <section className="relative overflow-hidden bg-encre text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(30,64,175,0.35),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(245,158,11,0.16),transparent_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,28,0.35),rgba(8,15,28,0.95))]" />

        <div className="container-bz relative py-24 lg:py-32">
          <p className="kicker text-white/60 before:from-secondary before:to-secondary/20">
            Actualités
          </p>
          <div className="mt-6 max-w-3xl">
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Nos nouvelles
              <span className="block text-gradient">du terrain</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Retrouvez les dernières actions, rencontres et initiatives menées
              avec les familles, les bénévoles et les partenaires du quartier.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-bz">
          <div className="mb-10 flex flex-wrap gap-3">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              const href =
                category === "Toutes"
                  ? "/actualites"
                  : `/actualites?categorie=${encodeURIComponent(category)}`;

              return (
                <Button
                  key={category}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  asChild
                >
                  <Link href={href}>{category}</Link>
                </Button>
              );
            })}
          </div>

          {featuredArticle ? (
            <>
              <article className="grid overflow-hidden rounded-3xl border border-line bg-white shadow-card lg:grid-cols-[1.05fr_0.95fr]">
                <Link
                  href={`/actualites/${featuredArticle.slug}`}
                  className="group relative block min-h-[320px]"
                >
                  <MediaImage
                    src={featuredArticle.imageUrl}
                    alt={featuredArticle.title}
                    containerClassName="h-full min-h-[320px] rounded-none"
                  />
                </Link>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <div className="mb-5 flex flex-wrap items-center gap-3">
                    <Badge variant="accent">{featuredArticle.category}</Badge>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {formatDate(featuredArticle.publishedAt)}
                    </span>
                  </div>
                  <p className="kicker text-muted-foreground">À la une</p>
                  <Link href={`/actualites/${featuredArticle.slug}`}>
                    <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-encre transition-colors hover:text-primary md:text-4xl">
                      {featuredArticle.title}
                    </h2>
                  </Link>
                  <p className="mt-5 text-base leading-8 text-muted-foreground">
                    {featuredArticle.excerpt}
                  </p>
                  <Button className="mt-8 w-fit" asChild>
                    <Link href={`/actualites/${featuredArticle.slug}`}>
                      Lire l&apos;article
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </article>

              {otherArticles.length > 0 && (
                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {otherArticles.map((article) => (
                    <Card
                      key={article.id}
                      className="group overflow-hidden transition-shadow hover:shadow-card"
                    >
                      <Link href={`/actualites/${article.slug}`}>
                        <MediaImage
                          src={article.imageUrl}
                          alt={article.title}
                          containerClassName="aspect-[16/10]"
                        />
                      </Link>
                      <CardHeader>
                        <div className="mb-2 flex items-center gap-2">
                          <Badge variant="accent">{article.category}</Badge>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {formatDate(article.publishedAt)}
                          </span>
                        </div>
                        <Link href={`/actualites/${article.slug}`}>
                          <h3 className="text-lg font-bold group-hover:text-primary">
                            {article.title}
                          </h3>
                        </Link>
                      </CardHeader>
                      <CardContent>
                        <p className="line-clamp-3 text-sm text-muted-foreground">
                          {article.excerpt}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/actualites/${article.slug}`}>
                            Lire la suite
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="rounded-3xl border border-dashed border-line bg-white p-10 text-center">
              <p className="font-display text-2xl font-bold text-encre">
                Aucun article dans cette catégorie.
              </p>
              <p className="mt-3 text-muted-foreground">
                Revenez bientôt pour découvrir les prochaines nouvelles du terrain.
              </p>
              <Button className="mt-6" asChild>
                <Link href="/actualites">Voir toutes les actualités</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}