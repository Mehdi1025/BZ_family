import Image from "next/image";
import { revalidatePath } from "next/cache";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin";
import { formatDate } from "@/lib/utils";
import { galleryItems as fallbackGalleryItems } from "@/lib/data/ramzi-pages";

export default async function AdminGalleryPage() {
  await requireAdminSession();

  async function addMedia(formData: FormData) {
    "use server";
    await requireAdminSession();

    const albumTitle = formData.get("albumTitle")?.toString().trim() ?? "";
    const mediaUrl = formData.get("mediaUrl")?.toString().trim() ?? "";
    const category = formData.get("category")?.toString().trim() ?? "";
    const type =
      formData.get("type")?.toString().trim() === "VIDEO" ? "VIDEO" : "IMAGE";

    if (!albumTitle || !mediaUrl || !category) return;

    await prisma.galleryMedia.create({
      data: {
        albumTitle,
        mediaUrl,
        category,
        type,
      },
    });

    revalidatePath("/admin/galerie");
    revalidatePath("/galerie");
  }

  async function deleteMedia(formData: FormData) {
    "use server";
    await requireAdminSession();

    const id = formData.get("id")?.toString();
    if (!id) return;

    await prisma.galleryMedia.delete({ where: { id } });
    revalidatePath("/admin/galerie");
    revalidatePath("/galerie");
  }

  async function updateMedia(formData: FormData) {
    "use server";
    await requireAdminSession();

    const id = formData.get("id")?.toString().trim() ?? "";
    const albumTitle = formData.get("albumTitle")?.toString().trim() ?? "";
    const mediaUrl = formData.get("mediaUrl")?.toString().trim() ?? "";
    const category = formData.get("category")?.toString().trim() ?? "";
    const type =
      formData.get("type")?.toString().trim() === "VIDEO" ? "VIDEO" : "IMAGE";

    if (!id || !albumTitle || !mediaUrl || !category) return;

    await prisma.galleryMedia.update({
      where: { id },
      data: {
        albumTitle,
        mediaUrl,
        category,
        type,
      },
    });

    revalidatePath("/admin/galerie");
    revalidatePath("/galerie");
  }

  async function importDemoGallery() {
    "use server";
    await requireAdminSession();

    const existingCount = await prisma.galleryMedia.count();
    if (existingCount > 0) return;

    await prisma.galleryMedia.createMany({
      data: fallbackGalleryItems.map((item) => ({
        albumTitle: item.title,
        mediaUrl: item.src,
        category: item.category,
        type: "IMAGE",
      })),
    });

    revalidatePath("/admin/galerie");
    revalidatePath("/galerie");
  }

  let media: Awaited<ReturnType<typeof prisma.galleryMedia.findMany>> = [];
  let stats = { total: 0, images: 0, videos: 0 };

  try {
    const [allMedia, imageCount, videoCount] = await Promise.all([
      prisma.galleryMedia.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.galleryMedia.count({ where: { type: "IMAGE" } }),
      prisma.galleryMedia.count({ where: { type: "VIDEO" } }),
    ]);

    media = allMedia;
    stats = { total: allMedia.length, images: imageCount, videos: videoCount };
  } catch {
    // Keep the page readable if the database is temporarily unavailable.
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Galerie</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ajout, modification et suppression des médias affichés dans la galerie publique.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Images</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.images}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Vidéos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.videos}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ajouter un média</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form action={addMedia} className="grid gap-4 md:grid-cols-2">
            <Input name="albumTitle" placeholder="Titre de l'album" required />
            <Input name="category" placeholder="Catégorie" required />
            <Input
              name="mediaUrl"
              placeholder="URL du média ou chemin public"
              className="md:col-span-2"
              required
            />
            <select
              name="type"
              className="h-11 rounded-lg border border-line bg-white px-4 text-sm"
              defaultValue="IMAGE"
            >
              <option value="IMAGE">IMAGE</option>
              <option value="VIDEO">VIDEO</option>
            </select>
            <div className="md:col-span-2">
              <Button type="submit">Ajouter le média</Button>
            </div>
          </form>

          <form action={importDemoGallery}>
            <Button type="submit" variant="secondary">
              Importer la galerie de démonstration
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {media.length === 0 ? (
          <Card className="md:col-span-2 xl:col-span-3">
            <CardContent className="py-12 text-center text-muted-foreground">
              Aucun média enregistré pour le moment.
            </CardContent>
          </Card>
        ) : (
          media.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative h-48 bg-surface-muted">
                {item.type === "IMAGE" ? (
                  <Image
                    src={item.mediaUrl}
                    alt={item.albumTitle}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    Prévisualisation vidéo
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="mb-2 flex flex-wrap gap-2">
                  <Badge variant="outline">{item.category}</Badge>
                  <Badge variant="secondary">{item.type}</Badge>
                </div>
                <CardTitle>{item.albumTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="truncate text-sm text-muted-foreground">
                  {item.mediaUrl}
                </p>
                <p className="text-xs text-muted-foreground">
                  Ajouté le {formatDate(item.createdAt)}
                </p>
                <div className="space-y-3 rounded-2xl border border-line bg-muted/20 p-4">
                  <form action={updateMedia} className="grid gap-3">
                    <input type="hidden" name="id" value={item.id} />
                    <Input
                      name="albumTitle"
                      defaultValue={item.albumTitle}
                      placeholder="Titre"
                      required
                    />
                    <Input
                      name="category"
                      defaultValue={item.category}
                      placeholder="Catégorie"
                      required
                    />
                    <Input
                      name="mediaUrl"
                      defaultValue={item.mediaUrl}
                      placeholder="URL du média"
                      required
                    />
                    <select
                      name="type"
                      className="h-11 rounded-lg border border-line bg-white px-4 text-sm"
                      defaultValue={item.type}
                    >
                      <option value="IMAGE">IMAGE</option>
                      <option value="VIDEO">VIDEO</option>
                    </select>
                    <div>
                      <Button type="submit" size="sm">
                        Enregistrer les modifications
                      </Button>
                    </div>
                  </form>
                  <form action={deleteMedia}>
                    <input type="hidden" name="id" value={item.id} />
                    <Button type="submit" variant="secondary" size="sm">
                      Supprimer
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
