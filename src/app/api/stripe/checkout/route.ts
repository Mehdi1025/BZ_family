import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

const schema = z.object({
  amount: z.number().min(100),
  donorName: z.string().min(2),
  donorEmail: z.string().email(),
});

export async function POST(request: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe non configuré" },
        { status: 503 }
      );
    }

    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe non configuré" },
        { status: 503 }
      );
    }

    const body = await request.json();
    const data = schema.parse(body);

    const donation = await prisma.donation.create({
      data: {
        amount: data.amount,
        donorEmail: data.donorEmail,
        donorName: data.donorName,
        status: "PENDING",
      },
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Don à BZ Family",
              description: "Soutien aux actions solidaires de l'association",
            },
            unit_amount: data.amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/faire-un-don/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/faire-un-don`,
      customer_email: data.donorEmail,
      metadata: {
        donationId: donation.id,
        donorName: data.donorName,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
