import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/shared/FadeUp";
import { MediaImage } from "@/components/shared/MediaImage";
import prisma from "@/lib/prisma";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function findAction(slug: string) {
  try {
    return await prisma.action.findFirst({
      where: {
        slug,
        isActive: true,
      },
    });
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const actions = await prisma.action.findMany({
      where: { isActive: true },
      select: { slug: true },
    });

    return actions.map((action) => ({ slug: action.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const action = await findAction(slug);

  if (!action) {
    return { title: "Action introuvable" };
  }

  return {
    title: `${action.title} | BZ Family`,
    description: action.summary,
    openGraph: {
      title: `${action.title} | BZ Family`,
      description: action.summary,
      images: action.imageUrl ? [action.imageUrl] : [],
    },
  };
}

export default async function ActionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const action = await findAction(slug);

  if (!action) {
    notFound();
  }

  const paragraphs = action.content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  let relatedActions: Awaited<ReturnType<typeof prisma.action.findMany>> = [];

  try {
    relatedActions = await prisma.action.findMany({
      where: {
        isActive: true,
        id: { not: action.id },
      },
      orderBy: { createdAt: "desc" },
      take: 3,
    });
  } catch {
    relatedActions = [];
  }

  return (
    <>
      <section className="relative overflow-hidden bg-encre text-white">
        <div className="absolute inset-0 opacity-35">
          <MediaImage
            src={action.imageUrl ?? "/images/gallery/2.jpg"}
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
            <Badge variant="inverse" className="mb-6">{action.category}</Badge>
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
              <p className="kicker mb-5">Repère</p>
              <p className="font-display text-3xl font-bold text-primary">
                {action.category}
              </p>
              <div className="mt-8 border-l-4 border-accent pl-5">
                <p className="text-lg leading-relaxed text-encre">
                  Cette action est publiée depuis l&apos;espace d&apos;administration
                  et visible automatiquement sur le site public.
                </p>
              </div>
            </aside>
          </FadeUp>

          <article className="space-y-8">
            {paragraphs.map((paragraph, index) => (
              <FadeUp key={paragraph} delay={index * 0.08}>
                <p className="text-lg leading-8 text-muted-foreground">
                  {paragraph}
                </p>
              </FadeUp>
            ))}

            <FadeUp delay={0.2}>
              <MediaImage
                src={action.imageUrl ?? "/images/gallery/2.jpg"}
                alt={action.title}
                containerClassName="aspect-[16/9] rounded-[2rem]"
              />
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

            {relatedActions.length > 0 ? (
              <FadeUp delay={0.3}>
                <div className="space-y-5">
                  <h2 className="font-display text-3xl font-bold text-encre">
                    Autres actions à découvrir
                  </h2>
                  <div className="grid gap-5 md:grid-cols-3">
                    {relatedActions.map((related) => (
                      <Link
                        key={related.id}
                        href={`/nos-actions/${related.slug}`}
                        className="rounded-2xl border border-line bg-papier p-5 transition-all hover:-translate-y-1 hover:shadow-card"
                      >
                        <Badge variant="accent">{related.category}</Badge>
                        <h3 className="mt-4 text-xl font-semibold text-encre">
                          {related.title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                          {related.summary}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ) : null}
          </article>
        </div>
      </section>
    </>
  );
}

