import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, bad, requireAdmin, readBody } from "@/lib/api-helpers";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const post = await db.blogPost.findFirst({ where: { OR: [{ id }, { slug: id }] } });
  if (!post) return bad("Post not found", 404);
  return ok({ post });
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);
  const { id } = await ctx.params;
  const b = await readBody<Record<string, string | boolean | number>>(req);
  const data: Record<string, unknown> = {};
  for (const f of ["title", "excerpt", "content", "cover", "tags"] as const)
    if (b[f] !== undefined) data[f] = String(b[f]);
  if (b.readTime !== undefined) data.readTime = Number(b.readTime);
  if (b.published !== undefined) data.published = Boolean(b.published);
  const post = await db.blogPost.update({ where: { id }, data });
  return ok({ post });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);
  const { id } = await ctx.params;
  await db.blogPost.delete({ where: { id } });
  return ok({ ok: true });
}
