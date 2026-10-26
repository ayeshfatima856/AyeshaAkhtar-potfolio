/**
 * Seed: dedicated Website Showcase (14 live websites, owner-supplied URLs verbatim).
 * - showcase=true, track=web, demo=false, published=true
 * - Auto-groups by verified industry
 * - image auto-detected from public/images/showcase/<name>.jpg when captured
 */
import { PrismaClient } from "@prisma/client";
import { existsSync } from "fs";

const db = new PrismaClient();

const img = (name: string) =>
  existsSync(`public/images/showcase/${name}.jpg`) ? `/images/showcase/${name}.jpg` : "";

interface Site {
  slug: string; title: string; url: string; domain: string; industry: string;
  category: string; tagline: string; description: string; accentNote: string;
  image: string; sort: number;
}

const SITES: Site[] = [
  {
    slug: "showcase-reliant",
    title: "Reliant Solutions",
    url: "https://reliant.pk/",
    domain: "reliant.pk",
    industry: "Home & Technical Services",
    category: "Home Appliance Services",
    tagline: "Authorized LG after-sales service partner in Pakistan.",
    description:
      "Live website of Reliant Solutions — the exclusive authorized after-sales service partner of LG Electronics in Pakistan, covering repair, maintenance and installation of home appliances nationwide.",
    accentNote: "",
    image: img("reliant"),
    sort: 10,
  },
  {
    slug: "showcase-bupa",
    title: "Bupa UK",
    url: "https://www.bupa.co.uk/",
    domain: "bupa.co.uk",
    industry: "Healthcare & Medical",
    category: "Healthcare & Insurance",
    tagline: "UK health insurance and healthcare services.",
    description:
      "Live website of Bupa UK — one of the UK's leading healthcare and health insurance organisations, offering health cover, dental care and health assessments.",
    accentNote: "",
    image: img("bupa"),
    sort: 11,
  },
  {
    slug: "showcase-mydentist",
    title: "mydentist",
    url: "https://www.mydentist.co.uk/",
    domain: "mydentist.co.uk",
    industry: "Healthcare & Medical",
    category: "Dental Care",
    tagline: "One of the UK's largest dental care providers.",
    description:
      "Live website of mydentist — a UK-wide dental care network with hundreds of practices, offering NHS and private treatments, orthodontics and online booking.",
    accentNote: "",
    image: img("mydentist"),
    sort: 12,
  },
  {
    slug: "showcase-fatima",
    title: "Fatima Memorial Hospital",
    url: "https://www.fatimamemorial.org.pk/",
    domain: "fatimamemorial.org.pk",
    industry: "Healthcare & Medical",
    category: "Hospital & Healthcare",
    tagline: "Healthcare and hospital services in Lahore.",
    description:
      "Live website of Fatima Memorial Hospital, Lahore — a healthcare institution providing hospital services, specialist clinics and community health programmes.",
    accentNote: "",
    image: img("fatima"),
    sort: 13,
  },
  {
    slug: "showcase-marriott",
    title: "Marriott Hotels",
    url: "https://www.marriott.com/",
    domain: "marriott.com",
    industry: "Travel & Hospitality",
    category: "Hotels & Hospitality",
    tagline: "Global hotel booking across 30+ brands.",
    description:
      "Live website of Marriott International — one of the world's largest hotel chains, covering booking, rewards and properties across 30+ brands worldwide.",
    accentNote: "",
    image: img("marriott"),
    sort: 14,
  },
  {
    slug: "showcase-enterprise",
    title: "Enterprise Rent-A-Car",
    url: "https://www.enterprise.com/",
    domain: "enterprise.com",
    industry: "Travel & Hospitality",
    category: "Car Rental & Mobility",
    tagline: "Car rental and mobility services worldwide.",
    description:
      "Live website of Enterprise — a global car rental and mobility brand with thousands of locations, covering daily rental, long-term hire and fleet services.",
    accentNote: "",
    image: img("enterprise"),
    sort: 15,
  },
  {
    slug: "showcase-dubaiflowers",
    title: "Dubai Flowers",
    url: "https://dubaiflowers.ae/",
    domain: "dubaiflowers.ae",
    industry: "E-commerce & Retail",
    category: "Flowers & Gifting E-commerce",
    tagline: "Fresh flowers and gifts, delivered across Dubai.",
    description:
      "Live website of Dubai Flowers — an online flower and gifting store delivering fresh bouquets, arrangements and gift hampers across the UAE.",
    accentNote: "",
    image: img("dubaiflowers"),
    sort: 16,
  },
  {
    slug: "showcase-weartzane",
    title: "Wearzane",
    url: "https://wearzane.com/",
    domain: "wearzane.com",
    industry: "E-commerce & Retail",
    category: "Fashion & Apparel E-commerce",
    tagline: "Fashion & apparel store — the website side of the Wearzane brand.",
    description:
      "Live website of Wearzane, a fashion and apparel label. The same brand also appears in the Social Media Management section — this entry represents its e-commerce web presence.",
    accentNote: "",
    image: img("weartzane"),
    sort: 17,
  },
  {
    slug: "showcase-coffeebean",
    title: "The Coffee Bean & Tea Leaf — Pakistan",
    url: "https://www.coffeebean.pk/",
    domain: "coffeebean.pk",
    industry: "Café & Coffee",
    category: "Café Chain",
    tagline: "International café chain, brewed across Pakistan.",
    description:
      "Live website of The Coffee Bean & Tea Leaf Pakistan (operated by Ab Brands Pvt Ltd) — cafés across multiple cities serving coffee, tea and fresh food.",
    accentNote: "",
    image: img("coffeebean"),
    sort: 18,
  },
  {
    slug: "showcase-scafe",
    title: "SCAFE Coffee Roaster",
    url: "https://scafe.pk/",
    domain: "scafe.pk",
    industry: "Café & Coffee",
    category: "Coffee Roaster",
    tagline: "Premium Pakistani coffee roaster and café consultant.",
    description:
      "Live website of SCAFE — a Pakistani specialty coffee roaster selling beans and brewing equipment, plus wholesale supply, café consultation and barista training.",
    accentNote: "",
    image: img("scafe"),
    sort: 19,
  },
  {
    slug: "showcase-alkhan",
    title: "Al Khan Restaurant",
    url: "https://alkhan.com.pk/",
    domain: "alkhan.com.pk",
    industry: "Restaurants & Food",
    category: "Multi-Cuisine Restaurant",
    tagline: "150+ dishes across 6+ cuisines in Lahore.",
    description:
      "Live website of Al Khan Restaurant, Lahore — a multi-cuisine family restaurant offering Pakistani, Chinese and Continental dining, online ordering and catering.",
    accentNote: "",
    image: img("alkhan"),
    sort: 20,
  },
  {
    slug: "showcase-hungrie",
    title: "Hungrie",
    url: "https://www.hungrie.co/",
    domain: "hungrie.co",
    industry: "Restaurants & Food",
    category: "Fast Food & Delivery",
    tagline: "Pizza, burgers and broast — delivered.",
    description:
      "Live website of Hungrie — a fast-food brand offering delivery and pickup across pizza, burgers, wraps, appetizers and its signature injected broast chicken.",
    accentNote: "",
    image: img("hungrie"),
    sort: 21,
  },
  {
    slug: "showcase-baba",
    title: "Baba Bakers & Sweets",
    url: "https://baba.pk/",
    domain: "baba.pk",
    industry: "Restaurants & Food",
    category: "Bakery & Sweets",
    tagline: "30+ years of bakery, sweets and live kitchen.",
    description:
      "Live website of Baba Bakers & Sweets — a Lahore bakery institution for 30+ years, selling cakes, breads, cookies and Arabic sweets with a live kitchen for burgers and sandwiches.",
    accentNote: "",
    image: img("baba"),
    sort: 22,
  },
  {
    slug: "showcase-hajvery",
    title: "Hajvery AC Services",
    url: "https://www.hajveryacservices.com/",
    domain: "hajveryacservices.com",
    industry: "Home & Technical Services",
    category: "AC & HVAC Services",
    tagline: "24/7 AC repair, installation and maintenance in Lahore.",
    description:
      "Live website of Hajvery AC Service & Technicians, Lahore — split, cabinet and commercial AC repair, installation and maintenance with 24/7 emergency support.",
    accentNote: "",
    image: img("hajvery"),
    sort: 23,
  },
];

async function main() {
  let created = 0;
  let updated = 0;
  for (const s of SITES) {
    const data = {
      title: s.title,
      slug: s.slug,
      category: s.category,
      track: "web",
      kind: "website",
      tagline: s.tagline,
      description: s.description,
      role: "Website Showcase",
      image: s.image,
      liveUrl: s.url,
      showcase: true,
      industry: s.industry,
      demo: false,
      published: true,
      featured: false,
      sort: s.sort,
    };
    const existing = await db.project.findUnique({ where: { slug: s.slug } });
    if (existing) {
      // refresh content but never overwrite an admin-set image with empty
      await db.project.update({
        where: { slug: s.slug },
        data: { ...data, image: s.image || existing.image },
      });
      updated++;
    } else {
      await db.project.create({ data });
      created++;
    }
  }
  console.log(`showcase seed done — created ${created}, updated ${updated}`);
  const total = await db.project.count({ where: { showcase: true } });
  console.log(`showcase projects in DB: ${total}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
