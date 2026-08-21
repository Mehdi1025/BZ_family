import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const allowedImageTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function POST(request: Request) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;

  if (!session || role !== "ADMIN") {
    return NextResponse.json({ error: "Acces admin requis." }, { status: 403 });
  }

  const formData = await request.formData();
  const uploadedFile = formData.get("file");

  if (!uploadedFile || typeof uploadedFile === "string") {
    return NextResponse.json({ error: "Image manquante." }, { status: 400 });
  }

  const file = uploadedFile as File;
  const extension = allowedImageTypes[file.type];

  if (!extension) {
    return NextResponse.json(
      { error: "Format non supporte. Utilisez JPG, PNG, WEBP ou GIF." },
      { status: 422 }
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "Image trop lourde. Taille maximale : 5 Mo." },
      { status: 413 }
    );
  }

  const uploadDirectory = path.join(process.cwd(), "public", "uploads", "admin");
  await mkdir(uploadDirectory, { recursive: true });

  const filename = `${randomUUID()}.${extension}`;
  const destination = path.join(uploadDirectory, filename);
  const bytes = Buffer.from(await file.arrayBuffer());

  await writeFile(destination, bytes);

  return NextResponse.json({
    url: `/uploads/admin/${filename}`,
  });
}
