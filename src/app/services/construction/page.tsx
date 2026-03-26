"use client";

import Link from "next/link";
import { Hammer, ArrowLeft, Phone, CheckCircle2, ShieldCheck, Clock, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";
import { MotionCard, MotionGrid, MotionSection } from "@/components/MarketingMotion";
import FAQAccordion from "@/components/FAQAccordion";

export default function ConstructionServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/services" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-navy-900">
          <ArrowLeft size={16} /> Back to Services
        </Link>

        <div className="mt-4 relative overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
          <div className="absolute inset-0 gradient-navy opacity-[0.97]" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold-500/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-500/10 blur-3xl rounded-full" />

          <div className="relative p-6 sm:p-10">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-start gap-3">
                <span className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                  <Hammer size={20} className="text-gold-400" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold tracking-wider text-gray-300 uppercase">Service</p>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Construction</h1>
                  <p className="text-gray-300 mt-3 max-w-2xl">
                    Plan, estimate, and execute with confidence — we help you choose the right scope, get comparable quotes, and track milestones.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Link href="/post-property" className="btn-primary inline-flex items-center justify-center gap-2">
                      <Phone size={16} /> Request a Callback
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
            <h2 className="text-2xl font-bold text-navy-900">What you get</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">A structured workflow that reduces risk and keeps your build on track.</p>

            <MotionGrid className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {[
                { t: "New build / Civil work", d: "Foundation to finishing with clear BOQ & schedule.", icon: <ClipboardList size={18} className="text-orange-600" /> },
                { t: "Renovation & remodeling", d: "Upgrade kitchen, bath, flooring, or full makeover.", icon: <ShieldCheck size={18} className="text-emerald-600" /> },
                { t: "Turnkey execution", d: "Single point responsibility and milestone billing.", icon: <Clock size={18} className="text-blue-600" /> },
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

            <div className="mt-8 rounded-xl border border-gray-100 bg-navy-50 p-5">
              <p className="text-sm font-semibold text-navy-900">Recommended for</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {["Independent houses", "Builder floors", "Commercial interiors", "Structural upgrades", "Waterproofing"].map((t) => (
                  <span key={t} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-gray-100 text-gray-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </MotionSection>

          <MotionSection className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <h3 className="text-xl font-bold text-navy-900">Why customers choose us</h3>
            <div className="space-y-3 mt-4">
              {[
                "Comparable quotes with scope clarity",
                "Milestone-based planning and timelines",
                "Quality checks and transparent updates",
                "Support for documents & vendor coordination",
              ].map((t) => (
                <div key={t} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 size={16} className="text-emerald-600 mt-0.5" />
                  <span>{t}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-gray-100 bg-gray-50 p-5">
              <p className="text-sm font-semibold text-navy-900">Typical timeline</p>
              <p className="text-sm text-gray-600 mt-1">Small renovation: 7–21 days • Full build: varies by scope</p>
              <Link href="/post-property" className="btn-primary inline-flex items-center justify-center w-full mt-4 gap-2">
                <Phone size={16} /> Get an Estimate
              </Link>
            </div>
          </MotionSection>
        </div>

        <MotionSection className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <h3 className="text-xl font-bold text-navy-900">How it works</h3>
          <p className="text-gray-600 mt-2">Clear milestones from requirement to handover.</p>

          <MotionGrid className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {[
              { n: "01", t: "Requirement", d: "Location, scope, budget, timeline." },
              { n: "02", t: "Site visit", d: "Measurements and feasibility checks." },
              { n: "03", t: "Quote + BOQ", d: "Comparable pricing with clear scope." },
              { n: "04", t: "Execution", d: "Milestones, updates, and quality checks." },
            ].map((s) => (
              <MotionCard key={s.n} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs font-extrabold text-gold-600">{s.n}</p>
                <p className="font-semibold text-navy-900 mt-1">{s.t}</p>
                <p className="text-sm text-gray-600 mt-1">{s.d}</p>
              </MotionCard>
            ))}
          </MotionGrid>
        </MotionSection>

        <div className="mt-6">
          <FAQAccordion
            title="Construction FAQ"
            items={[
              {
                question: "Do I get a detailed BOQ before work starts?",
                answer: "Yes. Scope and materials are documented first so pricing and deliverables are clear.",
              },
              {
                question: "Can this service handle both renovation and fresh construction?",
                answer: "Yes, the workflow supports both new build and remodeling projects.",
              },
              {
                question: "How are timelines managed?",
                answer: "Work is planned in milestones with periodic updates so delays are visible early.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

