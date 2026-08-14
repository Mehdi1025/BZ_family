import { revalidatePath } from "next/cache";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin";
import { formatDate, slugify } from "@/lib/utils";

export default async function AdminActionsPage() {
  await requireAdminSession();

  async function createAction(formData: FormData) {
    "use server";
    await requireAdminSession();

    const title = formData.get("title")?.toString().trim() ?? "";
    const summary = formData.get("summary")?.toString().trim() ?? "";
    const content = formData.get("content")?.toString().trim() ?? "";
    const category = formData.get("category")?.toString().trim() ?? "Action";
    const imageUrl = formData.get("imageUrl")?.toString().trim() || null;
    const rawSlug = formData.get("slug")?.toString().trim() ?? "";

    if (!title || !summary || !content) return;

    await prisma.action.create({
      data: {
        title,
        slug: slugify(rawSlug || title),
        summary,
        content,
        category,
        imageUrl,
      },
    });

    revalidatePath("/admin/actions");
  }

  async function toggleAction(formData: FormData) {
    "use server";
    await requireAdminSession();
    const id = formData.get("id")?.toString();
    if (!id) return;

    const current = await prisma.action.findUnique({ where: { id } });
    if (!current) return;

    await prisma.action.update({
      where: { id },
      data: { isActive: !current.isActive },
    });

    revalidatePath("/admin/actions");
  }

  async function deleteAction(formData: FormData) {
    "use server";
    await requireAdminSession();
    const id = formData.get("id")?.toString();
    if (!id) return;

    await prisma.action.delete({ where: { id } });
    revalidatePath("/admin/actions");
  }

  let actions: Awaited<ReturnType<typeof prisma.action.findMany>> = [];
  let stats = { total: 0, active: 0 };

  try {
    const [allActions, activeCount] = await Promise.all([
      prisma.action.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.action.count({ where: { isActive: true } }),
    ]);
    actions = allActions;
    stats = { total: allActions.length, active: activeCount };
  } catch {
    // Database unavailable: keep page usable.
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Actions</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Gestion du contenu des actions associatives affichées sur le site.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total des actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Actions actives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.active}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ajouter une action</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createAction} className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input name="title" placeholder="Titre" required />
              <Input name="slug" placeholder="Slug (optionnel)" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Input name="category" placeholder="Catégorie" />
              <Input name="imageUrl" placeholder="URL de l’image" />
            </div>
            <Textarea
              name="summary"
              placeholder="Résumé court"
              className="min-h-[100px]"
              required
            />
            <Textarea
              name="content"
              placeholder="Contenu complet"
              className="min-h-[180px]"
              required
            />
            <div>
              <Button type="submit">Enregistrer l’action</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {actions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Aucune action enregistrée pour le moment.
            </CardContent>
          </Card>
        ) : (
          actions.map((action) => (
            <Card key={action.id}>
              <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <Badge variant={action.isActive ? "default" : "secondary"}>
                      {action.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Badge variant="outline">{action.category}</Badge>
                  </div>
                  <CardTitle>{action.title}</CardTitle>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {action.summary}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Slug : {action.slug} · Créée le {formatDate(action.createdAt)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <form action={toggleAction}>
                    <input type="hidden" name="id" value={action.id} />
                    <Button type="submit" variant="outline" size="sm">
                      {action.isActive ? "Désactiver" : "Activer"}
                    </Button>
                  </form>
                  <form action={deleteAction}>
                    <input type="hidden" name="id" value={action.id} />
                    <Button type="submit" variant="secondary" size="sm">
                      Supprimer
                    </Button>
                  </form>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
