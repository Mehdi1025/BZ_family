import type { Partner, PartnerType } from "@prisma/client";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { requireAdminSession } from "@/lib/admin";
import prisma from "@/lib/prisma";

const partnerTypes: Array<{ value: PartnerType; label: string }> = [
  { value: "INSTITUTIONAL", label: "Institutionnel" },
  { value: "COMMUNITY", label: "Association" },
  { value: "CORPORATE", label: "Entreprise / mécène" },
  { value: "MEDIA", label: "Média" },
];

const partnerTypeLabels: Record<PartnerType, string> = {
  INSTITUTIONAL: "Institutionnel",
  CORPORATE: "Entreprise / mécène",
  COMMUNITY: "Association",
  MEDIA: "Média",
};

function getPartnerType(value: FormDataEntryValue | null): PartnerType {
  const type = value?.toString();

  return partnerTypes.some((item) => item.value === type)
    ? (type as PartnerType)
    : "COMMUNITY";
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function PartnerLogoPreview({ partner }: { partner: Partner }) {
  if (!partner.logoUrl) {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-muted text-sm font-bold text-primary">
        {getInitials(partner.name)}
      </div>
    );
  }

  return (
    <div className="flex h-16 w-24 items-center justify-center rounded-2xl bg-surface-muted p-3">
      <Image
        src={partner.logoUrl}
        alt={`Logo ${partner.name}`}
        width={120}
        height={72}
        className="max-h-12 w-auto object-contain"
      />
    </div>
  );
}

export default async function AdminPartnersPage() {
  await requireAdminSession();

  async function createPartner(formData: FormData) {
    "use server";
    await requireAdminSession();

    const name = formData.get("name")?.toString().trim() ?? "";
    const logoUrl = formData.get("logoUrl")?.toString().trim() || null;
    const description =
      formData.get("description")?.toString().trim() || null;
    const websiteUrl = formData.get("websiteUrl")?.toString().trim() || null;
    const type = getPartnerType(formData.get("type"));

    if (!name) return;

    await prisma.partner.create({
      data: {
        name,
        logoUrl,
        description,
        websiteUrl,
        type,
      },
    });

    revalidatePath("/admin/partenaires");
    revalidatePath("/partenaires");
  }

  async function updatePartner(formData: FormData) {
    "use server";
    await requireAdminSession();

    const id = formData.get("id")?.toString();
    const name = formData.get("name")?.toString().trim() ?? "";
    const logoUrl = formData.get("logoUrl")?.toString().trim() || null;
    const description =
      formData.get("description")?.toString().trim() || null;
    const websiteUrl = formData.get("websiteUrl")?.toString().trim() || null;
    const type = getPartnerType(formData.get("type"));

    if (!id || !name) return;

    await prisma.partner.update({
      where: { id },
      data: {
        name,
        logoUrl,
        description,
        websiteUrl,
        type,
      },
    });

    revalidatePath("/admin/partenaires");
    revalidatePath("/partenaires");
  }

  async function deletePartner(formData: FormData) {
    "use server";
    await requireAdminSession();

    const id = formData.get("id")?.toString();
    if (!id) return;

    await prisma.partner.delete({ where: { id } });

    revalidatePath("/admin/partenaires");
    revalidatePath("/partenaires");
  }

  let partners: Partner[] = [];

  try {
    partners = await prisma.partner.findMany({
      orderBy: [{ type: "asc" }, { name: "asc" }],
    });
  } catch {
    // DB not connected
  }

  const stats = {
    total: partners.length,
    institutional: partners.filter((partner) => partner.type === "INSTITUTIONAL")
      .length,
    community: partners.filter((partner) => partner.type === "COMMUNITY").length,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Partenaires</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Gestion des partenaires affichés sur la page publique.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total partenaires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Institutionnels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.institutional}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Associations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.community}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ajouter un partenaire</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createPartner} className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input name="name" placeholder="Nom du partenaire" required />
              <Input
                name="logoUrl"
                placeholder="/images/partners/logo.png"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                name="websiteUrl"
                placeholder="https://www.partenaire.fr"
              />
              <select
                name="type"
                defaultValue="COMMUNITY"
                className="h-11 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {partnerTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <Textarea
              name="description"
              placeholder="Description courte du partenariat"
              className="min-h-[110px]"
            />
            <div>
              <Button type="submit">Enregistrer le partenaire</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {partners.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Aucun partenaire enregistré pour le moment.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {partners.map((partner) => (
            <Card key={partner.id}>
              <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex gap-4">
                  <PartnerLogoPreview partner={partner} />
                  <div>
                    <div className="mb-3 flex flex-wrap gap-2">
                      <Badge variant="secondary">
                        {partnerTypeLabels[partner.type]}
                      </Badge>
                      {partner.websiteUrl ? (
                        <Badge variant="outline">Lien externe</Badge>
                      ) : null}
                    </div>
                    <CardTitle className="text-lg">{partner.name}</CardTitle>
                    {partner.description ? (
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                        {partner.description}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {partner.websiteUrl ? (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={partner.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Voir le site
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  ) : null}
                  <form action={deletePartner}>
                    <input type="hidden" name="id" value={partner.id} />
                    <Button type="submit" variant="secondary" size="sm">
                      Supprimer
                    </Button>
                  </form>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="text-xs">Logo : {partner.logoUrl ?? "Aucun"}</p>

                <details className="mt-6 rounded-2xl border border-line bg-surface-muted/30 p-4">
                  <summary className="w-fit cursor-pointer list-none rounded-lg border border-line bg-white px-4 py-2 text-sm font-semibold text-encre shadow-sm transition hover:bg-surface-muted [&::-webkit-details-marker]:hidden">
                    Modifier
                  </summary>
                  <form action={updatePartner} className="mt-5 grid gap-4">
                    <input type="hidden" name="id" value={partner.id} />
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        name="name"
                        defaultValue={partner.name}
                        placeholder="Nom du partenaire"
                        required
                      />
                      <Input
                        name="logoUrl"
                        defaultValue={partner.logoUrl ?? ""}
                        placeholder="/images/partners/logo.png"
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        name="websiteUrl"
                        defaultValue={partner.websiteUrl ?? ""}
                        placeholder="https://www.partenaire.fr"
                      />
                      <select
                        name="type"
                        defaultValue={partner.type}
                        className="h-11 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        {partnerTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Textarea
                      name="description"
                      defaultValue={partner.description ?? ""}
                      placeholder="Description courte du partenariat"
                      className="min-h-[110px]"
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
          ))}
        </div>
      )}
    </div>
  );
}
