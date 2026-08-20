import Link from "next/link";
import { signOut } from "@/lib/auth";
import { requireAdminSession } from "@/lib/admin";
import {
  ArrowLeft,
  Calendar,
  ClipboardList,
  ExternalLink,
  Handshake,
  Heart,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Mail,
  Newspaper,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";

export const dynamic = "force-dynamic";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/actions", label: "Actions", icon: ClipboardList },
  { href: "/admin/galerie", label: "Galerie", icon: ImageIcon },
  { href: "/admin/evenements", label: "Événements", icon: Calendar },
  { href: "/admin/benevoles", label: "Bénévoles", icon: Users },
  { href: "/admin/actualites", label: "Actualités", icon: Newspaper },
  { href: "/admin/partenaires", label: "Partenaires", icon: Handshake },
  { href: "/admin/contact", label: "Messages", icon: Mail },
  { href: "/admin/dons", label: "Dons", icon: Heart },
];

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminSession();

  return (
    <div className="min-h-screen bg-surface-muted">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-border bg-foreground text-white lg:flex">
          <div className="border-b border-white/10 p-6">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <Logo variant="light" size="sm" />
              <div>
                <span className="block text-xl font-bold">Administration</span>
                <span className="text-xs uppercase tracking-[0.2em] text-white/45">
                  BZ Family
                </span>
              </div>
            </Link>
          </div>

          <div className="border-b border-white/10 px-4 py-4">
            <Button
              asChild
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <Link href="/" target="_blank">
                <ExternalLink className="h-4 w-4" />
                Voir le site public
              </Link>
            </Button>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
            className="border-t border-white/10 p-4"
          >
            <Button
              type="submit"
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </Button>
          </form>
        </aside>

        <main className="flex-1">
          <div className="border-b border-border bg-white/85 backdrop-blur">
            <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Link
                    href="/"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted-foreground transition-colors hover:border-primary hover:text-primary lg:hidden"
                    aria-label="Retour au site"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                  <div className="lg:hidden">
                    <Link href="/admin/dashboard" className="flex items-center gap-3">
                      <Logo variant="dark" size="sm" />
                      <div>
                        <span className="block text-base font-bold text-encre">
                          Admin BZ Family
                        </span>
                        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          Gestion de contenu
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>

                <Button asChild variant="outline" className="hidden sm:inline-flex lg:hidden">
                  <Link href="/" target="_blank">
                    <ExternalLink className="h-4 w-4" />
                    Voir le site
                  </Link>
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 text-sm font-medium text-encre shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                  >
                    <item.icon className="h-4 w-4 text-primary" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
