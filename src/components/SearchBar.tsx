"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { useCity } from "@/context/CityContext";

export default function SearchBar({ className = "" }: { className?: string }) {
  const router = useRouter();
  const { selectedCity, openPicker } = useCity();
  const [type, setType] = useState("sale");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("type", type);
    if (query) params.set("q", query);
    if (category !== "all") params.set("category", category);
    if (selectedCity) params.set("city", selectedCity.name);
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <div className={className}>
      <div className="flex gap-1 mb-4">
        {[
          { value: "sale", label: "Buy" },
          { value: "rent", label: "Rent" },
          { value: "pg", label: "PG/Co-Living" },
        ].map((t) => (
          <button
            key={t.value}
            onClick={() => setType(t.value)}
            className={`px-6 py-2.5 rounded-t-lg font-semibold text-sm transition-all ${
              type === t.value
                ? "bg-white text-navy-800 shadow-sm"
                : "bg-white/10 text-white/80 hover:bg-white/20"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-2xl p-2 flex flex-col md:flex-row gap-2">
        {/* City Selector */}
        <button
          type="button"
          onClick={openPicker}
          className="flex items-center gap-2 px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors shrink-0"
        >
          <MapPin size={16} className="text-gold-500" />
          <span className="max-w-[120px] truncate">
            {selectedCity ? selectedCity.name : "All Cities"}
          </span>
          <ChevronDown size={14} className="text-gray-400" />
        </button>

        <div className="relative flex-shrink-0">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="appearance-none px-4 py-3.5 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-gold-400 cursor-pointer"
          >
            <option value="all">All Residential</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="plot">Plot/Land</option>
            <option value="commercial">Commercial</option>
            <option value="office">Office Space</option>
            <option value="shop">Shop</option>
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search in ${selectedCity?.name || "all cities"}...`}
            className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-gold-400"
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-white font-bold px-8 py-3.5 rounded-lg transition-all shrink-0"
        >
          <Search size={18} />
          Search
        </button>
      </form>
    </div>
  );
}
