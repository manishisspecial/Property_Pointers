"use client";

import { useMemo, useState } from "react";
import {
  BANK_RATES,
  buildAmortizationSchedule,
  computeEmi,
  formatINR,
  formatINRShort,
} from "@/lib/finance";
import { ToolContainer, ToolCard } from "@/components/tools/ToolShell";
import { RangeInput } from "@/components/tools/RangeInput";
import { ToolResultCard } from "@/components/tools/ToolResultCard";
import { ComparisonTable } from "@/components/tools/ComparisonTable";
import { LockedSection } from "@/components/tools/LockedSection";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { ToolDisclaimer } from "@/components/tools/ToolDisclaimer";
import FAQAccordion from "@/components/FAQAccordion";
import { EMI_FAQ as FAQ } from "./faqs";

const TENURES = [10, 15, 20, 25, 30];

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(50_00_000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const result = useMemo(() => computeEmi(loanAmount, rate, tenure), [loanAmount, rate, tenure]);
  const principalPct = result.totalPayment > 0 ? Math.round((loanAmount / result.totalPayment) * 100) : 0;

  const tenureRows = useMemo(() => {
    const base = computeEmi(loanAmount, rate, 30).totalInterest;
    return TENURES.map((t) => {
      const r = computeEmi(loanAmount, rate, t);
      const saved = base - r.totalInterest;
      return {
        __key: String(t),
        tenure: `${t} years`,
        emi: formatINR(r.emi),
        interest: formatINRShort(r.totalInterest),
        total: formatINRShort(r.totalPayment),
        saved: saved > 0 ? `${formatINRShort(saved)} saved` : "Baseline",
      };
    });
  }, [loanAmount, rate]);

  const schedule = useMemo(
    () => buildAmortizationSchedule(loanAmount, rate, tenure),
    [loanAmount, rate, tenure]
  );

  const bankRows = useMemo(
    () =>
      BANK_RATES.map((b) => {
        const r = computeEmi(loanAmount, b.rate, tenure);
        return {
          bank: b.bank,
          rate: `${b.rate.toFixed(2)}%`,
          emi: formatINR(r.emi),
          interest: formatINRShort(r.totalInterest),
        };
      }),
    [loanAmount, tenure]
  );

  const emiPctOfLakh = result.emi / 1_00_000;
  const note =
    emiPctOfLakh > 0.5
      ? { tone: "warn" as const, text: "⚠️ EMI is over 50% of a ₹1L income. Consider a longer tenure or higher down payment." }
      : emiPctOfLakh > 0.4
      ? { tone: "info" as const, text: `EMI is ${Math.round(emiPctOfLakh * 100)}% of a ₹1L monthly income. Manageable but keep a buffer.` }
      : { tone: "good" as const, text: "✅ Comfortable EMI — affordable on a ₹1L+ monthly income." };

  return (
    <ToolContainer>
      <ToolCard>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <RangeInput
              label="Loan Amount"
              value={loanAmount}
              min={5_00_000}
              max={3_00_00_000}
              step={1_00_000}
              onChange={setLoanAmount}
              displayValue={formatINRShort(loanAmount)}
            />
            <RangeInput
              label="Interest Rate"
              value={rate}
              min={6}
              max={14}
              step={0.05}
              onChange={setRate}
              displayValue={`${rate.toFixed(2)}%`}
              hint="Tap a bank below to load its indicative rate"
            />
            <RangeInput
              label="Tenure"
              value={tenure}
              min={1}
              max={30}
              step={1}
              onChange={setTenure}
              displayValue={`${tenure} years`}
            />
            <div className="flex flex-wrap gap-2">
              {BANK_RATES.map((b) => (
                <button
                  key={b.bank}
                  type="button"
                  onClick={() => setRate(b.rate)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    rate === b.rate
                      ? "bg-navy-900 text-white border-navy-900"
                      : "bg-gray-50 text-navy-700 border-gray-200 hover:border-gold-400"
                  }`}
                >
                  {b.bank} {b.rate}%
                </button>
              ))}
            </div>
          </div>

          <ToolResultCard
            headlineLabel="Monthly EMI"
            headline={formatINR(result.emi)}
            headlineSub={`Per month · ${tenure} years · ${rate.toFixed(2)}%`}
            split={{
              leftLabel: `Principal ${formatINRShort(loanAmount)} (${principalPct}%)`,
              rightLabel: `Interest ${formatINRShort(result.totalInterest)} (${100 - principalPct}%)`,
              leftPct: principalPct,
            }}
            rows={[
              { label: "Loan Amount", value: formatINRShort(loanAmount) },
              { label: "Total Interest Payable", value: formatINRShort(result.totalInterest) },
              { label: "Total Amount Payable", value: formatINRShort(result.totalPayment) },
              { label: "EMI as % of ₹1L income", value: `${Math.round(emiPctOfLakh * 100)}%`, highlight: true },
            ]}
            note={note}
          />
        </div>
      </ToolCard>

      <ToolCard>
        <ComparisonTable
          title="Same loan — different tenure"
          caption="See how EMI and total interest change with tenure."
          columns={[
            { key: "tenure", header: "Tenure" },
            { key: "emi", header: "Monthly EMI", align: "right" },
            { key: "interest", header: "Total Interest", align: "right" },
            { key: "total", header: "Total Payable", align: "right" },
            { key: "saved", header: "Interest Saved vs 30yr", align: "right" },
          ]}
          rows={tenureRows}
          highlightRowKey={String(tenure)}
        />
      </ToolCard>

      <div>
        <div className="mb-3">
          <p className="text-[11px] font-bold tracking-[0.15em] text-gold-600 uppercase">Detailed analysis</p>
          <h2 className="text-xl font-bold text-navy-900 mt-1">Year-wise amortization schedule</h2>
          <p className="text-sm text-gray-500 mt-1">Full year-by-year breakup of principal, interest and outstanding balance.</p>
        </div>
        <LockedSection
          title="Unlock full amortization schedule"
          subtitle="Create a free account to view the complete year-by-year breakup, save results and compare scenarios."
          features={[
            "Year-by-year principal & interest breakup",
            "Outstanding balance every year",
            "Prepayment impact simulation",
            "Download as PDF or Excel",
          ]}
        >
          <ComparisonTable
            columns={[
              { key: "year", header: "Year" },
              { key: "opening", header: "Opening Balance", align: "right" },
              { key: "principal", header: "Principal Paid", align: "right" },
              { key: "interest", header: "Interest Paid", align: "right" },
              { key: "closing", header: "Closing Balance", align: "right" },
              { key: "paid", header: "% Paid Off", align: "right" },
            ]}
            rows={schedule.map((s) => ({
              year: `Year ${s.year}`,
              opening: formatINRShort(s.openingBalance),
              principal: formatINRShort(s.principalPaid),
              interest: formatINRShort(s.interestPaid),
              closing: formatINRShort(s.closingBalance),
              paid: `${Math.round(s.percentPaid)}%`,
            }))}
          />
        </LockedSection>
      </div>

      <div>
        <div className="mb-3">
          <p className="text-[11px] font-bold tracking-[0.15em] text-gold-600 uppercase">Save lakhs</p>
          <h2 className="text-xl font-bold text-navy-900 mt-1">Bank-wise EMI comparison</h2>
          <p className="text-sm text-gray-500 mt-1">Same loan amount across major banks — find the cheapest option.</p>
        </div>
        <LockedSection
          title="Unlock bank comparison"
          subtitle="Create a free account to compare EMIs across all major banks for your exact loan."
          features={[
            "EMI at all major banks for your loan",
            "Total interest savings calculator",
            "Best bank for your profile",
            "One-click loan application links",
          ]}
        >
          <ComparisonTable
            columns={[
              { key: "bank", header: "Bank" },
              { key: "rate", header: "Rate", align: "right" },
              { key: "emi", header: "Monthly EMI", align: "right" },
              { key: "interest", header: "Total Interest", align: "right" },
            ]}
            rows={bankRows}
          />
        </LockedSection>
      </div>

      <ToolCard>
        <FAQAccordion title="EMI Calculator FAQ" items={FAQ} />
      </ToolCard>

      <ToolCard>
        <ToolGrid exclude="/tools/emi-calculator" />
      </ToolCard>

      <ToolDisclaimer extra="EMI uses the standard banking formula and excludes processing fees, GST, insurance, stamp duty and registration." />
    </ToolContainer>
  );
}
