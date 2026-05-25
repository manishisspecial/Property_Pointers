"use client";

import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Globe,
  MapPin,
  MessageSquare,
  Search,
  Star,
  Users,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MotionCard, MotionGrid, MotionSection } from "@/components/MarketingMotion";

const BENEFITS = [
  {
    icon: Briefcase,
    title: "Professional Digital Identity",
    desc: "Build a comprehensive profile that positions you as a trusted real estate advisor.",
  },
  {
    icon: MapPin,
    title: "Locality Expert Positioning",
    desc: "Establish yourself as the go-to advisor for specific localities and neighbourhoods.",
  },
  {
    icon: Search,
    title: "Active Listing Visibility",
    desc: "Your property listings get discovered by serious buyers searching on PropertyPointers.",
  },
  {
    icon: Users,
    title: "Buyer Enquiries",
    desc: "Receive direct enquiries from qualified buyers looking for properties in your areas.",
  },
  {
    icon: Star,
    title: "Reviews & Ratings",
    desc: "Build your reputation through client reviews and transparent performance metrics.",
  },
  {
    icon: MessageSquare,
    title: "Category-Based Discovery",
    desc: "Get discovered by buyers based on property type, area and specialisation.",
  },
];

export default function JoinAdvisorClient() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-gray-50 overflow-x-hidden">
      <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <motion.div
          className="absolute -top-32 -right-24 w-[min(90vw,520px)] h-[min(90vw,520px)] rounded-full bg-gold-500/20 blur-[100px]"
          animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60L60 0H0z' fill='%23fff'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-sm mb-6">
              <Briefcase size={16} className="text-gold-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300/90">
                For Brokers, Agents & Consultants
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08]">
              Join as{" "}
              <span className="text-gradient bg-[length:120%_auto]">Realty Advisor</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Build your professional identity on PropertyPointers. Connect with buyers, showcase your
              expertise and grow your real estate advisory practice.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3.5 text-sm font-bold text-navy-900 shadow-lg shadow-gold-500/25 transition-all hover:bg-gold-400 hover:shadow-xl active:scale-[0.98]"
              >
                Get Started <ArrowRight size={18} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Learn about our ecosystem
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      <MotionSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-gold-600 font-semibold text-sm uppercase tracking-widest">Benefits</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-navy-900">
            Grow your advisory practice
          </h2>
        </div>
        <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((item) => (
            <MotionCard
              key={item.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="rounded-xl bg-navy-50 border border-navy-100 p-3 w-fit">
                <item.icon size={24} className="text-navy-700" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-navy-900">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </MotionCard>
          ))}
        </MotionGrid>
      </MotionSection>

      <MotionSection className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <motion.div
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 px-8 py-14 sm:px-14 sm:py-16 text-center"
          whileHover={reduceMotion ? undefined : { scale: 1.005 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
        >
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/30 blur-[100px] rounded-full" />
          </div>
          <Globe className="relative mx-auto text-gold-400" size={40} />
          <h2 className="relative mt-4 text-2xl sm:text-3xl font-extrabold text-white">
            Ready to build your advisory profile?
          </h2>
          <p className="relative mt-3 text-gray-300 max-w-xl mx-auto">
            Join PropertyPointers and become a trusted realty advisor in India&apos;s growing real
            estate ecosystem.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-8 py-4 text-sm font-bold text-navy-900 shadow-lg transition-all hover:bg-gold-400"
            >
              Join as Realty Advisor <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </MotionSection>
    </main>
  );
}
