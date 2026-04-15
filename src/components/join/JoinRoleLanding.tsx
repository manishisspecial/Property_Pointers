"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowDown, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { MotionGrid, MotionSection, MotionCard, fadeUp, stagger } from "@/components/MarketingMotion";

const themes = {
  amber: {
    gradient: "from-amber-50 via-white to-amber-50/30",
    border: "border-amber-200/80",
    ring: "ring-amber-200/40",
    accentText: "text-amber-700",
    softBg: "bg-amber-100/60",
    blobA: "bg-amber-300/30",
    blobB: "bg-gold-400/20",
    ctaBorder: "border-amber-200",
    ctaGradient: "from-amber-50 to-white",
  },
  emerald: {
    gradient: "from-emerald-50 via-white to-emerald-50/30",
    border: "border-emerald-200/80",
    ring: "ring-emerald-200/40",
    accentText: "text-emerald-800",
    softBg: "bg-emerald-100/60",
    blobA: "bg-emerald-300/25",
    blobB: "bg-teal-300/15",
    ctaBorder: "border-emerald-200",
    ctaGradient: "from-emerald-50 to-white",
  },
  blue: {
    gradient: "from-slate-50 via-white to-gray-50/30",
    border: "border-gray-200/80",
    ring: "ring-gray-200/40",
    accentText: "text-navy-800",
    softBg: "bg-gray-100/60",
    blobA: "bg-gold-200/25",
    blobB: "bg-warm-300/20",
    ctaBorder: "border-gray-200",
    ctaGradient: "from-gray-50 to-white",
  },
} as const;

export type JoinThemeKey = keyof typeof themes;

export type BenefitBlock = {
  title: string;
  summary: string;
  pointers: string[];
  icon: LucideIcon;
};

type JoinRoleLandingProps = {
  backHref: string;
  backLabel: string;
  theme: JoinThemeKey;
  HeroIcon: LucideIcon;
  eyebrow: string;
  heroTitle: string;
  heroLead: string;
  trustStrip: string[];
  benefitBlocks: BenefitBlock[];
  pillars: { title: string; body: string }[];
  registerHref: string;
  registerCta: string;
  joinTitle: string;
  joinDescription: string;
};

const listContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const listItem = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0, 0, 0.2, 1] as const } },
};

export function JoinRoleLanding({
  backHref,
  backLabel,
  theme: themeKey,
  HeroIcon,
  eyebrow,
  heroTitle,
  heroLead,
  trustStrip,
  benefitBlocks,
  pillars,
  registerHref,
  registerCta,
  joinTitle,
  joinDescription,
}: JoinRoleLandingProps) {
  const t = themes[themeKey];

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20 overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionSection>
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-navy-800 mb-8 transition-colors"
          >
            <ArrowLeft size={14} /> {backLabel}
          </Link>
        </MotionSection>

        {/* Hero */}
        <MotionSection className="relative mb-16">
          <div
            className={`relative overflow-hidden rounded-3xl border ${t.border} bg-gradient-to-br ${t.gradient} p-8 sm:p-12 shadow-sm ring-1 ${t.ring}`}
          >
            <motion.div
              aria-hidden
              className={`pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl ${t.blobA}`}
              animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className={`pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full blur-3xl ${t.blobB}`}
              animate={{ scale: [1.05, 1, 1.05], opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
              <motion.div
                className="flex shrink-0 justify-center lg:justify-start"
                initial={{ opacity: 0, scale: 0.92, rotate: -6 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-navy-900/10 blur-xl"
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 6, repeat: Infinity }}
                  />
                  <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl bg-navy-800 shadow-lg ring-2 ring-white/30">
                    <HeroIcon className="text-gold-400" size={40} strokeWidth={1.75} />
                  </div>
                </div>
              </motion.div>

              <div className="flex-1 text-center lg:text-left">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">{eyebrow}</p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">{heroTitle}</h1>
                <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  {heroLead}
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <a
                    href="#benefits"
                    className="inline-flex items-center gap-2 rounded-full border border-navy-800/15 bg-white/80 px-4 py-2 text-sm font-semibold text-navy-800 shadow-sm backdrop-blur transition hover:bg-white hover:shadow-md"
                  >
                    Explore benefits
                    <ArrowDown className="h-4 w-4 opacity-70" aria-hidden />
                  </a>
                  <a
                    href="#join"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gold-700 hover:text-gold-800 transition-colors"
                  >
                    Jump to registration
                  </a>
                </div>
              </div>
            </div>

            <motion.div
              className="relative mt-10 flex flex-wrap justify-center gap-2 sm:gap-3"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
            >
              {trustStrip.map((label) => (
                <motion.span
                  key={label}
                  variants={fadeUp}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium text-navy-800 ${t.softBg} ring-1 ring-black/5`}
                >
                  {label}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </MotionSection>

        {/* Pillars */}
        <MotionSection id="benefits" className="mb-16 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs font-bold uppercase tracking-wider text-gold-600">Why PropertyPointers</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-navy-900">A relationship built for clarity and momentum</h2>
            <p className="mt-3 text-gray-600">
              We combine discovery, credibility, and tooling so your time converts into real conversations—not noise.
            </p>
          </div>
          <MotionGrid className="grid gap-6 md:grid-cols-3">
            {pillars.map((p) => (
              <MotionCard
                key={p.title}
                className="card border border-gray-100 p-6 bg-white/90 backdrop-blur-sm hover:border-gold-200/60"
              >
                <div className={`mb-3 inline-flex rounded-xl ${t.softBg} p-2.5 ring-1 ring-black/5`}>
                  <Sparkles className={`h-5 w-5 ${t.accentText}`} aria-hidden />
                </div>
                <h3 className="text-lg font-bold text-navy-900">{p.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{p.body}</p>
              </MotionCard>
            ))}
          </MotionGrid>
        </MotionSection>

        {/* Detailed benefits */}
        <MotionSection className="mb-16">
          <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">Property pointers for your growth</h2>
              <p className="mt-2 text-gray-600 max-w-2xl">
                Practical advantages you can expect when you work with us—clear, actionable, and designed around outcomes.
              </p>
            </div>
          </div>

          <MotionGrid className="grid gap-6 lg:gap-8">
            {benefitBlocks.map((block, i) => {
              const Icon = block.icon;
              return (
                <MotionCard
                  key={block.title}
                  className={`rounded-2xl border ${t.border} bg-white p-6 sm:p-8 shadow-sm ring-1 ring-black/5`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-800 text-gold-400 shadow-md`}
                    >
                      <Icon size={22} strokeWidth={1.75} aria-hidden />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-xl font-bold text-navy-900">{block.title}</h3>
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-600 leading-relaxed">{block.summary}</p>

                      <p className="mt-6 text-xs font-bold uppercase tracking-wider text-gold-600 flex items-center gap-2">
                        <Sparkles className="h-3.5 w-3.5" aria-hidden />
                        Property pointers
                      </p>
                      <motion.ul
                        className="mt-3 space-y-2.5"
                        variants={listContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                      >
                        {block.pointers.map((line) => (
                          <motion.li key={line} variants={listItem} className="flex gap-3 text-sm text-gray-700">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden />
                            <span className="leading-relaxed">{line}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                  </div>
                </MotionCard>
              );
            })}
          </MotionGrid>
        </MotionSection>

        {/* Join CTA — bottom */}
        <MotionSection id="join" className="scroll-mt-28">
          <div
            className={`rounded-2xl border ${t.ctaBorder} bg-gradient-to-br ${t.ctaGradient} p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6 shadow-sm ring-1 ring-black/5`}
          >
            <div className="w-14 h-14 rounded-2xl bg-navy-800 flex items-center justify-center shrink-0 shadow-md">
              <HeroIcon className="text-gold-400" size={30} />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-gold-600">{eyebrow}</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mt-1">{joinTitle}</h2>
              <p className="text-gray-600 mt-2 leading-relaxed">{joinDescription}</p>
              <Link href={registerHref} className="btn-primary inline-flex mt-5">
                {registerCta}
              </Link>
            </div>
          </div>

          <motion.div
            className="card p-6 text-sm text-gray-600 mt-6 border border-gray-100"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <p>
              Already registered?{" "}
              <Link href="/auth/login" className="font-semibold text-gold-600 hover:text-gold-700">
                Sign in
              </Link>{" "}
              to continue.
            </p>
          </motion.div>
        </MotionSection>
      </div>
    </main>
  );
}
