import Link from "next/link";
import { signOut } from "@/lib/auth";
import { requireAdminSession } from "@/lib/admin";
import {
  Calendar,
  ClipboardList,
  Heart,
  ImageIcon,
  LayoutDashboard,
  LogOut,
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
  { href: "/admin/dons", label: "Dons", icon: Heart },
];

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminSession();

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-72 flex-col border-r border-border bg-foreground text-white lg:flex">
        <div className="border-b border-white/10 p-6">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <Logo variant="light" size="sm" />
            <span className="text-xl font-bold">Administration</span>
          </Link>
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
      <main className="flex-1 bg-surface-muted p-6 lg:p-8">{children}</main>
    </div>
  );
}
