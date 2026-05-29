import type { Metadata } from "next";
import Link from "next/link";
import { Newspaper, Calendar, ArrowRight } from "lucide-react";
import { ToolHero } from "@/components/tools/ToolShell";
import JsonLd from "@/components/tools/JsonLd";

export const metadata: Metadata = {
  title: "India Real Estate Market News May 2026 — Property Updates & Intelligence | PropertyPointers",
  description:
    "Latest Indian real estate market news, policy updates and investment intelligence — curated for buyers, sellers and investors.",
  alternates: { canonical: "/insights/market-news" },
};

const NEWS = [
  {
    title: "Delhi NCR sees strong demand for ready-to-move homes",
    topic: "Market",
    date: "2026-05-20",
    excerpt: "Buyer preference is shifting toward inventory with immediate possession and clear legal status, tightening supply in established corridors.",
  },
  {
    title: "Noida infrastructure upgrades boost peripheral micro-markets",
    topic: "Infrastructure",
    date: "2026-05-17",
    excerpt: "New road connectivity and metro access are improving investment confidence in emerging zones along the expressway.",
  },
  {
    title: "RERA compliance checklist updated for first-time investors",
    topic: "Policy",
    date: "2026-05-14",
    excerpt: "Experts recommend a stricter due-diligence sequence before booking under-construction projects this quarter.",
  },
  {
    title: "Rental yields improve in select urban corridors",
    topic: "Rental",
    date: "2026-05-10",
    excerpt: "Steady tenant demand and moderated prices are nudging rental returns higher in key employment hubs.",
  },
  {
    title: "Home loan rates hold steady as lenders compete on spreads",
    topic: "Finance",
    date: "2026-05-06",
    excerpt: "Major banks are keeping floor rates competitive for high-CIBIL borrowers, keeping EMIs broadly stable.",
  },
  {
    title: "Plotted developments gain traction among long-horizon investors",
    topic: "Investment",
    date: "2026-05-02",
    excerpt: "Lower entry tickets and flexible build timelines are drawing patient capital toward sanctioned plotted layouts.",
  },
];

const newsSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "India Real Estate Market News",
  url: "https://www.propertypointers.com/insights/market-news",
};

export default function MarketNewsPage() {
  return (
    <>
      <JsonLd data={newsSchema} />
      <ToolHero
        eyebrow="Insights"
        title="Market News"
        subtitle="Curated Indian real-estate news, policy updates and investment intelligence — distilled for property decisions."
        breadcrumb={false}
      />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {NEWS.map((n) => (
              <article key={n.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 bg-gold-50 text-gold-700 font-semibold px-2.5 py-1 rounded-full">
                    <Newspaper size={12} /> {n.topic}
                  </span>
                  <span className="inline-flex items-center gap-1 text-gray-400">
                    <Calendar size={12} /> {new Date(n.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
                <h2 className="text-base font-bold text-navy-900 mt-3">{n.title}</h2>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{n.excerpt}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-gray-100 bg-white shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-navy-900">Explore deeper insights</h3>
              <p className="text-sm text-gray-500 mt-1">Market trends, city reports and investment guides.</p>
            </div>
            <Link href="/insights" className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm">
              Browse Insights <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
