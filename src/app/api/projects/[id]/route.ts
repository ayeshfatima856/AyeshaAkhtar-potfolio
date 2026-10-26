import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, bad, requireAdmin, readBody } from "@/lib/api-helpers";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const project = await db.project.findFirst({
    where: { OR: [{ id }, { slug: id }] },
  });
  if (!project) return bad("Project not found", 404);
  return ok({ project });
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);
  const { id } = await ctx.params;
  const b = await readBody<Record<string, string | boolean>>(req);

  const data: Record<string, unknown> = {};
  const strFields = [
    "title", "category", "track", "kind", "tagline", "description", "overview",
    "tools", "results", "metrics", "challenge", "solution", "image", "gallery",
    "liveUrl", "socialUrl", "role", "objectives", "creativeDirection", "industry",
  ] as const;
  for (const f of strFields) if (b[f] !== undefined) data[f] = String(b[f]);
  for (const f of ["featured", "published", "demo", "showcase"] as const)
    if (b[f] !== undefined) data[f] = Boolean(b[f]);

  const project = await db.project.update({ where: { id }, data });
  return ok({ project });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);
  const { id } = await ctx.params;
  await db.project.delete({ where: { id } });
  return ok({ ok: true });
}
