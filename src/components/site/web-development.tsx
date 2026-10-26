"use client";

import { TrackPage, type TrackConfig } from "./track-page";
import {
  Globe, Layout, ShoppingCart, MousePointerClick, PenTool, Gauge, Wrench,
  type LucideIcon,
} from "lucide-react";

const services = [
  {
    icon: Globe as LucideIcon, title: "Responsive Website Design",
    desc: "Mobile-first layouts that look intentional on every screen size.",
    bullets: ["Design systems, not one-offs", "Tested on real devices", "Accessible by default"],
  },
  {
    icon: Layout as LucideIcon, title: "Full-Stack Development",
    desc: "Real applications — auth, databases, dashboards, integrations.",
    bullets: ["Next.js + TypeScript", "REST/GraphQL APIs", "Admin panels & CMS"],
  },
  {
    icon: ShoppingCart as LucideIcon, title: "E-Commerce Development",
    desc: "Stores built to sell: fast catalogs, frictionless checkout.",
    bullets: ["Shopify or custom stack", "Payment integrations", "Abandoned-cart flows"],
  },
  {
    icon: MousePointerClick as LucideIcon, title: "Landing Pages",
    desc: "Single-goal pages engineered for campaigns and launches.",
    bullets: ["A/B-test ready", "Sub-2s load times", "Form + CRM wiring"],
  },
  {
    icon: PenTool as LucideIcon, title: "UI/UX Design",
    desc: "Interfaces users understand instantly — designed from research.",
    bullets: ["Wireframes to hi-fi", "Prototype testing", "Design tokens & handoff"],
  },
  {
    icon: Gauge as LucideIcon, title: "Website Optimisation",
    desc: "Speed, SEO structure and Core Web Vitals — the invisible wins.",
    bullets: ["90+ PageSpeed targets", "Image & font strategy", "Technical SEO pass"],
  },
  {
    icon: Wrench as LucideIcon, title: "Website Maintenance",
    desc: "Your site stays updated, backed up and monitored while you work.",
    bullets: ["Monthly updates", "Uptime monitoring", "Priority fixes"],
  },
];

const cfg: TrackConfig = {
  eyebrow: "Web Development",
  titleA: "Websites engineered to",
  titleB: "perform",
  sub: "Design that impresses, code that scales, and conversion baked into every section. From a sharp landing page to a full e-commerce build.",
  image: "/images/site/webdev-feature.png",
  imageAlt: "Code editor and website preview with purple and blue lighting",
  color: "#4F7CFF",
  softColor: "rgba(79,124,255,0.12)",
  statPrefix: "Don't take my word for it —",
  stats: [
    { value: 98, suffix: "", label: "avg. PageSpeed score" },
    { value: 1.8, suffix: "s", label: "avg. mobile load time", decimals: 1 },
    { value: 64, suffix: "%", label: "conversion lift on rebuilds" },
  ],
  services,
  process: [
    { title: "Blueprint", desc: "Sitemap, wireframes and a conversion map before any pixels are pushed." },
    { title: "Design", desc: "Art direction with a component system — consistent, scalable, beautiful." },
    { title: "Build", desc: "Clean Next.js code, image optimisation, SEO structure and analytics wiring." },
    { title: "Launch & Care", desc: "Deploy, monitor, then keep iterating with real user data." },
  ],
  offerings: {
    name: "Business Website Package",
    price: "$1,299",
    period: "per project",
    tagline: "The most popular starting point for growing brands.",
    features: ["Up to 8 custom pages", "CMS to edit content", "Full technical SEO pass", "Analytics & tracking setup", "30 days free support"],
  },
  faqNote: "Custom quote after a free 20-minute discovery call.",
};

export default function WebDevelopment() {
  return <TrackPage cfg={cfg} icon={Layout} />;
}
