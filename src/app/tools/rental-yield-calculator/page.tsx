import type { Metadata } from "next";
import { Suspense } from "react";
import { ToolHero } from "@/components/tools/ToolShell";
import JsonLd, { webAppSchema, faqSchema } from "@/components/tools/JsonLd";
import RentalYieldCalculator from "@/components/tools/calculators/RentalYieldCalculator";
import { RENTAL_YIELD_FAQ } from "@/components/tools/calculators/faqs";

export const metadata: Metadata = {
  title: "Rental Yield Calculator India 2026 — Calculate Property Rental Return | PropertyPointers",
  description:
    "Calculate gross rental yield from property value and monthly rent. Find out if your property earns a healthy rental return. 100% free.",
  alternates: { canonical: "/tools/rental-yield-calculator" },
};

export default function RentalYieldPage() {
  return (
    <>
      <JsonLd data={[webAppSchema("PropertyPointers Rental Yield Calculator", "/tools/rental-yield-calculator"), faqSchema(RENTAL_YIELD_FAQ)]} />
      <ToolHero
        eyebrow="Free Tool"
        title="Rental Yield Calculator"
        subtitle="Find out the gross rental yield on a property from its value and monthly rent — a quick gauge of income potential."
      />
      <Suspense>
        <RentalYieldCalculator />
      </Suspense>
    </>
  );
}
