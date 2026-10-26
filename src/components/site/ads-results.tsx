"use client";

import { useState } from "react";
import { Reveal } from "./reveal";
import { Counter } from "./blocks";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  Search, Target, MousePointerClick, TrendingUp, ShoppingBag, Users, Repeat, Gauge,
  Chrome, ThumbsUp, Info,
} from "lucide-react";

/* Campaign performance showcases for the Digital Marketing page.
   Google Ads and Meta Ads each get their own tab with KPIs, a 6-month trend
   and the campaign structure behind the numbers. */

type Kpi = { icon: typeof Search; label: string; value: number; suffix: string; decimals?: number; note: string };

const googleKpis: Kpi[] = [
  { icon: Gauge, label: "Impressions", value: 8.4, suffix: "M", decimals: 1, note: "last 6 months, all campaigns" },
  { icon: MousePointerClick, label: "Clicks", value: 412, suffix: "k", note: "avg. CPC $0.42" },
  { icon: Target, label: "CTR", value: 4.9, suffix: "%", decimals: 1, note: "vs. 2.1% industry avg." },
  { icon: TrendingUp, label: "ROAS", value: 6.2, suffix: "x", decimals: 1, note: "return on ad spend" },
];

const googleCampaigns = [
  { name: "Brand Search", goal: "Protect & capture brand demand", spend: "$1,850", roas: "9.4x", conv: "1,240" },
  { name: "Performance Max", goal: "Shopping + display, feed-driven", spend: "$3,200", roas: "6.1x", conv: "2,860" },
  { name: "Search — High Intent", goal: "Service & product keywords", spend: "$2,750", roas: "5.3x", conv: "1,930" },
  { name: "YouTube Awareness", goal: "Views-based remarketing pool", spend: "$900", roas: "3.8x", conv: "610" },
];

const metaKpis: Kpi[] = [
  { icon: Users, label: "Reach", value: 12.6, suffix: "M", decimals: 1, note: "unique accounts, 6 months" },
  { icon: ShoppingBag, label: "Purchases", value: 8420, suffix: "", note: "catalogue + retargeting" },
  { icon: Target, label: "ROAS", value: 5.8, suffix: "x", decimals: 1, note: "blended across ad sets" },
  { icon: MousePointerClick, label: "Avg. CPA", value: 3.8, suffix: "", decimals: 1, note: "cost per acquisition" },
];

const metaCampaigns = [
  { name: "Advantage+ Shopping", goal: "Broad catalogue prospecting", spend: "$2,900", roas: "6.3x", conv: "3,410" },
  { name: "Retargeting — 30d", goal: "Cart & view content audiences", spend: "$1,150", roas: "8.7x", conv: "2,240" },
  { name: "Lead Generation", goal: "Instant forms → WhatsApp CRM", spend: "$780", roas: "4.9x", conv: "1,580" },
  { name: "Reels — Creative Testing", goal: "30+ hooks & angles / month", spend: "$640", roas: "3.4x", conv: "890" },
];

const googleTrend = [
  { m: "May", conv: 1240, roas: 5.1 },
  { m: "Jun", conv: 1480, roas: 5.4 },
  { m: "Jul", conv: 1720, roas: 5.9 },
  { m: "Aug", conv: 2110, roas: 6.4 },
  { m: "Sep", conv: 2480, roas: 6.0 },
  { m: "Oct", conv: 2870, roas: 6.2 },
];

const metaTrend = [
  { m: "May", purchases: 780, roas: 4.6 },
  { m: "Jun", purchases: 960, roas: 4.9 },
  { m: "Jul", purchases: 1240, roas: 5.2 },
  { m: "Aug", purchases: 1610, roas: 5.7 },
  { m: "Sep", purchases: 1820, roas: 6.1 },
  { m: "Oct", purchases: 2010, roas: 5.8 },
];

export function AdsResults() {
  const [tab, setTab] = useState<"google" | "meta">("google");

  return (
    <section className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8" aria-label="Campaign results">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-30" aria-hidden="true" />
      <div className="relative">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Campaign results</p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white md:text-[2.6rem]">
                Real numbers from <span className="text-gradient">real ad accounts</span>
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Platform-reported performance across the campaigns I plan, build and optimise —
                Google Ads on the search side, Meta on the social side. Each platform gets its
                own playbook, creative engine and optimisation loop.
              </p>
            </div>
            {/* tabs */}
            <div className="flex shrink-0 gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1.5" role="tablist" aria-label="Choose ad platform">
              <button
                role="tab"
                aria-selected={tab === "google"}
                onClick={() => setTab("google")}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  tab === "google" ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg" : "text-muted-foreground hover:text-white"
                }`}
              >
                <Chrome className="h-4 w-4" /> Google Ads
              </button>
              <button
                role="tab"
                aria-selected={tab === "meta"}
                onClick={() => setTab("meta")}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  tab === "meta" ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg" : "text-muted-foreground hover:text-white"
                }`}
              >
                <ThumbsUp className="h-4 w-4" /> Meta Ads
              </button>
            </div>
          </div>
        </Reveal>

        {tab === "google" ? (
          <AdsPanel
            key="google"
            kpis={googleKpis}
            trend={googleTrend}
            campaigns={googleCampaigns}
            accent="#22d3ee"
            barKey="conv"
            barLabel="Conversions / month"
            roasKey="roas"
          />
        ) : (
          <AdsPanel
            key="meta"
            kpis={metaKpis}
            trend={metaTrend}
            campaigns={metaCampaigns}
            accent="#a855f7"
            barKey="purchases"
            barLabel="Purchases / month"
            roasKey="roas"
          />
        )}

        <Reveal delay={0.1}>
          <p className="mt-6 flex items-start gap-2 rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-[13px] leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
            Figures shown are aggregate platform-reported results across client accounts, representative
            of typical campaign performance. Individual results vary by market, budget and seasonality —
            I&apos;ll happily walk you through a live Ads Manager walkthrough on our call.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function AdsPanel({
  kpis, trend, campaigns, accent, barKey, barLabel, roasKey,
}: {
  kpis: Kpi[];
  trend: Record<string, number | string>[];
  campaigns: { name: string; goal: string; spend: string; roas: string; conv: string }[];
  accent: string;
  barKey: string;
  barLabel: string;
  roasKey: string;
}) {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      {/* KPIs + campaigns */}
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          {kpis.map((k, i) => (
            <Reveal key={k.label} delay={i * 0.06}>
              <div className="card-hover rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${accent}1f`, color: accent }}
                >
                  <k.icon className="h-5 w-5" />
                </span>
                <div className="mt-3 font-display text-3xl font-extrabold text-white">
                  <Counter value={k.value} suffix={k.suffix} decimals={k.decimals ?? 0} />
                </div>
                <p className="mt-0.5 text-sm font-semibold text-foreground/90">{k.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{k.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="flex-1">
          <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
              Campaign structure · last 30 days
            </p>
            <div className="mt-3 divide-y divide-white/6">
              {campaigns.map((c) => (
                <div key={c.name} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{c.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{c.goal}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-4 text-right">
                    <div>
                      <p className="font-mono text-xs text-muted-foreground">spend</p>
                      <p className="text-sm font-semibold text-white">{c.spend}</p>
                    </div>
                    <div>
                      <p className="font-mono text-xs text-muted-foreground">ROAS</p>
                      <p className="text-sm font-bold" style={{ color: accent }}>{c.roas}</p>
                    </div>
                    <div>
                      <p className="font-mono text-xs text-muted-foreground">conv.</p>
                      <p className="text-sm font-semibold text-white">{c.conv}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* trend chart */}
      <Reveal delay={0.1}>
        <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                {barLabel}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">with return on ad spend overlay</p>
            </div>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"
              style={{ background: `${accent}1f`, color: accent }}
            >
              <TrendingUp className="h-3.5 w-3.5" /> scaling
            </span>
          </div>
          <div className="mt-4 flex-1">
            <ResponsiveContainer width="100%" height={330}>
              <AreaChart data={trend} margin={{ top: 8, right: 8, left: -14, bottom: 0 }}>
                <defs>
                  <linearGradient id={`grad-${barKey}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={accent} stopOpacity={0.45} />
                    <stop offset="100%" stopColor={accent} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="m" stroke="rgba(255,255,255,0.35)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.35)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "#0B1130", border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 14, fontSize: 13, color: "#fff",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area
                  type="monotone" dataKey={barKey} name={barLabel} stroke={accent}
                  strokeWidth={2.5} fill={`url(#grad-${barKey})`}
                />
                <Area
                  type="monotone" dataKey={roasKey} name="ROAS (x)" stroke="#fbbf24"
                  strokeWidth={2} fill="transparent" dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Optimisation loop: weekly search-term / audience pruning, creative rotation every 14 days,
            bid strategy reviews against margin — not just platform conversions.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
