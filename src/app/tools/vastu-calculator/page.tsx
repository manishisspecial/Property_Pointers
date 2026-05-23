import { Suspense } from "react";
import VastuCalculator from "@/components/VastuCalculator";

function VastuFallback() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center px-4">
      <div className="text-center text-navy-700">
        <p className="text-sm font-medium">Loading Vastu Calculator…</p>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Vastu Score Calculator | PropertyPointers",
  description:
    "Get an indicative Vastu analysis of your property based on room direction placements. Download a branded PDF report with score, grade, and recommendations.",
};

export default function VastuCalculatorPage() {
  return (
    <Suspense fallback={<VastuFallback />}>
      <VastuCalculator />
    </Suspense>
  );
}
