"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import Image from "next/image";

type SkillItem = { name: string; percent: number; image?: string };
type DataShape = {
  Web: SkillItem[];
  Programming: SkillItem[];
  LibraryOrFramework: SkillItem[];
  Tools: SkillItem[];
};

const ACCENT = "#ca3500";

/* --- utilities --- */
function useIntersectionOnce<T extends HTMLElement>(opts?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, opts ?? { threshold: 0.2 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [opts, seen]);
  return { ref, seen };
}


/* --- main --- */
export default function Skill() {
  const [data, setData] = useState<DataShape>({
    Web: [],
    Programming: [],
    LibraryOrFramework: [],
    Tools: [],
  });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // Fetch JSON from /public/data/skill.json
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/data/skill.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as Partial<DataShape>;
        if (!mounted) return;
        setData({
          Web: json.Web ?? [],
          Programming: json.Programming ?? [],
          LibraryOrFramework: json.LibraryOrFramework ?? [],
          Tools: json.Tools ?? [],
        });
      } catch (e: any) {
        if (mounted) setErr(e?.message || "Failed to load data");
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
      { key: "Web", label: "Web", items: data.Web },
      { key: "Tools", label: "Tools", items: data.Tools },
      { key: "LibraryOrFramework", label: "More", items: data.LibraryOrFramework },
      { key: "Programming", label: "Programming", items: data.Programming },
    ],
    [data]
  );

  const [activeKey, setActiveKey] = useState<string>("Web");
  // keep active tab valid if data changes
  useEffect(() => {
    if (!tabs.find((t) => t.key === activeKey)) setActiveKey("Web");
  }, [tabs, activeKey]);

  const active = tabs.find((t) => t.key === activeKey) ?? tabs[0];

  return (
    <section id="skill" className="relative min-h-[92svh] isolate bg-[#0b1018] text-slate-100">
      {/* soft bg */}
      <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,#111a28_0%,#080d14_50%,#070b11_100%)]" />

      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:42px_42px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-10">
        {/* header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wider"
              style={{ color: "#ffd7c8", background: `${ACCENT}1a`, border: `1px solid ${ACCENT}44` }}
            >
              TECH STACK
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Skills & Tooling</h2>
            <p className="mt-1 text-sm text-slate-300/90">
              A snapshot of my day-to-day stack, from product UI to delivery tooling.
            </p>
          </div>

          {/* tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => {
              const isActive = t.key === activeKey;
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveKey(t.key)}
                  className={[
                    "group relative inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition",
                    isActive ? "text-white" : "text-slate-300 hover:text-white hover:bg-white/[0.05]",
                  ].join(" ")}
                  style={isActive ? { background: `linear-gradient(180deg,#ff7a44 0%, ${ACCENT} 100%)` } : {}}
                >
                  {t.label}
                  {isActive && <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/15" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* states */}
        {loading && <p className="mt-8 text-sm text-slate-400">Loading…</p>}
        {err && !loading && <p className="mt-8 text-sm text-red-300">Error: {err}</p>}
        {!loading && !err && <SkillGrid items={active?.items ?? []} />}
      </div>

      {/* local keyframes */}
      <style jsx global>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: .35; filter: blur(18px); }
          50% { opacity: .6; filter: blur(24px); }
        }
      `}</style>
    </section>
  );
}

/* --- grid --- */
function SkillGrid({ items }: { items: SkillItem[] }) {
  const sorted = useMemo(() => {
    return [...items].sort((a, b) => Number(!!b.image) - Number(!!a.image));
  }, [items]);

  if (!sorted.length) {
    return <p className="mt-8 text-sm text-slate-400">No data in this tab.</p>;
  }

  return (
    <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {sorted.map((s, i) => (
        <SkillCard key={`${s.name}-${i}`} skill={s} index={i} />
      ))}
    </div>
  );
}

/* --- card --- */
function SkillCard({ skill }: { skill: SkillItem; index: number }) {
  const { ref } = useIntersectionOnce<HTMLDivElement>({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className="group overflow-hidden rounded-none border border-white/10 bg-white/5 p-3 ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:bg-white/[0.07] card-overlay "
      //style={{ boxShadow: "0 10px 30px -18px rgba(0,0,0,.6)" }}
    >
      <div className="flex items-center justify-center gap-2 h-30 ">
        {skill.image ? (
          <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded">
            <Image src={skill.image} alt={skill.name} fill sizes="24px" className="object-contain" />
          </div>
        ) : (
          <div
            className="grid h-6 w-6 shrink-0 place-content-center rounded text-xs font-bold text-white"
            style={{ background: `linear-gradient(180deg,#ff7a44 0%, ${ACCENT} 100%)` }}
          >
            {skill.name.slice(0, 2).toUpperCase()}
          </div>
        )}
        <div className="truncate text-sm font-semibold">{skill.name}</div>
      </div>
    </div>
  );
}
