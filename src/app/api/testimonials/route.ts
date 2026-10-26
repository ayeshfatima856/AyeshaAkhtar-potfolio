import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, bad, requireAdmin, readBody } from "@/lib/api-helpers";

export async function GET() {
  const testimonials = await db.testimonial.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
  return ok({ testimonials });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);
  const b = await readBody<Record<string, string | boolean | number>>(req);
  const name = String(b.name || "").trim();
  if (!name) return bad("Name is required");
  if (!b.quote) return bad("Quote is required");
  const testimonial = await db.testimonial.create({
    data: {
      name,
      role: String(b.role || "Client"),
      company: b.company ? String(b.company) : null,
      quote: String(b.quote),
      rating: Math.min(5, Math.max(1, Number(b.rating || 5))),
      initials: name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase(),
      isDemo: b.isDemo === undefined ? true : Boolean(b.isDemo),
      published: b.published === undefined ? true : Boolean(b.published),
    },
  });
  return ok({ testimonial }, 201);
}
