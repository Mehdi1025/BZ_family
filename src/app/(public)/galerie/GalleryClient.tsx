"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaImage } from "@/components/shared/MediaImage";
import { cn } from "@/lib/utils";
import { galleryFilters, galleryItems } from "@/lib/data/ramzi-pages";

type GalleryItem = (typeof galleryItems)[number];

export function GalleryClient() {
  const [activeFilter, setActiveFilter] = useState<(typeof galleryFilters)[number]>("Tout");
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const visibleItems = useMemo(() => {
    if (activeFilter === "Tout") return galleryItems;
    return galleryItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-3">
        {galleryFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-semibold transition-all",
              activeFilter === filter
                ? "border-primary bg-primary text-white shadow-soft"
                : "border-line bg-white text-muted-foreground hover:border-primary hover:text-primary"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelected(item)}
            className={cn(
              "group overflow-hidden rounded-[1.75rem] border border-line bg-white text-left shadow-soft transition-all hover:-translate-y-1 hover:shadow-card",
              index % 5 === 0 && "lg:row-span-2"
            )}
          >
            <MediaImage
              src={item.src}
              alt={item.title}
              containerClassName={cn("aspect-[4/3]", index % 5 === 0 && "lg:aspect-[4/5]")}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {item.category}
              </p>
              <h2 className="mt-2 font-display text-xl font-bold text-encre">
                {item.title}
              </h2>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-encre/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute right-4 top-4 z-10 rounded-full"
              onClick={() => setSelected(null)}
              aria-label="Fermer l'image"
            >
              <X />
            </Button>
            <MediaImage
              src={selected.src}
              alt={selected.title}
              containerClassName="aspect-[16/10]"
              sizes="90vw"
            />
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {selected.category}
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-encre">
                {selected.title}
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
