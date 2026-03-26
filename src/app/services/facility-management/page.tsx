"use client";

import Link from "next/link";
import { Wrench, ArrowLeft, ShieldCheck, Phone, CheckCircle2, ClipboardCheck, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { MotionCard, MotionGrid, MotionSection } from "@/components/MarketingMotion";
import FAQAccordion from "@/components/FAQAccordion";

export default function FacilityManagementServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/services" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-navy-900">
          <ArrowLeft size={16} /> Back to Services
        </Link>

        <div className="mt-4 relative overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
          <div className="absolute inset-0 gradient-navy opacity-[0.97]" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold-500/15 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gray-500/10 blur-3xl rounded-full" />

          <div className="relative p-6 sm:p-10">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-start gap-3">
                <span className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                  <Wrench size={20} className="text-gold-400" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold tracking-wider text-gray-300 uppercase">Service</p>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Facility Management</h1>
                  <p className="text-gray-300 mt-3 max-w-2xl">
                    Keep communities and offices running smoothly with reliable maintenance, housekeeping coordination, and vendor management.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Link href="/post-property" className="btn-primary inline-flex items-center justify-center gap-2">
                      <ShieldCheck size={16} /> Request a Proposal
                    </Link>
                    <Link href="/services" className="btn-outline inline-flex items-center justify-center gap-2">
                      View All Services
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <MotionSection className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-navy-900">Coverage</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">Flexible modules you can combine based on your building needs.</p>

            <MotionGrid className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {[
                { t: "Maintenance & repairs", d: "Issue tracking, vendor coordination, preventive checks.", icon: <ClipboardCheck size={18} className="text-emerald-600" /> },
                { t: "Housekeeping", d: "Daily routines, deep cleaning plans, hygiene standards.", icon: <Sparkles size={18} className="text-blue-600" /> },
                { t: "Security coordination", d: "Guard scheduling, visitor norms, incident reporting.", icon: <Users size={18} className="text-purple-600" /> },
              ].map((s) => (
                <MotionCard key={s.t} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center">
                    {s.icon}
                  </div>
                  <p className="font-semibold text-navy-900 mt-3">{s.t}</p>
                  <p className="text-sm text-gray-600 mt-1">{s.d}</p>
                </MotionCard>
              ))}
            </MotionGrid>

            <MotionSection className="mt-8 rounded-xl border border-gray-100 bg-navy-50 p-5">
              <h3 className="text-sm font-bold text-navy-900">Service levels</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                {["SLA-based response times", "Monthly preventive maintenance schedule", "Clear escalation matrix", "Vendor performance tracking"].map((t) => (
                  <div key={t} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={16} className="text-emerald-600 mt-0.5" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </MotionSection>
          </MotionSection>

          <MotionSection className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <h3 className="text-xl font-bold text-navy-900">Best for</h3>
            <div className="space-y-3 mt-4">
              {[
                "Residential societies and apartments",
                "Commercial buildings and offices",
                "Small complexes with shared amenities",
                "Owners who want predictable upkeep costs",
              ].map((t) => (
                <div key={t} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 size={16} className="text-emerald-600 mt-0.5" />
                  <span>{t}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-gray-100 bg-gray-50 p-5">
              <p className="text-sm font-semibold text-navy-900">Get a proposal</p>
              <p className="text-sm text-gray-600 mt-1">Share property type + number of units and we’ll suggest the right plan.</p>
              <Link href="/post-property" className="btn-primary inline-flex items-center justify-center w-full mt-4 gap-2">
                <Phone size={16} /> Schedule a Call
              </Link>
            </div>
          </MotionSection>
        </div>

        <div className="mt-6">
          <FAQAccordion
            title="Facility Management FAQ"
            items={[
              {
                question: "Is this suitable for both societies and office buildings?",
                answer: "Yes. Service modules can be adapted for residential and commercial facilities.",
              },
              {
                question: "Can I start with only one module (like maintenance)?",
                answer: "Yes, you can begin with a focused scope and expand coverage later.",
              },
              {
                question: "How are service quality and response tracked?",
                answer: "Typically through SLA targets, issue logs, and periodic performance reviews.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

