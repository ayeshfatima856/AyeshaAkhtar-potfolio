"use client";

import { useRoute, navigate } from "@/lib/router";
import { useApi, useMediaQuery } from "@/lib/hooks";
import { LogoMark } from "@/components/brand/logo";
import {
  LayoutDashboard, FolderKanban, Briefcase, Images, UserRound,
  Inbox, LogOut, Menu, X, ExternalLink, Loader2,
} from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";
import { apiSend } from "@/lib/types";
import { Link } from "@/lib/router";
import { cn } from "@/lib/utils";

/* ================= LOGIN ================= */

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Login failed");
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 bg-grid px-5">
      <div className="pointer-events-none fixed inset-0 bg-aurora" aria-hidden="true" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <LogoMark className="h-14 w-14 glow-purple rounded-2xl" />
          <h1 className="font-display text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Sign in to manage your portfolio</p>
        </div>
        <form onSubmit={submit} className="glass-strong rounded-3xl p-7 shadow-2xl">
          <label className="mb-1.5 block text-[13px] font-medium text-foreground/85" htmlFor="admin-email">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@ayeshaakhtar.com"
            className="mb-4 w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-muted-foreground/50 outline-none transition-all focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20"
          />
          <label className="mb-1.5 block text-[13px] font-medium text-foreground/85" htmlFor="admin-password">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••"
            className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-muted-foreground/50 outline-none transition-all focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20"
          />
          {error && (
            <p className="mt-3 rounded-xl border border-rose-400/25 bg-rose-500/10 px-4 py-2.5 text-[13px] text-rose-300" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-60"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {busy ? "Signing in…" : "Sign in"}
          </button>
          <p className="mt-5 text-center font-mono text-[11px] leading-relaxed text-muted-foreground/70">
            demo credentials<br />
            <span className="text-foreground/70">admin@ayeshaakhtar.com</span> · <span className="text-foreground/70">Ayesha@2026</span>
          </p>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link to="/" className="link-sweep inline-flex items-center gap-1.5">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ================= SHELL ================= */

const NAV_ITEMS = [
  { key: "overview", label: "Dashboard", icon: LayoutDashboard },
  { key: "projects", label: "Website Projects", icon: FolderKanban },
  { key: "brands", label: "Brands", icon: Briefcase },
  { key: "gallery", label: "Design Gallery", icon: Images },
  { key: "profile", label: "Profile", icon: UserRound },
  { key: "messages", label: "Messages", icon: Inbox },
];

function Shell({
  section, children, adminName, onLogout,
}: {
  section: string; children: ReactNode; adminName: string; onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-5 py-6">
        <LogoMark className="h-9 w-9" />
        <div>
          <p className="font-display text-[15px] font-bold text-white">Ayesha Admin</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">control room</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4 scroll-thin" aria-label="Admin sections">
        {NAV_ITEMS.map((n) => (
          <Link
            key={n.key}
            to={n.key === "overview" ? "/admin" : `/admin/${n.key}`}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-2.5 text-[14px] font-medium transition-all",
              section === n.key
                ? "bg-gradient-to-r from-violet-600/25 to-blue-600/15 text-white shadow-[inset_0_0_0_1px_rgba(139,92,246,0.3)]"
                : "text-muted-foreground hover:bg-white/5 hover:text-white"
            )}
          >
            <n.icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
            {n.label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-white/8 p-3">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-[14px] font-medium text-muted-foreground transition-all hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="h-[18px] w-[18px]" /> View website
        </Link>
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-[14px] font-medium text-rose-300/90 transition-all hover:bg-rose-500/10 hover:text-rose-200"
        >
          <LogOut className="h-[18px] w-[18px]" /> Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-navy-950">
      {/* desktop sidebar */}
      {isDesktop && (
        <aside className="sticky top-0 h-screen w-[264px] shrink-0 border-r border-white/8 bg-[#070B21]/80">
          {sidebar}
        </aside>
      )}

      {/* mobile drawer */}
      {!isDesktop && open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
          <aside className="absolute left-0 top-0 h-full w-[280px] border-r border-white/10 bg-[#070B21] shadow-2xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:text-white"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* topbar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/8 bg-[#05081A]/85 px-5 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            {!isDesktop && (
              <button
                onClick={() => setOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
            <h2 className="font-display text-lg font-bold text-white">
              {NAV_ITEMS.find((n) => n.key === section)?.label || "Dashboard"}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:block">
              Hi, <span className="font-semibold text-white">{adminName}</span>
            </span>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-xs font-bold text-white">
              AA
            </span>
          </div>
        </header>

        <main className="min-w-0 flex-1 p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

/* ================= ROOT ================= */

function Redirect({ to }: { to: string }) {
  useEffect(() => {
    navigate(to);
  }, [to]);
  return null;
}

export default function AdminApp() {
  const route = useRoute();
  const { name, param } = matchRouteSafe(route);
  const { data: me, loading } = useApi<{
    authenticated: boolean;
    admin?: { name: string; email: string };
  }>("/api/auth/me");

  const logout = async () => {
    await apiSend("/api/auth/logout", "POST").catch(() => {});
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-950">
        <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
      </div>
    );
  }

  // login route
  if (name === "admin-login") {
    if (me?.authenticated) return <Redirect to="/admin" />;
    return <Login onSuccess={() => window.location.reload()} />;
  }

  // protected area
  if (!me?.authenticated) {
    return <Login onSuccess={() => window.location.reload()} />;
  }

  return (
    <Shell section={param || "overview"} adminName={me.admin?.name || "Ayesha"} onLogout={logout}>
      <AdminSection section={param || "overview"} />
    </Shell>
  );
}

function matchRouteSafe(route: string) {
  const path = route.split("?")[0];
  const seg = path.split("/").filter(Boolean);
  if (seg[0] === "admin" && seg[1] === "login") return { name: "admin-login" as const };
  if (seg[0] === "admin") return { name: "admin" as const, param: seg[1] ?? "overview" };
  return { name: "admin-login" as const };
}

function AdminSection({ section }: { section: string }) {
  const map: Record<string, ReactNode> = {
    overview: <OverviewLazy />,
    projects: <ProjectsLazy />,
    brands: <BrandsLazy />,
    gallery: <GalleryLazy />,
    profile: <ProfileLazy />,
    messages: <MessagesLazy />,
  };
  return <>{map[section] ?? <OverviewLazy />}</>;
}

/* section components are imported below to avoid circulars */
import OverviewLazy from "./dashboard";
import ProjectsLazy from "./manage-projects";
import BrandsLazy from "./manage-brands";
import GalleryLazy from "./manage-gallery";
import ProfileLazy from "./manage-profile";
import MessagesLazy from "./manage-messages";
