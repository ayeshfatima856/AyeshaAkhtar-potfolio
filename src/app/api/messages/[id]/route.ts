import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, bad, requireAdmin, readBody } from "@/lib/api-helpers";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, ctx: Ctx) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);
  const { id } = await ctx.params;
  const b = await readBody<{ read?: boolean }>(req);
  const msg = await db.message.update({ where: { id }, data: { read: Boolean(b.read) } });
  return ok({ message: msg });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);
  const { id } = await ctx.params;
  await db.message.delete({ where: { id } });
  return ok({ ok: true });
}
