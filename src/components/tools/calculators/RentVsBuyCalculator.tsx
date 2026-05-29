"use client";

import { useMemo, useState } from "react";
import { computeRentVsBuy, formatINR, formatINRShort } from "@/lib/finance";
import { ToolContainer, ToolCard } from "@/components/tools/ToolShell";
import { RangeInput } from "@/components/tools/RangeInput";
import { ToolResultCard } from "@/components/tools/ToolResultCard";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { ToolDisclaimer } from "@/components/tools/ToolDisclaimer";
import FAQAccordion from "@/components/FAQAccordion";
import { RENT_VS_BUY_FAQ as FAQ } from "./faqs";

export default function RentVsBuyCalculator() {
  const [price, setPrice] = useState(80_00_000);
  const [downPayment, setDownPayment] = useState(16_00_000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [rent, setRent] = useState(25_000);
  const [rentGrowth, setRentGrowth] = useState(7);
  const [appreciation, setAppreciation] = useState(6);
  const [horizon, setHorizon] = useState(10);

  const result = useMemo(
    () =>
      computeRentVsBuy({
        propertyPrice: price,
        downPayment,
        annualRate: rate,
        tenureYears: tenure,
        monthlyRent: rent,
        rentGrowthPct: rentGrowth,
        appreciationPct: appreciation,
        horizonYears: horizon,
      }),
    [price, downPayment, rate, tenure, rent, rentGrowth, appreciation, horizon]
  );

  const buys = result.recommendation === "buy";

  return (
    <ToolContainer>
      <ToolCard>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <RangeInput label="Property Price" value={price} min={10_00_000} max={5_00_00_000} step={1_00_000} onChange={setPrice} displayValue={formatINRShort(price)} />
            <RangeInput label="Down Payment" value={downPayment} min={0} max={price} step={1_00_000} onChange={setDownPayment} displayValue={formatINRShort(downPayment)} />
            <RangeInput label="Interest Rate" value={rate} min={6} max={14} step={0.05} onChange={setRate} displayValue={`${rate.toFixed(2)}%`} />
            <RangeInput label="Loan Tenure" value={tenure} min={1} max={30} step={1} onChange={setTenure} displayValue={`${tenure} years`} />
            <RangeInput label="Monthly Rent (equivalent home)" value={rent} min={5_000} max={3_00_000} step={1_000} onChange={setRent} displayValue={formatINR(rent)} />
            <RangeInput label="Annual Rent Increase" value={rentGrowth} min={0} max={15} step={0.5} onChange={setRentGrowth} displayValue={`${rentGrowth}%`} />
            <RangeInput label="Annual Appreciation" value={appreciation} min={0} max={15} step={0.5} onChange={setAppreciation} displayValue={`${appreciation}%`} />
            <RangeInput label="Comparison Horizon" value={horizon} min={1} max={30} step={1} onChange={setHorizon} displayValue={`${horizon} years`} />
          </div>

          <ToolResultCard
            headlineLabel="Recommendation"
            headline={buys ? "Buy" : "Rent"}
            headlineSub={`Over a ${horizon}-year horizon`}
            rows={[
              { label: "Net cost of buying", value: formatINRShort(result.netBuyingCost) },
              { label: "Total rent paid", value: formatINRShort(result.totalRentPaid) },
              { label: "Property value at horizon", value: formatINRShort(result.propertyValueAtHorizon) },
              { label: buys ? "You save by buying" : "You save by renting", value: formatINRShort(result.savings), highlight: true },
            ]}
            note={
              buys
                ? { tone: "good", text: "✅ Buying is cheaper over this horizon, mainly due to equity and appreciation." }
                : { tone: "info", text: "Renting is cheaper over this horizon — buying may win over a longer period." }
            }
          />
        </div>
      </ToolCard>

      <ToolCard>
        <FAQAccordion title="Rent vs Buy FAQ" items={FAQ} />
      </ToolCard>

      <ToolCard>
        <ToolGrid exclude="/tools/rent-vs-buy" />
      </ToolCard>

      <ToolDisclaimer extra="A simplified model. It excludes tax benefits, maintenance, brokerage and the opportunity cost of your down payment." />
    </ToolContainer>
  );
}
