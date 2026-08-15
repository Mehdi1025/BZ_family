import type { Metadata } from "next";
import { SectionIntro } from "@/components/shared/FadeUp";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site BZ Family : éditeur, hébergement, responsabilité et propriété intellectuelle.",
};

const items = [
  {
    title: "Éditeur du site",
    text: "Le site est édité par l'association BZ Family. Les informations présentées ont pour objectif de faire connaître les actions de l'association, ses événements, ses actualités et ses moyens de contact.",
  },
  {
    title: "Association",
    text: `BZ Family est une association loi 1901. Pour toute demande, vous pouvez écrire à ${siteConfig.email} ou utiliser les coordonnées affichées sur le site.`,
  },
  {
    title: "Hébergement",
    text: "L'hébergement technique du site peut être assuré par un prestataire externe choisi par l'association ou son équipe technique. Les informations précises seront complétées lors de la mise en production définitive.",
  },
  {
    title: "Propriété intellectuelle",
    text: "Les textes, visuels, logos et contenus publiés sur ce site sont protégés. Sauf mention contraire, ils ne peuvent pas être reproduits ou réutilisés sans autorisation préalable de l'association.",
  },
  {
    title: "Responsabilité",
    text: "BZ Family s'efforce de fournir des informations à jour et fiables. Toutefois, l'association ne peut garantir l'absence totale d'erreur ou d'omission et se réserve le droit de modifier les contenus à tout moment.",
  },
  {
    title: "Contact",
    text: `Pour toute question liée au site ou à l'association, vous pouvez écrire à ${siteConfig.email} ou contacter l'équipe via la page Contact.`,
  },
];

export default function LegalNoticePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-encre text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(217,119,6,0.3),transparent_35%)]" />
        <div className="container-bz relative py-28 lg:py-36">
          <SectionIntro
            label="Cadre juridique"
            title="Mentions légales"
            description="Cette page présente les informations légales relatives au site BZ Family et à son éditeur."
            theme="dark"
          />
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-bz max-w-4xl space-y-6">
          {items.map((item) => (
            <article key={item.title} className="rounded-2xl border border-line p-7">
              <h2 className="font-display text-2xl font-bold text-encre">{item.title}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
