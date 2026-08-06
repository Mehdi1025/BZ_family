import Image from "next/image";
import { partners } from "@/lib/data/mock";

export function Partners() {
  const doubled = [...partners, ...partners];

  return (
    <section className="border-y border-line bg-[#F8F7F4] py-16 lg:py-20">
      <div className="container-bz mb-10">
        <p className="kicker">Partenaires</p>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#F8F7F4] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#F8F7F4] to-transparent" />
        <div className="flex animate-marquee items-center">
          {doubled.map((partner, i) => (
            <div
              key={`${partner.id}-${i}`}
              className="mx-12 flex h-16 w-36 shrink-0 items-center justify-center opacity-40 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={partner.logoUrl}
                alt={partner.name}
                width={120}
                height={48}
                className="h-8 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
