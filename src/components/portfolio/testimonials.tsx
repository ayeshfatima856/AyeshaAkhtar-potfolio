"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const testimonials = [
  {
    quote:
      "Ayesha took our Instagram from a ghost town to our number one sales channel. She understands the algorithm and the audience — that combination is extremely rare.",
    name: "Sara Malik",
    role: "Founder, GlowUp Beauty",
    initials: "SM",
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    quote:
      "She rebuilt our store in three weeks. It loads instantly and conversions jumped 38% in the first month. Easily the best investment we made this year.",
    name: "Daniel Reyes",
    role: "CEO, Bloom & Co.",
    initials: "DR",
    gradient: "from-orange-400 to-amber-400",
  },
  {
    quote:
      "The reels challenge she designed felt effortless — and then it exploded. Two million views later, our whole launch calendar runs through her.",
    name: "Amara Okafor",
    role: "Marketing Lead, FitFuel",
    initials: "AO",
    gradient: "from-pink-500 to-rose-400",
  },
  {
    quote:
      "From ads to landing pages, she owns the full funnel. Our cost per lead dropped by a third, and she speaks both marketing and engineering fluently.",
    name: "Omar Farooq",
    role: "Director, UrbanNest",
    initials: "OF",
    gradient: "from-amber-400 to-orange-500",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const current = testimonials[index];

  return (
    <section id="testimonials" className="relative scroll-mt-24 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-600/10 blur-[130px]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          eyebrow="Testimonials"
          title={
            <>
              Kind words from <span className="text-gradient">great clients</span>
            </>
          }
        />

        <Reveal delay={0.1}>
          <div
            className="relative mx-auto mt-16 max-w-3xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-label="Client testimonials carousel"
          >
            <span className="absolute -top-5 left-6 z-10 grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 to-orange-400 text-white shadow-lg shadow-fuchsia-500/30">
              <Quote className="h-5 w-5" />
            </span>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
              <div aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={index}
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -32 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="flex gap-1" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="mt-5 font-display text-xl font-medium leading-relaxed text-stone-100 sm:text-2xl">
                      &ldquo;{current.quote}&rdquo;
                    </p>
                    <footer className="mt-7 flex items-center gap-4">
                      <span
                        aria-hidden
                        className={`grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br ${current.gradient} font-display text-sm font-bold text-white`}
                      >
                        {current.initials}
                      </span>
                      <div>
                        <p className="font-semibold text-stone-50">{current.name}</p>
                        <p className="text-sm text-stone-500">{current.role}</p>
                      </div>
                    </footer>
                  </motion.blockquote>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2" role="tablist" aria-label="Choose testimonial">
                {testimonials.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Testimonial from ${t.name}`}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index
                        ? "w-8 bg-gradient-to-r from-fuchsia-400 to-orange-400"
                        : "w-2 bg-white/15 hover:bg-white/30"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() =>
                    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
                  }
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-stone-300 transition-colors hover:border-fuchsia-400/50 hover:text-fuchsia-300"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-stone-300 transition-colors hover:border-fuchsia-400/50 hover:text-fuchsia-300"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
