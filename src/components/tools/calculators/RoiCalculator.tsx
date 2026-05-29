"use client";

import { useMemo, useState } from "react";
import { computeRoi, formatINR, formatINRShort } from "@/lib/finance";
import { ToolContainer, ToolCard } from "@/components/tools/ToolShell";
import { RangeInput } from "@/components/tools/RangeInput";
import { ToolResultCard } from "@/components/tools/ToolResultCard";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { ToolDisclaimer } from "@/components/tools/ToolDisclaimer";
import FAQAccordion from "@/components/FAQAccordion";
import { ROI_FAQ as FAQ } from "./faqs";

export default function RoiCalculator() {
  const [initial, setInitial] = useState(50_00_000);
  const [final, setFinal] = useState(80_00_000);
  const [years, setYears] = useState(5);

  const result = useMemo(() => computeRoi(initial, final, years), [initial, final, years]);

  return (
    <ToolContainer>
      <ToolCard>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <RangeInput label="Purchase Price" value={initial} min={5_00_000} max={5_00_00_000} step={1_00_000} onChange={setInitial} displayValue={formatINRShort(initial)} />
            <RangeInput label="Current / Sale Value" value={final} min={5_00_000} max={10_00_00_000} step={1_00_000} onChange={setFinal} displayValue={formatINRShort(final)} />
            <RangeInput label="Holding Period" value={years} min={1} max={30} step={1} onChange={setYears} displayValue={`${years} years`} />
          </div>

          <ToolResultCard
            headlineLabel="Annualised Return"
            headline={`${result.annualised.toFixed(1)}%`}
            headlineSub={`Over ${years} years · CAGR`}
            rows={[
              { label: "Total Gain", value: formatINR(result.gain) },
              { label: "Total ROI", value: `${result.totalRoi.toFixed(1)}%`, highlight: true },
              { label: "Purchase Price", value: formatINRShort(initial) },
              { label: "Sale Value", value: formatINRShort(final) },
            ]}
            note={
              result.annualised >= 10
                ? { tone: "good", text: "✅ Strong annualised return relative to typical residential property." }
                : result.annualised >= 0
                ? { tone: "info", text: "Moderate return — compare against alternatives like FDs, index funds or rental yield." }
                : { tone: "warn", text: "⚠️ Negative return over this period. Re-check your inputs or holding strategy." }
            }
          />
        </div>
      </ToolCard>

      <ToolCard>
        <FAQAccordion title="ROI Calculator FAQ" items={FAQ} />
      </ToolCard>

      <ToolCard>
        <ToolGrid exclude="/tools/roi-calculator" />
      </ToolCard>

      <ToolDisclaimer extra="ROI here reflects capital appreciation only and excludes rental income, taxes, brokerage and maintenance." />
    </ToolContainer>
  );
}
