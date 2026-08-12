import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/shared/Logo";
import { siteConfig } from "@/lib/utils";

const footerLinks = {
  navigation: [
    { href: "/a-propos", label: "À propos" },
    { href: "/nos-actions", label: "Nos actions" },
    { href: "/evenements", label: "Événements" },
    { href: "/actualites", label: "Actualités" },
    { href: "/galerie", label: "Galerie" },
  ],
  engagement: [
    { href: "/devenir-benevole", label: "Devenir bénévole" },
    { href: "/faire-un-don", label: "Faire un don" },
    { href: "/partenaires", label: "Partenaires" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/politique-confidentialite", label: "Confidentialité" },
  ],
};

const socials = [
  { href: siteConfig.social.facebook, label: "Facebook", Icon: Facebook },
  { href: siteConfig.social.instagram, label: "Instagram", Icon: Instagram },
  { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="bg-encre text-white">
      <div className="container-bz py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Logo href="/" variant="light" size="sm" showWordmark />
            <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-white/70">
              Association loi 1901 dédiée à la solidarité de proximité et au lien
              social dans le quartier. Créée en 2019 par des habitants.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 transition-colors hover:border-white hover:bg-white hover:text-encre"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50">
              Le site
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50">
              S&apos;engager
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.engagement.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50">
              Nous trouver
            </h3>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-jaune" />
                {siteConfig.address}
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-jaune" />
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="hover:text-white"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-jaune" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
            </ul>

            <h3 className="mb-3 mt-8 text-xs font-semibold uppercase tracking-wider text-white/50">
              La lettre du quartier
            </h3>
            <form className="flex gap-2">
              <label htmlFor="footer-email" className="sr-only">
                Email newsletter
              </label>
              <Input
                id="footer-email"
                type="email"
                placeholder="vous@exemple.fr"
                className="border-white/20 bg-white/5 text-white placeholder:text-white/40 focus-visible:border-white"
              />
              <Button variant="accent" type="submit" size="default">
                OK
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} BZ Family - Association loi 1901.
          </p>
          <div className="flex flex-wrap gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/50 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
