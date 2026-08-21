import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import prisma from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin";
import { formatDate } from "@/lib/utils";
import { sendContactReplyEmail } from "@/lib/resend";

type ContactSearchParams = Promise<{
  status?: string;
  message?: string;
  reply?: string;
}>;

const messageStatuses = ["NEW", "READ", "REPLIED"] as const;
type ContactMessageStatus = (typeof messageStatuses)[number];

function isContactMessageStatus(status: string): status is ContactMessageStatus {
  return messageStatuses.includes(status as ContactMessageStatus);
}

function getStatusLabel(status: string) {
  if (status === "READ") return "Lu";
  if (status === "REPLIED") return "Répondu";

  return "Nouveau";
}

function getStatusVariant(status: string) {
  if (status === "NEW") return "jaune";
  if (status === "REPLIED") return "default";

  return "secondary";
}

function getMessageHref(id: string, status: ContactMessageStatus | null) {
  const params = new URLSearchParams({ message: id });
  if (status) params.set("status", status);

  return `/admin/contact?${params.toString()}`;
}

function getReplyFeedback(type?: string) {
  if (type === "sent") {
    return {
      label: "Réponse envoyée et enregistrée.",
      className: "border-primary/25 bg-primary/10 text-primary",
    };
  }

  if (type === "missing-config") {
    return {
      label:
        "Envoi impossible : RESEND_API_KEY ou RESEND_FROM_EMAIL doit être configuré.",
      className: "border-jaune/30 bg-jaune/15 text-accent-warm",
    };
  }

  if (type === "send-error") {
    return {
      label: "L'e-mail n'a pas pu être envoyé. La réponse n'a pas été validée.",
      className: "border-red-200 bg-red-50 text-red-700",
    };
  }

  if (type === "invalid") {
    return {
      label: "Veuillez saisir un sujet et un contenu de réponse.",
      className: "border-red-200 bg-red-50 text-red-700",
    };
  }

  return null;
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

  async function replyToMessage(formData: FormData) {
    "use server";
    await requireAdminSession();

    const id = formData.get("id")?.toString();
    const replySubject = formData.get("replySubject")?.toString().trim() ?? "";
    const replyContent = formData.get("replyContent")?.toString().trim() ?? "";

    if (!id || !replySubject || !replyContent) {
      redirect("/admin/contact?reply=invalid");
    }

    const message = await prisma.contactMessage.findUnique({ where: { id } });
    if (!message) {
      redirect("/admin/contact?reply=invalid");
    }

    let emailSent = false;

    try {
      emailSent = await sendContactReplyEmail({
        to: message.email,
        name: message.name,
        originalSubject: message.subject,
        replySubject,
        replyContent,
      });
    } catch (error) {
      console.error("[admin-contact] reply email failed:", error);
      redirect(`/admin/contact?message=${id}&reply=send-error`);
    }

    if (!emailSent) {
      redirect(`/admin/contact?message=${id}&reply=missing-config`);
    }

    await prisma.contactMessage.update({
      where: { id },
      data: {
        status: "REPLIED",
        replySubject,
        replyContent,
        repliedAt: new Date(),
      },
    });

    revalidatePath("/admin/contact");
    revalidatePath("/admin/dashboard");
    redirect(`/admin/contact?message=${id}&reply=sent`);
  }

  const params = await props.searchParams;
  const selectedStatus = params.status?.trim() ?? "ALL";
  const normalizedStatus = isContactMessageStatus(selectedStatus)
    ? selectedStatus
    : null;
  const selectedMessageId = params.message?.trim();
  const replyFeedback = getReplyFeedback(params.reply);

  let messages: Awaited<ReturnType<typeof prisma.contactMessage.findMany>> = [];
  let stats = {
    total: 0,
    unread: 0,
    read: 0,
    replied: 0,
  };

  try {
    const [filteredMessages, total, unread, read, replied] = await Promise.all([
      prisma.contactMessage.findMany({
        where: normalizedStatus ? { status: normalizedStatus } : {},
        orderBy: { createdAt: "desc" },
      }),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { status: "NEW" } }),
      prisma.contactMessage.count({ where: { status: "READ" } }),
      prisma.contactMessage.count({ where: { status: "REPLIED" } }),
    ]);

    messages = filteredMessages;
    stats = { total, unread, read, replied };
  } catch {
    // DB not connected
  }

  const selectedMessage =
    messages.find((message) => message.id === selectedMessageId) ??
    messages[0] ??
    null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Messages contact</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Consultation et réponse aux demandes envoyées depuis le formulaire
          public.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
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
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Répondus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.replied}</p>
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
                <option value="REPLIED">Répondus</option>
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

      {replyFeedback ? (
        <div
          className={`rounded-2xl border px-5 py-4 text-sm font-semibold ${replyFeedback.className}`}
        >
          {replyFeedback.label}
        </div>
      ) : null}

      {messages.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Aucun message ne correspond à ce filtre.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Messages reçus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {messages.map((message) => {
                const isSelected = selectedMessage?.id === message.id;

                return (
                  <Link
                    key={message.id}
                    href={getMessageHref(message.id, normalizedStatus)}
                    className={`block rounded-2xl border p-4 transition ${
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-line bg-white hover:border-primary/40 hover:bg-surface-muted/40"
                    }`}
                  >
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <Badge variant={getStatusVariant(message.status)}>
                        {getStatusLabel(message.status)}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                    <p className="font-semibold text-encre">
                      {message.subject}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {message.name} — {message.email}
                    </p>
                  </Link>
                );
              })}
            </CardContent>
          </Card>

          <Card className="xl:sticky xl:top-6 xl:self-start">
            {selectedMessage ? (
              <>
                <CardHeader>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge variant={getStatusVariant(selectedMessage.status)}>
                      {getStatusLabel(selectedMessage.status)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Reçu le {formatDate(selectedMessage.createdAt)}
                    </span>
                  </div>
                  <CardTitle>{selectedMessage.subject}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {selectedMessage.name} — {selectedMessage.email}
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-2xl border border-line bg-papier p-5 text-sm leading-7 text-muted-foreground">
                    <p className="whitespace-pre-line">
                      {selectedMessage.message}
                    </p>
                  </div>

                  {selectedMessage.repliedAt &&
                  selectedMessage.replyContent ? (
                    <div className="rounded-2xl border border-primary/20 bg-primary/10 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        Dernière réponse
                      </p>
                      <p className="mt-2 text-sm font-semibold text-encre">
                        {selectedMessage.replySubject}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Envoyée le {formatDate(selectedMessage.repliedAt)}
                      </p>
                      <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                        {selectedMessage.replyContent}
                      </p>
                    </div>
                  ) : null}

                  {selectedMessage.status !== "READ" && (
                    <form action={markMessageAsRead}>
                      <input
                        type="hidden"
                        name="id"
                        value={selectedMessage.id}
                      />
                      <Button type="submit" variant="outline" size="sm">
                        Marquer comme lu
                      </Button>
                    </form>
                  )}

                  <form action={replyToMessage} className="grid gap-4">
                    <input
                      type="hidden"
                      name="id"
                      value={selectedMessage.id}
                    />
                    <div className="grid gap-2">
                      <label
                        htmlFor="replySubject"
                        className="text-sm font-semibold text-encre"
                      >
                        Sujet de la réponse
                      </label>
                      <Input
                        id="replySubject"
                        name="replySubject"
                        defaultValue={
                          selectedMessage.replySubject ??
                          `Re: ${selectedMessage.subject}`
                        }
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="replyContent"
                        className="text-sm font-semibold text-encre"
                      >
                        Réponse
                      </label>
                      <Textarea
                        id="replyContent"
                        name="replyContent"
                        defaultValue={selectedMessage.replyContent ?? ""}
                        placeholder="Rédigez la réponse à envoyer au visiteur."
                        className="min-h-[180px]"
                        required
                      />
                    </div>
                    <div>
                      <Button type="submit">Envoyer la réponse</Button>
                    </div>
                  </form>
                </CardContent>
              </>
            ) : (
              <CardContent className="py-12 text-center text-muted-foreground">
                Sélectionnez un message pour afficher le détail.
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
