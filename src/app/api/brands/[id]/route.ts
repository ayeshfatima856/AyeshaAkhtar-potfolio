import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, bad, requireAdmin, readBody } from "@/lib/api-helpers";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const brand = await db.brand.findUnique({ where: { id } });
  if (!brand) return bad("Brand not found", 404);
  return ok({ brand });
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);
  const { id } = await ctx.params;
  const b = await readBody<Record<string, unknown>>(req);

  const data: Record<string, unknown> = {};
  const nullableFields = ["logoUrl", "facebookUrl", "instagramUrl", "websiteUrl", "objectives", "creativeDirection"];
  const strFields = [
    "name", "industry", "description",
    "images", "layout", "accent", "role",
    "scope", "objectives", "creativeDirection",
  ] as const;
  for (const f of strFields) {
    if (b[f] === undefined) continue;
    const v = b[f];
    if (nullableFields.includes(f)) {
      const s = v === null || v === undefined ? "" : String(v).trim();
      data[f] = s === "" || s === "null" ? null : s;
    } else {
      data[f] = String(v);
    }
  }
  // link/logo fields handled separately so empty values become real NULLs
  for (const f of ["logoUrl", "facebookUrl", "instagramUrl", "websiteUrl"] as const) {
    if (b[f] === undefined) continue;
    const s = b[f] === null || b[f] === undefined ? "" : String(b[f]).trim();
    data[f] = s === "" || s === "null" ? null : s;
  }
  for (const f of ["isOwnBrand", "featured", "showInSocial", "showInWebsites", "published"] as const)
    if (b[f] !== undefined) data[f] = Boolean(b[f]);
  if (b.sort !== undefined) data.sort = Number(b.sort);

  try {
    const brand = await db.brand.update({ where: { id }, data });
    return ok({ brand });
  } catch {
    return bad("Brand not found", 404);
  }
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);
  const { id } = await ctx.params;
  await db.brand.delete({ where: { id } });
  return ok({ ok: true });
}
