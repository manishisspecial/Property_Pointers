"use client";

import Link from "next/link";
import { TrendingUp, IndianRupee, Compass, ArrowRight, Landmark, PieChart, Wallet, FileText, Hammer, Home, ShieldCheck } from "lucide-react";

const TOOLS = [
  { title: "EMI Calculator", href: "/tools/emi-calculator", icon: <Landmark size={18} className="text-blue-600" />, desc: "Monthly home loan EMI" },
  { title: "Home Loan Eligibility", href: "/tools/home-loan-eligibility", icon: <PieChart size={18} className="text-emerald-600" />, desc: "How much loan can I get?" },
  { title: "Affordability", href: "/tools/affordability", icon: <Wallet size={18} className="text-gold-600" />, desc: "Can I afford this property?" },
  { title: "Stamp Duty", href: "/tools/stamp-duty-calculator", icon: <FileText size={18} className="text-purple-600" />, desc: "State-wise registration charges" },
  { title: "ROI Calculator", href: "/tools/roi-calculator", icon: <TrendingUp size={18} className="text-emerald-600" />, desc: "Return on investment" },
  { title: "Rental Yield", href: "/tools/rental-yield-calculator", icon: <IndianRupee size={18} className="text-gold-600" />, desc: "Rental income potential" },
  { title: "Construction Cost", href: "/tools/construction-cost", icon: <Hammer size={18} className="text-orange-600" />, desc: "Estimate building cost" },
  { title: "Rent vs Buy", href: "/tools/rent-vs-buy", icon: <Home size={18} className="text-blue-600" />, desc: "Which is better for you?" },
  { title: "AI Vastu Calculator", href: "/tools/vastu-calculator", icon: <Compass size={18} className="text-green-600" />, desc: "Upload floor plan — free score" },
  { title: "RERA Check", href: "/tools/rera-check", icon: <ShieldCheck size={18} className="text-emerald-600" />, desc: "Verify any project" },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-navy-900">Tools</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Quick calculators to help you plan better. (These route to the existing calculator page.)
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {TOOLS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-sm transition-all px-4 py-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shrink-0">
                    {t.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-navy-900 truncate">{t.title}</p>
                    <p className="text-sm text-gray-500 truncate">{t.desc}</p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-gray-400 group-hover:text-navy-800 transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

