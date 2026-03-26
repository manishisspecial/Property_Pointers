"use client";

import Link from "next/link";
import { ArrowLeft, BarChart3, TrendingUp, Activity, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { MotionCard, MotionGrid, MotionSection } from "@/components/MarketingMotion";
import FAQAccordion from "@/components/FAQAccordion";

export default function MarketTrendsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-navy-900">
          <ArrowLeft size={16} /> Back to Insights
        </Link>

        <div className="mt-4 relative overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
          <div className="absolute inset-0 gradient-navy opacity-[0.97]" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold-500/15 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full" />

          <div className="relative p-6 sm:p-10">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-start gap-3">
                <span className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                  <BarChart3 size={20} className="text-gold-400" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold tracking-wider text-gray-300 uppercase">Insights</p>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Market Trends</h1>
                  <p className="text-gray-300 mt-3 max-w-2xl">
                    Understand demand, pricing direction, and what buyers are shortlisting — so you can time your decisions better.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <MotionSection className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-navy-900">What you’ll see here</h2>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Structured insights that work even before live charts are connected — perfect for a smooth UX now.
          </p>

          <MotionGrid className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              { t: "Pricing direction", d: "Simple read on upward/downward pressure.", icon: <TrendingUp size={18} className="text-emerald-600" /> },
              { t: "Demand signals", d: "What users search and shortlist most.", icon: <Activity size={18} className="text-blue-600" /> },
              { t: "Hot micro-markets", d: "Localities seeing higher buyer interest.", icon: <MapPin size={18} className="text-purple-600" /> },
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

          <div className="mt-8 rounded-xl border border-gray-100 bg-navy-50 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-navy-900">Want to act on trends?</p>
              <p className="text-sm text-gray-600 mt-0.5">Browse verified listings and apply filters to match your strategy.</p>
            </div>
            <Link href="/properties" className="btn-primary inline-flex items-center justify-center gap-2">
              Explore Properties <ArrowRight size={16} />
            </Link>
          </div>
        </MotionSection>

        <div className="mt-6">
          <FAQAccordion
            title="Market Trends FAQ"
            items={[
              {
                question: "What is the fastest way to read market trend pages?",
                answer: "Start with pricing direction, then check demand signals and micro-market performance.",
              },
              {
                question: "Can short-term fluctuations change my long-term plan?",
                answer: "Usually no; long-term decisions should focus on fundamentals and location quality.",
              },
              {
                question: "How do I act on market trends practically?",
                answer: "Use trend direction to shortlist areas, then compare verified listings and project quality.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

