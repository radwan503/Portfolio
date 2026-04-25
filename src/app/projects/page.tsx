"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  ExternalLink,
  Code2,
  ArrowRight,
  Calendar,
  Layers3,
} from "lucide-react";

type Item = {
  id: string | number;
  name: string;
  description?: string;
  previewImge?: string;
  demo?: string;
  source?: string;
  company?: string;
  role?: string;
  tools?: string[];
  tools1?: string;
  tools2?: string;
  tools3?: string;
  year?: string | number;
  scope?: string;
};

type PortfolioJSON = {
  Web?: Item[];
  CityBank?: Item[];
  RemoteUkraine?: Item[];
  Tigerit?: Item[];
  Freelancer?: Item[];
  Others?: Item[];
};

const ACCENT = "#ca3500";

// 4 alternating hover variants (distinct gradient / glow / motion)
const VARIANTS = [
  {
    name: "sunset",
    gradient: "linear-gradient(180deg,#ff8a5b 0%, #ca3500 100%)",
    glow: "rgba(202,53,0,.5)",
    motion: "group-hover:-translate-y-1",
  },
  {
    name: "aqua",
    gradient: "linear-gradient(180deg,#2dd4bf 0%, #0ea5e9 100%)",
    glow: "rgba(14,165,233,.45)",
    motion: "group-hover:-translate-y-1 group-hover:rotate-[0.35deg]",
  },
  {
    name: "violet",
    gradient: "linear-gradient(180deg,#a78bfa 0%, #7c3aed 100%)",
    glow: "rgba(124,58,237,.45)",
    motion: "group-hover:-translate-y-1 group-hover:scale-[1.015]",
  },
  {
    name: "lime",
    gradient: "linear-gradient(180deg,#a3e635 0%, #22c55e 100%)",
    glow: "rgba(34,197,94,.45)",
    motion: "group-hover:-translate-y-1 group-hover:-rotate-[0.35deg]",
  },
];

export default function Portfolio() {
  const router = useRouter();
  const [data, setData] = useState<PortfolioJSON | null>(null);
  const [active, setActive] = useState<string>("city");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/data/portfolio.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as PortfolioJSON;
        if (mounted) setData(json);
      } catch (e) {
        console.error("Failed to load portfolio.json", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const tabs = useMemo(
    () => [
      { key: "city", label: "City Bank", items: data?.CityBank ?? [] },
      { key: "qcoom", label: "QCOOM", items: data?.Web ?? [] },
      { key: "remote", label: "Remote (Ukraine)", items: data?.RemoteUkraine ?? [] },
      { key: "tiger", label: "Tiger IT", items: data?.Tigerit ?? [] },
      { key: "freelance", label: "Freelance", items: data?.Freelancer ?? [] },
      { key: "free", label: "Free Template", items: data?.Others ?? [] },
    ],
    [data]
  );

  const current = useMemo(
    () => tabs.find((t) => t.key === active) ?? tabs[0],
    [active, tabs]
  );

  const goDetails = (item: Item, bucketKey: string) => {
    router.push(`/projects/${bucketKey}/${item.id}?name=${encodeURIComponent(item.name)}`);
  };


  return (
    <section id="portfolio" className="relative isolate bg-[#0b1018] text-slate-100">
      {/* soft bg */}
      <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,#111a28_0%,#080d14_50%,#070b11_100%)]" />

      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:42px_42px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-10">
        {/* Header */}
        <div className="text-left">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wider"
            style={{ color: "#ffd7c8", background: `${ACCENT}1a`, border: `1px solid ${ACCENT}44` }}
          >
            Portfolio
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Projects I’ve Worked On</h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-300/90 sm:text-base">
            Real-world products, internal platforms, and polished templates—built for speed, accessibility, and clarity.
          </p>
        </div>

        {/* Tabs */}
        <div role="tablist" aria-label="Portfolio categories" className="mt-5 flex flex-wrap gap-2">
          {tabs.map((t) => {
            const isActive = t.key === active;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${t.key}`}
                onClick={() => setActive(t.key)}
                className={[
                  "group relative rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                  isActive ? "text-white" : "text-slate-300 hover:text-white hover:bg-white/[0.06]",
                ].join(" ")}
                style={
                  isActive
                    ? { background: `linear-gradient(180deg,#ff8a5b 0%, ${ACCENT} 100%)` }
                    : {}
                }
              >
                {t.label}
                {isActive && (
                  <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/15" />
                )}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {loading ? (
          <SkeletonGrid />
        ) : !current?.items?.length ? (
          <p className="mt-10 text-center text-sm text-slate-400">No projects found here yet.</p>
        ) : (
          <div
            id={`panel-${current.key}`}
            role="tabpanel"
            className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {current.items.map((item, i) => (
              <ProjectCard
                key={item.id}
                item={item}
                variantIndex={i % VARIANTS.length}
                onDetails={() => goDetails(item,active)}
              />
            ))}
          </div>
        )}
      </div>

      {/* local animations (reduced-motion aware) */}
      <style jsx global>{`
        @keyframes shine {
          0% { transform: translateX(-150%) rotate(10deg); }
          100% { transform: translateX(150%) rotate(10deg); }
        }
        @keyframes floaty {
          0% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .motion-ok { animation: none !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
}

/* ---------- Project Card ---------- */
function ProjectCard({
  item,
  onDetails,
  variantIndex = 0,
}: {
  item: Item;
  onDetails: () => void;
  variantIndex?: number;
}) {
  const v = VARIANTS[variantIndex];

  const chips = useMemo(() => {
    const legacy = [item.tools1, item.tools2, item.tools3].filter(Boolean) as string[];
    const src = (item.tools && item.tools.length ? item.tools : legacy) ?? [];
    return src
      .flatMap((t) => String(t).split(","))
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 6);
  }, [item]);

  // Uniform height: fixed cover ratio + flex-1 body + clamped text
  return (
    <article
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onDetails()}
      className={[
        "group motion-ok relative flex h-full flex-col overflow-hidden rounded-none card-overlay",
        "border border-white/10 bg-white/5 ring-1 ring-white/10",
        "transition-all duration-300 hover:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
        v.motion,
      ].join(" ")}
      style={{ animation: "floaty 9s ease-in-out infinite" }}
      aria-label={`${item.name} card`}
    >
      {/* cover */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0f1622]">
        {item.previewImge ? (
          <Image
            src={item.previewImge}
            alt={item.name}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="transition-transform duration-500 group-hover:scale-[1.04]"
            priority={false}
          />
        ) : (
          <div className="grid h-full w-full place-content-center text-sm text-slate-400">No preview</div>
        )}

        {/* badges */}
        <div className="absolute left-2 top-2 flex gap-1.5">
          {item.company && <Badge>{item.company}</Badge>}
          {item.role && <Badge>{item.role}</Badge>}
        </div>

        {/* quick actions */}
        <div className="absolute right-2 top-2 flex translate-y-[-6px] gap-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {item.demo && (
            <Action href={item.demo} title="Live Demo" gradient={v.gradient}>
              <span>Live</span>
              <ArrowUpRight className="h-4 w-4" />
            </Action>
          )}
          {item.source && (
            <Action href={item.source} title="Source Code" gradient={v.gradient}>
              <span>Code</span>
              <Code2 className="h-4 w-4" />
            </Action>
          )}
        </div>

        {/* conic edge + sheen */}
        <span
          className="pointer-events-none absolute inset-0 rounded-b-none rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,.06)",
            background:
              "conic-gradient(from 0deg, rgba(255,255,255,.06), rgba(255,255,255,.02) 40%, rgba(255,255,255,.06))",
          }}
        />
        <span
          className="pointer-events-none absolute -inset-y-8 -left-1/2 w-[60%] skew-x-12 bg-white/10 opacity-0 group-hover:opacity-80"
          style={{ animation: "shine 900ms ease-in-out both 120ms" }}
        />
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="flex items-center gap-2 text-base font-semibold">
          {item.name}
          {item.demo && (
            <a
              href={item.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 transition-colors hover:text-white"
              title="Open demo"
              aria-label={`Open ${item.name} demo`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </h3>

        {/* meta (optional) */}
        {(item.year || item.scope) && (
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            {item.year && (
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {item.year}
              </span>
            )}
            {item.scope && (
              <span className="inline-flex items-center gap-1">
                <Layers3 className="h-3.5 w-3.5" />
                {item.scope}
              </span>
            )}
          </div>
        )}

        {item.description && (
          <p className="mt-2 line-clamp-3 text-sm text-slate-300/90">{item.description}</p>
        )}

        {!!chips.length && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {chips.map((c, i) => (
              <span
                key={`${c}-${i}`}
                className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-200"
              >
                {c}
              </span>
            ))}
          </div>
        )}

        {/* footer */}
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between border-t border-dashed border-white/10 pt-3">
            <button
              type="button"
              onClick={onDetails}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/85 transition-transform hover:translate-x-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
              title="Project details"
              aria-label={`View details for ${item.name}`}
            >
              Details
              <ArrowRight className="h-4 w-4" />
            </button>

            {item.demo ? (
              <a
                href={item.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/85 transition-transform hover:translate-x-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
              >
                Visit
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <span className="text-[12px] text-slate-400/80">Private / internal</span>
            )}
          </div>
        </div>
      </div>

      {/* ambient variant glow + animated bottom rail */}
      <span
        className="pointer-events-none absolute -inset-10 -z-10 blur-2xl opacity-30 transition-opacity duration-300 group-hover:opacity-60"
        style={{ background: `radial-gradient(60% 60% at 50% 50%, ${VARIANTS[variantIndex].glow}, transparent)` }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: VARIANTS[variantIndex].gradient, boxShadow: "0 0 16px rgba(255,255,255,.25) inset" }}
      />
    </article>
  );
}

/* ---------- Bits ---------- */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/15 bg-black/35 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white backdrop-blur-md">
      {children}
    </span>
  );
}

function Action({
  href,
  title,
  children,
  gradient,
}: {
  href: string;
  title: string;
  children: React.ReactNode;
  gradient: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 py-1 text-[11px] font-semibold text-white transition"
      style={{ background: gradient, borderColor: "rgba(255,255,255,.18)" }}
    >
      {children}
    </a>
  );
}

function SkeletonGrid() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-[360px] animate-pulse rounded-2xl border border-white/10 bg-gradient-to-r from-[#0f1622] via-[#172131] to-[#0f1622]"
        />
      ))}
    </div>
  );
}
