"use client";

import Link from "next/link";
import { BarChart3, Map, BookOpen, ArrowRight, Calculator, TrendingUp, IndianRupee, Sprout } from "lucide-react";
import { motion } from "framer-motion";
import { MotionCard, MotionGrid, MotionSection } from "@/components/MarketingMotion";
import FAQAccordion from "@/components/FAQAccordion";

const INSIGHTS = [
  { title: "Market Trends", href: "/insights/market-trends", icon: <BarChart3 size={18} className="text-emerald-600" /> },
  { title: "City Reports", href: "/insights/city-reports", icon: <Map size={18} className="text-blue-600" /> },
  { title: "Investment Guides", href: "/insights/investment-guides", icon: <BookOpen size={18} className="text-purple-600" /> },
];

const CALCULATORS = [
  { title: "EMI", href: "/calculator?tool=emi", icon: <Calculator size={18} className="text-blue-600" /> },
  { title: "ROI", href: "/calculator?tool=roi", icon: <TrendingUp size={18} className="text-emerald-600" /> },
  { title: "Rental Yield", href: "/calculator?tool=rental-yield", icon: <IndianRupee size={18} className="text-gold-600" /> },
  { title: "Vastu guide", href: "/insights/vastu", icon: <Sprout size={18} className="text-green-600" /> },
];

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy opacity-[0.98]" />
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-xs font-bold tracking-wider text-gray-300 uppercase">Insights</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Analyze before you invest
            </h1>
            <p className="text-gray-300 mt-3 max-w-2xl">
              Market signals, city-level snapshots, and practical guides — written for buyers who want clarity.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <MotionSection className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-navy-900">Browse insights</h2>
              <p className="text-gray-600 mt-2 max-w-2xl">
                These pages contain real, useful structure now — and can be upgraded to live data dashboards later.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Updated", value: "Weekly" },
                { label: "Style", value: "Practical" },
                { label: "Goal", value: "Clarity" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-center">
                  <p className="text-sm font-bold text-navy-900">{s.value}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {INSIGHTS.map((s) => (
              <MotionCard key={s.href} className="h-full">
                <Link
                  href={s.href}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-sm transition-all px-4 py-4 h-full"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-11 h-11 rounded-xl bg-white border border-gray-100 flex items-center justify-center shrink-0">
                      {s.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-navy-900 truncate">{s.title}</p>
                      <p className="text-sm text-gray-500 truncate">Open section</p>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-gray-400 group-hover:text-navy-800 transition-colors shrink-0" />
                </Link>
              </MotionCard>
            ))}
          </MotionGrid>

          <h3 className="text-lg font-bold text-navy-900 mt-10">Calculators &amp; guides</h3>
          <p className="text-gray-600 mt-1 text-sm">Run numbers instantly or read our Vastu primer for layout ideas.</p>
          <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {CALCULATORS.map((s) => (
              <MotionCard key={s.href} className="h-full">
                <Link
                  href={s.href}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-sm transition-all px-4 py-4 h-full"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-11 h-11 rounded-xl bg-white border border-gray-100 flex items-center justify-center shrink-0">
                      {s.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-navy-900 truncate">{s.title}</p>
                      <p className="text-sm text-gray-500 truncate">Open</p>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-gray-400 group-hover:text-navy-800 transition-colors shrink-0" />
                </Link>
              </MotionCard>
            ))}
          </MotionGrid>
        </MotionSection>

        <div className="mt-6">
          <FAQAccordion
            title="Insights FAQ"
            items={[
              {
                question: "How often should I check market insights?",
                answer: "A weekly review is usually enough unless you are actively shortlisting properties.",
              },
              {
                question: "Can insights replace site visits?",
                answer: "No. Use insights for direction, then validate with site visits and on-ground checks.",
              },
              {
                question: "What should I combine with insights before investing?",
                answer: "Use calculators, project comparisons, and legal verification for a balanced decision.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

