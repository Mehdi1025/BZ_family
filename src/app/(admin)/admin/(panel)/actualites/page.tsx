import { revalidatePath } from "next/cache";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin";
import { formatDate, slugify } from "@/lib/utils";

async function getUniqueArticleSlug(baseSlug: string) {
  let slug = baseSlug;
  let suffix = 2;

  while (await prisma.article.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

export default async function AdminNewsPage() {
  await requireAdminSession();

  async function createArticle(formData: FormData) {
    "use server";
    await requireAdminSession();

    const title = formData.get("title")?.toString().trim() ?? "";
    const rawSlug = formData.get("slug")?.toString().trim() ?? "";
    const excerpt = formData.get("excerpt")?.toString().trim() ?? "";
    const content = formData.get("content")?.toString().trim() ?? "";
    const category = formData.get("category")?.toString().trim() ?? "Actualité";
    const imageUrl = formData.get("imageUrl")?.toString().trim() || null;
    const seoTitle = formData.get("seoTitle")?.toString().trim() || null;
    const seoDesc = formData.get("seoDesc")?.toString().trim() || null;
    const shouldPublish = formData.get("published") === "on";

    if (!title || !excerpt || !content || !category) return;

    const baseSlug = slugify(rawSlug || title);
    const slug = await getUniqueArticleSlug(baseSlug);

    await prisma.article.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        category,
        imageUrl,
        seoTitle,
        seoDesc,
        publishedAt: shouldPublish ? new Date() : null,
      },
    });

    revalidatePath("/admin/actualites");
    revalidatePath("/actualites");
  }

  async function toggleArticlePublication(formData: FormData) {
    "use server";
    await requireAdminSession();

    const id = formData.get("id")?.toString();
    if (!id) return;

    const currentArticle = await prisma.article.findUnique({ where: { id } });
    if (!currentArticle) return;

    await prisma.article.update({
      where: { id },
      data: {
        publishedAt: currentArticle.publishedAt ? null : new Date(),
      },
    });

    revalidatePath("/admin/actualites");
    revalidatePath("/actualites");
    revalidatePath(`/actualites/${currentArticle.slug}`);
  }

  async function updateArticle(formData: FormData) {
    "use server";
    await requireAdminSession();

    const id = formData.get("id")?.toString();
    const title = formData.get("title")?.toString().trim() ?? "";
    const rawSlug = formData.get("slug")?.toString().trim() ?? "";
    const excerpt = formData.get("excerpt")?.toString().trim() ?? "";
    const content = formData.get("content")?.toString().trim() ?? "";
    const category = formData.get("category")?.toString().trim() ?? "Actualité";
    const imageUrl = formData.get("imageUrl")?.toString().trim() || null;
    const seoTitle = formData.get("seoTitle")?.toString().trim() || null;
    const seoDesc = formData.get("seoDesc")?.toString().trim() || null;

    if (!id || !title || !excerpt || !content || !category) return;

    const currentArticle = await prisma.article.findUnique({ where: { id } });
    if (!currentArticle) return;

    const nextSlug = rawSlug ? slugify(rawSlug) : currentArticle.slug;
    const existingArticle = await prisma.article.findUnique({
      where: { slug: nextSlug },
    });

    if (existingArticle && existingArticle.id !== id) return;

    await prisma.article.update({
      where: { id },
      data: {
        title,
        slug: nextSlug,
        excerpt,
        content,
        category,
        imageUrl,
        seoTitle,
        seoDesc,
      },
    });

    revalidatePath("/admin/actualites");
    revalidatePath("/actualites");
    revalidatePath(`/actualites/${currentArticle.slug}`);
    revalidatePath(`/actualites/${nextSlug}`);
  }

  async function deleteArticle(formData: FormData) {
    "use server";
    await requireAdminSession();

    const id = formData.get("id")?.toString();
    if (!id) return;

    const currentArticle = await prisma.article.findUnique({ where: { id } });
    if (!currentArticle) return;

    await prisma.article.delete({ where: { id } });

    revalidatePath("/admin/actualites");
    revalidatePath("/actualites");
    revalidatePath(`/actualites/${currentArticle.slug}`);
  }

  let articles: Awaited<ReturnType<typeof prisma.article.findMany>> = [];
  let stats = { total: 0, published: 0, draft: 0 };

  try {
    const [allArticles, publishedCount, draftCount] = await Promise.all([
      prisma.article.findMany({
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      }),
      prisma.article.count({ where: { publishedAt: { not: null } } }),
      prisma.article.count({ where: { publishedAt: null } }),
    ]);

    articles = allArticles;
    stats = {
      total: allArticles.length,
      published: publishedCount,
      draft: draftCount,
    };
  } catch {
    // DB not connected
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Actualités</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Création et suivi des articles publiés sur la page publique.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Publiés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.published}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Brouillons
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.draft}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ajouter une actualité</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createArticle} className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input name="title" placeholder="Titre de l'article" required />
              <Input name="slug" placeholder="Slug optionnel" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Input name="category" placeholder="Catégorie" required />
              <Input name="imageUrl" placeholder="URL ou chemin de l'image" />
            </div>
            <Textarea
              name="excerpt"
              placeholder="Résumé court affiché sur la liste"
              className="min-h-[90px]"
              required
            />
            <Textarea
              name="content"
              placeholder="Contenu complet de l'article"
              className="min-h-[220px]"
              required
            />
            <div className="grid gap-4 md:grid-cols-2">
              <Input name="seoTitle" placeholder="Titre SEO optionnel" />
              <Input name="seoDesc" placeholder="Description SEO optionnelle" />
            </div>
            <label className="flex items-center gap-3 text-sm text-muted-foreground">
              <input
                type="checkbox"
                name="published"
                className="h-4 w-4 rounded border-line"
              />
              Publier maintenant
            </label>
            <div>
              <Button type="submit">Enregistrer l&apos;actualité</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {articles.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Aucun article enregistré pour le moment.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <Card key={article.id}>
              <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <Badge variant={article.publishedAt ? "default" : "secondary"}>
                      {article.publishedAt ? "Publié" : "Brouillon"}
                    </Badge>
                    <Badge variant="outline">{article.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                </div>
                <div className="flex flex-wrap gap-2">
                  <form action={toggleArticlePublication}>
                    <input type="hidden" name="id" value={article.id} />
                    <Button type="submit" variant="outline" size="sm">
                      {article.publishedAt ? "Dépublier" : "Publier"}
                    </Button>
                  </form>
                  <form action={deleteArticle}>
                    <input type="hidden" name="id" value={article.id} />
                    <Button type="submit" variant="secondary" size="sm">
                      Supprimer
                    </Button>
                  </form>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>{article.excerpt}</p>
                <p className="mt-3 text-xs">
                  Slug : {article.slug} ·{" "}
                  {article.publishedAt
                    ? `Publié le ${formatDate(article.publishedAt)}`
                    : `Brouillon créé le ${formatDate(article.createdAt)}`}
                </p>
                <details className="mt-6 rounded-2xl border border-line bg-surface-muted/30 p-4">
                  <summary className="w-fit cursor-pointer list-none rounded-lg border border-line bg-white px-4 py-2 text-sm font-semibold text-encre shadow-sm transition hover:bg-surface-muted [&::-webkit-details-marker]:hidden">
                    Modifier
                  </summary>
                  <form action={updateArticle} className="mt-5 grid gap-4">
                    <input type="hidden" name="id" value={article.id} />
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        name="title"
                        defaultValue={article.title}
                        placeholder="Titre"
                        required
                      />
                      <Input
                        name="slug"
                        defaultValue={article.slug}
                        placeholder="Slug"
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        name="category"
                        defaultValue={article.category}
                        placeholder="Catégorie"
                        required
                      />
                      <Input
                        name="imageUrl"
                        defaultValue={article.imageUrl ?? ""}
                        placeholder="URL ou chemin de l'image"
                      />
                    </div>
                    <Textarea
                      name="excerpt"
                      defaultValue={article.excerpt}
                      placeholder="Résumé court"
                      className="min-h-[90px]"
                      required
                    />
                    <Textarea
                      name="content"
                      defaultValue={article.content}
                      placeholder="Contenu complet"
                      className="min-h-[180px]"
                      required
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        name="seoTitle"
                        defaultValue={article.seoTitle ?? ""}
                        placeholder="Titre SEO"
                      />
                      <Input
                        name="seoDesc"
                        defaultValue={article.seoDesc ?? ""}
                        placeholder="Description SEO"
                      />
                    </div>
                    <div>
                      <Button type="submit" size="sm">
                        Enregistrer les modifications
                      </Button>
                    </div>
                  </form>
                </details>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
