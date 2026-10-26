 
"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ImagePlus, Loader2, Inbox, Link2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminHeader({
  title, sub, action,
}: {
  title: string; sub?: string; action?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">{title}</h1>
        {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  icon: Icon, label, value, accent = "#8B5CF6",
}: {
  icon: typeof Inbox; label: string; value: string | number; accent?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full blur-2xl"
        style={{ background: `${accent}30` }}
        aria-hidden="true"
      />
      <Icon className="h-5 w-5" style={{ color: accent }} />
      <p className="mt-3 font-display text-3xl font-extrabold text-white">{value}</p>
      <p className="mt-0.5 text-[12.5px] text-muted-foreground">{label}</p>
    </div>
  );
}

export function EmptyState({
  title, sub, action,
}: {
  title: string; sub?: string; action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-white/15 px-6 py-16 text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-muted-foreground">
        <Inbox className="h-6 w-6" />
      </span>
      <h3 className="mt-4 font-display text-lg font-bold text-white">{title}</h3>
      {sub && <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{sub}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ConfirmDialog({
  open, onOpenChange, title, description, onConfirm, busy,
}: {
  open: boolean; onOpenChange: (v: boolean) => void;
  title: string; description: string;
  onConfirm: () => void; busy?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm bg-[#0B1130] border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-white/15 bg-transparent text-white hover:bg-white/10">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={busy}
            className="bg-rose-600 text-white hover:bg-rose-500"
          >
            {busy && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function FormDialog({
  open, onOpenChange, title, description, children, maxWidth = "max-w-2xl",
}: {
  open: boolean; onOpenChange: (v: boolean) => void;
  title: string; description?: string; children: ReactNode; maxWidth?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("max-h-[90vh] overflow-y-auto bg-[#0B1130] border-white/10 scroll-thin", maxWidth)}>
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
          {description && <DialogDescription className="text-muted-foreground">{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

/* ---------- image picker: upload (resized to dataURL) or paste URL ---------- */

export function ImagePicker({
  value, onChange, label = "Cover image",
}: {
  value: string; onChange: (v: string) => void; label?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [showUrl, setShowUrl] = useState(false);

  const handleFile = async (file: File) => {
    setBusy(true);
    try {
      const dataUrl = await resizeImage(file, 1600, 0.85);
      onChange(dataUrl);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <label className="mb-2 block text-[13px] font-medium text-foreground/85">{label}</label>
      <div
        className="relative flex min-h-[150px] items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.03] transition-colors hover:border-violet-400/50"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const f = e.dataTransfer.files?.[0];
          if (f && f.type.startsWith("image/")) handleFile(f);
        }}
      >
        {value ? (
          <>
            <img src={value} alt="Selected cover" className="max-h-[220px] w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-black/80"
            >
              Remove
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            {busy ? (
              <Loader2 className="h-6 w-6 animate-spin text-violet-400" />
            ) : (
              <ImagePlus className="h-7 w-7 text-muted-foreground" />
            )}
            <p className="text-[13px] text-muted-foreground">
              {busy ? "Processing…" : "Drag & drop an image, or"}
            </p>
            {!busy && (
              <label className="cursor-pointer rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white transition-all hover:border-violet-400/60 hover:bg-violet-500/10">
                <span className="inline-flex items-center gap-1.5">
                  <Upload className="h-3.5 w-3.5" /> Upload file
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                  }}
                />
              </label>
            )}
          </div>
        )}
      </div>
      <div className="mt-2">
        {showUrl ? (
          <div className="flex gap-2">
            <Input
              placeholder="https://… or /images/…"
              value={value.startsWith("data:") ? "" : value}
              onChange={(e) => onChange(e.target.value)}
              className="bg-white/[0.05] border-white/10 text-sm"
            />
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowUrl(false)} className="text-muted-foreground">
              <ImagePlus className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowUrl(true)}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-white"
          >
            <Link2 className="h-3.5 w-3.5" /> or paste an image URL
          </button>
        )}
      </div>
    </div>
  );
}

/* client-side resize to keep dataURLs small */
async function resizeImage(file: File, maxW: number, quality: number): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxW / bitmap.width);
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0, w, h);
  return canvas.toDataURL("image/jpeg", quality);
}

/* ---------- form helpers ---------- */

export function AdminField({
  label, error, children, hint,
}: {
  label: string; error?: string; children: ReactNode; hint?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[13px] font-medium text-foreground/85">{label}</label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-muted-foreground/70">{hint}</p>}
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
    </div>
  );
}

export function ToggleRow({
  label, checked, onChange,
}: {
  label: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <span className="text-sm font-medium text-foreground/90">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

export const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground/50 outline-none transition-all focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20";
