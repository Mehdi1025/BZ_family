import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;

  if (!session || role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const donations = await prisma.donation.findMany({
    orderBy: { createdAt: "desc" },
  });

  const header = [
    "id",
    "donorName",
    "donorEmail",
    "amount",
    "status",
    "createdAt",
  ];

  const rows = donations.map((donation) => [
    donation.id,
    donation.donorName ?? "",
    donation.donorEmail,
    String(donation.amount),
    donation.status,
    donation.createdAt.toISOString(),
  ]);

  const csv = [header, ...rows]
    .map((row) =>
      row
        .map((value) => `"${String(value).replaceAll('"', '""')}"`)
        .join(",")
    )
    .join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="dons-bz-family.csv"',
    },
  });
}
