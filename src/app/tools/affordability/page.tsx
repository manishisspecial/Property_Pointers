import type { Metadata } from "next";
import { Suspense } from "react";
import { ToolHero } from "@/components/tools/ToolShell";
import JsonLd, { webAppSchema, faqSchema } from "@/components/tools/JsonLd";
import AffordabilityCalculator from "@/components/tools/calculators/AffordabilityCalculator";
import { AFFORDABILITY_FAQ } from "@/components/tools/calculators/faqs";

export const metadata: Metadata = {
  title: "Property Affordability Calculator India 2026 — Can I Afford This Property? | PropertyPointers",
  description:
    "Find the maximum property price you can afford based on income, existing EMIs and down payment. Combines loan eligibility with your savings. 100% free.",
  alternates: { canonical: "/tools/affordability" },
};

export default function AffordabilityPage() {
  return (
    <>
      <JsonLd data={[webAppSchema("PropertyPointers Affordability Calculator", "/tools/affordability"), faqSchema(AFFORDABILITY_FAQ)]} />
      <ToolHero
        eyebrow="Free Tool"
        title="Affordability Calculator"
        subtitle="Find the maximum property price within your reach — combining the loan you can service with the down payment you have."
      />
      <Suspense>
        <AffordabilityCalculator />
      </Suspense>
    </>
  );
}
