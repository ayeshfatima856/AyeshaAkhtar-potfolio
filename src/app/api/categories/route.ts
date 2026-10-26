import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, bad, requireAdmin, readBody } from "@/lib/api-helpers";

export async function GET() {
  const categories = await db.category.findMany({
    orderBy: { sort: "asc" },
  });
  return ok({ categories });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);
  const b = await readBody<Record<string, string>>(req);
  const name = String(b.name || "").trim();
  if (!name) return bad("Name is required");
  const slug =
    name.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-") ||
    `cat-${Date.now()}`;
  try {
    const category = await db.category.create({
      data: {
        name,
        slug,
        kind: String(b.kind || "web"),
        color: String(b.color || "#8B5CF6"),
        sort: Number(b.sort || 0),
      },
    });
    return ok({ category }, 201);
  } catch {
    return bad("Category already exists", 409);
  }
}
