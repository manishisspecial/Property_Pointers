"use client";

import { useState, useEffect } from "react";
import {
  Users, Building2, MessageCircle, Eye, TrendingUp, UserPlus, Home,
  ArrowUpRight, Activity, MapPin, Clock, BarChart3
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
  PieChart, Pie, Cell,
} from "recharts";
import { timeAgo } from "@/lib/utils";

const PIE_COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#8b5cf6", "#ef4444", "#06b6d4", "#ec4899"];

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-64 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
              <div className="h-9 bg-gray-200 rounded w-1/3" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 h-80 animate-pulse" />
          <div className="bg-white rounded-2xl p-6 h-80 animate-pulse" />
        </div>
      </div>
    );
  }

  const stats = data?.stats || {};

  const heroCards = [
    {
      label: "Total Views",
      value: stats.totalViews,
      icon: Eye,
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      label: "Total Projects",
      value: stats.totalProjects,
      icon: Building2,
      gradient: "from-amber-500 to-orange-600",
    },
    {
      label: "Total Leads",
      value: stats.totalLeads,
      icon: TrendingUp,
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      label: "New Leads Today",
      value: stats.newLeadsToday,
      icon: MessageCircle,
      gradient: "from-purple-500 to-indigo-600",
    },
  ];

  const summaryCards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Properties", value: stats.totalProperties, icon: Building2, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Developers", value: stats.totalDevelopers, icon: Home, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Total Inquiries", value: stats.totalInquiries, icon: MessageCircle, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const monthlyData = (data?.monthlyData || []).map((m: any) => ({
    name: m.month,
    Users: m.users,
    Properties: m.properties,
    Inquiries: m.inquiries,
  }));

  const typeData = (data?.propertiesByType || []).map((item: any) => ({
    name: item.type?.charAt(0).toUpperCase() + item.type?.slice(1),
    value: item._count,
  }));

  const projectTypeData = (data?.projectsByType || []).map((item: any) => ({
    name: item.propertyType?.charAt(0).toUpperCase() + item.propertyType?.slice(1),
    value: item._count,
  }));

  const cityData = (data?.propertiesByCity || []).slice(0, 6);
  const projectCityData = (data?.projectsByCity || []).slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>
        <span className="text-xs text-gray-400 bg-white px-3 py-1.5 rounded-lg shadow-sm">
          {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </span>
      </div>

      {/* Hero Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {heroCards.map((card) => (
          <div key={card.label} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} p-5 text-white shadow-lg`}>
            <div className="relative z-10">
              <p className="text-sm font-medium text-white/80">{card.label}</p>
              <p className="text-3xl font-bold mt-1">{(card.value || 0).toLocaleString()}</p>
            </div>
            <div className="absolute -right-2 -bottom-2 opacity-20">
              <card.icon size={72} strokeWidth={1} />
            </div>
          </div>
        ))}
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
            <div className={`${card.bg} w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}>
              <card.icon size={18} className={card.color} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 truncate">{card.label}</p>
              <p className="text-lg font-bold text-navy-900">{(card.value || 0).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Monthly Growth Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-navy-800 flex items-center gap-2">
              <BarChart3 size={20} className="text-gold-500" /> Monthly Growth
            </h3>
            <span className="text-xs text-gray-400">Last 6 months</span>
          </div>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,.1)", fontSize: 13 }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                <Bar dataKey="Users" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Properties" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Inquiries" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400 text-sm">No data yet</div>
          )}
        </div>

        {/* Projects by Type Pie */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-navy-800 mb-4">Projects by Type</h3>
          {projectTypeData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={projectTypeData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                    {projectTypeData.map((_: any, i: number) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,.1)", fontSize: 13 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {projectTypeData.map((item: any, i: number) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                      {item.name}
                    </span>
                    <span className="font-semibold text-navy-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-48 flex items-center justify-center text-gray-400 text-sm">No data yet</div>
          )}
        </div>
      </div>

      {/* Top Cities + Users by Role */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-navy-800 mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-gold-500" /> Projects by City
          </h3>
          <div className="space-y-3">
            {projectCityData.map((item: any, i: number) => {
              const maxCount = projectCityData[0]?._count || 1;
              return (
                <div key={item.city} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-navy-100 flex items-center justify-center text-navy-700 text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-navy-800 truncate">{item.city}</span>
                      <span className="text-xs font-semibold text-gray-500">{item._count}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gold-400 to-gold-600 rounded-full transition-all" style={{ width: `${(item._count / maxCount) * 100}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
            {projectCityData.length === 0 && <p className="text-sm text-gray-400">No data yet</p>}
          </div>
        </div>

        {/* Users by Role */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-navy-800 mb-4 flex items-center gap-2">
            <Users size={18} className="text-blue-500" /> Users by Role
          </h3>
          <div className="space-y-3">
            {(data?.usersByRole || []).map((item: any) => {
              const total = stats.totalUsers || 1;
              const pct = Math.round((item._count / total) * 100);
              const roleColors: Record<string, string> = { admin: "from-gold-400 to-amber-500", owner: "from-blue-400 to-blue-600", agent: "from-emerald-400 to-emerald-600", user: "from-gray-300 to-gray-400" };
              return (
                <div key={item.role}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-navy-800 capitalize">{item.role}</span>
                    <span className="text-xs text-gray-500">{item._count} ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${roleColors[item.role] || "from-gray-300 to-gray-400"} rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
            {(data?.usersByRole || []).length === 0 && <p className="text-sm text-gray-400">No data yet</p>}
          </div>
        </div>
      </div>

      {/* Recent Users + Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-navy-800 mb-4 flex items-center gap-2">
            <Users size={18} className="text-blue-500" /> Recent Users
          </h3>
          <div className="space-y-1">
            {(data?.recentUsers || []).slice(0, 6).map((user: any) => (
              <div key={user.id} className="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {user.name?.[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-navy-800 truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                    user.role === "admin" ? "bg-gold-100 text-gold-700" : user.role === "owner" ? "bg-blue-100 text-blue-700" : user.role === "agent" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"
                  }`}>{user.role}</span>
                  <p className="text-[11px] text-gray-400 mt-0.5">{timeAgo(user.createdAt)}</p>
                </div>
              </div>
            ))}
            {(data?.recentUsers || []).length === 0 && <p className="text-sm text-gray-400 py-4 text-center">No users yet</p>}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-navy-800 mb-4 flex items-center gap-2">
            <MessageCircle size={18} className="text-purple-500" /> Recent Inquiries
          </h3>
          <div className="space-y-1">
            {(data?.recentInquiries || []).slice(0, 6).map((inq: any) => (
              <div key={inq.id} className="py-2.5 px-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-navy-800">{inq.user?.name || "User"}</p>
                    <p className="text-xs text-gray-500 truncate">{inq.property?.title || "Property"}</p>
                  </div>
                  <span className={`shrink-0 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                    inq.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                  }`}>{inq.status}</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">{timeAgo(inq.createdAt)}</p>
              </div>
            ))}
            {(data?.recentInquiries || []).length === 0 && <p className="text-sm text-gray-400 py-4 text-center">No inquiries yet</p>}
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-navy-800 mb-4 flex items-center gap-2">
          <Activity size={18} className="text-green-500" /> Recent Activity
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">User</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Action</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Page</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Location</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody>
              {(data?.recentActivities || []).slice(0, 10).map((act: any) => (
                <tr key={act.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-navy-800">{act.user?.name || "Guest"}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">{act.action}</span>
                  </td>
                  <td className="py-2.5 px-3 text-gray-500 max-w-[180px] truncate">{act.page || "—"}</td>
                  <td className="py-2.5 px-3 text-gray-500">
                    {act.city ? (
                      <span className="flex items-center gap-1"><MapPin size={12} className="text-gray-400" /> {act.city}</span>
                    ) : act.latitude ? (
                      <span className="text-xs">{act.latitude.toFixed(2)}, {act.longitude.toFixed(2)}</span>
                    ) : "—"}
                  </td>
                  <td className="py-2.5 px-3 text-gray-400 whitespace-nowrap">
                    <span className="flex items-center gap-1"><Clock size={12} /> {timeAgo(act.createdAt)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(data?.recentActivities || []).length === 0 && <p className="text-sm text-gray-400 py-6 text-center">No activity yet</p>}
        </div>
      </div>
    </div>
  );
}
