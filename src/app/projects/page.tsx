"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, MapPin, Building2, SlidersHorizontal, X, ChevronDown,
  CheckCircle, Star, Eye, ArrowRight, Calendar, IndianRupee,
  LayoutGrid, List, ChevronLeft, ChevronRight, Loader2, Landmark,
  TrendingUp, Shield
} from "lucide-react";
import { useCity } from "@/context/CityContext";

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  "upcoming": { label: "Upcoming", color: "bg-blue-100 text-blue-700" },
  "under-construction": { label: "Under Construction", color: "bg-amber-100 text-amber-700" },
  "ready-to-move": { label: "Ready to Move", color: "bg-green-100 text-green-700" },
};

const TYPE_MAP: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  mixed: "Mixed Use",
  plots: "Plots / Land",
};

const CITIES = ["Delhi", "Noida", "Greater Noida", "Gurugram", "Ghaziabad", "Jaipur", "Pune"];

function safeParseJSON(str: string): any[] {
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

function ProjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { selectedCity } = useCity();
  const [projects, setProjects] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const urlCity = searchParams.get("city") || "";
  const effectiveCity = urlCity || selectedCity?.name || "";

  const [filters, setFilters] = useState({
    q: searchParams.get("q") || "",
    city: effectiveCity,
    propertyType: searchParams.get("propertyType") || "",
    status: searchParams.get("status") || "",
    sort: searchParams.get("sort") || "newest",
    page: searchParams.get("page") || "1",
  });

  useEffect(() => {
    const newUrlCity = searchParams.get("city") || "";
    const newEffectiveCity = newUrlCity || selectedCity?.name || "";
    setFilters({
      q: searchParams.get("q") || "",
      city: newEffectiveCity,
      propertyType: searchParams.get("propertyType") || "",
      status: searchParams.get("status") || "",
      sort: searchParams.get("sort") || "newest",
      page: searchParams.get("page") || "1",
    });
  }, [searchParams, selectedCity]);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.q) params.set("q", filters.q);
    if (filters.city) params.set("city", filters.city);
    if (filters.propertyType) params.set("propertyType", filters.propertyType);
    if (filters.status) params.set("status", filters.status);
    params.set("sort", filters.sort);
    params.set("page", filters.page);
    params.set("limit", "12");

    try {
      const res = await fetch(`/api/projects?${params.toString()}`);
      const data = await res.json();
      setProjects(data.projects || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 0);
    } catch {
      setProjects([]);
    }
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  function updateFilter(key: string, value: string) {
    const newFilters = { ...filters, [key]: value, page: "1" };
    setFilters(newFilters);
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => { if (v) params.set(k, v); });
    router.push(`/projects?${params.toString()}`, { scroll: false });
  }

  function clearFilters() {
    setFilters({ q: "", city: "", propertyType: "", status: "", sort: "newest", page: "1" });
    router.push("/projects", { scroll: false });
  }

  const currentPage = parseInt(filters.page);
  const hasActiveFilters = filters.q || filters.city || filters.propertyType || filters.status;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-400 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Landmark size={16} /> New Launch Projects
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Discover Premium <span className="text-gold-400">Real Estate Projects</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
              Explore RERA-approved residential & commercial projects from top builders across India
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center gap-2 px-4">
                  <Search size={20} className="text-gray-400" />
                  <input
                    value={filters.q}
                    onChange={(e) => setFilters({ ...filters, q: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && updateFilter("q", filters.q)}
                    placeholder="Search projects, builders, locations..."
                    className="flex-1 py-3 text-gray-800 placeholder-gray-400 outline-none text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={filters.city}
                    onChange={(e) => updateFilter("city", e.target.value)}
                    className="px-3 py-2.5 rounded-xl text-sm text-gray-700 border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-gold-500/20"
                  >
                    <option value="">All Cities</option>
                    {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <button
                    onClick={() => updateFilter("q", filters.q)}
                    className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                  >
                    Search
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-8 mt-10"
          >
            {[
              { icon: <Building2 size={20} />, label: "Projects", value: `${total}+` },
              { icon: <Shield size={20} />, label: "RERA Verified", value: "100%" },
              { icon: <TrendingUp size={20} />, label: "Avg. ROI", value: "8-15%" },
              { icon: <MapPin size={20} />, label: "Cities", value: "10+" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 text-gray-300">
                <div className="p-2 bg-white/10 rounded-lg">{stat.icon}</div>
                <div>
                  <p className="text-white font-bold text-lg">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <button onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <SlidersHorizontal size={16} /> Filters
              {hasActiveFilters && <span className="w-2 h-2 bg-gold-500 rounded-full" />}
            </button>

            {/* Quick filter pills */}
            {Object.entries(TYPE_MAP).map(([key, label]) => (
              <button key={key}
                onClick={() => updateFilter("propertyType", filters.propertyType === key ? "" : key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filters.propertyType === key
                    ? "bg-navy-800 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}>{label}</button>
            ))}

            {hasActiveFilters && (
              <button onClick={clearFilters} className="text-xs text-red-500 hover:underline flex items-center gap-1">
                <X size={12} /> Clear all
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <select value={filters.sort} onChange={(e) => updateFilter("sort", e.target.value)}
              className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700">
              <option value="newest">Newest First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
            <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden">
              <button onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-navy-800 text-white" : "text-gray-400 hover:bg-gray-50"}`}>
                <LayoutGrid size={16} />
              </button>
              <button onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-navy-800 text-white" : "text-gray-400 hover:bg-gray-50"}`}>
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">City</label>
                  <select value={filters.city} onChange={(e) => updateFilter("city", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                    <option value="">All Cities</option>
                    {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Property Type</label>
                  <select value={filters.propertyType} onChange={(e) => updateFilter("propertyType", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                    <option value="">All Types</option>
                    {Object.entries(TYPE_MAP).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Status</label>
                  <select value={filters.status} onChange={(e) => updateFilter("status", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                    <option value="">All Status</option>
                    {Object.entries(STATUS_MAP).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Sort By</label>
                  <select value={filters.sort} onChange={(e) => updateFilter("sort", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                    <option value="newest">Newest First</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <p className="text-sm text-gray-500 mb-4">
          Showing <span className="font-semibold text-navy-800">{projects.length}</span> of{" "}
          <span className="font-semibold text-navy-800">{total}</span> projects
        </p>

        {/* Project Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-52 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-8 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <Building2 size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No projects found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or search query</p>
            <button onClick={clearFilters} className="text-gold-600 hover:underline font-medium">Clear all filters</button>
          </motion.div>
        ) : viewMode === "grid" ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {projects.map((project, i) => (
                <ProjectListCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              disabled={currentPage <= 1}
              onClick={() => updateFilter("page", String(currentPage - 1))}
              className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const pageNum = currentPage <= 3 ? i + 1 :
                currentPage >= totalPages - 2 ? totalPages - 4 + i :
                currentPage - 2 + i;
              if (pageNum < 1 || pageNum > totalPages) return null;
              return (
                <button key={pageNum}
                  onClick={() => updateFilter("page", String(pageNum))}
                  className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${
                    currentPage === pageNum
                      ? "bg-navy-800 text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}>{pageNum}</button>
              );
            })}
            <button
              disabled={currentPage >= totalPages}
              onClick={() => updateFilter("page", String(currentPage + 1))}
              className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const images = safeParseJSON(project.images);
  const configs = safeParseJSON(project.configurations);
  const amenities = safeParseJSON(project.amenities);
  const statusInfo = STATUS_MAP[project.projectStatus] || STATUS_MAP["under-construction"];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/projects/${project.slug}`} className="block group">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            {images[0] ? (
              <img src={images[0]} alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-navy-100 to-navy-200 flex items-center justify-center">
                <Building2 size={40} className="text-navy-300" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm ${statusInfo.color}`}>
                {statusInfo.label}
              </span>
              {project.featured && (
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gold-500/90 text-white backdrop-blur-sm flex items-center gap-1">
                  <Star size={10} className="fill-white" /> Featured
                </span>
              )}
            </div>
            {project.verified && (
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 rounded-lg text-xs font-medium bg-green-500/90 text-white backdrop-blur-sm flex items-center gap-1">
                  <CheckCircle size={10} /> RERA
                </span>
              </div>
            )}

            {/* Price Badge */}
            <div className="absolute bottom-3 left-3">
              <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <p className="text-xs text-gray-500">Starting from</p>
                <p className="text-lg font-bold text-navy-900">
                  ₹{project.startingPrice} {project.priceUnit}+
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-bold text-navy-900 group-hover:text-gold-600 transition-colors line-clamp-1">{project.title}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                  <MapPin size={12} /> {project.location}
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-3">by <span className="font-medium text-gray-700">{project.builderName}</span></p>

            {/* Configurations */}
            {configs.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {configs.slice(0, 4).map((c: string) => (
                  <span key={c} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">{c}</span>
                ))}
              </div>
            )}

            {/* Amenity preview */}
            {amenities.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                <span>{amenities.slice(0, 3).join(" • ")}</span>
                {amenities.length > 3 && <span className="text-gold-600">+{amenities.length - 3} more</span>}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-3 text-xs text-gray-400">
                {project.possessionDate && (
                  <span className="flex items-center gap-1"><Calendar size={12} /> {project.possessionDate}</span>
                )}
                <span className="flex items-center gap-1"><Eye size={12} /> {project.views}</span>
              </div>
              <span className="text-gold-600 text-sm font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                View <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ProjectListCard({ project, index }: { project: any; index: number }) {
  const images = safeParseJSON(project.images);
  const configs = safeParseJSON(project.configurations);
  const amenities = safeParseJSON(project.amenities);
  const statusInfo = STATUS_MAP[project.projectStatus] || STATUS_MAP["under-construction"];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/projects/${project.slug}`} className="block group">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col md:flex-row">
          <div className="relative w-full md:w-80 h-48 md:h-auto shrink-0 overflow-hidden">
            {images[0] ? (
              <img src={images[0]} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-navy-100 to-navy-200 flex items-center justify-center">
                <Building2 size={40} className="text-navy-300" />
              </div>
            )}
            <div className="absolute top-3 left-3 flex gap-2">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusInfo.color}`}>{statusInfo.label}</span>
              {project.featured && (
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gold-500/90 text-white flex items-center gap-1">
                  <Star size={10} className="fill-white" /> Featured
                </span>
              )}
            </div>
          </div>

          <div className="flex-1 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="text-lg font-bold text-navy-900 group-hover:text-gold-600 transition-colors">{project.title}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5"><MapPin size={12} /> {project.location}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-gray-500">Starting from</p>
                  <p className="text-xl font-bold text-navy-900">₹{project.startingPrice} {project.priceUnit}+</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-2">by <span className="font-medium text-gray-700">{project.builderName}</span></p>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {configs.map((c: string) => (
                  <span key={c} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">{c}</span>
                ))}
                {project.verified && (
                  <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs font-medium flex items-center gap-1">
                    <CheckCircle size={10} /> RERA Approved
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
              <div className="flex items-center gap-4 text-xs text-gray-400">
                {project.possessionDate && <span className="flex items-center gap-1"><Calendar size={12} /> {project.possessionDate}</span>}
                <span>{TYPE_MAP[project.propertyType] || project.propertyType}</span>
                <span className="flex items-center gap-1"><Eye size={12} /> {project.views} views</span>
              </div>
              <span className="text-gold-600 text-sm font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                View Details <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-gold-500" size={32} />
      </div>
    }>
      <ProjectsContent />
    </Suspense>
  );
}
