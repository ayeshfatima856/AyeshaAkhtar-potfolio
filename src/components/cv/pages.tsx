"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  Globe, Palette, TrendingUp, ArrowRight, ArrowUpRight,
  ChevronRight, MonitorSmartphone, Layers, MousePointerClick,
  Code2, MessageCircle, Sparkles,
} from "lucide-react";
import { useRoute, Link, navigate } from "@/lib/router";
import { LightboxProvider, Reveal, useProfile } from "./shared";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Hero } from "./hero";
import { About } from "./about";
import { Services } from "./services";
import { Brands } from "./brands";
import { Websites } from "./websites";
import { WebsiteShowcase } from "./showcase";
import { Marketing } from "./marketing";
import { Gallery } from "./gallery";
import { Process } from "./process";
import { Contact } from "./contact";

/* ============================================================
   Multi-view portfolio — each discipline gets its own page so
   nothing is crammed into one endless scroll:
     /            home (intro, services, explore-work tiles, process)
     /websites    featured website case studies + full industry showcase
     /graphics    creative design gallery (filters + lightbox)
     /marketing   brands managed (incl. own brand) + campaign results
     /contact     contact form only — no packages, no extras
   ============================================================ */

type PageKey = "home" | "websites" | "graphics" | "marketing" | "contact";

export function PublicApp() {
  const route = useRoute();
  const seg = route.split("?")[0].split("/").filter(Boolean)[0] ?? "";
  const page: PageKey =
    seg === "websites" ? "websites"
    : seg === "graphics" ? "graphics"
    : seg === "marketing" ? "marketing"
    : seg === "contact" ? "contact"
    : "home";

  return (
    <LightboxProvider>
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />
        <main key={page} className="page-fade flex-1">
          {page === "home" && <HomePage />}
          {page === "websites" && <WebsitesPage />}
          {page === "graphics" && <GraphicsPage />}
          {page === "marketing" && <MarketingPage />}
          {page === "contact" && <ContactPage />}
        </main>
        <Footer />
      </div>
    </LightboxProvider>
  );
}

/* ---------------- page hero band (compact breadcrumb header) ---------------- */

function PageHero({
  crumb, title, sub, visual,
}: {
  crumb: string; title: string; sub: string; visual?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pb-16 pt-32 lg:pb-24 lg:pt-40" aria-label={`${title} page header`}>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute -left-32 top-0 h-[360px] w-[360px] rounded-full bg-iris/25 blur-[130px]" />
        <div className="absolute -right-24 bottom-0 h-[300px] w-[300px] rounded-full bg-lime-pop/10 blur-[110px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-[12.5px] font-medium text-mist">
            <li>
              <Link to="/" className="transition hover:text-lime-pop">Home</Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5 text-mist/60" /></li>
            <li className="text-white" aria-current="page">{crumb}</li>
          </ol>
        </nav>
        <div className={`mt-5 grid items-center gap-12 lg:gap-14 ${visual ? "lg:grid-cols-[1.04fr_0.96fr]" : ""}`}>
          <div>
            <h1 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-mist sm:text-base">{sub}</p>
          </div>
          {visual ? <div className="relative">{visual}</div> : null}
        </div>
      </div>
    </section>
  );
}

/* ---------------- page-hero visuals: each view pairs its text with matching imagery ---------------- */

function CodeWindow() {
  return (
    <div className="w-56 rotate-[-2.5deg] overflow-hidden rounded-xl border border-white/12 bg-[#0b1020] shadow-2xl sm:w-64">
      <div className="flex items-center gap-1.5 border-b border-white/8 bg-white/5 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
        <span className="ml-1.5 text-[9.5px] font-medium tracking-wide text-mist">index.html — landing page</span>
      </div>
      <div className="space-y-[3px] px-3.5 py-3 font-mono text-[10px] leading-[1.75] sm:text-[11px]">
        <p><span className="text-mist/50">{"<section"}</span> <span className="text-lime-pop">class</span><span className="text-mist/60">=</span><span className="text-[#fbbf24]">"hero"</span><span className="text-mist/50">{">"}</span></p>
        <p className="pl-3"><span className="text-mist/50">{"<h1>"}</span><span className="text-white/85">Grow Your Brand</span><span className="text-mist/50">{"</h1>"}</span></p>
        <p className="pl-3"><span className="text-mist/50">{"<p>"}</span><span className="text-white/85">Design that converts.</span><span className="text-mist/50">{"</p>"}</span></p>
        <p className="pl-3"><span className="text-mist/50">{"<a"}</span> <span className="text-lime-pop">class</span><span className="text-mist/60">=</span><span className="text-[#fbbf24]">"btn"</span> <span className="text-lime-pop">href</span><span className="text-mist/60">=</span><span className="text-[#fbbf24]">"#work"</span><span className="text-mist/50">{">"}</span></p>
        <p className="pl-6"><span className="text-white/85">Get Started</span></p>
        <p className="pl-3"><span className="text-mist/50">{"</a>"}</span></p>
        <p><span className="text-mist/50">{"</section>"}</span></p>
      </div>
    </div>
  );
}

function WebsitesHeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md pb-8 lg:max-w-none" aria-hidden="true">
      <div className="absolute -inset-6 rounded-[2rem] bg-iris/20 blur-[70px]" />
      <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-ink-soft shadow-2xl">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-3.5 py-2.5">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-1.5 flex-1 truncate rounded-md bg-white/8 px-2.5 py-1 text-[10.5px] font-medium text-mist">
            reliant.pk — live client landing page
          </span>
        </div>
        <img
          src="/images/showcase/reliant.jpg"
          alt="Live client website landing page"
          className="h-44 w-full object-cover object-top sm:h-52"
        />
      </div>
      <div className="absolute -bottom-3 -left-3 sm:-left-7">
        <CodeWindow />
      </div>
      <span className="absolute -top-3.5 right-5 inline-flex items-center gap-1.5 rounded-full bg-lime-pop px-3 py-1.5 text-[11px] font-bold text-ink shadow-lg">
        <Code2 className="h-3.5 w-3.5" /> Code + Landing Page
      </span>
    </div>
  );
}

function GraphicsHeroVisual() {
  return (
    <div className="relative mx-auto flex h-64 w-full max-w-md items-start justify-center sm:h-72" aria-hidden="true">
      <div className="absolute -inset-6 rounded-[2rem] bg-iris/15 blur-[70px]" />
      <img
        src="/images/cv/visa-poster-1.png"
        alt=""
        className="absolute left-0 top-10 h-44 w-32 rotate-[-7deg] rounded-xl border border-white/15 object-cover shadow-2xl sm:h-52 sm:w-36"
        loading="eager"
      />
      <img
        src="/images/cv/pin-niche.jpg"
        alt=""
        className="absolute left-1/2 top-2 z-10 h-52 w-40 -translate-x-1/2 rotate-[2deg] rounded-xl border border-white/15 object-cover shadow-2xl sm:h-60 sm:w-44"
        loading="eager"
      />
      <img
        src="/images/cv/burger-poster.png"
        alt=""
        className="absolute right-0 top-12 h-44 w-32 rotate-[8deg] rounded-xl border border-white/15 object-cover shadow-2xl sm:h-52 sm:w-36"
        loading="eager"
      />
      <span className="absolute bottom-1 left-1 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur">
        <Sparkles className="h-3.5 w-3.5 text-lime-pop" /> Social Posts
      </span>
      <span className="absolute bottom-8 right-1 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur">
        Ad Creatives
      </span>
      <span className="absolute right-10 top-0 inline-flex items-center gap-1.5 rounded-full bg-lime-pop px-3 py-1.5 text-[11px] font-bold text-ink shadow-lg">
        Branding
      </span>
    </div>
  );
}

function MarketingHeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md pb-8 lg:max-w-none" aria-hidden="true">
      <div className="absolute -inset-6 rounded-[2rem] bg-iris/20 blur-[70px]" />
      <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-ink-soft shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-3.5 py-2.5">
          <span className="flex items-center gap-2 text-[11px] font-semibold text-white">
            <span className="h-2 w-2 rounded-full bg-lime-pop" /> Google Ads — campaign overview
          </span>
          <span className="text-[10px] font-medium text-mist">real account</span>
        </div>
        <img
          src="/images/cv/gads-overview.png"
          alt="Google Ads campaign dashboard"
          className="h-40 w-full object-cover object-top sm:h-48"
        />
      </div>
      <div className="absolute -bottom-3 -right-3 w-40 rotate-[3deg] overflow-hidden rounded-xl border border-white/12 bg-ink-soft shadow-2xl sm:-right-5 sm:w-48">
        <div className="border-b border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] font-semibold text-white">Meta Ads Manager</div>
        <img
          src="/images/cv/vx-meta-oct.png"
          alt="Meta Ads dashboard"
          className="h-20 w-full object-cover object-top sm:h-24"
        />
      </div>
      <span className="absolute -top-3.5 left-5 inline-flex items-center gap-1.5 rounded-full bg-lime-pop px-3 py-1.5 text-[11px] font-bold text-ink shadow-lg">
        <TrendingUp className="h-3.5 w-3.5" /> Real dashboards
      </span>
    </div>
  );
}

function ContactHeroVisual() {
  const profile = useProfile();
  return (
    <div className="relative mx-auto w-full max-w-[15rem] pb-4" aria-hidden="true">
      <div className="portrait-ring relative">
        <img
          src={profile.photoUrl || "/images/site/ayesha-portrait.png"}
          alt=""
          className="relative z-10 h-60 w-full rounded-[2rem] object-cover object-top ring-1 ring-white/15 sm:h-72"
        />
      </div>
      <span className="absolute -left-10 top-8 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur">
        <MessageCircle className="h-3.5 w-3.5 text-lime-pop" /> Replies within a day
      </span>
      <span className="absolute -right-8 bottom-6 z-20 inline-flex items-center gap-1.5 rounded-full bg-lime-pop px-3 py-1.5 text-[11px] font-bold text-ink shadow-lg">
        Design · Social · Marketing · Web
      </span>
    </div>
  );
}

/* ---------------- CTA band (end of every page except contact) ---------------- */

function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 lg:py-24" aria-label="Call to action">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-iris/20 blur-[130px]" />
      </div>
      <div className="relative mx-auto max-w-4xl px-5 text-center lg:px-8">
        <Reveal>
          <p className="eyebrow-lime">Next Step</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Have a project in mind?{" "}
            <span className="text-gradient-iris">Let&apos;s build it.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-mist">
            Design, social media, marketing or a website — tell me what you need and get a clear plan back within a day.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-lime px-7 py-3.5 text-[15px]">
              Let&apos;s Work Together <ArrowRight className="h-4.5 w-4.5" />
            </Link>
            <Link to="/" className="btn-outline-light px-7 py-3.5 text-[15px]">
              Back to Home
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- home: explore-my-work tiles ---------------- */

interface Counts {
  websites: number;
  graphics: number;
  marketing: number;
}

function useCounts(): Counts {
  const [counts, setCounts] = useState<Counts>({ websites: 0, graphics: 0, marketing: 0 });
  useEffect(() => {
    let alive = true;
    Promise.all([
      fetch("/api/projects").then((r) => (r.ok ? r.json() : null)).catch(() => null),
      fetch("/api/gallery").then((r) => (r.ok ? r.json() : null)).catch(() => null),
      fetch("/api/brands").then((r) => (r.ok ? r.json() : null)).catch(() => null),
    ]).then(([p, g, b]) => {
      if (!alive) return;
      const projects = (p?.projects ?? []) as { track?: string; showcase?: boolean }[];
      const graphics = (g?.items ?? []) as unknown[];
      const brands = (b?.brands ?? []) as { isOwnBrand?: boolean }[];
      setCounts({
        websites: projects.filter((x) => x.track === "web").length,
        graphics: graphics.length,
        marketing: brands.filter((x) => !x.isOwnBrand).length,
      });
    });
    return () => {
      alive = false;
    };
  }, []);
  return counts;
}

function HomeTiles() {
  const counts = useCounts();

  return (
    <section id="work" className="surface-white relative py-24 lg:py-32" aria-label="Explore my work">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center">
          <p className="eyebrow-ink">Explore My Work</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.12] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            Three separate portfolios,{" "}
            <span className="text-gradient-navy">one standard: quality</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-slateink sm:text-base">
            Websites, graphic design and marketing each get their own dedicated view — so you always see exactly the work you came for.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {/* 1 — Websites (dark, browser motif) */}
          <Reveal delay={0.05}>
            <button
              onClick={() => navigate("/websites")}
              className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink p-7 text-left shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl sm:p-8"
              aria-label="Open the websites portfolio"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-iris/25 blur-[70px]" aria-hidden="true" />
              <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/12">
                <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-[#ff5f57]" aria-hidden="true" />
                  <span className="h-2 w-2 rounded-full bg-[#febc2e]" aria-hidden="true" />
                  <span className="h-2 w-2 rounded-full bg-[#28c840]" aria-hidden="true" />
                  <span className="ml-2 flex-1 truncate rounded bg-white/8 px-2 py-0.5 text-[10px] font-medium text-mist" aria-hidden="true">coffeebean.pk</span>
                  <MonitorSmartphone className="h-3.5 w-3.5 text-lime-pop" aria-hidden="true" />
                </div>
                <div className="h-28 overflow-hidden bg-ink-soft/80">
                  <img
                    src="/images/showcase/coffeebean.jpg"
                    alt="Live website preview"
                    className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
              <p className="relative text-[11px] font-bold uppercase tracking-[0.18em] text-lime-pop">Portfolio 01</p>
              <h3 className="relative mt-2 font-display text-2xl font-bold text-white">Websites &amp; Digital Experiences</h3>
              <p className="relative mt-2.5 flex-1 text-[13.5px] leading-relaxed text-mist">
                Live websites and case studies — featured projects plus a full showcase organized automatically by industry.
              </p>
              <div className="relative mt-5 flex items-center justify-between">
                <span className="chip-dark">{counts.websites || "—"} websites</span>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-white transition group-hover:gap-2.5">
                  Explore <ArrowUpRight className="h-4 w-4 text-lime-pop" aria-hidden="true" />
                </span>
              </div>
            </button>
          </Reveal>

          {/* 2 — Graphics (light, masonry motif) */}
          <Reveal delay={0.12}>
            <button
              onClick={() => navigate("/graphics")}
              className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-ink/8 bg-cloud p-7 text-left shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-iris/10 sm:p-8"
              aria-label="Open the graphic design portfolio"
            >
              <div className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-iris/10 blur-[60px]" aria-hidden="true" />
              <div className="relative mb-6 grid h-[124px] grid-cols-3 gap-2 overflow-hidden rounded-2xl border border-ink/8 bg-white p-2">
                {["/images/cv/pin-niche.jpg", "/images/cv/burger-poster.png", "/images/gen/fashion-drop.png"].map((src) => (
                  <img key={src} src={src} alt="" className="h-full w-full rounded-lg object-cover" loading="lazy" aria-hidden="true" />
                ))}
              </div>
              <p className="relative text-[11px] font-bold uppercase tracking-[0.18em] text-iris">Portfolio 02</p>
              <h3 className="relative mt-2 font-display text-2xl font-bold text-ink">Graphic Designs &amp; Creative Posts</h3>
              <p className="relative mt-2.5 flex-1 text-[13.5px] leading-relaxed text-slateink">
                Social media posts, advertising creatives, branding and product designs across every niche — filterable gallery.
              </p>
              <div className="relative mt-5 flex items-center justify-between">
                <span className="chip-ink">{counts.graphics || "—"} designs</span>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-iris transition group-hover:gap-2.5">
                  Explore <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </button>
          </Reveal>

          {/* 3 — Marketing (indigo gradient, dashboard motif) */}
          <Reveal delay={0.19}>
            <button
              onClick={() => navigate("/marketing")}
              className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-iris via-iris-deep to-[#3b3bd4] p-7 text-left shadow-xl shadow-iris/30 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-iris/40 sm:p-8"
              aria-label="Open the marketing portfolio"
            >
              <div className="pointer-events-none absolute inset-0 bg-dots opacity-20" aria-hidden="true" />
              <div className="relative mb-6 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white/90">
                    <TrendingUp className="h-3.5 w-3.5 text-lime-pop" aria-hidden="true" /> Campaign results
                  </span>
                  <span className="rounded-full bg-lime-pop px-2 py-0.5 text-[10px] font-bold text-ink">LIVE DATA</span>
                </div>
                <div className="mt-3 flex gap-4">
                  <div>
                    <p className="font-display text-xl font-bold text-white">9.2M+</p>
                    <p className="text-[10px] text-white/70">impressions</p>
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold text-white">27.86×</p>
                    <p className="text-[10px] text-white/70">peak ROAS</p>
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold text-white">16K+</p>
                    <p className="text-[10px] text-white/70">leads</p>
                  </div>
                </div>
              </div>
              <p className="relative text-[11px] font-bold uppercase tracking-[0.18em] text-lime-pop">Portfolio 03</p>
              <h3 className="relative mt-2 font-display text-2xl font-bold text-white">Marketing &amp; Brand Pages</h3>
              <p className="relative mt-2.5 flex-1 text-[13.5px] leading-relaxed text-white/80">
                Every brand I manage with its live pages — plus the Meta &amp; Google dashboards that prove performance.
              </p>
              <div className="relative mt-5 flex items-center justify-between">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[12px] font-semibold text-white">
                  {counts.marketing || "—"} brands
                </span>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-white transition group-hover:gap-2.5">
                  Explore <ArrowUpRight className="h-4 w-4 text-lime-pop" aria-hidden="true" />
                </span>
              </div>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- pages ---------------- */

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <HomeTiles />
      <Process />
      <CtaBand />
    </>
  );
}

function WebsitesPage() {
  return (
    <>
      <PageHero
        crumb="Websites"
        title="Websites & Digital Experiences"
        sub="A dedicated website portfolio — featured case studies first, then the full showcase of live websites automatically organized by industry."
        visual={<WebsitesHeroVisual />}
      />
      <Websites />
      <WebsiteShowcase />
      <CtaBand />
    </>
  );
}

function GraphicsPage() {
  return (
    <>
      <PageHero
        crumb="Graphics"
        title="Graphic Designs & Creative Work"
        sub="A dedicated gallery of creative design work — social media posts, advertising creatives, branding, product designs and more, filterable by category."
        visual={<GraphicsHeroVisual />}
      />
      <Gallery />
      <CtaBand />
    </>
  );
}

function MarketingPage() {
  return (
    <>
      <PageHero
        crumb="Marketing"
        title="Social Media & Digital Marketing"
        sub="The marketing view: every brand page I manage — including my own label — plus the real campaign dashboards behind the results."
        visual={<MarketingHeroVisual />}
      />
      <Brands />
      <Marketing />
      <CtaBand />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        title="Let's Work Together"
        sub="One simple form that lands straight in my inbox — no packages, no price games. Tell me what you need and I'll reply with next steps."
        visual={<ContactHeroVisual />}
      />
      <Contact />
    </>
  );
}
