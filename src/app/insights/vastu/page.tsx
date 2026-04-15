"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Home,
  Lightbulb,
  Sun,
  Wind,
  BookOpen,
  Calculator,
} from "lucide-react";
import { MotionCard, MotionGrid, MotionSection } from "@/components/MarketingMotion";
import VastuDesignAdvisor from "@/components/VastuDesignAdvisor";

const DIRECTIONS = [
  {
    title: "North (Uttar)",
    icon: <Compass size={18} className="text-blue-500" />,
    body:
      "Often associated with wealth and career flow in classical Vastu. Keep this zone light, clutter-free, and well lit where possible.",
  },
  {
    title: "North-East (Ishan)",
    icon: <Sun size={18} className="text-amber-500" />,
    body:
      "Traditionally considered a sensitive, auspicious corner. Many practitioners prefer open space, puja, or study here—avoid heavy storage or dampness.",
  },
  {
    title: "South-East (Agni)",
    icon: <Wind size={18} className="text-orange-500" />,
    body:
      "Commonly linked to the kitchen and fire element. Practical planning: good ventilation, safe gas placement, and easy cleaning matter as much as direction.",
  },
  {
    title: "South-West (Nairutya)",
    icon: <Home size={18} className="text-emerald-600" />,
    body:
      "Often suggested for master bedroom or heavier built-up mass. Stability and a sense of “anchor” are the usual themes in texts.",
  },
];

const CHECKLIST = [
  "Entry should feel open and well lit; fix creaky doors and poor lighting first.",
  "Prefer rectangular rooms over odd cuts; odd corners are harder to furnish and ventilate.",
  "Keep the center of the home (brahmasthan) relatively open—avoid clutter and heavy partitions if you can.",
  "Balance natural light: dark north-facing rooms need better artificial lighting and reflective surfaces.",
  "Sleep with a solid headboard and avoid sleeping directly under a heavy beam if it affects comfort.",
  "Fix leaks promptly—stagnant water and damp walls hurt structure and indoor air quality.",
];

export default function VastuInsightsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy opacity-[0.98]" />
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/15 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold-500/15 blur-3xl rounded-full" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-xs font-bold tracking-wider text-gray-300 uppercase">Insights · Interiors &amp; Vastu</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 max-w-3xl">
              Vastu for home buyers: practical ideas, not superstition
            </h1>
            <p className="text-gray-300 mt-3 max-w-2xl">
              Use Vastu as a layout and wellness checklist alongside sunlight, ventilation, and building quality. It complements—not
              replaces—legal due diligence and structural inspection.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/calculator?tool=emi"
                className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-4 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400 transition-colors"
              >
                <Calculator size={16} /> Try calculators
              </Link>
              <Link
                href="/properties?type=sale"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Browse properties <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <MotionSection className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
              <BookOpen size={20} className="text-emerald-700" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-navy-900">What this page is for</h2>
              <p className="text-gray-600 mt-2 leading-relaxed">
                Classical Vastu Shastra maps directions to the five elements—earth, water, fire, air, and space—and suggests how spaces
                can feel balanced. Modern apartments rarely offer perfect orientation, so the useful approach is to prioritize daylight,
                cross-ventilation, privacy, noise control, and furniture layout—then align tastefully with Vastu themes where you can.
              </p>
            </div>
          </div>
        </MotionSection>

        <MotionSection>
          <VastuDesignAdvisor />
        </MotionSection>

        <MotionSection className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-bold text-navy-900 mb-2">Directions at a glance</h2>
          <p className="text-gray-600 mb-6 max-w-3xl">
            These are common associations you will hear from consultants and builders. Treat them as conversation starters during site
            visits—not rigid rules.
          </p>
          <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DIRECTIONS.map((d) => (
              <MotionCard key={d.title} className="h-full">
                <div className="rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-sm transition-all p-5 h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center">{d.icon}</span>
                    <h3 className="font-semibold text-navy-900">{d.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{d.body}</p>
                </div>
              </MotionCard>
            ))}
          </MotionGrid>
        </MotionSection>

        <MotionSection className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="flex items-start gap-3 mb-6">
            <span className="mt-0.5 w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
              <Lightbulb size={20} className="text-amber-700" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-navy-900">Practical checklist for buyers</h2>
              <p className="text-gray-600 mt-1">Works with almost any floor plan—Vastu-friendly or not.</p>
            </div>
          </div>
          <ul className="space-y-3">
            {CHECKLIST.map((line) => (
              <li key={line} className="flex gap-3 text-gray-700 text-sm leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold-500 shrink-0" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </MotionSection>

        <MotionSection className="rounded-2xl border border-navy-800 bg-gradient-to-br from-navy-900 to-navy-800 text-white p-6 sm:p-8 shadow-lg">
          <h2 className="text-lg font-bold">Disclaimer</h2>
          <p className="text-gray-300 text-sm mt-2 leading-relaxed">
            PropertyPointers shares general educational information only. Vastu interpretations vary by school and geography. For major
            purchases, combine these ideas with legal title review, sanctioned plans, builder reputation, and on-site engineering checks.
          </p>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors"
          >
            Back to all insights <ArrowRight size={16} />
          </Link>
        </MotionSection>
      </div>
    </div>
  );
}
