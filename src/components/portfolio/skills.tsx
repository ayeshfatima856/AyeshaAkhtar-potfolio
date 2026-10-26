"use client";

import { motion } from "framer-motion";
import { Code2, Megaphone, Wrench } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const groups = [
  {
    Icon: Megaphone,
    title: "Marketing Magic",
    accent: "from-fuchsia-500 to-pink-500",
    bar: "from-fuchsia-400 to-pink-400",
    hoverBorder: "hover:border-fuchsia-400/40",
    skills: [
      { name: "Social Media Strategy", level: 95 },
      { name: "Content Creation & Copywriting", level: 92 },
      { name: "Paid Ads — Meta & Google", level: 88 },
      { name: "SEO & Analytics", level: 85 },
      { name: "Community Management", level: 90 },
    ],
    tools: ["Meta Ads Manager", "Google Analytics", "Canva", "CapCut", "Later", "Mailchimp"],
  },
  {
    Icon: Code2,
    title: "Developer Craft",
    accent: "from-orange-400 to-amber-400",
    bar: "from-orange-300 to-amber-300",
    hoverBorder: "hover:border-orange-400/40",
    skills: [
      { name: "HTML · CSS · JavaScript", level: 94 },
      { name: "React & Next.js", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "TypeScript", level: 82 },
      { name: "Node.js & REST APIs", level: 78 },
    ],
    tools: ["Git & GitHub", "Figma", "Prisma", "Vercel", "WordPress", "Shopify"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-15%] top-1/3 h-96 w-96 rounded-full bg-orange-500/10 blur-[120px]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="My toolkit"
          title={
            <>
              Two superpowers, <span className="text-gradient">one person</span>
            </>
          }
          description="Most people pick a lane. I built a bridge — so your campaign and your website finally speak the same language."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.1} className="h-full">
              <div
                className={`group h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 sm:p-8 ${g.hoverBorder}`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${g.accent} text-white shadow-lg`}
                  >
                    <g.Icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-display text-2xl font-bold text-stone-50">{g.title}</h3>
                </div>
                <div className="mt-7 space-y-5">
                  {g.skills.map((s, si) => (
                    <div key={s.name}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-stone-200">{s.name}</span>
                        <span className="font-mono text-xs text-stone-500">{s.level}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 1, delay: si * 0.08, ease: "easeOut" }}
                          className={`h-full rounded-full bg-gradient-to-r ${g.bar}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 border-t border-white/5 pt-5">
                  <p className="mb-3 flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500">
                    <Wrench className="h-3.5 w-3.5" /> Daily drivers
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {g.tools.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-stone-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
