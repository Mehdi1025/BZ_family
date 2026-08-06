import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "BZ Family — Solidarité & Impact de Quartier",
    template: "%s | BZ Family",
  },
  description:
    "Association à but non lucratif — Ensemble, créons un impact positif dans notre quartier.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "BZ Family",
    title: "BZ Family — Solidarité & Impact de Quartier",
    description:
      "Ensemble, créons un impact positif dans notre quartier.",
  },
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/logo-192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${syne.variable} ${plusJakarta.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
