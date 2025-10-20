"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import profile from "../../../public/p1.png";
import ExperienceSection from "@/components/_common/ExperienceSection";
import CreatorSection from "@/components/_common/CreatorSection";

type Profile = {
  name: string;
  aboutTitle: string;
  aboutSubTitle: string;
  aboutDescription: string;
  birthDay: string;
  age: string;
  Residence: string;
  Address: string;
  Email: string;
  Phone: string;
  Skype: string;
  Freelance: string;
  social: string;
};

type Stat = { Title: string; count: string };

const ACCENT = "#ca3500";

/* ===== utilities ===== */
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

function useCountUp(target: number, run: boolean, ms = 900) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3)))); // easeOutCubic
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, target, ms]);
  return n;
}

/* ===== main ===== */
export default function About() {
  const [info, setInfo] = useState<Profile[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/about.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load JSON");
        return res.json();
      })
      .then((data) => {
        setInfo(data.profile || []);
        setStats(data.count || []);
      })
      .catch((err) => console.error("Error loading about.json", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-slate-400">
        Loading...
      </div>
    );
  }

  if (!info.length) return null;
  const me = info[0];

  return (
    <section id="about" className="relative isolate min-h-[92svh] overflow-hidden bg-[#0b1018] text-slate-100">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,#111a28_0%,#0b1018_50%,#090e16_100%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:14px_14px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Content */}
          <div className="lg:col-span-8">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wider"
              style={{ color: "#ffd7c8", background: `${ACCENT}1a`, border: `1px solid ${ACCENT}44` }}
            >
              ABOUT
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {me.aboutTitle}
            </h2>
            <p className="mt-2 text-base sm:text-lg font-semibold text-slate-300/95">
              {me.aboutSubTitle}
            </p>

            <p className="mt-6 text-[15px] sm:text-[16px] leading-relaxed text-slate-300/90">
              I{" "}
              <mark className="rounded px-1 py-0.5" style={{ background: `${ACCENT}26`, color: "#ffe1d6" }}>
                develop and design
              </mark>{" "}
              {me.aboutDescription}. I bring 6+ years of experience across React, Next.js, TypeScript, and modern UI
              tooling. I currently serve at <strong>City Bank</strong>, building responsive, secure web applications for
              digital banking.
            </p>

            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-slate-300/90">
              <p>
                Previously, with a <strong>Ukraine-based software company</strong>, I delivered 10+ interactive,
                responsive websites, led code reviews, and maintained device-wide UI consistency.
              </p>
            </div>

            {/* Read more — rewritten professionally */}
            <details className="mt-2">
              <summary className="cursor-pointer list-none select-none py-3 text-slate-200/90 transition hover:text-white">
                <span className="inline-flex items-center gap-2" style={{ borderBottom: `1px solid ${ACCENT}` }} >
                  {/* <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} /> */}
                  More about my background
                </span>
              </summary>
              <div className="space-y-4 pb-1 text-[15px] leading-relaxed text-slate-300/90">
                <p>
                  At <strong>QCOOM</strong>, I contributed to e-commerce, food delivery, and courier platforms. I worked
                  closely with designers and product managers to translate prototypes into robust, accessible interfaces
                  and implemented scalable component systems that accelerated delivery across teams.
                </p>
                <p>
                  Earlier at <strong>Tiger IT Bangladesh Ltd</strong>, I helped ship HRM and task-management solutions,
                  integrating RESTful APIs and optimizing performance for cross-platform environments. I partnered with
                  QA to define acceptance criteria and improve release quality.
                </p>
                <p>
                  I’m passionate about UI/UX quality, performance, and maintainability. I mentor junior developers,
                  advocate for accessible patterns, and champion workflows that improve developer experience and speed
                  without sacrificing reliability.
                </p>
                <p>
                  My portfolio spans national, international, and freelance engagements across finance, e-commerce, and
                  enterprise operations—often collaborating with distributed teams and delivering to tight, regulated
                  timelines.
                </p>
              </div>
            </details>

            {/* skills chips */}
            <div className="mt-5 flex flex-wrap gap-2">
              {[me.age,me.Residence,me.birthDay]
                .filter(Boolean)
                .flatMap((s) => s.split(","))
                .map((skill, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-100/90 ring-1 ring-white/10"
                  >
                    {skill.trim()}
                  </span>
                ))}
            </div>
          </div>

          {/* Profile card with multi-color animated rings */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <AnimatedProfile />
            </div>
          </aside>
        </div>

        <ExperienceSection/>

        <CreatorSection
          heading="Creator Studio"
          subheading="Small experiments, UI kits, and concept builds."
        />

        {/* Stats with count-up */}
        <div className="mt-8 sm:mt-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {stats.map((s, i) => (
              <StatCard key={i} title={s.Title} rawCount={s.count} delay={i * 120} />
            ))}
          </div>
        </div>

        
      </div>

      <style jsx>{`
        mark {
          background: ${ACCENT}33;
          color: #ffe1d6;
          padding: 0 0.25rem;
          border-radius: 0.25rem;
        }
      `}</style>

      {/* local keyframes */}
      <style jsx global>{`
        @keyframes spin-slow {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse-slower {
          to {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </section>
  );
}

/* ===== animated profile (multicolor rotating ring) ===== */
function AnimatedProfile() {
  return (
    <div className="relative mx-auto w-[260px] sm:w-[300px] md:w-[340px]" aria-label="Profile image with animated rings">
      {/* Outer glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 blur-2xl opacity-30"
        style={{ background: `radial-gradient(60% 60% at 50% 50%, ${ACCENT}66, transparent 60%)` }}
      />

      {/* Multicolor conic ring (thick) */}
      <div
        className="absolute inset-[-12px] rounded-full animate-[spin-slow_9s_linear_infinite]"
        style={{
          background:
            "conic-gradient(from 0deg, #ca3500, #ff7a44, #ffb199, #8b5cf6, #22d3ee, #ca3500)",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 10px), #000 0)",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 10px), #000 0)",
          filter: "drop-shadow(0 8px 24px rgba(0,0,0,.35))",
        }}
      />

      {/* Inner accent ring (thin, counter-rotating) */}
      <div
        className="absolute inset-[-2px] rounded-full animate-[spin-reverse-slower_16s_linear_infinite]"
        style={{
          background: "conic-gradient(from 90deg, #ffffff10, #ffffff25, #ffffff10)",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 0)",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 0)",
        }}
      />

      {/* Dotted ring overlay */}
      <svg
        className="pointer-events-none absolute inset-0 animate-[spin-reverse-slower_14s_linear_infinite]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff9b73" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="url(#grad)"
          strokeOpacity="0.8"
          strokeWidth="1.6"
          strokeDasharray="1.2 6.2"
        />
      </svg>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-full ring-1 ring-white/10">
        <Image
          src={profile}
          alt="Profile"
          fill
          sizes="(max-width: 768px) 260px, (max-width: 1024px) 300px, 340px"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}

/* ===== stat card (count-up) ===== */
function StatCard({ title, rawCount, delay = 0 }: { title: string; rawCount: string; delay?: number }) {
  const { ref, seen } = useIntersectionOnce<HTMLDivElement>({ threshold: 0.25 });
  const numeric = Number((rawCount || "").replace(/[^\d.]/g, "")) || 0;
  const suffix = (rawCount || "").replace(/[0-9.]/g, "");
  const value = useCountUp(numeric, seen, 800 + delay);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden py-4 text-left "
    >
      <div
        className="pointer-events-none absolute -inset-8 opacity-20 blur-2xl"
        
      />
      <div className="relative z-10">
        <div className="text-2xl sm:text-3xl font-extrabold">
          {value}
          {suffix}
        </div>
        <p className="mt-1 text-[12px] uppercase tracking-wide text-slate-300/85">{title}</p>
      </div>
    </div>
  );
}
