 
"use client";

import { PageHero, CTABanner } from "./blocks";
import { Reveal, SectionHead } from "./reveal";
import { Link } from "@/lib/router";
import { useApi } from "@/lib/hooks";
import type { BlogPost } from "@/lib/types";
import { ArrowUpRight, Clock, Tag } from "lucide-react";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function Blog() {
  const { data, loading } = useApi<{ posts: BlogPost[] }>("/api/blog");
  const posts = data?.posts || [];
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Blog & insights"
        title="Notes from the"
        highlight="build & growth trenches"
        sub="Practical playbooks on web development, conversion, SEO and paid media — written from projects, not theory."
      />

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        {loading ? (
          <div className="space-y-6">
            <div className="shimmer-line h-[380px] rounded-3xl" />
            <div className="grid gap-6 md:grid-cols-2">
              <div className="shimmer-line h-64 rounded-3xl" />
              <div className="shimmer-line h-64 rounded-3xl" />
            </div>
          </div>
        ) : !posts.length ? (
          <div className="mx-auto max-w-md rounded-3xl border border-dashed border-white/15 p-10 text-center">
            <h2 className="font-display text-xl font-bold text-white">No posts yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">Insights are being written — check back soon.</p>
          </div>
        ) : (
          <>
            {/* featured */}
            <Reveal>
              <Link to={`/blog/${featured.slug}`} className="group block">
                <article className="relative overflow-hidden rounded-[2rem] border border-white/10">
                  <div className="relative aspect-[21/9] w-full overflow-hidden">
                    <img
                      src={featured.cover || "/images/site/og-banner.png"}
                      alt={featured.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05081A] via-[#05081A]/45 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
                    <span className="rounded-full bg-violet-500/25 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-violet-200 backdrop-blur">
                      Latest insight
                    </span>
                    <h2 className="mt-4 max-w-3xl font-display text-2xl font-bold leading-tight text-white md:text-4xl">
                      {featured.title}
                    </h2>
                    <p className="mt-3 hidden max-w-2xl text-muted-foreground md:block">{featured.excerpt}</p>
                    <p className="mt-4 flex items-center gap-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      <span>{formatDate(featured.createdAt)}</span>
                      <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {featured.readTime} min read</span>
                    </p>
                  </div>
                </article>
              </Link>
            </Reveal>

            {/* grid */}
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {rest.map((p, i) => (
                <Reveal key={p.id} delay={(i % 2) * 0.08} className="h-full">
                  <Link to={`/blog/${p.slug}`} className="group block h-full">
                    <article className="card-hover flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                      <div className="relative aspect-[16/8] overflow-hidden">
                        <img
                          src={p.cover || "/images/site/og-banner.png"}
                          alt={p.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <p className="flex items-center gap-4 font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
                          <span>{formatDate(p.createdAt)}</span>
                          <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {p.readTime} min</span>
                        </p>
                        <h3 className="mt-3 font-display text-xl font-bold leading-snug text-white transition-colors group-hover:text-violet-300">
                          {p.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                        <div className="mt-auto flex items-center justify-between pt-5">
                          <div className="flex flex-wrap gap-1.5">
                            {p.tags.split(",").filter(Boolean).slice(0, 3).map((t) => (
                              <span key={t} className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-[11px] text-muted-foreground">
                                <Tag className="h-2.5 w-2.5" /> {t.trim()}
                              </span>
                            ))}
                          </div>
                          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-all group-hover:border-violet-400 group-hover:bg-violet-500">
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </section>

      <CTABanner
        title="Prefer doing over reading?"
        sub="Skip the theory — let's apply it to your website and campaigns right away."
      />
    </>
  );
}
