import { NextResponse } from "next/server";

export function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/sitemap.xml`;

  return new NextResponse(robots, {
    headers: { "Content-Type": "text/plain" },
  });
}
