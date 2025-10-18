"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Sparkles,
  Code2,
  Calendar,
  Building2,
  Layers3,
  Share2,
  ChevronRight,
} from "lucide-react";

type WorkItem = { title: string; subtitle: string[] };
type Role = { title: string; subtitle: string };
type Shot = { title?: string; imgUrl: string };

type Project = {
  id: string | number;
  name?: string;               // fallback for title
  title?: string[];            // [line1, line2]
  subtitle?: string[];         // badges under the title
  description?: string;
  demo?: string;
  source?: string;
  client?: string;             // "Work For"
  year?: string | number;
  scope?: string;              // e.g. "B2C Banking"
  techStack?: string[];
  topBanner?: string;
  workido?: WorkItem[];
  images?: Shot[];
  roles?: Role[];
};

const ACCENT = "#ca3500";

export default function PreviewPage() {
  const router = useRouter();
  const params = useParams<{ bucket: string; id: string }>();
  const search = useSearchParams();
  const id = params.id;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(params)
  console.log(search)

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setProject(null); // clear stale while switching

    (async () => {
      try {
        // slug -> JSON key
        const BUCKET_MAP: Record<string, string> = {
          city: "CityBank",
          qcoom: "Web",
          remote: "RemoteUkraine",
          tiger: "Tigerit",
          freelance: "Freelancer",
          free: "Others",
        };

        const bucketSlug = String(params.bucket || "");
        const jsonKey = BUCKET_MAP[bucketSlug];
        const id = String(params.id || "");

        if (!jsonKey) throw new Error(`Unknown bucket: ${bucketSlug}`);

        // IMPORTANT: do NOT fetch /data/projects/${id}.json here
        const res = await fetch("/data/portfolio.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const list = (json?.[jsonKey] ?? []) as Project[];
        const found = list.find((x) => String(x.id) === id) ?? null;

        if (mounted) setProject(found);
      } catch (err) {
        console.error("Failed to load preview:", err);
        if (mounted) setProject(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [params.bucket, params.id]);



  const titleLines = useMemo(() => {
    if (project?.title && project.title.length) return project.title;
    if (project?.name) return [project.name];
    return [];
  }, [project]);

  if (loading) return <Skeleton />;

  if (!project) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-24 text-slate-200">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h1 className="text-2xl font-bold">No Item Data</h1>
          <p className="mt-2 text-slate-400">We couldn’t find this project.</p>
          <button
            onClick={() => router.back()}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-[92svh] isolate bg-[#0b1018] text-slate-100">
      {/* soft background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,#111a28_0%,#0b1018_55%,#090e16_100%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:14px_14px]" />
      </div>

      {/* Header / Hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <div className="hidden sm:flex items-center gap-2 text-[12px] text-slate-300">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {project.year ?? "—"}
            </span>
            {project.scope && (
              <>
                <span aria-hidden className="text-slate-500">•</span>
                <span className="inline-flex items-center gap-1">
                  <Layers3 className="h-3.5 w-3.5" />
                  {project.scope}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="mt-8">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wider"
            style={{ color: "#ffd7c8", background: `${ACCENT}1a`, border: `1px solid ${ACCENT}44` }}
          >
            Case Study
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
          </span>

          <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-5xl">
            {titleLines.map((l, i) => (
              <span key={i} className="block">{l}</span>
            ))}
          </h1>

          {!!(project.subtitle?.length) && (
            <ul className="mt-3 flex flex-wrap gap-2 text-[12px] text-slate-300">
              {project.subtitle!.map((s, i) => (
                <li key={i} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                  {s}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={project.demo || "#"}
              target={project.demo ? "_blank" : undefined}
              rel="noopener noreferrer"
              title={project.demo ? "Live Preview" : "No demo link"}
              className={[
                "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white",
                project.demo
                  ? "bg-gradient-to-b from-[#ff8a5b] to-[#ca3500] hover:brightness-110"
                  : "bg-white/10 text-white/60 cursor-not-allowed",
              ].join(" ")}
            >
              <Sparkles className="h-4 w-4" />
              Live Preview
              {project.demo && <ExternalLink className="h-4 w-4" />}
            </a>

            {project.source && (
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                <Code2 className="h-4 w-4" />
                Source
                <ExternalLink className="h-4 w-4" />
              </a>
            )}

            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  navigator.share?.({ title: project.name || titleLines.join(" "), url: window.location.href })
                    ?.catch(() => {});
                }
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              title="Share"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </div>
      </section>

      {/* Info block */}
      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="">
          <article className="0">
            <h3 className="text-md font-semibold uppercase tracking-wide text-slate-300">Project Description</h3>
            <p className="mt-2 text-sm text-slate-300/90">{project.description || "—"}</p>

            {!!(project.techStack?.length) && (
              <div className="mt-4">
                <div className="text-xs uppercase tracking-wide text-slate-400">Tech Stack</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.techStack!.map((t, i) => (
                    <span key={i} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

        </div>
      </section>

      {/* Top banner / hero shot */}
      {project.topBanner && (
        <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <figure className="overflow-hidden rounded border border-white/10 bg-[#0f1622] card-overlay">
            <Image
              src={project.topBanner}
              alt={project.name || titleLines.join(" ")}
              width={1600}
              height={900}
              className="h-auto w-full transition-transform duration-500"
              priority
              style={{ border: "3px solid #fff" }}
            />
          </figure>
        </section>
      )}

      {/* Features I worked on */}
      {!!(project.workido?.length) && (
        <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold tracking-wide text-slate-300">Features I Worked</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {project.workido!.map((w, i) => (
              <article
                key={i}
                className="group card-overlay relative overflow-hidden rounded border border-white/10 bg-white/5 p-5 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.07]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-10 -z-10 opacity-25 blur-2xl transition-opacity duration-300 group-hover:opacity-50"
                  style={{ background: `radial-gradient(60% 60% at 50% 50%, ${ACCENT}66, transparent)` }}
                />
                <h4 className="text-base font-semibold">{w.title}</h4>
                <ul className="mt-2 space-y-1.5 text-sm text-slate-300/90">
                  {w.subtitle.map((s, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                      <span className="capitalize">{s}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Screens / UI gallery */}
      {!!(project.images?.length) && (
        <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="sr-only">Screenshots</h3>
          <div className="grid gap-6">
            {project.images!.map((shot, i) => (
              <figure key={i} className="rounded card-overlay  bg-[#0f1622] p-3">
                {shot.title && (
                  <figcaption className="px-1 pb-2 text-[12px] uppercase tracking-wide text-slate-400">
                    {shot.title}
                  </figcaption>
                )}
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src={shot.imgUrl}
                    alt={shot.title || `Screenshot ${i + 1}`}
                    width={1600}
                    height={900}
                    className="h-auto w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Roles & Responsibilities */}
      {!!(project.roles?.length) && (
        <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
          <h3 className="text-lg font-semibold tracking-wide text-slate-300">My Role & Responsibility</h3>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.roles!.map((r, i) => (
              <article
                key={i}
                className="group card-overlay relative overflow-hidden rounded border border-white/10 bg-white/5 p-5 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.07]"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-1.5"
                  // style={{
                  //   background: `linear-gradient(180deg, ${ACCENT}, rgba(202,53,0,0))`,
                  //   boxShadow: `0 0 18px ${ACCENT}55`,
                  // }}
                />
                <h4 className="pl-4 text-base font-semibold leading-snug">{r.title}</h4>
                <p className="pl-4 mt-2 text-sm text-slate-300/90">{r.subtitle}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

/* ---------------- Skeleton ---------------- */
function Skeleton() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 text-slate-100">
      <div className="h-8 w-28 animate-pulse rounded bg-white/10" />
      <div className="mt-4 h-10 w-3/4 animate-pulse rounded bg-white/10" />
      <div className="mt-2 h-6 w-1/3 animate-pulse rounded bg-white/10" />
      <div className="mt-6 flex gap-3">
        <div className="h-10 w-36 animate-pulse rounded bg-white/10" />
        <div className="h-10 w-28 animate-pulse rounded bg-white/10" />
        <div className="h-10 w-24 animate-pulse rounded bg-white/10" />
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-48 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
        ))}
      </div>

      <div className="mt-10 h-72 animate-pulse rounded-2xl border border-white/10 bg-white/5" />

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-40 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
        ))}
      </div>
    </main>
  );
}
