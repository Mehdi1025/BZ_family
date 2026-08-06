import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function AdminEventsPage() {
  let events: Array<{
    id: string;
    title: string;
    date: Date;
    location: string;
    capacity: number;
    registrationCount: number;
  }> = [];

  try {
    const rows = await prisma.event.findMany({
      orderBy: { date: "asc" },
      include: { _count: { select: { registrations: true } } },
    });
    events = rows.map((event) => ({
      id: event.id,
      title: event.title,
      date: event.date,
      location: event.location,
      capacity: event.capacity,
      registrationCount: event._count.registrations,
    }));
  } catch {
    // DB not connected
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Événements</h1>
      {events.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Aucun événement en base. Connectez Supabase et lancez{" "}
            <code className="rounded bg-surface-muted px-2 py-1">npm run db:push</code>.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <Badge>
                  {event.registrationCount}/{event.capacity} inscrits
                </Badge>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {formatDate(event.date)} — {event.location}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
