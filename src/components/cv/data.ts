/* ============================================================
   Creative Portfolio — content model + defaults
   Integrity rules:
   - Only URLs supplied by the owner are used, verbatim.
   - No fabricated metrics, testimonials, emails or phones.
   - Sample/AI-generated visuals are flagged `isSample`.
   ============================================================ */

export interface BrandData {
  id: string;
  name: string;
  industry: string;
  logoUrl?: string | null;
  description: string;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  websiteUrl?: string | null;
  images: string[];
  layout: "banner" | "profile" | "collage" | "mockup" | "editorial" | "own";
  accent: string;
  isOwnBrand: boolean;
  featured: boolean;
  showInSocial: boolean;
  showInWebsites: boolean;
  role: string;
  scope: string;
  objectives?: string | null;
  creativeDirection?: string | null;
  sort: number;
}

export interface GalleryData {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption?: string | null;
  isSample: boolean;
  sort: number;
}

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  heroHeadline: string;
  heroSub: string;
  bio: string;
  approach: string;
  philosophy: string;
  photoUrl?: string | null;
  email?: string | null;
  whatsapp?: string | null;
  phone1?: string | null;
  phone2?: string | null;
  location?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  behance?: string | null;
}

/* ---------------- profile ---------------- */

export const DEFAULT_PROFILE: ProfileData = {
  name: "Ayesha Akhtar",
  title: "Graphic Designer · Social Media Manager · Digital Marketer · Website Designer",
  tagline: "Design that sells. Content that connects. Campaigns that convert.",
  heroHeadline: "Creative Designs. Powerful Brands. Digital Experiences That Convert.",
  heroSub:
    "I help businesses build stronger digital identities through eye-catching graphics, strategic social media management, performance-focused marketing creatives, and modern website experiences.",
  bio: "I'm Ayesha — a multidisciplinary creative working across graphic design, social media management, digital marketing and website design. I work with restaurants, real estate brands, fashion labels, automotive businesses and service companies to build digital presences that look sharp and perform even sharper. From a single social post to a full brand identity, every piece I design is meant to do one thing: move the audience toward action.",
  approach:
    "Every project starts with understanding the business — the audience, the offer, and what 'working' actually means. Then I design backwards from that goal: creative that fits the platform, copy that fits the audience, and visuals that stay consistent across every touchpoint.",
  philosophy:
    "Good design isn't decoration — it's communication. A post should stop the scroll, a campaign should tell one clear story, and a website should make the next step obvious. I keep things honest, clean and conversion-focused.",
  photoUrl: "/images/site/ayesha-portrait.png",
  phone1: "96871756645",
  phone2: "03157982508",
};

/* ---------------- services (owner-specified) ---------------- */

export interface ServiceData {
  id: string;
  icon: string;
  title: string;
  blurb: string;
  points: string[];
  cta: string;
}

export const SERVICES: ServiceData[] = [
  {
    id: "graphic-design",
    icon: "palette",
    title: "Graphic Design",
    blurb: "Scroll-stopping visuals designed for every platform and format — from daily posts to full campaign toolkits.",
    points: [
      "Social media post designs",
      "Promotional advertisements",
      "Campaign creatives",
      "Branding and visual identity",
      "Product advertisements",
      "Marketing banners",
    ],
    cta: "See design work",
  },
  {
    id: "social-media-management",
    icon: "share",
    title: "Social Media Management",
    blurb: "Consistent, on-brand page management that keeps your audience engaged and your feed looking professional.",
    points: [
      "Facebook page management",
      "Instagram account management",
      "Content planning",
      "Creative development",
      "Brand consistency",
      "Social media campaign support",
    ],
    cta: "View brands managed",
  },
  {
    id: "digital-marketing",
    icon: "target",
    title: "Digital Marketing",
    blurb: "Ad creatives and campaign direction built for performance — designed, tested and refined against real results.",
    points: [
      "Meta advertising creatives",
      "Campaign creative direction",
      "Ad design and visual testing",
      "Conversion-focused creative concepts",
    ],
    cta: "See campaign results",
  },
  {
    id: "website-design",
    icon: "globe",
    title: "Website Design",
    blurb: "Modern, responsive websites that load fast, look premium and guide visitors toward enquiry or checkout.",
    points: [
      "Business websites",
      "Landing pages",
      "E-commerce website showcases",
      "Responsive website layouts",
      "Website visual design",
    ],
    cta: "Explore websites",
  },
];

/* ---------------- brands (owner-supplied URLs, verbatim) ---------------- */

export const DEFAULT_BRANDS: BrandData[] = [
  {
    id: "zameen",
    name: "Zameen.pk",
    industry: "Real Estate",
    description:
      "Social-first creative work for Pakistan's leading property platform — property listing creatives, campaign visuals and advertising designs built to drive visibility, clicks and enquiries.",
    facebookUrl: "https://www.facebook.com/ZameenPK/",
    instagramUrl: "https://www.instagram.com/zameenpk/?hl=en",
    websiteUrl: null,
    images: ["/images/cv/zameen-casestudy.png", "/images/gen/realestate-ad.png"],
    layout: "banner",
    accent: "#16a34a",
    isOwnBrand: false,
    featured: true,
    showInSocial: true,
    showInWebsites: false,
    role: "Social Media & Creative Design",
    scope: "Social Media Management · Advertising Creatives",
    objectives:
      "Increase campaign visibility and lead flow for real estate promotions with property creatives that feel premium and perform across Meta and Google placements.",
    creativeDirection:
      "Bold property imagery, confident typographic hierarchy and platform-native layouts — from listing highlight posts to full performance-campaign showcases.",
    sort: 1,
  },
  {
    id: "stampare",
    name: "Stampare",
    industry: "Printing · Customization · Personalized Products",
    description:
      "Social media content and website presentation for a printing & personalization store — product showcases, offer posts and seasonal campaigns that turn followers into orders.",
    facebookUrl: "https://www.facebook.com/stamparecustomize/",
    instagramUrl: "https://www.instagram.com/stamparecustomize/?hl=en",
    websiteUrl: "https://stamparestore.com/",
    images: ["/images/cv/print-products.png", "/images/cv/preview-stampare.jpg"],
    layout: "profile",
    accent: "#e11d48",
    isOwnBrand: false,
    featured: true,
    showInSocial: true,
    showInWebsites: true,
    role: "Social Media & Website Design",
    scope: "Social Media Management · Website Design",
    objectives:
      "Give a product-heavy print brand a clean, commercial social feed and a website presentation that makes custom products easy to browse and order.",
    creativeDirection:
      "Bright product photography, playful offer badges and consistent brand accents across every post — mirrored by a clean, product-first website layout.",
    sort: 2,
  },
  {
    id: "bundu-khan",
    name: "Bundu Khan",
    industry: "Restaurant & Food",
    description:
      "Food-forward website showcase for a classic restaurant brand — presenting menu favourites and the dining experience with warm, appetite-first creative direction.",
    facebookUrl: null,
    instagramUrl: null,
    websiteUrl: "https://bundukhan.pk/",
    images: ["/images/cv/preview-bundukhan.jpg", "/images/gen/food-biryani.png"],
    layout: "mockup",
    accent: "#b45309",
    isOwnBrand: false,
    featured: false,
    showInSocial: false,
    showInWebsites: true,
    role: "Website Showcase",
    scope: "Website Design Showcase",
    objectives:
      "Present a heritage restaurant brand online with the same warmth as its dining room — clear menu presentation, easy contact and a trustworthy feel.",
    creativeDirection:
      "Rich food photography, deep brand colours and simple navigation — designed so visitors can go from craving to reservation in a couple of taps.",
    sort: 3,
  },
  {
    id: "ccc",
    name: "City Car Center (CCC)",
    industry: "Automotive",
    description:
      "Automotive social media marketing — showroom updates, vehicle highlight posts and promo creatives designed to drive showroom visits and buyer enquiries.",
    facebookUrl: "https://www.facebook.com/citycarcenterccc/",
    instagramUrl: null,
    websiteUrl: null,
    images: ["/images/cv/automotive-post.png"],
    layout: "mockup",
    accent: "#dc2626",
    isOwnBrand: false,
    featured: false,
    showInSocial: true,
    showInWebsites: false,
    role: "Social Media & Creative Design",
    scope: "Social Media Management · Ad Creatives",
    objectives:
      "Keep the dealership's feed active and premium — vehicle spotlights, offer announcements and creatives that generate enquiries.",
    creativeDirection:
      "High-contrast automotive imagery, energetic promo layouts and a confident red-accented visual language that matches the showroom floor.",
    sort: 4,
  },
  {
    id: "bohat-aala",
    name: "Bohat Aala Restaurant",
    industry: "Restaurant & Food",
    description:
      "Social media presence for a restaurant that lives up to its name — food creatives, offer announcements and engaging page content that keeps followers hungry.",
    facebookUrl: "https://www.facebook.com/BohatAalaRestaurant/",
    instagramUrl: null,
    websiteUrl: null,
    images: ["/images/cv/burger-poster.png"],
    layout: "profile",
    accent: "#f59e0b",
    isOwnBrand: false,
    featured: false,
    showInSocial: true,
    showInWebsites: false,
    role: "Social Media & Creative Design",
    scope: "Social Media Management",
    objectives:
      "Build a recognizable, appetite-driven feed that turns casual scrollers into walk-in customers through consistent posting and offer-led creatives.",
    creativeDirection:
      "Warm food photography, bold promo typography and festive offer designs tuned for Facebook reach and shares.",
    sort: 5,
  },
  {
    id: "sky-visa",
    name: "Sky Visa UK",
    industry: "Visa & Immigration Services",
    description:
      "Trust-first branding and content for a UK visa & immigration consultancy — clean typography, professional visuals and clear service communication across web and social.",
    facebookUrl: "https://www.facebook.com/profile.php?id=61571675057414",
    instagramUrl: "https://www.instagram.com/skyvisauk/",
    websiteUrl: "https://www.skyvisa.co.uk",
    images: ["/images/cv/visa-poster-1.png", "/images/cv/preview-skyvisa.jpg"],
    layout: "editorial",
    accent: "#0ea5e9",
    isOwnBrand: false,
    featured: true,
    showInSocial: true,
    showInWebsites: true,
    role: "Social Media & Website Design",
    scope: "Social Media Management · Website Design",
    objectives:
      "Communicate credibility in a high-stakes industry — content and web presence that reassures applicants and clearly explains services and destinations.",
    creativeDirection:
      "Clean sky-blue palette, structured layouts, confident headline typography and a professional travel-inspired visual language.",
    sort: 6,
  },
  {
    id: "wearzane",
    name: "Wearzane",
    industry: "Fashion & Apparel",
    description:
      "Fashion-forward social content and campaign creatives — drop announcements, product styling posts and Meta ad designs for an apparel brand.",
    facebookUrl: "https://www.facebook.com/Wearzane/",
    instagramUrl: "https://www.instagram.com/wearzane/?hl=en",
    websiteUrl: null,
    images: ["/images/gen/fashion-drop.png"],
    layout: "collage",
    accent: "#ec4899",
    isOwnBrand: false,
    featured: false,
    showInSocial: true,
    showInWebsites: false,
    role: "Social Media & Ad Creatives",
    scope: "Social Media Management · Advertising Creatives",
    objectives:
      "Give the label an editorial-quality feed and ad creatives that convert browsers into buyers during drops and seasonal sales.",
    creativeDirection:
      "Editorial layouts, bold product-first imagery and trend-aware typography — with Meta ad variations built for A/B creative testing.",
    sort: 7,
  },
  {
    id: "biryani",
    name: "Biryani Restaurant",
    industry: "Food & Restaurant",
    description:
      "Appetite-first social content for a biryani house — food-led posts, offers and page management that keep followers craving more.",
    facebookUrl: "https://www.facebook.com/bbiryanirestaurant/",
    instagramUrl: null,
    websiteUrl: null,
    images: ["/images/gen/food-biryani.png", "/images/cv/food-flyer.png"],
    layout: "banner",
    accent: "#c2410c",
    isOwnBrand: false,
    featured: false,
    showInSocial: true,
    showInWebsites: false,
    role: "Social Media & Creative Design",
    scope: "Social Media Management",
    objectives:
      "Own the local food conversation with rich, shareable food content and offer posts that drive orders and visits.",
    creativeDirection:
      "Steamy close-up food imagery, warm spice-toned palettes and deal-led layouts designed for shares and weekend orders.",
    sort: 8,
  },
  {
    id: "orvexa",
    name: "Orvexa Marketing",
    industry: "Digital Marketing & Creative Services",
    description:
      "My own creative brand — the lab where I design, test and ship marketing creatives, brand identities and campaign concepts before bringing the best of them to client work.",
    facebookUrl: "https://www.facebook.com/orvexamarketing/",
    instagramUrl: "https://www.instagram.com/orvexamarketing/",
    websiteUrl: null,
    images: ["/images/gen/orvexa-identity.png", "/images/gen/orvexa-post.png", "/images/gen/orvexa-ad.png"],
    layout: "own",
    accent: "#5B5CF0",
    isOwnBrand: true,
    featured: true,
    showInSocial: false,
    showInWebsites: false,
    role: "Founder & Creative Director",
    scope: "Own Brand · Brand Identity · Creative Lab",
    objectives:
      "Build a recognizable creative services brand with a consistent identity across Facebook and Instagram — and a home for experimental design work.",
    creativeDirection:
      "Electric indigo as the signature colour, geometric logo language and bold campaign typography — a look that stands out in a crowded marketing space.",
    sort: 9,
  },
];

/* ---------------- gallery ---------------- */

export const GALLERY_CATEGORIES = [
  "All",
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

export const DEFAULT_GALLERY: GalleryData[] = [
  { id: "g1", title: "Cheesy Crunch Burger — Promo Poster", category: "Restaurant & Food", imageUrl: "/images/cv/burger-poster.png", caption: "Food promo poster design", isSample: false, sort: 1 },
  { id: "g2", title: "Study Visa Campaign — Main Creative", category: "Advertising Creatives", imageUrl: "/images/cv/visa-poster-1.png", caption: "Visa consultancy ad design", isSample: false, sort: 2 },
  { id: "g3", title: "Elegance Perfume — Product Ad Design", category: "Product Designs", imageUrl: "/images/cv/pin-niche.jpg", caption: "Perfume product social ad", isSample: false, sort: 3 },
  { id: "g4", title: "Zameen.pk — Campaign Case Study Design", category: "Real Estate", imageUrl: "/images/cv/zameen-casestudy.png", caption: "Real estate campaign showcase", isSample: false, sort: 4 },
  { id: "g5", title: "Restaurant Takeaway Flyer", category: "Restaurant & Food", imageUrl: "/images/cv/food-flyer.png", caption: "Food delivery flyer design", isSample: false, sort: 5 },
  { id: "g6", title: "Study Visa Campaign — Alt Version", category: "Advertising Creatives", imageUrl: "/images/cv/visa-poster-2.png", caption: "Alternate campaign direction", isSample: false, sort: 6 },
  { id: "g7", title: "Orvexa — Brand Identity Board", category: "Branding", imageUrl: "/images/gen/orvexa-identity.png", caption: "Own brand identity exploration", isSample: false, sort: 7 },
  { id: "g8", title: "Orvexa — Social Media Post", category: "Social Media Posts", imageUrl: "/images/gen/orvexa-post.png", caption: "Own brand content design", isSample: false, sort: 8 },
  { id: "g9", title: "Fashion Drop — Announcement Post", category: "Fashion", imageUrl: "/images/gen/fashion-drop.png", caption: "Apparel drop creative", isSample: true, sort: 9 },
  { id: "g10", title: "Property Campaign Creative", category: "Real Estate", imageUrl: "/images/gen/realestate-ad.png", caption: "Real estate ad design", isSample: true, sort: 10 },
  { id: "g11", title: "Biryani Special — Social Post", category: "Restaurant & Food", imageUrl: "/images/gen/food-biryani.png", caption: "Food social media design", isSample: true, sort: 11 },
  { id: "g12", title: "Automotive Showroom Ad", category: "Advertising Creatives", imageUrl: "/images/cv/automotive-post.png", caption: "Car dealership promo design", isSample: true, sort: 12 },
  { id: "g13", title: "Custom Print Merchandise Showcase", category: "Product Designs", imageUrl: "/images/cv/print-products.png", caption: "Printed products flat-lay", isSample: true, sort: 13 },
  { id: "g14", title: "Visa & Travel Services Creative", category: "Advertising Creatives", imageUrl: "/images/cv/travel-visa.png", caption: "Travel consultancy design", isSample: true, sort: 14 },
  { id: "g15", title: "Orvexa — Ad Creative", category: "Social Media Posts", imageUrl: "/images/gen/orvexa-ad.png", caption: "Own brand ad design", isSample: false, sort: 15 },
  { id: "g16", title: "Stampare — E-commerce Website", category: "Website Design", imageUrl: "/images/cv/preview-stampare.jpg", caption: "Printing store web design", isSample: false, sort: 16 },
  { id: "g17", title: "Bundu Khan — Restaurant Website", category: "Website Design", imageUrl: "/images/cv/preview-bundukhan.jpg", caption: "Restaurant web presentation", isSample: false, sort: 17 },
  { id: "g18", title: "Sky Visa UK — Consulting Website", category: "Website Design", imageUrl: "/images/cv/preview-skyvisa.jpg", caption: "Visa consultancy web design", isSample: false, sort: 18 },
];

/* ---------------- process & skills ---------------- */

export const PROCESS_STEPS = [
  { n: "01", title: "Discover", text: "We talk goals, audience and market. I study your brand, competitors and what's actually working in your niche right now." },
  { n: "02", title: "Plan", text: "I map out the creative direction — formats, platforms, content themes and a timeline — so we both know exactly what's coming." },
  { n: "03", title: "Design", text: "The creative work happens: posts, ads, brand assets or web layouts — designed to fit your brand and built to perform." },
  { n: "04", title: "Refine", text: "We review together. You share feedback, I iterate fast — testing variations where it matters, especially for paid campaigns." },
  { n: "05", title: "Deliver", text: "You get final files, organized and ready to publish — plus ongoing support if we continue with management or new campaigns." },
];

export const SKILL_AREAS = [
  { title: "Graphic Design", detail: "Social creatives, ads, banners, brand assets" },
  { title: "Social Media Management", detail: "Page handling, content planning, publishing" },
  { title: "Creative Direction", detail: "Campaign concepts & visual storytelling" },
  { title: "Website Design", detail: "Business sites, landing pages, showcases" },
  { title: "Advertising Creatives", detail: "Meta & Google ad design variations" },
  { title: "Brand Identity", detail: "Logos, palettes, consistent visual systems" },
];

/* ---------------- marketing results (real dashboard captures) ---------------- */

export interface ResultShot {
  src: string;
  label: string;
  meta: string;
  tall?: boolean;
}

export const MARKETING_FEATURED: ResultShot = {
  src: "/images/cv/zameen-casestudy.png",
  label: "Zameen.pk — Google Ads campaign case study (designed showcase)",
  meta: "Campaign performance panel: 124,563 clicks · 2,840,392 impressions · 6,892 conversions · PKR 48.32 cost/conversion · 4.8× ROAS (Jan 1 – Mar 31, 2025)",
};

export const MARKETING_SHOTS: ResultShot[] = [
  {
    src: "/images/cv/vx-meta-oct.png",
    label: "Meta Ads Manager — VisionX International account (Oct 2025)",
    meta: "$2,480 spend · 248,563 reach · 12,847 link clicks · 423 website purchases (+68.3%) · $5.86 cost per purchase (−36.7%)",
  },
  {
    src: "/images/cv/gads-overview.png",
    label: "Google Ads — account overview",
    meta: "4.58M impressions · 42.4K clicks · 4.47K conversions · $27.7K cost",
  },
  {
    src: "/images/cv/gads-pmax.png",
    label: "Google Ads — Performance Max campaign",
    meta: "526.57% actual ROAS vs 300% target · 120K interactions · 1.55K conversions · $73.3K spend (May 1–21, 2025)",
    tall: true,
  },
  {
    src: "/images/cv/gads-summary.png",
    label: "Google Ads — campaign performance summary",
    meta: "78.9K impressions · 2.83K clicks · 22 conversions · $665 cost (last week)",
  },
  {
    src: "/images/cv/gads-call-leads.png",
    label: "Google Ads — account overview (Mar 14 – Apr 12, 2025)",
    meta: "578 phone call leads · 1.02K conversions · $8.98 avg. CPC · $44.5K cost · 17 active campaigns",
  },
  {
    src: "/images/cv/gads-purchases.png",
    label: "Google Ads — account overview (Feb 1 – Apr 26, 2023)",
    meta: "234K clicks · 1,060 purchases / sales · 1.59M conversion value · $110K cost",
  },
  {
    src: "/images/cv/gads-roas.png",
    label: "Google Ads — account overview (Jul 1 – 31, 2023)",
    meta: "$2.06K cost · 146 conversions · 12.3K conversion value · 597.91% actual ROAS · 53 campaigns",
  },
  {
    src: "/images/cv/gads-ac-aug2024.jpg",
    label: "Google Ads — overview with campaign breakdown (Aug 1 – 31, 2024)",
    meta: "12.4K clicks (+62%) · 398K impressions (+48%) · 842 conversions (+71%) · $7.32 cost/conv. (−38%) · $6,162 total cost · 6.8% conv. rate",
  },
  {
    src: "/images/cv/gads-small-account.png",
    label: "Google Ads — all campaigns (Mar 31 – Apr 23, 2020)",
    meta: "566 clicks · 46K impressions · $0.51 avg. CPC · $286 cost",
  },
  {
    src: "/images/cv/gads-eur-longterm.png",
    label: "Google Ads — ads & extensions overview (Nov 2018 – Jul 2020)",
    meta: "8.12K clicks · 403K impressions · €0.18 avg. CPC · €1.44K cost",
  },
];

export const RESULT_STATS = [
  { value: "9.2M+", label: "Impressions delivered" },
  { value: "22.8K+", label: "Link clicks" },
  { value: "16K+", label: "Leads generated" },
  { value: "27.86×", label: "Peak ROAS" },
];

export const STATS_NOTE =
  "Figures aggregated from the campaign dashboards shown in the Marketing Results section.";
