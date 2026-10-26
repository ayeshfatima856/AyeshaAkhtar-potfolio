"use client";

import { ArrowRight, Sparkles, MousePointer2 } from "lucide-react";
import { Reveal, useProfile, useScrollTo } from "./shared";
import { Link } from "@/lib/router";

const HERO_CHIPS = ["Graphic Design", "Social Media", "Digital Marketing", "Websites"];

export function Hero() {
  const profile = useProfile();
  const scrollTo = useScrollTo();

  return (
    <section className="relative overflow-hidden bg-ink" aria-label="Introduction">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute -left-40 top-10 h-[480px] w-[480px] rounded-full bg-iris/25 blur-[130px]" />
        <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-iris/15 blur-[120px]" />
        <div className="absolute right-[28%] top-[16%] h-40 w-40 rounded-full bg-lime-pop/10 blur-[80px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-36 sm:pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8 lg:pb-28 lg:pt-44">
        {/* copy */}
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-lime-pop/30 bg-lime-pop/10 px-4 py-1.5 text-[12.5px] font-semibold text-lime-pop">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {profile.title}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 font-display text-[2.6rem] font-bold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-[4.2rem]">
              Creative Designs.
              <br />
              Powerful Brands.
              <br />
              <span className="text-gradient-iris">Digital Experiences</span>
              <br />
              That Convert.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-mist sm:text-lg">
              {profile.heroSub}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button onClick={() => scrollTo("work")} className="btn-iris px-7 py-3.5 text-[15px]">
                Explore My Work <ArrowRight className="h-4.5 w-4.5" />
              </button>
              <Link to="/contact" className="btn-outline-light px-7 py-3.5 text-[15px]">
                Let&apos;s Work Together
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <ul className="mt-10 flex flex-wrap gap-2.5" aria-label="Disciplines">
              {HERO_CHIPS.map((c) => (
                <li key={c} className="chip-dark">{c}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* portrait — the user's real photo */}
        <Reveal delay={0.15} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative">
            <div className="portrait-ring absolute -inset-6 rounded-[2.5rem]" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/12 shadow-2xl shadow-black/50">
              { }
              <img
                src={profile.photoUrl || "/images/site/ayesha-portrait.png"}
                alt={`${profile.name} — graphic designer and digital marketer`}
                className="aspect-[4/4.7] w-full object-cover object-top"
                loading="eager"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/85 to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
                <div>
                  <p className="font-display text-xl font-bold text-white">{profile.name}</p>
                  <p className="mt-0.5 text-[12.5px] text-mist">{profile.tagline}</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-pop text-ink shadow-lg">
                  <MousePointer2 className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
              </div>
            </div>

            {/* floating accents */}
            <div className="absolute -left-4 top-8 hidden rounded-2xl border border-white/12 bg-ink-soft/90 px-4 py-3 shadow-xl backdrop-blur sm:block lg:-left-10">
              <p className="font-display text-lg font-bold text-lime-pop">4-in-1</p>
              <p className="text-[11px] text-mist">design · social · ads · web</p>
            </div>
            <div className="absolute -right-3 bottom-24 hidden rounded-2xl border border-white/12 bg-ink-soft/90 px-4 py-3 shadow-xl backdrop-blur sm:block lg:-right-8">
              <p className="text-[11px] text-mist">Worked with</p>
              <p className="font-display text-lg font-bold text-white">9 brands</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
