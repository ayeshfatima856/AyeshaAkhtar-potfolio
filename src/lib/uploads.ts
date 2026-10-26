import "server-only";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

const ALLOWED: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
};
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

export async function saveUpload(file: File): Promise<string> {
  const ext = ALLOWED[file.type];
  if (!ext) throw new Error("Only JPG, PNG, WebP, GIF or SVG images are allowed");
  if (file.size > MAX_BYTES) throw new Error("Image is too large (max 8 MB)");

  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.length === 0) throw new Error("File is empty");
  if (buf.length > MAX_BYTES) throw new Error("Image is too large (max 8 MB)");

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const name = `${Date.now().toString(36)}-${crypto.randomBytes(6).toString("hex")}${ext}`;
  await fs.writeFile(path.join(UPLOAD_DIR, name), buf);
  return `/api/files/${name}`;
}

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

export async function readUpload(name: string): Promise<{ buf: Buffer; mime: string } | null> {
  // sanitize: only plain filenames, no traversal
  if (!/^[a-zA-Z0-9._-]+$/.test(name)) return null;
  const safe = path.basename(name);
  if (safe !== name || safe.startsWith(".")) return null;
  const ext = path.extname(safe).toLowerCase();
  const mime = MIME[ext];
  if (!mime) return null;
  try {
    const buf = await fs.readFile(path.join(UPLOAD_DIR, safe));
    return { buf, mime };
  } catch {
    return null;
  }
}
