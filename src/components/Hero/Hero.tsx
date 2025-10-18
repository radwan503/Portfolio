"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, FileText, Download } from "lucide-react";
import Social from "../_common/Social";

type Mouse = { x: number; y: number };
const ACCENT = "#ca3500";

export default function Hero() {
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const [mouse, setMouse] = useState<Mouse>({ x: 0, y: 0 });
  const [showCV, setShowCV] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setMouse({
        x: (e.clientX - r.left) / r.width - 0.5,
        y: (e.clientY - r.top) / r.height - 0.5,
      });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-[#0b1018] text-slate-100"
      aria-label="Radwan Ahmed — Senior Frontend Engineer Portfolio Hero"
    >
      {/* Background with right-side cubes in #ca3500 palette */}
      <BackgroundFX mouse={mouse} />

      {/* Content wrapper */}
      <div ref={wrapRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[92svh] grid-cols-1 items-center gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:py-24">
          {/* Social rail (desktop) */}
          <aside className="hidden lg:flex lg:col-span-1 lg:flex-col lg:items-center lg:gap-3">
            <div className="rounded-full bg-white/10 p-2 shadow-sm ring-1 ring-white/10">
              <span className="block h-1.5 w-1.5 animate-pulse rounded-full" style={{ backgroundColor: ACCENT }} />
            </div>
            <div className="h-20 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            <div className="-ml-0.5 rotate-180 [writing-mode:vertical-rl] text-xs tracking-widest text-slate-300">
              Follow me
            </div>
            <div className="h-20 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            <Social />
          </aside>

          {/* Main copy */}
          <div className="lg:col-span-11">
            {/* Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans !font-extrabold leading-[0.95] tracking-tight !text-white">
              RADWAN{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(90deg,#ca3500 0%,#ff6a2c 45%,#ffd0bf 100%)" }}
              >
                AHMED
              </span>
            </h1>

            <p className="mt-3  sm:text-lg font-medium text-slate-300">
              Senior Software Engineer (Front End) & UI Engineer
            </p>

            <p className="mt-4  max-w-2xl text-slate-300/90 text-[15px] leading-relaxed">
              I craft high-performance, accessible web experiences with modern React, TypeScript, Tailwind and motion.
              Focused on clean architecture, DX, and beautiful, reliable interfaces that scale.
            </p>

            {/* Quick stats */}
            <ul className="mt-6 flex flex-wrap items-center gap-3 text-[12px]">
              <Badge>6+ yrs experience</Badge>
              <Badge>45+ shipped projects</Badge>
            </ul>

            {/* CTAs – email replaced by CV modal */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/projects"
                className="group relative inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white
                           shadow-[0_10px_30px_-10px_rgba(202,53,0,0.65)] ring-1 ring-white/10
                           transition-transform duration-200 will-change-transform hover:-translate-y-0.5"
                style={{ background: "linear-gradient(180deg,#ff7a44 0%, #ca3500 100%)" }}
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/15" />
              </Link>

              {/* View CV => opens modal */}
              <Link
                href="#"
                onClick={() => setShowCV(true)}
                className="group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-slate-100
                           transition-colors ring-1 ring-white/10"
                style={{ background: "#030712" }}
              >
                Get Resume
                <Download className="h-4 w-4" />
                
                <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Social (mobile) */}
        {/* <div className="mt-6 flex items-center justify-center gap-3 lg:hidden">
          <Social />
        </div> */}
      </div>

      {/* CV Modal */}
      {showCV && <ResumeModal onClose={() => setShowCV(false)} />}

      {/* Keyframes */}
      <style jsx global>{`
        @keyframes floatA {
          0% { transform: translate3d(0,0,0) rotateX(0) rotateY(0); }
          50% { transform: translate3d(0,-14px,0) rotateX(6deg) rotateY(-6deg); }
          100% { transform: translate3d(0,0,0) rotateX(0) rotateY(0); }
        }
        @keyframes floatB {
          0% { transform: translate3d(0,0,0) rotateX(0) rotateY(0); }
          50% { transform: translate3d(0,10px,0) rotateX(-4deg) rotateY(4deg); }
          100% { transform: translate3d(0,0,0) rotateX(0) rotateY(0); }
        }
        @keyframes glow {
          0% { opacity: .6; filter: blur(14px); }
          50% { opacity: 1; filter: blur(18px); }
          100% { opacity: .6; filter: blur(14px); }
        }
      `}</style>
    </section>
  );
}

/* ---------- Bits ---------- */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-100 shadow-sm">
      {children}
    </span>
  );
}

/* ---------- CV Preview Modal ---------- */
function ResumeModal({ onClose }: { onClose: () => void }) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label="CV modal" className="fixed inset-0 z-[70] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative mx-4 w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-slate-900 text-slate-100 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-slate-100 ring-1 ring-white/10 hover:bg-white/15"
          aria-label="Close CV modal"
        >
          ✕
        </button>
        <div className="h-[70vh] w-full">
          {/* Update this path to your actual CV file */}
          <embed src="/radwanahmed-resume.pdf" type="application/pdf" className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}

/* ---------- Background (responsive right-side cubes) ---------- */
function BackgroundFX({ mouse }: { mouse: Mouse }) {
  // subtle parallax; smaller movement on small screens to avoid crowding
  const scale = typeof window !== "undefined" && window.innerWidth < 640 ? 0.6 : 1;
  const parRightA = { x: mouse.x * -14 * scale, y: mouse.y * 10 * scale };
  const parRightB = { x: mouse.x * -10 * scale, y: mouse.y * -8 * scale };
  const parOrb = { x: mouse.x * -6 * scale, y: mouse.y * -4 * scale };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {/* Deep navy wash + grain + vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,#111a28_0%,#0b1018_50%,#090e16_100%)]" />
      <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:14px_14px]" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_100%,rgba(0,0,0,0.45),transparent_60%)]" />

      {/* Primary cube (responsive size/position) */}
      <div
        className="
          absolute
          top-[20%] right-[6%]
          sm:top-[22%] sm:right-[10%]
          md:top-[22%] md:right-[16%]
          lg:top-[24%] lg:right-[22%]
          xl:top-[28%] xl:right-[15%]
          2xl:top-[28%] 2xl:right-[22%]
          h-[140px] w-[140px]
          sm:h-[180px] sm:w-[180px]
          md:h-[200px] md:w-[200px]
          lg:h-[220px] lg:w-[220px]
        "
        style={{ transform: `translate3d(${parRightA.x}px, ${parRightA.y}px, 0)` }}
      >
        <Cube3D className="animate-[floatA_9s_ease-in-out_infinite]" />
      </div>

      {/* Secondary cube (hide on very small screens) */}
      <div
        className="
          absolute hidden sm:block
          top-[40%] right-[8%]
          md:right-[14%]
          lg:right-[20%]
          xl:top-[42%] xl:right-[15%]
          2xl:top-[42%] 2xl:right-[15%]
          h-[120px] w-[120px]
          md:h-[150px] md:w-[150px]
          lg:h-[160px] lg:w-[160px]
        "
        style={{ transform: `translate3d(${parRightB.x}px, ${parRightB.y}px, 0)` }}
      >
        <Cube3D rotate className="animate-[floatB_10s_ease-in-out_infinite]" />
      </div>

      {/* Warm glowing orb near cubes */}
      <div
        className="
          absolute
          top-[18%] right-[4%]
          sm:top-[20%] sm:right-[8%]
          md:right-[12%]
          lg:right-[18%]
          h-10 w-10 sm:h-12 sm:w-12 rounded-full
        "
        style={{
          background: "radial-gradient(circle,#ffd7bf 0%, #ff9a6b 45%, rgba(255,154,107,0) 70%)",
          transform: `translate3d(${parOrb.x}px, ${parOrb.y}px, 0)`,
        }}
      />
      <div
        className="
          absolute
          top-[18%] right-[4%]
          sm:top-[20%] sm:right-[8%]
          md:right-[12%]
          lg:right-[17%]
          2xl:right-[17%]
          h-16 w-16 sm:h-20 sm:w-20 rounded-full
        "
        style={{
          background: "rgba(202,53,0,0.30)",
          transform: `translate3d(${parOrb.x}px, ${parOrb.y}px, 0)`,
          animation: "glow 4s ease-in-out infinite",
        }}
      />
    </div>
  );
}

/* ---------- Isometric cube (SVG) tuned for #ca3500 lighting ---------- */
function Cube3D({
  className,
  rotate = false,
}: {
  className?: string;
  rotate?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={{
        filter: "drop-shadow(0 30px 60px rgba(0,0,0,.55))",
        transform: rotate ? "rotate(-12deg)" : undefined,
      }}
    >
      <path d="M100 15 L180 60 L180 140 L100 185 L20 140 L20 60 Z" fill="#0f1c2c" />
      <path d="M180 60 L100 100 L100 185 L180 140 Z" fill="#0d1826" />
      <path d="M20 60 L100 100 L100 185 L20 140 Z" fill="#132236" />
      <path d="M100 15 L180 60 L100 100 L20 60 Z" fill="url(#topWarm)" />
      <defs>
        <linearGradient id="topWarm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ca3500" />
          <stop offset="0.55" stopColor="#ff7a44" />
          <stop offset="1" stopColor="#1a2a42" />
        </linearGradient>
      </defs>
    </svg>
  );
}
