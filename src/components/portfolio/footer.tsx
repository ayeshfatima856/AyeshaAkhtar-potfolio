import { ArrowUp } from "lucide-react";

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto border-t border-white/5 bg-stone-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-5 px-5 py-10 sm:px-8 md:flex-row">
        <a
          href="#top"
          className="font-display text-lg font-extrabold tracking-tight text-stone-50"
        >
          ayesha<span className="text-gradient">.akhtar</span>
        </a>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-xs text-stone-500 transition-colors hover:text-fuchsia-300"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <p className="text-center text-xs text-stone-500">
            © {year} Ayesha Akhtar · Crafted with Next.js & Tailwind CSS
          </p>
          <a
            href="#top"
            aria-label="Back to top"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-stone-300 transition-colors hover:border-fuchsia-400/50 hover:text-fuchsia-300"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
