import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, bad, requireAdmin, readBody } from "@/lib/api-helpers";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET(req: NextRequest) {
  const session = await requireAdmin(req);
  if (!session) return bad("Unauthorized", 401);
  const messages = await db.message.findMany({ orderBy: { createdAt: "desc" } });
  return ok({ messages });
}

export async function POST(req: NextRequest) {
  const b = await readBody<Record<string, string>>(req);
  const name = String(b.name || "").trim();
  const email = String(b.email || "").trim();
  const message = String(b.message || "").trim();

  if (!name) return bad("Name is required");
  if (!EMAIL_RE.test(email)) return bad("Please enter a valid email address");
  if (message.length < 10) return bad("Message should be at least 10 characters");

  const msg = await db.message.create({
    data: {
      name,
      email,
      subject: b.subject ? String(b.subject).slice(0, 200) : null,
      service: b.service ? String(b.service).slice(0, 100) : null,
      budget: b.budget ? String(b.budget).slice(0, 100) : null,
      message: message.slice(0, 5000),
    },
  });
  return ok({ ok: true, id: msg.id }, 201);
}
