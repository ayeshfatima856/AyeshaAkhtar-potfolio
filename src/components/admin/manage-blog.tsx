"use client";

import { useState } from "react";
import { useApi } from "@/lib/hooks";
import { apiSend, type BlogPost } from "@/lib/types";
import {
  AdminHeader, EmptyState, ConfirmDialog, FormDialog, AdminField,
  ToggleRow, ImagePicker, inputCls,
} from "./shared";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff, ExternalLink } from "lucide-react";
import { Link } from "@/lib/router";

type Draft = {
  title: string; slug: string; excerpt: string; content: string;
  cover: string; tags: string; readTime: string; published: boolean;
};

const EMPTY: Draft = {
  title: "", slug: "", excerpt: "", content: "",
  cover: "", tags: "", readTime: "5", published: true,
};

export default function Blog() {
  const { data, refetch } = useApi<{ posts: BlogPost[] }>("/api/blog?all=1");
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [toDelete, setToDelete] = useState<BlogPost | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const posts = data?.posts || [];
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => ({ ...d, [k]: v }));

  const openCreate = () => {
    setEditing(null);
    setDraft(EMPTY);
    setErrors({});
    setOpen(true);
  };

  const openEdit = (p: BlogPost) => {
    setEditing(p);
    setDraft({
      title: p.title, slug: p.slug, excerpt: p.excerpt, content: p.content,
      cover: p.cover || "", tags: p.tags, readTime: String(p.readTime), published: p.published,
    });
    setErrors({});
    setOpen(true);
  };

  const save = async () => {
    const e: Record<string, string> = {};
    if (draft.title.trim().length < 3) e.title = "Title is required";
    if (!draft.excerpt.trim()) e.excerpt = "Excerpt is required";
    if (draft.content.trim().length < 30) e.content = "Content must be at least 30 characters";
    setErrors(e);
    if (Object.keys(e).length) return;

    setBusy(true);
    try {
      const payload = { ...draft, readTime: Number(draft.readTime) || 5 };
      if (editing) {
        await apiSend(`/api/blog/${editing.id}`, "PUT", payload);
        toast({ title: "Post updated" });
      } else {
        await apiSend("/api/blog", "POST", payload);
        toast({ title: "Post published" });
      }
      setOpen(false);
      refetch();
    } catch (err) {
      toast({ title: "Save failed", description: err instanceof Error ? err.message : "", variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const toggle = async (p: BlogPost) => {
    await apiSend(`/api/blog/${p.id}`, "PUT", { published: !p.published }).catch(() => {});
    refetch();
  };

  const remove = async () => {
    if (!toDelete) return;
    setDeleteBusy(true);
    try {
      await apiSend(`/api/blog/${toDelete.id}`, "DELETE");
      toast({ title: "Post deleted" });
      setToDelete(null);
      refetch();
    } catch (err) {
      toast({ title: "Delete failed", description: err instanceof Error ? err.message : "", variant: "destructive" });
    } finally {
      setDeleteBusy(false);
    }
  };

  return (
    <div>
      <AdminHeader
        title="Blog posts"
        sub="Write insights with Markdown — headings, lists, links and emphasis."
        action={
          <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110">
            <Plus className="h-4 w-4" /> New post
          </button>
        }
      />

      {posts.length === 0 ? (
        <EmptyState title="No posts yet" sub="Share your first insight — it builds authority with clients." />
      ) : (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
          <div className="overflow-x-auto scroll-thin">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/8 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3.5 font-semibold">Post</th>
                  <th className="px-5 py-3.5 font-semibold">Tags</th>
                  <th className="px-5 py-3.5 font-semibold">Status</th>
                  <th className="px-5 py-3.5 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p.id} className="border-b border-white/6 transition-colors last:border-0 hover:bg-white/[0.03]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3.5">
                        {p.cover && <img src={p.cover} alt="" className="h-11 w-16 shrink-0 rounded-lg object-cover" />}
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-white">{p.title}</p>
                          <p className="text-xs text-muted-foreground">{p.readTime} min · {new Date(p.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs text-muted-foreground">{p.tags.split(",").filter(Boolean).join(" · ")}</td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => toggle(p)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
                          p.published ? "bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25" : "bg-white/10 text-muted-foreground hover:bg-white/15"
                        }`}
                      >
                        {p.published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        {p.published ? "Live" : "Draft"}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1.5">
                        <Link
                          to={`/blog/${p.slug}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-all hover:border-cyan-400/60 hover:text-cyan-300"
                          title="View public page"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                        <button onClick={() => openEdit(p)} title="Edit" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-all hover:border-violet-400/60 hover:text-white">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => setToDelete(p)} title="Delete" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-all hover:border-rose-400/60 hover:text-rose-300">
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

      <FormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? "Edit post" : "New blog post"}
        description="Use Markdown: ## headings, **bold**, [links](/blog), - lists."
        maxWidth="max-w-3xl"
      >
        <div className="space-y-4 pt-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Title *" error={errors.title}>
              <input className={inputCls} value={draft.title} onChange={(e) => set("title", e.target.value)} />
            </AdminField>
            <AdminField label="Slug" hint="Auto from title if empty">
              <input className={inputCls} value={draft.slug} onChange={(e) => set("slug", e.target.value)} />
            </AdminField>
          </div>
          <AdminField label="Excerpt *" error={errors.excerpt}>
            <textarea rows={2} className={inputCls + " resize-none"} value={draft.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
          </AdminField>
          <AdminField label="Content (Markdown) *" error={errors.content}>
            <textarea rows={12} className={inputCls + " font-mono text-[13px] leading-relaxed"} value={draft.content} onChange={(e) => set("content", e.target.value)} />
          </AdminField>
          <div className="grid gap-4 sm:grid-cols-3">
            <AdminField label="Tags" hint="Comma separated">
              <input className={inputCls} value={draft.tags} onChange={(e) => set("tags", e.target.value)} placeholder="seo, marketing" />
            </AdminField>
            <AdminField label="Read time (min)">
              <input type="number" className={inputCls} value={draft.readTime} onChange={(e) => set("readTime", e.target.value)} />
            </AdminField>
            <div className="flex items-end">
              <div className="w-full"><ToggleRow label="Published" checked={draft.published} onChange={(v) => set("published", v)} /></div>
            </div>
          </div>
          <ImagePicker value={draft.cover} onChange={(v) => set("cover", v)} label="Cover image" />
          <div className="flex justify-end gap-3 pt-1">
            <button onClick={() => setOpen(false)} className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
              Cancel
            </button>
            <button onClick={save} disabled={busy} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60">
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {editing ? "Save changes" : "Publish post"}
            </button>
          </div>
        </div>
      </FormDialog>

      <ConfirmDialog
        open={!!toDelete}
        onOpenChange={(v) => !v && setToDelete(null)}
        title={`Delete “${toDelete?.title}”?`}
        description="This permanently removes the post. This cannot be undone."
        onConfirm={remove}
        busy={deleteBusy}
      />
    </div>
  );
}
