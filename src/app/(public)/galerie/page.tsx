import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MediaImage } from "@/components/shared/MediaImage";
import { siteImages } from "@/lib/data/images";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Photos et vidéos des événements et actions de BZ Family.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="bg-surface-muted section-padding">
        <div className="container-bz">
          <SectionHeading
            eyebrow="Médias"
            title="Galerie"
            description="Revivez nos moments forts en images."
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-bz grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteImages.gallery.map((item) => (
            <div key={item.id} className="group relative">
              <MediaImage
                src={item.src}
                alt={item.title}
                containerClassName="aspect-square rounded-xl"
              />
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end rounded-xl bg-gradient-to-t from-black/70 to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="font-semibold text-white">{item.title}</p>
                <p className="text-sm text-white/80">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
