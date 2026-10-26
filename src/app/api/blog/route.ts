import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, bad, requireAdmin, readBody } from "@/lib/api-helpers";

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all") === "1" && !!(await requireAdmin(req));
  const posts = await db.blogPost.findMany({
    where: all ? {} : { published: true },
    orderBy: { createdAt: "desc" },
  });
  return ok({ posts });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);
  const b = await readBody<Record<string, string | boolean | number>>(req);
  const title = String(b.title || "").trim();
  if (!title) return bad("Title is required");
  if (!b.content) return bad("Content is required");

  let slug = slugify(String(b.slug || title));
  const exists = await db.blogPost.findUnique({ where: { slug } });
  if (exists) slug = `${slug}-${Date.now().toString(36).slice(-4)}`;

  const post = await db.blogPost.create({
    data: {
      title,
      slug,
      excerpt: String(b.excerpt || ""),
      content: String(b.content),
      cover: b.cover ? String(b.cover) : null,
      tags: String(b.tags || ""),
      readTime: Number(b.readTime || 5),
      published: b.published === undefined ? true : Boolean(b.published),
    },
  });
  return ok({ post }, 201);
}
