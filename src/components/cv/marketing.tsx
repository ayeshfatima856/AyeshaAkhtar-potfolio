"use client";

import { TrendingUp, ZoomIn, BadgeCheck } from "lucide-react";
import { Reveal, SectionHead, useLightbox } from "./shared";
import { MARKETING_FEATURED, MARKETING_SHOTS, RESULT_STATS, STATS_NOTE } from "./data";

export function Marketing() {
  const { open } = useLightbox();

  return (
    <section id="results" className="surface-white relative py-24 lg:py-32" aria-label="Marketing results">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          eyebrow="Digital Marketing · Campaign Results"
          title={
            <>
              Ads that don&apos;t just look good —
              <br className="hidden sm:block" /> they <span className="text-gradient-navy">perform</span>
          </>
        }
          sub="Real campaign dashboards from Meta Ads Manager and Google Ads accounts — the same creatives and campaign direction I bring to every client project."
        />

        {/* stat strip */}
        <Reveal delay={0.1}>
          <dl className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {RESULT_STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-ink/8 bg-gradient-to-b from-cloud to-white p-6 text-center shadow-sm">
                <dt className="order-2 mt-1.5 block text-[12.5px] font-medium text-slateink">{s.label}</dt>
                <dd className="order-1 font-display text-3xl font-bold tracking-tight text-iris sm:text-4xl">{s.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11.5px] text-slateink/80">
            <BadgeCheck className="h-3.5 w-3.5 text-iris" aria-hidden="true" /> {STATS_NOTE}
          </p>
        </Reveal>

        {/* featured — Zameen case study showcase */}
        <Reveal delay={0.12}>
          <article className="mt-12 overflow-hidden rounded-3xl border border-ink/8 bg-ink shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 sm:px-8">
              <p className="flex items-center gap-2 font-display text-[15px] font-bold text-white">
                <TrendingUp className="h-4.5 w-4.5 text-lime-pop" aria-hidden="true" />
                {MARKETING_FEATURED.label}
              </p>
              <span className="rounded-full bg-lime-pop/15 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-lime-pop">
                Featured showcase
              </span>
            </div>
            <button
              onClick={() => open([{ src: MARKETING_FEATURED.src, title: MARKETING_FEATURED.label }])}
              className="group relative block w-full cursor-zoom-in"
              aria-label="Open Zameen campaign case study full size"
            >
              { }
              <img
                src={MARKETING_FEATURED.src}
                alt={MARKETING_FEATURED.label}
                className="max-h-[560px] w-full object-cover object-top transition duration-700 group-hover:scale-[1.015]"
                loading="lazy"
              />
              <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-3.5 py-2 text-[12px] font-semibold text-white opacity-90 backdrop-blur transition group-hover:bg-iris">
                <ZoomIn className="h-3.5 w-3.5" /> View full size
              </span>
            </button>
            <p className="border-t border-white/10 px-6 py-3.5 text-[12.5px] text-mist sm:px-8">{MARKETING_FEATURED.meta}</p>
          </article>
        </Reveal>

        {/* dashboard grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {MARKETING_SHOTS.map((shot, i) => (
            <Reveal key={shot.src} delay={0.08 + i * 0.06}>
              <figure className="card-light group overflow-hidden rounded-3xl">
                <button
                  onClick={() => open(MARKETING_SHOTS.map((s) => ({ src: s.src, title: s.label })), i)}
                  className="relative block w-full cursor-zoom-in overflow-hidden border-b border-ink/6"
                  aria-label={`Open ${shot.label} full size`}
                >
                  { }
                  <img
                    src={shot.src}
                    alt={shot.label}
                    className="h-64 w-full object-cover object-top transition duration-700 group-hover:scale-[1.03] sm:h-72"
                    loading="lazy"
                  />
                  <span className="absolute inset-0 bg-iris/0 transition group-hover:bg-iris/10" aria-hidden="true" />
                  <span className="absolute bottom-3 right-3 rounded-full bg-ink/75 p-2 text-white opacity-0 backdrop-blur transition group-hover:opacity-100" aria-hidden="true">
                    <ZoomIn className="h-4 w-4" />
                  </span>
                </button>
                <figcaption className="p-5 sm:p-6">
                  <p className="font-display text-[14.5px] font-bold text-ink">{shot.label}</p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-slateink">{shot.meta}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
