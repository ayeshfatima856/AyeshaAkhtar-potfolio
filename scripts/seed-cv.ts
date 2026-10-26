/**
 * Seed for the premium creative portfolio (final master-prompt build).
 * - Wipes ALL old demo projects (user: "remove the websites that are not real")
 * - Seeds: Profile, 9 Brands (exact client URLs, verbatim), 3 REAL website
 *   projects (Stampare / Bundu Khan / Sky Visa UK), 18-item design gallery.
 * - Keeps Admin login, messages and settings intact.
 * - No fake stats, no testimonials, no invented contact info.
 */
import { PrismaClient } from "@prisma/client";
import {
  DEFAULT_BRANDS,
  DEFAULT_GALLERY,
  DEFAULT_PROFILE,
} from "../src/components/cv/data";

const db = new PrismaClient();

const WEBSITE_PROJECTS = [
  {
    title: "Stampare — Printing & Customization Store",
    slug: "stampare-website",
    category: "E-commerce Showcase",
    track: "web",
    kind: "website",
    tagline: "Custom printing products, presented clean and built to convert.",
    description:
      "Website project entry for Stampare, a printing and personalization store — a product-first presentation that makes customized merchandise easy to browse. The same brand also appears in the Social Media Management section, where the focus is feed content and campaign creatives.",
    overview:
      "This entry represents the website side of the Stampare brand: an e-commerce style showcase for personalized products — mugs, apparel, gifts and custom print items. The goal of the presentation is simple: let products speak, keep navigation obvious and make ordering feel effortless. The social media entry for Stampare, shown separately in the Brands section, covers the content and creative work running on the brand's Facebook and Instagram pages.",
    role: "Website Project",
    image: "/images/cv/preview-stampare.jpg",
    gallery: JSON.stringify(["/images/cv/print-products.png"]),
    liveUrl: "https://stamparestore.com/",
    socialUrl: "https://www.facebook.com/stamparecustomize/",
    objectives:
      "A clean product-first layout, clear categories for custom products, and friction-free paths from browsing to enquiry or order.",
    creativeDirection:
      "Bright, commercial and product-led — consistent brand accents, readable typography and photography that shows the personalization quality up close.",
    demo: false,
    featured: true,
    sort: 1,
  },
  {
    title: "Bundu Khan — Restaurant Website",
    slug: "bundu-khan-website",
    category: "Restaurant Website",
    track: "web",
    kind: "website",
    tagline: "A heritage restaurant brand, served warm online.",
    description:
      "Website showcase entry for Bundu Khan, a classic restaurant brand. The presentation focuses on menu favourites and the dining experience with warm, appetite-first creative direction.",
    overview:
      "This entry represents the web presence of the Bundu Khan restaurant brand: presenting menu highlights, the dining atmosphere and contact paths with the same warmth as the dining room itself. Food businesses live on appetite appeal, so the visual direction leans on rich food imagery and simple, confident navigation. Bundu Khan appears in the Websites section only — no social page entry is claimed for this brand.",
    role: "Website Project",
    image: "/images/cv/preview-bundukhan.jpg",
    gallery: JSON.stringify(["/images/gen/food-biryani.png"]),
    liveUrl: "https://bundukhan.pk/",
    socialUrl: "",
    objectives:
      "Present the menu clearly, make reservations and contact effortless, and carry the restaurant's heritage feel into a modern layout.",
    creativeDirection:
      "Deep brand colours, rich food photography and simple navigation — visitors should go from craving to reservation in a couple of taps.",
    demo: false,
    featured: true,
    sort: 2,
  },
  {
    title: "Sky Visa UK — Visa & Immigration Consultancy",
    slug: "sky-visa-website",
    category: "Business Website",
    track: "web",
    kind: "website",
    tagline: "Trust-first web presence for a UK visa consultancy.",
    description:
      "Website and digital presentation entry for Sky Visa UK, a visa and immigration consultancy. The brand also appears in the Social Media Management section with its Facebook and Instagram content.",
    overview:
      "This entry represents the website side of Sky Visa UK: a professional, trust-first presentation for a high-stakes industry. Visa applicants need clarity and reassurance — the layout prioritizes readable service explanations, destination information and clear contact paths. The social media entry for Sky Visa UK, shown separately in the Brands section, covers the Facebook and Instagram content strategy.",
    role: "Website Project",
    image: "/images/cv/preview-skyvisa.jpg",
    gallery: JSON.stringify(["/images/cv/visa-poster-1.png", "/images/cv/visa-poster-2.png"]),
    liveUrl: "https://www.skyvisa.co.uk",
    socialUrl: "https://www.facebook.com/profile.php?id=61571675057414",
    objectives:
      "Communicate credibility instantly, explain services and destinations clearly, and guide applicants toward a consultation.",
    creativeDirection:
      "Clean sky-blue palette, structured layouts and confident headline typography — a professional travel and immigration-inspired visual language.",
    demo: false,
    featured: true,
    sort: 3,
  },
];

async function main() {
  console.log("· wiping old demo content (projects / brands / gallery)…");
  await db.galleryItem.deleteMany();
  await db.brand.deleteMany();
  await db.project.deleteMany();

  console.log("· seeding profile…");
  const existingProfile = await db.profile.findFirst();
  if (existingProfile) {
    await db.profile.update({
      where: { id: existingProfile.id },
      data: { ...DEFAULT_PROFILE, services: "[]" },
    });
  } else {
    await db.profile.create({ data: { ...DEFAULT_PROFILE, services: "[]" } });
  }

  console.log("· seeding brands…");
  for (const b of DEFAULT_BRANDS) {
    await db.brand.create({
      data: {
        name: b.name,
        industry: b.industry,
        description: b.description,
        logoUrl: b.logoUrl ?? null,
        facebookUrl: b.facebookUrl ?? null,
        instagramUrl: b.instagramUrl ?? null,
        websiteUrl: b.websiteUrl ?? null,
        images: JSON.stringify(b.images),
        layout: b.layout,
        accent: b.accent,
        isOwnBrand: b.isOwnBrand,
        featured: b.featured,
        showInSocial: b.showInSocial,
        showInWebsites: b.showInWebsites,
        role: b.role,
        scope: b.scope,
        objectives: b.objectives ?? null,
        creativeDirection: b.creativeDirection ?? null,
        sort: b.sort,
        published: true,
      },
    });
  }

  console.log("· seeding website projects…");
  for (const p of WEBSITE_PROJECTS) {
    await db.project.create({ data: p as never });
  }

  console.log("· seeding gallery…");
  for (const g of DEFAULT_GALLERY) {
    await db.galleryItem.create({
      data: {
        title: g.title,
        category: g.category,
        imageUrl: g.imageUrl,
        caption: g.caption ?? null,
        isSample: g.isSample,
        sort: g.sort,
        published: true,
      },
    });
  }

  const counts = {
    brands: await db.brand.count(),
    projects: await db.project.count(),
    gallery: await db.galleryItem.count(),
    messages: await db.message.count(),
  };
  console.log("✓ seeded:", counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
