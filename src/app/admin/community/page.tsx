"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, EyeOff, XCircle } from "lucide-react";
import { timeAgo } from "@/lib/utils";
import ExportButton from "@/components/admin/ExportButton";
import type { CsvColumn } from "@/lib/csv";

type Entry = {
  id: string;
  action: string;
  page: string;
  status: string;
  author: string;
  text: string;
  rating: number | null;
  createdAt: string;
  moderatedBy: string | null;
  moderatedAt: string | null;
  moderationHistory: Array<{ status: string; by: string; at: string }>;
};

export default function AdminCommunityPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    fetchEntries();
  }, [statusFilter, typeFilter]);

  async function fetchEntries() {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (typeFilter !== "all") params.set("type", typeFilter);
    const query = params.toString() ? `?${params}` : "";
    const res = await fetch(`/api/admin/community${query}`);
    const data = await res.json();
    setEntries(data.entries || []);
    setLoading(false);
  }

  async function moderate(id: string, status: "approved" | "rejected" | "hidden") {
    const res = await fetch("/api/admin/community", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) fetchEntries();
  }

  const communityExportColumns: CsvColumn<Entry>[] = [
    { header: "ID", accessor: (e) => e.id },
    { header: "Type", accessor: (e) => e.action },
    { header: "Author", accessor: (e) => e.author },
    { header: "Text", accessor: (e) => e.text },
    { header: "Rating", accessor: (e) => e.rating ?? "" },
    { header: "Page", accessor: (e) => e.page },
    { header: "Status", accessor: (e) => e.status },
    { header: "Moderated By", accessor: (e) => e.moderatedBy || "" },
    { header: "Moderated At", accessor: (e) => e.moderatedAt || "" },
    {
      header: "Moderation Updates",
      accessor: (e) => e.moderationHistory?.length ?? 0,
    },
    { header: "Created At", accessor: (e) => e.createdAt },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Community Moderation</h1>
          <p className="text-sm text-gray-500">Approve, reject, or hide project/developer community submissions.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="input-field max-w-[200px]">
            <option value="all">All Types</option>
            <option value="project_review">Project Reviews</option>
            <option value="locality_review">Locality Reviews</option>
            <option value="forum_thread">Forum Threads</option>
            <option value="developer_review">Developer Reviews</option>
            <option value="developer_feedback">Developer Feedback</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-field max-w-[180px]">
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="hidden">Hidden</option>
          </select>
          <ExportButton
            data={entries}
            columns={communityExportColumns}
            filename="propertypointers-community"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Author</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Content</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Page</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Moderation</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-b border-gray-50 hover:bg-gray-50 align-top">
                  <td className="py-3 px-4 text-gray-700">{entry.action}</td>
                  <td className="py-3 px-4 text-gray-700">{entry.author}</td>
                  <td className="py-3 px-4">
                    <p className="text-gray-700 max-w-md line-clamp-2">{entry.text || "-"}</p>
                    {entry.rating !== null && <p className="text-xs text-amber-600 mt-1">Rating: {entry.rating}</p>}
                    <p className="text-xs text-gray-400 mt-1">{timeAgo(entry.createdAt)}</p>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{entry.page || "-"}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      entry.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : entry.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : entry.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-600"
                    }`}>
                      {entry.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {entry.moderatedBy ? (
                      <div className="text-xs text-gray-600">
                        <p>By: <span className="font-medium text-navy-800">{entry.moderatedBy}</span></p>
                        <p className="text-gray-400">{timeAgo(entry.moderatedAt || "")}</p>
                        {entry.moderationHistory?.length > 0 && (
                          <p className="text-gray-400 mt-1">
                            {entry.moderationHistory.length} updates
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">No moderation yet</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => moderate(entry.id, "approved")} className="p-1.5 rounded bg-green-50 text-green-700 hover:bg-green-100" title="Approve">
                        <CheckCircle2 size={15} />
                      </button>
                      <button onClick={() => moderate(entry.id, "rejected")} className="p-1.5 rounded bg-red-50 text-red-700 hover:bg-red-100" title="Reject">
                        <XCircle size={15} />
                      </button>
                      <button onClick={() => moderate(entry.id, "hidden")} className="p-1.5 rounded bg-gray-100 text-gray-700 hover:bg-gray-200" title="Hide">
                        <EyeOff size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && entries.length === 0 && (
          <div className="p-12 text-center text-gray-500">No community entries found.</div>
        )}
      </div>
    </div>
  );
}
