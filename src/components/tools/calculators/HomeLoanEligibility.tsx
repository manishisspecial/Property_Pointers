"use client";

import { useMemo, useState } from "react";
import { computeLoanEligibility, formatINR, formatINRShort } from "@/lib/finance";
import { ToolContainer, ToolCard } from "@/components/tools/ToolShell";
import { RangeInput } from "@/components/tools/RangeInput";
import { ToolResultCard } from "@/components/tools/ToolResultCard";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { ToolDisclaimer } from "@/components/tools/ToolDisclaimer";
import FAQAccordion from "@/components/FAQAccordion";
import { ELIGIBILITY_FAQ as FAQ } from "./faqs";

export default function HomeLoanEligibility() {
  const [income, setIncome] = useState(1_00_000);
  const [existingEmi, setExistingEmi] = useState(0);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const result = useMemo(
    () => computeLoanEligibility({ monthlyIncome: income, existingEmi, annualRate: rate, tenureYears: tenure }),
    [income, existingEmi, rate, tenure]
  );

  return (
    <ToolContainer>
      <ToolCard>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <RangeInput label="Monthly Income" value={income} min={20_000} max={10_00_000} step={5_000} onChange={setIncome} displayValue={formatINR(income)} />
            <RangeInput label="Existing EMIs" value={existingEmi} min={0} max={3_00_000} step={1_000} onChange={setExistingEmi} displayValue={formatINR(existingEmi)} />
            <RangeInput label="Interest Rate" value={rate} min={6} max={14} step={0.05} onChange={setRate} displayValue={`${rate.toFixed(2)}%`} />
            <RangeInput label="Tenure" value={tenure} min={1} max={30} step={1} onChange={setTenure} displayValue={`${tenure} years`} />
          </div>

          <ToolResultCard
            headlineLabel="Eligible Loan Amount"
            headline={formatINRShort(result.eligibleLoan)}
            headlineSub={`At ${rate.toFixed(2)}% for ${tenure} years (FOIR 50%)`}
            rows={[
              { label: "Max Affordable EMI", value: formatINR(result.maxEmi), highlight: true },
              { label: "Monthly Income", value: formatINR(income) },
              { label: "Existing EMIs", value: formatINR(existingEmi) },
            ]}
            note={{ tone: "info", text: "Adding a co-applicant's income can significantly increase your eligible loan." }}
          />
        </div>
      </ToolCard>

      <ToolCard>
        <FAQAccordion title="Home Loan Eligibility FAQ" items={FAQ} />
      </ToolCard>

      <ToolCard>
        <ToolGrid exclude="/tools/home-loan-eligibility" />
      </ToolCard>

      <ToolDisclaimer extra="Eligibility uses a 50% FOIR assumption. Banks also assess credit score, employment, age and property valuation." />
    </ToolContainer>
  );
}
