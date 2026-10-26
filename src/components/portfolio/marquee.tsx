"use client";

import { Asterisk } from "lucide-react";

const rowA = [
  "Social Media Strategy",
  "Web Development",
  "Content Creation",
  "SEO & Analytics",
  "Brand Identity",
  "Paid Advertising",
  "Community Growth",
  "Next.js & React",
];

const rowB = [
  "Instagram",
  "TikTok",
  "YouTube",
  "LinkedIn",
  "Meta Ads",
  "Google Ads",
  "Figma",
  "WordPress",
  "Shopify",
  "Canva",
];

export function Marquee() {
  return (
    <section aria-hidden="true" className="relative z-10 -my-4 select-none overflow-hidden py-8">
      <div className="rotate-[-1.2deg] scale-[1.02]">
        <div className="border-y border-fuchsia-400/20 bg-gradient-to-r from-fuchsia-600 via-pink-500 to-orange-400 py-3">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((half) => (
              <div key={half} className="flex items-center gap-10 pr-10">
                {rowA.map((item) => (
                  <span
                    key={`${half}-${item}`}
                    className="flex items-center gap-10 whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.2em] text-stone-950"
                  >
                    {item}
                    <Asterisk className="h-4 w-4" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-[-6px] rotate-[1deg] scale-[1.02]">
        <div className="border-y border-white/10 bg-stone-900/90 py-3 backdrop-blur">
          <div className="flex w-max animate-marquee-reverse">
            {[0, 1].map((half) => (
              <div key={half} className="flex items-center gap-10 pr-10">
                {rowB.map((item) => (
                  <span
                    key={`${half}-${item}`}
                    className="flex items-center gap-10 whitespace-nowrap text-sm font-medium tracking-widest text-stone-400"
                  >
                    {item}
                    <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400/70" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
