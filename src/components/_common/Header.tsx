// app/components/Header.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, X, Phone, Sun, Moon, Download, Github, Linkedin, Mail, Globe2,
} from "lucide-react";
import { useEffect } from "react";

type Item = { label: string; href: string };

const ACCENT = "#ca3500";

/** Top-level pages (no anchors) */
const MAIN_ITEMS: Item[] = [
  { label: "HOME",     href: "/" },
  { label: "ABOUT",     href: "/about" },
  { label: "PROJECTS",  href: "/projects" },
  { label: "SKILLS",    href: "/skills" },
  { label: "SERVICES",  href: "/services" },
  { label: "CONTACT",   href: "/contact" },
];

const PREVIEW_ITEMS: Item[] = [{ label: "Blog", href: "/blog" }];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [time, setTime] = React.useState<string>("");

  const items = pathname?.startsWith("/preview") ? PREVIEW_ITEMS : MAIN_ITEMS;

  const isActive = (href: string) => pathname === href;

  // Dhaka time
  useEffect(() => {
    const update = () =>
      setTime(
        new Date(
          new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
        ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

   const hour = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
  ).getHours();

  return (
    <header className="sticky top-0 z-50">
      {/* Info strip (contentful, brand color) */}
      <div className=" bg-white/80 dark:bg-slate-950/70" >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-1.5 flex items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-oswald font-semibold"
                style={{ color: ACCENT, background: `${ACCENT}14`, border: `1px solid ${ACCENT}33` }}>
            <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
            Open for freelance
          </span>
          <span className="hidden md:inline text-slate-600 dark:text-slate-300 font-oswald">
            Senior Software Engineer — React • Next.js • TypeScript • UI Systems
          </span>

          <div className="ml-auto flex items-center gap-3 text-slate-600 dark:text-slate-300">
            <span className="hidden sm:inline-flex items-center gap-1 font-oswald">
              <Globe2 className="h-3.5 w-3.5 opacity-70" />
              Dhaka • {time || "—:—"}
            </span>
            <button
              className="inline-flex items-center justify-center rounded-md p-1.5 hover:bg-slate-900/5 dark:hover:bg-white/5"
              aria-label="Toggle theme"
            >
              {hour >= 6 && hour < 18 ? (
                  <Sun className="h-4 w-4 " />
                ) : (
                  <Moon className="h-4 w-4 " />
                )}
            </button>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        id="navbarId"
        className="supports-[backdrop-filter]:bg-white/60 bg-white/80 dark:bg-slate-900/70 dark:supports-[backdrop-filter]:bg-slate-900/50"
        style={{ borderColor: "rgba(255,255,255,.35)" }}
        aria-label="Primary"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Brand */}
            <Link href="/" aria-label="Home" className="group inline-flex items-center gap-3">
              <span
                className="grid h-10 w-10 place-content-center rounded-2xl text-white text-lg font-bold shadow-md ring-1 ring-black/5"
                style={{ background: `radial-gradient(120% 120% at 20% 0%, #ff8a5b, ${ACCENT})` }}
              >
                R
              </span>
              <div className="leading-tight">
                <div className="font-semibold text-slate-900 dark:text-white font-oswald">
                  Radwan <span className="opacity-60">Ahmed</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-oswald">
                  Frontend • UI Engineering
                </div>
              </div>
            </Link>

            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-8">
              <ul className="flex items-center gap-1">
                {items.map((it,index) => (
                  <li key={it.label}>
                    <NavLink href={it.href} active={isActive(it.href)} accent={ACCENT}>
                     <span className=" text-[13px] font-oswald">{"//"} {it.label}</span> <sup className="text-[#ff8a5b]">0{index+1}</sup>
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* Socials */}
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-oswald">
                <IconLink href="https://github.com/radwan503" label="GitHub" accent={ACCENT}>
                  <Github className="h-5 w-5" />
                </IconLink>
                <IconLink href="https://www.linkedin.com/in/radwanahmedanik/" label="LinkedIn" accent={ACCENT}>
                  <Linkedin className="h-5 w-5" />
                </IconLink>
                <IconLink href="mailto:radwananik.ra@gmail.com" label="Email" accent={ACCENT}>
                  <Mail className="h-5 w-5" />
                </IconLink>
              </div>

              {/* CTAs: strong primary + quiet secondary */}
              <div className="flex items-center gap-2">
                <a
                  href="tel:01873843384"
                  title="01873843384"
                  className="font-oswald group relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition will-change-transform hover:-translate-y-0.5"
                  style={{
                    background: `linear-gradient(180deg,#ff8a5b 0%, ${ACCENT} 100%)`,
                    boxShadow: `0 10px 24px -10px ${ACCENT}a0`,
                  }}
                >
                  <Phone className="h-4 w-4" />
                  Hire Me
                  <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/20" />
                  <span className="pointer-events-none absolute -inset-1 rounded-full opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-40"
                        style={{ background: `${ACCENT}55` }} />
                </a>

                <a
                  href="/radwanahmed-resume.pdf"
                  className="group font-oswald relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-[#ff8a5b] transition will-change-transform hover:-translate-y-0.5"
                  style={{
                    background: `#030712`,
                    boxShadow: `0 10px 24px -10px ${ACCENT}a0`,
                  }}
                >
                  <span className="inline-flex items-center gap-1 text-[#ff8a5b] font-oswald">
                    <Download className="h-4 w-4 opacity-100" />
                    CV
                  </span>
                </a>
              </div>
            </div>

            {/* Mobile toggler */}
            <button
              className="lg:hidden inline-flex items-center justify-center rounded-xl p-2.5 text-slate-700 hover:bg-slate-900/5 dark:text-slate-200 dark:hover:bg-white/5"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile sheet */}
        <div className={`lg:hidden transition-[max-height] duration-300 ease-out overflow-hidden ${open ? "max-h-[70vh]" : "max-h-0"}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-4">
            <ul className="space-y-1 font-oswald">
              {items.map((it) => (
                <li className="font-oswald" key={it.label}>
                  <MobileLink  href={it.href} active={isActive(it.href)} accent={ACCENT}>
                    {it.label}
                  </MobileLink>
                </li>
              ))}
            </ul>

            {/* Mobile extras */}
            <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-900/10 pt-4 dark:border-white/10">
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <span className="h-2 w-2 rounded-full animate-pulse font-oswald" style={{ background: ACCENT }} />
                <span className="font-oswald">Open to roles & projects • Dhaka • {time || "—:—"}</span>
              </div>

              <div className="flex gap-2">
                <a
                  href="tel:01873843384"
                  className="flex-1 font-oswald inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white"
                  style={{ background: `linear-gradient(180deg,#ff8a5b 0%, ${ACCENT} 100%)` }}
                >
                  <Phone className="h-4 w-4" />
                  Hire Me
                </a>
                <a
                  href="/radwanahmed-resume.pdf"
                  className="flex-1 font-oswald inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-900/5 dark:text-slate-100 dark:hover:bg-white/5"
                  style={{ border: "1px solid rgba(255,255,255,.12)" }}
                >
                  <Download className="h-4 w-4 mr-1.5" />
                  CV
                </a>
              </div>

              <div className="flex font-oswald items-center justify-center gap-3 text-slate-600 dark:text-slate-300">
                <IconLink href="https://github.com/" label="GitHub" className="flex-1 justify-center" accent={ACCENT}>
                  <Github className="h-5 w-5" />
                </IconLink>
                <IconLink href="https://linkedin.com/" label="LinkedIn" className="flex-1 justify-center" accent={ACCENT}>
                  <Linkedin className="h-5 w-5" />
                </IconLink>
                <IconLink href="mailto:radwan@example.com" label="Email" className="flex-1 justify-center" accent={ACCENT}>
                  <Mail className="h-5 w-5" />
                </IconLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Accent divider */}
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg,transparent, ${ACCENT}66, transparent)` }} />
    </header>
  );
}

/* ---------- Building blocks (no underlines, animated hover) ---------- */
function NavLink({
  href,
  active,
  children,
  accent,
}: React.PropsWithChildren<{ href: string; active?: boolean; accent: string }>) {
  return (
    <Link
      href={href}
      className={[
        "group relative inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition",
        "text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white",
        "hover:-translate-y-[1px]",
      ].join(" ")}
      style={
        active
          ? { background: `${accent}17`, border: `1px solid ${accent}33` }
          : { }
      }
    >
      {/* sliding dot on hover */}
      <span
        className="absolute left-2 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
        style={{ background: accent, transform: "translateX(-6px) translateY(-50%)" }}
      />
      <span className="relative">{children}</span>
      {/* subtle pill bg on hover */}
      <span
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "var(--nav-pill-bg, rgba(0,0,0,0.04))" }}
      />
      <style jsx>{`
        :global(html.dark) a:hover > span:last-child {
          background: rgba(255,255,255,0.06);
        }
      `}</style>
    </Link>
  );
}

function MobileLink({
  href,
  active,
  children,
  accent,
}: React.PropsWithChildren<{ href: string; active?: boolean; accent: string }>) {
  return (
    <Link
      href={href}
      className={[
        "block w-full rounded-xl px-3 py-2 text-base transition",
        "hover:bg-slate-900/5 dark:hover:bg-white/5",
        active ? "text-white" : "text-slate-800 dark:text-slate-100",
      ].join(" ")}
      style={active ? { background: `${accent}22`, border: `1px solid ${accent}55` } : {}}
    >
      {children}
    </Link>
  );
}

function IconLink({
  href,
  label,
  className = "",
  children,
  accent,
}: React.PropsWithChildren<{ href: string; label: string; className?: string; accent: string }>) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`group relative inline-flex items-center rounded-lg p-2 ${className} hover:bg-slate-900/5 dark:hover:bg-white/5`}
    >
      <span className="transition-colors group-hover:text-white" style={{ color: "inherit" }}>
        {children}
      </span>
      <style jsx>{`
        a.group:hover svg { color: ${accent}; filter: drop-shadow(0 2px 8px ${accent}66); }
      `}</style>
    </Link>
  );
}
