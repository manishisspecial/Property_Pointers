"use client";

import { useState, useMemo } from "react";
import { Calculator, IndianRupee, Percent, Calendar, PieChart, TrendingUp } from "lucide-react";

export default function CalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const result = useMemo(() => {
    const monthly = interestRate / 12 / 100;
    const totalMonths = tenure * 12;
    const emi = (loanAmount * monthly * Math.pow(1 + monthly, totalMonths)) / (Math.pow(1 + monthly, totalMonths) - 1);
    const totalAmount = emi * totalMonths;
    const totalInterest = totalAmount - loanAmount;

    return {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      principalPercent: Math.round((loanAmount / totalAmount) * 100),
      interestPercent: Math.round((totalInterest / totalAmount) * 100),
    };
  }, [loanAmount, interestRate, tenure]);

  function formatINR(amount: number) {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="gradient-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 px-4 py-2 rounded-full mb-4">
            <Calculator size={16} className="text-gold-400" />
            <span className="text-gold-400 text-sm font-medium">Financial Planning Tool</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">EMI Calculator</h1>
          <p className="text-gray-300 max-w-xl mx-auto">Plan your home loan with our advanced EMI calculator. Get instant calculations for your property purchase.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-xl font-semibold text-navy-800 mb-6">Loan Details</h2>

            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <IndianRupee size={16} className="text-gold-500" /> Loan Amount
                  </label>
                  <span className="text-sm font-bold text-navy-800">{formatINR(loanAmount)}</span>
                </div>
                <input type="range" min={100000} max={50000000} step={100000} value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold-500" />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>₹1 Lac</span><span>₹5 Cr</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <Percent size={16} className="text-gold-500" /> Interest Rate
                  </label>
                  <span className="text-sm font-bold text-navy-800">{interestRate}% p.a.</span>
                </div>
                <input type="range" min={5} max={20} step={0.1} value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold-500" />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>5%</span><span>20%</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <Calendar size={16} className="text-gold-500" /> Loan Tenure
                  </label>
                  <span className="text-sm font-bold text-navy-800">{tenure} Years</span>
                </div>
                <input type="range" min={1} max={30} step={1} value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold-500" />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1 Year</span><span>30 Years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Result Panel */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl shadow-xl p-6 md:p-8 text-white">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <TrendingUp size={20} className="text-gold-400" /> Your EMI Breakdown
              </h2>

              <div className="text-center mb-8">
                <p className="text-sm text-gray-300 mb-1">Monthly EMI</p>
                <p className="text-4xl md:text-5xl font-bold text-gold-400">{formatINR(result.emi)}</p>
                <p className="text-sm text-gray-400 mt-1">per month</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-xs text-gray-300">Principal Amount</p>
                  <p className="text-lg font-bold">{formatINR(loanAmount)}</p>
                  <div className="w-full h-1.5 bg-white/10 rounded-full mt-2">
                    <div className="h-full bg-gold-500 rounded-full" style={{ width: `${result.principalPercent}%` }} />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{result.principalPercent}% of total</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-xs text-gray-300">Total Interest</p>
                  <p className="text-lg font-bold">{formatINR(result.totalInterest)}</p>
                  <div className="w-full h-1.5 bg-white/10 rounded-full mt-2">
                    <div className="h-full bg-red-400 rounded-full" style={{ width: `${result.interestPercent}%` }} />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{result.interestPercent}% of total</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-center">
                <p className="text-sm text-gray-300">Total Payment</p>
                <p className="text-2xl font-bold">{formatINR(result.totalAmount)}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-semibold text-navy-800 mb-3">Quick Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-gold-500 font-bold mt-0.5">•</span>
                  A shorter tenure means higher EMI but lower total interest
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-500 font-bold mt-0.5">•</span>
                  Compare rates from multiple banks for the best deal
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-500 font-bold mt-0.5">•</span>
                  Consider prepayment options to reduce interest burden
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-500 font-bold mt-0.5">•</span>
                  Your EMI should not exceed 40% of your monthly income
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
