"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  Code2,
  Cpu,
  Database,
  Layers3,
  Zap,
  Braces,
  FileCode2,
} from "lucide-react";
import Social from "../_common/Social";

type Mouse = { x: number; y: number };

const ACCENT = "#ca3500";

const orbitSkills = [
  {
    name: "React",
    icon: <Braces className="h-4 w-4" />,
    className: "left-[50%] top-[0%]",
  },
  {
    name: "Next.js",
    icon: <Code2 className="h-4 w-4" />,
    className: "right-[-4%] top-[26%]",
  },
  {
    name: "JavaScript",
    icon: <FileCode2 className="h-4 w-4" />,
    className: "right-[-10%] bottom-[20%]",
  },
  {
    name: "TypeScript",
    icon: <Cpu className="h-4 w-4" />,
    className: "left-[44%] bottom-[0%]",
  },
  {
    name: "Tailwind CSS",
    icon: <Layers3 className="h-4 w-4" />,
    className: "left-[10%] bottom-[24%]",
  },
  {
    name: "REST API",
    icon: <Database className="h-4 w-4" />,
    className: "left-[8%] top-[24%]",
  },
];

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
      className="relative isolate overflow-hidden bg-[#080d14] text-slate-100"
      aria-label="Radwan Ahmed — Senior Frontend Engineer Portfolio Hero"
    >
      <BackgroundFX />

      <div ref={wrapRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[calc(100svh-106px)] grid-cols-1 items-center gap-10 py-10 sm:py-10 lg:grid-cols-12">
          <aside className="hidden lg:col-span-1 lg:flex lg:flex-col lg:items-center lg:gap-3">
            <div className="rounded-full bg-white/10 p-2 ring-1 ring-white/10">
              <span
                className="block h-1.5 w-1.5 animate-pulse rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
            </div>

            <div className="h-20 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

            <div className="-ml-0.5 rotate-180 [writing-mode:vertical-rl] text-xs tracking-widest text-slate-300">
              Follow me
            </div>

            <div className="h-20 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

            <Social />
          </aside>

          <div className="lg:col-span-6">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              Frontend Engineer · React · Next.js · UI Motion
            </div>

            <h1 className="text-4xl font-extrabold leading-[0.95] tracking-tight !text-white sm:text-6xl md:text-7xl">
              RADWAN{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg,#ca3500 0%,#ff6a2c 45%,#ffd0bf 100%)",
                }}
              >
                AHMED
              </span>
            </h1>

            <p className="mt-3 font-medium text-slate-300 sm:text-lg">
              Senior Software Engineer (Front End) & UI Engineer
            </p>

            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-300/90">
              I craft high-performance, accessible web experiences with modern React,
              TypeScript, Tailwind, and motion. Focused on clean architecture,
              developer experience, and beautiful, reliable interfaces that scale.
            </p>

            <ul className="mt-6 flex flex-wrap items-center gap-3 text-[12px]">
              <Badge>6+ yrs experience</Badge>
              <Badge>45+ shipped projects</Badge>
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/projects"
                className="group relative inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(202,53,0,0.65)] ring-1 ring-white/10 transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(180deg,#ff7a44 0%, #ca3500 100%)",
                }}
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <button
                type="button"
                onClick={() => setShowCV(true)}
                className="inline-flex items-center gap-2 rounded-full bg-[#030712] px-6 py-3 text-sm font-semibold text-slate-100 ring-1 ring-white/10 transition-colors hover:bg-white/[0.04]"
              >
                View Resume
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="relative hidden md:block min-h-[360px] sm:min-h-[430px] lg:col-span-5 lg:min-h-[520px]">
            <FrontendGalaxy mouse={mouse} />
          </div>
        </div>
      </div>

      {showCV && <ResumeModal onClose={() => setShowCV(false)} />}

      <style jsx global>{`
        @keyframes galaxySpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes galaxySpinReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes floatSkill {
          0%,
          100% {
            transform: translate3d(-50%, -50%, 0) scale(1);
          }
          50% {
            transform: translate3d(-50%, calc(-50% - 10px), 0) scale(1.04);
          }
        }

        @keyframes centerPulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(202, 53, 0, 0.35);
          }
          50% {
            transform: scale(1.04);
            box-shadow: 0 0 0 18px rgba(202, 53, 0, 0);
          }
        }

        @keyframes lineMove {
          0% {
            stroke-dashoffset: 430;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes glow {
          0%,
          100% {
            opacity: 0.55;
            filter: blur(18px);
          }
          50% {
            opacity: 1;
            filter: blur(24px);
          }
        }
      `}</style>
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-100">
      {children}
    </span>
  );
}

function ResumeModal({ onClose }: { onClose: () => void }) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="CV modal"
      className="fixed inset-0 z-[70] flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative mx-4 w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-slate-900 text-slate-100 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-slate-100 ring-1 ring-white/10 hover:bg-white/15"
          aria-label="Close CV modal"
        >
          ✕
        </button>

        <div className="h-[70vh] w-full">
          <embed
            src="/radwanahmed-resume.pdf"
            type="application/pdf"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}

function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,#111a28_0%,#080d14_50%,#070b11_100%)]" />

      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:42px_42px]" />

      {/* <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_100%,rgba(0,0,0,0.55),transparent_60%)]" /> */}

      {/* <div
        className="absolute right-[8%] top-[12%] h-72 w-72 rounded-full bg-[#ca3500]/20 blur-3xl"
        style={{
          transform: `translate3d(${mouse.x * -8}px, ${mouse.y * -6}px, 0)`,
          animation: "glow 5s ease-in-out infinite",
        }}
      /> */}

      {/* <div className="absolute -right-28 bottom-24 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" /> */}
    </div>
  );
}

function FrontendGalaxy({ mouse }: { mouse: Mouse }) {
  const x = mouse.x * 8;
  const y = mouse.y * 6;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-visible"
      style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
    >
      <div className="relative h-[300px] w-[300px] sm:h-[380px] sm:w-[380px] lg:h-[430px] lg:w-[430px]">
        <div
          className="absolute inset-0 rounded-full border border-white/10"
          style={{ animation: "galaxySpin 38s linear infinite" }}
        />

        <div
          className="absolute inset-8 rounded-full border border-dashed border-orange-300/20 sm:inset-10"
          style={{ animation: "galaxySpinReverse 30s linear infinite" }}
        />

        <div
          className="absolute inset-16 rounded-full border border-white/10 sm:inset-20"
          style={{ animation: "galaxySpin 24s linear infinite" }}
        />

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 430 430">
          <path
            d="M215 215 C 90 80, 340 70, 215 215 C 90 350, 350 340, 215 215"
            fill="none"
            stroke="rgba(202,53,0,.35)"
            strokeWidth="1.2"
            strokeDasharray="8 12"
            style={{ animation: "lineMove 9s linear infinite" }}
          />

          <path
            d="M215 215 C 340 90, 345 330, 215 215 C 90 90, 80 330, 215 215"
            fill="none"
            stroke="rgba(255,255,255,.13)"
            strokeWidth="1"
            strokeDasharray="6 14"
            style={{ animation: "lineMove 12s linear infinite reverse" }}
          />
        </svg>

        <div className="absolute left-1/2 top-1/2 z-10 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-orange-300/30 bg-[#101827]/90 shadow-[0_0_90px_rgba(202,53,0,.35)] backdrop-blur-xl sm:h-32 sm:w-32 lg:h-36 lg:w-36">
          <div
            className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-gradient-to-b from-[#ff7a44] to-[#ca3500] text-white shadow-[0_20px_60px_rgba(202,53,0,.45)] sm:h-24 sm:w-24"
            style={{ animation: "centerPulse 3.5s ease-in-out infinite" }}
          >
            <Zap className="mb-1 h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-[10px] font-bold sm:text-xs">FRONTEND</span>
          </div>
        </div>

        {orbitSkills.map((skill, index) => (
          <div
            key={skill.name}
            className={`absolute z-20 ${skill.className}`}
            style={{
              animation: `floatSkill ${6 + index}s ease-in-out infinite`,
              animationDelay: `${index * -0.45}s`,
            }}
          >
            <div className="group flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0f1724]/90 px-3 py-2 text-[10px] font-semibold text-slate-100 shadow-[0_20px_60px_rgba(0,0,0,.45)] backdrop-blur-xl transition-transform hover:scale-105 sm:px-4 sm:py-3 sm:text-xs">
              <span className="text-orange-300">{skill.icon}</span>
              {skill.name}
            </div>
          </div>
        ))}

        <div className="absolute left-[8%] top-[48%] h-3 w-3 rounded-full bg-orange-300 shadow-[0_0_24px_rgba(255,122,68,.9)]" />
        <div className="absolute right-[18%] top-[48%] h-2 w-2 rounded-full bg-white/70 shadow-[0_0_20px_rgba(255,255,255,.65)]" />
        <div className="absolute bottom-[16%] left-[44%] h-2.5 w-2.5 rounded-full bg-[#ca3500] shadow-[0_0_22px_rgba(202,53,0,.9)]" />
      </div>
    </div>
  );
}