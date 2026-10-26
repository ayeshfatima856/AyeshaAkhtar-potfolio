 
"use client";

import { Link } from "@/lib/router";
import { useApi, useMediaQuery } from "@/lib/hooks";
import type { Project, Testimonial, ServicePackage } from "@/lib/types";
import { parseFeatures } from "@/lib/types";
import { Reveal, SectionHead } from "./reveal";
import { ProjectCard, CTABanner, Counter } from "./blocks";
import {
  Code2, Megaphone, ArrowUpRight, ArrowRight, Star, Quote, ChevronLeft, ChevronRight,
  Search, PenTool, Rocket, TrendingUp, Globe, ShoppingCart, Layout, Gauge, Wrench,
  Target, Mail, BarChart3, Users, MousePointerClick, Instagram, SearchCheck, Sparkles,
  BadgeCheck, Clock, HeartHandshake,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ============================== HERO ============================== */

function Hero({ settings }: { settings: Record<string, string> }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 bg-grid pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-aurora" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-24 right-[8%] h-80 w-80 rounded-full bg-violet-600/20 blur-[120px] animate-pulse-glow" aria-hidden="true" />
      <div className="pointer-events-none absolute top-40 -left-24 h-72 w-72 rounded-full bg-blue-600/15 blur-[110px]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-8">
        {/* left */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-1.5 text-[13px] font-medium text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {settings.availability || "Available for new projects"}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.2rem]">
              {splitHeadline(settings.heroHeadline || "Websites that sell. Campaigns that scale.")}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {settings.heroSub ||
                "I'm Ayesha Akhtar — a web developer & digital marketer helping ambitious brands turn visitors into customers."}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-[length:200%_100%] bg-left px-8 py-4 text-[15px] font-semibold text-white shadow-[0_16px_44px_-12px_rgba(139,92,246,0.75)] transition-all duration-500 hover:bg-right hover:shadow-[0_16px_54px_-8px_rgba(34,211,238,0.5)]"
              >
                Let&apos;s Build Something Amazing
                <ArrowUpRight className="h-4.5 w-4.5 h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-8 py-4 text-[15px] font-semibold text-white backdrop-blur transition-all hover:border-white/30 hover:bg-white/10"
              >
                Explore My Work
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-cyan-300" /> Web development
              </span>
              <span className="inline-flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-violet-300" /> Meta &amp; Google Ads
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-300" /> Replies within 24h
              </span>
            </div>
          </Reveal>
        </div>

        {/* right — portrait card */}
        <Reveal delay={0.2} className="relative mx-auto w-full max-w-[420px]">
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-violet-600/30 via-transparent to-cyan-500/25 blur-2xl" aria-hidden="true" />
            <div className="ring-gradient relative overflow-hidden rounded-[2rem] bg-navy-800/70 p-3 backdrop-blur">
              <div className="relative overflow-hidden rounded-[1.6rem]">
                <img
                  src="/images/site/ayesha-portrait.png"
                  alt="Ayesha Akhtar — web developer and digital marketer"
                  className="aspect-[9/14] w-full object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#05081A]/90 to-transparent p-5 pt-14">
                  <p className="font-display text-lg font-bold text-white">Ayesha Akhtar</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-300/90">
                    developer × marketer
                  </p>
                </div>
              </div>
            </div>

            {/* floating chips */}
            <motion.div
              className="absolute -left-10 top-10 hidden sm:block"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="glass rounded-2xl px-4 py-3 shadow-xl">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
                    <Code2 className="h-4.5 w-4.5 h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-white">Clean Code</p>
                    <p className="text-[11px] text-muted-foreground">Next.js · React</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-8 bottom-24 hidden sm:block"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            >
              <div className="glass rounded-2xl px-4 py-3 shadow-xl">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-500/20 text-fuchsia-300">
                    <Megaphone className="h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-white">Ads that convert</p>
                    <p className="text-[11px] text-muted-foreground">Meta · Google</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-5 left-8 hidden sm:block"
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
            >
              <div className="glass-strong flex items-center gap-2 rounded-full py-2 pl-2 pr-4 shadow-xl">
                <span className="flex -space-x-1.5">
                  {["S", "D", "A"].map((c, i) => (
                    <span
                      key={i}
                      className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-violet-500 to-blue-500 text-[10px] font-bold text-white"
                    >
                      {c}
                    </span>
                  ))}
                </span>
                <span className="text-[12px] text-muted-foreground">
                  <span className="font-bold text-white">38+</span> happy clients
                </span>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function splitHeadline(text: string) {
  const words = text.split(" ");
  const first = words.slice(0, Math.max(1, words.length - 2)).join(" ");
  const last = words.slice(-2).join(" ");
  return (
    <>
      {first} <span className="text-gradient">{last}</span>
    </>
  );
}

/* ============================== MARQUEE ============================== */

const TICKER = [
  "Next.js", "React", "TypeScript", "Meta Ads", "Google Ads", "SEO", "E-Commerce",
  "Landing Pages", "UI/UX", "Social Media", "CRO", "Analytics", "Tailwind CSS", "Lead Gen",
];

function Marquee() {
  const row = [...TICKER, ...TICKER];
  return (
    <section className="border-y border-white/8 bg-white/[0.02] py-5" aria-hidden="true">
      <div className="relative flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8">
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap">
              <span className="font-mono text-[13px] uppercase tracking-[0.2em] text-muted-foreground">{t}</span>
              <Sparkles className="h-3.5 w-3.5 text-violet-400/70" />
            </span>
          ))}
        </div>
        <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8" aria-hidden="true">
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap">
              <span className="font-mono text-[13px] uppercase tracking-[0.2em] text-muted-foreground">{t}</span>
              <Sparkles className="h-3.5 w-3.5 text-violet-400/70" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== STATS ============================== */

function Stats({ settings }: { settings: Record<string, string> }) {
  const stats = [
    { icon: Rocket, label: "Projects delivered", value: Number(settings.statProjects || 52), suffix: "+" },
    { icon: HeartHandshake, label: "Happy clients", value: Number(settings.statClients || 38), suffix: "+" },
    { icon: Megaphone, label: "Campaigns managed", value: Number(settings.statCampaigns || 120), suffix: "+" },
    { icon: TrendingUp, label: "Avg. campaign ROAS", value: Number(parseFloat(settings.statRoas || "4.2")), suffix: "x", decimals: 1 },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <Reveal>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="card-hover group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl transition-opacity group-hover:opacity-100" aria-hidden="true" />
              <s.icon className="mx-auto mb-3 h-6 w-6 text-violet-300" />
              <div className="font-display text-3xl font-extrabold text-white md:text-4xl">
                <Counter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </div>
              <p className="mt-1.5 text-[13px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
          * figures are illustrative demo metrics — real references available on request
        </p>
      </Reveal>
    </section>
  );
}

/* ============================== DUAL TRACKS ============================== */

function DualTracks() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <SectionHead
        eyebrow="Two crafts, one goal"
        title={<>Code meets <span className="text-gradient">conversion</span></>}
        sub="Most developers can build a website. Most marketers can run ads. Few can do both — which means your site and your campaigns finally work as one system."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <TrackCard
          href="/web-development"
          icon={Code2}
          title="Web Development"
          desc="Fast, beautiful, conversion-engineered websites — from landing pages to full e-commerce."
          image="/images/site/webdev-feature.png"
          alt="Web development — code editor and website preview"
          color="#4F7CFF"
          items={["Responsive websites", "E-commerce builds", "UI/UX design", "Speed optimisation"]}
        />
        <TrackCard
          href="/digital-marketing"
          icon={Megaphone}
          title="Digital Marketing"
          desc="Data-driven campaigns on Meta and Google that scale profitably, plus SEO that compounds."
          image="/images/site/marketing-feature.png"
          alt="Digital marketing — analytics dashboards"
          color="#A855F7"
          items={["Meta & Google Ads", "SEO growth", "Social media", "CRO & analytics"]}
        />
      </div>
    </section>
  );
}

function TrackCard({
  href, icon: Icon, title, desc, image, alt, color, items,
}: {
  href: string; icon: typeof Code2; title: string; desc: string;
  image: string; alt: string; color: string; items: string[];
}) {
  return (
    <Reveal className="h-full">
      <Link to={href} className="group block h-full">
        <article className="card-hover relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          <div className="relative aspect-[16/8] overflow-hidden">
            <img src={image} alt={alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 30%, rgba(5,8,26,0.92) 100%)` }} />
            <span
              className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur"
              style={{ background: `${color}26`, borderColor: `${color}55` }}
            >
              <Icon className="h-3.5 w-3.5" /> {title}
            </span>
          </div>
          <div className="flex flex-1 flex-col p-7">
            <p className="leading-relaxed text-muted-foreground">{desc}</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {items.map((it) => (
                <li key={it} className="flex items-center gap-2 text-[13.5px] text-foreground/85">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
                  {it}
                </li>
              ))}
            </ul>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold" style={{ color }}>
              Explore {title.toLowerCase()}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
            </span>
          </div>
        </article>
      </Link>
    </Reveal>
  );
}

/* ============================== FEATURED PROJECTS ============================== */

function FeaturedProjects() {
  const { data, loading } = useApi<{ projects: Project[] }>("/api/projects?featured=1");
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHead
          align="left"
          eyebrow="Selected work"
          title={<>Featured <span className="text-gradient">projects</span></>}
          sub="Live client websites — airlines, restaurants, e-commerce, hospitals — plus premium concept builds. Every card plays a scrolling preview of the actual site."
        />
        <Reveal delay={0.1}>
          <Link
            to="/portfolio"
            className="group mb-12 inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-violet-400/60 hover:bg-violet-500/10 md:mb-16"
          >
            View all projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="shimmer-line h-96 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(data?.projects || []).slice(0, 5).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
          {/* view-all tile */}
          <Reveal delay={0.24} className="h-full">
            <Link
              to="/portfolio"
              className="group card-hover flex h-full min-h-[320px] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] text-center"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-[0_0_36px_-6px_rgba(139,92,246,0.8)] transition-transform group-hover:scale-110">
                <ArrowUpRight className="h-6 w-6" />
              </span>
              <p className="font-display text-lg font-bold text-white">Browse all 24 projects</p>
              <p className="max-w-[220px] text-sm text-muted-foreground">
                Live client sites, ad campaigns, brand identities and more
              </p>
            </Link>
          </Reveal>
        </div>
      )}
    </section>
  );
}

/* ============================== SERVICES ============================== */

const WEB_SERVICES = [
  { icon: Globe, title: "Responsive Websites", desc: "Pixel-perfect on every screen — mobile-first, always." },
  { icon: Layout, title: "Full-Stack Development", desc: "Auth, databases, dashboards, APIs — the whole stack." },
  { icon: ShoppingCart, title: "E-Commerce", desc: "Stores engineered for conversion, from catalog to checkout." },
  { icon: MousePointerClick, title: "Landing Pages", desc: "Single-goal pages built to turn clicks into leads." },
  { icon: PenTool, title: "UI/UX Design", desc: "Interfaces that feel obvious — tested, not guessed." },
  { icon: Gauge, title: "Website Optimisation", desc: "90+ PageSpeed scores and Core Web Vitals in the green." },
  { icon: Wrench, title: "Maintenance & Care", desc: "Updates, backups, monitoring — your site stays healthy." },
];

const MKT_SERVICES = [
  { icon: Target, title: "Meta Ads", desc: "Full-funnel Facebook & Instagram campaigns with creative testing." },
  { icon: Search, title: "Google Ads", desc: "Search, Shopping and Performance Max managed for profit." },
  { icon: SearchCheck, title: "SEO", desc: "Technical fixes, content architecture and links that compound." },
  { icon: Instagram, title: "Social Media", desc: "Content systems and community that build real audiences." },
  { icon: Users, title: "Lead Generation", desc: "Funnels and landing pages that feed your sales pipeline." },
  { icon: MousePointerClick, title: "CRO", desc: "A/B testing and UX research to squeeze more from the same traffic." },
  { icon: BarChart3, title: "Analytics & Reporting", desc: "Clean tracking, honest dashboards, decisions in plain English." },
];

function ServicesOverview() {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          eyebrow="What I do"
          title={<>Services built for <span className="text-gradient">growth</span></>}
          sub="Pick one service or combine both worlds into a single growth engine."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <ServiceGroup
            title="Web Development"
            color="#4F7CFF"
            icon={Code2}
            href="/web-development"
            items={WEB_SERVICES.slice(0, 6)}
          />
          <ServiceGroup
            title="Digital Marketing"
            color="#A855F7"
            icon={Megaphone}
            href="/digital-marketing"
            items={MKT_SERVICES.slice(0, 6)}
          />
        </div>
      </div>
    </section>
  );
}

function ServiceGroup({
  title, color, icon: Icon, href, items,
}: {
  title: string; color: string; icon: typeof Code2; href: string;
  items: { icon: typeof Code2; title: string; desc: string }[];
}) {
  return (
    <Reveal className="h-full">
      <div className="card-hover h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7">
        <div className="mb-6 flex items-center justify-between">
          <span
            className="inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-bold text-white"
            style={{ background: `${color}1f`, borderColor: `${color}44` }}
          >
            <Icon className="h-4 w-4" style={{ color }} />
            {title}
          </span>
          <Link to={href} className="inline-flex items-center gap-1 text-[13px] font-semibold text-muted-foreground transition-colors hover:text-white">
            Details <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((s) => (
            <div key={s.title} className="group/svc rounded-2xl border border-transparent p-3.5 transition-all hover:border-white/10 hover:bg-white/[0.04]">
              <s.icon className="h-5 w-5 transition-colors" style={{ color }} />
              <h4 className="mt-2.5 text-[14.5px] font-bold text-white">{s.title}</h4>
              <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ============================== PROCESS ============================== */

const PROCESS = [
  {
    step: "01", icon: Search, title: "Discover",
    desc: "Goals, audience and numbers. I dig into your analytics, competitors and customers before touching pixels.",
  },
  {
    step: "02", icon: PenTool, title: "Design & Architect",
    desc: "Wireframes, art direction and a conversion map — every section earns its place on the page.",
  },
  {
    step: "03", icon: Rocket, title: "Build & Launch",
    desc: "Clean, fast code with SEO baked in. Test, refine, ship — then watch the dashboards together.",
  },
  {
    step: "04", icon: TrendingUp, title: "Grow & Optimise",
    desc: "Campaigns, A/B tests and monthly iterations. Launch is the starting line, not the finish.",
  },
];

function Process() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <SectionHead
        eyebrow="How we'll work"
        title={<>A process, not a <span className="text-gradient">guess</span></>}
        sub="The same four phases run underneath every website and campaign I deliver."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {PROCESS.map((p, i) => (
          <Reveal key={p.step} delay={i * 0.09} className="relative">
            <div className="card-hover h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600/25 to-blue-600/25 text-violet-300">
                  <p.icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-2xl font-bold text-white/10">{p.step}</span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-white">{p.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{p.desc}</p>
              {i < 3 && (
                <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-gradient-to-r from-violet-500/60 to-transparent lg:block" aria-hidden="true" />
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================== TESTIMONIALS ============================== */

function Testimonials() {
  const { data, loading } = useApi<{ testimonials: Testimonial[] }>("/api/testimonials");
  const [idx, setIdx] = useState(0);
  const items = data?.testimonials || [];
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (items.length < 2) return;
    const t = setInterval(() => setIdx((v) => (v + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [items.length]);

  if (loading) return <div className="mx-auto max-w-4xl px-5 py-16"><div className="shimmer-line h-72 rounded-3xl" /></div>;
  if (!items.length) return null;
  const t = items[idx % items.length];

  return (
    <section className="relative overflow-hidden py-16">
      <div className="pointer-events-none absolute inset-0 bg-aurora opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-5 lg:px-8">
        <SectionHead
          eyebrow="Kind words"
          title={<>What clients <span className="text-gradient">say</span></>}
          sub="Sample quotes from the demo projects above — your name goes here next."
        />
        <Reveal>
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12">
            <Quote className="absolute left-8 top-8 h-10 w-10 text-violet-500/25" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.figure
                key={t.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45 }}
                className="relative"
              >
                <div className="flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="mt-5 text-lg leading-relaxed text-foreground/90 md:text-xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 font-display text-sm font-bold text-white">
                    {t.initials || t.name.slice(0, 2).toUpperCase()}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-[13px] text-muted-foreground">
                      {t.role}{t.company ? ` · ${t.company}` : ""}
                    </p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-1.5">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    aria-label={`Show testimonial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === idx % items.length ? "w-7 bg-violet-400" : "w-2.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIdx((idx - 1 + items.length) % items.length)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-all hover:border-violet-400 hover:bg-violet-500/15"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIdx((idx + 1) % items.length)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-all hover:border-violet-400 hover:bg-violet-500/15"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            {!isDesktop && (
              <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-amber-300/70">swipe-free · auto rotates</p>
            )}
          </div>
          <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
            * demo testimonials — clearly labeled until real client quotes are added
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================== PACKAGES STRIP ============================== */

function PackagesStrip() {
  const { data } = useApi<{ services: ServicePackage[] }>("/api/services");
  const featured = (data?.services || []).filter((s) => s.highlighted).slice(0, 2);
  if (!featured.length) return null;
  return (
    <section className="mx-auto max-w-7xl px-5 pb-4 pt-8 lg:px-8">
      <div className="grid gap-5 md:grid-cols-2">
        {featured.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.1}>
            <div className="card-hover relative flex h-full flex-col overflow-hidden rounded-3xl border border-violet-400/25 bg-gradient-to-br from-violet-600/12 to-blue-600/8 p-7">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-white">{s.name}</h3>
                <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-cyan-300">
                  {s.kind === "web" ? "website" : "marketing"}
                </span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-3xl font-extrabold text-gradient">{s.price}</span>
                <span className="text-sm text-muted-foreground">{s.period}</span>
              </div>
              <ul className="mt-5 space-y-2">
                {parseFeatures(s.features).slice(0, 4).map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-foreground/85">
                    <BadgeCheck className="h-4 w-4 shrink-0 text-emerald-300" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/services"
                className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-violet-300 transition-colors hover:text-white"
              >
                See all packages <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================== PAGE ============================== */

export default function Home() {
  const { data } = useApi<{ settings: Record<string, string> }>("/api/settings");
  const settings = data?.settings || {};

  return (
    <>
      <Hero settings={settings} />
      <Marquee />
      <Stats settings={settings} />
      <DualTracks />
      <FeaturedProjects />
      <ServicesOverview />
      <Process />
      <Testimonials />
      <PackagesStrip />
      <CTABanner />
    </>
  );
}
