"use client";

import {
  createContext, useCallback, useContext, useEffect, useRef, useState,
  type ReactNode,
} from "react";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import type { BrandData, GalleryData, ProfileData } from "./data";
import { DEFAULT_BRANDS, DEFAULT_GALLERY, DEFAULT_PROFILE } from "./data";

/* ---------------- smooth scroll (hash router safe) ---------------- */

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 76;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export function useScrollTo() {
  return useCallback((id: string) => scrollToId(id), []);
}

/* ---------------- reveal on scroll ---------------- */

export function Reveal({
  children, delay = 0, className = "", as: Tag = "div",
}: {
  children: ReactNode; delay?: number; className?: string; as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(28px)",
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}

/* ---------------- section heading ---------------- */

export function SectionHead({
  eyebrow, title, sub, dark = false, align = "center",
}: {
  eyebrow: string; title: ReactNode; sub?: string; dark?: boolean; align?: "center" | "left";
}) {
  return (
    <Reveal className={align === "center" ? "text-center" : "text-left"}>
      <p className={dark ? "eyebrow-lime" : "eyebrow-ink"}>{eyebrow}</p>
      <h2
        className={`mt-3 font-display text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`mt-4 max-w-2xl text-[15px] leading-relaxed sm:text-base ${dark ? "text-mist" : "text-slateink"} ${
          align === "center" ? "mx-auto" : ""
        }`}>
          {sub}
        </p>
      )}
    </Reveal>
  );
}

/* ---------------- live data hooks (admin edits reflect instantly) ---------------- */

export function useBrands(): { brands: BrandData[]; loading: boolean } {
  const [brands, setBrands] = useState<BrandData[]>(DEFAULT_BRANDS);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    fetch("/api/brands")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (!alive) return;
        if (d?.brands?.length) setBrands(normalizeBrands(d.brands));
      })
      .catch(() => {})
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);
  return { brands, loading };
}

export function useGallery(): { items: GalleryData[]; categories: string[]; loading: boolean } {
  const [items, setItems] = useState<GalleryData[]>(DEFAULT_GALLERY);
  const [categories, setCategories] = useState<string[]>([
    "All", "Social Media Posts", "Advertising Creatives", "Branding", "Product Designs",
    "Restaurant & Food", "Real Estate", "Fashion", "Website Design", "Other Creative Work",
  ]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    fetch("/api/gallery")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (!alive) return;
        if (d?.items?.length) {
          setItems(
            d.items.map((it: Record<string, unknown>) => ({
              id: String(it.id),
              title: String(it.title || ""),
              category: String(it.category || "Other Creative Work"),
              imageUrl: String(it.imageUrl),
              caption: (it.caption as string) || null,
              isSample: Boolean(it.isSample),
              sort: Number(it.sort || 0),
            }))
          );
        }
        if (d?.categories?.length) {
          const cats = d.categories as string[];
          setCategories(cats.includes("All") ? cats : ["All", ...cats.filter((c) => c !== "All Projects")]);
        }
      })
      .catch(() => {})
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);
  return { items, categories, loading };
}

export function useProfile(): ProfileData {
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  useEffect(() => {
    fetch("/api/profile")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        const p = d?.profile ?? d;
        if (p?.name) setProfile((old) => ({ ...old, ...p }));
      })
      .catch(() => {});
  }, []);
  return profile;
}

function cleanNullable(v: unknown): string | null {
  const s = v === null || v === undefined ? "" : String(v).trim();
  return s === "" || s === "null" ? null : s;
}

function normalizeBrands(rows: Record<string, unknown>[]): BrandData[] {
  return rows.map((b) => ({
    id: String(b.id),
    name: String(b.name),
    industry: String(b.industry || ""),
    logoUrl: cleanNullable(b.logoUrl),
    description: String(b.description || ""),
    facebookUrl: cleanNullable(b.facebookUrl),
    instagramUrl: cleanNullable(b.instagramUrl),
    websiteUrl: cleanNullable(b.websiteUrl),
    images: safeArr(b.images),
    layout: (b.layout as BrandData["layout"]) || "profile",
    accent: String(b.accent || "#5B5CF0"),
    isOwnBrand: Boolean(b.isOwnBrand),
    featured: Boolean(b.featured),
    showInSocial: b.showInSocial === undefined ? true : Boolean(b.showInSocial),
    showInWebsites: Boolean(b.showInWebsites),
    role: String(b.role || ""),
    scope: String(b.scope || ""),
    objectives: (b.objectives as string) || null,
    creativeDirection: (b.creativeDirection as string) || null,
    sort: Number(b.sort || 0),
  }));
}

export function safeArr(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String);
  if (typeof v === "string") {
    try {
      const parsed = JSON.parse(v);
      return Array.isArray(parsed) ? parsed.map(String) : [];
    } catch { return []; }
  }
  return [];
}

/* ---------------- lightbox ---------------- */

interface LbState {
  images: { src: string; title?: string }[];
  index: number;
}

const LbCtx = createContext<{ open: (images: { src: string; title?: string }[], index?: number) => void }>({
  open: () => {},
});

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LbState | null>(null);

  const open = useCallback((images: { src: string; title?: string }[], index = 0) => {
    setState({ images, index });
  }, []);

  const close = useCallback(() => setState(null), []);
  const step = useCallback((dir: 1 | -1) => {
    setState((s) => (s ? { ...s, index: (s.index + dir + s.images.length) % s.images.length } : s));
  }, []);

  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [state, close, step]);

  return (
    <LbCtx.Provider value={{ open }}>
      {children}
      {state && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={close}
        >
          <button
            aria-label="Close viewer"
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20"
            onClick={close}
          >
            <X className="h-5 w-5" />
          </button>
          {state.images.length > 1 && (
            <>
              <button
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20 sm:left-6"
                onClick={(e) => { e.stopPropagation(); step(-1); }}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20 sm:right-6"
                onClick={(e) => { e.stopPropagation(); step(1); }}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
          <figure className="flex max-h-full max-w-5xl flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex min-h-[50vh] items-center justify-center">
              { }
              <img
                src={state.images[state.index].src}
                alt={state.images[state.index].title || "Portfolio image"}
                className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-2xl"
              />
            </div>
            {state.images[state.index].title && (
              <figcaption className="text-center text-sm text-mist">
                {state.images[state.index].title}
                <span className="ml-2 text-mist/60">
                  {state.index + 1} / {state.images.length}
                </span>
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </LbCtx.Provider>
  );
}

export function useLightbox() {
  return useContext(LbCtx);
}

/* ---------------- small ui bits ---------------- */

export function Spinner({ className = "" }: { className?: string }) {
  return <Loader2 className={`h-5 w-5 animate-spin ${className}`} />;
}

export function BrandLogo({ name, logoUrl, accent, size = "md" }: {
  name: string; logoUrl?: string | null; accent: string; size?: "md" | "lg";
}) {
  const dim = size === "lg" ? "h-14 w-14 text-lg" : "h-11 w-11 text-sm";
  const validLogo = logoUrl && logoUrl !== "null" && logoUrl.trim() !== "" ? logoUrl : null;
  if (validLogo) {
    return <img src={validLogo} alt={`${name} logo`} className={`${dim} rounded-xl bg-white object-contain p-1`} />;
  }
  const initials = name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return (
    <span
      className={`${dim} flex shrink-0 items-center justify-center rounded-xl font-display font-bold text-white`}
      style={{ background: `linear-gradient(135deg, ${accent}, ${accent}bb)` }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
