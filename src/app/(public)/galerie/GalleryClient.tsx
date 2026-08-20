"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaImage } from "@/components/shared/MediaImage";
import { cn } from "@/lib/utils";

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  src: string;
};

type GalleryClientProps = {
  items: GalleryItem[];
};

export function GalleryClient({ items }: GalleryClientProps) {
  const filters = useMemo(
    () => ["Tout", ...Array.from(new Set(items.map((item) => item.category)))],
    [items]
  );
  const [activeFilter, setActiveFilter] = useState<string>("Tout");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const visibleItems = useMemo(() => {
    if (activeFilter === "Tout") return items;
    return items.filter((item) => item.category === activeFilter);
  }, [activeFilter, items]);

  const selected =
    selectedIndex !== null ? visibleItems[selectedIndex] ?? null : null;

  useEffect(() => {
    if (selectedIndex === null || !visibleItems.length) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedIndex(null);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setSelectedIndex((current) => {
          if (current === null) return 0;
          return (current + 1) % visibleItems.length;
        });
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSelectedIndex((current) => {
          if (current === null) return 0;
          return (current - 1 + visibleItems.length) % visibleItems.length;
        });
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex, visibleItems.length]);

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => {
              setActiveFilter(filter);
              setSelectedIndex(null);
            }}
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

      {visibleItems.length === 0 ? (
        <div className="rounded-[1.75rem] border border-dashed border-line bg-white px-6 py-14 text-center text-muted-foreground shadow-soft">
          Aucun média n&apos;a encore été ajouté dans la galerie.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "group overflow-hidden rounded-[1.75rem] border border-line bg-white text-left shadow-soft transition-all hover:-translate-y-1 hover:shadow-card",
                index % 5 === 0 && "lg:row-span-2"
              )}
            >
              <MediaImage
                src={item.src}
                alt={item.title}
                containerClassName={cn(
                  "aspect-[4/3]",
                  index % 5 === 0 && "lg:aspect-[4/5]"
                )}
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
      )}

      {selected && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-encre/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedIndex(null)}
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
              onClick={() => setSelectedIndex(null)}
              aria-label="Fermer l'image"
            >
              <X />
            </Button>
            {visibleItems.length > 1 && (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full px-4"
                  onClick={() =>
                    setSelectedIndex((current) => {
                      if (current === null) return 0;
                      return (current - 1 + visibleItems.length) % visibleItems.length;
                    })
                  }
                  aria-label="Image précédente"
                >
                  ←
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="absolute right-20 top-1/2 z-10 -translate-y-1/2 rounded-full px-4"
                  onClick={() =>
                    setSelectedIndex((current) => {
                      if (current === null) return 0;
                      return (current + 1) % visibleItems.length;
                    })
                  }
                  aria-label="Image suivante"
                >
                  →
                </Button>
              </>
            )}
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
              <p className="mt-3 text-sm text-muted-foreground">
                Navigation clavier : flèches gauche/droite pour parcourir, Échap pour fermer.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
