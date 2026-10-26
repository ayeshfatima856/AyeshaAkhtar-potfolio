"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  align = "center",
  accent,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  align?: "center" | "left";
  accent?: string;
}) {
  return (
    <Reveal
      className={`mb-12 md:mb-16 ${
        align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"
      }`}
    >
      <p className="eyebrow mb-4 inline-flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-400 to-cyan-300" />
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl md:text-[2.75rem] font-bold leading-[1.12] tracking-tight text-white">
        {title}
      </h2>
      {sub && <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">{sub}</p>}
      {accent && (
        <div
          className="mt-6 h-1 w-16 rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
        />
      )}
    </Reveal>
  );
}
