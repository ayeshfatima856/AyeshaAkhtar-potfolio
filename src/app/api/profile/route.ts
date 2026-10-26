import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, bad, requireAdmin, readBody } from "@/lib/api-helpers";

export async function GET() {
  const profile = await db.profile.findFirst();
  return ok({ profile });
}

export async function PUT(req: NextRequest) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);
  const b = await readBody<Record<string, unknown>>(req);

  const current = await db.profile.findFirst();
  if (!current) return bad("Profile not found", 404);

  const data: Record<string, unknown> = {};
  const strFields = [
    "name", "title", "tagline", "heroHeadline", "heroSub", "bio", "approach",
    "philosophy", "photoUrl", "email", "whatsapp", "phone1", "phone2", "location", "facebook",
    "instagram", "linkedin", "behance", "services",
  ] as const;
  for (const f of strFields) if (b[f] !== undefined) data[f] = String(b[f]);

  try {
    const profile = await db.profile.update({ where: { id: current.id }, data });
    return ok({ profile });
  } catch {
    return bad("Could not update profile", 500);
  }
}
