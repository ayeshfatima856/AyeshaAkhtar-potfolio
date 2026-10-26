 
"use client";

import { PageHero, CTABanner, Counter } from "./blocks";
import { Reveal, SectionHead } from "./reveal";
import { useApi } from "@/lib/hooks";
import {
  Code2, Megaphone, Sparkles, Globe, HeartHandshake, Zap, Target,
  BadgeCheck, MapPin, GraduationCap, Coffee, ArrowRight,
} from "lucide-react";
import { Link } from "@/lib/router";

const TIMELINE = [
  {
    year: "2022",
    title: "Started with code",
    desc: "Built my first websites with HTML, CSS and JavaScript — instantly hooked on the feeling of shipping something real.",
  },
  {
    year: "2023",
    title: "Fell for marketing",
    desc: "Ran my first campaigns and discovered the other half of the craft: getting what you built in front of the right people.",
  },
  {
    year: "2024",
    title: "Went full-stack",
    desc: "Added React, Next.js, databases and real backend work to the toolbox. Started delivering complete products, not just pages.",
  },
  {
    year: "2025",
    title: "One-brain growth engine",
    desc: "Now running full-funnel programs — build the site, launch the ads, fix the funnel, report on one dashboard.",
  },
];

const VALUES = [
  {
    icon: Target,
    title: "Outcomes over output",
    desc: "A pretty site that doesn't sell is a hobby. Everything I ship has a number attached to it.",
  },
  {
    icon: Zap,
    title: "Speed is a feature",
    desc: "Fast sites rank better, convert better, feel better. Performance budgets are part of design, not an afterthought.",
  },
  {
    icon: HeartHandshake,
    title: "Radical clarity",
    desc: "Plain-English reporting, honest timelines, no jargon walls. You always know what's happening and why.",
  },
  {
    icon: Globe,
    title: "Global by default",
    desc: "Remote-first workflows, timezone-friendly calls, international best practice baked into every build.",
  },
];

const SKILLS = [
  { label: "React / Next.js / TypeScript", pct: 92, color: "#4F7CFF" },
  { label: "UI/UX & Design Systems", pct: 86, color: "#22D3EE" },
  { label: "Meta & Google Ads", pct: 94, color: "#A855F7" },
  { label: "SEO & Content Strategy", pct: 90, color: "#34D399" },
  { label: "Analytics & CRO", pct: 88, color: "#FBBF24" },
];

const TOOLBELT = [
  "Next.js", "React", "TypeScript", "Tailwind", "Prisma", "Node.js", "Figma",
  "Meta Ads Manager", "Google Ads", "GA4", "Ahrefs", "SEMrush", "Hotjar", "Klaviyo", "Notion",
];

export default function About() {
  const { data } = useApi<{ settings: Record<string, string> }>("/api/settings");
  const s = data?.settings || {};

  return (
    <>
      <PageHero
        eyebrow="About me"
        title="The person behind the"
        highlight="pixels & campaigns"
        sub={s.heroSub || "Developer's precision, marketer's instinct — and a slightly unhealthy obsession with conversion rates."}
      />

      {/* story + portrait */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-tr from-violet-600/25 via-transparent to-cyan-500/20 blur-2xl" aria-hidden="true" />
              <div className="ring-gradient relative overflow-hidden rounded-[2rem] bg-navy-800/60 p-3">
                <img
                  src="/images/site/ayesha-portrait.png"
                  alt="Portrait of Ayesha Akhtar"
                  className="aspect-[9/15] w-full rounded-[1.6rem] object-cover object-top"
                />
              </div>
              <div className="glass absolute -bottom-6 -right-4 rounded-2xl px-5 py-4 sm:-right-8">
                <p className="font-display text-2xl font-extrabold text-gradient">
                  <Counter value={3} suffix="+" />
                </p>
                <p className="text-[12px] text-muted-foreground">years building<br />& growing brands</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow mb-4">My story</p>
              <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl">
                I build the ship <span className="text-gradient">and</span> steer the campaign.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-muted-foreground">
                <p>
                  Hi, I&apos;m Ayesha — a web developer and digital marketer based {s.location ? "working " + s.location.toLowerCase() : "working remotely with clients worldwide"}. I started as a developer who kept asking an uncomfortable question: <em className="text-foreground/85">why do so many beautiful websites make so little money?</em> That question pulled me into marketing — ads, SEO, funnels, analytics — and I never looked back.
                </p>
                <p>
                  Today I offer something rare: one person who can design and build your website, then run the campaigns that fill it with customers. No hand-off gaps between &ldquo;the developer&rdquo; and &ldquo;the marketing agency&rdquo;, no blaming each other when numbers dip. The site and the strategy live in the same brain.
                </p>
                <p>
                  When I&apos;m not shipping, I&apos;m studying SERPs, deconstructing ad creative, or (real talk) making another cup of chai. Sound like the partner you need? <Link to="/contact" className="text-violet-300 underline decoration-violet-400/40 underline-offset-4 hover:text-violet-200">Let&apos;s talk about your project.</Link>
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] text-foreground/85">
                  <MapPin className="h-4 w-4 text-blue-300" /> {s.location || "Remote · Worldwide"}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] text-foreground/85">
                  <GraduationCap className="h-4 w-4 text-violet-300" /> CS + Digital Marketing
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] text-foreground/85">
                  <Coffee className="h-4 w-4 text-amber-300" /> Powered by chai
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* skill bars */}
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <SectionHead
          eyebrow="Skill stack"
          title={<>What I bring to <span className="text-gradient">your project</span></>}
        />
        <div className="mx-auto max-w-3xl space-y-5">
          {SKILLS.map((sk, i) => (
            <Reveal key={sk.label} delay={i * 0.06}>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground/90">{sk.label}</span>
                  <span className="font-mono text-xs text-muted-foreground">{sk.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${sk.pct}%`,
                      background: `linear-gradient(90deg, ${sk.color}88, ${sk.color})`,
                      boxShadow: `0 0 16px ${sk.color}55`,
                    }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
            {TOOLBELT.map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[12px] text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* timeline */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <SectionHead
          eyebrow="The journey"
          title={<>From first <span className="text-gradient">&lt;div&gt;</span> tag to full-funnel</>}
          sub="A quick timeline of how the two crafts merged into one service."
        />
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-[19px] top-2 h-[calc(100%-16px)] w-px bg-gradient-to-b from-violet-500/60 via-blue-500/40 to-transparent md:left-1/2" aria-hidden="true" />
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.08}>
              <div className={`relative mb-10 flex gap-6 md:w-1/2 ${i % 2 ? "md:ml-auto md:pl-10" : "md:flex-row-reverse md:pr-10 md:text-right"}`}>
                <span className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet-400/40 bg-navy-800 font-mono text-[11px] font-bold text-violet-300">
                  {t.year.slice(2)}
                </span>
                <div className="card-hover rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-cyan-300">{t.year}</p>
                  <h3 className="mt-1 font-display text-lg font-bold text-white">{t.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">{t.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* values */}
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <SectionHead eyebrow="How I think" title={<>Values I <span className="text-gradient">work by</span></>} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.07}>
              <div className="card-hover h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600/25 to-blue-600/25 text-violet-300">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-[17px] font-bold text-white">{v.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* two crafts cards */}
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-600/10 to-transparent p-8">
              <Code2 className="h-8 w-8 text-blue-300" />
              <h3 className="mt-4 font-display text-2xl font-bold text-white">The developer side</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                Clean architecture, performance budgets, accessible interfaces and code your next developer won&apos;t curse. I build with Next.js, React and TypeScript — from marketing sites to full web apps.
              </p>
              <Link to="/web-development" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-300 hover:text-white">
                Web development services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-600/10 to-transparent p-8">
              <Megaphone className="h-8 w-8 text-fuchsia-300" />
              <h3 className="mt-4 font-display text-2xl font-bold text-white">The marketer side</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                Paid media with discipline: creative testing systems, clean tracking, honest dashboards. Meta Ads, Google Ads, SEO and social — all measured against revenue, not vanity metrics.
              </p>
              <Link to="/digital-marketing" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-fuchsia-300 hover:text-white">
                Digital marketing services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
