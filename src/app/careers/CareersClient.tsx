"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Coffee,
  Globe2,
  Heart,
  Laptop,
  LineChart,
  Palette,
  Rocket,
  Sparkles,
  Users,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MotionCard, MotionGrid, MotionSection } from "@/components/MarketingMotion";

type Role = {
  id: string;
  title: string;
  team: string;
  location: string;
  type: string;
  summary: string;
  bullets: string[];
};

const ROLES: Role[] = [
  {
    id: "fe",
    title: "Senior Full-Stack Engineer",
    team: "Product & Engineering",
    location: "Gurugram · Hybrid",
    type: "Full-time",
    summary:
      "Own end-to-end features across our Next.js platform, APIs, and data layer—shipping fast while keeping listings and partner flows reliable.",
    bullets: [
      "5+ years with TypeScript, React, and Node-style backends",
      "Comfortable with Prisma/SQL, auth, and performance tuning",
      "Bonus: passion for maps, search, or real-estate domain UX",
    ],
  },
  {
    id: "design",
    title: "Product Designer (UI/UX)",
    team: "Design",
    location: "Remote · India",
    type: "Full-time",
    summary:
      "Craft flows that make complex property decisions feel simple—from search filters to partner dashboards—with a strong systems mindset.",
    bullets: [
      "Portfolio showing web apps and design systems",
      "Fluency in Figma and prototyping; motion sensibility a plus",
      "Collaborate tightly with engineers and PM in short cycles",
    ],
  },
  {
    id: "growth",
    title: "Digital Marketing Lead",
    team: "Growth",
    location: "Delhi NCR · Hybrid",
    type: "Full-time",
    summary:
      "Lead acquisition and lifecycle campaigns across SEO, paid, and content—grounded in analytics and brand voice.",
    bullets: [
      "Proven B2C or marketplace growth in India",
      "Hands-on with GA4, Search Console, and experiment design",
      "Love writing crisp copy that converts without hype",
    ],
  },
  {
    id: "partner",
    title: "Partner Success Manager",
    team: "Partners",
    location: "Mumbai / Bangalore · Hybrid",
    type: "Full-time",
    summary:
      "Onboard and grow our channel partners—training, QBRs, and playbooks that help them win on Property Pointers.",
    bullets: [
      "3+ years in account management or partner-facing roles",
      "Real estate or proptech exposure strongly preferred",
      "Empathetic communicator; comfortable with CRM and metrics",
    ],
  },
  {
    id: "content",
    title: "Content & SEO Specialist",
    team: "Marketing",
    location: "Remote · India",
    type: "Full-time",
    summary:
      "Produce city guides, insights, and landing pages that rank and genuinely help buyers and investors decide.",
    bullets: [
      "Editorial SEO experience with measurable traffic lift",
      "Ability to simplify RERA, EMI, and locality jargon",
      "Comfortable coordinating with design and product",
    ],
  },
];

const PERKS = [
  {
    t: "Flexible ways of working",
    d: "Hybrid and remote-friendly teams with core collaboration hours that respect your life outside work.",
    icon: <Globe2 className="text-sky-600" size={22} />,
    bg: "bg-sky-50",
  },
  {
    t: "Learning budget",
    d: "Courses, conferences, and books—if it makes you better at your craft, we want to support it.",
    icon: <Rocket className="text-orange-600" size={22} />,
    bg: "bg-orange-50",
  },
  {
    t: "Health & wellness",
    d: "Group health coverage and wellness days so you can recharge without guilt.",
    icon: <Heart className="text-rose-600" size={22} />,
    bg: "bg-rose-50",
  },
  {
    t: "Latest gear",
    d: "MacBooks, ergonomic setups, and the tools you need to do your best work.",
    icon: <Laptop className="text-indigo-600" size={22} />,
    bg: "bg-indigo-50",
  },
];

export default function CareersClient() {
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(ROLES[0]?.id ?? null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  async function handleApply(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      role: String(form.get("role") || ""),
      linkedin: String(form.get("linkedin") || ""),
      message: String(form.get("message") || ""),
    };
    if (!payload.name || !payload.email || !payload.phone) {
      setStatus({ ok: false, text: "Please add your name, email, and phone." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "career_application",
          page: "/careers",
          details: JSON.stringify(payload),
        }),
      });
      if (!res.ok) throw new Error("fail");
      e.currentTarget.reset();
      setStatus({ ok: true, text: "Thanks! Our talent team will reach out if there is a fit." });
    } catch {
      setStatus({ ok: false, text: "Something went wrong. Please try again in a moment." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <motion.div
          className="absolute top-1/4 right-[-10%] w-[min(70vw,420px)] h-[min(70vw,420px)] rounded-full bg-gold-500/25 blur-[90px]"
          animate={reduceMotion ? undefined : { rotate: [0, 8, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-[-15%] w-[min(90vw,500px)] h-[min(90vw,500px)] rounded-full bg-indigo-500/15 blur-[100px]"
          animate={reduceMotion ? undefined : { y: [0, 24, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 sm:pt-32 sm:pb-24">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <Briefcase size={16} className="text-gold-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300/90">
                Careers
              </span>
            </div>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05]">
              Build what millions{" "}
              <span className="text-gradient">will trust</span> tomorrow
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed">
              We are a small, ambitious team modernising how India discovers and transacts property. If you love
              craft, ownership, and real customer impact—you will fit right in.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#roles"
                className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3.5 text-sm font-bold text-navy-900 shadow-lg shadow-gold-500/20 transition-all hover:bg-gold-400"
              >
                See open roles <ArrowRight size={18} />
              </a>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Why we exist
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              { n: "5", l: "Open roles", i: <Briefcase className="text-gold-400" size={18} /> },
              { n: "Hybrid", l: "Remote-friendly", i: <Coffee className="text-gold-400" size={18} /> },
              { n: "India", l: "Core markets", i: <LineChart className="text-gold-400" size={18} /> },
              { n: "You", l: "Matter here", i: <Users className="text-gold-400" size={18} /> },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-white">{s.n}</p>
                  <span className="rounded-lg bg-white/5 p-2">{s.i}</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Perks */}
      <MotionSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-gold-600 font-semibold text-sm uppercase tracking-widest">Life at Property Pointers</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy-900">Perks that actually matter</h2>
        </div>
        <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PERKS.map((p) => (
            <MotionCard
              key={p.t}
              className={`rounded-2xl border border-gray-100 ${p.bg} p-6 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="w-11 h-11 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                {p.icon}
              </div>
              <h3 className="mt-4 font-bold text-navy-900">{p.t}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{p.d}</p>
            </MotionCard>
          ))}
        </MotionGrid>
      </MotionSection>

      {/* Culture bento */}
      <MotionSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(140px,auto)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="md:col-span-2 md:row-span-2 rounded-3xl bg-gradient-to-br from-navy-800 to-navy-950 p-8 sm:p-10 text-white relative overflow-hidden"
          >
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-gold-500/20 blur-3xl rounded-full" />
            <Sparkles className="relative text-gold-400" size={32} />
            <h3 className="relative mt-4 text-2xl font-bold">High ownership, low ego</h3>
            <p className="relative mt-3 text-gray-300 max-w-lg leading-relaxed">
              Small teams, clear goals, and room to lead. We debate ideas openly and ship decisions quickly—always
              anchored in what helps the customer on the other side of the screen.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-md"
          >
            <Palette className="text-purple-600" size={26} />
            <h3 className="mt-3 font-bold text-navy-900">Design-led</h3>
            <p className="mt-2 text-sm text-gray-600">
              Polished UX isn&apos;t polish for its own sake—it&apos;s respect for people making the biggest purchase of their lives.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-md"
          >
            <LineChart className="text-emerald-600" size={26} />
            <h3 className="mt-3 font-bold text-navy-900">Data-informed</h3>
            <p className="mt-2 text-sm text-gray-600">
              We measure what matters—conversion, trust signals, and partner outcomes—not vanity metrics.
            </p>
          </motion.div>
        </div>
      </MotionSection>

      {/* Roles */}
      <section id="roles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-gold-600 font-semibold text-sm uppercase tracking-widest">Open positions</p>
          <h2 className="mt-2 text-3xl font-bold text-navy-900">Find your next chapter</h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            Don&apos;t see a perfect match? Apply anyway—we read every note and often create roles around exceptional people.
          </p>
        </motion.div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {ROLES.map((role) => {
            const open = openId === role.id;
            return (
              <motion.div
                key={role.id}
                layout
                className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : role.id)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 sm:px-6 hover:bg-gray-50/80 transition-colors"
                >
                  <div>
                    <p className="font-bold text-navy-900">{role.title}</p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {role.team} · {role.location} · {role.type}
                    </p>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-gray-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 pt-0 border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed pt-4">{role.summary}</p>
                        <ul className="mt-4 space-y-2">
                          {role.bullets.map((b) => (
                            <li key={b} className="flex gap-2 text-sm text-gray-700">
                              <CheckCircle size={16} className="text-gold-500 shrink-0 mt-0.5" />
                              {b}
                            </li>
                          ))}
                        </ul>
                        <a
                          href="#apply"
                          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gold-700 hover:text-gold-800"
                        >
                          Apply for this role <ArrowRight size={14} />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="scroll-mt-28">
      <MotionSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-xl mx-auto rounded-[2rem] border border-gray-200 bg-white p-8 sm:p-10 shadow-xl shadow-navy-900/5">
          <h2 className="text-2xl font-bold text-navy-900 text-center">Tell us about you</h2>
          <p className="mt-2 text-center text-gray-600 text-sm">
            Share your background and the role you are drawn to. Our talent team reviews every submission.
          </p>
          <form onSubmit={handleApply} className="mt-8 space-y-4">
            <div>
              <label className="text-sm font-medium text-navy-800">Full name *</label>
              <input name="name" className="input-field mt-1" required placeholder="Your name" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-navy-800">Email *</label>
                <input name="email" type="email" className="input-field mt-1" required placeholder="you@email.com" />
              </div>
              <div>
                <label className="text-sm font-medium text-navy-800">Phone *</label>
                <input name="phone" className="input-field mt-1" required placeholder="+91..." />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-navy-800">Role of interest</label>
              <select name="role" className="input-field mt-1">
                <option value="">Select a role</option>
                {ROLES.map((r) => (
                  <option key={r.id} value={r.title}>
                    {r.title}
                  </option>
                ))}
                <option value="General application">General application</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-navy-800">LinkedIn / portfolio</label>
              <input name="linkedin" className="input-field mt-1" placeholder="https://" />
            </div>
            <div>
              <label className="text-sm font-medium text-navy-800">A few lines about you</label>
              <textarea
                name="message"
                rows={4}
                className="input-field mt-1 resize-y min-h-[100px]"
                placeholder="What excites you about Property Pointers?"
              />
            </div>
            {status && (
              <p className={`text-sm font-medium ${status.ok ? "text-emerald-600" : "text-red-600"}`}>
                {status.text}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? "Sending…" : "Submit application"}
            </button>
          </form>
        </div>
      </MotionSection>
      </section>
    </main>
  );
}
