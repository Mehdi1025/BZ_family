import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const defaultActions = [
  {
    title: "Aide alimentaire",
    slug: "aide-alimentaire",
    category: "Solidarité",
    summary:
      "Des paniers, des repas et une présence humaine pour soutenir les familles dans les périodes difficiles.",
    imageUrl: "/images/actions/alimentaire.jpg",
    content: [
      "L'aide alimentaire est l'une des actions historiques de BZ Family. Elle répond à une urgence simple : permettre à des familles du quartier de traverser une période compliquée sans perdre leur dignité.",
      "Les bénévoles organisent les collectes, trient les produits, préparent les paniers et assurent les distributions dans un cadre bienveillant. L'objectif est d'apporter une aide concrète, mais aussi d'identifier les autres besoins : isolement, démarches, soutien scolaire ou accompagnement social.",
      "Cette action repose sur la confiance entre habitants, partenaires locaux et bénévoles. Chaque don est utilisé pour renforcer la capacité de l'association à agir vite et au plus près du terrain.",
    ].join("\n\n"),
  },
  {
    title: "Accompagnement scolaire",
    slug: "accompagnement-scolaire",
    category: "Éducation",
    summary:
      "Un soutien régulier pour aider les enfants à reprendre confiance et progresser à leur rythme.",
    imageUrl: "/images/actions/scolaire.jpg",
    content: [
      "L'accompagnement scolaire de BZ Family est pensé comme un espace stable, rassurant et accessible. Les enfants y trouvent un cadre pour faire leurs devoirs, poser leurs questions et consolider les bases vues en classe.",
      "Les séances sont encadrées par des bénévoles formés, avec une attention portée au rythme de chaque enfant. Le but n'est pas seulement de terminer un exercice, mais de redonner confiance et de créer des habitudes de travail durables.",
      "Les familles sont également associées à la démarche. L'association reste disponible pour échanger, orienter et construire un accompagnement cohérent autour de l'enfant.",
    ].join("\n\n"),
  },
  {
    title: "Lien social",
    slug: "lien-social",
    category: "Quartier",
    summary:
      "Des fêtes, ateliers et sorties pour casser l'isolement et renforcer la vie de quartier.",
    imageUrl: "/images/actions/social.jpg",
    content: [
      "Le lien social est au cœur du projet de BZ Family. Les temps collectifs permettent aux habitants de se rencontrer autrement, de sortir de l'isolement et de retrouver une place active dans la vie du quartier.",
      "Ateliers cuisine, fêtes de quartier, sorties familiales et rencontres bénévoles sont organisés tout au long de l'année. Ces rendez-vous simples créent une dynamique collective qui rend les autres actions plus fortes.",
      "Chaque événement est pensé comme une porte d'entrée : venir une première fois, rencontrer l'équipe, proposer une idée, puis peut-être devenir bénévole à son tour.",
    ].join("\n\n"),
  },
];

const defaultPartners = [
  {
    id: "partner-mairie-paris",
    name: "Mairie de Paris",
    logoUrl: "/images/partners/mairie-paris.png",
    websiteUrl: "https://www.paris.fr",
    type: "INSTITUTIONAL" as const,
    description:
      "Soutien institutionnel aux initiatives de proximité et aux actions locales portées par les associations de quartier.",
  },
  {
    id: "partner-croix-rouge",
    name: "Croix-Rouge française",
    logoUrl: "/images/partners/croix-rouge.jpg",
    websiteUrl: "https://www.croix-rouge.fr",
    type: "COMMUNITY" as const,
    description:
      "Partenaire associatif engagé dans l'aide aux personnes, la solidarité de terrain et l'accompagnement des publics fragiles.",
  },
  {
    id: "partner-secours-populaire",
    name: "Secours populaire français",
    logoUrl: "/images/partners/secours-populaire.png",
    websiteUrl: "https://www.secourspopulaire.fr",
    type: "COMMUNITY" as const,
    description:
      "Réseau solidaire mobilisé autour de la lutte contre la précarité et de l'accès aux ressources essentielles.",
  },
  {
    id: "partner-banque-alimentaire",
    name: "Banque Alimentaire",
    logoUrl: "/images/partners/banque-alimentaire.png",
    websiteUrl: "https://www.banquealimentaire.org",
    type: "COMMUNITY" as const,
    description:
      "Appui aux actions alimentaires, aux collectes et à la redistribution de denrées auprès des habitants accompagnés.",
  },
  {
    id: "partner-france-benevolat",
    name: "France Bénévolat",
    logoUrl: "/images/partners/france-benevolat.png",
    websiteUrl: "https://www.francebenevolat.org",
    type: "COMMUNITY" as const,
    description:
      "Réseau de mobilisation bénévole qui facilite l'engagement citoyen et la rencontre entre associations et volontaires.",
  },
  {
    id: "partner-fondation-de-france",
    name: "Fondation de France",
    logoUrl: "/images/partners/fondation-de-france.jpg",
    websiteUrl: "https://www.fondationdefrance.org",
    type: "CORPORATE" as const,
    description:
      "Soutien mécène aux projets d'intérêt général et aux initiatives sociales qui renforcent l'impact local.",
  },
];

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 12);

  await prisma.user.upsert({
    where: { email: "admin@bzfamily.org" },
    update: {
      passwordHash,
      role: "ADMIN",
      name: "Administrateur BZ Family",
    },
    create: {
      email: "admin@bzfamily.org",
      name: "Administrateur BZ Family",
      role: "ADMIN",
      passwordHash,
    },
  });

  await prisma.action.createMany({
    data: defaultActions.map((action) => ({
      ...action,
      isActive: true,
    })),
    skipDuplicates: true,
  });

  await prisma.partner.createMany({
    data: defaultPartners,
    skipDuplicates: true,
  });

  console.log("Seed completed — admin@bzfamily.org / admin123 + 3 actions + 6 partners");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
