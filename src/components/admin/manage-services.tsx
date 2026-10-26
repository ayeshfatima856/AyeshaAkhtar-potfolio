"use client";

import { useState } from "react";
import { useApi } from "@/lib/hooks";
import { apiSend, type ServicePackage } from "@/lib/types";
import { AdminHeader, EmptyState, ConfirmDialog, FormDialog, AdminField, ToggleRow, inputCls } from "./shared";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, Sparkles, Check } from "lucide-react";

type Draft = {
  name: string; tier: string; kind: string; price: string; period: string;
  tagline: string; features: string[]; highlighted: boolean; active: boolean; sort: string;
};

const EMPTY: Draft = {
  name: "", tier: "starter", kind: "web", price: "", period: "per project",
  tagline: "", features: [""], highlighted: false, active: true, sort: "0",
};

export default function Services() {
  const { data, refetch } = useApi<{ services: ServicePackage[] }>("/api/services?all=1");
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ServicePackage | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [toDelete, setToDelete] = useState<ServicePackage | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const services = data?.services || [];
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => ({ ...d, [k]: v }));

  const openCreate = () => {
    setEditing(null);
    setDraft(EMPTY);
    setError("");
    setOpen(true);
  };

  const openEdit = (s: ServicePackage) => {
    setEditing(s);
    let features: string[] = [];
    try { features = JSON.parse(s.features); } catch { /* noop */ }
    setDraft({
      name: s.name, tier: s.tier, kind: s.kind, price: s.price, period: s.period || "",
      tagline: s.tagline || "", features: features.length ? features : [""],
      highlighted: s.highlighted, active: s.active, sort: String(s.sort),
    });
    setError("");
    setOpen(true);
  };

  const save = async () => {
    if (draft.name.trim().length < 2) return setError("Name is required");
    if (!draft.price.trim()) return setError("Price is required");
    setBusy(true);
    setError("");
    try {
      const payload = {
        ...draft,
        features: JSON.stringify(draft.features.filter((f) => f.trim())),
        sort: Number(draft.sort) || 0,
      };
      if (editing) {
        await apiSend(`/api/services/${editing.id}`, "PUT", payload);
        toast({ title: "Package updated" });
      } else {
        await apiSend("/api/services", "POST", payload);
        toast({ title: "Package created" });
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
      await apiSend(`/api/services/${toDelete.id}`, "DELETE");
      toast({ title: "Package deleted" });
      setToDelete(null);
      refetch();
    } finally {
      setDeleteBusy(false);
    }
  };

  const groups: { key: string; title: string; items: ServicePackage[] }[] = [
    { key: "web", title: "Website packages", items: services.filter((s) => s.kind === "web") },
    { key: "marketing", title: "Marketing retainers", items: services.filter((s) => s.kind === "marketing") },
    { key: "bundle", title: "Bundles", items: services.filter((s) => s.kind === "bundle") },
  ];

  return (
    <div>
      <AdminHeader
        title="Services & pricing"
        sub="Manage the packages shown on the public services page."
        action={
          <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110">
            <Plus className="h-4 w-4" /> New package
          </button>
        }
      />

      {services.length === 0 ? (
        <EmptyState title="No packages yet" sub="Create your first service package." />
      ) : (
        <div className="space-y-8">
          {groups.filter((g) => g.items.length).map((g) => (
            <section key={g.key}>
              <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">{g.title}</h3>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {g.items.map((s) => (
                  <div
                    key={s.id}
                    className={`card-hover relative flex flex-col rounded-3xl border p-6 ${
                      s.highlighted ? "border-violet-400/40 bg-gradient-to-b from-violet-600/12 to-blue-600/6" : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="font-display text-base font-bold text-white">{s.name}</h4>
                      {s.highlighted && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-200">
                          <Sparkles className="h-3 w-3" /> popular
                        </span>
                      )}
                    </div>
                    <div className="mt-3 flex items-baseline gap-1.5">
                      <span className="font-display text-2xl font-extrabold text-gradient">{s.price}</span>
                      <span className="text-xs text-muted-foreground">{s.period}</span>
                    </div>
                    <ul className="mt-4 flex-1 space-y-1.5">
                      {(() => {
                        let feats: string[] = [];
                        try { feats = JSON.parse(s.features); } catch { /* noop */ }
                        return feats.slice(0, 5).map((f) => (
                          <li key={f} className="flex items-center gap-2 text-[12.5px] text-foreground/75">
                            <Check className="h-3 w-3 shrink-0 text-emerald-300" /> {f}
                          </li>
                        ));
                      })()}
                    </ul>
                    <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${s.active ? "bg-emerald-500/15 text-emerald-300" : "bg-white/10 text-muted-foreground"}`}>
                        {s.active ? "active" : "hidden"}
                      </span>
                      <div className="flex gap-1.5">
                        <button onClick={() => openEdit(s)} className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-all hover:border-violet-400/60 hover:text-white" title="Edit">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => setToDelete(s)} className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-all hover:border-rose-400/60 hover:text-rose-300" title="Delete">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <FormDialog open={open} onOpenChange={setOpen} title={editing ? "Edit package" : "New package"} maxWidth="max-w-2xl">
        <div className="space-y-4 pt-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Name *" error={error && error.includes("Name") ? error : undefined}>
              <input className={inputCls} value={draft.name} onChange={(e) => set("name", e.target.value)} placeholder="Business Website" />
            </AdminField>
            <AdminField label="Price *" error={error && error.includes("Price") ? error : undefined}>
              <input className={inputCls} value={draft.price} onChange={(e) => set("price", e.target.value)} placeholder="$1,299" />
            </AdminField>
          </div>
          <div className="grid gap-4 sm:grid-cols-4">
            <AdminField label="Track">
              <select className={inputCls} value={draft.kind} onChange={(e) => set("kind", e.target.value)}>
                <option value="web">Web</option>
                <option value="marketing">Marketing</option>
                <option value="bundle">Bundle</option>
              </select>
            </AdminField>
            <AdminField label="Tier">
              <select className={inputCls} value={draft.tier} onChange={(e) => set("tier", e.target.value)}>
                <option value="starter">Starter</option>
                <option value="growth">Growth</option>
                <option value="scale">Scale</option>
                <option value="custom">Custom</option>
              </select>
            </AdminField>
            <AdminField label="Period">
              <input className={inputCls} value={draft.period} onChange={(e) => set("period", e.target.value)} placeholder="per project" />
            </AdminField>
            <AdminField label="Sort order">
              <input type="number" className={inputCls} value={draft.sort} onChange={(e) => set("sort", e.target.value)} />
            </AdminField>
          </div>
          <AdminField label="Tagline">
            <input className={inputCls} value={draft.tagline} onChange={(e) => set("tagline", e.target.value)} />
          </AdminField>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-[13px] font-medium text-foreground/85">Features</label>
              <button type="button" onClick={() => set("features", [...draft.features, ""])} className="rounded-full bg-white/8 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-500/25">
                + Add feature
              </button>
            </div>
            <div className="space-y-2">
              {draft.features.map((f, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    className={inputCls}
                    value={f}
                    placeholder="Up to 8 custom pages"
                    onChange={(e) => set("features", draft.features.map((x, j) => (j === i ? e.target.value : x)))}
                  />
                  <button
                    type="button"
                    onClick={() => set("features", draft.features.filter((_, j) => j !== i))}
                    className="inline-flex w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-muted-foreground hover:border-rose-400/60 hover:text-rose-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <ToggleRow label="Most popular" checked={draft.highlighted} onChange={(v) => set("highlighted", v)} />
            <ToggleRow label="Active" checked={draft.active} onChange={(v) => set("active", v)} />
          </div>
          <div className="flex justify-end gap-3 pt-1">
            <button onClick={() => setOpen(false)} className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
              Cancel
            </button>
            <button onClick={save} disabled={busy} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60">
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {editing ? "Save changes" : "Create package"}
            </button>
          </div>
        </div>
      </FormDialog>

      <ConfirmDialog
        open={!!toDelete}
        onOpenChange={(v) => !v && setToDelete(null)}
        title={`Delete “${toDelete?.name}”?`}
        description="It will disappear from the pricing page immediately."
        onConfirm={remove}
        busy={deleteBusy}
      />
    </div>
  );
}
