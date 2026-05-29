import type { Metadata } from "next";
import { Suspense } from "react";
import { ToolHero } from "@/components/tools/ToolShell";
import JsonLd, { webAppSchema, faqSchema } from "@/components/tools/JsonLd";
import RoiCalculator from "@/components/tools/calculators/RoiCalculator";
import { ROI_FAQ } from "@/components/tools/calculators/faqs";

export const metadata: Metadata = {
  title: "Property ROI Calculator India 2026 — Real Estate Return on Investment | PropertyPointers",
  description:
    "Calculate total and annualised (CAGR) return on your property investment. Compare purchase price vs current value over your holding period. 100% free.",
  alternates: { canonical: "/tools/roi-calculator" },
};

export default function RoiPage() {
  return (
    <>
      <JsonLd data={[webAppSchema("PropertyPointers ROI Calculator", "/tools/roi-calculator"), faqSchema(ROI_FAQ)]} />
      <ToolHero
        eyebrow="Free Tool"
        title="Property ROI Calculator"
        subtitle="Measure your real estate return on investment — total gain and annualised CAGR over your holding period."
      />
      <Suspense>
        <RoiCalculator />
      </Suspense>
    </>
  );
}
