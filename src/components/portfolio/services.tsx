"use client";

import {
  BarChart3,
  Megaphone,
  MonitorSmartphone,
  MousePointerClick,
  Palette,
  Target,
} from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const services = [
  {
    Icon: Megaphone,
    title: "Social Media Management",
    desc: "Full-service handling of your Instagram, TikTok and LinkedIn — strategy, content calendars, posting and community engagement that builds real audiences.",
    tags: ["Content calendars", "Engagement", "Growth"],
  },
  {
    Icon: MonitorSmartphone,
    title: "Web Design & Development",
    desc: "Fast, responsive, SEO-friendly websites built with modern stacks like Next.js — from sleek portfolios to full e-commerce stores.",
    tags: ["Next.js", "Responsive", "E-commerce"],
  },
  {
    Icon: Palette,
    title: "Brand Identity & Content",
    desc: "Logos, color systems, reels and copy that actually sound like you — one consistent brand across every platform your audience lives on.",
    tags: ["Visual identity", "Reels", "Copywriting"],
  },
  {
    Icon: Target,
    title: "Paid Ad Campaigns",
    desc: "Meta and Google ads with sharp targeting, creative testing and ROAS-focused optimization — every dollar tracked, every result reported.",
    tags: ["Meta Ads", "Google Ads", "Funnels"],
  },
  {
    Icon: BarChart3,
    title: "SEO & Analytics",
    desc: "Technical audits, keyword strategy and clear dashboards, so you always know what is working, what is not, and what to do next.",
    tags: ["Audits", "Keywords", "Reporting"],
  },
  {
    Icon: MousePointerClick,
    title: "Landing Pages & Funnels",
    desc: "Conversion-first pages and funnels designed to turn casual visitors into loyal customers — tested, measured and iterated.",
    tags: ["A/B testing", "CRO", "Automation"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="Services"
          title={
            <>
              How I can help you <span className="text-gradient">grow</span>
            </>
          }
          description="Pick one piece or hand me the whole puzzle — from a single landing page to a complete brand, website and growth engine."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08} className="h-full">
              <article className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-fuchsia-400/40 hover:bg-white/[0.05]">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-3 -top-5 font-display text-7xl font-extrabold text-white/[0.04] transition-colors group-hover:text-fuchsia-400/10"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/20 to-orange-400/10 text-fuchsia-300 transition-colors group-hover:text-fuchsia-200">
                  <s.Icon className="h-6 w-6" />
                </span>
                <h3 className="relative mt-5 font-display text-xl font-bold text-stone-50">
                  {s.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-stone-400">{s.desc}</p>
                <div className="relative mt-5 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-stone-400 transition-colors group-hover:text-stone-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
