"use client";

import { useState, useEffect } from "react";
import {
  Building2, Plus, X, Pencil, Trash2, CheckCircle, XCircle,
  Star, Globe, Phone, Mail, Loader2, Link2,
} from "lucide-react";

type Developer = {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  about: string | null;
  establishedYear: number | null;
  strengths: string[];
  partnerOpportunity: string | null;
  operatingCities: string[];
  website: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  featured: boolean;
  verified: boolean;
  projectCount: number;
  cities: string[];
  createdAt: string;
};

type Unlinked = {
  slug: string;
  name: string;
  projectCount: number;
  cities: string[];
};

const EMPTY_FORM = {
  name: "",
  slug: "",
  logo: "",
  about: "",
  establishedYear: "",
  strengths: "",
  partnerOpportunity: "",
  operatingCities: "",
  website: "",
  contactEmail: "",
  contactPhone: "",
  featured: false,
  verified: false,
};

export default function AdminDevelopersPage() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [unlinked, setUnlinked] = useState<Unlinked[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editSlug, setEditSlug] = useState<string | null>(null);

  useEffect(() => {
    fetchDevelopers();
  }, []);

  async function fetchDevelopers() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/developers");
      const data = await res.json();
      setDevelopers(data.developers || []);
      setUnlinked(data.unlinked || []);
    } catch {
      /* empty */
    }
    setLoading(false);
  }

  function openCreate(prefill?: { name: string; slug: string }) {
    setEditSlug(null);
    setForm({
      ...EMPTY_FORM,
      name: prefill?.name || "",
      slug: prefill?.slug || "",
    });
    setShowModal(true);
  }

  function openEdit(dev: Developer) {
    setEditSlug(dev.slug);
    setForm({
      name: dev.name,
      slug: dev.slug,
      logo: dev.logo || "",
      about: dev.about || "",
      establishedYear: dev.establishedYear?.toString() || "",
      strengths: (dev.strengths || []).join(", "),
      partnerOpportunity: dev.partnerOpportunity || "",
      operatingCities: (dev.operatingCities || []).join(", "),
      website: dev.website || "",
      contactEmail: dev.contactEmail || "",
      contactPhone: dev.contactPhone || "",
      featured: dev.featured,
      verified: dev.verified,
    });
    setShowModal(true);
  }

  async function handleSave() {
    if (!form.name) return;
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        slug: editSlug || form.slug || undefined,
        logo: form.logo || null,
        about: form.about || null,
        establishedYear: form.establishedYear || null,
        strengths: form.strengths
          .split(/[,\n]/)
          .map((s) => s.trim())
          .filter(Boolean),
        partnerOpportunity: form.partnerOpportunity || null,
        operatingCities: form.operatingCities
          .split(/[,\n]/)
          .map((s) => s.trim())
          .filter(Boolean),
        website: form.website || null,
        contactEmail: form.contactEmail || null,
        contactPhone: form.contactPhone || null,
        featured: form.featured,
        verified: form.verified,
      };

      const res = await fetch("/api/admin/developers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Failed to save developer.");
        setSaving(false);
        return;
      }
      setShowModal(false);
      fetchDevelopers();
    } catch {
      alert("Network error.");
    }
    setSaving(false);
  }

  async function handleDelete(slug: string) {
    if (!confirm("Delete this developer profile? Projects will not be affected.")) return;
    const res = await fetch("/api/admin/developers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    if (res.ok) fetchDevelopers();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Developers</h1>
          <p className="text-sm text-gray-500">
            Manage developer profiles. Data here enriches the public developer pages.
          </p>
        </div>
        <button
          onClick={() => openCreate()}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <Plus size={16} /> Add Developer
        </button>
      </div>

      {/* Unlinked builders */}
      {unlinked.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-amber-800 mb-2">
            Builders without a profile ({unlinked.length})
          </p>
          <p className="text-xs text-amber-700 mb-3">
            These builders have projects but no developer profile. Create one to add about info, strengths, and contact details.
          </p>
          <div className="flex flex-wrap gap-2">
            {unlinked.map((u) => (
              <button
                key={u.slug}
                onClick={() => openCreate({ name: u.name, slug: u.slug })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-amber-200 rounded-lg text-sm text-amber-800 hover:bg-amber-100 transition-colors"
              >
                <Link2 size={12} />
                {u.name}
                <span className="text-xs text-amber-500">({u.projectCount} projects)</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Developers Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Developer</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Est. Year</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Projects</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Cities</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400">
                  <Loader2 size={24} className="animate-spin mx-auto" />
                </td>
              </tr>
            ) : developers.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400">
                  No developer profiles yet. Create one above.
                </td>
              </tr>
            ) : (
              developers.map((dev) => (
                <tr key={dev.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-navy-100 flex items-center justify-center overflow-hidden shrink-0">
                        {dev.logo ? (
                          <img src={dev.logo} alt={dev.name} className="w-full h-full object-cover" />
                        ) : (
                          <Building2 size={18} className="text-navy-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-navy-900">{dev.name}</p>
                        <p className="text-xs text-gray-400">/developers/{dev.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {dev.establishedYear || "—"}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{dev.projectCount}</td>
                  <td className="py-3 px-4 text-gray-500 text-xs">
                    {dev.cities.length > 0 ? dev.cities.join(", ") : "—"}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      {dev.verified && (
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Verified</span>
                      )}
                      {dev.featured && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Featured</span>
                      )}
                      {!dev.verified && !dev.featured && (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEdit(dev)}
                        className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(dev.slug)}
                        className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-bold text-navy-900">
                {editSlug ? "Edit Developer" : "Add Developer Profile"}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 max-h-[65vh] overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Developer Name *</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                    placeholder="e.g. Devika Group"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
                  <input
                    type="number"
                    value={form.establishedYear}
                    onChange={(e) => setForm({ ...form, establishedYear: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                    placeholder="e.g. 2005"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                  <input
                    value={form.logo}
                    onChange={(e) => setForm({ ...form, logo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">About Developer</label>
                <textarea
                  value={form.about}
                  onChange={(e) => setForm({ ...form, about: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                  rows={4}
                  placeholder="Detailed description of the developer..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Strengths (comma-separated)
                </label>
                <input
                  value={form.strengths}
                  onChange={(e) => setForm({ ...form, strengths: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                  placeholder="e.g. Execution quality, Location strategy, RERA compliant"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Partner Opportunity Text</label>
                <textarea
                  value={form.partnerOpportunity}
                  onChange={(e) => setForm({ ...form, partnerOpportunity: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                  rows={2}
                  placeholder="Open for channel partnerships..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                  <input
                    value={form.contactEmail}
                    onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                    placeholder="sales@developer.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                  <input
                    value={form.contactPhone}
                    onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500"
                    placeholder="+91-..."
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="rounded border-gray-300 text-gold-500 focus:ring-gold-500"
                  />
                  <span className="text-sm text-gray-700">Featured Developer</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.verified}
                    onChange={(e) => setForm({ ...form, verified: e.target.checked })}
                    className="rounded border-gray-300 text-green-500 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">Verified Developer</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name}
                className="btn-primary flex items-center gap-2 text-sm disabled:opacity-50"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                {editSlug ? "Update Developer" : "Create Developer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
