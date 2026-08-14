import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function requireAdminSession() {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;

  if (!session) {
    redirect("/admin/login");
  }

  if (role !== "ADMIN") {
    redirect("/");
  }

  return session;
}
