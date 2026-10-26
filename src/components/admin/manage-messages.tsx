"use client";

import { useState } from "react";
import { useApi } from "@/lib/hooks";
import { apiSend, type Message } from "@/lib/types";
import { AdminHeader, EmptyState, ConfirmDialog } from "./shared";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Trash2, MailOpen, MailQuestion, Loader2 } from "lucide-react";

export default function Messages() {
  const { data, refetch } = useApi<{ messages: Message[] }>("/api/messages");
  const { toast } = useToast();
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [toDelete, setToDelete] = useState<Message | null>(null);
  const [busy, setBusy] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const messages = data?.messages || [];
  const list = filter === "unread" ? messages.filter((m) => !m.read) : messages;

  const markRead = async (m: Message) => {
    await apiSend(`/api/messages/${m.id}`, "PUT", { read: !m.read }).catch(() => {});
    refetch();
  };

  const remove = async () => {
    if (!toDelete) return;
    setBusy(true);
    try {
      await apiSend(`/api/messages/${toDelete.id}`, "DELETE");
      toast({ title: "Message deleted" });
      setToDelete(null);
      refetch();
    } catch (e) {
      toast({ title: "Delete failed", description: e instanceof Error ? e.message : "", variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <AdminHeader
        title="Contact messages"
        sub="Submissions from the website contact form."
        action={
          <div className="flex gap-2">
            {(["all", "unread"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  filter === f ? "bg-violet-600 text-white" : "border border-white/15 text-muted-foreground hover:text-white"
                }`}
              >
                {f === "all" ? `All (${messages.length})` : `Unread (${messages.filter((m) => !m.read).length})`}
              </button>
            ))}
          </div>
        }
      />

      {list.length === 0 ? (
        <EmptyState
          title={filter === "unread" ? "No unread messages" : "No messages yet"}
          sub="When someone submits the contact form, their message lands here."
        />
      ) : (
        <ul className="space-y-4">
          {list.map((m) => (
            <li
              key={m.id}
              className={`rounded-3xl border p-5 transition-all ${
                m.read ? "border-white/8 bg-white/[0.02]" : "border-violet-400/30 bg-violet-500/[0.05]"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <p className="font-display text-base font-bold text-white">{m.name}</p>
                    {!m.read && (
                      <span className="rounded-full bg-violet-500/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-200">
                        new
                      </span>
                    )}
                    {m.service && (
                      <span className="rounded-full bg-white/8 px-2.5 py-0.5 text-[11px] text-cyan-300">{m.service}</span>
                    )}
                    {m.budget && (
                      <span className="rounded-full bg-white/8 px-2.5 py-0.5 text-[11px] text-emerald-300">{m.budget}</span>
                    )}
                  </div>
                  <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1.5 hover:text-white">
                      <Mail className="h-3 w-3" /> {m.email}
                    </a>
                    <span>{new Date(m.createdAt).toLocaleString()}</span>
                  </p>
                  {m.subject && <p className="mt-2 text-sm font-semibold text-foreground/90">{m.subject}</p>}
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <button
                    onClick={() => markRead(m)}
                    title={m.read ? "Mark unread" : "Mark read"}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-all hover:border-violet-400/60 hover:text-white"
                  >
                    {m.read ? <MailQuestion className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => setToDelete(m)}
                    title="Delete"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-all hover:border-rose-400/60 hover:text-rose-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p
                className={`mt-3 cursor-pointer text-sm leading-relaxed text-foreground/80 ${
                  expanded === m.id ? "" : "line-clamp-3"
                }`}
                onClick={() => setExpanded(expanded === m.id ? null : m.id)}
              >
                {m.message}
              </p>
              <a
                href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject || "Your enquiry")}`}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-violet-500/25"
              >
                Reply by email
              </a>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={!!toDelete}
        onOpenChange={(v) => !v && setToDelete(null)}
        title="Delete this message?"
        description={`From ${toDelete?.name} (${toDelete?.email}). This cannot be undone.`}
        onConfirm={remove}
        busy={busy}
      />
    </div>
  );
}
