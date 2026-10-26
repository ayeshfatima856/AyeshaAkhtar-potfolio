 
"use client";

import { Link } from "@/lib/router";
import { Reveal } from "./reveal";
import { parseMetrics, type Project } from "@/lib/types";
import { useCountUp } from "@/lib/hooks";
import { ArrowUpRight, Sparkles, Facebook, Instagram, ExternalLink } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* ---------- animated counter ---------- */
export function Counter({
  value,
  suffix = "",
  decimals = 0,
  className,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const { ref, value: v } = useCountUp(value, 1700, decimals);
  return (
    <span ref={ref} className={className}>
      {decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------- inner page hero ---------- */
export function PageHero({
  eyebrow,
  title,
  highlight,
  sub,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  highlight?: string;
  sub?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950 bg-grid pt-36 pb-16 md:pt-44 md:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-aurora" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[110px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="eyebrow inline-flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" /> {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl">
            {title} {highlight && <span className="text-gradient">{highlight}</span>}
          </h1>
          {sub && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{sub}</p>}
        </Reveal>
        {children && <Reveal delay={0.15} className="mt-8">{children}</Reveal>}
      </div>
    </section>
  );
}

/* ---------- scrolling "video" site preview (browser frame + auto-scroll) ---------- */

export function hostnameOf(url?: string | null): string {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
  }
}

export function SitePreview({
  src,
  url,
  alt,
  aspect = "16 / 10",
  rounded = "rounded-t-2xl",
}: {
  src: string;
  url?: string | null;
  alt: string;
  aspect?: string;
  rounded?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [anim, setAnim] = useState<{ end: number; dur: number } | null>(null);

  const compute = useCallback(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;
    const end = img.offsetHeight - wrap.clientHeight;
    if (end <= 10) {
      setAnim(null);
      return;
    }
    setAnim({ end, dur: Math.min(48, Math.max(13, end / 120)) });
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(compute);
    window.addEventListener("resize", compute);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", compute);
    };
  }, [compute]);

  const domain = hostnameOf(url) || src.replace("/images/live/", "").replace(".jpg", "") + ".demo";

  return (
    <div className={`relative overflow-hidden border-white/10 bg-white/[0.04] backdrop-blur ${rounded}`} style={{ border: "1px solid rgba(255,255,255,0.1)", borderBottom: "none" }}>
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.05] px-3.5 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 flex-1 truncate rounded-md bg-black/25 px-3 py-1 font-mono text-[10.5px] text-white/55">
          {url ? (
            <span className="inline-flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400/80" aria-hidden="true" />
              {domain}
            </span>
          ) : (
            domain
          )}
        </span>
      </div>
      {/* scrolling viewport */}
      <div ref={wrapRef} className="relative overflow-hidden" style={{ aspectRatio: aspect }}>
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={compute}
          className={`site-scroll-img w-full select-none ${anim ? "" : "!animate-none"}`}
          style={anim ? ({ "--scroll-end": `${-anim.end}px`, "--dur": `${durFix(anim.dur)}s` } as CSSProperties) : undefined}
          draggable={false}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/25 to-transparent" />
      </div>
    </div>
  );
}

function durFix(d: number) {
  return Math.round(d * 10) / 10;
}

/* ---------- project card ---------- */
const TRACK_STYLES: Record<string, string> = {
  web: "bg-blue-500/15 text-blue-300 border-blue-400/25",
  marketing: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-400/25",
  design: "bg-amber-500/15 text-amber-300 border-amber-400/25",
};

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const metrics = parseMetrics(project.metrics).slice(0, 2);
  const isLiveCapture = project.image.startsWith("/images/live/");
  const socialIsFb = !!project.socialUrl && /facebook\.com/i.test(project.socialUrl);
  const chipOffset = isLiveCapture ? { top: "2.9rem" } : undefined;
  return (
    <Reveal delay={(index % 3) * 0.08} className="h-full">
      <article className="group card-hover relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <Link to={`/project/${project.slug}`} className="relative block overflow-hidden" aria-label={`View ${project.title}`}>
          {isLiveCapture ? (
            <SitePreview
              src={project.image}
              url={project.liveUrl || null}
              alt={`${project.title} — ${project.tagline}`}
            />
          ) : (
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={project.image}
                alt={`${project.title} — ${project.tagline}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05081A]/85 via-transparent to-transparent" />
            </div>
          )}
          <span
            className={`absolute left-4 rounded-full border px-3 py-1 text-[11px] font-semibold backdrop-blur-md ${
              TRACK_STYLES[project.track] || TRACK_STYLES.web
            }`}
            style={chipOffset}
          >
            {project.category}
          </span>
          {project.liveUrl ? (
            <span
              className="absolute right-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-[#05081A]/75 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-300 backdrop-blur-md"
              style={chipOffset}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              live
            </span>
          ) : (
            project.demo && (
              <span
                className="absolute right-4 rounded-full border border-amber-400/30 bg-[#05081A]/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-amber-300/90 backdrop-blur-md"
                style={chipOffset}
              >
                demo
              </span>
            )
          )}
        </Link>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl font-bold text-white">
            <Link to={`/project/${project.slug}`} className="transition-colors group-hover:text-violet-300">
              {project.title}
            </Link>
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{project.tagline}</p>
          {metrics.length > 0 && (
            <div className="mt-4 flex gap-5">
              {metrics.map((m) => (
                <div key={m.label}>
                  <div className="font-display text-lg font-bold text-gradient">
                    <Counter value={m.value} suffix={m.suffix} decimals={m.value % 1 !== 0 ? 1 : 0} />
                  </div>
                  <div className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">{m.label}</div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-5 flex items-center justify-between pt-2">
            <div className="flex flex-wrap gap-1.5">
              {project.tools.split(",").slice(0, 3).map((t) => (
                <span key={t} className="rounded-md bg-white/5 px-2 py-1 text-[11px] text-muted-foreground">
                  {t.trim()}
                </span>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {project.socialUrl && (
                <a
                  href={project.socialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all hover:border-blue-400 hover:bg-blue-500/20 hover:text-white"
                  aria-label={socialIsFb ? `${project.title} on Facebook` : `${project.title} on Instagram`}
                >
                  {socialIsFb ? <Facebook className="h-4 w-4" /> : <Instagram className="h-4 w-4" />}
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all hover:border-emerald-400 hover:bg-emerald-500/20 hover:text-white"
                  aria-label={`Visit live site: ${hostnameOf(project.liveUrl)}`}
                  title={`Visit ${hostnameOf(project.liveUrl)}`}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              <Link
                to={`/project/${project.slug}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-all group-hover:border-violet-400 group-hover:bg-violet-500 group-hover:shadow-[0_0_24px_-4px_rgba(139,92,246,0.8)]"
                aria-label={`View project: ${project.title}`}
              >
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ---------- CTA banner ---------- */
export function CTABanner({
  title = "Let's build something amazing.",
  sub = "Tell me about your project — I'll reply within 24 hours with ideas, not a sales pitch.",
}: {
  title?: string;
  sub?: string;
}) {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:py-28 lg:px-8">
      <Reveal>
        <div className="ring-gradient relative overflow-hidden rounded-[2rem] bg-navy-800/60 px-6 py-14 text-center md:px-16 md:py-20 noise">
          <div className="pointer-events-none absolute inset-0 bg-aurora" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[640px] -translate-x-1/2 rounded-full bg-violet-600/25 blur-[120px]"
            aria-hidden="true"
          />
          <div className="relative">
            <p className="eyebrow">Ready when you are</p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-white md:text-5xl">
              {title.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="text-gradient">{title.split(" ").slice(-2).join(" ")}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{sub}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_40px_-10px_rgba(139,92,246,0.7)] transition-all hover:shadow-[0_12px_48px_-8px_rgba(139,92,246,0.9)] hover:brightness-110"
              >
                Start a Project <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-[15px] font-semibold text-white transition-all hover:border-white/30 hover:bg-white/10"
              >
                See the Work
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
