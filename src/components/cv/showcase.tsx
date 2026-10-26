"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Globe, ExternalLink, HeartPulse, Plane, ShoppingBag, Coffee,
  UtensilsCrossed, Wrench, LayoutTemplate, Loader2, Landmark,
} from "lucide-react";
import { Reveal, SectionHead } from "./shared";

/* ============================================================
   Website Showcase — a dedicated, auto-organized grid of live
   websites (owner-supplied URLs verbatim). Grouped by industry,
   each card links out to the real website in a new tab.
   ============================================================ */

interface SiteCardData {
  id: string;
  title: string;
  slug: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  liveUrl: string;
  industry: string;
  role: string;
}

const GROUP_ORDER = [
  "Healthcare & Medical",
  "Travel & Hospitality",
  "E-commerce & Retail",
  "Café & Coffee",
  "Restaurants & Food",
  "Home & Technical Services",
];

const GROUP_META: Record<string, { icon: typeof Globe; accent: string }> = {
  "Healthcare & Medical": { icon: HeartPulse, accent: "#0ea5e9" },
  "Travel & Hospitality": { icon: Plane, accent: "#7c3aed" },
  "E-commerce & Retail": { icon: ShoppingBag, accent: "#ec4899" },
  "Café & Coffee": { icon: Coffee, accent: "#92400e" },
  "Restaurants & Food": { icon: UtensilsCrossed, accent: "#c2410c" },
  "Home & Technical Services": { icon: Wrench, accent: "#059669" },
};

function regionOf(url: string): string {
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  // weartzane.com operates in Pakistan despite the .com domain
  if (/\.pk(\/|$)/.test(host) || host.includes("weartzane.com")) return "Pakistan";
  if (/\.co\.uk|\.uk(\/|$)/.test(host)) return "United Kingdom";
  if (/\.ae(\/|$)/.test(host)) return "UAE";
  return "Global";
}

function faviconOf(slug: string): string {
  const key = slug.replace(/^showcase-/, "");
  return `/images/showcase/favicons/${key}.png`;
}

export function WebsiteShowcase() {
  const [sites, setSites] = useState<SiteCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch("/api/projects")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (!alive) return;
        const rows = (d?.projects ?? []) as Record<string, unknown>[];
        setSites(
          rows
            .filter((p) => p.showcase === true && p.published !== false)
            .sort((a, b) => Number(a.sort ?? 0) - Number(b.sort ?? 0))
            .map((p) => ({
              id: String(p.id),
              title: String(p.title),
              slug: String(p.slug),
              category: String(p.category || "Website"),
              tagline: String(p.tagline || ""),
              description: String(p.description || ""),
              image: String(p.image || ""),
              liveUrl: String(p.liveUrl || ""),
              industry: String(p.industry || ""),
              role: String(p.role || "Website Showcase"),
            }))
        );
      })
      .catch(() => {})
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  /* auto-organize: group by industry in a defined order, extras appended */
  const groups = useMemo(() => {
    const map = new Map<string, SiteCardData[]>();
    for (const s of sites) {
      const key = s.industry || "Other Industries";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(s);
    }
    const keys = [
      ...GROUP_ORDER.filter((k) => map.has(k)),
      ...[...map.keys()].filter((k) => !GROUP_ORDER.includes(k)),
    ];
    return keys.map((k) => ({ name: k, items: map.get(k)! }));
  }, [sites]);

  const industryCount = groups.length;

  return (
    <section id="showcase" className="surface-light relative overflow-hidden py-24 lg:py-32" aria-label="Website showcase">
      <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-50" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-iris/8 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          eyebrow="Website Showcase · Live Sites"
          title={
            <>
              One showcase, <span className="text-gradient-navy">organized by industry</span>
            </>
          }
          sub={`A dedicated collection of live websites — automatically grouped into ${industryCount || "…"} industry categories so you can browse exactly the kind of business you want to see. Every button opens the real website in a new tab.`}
        />

        {/* summary strip */}
        {!loading && sites.length > 0 && (
          <Reveal delay={0.06}>
            <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3">
              <span className="chip-light">
                <Globe className="h-3.5 w-3.5 text-iris" aria-hidden="true" /> {sites.length} live websites
              </span>
              <span className="chip-light">
                <LayoutTemplate className="h-3.5 w-3.5 text-iris" aria-hidden="true" /> {industryCount} industry groups
              </span>
              <span className="chip-light">
                <ExternalLink className="h-3.5 w-3.5 text-iris" aria-hidden="true" /> Real links — no mockups passed off as live sites
              </span>
            </div>
          </Reveal>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-5 w-5 animate-spin text-iris" aria-hidden="true" />
          </div>
        ) : sites.length === 0 ? (
          <p className="mt-14 text-center text-slateink">The showcase is being prepared — check back soon.</p>
        ) : (
          <div className="mt-16 space-y-16">
            {groups.map((g, gi) => {
              const meta = GROUP_META[g.name] ?? { icon: Landmark, accent: "#5B5CF0" };
              const GIcon = meta.icon;
              return (
                <div key={g.name}>
                  {/* industry group header */}
                  <Reveal>
                    <div className="flex flex-wrap items-center gap-3.5">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${meta.accent}, ${meta.accent}cc)` }}
                        aria-hidden="true"
                      >
                        <GIcon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-bold text-ink">{g.name}</h3>
                        <p className="text-[12.5px] text-slateink">
                          {g.items.length} live {g.items.length === 1 ? "website" : "websites"} in this industry
                        </p>
                      </div>
                      <span className="hidden h-px flex-1 bg-ink/8 sm:block" aria-hidden="true" />
                      <span className="rounded-full border border-ink/10 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slateink">
                        {String(gi + 1).padStart(2, "0")} / {String(groups.length).padStart(2, "0")}
                      </span>
                    </div>
                  </Reveal>

                  {/* cards */}
                  <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {g.items.map((s, i) => (
                      <Reveal key={s.id} delay={Math.min(i * 0.06, 0.24)}>
                        <ShowcaseCard site={s} accent={meta.accent} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function ShowcaseCard({ site, accent }: { site: SiteCardData; accent: string }) {
  const domain = site.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const region = regionOf(site.liveUrl);
  const favicon = faviconOf(site.slug);
  const hasShot = !!site.image;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-iris/10">
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-ink/6 bg-cloud px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="ml-1.5 flex min-w-0 flex-1 items-center gap-1.5 truncate rounded-md bg-white px-2.5 py-1 text-[10.5px] font-medium text-slateink">
          {/* real favicon of the live site */}
          <img
            src={favicon}
            alt=""
            className="h-3.5 w-3.5 shrink-0 rounded-sm object-contain"
            loading="lazy"
            aria-hidden="true"
          />
          <span className="truncate">{domain}</span>
          <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" aria-hidden="true" />
        </span>
      </div>

      {/* preview: real capture with hover scroll, or branded cover fallback */}
      <a
        href={site.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block h-52 w-full overflow-hidden border-b border-ink/6"
        aria-label={`Visit the ${site.title} website (opens in a new tab)`}
      >
        {hasShot ? (
          <>
            <img
              src={site.image}
              alt={`${site.title} — ${site.category} website preview`}
              className="showcase-shot w-full object-cover object-top"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" aria-hidden="true" />
          </>
        ) : (
          <span
            className="flex h-full w-full flex-col items-center justify-center gap-3 text-white"
            style={{ background: `linear-gradient(140deg, ${accent} 0%, #111827 100%)` }}
          >
            <img
              src={favicon}
              alt=""
              className="h-14 w-14 rounded-2xl bg-white p-2 shadow-xl"
              loading="lazy"
              aria-hidden="true"
            />
            <span className="font-display text-lg font-bold">{site.title}</span>
            <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold backdrop-blur">{domain}</span>
          </span>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-lime-pop backdrop-blur">
          {site.role}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-ink backdrop-blur">
          {region}
        </span>
      </a>

      {/* body */}
      <div className="flex flex-1 flex-col gap-3 p-5.5">
        <div>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.16em]" style={{ color: accent }}>
            {site.industry || site.category}
          </p>
          <h4 className="mt-1 font-display text-[17px] font-bold leading-snug text-ink">{site.title}</h4>
        </div>
        <p className="line-clamp-2 flex-1 text-[13px] leading-relaxed text-slateink">{site.tagline}</p>

        <div className="flex items-center justify-between gap-2 border-t border-ink/6 pt-4">
          <a
            href={site.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-iris px-4 py-2.5 text-[12px]"
            aria-label={`Visit ${site.title} — ${domain}`}
          >
            <Globe className="h-3.5 w-3.5" /> Visit Website
          </a>
          <span className="text-right text-[10.5px] leading-tight text-slateink/80">
            Live site
            <br />
            opens in new tab
          </span>
        </div>
      </div>
    </article>
  );
}
