"use client";

import { useState } from "react";
import { useApi } from "@/lib/hooks";
import { apiSend, type Testimonial } from "@/lib/types";
import { AdminHeader, EmptyState, ConfirmDialog, FormDialog, AdminField, ToggleRow, inputCls } from "./shared";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, Star, Quote } from "lucide-react";

type Draft = {
  name: string; role: string; company: string; quote: string;
  rating: number; published: boolean; isDemo: boolean;
};

const EMPTY: Draft = {
  name: "", role: "", company: "", quote: "", rating: 5, published: true, isDemo: true,
};

export default function Testimonials() {
  const { data, refetch } = useApi<{ testimonials: Testimonial[] }>("/api/testimonials");
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [toDelete, setToDelete] = useState<Testimonial | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const testimonials = data?.testimonials || [];
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => ({ ...d, [k]: v }));

  const openCreate = () => {
    setEditing(null);
    setDraft(EMPTY);
    setError("");
    setOpen(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setDraft({
      name: t.name, role: t.role, company: t.company || "", quote: t.quote,
      rating: t.rating, published: t.published, isDemo: t.isDemo,
    });
    setError("");
    setOpen(true);
  };

  const save = async () => {
    if (draft.name.trim().length < 2) return setError("Name is required");
    if (draft.quote.trim().length < 10) return setError("Quote must be at least 10 characters");
    setBusy(true);
    setError("");
    try {
      if (editing) {
        await apiSend(`/api/testimonials/${editing.id}`, "PUT", draft);
        toast({ title: "Testimonial updated" });
      } else {
        await apiSend("/api/testimonials", "POST", draft);
        toast({ title: "Testimonial added" });
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
      await apiSend(`/api/testimonials/${toDelete.id}`, "DELETE");
      toast({ title: "Testimonial deleted" });
      setToDelete(null);
      refetch();
    } finally {
      setDeleteBusy(false);
    }
  };

  return (
    <div>
      <AdminHeader
        title="Testimonials"
        sub="Quotes shown on the home page. Keep the demo label on until quotes are real."
        action={
          <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110">
            <Plus className="h-4 w-4" /> Add testimonial
          </button>
        }
      />

      {testimonials.length === 0 ? (
        <EmptyState title="No testimonials yet" sub="Add client quotes — they're social proof for your services." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.id} className="card-hover flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-start justify-between">
                <Quote className="h-6 w-6 text-violet-400/50" />
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-foreground/80">“{t.quote}”</p>
              <div className="mt-4 flex items-center gap-3 border-t border-white/8 pt-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-[11px] font-bold text-white">
                  {t.initials || t.name.slice(0, 2).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{t.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{t.role}{t.company ? ` · ${t.company}` : ""}</p>
                </div>
                {t.isDemo && (
                  <span className="rounded-full bg-amber-500/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-amber-300">demo</span>
                )}
              </div>
              <div className="mt-4 flex gap-1.5">
                <button onClick={() => openEdit(t)} className="flex-1 rounded-full border border-white/10 py-2 text-xs font-semibold text-white transition-all hover:border-violet-400/60 hover:bg-violet-500/10">
                  Edit
                </button>
                <button onClick={() => setToDelete(t)} className="inline-flex items-center justify-center rounded-full border border-white/10 px-3 py-2 text-muted-foreground transition-all hover:border-rose-400/60 hover:text-rose-300">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <FormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? "Edit testimonial" : "New testimonial"}
        maxWidth="max-w-xl"
      >
        <div className="space-y-4 pt-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Name *" error={error && error.includes("Name") ? error : undefined}>
              <input className={inputCls} value={draft.name} onChange={(e) => set("name", e.target.value)} placeholder="Sarah Mitchell" />
            </AdminField>
            <AdminField label="Role">
              <input className={inputCls} value={draft.role} onChange={(e) => set("role", e.target.value)} placeholder="Founder" />
            </AdminField>
          </div>
          <AdminField label="Company">
            <input className={inputCls} value={draft.company} onChange={(e) => set("company", e.target.value)} placeholder="Lumière Luxe (demo client)" />
          </AdminField>
          <AdminField label="Quote *" error={error && error.includes("Quote") ? error : undefined}>
            <textarea rows={4} className={inputCls + " resize-none"} value={draft.quote} onChange={(e) => set("quote", e.target.value)} />
          </AdminField>
          <AdminField label="Rating">
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => set("rating", r)}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                    r <= draft.rating ? "bg-amber-400/20 text-amber-300" : "border border-white/10 text-muted-foreground hover:text-white"
                  }`}
                >
                  <Star className={`h-4.5 w-4.5 h-[18px] w-[18px] ${r <= draft.rating ? "fill-amber-300" : ""}`} />
                </button>
              ))}
            </div>
          </AdminField>
          <div className="grid gap-3 sm:grid-cols-2">
            <ToggleRow label="Published" checked={draft.published} onChange={(v) => set("published", v)} />
            <ToggleRow label="Demo label" checked={draft.isDemo} onChange={(v) => set("isDemo", v)} />
          </div>
          <div className="flex justify-end gap-3 pt-1">
            <button onClick={() => setOpen(false)} className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
              Cancel
            </button>
            <button onClick={save} disabled={busy} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60">
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {editing ? "Save changes" : "Add testimonial"}
            </button>
          </div>
        </div>
      </FormDialog>

      <ConfirmDialog
        open={!!toDelete}
        onOpenChange={(v) => !v && setToDelete(null)}
        title={`Delete quote from ${toDelete?.name}?`}
        description="This cannot be undone."
        onConfirm={remove}
        busy={deleteBusy}
      />
    </div>
  );
}
