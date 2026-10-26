import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  verifyPassword,
  createToken,
  SESSION_COOKIE,
  cookieOptions,
} from "@/lib/auth";
import { readBody, bad } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  const { email, password } = await readBody<{ email?: string; password?: string }>(req);

  if (!email || !password) return bad("Email and password are required");

  const admin = await db.admin.findUnique({ where: { email: email.toLowerCase().trim() } });
  if (!admin || !verifyPassword(password, admin.passwordHash)) {
    return bad("Invalid email or password", 401);
  }

  const token = createToken({ id: admin.id, email: admin.email, name: admin.name });
  const res = NextResponse.json({
    ok: true,
    admin: { id: admin.id, email: admin.email, name: admin.name },
  });
  res.cookies.set(SESSION_COOKIE, token, cookieOptions);
  return res;
}
