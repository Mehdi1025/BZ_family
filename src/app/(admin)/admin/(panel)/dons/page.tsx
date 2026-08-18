import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import prisma from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import { requireAdminSession } from "@/lib/admin";
import type { DonationStatus } from "@prisma/client";

type DonationSearchParams = Promise<{
  q?: string;
  status?: string;
  page?: string;
}>;

function getStatusVariant(status: string) {
  if (status === "COMPLETED") return "default";
  if (status === "PENDING") return "jaune";
  if (status === "FAILED") return "accent";
  return "secondary";
}

export default async function AdminDonationsPage(props: {
  searchParams: DonationSearchParams;
}) {
  await requireAdminSession();

  const params = await props.searchParams;
  const query = params.q?.trim() ?? "";
  const status = params.status?.trim() ?? "ALL";
  const currentPage = Math.max(1, Number(params.page ?? "1") || 1);
  const perPage = 20;
  const normalizedStatus =
    status === "COMPLETED" ||
    status === "PENDING" ||
    status === "FAILED" ||
    status === "REFUNDED"
      ? (status as DonationStatus)
      : null;

  let donations: Awaited<ReturnType<typeof prisma.donation.findMany>> = [];
  let stats = {
    total: 0,
    completedAmount: 0,
    pendingCount: 0,
    completedCount: 0,
    filteredTotal: 0,
    monthlyAmount: 0,
  };

  try {
    const where = {
      ...(normalizedStatus ? { status: normalizedStatus } : {}),
      ...(query
        ? {
            OR: [
              { donorEmail: { contains: query, mode: "insensitive" as const } },
              { donorName: { contains: query, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const [
      allStats,
      pendingCount,
      completedCount,
      monthStats,
      filteredTotal,
      filteredDonations,
    ] =
      await Promise.all([
        prisma.donation.aggregate({
          _count: { id: true },
          _sum: { amount: true },
          where: { status: "COMPLETED" },
        }),
        prisma.donation.count({ where: { status: "PENDING" } }),
        prisma.donation.count({ where: { status: "COMPLETED" } }),
        prisma.donation.aggregate({
          where: {
            status: "COMPLETED",
            createdAt: { gte: monthStart },
          },
          _sum: { amount: true },
        }),
        prisma.donation.count({ where }),
        prisma.donation.findMany({
          where,
          orderBy: { createdAt: "desc" },
          skip: (currentPage - 1) * perPage,
          take: perPage,
        }),
      ]);

    donations = filteredDonations;
    stats = {
      total: allStats._count.id ?? 0,
      completedAmount: allStats._sum.amount ?? 0,
      pendingCount,
      completedCount,
      filteredTotal,
      monthlyAmount: monthStats._sum.amount ?? 0,
    };
  } catch {
    // Database unavailable: page still renders.
  }

  const totalPages = Math.max(1, Math.ceil(stats.filteredTotal / perPage));

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dons</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Suivi des dons reçus, recherche rapide et export des données.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/api/admin/dons/export">Exporter en CSV</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Montant collecté
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {formatCurrency(stats.completedAmount)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Dons validés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.completedCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Dons ce mois
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {formatCurrency(stats.monthlyAmount)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Dons en attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.pendingCount}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form
            method="get"
            action="/admin/dons"
            className="grid gap-4 md:grid-cols-[1fr_220px_auto]"
          >
            <Input
              name="q"
              defaultValue={query}
              placeholder="Rechercher par nom ou email"
            />
            <select
              name="status"
              defaultValue={status}
              className="h-11 rounded-lg border border-line bg-white px-4 text-sm"
            >
              <option value="ALL">Tous les statuts</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="PENDING">PENDING</option>
              <option value="FAILED">FAILED</option>
              <option value="REFUNDED">REFUNDED</option>
            </select>
            <Button type="submit">Filtrer</Button>
          </form>
        </CardContent>
      </Card>

      {donations.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Aucun don enregistré pour ce filtre.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {donations.map((donation) => (
            <Card key={donation.id}>
              <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <CardTitle className="text-lg">
                    {donation.donorName ?? "Anonyme"} —{" "}
                    {formatCurrency(donation.amount)}
                  </CardTitle>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {donation.donorEmail} — {formatDate(donation.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={getStatusVariant(donation.status)}>
                    {donation.status}
                  </Badge>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/dons/${donation.id}`}>Voir</Link>
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}

          <div className="flex flex-col gap-3 border-t border-line pt-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              Page {currentPage} sur {totalPages} · {stats.filteredTotal} don
              {stats.filteredTotal > 1 ? "s" : ""} correspondant au filtre
            </p>
            <div className="flex gap-2">
              <Button
                asChild
                variant="outline"
                size="sm"
                disabled={currentPage <= 1}
              >
                <Link
                  href={`/admin/dons?${new URLSearchParams({
                    ...(query ? { q: query } : {}),
                    ...(status !== "ALL" ? { status } : {}),
                    page: String(Math.max(1, currentPage - 1)),
                  }).toString()}`}
                >
                  Précédent
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages}
              >
                <Link
                  href={`/admin/dons?${new URLSearchParams({
                    ...(query ? { q: query } : {}),
                    ...(status !== "ALL" ? { status } : {}),
                    page: String(Math.min(totalPages, currentPage + 1)),
                  }).toString()}`}
                >
                  Suivant
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
