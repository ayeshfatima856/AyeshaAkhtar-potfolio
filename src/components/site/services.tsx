"use client";

import { PageHero, CTABanner } from "./blocks";
import { Reveal, SectionHead } from "./reveal";
import { useApi } from "@/lib/hooks";
import { parseFeatures, type ServicePackage } from "@/lib/types";
import { Link } from "@/lib/router";
import {
  Check, Sparkles, ArrowRight, Globe, Megaphone, HelpCircle,
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "How do we start working together?",
    a: "Simple: send me a message through the contact form or book a call. We'll do a free 20-minute discovery chat, I'll send a clear proposal with scope, timeline and price — and if it feels right, we start with a kickoff.",
  },
  {
    q: "Are the prices shown final?",
    a: "The prices are honest starting points. Final quotes depend on scope — a 3-page site costs less than a full store. You always approve the exact number before anything begins. No surprises, ever.",
  },
  {
    q: "Can you build the website AND run the marketing?",
    a: "Yes — that's actually my sweet spot. Bundling both saves you the classic developer-vs-agency blame game, and your site gets built conversion-ready from day one. Ask about the combined bundle discount.",
  },
  {
    q: "How long does a typical project take?",
    a: "Landing pages: 1 week. Business websites: 2–3 weeks. E-commerce: 4–6 weeks. Marketing retainers start within a week of kickoff and run monthly.",
  },
  {
    q: "Do you offer revisions?",
    a: "Every package includes revision rounds, and I'll always show you progress at milestones instead of surprising you at the end. You approve the direction before I go deep.",
  },
  {
    q: "What about payments and contracts?",
    a: "50% to book the slot, 50% on launch for projects. Retainers are billed monthly. Everything is documented in a simple written agreement — scope, price, timeline, deliverables.",
  },
];

export default function Services() {
  const { data, loading } = useApi<{ services: ServicePackage[] }>("/api/services");
  const services = data?.services || [];
  const web = services.filter((s) => s.kind === "web" && s.active);
  const mkt = services.filter((s) => s.kind === "marketing" && s.active);

  return (
    <>
      <PageHero
        eyebrow="Services & pricing"
        title="Simple plans,"
        highlight="serious results"
        sub="Transparent starting prices, custom quotes after a free discovery call. Pick one track — or bundle both for a complete growth engine."
      />

      {/* web packages */}
      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <SectionHead
          eyebrow="Web development"
          title={<>Website <span className="text-gradient">packages</span></>}
          sub="From a sharp starter site to a full custom platform."
          accent="#4F7CFF"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="shimmer-line h-[420px] rounded-3xl" />)
            : web.map((s, i) => <PriceCard key={s.id} s={s} delay={i * 0.08} />)}
        </div>
      </section>

      {/* marketing packages */}
      <section className="relative overflow-hidden py-14">
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHead
            eyebrow="Digital marketing"
            title={<>Marketing <span className="text-gradient">retainers</span></>}
            sub="Monthly management with honest reporting. Ad spend stays in your ad account — full transparency."
            accent="#A855F7"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="shimmer-line h-[420px] rounded-3xl" />)
              : mkt.map((s, i) => <PriceCard key={s.id} s={s} delay={i * 0.08} />)}
          </div>
        </div>
      </section>

      {/* bundle banner */}
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <Reveal>
          <div className="ring-gradient relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-600/15 via-blue-600/10 to-cyan-500/10 p-8 md:p-12">
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-violet-500/20 blur-[100px]" aria-hidden="true" />
            <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <p className="eyebrow mb-3">Best value</p>
                <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
                  Website + Marketing <span className="text-gradient">Bundle</span>
                </h3>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  Build the site and launch the campaigns with the same brain. Your launch funnel gets
                  conversion-tested before a single ad dollar is spent — bundle pricing available on request.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
                  <Globe className="h-4 w-4 text-blue-300" /> Web
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
                  <Megaphone className="h-4 w-4 text-fuchsia-300" /> Marketing
                </span>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
                >
                  Ask about it
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-14 lg:px-8">
        <SectionHead
          eyebrow="Questions"
          title={<>Good to <span className="text-gradient">know</span></>}
          sub="The things everyone asks before we start."
          accent="#FBBF24"
        />
        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-2 md:p-4">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-white/8 px-4">
                  <AccordionTrigger className="py-5 text-left text-[15px] font-semibold text-white hover:no-underline">
                    <span className="flex items-center gap-3">
                      <HelpCircle className="h-4.5 w-4.5 h-[18px] w-[18px] shrink-0 text-violet-300" />
                      {f.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pl-8 text-[14px] leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </section>

      <CTABanner />
    </>
  );
}

function PriceCard({ s, delay }: { s: ServicePackage; delay: number }) {
  const features = parseFeatures(s.features);
  return (
    <Reveal delay={delay} className="h-full">
      <div
        className={`card-hover relative flex h-full flex-col rounded-3xl border p-7 ${
          s.highlighted
            ? "border-violet-400/40 bg-gradient-to-b from-violet-600/15 to-blue-600/8 shadow-[0_20px_60px_-20px_rgba(139,92,246,0.45)]"
            : "border-white/10 bg-white/[0.03]"
        }`}
      >
        {s.highlighted && (
          <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg">
            <Sparkles className="h-3 w-3" /> Most popular
          </span>
        )}
        <h3 className="font-display text-lg font-bold text-white">{s.name}</h3>
        {s.tagline && <p className="mt-1.5 min-h-[40px] text-[13px] leading-snug text-muted-foreground">{s.tagline}</p>}
        <div className="mt-4 flex items-baseline gap-1.5">
          <span className={`font-display text-4xl font-extrabold ${s.highlighted ? "text-gradient" : "text-white"}`}>
            {s.price}
          </span>
          {s.period && <span className="text-[13px] text-muted-foreground">{s.period}</span>}
        </div>
        <ul className="mt-6 flex-1 space-y-2.5">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-foreground/85">
              <span className={`mt-0.5 inline-flex h-4.5 w-4.5 h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full ${s.highlighted ? "bg-violet-500/25 text-violet-200" : "bg-white/8 text-cyan-300"}`}>
                <Check className="h-3 w-3" />
              </span>
              {f}
            </li>
          ))}
        </ul>
        <Link
          to="/contact"
          className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all ${
            s.highlighted
              ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:brightness-110"
              : "border border-white/15 text-white hover:border-violet-400/60 hover:bg-violet-500/10"
          }`}
        >
          Get started <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Reveal>
  );
}
