import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

/*
 * Resolve a usable SQLite location at runtime:
 * - local dev / own server: use the seeded db/custom.db next to the project (writable)
 * - serverless hosts (e.g. Netlify functions): the deployment dir is read-only,
 *   so copy the bundled seeded DB to /tmp once and use that copy instead.
 */
function resolveDatabaseUrl(): string {
  const bundled = path.join(process.cwd(), 'db', 'custom.db')
  if (!fs.existsSync(bundled)) {
    // no bundled DB (fresh checkout) — fall back to env / schema default
    return process.env.DATABASE_URL || 'file:./db/custom.db'
  }
  try {
    fs.accessSync(bundled, fs.constants.W_OK)
    return `file:${bundled}`
  } catch {
    const tmpDb = path.join('/tmp', 'portfolio.db')
    try {
      if (!fs.existsSync(tmpDb)) fs.copyFileSync(bundled, tmpDb)
    } catch {
      // ignore copy errors; Prisma will surface a clearer error if the DB is unusable
    }
    return `file:${tmpDb}`
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: resolveDatabaseUrl() } },
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
