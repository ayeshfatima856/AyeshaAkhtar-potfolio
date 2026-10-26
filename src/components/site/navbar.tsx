"use client";

import { useEffect, useState } from "react";
import { Link, useRoute } from "@/lib/router";
import { Logo, LogoMark } from "@/components/brand/logo";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Web Dev", to: "/web-development" },
  { label: "Marketing", to: "/digital-marketing" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Services", to: "/services" },
  { label: "Blog", to: "/blog" },
];

export function Navbar() {
  const route = useRoute();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isActive = (to: string) =>
    to === "/" ? route === "/" : route.startsWith(to);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="h-[2.5px] origin-left bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400"
      />
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-[#05081A]/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 lg:px-8" aria-label="Main navigation">
          <Link to="/" aria-label="Ayesha Akhtar — home">
            <Logo compact={scrolled} className="transition-all" />
          </Link>

            {/* desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
                  isActive(n.to)
                    ? "bg-white/8 text-white"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="group hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_8px_30px_-8px_rgba(139,92,246,0.6)] transition-all hover:shadow-[0_8px_36px_-6px_rgba(139,92,246,0.8)] hover:brightness-110 sm:inline-flex"
            >
              Let&apos;s Talk
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="border-b border-white/10 bg-[#070B21]/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="grid gap-1 px-5 py-5">
              {NAV.map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium ${
                      isActive(n.to) ? "bg-violet-500/15 text-white" : "text-muted-foreground"
                    }`}
                  >
                    {n.label}
                    <ArrowUpRight className="h-4 w-4 opacity-50" />
                  </Link>
                </motion.div>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3.5 text-[15px] font-semibold text-white"
              >
                <LogoMark className="h-5 w-5" /> Let&apos;s Build Something Amazing
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
