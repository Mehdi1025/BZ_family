import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function AdminVolunteersPage() {
  let applications: Awaited<
    ReturnType<typeof prisma.volunteerApplication.findMany>
  > = [];

  try {
    applications = await prisma.volunteerApplication.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // DB not connected
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Candidatures bénévoles</h1>
      {applications.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Aucune candidature pour le moment.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">
                  {app.firstName} {app.lastName}
                </CardTitle>
                <Badge variant="secondary">{app.status}</Badge>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>{app.email} — {app.phone}</p>
                <p>Disponibilités : {app.availability}</p>
                <p className="line-clamp-2">{app.motivation}</p>
                <p className="text-xs">{formatDate(app.createdAt)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
