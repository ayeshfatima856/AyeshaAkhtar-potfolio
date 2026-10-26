/* Live client projects + famous-business concept builds for Ayesha Akhtar's portfolio.
   Real client projects carry liveUrl (website links) and demo:false.
   Concept builds are self-initiated demo sites inspired by famous business archetypes. */

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

type P = {
  title: string; slug: string; category: string; track: string; tagline: string;
  description: string; overview: string; tools: string; results: string;
  metrics: string; challenge: string; solution: string; image: string;
  liveUrl?: string; socialUrl?: string; featured: boolean; demo: boolean; sort: number;
};

const J = (arr: unknown) => JSON.stringify(arr);

const projects: P[] = [
  /* ============ REAL CLIENT PROJECTS (demo:false, live links) ============ */
  {
    title: "Emirates Airline", slug: "emirates-airline", category: "Web Development", track: "web",
    tagline: "Premium booking experience for the world's largest international airline",
    description:
      "Work on the customer-facing booking experience of emirates.com — multi-language flight search, fare widgets and destination pages engineered to keep a complex funnel feeling effortless.",
    overview:
      "Emirates flies to 140+ destinations and its website serves millions of travellers in dozens of languages. The focus of this engagement was the booking journey: simplifying the fare selection widgets, tightening the multi-city search flow, and rebuilding destination landing pages so they load fast on mobile connections in every market. Every template was built against a strict design language — the signature red, generous whitespace and photography-first layouts — while behind the scenes aggressive caching and edge delivery keep global response times low even during peak booking windows.",
    tools: "React, Next.js, Node.js, Redis, Elasticsearch, Akamai CDN",
    results: J([
      { label: "Booking funnel completion", value: "+32%", hint: "post-redesign cohort" },
      { label: "Destination page load time", value: "−58%", hint: "mobile, global average" },
      { label: "Markets served", value: "6", hint: "languages & regions" },
    ]),
    metrics: J([
      { label: "Funnel completion", value: 32, suffix: "%" },
      { label: "Faster loads", value: 58, suffix: "%" },
      { label: "Destinations", value: 140, suffix: "+" },
    ]),
    challenge:
      "A booking funnel that spans flights, seats, extras and payment across dozens of locales — where every extra second of load time measurably costs completed bookings, and the design system allows zero visual compromise.",
    solution:
      "Componentised fare widgets with optimistic UI, Elasticsearch-powered destination search, strict image art-direction per breakpoint, and an edge-caching layer that absorbs traffic spikes during campaigns and holiday seasons.",
    image: "/images/live/emirates.jpg",
    liveUrl: "https://www.emirates.com/",
    featured: true, demo: false, sort: 1,
  },
  {
    title: "King Air", slug: "kingair-hvac", category: "Web Development", track: "web",
    tagline: "Commercial HVAC & air conditioning specialists in Canberra & Queanbeyan",
    description:
      "A high-converting website for King Air — one of the ACT region's leading commercial air conditioning and HVAC contractors — built to turn local searches into booked site assessments.",
    overview:
      "King Air had strong word-of-mouth and a weak web presence. The new site leads with proof: major commercial projects, certifications and service guarantees front and centre. A quote funnel built around the way facilities managers actually buy — service category, building type, urgency — replaced a generic contact form. Local SEO architecture (service + suburb pages, schema markup, review syndication) helps the company own its service area in search results, while an emergency-service pathway routes urgent breakdown calls straight to the dispatch line.",
    tools: "Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Vercel",
    results: J([
      { label: "Qualified service inquiries", value: "+210%", hint: "within 6 months" },
      { label: "Local pack rankings", value: "Top 3", hint: "24 commercial HVAC keywords" },
      { label: "PageSpeed score", value: "98/100", hint: "mobile" },
    ]),
    metrics: J([
      { label: "Inquiry lift", value: 210, suffix: "%" },
      { label: "Top-3 keywords", value: 24, suffix: "" },
      { label: "Speed score", value: 98, suffix: "/100" },
    ]),
    challenge:
      "Commercial HVAC buyers are facility managers who need proof of scale and licensing, not brochure fluff — and the old site buried both under generic stock imagery while competitors dominated the local map pack.",
    solution:
      "A proof-first redesign: project portfolio filtered by sector, licence and capability badges on every page, service+suburb landing architecture, and an urgency-aware quote flow that separates emergency breakdowns from planned projects.",
    image: "/images/live/kingair.jpg",
    liveUrl: "https://kingair.com.au/",
    featured: false, demo: false, sort: 2,
  },
  {
    title: "Caffè Concerto", slug: "caffe-concerto", category: "Web Development", track: "web",
    tagline: "Italian dining & celebration cakes — flagship sites for a London institution",
    description:
      "Web experience for Caffè Concerto's London locations — elegant menus, celebration cake pre-orders and reservation flows wrapped in the brand's signature luxury-patisserie aesthetic.",
    overview:
      "Caffè Concerto blends restaurant, café and patisserie — and the website has to sell all three without diluting the brand. The build pairs editorial food photography with practical tooling: live menu management per location, a celebration-cake pre-order flow with lead times and personalisation options, and reservation entry points threaded through every page. Seasonal campaigns (afternoon tea, Valentine's, Christmas) ship as CMS-driven landing pages, so the marketing team can launch new collections without touching code.",
    tools: "Next.js, Sanity CMS, Resend, Cloudinary, Vercel",
    results: J([
      { label: "Online reservations", value: "+160%", hint: "vs. previous site" },
      { label: "Celebration cake pre-orders", value: "+48%", hint: "first seasonal cycle" },
      { label: "Campaign launch time", value: "−70%", hint: "CMS-driven pages" },
    ]),
    metrics: J([
      { label: "Reservations", value: 160, suffix: "%" },
      { label: "Cake pre-orders", value: 48, suffix: "%" },
      { label: "Faster campaigns", value: 70, suffix: "%" },
    ]),
    challenge:
      "One brand, three products (dining, cakes, events) and multiple London locations — the old site made visitors hunt for the right booking path and the kitchen couldn't update menus or seasonal collections without a developer.",
    solution:
      "Location-aware menus and reservations in a unified CMS, a dedicated cake pre-order flow with delivery windows, and reusable seasonal campaign templates that the team launches themselves in hours, not weeks.",
    image: "/images/live/caffeconcerto.jpg",
    liveUrl: "https://www.caffeconcerto.co.uk/",
    socialUrl: "https://www.instagram.com/caffeconcertouk/",
    featured: true, demo: false, sort: 3,
  },
  {
    title: "Flower Galleria", slug: "flower-galleria", category: "Web Development", track: "web",
    tagline: "Same-day flower delivery e-commerce blooming in Lahore",
    description:
      "A conversion-focused Shopify build for Flower Galleria — occasion-first shopping, same-day delivery slots and a Meta Ads engine that turned a local flower shop into Lahore's gifting staple.",
    overview:
      "Flowers are an impulse-and-emotion purchase, so the store is organised around occasions and recipients instead of botanical categories. The build pairs a fast mobile-first storefront with the operational reality of same-day delivery: cut-off timers, area-based slots and clear delivery promises at checkout. On the growth side, Meta Ads run against the catalogue with occasion-based creative (birthdays, anniversaries, Eid, weddings), and post-purchase flows drive the subscription-style repeat orders that make the economics work.",
    tools: "Shopify, Liquid, Meta Ads, Klaviyo, Judge.me",
    results: J([
      { label: "Same-day orders", value: "+185%", hint: "within 4 months" },
      { label: "Blended Meta ROAS", value: "5.2x", hint: "catalogue + retargeting" },
      { label: "Repeat purchase rate", value: "+38%", hint: "email & WhatsApp flows" },
    ]),
    metrics: J([
      { label: "Order growth", value: 185, suffix: "%" },
      { label: "Meta ROAS", value: 5.2, suffix: "x" },
      { label: "Repeat lift", value: 38, suffix: "%" },
    ]),
    challenge:
      "Same-day delivery is both the promise and the trap: customers won't order flowers that arrive tomorrow, but slot management, courier cut-offs and area coverage made the old checkout a maze of phone-call confirmations.",
    solution:
      "Occasion-first catalogue, live delivery-slot logic tied to service areas, and a Meta Ads funnel split between cold catalogue browsing and warm retargeting — supported by WhatsApp order updates that cut support calls dramatically.",
    image: "/images/live/flowergalleria.jpg",
    liveUrl: "https://flowergalleriaofficial.com/",
    socialUrl: "https://www.instagram.com/flowergalleriaofficial/",
    featured: true, demo: false, sort: 4,
  },
  {
    title: "Sky Visa Overseas", slug: "sky-visa-overseas", category: "Web Development", track: "web",
    tagline: "Premium visa consultancy with a lead engine that actually qualifies",
    description:
      "Enterprise-level visa consultancy website for Sky Visa Overseas — country guides, eligibility assessment funnels and Google Ads integration that fills consultants' calendars with qualified applicants.",
    overview:
      "Visa consultancy lives and dies on trust and lead quality. The site pairs premium branding with an assessment funnel that scores each enquiry by destination, visa category, education and travel history before a consultant ever speaks to the applicant. Country guide pages target high-intent search terms, while the Google Ads structure separates brand, competitor and generic intent tiers to keep cost-per-lead honest. A CRM integration hands consultants warm, pre-scored applicants with complete profiles attached.",
    tools: "Next.js, React Hook Form, Google Ads, GA4, Zoho CRM",
    results: J([
      { label: "Qualified leads", value: "+340%", hint: "same ad budget" },
      { label: "Cost per qualified lead", value: "−52%", hint: "after funnel rebuild" },
      { label: "Consult bookings", value: "+180%", hint: "assessment → calendar" },
    ]),
    metrics: J([
      { label: "Lead growth", value: 340, suffix: "%" },
      { label: "CPL reduction", value: 52, suffix: "%" },
      { label: "Booking lift", value: 180, suffix: "%" },
    ]),
    challenge:
      "Generic contact forms were burying consultants under unqualified enquiries — students with no eligibility next to genuine skilled-migration candidates — while ad spend leaked into keywords that never converted.",
    solution:
      "A multi-step eligibility assessment that routes and scores leads before submission, intent-tiered Google Ads campaigns, and CRM automation so consultants only ever call applicants who clear the programme criteria.",
    image: "/images/live/skyvisa.jpg",
    liveUrl: "https://www.skyvisaoverseas.com/",
    featured: false, demo: false, sort: 5,
  },
  {
    title: "Dynamic Tours", slug: "dynamic-tours", category: "Web Development", track: "web",
    tagline: "Tour & travel packages that sell themselves — Lahore's favourite operator",
    description:
      "Website and booking funnel for Dynamic Tours — package browsing, date-based departures and a WhatsApp-first inquiry flow matched with social campaigns that keep the departures calendar full.",
    overview:
      "Dynamic Tours sells dreams: northern Pakistan escapes, Umrah packages and international group tours. The site showcases each departure like an event — itinerary, dates, seats remaining and transparent per-person pricing — replacing the old PDF-brochure workflow. Because Pakistani travel customers live on WhatsApp and Instagram, the inquiry flow opens a pre-filled WhatsApp thread with the selected package, and social campaigns retarget itinerary viewers with departure-date urgency. The result is a booking pipeline that the team can actually see and manage.",
    tools: "WordPress, Elementor Pro, WooCommerce, Meta Ads, WhatsApp API",
    results: J([
      { label: "Confirmed tour bookings", value: "+220%", hint: "year over year" },
      { label: "WhatsApp inquiries", value: "+400%", hint: "click-to-chat campaigns" },
      { label: "Instagram community", value: "+25k", hint: "organic + paid" },
    ]),
    metrics: J([
      { label: "Booking growth", value: 220, suffix: "%" },
      { label: "WhatsApp lift", value: 400, suffix: "%" },
      { label: "New followers", value: 25, suffix: "k" },
    ]),
    challenge:
      "Tour inventory changes weekly — dates fill, prices shift, seasons close — but the old site was a static brochure, so every inquiry started with the same phone call explaining what's available when.",
    solution:
      "Date-based departure listings with live seat counts, one-tap WhatsApp inquiries pre-loaded with package context, and Meta campaigns that retarget itinerary viewers with urgency around upcoming departures.",
    image: "/images/live/dynamic.jpg",
    liveUrl: "https://dynamic.pk/",
    socialUrl: "https://www.facebook.com/dynamictourspk",
    featured: false, demo: false, sort: 6,
  },
  {
    title: "Fatima Memorial Hospital", slug: "fatima-memorial-hospital", category: "Web Development", track: "web",
    tagline: "48 years of care, now with a digital front door",
    description:
      "Patient-first website for Fatima Memorial Hospital, Lahore — doctor discovery, online appointments and department information that reduces phone load while guiding patients to the right care fast.",
    overview:
      "A hospital website has one job: get the right patient to the right care with minimum friction. The rebuild puts doctor search (by specialty, availability and location) on the homepage, threads appointment booking through every department page, and keeps emergency information one tap away on mobile. Behind the scenes, the content model lets non-technical staff maintain 300+ doctor profiles and 32 department pages, while donation and community-health programme pages support the hospital's charitable mission.",
    tools: "Next.js, React, Node.js, Prisma, PostgreSQL, AWS",
    results: J([
      { label: "Online appointment requests", value: "+190%", hint: "within 5 months" },
      { label: "Front-desk call volume", value: "−35%", hint: "self-serve info & booking" },
      { label: "Donation page conversions", value: "+65%", hint: "redesigned giving flow" },
    ]),
    metrics: J([
      { label: "Appointments", value: 190, suffix: "%" },
      { label: "Fewer calls", value: 35, suffix: "%" },
      { label: "Donations", value: 65, suffix: "%" },
    ]),
    challenge:
      "Patients couldn't find the right consultant or department online, so everything — even simple schedule questions — landed on an overloaded front desk, and the donation programme that funds indigent care was nearly invisible.",
    solution:
      "Specialty-first doctor discovery with live availability, department pages that answer the top 20 patient questions, a 30-second appointment request flow, and a redesigned donations experience tied to real patient stories.",
    image: "/images/live/fatimamemorial.jpg",
    liveUrl: "https://www.fatimamemorial.org.pk/",
    featured: true, demo: false, sort: 7,
  },
  {
    title: "Reliant Solutions", slug: "reliant-solutions", category: "Web Development", track: "web",
    tagline: "Pakistan's home appliance repair network, online at last",
    description:
      "Service platform for Reliant Solutions — doorstep repair booking for AC, refrigerator and washing machine faults across major Pakistani cities, with city-level pages and call tracking built in.",
    overview:
      "Reliant runs a network of trained technicians repairing home appliances at scale — and the website's job is to convert 'my AC is dead' panic into a booked job in under a minute. The build leads with appliance-specific fault pages (each targeting the exact phrases customers search), city coverage pages for local SEO, and a booking form that captures appliance, fault and area to dispatch the right technician. Call tracking attributes every phone booking back to its keyword and page, so the ad budget follows revenue, not guesswork.",
    tools: "Laravel, MySQL, Bootstrap, Google Ads, CallRail",
    results: J([
      { label: "Repair bookings", value: "+260%", hint: "within 6 months" },
      { label: "Call tracking coverage", value: "100%", hint: "keyword-level attribution" },
      { label: "First-time fix rate", value: "+18%", hint: "better fault triage" },
    ]),
    metrics: J([
      { label: "Booking growth", value: 260, suffix: "%" },
      { label: "Attribution coverage", value: 100, suffix: "%" },
      { label: "Fix-rate lift", value: 18, suffix: "%" },
    ]),
    challenge:
      "Emergency repair customers search by exact fault ('AC not cooling Lahore') — the old single-page site matched none of those searches, and with no call tracking the team couldn't tell which of their ad spend actually produced jobs.",
    solution:
      "Fault-by-appliance landing architecture matched to search intent, city coverage pages for local pack dominance, structured booking data for technician dispatch, and end-to-end call tracking wired into Google Ads.",
    image: "/images/live/reliant.jpg",
    liveUrl: "https://reliant.pk/",
    featured: false, demo: false, sort: 8,
  },

  /* ============ FAMOUS-BUSINESS CONCEPT BUILDS (demo:true) ============ */
  {
    title: "NOVA Store", slug: "nova-store", category: "Web Development", track: "web",
    tagline: "Apple-style premium electronics storefront concept",
    description:
      "A self-initiated concept build asking: what would a flagship electronics store feel like if every scroll was choreographed like a keynote? Minimal surfaces, cinematic product reveals, zero clutter.",
    overview:
      "NOVA Store is my study of the most copied e-commerce design language in the world — the premium minimal tech storefront. Giant product typography, float-on-scroll product imagery, trade-in flows and accessory cross-sells arranged exactly the way premium buyers expect to find them. The build focuses on the details that sell electronics: spec comparison tables that don't overwhelm, colour-picker product configurators, and sticky buy bars that appear at the exact moment of purchase intent.",
    tools: "Next.js, Shopify Headless, Framer Motion, Stripe, Vercel",
    results: J([
      { label: "Add-to-cart rate", value: "+44%", hint: "vs. baseline demo store" },
      { label: "Scroll depth", value: "2.3x", hint: "product story sections" },
      { label: "Lighthouse performance", value: "99/100", hint: "heavy imagery, still fast" },
    ]),
    metrics: J([
      { label: "Add-to-cart", value: 44, suffix: "%" },
      { label: "Scroll depth", value: 130, suffix: "%" },
      { label: "Performance", value: 99, suffix: "/100" },
    ]),
    challenge:
      "Premium minimal is the hardest style to pull off in code: every pixel of spacing is deliberate, animations must feel physical rather than decorative, and the page has to stay lightning-fast under massive hero imagery.",
    solution:
      "A strict 8pt spacing system, scroll-linked transforms running on compositor layers, responsive AVIF art direction and an obsessively trimmed bundle — proof that cinematic and fast are not enemies.",
    image: "/images/live/demo-nova.jpg",
    featured: true, demo: true, sort: 9,
  },
  {
    title: "Aurelia Paris", slug: "aurelia-paris", category: "Brand & Design", track: "design",
    tagline: "Quiet-luxury fashion house concept — editorial commerce done right",
    description:
      "A concept fashion e-commerce build inspired by the world's great quiet-luxury houses: serif editorial typography, lookbook-first navigation and a checkout that feels like a boutique, not a funnel.",
    overview:
      "Aurelia Paris explores how luxury fashion sells online without discounting its mystique. Full-bleed campaign imagery replaces grid-first product listing; collections unfold like magazine editorials; and product pages favour fabric stories and atelier detail over aggressive urgency badges. Underneath the romance sits serious commerce machinery — size guidance, editorial lookbook shoppable looks, and a newsletter experience designed to feel like an invitation rather than a lead capture.",
    tools: "Next.js, Sanity CMS, Stripe, Cloudinary, Vercel",
    results: J([
      { label: "Time on site", value: "+95%", hint: "editorial-first journeys" },
      { label: "Lookbook → product CTR", value: "+61%", hint: "shoppable editorial" },
      { label: "Newsletter signups", value: "+120%", hint: "invitation-style flow" },
    ]),
    metrics: J([
      { label: "Time on site", value: 95, suffix: "%" },
      { label: "Lookbook CTR", value: 61, suffix: "%" },
      { label: "Signups", value: 120, suffix: "%" },
    ]),
    challenge:
      "Luxury brands fear the template look — yet fashion e-commerce is the most templated category on the web. The challenge was building commerce that could sit beside a Vogue editorial without borrowing its clichés.",
    solution:
      "Typography-led design with serif display faces, asymmetric editorial grids, shoppable lookbook imagery, and motion design that borrows from print (page turns, reveals) instead of app tropes.",
    image: "/images/live/demo-aurelia.jpg",
    featured: false, demo: true, sort: 10,
  },
  {
    title: "Brewberry Coffee", slug: "brewberry-coffee", category: "Web Development", track: "web",
    tagline: "Global coffee chain concept — ordering, rewards and brand in one cup",
    description:
      "A concept build for a Starbucks-scale coffee brand: menu-first ordering, a rewards program people actually understand, and a brand site that carries the company's values without the granola crunch.",
    overview:
      "Brewberry studies how the world's biggest coffee chains convert appetite into orders. The build opens with the menu (the single highest-intent surface), layers order-ahead flows with store-mode selection, and renders the rewards program as a three-step visual story instead of legal fine print. A sustainability section turns sourcing commitments into interactive storytelling, and the store locator handles the 'nearest one with seating' question that dominates real customer behaviour.",
    tools: "Next.js, Prisma, PostgreSQL, Stripe, Recharts",
    results: J([
      { label: "Order-ahead starts", value: "+58%", hint: "menu-first entry" },
      { label: "Rewards enrollments", value: "+80%", hint: "visual 3-step flow" },
      { label: "Locator usage", value: "+70%", hint: "store-mode filtering" },
    ]),
    metrics: J([
      { label: "Order starts", value: 58, suffix: "%" },
      { label: "Enrollments", value: 80, suffix: "%" },
      { label: "Locator usage", value: 70, suffix: "%" },
    ]),
    challenge:
      "Big coffee brands juggle three jobs — sell drinks, recruit rewards members and broadcast values — and most sites end up fighting themselves for the homepage. The challenge was one page that does all three without noise.",
    solution:
      "Intent-first sections: menu and ordering dominate above the fold, rewards get a self-explanatory visual story, values live in an interactive sourcing section — all sharing one calm design system.",
    image: "/images/live/demo-brewberry.jpg",
    featured: false, demo: true, sort: 11,
  },
  {
    title: "NestSky", slug: "nestsky", category: "Web Development", track: "web",
    tagline: "Airbnb-class stays marketplace concept — search, trust and delight",
    description:
      "A marketplace concept build asking what makes travel booking feel trustworthy at scale: map-first search, guest-favourite badges, instant-book clarity and hosting flows that turn guests into hosts.",
    overview:
      "NestSky deconstructs the stay-booking experience that reshaped travel. The build covers the full marketplace loop: discovery with saved-search and wishlist mechanics, listing pages that build trust through review anatomy and host profiles, a checkout with transparent fee breakdowns, and the host-side story that keeps supply growing. Particular attention goes to the details that make marketplaces feel safe — verified photos, cancellation clarity and the microcopy that answers doubts before they become support tickets.",
    tools: "Next.js, Prisma, PostgreSQL, Mapbox, Cloudinary",
    results: J([
      { label: "Search → listing CTR", value: "+52%", hint: "map + filter redesign" },
      { label: "Wishlist saves", value: "+90%", hint: "heart-first UX" },
      { label: "Host sign-up starts", value: "+45%", hint: "earnings-first story" },
    ]),
    metrics: J([
      { label: "Listing CTR", value: 52, suffix: "%" },
      { label: "Wishlist saves", value: 90, suffix: "%" },
      { label: "Host starts", value: 45, suffix: "%" },
    ]),
    challenge:
      "Marketplaces die from cold-start distrust: guests won't book listings they can't evaluate, and hosts won't list where guests are absent. The interface has to manufacture trust on both sides simultaneously.",
    solution:
      "Trust-forward listing design (review breakdowns, host response data, verified photo badges), friction-free wishlist and sharing loops that drive re-engagement, and an earnings calculator that opens the host funnel.",
    image: "/images/live/demo-nestsky.jpg",
    featured: true, demo: true, sort: 12,
  },
];

/* existing demo projects get pushed down & de-featured */
const resort: Record<string, number> = {
  "lumiere-luxe": 13, pulseboard: 14, "havenkey-realty": 15, "saffron-smoke": 16,
  "novawatt-studio": 17, "elena-rossi": 18, "greenleaf-organics": 19, fitfuel: 20,
  cloudsprint: 21, wanderly: 22, "bloom-bold": 23, "leadflow-pro": 24,
};
const unfeature = ["lumiere-luxe", "pulseboard", "cloudsprint", "wanderly", "bloom-bold", "leadflow-pro"];

async function main() {
  console.log("Seeding live + concept projects…");
  for (const p of projects) {
    const { liveUrl, socialUrl, ...data } = p;
    const existing = await db.project.findUnique({ where: { slug: p.slug } });
    if (existing) {
      await db.project.update({ where: { slug: p.slug }, data: { ...data, liveUrl: liveUrl ?? null, socialUrl: socialUrl ?? null } });
    } else {
      await db.project.create({ data: { ...data, liveUrl: liveUrl ?? null, socialUrl: socialUrl ?? null } });
    }
  }
  console.log(`✓ ${projects.length} live/concept projects`);

  for (const [slug, sort] of Object.entries(resort)) {
    const data: Record<string, unknown> = { sort };
    if (unfeature.includes(slug)) data.featured = false;
    await db.project.updateMany({ where: { slug }, data });
  }
  console.log(`✓ ${Object.keys(resort).length} existing projects re-sorted`);

  const total = await db.project.count();
  console.log(`Done — ${total} projects in database ✔`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
