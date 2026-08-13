import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, locale = "fr-FR"): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function formatCurrency(amount: number, locale = "fr-FR"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
  }).format(amount / 100);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const siteConfig = {
  name: "BZ Family",
  description:
    "Association à but non lucratif - Ensemble, créons un impact positif dans notre quartier.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "contact@bzfamily.org",
  phone: "+33 1 23 45 67 89",
  address: "123 Rue de la Solidarité, 75000 Paris",
  social: {
    facebook: "https://facebook.com/bzfamily",
    instagram: "https://instagram.com/bzfamily",
    linkedin: "https://linkedin.com/company/bzfamily",
  },
};
