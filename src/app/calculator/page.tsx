import { Suspense } from "react";
import FinancialCalculators from "@/components/FinancialCalculators";

function CalculatorsFallback() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center px-4">
      <div className="text-center text-navy-700">
        <p className="text-sm font-medium">Loading calculators…</p>
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  return (
    <Suspense fallback={<CalculatorsFallback />}>
      <FinancialCalculators />
    </Suspense>
  );
}
