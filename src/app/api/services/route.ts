import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, bad, requireAdmin, readBody } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all") === "1" && !!(await requireAdmin(req));
  const services = await db.servicePackage.findMany({
    where: all ? {} : { active: true },
    orderBy: { sort: "asc" },
  });
  return ok({ services });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);
  const b = await readBody<Record<string, string | boolean>>(req);
  const name = String(b.name || "").trim();
  if (!name) return bad("Name is required");
  const service = await db.servicePackage.create({
    data: {
      name,
      tier: String(b.tier || "custom"),
      kind: String(b.kind || "web"),
      price: String(b.price || "$0"),
      period: b.period ? String(b.period) : null,
      tagline: b.tagline ? String(b.tagline) : null,
      features: String(b.features || "[]"),
      highlighted: Boolean(b.highlighted),
      active: b.active === undefined ? true : Boolean(b.active),
      sort: Number(b.sort || 0),
    },
  });
  return ok({ service }, 201);
}
