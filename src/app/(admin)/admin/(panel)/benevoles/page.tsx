import Link from "next/link";
import { revalidatePath } from "next/cache";
import type { VolunteerStatus } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin";
import { formatDate } from "@/lib/utils";

type VolunteerSearchParams = Promise<{
  status?: string;
}>;

const volunteerStatuses: VolunteerStatus[] = [
  "PENDING",
  "REVIEWED",
  "ACCEPTED",
  "REJECTED",
];

function isVolunteerStatus(status: string): status is VolunteerStatus {
  return volunteerStatuses.includes(status as VolunteerStatus);
}

function getStatusLabel(status: VolunteerStatus) {
  if (status === "PENDING") return "En attente";
  if (status === "REVIEWED") return "Examinée";
  if (status === "ACCEPTED") return "Acceptée";

  return "Refusée";
}

function getStatusVariant(status: VolunteerStatus) {
  if (status === "ACCEPTED") return "default";
  if (status === "PENDING") return "jaune";
  if (status === "REJECTED") return "accent";

  return "secondary";
}

export default async function AdminVolunteersPage(props: {
  searchParams: VolunteerSearchParams;
}) {
  await requireAdminSession();

  async function updateVolunteerStatus(formData: FormData) {
    "use server";
    await requireAdminSession();

    const id = formData.get("id")?.toString();
    const status = formData.get("status")?.toString();

    if (!id || !status || !isVolunteerStatus(status)) return;

    await prisma.volunteerApplication.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/admin/benevoles");
    revalidatePath("/admin/dashboard");
  }

  const params = await props.searchParams;
  const selectedStatus = params.status?.trim() ?? "ALL";
  const normalizedStatus = isVolunteerStatus(selectedStatus)
    ? selectedStatus
    : null;

  let applications: Awaited<
    ReturnType<typeof prisma.volunteerApplication.findMany>
  > = [];
  let stats = {
    total: 0,
    pending: 0,
    reviewed: 0,
    accepted: 0,
    rejected: 0,
  };

  try {
    const [filteredApplications, total, pending, reviewed, accepted, rejected] =
      await Promise.all([
        prisma.volunteerApplication.findMany({
          where: normalizedStatus ? { status: normalizedStatus } : {},
          orderBy: { createdAt: "desc" },
        }),
        prisma.volunteerApplication.count(),
        prisma.volunteerApplication.count({ where: { status: "PENDING" } }),
        prisma.volunteerApplication.count({ where: { status: "REVIEWED" } }),
        prisma.volunteerApplication.count({ where: { status: "ACCEPTED" } }),
        prisma.volunteerApplication.count({ where: { status: "REJECTED" } }),
      ]);

    applications = filteredApplications;
    stats = { total, pending, reviewed, accepted, rejected };
  } catch {
    // DB not connected
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Candidatures bénévoles</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Suivi des candidatures, lecture des profils et mise à jour du statut.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              En attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Examinées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.reviewed}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Acceptées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.accepted}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Refusées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.rejected}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="py-5">
          <form className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="grid gap-2">
              <label
                htmlFor="status"
                className="text-sm font-semibold text-encre"
              >
                Filtrer par statut
              </label>
              <select
                id="status"
                name="status"
                defaultValue={selectedStatus}
                className="h-11 min-w-56 rounded-lg border border-line bg-white px-3 text-sm text-encre shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="ALL">Tous les statuts</option>
                {volunteerStatuses.map((status) => (
                  <option key={status} value={status}>
                    {getStatusLabel(status)}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit">Filtrer</Button>
            {normalizedStatus && (
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/benevoles">Réinitialiser</Link>
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Aucune candidature ne correspond à ce filtre.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <Card key={application.id}>
              <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <Badge variant={getStatusVariant(application.status)}>
                      {getStatusLabel(application.status)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Reçue le {formatDate(application.createdAt)}
                    </span>
                  </div>
                  <CardTitle className="text-lg">
                    {application.firstName} {application.lastName}
                  </CardTitle>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {application.email} — {application.phone}
                  </p>
                </div>

                <form
                  action={updateVolunteerStatus}
                  className="flex flex-col gap-2 sm:flex-row sm:items-center"
                >
                  <input type="hidden" name="id" value={application.id} />
                  <select
                    name="status"
                    defaultValue={application.status}
                    className="h-9 rounded-lg border border-line bg-white px-3 text-xs font-semibold text-encre shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {volunteerStatuses.map((status) => (
                      <option key={status} value={status}>
                        {getStatusLabel(status)}
                      </option>
                    ))}
                  </select>
                  <Button type="submit" size="sm" variant="outline">
                    Mettre à jour
                  </Button>
                </form>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm text-muted-foreground lg:grid-cols-3">
                <div className="rounded-2xl border border-line bg-papier p-4">
                  <h3 className="font-semibold text-encre">Disponibilités</h3>
                  <p className="mt-2 leading-6">{application.availability}</p>
                </div>
                <div className="rounded-2xl border border-line bg-papier p-4">
                  <h3 className="font-semibold text-encre">Compétences</h3>
                  <p className="mt-2 whitespace-pre-line leading-6">
                    {application.skills}
                  </p>
                </div>
                <div className="rounded-2xl border border-line bg-papier p-4">
                  <h3 className="font-semibold text-encre">Motivation</h3>
                  <p className="mt-2 whitespace-pre-line leading-6">
                    {application.motivation}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
