"use client";

import { useMemo, useState } from "react";
import { computeAffordability, formatINR, formatINRShort } from "@/lib/finance";
import { ToolContainer, ToolCard } from "@/components/tools/ToolShell";
import { RangeInput } from "@/components/tools/RangeInput";
import { ToolResultCard } from "@/components/tools/ToolResultCard";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { ToolDisclaimer } from "@/components/tools/ToolDisclaimer";
import FAQAccordion from "@/components/FAQAccordion";
import { AFFORDABILITY_FAQ as FAQ } from "./faqs";

export default function AffordabilityCalculator() {
  const [income, setIncome] = useState(1_00_000);
  const [existingEmi, setExistingEmi] = useState(0);
  const [downPayment, setDownPayment] = useState(15_00_000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const result = useMemo(
    () => computeAffordability({ monthlyIncome: income, existingEmi, downPayment, annualRate: rate, tenureYears: tenure }),
    [income, existingEmi, downPayment, rate, tenure]
  );

  return (
    <ToolContainer>
      <ToolCard>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <RangeInput label="Monthly Income" value={income} min={20_000} max={10_00_000} step={5_000} onChange={setIncome} displayValue={formatINR(income)} />
            <RangeInput label="Existing EMIs" value={existingEmi} min={0} max={3_00_000} step={1_000} onChange={setExistingEmi} displayValue={formatINR(existingEmi)} />
            <RangeInput label="Down Payment Available" value={downPayment} min={0} max={2_00_00_000} step={1_00_000} onChange={setDownPayment} displayValue={formatINRShort(downPayment)} />
            <RangeInput label="Interest Rate" value={rate} min={6} max={14} step={0.05} onChange={setRate} displayValue={`${rate.toFixed(2)}%`} />
            <RangeInput label="Tenure" value={tenure} min={1} max={30} step={1} onChange={setTenure} displayValue={`${tenure} years`} />
          </div>

          <ToolResultCard
            headlineLabel="You Can Afford Up To"
            headline={formatINRShort(result.propertyBudget)}
            headlineSub={`Loan ${formatINRShort(result.eligibleLoan)} + down payment ${formatINRShort(downPayment)}`}
            rows={[
              { label: "Eligible Loan", value: formatINRShort(result.eligibleLoan) },
              { label: "Max Affordable EMI", value: formatINR(result.maxEmi), highlight: true },
              { label: "Down Payment", value: formatINRShort(downPayment) },
            ]}
            note={{ tone: "info", text: "Remember to keep ~7-8% aside for stamp duty, registration and other charges." }}
          />
        </div>
      </ToolCard>

      <ToolCard>
        <FAQAccordion title="Affordability FAQ" items={FAQ} />
      </ToolCard>

      <ToolCard>
        <ToolGrid exclude="/tools/affordability" />
      </ToolCard>

      <ToolDisclaimer extra="Budget excludes stamp duty, registration, brokerage and interiors. Keep an emergency buffer beyond the down payment." />
    </ToolContainer>
  );
}
