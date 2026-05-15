"use client";

import { useState, useEffect } from "react";
import { formatDate } from "@/lib/utils";
import { Mail, Download, Trash2, CheckCircle, XCircle } from "lucide-react";
import ExportButton from "@/components/admin/ExportButton";
import type { CsvColumn } from "@/lib/csv";

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchSubscribers();
  }, [statusFilter]);

  async function fetchSubscribers() {
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter");
      const data = await res.json();
      
      let filtered = data.subscribers || [];
      if (statusFilter) {
        filtered = filtered.filter((s: any) => s.status === statusFilter);
      }
      
      setSubscribers(filtered);
      setTotal(filtered.length);
    } catch (error) {
      console.error("Failed to fetch subscribers:", error);
    }
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    try {
      await fetch("/api/newsletter", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      fetchSubscribers();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  }

  async function deleteSubscriber(id: string) {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;
    
    try {
      await fetch("/api/newsletter", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchSubscribers();
    } catch (error) {
      console.error("Failed to delete subscriber:", error);
    }
  }

  const exportColumns: CsvColumn<any>[] = [
    { header: "ID", accessor: (s) => s.id },
    { header: "Email", accessor: (s) => s.email },
    { header: "Name", accessor: (s) => s.name || "" },
    { header: "Source", accessor: (s) => s.source || "" },
    { header: "Status", accessor: (s) => s.status },
    { header: "Subscribed At", accessor: (s) => s.createdAt },
    { header: "Updated At", accessor: (s) => s.updatedAt },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Newsletter Subscribers</h1>
          <p className="text-sm text-gray-500">{total} total subscribers</p>
        </div>
        <ExportButton
          data={subscribers}
          columns={exportColumns}
          filename="newsletter_subscribers"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold-400 outline-none"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="unsubscribed">Unsubscribed</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Subscribers</p>
              <p className="text-2xl font-bold text-navy-900">{total}</p>
            </div>
            <Mail className="text-gold-500" size={32} />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {subscribers.filter((s) => s.status === "active").length}
              </p>
            </div>
            <CheckCircle className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Unsubscribed</p>
              <p className="text-2xl font-bold text-gray-600">
                {subscribers.filter((s) => s.status === "unsubscribed").length}
              </p>
            </div>
            <XCircle className="text-gray-500" size={32} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading...</div>
        ) : subscribers.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No subscribers found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Subscribed At
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-gray-400" />
                        <span className="text-sm font-medium text-navy-800">
                          {subscriber.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {subscriber.name || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                        {subscriber.source || "website"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={subscriber.status}
                        onChange={(e) =>
                          updateStatus(subscriber.id, e.target.value)
                        }
                        className={`text-xs px-2 py-1 rounded-full border-0 font-medium ${
                          subscriber.status === "active"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-50 text-gray-700"
                        }`}
                      >
                        <option value="active">Active</option>
                        <option value="unsubscribed">Unsubscribed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">
                        {formatDate(subscriber.createdAt)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => deleteSubscriber(subscriber.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
