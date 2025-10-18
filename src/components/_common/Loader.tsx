"use client";

import * as React from "react";

const ACCENT = "#ca3500";

type LoaderProps = {
  show?: boolean;
  progress?: number;           // if omitted, runs fake progress
  brand?: string;
  taglines?: string[];
  autoHideDelay?: number;
  onDone?: () => void;
};

export default function Loader({
  show = true,
  progress,
  brand = "RADWAN AHMED",
  taglines = [
    "Interfaces that ship.",
    "React • Next.js • TypeScript",
    "Performance. A11y. DX.",
    "Micro-interactions that matter",
  ],
  autoHideDelay = 280,
  onDone,
}: LoaderProps) {
  const [visible, setVisible] = React.useState(show);
  const [internalP, setInternalP] = React.useState(0);
  const [tipIdx, setTipIdx] = React.useState(0);
  const reduced = usePrefersReducedMotion();

  React.useEffect(() => setVisible(show), [show]);

  // rotate tagline
  React.useEffect(() => {
    if (!visible || taglines.length < 2) return;
    const id = setInterval(() => setTipIdx((i) => (i + 1) % taglines.length), 1700);
    return () => clearInterval(id);
  }, [visible, taglines.length]);

  // fake progress when uncontrolled
  React.useEffect(() => {
    if (typeof progress === "number" || !visible) return;
    let raf = 0;
    let v = 0;
    const tick = () => {
      const bump = (1 - v / 100) * (0.9 + Math.random() * 0.6);
      v = Math.min(99, v + bump);
      setInternalP(v);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, progress]);

  const p = Math.max(0, Math.min(100, typeof progress === "number" ? progress : internalP));

  // complete -> fade
  React.useEffect(() => {
    if (!visible || p < 100) return;
    const t = setTimeout(() => {
      setVisible(false);
      onDone?.();
    }, autoHideDelay);
    return () => clearTimeout(t);
  }, [p, visible, autoHideDelay, onDone]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#0b1018] text-slate-100"
    >
      {/* Top progress ticker */}
      <div className="absolute left-0 right-0 top-0 z-10 h-[3px] bg-white/5">
        <span
          className="block h-full"
          style={{
            width: `${p}%`,
            background: `linear-gradient(90deg,#ff9a6b, ${ACCENT})`,
            boxShadow: `0 0 18px ${ACCENT}80`,
            transition: "width 260ms ease",
          }}
        />
      </div>

      {/* Background: angled stripes + soft grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,#111a28_0%,#0b1018_55%,#090e16_100%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:14px_14px]" />
        <div className="absolute inset-0 opacity-[0.06] [background:repeating-linear-gradient(135deg,transparent_0,transparent_18px,rgba(255,255,255,.05)_18px,rgba(255,255,255,.05)_19px)]" />
      </div>

      {/* Center stage */}
      <div className="relative grid h-full place-items-center px-4">
        <div className="flex flex-col items-center">
          {/* Hex core with orbiting nodes (SVG) */}
          <div className="relative">
            <HexCore progress={p} reduced={reduced} />
          </div>

          {/* Brand + tagline */}
          <div className="mt-6 text-center">
            <h1 className="text-lg font-semibold tracking-wide">{brand}</h1>
            <p className="mt-1 min-h-5 text-sm text-slate-300/90">
              {taglines[taglines.length ? tipIdx : 0]}
            </p>
          </div>
        </div>
      </div>

      {/* local keyframes */}
      <style jsx global>{`
        @keyframes orbit {
          to { transform: rotate(360deg); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee linear infinite; }
      `}</style>
    </div>
  );
}

/* =========================
   HEX CORE with orbits
========================= */
function HexCore({ progress, reduced }: { progress: number; reduced: boolean }) {
  // arc length for progress ring (hex circ approximation via circle)
  const R = 86;
  const C = 2 * Math.PI * R;
  const dash = (Math.max(0, Math.min(100, progress)) / 100) * C;

  return (
    <svg viewBox="0 0 260 260" className="h-[220px] w-[220px] sm:h-[260px] sm:w-[260px]" aria-hidden>
      {/* soft glow */}
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={ACCENT} />
          <stop offset="0.6" stopColor="#ff9a6b" />
          <stop offset="1" stopColor="#ffd0bf" />
        </linearGradient>
        <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0f1c2c" />
          <stop offset="1" stopColor="#0b1422" />
        </linearGradient>
      </defs>

      {/* background panel */}
      <g transform="translate(130,130)">
        <polygon
          points={hexPoints(0, 0, 78)}
          fill="url(#panel)"
          stroke="rgba(255,255,255,.08)"
          strokeWidth="1"
          filter="drop-shadow(0 8px 32px rgba(0,0,0,.45))"
        />

        {/* progress ring (circular for elegance) */}
        <circle
          r={R}
          cx={0}
          cy={0}
          fill="none"
          stroke="rgba(255,255,255,.08)"
          strokeWidth="10"
        />
        <circle
          r={R}
          cx={0}
          cy={0}
          fill="none"
          stroke="url(#g1)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${C}`}
          transform="rotate(-90)"
          style={{ filter: `drop-shadow(0 0 18px ${ACCENT}66)` }}
        />

        {/* orbiting nodes */}
        {!reduced && (
          <>
            <g style={{ transformOrigin: "0px 0px", animation: "orbit 16s linear infinite" }}>
              <circle r="2.5" cx="0" cy="-102" fill="#ffd0bf" />
              <circle r="2.5" cx="0" cy="102" fill="#22d3ee" />
            </g>
            <g style={{ transformOrigin: "0px 0px", animation: "orbit 22s linear infinite reverse" }}>
              <circle r="3" cx="88" cy="0" fill="#8b5cf6" />
              <circle r="3" cx="-88" cy="0" fill="#ff9a6b" />
            </g>
          </>
        )}

        {/* code-glyph inside */}
        <g transform="scale(0.9)">
          <path d="M-20 -8 L-40 -20 L-20 -32" stroke="url(#g1)" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M20 -8 L40 -20 L20 -32" stroke="url(#g1)" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M-6 0 L6 -40" stroke="url(#g1)" strokeWidth="8" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

function hexPoints(cx: number, cy: number, r: number) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = ((60 * i - 30) * Math.PI) / 180; // flat-top hex
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
  return pts.map(([x, y]) => `${x},${y}`).join(" ");
}

/* ====== prefers-reduced-motion ====== */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(q.matches);
    on();
    q.addEventListener?.("change", on);
    return () => q.removeEventListener?.("change", on);
  }, []);
  return reduced;
}

