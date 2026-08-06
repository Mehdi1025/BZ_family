import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MediaImage } from "@/components/shared/MediaImage";
import { latestNews } from "@/lib/data/mock";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Suivez l'actualité de BZ Family : actions, événements et impact local.",
};

export default function NewsPage() {
  return (
    <>
      <section className="bg-surface-muted section-padding">
        <div className="container-bz">
          <SectionHeading
            eyebrow="Blog"
            title="Actualités"
            description="Nos dernières nouvelles du terrain."
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-bz grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latestNews.map((article) => (
            <Card key={article.id} className="group overflow-hidden transition-shadow hover:shadow-card">
              <MediaImage
                src={article.imageUrl}
                alt={article.title}
                containerClassName="aspect-[16/10]"
              />
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
      </section>
    </>
  );
}
