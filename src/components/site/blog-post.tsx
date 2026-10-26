 
"use client";

import { useEffect } from "react";
import { Link } from "@/lib/router";
import { useApi } from "@/lib/hooks";
import type { BlogPost } from "@/lib/types";
import { Reveal } from "./reveal";
import { ArrowLeft, Clock, CalendarDays, Tag } from "lucide-react";
import Markdown from "react-markdown";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPost({ slug }: { slug: string }) {
  const { data, loading, error } = useApi<{ post: BlogPost }>(`/api/blog/${slug}`);
  const post = data?.post;

  useEffect(() => {
    if (post) document.title = `${post.title} | Ayesha Akhtar`;
    return () => { document.title = "Ayesha Akhtar — Web Developer & Digital Marketer"; };
  }, [post]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-5 pt-40 pb-24">
        <div className="shimmer-line h-[300px] rounded-3xl" />
        <div className="shimmer-line mt-6 h-10 w-3/4 rounded-xl" />
        <div className="shimmer-line mt-4 h-52 rounded-2xl" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-5 pt-48 pb-24 text-center">
        <span className="text-4xl">📝</span>
        <h1 className="mt-4 font-display text-2xl font-bold text-white">Post not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">It may have been unpublished or moved.</p>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden bg-navy-950 bg-grid pt-32 pb-10 md:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-aurora" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 lg:px-8">
          <Reveal>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-white">
              <ArrowLeft className="h-4 w-4" /> All insights
            </Link>
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.split(",").filter(Boolean).map((t) => (
                <span key={t} className="inline-flex items-center gap-1 rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                  <Tag className="h-3 w-3" /> {t.trim()}
                </span>
              ))}
            </div>
            <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 flex flex-wrap items-center gap-5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-[10px] font-bold text-white">AA</span>
                Ayesha Akhtar
              </span>
              <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> {formatDate(post.createdAt)}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.readTime} min read</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* cover */}
      <section className="mx-auto max-w-3xl px-5 pt-6 lg:px-8">
        <Reveal>
          <div className="ring-gradient overflow-hidden rounded-[1.6rem]">
            <img src={post.cover || "/images/site/og-banner.png"} alt={post.title} className="aspect-[16/8] w-full object-cover" />
          </div>
        </Reveal>
      </section>

      {/* content */}
      <article className="prose-invert mx-auto max-w-3xl px-5 py-10 lg:px-8">
        <Reveal>
          <Markdown
            components={{
              h2: (p) => <h2 className="mt-12 mb-4 font-display text-2xl font-bold text-white md:text-[1.7rem]" {...p} />,
              h3: (p) => <h3 className="mt-8 mb-3 font-display text-xl font-bold text-white" {...p} />,
              p: (p) => <p className="my-5 text-[16px] leading-[1.85] text-foreground/80" {...p} />,
              ul: (p) => <ul className="my-5 list-disc space-y-2 pl-6 text-[15.5px] leading-relaxed text-foreground/80" {...p} />,
              ol: (p) => <ol className="my-5 list-decimal space-y-2 pl-6 text-[15.5px] leading-relaxed text-foreground/80" {...p} />,
              li: (p) => <li className="pl-1" {...p} />,
              strong: (p) => <strong className="font-semibold text-white" {...p} />,
              em: (p) => <em className="text-foreground/90" {...p} />,
              a: (p) => <a className="text-violet-300 underline decoration-violet-400/40 underline-offset-4 hover:text-violet-200" {...p} />,
              hr: () => <hr className="my-10 border-white/10" />,
              code: (p) => <code className="rounded-md bg-white/8 px-1.5 py-0.5 font-mono text-[13px] text-cyan-300" {...p} />,
            }}
          >
            {post.content}
          </Markdown>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl border border-violet-400/25 bg-gradient-to-br from-violet-600/12 to-blue-600/8 p-8 text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 font-display text-base font-bold text-white">AA</span>
            <div>
              <p className="font-display text-lg font-bold text-white">Written by Ayesha Akhtar</p>
              <p className="mt-1 text-sm text-muted-foreground">Web developer & digital marketer — I build sites and grow them.</p>
            </div>
            <Link
              to="/contact"
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-7 py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
            >
              Work with me
            </Link>
          </div>
        </Reveal>
      </article>
    </>
  );
}
