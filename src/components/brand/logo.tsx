import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("h-9 w-9", className)} aria-hidden="true">
      <defs>
        <linearGradient id="lg-mark" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#A855F7" />
          <stop offset="0.55" stopColor="#4F7CFF" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#lg-mark)" />
      <path
        d="M19 47 L32 15 L45 47"
        fill="none"
        stroke="#ffffff"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M32 34 L35.5 40.5 L32 47 L28.5 40.5 Z" fill="#ffffff" opacity="0.95" />
      <circle cx="32" cy="40.5" r="2.6" fill="#22D3EE" />
    </svg>
  );
}

export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <LogoMark className={compact ? "h-8 w-8" : "h-9 w-9"} />
      {!compact && (
        <span className="font-display leading-none">
          <span className="block text-[15px] font-bold tracking-tight text-white">
            Ayesha<span className="text-gradient"> Akhtar</span>
          </span>
          <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
            dev × marketing
          </span>
        </span>
      )}
    </span>
  );
}
