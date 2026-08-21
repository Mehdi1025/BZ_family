import type { Event, Registration } from "@prisma/client";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import prisma from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin";
import { formatDate, slugify } from "@/lib/utils";
import { getEventImage } from "@/lib/data/images";

type EventWithRegistrations = Event & {
  registrations: Registration[];
  _count: {
    registrations: number;
  };
};

function getDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getRegistrationStatusLabel(status: Registration["status"]) {
  if (status === "CONFIRMED") return "Confirmée";
  if (status === "CANCELLED") return "Annulée";

  return "En attente";
}

function parseCapacity(value: FormDataEntryValue | null) {
  const capacity = Number.parseInt(value?.toString() ?? "", 10);

  return Number.isFinite(capacity) && capacity > 0 ? capacity : null;
}

function parseEventDate(value: FormDataEntryValue | null) {
  const rawDate = value?.toString();
  if (!rawDate) return null;

  const date = new Date(`${rawDate}T00:00:00`);

  return Number.isNaN(date.getTime()) ? null : date;
}

async function getUniqueEventSlug(baseSlug: string) {
  let slug = baseSlug;
  let suffix = 2;

  while (await prisma.event.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

export default async function AdminEventsPage() {
  await requireAdminSession();

  async function createEvent(formData: FormData) {
    "use server";
    await requireAdminSession();

    const title = formData.get("title")?.toString().trim() ?? "";
    const rawSlug = formData.get("slug")?.toString().trim() ?? "";
    const description = formData.get("description")?.toString().trim() ?? "";
    const date = parseEventDate(formData.get("date"));
    const time = formData.get("time")?.toString().trim() ?? "";
    const location = formData.get("location")?.toString().trim() ?? "";
    const capacity = parseCapacity(formData.get("capacity"));
    const imageUrl = formData.get("imageUrl")?.toString().trim() || null;

    if (!title || !description || !date || !time || !location || !capacity) {
      return;
    }

    const baseSlug = slugify(rawSlug || title);
    const slug = await getUniqueEventSlug(baseSlug);

    await prisma.event.create({
      data: {
        title,
        slug,
        description,
        date,
        time,
        location,
        capacity,
        imageUrl,
      },
    });

    revalidatePath("/admin/evenements");
    revalidatePath("/evenements");
  }

  async function updateEvent(formData: FormData) {
    "use server";
    await requireAdminSession();

    const id = formData.get("id")?.toString();
    const title = formData.get("title")?.toString().trim() ?? "";
    const rawSlug = formData.get("slug")?.toString().trim() ?? "";
    const description = formData.get("description")?.toString().trim() ?? "";
    const date = parseEventDate(formData.get("date"));
    const time = formData.get("time")?.toString().trim() ?? "";
    const location = formData.get("location")?.toString().trim() ?? "";
    const capacity = parseCapacity(formData.get("capacity"));
    const imageUrl = formData.get("imageUrl")?.toString().trim() || null;

    if (
      !id ||
      !title ||
      !description ||
      !date ||
      !time ||
      !location ||
      !capacity
    ) {
      return;
    }

    const currentEvent = await prisma.event.findUnique({ where: { id } });
    if (!currentEvent) return;

    const nextSlug = rawSlug ? slugify(rawSlug) : currentEvent.slug;
    const existingEvent = await prisma.event.findUnique({
      where: { slug: nextSlug },
    });

    if (existingEvent && existingEvent.id !== id) return;

    await prisma.event.update({
      where: { id },
      data: {
        title,
        slug: nextSlug,
        description,
        date,
        time,
        location,
        capacity,
        imageUrl,
      },
    });

    revalidatePath("/admin/evenements");
    revalidatePath("/evenements");
    revalidatePath(`/evenements/${currentEvent.slug}`);
    revalidatePath(`/evenements/${nextSlug}`);
  }

  async function deleteEvent(formData: FormData) {
    "use server";
    await requireAdminSession();

    const id = formData.get("id")?.toString();
    if (!id) return;

    const currentEvent = await prisma.event.findUnique({ where: { id } });
    if (!currentEvent) return;

    await prisma.event.delete({ where: { id } });

    revalidatePath("/admin/evenements");
    revalidatePath("/evenements");
    revalidatePath(`/evenements/${currentEvent.slug}`);
  }

  let events: EventWithRegistrations[] = [];

  try {
    events = await prisma.event.findMany({
      orderBy: { date: "asc" },
      include: {
        registrations: {
          orderBy: { createdAt: "desc" },
        },
        _count: { select: { registrations: true } },
      },
    });
  } catch {
    // DB not connected
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const stats = {
    total: events.length,
    upcoming: events.filter((event) => new Date(event.date) >= today).length,
    registrations: events.reduce(
      (total, event) => total + event.registeredCount,
      0
    ),
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Événements</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Création, modification et suppression des événements publics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total événements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              À venir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.upcoming}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Inscriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.registrations}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ajouter un événement</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createEvent} className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input name="title" placeholder="Titre de l'événement" required />
              <Input name="slug" placeholder="Slug optionnel" />
            </div>
            <Textarea
              name="description"
              placeholder="Description courte affichée sur la page événement"
              className="min-h-[120px]"
              required
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Input name="date" type="date" required />
              <Input name="time" type="time" required />
              <Input name="location" placeholder="Lieu" required />
              <Input
                name="capacity"
                type="number"
                min="1"
                placeholder="Capacité"
                required
              />
            </div>
            <ImageUploadField
              name="imageUrl"
              label="Image de l'événement"
              placeholder="URL ou chemin de l'image, ex : /images/events/cuisine.jpg"
              helper="Vous pouvez coller une URL ou importer une image depuis votre PC."
            />
            <div>
              <Button type="submit">Enregistrer l&apos;événement</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {events.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Aucun événement en base. Connectez Supabase et lancez{" "}
            <code className="rounded bg-surface-muted px-2 py-1">
              npm run db:seed
            </code>
            .
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {events.map((event) => {
            const imageUrl = event.imageUrl ?? getEventImage(event.slug);

            return (
              <Card key={event.id}>
                <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex gap-4">
                    <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl bg-surface-muted">
                      <Image
                        src={imageUrl}
                        alt={event.title}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="mb-3 flex flex-wrap gap-2">
                        <Badge
                          variant={
                            new Date(event.date) >= today
                              ? "default"
                              : "secondary"
                          }
                        >
                          {new Date(event.date) >= today ? "À venir" : "Passé"}
                        </Badge>
                        <Badge variant="outline">
                          {event.registeredCount}/{event.capacity} inscrits
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {formatDate(event.date)} à {event.time} —{" "}
                        {event.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/evenements/${event.slug}`} target="_blank">
                        Voir
                      </a>
                    </Button>
                    <form action={deleteEvent}>
                      <input type="hidden" name="id" value={event.id} />
                      <Button type="submit" variant="secondary" size="sm">
                        Supprimer
                      </Button>
                    </form>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>{event.description}</p>
                  <p className="mt-3 text-xs">
                    Slug : {event.slug} · Inscriptions enregistrées :{" "}
                    {event._count.registrations}
                  </p>

                  <details className="mt-6 rounded-2xl border border-line bg-surface-muted/30 p-4">
                    <summary className="w-fit cursor-pointer list-none rounded-lg border border-line bg-white px-4 py-2 text-sm font-semibold text-encre shadow-sm transition hover:bg-surface-muted [&::-webkit-details-marker]:hidden">
                      Voir les inscriptions ({event._count.registrations})
                    </summary>

                    {event.registrations.length === 0 ? (
                      <div className="mt-5 rounded-2xl border border-dashed border-line bg-white p-5 text-center text-sm text-muted-foreground">
                        Aucun participant inscrit pour cet événement.
                      </div>
                    ) : (
                      <div className="mt-5 grid gap-3">
                        {event.registrations.map((registration) => (
                          <div
                            key={registration.id}
                            className="rounded-2xl border border-line bg-white p-4"
                          >
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                              <div>
                                <p className="font-semibold text-encre">
                                  {registration.firstName}{" "}
                                  {registration.lastName}
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                  {registration.email}
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                  {registration.phone}
                                </p>
                              </div>
                              <div className="flex flex-col gap-2 sm:items-end">
                                <Badge
                                  variant={
                                    registration.status === "CONFIRMED"
                                      ? "default"
                                      : "outline"
                                  }
                                >
                                  {getRegistrationStatusLabel(
                                    registration.status
                                  )}
                                </Badge>
                                <p className="text-xs text-muted-foreground">
                                  Inscrit le {formatDate(registration.createdAt)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </details>

                  <details className="mt-6 rounded-2xl border border-line bg-surface-muted/30 p-4">
                    <summary className="w-fit cursor-pointer list-none rounded-lg border border-line bg-white px-4 py-2 text-sm font-semibold text-encre shadow-sm transition hover:bg-surface-muted [&::-webkit-details-marker]:hidden">
                      Modifier
                    </summary>
                    <form action={updateEvent} className="mt-5 grid gap-4">
                      <input type="hidden" name="id" value={event.id} />
                      <div className="grid gap-4 md:grid-cols-2">
                        <Input
                          name="title"
                          defaultValue={event.title}
                          placeholder="Titre"
                          required
                        />
                        <Input
                          name="slug"
                          defaultValue={event.slug}
                          placeholder="Slug"
                        />
                      </div>
                      <Textarea
                        name="description"
                        defaultValue={event.description}
                        placeholder="Description"
                        className="min-h-[120px]"
                        required
                      />
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Input
                          name="date"
                          type="date"
                          defaultValue={getDateInputValue(event.date)}
                          required
                        />
                        <Input
                          name="time"
                          type="time"
                          defaultValue={event.time}
                          required
                        />
                        <Input
                          name="location"
                          defaultValue={event.location}
                          placeholder="Lieu"
                          required
                        />
                        <Input
                          name="capacity"
                          type="number"
                          min="1"
                          defaultValue={event.capacity}
                          placeholder="Capacité"
                          required
                        />
                      </div>
                      <ImageUploadField
                        name="imageUrl"
                        label="Image de l'événement"
                        defaultValue={event.imageUrl ?? ""}
                        placeholder="URL ou chemin de l'image"
                        helper="L'image importée remplacera automatiquement le chemin actuel."
                      />
                      <div>
                        <Button type="submit" size="sm">
                          Enregistrer les modifications
                        </Button>
                      </div>
                    </form>
                  </details>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
