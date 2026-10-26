"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
        shown ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  sub,
  dark = false,
  align = "left",
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  dark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
        <span className="font-mono text-xs tracking-[0.3em] text-elec">{index}</span>
        <span className={cn("h-px w-10", dark ? "bg-limey/60" : "bg-elec/40")} aria-hidden="true" />
        <span className={cn("eyebrow", dark ? "text-limey" : "text-elec")}>{eyebrow}</span>
      </div>
      <h2
        className={cn(
          "mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight md:text-5xl",
          dark ? "text-white" : "text-navy"
        )}
      >
        {title}
      </h2>
      {sub && (
        <p className={cn("mt-4 text-[15px] leading-relaxed md:text-base", dark ? "text-mist" : "text-[#5b6779]")}>
          {sub}
        </p>
      )}
    </Reveal>
  );
}
