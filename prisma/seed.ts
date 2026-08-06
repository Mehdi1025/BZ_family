import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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

  console.log("Seed completed — admin@bzfamily.org / admin123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
