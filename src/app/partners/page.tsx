"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Building2, MapPin, Search, ShieldCheck, Users, ArrowRight,
  Star, TrendingUp, Handshake, CheckCircle, Award,
  ChevronRight, Phone, Sparkles, Target, Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";
import { MotionCard, MotionGrid, MotionSection } from "@/components/MarketingMotion";
import FAQAccordion from "@/components/FAQAccordion";

type Partner = {
  name: string;
  city: string;
  category: string;
  verified: boolean;
  projects: number;
  specialization: string;
  experience: string;
  rating: number;
};

const PARTNERS: Partner[] = [
  { name: "BlueStone Advisory", city: "Delhi", category: "Channel Partner", verified: true, projects: 24, specialization: "Premium Residential", experience: "8+ years", rating: 4.7 },
  { name: "Noida Home Connect", city: "Noida", category: "Resale Specialist", verified: true, projects: 18, specialization: "Resale & Secondary Market", experience: "6+ years", rating: 4.5 },
  { name: "Prime Build Associates", city: "Gurugram", category: "Project Sales", verified: false, projects: 12, specialization: "New Launch Projects", experience: "5+ years", rating: 4.2 },
  { name: "NCR Key Partners", city: "Ghaziabad", category: "Rental Services", verified: true, projects: 15, specialization: "Lease & Rental Management", experience: "7+ years", rating: 4.4 },
  { name: "Jaipur Property Circle", city: "Jaipur", category: "Land Consultant", verified: false, projects: 9, specialization: "Plot & Land Deals", experience: "4+ years", rating: 4.0 },
  { name: "Pune Realty Link", city: "Pune", category: "Project Sales", verified: true, projects: 11, specialization: "IT Corridor Properties", experience: "5+ years", rating: 4.3 },
  { name: "Metro Estates Group", city: "Delhi", category: "Channel Partner", verified: true, projects: 30, specialization: "Luxury & Ultra-Luxury", experience: "12+ years", rating: 4.8 },
  { name: "GreenValley Advisors", city: "Noida", category: "Investment Advisory", verified: true, projects: 22, specialization: "NRI Investment", experience: "10+ years", rating: 4.6 },
  { name: "RealtyMax Solutions", city: "Gurugram", category: "Project Sales", verified: true, projects: 16, specialization: "Commercial Properties", experience: "8+ years", rating: 4.5 },
];

export default function PartnersPage() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("all");
  const [category, setCategory] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const cities = useMemo(() => ["all", ...Array.from(new Set(PARTNERS.map((p) => p.city)))], []);
  const categories = useMemo(() => ["all", ...Array.from(new Set(PARTNERS.map((p) => p.category)))], []);

  const filtered = useMemo(
    () =>
      PARTNERS.filter((p) => {
        const matchQuery = !query || p.name.toLowerCase().includes(query.toLowerCase());
        const matchCity = city === "all" || p.city === city;
        const matchCategory = category === "all" || p.category === category;
        const matchVerified = !verifiedOnly || p.verified;
        return matchQuery && matchCity && matchCategory && matchVerified;
      }),
    [query, city, category, verifiedOnly]
  );

  const totalProjects = PARTNERS.reduce((s, p) => s + p.projects, 0);
  const verifiedCount = PARTNERS.filter((p) => p.verified).length;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gold-500/15 blur-[120px] rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-500/8 blur-[120px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-32 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 px-4 py-2 rounded-full mb-6">
              <Handshake size={16} className="text-gold-400" />
              <span className="text-gold-400 text-sm font-medium">Partner Network</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Trusted Partner<br />
              <span className="text-gradient">Network</span>
            </h1>
            <p className="text-gray-300 mt-5 max-w-2xl mx-auto text-lg">
              Discover verified channel partners, advisors, and specialists across India. 
              Connect with the right expertise for your real estate journey.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {[
                { value: `${PARTNERS.length}+`, label: "Active Partners" },
                { value: `${verifiedCount}`, label: "Verified" },
                { value: `${totalProjects}+`, label: "Active Listings" },
                { value: `${cities.length - 1}+`, label: "Cities Covered" },
              ].map((s) => (
                <div key={s.label} className="text-center px-5">
                  <p className="text-2xl md:text-3xl font-bold text-gold-400">{s.value}</p>
                  <p className="text-sm text-gray-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/partners/join" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
                Join as Partner <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Why Partner */}
        <MotionSection>
          <div className="text-center mb-6">
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">Why Partner With Us</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mt-1">Benefits of Joining</h2>
          </div>
          <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { t: "Verified Leads", d: "Connect with genuine buyers and investors actively searching.", icon: <Target size={22} className="text-blue-600" />, color: "bg-blue-50" },
              { t: "Brand Visibility", d: "Get featured across our platform with premium partner badges.", icon: <Sparkles size={22} className="text-purple-600" />, color: "bg-purple-50" },
              { t: "Growth Support", d: "Access marketing tools, analytics, and CRM integrations.", icon: <TrendingUp size={22} className="text-emerald-600" />, color: "bg-emerald-50" },
              { t: "Trusted Network", d: "Join a curated community of top real estate professionals.", icon: <Award size={22} className="text-gold-600" />, color: "bg-gold-50" },
            ].map((x) => (
              <MotionCard key={x.t} className={`rounded-xl border border-gray-100 ${x.color} p-5`}>
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center">
                  {x.icon}
                </div>
                <p className="font-semibold text-navy-900 mt-3">{x.t}</p>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{x.d}</p>
              </MotionCard>
            ))}
          </MotionGrid>
        </MotionSection>

        {/* Filters */}
        <MotionSection className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-navy-900">Browse Partners</h2>
            <span className="text-sm text-gray-500">{filtered.length} partners found</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search partner..."
                className="input-field pl-9"
              />
            </label>
            <select value={city} onChange={(e) => setCity(e.target.value)} className="input-field">
              {cities.map((option) => (
                <option key={option} value={option}>
                  {option === "all" ? "All Cities" : option}
                </option>
              ))}
            </select>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-field">
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option === "all" ? "All Categories" : option}
                </option>
              ))}
            </select>
            <label className="flex items-center gap-2 text-sm text-gray-700 border border-gray-200 rounded-lg px-4 py-3 bg-white cursor-pointer hover:bg-gray-50 transition-colors">
              <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} className="rounded" />
              Verified only
            </label>
          </div>
        </MotionSection>

        {/* Partner Cards */}
        {filtered.length === 0 ? (
          <div className="card p-12 text-center">
            <Users size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-lg font-semibold text-navy-900">No partners found</p>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your filters.</p>
          </div>
        ) : (
          <MotionGrid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((partner) => (
              <MotionCard key={partner.name}>
                <div className="bg-white rounded-xl border border-gray-100 hover:border-gold-200 hover:shadow-lg transition-all overflow-hidden group">
                  <div className="h-1.5 bg-gradient-to-r from-gold-400 via-gold-500 to-navy-800" />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-xl bg-navy-50 border border-navy-100 flex items-center justify-center shrink-0">
                          <Briefcase size={20} className="text-navy-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-navy-900">{partner.name}</h3>
                            {partner.verified && <ShieldCheck size={14} className="text-emerald-500 shrink-0" />}
                          </div>
                          <p className="text-sm text-gold-600 font-medium mt-0.5">{partner.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 shrink-0">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        <span className="text-sm font-bold text-navy-900">{partner.rating}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mt-3">{partner.specialization}</p>

                    <div className="grid grid-cols-3 gap-2 mt-4 text-center text-xs">
                      <div className="rounded-lg bg-gray-50 border border-gray-100 py-2">
                        <p className="font-bold text-navy-900">{partner.projects}</p>
                        <p className="text-gray-500">Projects</p>
                      </div>
                      <div className="rounded-lg bg-gray-50 border border-gray-100 py-2">
                        <p className="font-bold text-navy-900">{partner.experience}</p>
                        <p className="text-gray-500">Experience</p>
                      </div>
                      <div className="rounded-lg bg-gray-50 border border-gray-100 py-2">
                        <p className="font-bold text-navy-900 flex items-center justify-center gap-0.5">
                          <MapPin size={10} className="text-gold-500" /> {partner.city}
                        </p>
                        <p className="text-gray-500">City</p>
                      </div>
                    </div>

                    {partner.verified && (
                      <div className="flex items-center gap-1.5 mt-3 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg">
                        <CheckCircle size={12} />
                        Verified Partner - Background checked and approved
                      </div>
                    )}

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <Link
                        href="/partners/join"
                        className="text-sm font-semibold text-gold-600 hover:text-gold-700 flex items-center gap-1"
                      >
                        Connect Now <ChevronRight size={14} />
                      </Link>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Phone size={10} /> Quick Response
                      </span>
                    </div>
                  </div>
                </div>
              </MotionCard>
            ))}
          </MotionGrid>
        )}

        {/* How It Works */}
        <MotionSection className="rounded-2xl gradient-navy text-white p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-gold-500/10 blur-[80px] rounded-full" />
          <div className="relative">
            <div className="text-center mb-8">
              <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">Partner Journey</span>
              <h3 className="text-2xl sm:text-3xl font-bold mt-2">How Partnering Works</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Apply", desc: "Submit your profile and expertise details through our simple form." },
                { step: "02", title: "Verification", desc: "Our team reviews your credentials and verifies your track record." },
                { step: "03", title: "Onboarding", desc: "Get access to leads, CRM tools, and marketing resources." },
                { step: "04", title: "Grow", desc: "Start receiving qualified leads and grow your business with us." },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gold-500/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-gold-400 font-bold text-xl">{s.step}</span>
                  </div>
                  <h4 className="font-bold text-lg">{s.title}</h4>
                  <p className="text-sm text-gray-400 mt-2 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/partners/join" className="btn-primary inline-flex items-center gap-2">
                Join Now <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </MotionSection>

        {/* CTA Banner */}
        <MotionSection className="bg-gradient-to-r from-gold-500 to-gold-600 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">Are you a real estate professional?</h3>
            <p className="text-gold-100 mt-1 max-w-lg">
              Join our partner network and connect with verified buyers and developers. Free to apply.
            </p>
          </div>
          <Link href="/partners/join" className="bg-white text-gold-700 hover:bg-gray-50 font-semibold px-6 py-3 rounded-lg transition-all shadow-md inline-flex items-center gap-2 whitespace-nowrap">
            Apply Now <ArrowRight size={16} />
          </Link>
        </MotionSection>

        <FAQAccordion
          title="Partner Network FAQ"
          items={[
            {
              question: "Who can become a partner?",
              answer: "Real estate agents, channel partners, brokers, advisors, and any licensed real estate professional can apply.",
            },
            {
              question: "Is there a fee to join?",
              answer: "No. Joining the partner network is free. Premium features and lead packages are available for verified partners.",
            },
            {
              question: "How does verification work?",
              answer: "Our team reviews your business credentials, RERA license (if applicable), track record, and references before granting verified status.",
            },
            {
              question: "What kind of leads will I receive?",
              answer: "You'll receive pre-qualified buyer and investor leads based on your city, specialization, and availability.",
            },
            {
              question: "Can I partner with multiple developers?",
              answer: "Yes. Our platform supports multi-developer partnerships, allowing you to diversify your project portfolio.",
            },
          ]}
        />
      </div>
    </main>
  );
}
