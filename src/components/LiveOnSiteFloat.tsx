"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

const POLL_MS = 60_000;

export default function LiveOnSiteFloat() {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const r = await fetch("/api/public/active-visitors", { cache: "no-store" });
        const data: { activeVisitors?: number } = await r.json();
        if (cancelled) return;
        if (typeof data.activeVisitors === "number") {
          setCount(data.activeVisitors);
          setError(false);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    };

    load();
    const id = window.setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  if (error && count == null) return null;

  const formatted =
    count != null ? new Intl.NumberFormat("en-IN").format(count) : "…";

  return (
    <div
      className="fixed bottom-6 left-6 z-50 group"
      role="status"
      aria-live="polite"
      aria-label={`${formatted} users live on site`}
    >
      <div className="flex items-center gap-2.5 rounded-full bg-navy-900/90 backdrop-blur-md text-white pl-3 pr-4 py-2 shadow-2xl border border-white/10 hover:bg-navy-800 transition-colors">
        <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
          Live
        </span>
        <span className="h-3 w-px bg-white/20" aria-hidden />
        <Users size={14} className="text-gold-400" aria-hidden />
        <span className="text-sm font-semibold tabular-nums">{formatted}</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-300">
          On Site
        </span>
      </div>
      <span className="absolute bottom-full left-0 mb-2 bg-navy-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
        Visitors browsing in the last 15 minutes
      </span>
    </div>
  );
}
