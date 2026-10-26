"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import {
  Award,
  Briefcase,
  Globe2,
  Heart,
  Languages,
  Rocket,
  TrendingUp,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const facts = [
  { Icon: Globe2, text: "Remote — working worldwide" },
  { Icon: Briefcase, text: "Freelance & collaborations open" },
  { Icon: Languages, text: "English · Urdu · Hindi" },
  { Icon: Heart, text: "Obsessed with design & analytics" },
];

const stats = [
  { Icon: Rocket, value: 3, suffix: "+", label: "Years of experience" },
  { Icon: Award, value: 50, suffix: "+", label: "Projects delivered" },
  { Icon: Users, value: 25, suffix: "+", label: "Happy clients" },
  { Icon: TrendingUp, value: 10, suffix: "M+", label: "Impressions generated" },
];

function Stat({
  Icon,
  value,
  suffix,
  label,
}: {
  Icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div
      ref={ref}
      className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-fuchsia-400/40"
    >
      <Icon className="h-6 w-6 text-fuchsia-300" />
      <p className="mt-4 font-display text-4xl font-extrabold text-stone-50">
        {display}
        <span className="text-gradient">{suffix}</span>
      </p>
      <p className="mt-1 text-sm text-stone-400">{label}</p>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-15%] top-1/4 h-96 w-96 rounded-full bg-fuchsia-600/10 blur-[120px]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          eyebrow="About me"
          title={
            <>
              Marketing brain, <span className="text-gradient">developer hands</span>
            </>
          }
        />
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-stone-400 sm:text-lg">
              <p>
                I&apos;m Ayesha — a hybrid of{" "}
                <span className="font-medium text-stone-100">social media marketer</span> and{" "}
                <span className="font-medium text-stone-100">web developer</span>. I started out
                growing brand accounts on Instagram and TikTok, then fell so deep into landing
                pages and site performance that I taught myself to code. Today I live happily at
                the intersection of both worlds.
              </p>
              <p>
                That means I don&apos;t just make things look pretty — I make them{" "}
                <span className="font-medium text-stone-100">perform</span>. Campaigns are built
                on data, websites are built to convert, and every project ships with analytics so
                you can see exactly what worked. From a small café&apos;s first online menu to a
                startup&apos;s full growth funnel, I treat your brand like my own.
              </p>
              <p>
                When I&apos;m not scheduling posts or pushing commits, you&apos;ll find me
                exploring new design trends, testing the latest TikTok feature weeks before it
                trends, or mentoring small businesses on their digital journey.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {facts.map(({ Icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-stone-300 sm:text-sm"
                >
                  <Icon className="h-4 w-4 text-fuchsia-300" /> {text}
                </span>
              ))}
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="h-full">
                <Stat {...s} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
