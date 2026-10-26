"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  Camera,
  Coffee,
  Flame,
  Podcast,
  ShoppingBag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type Project = {
  title: string;
  category: "Social Media" | "Web Dev" | "Campaigns";
  Icon: LucideIcon;
  gradient: string;
  desc: string;
  metrics: { value: string; label: string }[];
  tags: string[];
};

const categories = ["All", "Social Media", "Web Dev", "Campaigns"] as const;

const projects: Project[] = [
  {
    title: "GlowUp Beauty — IG Growth Sprint",
    category: "Social Media",
    Icon: Camera,
    gradient: "from-fuchsia-600/50 via-pink-500/40 to-purple-500/30",
    desc: "Full Instagram takeover: a reels system, UGC pipeline and community playbook built from zero.",
    metrics: [
      { value: "+45K", label: "followers" },
      { value: "3.2x", label: "reach" },
      { value: "6", label: "months" },
    ],
    tags: ["Instagram", "Reels", "UGC"],
  },
  {
    title: "Bloom & Co. — E-commerce Build",
    category: "Web Dev",
    Icon: ShoppingBag,
    gradient: "from-orange-500/50 via-amber-400/40 to-rose-400/30",
    desc: "Next.js storefront with a headless CMS, one-page checkout and image pipeline tuned for speed.",
    metrics: [
      { value: "+38%", label: "conversion" },
      { value: "1.2s", label: "load time" },
      { value: "99", label: "lighthouse" },
    ],
    tags: ["Next.js", "Shopify", "SEO"],
  },
  {
    title: "FitFuel — 30-Day Reels Challenge",
    category: "Campaigns",
    Icon: Flame,
    gradient: "from-pink-500/50 via-rose-400/40 to-orange-400/30",
    desc: "A viral UGC challenge concept with daily reels, creator collabs and a leaderboard that kept people hooked.",
    metrics: [
      { value: "2.1M", label: "views" },
      { value: "12K", label: "participants" },
      { value: "30", label: "days" },
    ],
    tags: ["TikTok", "UGC", "Challenge"],
  },
  {
    title: "Café Aroma — Brand & Website",
    category: "Web Dev",
    Icon: Coffee,
    gradient: "from-amber-500/50 via-orange-400/40 to-yellow-400/30",
    desc: "Full rebrand plus a cozy, conversion-friendly website with online ordering and a loyalty page.",
    metrics: [
      { value: "+62%", label: "online orders" },
      { value: "4.9", label: "avg. rating" },
      { value: "3wk", label: "delivery" },
    ],
    tags: ["Branding", "WordPress", "UI Design"],
  },
  {
    title: "TechTalks — Podcast Launch",
    category: "Social Media",
    Icon: Podcast,
    gradient: "from-fuchsia-500/50 via-purple-400/40 to-pink-400/30",
    desc: "Launch strategy, a clip engine for short-form and cross-platform distribution that built a fandom fast.",
    metrics: [
      { value: "120K", label: "listens" },
      { value: "18", label: "episodes" },
      { value: "9", label: "guests" },
    ],
    tags: ["YouTube", "LinkedIn", "Clips"],
  },
  {
    title: "UrbanNest — Lead Gen Funnel",
    category: "Campaigns",
    Icon: Building2,
    gradient: "from-rose-500/50 via-pink-400/40 to-amber-400/30",
    desc: "Landing pages plus a Meta ads funnel for a real estate startup — creative tests running weekly.",
    metrics: [
      { value: "5.2x", label: "ROAS" },
      { value: "-31%", label: "cost / lead" },
      { value: "900+", label: "leads" },
    ],
    tags: ["Landing Pages", "Meta Ads", "CRO"],
  },
];

export function Projects() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="relative scroll-mt-24 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-0 h-96 w-96 rounded-full bg-pink-500/10 blur-[120px]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Selected work"
          title={
            <>
              Projects with <span className="text-gradient">real results</span>
            </>
          }
          description="Every project below shipped with a goal and a number attached to it. Filter by what you need."
        />

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                aria-pressed={active === c}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                  active === c
                    ? "border-transparent bg-gradient-to-r from-fuchsia-500 to-orange-400 text-white shadow-lg shadow-fuchsia-500/25"
                    : "border-white/10 bg-white/5 text-stone-300 hover:border-fuchsia-400/40 hover:text-fuchsia-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-fuchsia-400/40"
              >
                <div
                  className={`relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br ${p.gradient}`}
                >
                  <div aria-hidden className="absolute inset-0 bg-dots opacity-60" />
                  <p.Icon
                    className="relative h-16 w-16 text-white/90 transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.4}
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-stone-950/60 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-stone-200 backdrop-blur">
                    {p.category}
                  </span>
                  <span className="absolute right-4 top-4 grid h-9 w-9 translate-y-1 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-stone-50">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-400">{p.desc}</p>
                  <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/5 pt-4">
                    {p.metrics.map((m) => (
                      <div key={m.label}>
                        <p className="text-gradient font-display text-base font-bold">
                          {m.value}
                        </p>
                        <p className="text-[11px] text-stone-500">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-stone-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
