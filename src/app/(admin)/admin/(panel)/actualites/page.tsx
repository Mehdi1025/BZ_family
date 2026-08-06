import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function AdminNewsPage() {
  let articles: Awaited<ReturnType<typeof prisma.article.findMany>> = [];

  try {
    articles = await prisma.article.findMany({
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    // DB not connected
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Actualités</h1>
      {articles.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Aucun article publié.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <Card key={article.id}>
              <CardHeader>
                <CardTitle className="text-lg">{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {article.publishedAt
                  ? formatDate(article.publishedAt)
                  : "Non publié"}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
