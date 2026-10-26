/**
 * Seed for the premium creative portfolio (master-prompt build).
 * - Keeps the Admin login row untouched
 * - Wipes old demo content (projects, blog, testimonials, packages, settings, categories, messages)
 * - Seeds: Profile, 9 Brands (exact client URLs supplied by the user), 3 website showcase
 *   projects, and a design gallery built from existing assets (real client captures + clearly
 *   labeled samples). No fake stats, no fake testimonials, no invented contact info.
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const CATS = [
  "Social Media Posts",
  "Advertising Creatives",
  "Branding",
  "Product Designs",
  "Restaurant & Food",
  "Real Estate",
  "Fashion",
  "Website Design",
  "Other Creative Work",
];

async function main() {
  /* ---------------- wipe old demo content (keep Admin) ---------------- */
  await db.galleryItem.deleteMany();
  await db.brand.deleteMany();
  await db.project.deleteMany();
  await db.message.deleteMany();
  await db.category.deleteMany();
  await db.blogPost.deleteMany();
  await db.testimonial.deleteMany();
  await db.servicePackage.deleteMany();
  await db.setting.deleteMany();
  await db.profile.deleteMany();

  /* ---------------- profile ---------------- */
  await db.profile.create({
    data: {
      name: "Ayesha Akhtar",
      title: "Graphic Designer · Social Media Manager · Digital Marketer · Website Designer",
      tagline: "Design × Marketing × Web — one creative partner.",
      heroHeadline:
        "Creative Designs. Powerful Brands. Digital Experiences That Convert.",
      heroSub:
        "I help businesses build stronger digital identities through eye-catching graphics, strategic social media management, performance-focused marketing creatives, and modern website experiences.",
      bio: "I'm Ayesha — a multidisciplinary creative working across graphic design, social media management, digital marketing and website design. I partner with businesses of every size, from local restaurants and boutiques to real-estate platforms and immigration consultants, and I take care of how they look, speak and sell online. That means scroll-stopping graphics, a consistent brand voice across every post, campaign creatives built to perform, and clean, modern websites that turn visitors into enquiries. Everything I make is designed to work hard for the business behind it — not just to look good in a feed.",
      approach:
        "Every project starts with listening. I dig into the business, the audience and the competitors before a single pixel is placed. From there I build a clear creative direction — colors, typography, tone and content pillars — so every design decision has a reason behind it. Then I design, test and refine in fast iterations, sharing work early and often so there are no big-reveal surprises. The result is creative that feels effortless to the audience because it was never guesswork behind the scenes.",
      philosophy:
        "Good design is honest, useful and specific. I believe a post should stop the scroll because it says something real, a brand should feel the same on a signboard and an Instagram story, and a website should guide people to act — not just impress them. I keep my work simple where it should be simple and bold where it should be bold, and I never decorate for decoration's sake. If a design doesn't serve the business goal, it isn't finished yet.",
      photoUrl: "/images/site/ayesha-portrait.png",
      facebook: "https://www.facebook.com/orvexamarketing/",
      instagram: "https://www.instagram.com/orvexamarketing/",
      services: JSON.stringify([
        { title: "Graphic Design", blurb: "Posts, ads, banners and brand visuals with a consistent, premium look." },
        { title: "Social Media Management", blurb: "Planning, content calendars, creative development and page management." },
        { title: "Creative Direction", blurb: "Campaign concepts, visual systems and brand-consistent art direction." },
        { title: "Website Design", blurb: "Business websites, landing pages and responsive layouts that convert." },
        { title: "Advertising Creatives", blurb: "Meta ad creatives, visual testing concepts and conversion-focused designs." },
        { title: "Brand Identity", blurb: "Logos, color systems, typography and guidelines that keep brands coherent." },
      ]),
    },
  });

  /* ---------------- brands (exact URLs from client brief) ---------------- */
  const brands = [
    {
      name: "Zameen.pk",
      industry: "Real Estate",
      accent: "#16A34A",
      layout: "banner",
      description:
        "Social media management and digital creative work for Pakistan's leading property portal — property-focused campaigns, listing creatives and real-estate content designed to inform and convert.",
      facebookUrl: "https://www.facebook.com/ZameenPK/",
      instagramUrl: "https://www.instagram.com/zameenpk/?hl=en",
      showInSocial: true,
      role: "Social Media Management",
      sort: 1,
      featured: true,
    },
    {
      name: "Stampare",
      industry: "Printing & Personalized Products",
      accent: "#F97316",
      layout: "collage",
      description:
        "Social media management for a printing and customization store — product highlights, personalized-gift creatives and seasonal campaign posts. Stampare's website is showcased separately under Websites & Digital Experiences.",
      facebookUrl: "https://www.facebook.com/stamparecustomize/",
      instagramUrl: "https://www.instagram.com/stamparecustomize/?hl=en",
      websiteUrl: "https://stamparestore.com/",
      showInSocial: true,
      role: "Social Media Management",
      sort: 2,
    },
    {
      name: "Bundu Khan",
      industry: "Restaurant & Food",
      accent: "#B45309",
      layout: "profile",
      description:
        "Digital presence work for a classic Pakistani restaurant brand — food-forward content and web presence for one of the country's well-known dining names. Website featured under Websites & Digital Experiences.",
      websiteUrl: "https://bundukhan.pk/",
      showInSocial: true,
      role: "Digital Presence",
      sort: 3,
    },
    {
      name: "City Car Center (CCC)",
      industry: "Automotive",
      accent: "#DC2626",
      layout: "mockup",
      description:
        "Social media management for an automotive business — vehicle showcases, service promos and engagement creatives built around a clean, car-crazy visual identity.",
      facebookUrl: "https://www.facebook.com/citycarcenterccc/",
      showInSocial: true,
      role: "Social Media Management",
      sort: 4,
    },
    {
      name: "Bohat Aala Restaurant",
      industry: "Restaurant & Food",
      accent: "#EA580C",
      layout: "profile",
      description:
        "Social media management for a restaurant brand with personality — menu highlights, food photography treatments and campaign posts that make people hungry.",
      facebookUrl: "https://www.facebook.com/BohatAalaRestaurant/",
      showInSocial: true,
      role: "Social Media Management",
      sort: 5,
    },
    {
      name: "Sky Visa UK",
      industry: "Visa & Immigration Services",
      accent: "#0284C7",
      layout: "banner",
      description:
        "Creative and social work for a UK visa and immigration consultancy — trust-focused creatives, clean typography and a professional travel-inspired presentation across web and social.",
      facebookUrl: "https://www.facebook.com/profile.php?id=61571675057414",
      instagramUrl: "https://www.instagram.com/skyvisauk/",
      websiteUrl: "https://www.skyvisa.co.uk",
      showInSocial: true,
      role: "Social Media Management",
      sort: 6,
    },
    {
      name: "Wearzane",
      industry: "Fashion & Apparel",
      accent: "#DB2777",
      layout: "collage",
      description:
        "Social media management for a fashion label — editorial-style drops, stylish product mockups and bold imagery with a clean, magazine-like layout language.",
      facebookUrl: "https://www.facebook.com/Wearzane/",
      instagramUrl: "https://www.instagram.com/wearzane/?hl=en",
      showInSocial: true,
      role: "Social Media Management",
      sort: 7,
    },
    {
      name: "Biryani Restaurant",
      industry: "Food & Restaurant",
      accent: "#D97706",
      layout: "mockup",
      description:
        "Social media management for a biryani house — aroma-first food creatives, offer announcements and community-focused posts that keep regulars coming back.",
      facebookUrl: "https://www.facebook.com/bbiryanirestaurant/",
      showInSocial: true,
      role: "Social Media Management",
      sort: 8,
    },
    {
      name: "Orvexa Marketing",
      industry: "Digital Marketing & Creative Services",
      accent: "#5B5CF0",
      layout: "banner",
      description:
        "My own brand — a digital marketing and creative services studio. Orvexa is where I package my design, social and advertising work under one roof, with its own identity, voice and creative direction. This is my brand, not a client project.",
      facebookUrl: "https://www.facebook.com/orvexamarketing/",
      instagramUrl: "https://www.instagram.com/orvexamarketing/",
      showInSocial: false,
      isOwnBrand: true,
      featured: true,
      role: "My Own Brand",
      sort: 0,
    },
  ];
  const createdBrands: Record<string, string> = {};
  for (const b of brands) {
    const row = await db.brand.create({ data: { ...b, images: "[]" } });
    createdBrands[b.name] = row.id;
  }

  /* ---------------- website showcase projects ---------------- */
  const websiteProjects = [
    {
      title: "Stampare — Website Showcase",
      slug: "stampare-website",
      category: "Website Design",
      tagline: "E-commerce showcase for a printing & personalization store",
      description:
        "Online home for Stampare's customization business — a portfolio showcase entry for the store's website where customers browse and order personalized products.",
      image: "/images/site/preview-stampare.jpg",
      liveUrl: "https://stamparestore.com/",
      role: "Portfolio Showcase",
      industry_: "Printing & Personalized Products",
      accent_: "#F97316",
    },
    {
      title: "Bundu Khan — Website Showcase",
      slug: "bundu-khan-website",
      category: "Website Design",
      tagline: "Web presence for a classic Pakistani restaurant",
      description:
        "Portfolio showcase entry for Bundu Khan's official website — menus, locations and the restaurant's food-first identity translated to the web.",
      image: "/images/site/preview-bundukhan.jpg",
      liveUrl: "https://bundukhan.pk/",
      role: "Portfolio Showcase",
      industry_: "Restaurant & Food",
      accent_: "#B45309",
    },
    {
      title: "Sky Visa UK — Website Showcase",
      slug: "sky-visa-website",
      category: "Website Design",
      tagline: "Clean, trust-first website for a UK immigration consultancy",
      description:
        "Portfolio showcase entry for Sky Visa UK's website — services, process and guidance presented with clean typography and a professional travel-inspired look.",
      image: "/images/live/skyvisa.jpg",
      liveUrl: "https://www.skyvisa.co.uk",
      role: "Portfolio Showcase",
      industry_: "Visa & Immigration Services",
      accent_: "#0284C7",
    },
  ];
  for (const p of websiteProjects) {
    await db.project.create({
      data: {
        title: p.title,
        slug: p.slug,
        category: p.category,
        track: "web",
        kind: "website",
        tagline: p.tagline,
        description: p.description,
        overview:
          "This entry is a portfolio showcase of the brand's live website — presented here to document the digital presence I work with or manage. The exact design/development responsibility for this site is intentionally left generic; it is set in the admin panel via the project's Role field.",
        tools: "",
        image: p.image,
        liveUrl: p.liveUrl,
        role: p.role,
        published: true,
        demo: false,
        featured: false,
        sort: 0,
      },
    });
  }

  /* ---------------- gallery ---------------- */
  // real client website captures (live projects)
  const realShots: Array<[string, string, string]> = [
    ["/images/live/skyvisa.jpg", "Sky Visa UK — live client website", "Website Design"],
    ["/images/live/kingair.jpg", "King Air — live client website", "Website Design"],
    ["/images/live/caffeconcerto.jpg", "Caffe Concerto — live client website", "Website Design"],
    ["/images/live/flowergalleria.jpg", "Flower Galleria — live client website", "Website Design"],
    ["/images/live/dynamic.jpg", "Dynamic Tours — live client website", "Website Design"],
    ["/images/live/reliant.jpg", "Reliant — live client website", "Website Design"],
  ];
  // clearly-labeled sample/concept creatives from the studio archive
  const samples: Array<[string, string, string, string]> = [
    ["/images/projects/bloom.png", "Florist brand — social post sample", "Social Media Posts", "Sample creative"],
    ["/images/projects/elena.png", "Personal brand — content design sample", "Social Media Posts", "Sample creative"],
    ["/images/projects/greenleaf.png", "Eco brand — social post sample", "Social Media Posts", "Sample creative"],
    ["/images/projects/fitfuel.png", "Fitness campaign — ad creative sample", "Advertising Creatives", "Sample creative"],
    ["/images/projects/novawatt.png", "Energy brand — ad creative sample", "Advertising Creatives", "Sample creative"],
    ["/images/projects/leadflow.png", "Lead-gen landing — creative sample", "Advertising Creatives", "Sample creative"],
    ["/images/projects/lumiere.png", "Beauty brand — identity direction sample", "Branding", "Sample creative"],
    ["/images/projects/wanderly.png", "Travel brand — identity direction sample", "Branding", "Sample creative"],
    ["/images/demo/brewberry-latte.png", "Coffee product — product design sample", "Product Designs", "Sample visual"],
    ["/images/demo/nova-airpods.png", "Audio product — product design sample", "Product Designs", "Sample visual"],
    ["/images/projects/saffron.png", "Restaurant brand — food post sample", "Restaurant & Food", "Sample creative"],
    ["/images/demo/brewberry-hero.png", "Coffee house — hero visual sample", "Restaurant & Food", "Sample visual"],
    ["/images/projects/havenkey.png", "Property brand — real estate sample", "Real Estate", "Sample creative"],
    ["/images/demo/nestsky-villa.png", "Villa stays — real estate sample", "Real Estate", "Sample visual"],
    ["/images/demo/aurelia-rack.png", "Fashion label — editorial sample", "Fashion", "Sample visual"],
    ["/images/demo/aurelia-hero.png", "Fashion campaign — editorial sample", "Fashion", "Sample visual"],
    ["/images/live/demo-nova.jpg", "Concept build — tech brand site", "Website Design", "Concept demo"],
    ["/images/live/demo-nestsky.jpg", "Concept build — stays booking site", "Website Design", "Concept demo"],
    ["/images/demo/nova-macbook.png", "Workspace tech — creative sample", "Other Creative Work", "Sample visual"],
    ["/images/demo/emirates-cabin.png", "Airline concept — visual sample", "Other Creative Work", "Sample visual"],
    ["/images/site/workspace.png", "Studio workspace — brand visual", "Other Creative Work", "Brand asset"],
  ];

  let sort = 0;
  for (const [url, title, category] of realShots) {
    await db.galleryItem.create({
      data: {
        title,
        category,
        imageUrl: url,
        caption: "Live client website — captured from the real site. Full link available on request.",
        isSample: false,
        sort: sort++,
      },
    });
  }
  for (const [url, title, category, caption] of samples) {
    await db.galleryItem.create({
      data: {
        title,
        category,
        imageUrl: url,
        caption: `${caption} — designed by me as a style/creative sample, not client-published work.`,
        isSample: true,
        sort: sort++,
      },
    });
  }

  console.log("Seed complete:");
  console.log("  profile: 1");
  console.log(`  brands: ${Object.keys(createdBrands).length}`);
  console.log("  website projects: 3");
  console.log(`  gallery items: ${sort}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
