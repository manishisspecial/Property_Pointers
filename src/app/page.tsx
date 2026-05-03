"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Building2, Home, MapPin, TrendingUp, Shield, Users, Star, ArrowRight,
  Search, Landmark, TreePine, Phone, CheckCircle, Zap, Globe, Calculator,
  BookOpen, Clock, Briefcase, Store, LayoutGrid
} from "lucide-react";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import { useCity } from "@/context/CityContext";
import { PropertyType } from "@/types";

const SERVICE_CITIES = [
  { name: "Delhi", img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop" },
  { name: "Noida", img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop" },
  { name: "Greater Noida", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop" },
  { name: "Gurugram", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=300&fit=crop" },
  { name: "Ghaziabad", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop" },
  { name: "Jaipur", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&h=300&fit=crop" },
  { name: "Pune", img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=300&fit=crop" },
];

const categories = [
  { icon: Building2, label: "Apartments", href: "/properties?category=apartment", color: "bg-blue-500", count: "2500+" },
  { icon: Home, label: "Houses", href: "/properties?category=house", color: "bg-green-500", count: "1200+" },
  { icon: Landmark, label: "Villas", href: "/properties?category=villa", color: "bg-purple-500", count: "800+" },
  { icon: TreePine, label: "Plots/Land", href: "/properties?category=plot", color: "bg-emerald-500", count: "950+" },
  { icon: Briefcase, label: "Offices", href: "/properties?category=office", color: "bg-cyan-500", count: "420+" },
  { icon: Store, label: "Shops", href: "/properties?category=shop", color: "bg-orange-500", count: "380+" },
  { icon: LayoutGrid, label: "Studio Apartments", href: "/properties?category=studio", color: "bg-indigo-500", count: "290+" },
];

export default function HomePage() {
  const { selectedCity, isLoaded } = useCity();
  const [featured, setFeatured] = useState<PropertyType[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [stats, setStats] = useState({ properties: 0, users: 0, cities: 7 });
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("featured", "true");
      params.set("limit", "8");
      if (selectedCity) params.set("city", selectedCity.name);

      const [propRes, blogRes] = await Promise.all([
        fetch(`/api/properties?${params.toString()}`),
        fetch("/api/blog?limit=3"),
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

  return (
    <>
      {/* Hero Section */}
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
                  : "India's #1 Trusted Real Estate Platform"}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-800 mb-6 leading-tight">
              Find Your Dream<br />
              <span className="text-gradient">Property</span>{" "}
              {selectedCity ? (
                <>in <span className="text-gold-600">{selectedCity.name}</span></>
              ) : (
                "Today"
              )}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              {selectedCity
                ? `Discover verified properties in ${selectedCity.name}, ${selectedCity.state}. Buy, sell, or rent with zero brokerage.`
                : "Discover verified properties across Delhi NCR, Jaipur & Pune. Buy, sell, or rent with zero brokerage."}
            </p>
          </div>

          <SearchBar className="max-w-4xl mx-auto" />

          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {[
              {
                value: `${stats.properties ? new Intl.NumberFormat("en-IN").format(stats.properties) : "10,000"}+`,
                label: "Listed Properties",
              },
              { value: "1000+", label: "Happy Customers" },
              { value: `${stats.cities}`, label: "Cities Served" },
              { value: "100%", label: "Verified Listings" },
            ].map((stat) => (
              <div key={stat.label} className="text-center px-6 max-w-[11rem]">
                <div className="flex items-center justify-center gap-2 min-h-[2.25rem]">
                  <p className="text-2xl md:text-3xl font-bold text-gold-600 tabular-nums">{stat.value}</p>
                </div>
                <p className="text-sm text-gray-500 mt-1 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">Explore by Category</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">
              {selectedCity ? `Properties in ${selectedCity.name}` : "Get Started with Exploring"}
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Browse through our diverse categories to find exactly what you&apos;re looking for
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((cat) => {
              const href = selectedCity
                ? `${cat.href}&city=${selectedCity.name}`
                : cat.href;
              return (
                <Link key={cat.label} href={href}
                  className="group p-6 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-xl transition-all duration-300 text-center">
                  <div className={`w-14 h-14 ${cat.color} bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <cat.icon size={24} className={cat.color.replace("bg-", "text-")} />
                  </div>
                  <h3 className="font-semibold text-navy-800 text-sm">{cat.label}</h3>
                  <p className="text-xs text-gray-400 mt-1">{cat.count} Properties</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">
                {selectedCity ? `Top in ${selectedCity.name}` : "Handpicked for You"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">
                Featured Properties
              </h2>
            </div>
            <Link
              href={selectedCity ? `/properties?featured=true&city=${selectedCity.name}` : "/properties?featured=true"}
              className="hidden md:flex items-center gap-1 text-gold-500 hover:text-gold-600 font-semibold"
            >
              View All <ArrowRight size={18} />
            </Link>
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
          ) : featured.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((property) => (
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

      {/* Cities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">We Serve</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">
              {selectedCity ? "Explore Other Cities" : "Our Service Areas"}
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {displayCities.map((city) => (
              <Link key={city.name} href={`/properties?city=${city.name}`}
                className="group relative h-48 w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.75rem)] lg:w-[calc(14.285%-0.875rem)] min-w-[140px] rounded-2xl overflow-hidden">
                <img src={city.img} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-bold text-lg">{city.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-warm-100 via-cream-100 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Why Property Pointers</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mt-2">
              India&apos;s Most Trusted Platform
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "100% Verified", desc: "Every listing is verified by our team for authenticity and accuracy" },
              { icon: Users, title: "Zero Brokerage", desc: "Connect directly with property owners. No middlemen, no extra costs" },
              { icon: Globe, title: "Virtual Tours", desc: "Experience properties remotely with immersive 3D virtual tours" },
              { icon: TrendingUp, title: "Market Insights", desc: "Data-driven price trends and investment analysis for smarter decisions" },
              { icon: Calculator, title: "EMI Calculator", desc: "Plan your home loan with our easy-to-use financial tools" },
              { icon: Phone, title: "24/7 Support", desc: "Our expert team is always available to help you find your dream home" },
              { icon: CheckCircle, title: "RERA Compliant", desc: "All listed projects are verified for RERA registration compliance" },
              { icon: Star, title: "Top Rated", desc: "Rated 4.8/5 by over 1 million satisfied customers across India" },
            ].map((feature) => (
              <div key={feature.title} className="text-center group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all shadow-sm border border-gray-100">
                  <feature.icon size={28} className="text-gold-500" />
                </div>
                <h3 className="text-navy-800 font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gold-50 via-warm-100 to-cream-200 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden border border-gold-200/50">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-300/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-warm-300/30 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">
                Ready to List Your Property?
              </h2>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of property owners who trust Property Pointers. List your property for FREE and reach millions of potential buyers and tenants.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/post-property" className="btn-primary text-lg px-10 py-4 inline-flex items-center justify-center gap-2">
                  Post Property FREE <ArrowRight size={20} />
                </Link>
                <Link href="/properties" className="bg-navy-800 hover:bg-navy-700 text-white font-semibold text-lg px-10 py-4 rounded-lg inline-flex items-center justify-center gap-2 transition-all shadow-md">
                  Browse Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog / Insights */}
      {blogPosts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">From Our Blog</span>
                <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">
                  Latest Insights &amp; Guides
                </h2>
                <p className="text-gray-500 mt-3 max-w-xl">
                  Expert tips, market trends, and buying guides to help you make smarter property decisions.
                </p>
              </div>
              <Link
                href="/blog"
                className="hidden md:flex items-center gap-1 text-gold-500 hover:text-gold-600 font-semibold"
              >
                View All Articles <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map((post) => {
                const readTime = Math.max(1, Math.ceil((post.content || "").split(/\s+/).length / 200));
                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300"
                  >
                    <div className="h-48 bg-gray-200 overflow-hidden relative">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
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
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {readTime} min read
                        </span>
                      </div>
                      <h3 className="font-bold text-navy-800 text-lg mb-2 group-hover:text-gold-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
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

      {/* Testimonials */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mt-2">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rahul Sharma", location: "Noida", text: "Found my dream apartment through Property Pointers. The verified listing feature gave me confidence, and I saved lakhs on brokerage!", rating: 5 },
              { name: "Priya Patel", location: "Gurugram", text: "Listed my property and got genuine inquiries within hours. The platform is incredibly easy to use. Highly recommended for property owners!", rating: 5 },
              { name: "Amit Kumar", location: "Jaipur", text: "The EMI calculator and market insights helped me make an informed decision. Best real estate platform I've used. Professional and trustworthy.", rating: 5 },
            ].map((review) => (
              <div key={review.name} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={18} className="text-gold-500 fill-gold-500" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center text-white font-bold">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-navy-800">{review.name}</p>
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
    </>
  );
}
