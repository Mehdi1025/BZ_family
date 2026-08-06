import type { Metadata } from "next";
import { SectionIntro } from "@/components/shared/FadeUp";
import { GalleryClient } from "./GalleryClient";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Revivez les moments forts de BZ Family : événements, actions solidaires, bénévoles et vie de quartier.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-encre text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(59,130,246,0.32),transparent_35%),radial-gradient(circle_at_85%_30%,rgba(217,119,6,0.22),transparent_30%)]" />
        <div className="container-bz relative py-28 lg:py-36">
          <SectionIntro
            label="Médias"
            title="Galerie"
            description="Revivez nos moments forts : les actions de terrain, les bénévoles, les événements et les rencontres qui font vivre BZ Family."
            theme="dark"
          />
        </div>
      </section>

      <section className="section-padding bg-papier">
        <div className="container-bz">
          <GalleryClient />
        </div>
      </section>
    </>
  );
}
