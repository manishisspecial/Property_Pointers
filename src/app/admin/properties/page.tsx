"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatPrice, timeAgo } from "@/lib/utils";
import { Building2, Eye, CheckCircle, XCircle, Star, Search, Filter, MapPin, Trash2 } from "lucide-react";
import ExportButton from "@/components/admin/ExportButton";
import type { CsvColumn } from "@/lib/csv";

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: "", verified: "", page: "1" });

  useEffect(() => { fetchProperties(); }, [filter]);

  async function fetchProperties() {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter.status) params.set("status", filter.status);
    if (filter.verified) params.set("verified", filter.verified);
    params.set("page", filter.page);

    try {
      const res = await fetch(`/api/admin/properties?${params.toString()}`);
      const data = await res.json();
      setProperties(data.properties || []);
      setTotal(data.total || 0);
    } catch {}
    setLoading(false);
  }

  async function updateProperty(id: string, updates: Record<string, unknown>) {
    try {
      await fetch("/api/admin/properties", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });
      fetchProperties();
    } catch {}
  }

  async function deleteProperty(id: string) {
    if (!confirm("Delete this property?")) return;
    try {
      await fetch(`/api/properties/${id}`, { method: "DELETE" });
      fetchProperties();
    } catch {}
  }

  const propertyExportColumns: CsvColumn<any>[] = [
    { header: "ID", accessor: (p) => p.id },
    { header: "Title", accessor: (p) => p.title },
    { header: "Type", accessor: (p) => p.type },
    { header: "Listing Type", accessor: (p) => p.listingType },
    { header: "Category", accessor: (p) => p.category },
    { header: "City", accessor: (p) => p.city },
    { header: "State", accessor: (p) => p.state },
    { header: "Locality", accessor: (p) => p.locality || p.address },
    { header: "Price (INR)", accessor: (p) => p.price },
    { header: "Price (Display)", accessor: (p) => formatPrice(p.price) },
    { header: "Bedrooms", accessor: (p) => p.bedrooms },
    { header: "Bathrooms", accessor: (p) => p.bathrooms },
    { header: "Area (sq.ft)", accessor: (p) => p.area },
    { header: "Status", accessor: (p) => p.status },
    { header: "Verified", accessor: (p) => Boolean(p.verified) },
    { header: "Featured", accessor: (p) => Boolean(p.featured) },
    { header: "Owner", accessor: (p) => p.owner?.name || "" },
    { header: "Owner Email", accessor: (p) => p.owner?.email || "" },
    { header: "Owner Phone", accessor: (p) => p.owner?.phone || "" },
    { header: "Views", accessor: (p) => p.views || 0 },
    { header: "Created At", accessor: (p) => p.createdAt },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Manage Properties</h1>
          <p className="text-sm text-gray-500">{total} total properties</p>
        </div>
        <ExportButton
          data={properties}
          columns={propertyExportColumns}
          filename="propertypointers-properties"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-wrap gap-3">
        <select value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value, page: "1" })}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="sold">Sold</option>
          <option value="rented">Rented</option>
        </select>
        <select value={filter.verified} onChange={(e) => setFilter({ ...filter, verified: e.target.value, page: "1" })}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
          <option value="">All Verification</option>
          <option value="true">Verified</option>
          <option value="false">Unverified</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Property</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Owner</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Price</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Views</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 rounded bg-gray-200 overflow-hidden shrink-0">
                        {JSON.parse(p.images || "[]")[0] ? (
                          <img src={JSON.parse(p.images)[0]} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center"><Building2 size={16} className="text-gray-400" /></div>
                        )}
                      </div>
                      <div>
                        <Link href={`/properties/${p.id}`} className="font-medium text-navy-800 hover:text-gold-600 line-clamp-1">{p.title}</Link>
                        <p className="text-xs text-gray-400 flex items-center gap-1"><MapPin size={10} /> {p.city}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{p.owner?.name}</td>
                  <td className="py-3 px-4 font-medium text-navy-800">{formatPrice(p.price)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        p.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}>{p.status}</span>
                      {p.verified && <CheckCircle size={14} className="text-green-500" />}
                      {p.featured && <Star size={14} className="text-gold-500" />}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-500"><Eye size={14} className="inline mr-1" />{p.views}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateProperty(p.id, { verified: !p.verified })}
                        className={`p-1.5 rounded-lg text-xs font-medium ${p.verified ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-green-50 text-green-600 hover:bg-green-100"}`}
                        title={p.verified ? "Unverify" : "Verify"}>
                        {p.verified ? <XCircle size={14} /> : <CheckCircle size={14} />}
                      </button>
                      <button onClick={() => updateProperty(p.id, { featured: !p.featured })}
                        className={`p-1.5 rounded-lg ${p.featured ? "bg-gold-100 text-gold-600" : "bg-gray-50 text-gray-400"} hover:bg-gold-100`}
                        title={p.featured ? "Unfeature" : "Feature"}>
                        <Star size={14} />
                      </button>
                      <button onClick={() => updateProperty(p.id, { status: p.status === "active" ? "inactive" : "active" })}
                        className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs">
                        {p.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                      <button onClick={() => deleteProperty(p.id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {properties.length === 0 && !loading && (
          <div className="p-12 text-center text-gray-500">No properties found</div>
        )}
      </div>
    </div>
  );
}
