"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ChevronDown, Building2, Users, Wrench } from "lucide-react";
import { useCity } from "@/context/CityContext";

const SEARCH_TABS = [
  { value: "sale", label: "Buy", route: "/properties" },
  { value: "rent", label: "Rent", route: "/properties" },
  { value: "commercial", label: "Commercial", route: "/properties" },
  { value: "developers", label: "Developers", route: "/developers" },
  { value: "advisors", label: "Advisors", route: "/realty-advisors" },
  { value: "vendors", label: "Vendors", route: "/vendors" },
];

export default function SearchBar({ className = "" }: { className?: string }) {
  const router = useRouter();
  const { selectedCity, openPicker } = useCity();
  const [type, setType] = useState("sale");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const activeTab = SEARCH_TABS.find((t) => t.value === type) || SEARCH_TABS[0];
  const isPropertySearch = ["sale", "rent", "commercial"].includes(type);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    if (!isPropertySearch) {
      const route = activeTab.route;
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (selectedCity) params.set("city", selectedCity.name);
      router.push(params.toString() ? `${route}?${params.toString()}` : route);
      return;
    }

    const params = new URLSearchParams();
    if (type === "commercial") {
      params.set("type", "sale");
      if (category === "all") params.set("category", "office");
      else params.set("category", category);
    } else {
      params.set("type", type);
      if (category !== "all") params.set("category", category);
    }
    if (query) params.set("q", query);
    if (selectedCity) params.set("city", selectedCity.name);
    router.push(`/properties?${params.toString()}`);
  }

  const placeholderMap: Record<string, string> = {
    sale: `Search properties to buy in ${selectedCity?.name || "all cities"}...`,
    rent: `Search rentals in ${selectedCity?.name || "all cities"}...`,
    commercial: `Search commercial property in ${selectedCity?.name || "all cities"}...`,
    developers: `Search developers in ${selectedCity?.name || "all cities"}...`,
    advisors: `Search realty advisors in ${selectedCity?.name || "all cities"}...`,
    vendors: `Search vendors and services...`,
  };

  return (
    <div className={className}>
      <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
        {SEARCH_TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => { setType(t.value); setCategory("all"); }}
            className={`px-5 py-2.5 rounded-t-lg font-semibold text-sm transition-all whitespace-nowrap ${
              type === t.value
                ? "bg-white text-navy-800 shadow-md border-t border-l border-r border-gray-200"
                : "bg-navy-800 text-white hover:bg-navy-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-2xl p-2 flex flex-col md:flex-row gap-2">
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

        {isPropertySearch && (
          <div className="relative flex-shrink-0">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none px-4 py-3.5 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-gold-400 cursor-pointer"
            >
              {type === "commercial" ? (
                <>
                  <option value="all">All Commercial</option>
                  <option value="office">Offices</option>
                  <option value="shop">Shops</option>
                </>
              ) : (
                <>
                  <option value="all">All Residential</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="plot">Plot/Land</option>
                  <option value="office">Offices</option>
                  <option value="shop">Shops</option>
                  <option value="studio">Studio Apartments</option>
                </>
              )}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        )}

        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholderMap[type]}
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
