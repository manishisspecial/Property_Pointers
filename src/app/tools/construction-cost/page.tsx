import type { Metadata } from "next";
import { Suspense } from "react";
import { ToolHero } from "@/components/tools/ToolShell";
import JsonLd, { webAppSchema, faqSchema } from "@/components/tools/JsonLd";
import ConstructionCostCalculator from "@/components/tools/calculators/ConstructionCostCalculator";
import { CONSTRUCTION_FAQ } from "@/components/tools/calculators/faqs";

export const metadata: Metadata = {
  title: "Construction Cost Calculator India 2026 — Estimate Home Building Cost per sq ft | PropertyPointers",
  description:
    "Estimate the cost to build a house in India by built-up area and quality. See a civil, finishing, MEP and fees breakdown. 100% free.",
  alternates: { canonical: "/tools/construction-cost" },
};

export default function ConstructionCostPage() {
  return (
    <>
      <JsonLd data={[webAppSchema("PropertyPointers Construction Cost Calculator", "/tools/construction-cost"), faqSchema(CONSTRUCTION_FAQ)]} />
      <ToolHero
        eyebrow="Free Tool"
        title="Construction Cost Calculator"
        subtitle="Estimate the cost to build your home by built-up area and finish quality, with an indicative cost breakdown."
      />
      <Suspense>
        <ConstructionCostCalculator />
      </Suspense>
    </>
  );
}
