"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/lib/hooks";
import { apiSend } from "@/lib/types";
import { AdminHeader, AdminField, ImagePicker, inputCls } from "./shared";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, UserRound } from "lucide-react";

interface ProfileRow {
  name: string; title: string; tagline: string; heroHeadline: string; heroSub: string;
  bio: string; approach: string; philosophy: string; photoUrl: string | null;
  email: string | null; whatsapp: string | null; location: string | null;
  facebook: string | null; instagram: string | null; linkedin: string | null; behance: string | null;
}

export default function ManageProfile() {
  const { data } = useApi<{ profile: ProfileRow | null }>("/api/profile");
  const { toast } = useToast();
  const [draft, setDraft] = useState<ProfileRow | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (data?.profile && !draft) setDraft(data.profile);
  }, [data, draft]);

  if (!draft) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-7 w-7 animate-spin text-violet-400" />
      </div>
    );
  }

  const set = <K extends keyof ProfileRow>(k: K, v: ProfileRow[K]) =>
    setDraft((d) => (d ? { ...d, [k]: v } : d));

  const save = async () => {
    if (!draft.name.trim()) return setError("Name is required");
    setBusy(true);
    setError("");
    try {
      await apiSend("/api/profile", "PUT", draft);
      toast({ title: "Profile saved — live on the public site" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <AdminHeader
        title="Profile"
        sub="Your name, headline, story, photo and social links — used across the hero, about and footer."
        action={
          <button onClick={save} disabled={busy} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* photo card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="mb-4 flex items-center gap-2 font-display text-[15px] font-bold text-white">
            <UserRound className="h-4.5 w-4.5 text-violet-400" /> Your photo
          </p>
          <ImagePicker
            value={draft.photoUrl || ""}
            onChange={(v) => set("photoUrl", v)}
            label="Appears in the hero and about sections"
          />
          <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">
            Use a real, high-quality portrait. The site never generates an AI face for you.
          </p>
        </div>

        {/* fields */}
        <div className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Name">
              <input className={inputCls} value={draft.name} onChange={(e) => set("name", e.target.value)} />
            </AdminField>
            <AdminField label="Title line (roles)">
              <input className={inputCls} value={draft.title} onChange={(e) => set("title", e.target.value)} />
            </AdminField>
          </div>

          <AdminField label="Tagline">
            <input className={inputCls} value={draft.tagline} onChange={(e) => set("tagline", e.target.value)} />
          </AdminField>

          <AdminField label="Hero headline">
            <input className={inputCls} value={draft.heroHeadline} onChange={(e) => set("heroHeadline", e.target.value)} />
          </AdminField>

          <AdminField label="Hero sub-headline">
            <textarea rows={2} className={inputCls + " resize-none"} value={draft.heroSub} onChange={(e) => set("heroSub", e.target.value)} />
          </AdminField>

          <AdminField label="About — bio">
            <textarea rows={4} className={inputCls + " resize-none"} value={draft.bio} onChange={(e) => set("bio", e.target.value)} />
          </AdminField>

          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="About — creative approach">
              <textarea rows={3} className={inputCls + " resize-none"} value={draft.approach} onChange={(e) => set("approach", e.target.value)} />
            </AdminField>
            <AdminField label="About — design philosophy">
              <textarea rows={3} className={inputCls + " resize-none"} value={draft.philosophy} onChange={(e) => set("philosophy", e.target.value)} />
            </AdminField>
          </div>

          <div className="border-t border-white/8 pt-5">
            <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Contact & social links (only shown when filled)
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="Email">
                <input className={inputCls} value={draft.email || ""} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
              </AdminField>
              <AdminField label="WhatsApp">
                <input className={inputCls} value={draft.whatsapp || ""} onChange={(e) => set("whatsapp", e.target.value)} placeholder="+92 …" />
              </AdminField>
              <AdminField label="Facebook">
                <input className={inputCls} value={draft.facebook || ""} onChange={(e) => set("facebook", e.target.value)} placeholder="https://facebook.com/…" />
              </AdminField>
              <AdminField label="Instagram">
                <input className={inputCls} value={draft.instagram || ""} onChange={(e) => set("instagram", e.target.value)} placeholder="https://instagram.com/…" />
              </AdminField>
              <AdminField label="LinkedIn">
                <input className={inputCls} value={draft.linkedin || ""} onChange={(e) => set("linkedin", e.target.value)} />
              </AdminField>
              <AdminField label="Behance">
                <input className={inputCls} value={draft.behance || ""} onChange={(e) => set("behance", e.target.value)} />
              </AdminField>
            </div>
          </div>

          {error && <p className="rounded-xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p>}

          <div className="flex justify-end">
            <button onClick={save} disabled={busy} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
