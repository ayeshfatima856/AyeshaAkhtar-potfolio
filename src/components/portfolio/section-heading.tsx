"use client";

import type { ReactNode } from "react";
import { Reveal } from "./reveal";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
}

export function SectionHeading({ index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-fuchsia-300/90">
        <span className="font-mono text-xs text-stone-500">/{index}</span>
        <span>{eyebrow}</span>
        <span aria-hidden className="h-px w-16 bg-gradient-to-r from-fuchsia-400/60 to-transparent" />
      </div>
      <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-stone-50 sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-400 sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
