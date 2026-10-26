"use client";

import { useEffect, useState } from "react";
import {
  Facebook, Instagram, Globe, ArrowUpRight, X, ExternalLink,
  LayoutTemplate, Megaphone, Star, Image as ImageIcon,
} from "lucide-react";
import {
  Reveal, SectionHead, useBrands, useLightbox, safeArr, BrandLogo, Spinner,
} from "./shared";
import type { BrandData } from "./data";

/* AI-generated sample visuals — flagged so nothing is passed off as client work */
const SAMPLE_VISUALS = new Set([
  "/images/gen/realestate-ad.png",
  "/images/gen/fashion-drop.png",
  "/images/gen/food-biryani.png",
  "/images/cv/automotive-post.png",
  "/images/cv/print-products.png",
  "/images/cv/travel-visa.png",
]);

export function Brands() {
  const { brands, loading } = useBrands();
  const [selected, setSelected] = useState<BrandData | null>(null);

  const clients = brands.filter((b) => !b.isOwnBrand && b.showInSocial);
  const orvexa = brands.find((b) => b.isOwnBrand) ?? null;

  return (
    <section id="brands" className="relative bg-cloud py-24 lg:py-32" aria-label="Brands I've worked with">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          eyebrow="Social Media Management · Client Portfolio"
          title={
            <>
              Brands I&apos;ve <span className="text-gradient-navy">Worked With</span>
            </>
          }
          sub="Social media management and digital creative work across different industries."
        />

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner className="text-iris" />
          </div>
        ) : (
          <div className="mt-14 space-y-8">
            {clients.map((b, i) => (
              <Reveal key={b.id} delay={Math.min(i * 0.05, 0.2)}>
                <BrandCard brand={b} onOpen={() => setSelected(b)} />
              </Reveal>
            ))}
          </div>
        )}

        {/* Orvexa — own brand showcase (NOT a client) */}
        {orvexa && (
          <Reveal className="mt-16">
            <OrvexaBand brand={orvexa} onOpen={() => setSelected(orvexa)} />
          </Reveal>
        )}
      </div>

      {selected && <CaseModal brand={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

/* ================= external link buttons ================= */

function LinkButtons({ brand, dark = false }: { brand: BrandData; dark?: boolean }) {
  const base = dark
    ? "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12px] font-semibold transition hover:-translate-y-0.5"
    : "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12px] font-semibold transition hover:-translate-y-0.5";
  const darkCls = "border-white/20 bg-white/8 text-white hover:bg-white/15";
  const lightCls = "border-ink/12 bg-white text-deep hover:border-iris/50 hover:text-iris";

  return (
    <div className="flex flex-wrap gap-2">
      {brand.facebookUrl && (
        <a href={brand.facebookUrl} target="_blank" rel="noopener noreferrer" className={`${base} ${dark ? darkCls : lightCls}`} aria-label={`${brand.name} on Facebook`}>
          <Facebook className="h-3.5 w-3.5" /> Facebook
        </a>
      )}
      {brand.instagramUrl && (
        <a href={brand.instagramUrl} target="_blank" rel="noopener noreferrer" className={`${base} ${dark ? darkCls : lightCls}`} aria-label={`${brand.name} on Instagram`}>
          <Instagram className="h-3.5 w-3.5" /> Instagram
        </a>
      )}
      {brand.websiteUrl && (
        <a href={brand.websiteUrl} target="_blank" rel="noopener noreferrer" className={`${base} ${dark ? darkCls : lightCls}`} aria-label={`${brand.name} website`}>
          <Globe className="h-3.5 w-3.5" /> Website
        </a>
      )}
    </div>
  );
}

function ScopeBadge({ brand, dark = false }: { brand: BrandData; dark?: boolean }) {
  const isWeb = brand.showInWebsites && !brand.showInSocial;
  const both = brand.showInWebsites && brand.showInSocial;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em] ${
        dark ? "bg-white/10 text-white" : both ? "bg-iris-soft text-iris-deep" : "bg-lime-soft text-[#4a7a12]"
      }`}
    >
      <LayoutTemplate className="h-3 w-3" aria-hidden="true" />
      {both ? "Social + Website" : isWeb ? "Website Work" : "Social Media Work"}
    </span>
  );
}

function SampleTag({ src }: { src: string }) {
  if (!SAMPLE_VISUALS.has(src)) return null;
  return (
    <span className="absolute bottom-2 left-2 rounded-full bg-ink/75 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur">
      Sample visual
    </span>
  );
}

/* ================= browser / phone frames ================= */

function BrowserFrame({ src, alt, onClick }: { src: string; alt: string; onClick?: () => void }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-lg">
      <div className="flex items-center gap-1.5 border-b border-ink/8 bg-cloud px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2.5 hidden truncate rounded-md bg-white px-2.5 py-0.5 text-[10.5px] text-slateink sm:block">
          {alt}
        </span>
      </div>
      <button onClick={onClick} className="block w-full cursor-zoom-in" aria-label={`View ${alt} larger`}>
        { }
        <img src={src} alt={alt} className="h-56 w-full object-cover object-top sm:h-64" loading="lazy" />
      </button>
    </div>
  );
}

/* ================= per-layout cards ================= */

function CaseBtn({ onOpen, dark = false }: { onOpen: () => void; dark?: boolean }) {
  return (
    <button
      onClick={onOpen}
      className={`inline-flex items-center gap-1.5 rounded-full px-4.5 py-2.5 text-[12.5px] font-bold transition hover:-translate-y-0.5 ${
        dark ? "bg-lime-pop text-ink hover:shadow-lg hover:shadow-lime-pop/30" : "bg-iris text-white shadow-iris/30 hover:shadow-lg"
      }`}
    >
      View case study <ArrowUpRight className="h-3.5 w-3.5" />
    </button>
  );
}

function BrandCard({ brand, onOpen }: { brand: BrandData; onOpen: () => void }) {
  const images = safeArr(brand.images);
  const dark = brand.layout === "mockup" && brand.id === "bundu-khan"; // one dark card for rhythm

  if (brand.layout === "banner") {
    return (
      <article className={`card-light overflow-hidden rounded-3xl ${dark ? "bg-ink text-white" : ""}`}>
        <div className="grid lg:grid-cols-[0.9fr_1.35fr]">
          <div className={`flex flex-col justify-center gap-4 p-7 sm:p-9 ${dark ? "" : ""}`}>
            <div className="flex items-center gap-3.5">
              <BrandLogo name={brand.name} logoUrl={brand.logoUrl} accent={brand.accent} size="lg" />
              <div>
                <h3 className={`font-display text-xl font-bold ${dark ? "text-white" : "text-ink"}`}>{brand.name}</h3>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ color: brand.accent }}>
                  {brand.industry}
                </p>
              </div>
            </div>
            <ScopeBadge brand={brand} dark={dark} />
            <p className={`text-[14px] leading-relaxed ${dark ? "text-mist" : "text-slateink"}`}>{brand.description}</p>
            <div className="flex flex-wrap items-center gap-3">
              <CaseBtn onOpen={onOpen} dark={dark} />
              <LinkButtons brand={brand} dark={dark} />
            </div>
          </div>
          <div className={`relative p-4 sm:p-6 ${dark ? "" : "bg-gradient-to-br from-cloud to-white"}`}>
            {images[0] ? (
              <button onClick={onOpen} className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-ink/8 shadow-md">
                { }
                <img src={images[0]} alt={`${brand.name} — campaign showcase`} className="h-64 w-full object-cover object-top transition duration-700 group-hover:scale-[1.03] sm:h-72" loading="lazy" />
                <SampleTag src={images[0]} />
              </button>
            ) : (
              <PlaceholderTile label={brand.name} accent={brand.accent} />
            )}
          </div>
        </div>
      </article>
    );
  }

  if (brand.layout === "profile") {
    return (
      <article className="card-light overflow-hidden rounded-3xl">
        <div className="grid md:grid-cols-[1fr_1.1fr]">
          <div className="relative flex flex-col justify-center gap-4 p-7 sm:p-9">
            {/* profile-header style block */}
            <div className="flex items-center gap-4">
              <span className="relative">
                <BrandLogo name={brand.name} logoUrl={brand.logoUrl} accent={brand.accent} size="lg" />
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-lime-pop" aria-hidden="true">
                  <Star className="h-2.5 w-2.5 text-[#3f5c10]" />
                </span>
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-ink">{brand.name}</h3>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ color: brand.accent }}>
                  {brand.industry}
                </p>
              </div>
            </div>
            <ScopeBadge brand={brand} />
            <p className="text-[14px] leading-relaxed text-slateink">{brand.description}</p>
            <div className="flex flex-wrap items-center gap-3">
              <CaseBtn onOpen={onOpen} />
              <LinkButtons brand={brand} />
            </div>
          </div>
          <div className="relative bg-gradient-to-tr from-iris-soft/70 to-cloud p-6 sm:p-8">
            {images[0] ? (
              <button onClick={onOpen} className="group relative block cursor-zoom-in overflow-hidden rounded-2xl border border-ink/8 shadow-md">
                { }
                <img src={images[0]} alt={`${brand.name} — creative sample`} className="h-60 w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]" loading="lazy" />
                <SampleTag src={images[0]} />
              </button>
            ) : (
              <PlaceholderTile label={brand.name} accent={brand.accent} />
            )}
            {images[1] && (
              <button onClick={onOpen} className="group relative mt-4 block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-ink/8 shadow-sm">
                { }
                <img src={images[1]} alt={`${brand.name} — additional work`} className="h-32 w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]" loading="lazy" />
                <SampleTag src={images[1]} />
              </button>
            )}
          </div>
        </div>
      </article>
    );
  }

  if (brand.layout === "collage") {
    return (
      <article className="card-light overflow-hidden rounded-3xl">
        <div className="grid md:grid-cols-[1.15fr_0.85fr]">
          <div className="p-7 sm:p-9">
            <div className="flex items-center gap-3.5">
              <BrandLogo name={brand.name} logoUrl={brand.logoUrl} accent={brand.accent} size="lg" />
              <div>
                <h3 className="font-display text-xl font-bold text-ink">{brand.name}</h3>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ color: brand.accent }}>
                  {brand.industry}
                </p>
              </div>
            </div>
            <div className="mt-4"><ScopeBadge brand={brand} /></div>
            <p className="mt-4 text-[14px] leading-relaxed text-slateink">{brand.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <CaseBtn onOpen={onOpen} />
              <LinkButtons brand={brand} />
            </div>
          </div>
          {/* editorial collage */}
          <div className="grid grid-cols-2 gap-3 bg-gradient-to-bl from-iris-soft/60 to-cloud p-6">
            {images[0] ? (
              <button onClick={onOpen} className="group relative col-span-2 cursor-zoom-in overflow-hidden rounded-2xl border border-ink/8 shadow-md">
                { }
                <img src={images[0]} alt={`${brand.name} — fashion creative`} className="h-44 w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]" loading="lazy" />
                <SampleTag src={images[0]} />
              </button>
            ) : (
              <PlaceholderTile label={brand.name} accent={brand.accent} />
            )}
            <div
              className="flex h-20 items-center justify-center rounded-2xl font-display text-sm font-bold tracking-[0.2em] text-white"
              style={{ background: `linear-gradient(135deg, ${brand.accent}, ${brand.accent}99)` }}
              aria-hidden="true"
            >
              {brand.name.toUpperCase()}
            </div>
            <div className="flex h-20 items-center justify-center rounded-2xl bg-ink text-lime-pop" aria-hidden="true">
              <Megaphone className="h-6 w-6" />
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (brand.layout === "editorial") {
    return (
      <article className="card-light overflow-hidden rounded-3xl">
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col justify-center gap-4 p-7 sm:p-9">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: brand.accent }}>
              {brand.industry}
            </p>
            <h3 className="font-display text-2xl font-bold leading-tight text-ink sm:text-[1.7rem]">{brand.name}</h3>
            <ScopeBadge brand={brand} />
            <p className="text-[14px] leading-relaxed text-slateink">{brand.description}</p>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <CaseBtn onOpen={onOpen} />
              <LinkButtons brand={brand} />
            </div>
          </div>
          <div className="relative flex items-center justify-center overflow-hidden p-6 sm:p-8" style={{ background: `linear-gradient(160deg, ${brand.accent}14, transparent 60%)` }}>
            {images[0] ? (
              <button onClick={onOpen} className="group relative cursor-zoom-in overflow-hidden rounded-2xl border border-ink/8 shadow-lg">
                { }
                <img src={images[0]} alt={`${brand.name} — campaign creative`} className="h-64 w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]" loading="lazy" />
                <SampleTag src={images[0]} />
              </button>
            ) : (
              <PlaceholderTile label={brand.name} accent={brand.accent} />
            )}
          </div>
        </div>
      </article>
    );
  }

  /* mockup — website/browser or social phone frame */
  const isWebCard = brand.showInWebsites && !brand.showInSocial;
  return (
    <article
      className={`overflow-hidden rounded-3xl border transition-all duration-500 hover:-translate-y-1 ${
        dark ? "border-white/10 bg-ink shadow-2xl" : "card-light"
      }`}
    >
      <div className="grid md:grid-cols-[1.1fr_0.9fr]">
        <div className={`p-6 sm:p-8 ${dark ? "" : "bg-gradient-to-br from-cloud to-white"}`}>
          {images[0] ? (
            isWebCard ? (
              <BrowserFrame src={images[0]} alt={brand.websiteUrl?.replace(/^https?:\/\//, "") || brand.name} onClick={onOpen} />
            ) : (
              <button onClick={onOpen} className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[1.75rem] border-[6px] border-ink bg-ink shadow-xl">
                <span className="absolute left-1/2 top-2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/25" aria-hidden="true" />
                { }
                <img src={images[0]} alt={`${brand.name} — social creative`} className="h-72 w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]" loading="lazy" />
                <SampleTag src={images[0]} />
              </button>
            )
          ) : (
            <PlaceholderTile label={brand.name} accent={brand.accent} />
          )}
        </div>
        <div className={`flex flex-col justify-center gap-4 p-7 sm:p-9 ${dark ? "text-white" : ""}`}>
          <div className="flex items-center gap-3.5">
            <BrandLogo name={brand.name} logoUrl={brand.logoUrl} accent={brand.accent} size="lg" />
            <div>
              <h3 className={`font-display text-xl font-bold ${dark ? "text-white" : "text-ink"}`}>{brand.name}</h3>
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ color: dark ? "#B8F34A" : brand.accent }}>
                {brand.industry}
              </p>
            </div>
          </div>
          <ScopeBadge brand={brand} dark={dark} />
          <p className={`text-[14px] leading-relaxed ${dark ? "text-mist" : "text-slateink"}`}>{brand.description}</p>
          <div className="flex flex-wrap items-center gap-3">
            <CaseBtn onOpen={onOpen} dark={dark} />
            <LinkButtons brand={brand} dark={dark} />
          </div>
        </div>
      </div>
    </article>
  );
}

function PlaceholderTile({ label, accent }: { label: string; accent: string }) {
  return (
    <div
      className="flex h-56 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed text-center"
      style={{ borderColor: `${accent}55`, background: `${accent}0d` }}
    >
      <ImageIcon className="h-7 w-7" style={{ color: accent }} aria-hidden="true" />
      <p className="px-6 text-[12.5px] font-medium text-slateink">
        {label} visuals — upload via Admin → Brands
      </p>
    </div>
  );
}

/* ================= Orvexa — own brand band ================= */

function OrvexaBand({ brand, onOpen }: { brand: BrandData; onOpen: () => void }) {
  const images = safeArr(brand.images);
  const { open } = useLightbox();

  return (
    <article className="bg-iris-band relative overflow-hidden rounded-[2rem] p-7 shadow-2xl shadow-iris/30 sm:p-10 lg:p-12" aria-label="Orvexa Marketing — own brand">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" aria-hidden="true" />
      <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-lime-pop px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink">
            <Star className="h-3 w-3" aria-hidden="true" /> My Own Brand — not a client
          </span>
          <div className="mt-5 flex items-center gap-4">
            {/* editable logo area: admin-uploaded logo or styled monogram */}
            {brand.logoUrl && brand.logoUrl !== "null" ? (
               
              <img src={brand.logoUrl} alt="Orvexa Marketing logo" className="h-16 w-16 rounded-2xl bg-white object-contain p-1.5 shadow-lg" />
            ) : (
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white font-display text-2xl font-bold text-iris shadow-lg" aria-label="Orvexa Marketing logo area">
                O
              </span>
            )}
            <div>
              <h3 className="font-display text-3xl font-bold text-white sm:text-4xl">{brand.name}</h3>
              <p className="mt-1 text-[13px] font-medium text-white/80">{brand.industry}</p>
            </div>
          </div>

          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/90">{brand.description}</p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-1.5 text-[12px] font-semibold text-white">
            <LayoutTemplate className="h-3.5 w-3.5" aria-hidden="true" /> {brand.scope}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href={brand.facebookUrl || "#"} target="_blank" rel="noopener noreferrer" className="btn-lime px-5 py-2.5 text-[13px]" aria-label="Orvexa Marketing on Facebook">
              <Facebook className="h-4 w-4" /> Facebook
            </a>
            <a href={brand.instagramUrl || "#"} target="_blank" rel="noopener noreferrer" className="btn-outline-light px-5 py-2.5 text-[13px]" aria-label="Orvexa Marketing on Instagram">
              <Instagram className="h-4 w-4" /> Instagram
            </a>
            <button onClick={onOpen} className="btn-outline-light px-5 py-2.5 text-[13px]">
              Brand story <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* identity gallery */}
        <div className="grid grid-cols-2 gap-3.5">
          {images.slice(0, 3).map((src, i) => (
            <button
              key={src}
              onClick={() => open(images.map((im) => ({ src, title: `${brand.name} — brand design` })), i)}
              className={`group relative cursor-zoom-in overflow-hidden rounded-2xl border border-white/20 shadow-xl ${i === 0 ? "col-span-2 h-44" : "h-36"}`}
              aria-label={`View ${brand.name} design ${i + 1}`}
            >
              { }
              <img src={src} alt={`${brand.name} brand design ${i + 1}`} className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
              <span className="absolute inset-0 bg-iris/0 transition group-hover:bg-iris/15" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ================= case study modal ================= */

function CaseModal({ brand, onClose }: { brand: BrandData; onClose: () => void }) {
  const images = safeArr(brand.images);
  const { open } = useLightbox();

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
      className="fixed inset-0 z-[90] flex items-end justify-center bg-ink/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${brand.name} case study`}
      onClick={onClose}
    >
      <div
        className="scroll-thin relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink/8 bg-white/95 px-6 py-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <BrandLogo name={brand.name} logoUrl={brand.logoUrl} accent={brand.accent} />
            <div>
              <h3 className="font-display text-lg font-bold text-ink">{brand.name}</h3>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: brand.accent }}>
                {brand.industry}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full bg-cloud p-2 text-deep transition hover:bg-iris-soft hover:text-iris" aria-label="Close case study">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-7 sm:px-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <ScopeBadge brand={brand} />
            {brand.role && (
              <span className="chip-ink">
                <ExternalLink className="h-3 w-3" aria-hidden="true" /> Role: {brand.role}
              </span>
            )}
          </div>

          <p className="mt-5 text-[15px] leading-relaxed text-slateink">{brand.description}</p>

          {brand.objectives && (
            <div className="mt-6 rounded-2xl bg-cloud p-5">
              <h4 className="font-display text-[13px] font-bold uppercase tracking-[0.16em] text-iris">Objectives</h4>
              <p className="mt-2 text-[14px] leading-relaxed text-deep">{brand.objectives}</p>
            </div>
          )}

          {brand.creativeDirection && (
            <div className="mt-4 rounded-2xl border border-iris/15 bg-iris-soft/50 p-5">
              <h4 className="font-display text-[13px] font-bold uppercase tracking-[0.16em] text-iris">Creative direction</h4>
              <p className="mt-2 text-[14px] leading-relaxed text-deep">{brand.creativeDirection}</p>
            </div>
          )}

          {/* scope distinction */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-ink/10 p-4">
              <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-ink">
                <Megaphone className="h-3.5 w-3.5 text-iris" aria-hidden="true" /> Social media management
              </p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-slateink">
                {brand.showInSocial
                  ? "Page content, creative production and campaign support for this brand's social presence."
                  : "No social media management entry for this brand — website work only."}
              </p>
            </div>
            <div className="rounded-2xl border border-ink/10 p-4">
              <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-ink">
                <LayoutTemplate className="h-3.5 w-3.5 text-iris" aria-hidden="true" /> Website work
              </p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-slateink">
                {brand.showInWebsites
                  ? "Website project entry — also shown in the Websites & Digital Experiences section."
                  : "No website project entry for this brand — social media work only."}
              </p>
            </div>
          </div>

          {/* gallery */}
          {images.length > 0 && (
            <div className="mt-7">
              <h4 className="font-display text-[13px] font-bold uppercase tracking-[0.16em] text-ink">Project gallery</h4>
              <div className="mt-3.5 grid grid-cols-2 gap-3">
                {images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => open(images.map((im) => ({ src: im, title: `${brand.name} — project visual` })), i)}
                    className="group relative cursor-zoom-in overflow-hidden rounded-xl border border-ink/8"
                    aria-label={`View image ${i + 1} of ${brand.name}`}
                  >
                    { }
                    <img src={src} alt={`${brand.name} project visual ${i + 1}`} className="h-40 w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" loading="lazy" />
                    <SampleTag src={src} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* links */}
          <div className="mt-7 border-t border-ink/8 pt-6">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.16em] text-ink">Visit the brand</p>
            <LinkButtons brand={brand} />
          </div>
        </div>
      </div>
    </div>
  );
}
