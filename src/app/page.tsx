import Link from "next/link";
import {
  Building2, Home, MapPin, TrendingUp, Shield, Users, Star, ArrowRight,
  Search, Landmark, Building, TreePine, Phone, CheckCircle, Zap, Globe, Calculator
} from "lucide-react";
import SearchBar from "@/components/SearchBar";
import prisma from "@/lib/prisma";
import PropertyCard from "@/components/PropertyCard";

export const dynamic = "force-dynamic";

async function getFeaturedProperties() {
  try {
    return await prisma.property.findMany({
      where: { status: "active", featured: true },
      include: { owner: { select: { id: true, name: true, email: true, phone: true, role: true, avatar: true } } },
      orderBy: { createdAt: "desc" },
      take: 8,
    });
  } catch {
    return [];
  }
}

async function getStats() {
  try {
    const [properties, users, cities] = await Promise.all([
      prisma.property.count({ where: { status: "active" } }),
      prisma.user.count(),
      prisma.property.groupBy({ by: ["city"], _count: true }),
    ]);
    return { properties, users, cities: cities.length };
  } catch {
    return { properties: 0, users: 0, cities: 0 };
  }
}

export default async function HomePage() {
  const [featured, stats] = await Promise.all([getFeaturedProperties(), getStats()]);

  const categories = [
    { icon: Building2, label: "Apartments", href: "/properties?category=apartment", color: "bg-blue-500", count: "2500+" },
    { icon: Home, label: "Houses", href: "/properties?category=house", color: "bg-green-500", count: "1200+" },
    { icon: Landmark, label: "Villas", href: "/properties?category=villa", color: "bg-purple-500", count: "800+" },
    { icon: TreePine, label: "Plots/Land", href: "/properties?category=plot", color: "bg-emerald-500", count: "950+" },
    { icon: Building, label: "Commercial", href: "/properties?category=commercial", color: "bg-orange-500", count: "650+" },
    { icon: Building2, label: "Office Space", href: "/properties?category=office", color: "bg-cyan-500", count: "420+" },
  ];

  const cities = [
    { name: "Noida", img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop", count: "3200+" },
    { name: "Delhi", img: "https://images.unsplash.com/photo-1597040663342-45b6ba68c88a?w=400&h=300&fit=crop", count: "5400+" },
    { name: "Gurgaon", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=300&fit=crop", count: "4100+" },
    { name: "Mumbai", img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=300&fit=crop", count: "6800+" },
    { name: "Bangalore", img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&h=300&fit=crop", count: "5200+" },
    { name: "Hyderabad", img: "https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?w=400&h=300&fit=crop", count: "3900+" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center gradient-navy overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 px-4 py-2 rounded-full mb-6">
              <Zap size={16} className="text-gold-400" />
              <span className="text-gold-400 text-sm font-medium">India&apos;s #1 Trusted Real Estate Platform</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Find Your Dream<br />
              <span className="text-gradient">Property</span> Today
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Discover verified properties across India. Buy, sell, or rent with zero brokerage.
              Trusted by 1M+ happy customers.
            </p>
          </div>

          <SearchBar className="max-w-4xl mx-auto" />

          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {[
              { value: `${stats.properties || "10,000"}+`, label: "Listed Properties" },
              { value: `${stats.users || "50,000"}+`, label: "Happy Customers" },
              { value: `${stats.cities || "50"}+`, label: "Cities Covered" },
              { value: "100%", label: "Verified Listings" },
            ].map((stat) => (
              <div key={stat.label} className="text-center px-6">
                <p className="text-2xl md:text-3xl font-bold text-gold-400">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
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
              Get Started with Exploring
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Browse through our diverse categories to find exactly what you&apos;re looking for
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link key={cat.label} href={cat.href}
                className="group p-6 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-xl transition-all duration-300 text-center">
                <div className={`w-14 h-14 ${cat.color} bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <cat.icon size={24} className={cat.color.replace("bg-", "text-")} />
                </div>
                <h3 className="font-semibold text-navy-800 text-sm">{cat.label}</h3>
                <p className="text-xs text-gray-400 mt-1">{cat.count} Properties</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      {featured.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">Handpicked for You</span>
                <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">Featured Properties</h2>
              </div>
              <Link href="/properties?featured=true" className="hidden md:flex items-center gap-1 text-gold-500 hover:text-gold-600 font-semibold">
                View All <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((property: any) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            <div className="md:hidden text-center mt-8">
              <Link href="/properties?featured=true" className="btn-primary inline-flex items-center gap-2">
                View All Properties <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Cities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">Popular Locations</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">Explore Top Cities</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cities.map((city) => (
              <Link key={city.name} href={`/properties?city=${city.name}`}
                className="group relative h-48 rounded-2xl overflow-hidden">
                <img src={city.img} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-bold text-lg">{city.name}</h3>
                  <p className="text-white/70 text-xs">{city.count} Properties</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 gradient-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">Why Property Pointers</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
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
                <div className="w-16 h-16 bg-gold-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-500/20 transition-colors">
                  <feature.icon size={28} className="text-gold-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to List Your Property?
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of property owners who trust Property Pointers. List your property for FREE and reach millions of potential buyers and tenants.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/post-property" className="btn-primary text-lg px-10 py-4 inline-flex items-center justify-center gap-2">
                  Post Property FREE <ArrowRight size={20} />
                </Link>
                <Link href="/properties" className="btn-outline text-lg px-10 py-4 inline-flex items-center justify-center gap-2 border-white/30 text-white hover:bg-white hover:text-navy-900">
                  Browse Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rahul Sharma", location: "Noida", text: "Found my dream apartment through Property Pointers. The verified listing feature gave me confidence, and I saved lakhs on brokerage!", rating: 5 },
              { name: "Priya Patel", location: "Mumbai", text: "Listed my property and got genuine inquiries within hours. The platform is incredibly easy to use. Highly recommended for property owners!", rating: 5 },
              { name: "Amit Kumar", location: "Bangalore", text: "The EMI calculator and market insights helped me make an informed decision. Best real estate platform I've used. Professional and trustworthy.", rating: 5 },
            ].map((review) => (
              <div key={review.name} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={18} className="text-gold-500 fill-gold-500" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-navy-800 flex items-center justify-center text-white font-bold">
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
