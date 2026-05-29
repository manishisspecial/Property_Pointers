import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Investment Guides India 2026 — ROI, Rental Yield, Due Diligence & NRI | PropertyPointers",
  description:
    "Practical property investment guides for India — ROI, rental yield, due diligence and NRI investing, written for clarity.",
  alternates: { canonical: "/insights/investment-guides" },
};

export default function InvestmentGuidesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
