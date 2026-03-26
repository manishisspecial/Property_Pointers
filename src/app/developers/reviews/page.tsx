"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft, Star, MessageSquareText, ShieldCheck, ThumbsUp, ArrowRight,
  Building2, MapPin, ChevronRight, Users, TrendingUp,
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
  verified: boolean;
  totalUnits: number;
};

export default function BuilderReviewsPage() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/developers?sort=delivered&limit=30");
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
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-gold-500/15 blur-[120px] rounded-full" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14 sm:pt-32 sm:pb-16">
          <Link href="/developers" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-6">
            <ArrowLeft size={14} /> All Developers
          </Link>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-start gap-4">
              <span className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                <Star size={28} className="text-gold-400" />
              </span>
              <div>
                <p className="text-xs font-bold tracking-wider text-gold-400 uppercase">Reviews & Ratings</p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-1">
                  Builder Reviews
                </h1>
                <p className="text-gray-300 mt-3 max-w-2xl text-lg">
                  Real feedback helps buyers avoid surprises. Browse developer reviews, ratings, and buyer experiences.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Review Categories */}
        <MotionSection className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-navy-900">What Reviews Cover</h2>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Designed for decision-making, not just star ratings.
          </p>

          <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {[
              { t: "Ratings + Context", d: "Star ratings with detailed explanations and project specifics.", icon: <MessageSquareText size={20} className="text-blue-600" />, color: "bg-blue-50" },
              { t: "Verified Buyers", d: "Flagged reviews from verified property owners and purchasers.", icon: <ShieldCheck size={20} className="text-emerald-600" />, color: "bg-emerald-50" },
              { t: "Actionable Tips", d: "Red flags and what to verify before making a booking.", icon: <ThumbsUp size={20} className="text-purple-600" />, color: "bg-purple-50" },
              { t: "Track Record", d: "Delivery performance, quality trends, and consistency.", icon: <TrendingUp size={20} className="text-gold-600" />, color: "bg-gold-50" },
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

        {/* Browse Developer Reviews */}
        <MotionSection className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-navy-900">Browse Developer Reviews</h2>
              <p className="text-gray-600 mt-1">Select a developer to read detailed reviews and ratings.</p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-gray-100 p-5 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gray-200" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : developers.length === 0 ? (
            <div className="text-center py-12">
              <Star size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-semibold text-navy-900">No developers available yet</p>
              <p className="text-sm text-gray-500 mt-1">Reviews will appear once developers are listed.</p>
            </div>
          ) : (
            <MotionGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {developers.map((dev) => (
                <MotionCard key={dev.slug}>
                  <Link
                    href={`/developers/${dev.slug}#reviews`}
                    className="group flex items-center gap-3.5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md hover:border-gray-200 transition-all p-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                      {dev.logo ? (
                        <img src={dev.logo} alt={dev.name} className="w-full h-full object-cover" />
                      ) : (
                        <Building2 size={20} className="text-navy-400" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="font-semibold text-navy-900 truncate">{dev.name}</p>
                        {dev.verified && <ShieldCheck size={14} className="text-emerald-500 shrink-0" />}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                        <MapPin size={10} className="text-gold-500" />
                        {dev.cities.slice(0, 2).join(", ")}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                        <span>{dev.totalProjects} projects</span>
                        <span>{dev.delivered} delivered</span>
                      </div>
                    </div>
                    <div className="text-center shrink-0">
                      <div className="flex items-center gap-0.5 mb-0.5">
                        <Star size={14} className="text-amber-400 fill-amber-400" />
                        <span className="text-sm font-bold text-navy-900">4.2</span>
                      </div>
                      <ChevronRight size={14} className="text-gray-400 group-hover:text-gold-500 transition-colors mx-auto" />
                    </div>
                  </Link>
                </MotionCard>
              ))}
            </MotionGrid>
          )}
        </MotionSection>

        {/* How to Read Reviews */}
        <MotionSection className="rounded-2xl gradient-navy text-white p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-gold-500/10 blur-[80px] rounded-full" />
          <div className="relative">
            <div className="text-center mb-8">
              <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">Reading Guide</span>
              <h3 className="text-2xl sm:text-3xl font-bold mt-2">How to Read Reviews Wisely</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Look for Patterns", desc: "Focus on repeated themes across multiple reviews rather than isolated comments." },
                { title: "Verify the Context", desc: "Consider when the review was written and which specific project it refers to." },
                { title: "Cross-Reference", desc: "Combine reviews with site visits, RERA checks, and document verification." },
              ].map((s) => (
                <div key={s.title} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center mx-auto mb-3">
                    <Star size={20} className="text-gold-400" />
                  </div>
                  <h4 className="font-bold text-lg">{s.title}</h4>
                  <p className="text-sm text-gray-400 mt-2 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </MotionSection>

        {/* CTA */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-navy-900">Compare live projects directly</h3>
            <p className="text-gray-600 mt-1">See builder details with current listings under New Projects.</p>
          </div>
          <Link href="/projects" className="btn-primary inline-flex items-center gap-2 whitespace-nowrap">
            Explore Projects <ArrowRight size={16} />
          </Link>
        </div>

        <FAQAccordion
          title="Builder Reviews FAQ"
          items={[
            {
              question: "How should I read builder reviews objectively?",
              answer: "Look for repeated themes across multiple reviews, not only isolated comments. Pay attention to specific project references.",
            },
            {
              question: "Are negative reviews always a red flag?",
              answer: "Not always. Evaluate how the issue was handled and whether similar complaints repeat across projects.",
            },
            {
              question: "What should I verify after reading reviews?",
              answer: "Visit the project site, verify RERA documents, compare promised vs. delivered quality, and check possession timelines.",
            },
            {
              question: "Can I submit my own review?",
              answer: "Yes. Visit the developer's profile page and share your experience. Verified buyer reviews are prioritized.",
            },
          ]}
        />
      </div>
    </div>
  );
}
