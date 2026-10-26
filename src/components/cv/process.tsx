"use client";

import { Search, Map, PenTool, SlidersHorizontal, PackageCheck } from "lucide-react";
import { Reveal, SectionHead } from "./shared";
import { PROCESS_STEPS, SKILL_AREAS } from "./data";

const STEP_ICONS = [Search, Map, PenTool, SlidersHorizontal, PackageCheck];

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-ink py-24 lg:py-32" aria-label="Working process">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-iris/20 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          dark
          eyebrow="How I Work"
          title={
            <>
              From brief to delivery in <span className="text-gradient-iris">five steps</span>
            </>
          }
          sub="A clear, collaborative process — you always know what's happening and what comes next."
        />

        {/* timeline */}
        <ol className="relative mt-16 grid gap-10 lg:grid-cols-5 lg:gap-6">
          <span className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-iris/50 to-transparent lg:block" aria-hidden="true" />
          {PROCESS_STEPS.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? Search;
            return (
              <Reveal as="li" key={step.n} delay={i * 0.08} className="relative">
                <div className="flex flex-col items-start gap-4 lg:items-center lg:text-center">
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-iris/40 bg-ink-soft shadow-lg shadow-iris/20">
                    <Icon className="h-6 w-6 text-lime-pop" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-[13px] font-bold tracking-[0.25em] text-iris">{step.n}</p>
                    <h3 className="mt-1 font-display text-lg font-bold text-white">{step.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-mist lg:px-2">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>

        {/* skill areas */}
        <Reveal delay={0.15}>
          <div className="mt-16 rounded-3xl border border-white/10 bg-ink-soft/60 p-7 backdrop-blur sm:p-9">
            <h3 className="font-display text-lg font-bold text-white">What I bring to the table</h3>
            <p className="mt-1.5 text-[13.5px] text-mist">Core service areas — refined project by project.</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SKILL_AREAS.map((s) => (
                <li key={s.title} className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/4 px-4 py-3.5 transition hover:border-lime-pop/40">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-lime-pop" aria-hidden="true" />
                  <span>
                    <span className="block text-[13.5px] font-bold text-white">{s.title}</span>
                    <span className="mt-0.5 block text-[12px] text-mist">{s.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
