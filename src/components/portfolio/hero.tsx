"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  Camera,
  Code2,
  Dribbble,
  Github,
  Instagram,
  Linkedin,
  MessageCircle,
  TrendingUp,
  Twitter,
} from "lucide-react";

const roles = [
  "Social Media Marketer",
  "Web Developer",
  "Brand Storyteller",
  "Growth Strategist",
];

const socials = [
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
  { href: "https://github.com", label: "GitHub", Icon: Github },
  { href: "https://twitter.com", label: "Twitter", Icon: Twitter },
  { href: "https://dribbble.com", label: "Dribbble", Icon: Dribbble },
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pb-24 pt-32">
      {/* background layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black_30%,transparent_75%)]" />
        <div className="absolute -top-32 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-fuchsia-600/20 blur-[130px]" />
        <div className="absolute bottom-[-20%] left-[-12%] h-[30rem] w-[30rem] rounded-full bg-orange-500/15 blur-[130px]" />
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-pink-500/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        {/* left column */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-stone-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for new projects
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-7 font-hand text-3xl text-fuchsia-300"
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-2 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-stone-50 sm:text-6xl lg:text-7xl"
          >
            Ayesha <span className="text-gradient">Akhtar</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-5 flex h-9 items-center gap-3 text-xl font-semibold text-stone-200 sm:text-2xl lg:text-3xl"
          >
            <span aria-hidden className="h-px w-10 bg-gradient-to-r from-fuchsia-400 to-transparent" />
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[roleIndex]}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.32 }}
                className="text-gradient inline-block"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-stone-400 sm:text-lg"
          >
            I help brands grow online with scroll-stopping content and high-performing
            websites — where marketing strategy meets clean code, and every click turns
            into a story.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-fuchsia-500/25 transition-transform hover:scale-105"
            >
              View my work
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-stone-100 backdrop-blur transition-colors hover:border-fuchsia-400/50 hover:text-fuchsia-200"
            >
              <MessageCircle className="h-4 w-4" />
              Let&apos;s talk
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-10 flex items-center gap-3"
          >
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-stone-300 transition-all hover:-translate-y-1 hover:border-fuchsia-400/50 hover:text-fuchsia-300"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* right visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative mx-auto hidden w-full max-w-sm sm:block lg:max-w-md"
        >
          <p
            aria-hidden
            className="absolute -top-10 right-0 z-10 rotate-[-6deg] font-hand text-2xl text-fuchsia-300"
          >
            marketing meets code!
          </p>
          <div
            aria-hidden
            className="absolute inset-0 animate-spin-slower rounded-full border-2 border-dashed border-fuchsia-500/30"
          />
          <div className="relative m-8 rotate-3 rounded-[2.5rem] bg-gradient-to-br from-fuchsia-500 via-pink-500 to-orange-400 p-[3px] shadow-2xl shadow-fuchsia-500/20">
            <div className="flex aspect-square flex-col items-center justify-center gap-3 rounded-[2.35rem] bg-stone-950/90 px-6 text-center backdrop-blur">
              <span className="text-gradient font-display text-7xl font-extrabold tracking-tight">
                AA
              </span>
              <span className="font-display text-xl font-bold text-stone-100">
                Ayesha Akhtar
              </span>
              <span className="text-xs uppercase tracking-[0.3em] text-stone-500">
                Marketer × Developer
              </span>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-[11px] text-fuchsia-200">
                  +10M impressions
                </span>
                <span className="rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[11px] text-orange-200">
                  50+ projects
                </span>
              </div>
            </div>
          </div>

          <div className="absolute -left-4 top-10 animate-float rounded-2xl border border-white/10 bg-stone-900/90 px-4 py-3 shadow-xl backdrop-blur">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white">
                <Camera className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold text-stone-100">Content that converts</p>
                <p className="text-[11px] text-stone-400">Reels · Posts · Stories</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-3 bottom-16 animate-float-slow rounded-2xl border border-white/10 bg-stone-900/90 px-4 py-3 shadow-xl backdrop-blur">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-orange-400 to-amber-400 text-white">
                <Code2 className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold text-stone-100">Clean, fast code</p>
                <p className="text-[11px] text-stone-400">Next.js · React · Tailwind</p>
              </div>
            </div>
          </div>

          <div
            className="absolute -bottom-4 left-10 animate-float rounded-2xl border border-white/10 bg-stone-900/90 px-4 py-3 shadow-xl backdrop-blur"
            style={{ animationDelay: "2s" }}
          >
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-pink-500 to-orange-400 text-white">
                <TrendingUp className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold text-stone-100">Growth, proven</p>
                <p className="text-[11px] text-stone-400">+38% avg. conversion lift</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-stone-500 transition-colors hover:text-fuchsia-300 md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
