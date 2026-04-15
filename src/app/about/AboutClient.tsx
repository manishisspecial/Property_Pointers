"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Compass,
  HeartHandshake,
  Layers,
  Lightbulb,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MotionCard, MotionGrid, MotionSection } from "@/components/MarketingMotion";

const fadeStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.08 },
  },
};

const fadeItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function AboutClient() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[78vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <motion.div
          className="absolute -top-32 -right-24 w-[min(90vw,520px)] h-[min(90vw,520px)] rounded-full bg-gold-500/20 blur-[100px]"
          animate={
            reduceMotion
              ? undefined
              : { scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-32 w-[min(100vw,600px)] h-[min(100vw,600px)] rounded-full bg-blue-500/10 blur-[110px]"
          animate={reduceMotion ? undefined : { scale: [1.05, 1, 1.05] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60L60 0H0z' fill='%23fff'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 sm:pt-32">
          <motion.div
            variants={fadeStagger}
            initial="hidden"
            animate="show"
            className="max-w-4xl"
          >
            <motion.div
              variants={fadeItem}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-sm"
            >
              <Compass size={16} className="text-gold-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300/90">
                Our story
              </span>
            </motion.div>
            <motion.h1
              variants={fadeItem}
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08]"
            >
              Real estate,{" "}
              <span className="text-gradient bg-[length:120%_auto]">reimagined</span>
              <br />
              for every Indian home seeker
            </motion.h1>
            <motion.p
              variants={fadeItem}
              className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed"
            >
              Property Pointers exists to cut through noise and doubt. We combine verified listings,
              builder transparency, and partner expertise so you can decide with clarity—whether you
              are buying your first flat, scaling a portfolio, or listing with confidence.
            </motion.p>
            <motion.div
              variants={fadeItem}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3.5 text-sm font-bold text-navy-900 shadow-lg shadow-gold-500/25 transition-all hover:bg-gold-400 hover:shadow-xl active:scale-[0.98]"
              >
                Join our mission <ArrowRight size={18} />
              </Link>
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Explore properties
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {[
              { k: "1000+", l: "Happy customers", i: <Users className="text-gold-400" size={20} /> },
              { k: "7+", l: "Cities & growing", i: <MapPin className="text-gold-400" size={20} /> },
              { k: "100%", l: "Verification focus", i: <ShieldCheck className="text-gold-400" size={20} /> },
              { k: "0", l: "Brokerage gimmicks", i: <Zap className="text-gold-400" size={20} /> },
            ].map((row) => (
              <div
                key={row.l}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition-all duration-300 hover:border-gold-500/30 hover:bg-white/[0.07]"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-2xl sm:text-3xl font-bold text-white">{row.k}</p>
                  <span className="rounded-lg bg-white/5 p-2 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110">
                    {row.i}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-400">{row.l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* Mission */}
      <MotionSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-gold-600 font-semibold text-sm uppercase tracking-widest">Mission</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy-900 leading-tight">
              Make property decisions feel{" "}
              <span className="text-gradient">effortless and honest</span>
            </h2>
            <p className="mt-5 text-gray-600 leading-relaxed text-lg">
              India&apos;s property market moves fast—but trust shouldn&apos;t be optional. We built
              Property Pointers as a single place to discover listings, compare developers, and work
              with verified partners, backed by tools and insights that respect your time and money.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Listings and project data structured for quick comparison, not endless scrolling.",
                "Partner and vendor networks curated so you meet professionals who deliver.",
                "Calculators and insights that translate jargon into numbers you can use.",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-gray-700">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold-500" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -4 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="relative rounded-3xl border border-gray-200 bg-white p-8 shadow-xl shadow-navy-900/5"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-2xl bg-gradient-to-br from-gold-400/30 to-navy-700/20 blur-2xl" />
              <Building2 className="text-navy-700" size={36} />
              <h3 className="mt-4 text-xl font-bold text-navy-900">Built for the full journey</h3>
              <p className="mt-2 text-gray-600 leading-relaxed">
                From first search to site visit and documentation, we are obsessed with removing
                friction—so you spend less time chasing leads and more time finding the right space.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Residential", "Commercial", "PG & co-living", "New launches"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-navy-50 border border-navy-100 px-3 py-1 text-xs font-medium text-navy-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </MotionSection>

      {/* Values bento */}
      <MotionSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-gold-600 font-semibold text-sm uppercase tracking-widest">What guides us</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy-900">Values you can feel in the product</h2>
        </div>
        <MotionGrid className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 auto-rows-[minmax(160px,auto)]">
          <MotionCard className="md:row-span-2 rounded-3xl border border-gray-100 bg-gradient-to-b from-navy-900 to-navy-950 p-8 text-white shadow-xl">
            <ShieldCheck className="text-gold-400" size={32} />
            <h3 className="mt-4 text-2xl font-bold">Trust by design</h3>
            <p className="mt-3 text-gray-300 leading-relaxed">
              Verification, clear ownership of listings, and straight answers in our partner network—because
              a property decision is too big for guesswork.
            </p>
          </MotionCard>
          <MotionCard className="rounded-3xl border border-gray-100 bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
            <Lightbulb className="text-amber-500" size={28} />
            <h3 className="mt-3 text-lg font-bold text-navy-900">Clarity first</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              We favour simple flows and honest copy over hype. If a detail matters to you, it belongs on the page.
            </p>
          </MotionCard>
          <MotionCard className="rounded-3xl border border-gray-100 bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
            <Sparkles className="text-purple-500" size={28} />
            <h3 className="mt-3 text-lg font-bold text-navy-900">Craft & care</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              From search to dashboards, we polish interactions so the platform feels as premium as the homes we list.
            </p>
          </MotionCard>
          <MotionCard className="md:col-span-2 rounded-3xl border border-gold-200/80 bg-gradient-to-r from-gold-50 to-white p-6 sm:p-8 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex-1">
                <HeartHandshake className="text-gold-600" size={32} />
                <h3 className="mt-3 text-xl font-bold text-navy-900">People at the centre</h3>
                <p className="mt-2 text-gray-700 leading-relaxed">
                  Buyers, sellers, developers, partners, and vendors—we build bridges, not walls. Every roadmap item
                  ties back to a real story from the market.
                </p>
              </div>
              <div className="shrink-0 rounded-2xl bg-navy-900 px-6 py-5 text-center text-white">
                <p className="text-3xl font-extrabold text-gold-400">∞</p>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">curiosity</p>
              </div>
            </div>
          </MotionCard>
        </MotionGrid>
      </MotionSection>

      {/* Timeline */}
      <MotionSection className="border-y border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <p className="text-gold-600 font-semibold text-sm uppercase tracking-widest">Momentum</p>
            <h2 className="mt-2 text-3xl font-bold text-navy-900">Milestones along the way</h2>
          </div>
          <div className="relative pl-8">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-400 via-navy-300 to-navy-100" />
            <div className="space-y-10">
              {[
                {
                  y: "Foundation",
                  t: "We set out to fix discovery—making verified inventory and serious sellers easier to find online.",
                },
                {
                  y: "Ecosystem",
                  t: "Partner, developer, and vendor programs launched to surround customers with trusted specialists.",
                },
                {
                  y: "Today",
                  t: "Insights, calculators, and dashboards evolve weekly—so your next move is backed by better data.",
                },
              ].map((m, i) => (
                <motion.div
                  key={m.y}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <span className="absolute -left-[1.85rem] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white bg-gold-500 shadow ring-2 ring-gold-200" />
                  <p className="text-sm font-bold text-gold-600">{m.y}</p>
                  <p className="mt-2 text-gray-600 leading-relaxed">{m.t}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      {/* CTA */}
      <MotionSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 px-8 py-14 sm:px-14 sm:py-16 text-center"
          whileHover={reduceMotion ? undefined : { scale: 1.005 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
        >
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/30 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/20 blur-[90px] rounded-full" />
          </div>
          <Layers className="relative mx-auto text-gold-400" size={40} />
          <h2 className="relative mt-4 text-2xl sm:text-3xl font-extrabold text-white">
            Help us shape India&apos;s property experience
          </h2>
          <p className="relative mt-3 text-gray-300 max-w-xl mx-auto">
            We are always looking for thoughtful builders, storytellers, and market experts who care deeply about
            customer outcomes.
          </p>
          <Link
            href="/careers"
            className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-gold-500 px-8 py-4 text-sm font-bold text-navy-900 shadow-lg transition-all hover:bg-gold-400"
          >
            View open roles <ArrowRight size={18} />
          </Link>
        </motion.div>
      </MotionSection>
    </main>
  );
}
