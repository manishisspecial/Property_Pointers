import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "India Real Estate Market Trends 2026 — Pricing, Demand & Hot Micro-Markets | PropertyPointers",
  description:
    "Track India real estate market trends — pricing movements, demand signals and the hottest micro-markets to watch in 2026.",
  alternates: { canonical: "/insights/market-trends" },
};

export default function MarketTrendsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
