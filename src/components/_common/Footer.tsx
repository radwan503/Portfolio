// app/components/Footer.tsx
"use client";

import React from "react";
import { Github, Linkedin, Mail, Twitter, Heart, ArrowUpRight, Code2 } from "lucide-react";
import Link from "next/link";

const ACCENT = "#ca3500";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  { icon: <Github className="h-4 w-4" />, href: "https://github.com/yourusername", label: "GitHub" },
  { icon: <Linkedin className="h-4 w-4" />, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
  { icon: <Twitter className="h-4 w-4" />, href: "https://twitter.com/yourusername", label: "Twitter" },
  { icon: <Mail className="h-4 w-4" />, href: "mailto:hello@example.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-[#0b1018] text-slate-300">
      {/* glow accent background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] [background-image:radial-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:16px_16px]"
      />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-[#ff8a5b]" />
              <span className="text-lg font-bold text-white">YourName</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-slate-400/90">
              Building modern, performant digital experiences with React, Next.js, and Tailwind. Passionate about UI/UX and developer experience.
            </p>
            <div className="mt-4 flex gap-3">
              {SOCIALS.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Explore</h3>
            <ul className="mt-3 space-y-1 text-sm">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex items-center gap-1 hover:text-white">
                    {l.label} <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Let’s Collaborate</h3>
            <p className="mt-3 text-sm text-slate-400/90 max-w-md">
              Have an idea or project in mind? Let’s turn it into reality. Drop your email below and I’ll get back within 24 hours.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex max-w-md flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-slate-500 focus:border-white/20"
              />
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-b from-[#ff8a5b] to-[#ca3500] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} YourName. All rights reserved. Built with <span className="text-[#ff8a5b]">Next.js</span> & <span className="text-[#ca3500]">TailwindCSS</span>.
          </p>
          <p className="inline-flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-rose-500" /> in Bangladesh.
          </p>
        </div>
      </div>
    </footer>
  );
}