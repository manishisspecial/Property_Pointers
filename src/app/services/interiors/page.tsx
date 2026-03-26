"use client";

import Link from "next/link";
import { Paintbrush, ArrowLeft, Phone, CheckCircle2, Ruler, Palette, Sparkles, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { MotionCard, MotionGrid, MotionSection } from "@/components/MarketingMotion";
import FAQAccordion from "@/components/FAQAccordion";

export default function InteriorsServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/services" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-navy-900">
          <ArrowLeft size={16} /> Back to Services
        </Link>

        <div className="mt-4 relative overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
          <div className="absolute inset-0 gradient-navy opacity-[0.97]" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold-500/15 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full" />

          <div className="relative p-6 sm:p-10">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-start gap-3">
                <span className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                  <Paintbrush size={20} className="text-gold-400" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold tracking-wider text-gray-300 uppercase">Service</p>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Interiors</h1>
                  <p className="text-gray-300 mt-3 max-w-2xl">
                    Modular kitchens, wardrobes, lighting, false ceiling, and full-home interiors — designed for your lifestyle with transparent scope and timelines.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Link href="/post-property" className="btn-primary inline-flex items-center justify-center gap-2">
                      <Phone size={16} /> Book a Design Consult
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
            <h2 className="text-2xl font-bold text-navy-900">Popular packages</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">Pick a starting point — we’ll tailor the scope after a quick consult.</p>

            <MotionGrid className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {[
                { t: "Modular Kitchen", d: "Layout planning, hardware options, installation.", icon: <Ruler size={18} className="text-blue-600" /> },
                { t: "Wardrobes & Storage", d: "Space-efficient designs for bedrooms and utility.", icon: <Sparkles size={18} className="text-emerald-600" /> },
                { t: "Full Home Interiors", d: "Kitchen + wardrobes + lights + ceiling packages.", icon: <Palette size={18} className="text-purple-600" /> },
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
              <h3 className="text-sm font-bold text-navy-900">What’s included</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                {["Design discussion + measurement", "Material options & finish selection", "Quote with scope clarity", "Execution timeline & updates"].map((t) => (
                  <div key={t} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={16} className="text-emerald-600 mt-0.5" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </MotionSection>
          </MotionSection>

          <MotionSection className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <h3 className="text-xl font-bold text-navy-900">Timeline</h3>
            <p className="text-gray-600 mt-2">A clear schedule before we start.</p>

            <div className="mt-4 space-y-3">
              {[
                { t: "Design + scope lock", d: "2–5 days" },
                { t: "Production & procurement", d: "7–15 days" },
                { t: "On-site installation", d: "3–10 days" },
              ].map((s) => (
                <div key={s.t} className="rounded-xl border border-gray-100 bg-gray-50 p-4 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-gold-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">{s.t}</p>
                    <p className="text-sm text-gray-600 mt-0.5">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/post-property" className="btn-primary inline-flex items-center justify-center w-full mt-6 gap-2">
              <Phone size={16} /> Get a Quote
            </Link>
          </MotionSection>
        </div>

        <div className="mt-6">
          <FAQAccordion
            title="Interiors FAQ"
            items={[
              {
                question: "Can I customize finishes and material brands?",
                answer: "Yes. You can choose finishes, hardware, and material options based on budget and style.",
              },
              {
                question: "Do you handle modular kitchen and wardrobes together?",
                answer: "Yes, both can be bundled into one coordinated package with a shared timeline.",
              },
              {
                question: "Will I receive design previews before execution?",
                answer: "Yes. Scope confirmation and design direction are finalized before production starts.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

