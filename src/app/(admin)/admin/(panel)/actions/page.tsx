import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin";
import { formatDate, slugify } from "@/lib/utils";

const demoActions = [
  {
    title: "Aide alimentaire",
    slug: "aide-alimentaire",
    category: "Solidarité",
    summary:
      "Des paniers, des repas et une présence humaine pour soutenir les familles dans les périodes difficiles.",
    imageUrl: "/images/actions/alimentaire.jpg",
    content: [
      "L'aide alimentaire est l'une des actions historiques de BZ Family. Elle répond à une urgence simple : permettre à des familles du quartier de traverser une période compliquée sans perdre leur dignité.",
      "Les bénévoles organisent les collectes, trient les produits, préparent les paniers et assurent les distributions dans un cadre bienveillant. L'objectif est d'apporter une aide concrète, mais aussi d'identifier les autres besoins : isolement, démarches, soutien scolaire ou accompagnement social.",
      "Cette action repose sur la confiance entre habitants, partenaires locaux et bénévoles. Chaque don est utilisé pour renforcer la capacité de l'association à agir vite et au plus près du terrain.",
    ].join("\n\n"),
  },
  {
    title: "Accompagnement scolaire",
    slug: "accompagnement-scolaire",
    category: "Éducation",
    summary:
      "Un soutien régulier pour aider les enfants à reprendre confiance et progresser à leur rythme.",
    imageUrl: "/images/actions/scolaire.jpg",
    content: [
      "L'accompagnement scolaire de BZ Family est pensé comme un espace stable, rassurant et accessible. Les enfants y trouvent un cadre pour faire leurs devoirs, poser leurs questions et consolider les bases vues en classe.",
      "Les séances sont encadrées par des bénévoles formés, avec une attention portée au rythme de chaque enfant. Le but n'est pas seulement de terminer un exercice, mais de redonner confiance et de créer des habitudes de travail durables.",
      "Les familles sont également associées à la démarche. L'association reste disponible pour échanger, orienter et construire un accompagnement cohérent autour de l'enfant.",
    ].join("\n\n"),
  },
  {
    title: "Lien social",
    slug: "lien-social",
    category: "Quartier",
    summary:
      "Des fêtes, ateliers et sorties pour casser l'isolement et renforcer la vie de quartier.",
    imageUrl: "/images/actions/social.jpg",
    content: [
      "Le lien social est au cœur du projet de BZ Family. Les temps collectifs permettent aux habitants de se rencontrer autrement, de sortir de l'isolement et de retrouver une place active dans la vie du quartier.",
      "Ateliers cuisine, fêtes de quartier, sorties familiales et rencontres bénévoles sont organisés tout au long de l'année. Ces rendez-vous simples créent une dynamique collective qui rend les autres actions plus fortes.",
      "Chaque événement est pensé comme une porte d'entrée : venir une première fois, rencontrer l'équipe, proposer une idée, puis peut-être devenir bénévole à son tour.",
    ].join("\n\n"),
  },
];

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
    revalidatePath("/nos-actions");
    revalidatePath(`/nos-actions/${slugify(rawSlug || title)}`);
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
    revalidatePath("/nos-actions");
    revalidatePath(`/nos-actions/${current.slug}`);
  }

  async function updateAction(formData: FormData) {
    "use server";
    await requireAdminSession();

    const id = formData.get("id")?.toString().trim() ?? "";
    const title = formData.get("title")?.toString().trim() ?? "";
    const summary = formData.get("summary")?.toString().trim() ?? "";
    const content = formData.get("content")?.toString().trim() ?? "";
    const category = formData.get("category")?.toString().trim() ?? "Action";
    const imageUrl = formData.get("imageUrl")?.toString().trim() || null;
    const rawSlug = formData.get("slug")?.toString().trim() ?? "";

    if (!id || !title || !summary || !content) return;

    const current = await prisma.action.findUnique({ where: { id } });
    if (!current) return;

    const nextSlug = slugify(rawSlug || title);

    await prisma.action.update({
      where: { id },
      data: {
        title,
        slug: nextSlug,
        summary,
        content,
        category,
        imageUrl,
      },
    });

    revalidatePath("/admin/actions");
    revalidatePath("/nos-actions");
    revalidatePath(`/nos-actions/${current.slug}`);
    revalidatePath(`/nos-actions/${nextSlug}`);
  }

  async function deleteAction(formData: FormData) {
    "use server";
    await requireAdminSession();
    const id = formData.get("id")?.toString();
    if (!id) return;

    const current = await prisma.action.findUnique({ where: { id } });
    await prisma.action.delete({ where: { id } });
    revalidatePath("/admin/actions");
    revalidatePath("/nos-actions");
    if (current) {
      revalidatePath(`/nos-actions/${current.slug}`);
    }
  }

  async function importDemoActions() {
    "use server";
    await requireAdminSession();

    for (const action of demoActions) {
      await prisma.action.upsert({
        where: { slug: action.slug },
        update: {
          title: action.title,
          summary: action.summary,
          content: action.content,
          category: action.category,
          imageUrl: action.imageUrl,
          isActive: true,
        },
        create: {
          ...action,
          isActive: true,
        },
      });
    }

    revalidatePath("/admin/actions");
    revalidatePath("/nos-actions");
    for (const action of demoActions) {
      revalidatePath(`/nos-actions/${action.slug}`);
    }
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
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle>Ajouter une action</CardTitle>
            <form action={importDemoActions}>
              <Button type="submit" variant="outline">
                Importer les 3 actions démo
              </Button>
            </form>
          </div>
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
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                Aucune action enregistrée pour le moment.
              </p>
              <div className="mt-4 flex justify-center">
                <form action={importDemoActions}>
                  <Button type="submit" variant="outline">
                    Charger les actions démo
                  </Button>
                </form>
              </div>
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
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/nos-actions/${action.slug}`} target="_blank">
                      Voir sur le site
                    </Link>
                  </Button>
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
              <CardContent className="pt-0">
                <form action={updateAction} className="grid gap-4 rounded-2xl border border-line bg-muted/20 p-4">
                  <input type="hidden" name="id" value={action.id} />
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input name="title" defaultValue={action.title} placeholder="Titre" required />
                    <Input name="slug" defaultValue={action.slug} placeholder="Slug" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input name="category" defaultValue={action.category} placeholder="Catégorie" />
                    <Input
                      name="imageUrl"
                      defaultValue={action.imageUrl ?? ""}
                      placeholder="URL de l’image"
                    />
                  </div>
                  <Textarea
                    name="summary"
                    defaultValue={action.summary}
                    placeholder="Résumé court"
                    className="min-h-[90px]"
                    required
                  />
                  <Textarea
                    name="content"
                    defaultValue={action.content}
                    placeholder="Contenu complet"
                    className="min-h-[180px]"
                    required
                  />
                  <div className="flex justify-end">
                    <Button type="submit">Mettre à jour</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
