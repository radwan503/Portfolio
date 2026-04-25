"use client";

import * as React from "react";
import { ExternalLink } from "lucide-react";
import { useEffect } from "react";


export type CreatorItem = {
  id: string;
  title: string;
  blurb?: string;
  cover?: string;
  category?: string;
  tags?: string[];
  demo?: string;
  source?: string;
};

export default function CreatorSection({
  fetchUrl = "/data/creator.json",
  heading = "Creator Studio",
  subheading = "A collection of side projects, experiments, and design kits."
}: { fetchUrl?: string; heading?: string; subheading?: string }) {
  const [items, setItems] = React.useState<CreatorItem[]>([]);
  const [loading, setLoading] = React.useState(true);

useEffect(() => {
    fetch(fetchUrl, { cache: "no-store" })
      .then((r) => { if (!r.ok) throw new Error("creator.json"); return r.json(); })
      .then((d) => setItems(d?.items ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [fetchUrl]);

  return (
    <section id="creator" className="mt-12">
      {/* Header */}
      <div className="mb-6">
      
        <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{heading}</h3>
        <p className="mt-1 text-sm text-slate-400/90">{subheading}</p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <CreatorCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

function CreatorCard({ item }: { item: CreatorItem }) {
  return (
    <article className="group relative overflow-hidden card-overlay rounded-none border border-white/10 bg-white/5 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.07]">
      {/* Content */}
      <div className="p-4">
        <h4 className="text-base font-semibold text-white">{item.title}</h4>
        
        {item.blurb && (
          <p className="mt-1 line-clamp-2 text-sm text-slate-300/90">{item.blurb}</p>
        )}

        <div className="mt-3 flex items-center gap-2">
          {item.demo && (
            <a
              href={item.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-white/10"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Live
            </a>
          )}
          
        </div>
      </div>
    </article>
  );
}
