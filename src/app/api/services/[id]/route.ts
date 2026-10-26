import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, bad, requireAdmin, readBody } from "@/lib/api-helpers";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, ctx: Ctx) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);
  const { id } = await ctx.params;
  const b = await readBody<Record<string, string | boolean>>(req);
  const data: Record<string, unknown> = {};
  for (const f of ["name", "tier", "kind", "price", "period", "tagline", "features"] as const)
    if (b[f] !== undefined) data[f] = String(b[f]);
  for (const f of ["highlighted", "active"] as const)
    if (b[f] !== undefined) data[f] = Boolean(b[f]);
  if (b.sort !== undefined) data.sort = Number(b.sort);
  const service = await db.servicePackage.update({ where: { id }, data });
  return ok({ service });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);
  const { id } = await ctx.params;
  await db.servicePackage.delete({ where: { id } });
  return ok({ ok: true });
}
