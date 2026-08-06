# BZ Family — Association à but non lucratif

Site web de l'association **BZ Family** : solidarité, bénévolat, événements et dons.

## Stack technique

- **Next.js 16** (App Router, RSC)
- **TypeScript** strict
- **Tailwind CSS v4** + Shadcn UI
- **Prisma** + PostgreSQL (Supabase)
- **NextAuth.js** (Auth.js)
- **Stripe** (dons)
- **Resend** (emails transactionnels)
- **React Hook Form** + **Zod**

## Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement
cp .env.example .env
# Remplir DATABASE_URL, AUTH_SECRET, STRIPE_*, RESEND_*

# 3. Pousser le schéma Prisma
npm run db:push

# 4. Seed admin (optionnel)
npm run db:seed

# 5. Lancer le dev server
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Admin

- URL : `/admin/login`
- Compte seed : `admin@bzfamily.org` / `admin123`

## Structure

```
src/
├── app/
│   ├── (public)/       # Pages publiques
│   ├── (admin)/        # Back-office
│   └── api/            # Routes API (Stripe, inscriptions, bénévoles)
├── components/
│   ├── ui/             # Composants Shadcn
│   ├── layout/         # Header, Footer
│   ├── home/           # Sections page d'accueil
│   └── forms/          # Formulaires validés Zod
└── lib/                # Prisma, Stripe, Resend, Auth, Utils
```

## Charte graphique

| Token | Valeur |
|-------|--------|
| Primary | `#1E40AF` |
| Accent | `#F59E0B` |
| Accent warm | `#EA580C` |
| Background | `#FFFFFF` |
| Surface muted | `#F9FAFB` |
| Texte | `#111827` |
