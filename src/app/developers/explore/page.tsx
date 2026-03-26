"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft, Search, MapPin, Building2, Filter, ArrowRight,
  ShieldCheck, ChevronRight, X, SlidersHorizontal,
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

export default function ExploreByBuilderPage() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [allCities, setAllCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("projects");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  useEffect(() => {
    async function fetchData() {
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
    fetchData();
  }, []);

  const allTypes = useMemo(
    () => Array.from(new Set(developers.flatMap((d) => d.propertyTypes))).sort(),
    [developers]
  );

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

    if (cityFilter !== "all") list = list.filter((d) => d.cities.includes(cityFilter));
    if (typeFilter !== "all") list = list.filter((d) => d.propertyTypes.includes(typeFilter));
    if (verifiedOnly) list = list.filter((d) => d.verified);

    if (sortBy === "projects") list.sort((a, b) => b.totalProjects - a.totalProjects);
    else if (sortBy === "delivered") list.sort((a, b) => b.delivered - a.delivered);
    else if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "units") list.sort((a, b) => b.totalUnits - a.totalUnits);

    return list;
  }, [developers, query, cityFilter, typeFilter, sortBy, verifiedOnly]);

  const hasActiveFilters = query || cityFilter !== "all" || typeFilter !== "all" || verifiedOnly;

  function clearFilters() {
    setQuery("");
    setCityFilter("all");
    setTypeFilter("all");
    setVerifiedOnly(false);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-gold-500/15 blur-[120px] rounded-full" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14 sm:pt-32 sm:pb-16">
          <Link href="/developers" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-6">
            <ArrowLeft size={14} /> All Developers
          </Link>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-start gap-4">
              <span className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                <Search size={28} className="text-gold-400" />
              </span>
              <div>
                <p className="text-xs font-bold tracking-wider text-gold-400 uppercase">Explore</p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-1">
                  Find Your Builder
                </h1>
                <p className="text-gray-300 mt-3 max-w-2xl text-lg">
                  Search by name, filter by city and project type, and shortlist the right developer for your investment.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Filters */}
        <MotionSection className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-gray-400" /> Filters
            </h2>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1">
                <X size={14} /> Clear all
              </button>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <label className="relative lg:col-span-2">
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
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="input-field">
              <option value="all">All Types</option>
              {allTypes.map((t) => (
                <option key={t} value={t} className="capitalize">{t}</option>
              ))}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-field">
              <option value="projects">Most Projects</option>
              <option value="delivered">Most Delivered</option>
              <option value="units">Most Units</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>

          <label className="flex items-center gap-2 mt-3 text-sm text-gray-700">
            <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} className="rounded" />
            Show verified developers only
          </label>
        </MotionSection>

        {/* Quick City Links */}
        {allCities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {allCities.slice(0, 10).map((city) => (
              <button
                key={city}
                onClick={() => setCityFilter(cityFilter === city ? "all" : city)}
                className={`text-sm px-3.5 py-1.5 rounded-full border transition-colors ${
                  cityFilter === city
                    ? "bg-navy-800 text-white border-navy-800"
                    : "bg-white text-gray-600 border-gray-200 hover:border-navy-200 hover:bg-navy-50"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing <strong className="text-navy-900">{filtered.length}</strong> developers
            {hasActiveFilters && " (filtered)"}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-gray-100 bg-white p-5 animate-pulse">
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
        ) : filtered.length === 0 ? (
          <div className="card p-12 text-center">
            <Building2 size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-lg font-semibold text-navy-900">No developers found</p>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters.</p>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="btn-primary mt-4 inline-flex items-center gap-2">
                Clear Filters <X size={16} />
              </button>
            )}
          </div>
        ) : (
          <MotionGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((dev) => (
              <MotionCard key={dev.slug}>
                <Link
                  href={`/developers/${dev.slug}`}
                  className="group block bg-white rounded-xl border border-gray-100 hover:border-gold-200 hover:shadow-lg transition-all overflow-hidden"
                >
                  <div className="h-1.5 bg-gradient-to-r from-gold-400 via-gold-500 to-navy-800" />
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                        {dev.logo ? (
                          <img src={dev.logo} alt={dev.name} className="w-full h-full object-cover" />
                        ) : (
                          <Building2 size={20} className="text-navy-400" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-navy-900 truncate">{dev.name}</h3>
                          {dev.verified && <ShieldCheck size={14} className="text-emerald-500 shrink-0" />}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                          <MapPin size={10} className="text-gold-500" />
                          {dev.cities.join(", ")}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mt-3 line-clamp-2 leading-relaxed">{dev.about}</p>

                    <div className="grid grid-cols-3 gap-2 mt-3.5">
                      <div className="rounded-lg bg-gray-50 border border-gray-100 px-2 py-1.5 text-center">
                        <p className="text-sm font-bold text-navy-900">{dev.totalProjects}</p>
                        <p className="text-[10px] text-gray-500">Projects</p>
                      </div>
                      <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-2 py-1.5 text-center">
                        <p className="text-sm font-bold text-emerald-700">{dev.delivered}</p>
                        <p className="text-[10px] text-gray-500">Delivered</p>
                      </div>
                      <div className="rounded-lg bg-blue-50 border border-blue-100 px-2 py-1.5 text-center">
                        <p className="text-sm font-bold text-blue-700">{dev.ongoing + dev.upcoming}</p>
                        <p className="text-[10px] text-gray-500">Active</p>
                      </div>
                    </div>

                    <div className="mt-3.5 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-sm text-navy-700 font-medium">
                        From ₹{dev.minPrice} {dev.priceUnit}
                      </span>
                      <span className="text-xs text-gold-600 font-semibold flex items-center gap-1 group-hover:text-gold-700">
                        Profile <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </MotionCard>
            ))}
          </MotionGrid>
        )}

        {/* CTA */}
        <MotionSection className="bg-gradient-to-r from-navy-800 to-navy-900 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">Prefer exploring live projects?</h3>
            <p className="text-gray-300 mt-1">See builder details with current listings and pricing under New Projects.</p>
          </div>
          <Link href="/projects" className="btn-primary inline-flex items-center gap-2 whitespace-nowrap">
            Explore Projects <ArrowRight size={16} />
          </Link>
        </MotionSection>

        <FAQAccordion
          title="Explore by Builder FAQ"
          items={[
            {
              question: "Which filter should I apply first?",
              answer: "City and project type are the best first filters; then refine by trust signals and delivery record.",
            },
            {
              question: "Can I compare builders across cities?",
              answer: "Yes. Start with one city for clarity, then compare options in similar budget bands across cities.",
            },
            {
              question: "How do I identify verified developers?",
              answer: "Look for the green verified badge next to the developer name. You can also filter to show only verified developers.",
            },
            {
              question: "Is this only for new projects?",
              answer: "It's most useful for new projects, but builder reputation also helps with resale decisions.",
            },
          ]}
        />
      </div>
    </div>
  );
}
