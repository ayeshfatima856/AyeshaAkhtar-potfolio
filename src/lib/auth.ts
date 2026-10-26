import "server-only";
import crypto from "crypto";
import { hashPassword, verifyPassword } from "./hash";

const SECRET =
  process.env.SESSION_SECRET || "ayesha-portfolio-dev-secret-change-in-prod";
export const SESSION_COOKIE = "aa_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export { hashPassword, verifyPassword };

/* ---------- signed session token ---------- */
type SessionPayload = {
  sub: string;
  email: string;
  name: string;
  exp: number;
};

function b64url(input: string | Buffer): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromB64url(input: string): string {
  return Buffer.from(input.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString();
}

function sign(data: string): string {
  return b64url(crypto.createHmac("sha256", SECRET).update(data).digest());
}

export function createToken(admin: { id: string; email: string; name: string }): string {
  const payload: SessionPayload = {
    sub: admin.id,
    email: admin.email,
    name: admin.name,
    exp: Date.now() + SESSION_TTL_MS,
  };
  const body = b64url(JSON.stringify(payload));
  return `${body}.${sign(body)}`;
}

export function verifyToken(token: string | undefined | null): SessionPayload | null {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = sign(body);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(fromB64url(body)) as SessionPayload;
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

/* ---------- cookie helpers ---------- */
export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: false, // sandbox runs behind http proxy
  path: "/",
  maxAge: SESSION_TTL_MS / 1000,
};
