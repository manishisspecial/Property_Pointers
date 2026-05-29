"use client";

import { useMemo, useState } from "react";
import { computeRentalYield, formatINR, formatINRShort } from "@/lib/finance";
import { ToolContainer, ToolCard } from "@/components/tools/ToolShell";
import { RangeInput } from "@/components/tools/RangeInput";
import { ToolResultCard } from "@/components/tools/ToolResultCard";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { ToolDisclaimer } from "@/components/tools/ToolDisclaimer";
import FAQAccordion from "@/components/FAQAccordion";
import { RENTAL_YIELD_FAQ as FAQ } from "./faqs";

export default function RentalYieldCalculator() {
  const [value, setValue] = useState(80_00_000);
  const [rent, setRent] = useState(25_000);

  const result = useMemo(() => computeRentalYield(value, rent), [value, rent]);

  return (
    <ToolContainer>
      <ToolCard>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <RangeInput label="Property Value" value={value} min={5_00_000} max={5_00_00_000} step={1_00_000} onChange={setValue} displayValue={formatINRShort(value)} />
            <RangeInput label="Monthly Rent" value={rent} min={2_000} max={5_00_000} step={1_000} onChange={setRent} displayValue={formatINR(rent)} />
          </div>

          <ToolResultCard
            headlineLabel="Gross Rental Yield"
            headline={`${result.grossYield.toFixed(2)}%`}
            headlineSub="Annual rent ÷ property value"
            rows={[
              { label: "Annual Rent", value: formatINR(result.annualRent) },
              { label: "Monthly Rent", value: formatINR(rent) },
              { label: "Property Value", value: formatINRShort(value), highlight: true },
            ]}
            note={
              result.grossYield >= 4
                ? { tone: "good", text: "✅ Healthy yield for Indian residential real estate." }
                : result.grossYield >= 2.5
                ? { tone: "info", text: "Typical metro yield. Remember to deduct maintenance and vacancy for net yield." }
                : { tone: "warn", text: "⚠️ Low yield — the property may be priced high relative to achievable rent." }
            }
          />
        </div>
      </ToolCard>

      <ToolCard>
        <FAQAccordion title="Rental Yield FAQ" items={FAQ} />
      </ToolCard>

      <ToolCard>
        <ToolGrid exclude="/tools/rental-yield-calculator" />
      </ToolCard>

      <ToolDisclaimer extra="This shows gross yield. Net yield is lower after maintenance, property tax, insurance and vacancy." />
    </ToolContainer>
  );
}
