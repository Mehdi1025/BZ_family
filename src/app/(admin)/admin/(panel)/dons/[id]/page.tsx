import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin";
import { formatCurrency, formatDate } from "@/lib/utils";

function getStatusVariant(status: string) {
  if (status === "COMPLETED") return "default";
  if (status === "PENDING") return "jaune";
  if (status === "FAILED") return "accent";
  return "secondary";
}

export default async function AdminDonationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminSession();
  const { id } = await params;

  const donation = await prisma.donation.findUnique({
    where: { id },
  });

  if (!donation) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Détail du don</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Informations détaillées sur un don enregistré.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/dons">Retour à la liste</Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{donation.donorName ?? "Donateur anonyme"}</CardTitle>
          <Badge variant={getStatusVariant(donation.status)}>
            {donation.status}
          </Badge>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm md:grid-cols-2">
          <div>
            <p className="font-semibold">Montant</p>
            <p className="text-muted-foreground">
              {formatCurrency(donation.amount)}
            </p>
          </div>
          <div>
            <p className="font-semibold">Email</p>
            <p className="text-muted-foreground">{donation.donorEmail}</p>
          </div>
          <div>
            <p className="font-semibold">Date</p>
            <p className="text-muted-foreground">
              {formatDate(donation.createdAt)}
            </p>
          </div>
          <div>
            <p className="font-semibold">Paiement Stripe</p>
            <p className="break-all text-muted-foreground">
              {donation.stripePaymentId ?? "Non renseigné"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
