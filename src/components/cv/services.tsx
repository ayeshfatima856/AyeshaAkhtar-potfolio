"use client";

import { Palette, Share2, Target, Globe, ArrowRight } from "lucide-react";
import { Reveal, SectionHead } from "./shared";
import { navigate } from "@/lib/router";
import { SERVICES } from "./data";

const ICONS: Record<string, typeof Palette> = {
  palette: Palette,
  share: Share2,
  target: Target,
  globe: Globe,
};

/* each card gets its own accent + visual treatment so no two feel alike */
const CARD_STYLES: Record<string, { grad: string; ring: string; iconWrap: string; num: string }> = {
  "graphic-design": {
    grad: "from-iris/10 to-transparent",
    ring: "hover:border-iris/40",
    iconWrap: "bg-iris text-white shadow-iris/40",
    num: "text-iris/15",
  },
  "social-media-management": {
    grad: "from-lime-pop/20 to-transparent",
    ring: "hover:border-lime-pop/60",
    iconWrap: "bg-ink text-lime-pop shadow-ink/30",
    num: "text-ink/10",
  },
  "digital-marketing": {
    grad: "from-iris/15 via-lime-pop/10 to-transparent",
    ring: "hover:border-iris/40",
    iconWrap: "bg-gradient-to-br from-iris to-iris-deep text-white shadow-iris/40",
    num: "text-iris/15",
  },
  "website-design": {
    grad: "from-deep/10 to-transparent",
    ring: "hover:border-deep/40",
    iconWrap: "bg-deep text-white shadow-deep/30",
    num: "text-deep/10",
  },
};

export function Services() {
  /* each service CTA opens its dedicated portfolio view */
  const goFor = (id: string) => {
    if (id === "graphic-design") return "/graphics";
    if (id === "social-media-management") return "/marketing";
    if (id === "digital-marketing") return "/marketing";
    return "/websites";
  };

  return (
    <section id="services" className="surface-white relative py-24 lg:py-32" aria-label="Services">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          eyebrow="Professional Services"
          title={
            <>
              Everything your brand needs,
              <br className="hidden sm:block" /> under <span className="text-gradient-navy">one roof</span>
          </>
        }
          sub="Four focused services that cover the full journey — from the first impression to the finished conversion. Each one can be booked alone or combined into a complete digital presence package."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Palette;
            const st = CARD_STYLES[s.id] ?? CARD_STYLES["graphic-design"];
            return (
              <Reveal key={s.id} delay={i * 0.07}>
                <article
                  className={`group relative h-full overflow-hidden rounded-3xl border border-ink/8 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-iris/10 sm:p-9 ${st.ring}`}
                >
                  {/* backdrop gradient + ghost number */}
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${st.grad}`} aria-hidden="true" />
                  <span
                    className={`pointer-events-none absolute -right-2 -top-5 select-none font-display text-[7rem] font-bold leading-none ${st.num}`}
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </span>

                  <div className="relative">
                    <span className={`inline-flex h-13 w-13 items-center justify-center rounded-2xl p-3.5 shadow-lg ${st.iconWrap}`}>
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>

                    <h3 className="mt-5 font-display text-xl font-bold text-ink sm:text-[1.35rem]">{s.title}</h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-slateink">{s.blurb}</p>

                    <ul className="mt-5 grid gap-x-4 gap-y-2 sm:grid-cols-2">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-[13px] font-medium text-deep">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-iris" aria-hidden="true" />
                          {p}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => navigate(goFor(s.id))}
                      className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-iris transition group-hover:gap-2.5"
                      aria-label={`${s.cta} — open portfolio view`}
                    >
                      {s.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
