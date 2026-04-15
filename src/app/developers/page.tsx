"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import {
  Trophy, Search, Star, ArrowRight, ShieldCheck, TrendingUp, Clock,
  Building2, MapPin, Users, ChevronRight, Filter, Sparkles, Award,
  CheckCircle, Eye,
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

export default function DevelopersPage() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [allCities, setAllCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("projects");

  useEffect(() => {
    async function fetchDevelopers() {
      try {
        const res = await fetch("/api/developers?limit=100");
        if (res.ok) {
          const data = await res.json();
          setDevelopers(data.developers || []);
          setAllCities(data.cities || []);
        }
      } catch {
        /* empty */
      } finally {
        setLoading(false);
      }
    }
    fetchDevelopers();
  }, []);

  const filtered = useMemo(() => {
    let list = [...developers];

    if (query) {
      const lower = query.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(lower) ||
          d.cities.some((c) => c.toLowerCase().includes(lower))
      );
    }

    if (cityFilter !== "all") {
      list = list.filter((d) => d.cities.includes(cityFilter));
    }

    if (sortBy === "projects") list.sort((a, b) => b.totalProjects - a.totalProjects);
    else if (sortBy === "delivered") list.sort((a, b) => b.delivered - a.delivered);
    else if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [developers, query, cityFilter, sortBy]);

  const topDevelopers = useMemo(
    () => developers.filter((d) => d.totalProjects >= 2 || d.featured).slice(0, 6),
    [developers]
  );

  const totalProjects = developers.reduce((s, d) => s + d.totalProjects, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gold-500/15 blur-[120px] rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-purple-500/8 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[200px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-32 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 px-4 py-2 rounded-full mb-6">
              <Sparkles size={16} className="text-gold-400" />
              <span className="text-gold-400 text-sm font-medium">Discover Real Estate Brands</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Look Beyond<br />
              <span className="text-gradient">The Walls</span>
            </h1>
            <p className="text-gray-300 mt-5 max-w-2xl mx-auto text-lg">
              Know what values drive these brands to build the right foundations,
              create the designs and spaces for your future home.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {[
                { value: `${developers.length || "—"}`, label: "Developers" },
                { value: `${totalProjects || "—"}`, label: "Projects" },
                { value: `${allCities.length || "—"}`, label: "Cities" },
              ].map((s) => (
                <div key={s.label} className="text-center px-5">
                  <p className="text-2xl md:text-3xl font-bold text-gold-400">{s.value}</p>
                  <p className="text-sm text-gray-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto"
          >
            {[
              { title: "Top Developers", href: "/developers/top", icon: <Trophy size={20} className="text-gold-400" />, desc: "Curated & ranked" },
              { title: "Explore by Builder", href: "/developers/explore", icon: <Search size={20} className="text-blue-400" />, desc: "Search & filter" },
              { title: "Builder Reviews", href: "/developers/reviews", icon: <Star size={20} className="text-purple-400" />, desc: "Real feedback" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl px-4 py-3.5 transition-all"
              >
                <span className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-white text-sm">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
                <ArrowRight size={16} className="text-gray-500 group-hover:text-white transition-colors ml-auto shrink-0" />
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Featured Developers (Brand Store Style) */}
        {topDevelopers.length > 0 && (
          <MotionSection>
            <div className="flex items-end justify-between mb-6">
              <div>
                <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">Featured Brands</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mt-1">
                  Make the Right Choice
                </h2>
                <p className="text-gray-600 mt-2 max-w-xl">
                  Hear directly from these brands before you make your big decision.
                </p>
              </div>
              <Link href="/developers/top" className="hidden sm:flex items-center gap-1 text-gold-600 font-semibold text-sm hover:text-gold-700">
                View All <ArrowRight size={16} />
              </Link>
            </div>

            <MotionGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {topDevelopers.map((dev) => (
                <MotionCard key={dev.slug}>
                  <Link
                    href={`/developers/${dev.slug}`}
                    className="group block bg-white rounded-2xl border border-gray-100 hover:border-gold-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative h-2 bg-gradient-to-r from-gold-400 via-gold-500 to-navy-800" />
                    <div className="p-5">
                      <div className="flex items-start gap-3.5">
                        <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-gold-200 transition-colors">
                          {dev.logo ? (
                            <img src={dev.logo} alt={dev.name} className="w-full h-full object-cover" />
                          ) : (
                            <Building2 size={22} className="text-navy-400" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-navy-900 truncate">{dev.name}</h3>
                            {dev.verified && (
                              <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1 truncate">
                            <MapPin size={12} className="text-gold-500 shrink-0" />
                            {dev.cities.slice(0, 3).join(", ")}
                            {dev.cities.length > 3 && ` +${dev.cities.length - 3}`}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="rounded-lg bg-navy-50 px-3 py-2 text-center">
                          <p className="text-lg font-bold text-navy-900">{dev.totalProjects}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">Projects</p>
                        </div>
                        <div className="rounded-lg bg-emerald-50 px-3 py-2 text-center">
                          <p className="text-lg font-bold text-emerald-700">{dev.delivered}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">Delivered</p>
                        </div>
                        <div className="rounded-lg bg-blue-50 px-3 py-2 text-center">
                          <p className="text-lg font-bold text-blue-700">{dev.ongoing}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">Ongoing</p>
                        </div>
                      </div>

                      {dev.totalUnits > 0 && (
                        <p className="text-xs text-gray-500 mt-3 flex items-center gap-1.5">
                          <Users size={12} className="text-navy-400" />
                          {dev.totalUnits.toLocaleString()}+ units across all projects
                        </p>
                      )}

                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-sm font-semibold text-gold-600 group-hover:text-gold-700 flex items-center gap-1">
                          View Brand Profile <ChevronRight size={14} />
                        </span>
                        {dev.featured && (
                          <span className="text-[10px] bg-gold-50 text-gold-700 px-2 py-0.5 rounded-full font-medium">Featured</span>
                        )}
                      </div>
                    </div>
                  </Link>
                </MotionCard>
              ))}
            </MotionGrid>

            <div className="sm:hidden text-center mt-4">
              <Link href="/developers/top" className="text-sm font-semibold text-gold-600">
                View All Top Developers <ArrowRight size={14} className="inline" />
              </Link>
            </div>
          </MotionSection>
        )}

        {/* Search and Filter */}
        <MotionSection className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="text-xl font-bold text-navy-900">All Developers</h2>
              <p className="text-sm text-gray-500 mt-1">{filtered.length} developers found</p>
            </div>
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-400" />
              <span className="text-sm text-gray-500">Sort & Filter</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <label className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search developer or city..."
                className="input-field pl-9"
              />
            </label>
            <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} className="input-field">
              <option value="all">All Cities</option>
              {allCities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-field">
              <option value="projects">Most Projects</option>
              <option value="delivered">Most Delivered</option>
              <option value="name">Name A-Z</option>
            </select>
            <Link href="/developers/explore" className="btn-secondary flex items-center justify-center gap-2 text-sm">
              <Search size={16} /> Advanced Search
            </Link>
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
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="h-14 bg-gray-100 rounded-lg" />
                    <div className="h-14 bg-gray-100 rounded-lg" />
                    <div className="h-14 bg-gray-100 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <Building2 size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-600 font-medium">No developers found</p>
              <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <MotionGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((dev) => (
                <MotionCard key={dev.slug}>
                  <Link
                    href={`/developers/${dev.slug}`}
                    className="group flex flex-col rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md hover:border-gray-200 transition-all p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-lg bg-white border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                        {dev.logo ? (
                          <img src={dev.logo} alt={dev.name} className="w-full h-full object-cover" />
                        ) : (
                          <Building2 size={18} className="text-navy-400" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold text-navy-900 truncate">{dev.name}</p>
                          {dev.verified && <ShieldCheck size={14} className="text-emerald-500 shrink-0" />}
                        </div>
                        <p className="text-xs text-gray-500 truncate">{dev.cities.join(", ")}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
                      <span className="bg-white rounded-md border border-gray-100 py-1.5">
                        <strong className="text-navy-900">{dev.totalProjects}</strong>
                        <span className="text-gray-500 block">Projects</span>
                      </span>
                      <span className="bg-white rounded-md border border-gray-100 py-1.5">
                        <strong className="text-emerald-700">{dev.delivered}</strong>
                        <span className="text-gray-500 block">Delivered</span>
                      </span>
                      <span className="bg-white rounded-md border border-gray-100 py-1.5">
                        <strong className="text-blue-700">{dev.ongoing}</strong>
                        <span className="text-gray-500 block">Ongoing</span>
                      </span>
                    </div>
                    <span className="text-xs text-gold-600 font-semibold mt-3 group-hover:text-gold-700 flex items-center gap-1">
                      View Profile <ArrowRight size={12} />
                    </span>
                  </Link>
                </MotionCard>
              ))}
            </MotionGrid>
          )}
        </MotionSection>

        {/* Trust Signals */}
        <MotionSection className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <h3 className="text-xl font-bold text-navy-900">What to check before choosing a builder</h3>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Make informed decisions with these key evaluation criteria.
          </p>
          <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {[
              { t: "Delivery Record", d: "Past projects, possession timelines, and track record.", icon: <Clock size={20} className="text-blue-600" />, color: "bg-blue-50" },
              { t: "Quality & RERA", d: "Construction materials, RERA compliance, and approvals.", icon: <ShieldCheck size={20} className="text-emerald-600" />, color: "bg-emerald-50" },
              { t: "Market Demand", d: "Location strength, resale value, and buyer preference.", icon: <TrendingUp size={20} className="text-gold-600" />, color: "bg-gold-50" },
              { t: "Customer Reviews", d: "Real feedback from buyers and investors.", icon: <Star size={20} className="text-purple-600" />, color: "bg-purple-50" },
            ].map((x) => (
              <MotionCard key={x.t} className={`rounded-xl border border-gray-100 ${x.color} p-5`}>
                <div className="w-11 h-11 rounded-xl bg-white border border-gray-100 flex items-center justify-center">
                  {x.icon}
                </div>
                <p className="font-semibold text-navy-900 mt-3">{x.t}</p>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{x.d}</p>
              </MotionCard>
            ))}
          </MotionGrid>
        </MotionSection>

        {/* How It Works */}
        <MotionSection className="rounded-2xl gradient-navy text-white p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-gold-500/10 blur-[80px] rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/5 blur-[80px] rounded-full" />
          <div className="relative">
            <div className="text-center mb-8">
              <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">How It Works</span>
              <h3 className="text-2xl sm:text-3xl font-bold mt-2">Find Your Trusted Builder</h3>
              <p className="text-gray-300 mt-2 max-w-xl mx-auto">Three simple steps to shortlist the right developer.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: "01", title: "Explore Developers", desc: "Browse verified profiles, compare delivery records and active projects.", icon: <Eye size={24} /> },
                { step: "02", title: "Evaluate & Compare", desc: "Read reviews, check RERA status, and analyze project portfolios.", icon: <Award size={24} /> },
                { step: "03", title: "Connect & Decide", desc: "Contact developers directly, visit projects, and make an informed choice.", icon: <CheckCircle size={24} /> },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-gold-400">{s.icon}</span>
                  </div>
                  <span className="text-gold-400 text-sm font-bold">Step {s.step}</span>
                  <h4 className="font-bold text-lg mt-1">{s.title}</h4>
                  <p className="text-sm text-gray-400 mt-2 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/developers/explore" className="btn-primary inline-flex items-center gap-2">
                Start Exploring <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </MotionSection>

        {/* CTA Banner */}
        <MotionSection className="bg-gradient-to-r from-navy-800 to-navy-900 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">Are you a developer?</h3>
            <p className="text-gray-300 mt-1 max-w-lg">
              List your projects on Property Pointers and reach thousands of verified buyers and investors.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/partners/join" className="btn-primary whitespace-nowrap">
              Partner With Us
            </Link>
            <Link href="/projects" className="btn-outline border-white/30 text-white hover:bg-white hover:text-navy-900 whitespace-nowrap">
              Browse Projects
            </Link>
          </div>
        </MotionSection>

        {/* FAQ */}
        <FAQAccordion
          title="Developers FAQ"
          items={[
            {
              question: "How are developers listed on Property Pointers?",
              answer: "Developers are listed based on their active project portfolio. Each profile is built from verified project data, including delivery history, RERA compliance, and customer feedback.",
            },
            {
              question: "How should I compare two developers quickly?",
              answer: "Start with delivery timeline history, project quality feedback, and legal/approval transparency. Use the comparison stats on each developer profile.",
            },
            {
              question: "What matters more: brand name or project-level quality?",
              answer: "Project-level quality and execution are critical, even for well-known developers. Always verify RERA status and visit the site.",
            },
            {
              question: "Can I contact developers directly through this platform?",
              answer: "Yes. Each developer profile has a contact form that connects you directly with the builder's sales team.",
            },
            {
              question: "How can I join as a developer partner?",
              answer: "Visit the Partner Network section or use the 'Partner With Us' button above. Submit your profile and our team will review it.",
            },
          ]}
        />
      </div>
    </div>
  );
}
