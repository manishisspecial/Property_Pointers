"use client";

import Link from "next/link";
import { ArrowLeft, Map, TrendingUp, IndianRupee, ArrowRight, TrainFront } from "lucide-react";
import { motion } from "framer-motion";
import { MotionCard, MotionGrid, MotionSection } from "@/components/MarketingMotion";
import FAQAccordion from "@/components/FAQAccordion";

export default function CityReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-navy-900">
          <ArrowLeft size={16} /> Back to Insights
        </Link>

        <div className="mt-4 relative overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
          <div className="absolute inset-0 gradient-navy opacity-[0.97]" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold-500/15 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full" />

          <div className="relative p-6 sm:p-10">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-start gap-3">
                <span className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                  <Map size={20} className="text-gold-400" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold tracking-wider text-gray-300 uppercase">Insights</p>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">City Reports</h1>
                  <p className="text-gray-300 mt-3 max-w-2xl">
                    Snapshot-style reports you can skim fast: price bands, micro-markets, infrastructure impact, and rental signals.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <MotionSection className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-navy-900">Report sections</h2>
          <p className="text-gray-600 mt-2 max-w-2xl">A consistent template across cities so comparisons are easy.</p>

          <MotionGrid className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              { t: "Price bands", d: "Entry, mid, premium segments by locality.", icon: <IndianRupee size={18} className="text-gold-600" /> },
              { t: "Demand trends", d: "What’s getting searched and shortlisted.", icon: <TrendingUp size={18} className="text-emerald-600" /> },
              { t: "Infra impact", d: "Metro, roads, and social infra signals.", icon: <TrainFront size={18} className="text-blue-600" /> },
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

          <MotionSection className="mt-8 rounded-xl border border-gray-100 bg-navy-50 p-5">
            <h3 className="text-sm font-bold text-navy-900">Featured cities (initial)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
              {[
                { t: "Noida", d: "Expressway + office demand influence." },
                { t: "Delhi NCR", d: "Micro-market level divergence." },
                { t: "Mumbai", d: "Premium pricing + rental depth." },
              ].map((c) => (
                <div key={c.t} className="rounded-xl border border-gray-100 bg-white p-4">
                  <p className="font-semibold text-navy-900">{c.t}</p>
                  <p className="text-sm text-gray-600 mt-1">{c.d}</p>
                </div>
              ))}
            </div>
          </MotionSection>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 p-5">
            <div>
              <p className="text-sm font-semibold text-navy-900">Want projects by city?</p>
              <p className="text-sm text-gray-600 mt-0.5">Explore verified new projects and compare builders.</p>
            </div>
            <Link href="/projects" className="btn-primary inline-flex items-center justify-center gap-2">
              Explore New Projects <ArrowRight size={16} />
            </Link>
          </div>
        </MotionSection>

        <div className="mt-6">
          <FAQAccordion
            title="City Reports FAQ"
            items={[
              {
                question: "What is the most important section in a city report?",
                answer: "Start with price bands and demand trends; they quickly show market depth and momentum.",
              },
              {
                question: "Can I compare cities directly?",
                answer: "Yes, but compare within similar budget ranges and property categories for fairness.",
              },
              {
                question: "How should infrastructure updates be interpreted?",
                answer: "Treat infra as a medium-term signal and cross-check on-ground progress before investing.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

