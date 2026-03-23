"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";
import { PropertyType } from "@/types";
import { Search, SlidersHorizontal, X, MapPin, Grid3X3, List, ChevronDown } from "lucide-react";

function PropertiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [filters, setFilters] = useState({
    type: searchParams.get("type") || "",
    category: searchParams.get("category") || "",
    city: searchParams.get("city") || "",
    q: searchParams.get("q") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedrooms: searchParams.get("bedrooms") || "",
    furnished: searchParams.get("furnished") || "",
    sort: searchParams.get("sort") || "newest",
    page: searchParams.get("page") || "1",
  });

  useEffect(() => {
    setFilters({
      type: searchParams.get("type") || "",
      category: searchParams.get("category") || "",
      city: searchParams.get("city") || "",
      q: searchParams.get("q") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      bedrooms: searchParams.get("bedrooms") || "",
      furnished: searchParams.get("furnished") || "",
      sort: searchParams.get("sort") || "newest",
      page: searchParams.get("page") || "1",
    });
  }, [searchParams]);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    try {
      const res = await fetch(`/api/properties?${params.toString()}`);
      const data = await res.json();
      setProperties(data.properties || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 0);
    } catch {
      setProperties([]);
    }
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  function updateFilter(key: string, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value, page: "1" }));
  }

  function clearFilters() {
    setFilters({ type: "", category: "", city: "", q: "", minPrice: "", maxPrice: "", bedrooms: "", furnished: "", sort: "newest", page: "1" });
  }

  const typeLabel = filters.type === "sale" ? "Buy" : filters.type === "rent" ? "Rent" : filters.type === "pg" ? "PG" : "All";

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-navy-900">
                Properties {filters.type ? `for ${typeLabel}` : ""} {filters.city ? `in ${filters.city}` : ""}
              </h1>
              <p className="text-sm text-gray-500">{total} properties found</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 md:w-64 relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={filters.q}
                  onChange={(e) => updateFilter("q", e.target.value)}
                  placeholder="Search location, project..."
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  showFilters ? "bg-navy-800 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <SlidersHorizontal size={16} /> Filters
              </button>

              <div className="hidden md:flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setViewMode("grid")} className={`p-2.5 ${viewMode === "grid" ? "bg-navy-800 text-white" : "text-gray-500"}`}>
                  <Grid3X3 size={16} />
                </button>
                <button onClick={() => setViewMode("list")} className={`p-2.5 ${viewMode === "list" ? "bg-navy-800 text-white" : "text-gray-500"}`}>
                  <List size={16} />
                </button>
              </div>

              <select
                value={filters.sort}
                onChange={(e) => updateFilter("sort", e.target.value)}
                className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Property Type</label>
                <select value={filters.type} onChange={(e) => updateFilter("type", e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                  <option value="">All Types</option>
                  <option value="sale">Buy</option>
                  <option value="rent">Rent</option>
                  <option value="pg">PG</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
                <select value={filters.category} onChange={(e) => updateFilter("category", e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                  <option value="">All Categories</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="plot">Plot</option>
                  <option value="commercial">Commercial</option>
                  <option value="office">Office</option>
                  <option value="shop">Shop</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">City</label>
                <input type="text" value={filters.city} onChange={(e) => updateFilter("city", e.target.value)} placeholder="Enter city" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Min Price</label>
                <input type="number" value={filters.minPrice} onChange={(e) => updateFilter("minPrice", e.target.value)} placeholder="₹ Min" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Max Price</label>
                <input type="number" value={filters.maxPrice} onChange={(e) => updateFilter("maxPrice", e.target.value)} placeholder="₹ Max" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">BHK</label>
                <select value={filters.bedrooms} onChange={(e) => updateFilter("bedrooms", e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                  <option value="">Any</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="5">5+ BHK</option>
                </select>
              </div>
              <div className="col-span-2 md:col-span-4 lg:col-span-6 flex justify-end">
                <button onClick={clearFilters} className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1">
                  <X size={14} /> Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-52 bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-6 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20">
            <MapPin size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Properties Found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria</p>
            <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
          </div>
        ) : (
          <>
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => updateFilter("page", String(i + 1))}
                    className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                      filters.page === String(i + 1) ? "bg-navy-800 text-white" : "bg-white text-gray-700 hover:bg-gray-100 border"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full" /></div>}>
      <PropertiesContent />
    </Suspense>
  );
}
