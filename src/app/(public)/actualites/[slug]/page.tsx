import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Article } from "@prisma/client";
import { ArrowLeft, ArrowRight, Calendar, Share2, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MediaImage } from "@/components/shared/MediaImage";
import { getNewsImage } from "@/lib/data/images";
import prisma from "@/lib/prisma";
import { formatDate, siteConfig } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

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

function getArticleImage(article: Article) {
  return article.imageUrl ?? getNewsImage(article.slug);
}

function getArticleParagraphs(content: string) {
  const paragraphs = content
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return paragraphs.length > 0
    ? paragraphs
    : ["Le contenu complet de cet article sera disponible prochainement."];
}

function getReadingTime(content: string) {
  const wordsCount = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordsCount / 220));

  return `${minutes} min`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findFirst({
    where: {
      slug,
      publishedAt: {
        not: null,
      },
    },
  });

  if (!article) return { title: "Article introuvable" };

  const imageUrl = getArticleImage(article);
  const pageUrl = `${siteConfig.url}/actualites/${article.slug}`;
  const title = `${article.seoTitle ?? article.title} | ${siteConfig.name}`;
  const description = article.seoDesc ?? article.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
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
  const article = await prisma.article.findFirst({
    where: {
      slug,
      publishedAt: {
        not: null,
      },
    },
  });

  if (!article) notFound();

  const articleAuthor = "Équipe BZ Family";
  const articleParagraphs = getArticleParagraphs(article.content);
  const relatedArticles = await prisma.article.findMany({
    where: {
      publishedAt: {
        not: null,
      },
      slug: {
        not: article.slug,
      },
      category: article.category,
    },
    orderBy: {
      publishedAt: "desc",
    },
    take: 3,
  });
  const pageUrl = `${siteConfig.url}/actualites/${article.slug}`;

  return (
    <article className="pb-24 pt-10 lg:pb-32 lg:pt-14 xl:pb-40">
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
              {formatDate(article.publishedAt ?? article.createdAt)}
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <UserRound className="h-4 w-4" />
              {articleAuthor}
            </span>
          </div>

          <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight text-encre md:text-5xl lg:text-6xl">
            {article.title}
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-8 text-muted-foreground">
            {article.excerpt}
          </p>

          <MediaImage
            src={getArticleImage(article)}
            alt={article.title}
            priority
            containerClassName="mt-10 aspect-[16/9] rounded-3xl shadow-card"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="prose prose-lg max-w-none">
              <p className="lead">{article.excerpt}</p>
              {articleParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
                <p className="kicker text-muted-foreground">Lecture</p>
                <p className="mt-4 font-display text-2xl font-bold text-encre">
                  {getReadingTime(article.content)}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Article publié par {articleAuthor.toLowerCase()}.
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
              <Link href="/actualites">Toutes les actualités</Link>
            </Button>
          </div>

          {relatedArticles.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {relatedArticles.map((relatedArticle) => (
                <Card
                  key={relatedArticle.id}
                  className="group overflow-hidden rounded-3xl transition-shadow hover:shadow-card"
                >
                  <Link href={`/actualites/${relatedArticle.slug}`}>
                    <MediaImage
                      src={getArticleImage(relatedArticle)}
                      alt={relatedArticle.title}
                      containerClassName="aspect-[16/10]"
                    />
                  </Link>
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="accent">{relatedArticle.category}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(relatedArticle.publishedAt ?? relatedArticle.createdAt)}
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
          ) : (
            <div className="rounded-3xl border border-dashed border-line bg-white p-8 text-center">
              <p className="font-display text-2xl font-bold text-encre">
                Aucun autre article disponible.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Les prochaines nouvelles seront ajoutées dès leur publication.
              </p>
            </div>
          )}
        </section>
      </div>
    </article>
  );
}
