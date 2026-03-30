"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Building2, CheckCircle, Star, ArrowRight,
  ChevronLeft, ChevronRight, X, Share2, Phone,
  Shield, Download, Clock, Maximize2,
  Ruler, Users, ExternalLink, Check
} from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import ProjectReviewsForum from "@/components/ProjectReviewsForum";

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  "upcoming": { label: "Upcoming", color: "text-blue-700", bg: "bg-blue-100" },
  "under-construction": { label: "Under Construction", color: "text-amber-700", bg: "bg-amber-100" },
  "ready-to-move": { label: "Ready to Move", color: "text-green-700", bg: "bg-green-100" },
};

const TYPE_MAP: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  mixed: "Mixed Use",
  plots: "Plots / Land",
};

function safeParseJSON(str: string): any[] {
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

export default function ProjectDetailPage() {
  const { slug } = useParams() as { slug: string };
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [similarProjects, setSimilarProjects] = useState<any[]>([]);
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadStatus, setLeadStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [leadAction, setLeadAction] = useState("project_get_price_details");
  const [sitePhone, setSitePhone] = useState("+91-9990074072");

  useEffect(() => {
    if (slug) fetchProject();
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((d) => { if (d.contactPhone) setSitePhone(d.contactPhone); })
      .catch(() => {});
  }, [slug]);

  async function fetchProject() {
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${slug}`);
      if (!res.ok) throw new Error("not-found");
      const data = await res.json();
      setProject(data.project);
      if (data.project) {
        fetchSimilar(data.project.city, data.project.propertyType, data.project.id);
      }
    } catch {
      setProject(null);
    } finally {
      setLoading(false);
    }
  }

  async function fetchSimilar(city: string, type: string, excludeId: string) {
    try {
      const res = await fetch(`/api/projects?city=${city}&propertyType=${type}&limit=4`);
      const data = await res.json();
      setSimilarProjects((data.projects || []).filter((p: any) => p.id !== excludeId).slice(0, 3));
    } catch {}
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: project.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  async function handleLeadSubmit(e: FormEvent<HTMLFormElement>, action: string) {
    e.preventDefault();
    setLeadStatus(null);
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const phone = String(form.get("phone") || "");
    if (!name || !phone) {
      setLeadStatus({ ok: false, text: "Please add your name and phone." });
      return;
    }
    setLeadLoading(true);
    try {
      const res = await fetch("/api/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          page: `/projects/${slug}`,
          details: JSON.stringify({ project: project?.title, name, email, phone }),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setLeadStatus({ ok: true, text: "Request submitted. Our team will contact you shortly." });
      e.currentTarget.reset();
    } catch {
      setLeadStatus({ ok: false, text: "Could not submit right now. Please try again." });
    } finally {
      setLeadLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse" />
          </div>
        </div>
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="lg:col-span-2 h-72 md:h-96 lg:h-[480px] bg-gray-200 rounded-2xl animate-pulse" />
              <div className="hidden lg:grid grid-rows-2 gap-3">
                <div className="bg-gray-200 rounded-xl animate-pulse" />
                <div className="bg-gray-200 rounded-xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
                  {[1, 2, 3, 4].map((i) => <div key={i} className="h-12 bg-gray-100 rounded-lg" />)}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-40 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
            <div>
              <div className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto mb-4" />
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => <div key={i} className="h-11 bg-gray-100 rounded-xl" />)}
                  <div className="h-11 bg-gold-200 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Building2 size={36} className="text-gray-300" />
            </div>
            <h1 className="text-2xl font-bold text-navy-900 mb-2">Project Not Found</h1>
            <p className="text-gray-500 mb-6">
              This project may have been removed or the URL might be incorrect.
            </p>
            <Link href="/projects" className="btn-primary inline-flex items-center gap-2">
              Browse All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const images = safeParseJSON(project.images);
  const configs = safeParseJSON(project.configurations);
  const amenities = safeParseJSON(project.amenities);
  const highlights = safeParseJSON(project.highlights);
  const locationAdvantages = safeParseJSON(project.locationAdvantages);
  const floorPlans = safeParseJSON(project.floorPlans);
  const statusInfo = STATUS_MAP[project.projectStatus] || STATUS_MAP["under-construction"];
  const paymentPlans = safeParseJSON(project.paymentPlans);
  const projectReviews: Array<{ author: string; rating: number; text: string; tag: string }> = [];
  const localityReviews: Array<{ author: string; rating: number; text: string; tag: string }> = [];
  const forumThreads: Array<{ title: string; replies: number; lastActive: string }> = [];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gold-600 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/projects" className="hover:text-gold-600 transition-colors">Projects</Link>
          <ChevronRight size={14} />
          <span className="text-navy-800 font-medium truncate">{project.title}</span>
        </div>
      </div>

      {/* Image Gallery */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 rounded-2xl overflow-hidden">
            {/* Main Image */}
            <div className="lg:col-span-2 relative h-72 md:h-96 lg:h-[480px] cursor-pointer group bg-gradient-to-br from-gray-100 to-gray-200"
              onClick={() => setLightbox(true)}>
              {images[activeImage] ? (
                <img src={images[activeImage]} alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-navy-100 to-navy-200 flex items-center justify-center">
                  <Building2 size={60} className="text-navy-300" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={18} />
              </div>
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${statusInfo.bg} ${statusInfo.color}`}>
                  {statusInfo.label}
                </span>
                {project.featured && (
                  <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gold-500 text-white flex items-center gap-1">
                    <Star size={12} className="fill-white" /> Featured
                  </span>
                )}
              </div>
            </div>

            {/* Side Images */}
            <div className="hidden lg:grid grid-rows-2 gap-3">
              {images.slice(1, 3).map((img: string, i: number) => (
                <div key={i} className="relative cursor-pointer overflow-hidden group bg-gradient-to-br from-gray-100 to-gray-200"
                  onClick={() => { setActiveImage(i + 1); setLightbox(true); }}>
                  <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  {i === 1 && images.length > 3 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-lg">
                      +{images.length - 3} Photos
                    </div>
                  )}
                </div>
              ))}
              {images.length <= 1 && (
                <>
                  <div className="bg-gray-100 flex items-center justify-center rounded-xl"><Building2 size={30} className="text-gray-300" /></div>
                  <div className="bg-gray-100 flex items-center justify-center rounded-xl"><Building2 size={30} className="text-gray-300" /></div>
                </>
              )}
              {images.length === 2 && (
                <div className="bg-gray-100 flex items-center justify-center rounded-xl"><Building2 size={30} className="text-gray-300" /></div>
              )}
            </div>
          </div>

          {/* Image Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
              {images.map((img: string, i: number) => (
                <button key={i} onClick={() => setActiveImage(i)}
                  className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === i ? "border-gold-500 ring-2 ring-gold-500/30" : "border-transparent opacity-60 hover:opacity-100"
                  }`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-navy-900 mb-2">{project.title}</h1>
                  <p className="text-gray-500 flex items-center gap-1.5 text-sm mb-3">
                    <MapPin size={14} className="text-gold-500" /> {project.location}, {project.city}, {project.state}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm text-gray-500">by</span>
                    <span className="font-semibold text-navy-800">{project.builderName}</span>
                    {project.verified && (
                      <span className="flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                        <CheckCircle size={12} /> RERA Verified
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-gray-500">Starting from</p>
                  <p className="text-3xl font-bold text-navy-900">₹{project.startingPrice}<span className="text-lg ml-1">{project.priceUnit}+</span></p>
                  {project.reraNumber && (
                    <p className="text-xs text-gray-400 mt-1">RERA: {project.reraNumber}</p>
                  )}
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
                {[
                  { icon: <Building2 size={18} />, label: "Type", value: TYPE_MAP[project.propertyType] || project.propertyType },
                  { icon: <Clock size={18} />, label: "Possession", value: project.possessionDate || "TBA" },
                  { icon: <Ruler size={18} />, label: "Area", value: project.totalArea || "N/A" },
                  { icon: <Users size={18} />, label: "Units", value: project.totalUnits ? `${project.totalUnits}+` : "N/A" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg text-navy-600">{item.icon}</div>
                    <div>
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="text-sm font-semibold text-navy-800">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Configurations */}
              {configs.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-600 mb-3">Available Configurations</h3>
                  <div className="flex flex-wrap gap-2">
                    {configs.map((c: string) => (
                      <span key={c} className="px-4 py-2 bg-navy-50 text-navy-800 rounded-xl text-sm font-medium border border-navy-100">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-100">
                <button onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors">
                  {copied ? <Check size={16} className="text-green-500" /> : <Share2 size={16} />}
                  {copied ? "Link Copied!" : "Share"}
                </button>
                {project.brochureUrl && (
                  <a href={project.brochureUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-navy-800 hover:bg-navy-900 rounded-xl text-sm font-medium text-white transition-colors">
                    <Download size={16} /> Download Brochure
                  </a>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-navy-900 mb-4">Price Range</h2>
              <p className="text-gray-700">
                Starting at <span className="font-semibold text-navy-900">₹{project.startingPrice} {project.priceUnit}+</span>.
                Final pricing can vary by tower, view, and configuration.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-navy-900 mb-4">Possession & RERA</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl bg-gray-50 p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Possession</p>
                  <p className="text-base font-semibold text-navy-900 mt-1">{project.possessionDate || "To be announced"}</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">RERA</p>
                  <p className="text-base font-semibold text-navy-900 mt-1">{project.reraNumber || "RERA details on request"}</p>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-navy-900 mb-4">About {project.title}</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{project.description}</p>
            </motion.div>

            {/* Highlights */}
            {highlights.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h2 className="text-xl font-bold text-navy-900 mb-4">Project Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {highlights.map((h: string, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex items-start gap-3 p-3 bg-gradient-to-r from-gold-50 to-transparent rounded-xl"
                    >
                      <div className="w-7 h-7 bg-gold-500 text-white rounded-full flex items-center justify-center shrink-0 text-xs font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <p className="text-sm text-gray-700 font-medium pt-1">{h}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Amenities */}
            {amenities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-navy-900">Amenities</h2>
                  {amenities.length > 8 && (
                    <button onClick={() => setShowAllAmenities(!showAllAmenities)}
                      className="text-sm text-gold-600 hover:underline font-medium">
                      {showAllAmenities ? "Show Less" : `View all ${amenities.length}`}
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {(showAllAmenities ? amenities : amenities.slice(0, 8)).map((a: string, i: number) => (
                    <motion.div
                      key={a}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * i }}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gold-50 transition-colors group"
                    >
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:bg-gold-500 group-hover:text-white transition-colors">
                        <CheckCircle size={14} className="text-green-500 group-hover:text-white" />
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{a}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Location Advantages */}
            {locationAdvantages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h2 className="text-xl font-bold text-navy-900 mb-4">Location Advantages</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {locationAdvantages.map((adv: any, i: number) => {
                    const place = typeof adv === "string" ? adv : adv.place;
                    const distance = typeof adv === "string" ? "" : adv.distance;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <MapPin size={16} className="text-gold-500 shrink-0" />
                          <span className="text-sm font-medium text-gray-700">{place}</span>
                        </div>
                        {distance && (
                          <span className="text-xs font-bold text-navy-600 bg-white px-3 py-1 rounded-full shadow-sm">
                            {distance}
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
                <a href={`https://www.google.com/maps/search/${encodeURIComponent(project.location + " " + project.city)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-sm text-gold-600 hover:text-gold-700 font-medium">
                  <ExternalLink size={14} /> View on Google Maps
                </a>
              </motion.div>
            )}

            {/* Floor Plans */}
            {floorPlans.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h2 className="text-xl font-bold text-navy-900 mb-4">Floor Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {floorPlans.map((fp: any, i: number) => (
                    <div key={i} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                      {fp.image && (
                        <img src={fp.image} alt={fp.name} className="w-full h-48 object-contain bg-gray-50 p-4" />
                      )}
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-navy-800">{fp.name}</p>
                          {fp.size && <p className="text-xs text-gray-500">{fp.size}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {paymentPlans.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.43 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h2 className="text-xl font-bold text-navy-900 mb-4">Payment Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {paymentPlans.map((plan: any) => (
                    <div key={plan.title} className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                      <p className="font-semibold text-navy-900">{plan.title}</p>
                      {plan.detail && <p className="text-sm text-gray-600 mt-1">{plan.detail}</p>}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-navy-900 mb-4">About Developer</h2>
              <p className="text-gray-700 leading-relaxed">
                {project.description || `${project.builderName} is developing ${project.title} in ${project.location}, ${project.city}.`}
              </p>
              <Link
                href={`/developers/${project.builderName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
                className="inline-flex items-center gap-1.5 text-sm text-gold-600 font-semibold mt-3 hover:text-gold-700"
              >
                View {project.builderName} Profile <ArrowRight size={14} />
              </Link>
            </motion.div>

            <ProjectReviewsForum
              projectSlug={slug}
              initialProjectReviews={projectReviews}
              initialLocalityReviews={localityReviews}
              initialThreads={forumThreads}
            />

            <FAQAccordion
              title="Project FAQs"
              items={[
                {
                  question: "What is the current possession timeline?",
                  answer: `Current expected possession is ${project.possessionDate || "to be announced by the developer"}.`,
                },
                {
                  question: "Can I get updated price details by configuration?",
                  answer: "Yes. Use the Get Price Details button and our advisor will share current tower-wise inventory and pricing.",
                },
                {
                  question: "Is this project RERA registered?",
                  answer: project.reraNumber ? `Yes, RERA number is ${project.reraNumber}.` : "RERA details can be requested from our team.",
                },
                {
                  question: "What payment plans are available?",
                  answer: "Multiple payment plans are available including down payment, construction-linked, and flexible plans. Use the enquiry form to get the latest payment schedule.",
                },
                {
                  question: "How can I book a site visit?",
                  answer: "Fill in your details in the enquiry form and select 'Book Site Visit'. Our team will schedule a convenient time for you.",
                },
                {
                  question: "Is home loan assistance available?",
                  answer: "Yes. Property Pointers partners with leading banks and NBFCs to help you get pre-approved home loans at competitive rates. Use our EMI Calculator to estimate monthly payments.",
                },
                {
                  question: "Can I download the project brochure?",
                  answer: project.brochureUrl
                    ? "Yes, click the Download Brochure button on this page to get the latest project brochure."
                    : "The brochure will be shared by our team once you submit an enquiry.",
                },
                {
                  question: "What is the resale potential of this project?",
                  answer: `Properties in ${project.city} by ${project.builderName} have shown consistent appreciation. Contact our advisory team for a detailed market analysis.`,
                },
              ]}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl p-6 text-white"
            >
              <h2 className="text-xl font-bold">Ready to take the next step?</h2>
              <p className="text-gray-200 mt-1">Choose an action and our team will assist you with complete project details.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="#lead-form" className="btn-secondary">Book Site Visit</a>
                <a href={project.brochureUrl || "#"} target={project.brochureUrl ? "_blank" : undefined} rel="noopener noreferrer" className="btn-outline border-white/30 text-white hover:bg-white/10">
                  Download Brochure
                </a>
                <a href="#lead-form" className="btn-primary">Get Price Details</a>
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Enquiry Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl p-6 shadow-sm sticky top-24"
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-navy-900 mb-1">Interested in this project?</h3>
                <p className="text-sm text-gray-500">Get expert advice & best deals</p>
              </div>

              <div className="flex gap-1 mb-4 bg-gray-100 rounded-lg p-1">
                {[
                  { key: "project_get_price_details", label: "Price Details" },
                  { key: "project_book_site_visit", label: "Site Visit" },
                  { key: "project_download_brochure", label: "Brochure" },
                ].map((opt) => (
                  <button key={opt.key} type="button" onClick={() => setLeadAction(opt.key)}
                    className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-colors ${leadAction === opt.key ? "bg-white text-navy-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                    {opt.label}
                  </button>
                ))}
              </div>

              <form id="lead-form" className="space-y-3" onSubmit={(e) => handleLeadSubmit(e, leadAction)}>
                <input name="name" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500" />
                <input name="email" placeholder="Email Address" type="email" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500" />
                <input name="phone" placeholder="Phone Number" type="tel" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500" />
                <button disabled={leadLoading} className="w-full bg-gold-500 hover:bg-gold-600 text-white py-3 rounded-xl text-sm font-bold transition-colors disabled:opacity-60">
                  {leadLoading ? "Submitting..." : leadAction === "project_book_site_visit" ? "Book Site Visit" : leadAction === "project_download_brochure" ? "Get Brochure" : "Get Price Details"}
                </button>
              </form>
              {leadStatus && <p className={`mt-3 text-sm ${leadStatus.ok ? "text-emerald-600" : "text-red-600"}`}>{leadStatus.text}</p>}

              <div className="flex items-center gap-2 mt-4 text-xs text-gray-400 justify-center">
                <Shield size={12} /> Your information is safe with us
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                <a href={`tel:+${sitePhone.replace(/[^0-9]/g, "")}`}
                  className="flex items-center gap-3 w-full px-4 py-3 bg-green-50 text-green-700 rounded-xl text-sm font-medium hover:bg-green-100 transition-colors">
                  <Phone size={16} /> {sitePhone}
                </a>
                <a href={`https://wa.me/${sitePhone.replace(/[^0-9]/g, "")}?text=Hi, I'm interested in ${project.title}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full px-4 py-3 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.347 0-4.518-.803-6.237-2.15l-.436-.362-3.2 1.073 1.073-3.2-.362-.436A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>
                  WhatsApp Us
                </a>
              </div>
            </motion.div>

            {/* Project Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-navy-900 mb-4">Project Summary</h3>
              <div className="space-y-3">
                {[
                  { label: "Builder", value: project.builderName },
                  { label: "Location", value: `${project.location}, ${project.city}` },
                  { label: "Property Type", value: TYPE_MAP[project.propertyType] || project.propertyType },
                  { label: "Status", value: statusInfo.label },
                  { label: "Possession", value: project.possessionDate || "TBA" },
                  { label: "RERA No.", value: project.reraNumber || "N/A" },
                  { label: "Total Area", value: project.totalArea || "N/A" },
                  { label: "Total Units", value: project.totalUnits ? `${project.totalUnits}` : "N/A" },
                  { label: "Starting Price", value: `₹${project.startingPrice} ${project.priceUnit}+` },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-500">{item.label}</span>
                    <span className="text-sm font-medium text-navy-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Similar Projects */}
        {similarProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-navy-900">Similar Projects</h2>
              <Link href={`/projects?city=${project.city}`}
                className="text-gold-600 hover:underline text-sm font-medium flex items-center gap-1">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProjects.map((sp, i) => {
                const spImages = safeParseJSON(sp.images);
                const spConfigs = safeParseJSON(sp.configurations);
                const spStatus = STATUS_MAP[sp.projectStatus] || STATUS_MAP["under-construction"];
                return (
                  <motion.div
                    key={sp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <Link href={`/projects/${sp.slug}`} className="block group">
                      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
                        <div className="relative h-44 overflow-hidden">
                          {spImages[0] ? (
                            <img src={spImages[0]} alt={sp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center"><Building2 size={30} className="text-gray-300" /></div>
                          )}
                          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold ${spStatus.bg} ${spStatus.color}`}>
                            {spStatus.label}
                          </span>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-navy-900 group-hover:text-gold-600 transition-colors line-clamp-1">{sp.title}</h3>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><MapPin size={10} /> {sp.location}</p>
                          <p className="text-xs text-gray-400 mt-1">by {sp.builderName}</p>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                            <p className="font-bold text-navy-900">₹{sp.startingPrice} {sp.priceUnit}+</p>
                            <span className="text-gold-600 text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              View <ArrowRight size={12} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setLightbox(false)}
          >
            <button onClick={() => setLightbox(false)} className="absolute top-4 right-4 text-white/80 hover:text-white z-10">
              <X size={28} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); setActiveImage((activeImage - 1 + images.length) % images.length); }}
              className="absolute left-4 text-white/80 hover:text-white z-10 p-2">
              <ChevronLeft size={32} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); setActiveImage((activeImage + 1) % images.length); }}
              className="absolute right-4 text-white/80 hover:text-white z-10 p-2">
              <ChevronRight size={32} />
            </button>
            <motion.img
              key={activeImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={images[activeImage]}
              alt=""
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_: string, i: number) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setActiveImage(i); }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${activeImage === i ? "bg-gold-500 scale-125" : "bg-white/40 hover:bg-white/70"}`} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3">
        <div className="flex items-center gap-2 max-w-lg mx-auto">
          <a href={`tel:+${sitePhone.replace(/[^0-9]/g, "")}`}
            className="flex items-center justify-center gap-2 flex-1 py-2.5 bg-green-50 text-green-700 rounded-xl text-sm font-semibold hover:bg-green-100 transition-colors">
            <Phone size={16} /> Call
          </a>
          <a href={`https://wa.me/${sitePhone.replace(/[^0-9]/g, "")}?text=Hi, I'm interested in ${project.title}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 flex-1 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-semibold hover:bg-emerald-100 transition-colors">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.347 0-4.518-.803-6.237-2.15l-.436-.362-3.2 1.073 1.073-3.2-.362-.436A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>
            WhatsApp
          </a>
          <a href="#lead-form"
            className="flex items-center justify-center gap-2 flex-1 py-2.5 bg-gold-500 text-white rounded-xl text-sm font-semibold hover:bg-gold-600 transition-colors">
            Enquire
          </a>
        </div>
      </div>
    </div>
  );
}
