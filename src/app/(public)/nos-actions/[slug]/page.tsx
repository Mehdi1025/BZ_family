import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/shared/FadeUp";
import { MediaImage } from "@/components/shared/MediaImage";
import { actionDetails } from "@/lib/data/ramzi-pages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function findAction(slug: string) {
  return actionDetails.find((action) => action.slug === slug);
}

export function generateStaticParams() {
  return actionDetails.map((action) => ({ slug: action.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const action = findAction(slug);

  if (!action) {
    return { title: "Action introuvable" };
  }

  return {
    title: `${action.title} | BZ Family`,
    description: action.summary,
    openGraph: {
      title: `${action.title} | BZ Family`,
      description: action.summary,
      images: [action.image],
    },
  };
}

export default async function ActionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const action = findAction(slug);

  if (!action) {
    notFound();
  }

  return (
    <>
      <section className="relative overflow-hidden bg-encre text-white">
        <div className="absolute inset-0 opacity-35">
          <MediaImage
            src={action.image}
            alt=""
            containerClassName="h-full w-full"
            className="scale-105 blur-[1px]"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-encre via-encre/90 to-encre/55" />
        <div className="container-bz relative py-28 lg:py-36">
          <FadeUp>
            <Link
              href="/nos-actions"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour aux actions
            </Link>
            <Badge variant="inverse" className="mb-6">{action.label}</Badge>
            <h1 className="max-w-4xl font-display text-display-md font-bold text-gradient">
              {action.title}
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/72">
              {action.summary}
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-bz grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <FadeUp>
            <aside className="sticky top-28 rounded-2xl border border-line bg-papier p-7">
              <p className="kicker mb-5">Chiffre clé</p>
              <p className="font-display text-4xl font-bold text-primary">
                {action.metric}
              </p>
              <div className="mt-8 border-l-4 border-accent pl-5">
                <Quote className="mb-4 h-6 w-6 text-accent" />
                <p className="text-lg leading-relaxed text-encre">{action.quote}</p>
              </div>
            </aside>
          </FadeUp>

          <article className="space-y-8">
            {action.paragraphs.map((paragraph, index) => (
              <FadeUp key={paragraph} delay={index * 0.08}>
                <p className="text-lg leading-8 text-muted-foreground">
                  {paragraph}
                </p>
              </FadeUp>
            ))}

            <FadeUp delay={0.2}>
              <div className="grid gap-4 md:grid-cols-3">
                {action.photos.map((photo, index) => (
                  <MediaImage
                    key={photo}
                    src={photo}
                    alt={`${action.title} - photo ${index + 1}`}
                    containerClassName="aspect-[4/3] rounded-2xl"
                  />
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.25}>
              <div className="rounded-[2rem] bg-encre p-8 text-white">
                <h2 className="font-display text-3xl font-bold text-gradient">
                  Soutenir cette action
                </h2>
                <p className="mt-4 max-w-2xl text-white/70">
                  Votre aide permet de financer les besoins matériels, la logistique
                  et l&apos;organisation des prochaines actions sur le terrain.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button variant="accent" asChild>
                    <Link href="/faire-un-don">
                      Faire un don <ArrowRight />
                    </Link>
                  </Button>
                  <Button variant="inverse" asChild>
                    <Link href="/contact">Parler à l&apos;équipe</Link>
                  </Button>
                </div>
              </div>
            </FadeUp>
          </article>
        </div>
      </section>
    </>
  );
}
