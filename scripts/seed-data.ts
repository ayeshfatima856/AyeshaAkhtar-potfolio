/* Demo content for Ayesha Akhtar portfolio — all projects, metrics and client
   references are clearly-labeled illustrative/demo data. */

export const adminSeed = {
  email: "admin@ayeshaakhtar.com",
  password: "Ayesha@2026",
  name: "Ayesha Akhtar",
};

export const categoriesSeed = [
  { name: "Web Development", slug: "web-development", kind: "web", color: "#4F7CFF", sort: 1 },
  { name: "Digital Marketing", slug: "digital-marketing", kind: "marketing", color: "#A855F7", sort: 2 },
  { name: "Brand & Design", slug: "brand-design", kind: "design", color: "#FBBF24", sort: 3 },
];

export type ProjectSeed = {
  title: string; slug: string; category: string; track: string; tagline: string;
  description: string; overview: string; tools: string; results: string;
  metrics: string; challenge: string; solution: string; image: string;
  gallery: string; featured: boolean; sort: number;
};

const P = (p: Omit<ProjectSeed, "gallery"> & { gallery?: string }): ProjectSeed => ({
  gallery: "[]",
  ...p,
});

export const projectsSeed: ProjectSeed[] = [
  P({
    title: "Lumière Luxe", slug: "lumiere-luxe", category: "Web Development", track: "web",
    tagline: "Headless e-commerce for a premium fashion house",
    description:
      "A luxury fashion storefront with editorial product pages, buttery-smooth animations and a checkout that converts.",
    overview:
      "Lumière Luxe is a demonstration concept built to show how a premium fashion brand can sell online without losing its editorial soul. The storefront pairs magazine-style lookbooks with a fast, frictionless checkout. Product pages mix large-format photography, fabric notes and sizing guidance, while a headless architecture keeps the experience instant even on image-heavy pages. Every detail — from the mega-menu to the gift-note field at checkout — is designed to make buying feel as refined as the garments themselves.",
    tools: "Next.js, Shopify Headless, Tailwind CSS, Stripe, Vercel",
    results: JSON.stringify([
      { label: "Conversion rate", value: "+64%", hint: "vs. baseline demo store" },
      { label: "Average load time", value: "1.8s", hint: "on 4G mobile" },
      { label: "Average order value", value: "+41%", hint: "via smart bundles" },
    ]),
    metrics: JSON.stringify([
      { label: "Conversion", value: 64, suffix: "%" },
      { label: "Faster load", value: 71, suffix: "%" },
      { label: "AOV lift", value: 41, suffix: "%" },
    ]),
    challenge:
      "Image-heavy luxury stores usually crawl. The challenge was keeping full-bleed photography and motion while hitting sub-2s loads on mobile.",
    solution:
      "Headless Next.js storefront, aggressive image pipeline (AVIF, responsive art direction), edge caching and optimistic cart updates. Animations run on GPU only.",
    image: "/images/projects/lumiere.png",
    featured: true, sort: 1,
  }),
  P({
    title: "PulseBoard", slug: "pulseboard", category: "Web Development", track: "web",
    tagline: "SaaS analytics dashboard + high-converting landing",
    description:
      "A metrics platform UI with real-time charts, plus a landing page that turned demo traffic into trial signups.",
    overview:
      "PulseBoard demonstrates how a SaaS product should present itself: a marketing site that sells the outcome and a product UI that proves it. The dashboard features live-updating charts, cohort views and alerting flows, all driven by a component library designed for velocity. The paired landing page walks visitors from pain to proof in three scrolls, with pricing that reacts to plan selection and a trial CTA that follows the reader.",
    tools: "React, TypeScript, Recharts, Node.js, PostgreSQL",
    results: JSON.stringify([
      { label: "Trial signups", value: "12k", hint: "first 90 days (demo)" },
      { label: "Trial → paid", value: "38%", hint: "with onboarding emails" },
      { label: "Uptime", value: "99.9%", hint: "during demo period" },
    ]),
    metrics: JSON.stringify([
      { label: "Signups", value: 12, suffix: "k" },
      { label: "Trial→paid", value: 38, suffix: "%" },
      { label: "Perf score", value: 98, suffix: "/100" },
    ]),
    challenge:
      "Analytics dashboards drown users in numbers. The goal was an interface that answers 'is the business healthy?' in five seconds.",
    solution:
      "A strict visual hierarchy: three hero KPIs, drill-down charts, and exception-based alerts. Charts render on canvas; state streams via WebSockets for real-time feel.",
    image: "/images/projects/pulseboard.png",
    featured: true, sort: 2,
  }),
  P({
    title: "HavenKey Realty", slug: "havenkey-realty", category: "Web Development", track: "web",
    tagline: "Map-first property platform for a modern agency",
    description:
      "Property search rebuilt around maps, saved filters and instant inquiry — no more dead-end listing pages.",
    overview:
      "HavenKey reimagines a real estate agency site as a search product. Buyers draw their own map, layer filters for schools and commute, and get honest price context on every listing. Agents get qualified inquiries with pre-filled buyer briefs instead of anonymous form spam. The listing page itself reads like a story — large galleries, neighbourhood intel and a mortgage calculator that keeps prospects on-site.",
    tools: "Next.js, Prisma, Mapbox, Algolia, Resend",
    results: JSON.stringify([
      { label: "Listing inquiries", value: "3.2x", hint: "vs. old site (demo)" },
      { label: "Bounce rate", value: "−45%", hint: "on listing pages" },
      { label: "Avg. session", value: "4m 12s", hint: "map interactions" },
    ]),
    metrics: JSON.stringify([
      { label: "Inquiries", value: 220, suffix: "%" },
      { label: "Bounce drop", value: 45, suffix: "%" },
      { label: "Pages/visit", value: 7.4, suffix: "" },
    ]),
    challenge:
      "Classic real estate sites bury buyers in paginated grids. The agency wanted inquiries that arrive pre-qualified.",
    solution:
      "Map-first search with drawn boundaries, instant Algolia results and a buyer-brief flow that scores leads before they hit the agent's inbox.",
    image: "/images/projects/havenkey.png",
    featured: false, sort: 3,
  }),
  P({
    title: "Saffron & Smoke", slug: "saffron-smoke", category: "Web Development", track: "web",
    tagline: "A restaurant site that fills tables by itself",
    description:
      "Moody, cinematic web experience for a modern smokehouse — menus, reservations and private events in one place.",
    overview:
      "Saffron & Smoke needed a website that feels like walking into the restaurant: warm, dark, a little theatrical. The menu is photographed rather than typed, dietary filters keep it accessible, and reservations are embedded three clicks deep maximum. A private-events funnel quietly captures larger bookings with a dedicated enquiry flow.",
    tools: "Next.js, Sanity CMS, OpenTable API, Cloudinary",
    results: JSON.stringify([
      { label: "Online reservations", value: "2.4x", hint: "within 3 months (demo)" },
      { label: "Mobile orders", value: "+70%", hint: "after UX rework" },
      { label: "PageSpeed", value: "96/100", hint: "mobile" },
    ]),
    metrics: JSON.stringify([
      { label: "Reservations", value: 140, suffix: "%" },
      { label: "Mobile orders", value: 70, suffix: "%" },
      { label: "Speed score", value: 96, suffix: "" },
    ]),
    challenge:
      "The old PDF menu was invisible to Google and unusable on phones. Reservations bounced between three different tools.",
    solution:
      "A single cinematic site: CMS-driven menus with dietary filters, native reservation flow, and event pages that capture private bookings.",
    image: "/images/projects/saffron.png",
    featured: false, sort: 4,
  }),
  P({
    title: "NovaWatt Studio", slug: "novawatt-studio", category: "Web Development", track: "web",
    tagline: "Award-style site for a creative agency",
    description:
      "Bold gradients, scroll-driven storytelling and a case-study engine built to win pitches.",
    overview:
      "NovaWatt wanted their site to be the loudest thing in a pitch meeting. The result is a scroll-driven experience where each case study unfolds like a film — sticky chapters, big numbers, and outcomes before aesthetics. Behind the theatre sits a serious content engine: case studies are templates the team can ship in minutes.",
    tools: "Next.js, GSAP, Framer Motion, Sanity",
    results: JSON.stringify([
      { label: "Pitch conversions", value: "2x", hint: "demo measurement" },
      { label: "Lighthouse", value: "98", hint: "performance" },
      { label: "Case-study time", value: "−80%", hint: "to publish new one" },
    ]),
    metrics: JSON.stringify([
      { label: "Pitch wins", value: 100, suffix: "%" },
      { label: "Perf score", value: 98, suffix: "" },
      { label: "Time saved", value: 80, suffix: "%" },
    ]),
    challenge:
      "Agencies preach results but show pretty pictures. NovaWatt needed proof-first storytelling without losing visual swagger.",
    solution:
      "Scroll-choreographed case studies that open with the result, then earn the aesthetics. GSAP timeline pinned sections; CMS templates for repeatability.",
    image: "/images/projects/novawatt.png",
    featured: false, sort: 5,
  }),
  P({
    title: "Elena Rossi", slug: "elena-rossi", category: "Web Development", track: "web",
    tagline: "Personal brand site for a creator & author",
    description:
      "Editorial personal portfolio that turned a newsletter into a media business.",
    overview:
      "Elena needed one home for everything: essays, talks, courses, press kit and a mailing list. The design is quiet on purpose — typography does the talking — while the infrastructure quietly converts readers into subscribers and subscribers into course buyers.",
    tools: "Next.js, MDX, Vercel, Buttondown",
    results: JSON.stringify([
      { label: "Monthly visitors", value: "150k", hint: "demo figure" },
      { label: "Newsletter growth", value: "+320%", hint: "in 6 months" },
      { label: "Brand deals", value: "12", hint: "attributed to site" },
    ]),
    metrics: JSON.stringify([
      { label: "Visitors", value: 150, suffix: "k" },
      { label: "List growth", value: 320, suffix: "%" },
      { label: "Deals", value: 12, suffix: "" },
    ]),
    challenge:
      "An audience scattered across platforms with no owned home — and no way to monetise attention directly.",
    solution:
      "A fast editorial site with MDX essays, gated resources for subscribers and clear paths from reading to buying.",
    image: "/images/projects/elena.png",
    featured: false, sort: 6,
  }),
  P({
    title: "GreenLeaf Organics", slug: "greenleaf-organics", category: "Digital Marketing", track: "marketing",
    tagline: "SEO growth sprint: +287% organic traffic",
    description:
      "A six-month SEO program that took a plant-based skincare brand from page 5 to the top of the shelf.",
    overview:
      "GreenLeaf had great products and zero visibility. The program started with technical cleanup and a content architecture built around what buyers actually search for — ingredient explainers, routine guides and comparison pages. Digital PR earned links from wellness publications, and a product-feed optimisation loop lifted merchant listings. This is a demonstration case study showing the structure of a modern SEO sprint.",
    tools: "Ahrefs, SEMrush, Search Console, Surfer SEO, Looker Studio",
    results: JSON.stringify([
      { label: "Organic traffic", value: "+287%", hint: "6-month demo sprint" },
      { label: "Top-3 keywords", value: "34", hint: "commercial terms" },
      { label: "Organic revenue", value: "+192%", hint: "attributed (illustrative)" },
    ]),
    metrics: JSON.stringify([
      { label: "Traffic growth", value: 287, suffix: "%" },
      { label: "Top-3 ranks", value: 34, suffix: "" },
      { label: "Revenue lift", value: 192, suffix: "%" },
    ]),
    challenge:
      "A new domain competing with incumbents and marketplaces, with a catalog Google had never seen.",
    solution:
      "Topic-cluster content model, programmatic ingredient pages, digital PR for authority, and monthly compounding refreshes.",
    image: "/images/projects/greenleaf.png",
    featured: true, sort: 7,
  }),
  P({
    title: "FitFuel", slug: "fitfuel", category: "Digital Marketing", track: "marketing",
    tagline: "Meta Ads engine: 3.8x ROAS at scale",
    description:
      "Full-funnel Meta campaigns for a fitness nutrition brand — creative testing that never sleeps.",
    overview:
      "FitFuel's account was stuck at break-even. The rebuild started with creative: a testing pipeline producing 30+ ad variations a month, each with a single hypothesis. Audiences moved to broad targeting with clean signal, landing pages were CRO-tested per angle, and retargeting became a story sequence instead of a discount scream. A demo dashboard below shows how results were tracked.",
    tools: "Meta Ads Manager, GA4, Klaviyo, Canva, CapCut",
    results: JSON.stringify([
      { label: "ROAS", value: "3.8x", hint: "sustained (demo)" },
      { label: "Cost per purchase", value: "−58%", hint: "vs. starting point" },
      { label: "Reach", value: "2.1M", hint: "in 90 days" },
    ]),
    metrics: JSON.stringify([
      { label: "ROAS", value: 3.8, suffix: "x" },
      { label: "CPA drop", value: 58, suffix: "%" },
      { label: "Reach", value: 2.1, suffix: "M" },
    ]),
    challenge:
      "Rising CPMs and creative fatigue had capped spend — scaling budget just scaled waste.",
    solution:
      "Hypothesis-driven creative engine, broad targeting with strong first-party signal, angle-matched landing pages and disciplined incrementality checks.",
    image: "/images/projects/fitfuel.png",
    featured: true, sort: 8,
  }),
  P({
    title: "CloudSprint", slug: "cloudsprint", category: "Digital Marketing", track: "marketing",
    tagline: "Google Ads turnaround: 4.2x ROAS",
    description:
      "B2B SaaS search campaigns rebuilt around intent — from budget burner to pipeline machine.",
    overview:
      "CloudSprint spent heavily on broad keywords and hoped for the best. The restructure split campaigns by intent stage, rewrote ad copy against actual objections, and sent every query to a matching landing page. Offline conversion imports taught the system what a *qualified* lead looks like. The result: fewer clicks, more customers.",
    tools: "Google Ads, GA4, Hotjar, Sheets scripts",
    results: JSON.stringify([
      { label: "ROAS", value: "4.2x", hint: "demo performance" },
      { label: "CPC", value: "−41%", hint: "with quality-score work" },
      { label: "Qualified leads", value: "+156%", hint: "same budget" },
    ]),
    metrics: JSON.stringify([
      { label: "ROAS", value: 4.2, suffix: "x" },
      { label: "CPC cut", value: 41, suffix: "%" },
      { label: "Lead lift", value: 156, suffix: "%" },
    ]),
    challenge:
      "One ad group, one landing page, and a sales team drowning in junk leads.",
    solution:
      "Intent-tiered campaigns, objection-led copy, dedicated landing pages per stage and offline conversion tracking.",
    image: "/images/projects/cloudsprint.png",
    featured: false, sort: 9,
  }),
  P({
    title: "Wanderly", slug: "wanderly", category: "Digital Marketing", track: "marketing",
    tagline: "Social campaign: 1.4M views from zero",
    description:
      "A travel app launch built on short-form storytelling — hooks first, polish second.",
    overview:
      "Wanderly launched with no audience and a tight budget. The strategy: post daily short-form with 12 repeatable hook formats, turn user trips into the content itself, and let creators carry reach while owned posts built voice. Every video ended with a reason to download. This demo campaign shows the full playbook from month zero.",
    tools: "Instagram, TikTok, Later, CapCut, Notion",
    results: JSON.stringify([
      { label: "Followers", value: "+52k", hint: "in 4 months (demo)" },
      { label: "Avg. engagement", value: "8.4%", hint: "across platforms" },
      { label: "Video views", value: "1.4M", hint: "top 30 days" },
    ]),
    metrics: JSON.stringify([
      { label: "Followers", value: 52, suffix: "k" },
      { label: "Engagement", value: 8.4, suffix: "%" },
      { label: "Views", value: 1.4, suffix: "M" },
    ]),
    challenge:
      "Zero followers, zero budget, and a category shouting louder than everyone else.",
    solution:
      "Hook-format system for daily posting, creator seeding, and a comment-section strategy that turned viewers into community.",
    image: "/images/projects/wanderly.png",
    featured: false, sort: 10,
  }),
  P({
    title: "Bloom & Bold", slug: "bloom-bold", category: "Brand & Design", track: "design",
    tagline: "Brand identity & logo system",
    description:
      "A complete identity for a floral studio — logo system, palette, packaging and 48 social templates.",
    overview:
      "Bloom & Bold needed a brand as bold as their arrangements. The identity pairs a sculptural wordmark with a petal-derived mark, a violet-and-cream palette, and packaging that photographs beautifully (because on Instagram, packaging is the ad). Delivered as a living brand kit with 48 templates the team can actually use.",
    tools: "Figma, Illustrator, Photoshop, After Effects",
    results: JSON.stringify([
      { label: "Deliverables", value: "48", hint: "template assets" },
      { label: "Delivery", value: "3 wks", hint: "concept to kit" },
      { label: "Revisions", value: "2", hint: "rounds only" },
    ]),
    metrics: JSON.stringify([
      { label: "Assets", value: 48, suffix: "" },
      { label: "Weeks", value: 3, suffix: "" },
      { label: "Palette colors", value: 7, suffix: "" },
    ]),
    challenge:
      "A talented studio hidden behind a template logo and inconsistent visuals that undersold the work.",
    solution:
      "Strategy-first identity: positioning, mark, palette, packaging and a template system that keeps every post on-brand without a designer on staff.",
    image: "/images/projects/bloom.png",
    featured: false, sort: 11,
  }),
  P({
    title: "LeadFlow Pro", slug: "leadflow-pro", category: "Web Development", track: "web",
    tagline: "Landing page system: +118% lead rate",
    description:
      "A conversion-engineered landing page with A/B-tested headlines, proof stacking and a two-step form.",
    overview:
      "LeadFlow Pro is a demonstration of what happens when a landing page is treated as a product: research-backed copy, one promise per screen, social proof stacked where doubt appears, and a two-step form that feels weightless. Heatmaps and session recordings drove three rounds of iteration. The final page more than doubled lead rate.",
    tools: "Next.js, react-hook-form, Zapier, Vercel, Hotjar",
    results: JSON.stringify([
      { label: "Lead rate", value: "+118%", hint: "vs. original (demo)" },
      { label: "Visitor → lead", value: "9.2%", hint: "final variant" },
      { label: "Cost per lead", value: "$8.40", hint: "with paid traffic" },
    ]),
    metrics: JSON.stringify([
      { label: "Lead lift", value: 118, suffix: "%" },
      { label: "CV rate", value: 9.2, suffix: "%" },
      { label: "CPL", value: 8.4, suffix: "$" },
    ]),
    challenge:
      "Traffic was fine; the page leaked it. Every extra field in the form cost 11% of submissions.",
    solution:
      "Message-mined copy, proof stacking, two-step form with progress feedback and continuous A/B iteration.",
    image: "/images/projects/leadflow.png",
    featured: true, sort: 12,
  }),
];

export const blogSeed = [
  {
    title: "10 Landing Page Mistakes That Are Killing Your Conversions",
    slug: "landing-page-mistakes",
    excerpt:
      "Most landing pages leak money in the same ten places. Here's the checklist I run before touching any design.",
    cover: "/images/blog/landing-hero.png",
    tags: "conversion,landing pages,cro",
    readTime: 7,
    content: `Your landing page has one job: turn attention into action. Most pages fail not because they're ugly, but because they make visitors think, wait or doubt. Here are the ten mistakes I find most often — and what to do instead.

## 1. Asking for too much, too soon
Every extra form field costs submissions. Ask yourself what you *actually* need to start a conversation. Usually it's a name, an email and one qualifying question. The rest can happen later, in the reply.

## 2. Five competing messages
If your hero says three things, it says nothing. One page, one audience, one promise. The urge to "cover everyone" is how pages end up converting no one.

## 3. Proof that isn't proof
"Trusted by thousands" is decoration; "cut onboarding time from 3 weeks to 4 days" is proof. Specific numbers, real outcomes, named context — that's what doubt needs to hear.

## 4. Burying the CTA
Your call to action should be visible without scrolling, and again after the argument, and again at the end. People don't scroll back up to convert.

## 5. Slow heroes
A 4MB hero video might impress your team and cost you 30% of your mobile traffic. Speed *is* design. Compress, lazy-load, and choose fast fonts.

## 6. Desktop-only thinking
Over 70% of ad clicks arrive on a phone. Design the mobile experience first, not as an afterthought.

## 7. Weak headlines
A headline should pass the "so what?" test. Lead with the outcome, not the mechanism. "Get invoices paid 2x faster" beats "AI-powered invoicing suite".

## 8. No objection handling
Visitors arrive with doubts: price, effort, trust, fit. A great page answers objections in order — with FAQ, guarantees, and evidence placed exactly where hesitation spikes.

## 9. Ignoring the thank-you page
The conversion happened — now what? Set expectations, offer a next step, ask one question. The post-conversion moment is the cheapest upsell you'll ever get.

## 10. Never testing
Opinions are cheap; variants are cheaper. Test one change at a time, give it enough traffic, and keep a record. Conversion is a practice, not a project.

---

**Want me to run this checklist on your page?** I audit landing pages for conversion leaks every week — [get in touch](/contact) and I'll send you a teardown.`,
  },
  {
    title: "Meta Ads vs Google Ads: Where Should Your Budget Go in 2026?",
    slug: "meta-ads-vs-google-ads",
    excerpt:
      "They're not competitors — they're different tools for different jobs. Here's how to split your budget by intent, creative and margin.",
    cover: "/images/blog/meta-vs-google.png",
    tags: "meta ads,google ads,strategy",
    readTime: 8,
    content: `The question I hear most from business owners: "Should I put my budget into Meta or Google?" It's the wrong question. The right one is: **what job do I need done?**

## The fundamental difference
Google Ads captures **existing demand** — people actively searching for what you sell. Meta Ads **creates demand** — interrupting scrollers with something they didn't know they wanted. One harvests; the other plants. Businesses usually need both, in proportions set by their market.

## When Google wins
- People already search for your category ("plumber near me", "CRM pricing")
- Your product solves an urgent, conscious problem
- You can afford the CPCs in your niche
- You have a page that matches the searcher's intent precisely

## When Meta wins
- Your product needs to be *seen* to be wanted (fashion, food, gadgets)
- Your creative can stop a thumb in 1.5 seconds
- Your category has no search volume yet — nobody googles what they don't know exists
- You can produce fresh creative consistently

## The margin test
Run this simple math per channel: **(Average order value × conversion rate) − cost per acquisition**. Whichever channel keeps more margin per order, scale first — but watch saturation. Meta scales until creative fatigue; Google scales until auction pressure.

## The 2026 reality
- **First-party data is the multiplier.** Both platforms reward clean signals: enhanced conversions on Google, CAPI on Meta.
- **Creative is the new targeting.** Broad + strong signal + great creative beats micro-audiences almost everywhere now.
- **Measurement matters more than platform.** Incrementality tests beat last-click dashboards. If both platforms claim the same sale, you need holdout tests, not faith.

## A practical starting split
For most product businesses I start 60/40 toward whichever platform matches their demand type, then rebalance monthly based on contribution margin — not ROAS vanity. Service businesses usually invert: search first, social for retargeting and authority.

**Bottom line:** pick the channel that matches *how* your buyers decide, measure properly, and let data — not nostalgia — move the budget.`,
  },
  {
    title: "The 2026 SEO Checklist I Run Before Every Website Launch",
    slug: "seo-checklist-2026",
    excerpt:
      "Technical SEO, content architecture and the boring stuff that actually moves rankings — all in one launch checklist.",
    cover: "/images/blog/seo-checklist.png",
    tags: "seo,web development,checklist",
    readTime: 9,
    content: `Launching a website without an SEO checklist is like opening a shop with no door. Here's the exact pre-launch checklist I run on every build — the same one that's taken demo sites from invisible to page one.

## Technical foundations
1. **One canonical URL.** Redirect http→https, non-www→www (or vice versa), and strip index.php-style cruft. One version of every page.
2. **Core Web Vitals in the green.** LCP under 2.5s, CLS under 0.1, INP under 200ms. Test on a mid-range Android, not your laptop.
3. **XML sitemap submitted** to Search Console, robots.txt letting the right things through.
4. **Structured data** for Organization, Product, Article and FAQ where relevant. Rich results are free clicks.
5. **Clean internal linking.** Every important page reachable in 3 clicks; orphan pages are invisible pages.

## Content architecture
6. **One page, one intent.** Don't let "web design" and "web development" fight over the same URL. Map keywords to pages before writing.
7. **Topic clusters beat keyword lists.** A pillar page + supporting articles + internal links is how new domains win.
8. **Write for the query's next question.** If someone searches "how much does a website cost", they next ask "how long does it take". Answer both.
9. **Titles that earn clicks.** Keyword in front, outcome in the middle, brand at the end — and no duplicating the meta description from page one.

## The boring stuff that wins
10. **Image discipline.** Descriptive filenames, alt text, compressed to AVIF/WebP, correctly sized. This alone lifts mobile rankings.
11. **404s monitored weekly.** Broken links are ranking leaks you can't see.
12. **Refresh loops scheduled.** Pages decay. A quarterly refresh of your top 20 pages compounds more than ten new blog posts.

## After launch
Submit the sitemap, request indexing for key pages, and watch Search Console weekly for the first two months. Rankings are a lagging indicator — impressions come first, then clicks, then positions. Be patient and consistent.

**Want this run on your site?** I include a full technical SEO pass in every web development project — see the [services page](/services) for details.`,
  },
  {
    title: "How I Plan 30 Days of Social Content in 2 Hours",
    slug: "plan-30-days-social-content",
    excerpt:
      "The content matrix that ends daily 'what do we post?' panic — repeatable formats, batch production, zero burnout.",
    cover: "/images/blog/content-calendar.png",
    tags: "social media,content strategy,productivity",
    readTime: 6,
    content: `Daily posting dies from one thing: decision fatigue. "What should we post today?" is a question you should never have to ask. Here's the system I use — two hours a month, thirty days of content.

## Step 1: Build your format library (30 minutes)
Ideas are infinite; *formats* are few. Create 8–12 repeatable formats:
- **Before/After** transformations
- **Myth vs Truth** in your industry
- **Client question → answer** (FAQ posts)
- **Behind the process** (how the work actually happens)
- **Numbers post** (results, data, percentages)
- **Tool of the week**
- **Hot take** (respectful contrarian opinion)
- **Story time** (a lesson learned the hard way)

Each format becomes a template — same structure, new content. Creativity on schedule.

## Step 2: The matrix, not the calendar (20 minutes)
Take your formats (rows) and your content pillars (columns: educate, prove, entertain, sell). Fill the grid. Now every day has a *type* assigned before you create anything. Selling posts land next to value posts, so promotion never feels desperate.

## Step 3: Batch production (60 minutes)
One recording session, one design session:
- Film 8–10 short videos in one sitting (change shirts between batches if needed)
- Design a week of graphics from your templates
- Write captions in one doc — hooks first, CTA last

## Step 4: Schedule and stay human
Load everything into a scheduler (Later, Buffer, Metricool). Then — this matters — show up in comments daily. Content earns attention; conversation earns trust.

## Why this works
Systems beat inspiration because systems show up when motivation doesn't. The matrix also reveals gaps: if your grid is all "sell" and no "prove", you've found why conversion is low.

**Want this system built for your brand?** My social media management packages include content strategy, batch production and daily community management — details on the [services page](/services).`,
  },
  {
    title: "5 Web Design Trends That Actually Convert (And 3 That Don't)",
    slug: "web-design-trends-that-convert",
    excerpt:
      "Bento grids are fun, but trust signals pay the bills. A pragmatic look at what to adopt and what to skip.",
    cover: "/images/blog/design-trends.png",
    tags: "web design,ui ux,conversion",
    readTime: 6,
    content: `Design trends are fun; design decisions pay rent. Here's my pragmatic split of what's worth adopting right now — judged by one criterion only: does it help a visitor take action?

## Adopt these

### 1. Generous, confident whitespace
Not a trend so much as a return to sanity. Whitespace raises comprehension and makes premium feel premium. Luxury brands learned this decades ago; SaaS caught up.

### 2. Motion with meaning
Micro-interactions that explain state — hover reveals, progress feedback, number counters — all lift engagement. Motion as decoration (random parallax everywhere) does the opposite.

### 3. Dark mode done properly
Dark themes flatter product screenshots and reduce eye strain at night — but only with real contrast discipline. Body text at 70% opacity on dark is a readability crime.

### 4. Bento grids for information density
Card-based grids give scannable structure to features, stats and pricing. They convert because they respect how people actually read websites: in chunks.

### 5. Typography-led hierarchy
Big display headings, disciplined body sizes, mono-spaced eyebrows. Strong type systems look expensive *and* guide attention to what matters.

## Skip these

### 1. Infinite custom cursors
Cute on award-site portfolios, disastrous on checkout flows. If it slows a click, it costs money.

### 2. Text as texture
Paragraphs set at 8% opacity "for aesthetics" fail every accessibility test and destroy conversion for anyone on a phone in daylight.

### 3. Auto-playing video with sound
Nothing says "leave" like unexpected audio. If video carries the message, give it a silent hero slot with captions and a play control.

## The rule underneath it all
Every trend is a means to an end: **attention → comprehension → trust → action**. Audit any trend against those four steps. If it doesn't serve one of them, it's a decoration — and decorations are the first thing I remove in a CRO pass.

Building something right now? My [web development](/web-development) projects apply these principles with conversion as the success metric.`,
  },
];

export const testimonialsSeed = [
  {
    name: "Sarah Mitchell", role: "Founder", company: "Lumière Luxe (demo client)",
    quote:
      "The new store feels like our brand finally learned to speak. Load times dropped, checkout stopped leaking, and the lookbook pages are genuinely beautiful. Sales followed.",
    rating: 5,
  },
  {
    name: "David Chen", role: "CEO", company: "PulseBoard (demo client)",
    quote:
      "Ayesha translated a messy product idea into an interface our users actually enjoy. Signups doubled within a quarter and support tickets about 'finding things' went to zero.",
    rating: 5,
  },
  {
    name: "Amira Khan", role: "Marketing Director", company: "FitFuel (demo client)",
    quote:
      "Our Meta account went from break-even to consistently profitable. The creative testing system alone changed how our whole team thinks about ads.",
    rating: 5,
  },
  {
    name: "James O'Brien", role: "Owner", company: "Saffron & Smoke (demo client)",
    quote:
      "Reservations through the site tripled and we finally stopped paying for three separate tools. The website genuinely runs the front-of-house now.",
    rating: 5,
  },
  {
    name: "Priya Sharma", role: "COO", company: "CloudSprint (demo client)",
    quote:
      "Same ad budget, four times the qualified pipeline. Clear reporting, no vanity metrics, and she explained every change in plain English.",
    rating: 5,
  },
  {
    name: "Marco DeLuca", role: "Co-founder", company: "Wanderly (demo client)",
    quote:
      "From zero followers to a real community in four months. The content system keeps running long after the campaign ended — that's what I call delivery.",
    rating: 5,
  },
];

export const servicesSeed = [
  {
    name: "Starter Site", tier: "starter", kind: "web", price: "$499", period: "per project",
    tagline: "A sharp one-page or small site to get you online fast.",
    features: JSON.stringify([
      "1–3 page responsive website", "Modern design system & animations",
      "Contact form + WhatsApp link", "On-page SEO basics", "7-day delivery",
    ]),
    highlighted: false, sort: 1,
  },
  {
    name: "Business Website", tier: "growth", kind: "web", price: "$1,299", period: "per project",
    tagline: "The complete package for brands that mean business.",
    features: JSON.stringify([
      "Up to 8 custom pages", "CMS so you can edit content",
      "Full technical SEO pass", "Analytics & conversion tracking",
      "Speed optimisation (90+ PageSpeed)", "30 days of free support",
    ]),
    highlighted: true, sort: 2,
  },
  {
    name: "E-Commerce / Custom Build", tier: "scale", kind: "web", price: "$2,999", period: "per project",
    tagline: "Stores and complex platforms engineered to sell.",
    features: JSON.stringify([
      "Full store or custom web app", "Payment gateway integration",
      "Product & inventory setup", "Checkout CRO pass",
      "Email automations", "60 days of free support",
    ]),
    highlighted: false, sort: 3,
  },
  {
    name: "Campaign Kickstart", tier: "starter", kind: "marketing", price: "$399", period: "per month",
    tagline: "Dip a toe into paid marketing with a managed test budget.",
    features: JSON.stringify([
      "1 platform (Meta or Google)", "Campaign setup & structure",
      "4 ad creatives per month", "Weekly optimisation",
      "Monthly performance report",
    ]),
    highlighted: false, sort: 4,
  },
  {
    name: "Growth Engine", tier: "growth", kind: "marketing", price: "$899", period: "per month",
    tagline: "Full-funnel management for steady, compounding growth.",
    features: JSON.stringify([
      "2 platforms managed", "12+ ad creatives per month",
      "Landing page CRO recommendations", "A/B testing program",
      "Remarketing funnels", "Bi-weekly strategy calls",
    ]),
    highlighted: true, sort: 5,
  },
  {
    name: "Full-Funnel Domination", tier: "scale", kind: "marketing", price: "$1,799", period: "per month",
    tagline: "Everything managed: ads, SEO, social, email — one brain.",
    features: JSON.stringify([
      "All channels managed", "Unlimited creative testing",
      "SEO content program", "Email & SMS flows",
      "Conversion dashboard", "Weekly strategy calls",
    ]),
    highlighted: false, sort: 6,
  },
];

export const settingsSeed: Record<string, string> = {
  heroHeadline: "Websites that sell. Campaigns that scale.",
  heroSub:
    "I'm Ayesha Akhtar — a web developer & digital marketer helping ambitious brands turn visitors into customers through high-performing websites and data-driven campaigns.",
  availability: "Available for new projects — booking now",
  email: "hello@ayeshaakhtar.dev",
  location: "Remote · Working worldwide",
  socials: JSON.stringify({
    instagram: "https://instagram.com/ayesha.builds",
    linkedin: "https://linkedin.com/in/ayesha-akhtar",
    github: "https://github.com/ayeshaakhtar",
    x: "https://x.com/ayesha_builds",
  }),
  seoTitle: "Ayesha Akhtar — Web Developer & Digital Marketer",
  seoDescription:
    "Premium portfolio of Ayesha Akhtar: high-converting websites, e-commerce, landing pages, Meta & Google Ads, SEO and social media marketing.",
  statProjects: "52",
  statClients: "38",
  statCampaigns: "120",
  statRoas: "4.2x",
};
