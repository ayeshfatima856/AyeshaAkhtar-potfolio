"use client";

import { useMemo, useState } from "react";
import { PageHero, ProjectCard } from "./blocks";
import { Reveal } from "./reveal";
import { useApi } from "@/lib/hooks";
import type { Project, Category } from "@/lib/types";
import { Search, SlidersHorizontal, SearchX } from "lucide-react";
import { CTABanner } from "./blocks";

export default function Portfolio() {
  const { data, loading } = useApi<{ projects: Project[] }>("/api/projects");
  const { data: catData } = useApi<{ categories: Category[] }>("/api/categories");
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [liveOnly, setLiveOnly] = useState(false);

  const projects = data?.projects || [];
  const categories = catData?.categories || [];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (liveOnly && !p.liveUrl) return false;
      const matchesCat = cat === "all" || p.category === cat;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tools.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [projects, query, cat, liveOnly]);

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Work that speaks in"
        highlight="results"
        sub="24 projects — real client websites with live links plus premium concept builds, across web development, marketing and design. Watch each site scroll inside its card."
      />

      <section className="mx-auto max-w-7xl px-5 pb-8 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* search */}
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, tools…"
                aria-label="Search projects"
                className="w-full rounded-full border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white placeholder:text-muted-foreground/60 outline-none backdrop-blur transition-all focus:border-violet-400/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-violet-500/20"
              />
            </div>

            {/* category chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scroll-thin" role="tablist" aria-label="Filter by category">
              <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <FilterChip active={cat === "all"} onClick={() => setCat("all")} label="All" count={projects.length} />
              <FilterChip active={liveOnly} onClick={() => setLiveOnly(!liveOnly)} label="Live Sites" color="#10B981" count={projects.filter((p) => p.liveUrl).length} />
              {categories.map((c) => (
                <FilterChip
                  key={c.id}
                  active={cat === c.name}
                  onClick={() => setCat(c.name)}
                  label={c.name}
                  color={c.color}
                  count={projects.filter((p) => p.category === c.name).length}
                />
              ))}
            </div>
          </div>
        </Reveal>

        {/* results */}
        {loading ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="shimmer-line h-96 rounded-2xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <Reveal className="mt-16">
            <div className="mx-auto flex max-w-sm flex-col items-center rounded-3xl border border-dashed border-white/15 p-10 text-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-muted-foreground">
                <SearchX className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-white">No projects found</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Try a different keyword or category — or clear the filters.
              </p>
              <button
                onClick={() => { setQuery(""); setCat("all"); setLiveOnly(false); }}
                className="mt-5 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:border-violet-400/60 hover:bg-violet-500/10"
              >
                Clear filters
              </button>
            </div>
          </Reveal>
        ) : (
          <>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground" aria-live="polite">
              {filtered.length} project{filtered.length !== 1 ? "s" : ""} {cat !== "all" && `in ${cat}`} {query && `matching “${query}”`}
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          </>
        )}
      </section>

      <CTABanner
        title="Your project could be next."
        sub="Bring me an idea — I'll bring the design, the code and the marketing plan."
      />
    </>
  );
}

function FilterChip({
  active, onClick, label, count, color,
}: {
  active: boolean; onClick: () => void; label: string; count: number; color?: string;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-semibold transition-all ${
        active
          ? "border-transparent text-white shadow-lg"
          : "border-white/10 bg-white/[0.04] text-muted-foreground hover:border-white/25 hover:text-white"
      }`}
      style={active ? { background: `linear-gradient(90deg, ${color || "#8B5CF6"}, #4F7CFF)` } : undefined}
    >
      {label}
      <span className={`ml-1.5 font-mono text-[10px] ${active ? "text-white/80" : "text-muted-foreground/70"}`}>
        {count}
      </span>
    </button>
  );
}
