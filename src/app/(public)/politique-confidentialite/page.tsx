import type { Metadata } from "next";
import { SectionIntro } from "@/components/shared/FadeUp";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de BZ Family : données collectées, finalités, durée de conservation, droits RGPD et contact.",
};

const sections = [
  {
    title: "Responsable du traitement",
    text: `BZ Family est responsable des traitements de données réalisés sur ce site. Pour toute question, vous pouvez nous contacter à l'adresse ${siteConfig.email}.`,
  },
  {
    title: "Données collectées",
    text: "Nous pouvons collecter les informations transmises volontairement via les formulaires : nom, prénom, adresse e-mail, téléphone, message, disponibilité bénévole ou informations nécessaires au traitement d'un don.",
  },
  {
    title: "Finalités et base légale",
    text: "Ces données sont utilisées pour répondre aux demandes, organiser les actions associatives, gérer les inscriptions, suivre les dons et assurer la relation avec les bénévoles, partenaires ou donateurs. Le traitement repose principalement sur votre consentement ou sur l'intérêt légitime de l'association.",
  },
  {
    title: "Durée de conservation",
    text: "Les données sont conservées uniquement pendant la durée nécessaire à la finalité concernée. Les messages de contact sont conservés le temps du suivi de la demande. Les données liées aux dons peuvent être conservées plus longtemps lorsque la loi l'exige.",
  },
  {
    title: "Destinataires",
    text: "Les données sont destinées aux membres habilités de BZ Family. Elles ne sont pas vendues. Elles peuvent être transmises à des prestataires techniques uniquement lorsque cela est nécessaire au fonctionnement du site ou du paiement sécurisé.",
  },
  {
    title: "Vos droits",
    text: "Conformément au RGPD, vous pouvez demander l'accès, la rectification, l'effacement, la limitation ou l'opposition au traitement de vos données. Vous pouvez également retirer votre consentement lorsque le traitement repose sur celui-ci.",
  },
  {
    title: "Cookies",
    text: "Le site peut utiliser des cookies techniques nécessaires à son fonctionnement et, si activés, des cookies de mesure d'audience. Vous pouvez gérer les cookies depuis les paramètres de votre navigateur.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-encre text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(59,130,246,0.26),transparent_35%)]" />
        <div className="container-bz relative py-28 lg:py-36">
          <SectionIntro
            label="Données personnelles"
            title="Politique de confidentialité"
            description="Cette page explique de manière claire quelles données peuvent être collectées par BZ Family et comment elles sont utilisées."
            theme="dark"
          />
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-bz max-w-4xl">
          <p className="mb-10 rounded-2xl bg-papier p-6 text-sm leading-relaxed text-muted-foreground">
            Dernière mise à jour : 12 août 2026. Cette politique pourra être mise
            à jour si les outils ou les traitements de l&apos;association évoluent.
          </p>

          <div className="space-y-6">
            {sections.map((section) => (
              <article key={section.title} className="rounded-2xl border border-line p-7">
                <h2 className="font-display text-2xl font-bold text-encre">
                  {section.title}
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {section.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
