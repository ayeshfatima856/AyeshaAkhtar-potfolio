"use client";

import { useState } from "react";
import { useApi } from "@/lib/hooks";
import { apiSend } from "@/lib/types";
import { AdminHeader, EmptyState, ConfirmDialog, FormDialog, AdminField, ToggleRow, ImagePicker, inputCls } from "./shared";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, ExternalLink, Star, Layers } from "lucide-react";

interface BrandRow {
  id: string; name: string; industry: string; description: string;
  logoUrl: string | null; facebookUrl: string | null; instagramUrl: string | null;
  websiteUrl: string | null; images: string; layout: string; accent: string;
  isOwnBrand: boolean; featured: boolean; showInSocial: boolean;
  showInWebsites: boolean; role: string; scope: string;
  objectives: string | null; creativeDirection: string | null;
  sort: number; published: boolean;
}

type Draft = {
  name: string; industry: string; description: string; logoUrl: string;
  facebookUrl: string; instagramUrl: string; websiteUrl: string;
  images: string[]; layout: string; accent: string;
  isOwnBrand: boolean; featured: boolean; showInSocial: boolean;
  showInWebsites: boolean; role: string; scope: string;
  objectives: string; creativeDirection: string; sort: number; published: boolean;
};

const EMPTY: Draft = {
  name: "", industry: "", description: "", logoUrl: "",
  facebookUrl: "", instagramUrl: "", websiteUrl: "",
  images: [""], layout: "profile", accent: "#5B5CF0",
  isOwnBrand: false, featured: false, showInSocial: true, showInWebsites: false,
  role: "", scope: "", objectives: "", creativeDirection: "", sort: 10, published: true,
};

const LAYOUTS = ["banner", "profile", "collage", "mockup", "editorial", "own"];

function parseImages(v: string | null | undefined): string[] {
  if (!v) return [];
  try {
    const arr = JSON.parse(v);
    return Array.isArray(arr) ? arr.map(String) : [];
  } catch { return []; }
}

export default function ManageBrands() {
  const { data, refetch } = useApi<{ brands: BrandRow[] }>("/api/brands?all=1");
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BrandRow | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [toDelete, setToDelete] = useState<BrandRow | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const brands = data?.brands || [];
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => ({ ...d, [k]: v }));

  const openCreate = () => {
    setEditing(null);
    setDraft(EMPTY);
    setError("");
    setOpen(true);
  };

  const openEdit = (b: BrandRow) => {
    setEditing(b);
    setDraft({
      name: b.name, industry: b.industry, description: b.description,
      logoUrl: b.logoUrl || "", facebookUrl: b.facebookUrl || "",
      instagramUrl: b.instagramUrl || "", websiteUrl: b.websiteUrl || "",
      images: parseImages(b.images).length ? parseImages(b.images) : [""],
      layout: b.layout || "profile", accent: b.accent || "#5B5CF0",
      isOwnBrand: b.isOwnBrand, featured: b.featured,
      showInSocial: b.showInSocial, showInWebsites: b.showInWebsites,
      role: b.role || "", scope: b.scope || "",
      objectives: b.objectives || "", creativeDirection: b.creativeDirection || "",
      sort: b.sort ?? 10, published: b.published,
    });
    setError("");
    setOpen(true);
  };

  const save = async () => {
    if (draft.name.trim().length < 2) return setError("Brand name is required");
    setBusy(true);
    setError("");
    try {
      const payload = {
        ...draft,
        images: JSON.stringify(draft.images.filter(Boolean)),
        logoUrl: draft.logoUrl || null,
      };
      if (editing) {
        await apiSend(`/api/brands/${editing.id}`, "PUT", payload);
        toast({ title: "Brand updated" });
      } else {
        await apiSend("/api/brands", "POST", payload);
        toast({ title: "Brand added" });
      }
      setOpen(false);
      refetch();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!toDelete) return;
    setDeleteBusy(true);
    try {
      await apiSend(`/api/brands/${toDelete.id}`, "DELETE");
      toast({ title: "Brand deleted" });
      setToDelete(null);
      refetch();
    } finally {
      setDeleteBusy(false);
    }
  };

  return (
    <div>
      <AdminHeader
        title="Brands"
        sub="Client brands and your own brand. Changes appear on the public site instantly."
        action={
          <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110">
            <Plus className="h-4 w-4" /> Add brand
          </button>
        }
      />

      {brands.length === 0 ? (
        <EmptyState title="No brands yet" sub="Add your first client brand — it will appear in the Brands section." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {brands.map((b) => (
            <article key={b.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {b.logoUrl ? (
                     
                    <img src={b.logoUrl} alt={`${b.name} logo`} className="h-11 w-11 rounded-xl bg-white/5 object-contain p-1" />
                  ) : (
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl font-display text-sm font-bold text-white"
                      style={{ background: b.accent || "#5B5CF0" }}
                    >
                      {b.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                  <div>
                    <p className="font-display text-[15px] font-bold text-white">{b.name}</p>
                    <p className="text-[11.5px] text-muted-foreground">{b.industry}</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => openEdit(b)} className="rounded-lg p-2 text-muted-foreground transition hover:bg-white/10 hover:text-white" aria-label={`Edit ${b.name}`}>
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => setToDelete(b)} className="rounded-lg p-2 text-muted-foreground transition hover:bg-rose-500/15 hover:text-rose-400" aria-label={`Delete ${b.name}`}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="mt-3 line-clamp-2 text-[12.5px] leading-relaxed text-muted-foreground">{b.description}</p>

              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {b.isOwnBrand && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-lime-400/15 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide text-lime-300">
                    <Star className="h-3 w-3" /> Own brand
                  </span>
                )}
                {b.showInSocial && <span className="rounded-full bg-white/8 px-2.5 py-1 text-[10.5px] font-semibold text-foreground/80">Social</span>}
                {b.showInWebsites && <span className="rounded-full bg-white/8 px-2.5 py-1 text-[10.5px] font-semibold text-foreground/80">Website</span>}
                {!b.published && <span className="rounded-full bg-rose-500/15 px-2.5 py-1 text-[10.5px] font-semibold text-rose-300">Hidden</span>}
                <span className="inline-flex items-center gap-1 rounded-full bg-white/8 px-2.5 py-1 text-[10.5px] font-semibold text-foreground/70">
                  <Layers className="h-3 w-3" /> {b.layout}
                </span>
              </div>

              <div className="mt-3.5 flex flex-wrap gap-2 border-t border-white/8 pt-3.5 text-[11.5px]">
                {b.facebookUrl && (
                  <a href={b.facebookUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted-foreground transition hover:text-white">
                    <ExternalLink className="h-3 w-3" /> FB
                  </a>
                )}
                {b.instagramUrl && (
                  <a href={b.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted-foreground transition hover:text-white">
                    <ExternalLink className="h-3 w-3" /> IG
                  </a>
                )}
                {b.websiteUrl && (
                  <a href={b.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted-foreground transition hover:text-white">
                    <ExternalLink className="h-3 w-3" /> Web
                  </a>
                )}
                <span className="ml-auto text-muted-foreground/60">sort {b.sort}</span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* form dialog */}
      <FormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? `Edit — ${editing.name}` : "Add brand"}
        description="Links must be full URLs (https://…). Uploaded images are stored on the server."
      >
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Brand name *">
              <input className={inputCls} value={draft.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Stampare" />
            </AdminField>
            <AdminField label="Industry">
              <input className={inputCls} value={draft.industry} onChange={(e) => set("industry", e.target.value)} placeholder="e.g. Real Estate" />
            </AdminField>
          </div>

          <AdminField label="Short description" hint="Shown on the brand card">
            <textarea rows={3} className={inputCls + " resize-none"} value={draft.description} onChange={(e) => set("description", e.target.value)} />
          </AdminField>

          <div className="grid gap-4 sm:grid-cols-3">
            <AdminField label="Facebook URL">
              <input className={inputCls} value={draft.facebookUrl} onChange={(e) => set("facebookUrl", e.target.value)} placeholder="https://facebook.com/…" />
            </AdminField>
            <AdminField label="Instagram URL">
              <input className={inputCls} value={draft.instagramUrl} onChange={(e) => set("instagramUrl", e.target.value)} placeholder="https://instagram.com/…" />
            </AdminField>
            <AdminField label="Website URL">
              <input className={inputCls} value={draft.websiteUrl} onChange={(e) => set("websiteUrl", e.target.value)} placeholder="https://…" />
            </AdminField>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <AdminField label="Card layout" hint="Different visual per brand">
              <select className={inputCls} value={draft.layout} onChange={(e) => set("layout", e.target.value)}>
                {LAYOUTS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </AdminField>
            <AdminField label="Accent color">
              <div className="flex gap-2">
                <input type="color" value={draft.accent} onChange={(e) => set("accent", e.target.value)} className="h-11 w-12 cursor-pointer rounded-lg border border-white/10 bg-transparent" aria-label="Accent color" />
                <input className={inputCls} value={draft.accent} onChange={(e) => set("accent", e.target.value)} />
              </div>
            </AdminField>
            <AdminField label="Sort order" hint="Lower shows first">
              <input type="number" className={inputCls} value={draft.sort} onChange={(e) => set("sort", Number(e.target.value))} />
            </AdminField>
          </div>

          <AdminField label="Logo (optional)">
            <ImagePicker value={draft.logoUrl} onChange={(v) => set("logoUrl", v)} label="" />
          </AdminField>

          <AdminField label="Project images" hint="Shown in the card and case study gallery">
            <div className="space-y-3">
              {draft.images.map((img, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="flex-1">
                    <ImagePicker
                      value={img}
                      label=""
                      onChange={(v) => set("images", draft.images.map((x, xi) => (xi === i ? v : x)))}
                    />
                  </div>
                  {draft.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => set("images", draft.images.filter((_, xi) => xi !== i))}
                      className="mt-1 rounded-lg p-2 text-muted-foreground transition hover:bg-rose-500/15 hover:text-rose-400"
                      aria-label="Remove image"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => set("images", [...draft.images, ""])}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                <Plus className="h-3.5 w-3.5" /> Add image
              </button>
            </div>
          </AdminField>

          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Role label" hint='e.g. "Social Media & Creative Design"'>
              <input className={inputCls} value={draft.role} onChange={(e) => set("role", e.target.value)} />
            </AdminField>
            <AdminField label="Scope label" hint='e.g. "Social Media Management · Ad Creatives"'>
              <input className={inputCls} value={draft.scope} onChange={(e) => set("scope", e.target.value)} />
            </AdminField>
          </div>

          <AdminField label="Case study — objectives">
            <textarea rows={2} className={inputCls + " resize-none"} value={draft.objectives} onChange={(e) => set("objectives", e.target.value)} />
          </AdminField>
          <AdminField label="Case study — creative direction">
            <textarea rows={2} className={inputCls + " resize-none"} value={draft.creativeDirection} onChange={(e) => set("creativeDirection", e.target.value)} />
          </AdminField>

          <div className="grid gap-2 sm:grid-cols-2">
            <ToggleRow label="Show in Brands (social) section" checked={draft.showInSocial} onChange={(v) => set("showInSocial", v)} />
            <ToggleRow label="Also show in Websites section" checked={draft.showInWebsites} onChange={(v) => set("showInWebsites", v)} />
            <ToggleRow label="This is my own brand (not a client)" checked={draft.isOwnBrand} onChange={(v) => set("isOwnBrand", v)} />
            <ToggleRow label="Featured" checked={draft.featured} onChange={(v) => set("featured", v)} />
            <ToggleRow label="Published (visible on site)" checked={draft.published} onChange={(v) => set("published", v)} />
          </div>

          {error && <p className="rounded-xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p>}

          <div className="flex justify-end gap-3 pt-1">
            <button onClick={() => setOpen(false)} className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
              Cancel
            </button>
            <button onClick={save} disabled={busy} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60">
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {editing ? "Save changes" : "Add brand"}
            </button>
          </div>
        </div>
      </FormDialog>

      <ConfirmDialog
        open={!!toDelete}
        onOpenChange={(v) => !v && setToDelete(null)}
        title={`Delete ${toDelete?.name}?`}
        description="This removes the brand from the public site. This cannot be undone."
        onConfirm={remove}
        busy={deleteBusy}
      />
    </div>
  );
}
