"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2, Eye, CheckCircle, XCircle, Star, Trash2, Plus, X,
  MapPin, Calendar, IndianRupee, Pencil, ChevronLeft, ChevronRight,
  Loader2, Image as ImageIcon, Upload
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  highlights: string;
  builderName: string;
  builderLogo: string | null;
  location: string;
  city: string;
  state: string;
  reraNumber: string | null;
  projectStatus: string;
  possessionDate: string | null;
  startingPrice: number;
  priceUnit: string;
  propertyType: string;
  configurations: string;
  totalArea: string | null;
  totalUnits: number | null;
  images: string;
  amenities: string;
  floorPlans: string;
  locationAdvantages: string;
  brochureUrl: string | null;
  featured: boolean;
  verified: boolean;
  views: number;
  createdAt: string;
}

const EMPTY_FORM = {
  title: "",
  description: "",
  builderName: "",
  builderLogo: "",
  location: "",
  city: "",
  state: "Delhi NCR",
  reraNumber: "",
  projectStatus: "under-construction",
  possessionDate: "",
  startingPrice: "",
  priceUnit: "Lac",
  propertyType: "residential",
  configurations: "",
  totalArea: "",
  totalUnits: "",
  images: "",
  amenities: "",
  highlights: "",
  locationAdvantages: "",
  brochureUrl: "",
  featured: false,
  verified: false,
};

const STATUS_OPTIONS = [
  { value: "upcoming", label: "Upcoming" },
  { value: "under-construction", label: "Under Construction" },
  { value: "ready-to-move", label: "Ready to Move" },
];

const TYPE_OPTIONS = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "mixed", label: "Mixed Use" },
  { value: "plots", label: "Plots / Land" },
];

function formatPrice(price: number, unit: string) {
  if (unit === "Cr") return `₹${price} Cr+`;
  return `₹${price} Lac+`;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState({ propertyType: "", status: "", page: "1" });
  const [showModal, setShowModal] = useState(false);
  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [activeTab, setActiveTab] = useState("basic");

  useEffect(() => {
    fetchProjects();
  }, [filter]);

  async function fetchProjects() {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter.propertyType) params.set("propertyType", filter.propertyType);
    if (filter.status) params.set("status", filter.status);
    params.set("page", filter.page);
    params.set("limit", "10");

    try {
      const res = await fetch(`/api/projects?${params.toString()}`);
      const data = await res.json();
      setProjects(data.projects || []);
      setTotal(data.total || 0);
    } catch {}
    setLoading(false);
  }

  function openCreateModal() {
    setForm(EMPTY_FORM);
    setEditSlug(null);
    setActiveTab("basic");
    setShowModal(true);
  }

  async function openEditModal(project: Project) {
    setForm({
      title: project.title,
      description: project.description,
      builderName: project.builderName,
      builderLogo: project.builderLogo || "",
      location: project.location,
      city: project.city,
      state: project.state,
      reraNumber: project.reraNumber || "",
      projectStatus: project.projectStatus,
      possessionDate: project.possessionDate || "",
      startingPrice: String(project.startingPrice),
      priceUnit: project.priceUnit,
      propertyType: project.propertyType,
      configurations: safeParseJSON(project.configurations).join(", "),
      totalArea: project.totalArea || "",
      totalUnits: project.totalUnits ? String(project.totalUnits) : "",
      images: safeParseJSON(project.images).join("\n"),
      amenities: safeParseJSON(project.amenities).join(", "),
      highlights: safeParseJSON(project.highlights).join("\n"),
      locationAdvantages: safeParseJSON(project.locationAdvantages)
        .map((a: any) => (typeof a === "string" ? a : `${a.place} - ${a.distance}`))
        .join("\n"),
      brochureUrl: project.brochureUrl || "",
      featured: project.featured,
      verified: project.verified,
    });
    setEditSlug(project.slug);
    setActiveTab("basic");
    setShowModal(true);
  }

  async function handleSubmit() {
    if (!form.title || !form.builderName || !form.city || !form.startingPrice) return;
    setSaving(true);

    const payload = {
      ...form,
      startingPrice: parseFloat(form.startingPrice),
      totalUnits: form.totalUnits ? parseInt(form.totalUnits) : null,
      configurations: form.configurations.split(",").map((s) => s.trim()).filter(Boolean),
      amenities: form.amenities.split(",").map((s) => s.trim()).filter(Boolean),
      images: form.images.split("\n").map((s) => s.trim()).filter(Boolean),
      highlights: form.highlights.split("\n").map((s) => s.trim()).filter(Boolean),
      locationAdvantages: form.locationAdvantages.split("\n").map((s) => s.trim()).filter(Boolean).map((line) => {
        const parts = line.split(" - ");
        return parts.length === 2 ? { place: parts[0].trim(), distance: parts[1].trim() } : line;
      }),
    };

    try {
      const url = editSlug ? `/api/projects/${editSlug}` : "/api/projects";
      const method = editSlug ? "PUT" : "POST";
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setShowModal(false);
      fetchProjects();
    } catch {}
    setSaving(false);
  }

  async function toggleField(slug: string, field: string, value: boolean) {
    try {
      await fetch(`/api/projects/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: !value }),
      });
      fetchProjects();
    } catch {}
  }

  async function deleteProject(slug: string) {
    if (!confirm("Delete this project permanently?")) return;
    try {
      await fetch(`/api/projects/${slug}`, { method: "DELETE" });
      fetchProjects();
    } catch {}
  }

  const totalPages = Math.ceil(total / 10);
  const currentPage = parseInt(filter.page);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Manage Projects</h1>
          <p className="text-sm text-gray-500">{total} total projects</p>
        </div>
        <button onClick={openCreateModal}
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-wrap gap-3">
        <select value={filter.propertyType} onChange={(e) => setFilter({ ...filter, propertyType: e.target.value, page: "1" })}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
          <option value="">All Types</option>
          {TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <select value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value, page: "1" })}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
          <option value="">All Status</option>
          {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Project</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Builder</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Price</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Views</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="py-12 text-center text-gray-400"><Loader2 className="animate-spin inline mr-2" size={18} />Loading...</td></tr>
              ) : projects.length === 0 ? (
                <tr><td colSpan={6} className="py-12 text-center text-gray-500">No projects found</td></tr>
              ) : (
                projects.map((p) => {
                  const images = safeParseJSON(p.images);
                  return (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-11 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                            {images[0] ? (
                              <img src={images[0]} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center"><Building2 size={16} className="text-gray-400" /></div>
                            )}
                          </div>
                          <div>
                            <Link href={`/projects/${p.slug}`} target="_blank"
                              className="font-medium text-navy-800 hover:text-gold-600 line-clamp-1">{p.title}</Link>
                            <p className="text-xs text-gray-400 flex items-center gap-1"><MapPin size={10} /> {p.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{p.builderName}</td>
                      <td className="py-3 px-4 font-medium text-navy-800">{formatPrice(p.startingPrice, p.priceUnit)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            p.projectStatus === "ready-to-move" ? "bg-green-100 text-green-700" :
                            p.projectStatus === "under-construction" ? "bg-amber-100 text-amber-700" :
                            "bg-blue-100 text-blue-700"
                          }`}>{STATUS_OPTIONS.find((s) => s.value === p.projectStatus)?.label || p.projectStatus}</span>
                          {p.verified && <CheckCircle size={14} className="text-green-500" />}
                          {p.featured && <Star size={14} className="text-yellow-500 fill-yellow-500" />}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-500"><Eye size={14} className="inline mr-1" />{p.views}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <button onClick={() => openEditModal(p)}
                            className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100" title="Edit">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => toggleField(p.slug, "verified", p.verified)}
                            className={`p-1.5 rounded-lg ${p.verified ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-green-50 text-green-600 hover:bg-green-100"}`}
                            title={p.verified ? "Unverify" : "Verify"}>
                            {p.verified ? <XCircle size={14} /> : <CheckCircle size={14} />}
                          </button>
                          <button onClick={() => toggleField(p.slug, "featured", p.featured)}
                            className={`p-1.5 rounded-lg ${p.featured ? "bg-yellow-100 text-yellow-600" : "bg-gray-50 text-gray-400"} hover:bg-yellow-100`}
                            title={p.featured ? "Unfeature" : "Feature"}>
                            <Star size={14} />
                          </button>
                          <button onClick={() => deleteProject(p.slug)}
                            className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100" title="Delete">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <span className="text-sm text-gray-500">Page {currentPage} of {totalPages}</span>
            <div className="flex gap-2">
              <button disabled={currentPage <= 1}
                onClick={() => setFilter({ ...filter, page: String(currentPage - 1) })}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40"><ChevronLeft size={16} /></button>
              <button disabled={currentPage >= totalPages}
                onClick={() => setFilter({ ...filter, page: String(currentPage + 1) })}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40"><ChevronRight size={16} /></button>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-3xl my-8 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-bold text-navy-900">{editSlug ? "Edit Project" : "Add New Project"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
            </div>

            {/* Tabs */}
            <div className="flex border-b px-6 gap-1">
              {[
                { id: "basic", label: "Basic Info" },
                { id: "details", label: "Details" },
                { id: "media", label: "Media & Amenities" },
                { id: "location", label: "Location" },
              ].map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                    activeTab === tab.id ? "border-gold-500 text-gold-600" : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}>{tab.label}</button>
              ))}
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
              {activeTab === "basic" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Title *</label>
                    <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                      placeholder="e.g. Devika Vibe Sector 110" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Builder Name *</label>
                      <input value={form.builderName} onChange={(e) => setForm({ ...form, builderName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                        placeholder="e.g. Devika Group" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Builder Logo URL</label>
                      <input value={form.builderLogo} onChange={(e) => setForm({ ...form, builderLogo: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                        placeholder="https://..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                      rows={4} placeholder="Detailed project description..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">RERA Number</label>
                      <input value={form.reraNumber} onChange={(e) => setForm({ ...form, reraNumber: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                        placeholder="e.g. UPRERAPRJ9275" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Brochure URL</label>
                      <input value={form.brochureUrl} onChange={(e) => setForm({ ...form, brochureUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                        placeholder="https://..." />
                    </div>
                  </div>
                </>
              )}

              {activeTab === "details" && (
                <>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Property Type *</label>
                      <select value={form.propertyType} onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500">
                        {TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Status</label>
                      <select value={form.projectStatus} onChange={(e) => setForm({ ...form, projectStatus: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500">
                        {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Possession Date</label>
                      <input value={form.possessionDate} onChange={(e) => setForm({ ...form, possessionDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                        placeholder="e.g. December 2025" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Starting Price *</label>
                      <input type="number" value={form.startingPrice} onChange={(e) => setForm({ ...form, startingPrice: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                        placeholder="e.g. 60" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price Unit</label>
                      <select value={form.priceUnit} onChange={(e) => setForm({ ...form, priceUnit: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500">
                        <option value="Lac">Lac</option>
                        <option value="Cr">Cr</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Units</label>
                      <input type="number" value={form.totalUnits} onChange={(e) => setForm({ ...form, totalUnits: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                        placeholder="e.g. 280" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Area</label>
                      <input value={form.totalArea} onChange={(e) => setForm({ ...form, totalArea: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                        placeholder="e.g. 5.5 Acres" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Configurations (comma-separated)</label>
                      <input value={form.configurations} onChange={(e) => setForm({ ...form, configurations: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                        placeholder="e.g. 2 BHK, 3 BHK, 4 BHK" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Highlights (one per line)</label>
                    <textarea value={form.highlights} onChange={(e) => setForm({ ...form, highlights: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                      rows={4} placeholder={"Possession Soon\nCatchment Area of 50K+ Families\nSeamless Connectivity"} />
                  </div>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                        className="rounded border-gray-300 text-gold-500 focus:ring-gold-500" />
                      <span className="text-sm text-gray-700">Featured Project</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.verified} onChange={(e) => setForm({ ...form, verified: e.target.checked })}
                        className="rounded border-gray-300 text-green-500 focus:ring-green-500" />
                      <span className="text-sm text-gray-700">Verified / RERA Approved</span>
                    </label>
                  </div>
                </>
              )}

              {activeTab === "media" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Images</label>
                    <ImageUploader
                      images={form.images.split("\n").filter(Boolean)}
                      onChange={(imgs) => setForm({ ...form, images: imgs.join("\n") })}
                      folder="projects"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Builder Logo</label>
                    <ImageUploader
                      images={form.builderLogo ? [form.builderLogo] : []}
                      onChange={(imgs) => setForm({ ...form, builderLogo: imgs[0] || "" })}
                      folder="logos"
                      maxImages={1}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amenities (comma-separated)</label>
                    <textarea value={form.amenities} onChange={(e) => setForm({ ...form, amenities: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                      rows={3} placeholder="Power Backup, Lift, Security, Visitor Parking, Gymnasium, Swimming Pool" />
                  </div>
                </>
              )}

              {activeTab === "location" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                      <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                        placeholder="e.g. Sector 110, Noida" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                      <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                        placeholder="e.g. Noida" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                      placeholder="e.g. Uttar Pradesh" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location Advantages (one per line: Place - Distance)</label>
                    <textarea value={form.locationAdvantages} onChange={(e) => setForm({ ...form, locationAdvantages: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                      rows={5} placeholder={"Yamuna Expressway - 15 min\nMetro Station - 5 min\nYatharth Hospital - 2 min"} />
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
              <button onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
              <button onClick={handleSubmit} disabled={saving || !form.title || !form.builderName || !form.city || !form.startingPrice}
                className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">
                {saving && <Loader2 size={14} className="animate-spin" />}
                {editSlug ? "Update Project" : "Create Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ImageUploader({
  images,
  onChange,
  folder,
  maxImages = 10,
}: {
  images: string[];
  onChange: (images: string[]) => void;
  folder: string;
  maxImages?: number;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);

    const newImages = [...images];
    for (let i = 0; i < files.length && newImages.length < maxImages; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (data.url) {
          newImages.push(data.url);
        }
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }

    onChange(newImages);
    setUploading(false);
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-3 mb-3">
        {images.map((img, i) => (
          <div key={i} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-video">
            <img src={img} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={12} />
            </button>
            {i === 0 && (
              <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-gold-500 text-white text-[10px] rounded font-bold">COVER</span>
            )}
          </div>
        ))}

        {images.length < maxImages && (
          <label
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg aspect-video cursor-pointer transition-colors ${
              dragOver ? "border-gold-500 bg-gold-50" : "border-gray-300 hover:border-gold-400 hover:bg-gray-50"
            }`}
          >
            {uploading ? (
              <Loader2 size={20} className="animate-spin text-gold-500" />
            ) : (
              <>
                <Upload size={20} className="text-gray-400 mb-1" />
                <span className="text-xs text-gray-500">Upload</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              multiple={maxImages > 1}
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
              disabled={uploading}
            />
          </label>
        )}
      </div>
      <p className="text-xs text-gray-400">{images.length}/{maxImages} images. Drag & drop or click to upload. First image = cover.</p>
    </div>
  );
}

function safeParseJSON(str: string): any[] {
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
