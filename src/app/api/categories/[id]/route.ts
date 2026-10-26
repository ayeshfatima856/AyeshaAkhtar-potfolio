import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, bad, requireAdmin, readBody } from "@/lib/api-helpers";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, ctx: Ctx) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);
  const { id } = await ctx.params;
  const b = await readBody<Record<string, string>>(req);
  const data: Record<string, unknown> = {};
  for (const f of ["name", "kind", "color"] as const)
    if (b[f] !== undefined) data[f] = String(b[f]);
  if (b.sort !== undefined) data.sort = Number(b.sort);
  const category = await db.category.update({ where: { id }, data });
  return ok({ category });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);
  const { id } = await ctx.params;
  const category = await db.category.findUnique({ where: { id } });
  if (!category) return bad("Category not found", 404);
  const inUse = await db.project.count({ where: { category: category.name } });
  if (inUse > 0) return bad(`Cannot delete — ${inUse} project(s) use this category`, 409);
  await db.category.delete({ where: { id } });
  return ok({ ok: true });
}
