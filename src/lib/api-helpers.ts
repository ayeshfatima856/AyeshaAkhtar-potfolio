import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifyToken, SessionPayload } from "./auth";

export function ok<T>(data: T, init?: number) {
  return NextResponse.json(data as object, { status: init ?? 200 });
}

export function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function getSessionFromReq(
  req: NextRequest
): SessionPayload | null {
  return verifyToken(req.cookies.get(SESSION_COOKIE)?.value);
}

export async function requireAdmin(
  req: NextRequest
): Promise<SessionPayload | null> {
  return getSessionFromReq(req);
}

export function parseJson<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function readBody<T = Record<string, unknown>>(
  req: NextRequest
): Promise<T> {
  try {
    return (await req.json()) as T;
  } catch {
    return {} as T;
  }
}
