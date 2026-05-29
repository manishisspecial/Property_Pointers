import type { Metadata } from "next";
import { Suspense } from "react";
import { ToolHero } from "@/components/tools/ToolShell";
import JsonLd, { webAppSchema, faqSchema } from "@/components/tools/JsonLd";
import EmiCalculator from "@/components/tools/calculators/EmiCalculator";
import { EMI_FAQ } from "@/components/tools/calculators/faqs";

export const metadata: Metadata = {
  title: "Free Home Loan EMI Calculator India 2026 — Monthly EMI, Interest & Amortization | PropertyPointers",
  description:
    "Calculate exact monthly home loan EMI, total interest, principal vs interest split and tenure comparison. Compare bank rates. 100% free.",
  alternates: { canonical: "/tools/emi-calculator" },
};

export default function EmiCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          webAppSchema("PropertyPointers EMI Calculator", "/tools/emi-calculator"),
          faqSchema(EMI_FAQ),
        ]}
      />
      <ToolHero
        eyebrow="Free Tool"
        title="Home Loan EMI Calculator"
        subtitle="Calculate your monthly EMI, total interest and a year-wise breakup. Adjust the loan amount, rate and tenure to see results update instantly."
      />
      <Suspense>
        <EmiCalculator />
      </Suspense>
    </>
  );
}
