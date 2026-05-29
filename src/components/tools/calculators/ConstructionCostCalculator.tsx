"use client";

import { useMemo, useState } from "react";
import {
  CONSTRUCTION_RATES,
  ConstructionQuality,
  computeConstructionCost,
  formatINR,
  formatINRShort,
} from "@/lib/finance";
import { ToolContainer, ToolCard } from "@/components/tools/ToolShell";
import { RangeInput } from "@/components/tools/RangeInput";
import { ToolResultCard } from "@/components/tools/ToolResultCard";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { ToolDisclaimer } from "@/components/tools/ToolDisclaimer";
import FAQAccordion from "@/components/FAQAccordion";
import { CONSTRUCTION_FAQ as FAQ } from "./faqs";

const QUALITIES = Object.keys(CONSTRUCTION_RATES) as ConstructionQuality[];

export default function ConstructionCostCalculator() {
  const [area, setArea] = useState(1500);
  const [quality, setQuality] = useState<ConstructionQuality>("standard");

  const result = useMemo(() => computeConstructionCost(area, quality), [area, quality]);

  return (
    <ToolContainer>
      <ToolCard>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <RangeInput label="Built-up Area" value={area} min={300} max={10_000} step={50} onChange={setArea} displayValue={`${area.toLocaleString("en-IN")} sq ft`} />
            <div>
              <label className="text-sm font-medium text-navy-700">Construction Quality</label>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                {QUALITIES.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuality(q)}
                    className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                      quality === q ? "bg-navy-900 text-white border-navy-900" : "bg-gray-50 text-navy-700 border-gray-200 hover:border-gold-400"
                    }`}
                  >
                    {CONSTRUCTION_RATES[q].label}
                    <span className="block text-[11px] opacity-70">₹{CONSTRUCTION_RATES[q].perSqft}/sqft</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <ToolResultCard
            headlineLabel="Estimated Construction Cost"
            headline={formatINRShort(result.total)}
            headlineSub={`${area.toLocaleString("en-IN")} sq ft × ₹${result.rate}/sq ft`}
            rows={[
              { label: "Civil work (55%)", value: formatINR(result.breakdown.civil) },
              { label: "Finishing (25%)", value: formatINR(result.breakdown.finishing) },
              { label: "MEP (12%)", value: formatINR(result.breakdown.mep) },
              { label: "Fees & misc (8%)", value: formatINR(result.breakdown.fees), highlight: true },
            ]}
            note={{ tone: "info", text: "Land cost, boundary wall, approvals and GST are not included in this estimate." }}
          />
        </div>
      </ToolCard>

      <ToolCard>
        <FAQAccordion title="Construction Cost FAQ" items={FAQ} />
      </ToolCard>

      <ToolCard>
        <ToolGrid exclude="/tools/construction-cost" />
      </ToolCard>

      <ToolDisclaimer extra="Per-sq-ft rates are indicative averages and vary significantly by city, material prices and contractor." />
    </ToolContainer>
  );
}
