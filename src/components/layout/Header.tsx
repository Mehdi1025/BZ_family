"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/data/mock";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled && !mobileOpen;
  const light = !transparent;

  return (
    <header
      className={cn(
        "inset-x-0 top-0 z-50 transition-all duration-500",
        isHome ? "fixed" : "sticky",
        transparent
          ? "border-transparent bg-transparent"
          : "border-line bg-white/90 shadow-soft backdrop-blur-md"
      )}
    >
      <div className="container-bz flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <Link href="/" className="group flex items-center gap-3">
          <span
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg font-display text-sm font-extrabold transition-colors",
              transparent
                ? "bg-white text-[#0a0a0f]"
                : "bg-primary text-white group-hover:bg-primary/90"
            )}
          >
            BZ
          </span>
          <span className="flex flex-col leading-none">
            <span
              className={cn(
                "font-display text-lg font-bold",
                light ? "text-encre" : "text-white"
              )}
            >
              BZ Family
            </span>
            <span
              className={cn(
                "mt-0.5 text-[10px] font-medium uppercase tracking-wider",
                light ? "text-muted-foreground" : "text-white/50"
              )}
            >
              Association de quartier
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  light
                    ? isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-papier-deep hover:text-encre"
                    : isActive
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant={light ? "outline" : "inverse"} size="sm" asChild>
            <Link href="/devenir-benevole">Bénévole</Link>
          </Button>
          <Button variant="accent" size="sm" asChild>
            <Link href="/faire-un-don">Faire un don</Link>
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg border transition-colors xl:hidden",
            light
              ? "border-line hover:bg-papier-deep"
              : "border-white/20 text-white hover:bg-white/10"
          )}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-white xl:hidden"
          >
            <nav className="container-bz flex flex-col py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border-b border-line py-4 text-lg font-semibold text-encre transition-colors hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 flex flex-col gap-3 pb-10">
                <Button variant="accent" size="lg" asChild>
                  <Link href="/faire-un-don">Faire un don</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/devenir-benevole">Devenir bénévole</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
