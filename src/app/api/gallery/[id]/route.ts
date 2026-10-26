import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, bad, requireAdmin, readBody } from "@/lib/api-helpers";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const item = await db.galleryItem.findUnique({ where: { id } });
  if (!item) return bad("Gallery item not found", 404);
  return ok({ item });
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);
  const { id } = await ctx.params;
  const b = await readBody<Record<string, unknown>>(req);

  const data: Record<string, unknown> = {};
  for (const f of ["title", "category", "imageUrl", "caption", "projectId", "brandId"] as const)
    if (b[f] !== undefined) data[f] = b[f] === null || b[f] === "" ? null : String(b[f]);
  for (const f of ["isSample", "published"] as const)
    if (b[f] !== undefined) data[f] = Boolean(b[f]);
  if (b.sort !== undefined) data.sort = Number(b.sort);

  try {
    const item = await db.galleryItem.update({ where: { id }, data });
    return ok({ item });
  } catch {
    return bad("Gallery item not found", 404);
  }
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);
  const { id } = await ctx.params;
  await db.galleryItem.delete({ where: { id } });
  return ok({ ok: true });
}
