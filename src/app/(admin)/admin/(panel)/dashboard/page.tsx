import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { Calendar, Heart, Newspaper, Users } from "lucide-react";

export default async function AdminDashboardPage() {
  let stats = {
    totalDonations: 0,
    volunteerCount: 0,
    upcomingEvents: 0,
    articleCount: 0,
  };

  try {
    const [donations, volunteers, events, articles] = await Promise.all([
      prisma.donation.aggregate({
        where: { status: "COMPLETED" },
        _sum: { amount: true },
      }),
      prisma.volunteerApplication.count({ where: { status: "PENDING" } }),
      prisma.event.count({ where: { date: { gte: new Date() } } }),
      prisma.article.count(),
    ]);

    stats = {
      totalDonations: donations._sum.amount ?? 0,
      volunteerCount: volunteers,
      upcomingEvents: events,
      articleCount: articles,
    };
  } catch {
    // DB not connected — show zeros
  }

  const cards = [
    {
      title: "Dons collectés",
      value: formatCurrency(stats.totalDonations),
      icon: Heart,
      color: "text-accent-warm",
    },
    {
      title: "Candidatures bénévoles",
      value: stats.volunteerCount.toString(),
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Événements à venir",
      value: stats.upcomingEvents.toString(),
      icon: Calendar,
      color: "text-primary",
    },
    {
      title: "Articles publiés",
      value: stats.articleCount.toString(),
      icon: Newspaper,
      color: "text-primary",
    },
  ];

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
