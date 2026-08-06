import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-08-27.basil",
      typescript: true,
    });
  }
  return stripeClient;
}

export const DONATION_AMOUNTS = [1000, 2500, 5000, 10000] as const;

export function formatStripeAmount(euros: number): number {
  return Math.round(euros * 100);
}
