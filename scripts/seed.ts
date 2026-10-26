import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/hash";
import {
  adminSeed,
  categoriesSeed,
  projectsSeed,
  blogSeed,
  testimonialsSeed,
  servicesSeed,
  settingsSeed,
} from "./seed-data";

const db = new PrismaClient();

async function main() {
  console.log("Seeding portfolio database…");

  // Admin (upsert so password reset is idempotent)
  const passwordHash = hashPassword(adminSeed.password);
  await db.admin.upsert({
    where: { email: adminSeed.email },
    update: { passwordHash, name: adminSeed.name },
    create: { email: adminSeed.email, passwordHash, name: adminSeed.name },
  });
  console.log(`✓ admin: ${adminSeed.email}`);

  // Categories
  for (const c of categoriesSeed) {
    await db.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, kind: c.kind, color: c.color, sort: c.sort },
      create: c,
    });
  }
  console.log(`✓ ${categoriesSeed.length} categories`);

  // Projects (reset demo projects to canonical state)
  for (const p of projectsSeed) {
    const existing = await db.project.findUnique({ where: { slug: p.slug } });
    if (existing) {
      await db.project.update({ where: { slug: p.slug }, data: p });
    } else {
      await db.project.create({ data: p });
    }
  }
  console.log(`✓ ${projectsSeed.length} projects`);

  // Blog posts
  for (const post of blogSeed) {
    const existing = await db.blogPost.findUnique({ where: { slug: post.slug } });
    if (existing) {
      await db.blogPost.update({ where: { slug: post.slug }, data: post });
    } else {
      await db.blogPost.create({ data: post });
    }
  }
  console.log(`✓ ${blogSeed.length} blog posts`);

  // Testimonials (only seed if table empty, so admin edits survive re-seed)
  const tCount = await db.testimonial.count();
  if (tCount === 0) {
    for (const t of testimonialsSeed) {
      await db.testimonial.create({
        data: {
          ...t,
          initials: t.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase(),
          isDemo: true,
          published: true,
        },
      });
    }
    console.log(`✓ ${testimonialsSeed.length} testimonials`);
  } else {
    console.log(`• testimonials already exist (${tCount}), skipped`);
  }

  // Service packages
  for (const s of servicesSeed) {
    const existing = await db.servicePackage.findFirst({
      where: { name: s.name, kind: s.kind },
    });
    if (existing) {
      await db.servicePackage.update({ where: { id: existing.id }, data: s });
    } else {
      await db.servicePackage.create({ data: s });
    }
  }
  console.log(`✓ ${servicesSeed.length} service packages`);

  // Settings
  for (const [key, value] of Object.entries(settingsSeed)) {
    await db.setting.upsert({ where: { key }, update: { value }, create: { key, value } });
  }
  console.log(`✓ ${Object.keys(settingsSeed).length} settings`);

  console.log("Seed complete ✔");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
