"use client";

import Link from "next/link";
import { Hammer, Paintbrush, Scale, Printer, Wrench, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { MotionCard, MotionGrid, MotionSection } from "@/components/MarketingMotion";
import FAQAccordion from "@/components/FAQAccordion";

const SERVICES = [
  { title: "Construction", href: "/services/construction", icon: <Hammer size={18} className="text-orange-500" /> },
  { title: "Interiors", href: "/services/interiors", icon: <Paintbrush size={18} className="text-purple-500" /> },
  { title: "Legal", href: "/services/legal", icon: <Scale size={18} className="text-blue-500" /> },
  { title: "Printing / Marketing", href: "/services/printing-marketing", icon: <Printer size={18} className="text-emerald-500" /> },
  { title: "Facility Mgmt.", href: "/services/facility-management", icon: <Wrench size={18} className="text-gray-700" /> },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy opacity-[0.98]" />
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-xs font-bold tracking-wider text-gray-300 uppercase">Services</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Expert help for every step of your property journey
            </h1>
            <p className="text-gray-300 mt-3 max-w-2xl">
              From construction and interiors to legal verification and facility management — pick a service, share your requirement, and get connected.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link href="/post-property" className="btn-primary inline-flex items-center justify-center">
                Request a Callback
              </Link>
              <Link href="/properties" className="btn-outline inline-flex items-center justify-center">
                Browse Properties
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <MotionSection className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-navy-900">Choose a service</h2>
              <p className="text-gray-600 mt-2 max-w-2xl">
                Transparent steps, vetted partners, and clear timelines — designed for a smooth experience.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Partners", value: "Verified" },
                { label: "Response", value: "< 24h" },
                { label: "Support", value: "Dedicated" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-center">
                  <p className="text-sm font-bold text-navy-900">{s.value}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {SERVICES.map((s) => (
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
                      <p className="text-sm text-gray-500 truncate">Scope, estimate, and next steps</p>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-gray-400 group-hover:text-navy-800 transition-colors shrink-0" />
                </Link>
              </MotionCard>
            ))}
          </MotionGrid>
        </MotionSection>

        <MotionSection className="mt-6 rounded-2xl border border-gray-100 bg-white shadow-sm p-6 sm:p-8">
          <h3 className="text-xl font-bold text-navy-900">How it works</h3>
          <p className="text-gray-600 mt-2 max-w-2xl">A predictable process with clear milestones.</p>

          <MotionGrid className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {[
              { n: "01", t: "Share requirement", d: "Tell us location, budget, and timeline." },
              { n: "02", t: "Get a shortlist", d: "We match you with suitable experts." },
              { n: "03", t: "Compare quotes", d: "Pick based on scope, pricing, and timeline." },
              { n: "04", t: "Track progress", d: "Stay updated until completion." },
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
            title="Services FAQ"
            items={[
              {
                question: "How quickly will I get a callback after submitting a request?",
                answer: "Most requests receive a response within 24 hours, depending on service type and city.",
              },
              {
                question: "Can I request quotes from multiple service partners?",
                answer: "Yes. You can compare options and choose based on scope, timeline, and budget fit.",
              },
              {
                question: "Do you support both residential and commercial requirements?",
                answer: "Yes, services are designed for home owners, societies, and commercial property needs.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

