import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, bad, requireAdmin, readBody } from "@/lib/api-helpers";

export async function GET() {
  const rows = await db.setting.findMany();
  const settings: Record<string, string> = {};
  for (const r of rows) settings[r.key] = r.value;
  return ok({ settings });
}

export async function PUT(req: NextRequest) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);
  const b = await readBody<{ settings: Record<string, string> }>(req);
  if (!b.settings || typeof b.settings !== "object") return bad("settings object required");

  for (const [key, value] of Object.entries(b.settings)) {
    await db.setting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) },
    });
  }
  const rows = await db.setting.findMany();
  const settings: Record<string, string> = {};
  for (const r of rows) settings[r.key] = r.value;
  return ok({ settings });
}
