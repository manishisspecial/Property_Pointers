"use client";

import { useState, useEffect } from "react";
import {
  Users, Building2, MessageCircle, Eye, TrendingUp, UserPlus, Home, Calendar,
  ArrowUpRight, ArrowDownRight, Activity, MapPin, Clock
} from "lucide-react";
import { formatDate, timeAgo } from "@/lib/utils";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const res = await fetch("/api/admin/stats");
      const result = await res.json();
      setData(result);
    } catch {}
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
              <div className="h-8 bg-gray-200 rounded w-1/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const stats = data?.stats || {};

  const cards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "bg-blue-500", today: stats.newUsersToday, todayLabel: "new today" },
    { label: "Total Properties", value: stats.totalProperties, icon: Building2, color: "bg-green-500", today: stats.newPropertiesToday, todayLabel: "new today" },
    { label: "Total Inquiries", value: stats.totalInquiries, icon: MessageCircle, color: "bg-purple-500", today: stats.newInquiriesToday, todayLabel: "new today" },
    { label: "Active Listings", value: stats.activeListings, icon: Home, color: "bg-orange-500" },
    { label: "Total Views", value: stats.totalViews, icon: Eye, color: "bg-cyan-500" },
    { label: "New Users Today", value: stats.newUsersToday, icon: UserPlus, color: "bg-emerald-500" },
    { label: "New Properties Today", value: stats.newPropertiesToday, icon: TrendingUp, color: "bg-amber-500" },
    { label: "New Inquiries Today", value: stats.newInquiriesToday, icon: Calendar, color: "bg-rose-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Overview of your platform performance</p>
        </div>
        <span className="text-sm text-gray-400">{new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">{card.label}</p>
                <p className="text-2xl font-bold text-navy-900 mt-1">{(card.value || 0).toLocaleString()}</p>
                {card.today !== undefined && card.today > 0 && (
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-0.5">
                    <ArrowUpRight size={12} /> +{card.today} {card.todayLabel}
                  </p>
                )}
              </div>
              <div className={`${card.color} bg-opacity-10 w-11 h-11 rounded-xl flex items-center justify-center`}>
                <card.icon size={20} className={card.color.replace("bg-", "text-")} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      {data?.monthlyData && data.monthlyData.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-navy-800 mb-4">Monthly Growth (Last 6 Months)</h3>
          <div className="grid grid-cols-6 gap-2">
            {data.monthlyData.map((m: any) => (
              <div key={m.month} className="text-center">
                <div className="flex flex-col items-center gap-1 mb-2">
                  <div className="w-full bg-blue-100 rounded-t" style={{ height: `${Math.max(m.users * 8, 4)}px` }} />
                  <div className="w-full bg-green-100 rounded-t" style={{ height: `${Math.max(m.properties * 8, 4)}px` }} />
                  <div className="w-full bg-purple-100 rounded-t" style={{ height: `${Math.max(m.inquiries * 8, 4)}px` }} />
                </div>
                <p className="text-xs font-medium text-gray-600">{m.month}</p>
                <div className="text-[10px] text-gray-400 space-y-0.5 mt-1">
                  <p className="text-blue-500">{m.users}u</p>
                  <p className="text-green-500">{m.properties}p</p>
                  <p className="text-purple-500">{m.inquiries}i</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-100" /> Users</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-100" /> Properties</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-purple-100" /> Inquiries</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-navy-800 mb-4 flex items-center gap-2">
            <Users size={20} className="text-blue-500" /> Recent Users
          </h3>
          <div className="space-y-3">
            {(data?.recentUsers || []).slice(0, 5).map((user: any) => (
              <div key={user.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-navy-800 flex items-center justify-center text-white text-sm font-bold">
                    {user.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy-800">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    user.role === "admin" ? "bg-gold-100 text-gold-700" : user.role === "owner" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
                  }`}>{user.role}</span>
                  <p className="text-xs text-gray-400 mt-1">{timeAgo(user.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-navy-800 mb-4 flex items-center gap-2">
            <MessageCircle size={20} className="text-purple-500" /> Recent Inquiries
          </h3>
          <div className="space-y-3">
            {(data?.recentInquiries || []).slice(0, 5).map((inq: any) => (
              <div key={inq.id} className="py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-navy-800">{inq.user?.name || "User"}</p>
                    <p className="text-xs text-gray-500 truncate max-w-[200px]">{inq.property?.title || "Property"}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    inq.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                  }`}>{inq.status}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{timeAgo(inq.createdAt)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-navy-800 mb-4 flex items-center gap-2">
          <Activity size={20} className="text-green-500" /> Recent Activity Log
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 px-3 text-gray-500 font-medium">User</th>
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Action</th>
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Page</th>
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Location</th>
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {(data?.recentActivities || []).slice(0, 10).map((act: any) => (
                <tr key={act.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                  <td className="py-2 px-3">{act.user?.name || "Guest"}</td>
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{act.action}</span>
                  </td>
                  <td className="py-2 px-3 text-gray-500">{act.page || "-"}</td>
                  <td className="py-2 px-3 text-gray-500">
                    {act.city ? (
                      <span className="flex items-center gap-1"><MapPin size={12} /> {act.city}</span>
                    ) : act.latitude ? (
                      <span className="text-xs">{act.latitude.toFixed(2)}, {act.longitude.toFixed(2)}</span>
                    ) : "-"}
                  </td>
                  <td className="py-2 px-3 text-gray-400 flex items-center gap-1">
                    <Clock size={12} /> {timeAgo(act.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Properties by Type & City */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-navy-800 mb-4">Properties by Type</h3>
          <div className="space-y-3">
            {(data?.propertiesByType || []).map((item: any) => (
              <div key={item.type} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 capitalize">{item.type}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-100 rounded-full">
                    <div className="h-full bg-gold-500 rounded-full" style={{
                      width: `${Math.min((item._count / (stats.totalProperties || 1)) * 100, 100)}%`
                    }} />
                  </div>
                  <span className="text-sm font-semibold text-navy-800 w-8 text-right">{item._count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-navy-800 mb-4">Top Cities</h3>
          <div className="space-y-3">
            {(data?.propertiesByCity || []).slice(0, 8).map((item: any, i: number) => (
              <div key={item.city} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-navy-100 flex items-center justify-center text-navy-600 text-xs font-bold">{i + 1}</span>
                  {item.city}
                </span>
                <span className="text-sm font-semibold text-navy-800">{item._count} listings</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
