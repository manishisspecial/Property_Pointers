import type { Metadata } from "next";
import { Suspense } from "react";
import VastuCalculator from "@/components/VastuCalculator";
import JsonLd, { webAppSchema, faqSchema } from "@/components/tools/JsonLd";

function VastuFallback() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center px-4">
      <div className="text-center text-navy-700">
        <p className="text-sm font-medium">Loading Vastu Calculator…</p>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Free AI Vastu Calculator India 2026 — Score, Room Analysis & PDF Report | PropertyPointers",
  description:
    "Get an indicative Vastu analysis of your property based on room direction placements. Download a branded PDF report with score, grade and recommendations. 100% free.",
  alternates: { canonical: "/tools/vastu-calculator" },
};

const VASTU_FAQ = [
  { question: "What is a good Vastu score for a home?", answer: "A score above 75% is generally considered favourable. Lower scores usually have specific room placements (kitchen, master bedroom, entrance) that can often be improved with simple remedies." },
  { question: "Is the Vastu score scientific or indicative?", answer: "Vastu Shastra is a traditional system of architecture. This calculator gives an indicative score based on room directions and should be treated as guidance, not a definitive assessment." },
  { question: "Can I get a report?", answer: "Yes — you can download a branded PDF report with your score, grade and room-wise recommendations." },
];

export default function VastuCalculatorPage() {
  return (
    <>
      <JsonLd data={[webAppSchema("PropertyPointers AI Vastu Calculator", "/tools/vastu-calculator"), faqSchema(VASTU_FAQ)]} />
      <Suspense fallback={<VastuFallback />}>
        <VastuCalculator />
      </Suspense>
    </>
  );
}
