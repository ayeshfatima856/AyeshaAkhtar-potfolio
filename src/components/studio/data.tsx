"use client";

import {
  createContext, useContext, useEffect, useState, type ReactNode,
} from "react";
import type { Brand, GalleryItem, Profile, Project } from "@/lib/types";

type SiteData = {
  profile: Profile | null;
  brands: Brand[];
  projects: Project[];
  gallery: GalleryItem[];
};

const SiteCtx = createContext<SiteData | null>(null);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/site", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((d: SiteData) => {
        if (alive) setData(d);
      })
      .catch(() => {
        if (alive) setFailed(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  if (failed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="font-display text-xl font-bold text-navy">Something went wrong</p>
        <p className="max-w-sm text-sm text-[#5b6779]">
          The site could not load its content. Please refresh the page in a moment.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 rounded-full bg-elec px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-elec-2"
        >
          Refresh
        </button>
      </div>
    );
  }

  if (!data) return <SiteSkeleton />;

  return <SiteCtx.Provider value={data}>{children}</SiteCtx.Provider>;
}

export function useSite(): SiteData {
  const ctx = useContext(SiteCtx);
  if (!ctx) throw new Error("useSite must be used inside SiteDataProvider");
  return ctx;
}

function SiteSkeleton() {
  return (
    <div className="min-h-screen bg-cloud" aria-label="Loading">
      <div className="mx-auto max-w-6xl px-5 pt-28">
        <div className="shimmer-line h-4 w-40 rounded-full" />
        <div className="mt-6 shimmer-line h-12 w-3/4 rounded-2xl" />
        <div className="mt-3 shimmer-line h-12 w-1/2 rounded-2xl" />
        <div className="mt-8 flex gap-3">
          <div className="shimmer-line h-12 w-44 rounded-full" />
          <div className="shimmer-line h-12 w-44 rounded-full" />
        </div>
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="shimmer-line h-40 rounded-3xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* smooth-scroll helper for in-page section navigation */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const navH = 76;
  const y = el.getBoundingClientRect().top + window.scrollY - navH;
  window.scrollTo({ top: y, behavior: "smooth" });
}
