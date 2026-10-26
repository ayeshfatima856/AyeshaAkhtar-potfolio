"use client";

import { Facebook, Instagram, Linkedin, Dribbble, ArrowUp } from "lucide-react";
import { Link } from "@/lib/router";
import { useProfile } from "./shared";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/websites", label: "Websites" },
  { to: "/graphics", label: "Graphics" },
  { to: "/marketing", label: "Marketing" },
  { to: "/contact", label: "Contact" },
];

export function Footer() {
  const profile = useProfile();
  const year = new Date().getFullYear();

  const socials = [
    { href: profile.facebook, label: "Facebook", Icon: Facebook },
    { href: profile.instagram, label: "Instagram", Icon: Instagram },
    { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: profile.behance, label: "Behance", Icon: Dribbble },
  ].filter((s) => !!s.href);

  return (
    <footer className="relative border-t border-white/8 bg-ink" aria-label="Footer">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <div>
            <p className="font-display text-2xl font-bold text-white">
              {profile.name.split(" ")[0]}
              <span className="text-lime-pop">.</span>
            </p>
            <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-mist">
              {profile.tagline}
            </p>
            {socials.length > 0 && (
              <ul className="mt-5 flex gap-2.5">
                {socials.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${profile.name} on ${label}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-mist transition hover:border-lime-pop/60 hover:text-lime-pop"
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Footer navigation">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-3">
              {NAV.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-[13.5px] text-mist transition hover:text-lime-pop">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-mist transition hover:border-lime-pop/60 hover:text-lime-pop"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 sm:flex-row">
          <p className="text-[12px] text-mist/80">
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="text-[12px] text-mist/60">
            Graphic Design · Social Media · Digital Marketing · Websites
          </p>
        </div>
      </div>
    </footer>
  );
}
