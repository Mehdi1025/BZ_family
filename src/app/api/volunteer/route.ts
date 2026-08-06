import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { sendVolunteerNotificationEmail } from "@/lib/resend";

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  availability: z.string().min(1),
  skills: z.string().min(5),
  motivation: z.string().min(20),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    const application = await prisma.volunteerApplication.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        availability: data.availability,
        skills: data.skills,
        motivation: data.motivation,
      },
    });

    await sendVolunteerNotificationEmail({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      availability: data.availability,
    });

    return NextResponse.json({ success: true, id: application.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Volunteer error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
