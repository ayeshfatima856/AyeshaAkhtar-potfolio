"use client";

import { useState } from "react";
import { PageHero } from "./blocks";
import { Reveal } from "./reveal";
import { apiSend } from "@/lib/types";
import { useApi } from "@/lib/hooks";
import { parseSocials } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Mail, MapPin, Clock, Send, CheckCircle2, Loader2, Instagram, Linkedin, Github, Twitter, CalendarClock,
} from "lucide-react";

const SERVICES = [
  "Web Development",
  "E-Commerce Build",
  "Landing Page",
  "Meta Ads",
  "Google Ads",
  "SEO",
  "Social Media",
  "Website + Marketing Bundle",
  "Something else",
];

const BUDGETS = ["Under $500", "$500 – $1,500", "$1,500 – $3,000", "$3,000+", "Monthly retainer"];

export default function Contact() {
  const { data } = useApi<{ settings: Record<string, string> }>("/api/settings");
  const socials = parseSocials(data?.settings?.socials);
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "", email: "", subject: "", service: "", budget: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Please tell me your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email";
    if (form.message.trim().length < 10) e.message = "A few more details please (min. 10 characters)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      await apiSend("/api/messages", "POST", form);
      setSent(true);
      toast({ title: "Message sent!", description: "Thanks — I'll reply within 24 hours." });
      setForm({ name: "", email: "", subject: "", service: "", budget: "", message: "" });
    } catch (err) {
      toast({
        title: "Couldn't send message",
        description: err instanceof Error ? err.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build something"
        highlight="amazing"
        sub="Tell me about your project, your goals and your timeline. I reply to every message within 24 hours."
      />

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* info side */}
          <div className="space-y-4">
            <Reveal>
              <div className="card-hover rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
                  <Mail className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-white">Email me directly</h3>
                <a
                  href={`mailto:${data?.settings?.email || "hello@ayeshaakhtar.dev"}`}
                  className="mt-1 block text-sm text-cyan-300 hover:underline"
                >
                  {data?.settings?.email || "hello@ayeshaakhtar.dev"}
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="card-hover rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300">
                  <MapPin className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-white">Location</h3>
                <p className="mt-1 text-sm text-muted-foreground">{data?.settings?.location || "Remote · Working worldwide"}</p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="card-hover rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
                  <Clock className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-white">Response time</h3>
                <p className="mt-1 text-sm text-muted-foreground">Within 24 hours, Monday to Saturday.</p>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="font-display text-base font-bold text-white">Find me online</h3>
                <div className="mt-4 flex gap-2.5">
                  {[
                    { k: "instagram", icon: Instagram, label: "Instagram" },
                    { k: "linkedin", icon: Linkedin, label: "LinkedIn" },
                    { k: "github", icon: Github, label: "GitHub" },
                    { k: "x", icon: Twitter, label: "X" },
                  ].filter((s) => socials[s.k]).map((s) => (
                    <a
                      key={s.k}
                      href={socials[s.k]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all hover:border-violet-400/50 hover:text-white hover:bg-violet-500/15"
                    >
                      <s.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* form side */}
          <Reveal delay={0.1}>
            <div className="ring-gradient relative overflow-hidden rounded-[1.8rem] bg-white/[0.03] p-7 md:p-9">
              {sent ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15">
                    <CheckCircle2 className="h-10 w-10 text-emerald-300" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-bold text-white">Message received!</h3>
                  <p className="mt-2 max-w-sm text-muted-foreground">
                    Thanks for reaching out — I&apos;ll get back to you within 24 hours with next steps.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-7 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-violet-400/60 hover:bg-violet-500/10"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <h3 className="font-display text-xl font-bold text-white">Project enquiry</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Fields marked * are required.</p>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <Field label="Your name *" error={errors.name}>
                      <Input
                        value={form.name} onChange={(e) => set("name", e.target.value)}
                        placeholder="Jane Cooper" className="bg-white/[0.05] border-white/10"
                      />
                    </Field>
                    <Field label="Email *" error={errors.email}>
                      <Input
                        type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
                        placeholder="jane@company.com" className="bg-white/[0.05] border-white/10"
                      />
                    </Field>
                  </div>

                  <div className="mt-5">
                    <Field label="Subject">
                      <Input
                        value={form.subject} onChange={(e) => set("subject", e.target.value)}
                        placeholder="E-commerce store for my fashion brand" className="bg-white/[0.05] border-white/10"
                      />
                    </Field>
                  </div>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <Field label="What do you need?">
                      <Select value={form.service || undefined} onValueChange={(v) => set("service", v)}>
                        <SelectTrigger className="w-full bg-white/[0.05] border-white/10">
                          <SelectValue placeholder="Choose a service" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0B1130] border-white/10">
                          {SERVICES.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Budget range">
                      <Select value={form.budget || undefined} onValueChange={(v) => set("budget", v)}>
                        <SelectTrigger className="w-full bg-white/[0.05] border-white/10">
                          <SelectValue placeholder="Select a range" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0B1130] border-white/10">
                          {BUDGETS.map((b) => (
                            <SelectItem key={b} value={b}>{b}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>

                  <div className="mt-5">
                    <Field label="Project details *" error={errors.message}>
                      <Textarea
                        rows={5} value={form.message} onChange={(e) => set("message", e.target.value)}
                        placeholder="Tell me about your business, your goals and what success looks like…"
                        className="resize-none bg-white/[0.05] border-white/10"
                      />
                    </Field>
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-[length:200%_100%] bg-left py-4 text-[15px] font-semibold text-white shadow-[0_14px_44px_-12px_rgba(139,92,246,0.75)] transition-all duration-500 hover:bg-right disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="h-4.5 w-4.5 h-[18px] w-[18px] animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                  <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarClock className="h-3.5 w-3.5" /> Your message lands directly in my admin inbox — no third-party forms.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({
  label, error, children,
}: {
  label: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="mb-2 text-[13px] font-medium text-foreground/85">{label}</Label>
      {children}
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
    </div>
  );
}
