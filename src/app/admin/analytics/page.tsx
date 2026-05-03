"use client";

import { useState, useEffect } from "react";
import { timeAgo } from "@/lib/utils";
import { Activity, MapPin, Clock, Monitor, Globe, User, MousePointer } from "lucide-react";
import ExportButton from "@/components/admin/ExportButton";
import type { CsvColumn } from "@/lib/csv";

export default function AdminAnalyticsPage() {
  const [activities, setActivities] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => { fetchActivities(); }, [page]);

  async function fetchActivities() {
    setLoading(true);
    try {
      const res = await fetch(`/api/activity?page=${page}&limit=30`);
      const data = await res.json();
      setActivities(data.activities || []);
      setTotal(data.total || 0);
    } catch {}
    setLoading(false);
  }

  const uniqueUsers = new Set(activities.filter((a) => a.userId).map((a) => a.userId)).size;
  const locatedVisits = activities.filter((a) => a.latitude).length;
  const uniquePages = new Set(activities.map((a) => a.page).filter(Boolean)).size;

  const activityExportColumns: CsvColumn<any>[] = [
    { header: "ID", accessor: (a) => a.id },
    { header: "User", accessor: (a) => a.user?.name || "Guest" },
    { header: "User ID", accessor: (a) => a.userId || "" },
    { header: "Action", accessor: (a) => a.action },
    { header: "Page", accessor: (a) => a.page || "" },
    { header: "City", accessor: (a) => a.city || "" },
    { header: "Latitude", accessor: (a) => a.latitude ?? "" },
    { header: "Longitude", accessor: (a) => a.longitude ?? "" },
    { header: "IP", accessor: (a) => a.ip || "" },
    { header: "User Agent", accessor: (a) => a.userAgent || "" },
    { header: "Created At", accessor: (a) => a.createdAt },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Analytics & Activity</h1>
          <p className="text-sm text-gray-500">Track user behavior and platform activity with geolocation data</p>
        </div>
        <ExportButton
          data={activities}
          columns={activityExportColumns}
          filename="propertypointers-activity"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <Activity size={20} className="text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Total Activities</p>
              <p className="text-2xl font-bold text-navy-900">{total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <User size={20} className="text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Unique Users</p>
              <p className="text-2xl font-bold text-navy-900">{uniqueUsers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <Globe size={20} className="text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Geo-Located Visits</p>
              <p className="text-2xl font-bold text-navy-900">{locatedVisits}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <MousePointer size={20} className="text-orange-500" />
            <div>
              <p className="text-sm text-gray-500">Unique Pages</p>
              <p className="text-2xl font-bold text-navy-900">{uniquePages}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-semibold text-navy-800">Activity Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Action</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Page</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Geolocation</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">City</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">IP</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Time</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((a) => (
                <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-navy-100 flex items-center justify-center text-navy-600 text-xs font-bold">
                        {a.user?.name?.[0] || "G"}
                      </div>
                      <span className="text-navy-800">{a.user?.name || "Guest"}</span>
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">{a.action}</span>
                  </td>
                  <td className="py-2 px-4 text-gray-500">{a.page || "-"}</td>
                  <td className="py-2 px-4 text-xs text-gray-400">
                    {a.latitude ? `${a.latitude.toFixed(4)}, ${a.longitude.toFixed(4)}` : "-"}
                  </td>
                  <td className="py-2 px-4 text-gray-500">
                    {a.city ? <span className="flex items-center gap-1"><MapPin size={12} className="text-gold-500" /> {a.city}</span> : "-"}
                  </td>
                  <td className="py-2 px-4 text-xs text-gray-400 font-mono">{a.ip || "-"}</td>
                  <td className="py-2 px-4 text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={12} /> {timeAgo(a.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {activities.length === 0 && !loading && (
          <div className="p-12 text-center text-gray-500">No activity recorded yet</div>
        )}
        <div className="p-4 border-t flex justify-between items-center">
          <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
            className="px-3 py-1.5 bg-gray-100 rounded text-sm disabled:opacity-50">Previous</button>
          <span className="text-sm text-gray-500">Page {page}</span>
          <button onClick={() => setPage(page + 1)} disabled={activities.length < 30}
            className="px-3 py-1.5 bg-gray-100 rounded text-sm disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
}
