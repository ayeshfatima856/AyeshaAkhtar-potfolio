import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, bad, requireAdmin, readBody } from "@/lib/api-helpers";

export const GALLERY_CATEGORIES = [
  "All Projects",
  "Social Media Posts",
  "Advertising Creatives",
  "Branding",
  "Product Designs",
  "Restaurant & Food",
  "Real Estate",
  "Fashion",
  "Website Design",
  "Other Creative Work",
];

export async function GET(req: NextRequest) {
  const session = await requireAdmin(req);
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all") === "1" && !!session;
  const category = searchParams.get("category");

  const where: Record<string, unknown> = {};
  if (!all) where.published = true;
  if (category && category !== "All Projects") where.category = category;

  const items = await db.galleryItem.findMany({
    where,
    orderBy: [{ sort: "asc" }, { createdAt: "desc" }],
  });
  return ok({ items, categories: GALLERY_CATEGORIES });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);
  const b = await readBody<Record<string, unknown>>(req);
  const imageUrl = String(b.imageUrl || "").trim();
  if (!imageUrl) return bad("An image is required");

  const item = await db.galleryItem.create({
    data: {
      title: String(b.title || ""),
      category: String(b.category || "Other Creative Work"),
      imageUrl,
      caption: b.caption ? String(b.caption) : null,
      isSample: Boolean(b.isSample),
      projectId: b.projectId ? String(b.projectId) : null,
      brandId: b.brandId ? String(b.brandId) : null,
      sort: Number(b.sort || 0),
      published: b.published === undefined ? true : Boolean(b.published),
    },
  });
  return ok({ item }, 201);
}
