import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, bad, requireAdmin, readBody } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const session = await requireAdmin(req);
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all") === "1" && !!session;

  const brands = await db.brand.findMany({
    where: all ? {} : { published: true },
    orderBy: [{ sort: "asc" }, { createdAt: "asc" }],
  });
  return ok({ brands });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);

  const b = await readBody<Record<string, unknown>>(req);
  const name = String(b.name || "").trim();
  if (!name) return bad("Brand name is required");

  const brand = await db.brand.create({
    data: {
      name,
      industry: String(b.industry || "Other"),
      description: String(b.description || ""),
      logoUrl: b.logoUrl ? String(b.logoUrl) : null,
      facebookUrl: b.facebookUrl ? String(b.facebookUrl) : null,
      instagramUrl: b.instagramUrl ? String(b.instagramUrl) : null,
      websiteUrl: b.websiteUrl ? String(b.websiteUrl) : null,
      images: String(b.images || "[]"),
      layout: String(b.layout || "profile"),
      accent: String(b.accent || "#5B5CF0"),
      isOwnBrand: Boolean(b.isOwnBrand),
      featured: Boolean(b.featured),
      showInSocial: b.showInSocial === undefined ? true : Boolean(b.showInSocial),
      showInWebsites: Boolean(b.showInWebsites),
      role: String(b.role || ""),
      scope: String(b.scope || ""),
      objectives: b.objectives ? String(b.objectives) : null,
      creativeDirection: b.creativeDirection ? String(b.creativeDirection) : null,
      sort: Number(b.sort || 0),
      published: b.published === undefined ? true : Boolean(b.published),
    },
  });
  return ok({ brand }, 201);
}
