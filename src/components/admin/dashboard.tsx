"use client";

import { useApi } from "@/lib/hooks";
import type { Project, Message } from "@/lib/types";
import { AdminHeader, StatCard, EmptyState } from "./shared";
import { Link } from "@/lib/router";
import {
  FolderKanban, Inbox, Eye, TrendingUp, ArrowRight, Plus,
  Briefcase, Images, UserRound,
} from "lucide-react";

export default function Dashboard() {
  const { data: projData } = useApi<{ projects: Project[] }>("/api/projects?all=1");
  const { data: brandData } = useApi<{ brands: unknown[] }>("/api/brands?all=1");
  const { data: galleryData } = useApi<{ items: unknown[] }>("/api/gallery?all=1");
  const { data: msgData } = useApi<{ messages: Message[] }>("/api/messages");

  const projects = projData?.projects || [];
  const brands = brandData?.brands || [];
  const gallery = galleryData?.items || [];
  const messages = msgData?.messages || [];
  const unread = messages.filter((m) => !m.read).length;
  const published = projects.filter((p) => p.published).length;

  return (
    <div>
      <AdminHeader
        title="Dashboard"
        sub={`Welcome back, Ayesha — here's what's happening with your site today.`}
        action={
          <div className="flex gap-3">
            <Link
              to="/admin/projects"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
            >
              <Plus className="h-4 w-4" /> New project
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:border-violet-400/60 hover:bg-violet-500/10"
            >
              <Eye className="h-4 w-4" /> View site
            </Link>
          </div>
        }
      />

      {/* stats — real counts from the database */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={FolderKanban} label="Website projects" value={projects.length} accent="#4F7CFF" />
        <StatCard icon={Briefcase} label="Brands" value={brands.length} accent="#B8F34A" />
        <StatCard icon={Images} label="Gallery designs" value={gallery.length} accent="#FBBF24" />
        <StatCard icon={Inbox} label="Unread messages" value={unread} accent="#F43F5E" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* recent messages */}
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-white">Recent messages</h3>
            <Link to="/admin/messages" className="inline-flex items-center gap-1 text-[13px] font-semibold text-violet-300 hover:text-white">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {messages.length === 0 ? (
            <EmptyState title="No messages yet" sub="Contact form submissions will appear here." />
          ) : (
            <ul className="space-y-3">
              {messages.slice(0, 5).map((m) => (
                <li
                  key={m.id}
                  className={`rounded-2xl border p-4 transition-colors ${
                    m.read ? "border-white/8 bg-white/[0.02]" : "border-violet-400/25 bg-violet-500/[0.06]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-white">{m.name}</p>
                    {!m.read && <span className="rounded-full bg-violet-500/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-200">new</span>}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{m.email}</p>
                  <p className="mt-2 line-clamp-2 text-[13px] text-foreground/75">{m.message}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* quick manage */}
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="mb-4 font-display text-lg font-bold text-white">Manage content</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { to: "/admin/projects", label: "Website projects", desc: `${projects.length} items`, icon: FolderKanban },
              { to: "/admin/brands", label: "Brands", desc: `${brands.length} brands`, icon: Briefcase },
              { to: "/admin/gallery", label: "Design gallery", desc: `${gallery.length} designs`, icon: Images },
              { to: "/admin/profile", label: "Profile", desc: "Photo, bio, links", icon: UserRound },
              { to: "/admin/messages", label: "Messages", desc: `${messages.length} total`, icon: Inbox },
              { to: "/", label: "View site", desc: "Open public page", icon: Eye },
            ].map((q) => (
              <Link
                key={q.to}
                to={q.to}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-all hover:border-violet-400/40 hover:bg-violet-500/[0.06]"
              >
                <q.icon className="h-5 w-5 text-violet-300" />
                <p className="mt-2.5 text-sm font-bold text-white">{q.label}</p>
                <p className="text-xs text-muted-foreground">{q.desc}</p>
              </Link>
            ))}
          </div>

          <h3 className="mb-4 mt-8 font-display text-lg font-bold text-white">Latest projects</h3>
          <ul className="space-y-2.5">
            {projects.slice(0, 4).map((p) => (
              <li key={p.id} className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.category}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    p.published ? "bg-emerald-500/15 text-emerald-300" : "bg-white/10 text-muted-foreground"
                  }`}
                >
                  {p.published ? "live" : "draft"}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
