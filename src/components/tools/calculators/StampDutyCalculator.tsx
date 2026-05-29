"use client";

import { useMemo, useState } from "react";
import { STAMP_DUTY_STATES, computeStampDuty, formatINR, formatINRShort } from "@/lib/finance";
import { ToolContainer, ToolCard } from "@/components/tools/ToolShell";
import { RangeInput } from "@/components/tools/RangeInput";
import { ToolResultCard } from "@/components/tools/ToolResultCard";
import { ComparisonTable } from "@/components/tools/ComparisonTable";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { ToolDisclaimer } from "@/components/tools/ToolDisclaimer";
import FAQAccordion from "@/components/FAQAccordion";
import { STAMP_DUTY_FAQ as FAQ } from "./faqs";

export default function StampDutyCalculator() {
  const [value, setValue] = useState(80_00_000);
  const [state, setState] = useState(STAMP_DUTY_STATES[0].state);
  const [gender, setGender] = useState<"male" | "female">("male");

  const result = useMemo(
    () => computeStampDuty({ propertyValue: value, state, gender }),
    [value, state, gender]
  );

  const stateRows = useMemo(
    () =>
      STAMP_DUTY_STATES.map((s) => {
        const r = computeStampDuty({ propertyValue: value, state: s.state, gender });
        return {
          __key: s.state,
          state: s.state,
          duty: `${(gender === "female" ? s.female : s.male).toFixed(1)}%`,
          stampDuty: formatINRShort(r.stampDuty),
          registration: formatINRShort(r.registration),
          total: formatINRShort(r.totalCharges),
        };
      }),
    [value, gender]
  );

  return (
    <ToolContainer>
      <ToolCard>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <RangeInput
              label="Property Value"
              value={value}
              min={5_00_000}
              max={5_00_00_000}
              step={1_00_000}
              onChange={setValue}
              displayValue={formatINRShort(value)}
            />
            <div>
              <label className="text-sm font-medium text-navy-700">State</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full mt-1.5 px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-navy-900 outline-none focus:border-gold-400"
              >
                {STAMP_DUTY_STATES.map((s) => (
                  <option key={s.state} value={s.state}>{s.state}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-navy-700">Buyer</label>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                {(["male", "female"] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`px-3 py-2.5 rounded-xl text-sm font-medium border capitalize transition-colors ${
                      gender === g ? "bg-navy-900 text-white border-navy-900" : "bg-gray-50 text-navy-700 border-gray-200 hover:border-gold-400"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <ToolResultCard
            headlineLabel="Total Charges"
            headline={formatINR(result.totalCharges)}
            headlineSub={`${state} · ${result.dutyPct}% stamp duty + ${result.registrationPct}% registration`}
            rows={[
              { label: "Stamp Duty", value: formatINR(result.stampDuty) },
              { label: "Registration", value: formatINR(result.registration) },
              { label: "Property Value", value: formatINRShort(value) },
              { label: "Total Outlay (incl. property)", value: formatINRShort(result.totalOutlay), highlight: true },
            ]}
            note={{ tone: "info", text: "Add these charges to your down-payment budget — they are usually not covered by a home loan." }}
          />
        </div>
      </ToolCard>

      <ToolCard>
        <ComparisonTable
          title="State-wise comparison"
          caption={`Charges on ${formatINRShort(value)} for a ${gender} buyer.`}
          columns={[
            { key: "state", header: "State" },
            { key: "duty", header: "Stamp Duty %", align: "right" },
            { key: "stampDuty", header: "Stamp Duty", align: "right" },
            { key: "registration", header: "Registration", align: "right" },
            { key: "total", header: "Total Charges", align: "right" },
          ]}
          rows={stateRows}
          highlightRowKey={state}
        />
      </ToolCard>

      <ToolCard>
        <FAQAccordion title="Stamp Duty FAQ" items={FAQ} />
      </ToolCard>

      <ToolCard>
        <ToolGrid exclude="/tools/stamp-duty-calculator" />
      </ToolCard>

      <ToolDisclaimer extra="Stamp duty and registration rates change frequently and vary by municipality. Verify the current rate on your state's registration department portal." />
    </ToolContainer>
  );
}
