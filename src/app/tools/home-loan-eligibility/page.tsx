import type { Metadata } from "next";
import { Suspense } from "react";
import { ToolHero } from "@/components/tools/ToolShell";
import JsonLd, { webAppSchema, faqSchema } from "@/components/tools/JsonLd";
import HomeLoanEligibility from "@/components/tools/calculators/HomeLoanEligibility";
import { ELIGIBILITY_FAQ } from "@/components/tools/calculators/faqs";

export const metadata: Metadata = {
  title: "Home Loan Eligibility Calculator India 2026 — How Much Loan Can I Get? | PropertyPointers",
  description:
    "Find out how much home loan you can get on your salary using the FOIR method. Factor in existing EMIs, rate and tenure. 100% free.",
  alternates: { canonical: "/tools/home-loan-eligibility" },
};

export default function EligibilityPage() {
  return (
    <>
      <JsonLd data={[webAppSchema("PropertyPointers Home Loan Eligibility Calculator", "/tools/home-loan-eligibility"), faqSchema(ELIGIBILITY_FAQ)]} />
      <ToolHero
        eyebrow="Free Tool"
        title="Home Loan Eligibility Calculator"
        subtitle="Estimate how much home loan you qualify for based on your income, existing EMIs, rate and tenure."
      />
      <Suspense>
        <HomeLoanEligibility />
      </Suspense>
    </>
  );
}
