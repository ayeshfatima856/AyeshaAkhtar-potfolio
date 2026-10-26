"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { useRoute, Link } from "@/lib/router";
import { useProfile } from "./shared";
import type { MouseEvent } from "react";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/websites", label: "Websites" },
  { to: "/graphics", label: "Graphics" },
  { to: "/marketing", label: "Marketing" },
  { to: "/contact", label: "Contact" },
];

function isActive(route: string, to: string): boolean {
  if (to === "/") return route === "/" || route === "" || !["websites", "graphics", "marketing", "contact"].includes(route.split("/").filter(Boolean)[0] ?? "");
  return route === to || route.startsWith(`${to}/`);
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const route = useRoute();
  const profile = useProfile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile menu when any nav link is clicked
  const closeMenu = (e: MouseEvent<HTMLAnchorElement>) => setOpen(false);
  const linkProps = { onClick: closeMenu };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-white/8 bg-ink/90 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8" aria-label="Main navigation">
        <Link
          to="/"
          className="group flex items-center gap-2.5"
          aria-label={`${profile.name} — home`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-iris to-iris-deep font-display text-sm font-bold text-white shadow-lg shadow-iris/40">
            A
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            {profile.name.split(" ")[0]}
            <span className="text-lime-pop">.</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                {...linkProps}
                aria-current={isActive(route, l.to) ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-[13.5px] font-medium transition ${
                  isActive(route, l.to)
                    ? "bg-white/10 text-white"
                    : "text-mist hover:bg-white/6 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Link to="/contact" className="btn-iris px-5 py-2.5 text-[13.5px]">
            Let&apos;s Work Together <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-white transition hover:bg-white/10 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/8 bg-ink/97 backdrop-blur-xl lg:hidden">
          <ul className="space-y-1 px-5 py-4">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`block w-full rounded-xl px-4 py-3 text-left text-[15px] font-medium transition ${
                    isActive(route, l.to) ? "bg-white/10 text-white" : "text-mist hover:bg-white/6 hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link to="/contact" {...linkProps} className="btn-iris w-full px-5 py-3 text-sm">
                Let&apos;s Work Together <ArrowRight className="h-4 w-4" />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
