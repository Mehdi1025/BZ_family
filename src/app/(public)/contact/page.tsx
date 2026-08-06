import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/lib/utils";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez l'équipe BZ Family pour toute question ou demande d'information.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-surface-muted section-padding">
        <div className="container-bz">
          <SectionHeading
            eyebrow="Contact"
            title="Restons en contact"
            description="Une question, une suggestion ou envie de vous engager ? Écrivez-nous."
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-bz grid gap-12 lg:grid-cols-3">
          <div className="space-y-6">
            <div className="flex gap-4">
              <MapPin className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Adresse</h3>
                <p className="text-sm text-muted-foreground">{siteConfig.address}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Téléphone</h3>
                <p className="text-sm text-muted-foreground">{siteConfig.phone}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-sm text-muted-foreground">{siteConfig.email}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 rounded-2xl border border-border bg-white p-8 shadow-soft">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
