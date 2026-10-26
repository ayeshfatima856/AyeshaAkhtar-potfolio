import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, bad, requireAdmin, readBody } from "@/lib/api-helpers";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, ctx: Ctx) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);
  const { id } = await ctx.params;
  const b = await readBody<Record<string, string | boolean | number>>(req);
  const data: Record<string, unknown> = {};
  for (const f of ["name", "role", "company", "quote"] as const)
    if (b[f] !== undefined) data[f] = String(b[f]);
  if (b.rating !== undefined) data.rating = Math.min(5, Math.max(1, Number(b.rating)));
  if (b.published !== undefined) data.published = Boolean(b.published);
  const testimonial = await db.testimonial.update({ where: { id }, data });
  return ok({ testimonial });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);
  const { id } = await ctx.params;
  await db.testimonial.delete({ where: { id } });
  return ok({ ok: true });
}
