import type { Metadata } from "next";
import { Suspense } from "react";
import { ToolHero } from "@/components/tools/ToolShell";
import JsonLd, { webAppSchema, faqSchema } from "@/components/tools/JsonLd";
import RentVsBuyCalculator from "@/components/tools/calculators/RentVsBuyCalculator";
import { RENT_VS_BUY_FAQ } from "@/components/tools/calculators/faqs";

export const metadata: Metadata = {
  title: "Rent vs Buy Calculator India 2026 — Should I Rent or Buy Property? | PropertyPointers",
  description:
    "Compare the true cost of renting vs buying a home over your time horizon, factoring in EMIs, appreciation, rent growth and equity. 100% free.",
  alternates: { canonical: "/tools/rent-vs-buy" },
};

export default function RentVsBuyPage() {
  return (
    <>
      <JsonLd data={[webAppSchema("PropertyPointers Rent vs Buy Calculator", "/tools/rent-vs-buy"), faqSchema(RENT_VS_BUY_FAQ)]} />
      <ToolHero
        eyebrow="Free Tool"
        title="Rent vs Buy Calculator"
        subtitle="See whether renting or buying works out cheaper over your time horizon, accounting for EMIs, appreciation and rent growth."
      />
      <Suspense>
        <RentVsBuyCalculator />
      </Suspense>
    </>
  );
}
