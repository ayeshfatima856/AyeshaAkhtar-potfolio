 
"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/lib/hooks";
import { apiSend, type Project, type Category } from "@/lib/types";
import {
  AdminHeader, EmptyState, ConfirmDialog, FormDialog, AdminField,
  ToggleRow, ImagePicker, inputCls,
} from "./shared";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff, Star, ExternalLink } from "lucide-react";
import { Link } from "@/lib/router";

type Metric = { label: string; value: number; suffix: string };
type Result = { label: string; value: string; hint?: string };

type Draft = {
  title: string; slug: string; category: string; track: string;
  tagline: string; description: string; overview: string; tools: string;
  results: Result[]; metrics: Metric[]; challenge: string; solution: string;
  image: string; liveUrl: string; socialUrl: string;
  role: string; industry: string; showcase: boolean;
  featured: boolean; published: boolean; demo: boolean;
};

const INDUSTRY_GROUPS = [
  "Healthcare & Medical",
  "Travel & Hospitality",
  "E-commerce & Retail",
  "Café & Coffee",
  "Restaurants & Food",
  "Home & Technical Services",
  "Other Industries",
];

const EMPTY: Draft = {
  title: "", slug: "", category: "Web Development", track: "web",
  tagline: "", description: "", overview: "", tools: "",
  results: [{ label: "", value: "", hint: "" }],
  metrics: [{ label: "", value: 0, suffix: "%" }],
  challenge: "", solution: "", image: "", liveUrl: "", socialUrl: "",
  role: "", industry: "", showcase: false,
  featured: false, published: true, demo: true,
};

function toDraft(p: Project): Draft {
  let results: Result[] = [];
  let metrics: Metric[] = [];
  try { results = p.results ? JSON.parse(p.results) : []; } catch { /* noop */ }
  try { metrics = p.metrics ? JSON.parse(p.metrics) : []; } catch { /* noop */ }
  return {
    title: p.title, slug: p.slug, category: p.category, track: p.track,
    tagline: p.tagline, description: p.description, overview: p.overview || "",
    tools: p.tools, results, metrics,
    challenge: p.challenge || "", solution: p.solution || "",
    image: p.image, liveUrl: p.liveUrl || "", socialUrl: p.socialUrl || "",
    role: p.role || "", industry: p.industry || "", showcase: !!p.showcase,
    featured: p.featured, published: p.published, demo: p.demo,
  };
}

export default function Projects() {
  const { data, refetch } = useApi<{ projects: Project[] }>("/api/projects?all=1");
  const { data: catData } = useApi<{ categories: Category[] }>("/api/categories");
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [toDelete, setToDelete] = useState<Project | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const projects = data?.projects || [];
  const categories = catData?.categories || [];

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  const openCreate = () => {
    setEditing(null);
    setDraft(EMPTY);
    setErrors({});
    setOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setDraft(toDraft(p));
    setErrors({});
    setOpen(true);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (draft.title.trim().length < 2) e.title = "Title is required";
    if (!draft.tagline.trim()) e.tagline = "Tagline is required";
    if (draft.description.trim().length < 10) e.description = "Short description required (min 10 chars)";
    if (!draft.image && !draft.showcase) e.image = "Please pick a cover image";
    if (draft.showcase && !draft.industry.trim()) e.industry = "Industry group is required for showcase sites";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = async () => {
    if (!validate()) return;
    setBusy(true);
    try {
      const payload = {
        ...draft,
        results: JSON.stringify(draft.results.filter((r) => r.label && r.value)),
        metrics: JSON.stringify(draft.metrics.filter((m) => m.label)),
      };
      if (editing) {
        await apiSend(`/api/projects/${editing.id}`, "PUT", payload);
        toast({ title: "Project updated" });
      } else {
        await apiSend("/api/projects", "POST", payload);
        toast({ title: "Project created" });
      }
      setOpen(false);
      refetch();
    } catch (err) {
      toast({ title: "Save failed", description: err instanceof Error ? err.message : "", variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const togglePublished = async (p: Project) => {
    await apiSend(`/api/projects/${p.id}`, "PUT", { published: !p.published }).catch(() => {});
    refetch();
  };

  const toggleFeatured = async (p: Project) => {
    await apiSend(`/api/projects/${p.id}`, "PUT", { featured: !p.featured }).catch(() => {});
    refetch();
  };

  const remove = async () => {
    if (!toDelete) return;
    setDeleteBusy(true);
    try {
      await apiSend(`/api/projects/${toDelete.id}`, "DELETE");
      toast({ title: "Project deleted" });
      setToDelete(null);
      refetch();
    } catch (e) {
      toast({ title: "Delete failed", description: e instanceof Error ? e.message : "", variant: "destructive" });
    } finally {
      setDeleteBusy(false);
    }
  };

  return (
    <div>
      <AdminHeader
        title="Projects"
        sub="Add, edit, publish and feature your portfolio case studies."
        action={
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
          >
            <Plus className="h-4 w-4" /> New project
          </button>
        }
      />

      {projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          sub="Create your first case study — it will appear on the home page and portfolio."
          action={
            <button onClick={openCreate} className="rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white">
              Create project
            </button>
          }
        />
      ) : (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
          <div className="overflow-x-auto scroll-thin">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/8 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3.5 font-semibold">Project</th>
                  <th className="px-5 py-3.5 font-semibold">Category</th>
                  <th className="px-5 py-3.5 font-semibold">Status</th>
                  <th className="px-5 py-3.5 font-semibold">Featured</th>
                  <th className="px-5 py-3.5 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id} className="border-b border-white/6 transition-colors last:border-0 hover:bg-white/[0.03]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3.5">
                        <img src={p.image} alt="" className="h-11 w-16 shrink-0 rounded-lg object-cover" />
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-white">{p.title}</p>
                          <p className="truncate text-xs text-muted-foreground">{p.tagline}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-white/6 px-3 py-1 text-xs text-foreground/80" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                        {p.category}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => togglePublished(p)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
                          p.published ? "bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25" : "bg-white/10 text-muted-foreground hover:bg-white/15"
                        }`}
                      >
                        {p.published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        {p.published ? "Live" : "Draft"}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => toggleFeatured(p)}
                        title="Toggle featured"
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                          p.featured ? "bg-amber-400/20 text-amber-300" : "border border-white/10 text-muted-foreground hover:text-white"
                        }`}
                      >
                        <Star className={`h-4 w-4 ${p.featured ? "fill-amber-300" : ""}`} />
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1.5">
                        <Link
                          to={`/project/${p.slug}`}
                          title="View public page"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-all hover:border-cyan-400/60 hover:text-cyan-300"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          onClick={() => openEdit(p)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-all hover:border-violet-400/60 hover:text-white"
                          title="Edit"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setToDelete(p)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-all hover:border-rose-400/60 hover:text-rose-300"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* editor */}
      <FormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? `Edit “${editing.title}”` : "New project"}
        description="Fields marked * are required. Metrics & results power the animated numbers."
        maxWidth="max-w-3xl"
      >
        <div className="space-y-5 pt-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Title *" error={errors.title}>
              <input className={inputCls} value={draft.title} onChange={(e) => set("title", e.target.value)} placeholder="Lumière Luxe" />
            </AdminField>
            <AdminField label="Slug" hint="Auto-generated from title if empty">
              <input className={inputCls} value={draft.slug} onChange={(e) => set("slug", e.target.value)} placeholder="lumiere-luxe" />
            </AdminField>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Category *">
              <select className={inputCls} value={draft.category} onChange={(e) => set("category", e.target.value)}>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
                {!categories.length && <option value="Web Development">Web Development</option>}
              </select>
            </AdminField>
            <AdminField label="Track *">
              <select className={inputCls} value={draft.track} onChange={(e) => set("track", e.target.value)}>
                <option value="web">Web</option>
                <option value="marketing">Marketing</option>
                <option value="design">Design</option>
              </select>
            </AdminField>
          </div>

          <AdminField label="Tagline *" error={errors.tagline}>
            <input className={inputCls} value={draft.tagline} onChange={(e) => set("tagline", e.target.value)} placeholder="Headless e-commerce for a premium fashion house" />
          </AdminField>

          <AdminField label="Short description *" error={errors.description}>
            <textarea rows={2} className={inputCls + " resize-none"} value={draft.description} onChange={(e) => set("description", e.target.value)} />
          </AdminField>

          <AdminField label="Full overview" hint="Shown on the project detail page">
            <textarea rows={3} className={inputCls + " resize-none"} value={draft.overview} onChange={(e) => set("overview", e.target.value)} />
          </AdminField>

          <AdminField label="Tools & tech *" hint="Comma separated — e.g. Next.js, Tailwind CSS, Stripe">
            <input className={inputCls} value={draft.tools} onChange={(e) => set("tools", e.target.value)} />
          </AdminField>

          <ImagePicker value={draft.image} onChange={(v) => set("image", v)} />

          <div className="grid gap-3 sm:grid-cols-2">
            <AdminField label="Live website URL" hint="Real client sites — powers the LIVE badge, scrolling preview & visit button">
              <input className={inputCls} placeholder="https://example.com" value={draft.liveUrl} onChange={(e) => set("liveUrl", e.target.value)} />
            </AdminField>
            <AdminField label="Social page URL" hint="Facebook page or Instagram profile link">
              <input className={inputCls} placeholder="https://facebook.com/page" value={draft.socialUrl} onChange={(e) => set("socialUrl", e.target.value)} />
            </AdminField>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <AdminField label="Role label" hint="Shown as the badge on the card — e.g. Website Showcase">
              <input className={inputCls} placeholder="Website Showcase" value={draft.role} onChange={(e) => set("role", e.target.value)} />
            </AdminField>
            <AdminField label="Industry group" error={errors.industry} hint="Used to auto-organize the Website Showcase">
              <input
                className={inputCls}
                list="industry-groups"
                placeholder="e.g. Restaurants & Food"
                value={draft.industry}
                onChange={(e) => set("industry", e.target.value)}
              />
              <datalist id="industry-groups">
                {INDUSTRY_GROUPS.map((g) => <option key={g} value={g} />)}
              </datalist>
            </AdminField>
          </div>

          {/* metrics */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-[13px] font-medium text-foreground/85">Animated metrics *</label>
              <button
                type="button"
                onClick={() => set("metrics", [...draft.metrics, { label: "", value: 0, suffix: "%" }])}
                className="inline-flex items-center gap-1 rounded-full bg-white/8 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-500/25"
              >
                <Plus className="h-3 w-3" /> Add metric
              </button>
            </div>
            <div className="space-y-2">
              {draft.metrics.map((m, i) => (
                <div key={i} className="grid grid-cols-[1fr_90px_70px_36px] gap-2">
                  <input className={inputCls} placeholder="Label (e.g. ROAS)" value={m.label}
                    onChange={(e) => set("metrics", draft.metrics.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} />
                  <input className={inputCls} type="number" step="0.1" placeholder="Value" value={m.value}
                    onChange={(e) => set("metrics", draft.metrics.map((x, j) => j === i ? { ...x, value: Number(e.target.value) } : x))} />
                  <input className={inputCls} placeholder="Suffix" value={m.suffix}
                    onChange={(e) => set("metrics", draft.metrics.map((x, j) => j === i ? { ...x, suffix: e.target.value } : x))} />
                  <button type="button" onClick={() => set("metrics", draft.metrics.filter((_, j) => j !== i))}
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 text-muted-foreground hover:border-rose-400/60 hover:text-rose-300">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* results */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-[13px] font-medium text-foreground/85">Key results list</label>
              <button
                type="button"
                onClick={() => set("results", [...draft.results, { label: "", value: "", hint: "" }])}
                className="inline-flex items-center gap-1 rounded-full bg-white/8 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-500/25"
              >
                <Plus className="h-3 w-3" /> Add result
              </button>
            </div>
            <div className="space-y-2">
              {draft.results.map((r, i) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_1.2fr_36px] gap-2">
                  <input className={inputCls} placeholder="Label" value={r.label}
                    onChange={(e) => set("results", draft.results.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} />
                  <input className={inputCls} placeholder="+64%" value={r.value}
                    onChange={(e) => set("results", draft.results.map((x, j) => j === i ? { ...x, value: e.target.value } : x))} />
                  <input className={inputCls} placeholder="Hint (optional)" value={r.hint || ""}
                    onChange={(e) => set("results", draft.results.map((x, j) => j === i ? { ...x, hint: e.target.value } : x))} />
                  <button type="button" onClick={() => set("results", draft.results.filter((_, j) => j !== i))}
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 text-muted-foreground hover:border-rose-400/60 hover:text-rose-300">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="The challenge">
              <textarea rows={3} className={inputCls + " resize-none"} value={draft.challenge} onChange={(e) => set("challenge", e.target.value)} />
            </AdminField>
            <AdminField label="The solution">
              <textarea rows={3} className={inputCls + " resize-none"} value={draft.solution} onChange={(e) => set("solution", e.target.value)} />
            </AdminField>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ToggleRow label="In Website Showcase" checked={draft.showcase} onChange={(v) => set("showcase", v)} />
            <ToggleRow label="Featured" checked={draft.featured} onChange={(v) => set("featured", v)} />
            <ToggleRow label="Published" checked={draft.published} onChange={(v) => set("published", v)} />
            <ToggleRow label="Demo project" checked={draft.demo} onChange={(v) => set("demo", v)} />
          </div>

          <div className="flex justify-end gap-3 pt-1">
            <button onClick={() => setOpen(false)} className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
              Cancel
            </button>
            <button
              onClick={save}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {editing ? "Save changes" : "Create project"}
            </button>
          </div>
        </div>
      </FormDialog>

      <ConfirmDialog
        open={!!toDelete}
        onOpenChange={(v) => !v && setToDelete(null)}
        title={`Delete “${toDelete?.title}”?`}
        description="This permanently removes the project from the website. This cannot be undone."
        onConfirm={remove}
        busy={deleteBusy}
      />
    </div>
  );
}
