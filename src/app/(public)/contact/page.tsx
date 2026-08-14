import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Facebook,
  HelpCircle,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeUp, SectionIntro } from "@/components/shared/FadeUp";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez l'equipe BZ Family pour une question, un partenariat, une action benevole ou un don.",
};

const openingHours = [
  "Lundi - vendredi : 10h00 - 18h00",
  "Samedi : sur rendez-vous",
  "Dimanche : ferme",
];

const socials = [
  { label: "Facebook", href: siteConfig.social.facebook, Icon: Facebook },
  { label: "Instagram", href: siteConfig.social.instagram, Icon: Instagram },
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: Linkedin },
];

const faqItems = [
  {
    question: "Sous combien de temps repondez-vous ?",
    answer:
      "L'association repond generalement sous 24 a 48 heures ouvrables selon le volume de demandes.",
  },
  {
    question: "Comment devenir benevole ?",
    answer:
      "Vous pouvez passer par la page benevole ou nous ecrire directement pour preciser vos disponibilites.",
  },
  {
    question: "Comment faire un don ?",
    answer:
      "La page don permet de soutenir les actions de BZ Family en quelques minutes de facon securisee.",
  },
];

type ContactPageProps = {
  searchParams?: Promise<{
    subject?: string;
  }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const defaultSubject =
    params?.subject === "partenariat" ? "Demande de partenariat" : "";
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`;

  return (
    <>
      <section className="relative overflow-hidden bg-encre text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(59,130,246,0.32),transparent_36%),radial-gradient(circle_at_82%_8%,rgba(217,119,6,0.24),transparent_30%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-encre to-transparent" />

        <div className="container-bz relative grid gap-12 py-20 lg:grid-cols-[1fr_0.72fr] lg:items-center lg:py-24 xl:py-28">
          <FadeUp>
            <SectionIntro
              label="Contact"
              title="Restons en contact"
              description="Une question, une proposition de partenariat, une envie de devenir benevole ou de soutenir une action ? L'equipe BZ Family vous repond rapidement."
              theme="dark"
            />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="accent" size="lg" asChild>
                <Link href="#formulaire-contact">
                  Ecrire a l&apos;association
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="inverse" size="lg" asChild>
                <Link href="/devenir-benevole">Devenir benevole</Link>
              </Button>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="glass glow-primary rounded-[2rem] p-6 lg:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
                Infos rapides
              </p>
              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <MapPin className="mb-3 h-5 w-5 text-accent" />
                  <p className="text-sm font-semibold text-white">
                    {siteConfig.address}
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                    <Phone className="mb-3 h-5 w-5 text-accent" />
                    <p className="text-sm font-semibold text-white">
                      {siteConfig.phone}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                    <Mail className="mb-3 h-5 w-5 text-accent" />
                    <p className="text-sm font-semibold text-white">
                      {siteConfig.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section id="formulaire-contact" className="bg-white py-20 lg:py-24">
        <div className="container-bz grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <FadeUp>
            <div className="space-y-5">
              <Card className="rounded-[2rem]">
                <CardContent className="space-y-6 p-7">
                  <div>
                    <p className="kicker mb-4 text-primary before:from-primary before:to-primary/20">
                      Informations
                    </p>
                    <h2 className="font-display text-3xl font-bold text-encre">
                      Nous trouver et nous joindre
                    </h2>
                  </div>

                  <div className="space-y-5">
                    <div className="flex gap-4">
                      <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <h3 className="font-semibold text-encre">Adresse</h3>
                        <p className="text-sm leading-6 text-muted-foreground">
                          {siteConfig.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <h3 className="font-semibold text-encre">Telephone</h3>
                        <a
                          href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                          className="text-sm leading-6 text-muted-foreground transition-colors hover:text-primary"
                        >
                          {siteConfig.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <h3 className="font-semibold text-encre">Email</h3>
                        <a
                          href={`mailto:${siteConfig.email}`}
                          className="text-sm leading-6 text-muted-foreground transition-colors hover:text-primary"
                        >
                          {siteConfig.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[2rem]">
                <CardContent className="p-7">
                  <div className="flex gap-4">
                    <Clock className="mt-1 h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <h3 className="font-display text-2xl font-bold text-encre">
                        Horaires d&apos;ouverture
                      </h3>
                      <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                        {openingHours.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[2rem]">
                <CardContent className="p-7">
                  <h3 className="font-display text-2xl font-bold text-encre">
                    Reseaux sociaux
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {socials.map(({ label, href, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-encre transition-colors hover:border-primary hover:text-primary"
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </FadeUp>

          <FadeUp delay={0.12}>
            <div className="rounded-[2rem] border border-line bg-papier-deep p-4 shadow-card">
              <div className="rounded-[1.5rem] bg-white p-6 md:p-8">
                <div className="mb-8">
                  <p className="kicker mb-4 text-primary before:from-primary before:to-primary/20">
                    Message
                  </p>
                  <h2 className="font-display text-3xl font-bold text-encre">
                    Envoyer une demande
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Precisez votre demande pour que l&apos;equipe puisse vous orienter
                    rapidement vers la bonne personne.
                  </p>
                </div>

                <ContactForm defaultSubject={defaultSubject} />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-papier pb-20 lg:pb-24">
        <div className="container-bz">
          <FadeUp>
            <div className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-card">
              <div className="grid gap-0 lg:grid-cols-[0.7fr_1.3fr]">
                <div className="bg-encre p-8 text-white lg:p-10">
                  <MapPin className="mb-6 h-8 w-8 text-accent" />
                  <h2 className="font-display text-3xl font-bold">
                    Carte d&apos;acces
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-white/65">
                    Retrouvez l&apos;adresse de l&apos;association et preparez votre trajet
                    avant de venir nous rencontrer.
                  </p>
                </div>
                <iframe
                  title="Localisation BZ Family"
                  src={mapUrl}
                  className="h-80 w-full border-0 lg:h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-white pb-24 lg:pb-32">
        <div className="container-bz">
          <SectionIntro
            label="FAQ"
            title="Questions rapides"
            description="Les reponses essentielles avant de contacter l'association."
            align="center"
          />

          <div className="grid gap-5 md:grid-cols-3">
            {faqItems.map((item, index) => (
              <FadeUp key={item.question} delay={index * 0.08}>
                <article className="h-full rounded-[2rem] border border-line bg-papier-deep p-7 transition-all hover:-translate-y-1 hover:shadow-card">
                  <HelpCircle className="mb-5 h-7 w-7 text-primary" />
                  <h2 className="font-display text-xl font-bold text-encre">
                    {item.question}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {item.answer}
                  </p>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
