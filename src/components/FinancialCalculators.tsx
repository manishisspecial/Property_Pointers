"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calculator,
  Calendar,
  IndianRupee,
  Percent,
  PieChart,
  RotateCcw,
  TrendingUp,
} from "lucide-react";
import clsx from "clsx";

export type CalculatorTool = "emi" | "roi" | "rental-yield";

const DEFAULT_EMI = { loanAmount: 50_00_000, interestRate: 8.5, tenureYears: 20 };
const DEFAULT_ROI = { initial: 10_00_000, final: 15_00_000 };
const DEFAULT_RENTAL = { propertyValue: 80_00_000, monthlyRent: 35_000 };

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatNumber(amount: number, fractionDigits = 0) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(amount);
}

function computeEmi(loanAmount: number, annualRate: number, tenureYears: number) {
  const n = Math.max(0, Math.round(tenureYears * 12));
  const p = Math.max(0, loanAmount);
  const r = annualRate / 12 / 100;
  if (n === 0) return { emi: 0, totalPayment: 0, totalInterest: 0 };
  if (r === 0) {
    const emi = p / n;
    return { emi, totalPayment: p, totalInterest: 0 };
  }
  const pow = Math.pow(1 + r, n);
  const emi = (p * r * pow) / (pow - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - p;
  return {
    emi,
    totalPayment,
    totalInterest,
  };
}

const TABS: { id: CalculatorTool; label: string }[] = [
  { id: "emi", label: "EMI" },
  { id: "roi", label: "ROI" },
  { id: "rental-yield", label: "Rental Yield" },
];

export default function FinancialCalculators() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toolParam = searchParams.get("tool");

  const [active, setActive] = useState<CalculatorTool>(() => {
    if (toolParam === "roi" || toolParam === "rental-yield" || toolParam === "emi") return toolParam;
    return "emi";
  });

  const [emi, setEmi] = useState(DEFAULT_EMI);
  const [roi, setRoi] = useState(DEFAULT_ROI);
  const [rental, setRental] = useState(DEFAULT_RENTAL);

  useEffect(() => {
    if (toolParam === "roi" || toolParam === "rental-yield" || toolParam === "emi") {
      setActive(toolParam);
    }
  }, [toolParam]);

  const setTool = useCallback(
    (id: CalculatorTool) => {
      setActive(id);
      const next = new URLSearchParams(searchParams.toString());
      next.set("tool", id);
      router.replace(`/calculator?${next.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const emiResult = useMemo(() => computeEmi(emi.loanAmount, emi.interestRate, emi.tenureYears), [emi]);
  const roiPct = useMemo(() => {
    if (roi.initial <= 0) return null;
    return ((roi.final - roi.initial) / roi.initial) * 100;
  }, [roi]);
  const rentalYieldPct = useMemo(() => {
    if (rental.propertyValue <= 0) return null;
    return ((rental.monthlyRent * 12) / rental.propertyValue) * 100;
  }, [rental]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="gradient-navy py-14 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 px-4 py-2 rounded-full mb-4">
            <Calculator size={16} className="text-gold-400" />
            <span className="text-gold-400 text-sm font-medium">Financial planning</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Property calculators</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            Estimate EMI, return on investment, and rental yield in one place. Results update as you adjust the inputs.
          </p>

          <div
            className="mt-8 flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label="Calculator type"
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active === t.id}
                onClick={() => setTool(t.id)}
                className={clsx(
                  "px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border",
                  active === t.id
                    ? "bg-gold-500 text-navy-950 border-gold-400 shadow-lg scale-[1.02]"
                    : "bg-white/5 text-gray-200 border-white/10 hover:bg-white/10 hover:border-gold-500/40"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-16">
        <AnimatePresence mode="wait">
          {active === "emi" && (
            <motion.div
              key="emi"
              role="tabpanel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center justify-between gap-3 mb-6">
                  <h2 className="text-xl font-semibold text-navy-800">Loan details</h2>
                  <button
                    type="button"
                    onClick={() => setEmi({ ...DEFAULT_EMI })}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-600 hover:text-gold-600 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gold-300 hover:bg-gold-50 transition-colors"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>

                <div className="space-y-7">
                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-2">
                      <IndianRupee size={16} className="text-gold-500 shrink-0" /> Loan amount
                    </label>
                    <input
                      type="number"
                      min={0}
                      placeholder="e.g. 5000000"
                      value={emi.loanAmount || ""}
                      onChange={(e) => setEmi((s) => ({ ...s, loanAmount: Number(e.target.value) || 0 }))}
                      className="input-field mb-3"
                    />
                    <input
                      type="range"
                      min={1_00_000}
                      max={5_00_00_000}
                      step={1_00_000}
                      value={Math.min(Math.max(emi.loanAmount, 1_00_000), 5_00_00_000)}
                      onChange={(e) => setEmi((s) => ({ ...s, loanAmount: Number(e.target.value) }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold-500"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>₹1,00,000</span>
                      <span>₹5,00,00,000</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-2">
                      <Percent size={16} className="text-gold-500 shrink-0" /> Interest rate (annual %)
                    </label>
                    <input
                      type="number"
                      min={0}
                      step={0.1}
                      placeholder="e.g. 8.5"
                      value={emi.interestRate || ""}
                      onChange={(e) => setEmi((s) => ({ ...s, interestRate: Number(e.target.value) || 0 }))}
                      className="input-field mb-3"
                    />
                    <input
                      type="range"
                      min={0}
                      max={20}
                      step={0.1}
                      value={Math.min(Math.max(emi.interestRate, 0), 20)}
                      onChange={(e) => setEmi((s) => ({ ...s, interestRate: Number(e.target.value) }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold-500"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0%</span>
                      <span>20%</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-2">
                      <Calendar size={16} className="text-gold-500 shrink-0" /> Loan tenure (years)
                    </label>
                    <input
                      type="number"
                      min={0}
                      step={1}
                      placeholder="e.g. 20"
                      value={emi.tenureYears || ""}
                      onChange={(e) => setEmi((s) => ({ ...s, tenureYears: Number(e.target.value) || 0 }))}
                      className="input-field mb-3"
                    />
                    <input
                      type="range"
                      min={1}
                      max={30}
                      step={1}
                      value={Math.min(Math.max(emi.tenureYears || 1, 1), 30)}
                      onChange={(e) => setEmi((s) => ({ ...s, tenureYears: Number(e.target.value) }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold-500"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>1 year</span>
                      <span>30 years</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl shadow-xl p-6 md:p-8 text-white ring-1 ring-white/10">
                  <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <TrendingUp size={20} className="text-gold-400" /> Results
                  </h2>
                  <div className="text-center mb-8 rounded-xl bg-white/5 border border-white/10 p-6 hover:bg-white/[0.07] transition-colors">
                    <p className="text-sm text-gray-300 mb-1">Monthly EMI</p>
                    <p className="text-3xl sm:text-4xl font-bold text-gold-400 tracking-tight">
                      {formatINR(Math.round(emiResult.emi))}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">Principal + interest, per month</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white/10 rounded-xl p-4 border border-white/10 hover:border-gold-500/30 transition-colors">
                      <p className="text-xs text-gray-300">Principal amount</p>
                      <p className="text-lg font-bold mt-1">{formatINR(Math.round(emi.loanAmount))}</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 border border-white/10 hover:border-gold-500/30 transition-colors">
                      <p className="text-xs text-gray-300">Total interest payable</p>
                      <p className="text-lg font-bold mt-1">{formatINR(Math.round(emiResult.totalInterest))}</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 border border-white/10 hover:border-gold-500/30 transition-colors sm:col-span-1">
                      <p className="text-xs text-gray-300">Total payment</p>
                      <p className="text-lg font-bold mt-1">{formatINR(Math.round(emiResult.totalPayment))}</p>
                      <p className="text-[11px] text-gray-400 mt-1">Principal + interest</p>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <p className="text-xs text-gray-400">
                      Formula: EMI = [P × R × (1+R)^N] ÷ [(1+R)^N − 1], where R is monthly rate and N is months.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {active === "roi" && (
            <motion.div
              key="roi"
              role="tabpanel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center justify-between gap-3 mb-6">
                  <h2 className="text-xl font-semibold text-navy-800">Investment inputs</h2>
                  <button
                    type="button"
                    onClick={() => setRoi({ ...DEFAULT_ROI })}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-600 hover:text-gold-600 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gold-300 hover:bg-gold-50 transition-colors"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-2">
                      <PieChart size={16} className="text-emerald-500 shrink-0" /> Initial investment (₹)
                    </label>
                    <input
                      type="number"
                      min={0}
                      placeholder="Amount you invested"
                      value={roi.initial || ""}
                      onChange={(e) => setRoi((s) => ({ ...s, initial: Number(e.target.value) || 0 }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-2">
                      <TrendingUp size={16} className="text-gold-500 shrink-0" /> Final value (₹)
                    </label>
                    <input
                      type="number"
                      min={0}
                      placeholder="Current or exit value"
                      value={roi.final || ""}
                      onChange={(e) => setRoi((s) => ({ ...s, final: Number(e.target.value) || 0 }))}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl shadow-xl p-6 md:p-8 text-white ring-1 ring-white/10">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Percent size={20} className="text-gold-400" /> Return on investment
                </h2>
                <div className="text-center rounded-xl bg-white/5 border border-white/10 p-8 hover:bg-white/[0.07] transition-colors">
                  <p className="text-sm text-gray-300 mb-2">ROI</p>
                  <p className="text-4xl sm:text-5xl font-bold text-gold-400">
                    {roiPct === null ? "—" : `${formatNumber(roiPct, 2)}%`}
                  </p>
                  {roiPct !== null && (
                    <p className="text-xs text-gray-400 mt-3">
                      {(roi.final - roi.initial) >= 0 ? "Gain" : "Loss"} of{" "}
                      {formatINR(Math.abs(Math.round(roi.final - roi.initial)))}
                    </p>
                  )}
                  {roi.initial <= 0 && (
                    <p className="text-xs text-amber-200/90 mt-4">Enter a positive initial investment to compute ROI.</p>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-6">
                  ROI = [(Final value − Initial investment) ÷ Initial investment] × 100
                </p>
              </div>
            </motion.div>
          )}

          {active === "rental-yield" && (
            <motion.div
              key="rental"
              role="tabpanel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center justify-between gap-3 mb-6">
                  <h2 className="text-xl font-semibold text-navy-800">Rental inputs</h2>
                  <button
                    type="button"
                    onClick={() => setRental({ ...DEFAULT_RENTAL })}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-600 hover:text-gold-600 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gold-300 hover:bg-gold-50 transition-colors"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-2">
                      <IndianRupee size={16} className="text-gold-500 shrink-0" /> Property value (₹)
                    </label>
                    <input
                      type="number"
                      min={0}
                      placeholder="Total property cost or value"
                      value={rental.propertyValue || ""}
                      onChange={(e) => setRental((s) => ({ ...s, propertyValue: Number(e.target.value) || 0 }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-2">
                      <Calendar size={16} className="text-emerald-500 shrink-0" /> Monthly rent (₹)
                    </label>
                    <input
                      type="number"
                      min={0}
                      placeholder="Expected or actual monthly rent"
                      value={rental.monthlyRent || ""}
                      onChange={(e) => setRental((s) => ({ ...s, monthlyRent: Number(e.target.value) || 0 }))}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl shadow-xl p-6 md:p-8 text-white ring-1 ring-white/10">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <IndianRupee size={20} className="text-gold-400" /> Gross rental yield
                </h2>
                <div className="text-center rounded-xl bg-white/5 border border-white/10 p-8 hover:bg-white/[0.07] transition-colors">
                  <p className="text-sm text-gray-300 mb-2">Annual rental yield</p>
                  <p className="text-4xl sm:text-5xl font-bold text-gold-400">
                    {rentalYieldPct === null ? "—" : `${formatNumber(rentalYieldPct, 2)}%`}
                  </p>
                  <p className="text-xs text-gray-400 mt-3">
                    Annual rent: {formatINR(Math.round(rental.monthlyRent * 12))}
                  </p>
                  {rental.propertyValue <= 0 && (
                    <p className="text-xs text-amber-200/90 mt-4">Enter a positive property value to compute yield.</p>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-6">
                  Yield = (Monthly rent × 12 ÷ Property value) × 100 (gross, before expenses).
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
