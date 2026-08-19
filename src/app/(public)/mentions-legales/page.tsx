import type { Metadata } from "next";
import Link from "next/link";
import { SectionIntro } from "@/components/shared/FadeUp";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site BZ Family : éditeur, hébergement, responsabilité et propriété intellectuelle.",
};

const editorRows = [
  ["Nom du site", siteConfig.name],
  ["Éditeur", "Association BZ Family"],
  ["Forme juridique", "Association loi 1901"],
  ["Adresse du siège", siteConfig.address],
  ["E-mail", siteConfig.email],
  ["Téléphone", siteConfig.phone],
  ["Numéro RNA", "À compléter"],
  ["Numéro SIRET", "À compléter"],
  ["Directeur de la publication", "À compléter"],
] as const;

const sections = [
  {
    title: "Objet du site",
    text: "Le site présente les actions de BZ Family, ses événements, ses actualités, ses partenaires, ses formulaires de contact, de bénévolat et de don. Les informations publiées sont destinées aux habitants, bénévoles, partenaires et donateurs souhaitant suivre ou soutenir les actions de l'association.",
  },
  {
    title: "Hébergement",
    text: "Le site est destiné à être hébergé par un prestataire technique choisi pour la mise en production. Les informations exactes de l'hébergeur seront complétées avant la mise en ligne officielle.",
    details: [
      ["Hébergeur", "À compléter"],
      ["Adresse de l'hébergeur", "À compléter"],
      ["Site web de l'hébergeur", "À compléter"],
    ],
  },
  {
    title: "Propriété intellectuelle",
    text: "Les textes, images, logos, documents, éléments graphiques et contenus publiés sur ce site sont protégés. Sauf mention contraire, toute reproduction, diffusion ou réutilisation doit faire l'objet d'une autorisation préalable de BZ Family ou des ayants droit concernés.",
  },
  {
    title: "Responsabilité",
    text: "BZ Family s'efforce de proposer des informations exactes et à jour. L'association ne peut toutefois garantir l'absence totale d'erreur, d'omission ou d'indisponibilité temporaire du site. Les contenus peuvent être modifiés à tout moment afin de refléter l'évolution des actions associatives.",
  },
  {
    title: "Données personnelles",
    text: "Les informations transmises via les formulaires du site sont utilisées uniquement pour traiter les demandes concernées : contact, bénévolat, inscription à un événement ou don. Pour plus de détails, consultez la politique de confidentialité.",
    link: {
      href: "/politique-confidentialite",
      label: "Consulter la politique de confidentialité",
    },
  },
  {
    title: "Contact légal",
    text: `Pour toute question concernant le site, les contenus publiés ou les informations légales, vous pouvez contacter BZ Family à l'adresse ${siteConfig.email}.`,
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
        <div className="container-bz max-w-5xl">
          <div className="mb-8 rounded-2xl bg-papier p-6 text-sm leading-relaxed text-muted-foreground">
            Les informations indiquées comme{" "}
            <span className="font-semibold text-encre">À compléter</span> devront
            être renseignées avec les données officielles de l&apos;association
            avant la mise en production.
          </div>

          <article className="rounded-2xl border border-line p-7">
            <h2 className="font-display text-2xl font-bold text-encre">
              Éditeur du site
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {editorRows.map(([label, value]) => (
                <div key={label} className="rounded-xl bg-papier p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {label}
                  </p>
                  <p className="mt-2 font-medium text-encre">{value}</p>
                </div>
              ))}
            </div>
          </article>

          <div className="mt-6 space-y-6">
            {sections.map((section) => (
              <article key={section.title} className="rounded-2xl border border-line p-7">
                <h2 className="font-display text-2xl font-bold text-encre">
                  {section.title}
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {section.text}
                </p>

                {section.details ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {section.details.map(([label, value]) => (
                      <div key={label} className="rounded-xl bg-papier p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {label}
                        </p>
                        <p className="mt-2 font-medium text-encre">{value}</p>
                      </div>
                    ))}
                  </div>
                ) : null}

                {section.link ? (
                  <Link
                    href={section.link.href}
                    className="mt-5 inline-flex rounded-full border border-line px-5 py-2 text-sm font-semibold text-encre transition-colors hover:border-encre hover:bg-encre hover:text-white"
                  >
                    {section.link.label}
                  </Link>
                ) : null}
            </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
