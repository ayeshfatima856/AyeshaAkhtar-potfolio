"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/lib/hooks";
import { apiSend } from "@/lib/types";
import { AdminHeader, AdminField, inputCls } from "./shared";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Globe, Home, Share2, BarChart3 } from "lucide-react";

const TABS = [
  { key: "hero", label: "Homepage", icon: Home },
  { key: "seo", label: "SEO & Sharing", icon: Globe },
  { key: "social", label: "Social links", icon: Share2 },
  { key: "stats", label: "Stats", icon: BarChart3 },
] as const;

export default function Settings() {
  const { data, refetch } = useApi<{ settings: Record<string, string> }>("/api/settings");
  const { toast } = useToast();
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("hero");
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (data?.settings) setDraft(data.settings);
  }, [data]);

  const set = (k: string, v: string) => setDraft((d) => ({ ...d, [k]: v }));

  const save = async () => {
    setBusy(true);
    try {
      await apiSend("/api/settings", "PUT", { settings: draft });
      toast({ title: "Settings saved", description: "Changes are live on the website." });
      refetch();
    } catch (e) {
      toast({ title: "Save failed", description: e instanceof Error ? e.message : "", variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const socials = (() => {
    try {
      return JSON.parse(draft.socials || "{}") as Record<string, string>;
    } catch {
      return {};
    }
  })();

  const setSocial = (k: string, v: string) =>
    set("socials", JSON.stringify({ ...socials, [k]: v }));

  return (
    <div>
      <AdminHeader
        title="Site settings"
        sub="Homepage copy, SEO metadata and social links — applied site-wide."
        action={
          <button
            onClick={save}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save all changes
          </button>
        }
      />

      {/* tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              tab === t.key ? "bg-violet-600 text-white" : "border border-white/15 text-muted-foreground hover:text-white"
            }`}
          >
            <t.icon className="h-4 w-4" /> {t.label}
          </button>
        ))}
      </div>

      <div className="max-w-2xl space-y-5 rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
        {tab === "hero" && (
          <>
            <AdminField label="Hero headline" hint="Last two words get the gradient highlight">
              <input className={inputCls} value={draft.heroHeadline || ""} onChange={(e) => set("heroHeadline", e.target.value)} />
            </AdminField>
            <AdminField label="Hero sub-headline">
              <textarea rows={3} className={inputCls + " resize-none"} value={draft.heroSub || ""} onChange={(e) => set("heroSub", e.target.value)} />
            </AdminField>
            <AdminField label="Availability badge">
              <input className={inputCls} value={draft.availability || ""} onChange={(e) => set("availability", e.target.value)} />
            </AdminField>
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="Contact email">
                <input className={inputCls} value={draft.email || ""} onChange={(e) => set("email", e.target.value)} />
              </AdminField>
              <AdminField label="Location line">
                <input className={inputCls} value={draft.location || ""} onChange={(e) => set("location", e.target.value)} />
              </AdminField>
            </div>
          </>
        )}

        {tab === "seo" && (
          <>
            <AdminField label="SEO title" hint="Shows in browser tabs and Google results">
              <input className={inputCls} value={draft.seoTitle || ""} onChange={(e) => set("seoTitle", e.target.value)} />
            </AdminField>
            <AdminField label="Meta description">
              <textarea rows={3} className={inputCls + " resize-none"} value={draft.seoDescription || ""} onChange={(e) => set("seoDescription", e.target.value)} />
            </AdminField>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-[13px] font-medium text-foreground/85">Google result preview</p>
              <div className="mt-3 rounded-xl bg-white p-4">
                <p className="text-[13px] leading-snug text-[#1a0dab]">
                  {draft.seoTitle || "Ayesha Akhtar — Web Developer & Digital Marketer"}
                </p>
                <p className="mt-0.5 text-xs text-[#006621]">ayeshaakhtar.dev</p>
                <p className="mt-1 text-xs leading-relaxed text-[#545454]">
                  {draft.seoDescription || "Premium portfolio of Ayesha Akhtar…"}
                </p>
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Globe className="h-3.5 w-3.5" /> Social share image: <span className="font-mono">/images/site/og-banner.png</span> (update via upload to that path)
              </p>
            </div>
          </>
        )}

        {tab === "social" && (
          <>
            {["instagram", "linkedin", "github", "x"].map((k) => (
              <AdminField key={k} label={k === "x" ? "X (Twitter)" : k.charAt(0).toUpperCase() + k.slice(1)}>
                <input
                  className={inputCls}
                  value={socials[k] || ""}
                  onChange={(e) => setSocial(k, e.target.value)}
                  placeholder={`https://${k === "x" ? "x" : k}.com/your-handle`}
                />
              </AdminField>
            ))}
          </>
        )}

        {tab === "stats" && (
          <>
            <p className="text-[13px] text-muted-foreground">
              These power the animated counters on the homepage (clearly marked as illustrative demo figures).
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="Projects delivered">
                <input className={inputCls} value={draft.statProjects || ""} onChange={(e) => set("statProjects", e.target.value)} />
              </AdminField>
              <AdminField label="Happy clients">
                <input className={inputCls} value={draft.statClients || ""} onChange={(e) => set("statClients", e.target.value)} />
              </AdminField>
              <AdminField label="Campaigns managed">
                <input className={inputCls} value={draft.statCampaigns || ""} onChange={(e) => set("statCampaigns", e.target.value)} />
              </AdminField>
              <AdminField label="Avg. ROAS" hint="e.g. 4.2x">
                <input className={inputCls} value={draft.statRoas || ""} onChange={(e) => set("statRoas", e.target.value)} />
              </AdminField>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
