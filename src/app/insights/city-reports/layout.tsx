import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "City-wise Property Market Reports India 2026 — Price Bands & Demand | PropertyPointers",
  description:
    "City-wise property market reports for India — price bands, demand and investment insights across major metros and emerging markets.",
  alternates: { canonical: "/insights/city-reports" },
};

export default function CityReportsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
