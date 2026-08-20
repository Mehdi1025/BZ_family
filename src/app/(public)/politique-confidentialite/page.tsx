import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { SectionIntro } from "@/components/shared/FadeUp";
import { Button } from "@/components/ui/button";
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

const dataExamples = [
  {
    type: "Formulaires de contact",
    usage: "Répondre aux messages et assurer le suivi des demandes.",
  },
  {
    type: "Demandes de bénévolat",
    usage: "Organiser les prises de contact et les disponibilités des bénévoles.",
  },
  {
    type: "Dons en ligne",
    usage: "Traiter les paiements et conserver les informations nécessaires au suivi administratif.",
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
          <div className="mb-10 rounded-[2rem] border border-line bg-papier p-6 shadow-soft">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  Repère RGPD
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Dernière mise à jour : 20 août 2026. Cette politique pourra être
                  actualisée si les formulaires, les outils ou les traitements de
                  données de l&apos;association évoluent.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-10 overflow-hidden rounded-[2rem] border border-line bg-white shadow-soft">
            <div className="border-b border-line bg-encre px-6 py-5 text-white">
              <h2 className="font-display text-2xl font-bold">
                Données concernées et usages principaux
              </h2>
              <p className="mt-2 text-sm text-white/70">
                Cette synthèse permet de comprendre rapidement ce qui peut être
                collecté et dans quel but.
              </p>
            </div>
            <div className="divide-y divide-line">
              {dataExamples.map((item) => (
                <div
                  key={item.type}
                  className="grid gap-3 px-6 py-5 md:grid-cols-[220px_1fr] md:gap-6"
                >
                  <p className="text-sm font-semibold text-encre">{item.type}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.usage}
                  </p>
                </div>
              ))}
            </div>
          </div>

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

          <div className="mt-10 rounded-[2rem] bg-encre p-8 text-white shadow-card">
            <h2 className="font-display text-3xl font-bold">
              Une question sur vos données ?
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/75">
              Si vous souhaitez exercer un droit, signaler une erreur ou demander
              une précision, BZ Family peut être contactée directement via la page
              dédiée.
            </p>
            <div className="mt-6">
              <Button variant="accent" size="lg" asChild>
                <Link href="/contact">
                  Contacter l&apos;association <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
