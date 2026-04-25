'use client'

import { useEffect, useState } from "react";

type ExperienceItem = {
  year: string;
  companyName: string;
  location?: string;
  role1?: string; role2?: string; role3?: string; role4?: string; role5?: string; role6?: string;
  techStack?: Array<{ stack1?: string; stack2?: string; stack3?: string; stack4?: string; stack5?: string }>;
};

const ACCENT = "#ca3500";

function ExperienceSection() {
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/experience.json", { cache: "no-store" })
      .then((r) => { if (!r.ok) throw new Error("experience.json"); return r.json(); })
      .then((d) => setItems(d?.experience ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-36 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
        ))}
      </div>
    );
  }

  if (!items.length) return null;

  return (
    <section id="experience" className="mt-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-wide text-slate-200">Experience</h3>
        <span className="text-xs text-slate-400">{items.length} roles</span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {items.map((job, idx) => {
          const roles = [job.role1, job.role2, job.role3, job.role4, job.role5, job.role6].filter(Boolean) as string[];
          const base = roles.slice(0, 2);
          const more = roles.slice(2);
          const stacks = (job.techStack ?? [])
            .flatMap(s => [s.stack1, s.stack2, s.stack3, s.stack4, s.stack5])
            .filter(Boolean) as string[];

          return (
            <div key={idx} className="group relative">
              <div className="relative rounded-2xl p-[1px]">
                {/* gradient border */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-none opacity-60"
                  //style={{ background: `linear-gradient(135deg, ${ACCENT}66, transparent 40%, transparent 60%, ${ACCENT}44)` }}
                />
                <div className="relative z-10 card-overlay rounded-none border border-white/10 bg-white/5 p-5 ring-1 ring-white/10 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-white/[0.07]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[15px] font-semibold">
                        {job.companyName}
                        {job.location && (
                          <span className="ml-2 text-xs tracking-wider text-slate-400">{job.location}</span>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs uppercase tracking-wide text-slate-400">{job.year}</p>
                    </div>
                  </div>

                  {/* primary bullets */}
                  <ul className="mt-3 space-y-1.5 text-sm text-slate-300/90">
                    {base.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: ACCENT }} />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>

                  {/* read more */}
                  {!!more.length && (
                    <details className="mt-2">
                      <summary className="cursor-pointer select-none text-sm text-[#9dbbdc]">Read more</summary>
                      <ul className="mt-2 space-y-1.5 text-sm text-slate-300/90">
                        {more.map((r, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: ACCENT }} />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}

                  {/* tech stack chips */}
                  {!!stacks.length && (
                    <div className="mt-4 text-sm text-slate-300/80">
                      <span className="mr-2 text-slate-400">Tech Stack:</span>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {stacks.map((s, i) => (
                          <span
                            key={i}
                            className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ExperienceSection;