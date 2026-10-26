"use client";

import { useState } from "react";
import { useApi } from "@/lib/hooks";
import { apiSend } from "@/lib/types";
import { AdminHeader, EmptyState, ConfirmDialog, FormDialog, AdminField, ToggleRow, ImagePicker, inputCls } from "./shared";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, Sparkles } from "lucide-react";

interface GalleryRow {
  id: string; title: string; category: string; imageUrl: string;
  caption: string | null; isSample: boolean; sort: number; published: boolean;
}

type Draft = {
  title: string; category: string; imageUrl: string;
  caption: string; isSample: boolean; sort: number; published: boolean;
};

const EMPTY: Draft = {
  title: "", category: "Social Media Posts", imageUrl: "",
  caption: "", isSample: false, sort: 10, published: true,
};

const FALLBACK_CATS = [
  "Social Media Posts", "Advertising Creatives", "Branding", "Product Designs",
  "Restaurant & Food", "Real Estate", "Fashion", "Website Design", "Other Creative Work",
];

export default function ManageGallery() {
  const { data, refetch } = useApi<{ items: GalleryRow[]; categories: string[] }>("/api/gallery?all=1");
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryRow | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [toDelete, setToDelete] = useState<GalleryRow | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const items = data?.items || [];
  const categories = data?.categories?.filter((c) => c !== "All Projects" && c !== "All") || FALLBACK_CATS;
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => ({ ...d, [k]: v }));

  const openCreate = () => {
    setEditing(null);
    setDraft(EMPTY);
    setError("");
    setOpen(true);
  };

  const openEdit = (g: GalleryRow) => {
    setEditing(g);
    setDraft({
      title: g.title, category: g.category, imageUrl: g.imageUrl,
      caption: g.caption || "", isSample: g.isSample, sort: g.sort ?? 10, published: g.published,
    });
    setError("");
    setOpen(true);
  };

  const save = async () => {
    if (!draft.imageUrl) return setError("Please upload or choose an image");
    setBusy(true);
    setError("");
    try {
      if (editing) {
        await apiSend(`/api/gallery/${editing.id}`, "PUT", draft);
        toast({ title: "Gallery item updated" });
      } else {
        await apiSend("/api/gallery", "POST", draft);
        toast({ title: "Added to gallery" });
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
      await apiSend(`/api/gallery/${toDelete.id}`, "DELETE");
      toast({ title: "Gallery item deleted" });
      setToDelete(null);
      refetch();
    } finally {
      setDeleteBusy(false);
    }
  };

  return (
    <div>
      <AdminHeader
        title="Design Gallery"
        sub="Upload graphics, previews and creative work. Keep the Sample badge on for AI-generated placeholders."
        action={
          <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110">
            <Plus className="h-4 w-4" /> Add design
          </button>
        }
      />

      {items.length === 0 ? (
        <EmptyState title="Gallery is empty" sub="Upload your first design — it appears in the public gallery immediately." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((g) => (
            <article key={g.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="relative h-40 overflow-hidden bg-white/5">
                { }
                <img src={g.imageUrl} alt={g.title || "Gallery image"} className="h-full w-full object-cover object-top" />
                {g.isSample && (
                  <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-bold uppercase text-white backdrop-blur">
                    <Sparkles className="h-3 w-3" /> Sample
                  </span>
                )}
                {!g.published && (
                  <span className="absolute right-2 top-2 rounded-full bg-rose-500/85 px-2 py-0.5 text-[10px] font-bold uppercase text-white">Hidden</span>
                )}
              </div>
              <div className="p-4">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-violet-300">{g.category}</p>
                <p className="mt-1 line-clamp-1 font-display text-[14px] font-bold text-white">{g.title || "Untitled"}</p>
                {g.caption && <p className="mt-0.5 line-clamp-1 text-[12px] text-muted-foreground">{g.caption}</p>}
                <div className="mt-3 flex items-center justify-between border-t border-white/8 pt-3">
                  <span className="text-[11px] text-muted-foreground/60">sort {g.sort}</span>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(g)} className="rounded-lg p-2 text-muted-foreground transition hover:bg-white/10 hover:text-white" aria-label={`Edit ${g.title}`}>
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => setToDelete(g)} className="rounded-lg p-2 text-muted-foreground transition hover:bg-rose-500/15 hover:text-rose-400" aria-label={`Delete ${g.title}`}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <FormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? "Edit gallery item" : "Add gallery item"}
        description="Upload from your device (max 8 MB — JPG, PNG, WebP, GIF, SVG)."
      >
        <div className="space-y-4">
          <AdminField label="Design image *">
            <ImagePicker value={draft.imageUrl} onChange={(v) => set("imageUrl", v)} label="" />
          </AdminField>

          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Title">
              <input className={inputCls} value={draft.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Burger Promo Poster" />
            </AdminField>
            <AdminField label="Category">
              <select className={inputCls} value={draft.category} onChange={(e) => set("category", e.target.value)}>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </AdminField>
          </div>

          <AdminField label="Caption (optional)">
            <input className={inputCls} value={draft.caption} onChange={(e) => set("caption", e.target.value)} />
          </AdminField>

          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Sort order">
              <input type="number" className={inputCls} value={draft.sort} onChange={(e) => set("sort", Number(e.target.value))} />
            </AdminField>
            <div className="flex flex-col justify-center gap-2 pt-4">
              <ToggleRow label="Sample visual (AI/placeholder)" checked={draft.isSample} onChange={(v) => set("isSample", v)} />
              <ToggleRow label="Published (visible)" checked={draft.published} onChange={(v) => set("published", v)} />
            </div>
          </div>

          {error && <p className="rounded-xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p>}

          <div className="flex justify-end gap-3 pt-1">
            <button onClick={() => setOpen(false)} className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
              Cancel
            </button>
            <button onClick={save} disabled={busy} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60">
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {editing ? "Save changes" : "Add design"}
            </button>
          </div>
        </div>
      </FormDialog>

      <ConfirmDialog
        open={!!toDelete}
        onOpenChange={(v) => !v && setToDelete(null)}
        title="Delete this gallery item?"
        description="It disappears from the public gallery immediately. This cannot be undone."
        onConfirm={remove}
        busy={deleteBusy}
      />
    </div>
  );
}
