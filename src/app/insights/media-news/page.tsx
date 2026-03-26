"use client";

import { useMemo, useState } from "react";
import { Calendar, Newspaper, Search } from "lucide-react";
import { MotionCard, MotionGrid, MotionSection } from "@/components/MarketingMotion";

const NEWS = [
  {
    title: "Delhi NCR sees strong demand for ready-to-move homes",
    source: "PropertyPointers Desk",
    topic: "market",
    date: "2026-03-20",
    excerpt: "Buyer preference is shifting toward inventory with immediate possession and clear legal status.",
  },
  {
    title: "Noida infrastructure updates boost peripheral micro-markets",
    source: "City Infrastructure Watch",
    topic: "infrastructure",
    date: "2026-03-17",
    excerpt: "New road connectivity and metro access are improving investment confidence in emerging zones.",
  },
  {
    title: "RERA compliance checklist updated for first-time investors",
    source: "Legal Insight India",
    topic: "policy",
    date: "2026-03-14",
    excerpt: "Experts recommend due diligence steps before booking under-construction projects.",
  },
  {
    title: "Rental yields improve in select urban corridors",
    source: "Market Pulse",
    topic: "rental",
    date: "2026-03-10",
    excerpt: "Steady tenant demand and moderated prices are improving rental returns in key locations.",
  },
];

export default function MediaNewsPage() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");

  const filtered = useMemo(
    () =>
      NEWS.filter((item) => {
        const matchTopic = topic === "all" || item.topic === topic;
        const q = query.toLowerCase();
        const matchQuery = !q || item.title.toLowerCase().includes(q) || item.excerpt.toLowerCase().includes(q);
        return matchTopic && matchQuery;
      }),
    [query, topic]
  );

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <MotionSection className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-navy-900 to-navy-700 text-white p-7 sm:p-10 shadow-xl">
          <p className="text-xs font-semibold tracking-wider uppercase text-gold-300">Insights</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold">Media News</h1>
          <p className="mt-3 text-gray-200 max-w-2xl">
            Track market headlines, policy changes, and city-level trends to make better real estate decisions.
          </p>
        </div>
      </MotionSection>

      <MotionSection className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="card p-5 grid gap-3 sm:grid-cols-3">
          <label className="relative sm:col-span-2">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search news"
              className="input-field pl-9"
            />
          </label>
          <select value={topic} onChange={(e) => setTopic(e.target.value)} className="input-field">
            <option value="all">All Topics</option>
            <option value="market">Market</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="policy">Policy</option>
            <option value="rental">Rental</option>
          </select>
        </div>
      </MotionSection>

      <MotionSection className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {filtered.length === 0 ? (
          <div className="card p-8 text-center text-gray-600">No media stories found for selected filters.</div>
        ) : (
          <MotionGrid className="grid gap-4 md:grid-cols-2">
            {filtered.map((item) => (
              <MotionCard key={item.title} className="card p-5">
                <div className="flex items-start gap-3">
                  <span className="rounded-lg bg-navy-50 text-navy-700 p-2">
                    <Newspaper size={18} />
                  </span>
                  <div>
                    <h3 className="font-bold text-navy-900">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{item.excerpt}</p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                      <span>{item.source}</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </MotionCard>
            ))}
          </MotionGrid>
        )}
      </MotionSection>
    </main>
  );
}
