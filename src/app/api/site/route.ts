import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok } from "@/lib/api-helpers";

/**
 * Public aggregate endpoint for the single-page portfolio.
 * Returns everything the public site needs in one round trip.
 */
export async function GET(_req: NextRequest) {
  const [profile, brands, projects, gallery] = await Promise.all([
    db.profile.findFirst(),
    db.brand.findMany({
      where: { published: true },
      orderBy: [{ sort: "asc" }, { createdAt: "asc" }],
    }),
    db.project.findMany({
      where: { published: true },
      orderBy: [{ sort: "asc" }, { createdAt: "desc" }],
    }),
    db.galleryItem.findMany({
      where: { published: true },
      orderBy: [{ sort: "asc" }, { createdAt: "desc" }],
    }),
  ]);

  return ok({ profile, brands, projects, gallery });
}
