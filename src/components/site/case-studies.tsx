 
"use client";

import { PageHero, CTABanner } from "./blocks";
import { Reveal, SectionHead } from "./reveal";
import { Link } from "@/lib/router";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
} from "recharts";
import { ArrowUpRight, TrendingUp, Info } from "lucide-react";

/* Demo data (illustrative) */
const seoData = [
  { month: "M1", visitors: 2100, revenue: 4.1 },
  { month: "M2", visitors: 3400, revenue: 6.8 },
  { month: "M3", visitors: 5200, revenue: 9.4 },
  { month: "M4", visitors: 7800, revenue: 12.9 },
  { month: "M5", visitors: 11200, revenue: 18.2 },
  { month: "M6", visitors: 14800, revenue: 24.6 },
];

const adsData = [
  { week: "W1", before: 1.4, after: 1.9 },
  { week: "W2", before: 1.5, after: 2.4 },
  { week: "W3", before: 1.3, after: 2.9 },
  { week: "W4", before: 1.6, after: 3.4 },
  { week: "W5", before: 1.4, after: 3.8 },
  { week: "W6", before: 1.5, after: 4.1 },
];

const funnelData = [
  { stage: "Clicks", v: 100 },
  { stage: "Landing", v: 82 },
  { stage: "Engaged", v: 54 },
  { stage: "Leads", v: 23 },
  { stage: "Customers", v: 9 },
];

const CASES = [
  {
    slug: "greenleaf-organics",
    brand: "GreenLeaf Organics",
    kind: "SEO Growth Sprint",
    color: "#34D399",
    image: "/images/projects/greenleaf.png",
    headline: "From page 5 to the top of the shelf",
    summary:
      "A six-month SEO program for a plant-based skincare brand: technical cleanup, a topic-cluster content engine and digital PR — compounding into a 287% organic traffic lift (illustrative).",
    chips: ["Ahrefs", "Surfer SEO", "Search Console", "Digital PR"],
    chart: (
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={seoData} margin={{ top: 8, right: 8, left: -14, bottom: 0 }}>
          <defs>
            <linearGradient id="seoFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34D399" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#34D399" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.07)" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#9AA3C7" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="#9AA3C7" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ background: "#0B1130", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }}
            labelStyle={{ color: "#9AA3C7" }}
          />
          <Area type="monotone" dataKey="visitors" stroke="#34D399" strokeWidth={2.5} fill="url(#seoFill)" name="Organic visitors" />
        </AreaChart>
      </ResponsiveContainer>
    ),
    stats: [
      { value: "+287%", label: "organic traffic" },
      { value: "34", label: "top-3 keywords" },
      { value: "+192%", label: "organic revenue" },
    ],
  },
  {
    slug: "fitfuel",
    brand: "FitFuel",
    kind: "Meta Ads Engine",
    color: "#A855F7",
    image: "/images/projects/fitfuel.png",
    headline: "3.8x ROAS with a creative testing machine",
    summary:
      "Rebuilt a stuck Meta account with a hypothesis-driven creative pipeline, broad targeting on clean signal and angle-matched landing pages. CPA fell 58% while spend scaled (illustrative).",
    chips: ["Meta Ads Manager", "GA4", "Klaviyo", "CapCut"],
    chart: (
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={adsData} margin={{ top: 8, right: 8, left: -14, bottom: 0 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.07)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="week" stroke="#9AA3C7" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="#9AA3C7" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ background: "#0B1130", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }}
            labelStyle={{ color: "#9AA3C7" }}
            cursor={{ fill: "rgba(168,85,247,0.08)" }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="before" name="ROAS before" fill="#475069" radius={[6, 6, 0, 0]} />
          <Bar dataKey="after" name="ROAS after" fill="#A855F7" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    ),
    stats: [
      { value: "3.8x", label: "sustained ROAS" },
      { value: "−58%", label: "cost per purchase" },
      { value: "2.1M", label: "reach in 90 days" },
    ],
  },
  {
    slug: "cloudsprint",
    brand: "CloudSprint",
    kind: "Google Ads Turnaround",
    color: "#4F7CFF",
    image: "/images/projects/cloudsprint.png",
    headline: "Same budget, 4.2x more pipeline",
    summary:
      "Intent-tiered campaigns, objection-led copy and offline conversion tracking turned a budget-burning B2B account into a pipeline machine (illustrative).",
    chips: ["Google Ads", "GA4", "Hotjar", "Offline conv."],
    chart: (
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={funnelData} margin={{ top: 8, right: 8, left: -14, bottom: 0 }}>
          <defs>
            <linearGradient id="funnelFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4F7CFF" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#4F7CFF" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.07)" strokeDasharray="3 3" />
          <XAxis dataKey="stage" stroke="#9AA3C7" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="#9AA3C7" fontSize={11} tickLine={false} axisLine={false} unit="%" />
          <Tooltip
            contentStyle={{ background: "#0B1130", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }}
            labelStyle={{ color: "#9AA3C7" }}
          />
          <Area type="monotone" dataKey="v" stroke="#4F7CFF" strokeWidth={2.5} fill="url(#funnelFill)" name="Funnel index" />
        </AreaChart>
      </ResponsiveContainer>
    ),
    stats: [
      { value: "4.2x", label: "ROAS" },
      { value: "−41%", label: "average CPC" },
      { value: "+156%", label: "qualified leads" },
    ],
  },
];

export default function CaseStudies() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Proof, not just"
        highlight="pretty pictures"
        sub="Three deep-dives into how strategy, execution and iteration compound into growth. All figures are illustrative demo data — clearly labeled."
      />

      <section className="mx-auto max-w-7xl space-y-16 px-5 py-10 lg:px-8">
        {CASES.map((c, i) => (
          <Reveal key={c.slug}>
            <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
              <div className={`grid ${i % 2 ? "lg:grid-cols-[0.95fr_1.05fr]" : "lg:grid-cols-[1.05fr_0.95fr]"}`}>
                <div className={`relative p-8 md:p-10 ${i % 2 ? "lg:order-2" : ""}`}>
                  <div
                    className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full blur-[90px]"
                    style={{ background: `${c.color}1e` }}
                    aria-hidden="true"
                  />
                  <span
                    className="relative inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold"
                    style={{ color: c.color, borderColor: `${c.color}44`, background: `${c.color}14` }}
                  >
                    <TrendingUp className="h-3.5 w-3.5" /> {c.kind}
                  </span>
                  <h2 className="relative mt-5 font-display text-2xl font-bold leading-tight text-white md:text-3xl">
                    {c.headline}
                  </h2>
                  <p className="relative mt-4 leading-relaxed text-muted-foreground">{c.summary}</p>
                  <div className="relative mt-5 flex flex-wrap gap-2">
                    {c.chips.map((ch) => (
                      <span key={ch} className="rounded-lg bg-white/5 px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground">
                        {ch}
                      </span>
                    ))}
                  </div>
                  <div className="relative mt-7 grid grid-cols-3 gap-3">
                    {c.stats.map((s) => (
                      <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 text-center">
                        <p className="font-display text-xl font-extrabold md:text-2xl" style={{ color: c.color }}>
                          {s.value}
                        </p>
                        <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="relative mt-7 flex items-center gap-4">
                    <Link
                      to={`/project/${c.slug}`}
                      className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
                      style={{ background: `linear-gradient(90deg, ${c.color}, #4F7CFF)` }}
                    >
                      Read the full breakdown <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
                <div className={`relative min-h-[320px] ${i % 2 ? "lg:order-1" : ""}`}>
                  <img src={c.image} alt={`${c.brand} — ${c.kind}`} className="absolute inset-0 h-full w-full object-cover opacity-90" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05081A] via-transparent to-transparent lg:bg-gradient-to-r" style={{ backgroundImage: i % 2 ? "linear-gradient(270deg, rgba(5,8,26,0.85), transparent 40%)" : "linear-gradient(90deg, rgba(5,8,26,0.85), transparent 40%)" }} />
                  <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/10 bg-[#05081A]/80 p-4 backdrop-blur-xl">
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {c.brand} · demo chart
                    </p>
                    {c.chart}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <Reveal>
        <p className="mx-auto flex max-w-3xl items-start gap-2.5 px-5 text-center font-mono text-[11.5px] leading-relaxed text-muted-foreground/80">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-300/80" />
          All case studies are demonstration projects with illustrative data, built to show methodology and reporting quality. Real client references available on request.
        </p>
      </Reveal>

      <CTABanner
        title="Want results like these?"
        sub="Every business is different — let's map your funnel and find the fastest wins first."
      />
    </>
  );
}
