import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { sendEventConfirmationEmail } from "@/lib/resend";
import { formatDate } from "@/lib/utils";

const schema = z.object({
  eventId: z.string().min(1),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    const event = await prisma.event.findUnique({
      where: { id: data.eventId },
    });

    if (!event) {
      return NextResponse.json({ error: "Événement introuvable" }, { status: 404 });
    }

    if (event.registeredCount >= event.capacity) {
      return NextResponse.json({ error: "Événement complet" }, { status: 400 });
    }

    const registration = await prisma.$transaction(async (tx) => {
      const reg = await tx.registration.create({
        data: {
          eventId: data.eventId,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          status: "CONFIRMED",
        },
      });

      await tx.event.update({
        where: { id: data.eventId },
        data: { registeredCount: { increment: 1 } },
      });

      return reg;
    });

    await sendEventConfirmationEmail({
      to: data.email,
      firstName: data.firstName,
      eventTitle: event.title,
      eventDate: formatDate(event.date),
      eventLocation: event.location,
    });

    return NextResponse.json({ success: true, id: registration.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Register event error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
