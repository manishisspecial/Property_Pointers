import type { Metadata } from "next";
import { Suspense } from "react";
import { ToolHero } from "@/components/tools/ToolShell";
import JsonLd, { webAppSchema, faqSchema } from "@/components/tools/JsonLd";
import StampDutyCalculator from "@/components/tools/calculators/StampDutyCalculator";
import { STAMP_DUTY_FAQ } from "@/components/tools/calculators/faqs";

export const metadata: Metadata = {
  title: "Stamp Duty Calculator India 2026 — State-wise Registration Charges | PropertyPointers",
  description:
    "Calculate stamp duty and registration charges state-wise for men and women buyers. Compare total property registration costs across Indian states. 100% free.",
  alternates: { canonical: "/tools/stamp-duty-calculator" },
};

export default function StampDutyPage() {
  return (
    <>
      <JsonLd
        data={[
          webAppSchema("PropertyPointers Stamp Duty Calculator", "/tools/stamp-duty-calculator"),
          faqSchema(STAMP_DUTY_FAQ),
        ]}
      />
      <ToolHero
        eyebrow="Free Tool"
        title="Stamp Duty Calculator"
        subtitle="Estimate stamp duty and registration charges by state and buyer gender, and compare the total registration cost across India."
      />
      <Suspense>
        <StampDutyCalculator />
      </Suspense>
    </>
  );
}
