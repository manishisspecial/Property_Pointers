"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MapPin, Search, Star } from "lucide-react";
import { MotionCard, MotionGrid, MotionSection } from "@/components/MarketingMotion";

const categories = [
  { label: "Marketing & Visibility", href: "/vendors/marketing-visibility" },
  { label: "Project Development & Design", href: "/vendors/project-development-design" },
  { label: "Legal & Professional", href: "/vendors/legal-professional" },
  { label: "Project Support Services", href: "/vendors/project-support-services" },
];

const vendors = [
  { name: "GrowthEdge Media", city: "Delhi", category: "Marketing & Visibility", rating: 4.8 },
  { name: "UrbanDraft Studio", city: "Noida", category: "Project Development & Design", rating: 4.7 },
  { name: "RERA Legal Partners", city: "Gurugram", category: "Legal & Professional", rating: 4.9 },
  { name: "BuildOps Assist", city: "Ghaziabad", category: "Project Support Services", rating: 4.6 },
  { name: "Pune Promo Hub", city: "Pune", category: "Marketing & Visibility", rating: 4.5 },
];

export default function VendorsPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filtered = useMemo(
    () =>
      vendors.filter(
        (vendor) =>
          (selectedCategory === "all" || vendor.category === selectedCategory) &&
          (!query || vendor.name.toLowerCase().includes(query.toLowerCase()))
      ),
    [query, selectedCategory]
  );

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <MotionSection className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-navy-900 to-navy-700 text-white p-7 sm:p-10 shadow-xl">
          <p className="text-xs font-semibold tracking-wider uppercase text-gold-300">Vendor Marketplace</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold">Find Trusted Vendors</h1>
          <p className="mt-3 text-gray-200 max-w-2xl">
            Connect with reliable teams for marketing, development, legal support, and end-to-end project delivery.
          </p>
          <Link href="/vendors/join" className="btn-primary mt-6 inline-flex">
            Join As a Vendor
          </Link>
        </div>
      </MotionSection>

      <MotionSection className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="card p-5">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-full text-sm ${selectedCategory === "all" ? "bg-navy-800 text-white" : "bg-gray-100 text-gray-700"}`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.label}
                onClick={() => setSelectedCategory(category.label)}
                className={`px-3 py-1.5 rounded-full text-sm ${
                  selectedCategory === category.label ? "bg-navy-800 text-white" : "bg-gray-100 text-gray-700"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          <label className="relative mt-4 block">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search vendor by name"
              className="input-field pl-9"
            />
          </label>
        </div>
      </MotionSection>

      <MotionSection className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <MotionGrid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((vendor) => (
            <MotionCard key={vendor.name} className="card p-5">
              <h3 className="font-bold text-navy-900">{vendor.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{vendor.category}</p>
              <p className="mt-2 text-sm text-gray-700 flex items-center gap-2">
                <MapPin size={14} className="text-gold-500" /> {vendor.city}
              </p>
              <p className="mt-1 text-sm text-amber-600 flex items-center gap-1">
                <Star size={14} className="fill-amber-400" /> {vendor.rating} rating
              </p>
              <Link href="/vendors/join" className="mt-4 inline-block text-sm font-semibold text-gold-600">
                Request Callback
              </Link>
            </MotionCard>
          ))}
        </MotionGrid>
        {filtered.length === 0 && <div className="card p-8 text-center text-gray-600">No vendors match your search.</div>}
      </MotionSection>
    </main>
  );
}
