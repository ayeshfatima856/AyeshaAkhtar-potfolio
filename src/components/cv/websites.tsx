"use client";

import { useEffect, useState } from "react";
import { ExternalLink, X, ArrowUpRight, Globe, Facebook, Instagram, MonitorSmartphone } from "lucide-react";
import { Reveal, SectionHead, safeArr, Spinner } from "./shared";

interface WebProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  tagline: string;
  description: string;
  overview?: string | null;
  role: string;
  image: string;
  gallery?: string | null;
  liveUrl?: string | null;
  socialUrl?: string | null;
  objectives?: string | null;
  creativeDirection?: string | null;
}

export function Websites() {
  const [projects, setProjects] = useState<WebProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<WebProject | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/projects")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (!alive) return;
        const rows = (d?.projects ?? []) as Record<string, unknown>[];
        setProjects(
          rows
            .filter((p) => p.track === "web" && p.published !== false)
            .sort((a, b) => Number(a.sort ?? 0) - Number(b.sort ?? 0))
            .map((p) => ({
              id: String(p.id),
              title: String(p.title),
              slug: String(p.slug),
              category: String(p.category || "Website"),
              tagline: String(p.tagline || ""),
              description: String(p.description || ""),
              overview: (p.overview as string) || null,
              role: String(p.role || "Website Project"),
              image: String(p.image || ""),
              gallery: (p.gallery as string) || null,
              liveUrl: (p.liveUrl as string) || null,
              socialUrl: (p.socialUrl as string) || null,
              objectives: (p.objectives as string) || null,
              creativeDirection: (p.creativeDirection as string) || null,
            }))
        );
      })
      .catch(() => {})
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  return (
    <section id="websites" className="relative overflow-hidden bg-ink py-24 lg:py-32" aria-label="Websites and digital experiences">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -right-40 top-1/3 h-[420px] w-[420px] rounded-full bg-iris/20 blur-[130px]" />
        <div className="absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-lime-pop/8 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          dark
          eyebrow="Website Design Portfolio"
          title={
            <>
              Websites &amp; <span className="text-gradient-iris">Digital Experiences</span>
            </>
          }
          sub="A dedicated view for website work — featured case studies below, followed by the full showcase of live websites organized by industry. Social media work for the same brands lives in its own Marketing view."
        />

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner className="text-lime-pop" />
          </div>
        ) : projects.length === 0 ? (
          <p className="mt-10 text-center text-mist">Website projects are being prepared — check back soon.</p>
        ) : (
          <div className="mt-14 grid gap-7 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <WebsiteCard project={p} onOpen={() => setSelected(p)} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function WebsiteCard({ project, onOpen }: { project: WebProject; onOpen: () => void }) {
  const domain = project.liveUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "") || project.title;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-soft/70 shadow-xl backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-iris/40">
      {/* browser mockup with cinematic scroll */}
      <div className="relative border-b border-white/10">
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-3.5 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2.5 flex min-w-0 items-center gap-1.5 truncate rounded-md bg-white/8 px-2.5 py-0.5 text-[10.5px] text-mist">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lime-pop" aria-hidden="true" />
            <span className="truncate">{domain}</span>
          </span>
        </div>
        <button onClick={onOpen} className="block h-60 w-full cursor-zoom-in overflow-hidden" aria-label={`Open ${project.title} case study`}>
          {project.image ? (
             
            <img
              src={project.image}
              alt={`${project.title} — website preview`}
              className="site-scroll-img w-full object-cover object-top"
              style={{ "--scroll-end": "calc(-100% + 240px)", "--dur": "34s" } as React.CSSProperties}
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-mist">
              <MonitorSmartphone className="h-10 w-10" aria-hidden="true" />
            </div>
          )}
        </button>
        <span className="absolute left-3.5 top-12 rounded-full bg-lime-pop px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-ink">
          {project.role}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3.5 p-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-lime-pop">{project.category}</p>
          <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-white">{project.title}</h3>
        </div>
        <p className="line-clamp-3 flex-1 text-[13.5px] leading-relaxed text-mist">{project.description}</p>

        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-lime px-4.5 py-2.5 text-[12.5px]" aria-label={`Visit ${project.title} website`}>
              <Globe className="h-4 w-4" /> Visit Website
            </a>
          )}
          {project.socialUrl && (
            <a href={project.socialUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-light px-4 py-2.5 text-[12.5px]" aria-label={`${project.title} social page`}>
              <Facebook className="h-4 w-4" /> Page
            </a>
          )}
          <button onClick={onOpen} className="inline-flex items-center gap-1 text-[12.5px] font-bold text-white/85 transition hover:text-lime-pop" aria-label={`Case study for ${project.title}`}>
            Case study <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}

/* ---------------- project case modal ---------------- */

function ProjectModal({ project, onClose }: { project: WebProject; onClose: () => void }) {
  const gallery = safeArr(project.gallery);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-ink/85 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      onClick={onClose}
    >
      <div
        className="scroll-thin relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink/8 bg-white/95 px-6 py-4 backdrop-blur sm:px-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-iris">{project.category}</p>
            <h3 className="font-display text-lg font-bold text-ink">{project.title}</h3>
          </div>
          <button onClick={onClose} className="rounded-full bg-cloud p-2 text-deep transition hover:bg-iris-soft hover:text-iris" aria-label="Close case study">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-7 sm:px-8">
          <div className="flex flex-wrap gap-2.5">
            <span className="chip-ink">Role: {project.role}</span>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-iris px-4.5 py-2 text-[12.5px]">
                <Globe className="h-3.5 w-3.5" /> Visit Website
              </a>
            )}
            {project.socialUrl && (
              <a href={project.socialUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-iris px-4 py-2 text-[12.5px]">
                <Facebook className="h-3.5 w-3.5" /> Social page
              </a>
            )}
          </div>

          <p className="mt-5 text-[15px] leading-relaxed text-slateink">{project.description}</p>
          {project.overview && <p className="mt-4 text-[14.5px] leading-relaxed text-slateink">{project.overview}</p>}

          {project.objectives && (
            <div className="mt-6 rounded-2xl bg-cloud p-5">
              <h4 className="font-display text-[13px] font-bold uppercase tracking-[0.16em] text-iris">Objectives</h4>
              <p className="mt-2 text-[14px] leading-relaxed text-deep">{project.objectives}</p>
            </div>
          )}
          {project.creativeDirection && (
            <div className="mt-4 rounded-2xl border border-iris/15 bg-iris-soft/50 p-5">
              <h4 className="font-display text-[13px] font-bold uppercase tracking-[0.16em] text-iris">Creative direction</h4>
              <p className="mt-2 text-[14px] leading-relaxed text-deep">{project.creativeDirection}</p>
            </div>
          )}

          {gallery.length > 0 && (
            <div className="mt-7 grid grid-cols-2 gap-3">
              {gallery.map((src, i) => (
                 
                <img key={src} src={src} alt={`${project.title} visual ${i + 1}`} className="h-44 w-full rounded-xl border border-ink/8 object-cover object-top" loading="lazy" />
              ))}
            </div>
          )}

          <p className="mt-6 flex items-center gap-2 rounded-xl bg-lime-soft px-4 py-3 text-[12.5px] text-[#44660f]">
            <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
            The button above opens the live external website in a new tab — role details are editable in the admin panel.
          </p>
        </div>
      </div>
    </div>
  );
}
