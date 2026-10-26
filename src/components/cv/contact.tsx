"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, Mail } from "lucide-react";
import { Reveal, SectionHead, useProfile } from "./shared";

const SERVICE_OPTIONS = [
  "Graphic Design",
  "Social Media Management",
  "Digital Marketing",
  "Website Design",
  "Something else / combined",
];

export function Contact() {
  const profile = useProfile();
  const [form, setForm] = useState({ name: "", email: "", service: SERVICE_OPTIONS[0], message: "" });
  const [state, setState] = useState<"idle" | "busy" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in your name, email and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setState("busy");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          service: form.service,
          message: form.message,
          subject: `New project enquiry — ${form.service}`,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setState("sent");
      setForm({ name: "", email: "", service: SERVICE_OPTIONS[0], message: "" });
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="surface-white relative overflow-hidden py-24 lg:py-32" aria-label="Contact">
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-iris/10 blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* copy */}
          <div>
            <SectionHead
              align="left"
              eyebrow="Get In Touch"
              title={
                <>
                  Have a Project in Mind?
                  <br />
                  Let&apos;s Create Something{" "}
                  <span className="text-gradient-navy">Exceptional.</span>
                </>
              }
              sub="Tell me about your brand and what you need — a design, a managed feed, an ad campaign or a full website. I'll get back to you with next steps."
            />

            <Reveal delay={0.15}>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3.5 rounded-2xl border border-ink/8 bg-cloud p-4.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-iris/10 text-iris">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[13.5px] font-bold text-ink">Fastest response</p>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-slateink">
                      Send the form and I&apos;ll reply from my inbox — usually within one business day.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3.5 rounded-2xl border border-ink/8 bg-cloud p-4.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-soft text-[#5a8a14]">
                    <Send className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[13.5px] font-bold text-ink">What happens next</p>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-slateink">
                      We discuss goals and scope, I propose a creative plan and timeline, then we start with a first deliverable.
                    </p>
                  </div>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* form */}
          <Reveal delay={0.1}>
            {state === "sent" ? (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center gap-4 rounded-3xl border border-lime-pop/50 bg-lime-soft/60 p-10 text-center" role="status">
                <CheckCircle2 className="h-14 w-14 text-[#5a8a14]" aria-hidden="true" />
                <h3 className="font-display text-2xl font-bold text-ink">Message sent!</h3>
                <p className="max-w-sm text-[14px] leading-relaxed text-slateink">
                  Thanks for reaching out — your enquiry landed safely in my inbox. I&apos;ll get back to you shortly.
                </p>
                <button onClick={() => setState("idle")} className="btn-iris mt-2 px-6 py-3 text-sm">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="rounded-3xl border border-ink/8 bg-cloud p-7 shadow-xl shadow-ink/5 sm:p-9" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ct-name" className="mb-1.5 block text-[13px] font-bold text-ink">
                      Your name *
                    </label>
                    <input
                      id="ct-name"
                      type="text"
                      value={form.name}
                      onChange={set("name")}
                      placeholder="e.g. Ahmed Raza"
                      className="w-full rounded-xl border border-ink/12 bg-white px-4 py-3 text-[14px] text-ink outline-none transition placeholder:text-slateink/50 focus:border-iris focus:ring-2 focus:ring-iris/20"
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="ct-email" className="mb-1.5 block text-[13px] font-bold text-ink">
                      Email *
                    </label>
                    <input
                      id="ct-email"
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-ink/12 bg-white px-4 py-3 text-[14px] text-ink outline-none transition placeholder:text-slateink/50 focus:border-iris focus:ring-2 focus:ring-iris/20"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="ct-service" className="mb-1.5 block text-[13px] font-bold text-ink">
                    What do you need?
                  </label>
                  <select
                    id="ct-service"
                    value={form.service}
                    onChange={set("service")}
                    className="w-full rounded-xl border border-ink/12 bg-white px-4 py-3 text-[14px] text-ink outline-none transition focus:border-iris focus:ring-2 focus:ring-iris/20"
                  >
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="mt-5">
                  <label htmlFor="ct-message" className="mb-1.5 block text-[13px] font-bold text-ink">
                    Project details *
                  </label>
                  <textarea
                    id="ct-message"
                    rows={5}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Tell me about your business, your goals and the kind of creative work you have in mind…"
                    className="w-full resize-none rounded-xl border border-ink/12 bg-white px-4 py-3 text-[14px] text-ink outline-none transition placeholder:text-slateink/50 focus:border-iris focus:ring-2 focus:ring-iris/20"
                    required
                  />
                </div>

                {error && (
                  <p className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-[13px] font-medium text-red-700" role="alert">
                    <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" /> {error}
                  </p>
                )}

                <button type="submit" disabled={state === "busy"} className="btn-iris mt-6 w-full px-6 py-4 text-[15px] disabled:cursor-not-allowed disabled:opacity-70">
                  {state === "busy" ? (
                    <>
                      <Loader2 className="h-4.5 w-4.5 animate-spin" aria-hidden="true" /> Sending…
                    </>
                  ) : (
                    <>
                      Send Message <Send className="h-4.5 w-4.5" aria-hidden="true" />
                    </>
                  )}
                </button>

                <p className="mt-3.5 text-center text-[11.5px] text-slateink/80">
                  Your details go straight to my inbox — no spam, ever.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
      {/* profile contact fields are surfaced here once configured in the admin panel */}
      {(profile.email || profile.whatsapp) && (
        <div className="sr-only">
          {profile.email && <p>Email: {profile.email}</p>}
          {profile.whatsapp && <p>WhatsApp: {profile.whatsapp}</p>}
        </div>
      )}
    </section>
  );
}
