import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function AdminDonationsPage() {
  let donations: Awaited<ReturnType<typeof prisma.donation.findMany>> = [];

  try {
    donations = await prisma.donation.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // DB not connected
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Dons</h1>
      {donations.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Aucun don enregistré.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {donations.map((donation) => (
            <Card key={donation.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">
                  {donation.donorName ?? "Anonyme"} —{" "}
                  {formatCurrency(donation.amount)}
                </CardTitle>
                <Badge
                  variant={
                    donation.status === "COMPLETED" ? "default" : "secondary"
                  }
                >
                  {donation.status}
                </Badge>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {donation.donorEmail} — {formatDate(donation.createdAt)}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
