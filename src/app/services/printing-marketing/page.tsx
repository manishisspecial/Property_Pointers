"use client";

import Link from "next/link";
import { Printer, ArrowLeft, Megaphone, Camera, MonitorPlay, FileText, TrendingUp, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { MotionCard, MotionGrid, MotionSection } from "@/components/MarketingMotion";
import FAQAccordion from "@/components/FAQAccordion";

export default function PrintingMarketingServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/services" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-navy-900">
          <ArrowLeft size={16} /> Back to Services
        </Link>

        <div className="mt-4 relative overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
          <div className="absolute inset-0 gradient-navy opacity-[0.97]" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold-500/15 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full" />

          <div className="relative p-6 sm:p-10">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-start gap-3">
                <span className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                  <Printer size={20} className="text-gold-400" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold tracking-wider text-gray-300 uppercase">Service</p>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Printing / Marketing</h1>
                  <p className="text-gray-300 mt-3 max-w-2xl">
                    Better photos, better creatives, better reach — promote your listing or project with a complete marketing kit.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Link href="/post-property" className="btn-primary inline-flex items-center justify-center gap-2">
                      <Megaphone size={16} /> Promote a Listing
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
            <h2 className="text-2xl font-bold text-navy-900">What we deliver</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">A complete set of assets to improve response rate and brand trust.</p>

            <MotionGrid className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {[
                { t: "Photoshoot", d: "Professional photos that highlight space & light.", icon: <Camera size={18} className="text-blue-600" /> },
                { t: "Video / Reels", d: "Short videos optimized for social platforms.", icon: <MonitorPlay size={18} className="text-purple-600" /> },
                { t: "Brochures & flyers", d: "Print-ready + digital assets for sharing.", icon: <FileText size={18} className="text-emerald-600" /> },
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
              <h3 className="text-sm font-bold text-navy-900">Campaign add-ons</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {[
                  { t: "Ad creatives", d: "Multiple variants for A/B testing." },
                  { t: "Lead capture", d: "Simple landing copy + CTA strategy." },
                  { t: "Targeting plan", d: "Audience + locality targeting suggestions." },
                  { t: "Listing polish", d: "Better title, highlights, and feature bullets." },
                ].map((x) => (
                  <div key={x.t} className="rounded-xl border border-gray-100 bg-white p-4">
                    <p className="font-semibold text-navy-900">{x.t}</p>
                    <p className="text-sm text-gray-600 mt-1">{x.d}</p>
                  </div>
                ))}
              </div>
            </MotionSection>
          </MotionSection>

          <MotionSection className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <h3 className="text-xl font-bold text-navy-900">Expected outcome</h3>
            <p className="text-gray-600 mt-2">Clearer presentation usually means better quality leads.</p>

            <div className="mt-4 space-y-3">
              {[
                { t: "Higher CTR", d: "Stronger hero images and headlines.", icon: <TrendingUp size={18} className="text-emerald-600" /> },
                { t: "Better trust", d: "Clean design + clear highlights.", icon: <Printer size={18} className="text-blue-600" /> },
                { t: "Faster shortlisting", d: "Info-rich assets reduce questions.", icon: <FileText size={18} className="text-purple-600" /> },
              ].map((s) => (
                <div key={s.t} className="rounded-xl border border-gray-100 bg-gray-50 p-4 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shrink-0">
                    {s.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">{s.t}</p>
                    <p className="text-sm text-gray-600 mt-0.5">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/post-property" className="btn-primary inline-flex items-center justify-center w-full mt-6 gap-2">
              <Phone size={16} /> Request a Quote
            </Link>
          </MotionSection>
        </div>

        <div className="mt-6">
          <FAQAccordion
            title="Printing / Marketing FAQ"
            items={[
              {
                question: "Do I get both print and digital assets?",
                answer: "Yes, campaign kits can include brochure, social creatives, and listing-ready images.",
              },
              {
                question: "Can you optimize content for property listings?",
                answer: "Yes. Titles, highlights, and visual sequencing can be tuned for better response.",
              },
              {
                question: "How soon can campaign assets be delivered?",
                answer: "Timeline depends on scope, but quick-start packages can usually begin within days.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

