"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

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

    const errors: Record<string, string> = {};

    if (!name) errors.name = "Your name is required.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email.";
    }
    if (!subject) errors.subject = "Please add a subject.";
    if (!message || message.length < 10) {
      errors.message = "Message should be at least 10 characters.";
    }

    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    if (Object.keys(errors).length) {
      setStatus({
        ok: false,
        message: "Please fix the highlighted fields.",
      });
      return;
    }

    try {
      setLoading(true);

      const phone = "8801873843384";

      const whatsappText = encodeURIComponent(
        `👋 New Global Project Inquiry\n\n` +
          `Name: ${name}\n` +
          `Email: ${email}\n` +
          `Subject: ${subject}\n` +
          `Message: ${message}`
      );

      const whatsappURL = `https://wa.me/${phone}?text=${whatsappText}`;
      const linkedInURL = "https://www.linkedin.com/in/your-profile";

      window.open(whatsappURL, "_blank");
      window.open(linkedInURL, "_blank");

      setStatus({
        ok: true,
        message: "Message prepared! WhatsApp and LinkedIn opened.",
      });

      form.reset();
      setTouched({});
    } catch (err: any) {
      setStatus({
        ok: false,
        message: err?.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  const markTouched = (k: string) =>
    setTouched((t) => ({
      ...t,
      [k]: true,
    }));

  const getError = (k: string): string | undefined => {
    if (!formRef.current) return;

    const data = new FormData(formRef.current);
    const v = String(data.get(k) || "").trim();

    if (k === "name" && !v && touched[k]) return "Your name is required.";

    if (
      k === "email" &&
      touched[k] &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
    ) {
      return "Enter a valid email.";
    }

    if (k === "subject" && !v && touched[k]) {
      return "Please add a subject.";
    }

    if (k === "message" && touched[k] && v.length < 10) {
      return "Message should be at least 10 characters.";
    }

    return undefined;
  };

  return (
    <main className="relative isolate min-h-[calc(100svh-106px)] overflow-hidden bg-[#0b1018] text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,#111a28_0%,#080d14_50%,#070b11_100%)]" />

        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:42px_42px]" />

        {/* <div
          className="absolute left-0 right-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
          }}
        /> */}
      </div>

      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-10 lg:px-8">
        <h1 className="text-balance text-3xl font-extrabold tracking-tight sm:text-5xl">
          Let’s build world-class digital products together
        </h1>

        <p className="mt-3 max-w-2xl text-slate-300/90">
          Share your project goals, timeline, and requirements. I work with clients
          globally and usually respond within one business day.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ContactCard
            icon={<Mail className="h-5 w-5" />}
            title="Email"
            subtitle="For project inquiries"
            value="radwananik.ra@gmail.com"
            href="mailto:radwananik.ra@gmail.com"
          />

          <ContactCard
            icon={<Phone className="h-5 w-5" />}
            title="WhatsApp"
            subtitle="Global project discussion"
            value="(+880) 1873-843384"
            href="https://wa.me/8801873843384"
          />

          <ContactCard
            icon={<MapPin className="h-5 w-5" />}
            title="Worldwide Service"
            subtitle="Remote collaboration"
            value="Available globally"
          />
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="relative rounded-none border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
              {status && (
                <div
                  className={`mb-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                    status.ok
                      ? "bg-emerald-500/10 text-emerald-300"
                      : "bg-rose-500/10 text-rose-300"
                  }`}
                >
                  {status.ok ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              <form
                ref={formRef}
                onSubmit={onSubmit}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                <div>
                  <label className="text-sm text-slate-300">Name</label>
                  <input
                    name="name"
                    onBlur={() => markTouched("name")}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100 outline-none transition focus:border-[#ca3500]/60 focus:ring-2 focus:ring-[#ca3500]/20"
                  />
                  <FieldError msg={getError("name")} />
                </div>

                <div>
                  <label className="text-sm text-slate-300">Email</label>
                  <input
                    name="email"
                    type="email"
                    onBlur={() => markTouched("email")}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100 outline-none transition focus:border-[#ca3500]/60 focus:ring-2 focus:ring-[#ca3500]/20"
                  />
                  <FieldError msg={getError("email")} />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm text-slate-300">Subject</label>
                  <input
                    name="subject"
                    onBlur={() => markTouched("subject")}
                    placeholder="Website design, frontend development, dashboard UI..."
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-[#ca3500]/60 focus:ring-2 focus:ring-[#ca3500]/20"
                  />
                  <FieldError msg={getError("subject")} />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm text-slate-300">Message</label>
                  <textarea
                    name="message"
                    rows={6}
                    onBlur={() => markTouched("message")}
                    placeholder="Tell me about your project, target audience, timeline, features, and any reference links."
                    className="mt-1 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-[#ca3500]/60 focus:ring-2 focus:ring-[#ca3500]/20"
                  />
                  <FieldError msg={getError("message")} />
                </div>

                <div className="flex justify-end sm:col-span-2">
                  <button
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-[#ff8a5b] to-[#ca3500] px-4 py-2 font-semibold text-white shadow-[0_12px_30px_-12px_rgba(202,53,0,0.75)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="grid gap-4">
              <aside className="rounded-none border border-white/10 bg-white/5 p-5 ring-1 ring-white/10">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                  What to include
                </h3>

                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300/90">
                  <li>Project type and business goals</li>
                  <li>Target market and preferred timeline</li>
                  <li>Required pages, features, or integrations</li>
                  <li>Figma, reference websites, or existing brand assets</li>
                </ul>
              </aside>

              <aside className="rounded-none border border-white/10 bg-white/5 p-5 ring-1 ring-white/10">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                  Availability
                </h3>

                <p className="mt-2 text-sm text-slate-300/90">
                  Serving clients worldwide
                </p>

                <p className="text-sm text-slate-300/90">
                  Remote-friendly · Flexible across time zones
                </p>
              </aside>

              <aside className="rounded-none border border-white/10 bg-white/5 p-5 ring-1 ring-white/10">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                  FAQ
                </h3>

                <details className="mt-2">
                  <summary className="cursor-pointer select-none text-sm text-[#9dbbdc]">
                    Do you work with international clients?
                  </summary>

                  <p className="mt-2 text-sm text-slate-300/90">
                    Yes. I work remotely with clients worldwide using clear
                    communication, milestone-based delivery, and async updates.
                  </p>
                </details>

                <details className="mt-2">
                  <summary className="cursor-pointer select-none text-sm text-[#9dbbdc]">
                    Can you handle complete frontend projects?
                  </summary>

                  <p className="mt-2 text-sm text-slate-300/90">
                    Yes. I can build responsive websites, landing pages,
                    dashboards, UI systems, and React/Next.js frontend
                    applications.
                  </p>
                </details>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactCard({
  icon,
  title,
  subtitle,
  value,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-none border border-white/10 bg-white/5 p-5 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.07]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-16 -z-10 opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-40"
        style={{
          background: `radial-gradient(60% 60% at 50% 50%, ${ACCENT}55, transparent)`,
        }}
      />

      <div className="flex items-start gap-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-200">
          {icon}
        </div>

        <div>
          <div className="text-[13px] uppercase tracking-wide text-slate-400">
            {title}
          </div>

          <div className="text-base font-semibold text-white">
            {href ? (
              <a href={href} className="hover:underline" target="_blank" rel="noreferrer">
                {value}
              </a>
            ) : (
              value
            )}
          </div>

          {subtitle && <div className="text-sm text-slate-400">{subtitle}</div>}
        </div>
      </div>
    </div>
  );
}