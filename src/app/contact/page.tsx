"use client";

import React from "react";
import { Mail, Phone, MapPin, Clock3, Send, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import emailjs from "@emailjs/browser";

const ACCENT = "#ca3500";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-rose-400">{msg}</p>;
}

export default function ContactPage() {
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState<null | { ok: boolean; message: string }>(null);
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const formRef = React.useRef<HTMLFormElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();
    const website = String(data.get("website") || "").trim(); // honeypot

    const errors: Record<string, string> = {};
    if (!name) errors.name = "Your name is required.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email.";
    if (!subject) errors.subject = "Please add a subject.";
    if (!message || message.length < 10) errors.message = "Message should be at least 10 characters.";
    if (website) errors.website = ""; // bots

    setTouched({ name: true, email: true, subject: true, message: true });

    if (Object.keys(errors).length) {
      setStatus({ ok: false, message: "Please fix the highlighted fields." });
      return;
    }

    try {
      setLoading(true);

      // EmailJS client-only send
      // Make sure you created a template with variables: from_name, reply_to, subject, message
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("Missing EmailJS env vars. Set NEXT_PUBLIC_EMAILJS_* in .env.local");
      }

      const templateParams = {
        from_name: name,
        reply_to: email,
        subject,
        message,
      } as Record<string, string>;

      await emailjs.send(serviceId, templateId, templateParams, { publicKey });

      setStatus({ ok: true, message: "Thanks! Your message has been sent." });
      form.reset();
      setTouched({});
    } catch (err: any) {
      setStatus({ ok: false, message: err?.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  const markTouched = (k: string) => setTouched((t) => ({ ...t, [k]: true }));

  const getError = (k: string): string | undefined => {
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    const v = String(data.get(k) || "").trim();
    if (k === "name" && !v && touched[k]) return "Your name is required.";
    if (k === "email" && touched[k] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email.";
    if (k === "subject" && !v && touched[k]) return "Please add a subject.";
    if (k === "message" && touched[k] && v.length < 10) return "Message should be at least 10 characters.";
    return undefined;
  };

  return (
    <main className="relative isolate min-h-[92svh] overflow-hidden bg-[#0b1018] text-slate-100">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,#111a28_0%,#0b1018_55%,#090e16_100%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:14px_14px]" />
        <div className="absolute left-0 right-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <h1 className="text-balance text-3xl font-extrabold tracking-tight sm:text-5xl">Let’s build something great together</h1>
        <p className="mt-3 max-w-2xl text-slate-300/90">Tell me about your project, timeline, and goals. I usually respond within one business day.</p>

        {/* Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ContactCard icon={<Mail className="h-5 w-5" />} title="Email" subtitle="Prefer async?" value="radwananik.ra@gmail.com" href="mailto:radwananik.ra@gmail.com" />
          <ContactCard icon={<Phone className="h-5 w-5" />} title="Phone" subtitle="Sat, 10–6" value="(+880) 1873-843384" href="tel:+8801723000000" />
          <ContactCard icon={<MapPin className="h-5 w-5" />} title="Location" subtitle="Open to remote" value="Dhaka, Bangladesh" />
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="mx-auto mt-8 max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-8">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
              <div aria-hidden className="pointer-events-none absolute -inset-20 -z-10 opacity-20 blur-2xl" style={{ background: `radial-gradient(60% 60% at 50% 50%, ${ACCENT}66, transparent)` }} />

              {/* status */}
              {status && (
                <div className={`mb-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${status.ok ? "bg-emerald-500/10 text-emerald-300" : "bg-rose-500/10 text-rose-300"}`}>
                  {status.ok ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                  <span>{status.message}</span>
                </div>
              )}

              <form ref={formRef} onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* honeypot */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

                <div className="sm:col-span-1">
                  <label className="text-sm text-slate-300">Name</label>
                  <input name="name" onBlur={() => markTouched("name")} placeholder="Jane Doe" className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none ring-0 placeholder:text-slate-500 focus:border-white/20" />
                  <FieldError msg={getError("name")} />
                </div>

                <div className="sm:col-span-1">
                  <label className="text-sm text-slate-300">Email</label>
                  <input name="email" type="email" onBlur={() => markTouched("email")} placeholder="jane@company.com" className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none ring-0 placeholder:text-slate-500 focus:border-white/20" />
                  <FieldError msg={getError("email")} />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm text-slate-300">Subject</label>
                  <input name="subject" onBlur={() => markTouched("subject")} placeholder="Project inquiry, collaboration, etc." className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none ring-0 placeholder:text-slate-500 focus:border-white/20" />
                  <FieldError msg={getError("subject")} />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm text-slate-300">Message</label>
                  <textarea name="message" onBlur={() => markTouched("message")} rows={6} placeholder="Share a bit about your goals, timeline, and budget…" className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none ring-0 placeholder:text-slate-500 focus:border-white/20" />
                  <FieldError msg={getError("message")} />
                </div>

                <div className="sm:col-span-2 flex items-center justify-between">
                  <p className="text-xs text-slate-400 inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4" /> I usually reply within 24 hours.
                  </p>
                  <button disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-[#ff8a5b] to-[#ca3500] px-4 py-2 font-semibold text-white disabled:opacity-60">
                    {loading ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>) : (<><Send className="h-4 w-4" /> Send Message</>)}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="grid gap-4">
              <aside className="rounded-2xl border border-white/10 bg-white/5 p-5 ring-1 ring-white/10">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">What to include</h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300/90">
                  <li>What problem are we solving?</li>
                  <li>Timeline and key milestones</li>
                  <li>Team, stack, constraints</li>
                  <li>Links to brief / Figma / repo</li>
                </ul>
              </aside>
              <aside className="rounded-2xl border border-white/10 bg-white/5 p-5 ring-1 ring-white/10">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Office & Hours</h3>
                <p className="mt-2 text-sm text-slate-300/90">Dhaka, Bangladesh — GMT+6</p>
                <p className="text-sm text-slate-300/90">Sat–Fri · 10:00–18:00</p>
              </aside>
              <aside className="rounded-2xl border border-white/10 bg-white/5 p-5 ring-1 ring-white/10">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">FAQ</h3>
                <details className="mt-2">
                  <summary className="cursor-pointer select-none text-sm text-[#9dbbdc]">Do you take fixed-price projects?</summary>
                  <p className="mt-2 text-sm text-slate-300/90">Yes. After a short discovery, I’ll share scope, estimate, and milestones.</p>
                </details>
                <details className="mt-2">
                  <summary className="cursor-pointer select-none text-sm text-[#9dbbdc]">What’s the usual kickoff time?</summary>
                  <p className="mt-2 text-sm text-slate-300/90">Typically within 1–2 weeks depending on current capacity.</p>
                </details>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactCard({ icon, title, subtitle, value, href }: { icon: React.ReactNode; title: string; subtitle?: string; value: string; href?: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.07]">
      <div aria-hidden className="pointer-events-none absolute -inset-16 -z-10 opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-40" style={{ background: `radial-gradient(60% 60% at 50% 50%, ${ACCENT}55, transparent)` }} />
      <div className="flex items-start gap-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-200">{icon}</div>
        <div>
          <div className="text-[13px] uppercase tracking-wide text-slate-400">{title}</div>
          <div className="text-base font-semibold text-white">{href ? <a href={href} className="hover:underline">{value}</a> : value}</div>
          {subtitle && <div className="text-sm text-slate-400">{subtitle}</div>}
        </div>
      </div>
    </div>
  );
}

// ================================================
// Setup notes (keep outside the component)
// ================================================
// 1) Install EmailJS browser SDK:
//    npm i @emailjs/browser
//
// 2) Create a template in https://dashboard.emailjs.com with variables:
//    from_name, reply_to, subject, message
//
// 3) Add to .env.local (public, safe for client):
//    NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
//    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
//    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
//
// 4) Restart dev server. Done.
