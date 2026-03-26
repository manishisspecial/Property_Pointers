"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, TrendingUp, IndianRupee, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { MotionCard, MotionGrid, MotionSection } from "@/components/MarketingMotion";
import FAQAccordion from "@/components/FAQAccordion";

export default function InvestmentGuidesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-navy-900">
          <ArrowLeft size={16} /> Back to Insights
        </Link>

        <div className="mt-4 relative overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
          <div className="absolute inset-0 gradient-navy opacity-[0.97]" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold-500/15 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full" />

          <div className="relative p-6 sm:p-10">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-start gap-3">
                <span className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                  <BookOpen size={20} className="text-gold-400" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold tracking-wider text-gray-300 uppercase">Insights</p>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Investment Guides</h1>
                  <p className="text-gray-300 mt-3 max-w-2xl">
                    Simple playbooks for real decisions — evaluate ROI, understand rental yield, and reduce risk with due diligence.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <MotionSection className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-navy-900">Core topics</h2>
          <p className="text-gray-600 mt-2 max-w-2xl">A practical approach: numbers first, then risk checks.</p>

          <MotionGrid className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              { t: "Evaluate ROI", d: "Compare opportunities using simple ROI rules.", icon: <TrendingUp size={18} className="text-emerald-600" /> },
              { t: "Rental yield", d: "Understand yield vs appreciation trade-offs.", icon: <IndianRupee size={18} className="text-gold-600" /> },
              { t: "Due diligence", d: "Verify docs, builder record, and approvals.", icon: <ShieldCheck size={18} className="text-blue-600" /> },
            ].map((x) => (
              <MotionCard key={x.t} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center">
                  {x.icon}
                </div>
                <p className="font-semibold text-navy-900 mt-3">{x.t}</p>
                <p className="text-sm text-gray-600 mt-1">{x.d}</p>
              </MotionCard>
            ))}
          </MotionGrid>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 p-5">
            <div>
              <p className="text-sm font-semibold text-navy-900">Want quick numbers first?</p>
              <p className="text-sm text-gray-600 mt-0.5">Use the calculators to estimate EMI, ROI, and rental yield.</p>
            </div>
            <Link href="/calculator" className="btn-primary inline-flex items-center justify-center gap-2">
              Use Calculator <ArrowRight size={16} />
            </Link>
          </div>
        </MotionSection>

        <div className="mt-6">
          <FAQAccordion
            title="Investment Guides FAQ"
            items={[
              {
                question: "What should I calculate first: EMI, ROI, or rental yield?",
                answer: "Begin with EMI affordability, then evaluate ROI and rental yield for investment suitability.",
              },
              {
                question: "Is high ROI always a better investment?",
                answer: "Not always. Balance ROI with legal safety, liquidity, builder quality, and location demand.",
              },
              {
                question: "How do these guides reduce risk?",
                answer: "They help structure decision-making so you verify numbers and documents before committing.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

