"use client";

import { useState } from "react";
import {
  Clock,
  Dribbble,
  Github,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Send,
  Twitter,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const info = [
  { Icon: Mail, label: "Email", value: "hello@ayeshaakhtar.dev", href: "mailto:hello@ayeshaakhtar.dev" },
  { Icon: MapPin, label: "Location", value: "Remote — working worldwide" },
  { Icon: Clock, label: "Response time", value: "Within 24 hours" },
];

const socials = [
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
  { href: "https://github.com", label: "GitHub", Icon: Github },
  { href: "https://twitter.com", label: "Twitter", Icon: Twitter },
  { href: "https://dribbble.com", label: "Dribbble", Icon: Dribbble },
];

const projectTypes = [
  "Social Media Marketing",
  "Web Development",
  "Full Brand + Website",
  "Ads & Growth Funnel",
  "Something Else",
];

export function Contact() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setName("");
      setEmail("");
      setType("");
      setMessage("");
      toast({
        title: "Message sent successfully!",
        description: "Thanks for reaching out — I will get back to you within 24 hours.",
      });
    }, 900);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-fuchsia-600/10 blur-[130px]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              index="06"
              eyebrow="Contact"
              title={
                <>
                  Let&apos;s build something{" "}
                  <span className="text-gradient">unforgettable</span>
                </>
              }
              description="Have a brand to grow, a site to launch, or a wild idea that needs both? Tell me about it — I usually reply within a day."
            />
            <Reveal delay={0.15}>
              <ul className="mt-10 space-y-4">
                {info.map(({ Icon, label, value, href }) => (
                  <li key={label}>
                    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-fuchsia-400/40">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-orange-400/10 text-fuchsia-300">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-widest text-stone-500">{label}</p>
                        {href ? (
                          <a
                            href={href}
                            className="truncate font-medium text-stone-100 transition-colors hover:text-fuchsia-300"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="truncate font-medium text-stone-100">{value}</p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-center gap-3">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-stone-300 transition-all hover:-translate-y-1 hover:border-fuchsia-400/50 hover:text-fuchsia-300"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
              aria-label="Contact form"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-stone-300">
                    Your name
                  </Label>
                  <Input
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="border-white/10 bg-white/5 text-stone-100 placeholder:text-stone-600 focus-visible:ring-fuchsia-400/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-stone-300">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="border-white/10 bg-white/5 text-stone-100 placeholder:text-stone-600 focus-visible:ring-fuchsia-400/50"
                  />
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <Label htmlFor="type" className="text-stone-300">
                  Project type
                </Label>
                <Select value={type} onValueChange={setType} required>
                  <SelectTrigger
                    id="type"
                    aria-label="Project type"
                    className="w-full border-white/10 bg-white/5 text-stone-100 focus:ring-fuchsia-400/50"
                  >
                    <SelectValue placeholder="What do you need help with?" />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-stone-900 text-stone-100">
                    {projectTypes.map((t) => (
                      <SelectItem key={t} value={t} className="focus:bg-white/10">
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-5 space-y-2">
                <Label htmlFor="message" className="text-stone-300">
                  Project details
                </Label>
                <Textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your brand, your goals, and your timeline..."
                  className="resize-none border-white/10 bg-white/5 text-stone-100 placeholder:text-stone-600 focus-visible:ring-fuchsia-400/50"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-fuchsia-500/25 transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send message <Send className="h-4 w-4" />
                  </>
                )}
              </button>
              <p className="mt-4 text-center text-xs text-stone-500">
                No spam, no pressure — just a friendly chat about your project.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
