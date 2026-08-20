import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import {
  Calendar,
  ClipboardList,
  Heart,
  ImageIcon,
  Mail,
  Newspaper,
  Users,
} from "lucide-react";
import { requireAdminSession } from "@/lib/admin";

export default async function AdminDashboardPage() {
  await requireAdminSession();

  let stats = {
    totalDonations: 0,
    donationCount: 0,
    volunteerCount: 0,
    upcomingEvents: 0,
    articleCount: 0,
    actionCount: 0,
    mediaCount: 0,
    contactMessages: 0,
    unreadMessages: 0,
  };

  try {
    const [
      donations,
      donationCount,
      volunteers,
      events,
      articles,
      actions,
      media,
      contactMessages,
      unreadMessages,
    ] = await Promise.all([
      prisma.donation.aggregate({
        where: { status: "COMPLETED" },
        _sum: { amount: true },
      }),
      prisma.donation.count(),
      prisma.volunteerApplication.count({ where: { status: "PENDING" } }),
      prisma.event.count({ where: { date: { gte: new Date() } } }),
      prisma.article.count(),
      prisma.action.count({ where: { isActive: true } }),
      prisma.galleryMedia.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { status: "NEW" } }),
    ]);

    stats = {
      totalDonations: donations._sum.amount ?? 0,
      donationCount,
      volunteerCount: volunteers,
      upcomingEvents: events,
      articleCount: articles,
      actionCount: actions,
      mediaCount: media,
      contactMessages,
      unreadMessages,
    };
  } catch {
    // Database unavailable: keep zero state.
  }

  const cards = [
    {
      title: "Dons collectés",
      value: formatCurrency(stats.totalDonations),
      hint: `${stats.donationCount} dons enregistrés`,
      icon: Heart,
      color: "text-accent-warm",
    },
    {
      title: "Candidatures bénévoles",
      value: stats.volunteerCount.toString(),
      hint: "En attente de traitement",
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Événements à venir",
      value: stats.upcomingEvents.toString(),
      hint: "Programmés",
      icon: Calendar,
      color: "text-primary",
    },
    {
      title: "Articles publiés",
      value: stats.articleCount.toString(),
      hint: "Actualités",
      icon: Newspaper,
      color: "text-primary",
    },
    {
      title: "Actions actives",
      value: stats.actionCount.toString(),
      hint: "Visible sur le site",
      icon: ClipboardList,
      color: "text-primary",
    },
    {
      title: "Médias galerie",
      value: stats.mediaCount.toString(),
      hint: "Photos et vidéos",
      icon: ImageIcon,
      color: "text-primary",
    },
    {
      title: "Messages contact",
      value: stats.unreadMessages.toString(),
      hint: `${stats.contactMessages} messages enregistrés`,
      icon: Mail,
      color: "text-primary",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge variant="jaune" className="mb-3">
            Administration BZ Family
          </Badge>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Vue d’ensemble des contenus, dons et éléments à surveiller.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{card.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{card.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Priorités du moment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>1. Vérifier les candidatures bénévoles en attente.</p>
            <p>2. Lire les nouveaux messages envoyés depuis la page contact.</p>
            <p>3. Mettre à jour les actions mises en avant sur le site public.</p>
            <p>4. Contrôler les dons et la cohérence des contenus publiés.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accès rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Link className="block text-primary hover:underline" href="/admin/dons">
              Consulter les dons
            </Link>
            <Link
              className="block text-primary hover:underline"
              href="/admin/actions"
            >
              Gérer les actions
            </Link>
            <Link
              className="block text-primary hover:underline"
              href="/admin/galerie"
            >
              Mettre à jour la galerie
            </Link>
            <Link
              className="block text-primary hover:underline"
              href="/admin/contact"
            >
              Lire les messages contact
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
