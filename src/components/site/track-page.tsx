 
"use client";

import { PageHero, CTABanner } from "./blocks";
import { Reveal, SectionHead } from "./reveal";
import { Link } from "@/lib/router";
import {
  ArrowRight, BadgeCheck, CheckCircle2, type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

export type TrackService = { icon: LucideIcon; title: string; desc: string; bullets: string[] };
export type TrackConfig = {
  eyebrow: string;
  titleA: string;
  titleB: string;
  sub: string;
  image: string;
  imageAlt: string;
  color: string;
  softColor: string;
  statPrefix: string;
  stats: { value: number; suffix: string; label: string; decimals?: number }[];
  services: TrackService[];
  process: { title: string; desc: string }[];
  offerings?: { name: string; price: string; period: string; tagline: string; features: string[] };
  faqNote: string;
};

export function TrackPage({ cfg, icon: Icon, adsSlot }: { cfg: TrackConfig; icon: LucideIcon; adsSlot?: ReactNode }) {
  return (
    <>
      <PageHero eyebrow={cfg.eyebrow} title={cfg.titleA} highlight={cfg.titleB} sub={cfg.sub}>
        <div className="flex flex-wrap gap-2.5">
          {cfg.services.slice(0, 6).map((s) => (
            <span
              key={s.title}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium text-white"
              style={{ background: cfg.softColor, borderColor: `${cfg.color}44` }}
            >
              <s.icon className="h-4 w-4" style={{ color: cfg.color }} />
              {s.title}
            </span>
          ))}
        </div>
      </PageHero>

      {/* feature image + stats */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="ring-gradient overflow-hidden rounded-[1.8rem]">
              <img src={cfg.image} alt={cfg.imageAlt} className="aspect-[16/9] w-full object-cover" loading="lazy" />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="eyebrow mb-3">Why it matters</p>
              <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-[2.4rem]">
                {cfg.statPrefix} <span style={{ color: cfg.color }}>the numbers</span> prove it.
              </h2>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {cfg.stats.map((st) => (
                  <div key={st.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                    <div className="font-display text-2xl font-extrabold text-white md:text-3xl">
                      {st.value.toLocaleString()}{st.suffix}
                    </div>
                    <p className="mt-1 text-[11.5px] leading-snug text-muted-foreground">{st.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground/70">
                * illustrative demo metrics across sample projects
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* services grid */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <SectionHead
          eyebrow="What's included"
          title={<>Everything under the <span style={{ color: cfg.color }}>{cfg.titleB.toLowerCase()}</span> roof</>}
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cfg.services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.07} className="h-full">
              <div className="card-hover flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: cfg.softColor, color: cfg.color }}
                >
                  <s.icon className="h-5.5 w-5.5 h-[22px] w-[22px]" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{s.desc}</p>
                <ul className="mt-4 space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[13px] text-foreground/80">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: cfg.color }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* process */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <SectionHead eyebrow="How it works" title={<>My <span style={{ color: cfg.color }}>{cfg.titleB.toLowerCase()}</span> process</>} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cfg.process.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="card-hover relative h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl font-mono text-sm font-bold"
                  style={{ background: cfg.softColor, color: cfg.color }}
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-[17px] font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ads results slot (marketing page shows Google/Meta campaign performance) */}
      {adsSlot}

      {/* pricing teaser */}
      {cfg.offerings && (
        <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-12">
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-[100px]" style={{ background: `${cfg.color}22` }} aria-hidden="true" />
              <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <p className="eyebrow mb-3">Starting point</p>
                  <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
                    {cfg.offerings.name}
                  </h3>
                  <p className="mt-2 max-w-lg text-muted-foreground">{cfg.offerings.tagline}</p>
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {cfg.offerings.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-foreground/85">
                        <BadgeCheck className="h-4 w-4 shrink-0" style={{ color: cfg.color }} /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center lg:text-right">
                  <div className="flex items-baseline justify-center gap-2 lg:justify-end">
                    <span className="font-display text-4xl font-extrabold text-white md:text-5xl">{cfg.offerings.price}</span>
                    <span className="text-sm text-muted-foreground">{cfg.offerings.period}</span>
                  </div>
                  <Link
                    to="/contact"
                    className="group mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold text-white transition-all hover:brightness-110"
                    style={{ background: `linear-gradient(90deg, ${cfg.color}, #4F7CFF)`, boxShadow: `0 12px 40px -10px ${cfg.color}88` }}
                  >
                    Get a quote
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <p className="mt-3 text-xs text-muted-foreground">{cfg.faqNote}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      <CTABanner />
    </>
  );
}
