"use client";

import { TrackPage, type TrackConfig } from "./track-page";
import { AdsResults } from "./ads-results";
import {
  Target, Search, SearchCheck, Instagram, Users, MousePointerClick, BarChart3,
  type LucideIcon,
} from "lucide-react";

const services = [
  {
    icon: Target as LucideIcon, title: "Meta Ads",
    desc: "Facebook & Instagram campaigns with a real creative testing engine.",
    bullets: ["Full-funnel structures", "30+ creatives/month possible", "CAPI & clean tracking"],
  },
  {
    icon: Search as LucideIcon, title: "Google Ads",
    desc: "Search, Shopping and PMax built around intent and margin.",
    bullets: ["Intent-tiered campaigns", "Objection-led copy", "Offline conversion imports"],
  },
  {
    icon: SearchCheck as LucideIcon, title: "SEO",
    desc: "Compounding organic growth: technical, content and authority.",
    bullets: ["Technical audits & fixes", "Topic-cluster content", "Digital PR & links"],
  },
  {
    icon: Instagram as LucideIcon, title: "Social Media Marketing",
    desc: "Content systems that build audience, not just follower counts.",
    bullets: ["Monthly content matrix", "Short-form video", "Community management"],
  },
  {
    icon: Users as LucideIcon, title: "Lead Generation",
    desc: "Funnels that feed sales pipelines with qualified prospects.",
    bullets: ["Lead magnet strategy", "Landing page funnels", "Email nurture sequences"],
  },
  {
    icon: MousePointerClick as LucideIcon, title: "Conversion Rate Optimisation",
    desc: "Squeeze more revenue from the traffic you already have.",
    bullets: ["Heatmap & session analysis", "A/B testing roadmap", "Copy & UX experiments"],
  },
  {
    icon: BarChart3 as LucideIcon, title: "Analytics & Reporting",
    desc: "Dashboards you'll actually open, with numbers you can trust.",
    bullets: ["GA4 & server-side setup", "Attribution honesty", "Plain-English monthly reports"],
  },
];

const cfg: TrackConfig = {
  eyebrow: "Digital Marketing",
  titleA: "Campaigns measured in",
  titleB: "revenue",
  sub: "Meta Ads, Google Ads, SEO and social — run with the discipline of an in-house team and the honesty of a partner.",
  image: "/images/site/marketing-feature.png",
  imageAlt: "Marketing analytics dashboards with colorful charts",
  color: "#A855F7",
  softColor: "rgba(168,85,247,0.12)",
  statPrefix: "Growth is a system —",
  stats: [
    { value: 4.2, suffix: "x", label: "best sustained ROAS", decimals: 1 },
    { value: 287, suffix: "%", label: "organic traffic lift (6 mo)" },
    { value: 120, suffix: "+", label: "campaigns managed" },
  ],
  services,
  process: [
    { title: "Audit", desc: "Account, analytics and funnel teardown. Where is money leaking right now?" },
    { title: "Strategy", desc: "Channel mix, budgets, creative angles and a 90-day roadmap with targets." },
    { title: "Launch", desc: "Campaigns live, tracking verified, creatives in a weekly testing rhythm." },
    { title: "Scale", desc: "Double down on winners, kill losers fast, report in plain English monthly." },
  ],
  offerings: {
    name: "Growth Engine Retainer",
    price: "$899",
    period: "per month",
    tagline: "Full-funnel management for steady, compounding growth.",
    features: ["2 platforms managed", "12+ ad creatives monthly", "Landing page CRO input", "A/B testing program", "Bi-weekly strategy calls"],
  },
  faqNote: "Ad spend billed directly to your ad account — full transparency.",
};

export default function DigitalMarketing() {
  return <TrackPage cfg={cfg} icon={Target} adsSlot={<AdsResults />} />;
}
