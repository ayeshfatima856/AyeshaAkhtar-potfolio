"use client";

import { useMemo, useState } from "react";
import { ZoomIn, Sparkles } from "lucide-react";
import { Reveal, SectionHead, useGallery, useLightbox, Spinner } from "./shared";

export function Gallery() {
  const { items, categories, loading } = useGallery();
  const [active, setActive] = useState("All");
  const { open } = useLightbox();

  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((it) => it.category === active)),
    [items, active]
  );

  return (
    <section id="work" className="surface-light relative py-24 lg:py-32" aria-label="Creative work and design gallery">
      <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          eyebrow="Creative Work & Design Gallery"
          title={
            <>
              Designs across <span className="text-gradient-navy">every niche</span>
            </>
          }
          sub="Social media posts, advertising creatives, branding, product designs and more — filter by category and click any piece to view it full size."
        />

        {/* filter chips */}
        <Reveal delay={0.08}>
          <div className="mt-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Gallery categories">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={active === c}
                onClick={() => setActive(c)}
                className={`rounded-full px-4.5 py-2.5 text-[12.5px] font-semibold transition-all ${
                  active === c
                    ? "bg-iris text-white shadow-lg shadow-iris/30"
                    : "border border-ink/10 bg-white text-deep hover:border-iris/40 hover:text-iris"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        {/* masonry grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner className="text-iris" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="mt-14 text-center text-slateink">No pieces in this category yet — new work is added regularly.</p>
        ) : (
          <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            {filtered.map((it, i) => (
              <Reveal key={it.id} delay={Math.min(i * 0.04, 0.25)} className="break-inside-avoid">
                <button
                  onClick={() =>
                    open(
                      filtered.map((f) => ({ src: f.imageUrl, title: f.title })),
                      filtered.findIndex((f) => f.id === it.id)
                    )
                  }
                  className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-ink/8 bg-white text-left shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-iris/10"
                  aria-label={`View ${it.title} full size`}
                >
                  { }
                  <img
                    src={it.imageUrl}
                    alt={it.title}
                    className="w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" aria-hidden="true" />
                  <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="block font-display text-[14px] font-bold text-white">{it.title}</span>
                    <span className="mt-0.5 block text-[11.5px] text-mist">{it.category}</span>
                  </span>
                  <span className="absolute right-3 top-3 rounded-full bg-ink/70 p-2 text-white opacity-0 backdrop-blur transition duration-500 group-hover:opacity-100" aria-hidden="true">
                    <ZoomIn className="h-4 w-4" />
                  </span>
                  {it.isSample && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-deep backdrop-blur">
                      <Sparkles className="h-3 w-3 text-iris" aria-hidden="true" /> Sample
                    </span>
                  )}
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
