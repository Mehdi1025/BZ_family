import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

type CheckStatus = "ok" | "missing" | "error";

function envSet(name: string): CheckStatus {
  const value = process.env[name];
  return value && value.trim().length > 0 ? "ok" : "missing";
}

export async function GET() {
  const checks: Record<string, CheckStatus | string> = {
    DATABASE_URL: envSet("DATABASE_URL"),
    DIRECT_URL: envSet("DIRECT_URL"),
    AUTH_SECRET: envSet("AUTH_SECRET"),
    AUTH_URL: envSet("AUTH_URL"),
    NEXT_PUBLIC_SITE_URL: envSet("NEXT_PUBLIC_SITE_URL"),
    database_connection: "error",
    admin_user: "error",
    admin_password: "error",
  };

  const errors: string[] = [];

  for (const key of [
    "DATABASE_URL",
    "DIRECT_URL",
    "AUTH_SECRET",
  ] as const) {
    if (checks[key] === "missing") {
      errors.push(`${key} n'est pas défini sur Vercel (Production).`);
    }
  }

  if (checks.AUTH_SECRET === "ok" && process.env.AUTH_SECRET!.length < 32) {
    errors.push("AUTH_SECRET est trop court (minimum 32 caractères recommandé).");
  }

  if (checks.DATABASE_URL === "ok") {
    try {
      await prisma.$queryRaw`SELECT 1`;
      checks.database_connection = "ok";
    } catch (error) {
      checks.database_connection = "error";
      errors.push(
        `Connexion base impossible : ${error instanceof Error ? error.message : "erreur inconnue"}`
      );
    }
  } else {
    checks.database_connection = "missing";
  }

  if (checks.database_connection === "ok") {
    try {
      const admin = await prisma.user.findUnique({
        where: { email: "admin@bzfamily.org" },
      });

      if (!admin) {
        checks.admin_user = "missing";
        errors.push(
          "Compte admin absent. Lance npm run db:seed sur ton PC (avec le même .env Supabase)."
        );
      } else {
        checks.admin_user = "ok";
        checks.admin_role = admin.role;

        if (!admin.passwordHash) {
          checks.admin_password = "missing";
          errors.push("Admin sans mot de passe. Relance npm run db:seed.");
        } else {
          const valid = await bcrypt.compare("admin123", admin.passwordHash);
          checks.admin_password = valid ? "ok" : "invalid";
          if (!valid) {
            errors.push(
              "Mot de passe admin incorrect en base. Relance npm run db:seed."
            );
          }
        }
      }
    } catch (error) {
      checks.admin_user = "error";
      errors.push(
        `Lecture admin impossible : ${error instanceof Error ? error.message : "erreur inconnue"}`
      );
    }
  }

  const allOk =
    errors.length === 0 &&
    checks.database_connection === "ok" &&
    checks.admin_user === "ok" &&
    checks.admin_password === "ok";

  return NextResponse.json(
    {
      status: allOk ? "ok" : "error",
      message: allOk
        ? "Tout est configuré. Tu peux te connecter sur /admin/login"
        : "Problème de configuration détecté. Corrige les points ci-dessous.",
      checks,
      errors,
      login: {
        url: "/admin/login",
        email: "admin@bzfamily.org",
        password: "admin123",
      },
    },
    { status: allOk ? 200 : 503 }
  );
}
