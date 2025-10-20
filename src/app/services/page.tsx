"use client";

import React, { useEffect, useState } from "react";
import { Code2, Wand2, Pencil, Megaphone, Eye, Umbrella } from "lucide-react";

type Role = { title: string; subtitle: string };
type RolesJson = { roles: Role[] };

const ACCENT = "#ca3500";

const CORE_SERVICES = [
  { icon: <Code2 className="h-5 w-5" />,  title: "Front-End Development",
    text: "Modern, responsive UI with React/Next and TypeScript. Accessible, fast, production-ready." },
  { icon: <Wand2 className="h-5 w-5" />,  title: "React/Next Architecture",
    text: "Component patterns, routing, data fetching, SEO, SSR/ISR — built to scale cleanly." },
  { icon: <Pencil className="h-5 w-5" />, title: "Design → Code",
    text: "Translate Figma/wireframes into crisp, themed components with thoughtful motion." },
  { icon: <Megaphone className="h-5 w-5" />, title: "HTML5/CSS3 Engineering",
    text: "Semantic markup, fluid layouts, and cross-browser reliability that just works." },
  { icon: <Eye className="h-5 w-5" />,     title: "Brand & UX Polish",
    text: "Clarity, micro-interactions, and content structure that lift perceived quality." },
  { icon: <Umbrella className="h-5 w-5" />,title: "Strategy & Delivery",
    text: "Perf budgets, CI/CD, reviews, and docs so teams ship faster with confidence." },
];

export default function Service() {
  const [rolesData, setRolesData] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/data/roles.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as RolesJson;
        if (mounted) setRolesData(json.roles ?? []);
      } catch (e: any) {
        if (mounted) setErr(e?.message || "Failed to load roles");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <>
      {/* ===== Services ===== */}
      <section id="services" className="relative isolate bg-[#0b1018] text-slate-100">
        {/* soft bg */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,#111a28_0%,#0b1018_55%,#090e16_100%)]" />
          <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:14px_14px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* Header */}
          <div className="text-left">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wider"
              style={{ color: "#ffd7c8", background: `${ACCENT}1a`, border: `1px solid ${ACCENT}44` }}
            >
              Services
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">How I Can Help</h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-300/90 sm:text-base">
              Lightweight, performance-minded engineering with a design eye.
            </p>
          </div>

          {/* Cards (uniform height via h-full on article + min-h) */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_SERVICES.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} />
            ))}
          </div>
        </div>

        {/* keyframes for hover effects */}
        <style jsx global>{`
          @keyframes ring-spin {
            to { transform: rotate(360deg); }
          }
          @keyframes float-lift {
            0%,100% { transform: translateY(0) }
            50% { transform: translateY(-3px) }
          }
        `}</style>
      </section>

      {/* ===== Roles / Responsibilities ===== */}
      <section className="relative isolate bg-[#0b1018] pb-20 text-slate-100 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold tracking-wide text-slate-300">How I Work</h3>
          <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">Responsibilities & Focus</h2>

          {loading && <p className="mt-6 text-sm text-slate-400">Loading…</p>}
          {err && !loading && <p className="mt-6 text-sm text-red-300">Error: {err}</p>}

          {!loading && !err && (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rolesData.map((r, i) => (
                <RoleCard key={`${r.title}-${i}`} role={r} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ===== Pieces ===== */

// New card look: solid frame + glow edge + rotating icon ring on hover
function ServiceCard({
  icon,
  title,
  text,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  index: number;
}) {
  return (
    <article
      className="group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl
                 border border-white/10 bg-white/5 p-5 ring-1 ring-white/10 transition-all duration-300
                 hover:bg-white/[0.08] hover:shadow-[0_12px_40px_-18px_rgba(0,0,0,.7)]"
      style={{ animation: `float-lift 9s ease-in-out ${index * 120}ms infinite` }}
    >
      {/* Glow edge on hover */}
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 0 1px ${ACCENT}33, 0 0 40px -10px ${ACCENT}66`,
        }}
      />

      {/* Header: icon with rotating multicolor ring */}
      <header className="relative mb-2 flex items-center gap-3">
        <div className="relative">
          {/* ring */}
          <span
            className="absolute -inset-1 rounded-xl opacity-60 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "conic-gradient(from 0deg, #ffb089, #ff7a44, #ca3500, #ffb089)",
              WebkitMask:
                "radial-gradient(farthest-side, #0000 62%, #000 63%)",
              mask: "radial-gradient(farthest-side, #0000 62%, #000 63%)",
              animation: "ring-spin 6s linear infinite",
              filter: "blur(0.5px)",
              display: "block",
            }}
          />
          {/* icon chip */}
          <div
            className="relative grid h-10 w-10 place-content-center rounded-xl text-white transition-transform duration-300 group-hover:scale-105"
            style={{ background: `linear-gradient(180deg,#ff8a5b 0%, ${ACCENT} 100%)` }}
          >
            {icon}
          </div>
        </div>
        <h3 className="min-w-0 truncate text-base font-semibold">{title}</h3>
      </header>

      <p className="flex-1 text-sm text-slate-300/90">{text}</p>

      <footer className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold text-white/80">
        Explore
        <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </footer>
    </article>
  );
}

function RoleCard({ role, index }: { role: Role; index: number }) {
  return (
    <article
      className="group relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden rounded-2xl
                 border border-white/10 bg-white/5 p-4 ring-1 ring-white/10 transition-all duration-300
                 hover:bg-white/[0.08] hover:shadow-[0_12px_40px_-18px_rgba(0,0,0,.7)]"
      style={{ animation: `float-lift 10s ease-in-out ${index * 100}ms infinite` }}
    >
      {/* left accent bar -> brightens on hover */}
      {/* <span
        className="absolute left-0 top-0 h-full w-1.5 transition-opacity duration-300"
        style={{ background: `linear-gradient(180deg, ${ACCENT}, rgba(202,53,0,0))`, boxShadow: `0 0 18px ${ACCENT}55` }}
      /> */}
      <h4 className="pl-4 text-[18px] font-semibold leading-snug">{role.title}</h4>
      <p className="pl-4 mt-2 flex-1 text-sm text-slate-300/90">{role.subtitle}</p>
      {/* <div className="pl-4 mt-3 inline-flex items-center gap-2 text-[12px] font-semibold text-white/80">
        Learn more
        <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div> */}
    </article>
  );
}
