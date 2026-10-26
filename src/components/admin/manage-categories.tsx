"use client";

import { useState } from "react";
import { useApi } from "@/lib/hooks";
import { apiSend, type Category } from "@/lib/types";
import { AdminHeader, EmptyState, ConfirmDialog, FormDialog, AdminField, inputCls } from "./shared";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

type Draft = { name: string; kind: string; color: string; sort: string };

const EMPTY: Draft = { name: "", kind: "web", color: "#8B5CF6", sort: "0" };

export default function Categories() {
  const { data, refetch } = useApi<{ categories: Category[] }>("/api/categories");
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [toDelete, setToDelete] = useState<Category | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const categories = data?.categories || [];

  const openCreate = () => {
    setEditing(null);
    setDraft(EMPTY);
    setError("");
    setOpen(true);
  };

  const openEdit = (c: Category) => {
    setEditing(c);
    setDraft({ name: c.name, kind: c.kind, color: c.color, sort: String(c.sort) });
    setError("");
    setOpen(true);
  };

  const save = async () => {
    if (draft.name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const payload = { ...draft, sort: Number(draft.sort) || 0 };
      if (editing) {
        await apiSend(`/api/categories/${editing.id}`, "PUT", payload);
        toast({ title: "Category updated" });
      } else {
        await apiSend("/api/categories", "POST", payload);
        toast({ title: "Category created" });
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
      await apiSend(`/api/categories/${toDelete.id}`, "DELETE");
      toast({ title: "Category deleted" });
      setToDelete(null);
      refetch();
    } catch (e) {
      toast({ title: "Cannot delete", description: e instanceof Error ? e.message : "", variant: "destructive" });
      setToDelete(null);
    } finally {
      setDeleteBusy(false);
    }
  };

  return (
    <div>
      <AdminHeader
        title="Portfolio categories"
        sub="These power the filter chips on the public portfolio page."
        action={
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
          >
            <Plus className="h-4 w-4" /> Add category
          </button>
        }
      />

      {categories.length === 0 ? (
        <EmptyState title="No categories yet" sub="Create your first category to organise projects." />
      ) : (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/8 text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3.5 font-semibold">Category</th>
                <th className="px-5 py-3.5 font-semibold">Track</th>
                <th className="px-5 py-3.5 font-semibold">Color</th>
                <th className="px-5 py-3.5 font-semibold">Order</th>
                <th className="px-5 py-3.5 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id} className="border-b border-white/6 transition-colors last:border-0 hover:bg-white/[0.03]">
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-2.5 font-semibold text-white">
                      <span className="h-3 w-3 rounded-full" style={{ background: c.color }} />
                      {c.name}
                    </span>
                  </td>
                  <td className="px-5 py-4 capitalize text-muted-foreground">{c.kind}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-md bg-white/5 px-2 py-1 font-mono text-xs text-muted-foreground">{c.color}</span>
                  </td>
                  <td className="px-5 py-4 font-mono text-muted-foreground">{c.sort}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => openEdit(c)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-all hover:border-violet-400/60 hover:text-white"
                        title="Edit"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setToDelete(c)}
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
      )}

      <FormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? "Edit category" : "New category"}
        description="Categories appear as filters on the portfolio page."
      >
        <div className="space-y-4 pt-2">
          <AdminField label="Name" error={error}>
            <input
              className={inputCls}
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              placeholder="e.g. Web Development"
            />
          </AdminField>
          <div className="grid gap-4 sm:grid-cols-3">
            <AdminField label="Track">
              <select
                className={inputCls}
                value={draft.kind}
                onChange={(e) => setDraft({ ...draft, kind: e.target.value })}
              >
                <option value="web">Web</option>
                <option value="marketing">Marketing</option>
                <option value="design">Design</option>
              </select>
            </AdminField>
            <AdminField label="Accent color">
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={draft.color}
                  onChange={(e) => setDraft({ ...draft, color: e.target.value })}
                  className="h-10 w-12 cursor-pointer rounded-lg border border-white/10 bg-transparent"
                />
                <input
                  className={inputCls}
                  value={draft.color}
                  onChange={(e) => setDraft({ ...draft, color: e.target.value })}
                />
              </div>
            </AdminField>
            <AdminField label="Sort order">
              <input
                type="number"
                className={inputCls}
                value={draft.sort}
                onChange={(e) => setDraft({ ...draft, sort: e.target.value })}
              />
            </AdminField>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setOpen(false)} className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
              Cancel
            </button>
            <button
              onClick={save}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {editing ? "Save changes" : "Create category"}
            </button>
          </div>
        </div>
      </FormDialog>

      <ConfirmDialog
        open={!!toDelete}
        onOpenChange={(v) => !v && setToDelete(null)}
        title={`Delete “${toDelete?.name}”?`}
        description="Projects using this category will block deletion. This cannot be undone."
        onConfirm={remove}
        busy={deleteBusy}
      />
    </div>
  );
}
