"use client";

import { Link } from "@/lib/router";
import { LogoMark } from "@/components/brand/logo";
import { Instagram, Linkedin, Github, Twitter, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { parseSocials } from "@/lib/types";
import { useApi } from "@/lib/hooks";

const EXPLORE = [
  { label: "Portfolio", to: "/portfolio" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Web Development", to: "/web-development" },
  { label: "Digital Marketing", to: "/digital-marketing" },
  { label: "Services & Pricing", to: "/services" },
  { label: "Blog & Insights", to: "/blog" },
];

const COMPANY = [
  { label: "About Me", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Admin Panel", to: "/admin/login" },
];

export function Footer() {
  const { data } = useApi<{ settings: Record<string, string> }>("/api/settings");
  const socials = parseSocials(data?.settings?.socials);
  const email = data?.settings?.email || "hello@ayeshaakhtar.dev";
  const location = data?.settings?.location || "Remote · Working worldwide";

  const socialLinks = [
    { key: "instagram", icon: Instagram, label: "Instagram" },
    { key: "linkedin", icon: Linkedin, label: "LinkedIn" },
    { key: "github", icon: Github, label: "GitHub" },
    { key: "x", icon: Twitter, label: "X (Twitter)" },
  ].filter((s) => socials[s.key]);

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/10 bg-[#04061394]">
      <div className="pointer-events-none absolute inset-0 bg-aurora opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* brand */}
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="h-10 w-10" />
              <span className="font-display text-xl font-bold text-white">
                Ayesha <span className="text-gradient">Akhtar</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Web developer &amp; digital marketer crafting high-performing websites and
              campaigns that turn attention into revenue.
            </p>
            <div className="mt-5 flex gap-2.5">
              {socialLinks.map((s) => (
                <a
                  key={s.key}
                  href={socials[s.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all hover:border-violet-400/50 hover:text-white hover:bg-violet-500/15"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* explore */}
          <nav aria-label="Explore">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {EXPLORE.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-sweep text-sm text-foreground/80 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* company */}
          <nav aria-label="Company">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {COMPANY.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-sweep inline-flex items-center gap-1 text-sm text-foreground/80 hover:text-white transition-colors">
                    {l.label}
                    {l.to.startsWith("/admin") && <ArrowUpRight className="h-3 w-3 opacity-60" />}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">Get in touch</h3>
            <a
              href={`mailto:${email}`}
              className="mt-4 flex items-center gap-2.5 text-sm text-foreground/85 transition-colors hover:text-white"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-violet-500/15 text-violet-300">
                <Mail className="h-4 w-4" />
              </span>
              {email}
            </a>
            <p className="mt-3 flex items-center gap-2.5 text-sm text-foreground/85">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/15 text-blue-300">
                <MapPin className="h-4 w-4" />
              </span>
              {location}
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
            >
              Start a project <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Ayesha Akhtar. Crafted with care, code &amp; coffee.</p>
          <p className="font-mono">
            demo projects &amp; results shown are{" "}
            <span className="text-amber-300/90">illustrative</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
