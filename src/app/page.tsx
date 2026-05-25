"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Building2, Home, MapPin, TrendingUp, Shield, Users, Star, ArrowRight,
  Search, Landmark, TreePine, Phone, CheckCircle, Zap, Globe, Calculator,
  BookOpen, Clock, Briefcase, Store, LayoutGrid, ChevronDown,
  FileText, Scale, Wrench, BarChart3, HelpCircle, UserCheck,
  Compass, Layers, Target, Lightbulb, Network, Eye, Handshake, Award,
  MessagesSquare, Send, ChevronRight, Sparkles, BadgeCheck
} from "lucide-react";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import { useCity } from "@/context/CityContext";
import { PropertyType } from "@/types";

const PAGE_META = {
  title: "PropertyPointers — Beyond Listings. India's Complete Real Estate Ecosystem",
  description: "Discover properties, compare developers, connect with realty advisors, explore trusted real estate vendors, and make smarter property decisions with insights and tools.",
  keywords: "real estate ecosystem, property, buy, sell, rent, developers, realty advisors, vendors, India, Noida, Delhi NCR, Gurugram, Jaipur, Pune",
  ogImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=630&fit=crop",
  ogTitle: "PropertyPointers — Beyond Listings. India's Complete Real Estate Ecosystem",
  ogDescription: "Discover properties, compare developers, connect with realty advisors, explore trusted real estate vendors, and make smarter property decisions with insights and tools.",
};

const SERVICE_CITIES = [
  { name: "Delhi", img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop", localities: "Dwarka, Saket, Rohini", types: "Apartments, Plots", budget: "₹40 Lac+" },
  { name: "Noida", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop", localities: "Sector 74, Sector 150, Extension", types: "Apartments, Villas", budget: "₹35 Lac+" },
  { name: "Greater Noida", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop", localities: "Pari Chowk, Knowledge Park", types: "Apartments, Plots", budget: "₹25 Lac+" },
  { name: "Gurugram", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=300&fit=crop", localities: "Golf Course Rd, Sohna Rd", types: "Offices, Apartments", budget: "₹60 Lac+" },
  { name: "Ghaziabad", img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=300&fit=crop", localities: "Indirapuram, Raj Nagar", types: "Apartments, Houses", budget: "₹30 Lac+" },
  { name: "Jaipur", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&h=300&fit=crop", localities: "Mansarovar, Vaishali Nagar", types: "Villas, Plots", budget: "₹20 Lac+" },
  { name: "Pune", img: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=400&h=300&fit=crop", localities: "Hinjawadi, Kharadi, Wakad", types: "Apartments, Offices", budget: "₹45 Lac+" },
];

const categories = [
  { icon: Building2, label: "Apartments", href: "/properties?category=apartment", color: "bg-blue-500", tagline: "For end users" },
  { icon: Home, label: "Independent Houses", href: "/properties?category=house", color: "bg-green-500", tagline: "For families" },
  { icon: Landmark, label: "Villas", href: "/properties?category=villa", color: "bg-purple-500", tagline: "For premium living" },
  { icon: TreePine, label: "Plots & Land", href: "/properties?category=plot", color: "bg-emerald-500", tagline: "For investment" },
  { icon: Briefcase, label: "Commercial Offices", href: "/properties?category=office", color: "bg-cyan-500", tagline: "For businesses" },
  { icon: Store, label: "Retail Shops", href: "/properties?category=shop", color: "bg-orange-500", tagline: "For commercial investment" },
  { icon: LayoutGrid, label: "Studio Apartments", href: "/properties?category=studio", color: "bg-indigo-500", tagline: "For rental income" },
  { icon: Sparkles, label: "New Launch Projects", href: "/properties?type=sale&new_launch=true", color: "bg-rose-500", tagline: "For early buyers" },
  { icon: CheckCircle, label: "Ready-to-Move", href: "/properties?type=sale&furnished=furnished", color: "bg-teal-500", tagline: "For quick possession" },
  { icon: TrendingUp, label: "Investment Properties", href: "/properties?type=sale&sort=price_high", color: "bg-amber-500", tagline: "For high ROI" },
  { icon: Award, label: "Luxury Properties", href: "/properties?type=sale&category=villa&sort=price_high", color: "bg-gold-500", tagline: "For premium lifestyle" },
  { icon: Building2, label: "Commercial Investment", href: "/properties?category=office&sort=price_high", color: "bg-slate-500", tagline: "For business growth" },
];

const POPULAR_LOCALITIES = [
  { name: "Sector 74, Noida", href: "/properties?locality=Sector+74&city=Noida" },
  { name: "Sector 150, Noida", href: "/properties?locality=Sector+150&city=Noida" },
  { name: "Noida Extension", href: "/properties?locality=Noida+Extension&city=Greater+Noida" },
  { name: "Sector 62, Noida", href: "/properties?locality=Sector+62&city=Noida" },
  { name: "Greater Noida West", href: "/properties?locality=Greater+Noida+West&city=Greater+Noida" },
  { name: "Yamuna Expressway", href: "/properties?locality=Yamuna+Expressway&city=Greater+Noida" },
  { name: "Dwarka Expressway", href: "/properties?locality=Dwarka+Expressway&city=Gurugram" },
  { name: "Sohna Road", href: "/properties?locality=Sohna+Road&city=Gurugram" },
  { name: "Golf Course Road", href: "/properties?locality=Golf+Course+Road&city=Gurugram" },
  { name: "Hinjawadi, Pune", href: "/properties?locality=Hinjawadi&city=Pune" },
  { name: "Mansarovar, Jaipur", href: "/properties?locality=Mansarovar&city=Jaipur" },
  { name: "Indirapuram", href: "/properties?locality=Indirapuram&city=Ghaziabad" },
];

const PROPERTY_TOOLS = [
  { icon: Calculator, title: "EMI Calculator", desc: "Plan your home loan EMI with ease", href: "/calculator?tool=emi" },
  { icon: FileText, title: "Stamp Duty Calculator", desc: "Estimate registration and stamp duty charges", href: "/calculator?tool=stamp-duty" },
  { icon: TrendingUp, title: "Rental Yield Calculator", desc: "Calculate returns on rental investment", href: "/calculator?tool=rental-yield" },
  { icon: BarChart3, title: "ROI Calculator", desc: "Measure return on property investment", href: "/calculator?tool=roi" },
  { icon: Building2, title: "Construction Cost", desc: "Estimate building construction costs", href: "/calculator?tool=construction-cost" },
  { icon: Scale, title: "Rent vs Buy", desc: "Compare renting vs buying a property", href: "/calculator?tool=rent-vs-buy" },
];

const FAQ_ITEMS = [
  { q: "How does PropertyPointers verify listings?", a: "We follow a quality-check process where marked listings are reviewed for accuracy of key details. Look for the 'Quality-checked' badge on listings that have been through this process. Not all listings are verified — we clearly mark which ones are." },
  { q: "Is PropertyPointers free to use for buyers?", a: "Yes, browsing properties, comparing developers, and using our tools and insights are completely free for property seekers. Some premium features may be available for enhanced discovery." },
  { q: "How is PropertyPointers different from other portals?", a: "PropertyPointers is an ecosystem, not just a listing portal. We bring together properties, developers, realty advisors, vendors, tools, and market insights — all in one platform for smarter property decisions." },
  { q: "Can developers list their projects here?", a: "Absolutely. Developers can create professional profiles, showcase projects with RERA details, receive buyer enquiries, and gain market visibility through our developer-focused features." },
  { q: "What is a Realty Advisor on PropertyPointers?", a: "Realty Advisors are real estate professionals who build their digital identity on our platform. They showcase local expertise, list properties, collect reviews, and receive direct buyer enquiries." },
  { q: "How can vendors join the platform?", a: "Vendors — including interior designers, architects, contractors, legal advisors, and marketing agencies — can list their services, showcase portfolios, and receive business enquiries from the real estate ecosystem." },
  { q: "Does PropertyPointers charge brokerage?", a: "PropertyPointers is a discovery and connection platform. We facilitate direct and advisor-assisted property discovery. Brokerage terms, if any, depend on the individual advisor or agent you choose to work with." },
  { q: "Are all listed projects RERA compliant?", a: "We display RERA details where available and encourage developers to share registration information. However, buyers should independently verify RERA status on the respective state RERA website before making decisions." },
];

function trackCTA(eventName: string) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, { event_category: "cta_click" });
  }
}

export default function HomePage() {
  const { selectedCity, isLoaded } = useCity();
  const [featured, setFeatured] = useState<PropertyType[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [stats, setStats] = useState({ properties: 0, users: 0, cities: 7 });
  const [loading, setLoading] = useState(true);
  const [faqOpen, setFaqOpen] = useState(0);
  const [featuredTab, setFeaturedTab] = useState("all");
  const [blogTab, setBlogTab] = useState("all");

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = PAGE_META.title;
      const setMeta = (selector: string, attr: string, content: string) => {
        let el = document.querySelector(selector);
        if (!el) {
          el = document.createElement("meta");
          const [a, v] = attr.split("=");
          el.setAttribute(a, v);
          document.head.appendChild(el);
        }
        el.setAttribute("content", content);
      };
      setMeta('meta[name="description"]', 'name=description', PAGE_META.description);
      setMeta('meta[name="keywords"]', 'name=keywords', PAGE_META.keywords);
      setMeta('meta[property="og:title"]', 'property=og:title', PAGE_META.ogTitle);
      setMeta('meta[property="og:description"]', 'property=og:description', PAGE_META.ogDescription);
      setMeta('meta[property="og:image"]', 'property=og:image', PAGE_META.ogImage);
    }
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("featured", "true");
      params.set("limit", "8");
      if (selectedCity) params.set("city", selectedCity.name);

      const [propRes, blogRes] = await Promise.all([
        fetch(`/api/properties?${params.toString()}`),
        fetch("/api/blog?limit=6"),
      ]);
      const propData = await propRes.json();
      const blogData = await blogRes.json();
      setFeatured(propData.properties || []);
      setBlogPosts(blogData.posts || []);
      setStats((prev) => ({ ...prev, properties: propData.total || prev.properties }));
    } catch {
      setFeatured([]);
    }
    setLoading(false);
  }, [selectedCity]);

  useEffect(() => {
    if (isLoaded) fetchData();
  }, [isLoaded, fetchData]);

  const cityLabel = selectedCity?.name || "India";
  const displayCities = selectedCity
    ? SERVICE_CITIES.filter((c) => c.name !== selectedCity.name)
    : SERVICE_CITIES;

  const filteredFeatured = featuredTab === "all"
    ? featured
    : featured.filter((p) => {
        if (featuredTab === "residential") return ["apartment", "house", "villa", "studio"].includes(p.category);
        if (featuredTab === "commercial") return ["office", "shop"].includes(p.category);
        if (featuredTab === "new-launch") return true;
        if (featuredTab === "investment") return p.type === "sale";
        return true;
      });

  const blogCategories = ["all", "market-trends", "locality-guides", "rera-legal", "developer-growth", "advisor-growth", "vendor-opportunities"];
  const blogCategoryLabels: Record<string, string> = {
    all: "All", "market-trends": "Market Trends", "locality-guides": "Locality Guides",
    "rera-legal": "RERA & Legal", "developer-growth": "Developer Growth",
    "advisor-growth": "Advisor Growth", "vendor-opportunities": "Vendor Opportunities",
  };
  const filteredBlogs = blogTab === "all" ? blogPosts : blogPosts.filter((p) => p.category === blogTab);

  return (
    <>
      {/* ============================================================
          SECTION 1 — Hero: Beyond Listings
          ============================================================ */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-b from-cream-100 via-white to-warm-100 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold-300/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-200/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-warm-200/40 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gold-100 border border-gold-200 px-4 py-2 rounded-full mb-6 shadow-sm">
              <Zap size={16} className="text-gold-600" />
              <span className="text-gold-700 text-sm font-medium">
                {selectedCity
                  ? `Exploring properties in ${selectedCity.name}`
                  : "India's Complete Real Estate Ecosystem"}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-800 mb-6 leading-tight">
              Beyond Listings.<br />
              <span className="text-gradient">India&apos;s Complete</span>{" "}
              {selectedCity ? (
                <>Real Estate in <span className="text-gold-600">{selectedCity.name}</span></>
              ) : (
                "Real Estate Ecosystem."
              )}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              {selectedCity
                ? `Discover properties, compare developers, connect with realty advisors, and explore trusted vendors in ${selectedCity.name}.`
                : "Discover properties, compare developers, connect with realty advisors, explore trusted real estate vendors, and make smarter property decisions with insights and tools."}
            </p>
          </div>

          <SearchBar className="max-w-4xl mx-auto" />

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {[
              { label: "Explore Properties", href: "/properties", event: "explore_properties_click" },
              { label: "List Your Project", href: "/developers/join", event: "list_project_click" },
              { label: "Join as Realty Advisor", href: "/realty-advisors/join", event: "join_advisor_click" },
              { label: "List Your Service", href: "/vendors/join", event: "list_service_click" },
            ].map((cta) => (
              <Link key={cta.label} href={cta.href} onClick={() => trackCTA(cta.event)}
                className="text-sm font-medium px-4 py-2 rounded-full border border-gray-200 bg-white/80 text-navy-700 hover:bg-gold-50 hover:border-gold-300 hover:text-gold-700 transition-all shadow-sm">
                {cta.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2 — Trust Strip
          ============================================================ */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { icon: BadgeCheck, text: "Quality-Checked Listings Where Marked" },
              { icon: FileText, text: "RERA Details Where Available" },
              { icon: UserCheck, text: "Advisor-Assisted Discovery" },
              { icon: Shield, text: "Buyer Due Diligence Guidance" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm text-gray-600">
                <item.icon size={18} className="text-gold-500 shrink-0" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3 — Stats (safe, real metrics)
          ============================================================ */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { value: stats.properties ? new Intl.NumberFormat("en-IN").format(stats.properties) + "+" : "Growing", label: "Listed Properties" },
              { value: `${stats.cities}`, label: "Cities Served" },
              { value: "Active", label: "Developer Profiles" },
              { value: "Open", label: "Advisor Network" },
            ].map((stat) => (
              <div key={stat.label} className="text-center px-6">
                <p className="text-2xl md:text-3xl font-bold text-gold-600 tabular-nums">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4 — Explore Real Estate Opportunities (Categories)
          ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">Explore by Category</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">
              {selectedCity ? `Real Estate in ${selectedCity.name}` : "Explore Real Estate Opportunities"}
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Find the right property type for your needs — from residential homes to commercial investments
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((cat) => {
              const href = selectedCity ? `${cat.href}&city=${selectedCity.name}` : cat.href;
              return (
                <Link key={cat.label} href={href}
                  className="group p-5 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-xl transition-all duration-300 text-center">
                  <div className={`w-14 h-14 ${cat.color} bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <cat.icon size={24} className={cat.color.replace("bg-", "text-")} />
                  </div>
                  <h3 className="font-semibold text-navy-800 text-sm">{cat.label}</h3>
                  <p className="text-xs text-gray-400 mt-1">{cat.tagline}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5 — Featured Property Opportunities
          ============================================================ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">
                {selectedCity ? `Top in ${selectedCity.name}` : "Handpicked for You"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">
                Featured Property Opportunities
              </h2>
            </div>
            <Link
              href={selectedCity ? `/properties?featured=true&city=${selectedCity.name}` : "/properties?featured=true"}
              className="hidden md:flex items-center gap-1 text-gold-500 hover:text-gold-600 font-semibold mt-4 md:mt-0"
            >
              View All <ArrowRight size={18} />
            </Link>
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { key: "all", label: "All" },
              { key: "residential", label: "Residential" },
              { key: "commercial", label: "Commercial" },
              { key: "new-launch", label: "New Launch" },
              { key: "investment", label: "Investment" },
            ].map((tab) => (
              <button key={tab.key} onClick={() => setFeaturedTab(tab.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  featuredTab === tab.key
                    ? "bg-gold-500 text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gold-300"
                }`}>
                {tab.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                  <div className="h-52 bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-6 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredFeatured.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredFeatured.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Building2 size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {selectedCity ? `No featured properties in ${selectedCity.name} yet` : "No featured properties yet"}
              </h3>
              <p className="text-gray-500 mb-4">Check back soon or browse all listings</p>
              <Link href="/properties" className="btn-primary inline-flex items-center gap-2">
                Browse All Properties <ArrowRight size={18} />
              </Link>
            </div>
          )}

          <div className="md:hidden text-center mt-8">
            <Link href="/properties?featured=true" className="btn-primary inline-flex items-center gap-2">
              View All Properties <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 6 — Explore Properties by City
          ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">Explore by City</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">
              {selectedCity ? "Explore Other Cities" : "Explore Properties by City"}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayCities.map((city) => (
              <Link key={city.name} href={`/properties?city=${city.name}`}
                className="group rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="relative h-36 overflow-hidden">
                  <img src={city.img} alt={`Properties in ${city.name}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <h3 className="text-white font-bold text-lg">{city.name}</h3>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-500">{city.types} &middot; From {city.budget}</p>
                  <p className="text-xs text-gray-400 mt-1">Top areas: {city.localities}</p>
                  <span className="inline-flex items-center gap-1 text-gold-600 text-xs font-semibold mt-2 group-hover:gap-1.5 transition-all">
                    Explore City <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 7 — Popular Localities to Explore
          ============================================================ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">Popular Areas</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">Popular Localities to Explore</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {POPULAR_LOCALITIES.map((loc) => (
              <Link key={loc.name} href={loc.href}
                className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-sm font-medium text-navy-700 hover:bg-gold-50 hover:border-gold-300 hover:text-gold-700 transition-all shadow-sm">
                <MapPin size={14} className="inline mr-1.5 text-gold-500" />
                {loc.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 8 — For Developers & Builders
          ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">For Developers & Builders</span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2 mb-4">
                Build Your Project Visibility
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Build your project visibility beyond normal listing portals. PropertyPointers helps developers create a professional digital presence with developer profiles, project pages, RERA information, location highlights, buyer enquiry forms and market visibility.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {["Developer Profiles", "Project Microsites", "RERA Information", "Buyer Enquiry Forms", "Location Highlights", "Market Visibility"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle size={16} className="text-gold-500 shrink-0" /> {item}
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Link href="/developers/join" onClick={() => trackCTA("list_project_click")} className="btn-primary inline-flex items-center gap-2">
                  List Your Project <ArrowRight size={18} />
                </Link>
                <Link href="/developers" className="px-6 py-3 rounded-lg border border-gray-200 text-navy-800 font-semibold hover:bg-gray-50 transition-all">
                  Browse Developers
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Building2, title: "Project Pages", desc: "Showcase your projects professionally" },
                { icon: FileText, title: "RERA Details", desc: "Display compliance information" },
                { icon: Users, title: "Lead Generation", desc: "Receive qualified buyer enquiries" },
                { icon: BarChart3, title: "Market Insights", desc: "Track project performance" },
              ].map((card) => (
                <div key={card.title} className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                  <card.icon size={24} className="text-gold-500 mb-3" />
                  <h4 className="font-semibold text-navy-800 text-sm">{card.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 9 — Join as a Realty Advisor
          ============================================================ */}
      <section className="py-20 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              {[
                { icon: UserCheck, title: "Professional Profile", desc: "Build your digital identity" },
                { icon: MapPin, title: "Local Expertise", desc: "Showcase your area knowledge" },
                { icon: MessagesSquare, title: "Direct Enquiries", desc: "Receive buyer leads" },
                { icon: Star, title: "Collect Reviews", desc: "Build credibility over time" },
              ].map((card) => (
                <div key={card.title} className="p-5 rounded-2xl bg-white/10 border border-white/10">
                  <card.icon size={24} className="text-gold-400 mb-3" />
                  <h4 className="font-semibold text-sm">{card.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">{card.desc}</p>
                </div>
              ))}
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">For Realty Advisors</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                Build Your Digital Identity
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Build your digital identity as a trusted real estate professional. Create your advisor profile, showcase local expertise, list properties, collect reviews and receive direct buyer enquiries.
              </p>
              <div className="flex gap-3">
                <Link href="/realty-advisors/join" onClick={() => trackCTA("join_advisor_click")} className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-all">
                  Join Advisor Network <ArrowRight size={18} />
                </Link>
                <Link href="/realty-advisors" className="px-6 py-3 rounded-lg border border-white/20 text-white font-semibold hover:bg-white/10 transition-all">
                  Browse Advisors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 10 — Real Estate Vendor Marketplace
          ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">Vendor Marketplace</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">Real Estate Vendor Marketplace</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              Get discovered by property buyers, developers, owners and advisors. List your service, showcase your portfolio and receive relevant business enquiries from the real estate ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Home, label: "Interior Designers", href: "/vendors/marketing-visibility" },
              { icon: Compass, label: "Architects", href: "/vendors/project-development-design" },
              { icon: Wrench, label: "Contractors", href: "/vendors/project-support-services" },
              { icon: Scale, label: "Property Lawyers", href: "/vendors/legal-professional" },
              { icon: TrendingUp, label: "Marketing Agencies", href: "/vendors/marketing-visibility" },
              { icon: Eye, label: "Photographers", href: "/vendors/marketing-visibility" },
            ].map((vendor) => (
              <Link key={vendor.label} href={vendor.href}
                className="group p-5 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-lg transition-all text-center">
                <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <vendor.icon size={22} className="text-gold-600" />
                </div>
                <h3 className="font-semibold text-navy-800 text-sm">{vendor.label}</h3>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/vendors/join" onClick={() => trackCTA("list_service_click")} className="btn-primary inline-flex items-center gap-2">
              List Your Service <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 11 — Smart Tools for Better Property Decisions
          ============================================================ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">Property Tools</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">Smart Tools for Better Property Decisions</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Calculate EMIs, estimate costs, compare options, and make data-driven property decisions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROPERTY_TOOLS.map((tool) => (
              <Link key={tool.title} href={tool.href}
                className="group flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-100 hover:border-gold-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-gold-200 transition-colors">
                  <tool.icon size={22} className="text-gold-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-800 group-hover:text-gold-600 transition-colors">{tool.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 12 — Latest Real Estate Insights (Blog)
          ============================================================ */}
      {blogPosts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
              <div>
                <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">From Our Blog</span>
                <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">
                  Latest Real Estate Insights
                </h2>
                <p className="text-gray-500 mt-3 max-w-xl">
                  Expert tips, market trends, and guides to help you make smarter property decisions.
                </p>
              </div>
              <div className="flex gap-3 mt-4 md:mt-0">
                <Link href="/blog" className="hidden md:flex items-center gap-1 text-gold-500 hover:text-gold-600 font-semibold text-sm">
                  View All Articles <ArrowRight size={16} />
                </Link>
                <Link href="/insights/market-trends" className="hidden md:flex items-center gap-1 bg-navy-800 hover:bg-navy-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-all">
                  <BarChart3 size={16} /> Download Market Report
                </Link>
              </div>
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {blogCategories.map((cat) => (
                <button key={cat} onClick={() => setBlogTab(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    blogTab === cat
                      ? "bg-gold-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}>
                  {blogCategoryLabels[cat]}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(filteredBlogs.length > 0 ? filteredBlogs : blogPosts).slice(0, 6).map((post) => {
                const readTime = Math.max(1, Math.ceil((post.content || "").split(/\s+/).length / 200));
                return (
                  <Link key={post.id} href={`/blog/${post.slug}`}
                    className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
                    <div className="h-48 bg-gray-200 overflow-hidden relative">
                      {post.coverImage ? (
                        <img src={post.coverImage} alt={post.title} loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-100 to-navy-200">
                          <BookOpen size={40} className="text-navy-400" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-gold-500 text-white text-xs font-bold rounded-lg capitalize">
                          {(post.category || "general").replace("-", " ")}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                        <span className="flex items-center gap-1"><Clock size={12} /> {readTime} min read</span>
                        {post.author && <span>{post.author.name}</span>}
                      </div>
                      <h3 className="font-bold text-navy-800 text-lg mb-2 group-hover:text-gold-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                      <span className="inline-flex items-center gap-1 text-gold-500 text-sm font-semibold mt-4 group-hover:gap-2 transition-all">
                        Read More <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="md:hidden text-center mt-8">
              <Link href="/blog" className="btn-primary inline-flex items-center gap-2">
                View All Articles <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION 13 — PropertyPointers Market Reports
          ============================================================ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">Market Intelligence</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">PropertyPointers Market Reports</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Noida Real Estate Report", desc: "Sector-wise pricing, inventory trends, and investment hotspots", href: "/insights/market-trends" },
              { title: "Gurugram Commercial Report", desc: "Office space trends, rental yields, and corporate hub analysis", href: "/insights/market-trends" },
              { title: "Delhi NCR Rental Yield", desc: "Comparative rental yields across micro-markets", href: "/insights/market-trends" },
              { title: "Top Developers Report", desc: "Builder ratings, project delivery, and trust scores", href: "/developers" },
              { title: "Top Advisors Report", desc: "Leading realty advisors by city and specialisation", href: "/realty-advisors" },
              { title: "Vendor Ecosystem Report", desc: "Service categories, coverage areas, and demand trends", href: "/vendors" },
            ].map((report) => (
              <Link key={report.title} href={report.href}
                className="group p-6 rounded-2xl bg-white border border-gray-100 hover:border-gold-200 hover:shadow-lg transition-all">
                <BarChart3 size={24} className="text-gold-500 mb-3" />
                <h3 className="font-semibold text-navy-800 group-hover:text-gold-600 transition-colors">{report.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{report.desc}</p>
                <span className="inline-flex items-center gap-1 text-gold-500 text-sm font-semibold mt-3 group-hover:gap-2 transition-all">
                  View Report <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 14 — Why PropertyPointers
          ============================================================ */}
      <section className="py-20 bg-gradient-to-br from-warm-100 via-cream-100 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Why PropertyPointers</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mt-2">
              India&apos;s Complete Real Estate Ecosystem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Layers, title: "Beyond Listings", desc: "Not just a portal — a complete ecosystem for properties, developers, advisors, and vendors", href: "/about" },
              { icon: Eye, title: "Transparent Discovery", desc: "Quality-checked listings, clear pricing, and honest information for better decisions", href: "/trust-and-safety" },
              { icon: Building2, title: "Developer Profiles", desc: "Compare builders, review projects, and access RERA details in one place", href: "/developers" },
              { icon: Network, title: "Realty Advisor Network", desc: "Connect with trusted local advisors who know your area inside out", href: "/realty-advisors" },
              { icon: Store, title: "Vendor Marketplace", desc: "Find interior designers, architects, lawyers, and more for your property journey", href: "/vendors" },
              { icon: Calculator, title: "Smart Tools", desc: "EMI, ROI, rental yield calculators and cost estimators for informed decisions", href: "/calculator" },
              { icon: TrendingUp, title: "Market Insights", desc: "Data-driven reports, price trends, and locality analysis", href: "/blog" },
              { icon: Compass, title: "Assisted Journey", desc: "From search to possession — guidance and support through every step", href: "/about" },
            ].map((feature) => (
              <Link key={feature.title} href={feature.href} className="text-center group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all shadow-sm border border-gray-100">
                  <feature.icon size={28} className="text-gold-500" />
                </div>
                <h3 className="text-navy-800 font-semibold text-lg mb-2 group-hover:text-gold-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 15 — How PropertyPointers Works
          ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">How PropertyPointers Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Search, title: "For Buyers", steps: ["Search properties by city, type, budget", "Compare options with tools & insights", "Connect with owners or advisors", "Make informed decisions"], color: "bg-blue-50 text-blue-600" },
              { icon: Building2, title: "For Developers", steps: ["Create your developer profile", "List projects with RERA details", "Receive qualified buyer enquiries", "Track performance & visibility"], color: "bg-green-50 text-green-600" },
              { icon: UserCheck, title: "For Advisors", steps: ["Build your professional profile", "Showcase local expertise", "List properties & collect reviews", "Get direct buyer connections"], color: "bg-purple-50 text-purple-600" },
              { icon: Wrench, title: "For Vendors", steps: ["List your service category", "Showcase your portfolio", "Reach the real estate ecosystem", "Receive business enquiries"], color: "bg-orange-50 text-orange-600" },
            ].map((journey) => (
              <div key={journey.title} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${journey.color}`}>
                  <journey.icon size={22} />
                </div>
                <h3 className="font-bold text-navy-800 text-lg mb-4">{journey.title}</h3>
                <ol className="space-y-2.5">
                  {journey.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <span className="w-5 h-5 rounded-full bg-gold-100 text-gold-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 16 — What Are You Looking For? (Lead Capture)
          ============================================================ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-800">What Are You Looking For?</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              PropertyPointers serves buyers, developers, advisors, and vendors. Choose your path.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Search, title: "I want to buy/rent property", desc: "Search, compare, and find your ideal property", cta: "Share Requirement", href: "/properties", color: "bg-blue-50 border-blue-100", event: "explore_properties_click" },
              { icon: Building2, title: "I am a developer/builder", desc: "List projects, reach buyers, grow visibility", cta: "List Project", href: "/developers/join", color: "bg-green-50 border-green-100", event: "list_project_click" },
              { icon: UserCheck, title: "I am a realty advisor", desc: "Build profile, showcase expertise, get leads", cta: "Join Advisor Network", href: "/realty-advisors/join", color: "bg-purple-50 border-purple-100", event: "join_advisor_click" },
              { icon: Wrench, title: "I am a vendor/service provider", desc: "List services, showcase portfolio, get enquiries", cta: "List Service", href: "/vendors/join", color: "bg-orange-50 border-orange-100", event: "list_service_click" },
            ].map((card) => (
              <div key={card.title} className={`p-6 rounded-2xl border ${card.color} text-center`}>
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <card.icon size={24} className="text-gold-500" />
                </div>
                <h3 className="font-bold text-navy-800 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{card.desc}</p>
                <Link href={card.href} onClick={() => trackCTA(card.event)}
                  className="inline-flex items-center gap-1 bg-gold-500 hover:bg-gold-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-all text-sm">
                  {card.cta} <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-gradient-to-r from-navy-800 via-navy-900 to-navy-950 rounded-2xl p-6 md:p-8 text-center text-white">
            <Sparkles size={24} className="text-gold-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">Early Partner Program</h3>
            <p className="text-gray-300 text-sm max-w-2xl mx-auto mb-4">
              Join early. Get priority visibility before the platform becomes crowded. Limited city-wise and category-wise onboarding is open for developers, realty advisors and vendors.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/developers/join" className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-5 py-2.5 rounded-lg text-sm transition-all">
                For Developers
              </Link>
              <Link href="/realty-advisors/join" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 rounded-lg text-sm border border-white/20 transition-all">
                For Advisors
              </Link>
              <Link href="/vendors/join" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 rounded-lg text-sm border border-white/20 transition-all">
                For Vendors
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 17 — Early User Feedback (Testimonials)
          ============================================================ */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Early User Feedback</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mt-2">What Our Users Say</h2>
            <p className="text-sm text-gray-500 mt-2">Feedback reflects individual experiences and may vary.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "R.S.", type: "Buyer", location: "Noida", date: "March 2026", text: "The platform made it easy to compare options across different localities. The tools and insights helped me understand pricing better before making a decision." },
              { name: "P.P.", type: "Property Owner", location: "Gurugram", date: "February 2026", text: "Listed my property and started receiving genuine enquiries. The platform is straightforward and easy to navigate for property owners." },
              { name: "A.K.", type: "Buyer", location: "Jaipur", date: "January 2026", text: "The EMI calculator and market insights were very useful. Having property details, RERA information, and tools in one place simplified my research." },
            ].map((review) => (
              <div key={review.name + review.location} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-gold-100 text-gold-700 text-xs font-medium">{review.type}</span>
                  <span className="text-xs text-gray-400">{review.location} &middot; {review.date}</span>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-white font-bold text-sm">
                    {review.name}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin size={12} /> {review.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 18 — Frequently Asked Questions
          ============================================================ */}
      <section className="py-20 bg-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }) }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = faqOpen === idx;
              return (
                <div key={item.q} className="rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
                  <button onClick={() => setFaqOpen(isOpen ? -1 : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-3">
                    <span className="font-semibold text-navy-900 text-sm">{item.q}</span>
                    <ChevronDown size={18} className={`text-gray-500 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-sm text-gray-600 border-t border-gray-100 pt-3 leading-relaxed">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 19 — Newsletter: Get Weekly Property Insights
          ============================================================ */}
      <section className="py-16 bg-gradient-to-br from-gold-50 via-warm-100 to-cream-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-800 mb-3">Get Weekly Property Insights</h2>
          <p className="text-gray-600 mb-8">
            Market trends, new launches, investment tips, and ecosystem updates — delivered to your inbox.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: formData.get("name"),
                  email: formData.get("email"),
                  city: formData.get("city"),
                  userType: formData.get("userType"),
                }),
              }).then(() => {
                form.reset();
                alert("Thank you for subscribing!");
              }).catch(() => {});
            }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center"
          >
            <input type="text" name="name" placeholder="Your Name" required
              className="px-4 py-3 rounded-lg border border-gray-200 text-sm w-full sm:w-44 outline-none focus:ring-2 focus:ring-gold-400" />
            <input type="email" name="email" placeholder="Email Address" required
              className="px-4 py-3 rounded-lg border border-gray-200 text-sm w-full sm:w-52 outline-none focus:ring-2 focus:ring-gold-400" />
            <select name="city" className="px-4 py-3 rounded-lg border border-gray-200 text-sm w-full sm:w-40 outline-none focus:ring-2 focus:ring-gold-400 text-gray-700">
              <option value="">City Interest</option>
              {SERVICE_CITIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
            <select name="userType" className="px-4 py-3 rounded-lg border border-gray-200 text-sm w-full sm:w-40 outline-none focus:ring-2 focus:ring-gold-400 text-gray-700">
              <option value="">I am a...</option>
              <option value="buyer">Buyer</option>
              <option value="owner">Property Owner</option>
              <option value="developer">Developer</option>
              <option value="advisor">Realty Advisor</option>
              <option value="vendor">Vendor</option>
            </select>
            <button type="submit"
              className="bg-gold-500 hover:bg-gold-600 text-white font-bold px-8 py-3 rounded-lg transition-all text-sm w-full sm:w-auto">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
