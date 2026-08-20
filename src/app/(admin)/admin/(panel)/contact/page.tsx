import Link from "next/link";
import { revalidatePath } from "next/cache";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin";
import { formatDate } from "@/lib/utils";

type ContactSearchParams = Promise<{
  status?: string;
}>;

const messageStatuses = ["NEW", "READ"] as const;
type ContactMessageStatus = (typeof messageStatuses)[number];

function isContactMessageStatus(status: string): status is ContactMessageStatus {
  return messageStatuses.includes(status as ContactMessageStatus);
}

function getStatusLabel(status: string) {
  if (status === "READ") return "Lu";

  return "Nouveau";
}

function getStatusVariant(status: string) {
  if (status === "NEW") return "jaune";

  return "secondary";
}

export default async function AdminContactPage(props: {
  searchParams: ContactSearchParams;
}) {
  await requireAdminSession();

  async function markMessageAsRead(formData: FormData) {
    "use server";
    await requireAdminSession();

    const id = formData.get("id")?.toString();
    if (!id) return;

    await prisma.contactMessage.update({
      where: { id },
      data: { status: "READ" },
    });

    revalidatePath("/admin/contact");
    revalidatePath("/admin/dashboard");
  }

  const params = await props.searchParams;
  const selectedStatus = params.status?.trim() ?? "ALL";
  const normalizedStatus = isContactMessageStatus(selectedStatus)
    ? selectedStatus
    : null;

  let messages: Awaited<ReturnType<typeof prisma.contactMessage.findMany>> = [];
  let stats = {
    total: 0,
    unread: 0,
    read: 0,
  };

  try {
    const [filteredMessages, total, unread, read] = await Promise.all([
      prisma.contactMessage.findMany({
        where: normalizedStatus ? { status: normalizedStatus } : {},
        orderBy: { createdAt: "desc" },
      }),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { status: "NEW" } }),
      prisma.contactMessage.count({ where: { status: "READ" } }),
    ]);

    messages = filteredMessages;
    stats = { total, unread, read };
  } catch {
    // DB not connected
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Messages contact</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Consultation des demandes envoyées depuis le formulaire public.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Messages reçus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Nouveaux
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.unread}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Lus</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.read}</p>
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
                <option value="ALL">Tous les messages</option>
                <option value="NEW">Nouveaux</option>
                <option value="READ">Lus</option>
              </select>
            </div>
            <Button type="submit">Filtrer</Button>
            {normalizedStatus && (
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/contact">Réinitialiser</Link>
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      {messages.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Aucun message ne correspond à ce filtre.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id}>
              <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <Badge variant={getStatusVariant(message.status)}>
                      {getStatusLabel(message.status)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Reçu le {formatDate(message.createdAt)}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{message.subject}</CardTitle>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {message.name} — {message.email}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={`mailto:${message.email}`}>Répondre</a>
                  </Button>
                  {message.status !== "READ" && (
                    <form action={markMessageAsRead}>
                      <input type="hidden" name="id" value={message.id} />
                      <Button type="submit" size="sm">
                        Marquer comme lu
                      </Button>
                    </form>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-2xl border border-line bg-papier p-5 text-sm leading-7 text-muted-foreground">
                  <p className="whitespace-pre-line">{message.message}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
