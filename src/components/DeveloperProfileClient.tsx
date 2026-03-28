"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2, MapPin, Star, ShieldCheck, ArrowRight, Clock, Users,
  CheckCircle, TrendingUp, Phone, Award, ChevronRight, Eye,
  Landmark, Sparkles, BadgeCheck, FileCheck,
} from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import { MotionCard, MotionGrid, MotionSection } from "@/components/MarketingMotion";
import { motion } from "framer-motion";

type DeveloperProfile = {
  slug: string;
  name: string;
  logo?: string;
  establishedYear: number;
  cities: string[];
  states: string[];
  delivered: number;
  ongoing: number;
  upcoming: number;
  totalProjects: number;
  totalUnits: number;
  reraProjects: number;
  verifiedProjects: number;
  featuredProjects: number;
  propertyTypes: string[];
  priceRange: { min: number; max: number; unit: string };
  configurations: string[];
  amenities: string[];
  contactRequests: number;
  about: string;
  strengths: string[];
  partnerOpportunity: string;
  reviews: { author: string; rating: number; text: string }[];
  feedback: { type: string; text: string }[];
};

type Project = {
  id: string;
  slug: string;
  title: string;
  city: string;
  state: string;
  location: string;
  startingPrice: number;
  priceUnit: string;
  projectStatus: string;
  propertyType: string;
  totalUnits: number | null;
  reraNumber: string | null;
  featured: boolean;
  verified: boolean;
  possessionDate: string | null;
  images: string[];
  configurations: string[];
};

export default function DeveloperProfileClient({ slug }: { slug: string }) {
  const [profile, setProfile] = useState<DeveloperProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [reviews, setReviews] = useState<{ author: string; rating: number; text: string }[]>([]);
  const [feedback, setFeedback] = useState<{ type: string; text: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [leadStatus, setLeadStatus] = useState<string>("");
  const [communityStatus, setCommunityStatus] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "reviews">("overview");

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const res = await fetch(`/api/developers/${slug}`);
        if (!res.ok) {
          setProfile(null);
          setProjects([]);
          return;
        }
        const data = await res.json();
        setProfile(data.profile || null);
        setProjects(data.projects || []);
        setReviews(data.profile?.reviews || []);
        setFeedback(data.profile?.feedback || []);
      } catch {
        setProfile(null);
        setProjects([]);
        setReviews([]);
        setFeedback([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [slug]);

  async function contactDeveloper(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLeadStatus("");
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "");
    const phone = String(form.get("phone") || "");
    const email = String(form.get("email") || "");
    if (!name || !phone) {
      setLeadStatus("Please add your name and phone.");
      return;
    }
    try {
      const res = await fetch("/api/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "developer_contact_request",
          page: `/developers/${slug}`,
          details: JSON.stringify({ developer: profile?.name || slug, name, phone, email }),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      e.currentTarget.reset();
      setLeadStatus("Request submitted! Our team will connect you shortly.");
    } catch {
      setLeadStatus("Could not submit request. Please try again.");
    }
  }

  async function submitCommunity(type: "review" | "feedback", formData: FormData) {
    setCommunityStatus("");
    const text = String(formData.get("text") || "");
    const rating = Number(formData.get("rating") || 4);
    if (!text) {
      setCommunityStatus("Please enter text before submitting.");
      return;
    }
    const res = await fetch(`/api/developers/${slug}/community`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, text, rating }),
    });
    if (res.status === 401) {
      setCommunityStatus("Please login first to submit.");
      return;
    }
    if (!res.ok) {
      setCommunityStatus("Could not submit right now.");
      return;
    }
    setCommunityStatus("Submitted for moderation.");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="gradient-navy pt-28 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-white/10 rounded w-40" />
              <div className="h-10 bg-white/10 rounded w-80" />
              <div className="h-4 bg-white/10 rounded w-96" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-12 text-center">
            <Building2 size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-bold text-navy-900">Developer profile not found</h2>
            <p className="text-gray-500 mt-2">This developer may not have any listed projects yet.</p>
            <Link href="/developers" className="btn-primary inline-flex items-center gap-2 mt-6">
              Browse All Developers <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  const statusBadge = (status: string) => {
    const map: Record<string, { label: string; color: string }> = {
      "ready-to-move": { label: "Ready to Move", color: "bg-emerald-100 text-emerald-700" },
      "under-construction": { label: "Under Construction", color: "bg-blue-100 text-blue-700" },
      upcoming: { label: "Upcoming", color: "bg-amber-100 text-amber-700" },
    };
    return map[status] || { label: status, color: "bg-gray-100 text-gray-700" };
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gold-500/15 blur-[120px] rounded-full" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-purple-500/8 blur-[120px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 sm:pt-32 sm:pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/developers" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-6">
              <ChevronRight size={14} className="rotate-180" /> All Developers
            </Link>

            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden shrink-0">
                {profile.logo ? (
                  <img src={profile.logo} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <Building2 size={36} className="text-gold-400" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold tracking-wider text-gold-400 uppercase">Developer Profile</span>
                  {profile.verifiedProjects > 0 && (
                    <span className="inline-flex items-center gap-1 text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
                      <BadgeCheck size={12} /> Verified
                    </span>
                  )}
                  {profile.reraProjects > 0 && (
                    <span className="inline-flex items-center gap-1 text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                      <FileCheck size={12} /> RERA Compliant
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">{profile.name}</h1>

                <p className="text-gray-300 mt-3 max-w-2xl leading-relaxed">{profile.about}</p>

                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-gold-400" />
                    {profile.cities.join(", ")}
                  </span>
                  {avgRating && (
                    <span className="flex items-center gap-1.5">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      {avgRating} rating
                    </span>
                  )}
                  {profile.establishedYear && (
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-blue-400" />
                      Since {profile.establishedYear}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3"
          >
            {[
              { value: profile.totalProjects, label: "Total Projects", icon: <Building2 size={16} /> },
              { value: profile.delivered, label: "Delivered", icon: <CheckCircle size={16} /> },
              { value: profile.ongoing, label: "Ongoing", icon: <Clock size={16} /> },
              { value: `${profile.totalUnits.toLocaleString()}+`, label: "Total Units", icon: <Users size={16} /> },
              { value: profile.reraProjects, label: "RERA Verified", icon: <ShieldCheck size={16} /> },
              { value: `${profile.cities.length}`, label: "Cities", icon: <MapPin size={16} /> },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-center"
              >
                <div className="flex items-center justify-center gap-1.5 text-gold-400 mb-1">
                  {s.icon}
                </div>
                <p className="text-xl font-bold text-white">{s.value}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {[
              { key: "overview" as const, label: "Overview" },
              { key: "projects" as const, label: `Projects (${projects.length})` },
              { key: "reviews" as const, label: "Reviews" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-3.5 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? "border-gold-500 text-navy-900"
                    : "border-transparent text-gray-500 hover:text-navy-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "overview" && (
              <>
                {/* Key Strengths */}
                {profile.strengths.length > 0 && (
                  <MotionSection className="card p-6">
                    <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2">
                      <Award size={20} className="text-gold-500" /> Key Strengths
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {profile.strengths.map((strength) => (
                        <span
                          key={strength}
                          className="px-3.5 py-2 rounded-lg bg-navy-50 text-navy-700 text-sm font-medium border border-navy-100"
                        >
                          {strength}
                        </span>
                      ))}
                    </div>
                  </MotionSection>
                )}

                {/* Project Portfolio Summary */}
                <MotionSection className="card p-6">
                  <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2">
                    <Building2 size={20} className="text-blue-500" /> Project Portfolio
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                    <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-center">
                      <p className="text-2xl font-bold text-emerald-700">{profile.delivered}</p>
                      <p className="text-xs text-gray-600 mt-1">Delivered</p>
                    </div>
                    <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 text-center">
                      <p className="text-2xl font-bold text-blue-700">{profile.ongoing}</p>
                      <p className="text-xs text-gray-600 mt-1">Ongoing</p>
                    </div>
                    <div className="rounded-xl bg-amber-50 border border-amber-100 p-4 text-center">
                      <p className="text-2xl font-bold text-amber-700">{profile.upcoming}</p>
                      <p className="text-xs text-gray-600 mt-1">Upcoming</p>
                    </div>
                    <div className="rounded-xl bg-purple-50 border border-purple-100 p-4 text-center">
                      <p className="text-2xl font-bold text-purple-700">{profile.totalUnits.toLocaleString()}</p>
                      <p className="text-xs text-gray-600 mt-1">Total Units</p>
                    </div>
                  </div>

                  {profile.propertyTypes.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {profile.propertyTypes.map((type) => (
                        <span key={type} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md capitalize">
                          {type}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      Price range: <strong className="text-navy-900">₹{profile.priceRange.min} - ₹{profile.priceRange.max} {profile.priceRange.unit}</strong>
                    </p>
                  </div>
                </MotionSection>

                {/* Operating Cities */}
                <MotionSection className="card p-6">
                  <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2">
                    <MapPin size={20} className="text-gold-500" /> Operating Cities
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {profile.cities.map((city) => (
                      <Link
                        key={city}
                        href={`/projects?q=${encodeURIComponent(profile.name)}&city=${encodeURIComponent(city)}`}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 hover:border-gold-200 hover:bg-gold-50 transition-colors text-sm text-navy-700 font-medium"
                      >
                        <MapPin size={14} className="text-gold-500" />
                        {city}
                        <ArrowRight size={12} className="text-gray-400" />
                      </Link>
                    ))}
                  </div>
                </MotionSection>

                {/* Amenities & Configurations */}
                {(profile.amenities.length > 0 || profile.configurations.length > 0) && (
                  <MotionSection className="card p-6">
                    <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2">
                      <Sparkles size={20} className="text-purple-500" /> Common Offerings
                    </h2>
                    {profile.configurations.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Configurations</p>
                        <div className="flex flex-wrap gap-2">
                          {profile.configurations.map((c) => (
                            <span key={c} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md">{c}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {profile.amenities.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Popular Amenities</p>
                        <div className="flex flex-wrap gap-2">
                          {profile.amenities.map((a) => (
                            <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md">{a}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </MotionSection>
                )}

                {/* Top Featured Projects */}
                <MotionSection className="card p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2">
                      <Landmark size={20} className="text-navy-600" /> Featured Projects
                    </h2>
                    <button
                      onClick={() => setActiveTab("projects")}
                      className="text-sm text-gold-600 font-semibold flex items-center gap-1 hover:text-gold-700"
                    >
                      View All <ArrowRight size={14} />
                    </button>
                  </div>
                  {projects.length === 0 ? (
                    <p className="mt-4 text-sm text-gray-500">No projects found.</p>
                  ) : (
                    <MotionGrid className="grid gap-4 md:grid-cols-2 mt-4">
                      {projects.slice(0, 4).map((project) => {
                        const badge = statusBadge(project.projectStatus);
                        return (
                          <MotionCard key={project.id}>
                            <Link
                              href={`/projects/${project.slug}`}
                              className="group block rounded-xl border border-gray-200 hover:border-gold-200 hover:shadow-md transition-all overflow-hidden"
                            >
                              {project.images?.[0] && (
                                <div className="h-36 overflow-hidden bg-gray-100">
                                  <img
                                    src={project.images[0]}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                </div>
                              )}
                              <div className="p-4">
                                <div className="flex items-start justify-between gap-2">
                                  <h3 className="font-semibold text-navy-900 text-sm leading-tight">{project.title}</h3>
                                  <span className={`text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap ${badge.color}`}>
                                    {badge.label}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                  <MapPin size={10} /> {project.location}, {project.city}
                                </p>
                                <div className="flex items-center justify-between mt-2.5">
                                  <p className="text-sm font-bold text-navy-800">
                                    ₹{project.startingPrice} {project.priceUnit}+
                                  </p>
                                  {project.verified && (
                                    <ShieldCheck size={14} className="text-emerald-500" />
                                  )}
                                </div>
                                {project.configurations.length > 0 && (
                                  <p className="text-[11px] text-gray-500 mt-1.5">{project.configurations.join(" | ")}</p>
                                )}
                              </div>
                            </Link>
                          </MotionCard>
                        );
                      })}
                    </MotionGrid>
                  )}
                </MotionSection>

                {/* Partner Opportunity */}
                <MotionSection className="rounded-2xl bg-gradient-to-r from-navy-800 to-navy-900 p-6 text-white relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold-500/10 blur-[60px] rounded-full" />
                  <div className="relative">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <Users size={20} className="text-gold-400" /> Partner Opportunities
                    </h2>
                    <p className="mt-2 text-sm text-gray-300 leading-relaxed">{profile.partnerOpportunity}</p>
                    <Link href="/partners/join" className="btn-primary inline-flex items-center gap-2 mt-4 text-sm">
                      Apply as Partner <ArrowRight size={16} />
                    </Link>
                  </div>
                </MotionSection>
              </>
            )}

            {activeTab === "projects" && (
              <MotionSection className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-navy-900">All Projects by {profile.name}</h2>
                  <span className="text-sm text-gray-500">{projects.length} projects</span>
                </div>
                {projects.length === 0 ? (
                  <div className="card p-8 text-center text-gray-500">No projects found.</div>
                ) : (
                  <div className="space-y-4">
                    {projects.map((project) => {
                      const badge = statusBadge(project.projectStatus);
                      return (
                        <Link
                          key={project.id}
                          href={`/projects/${project.slug}`}
                          className="group block card hover:shadow-lg transition-shadow"
                        >
                          <div className="flex flex-col sm:flex-row">
                            {project.images?.[0] && (
                              <div className="sm:w-56 h-44 sm:h-auto overflow-hidden bg-gray-100 shrink-0">
                                <img
                                  src={project.images[0]}
                                  alt={project.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                            )}
                            <div className="p-5 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h3 className="font-bold text-navy-900 group-hover:text-gold-600 transition-colors">{project.title}</h3>
                                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                    <MapPin size={12} /> {project.location}, {project.city}
                                  </p>
                                </div>
                                <span className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap ${badge.color}`}>
                                  {badge.label}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
                                <span className="font-bold text-navy-800">₹{project.startingPrice} {project.priceUnit}+</span>
                                {project.reraNumber && (
                                  <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded flex items-center gap-1">
                                    <FileCheck size={10} /> RERA
                                  </span>
                                )}
                                {project.verified && (
                                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded flex items-center gap-1">
                                    <ShieldCheck size={10} /> Verified
                                  </span>
                                )}
                                {project.totalUnits && (
                                  <span className="text-xs text-gray-500">{project.totalUnits} units</span>
                                )}
                              </div>
                              {project.configurations.length > 0 && (
                                <p className="text-xs text-gray-500 mt-2">{project.configurations.join(" | ")}</p>
                              )}
                              {project.possessionDate && (
                                <p className="text-xs text-gray-400 mt-1">Possession: {project.possessionDate}</p>
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </MotionSection>
            )}

            {activeTab === "reviews" && (
              <MotionSection className="space-y-6">
                {/* Rating Summary */}
                <div className="card p-6">
                  <h2 className="text-xl font-bold text-navy-900">Developer Rating</h2>
                  <div className="flex items-center gap-6 mt-4">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-navy-900">{avgRating || "—"}</p>
                      {avgRating && (
                        <div className="flex items-center gap-0.5 mt-1 justify-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < Math.round(parseFloat(avgRating)) ? "text-amber-400 fill-amber-400" : "text-gray-200"}
                            />
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-1">{reviews.length} reviews</p>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = reviews.filter((r) => Math.round(r.rating) === star).length;
                        const pct = reviews.length ? (count / reviews.length) * 100 : 0;
                        return (
                          <div key={star} className="flex items-center gap-2 text-xs">
                            <span className="w-3 text-gray-500">{star}</span>
                            <Star size={10} className="text-amber-400 fill-amber-400" />
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="w-6 text-right text-gray-400">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Reviews */}
                <div className="card p-6">
                  <h2 className="text-xl font-bold text-navy-900">Reviews</h2>
                  <div className="mt-4 space-y-4">
                    {reviews.map((review, idx) => (
                      <div key={idx} className="rounded-xl border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center text-sm font-bold text-navy-700">
                              {review.author[0]}
                            </div>
                            <p className="font-semibold text-navy-900 text-sm">{review.author}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star size={14} className="text-amber-400 fill-amber-400" />
                            <span className="text-sm font-medium text-navy-900">{review.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mt-3 leading-relaxed">{review.text}</p>
                      </div>
                    ))}
                    {reviews.length === 0 && (
                      <p className="text-sm text-gray-500">No approved developer reviews yet.</p>
                    )}
                  </div>
                  <form
                    className="mt-4 grid gap-2 sm:grid-cols-2"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const fd = new FormData(e.currentTarget);
                      await submitCommunity("review", fd);
                      e.currentTarget.reset();
                    }}
                  >
                    <select name="rating" className="input-field">
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Good</option>
                      <option value="3">3 - Average</option>
                    </select>
                    <textarea name="text" placeholder="Write your developer review" className="input-field sm:col-span-2 min-h-[90px]" />
                    <button className="btn-primary sm:col-span-2 justify-center">Submit Review</button>
                  </form>
                </div>

                {/* Feedback */}
                <div className="card p-6">
                  <h2 className="text-xl font-bold text-navy-900">Buyer / Investor Feedback</h2>
                  <div className="mt-4 space-y-3">
                    {feedback.map((item, idx) => (
                      <div key={idx} className="rounded-xl bg-gray-50 border border-gray-100 p-4">
                        <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{item.type}</p>
                        <p className="text-sm text-gray-700 mt-1 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                    {feedback.length === 0 && (
                      <p className="text-sm text-gray-500">No approved feedback yet.</p>
                    )}
                  </div>
                  <form
                    className="mt-4"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const fd = new FormData(e.currentTarget);
                      await submitCommunity("feedback", fd);
                      e.currentTarget.reset();
                    }}
                  >
                    <textarea name="text" placeholder="Share buyer/investor feedback" className="input-field min-h-[90px]" />
                    <button className="btn-primary mt-2">Submit Feedback</button>
                  </form>
                  {communityStatus && <p className="text-sm text-gray-600 mt-2">{communityStatus}</p>}
                </div>
              </MotionSection>
            )}

            {/* FAQ (always visible) */}
            <FAQAccordion
              title={`${profile.name} FAQs`}
              items={[
                {
                  question: `How should I evaluate ${profile.name}?`,
                  answer: "Compare project delivery history, construction quality, RERA compliance, and customer reviews. Visit active projects and verify documentation.",
                },
                {
                  question: "Can I connect directly with the sales team?",
                  answer: "Yes, use the Contact Developer form on this page. Our team will connect you with the builder's sales representative.",
                },
                {
                  question: `What is ${profile.name}'s delivery track record?`,
                  answer: `${profile.name} has ${profile.delivered} delivered projects, ${profile.ongoing} ongoing, and ${profile.upcoming} upcoming projects across ${profile.cities.join(", ")}.`,
                },
                {
                  question: "Are there active partner opportunities?",
                  answer: "Yes, developers on our platform are open to channel partnerships. Submit your profile under Partner Opportunities.",
                },
              ]}
            />
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Contact Form */}
            <section className="card p-6 sticky top-32">
              <h3 className="text-lg font-bold text-navy-900 flex items-center gap-2">
                <Phone size={18} className="text-gold-500" /> Contact Developer
              </h3>
              <p className="text-sm text-gray-500 mt-1">Get project details, payment plans, and availability.</p>

              <form className="mt-4 space-y-3" onSubmit={contactDeveloper}>
                <input name="name" placeholder="Your Name *" className="input-field" required />
                <input name="phone" placeholder="Phone Number *" className="input-field" required />
                <input name="email" type="email" placeholder="Email (optional)" className="input-field" />
                <button className="btn-primary w-full justify-center">Contact {profile.name}</button>
              </form>

              {leadStatus && (
                <p className={`text-sm mt-3 ${leadStatus.includes("submitted") ? "text-emerald-600" : "text-red-600"}`}>
                  {leadStatus}
                </p>
              )}

              <div className="mt-4 flex flex-col gap-2">
                <Link href={`/projects?q=${encodeURIComponent(profile.name)}`} className="btn-secondary justify-center text-sm">
                  View All Projects
                </Link>
              </div>

              {profile.contactRequests > 0 && (
                <p className="text-xs text-gray-400 mt-3 text-center flex items-center justify-center gap-1">
                  <Eye size={12} /> {profile.contactRequests}+ people contacted this month
                </p>
              )}
            </section>

            {/* Quick Stats */}
            <section className="card p-5">
              <h3 className="text-sm font-bold text-navy-900 mb-3">Quick Facts</h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Total Projects</span>
                  <span className="font-semibold text-navy-900">{profile.totalProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Delivered</span>
                  <span className="font-semibold text-emerald-700">{profile.delivered}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Cities Active</span>
                  <span className="font-semibold text-navy-900">{profile.cities.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">RERA Projects</span>
                  <span className="font-semibold text-navy-900">{profile.reraProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Price Range</span>
                  <span className="font-semibold text-navy-900">₹{profile.priceRange.min}-{profile.priceRange.max} {profile.priceRange.unit}</span>
                </div>
                {avgRating && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Rating</span>
                    <span className="font-semibold text-amber-600 flex items-center gap-1">
                      <Star size={12} className="fill-amber-400" /> {avgRating}
                    </span>
                  </div>
                )}
              </div>
            </section>

            {/* Trust Badges */}
            <section className="card p-5">
              <h3 className="text-sm font-bold text-navy-900 mb-3">Trust Signals</h3>
              <div className="space-y-2">
                {[
                  profile.verifiedProjects > 0 && { icon: <ShieldCheck size={14} className="text-emerald-500" />, label: "Verified Developer" },
                  profile.reraProjects > 0 && { icon: <FileCheck size={14} className="text-blue-500" />, label: "RERA Compliant Projects" },
                  profile.delivered > 0 && { icon: <CheckCircle size={14} className="text-emerald-500" />, label: `${profile.delivered} Projects Delivered` },
                  profile.totalUnits > 0 && { icon: <Users size={14} className="text-navy-500" />, label: `${profile.totalUnits.toLocaleString()}+ Happy Families` },
                  { icon: <TrendingUp size={14} className="text-gold-500" />, label: "Active in Market" },
                ]
                  .filter(Boolean)
                  .map((badge, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      {badge && badge.icon}
                      {badge && badge.label}
                    </div>
                  ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
