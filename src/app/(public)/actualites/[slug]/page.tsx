import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MediaImage } from "@/components/shared/MediaImage";
import { getNewsImage } from "@/lib/data/images";
import { latestNews } from "@/lib/data/mock";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = latestNews.find((a) => a.slug === slug);
  if (!article) return { title: "Article introuvable" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = latestNews.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <article className="section-padding">
      <div className="container-bz max-w-3xl">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/actualites">
            <ArrowLeft className="h-4 w-4" />
            Retour aux actualités
          </Link>
        </Button>

        <MediaImage
          src={getNewsImage(slug)}
          alt={article.title}
          containerClassName="mb-6 aspect-[16/9] rounded-2xl"
        />
        <div className="mb-4 flex items-center gap-3">
          <Badge variant="accent">{article.category}</Badge>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {formatDate(article.publishedAt)}
          </span>
        </div>
        <h1 className="text-4xl font-bold">{article.title}</h1>
        <div className="prose prose-lg mt-8 max-w-none">
          <p className="lead text-xl text-muted-foreground">{article.excerpt}</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </div>
      </div>
    </article>
  );
}
