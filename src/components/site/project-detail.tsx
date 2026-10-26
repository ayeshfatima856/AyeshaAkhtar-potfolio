 
"use client";

import { useEffect } from "react";
import { Link, navigate } from "@/lib/router";
import { useApi } from "@/lib/hooks";
import { parseMetrics, parseResults, type Project } from "@/lib/types";
import { Reveal } from "./reveal";
import { Counter, SitePreview, hostnameOf } from "./blocks";
import {
  ArrowLeft, ArrowRight, Info, Tag, Layers, Wrench, Target,
  Lightbulb, CheckCircle2, ExternalLink, Facebook, Instagram, Globe,
} from "lucide-react";

export default function ProjectDetail({ slug }: { slug: string }) {
  const { data, loading, error } = useApi<{ project: Project }>(`/api/projects/${slug}`);
  const { data: allData } = useApi<{ projects: Project[] }>("/api/projects");
  const project = data?.project;

  useEffect(() => {
    if (project) document.title = `${project.title} — ${project.tagline} | Ayesha Akhtar`;
    return () => { document.title = "Ayesha Akhtar — Web Developer & Digital Marketer"; };
  }, [project]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-5 pt-40 pb-24">
        <div className="shimmer-line h-[420px] rounded-3xl" />
        <div className="shimmer-line mt-6 h-8 w-2/3 rounded-xl" />
        <div className="shimmer-line mt-4 h-40 rounded-2xl" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-5 pt-48 pb-24 text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-2xl">🛰️</span>
        <h1 className="mt-5 font-display text-2xl font-bold text-white">Project not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This project may have been unpublished or renamed.
        </p>
        <Link
          to="/portfolio"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to portfolio
        </Link>
      </div>
    );
  }

  const metrics = parseMetrics(project.metrics);
  const results = parseResults(project.results);
  const tools = project.tools.split(",").map((t) => t.trim()).filter(Boolean);
  const isLiveCapture = project.image.startsWith("/images/live/");
  const socialIsFb = !!project.socialUrl && /facebook\.com/i.test(project.socialUrl);
  const others = (allData?.projects || []).filter((p) => p.id !== project.id);
  const next = others[(others.findIndex((p) => p.sort >= project.sort) + 1) % Math.max(1, others.length)] || others[0];

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden bg-navy-950 bg-grid pt-32 pb-10 md:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-aurora" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> All projects
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-violet-400/30 bg-violet-500/15 px-3.5 py-1.5 text-xs font-semibold text-violet-300">
                {project.category}
              </span>
              {project.liveUrl ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Live client project · {hostnameOf(project.liveUrl)}
                </span>
              ) : project.demo ? (
                <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-amber-300">
                  demo project · illustrative results
                </span>
              ) : null}
            </div>
            <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-white md:text-6xl">
              {project.title}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground md:text-xl">{project.tagline}</p>
          </Reveal>
        </div>
      </section>

      {/* cover — scrolling live preview or static image */}
      <section className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal>
          <div className="ring-gradient overflow-hidden rounded-[2rem] bg-navy-900/40">
            {isLiveCapture ? (
              <div className="p-3 sm:p-4">
                <SitePreview
                  src={project.image}
                  url={project.liveUrl || null}
                  alt={`${project.title} — full-page live preview`}
                  aspect="16 / 9"
                  rounded="rounded-2xl"
                />
              </div>
            ) : (
              <img
                src={project.image}
                alt={`${project.title} — project preview`}
                className="aspect-[16/9] w-full object-cover"
              />
            )}
          </div>
          {(project.liveUrl || project.socialUrl) && (
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_36px_-10px_rgba(16,185,129,0.7)] transition-all hover:brightness-110"
                >
                  <Globe className="h-4 w-4" />
                  Visit live website — {hostnameOf(project.liveUrl)}
                  <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
              {project.socialUrl && (
                <a
                  href={project.socialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all hover:border-blue-400/60 hover:bg-blue-500/10"
                >
                  {socialIsFb ? <Facebook className="h-4 w-4" /> : <Instagram className="h-4 w-4" />}
                  {socialIsFb ? "Facebook page" : "Instagram"}
                </a>
              )}
            </div>
          )}
        </Reveal>
      </section>

      {/* meta bar */}
      <section className="mx-auto max-w-6xl px-5 pt-8 lg:px-8">
        <Reveal>
          <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:grid-cols-3">
            <MetaItem icon={Layers} label="Category" value={project.category} />
            <MetaItem icon={Wrench} label="Tools & tech" value={tools.join(" · ")} />
            <MetaItem icon={Info} label="Type" value={project.liveUrl ? "Live client project" : project.demo ? "Demo / concept build" : "Client project"} />
          </div>
        </Reveal>
      </section>

      {/* metrics */}
      {metrics.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pt-10 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08}>
                <div className="card-hover rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/10 to-blue-600/5 p-7 text-center">
                  <div className="font-display text-4xl font-extrabold text-gradient md:text-5xl">
                    <Counter value={m.value} suffix={m.suffix} decimals={m.value % 1 !== 0 ? 1 : 0} />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
            {project.demo ? "* illustrative metrics from this demonstration project" : "* results delivered on the live client engagement"}
          </p>
        </section>
      )}

      {/* overview */}
      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <p className="eyebrow mb-3">Overview</p>
              <p className="text-lg leading-relaxed text-foreground/85">{project.description}</p>
              {project.overview && (
                <p className="mt-5 leading-relaxed text-muted-foreground">{project.overview}</p>
              )}
            </Reveal>

            {project.challenge && (
              <Reveal delay={0.1}>
                <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="flex items-center gap-2.5 font-display text-lg font-bold text-white">
                    <Target className="h-5 w-5 text-rose-300" /> The challenge
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-muted-foreground">{project.challenge}</p>
                </div>
              </Reveal>
            )}
            {project.solution && (
              <Reveal delay={0.14}>
                <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="flex items-center gap-2.5 font-display text-lg font-bold text-white">
                    <Lightbulb className="h-5 w-5 text-amber-300" /> The solution
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-muted-foreground">{project.solution}</p>
                </div>
              </Reveal>
            )}
          </div>

          {/* results sidebar */}
          <div>
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="flex items-center gap-2.5 font-display text-lg font-bold text-white">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" /> Key results
                </h3>
                <ul className="mt-4 space-y-4">
                  {results.map((r) => (
                    <li key={r.label} className="flex items-start justify-between gap-4 border-b border-white/8 pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="text-sm text-muted-foreground">{r.label}</p>
                        {r.hint && <p className="mt-0.5 text-xs text-muted-foreground/70">{r.hint}</p>}
                      </div>
                      <span className="shrink-0 font-display text-xl font-extrabold text-gradient">{r.value}</span>
                    </li>
                  ))}
                </ul>
                {project.demo && (
                  <p className="mt-4 rounded-xl bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-200/90">
                    <Info className="mr-1 inline h-3.5 w-3.5" />
                    Demonstration project — figures are illustrative, not from a real client engagement.
                  </p>
                )}
              </div>

              <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="flex items-center gap-2.5 font-display text-base font-bold text-white">
                  <Tag className="h-4.5 w-4.5 h-[18px] w-[18px] text-cyan-300" /> Tools used
                </h3>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {tools.map((t) => (
                    <span key={t} className="rounded-lg bg-white/6 px-3 py-1.5 font-mono text-xs text-foreground/80" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* next project */}
      {next && (
        <section className="mx-auto max-w-6xl px-5 pb-20 lg:px-8">
          <Reveal>
            <button
              onClick={() => navigate(`/project/${next.slug}`)}
              className="group flex w-full items-center justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-left transition-all hover:border-violet-400/40 hover:bg-violet-500/5 md:p-8"
            >
              <div className="flex items-center gap-5">
                <img
                  src={next.image}
                  alt=""
                  className="hidden h-20 w-32 rounded-2xl object-cover sm:block"
                  loading="lazy"
                />
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Next project</p>
                  <p className="mt-1 font-display text-xl font-bold text-white md:text-2xl">{next.title}</p>
                  <p className="text-sm text-muted-foreground">{next.tagline}</p>
                </div>
              </div>
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white transition-transform group-hover:scale-110">
                <ArrowRight className="h-5 w-5" />
              </span>
            </button>
          </Reveal>
        </section>
      )}
    </>
  );
}

function MetaItem({ icon: Icon, label, value }: { icon: typeof Layers; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3.5">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-violet-300">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm font-medium leading-snug text-foreground/90">{value}</p>
      </div>
    </div>
  );
}
