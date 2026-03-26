"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft, Trophy, ShieldCheck, Clock, Star, ArrowRight, Building2,
  MapPin, Users, ChevronRight, Crown, Medal, Award,
} from "lucide-react";
import { motion } from "framer-motion";
import { MotionCard, MotionGrid, MotionSection } from "@/components/MarketingMotion";
import FAQAccordion from "@/components/FAQAccordion";

type Developer = {
  slug: string;
  name: string;
  logo: string | null;
  cities: string[];
  totalProjects: number;
  delivered: number;
  ongoing: number;
  upcoming: number;
  featured: boolean;
  verified: boolean;
  totalUnits: number;
  minPrice: number;
  priceUnit: string;
  propertyTypes: string[];
  about: string;
};

const RANK_ICONS = [
  <Crown key="1" size={20} className="text-gold-500" />,
  <Medal key="2" size={20} className="text-gray-400" />,
  <Award key="3" size={20} className="text-amber-600" />,
];

export default function TopDevelopersPage() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/developers?sort=delivered&limit=20");
        if (res.ok) {
          const data = await res.json();
          setDevelopers(data.developers || []);
        }
      } catch {
        /* empty */
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-gold-500/20 blur-[120px] rounded-full" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14 sm:pt-32 sm:pb-16">
          <Link href="/developers" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-6">
            <ArrowLeft size={14} /> All Developers
          </Link>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-start gap-4">
              <span className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                <Trophy size={28} className="text-gold-400" />
              </span>
              <div>
                <p className="text-xs font-bold tracking-wider text-gold-400 uppercase">Top Developers</p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-1">
                  India&apos;s Most Trusted Builders
                </h1>
                <p className="text-gray-300 mt-3 max-w-2xl text-lg">
                  Ranked by delivery record, project quality, RERA compliance, and consistent customer satisfaction.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Ranking Criteria */}
        <MotionSection className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-navy-900">How We Evaluate</h2>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Our ranking is based on multiple trust and performance signals.
          </p>

          <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {[
              { t: "Delivery Record", d: "Possession timelines and completion history.", icon: <Clock size={20} className="text-blue-600" />, color: "bg-blue-50" },
              { t: "RERA Compliance", d: "Verified RERA registration for all projects.", icon: <ShieldCheck size={20} className="text-emerald-600" />, color: "bg-emerald-50" },
              { t: "Customer Rating", d: "Reviews and recurring feedback patterns.", icon: <Star size={20} className="text-amber-600" />, color: "bg-amber-50" },
              { t: "Portfolio Scale", d: "Number of projects, units, and cities covered.", icon: <Building2 size={20} className="text-purple-600" />, color: "bg-purple-50" },
            ].map((x) => (
              <MotionCard key={x.t} className={`rounded-xl border border-gray-100 ${x.color} p-5`}>
                <div className="w-11 h-11 rounded-xl bg-white border border-gray-100 flex items-center justify-center">
                  {x.icon}
                </div>
                <p className="font-semibold text-navy-900 mt-3">{x.t}</p>
                <p className="text-sm text-gray-600 mt-1">{x.d}</p>
              </MotionCard>
            ))}
          </MotionGrid>
        </MotionSection>

        {/* Developer Rankings */}
        <MotionSection className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-navy-900">Developer Rankings</h2>
            <span className="text-sm text-gray-500">{developers.length} developers</span>
          </div>

          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-gray-100 p-5 animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-200" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-1/3" />
                      <div className="h-3 bg-gray-200 rounded w-1/4" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-12 w-16 bg-gray-100 rounded" />
                      <div className="h-12 w-16 bg-gray-100 rounded" />
                      <div className="h-12 w-16 bg-gray-100 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : developers.length === 0 ? (
            <div className="text-center py-12">
              <Trophy size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-600 font-medium">No developers ranked yet</p>
              <p className="text-sm text-gray-500 mt-1">Developers will appear here once projects are listed.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {developers.map((dev, idx) => (
                <motion.div
                  key={dev.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <Link
                    href={`/developers/${dev.slug}`}
                    className={`group flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border p-4 sm:p-5 transition-all hover:shadow-md ${
                      idx < 3
                        ? "border-gold-200 bg-gold-50/30 hover:bg-gold-50/50"
                        : "border-gray-100 bg-white hover:border-gray-200"
                    }`}
                  >
                    {/* Rank */}
                    <div className="flex items-center gap-3 sm:w-12 shrink-0">
                      {idx < 3 ? (
                        <span className="w-10 h-10 rounded-xl bg-white border border-gold-200 flex items-center justify-center shadow-sm">
                          {RANK_ICONS[idx]}
                        </span>
                      ) : (
                        <span className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-sm font-bold text-gray-500">
                          #{idx + 1}
                        </span>
                      )}
                    </div>

                    {/* Logo + Info */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                        {dev.logo ? (
                          <img src={dev.logo} alt={dev.name} className="w-full h-full object-cover" />
                        ) : (
                          <Building2 size={20} className="text-navy-400" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-navy-900 truncate">{dev.name}</p>
                          {dev.verified && <ShieldCheck size={14} className="text-emerald-500 shrink-0" />}
                        </div>
                        <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                          <MapPin size={10} className="text-gold-500" />
                          {dev.cities.join(", ")}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-navy-900">{dev.totalProjects}</p>
                        <p className="text-[10px] text-gray-500">Projects</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-emerald-700">{dev.delivered}</p>
                        <p className="text-[10px] text-gray-500">Delivered</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-blue-700">{dev.ongoing}</p>
                        <p className="text-[10px] text-gray-500">Ongoing</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-navy-700">{dev.totalUnits > 0 ? `${dev.totalUnits}+` : "—"}</p>
                        <p className="text-[10px] text-gray-500">Units</p>
                      </div>
                    </div>

                    <ChevronRight size={18} className="text-gray-400 group-hover:text-gold-500 transition-colors shrink-0 hidden sm:block" />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </MotionSection>

        {/* CTA */}
        <MotionSection className="bg-gradient-to-r from-navy-800 to-navy-900 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">Want to compare live projects?</h3>
            <p className="text-gray-300 mt-1">Use New Projects to compare builders with current listings and pricing.</p>
          </div>
          <Link href="/projects" className="btn-primary inline-flex items-center gap-2 whitespace-nowrap">
            Explore Projects <ArrowRight size={16} />
          </Link>
        </MotionSection>

        <FAQAccordion
          title="Top Developers FAQ"
          items={[
            {
              question: "What defines a top developer?",
              answer: "Consistent delivery, transparent communication, RERA compliance, and strong customer trust over multiple projects.",
            },
            {
              question: "How often are rankings updated?",
              answer: "Rankings are updated dynamically based on the latest project data, delivery status, and customer feedback.",
            },
            {
              question: "Should I still verify project-specific details?",
              answer: "Yes. Even top developers can have project-level differences in layout, timeline, and quality. Always visit the site.",
            },
            {
              question: "Can ratings alone decide my shortlist?",
              answer: "Ratings help, but combine them with site visits, legal checks, and RERA verification for a safer decision.",
            },
          ]}
        />
      </div>
    </div>
  );
}
