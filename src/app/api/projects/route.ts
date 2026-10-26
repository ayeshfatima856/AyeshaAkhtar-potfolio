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
  const track = searchParams.get("track") ?? undefined;
  const category = searchParams.get("category") ?? undefined;
  const featured = searchParams.get("featured");
  const all = searchParams.get("all") === "1";

  const session = await requireAdmin(req);
  const adminAll = all && !!session;

  const where: Record<string, unknown> = {};
  if (!adminAll) where.published = true;
  if (track && track !== "all") where.track = track;
  if (category && category !== "all") where.category = category;
  if (featured === "1") where.featured = true;

  const projects = await db.project.findMany({
    where,
    orderBy: [{ sort: "asc" }, { createdAt: "desc" }],
  });
  return ok({ projects });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);

  const b = await readBody<Record<string, string | boolean>>(req);
  const title = String(b.title || "").trim();
  if (!title) return bad("Title is required");
  if (!b.image) return bad("Image is required");

  let slug = slugify(String(b.slug || title));
  const exists = await db.project.findUnique({ where: { slug } });
  if (exists) slug = `${slug}-${Date.now().toString(36).slice(-4)}`;

  const project = await db.project.create({
    data: {
      title,
      slug,
      category: String(b.category || "Website Design"),
      track: String(b.track || "web"),
      kind: String(b.kind || "website"),
      tagline: String(b.tagline || ""),
      description: String(b.description || ""),
      overview: b.overview ? String(b.overview) : null,
      tools: String(b.tools || ""),
      results: b.results ? String(b.results) : null,
      metrics: b.metrics ? String(b.metrics) : null,
      challenge: b.challenge ? String(b.challenge) : null,
      solution: b.solution ? String(b.solution) : null,
      role: String(b.role || ""),
      objectives: b.objectives ? String(b.objectives) : null,
      creativeDirection: b.creativeDirection ? String(b.creativeDirection) : null,
      image: String(b.image),
      gallery: b.gallery ? String(b.gallery) : null,
      liveUrl: b.liveUrl ? String(b.liveUrl) : null,
      socialUrl: b.socialUrl ? String(b.socialUrl) : null,
      showcase: Boolean(b.showcase),
      industry: b.industry ? String(b.industry) : null,
      featured: Boolean(b.featured),
      published: b.published === undefined ? true : Boolean(b.published),
      demo: b.demo === undefined ? true : Boolean(b.demo),
    },
  });
  return ok({ project }, 201);
}
