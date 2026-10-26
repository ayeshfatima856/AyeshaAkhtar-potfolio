"use client";

import { Compass, Quote } from "lucide-react";
import { Reveal, SectionHead, useProfile } from "./shared";
import { Link } from "@/lib/router";
import { SKILL_AREAS } from "./data";

export function About() {
  const profile = useProfile();

  return (
    <section id="about" className="surface-light relative overflow-hidden py-24 lg:py-32" aria-label="About me">
      <div className="pointer-events-none absolute inset-0 bg-dots-light opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* photo — second crop, offset composition (differs from hero) */}
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div
                className="absolute -left-5 -top-5 h-full w-full rounded-[2rem] border-2 border-iris/25"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-[2rem] shadow-xl shadow-ink/10">
                { }
                <img
                  src={profile.photoUrl || "/images/site/ayesha-portrait.png"}
                  alt={`${profile.name} at work`}
                  className="aspect-[4/5] w-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 rounded-2xl bg-ink px-6 py-5 shadow-2xl sm:-right-8">
                <p className="font-display text-2xl font-bold text-lime-pop">1 team</p>
                <p className="text-[11.5px] text-mist">design + content + ads + web</p>
              </div>
            </div>
          </Reveal>

          {/* copy */}
          <div className="order-1 lg:order-2">
            <SectionHead
              align="left"
              eyebrow="About Me"
              title={
                <>
                  The designer behind the <span className="text-gradient-navy">brands</span>
                </>
              }
            />
            <Reveal delay={0.1}>
              <p className="mt-6 text-[15.5px] leading-relaxed text-slateink">{profile.bio}</p>
              <p className="mt-4 text-[15.5px] leading-relaxed text-slateink">{profile.approach}</p>
            </Reveal>

            <Reveal delay={0.16}>
              <figure className="mt-8 rounded-2xl border border-iris/20 bg-iris-soft/60 p-6">
                <Quote className="h-5 w-5 text-iris" aria-hidden="true" />
                <blockquote className="mt-3 font-display text-[15.5px] font-medium leading-relaxed text-ink">
                  {profile.philosophy}
                </blockquote>
                <figcaption className="mt-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-iris">
                  — my design philosophy
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.22}>
              <h3 className="mt-10 flex items-center gap-2 font-display text-base font-bold text-ink">
                <Compass className="h-4.5 w-4.5 text-iris" aria-hidden="true" /> Where I can help
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {SKILL_AREAS.map((s) => (
                  <li key={s.title} className="card-light rounded-xl px-4 py-3.5">
                    <p className="text-[13.5px] font-bold text-ink">{s.title}</p>
                    <p className="mt-0.5 text-[12px] text-slateink">{s.detail}</p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.28}>
              <Link to="/contact" className="btn-iris mt-9 inline-block px-6 py-3 text-sm">
                Work with me
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
