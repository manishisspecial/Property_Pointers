"use client";

import { useState, useEffect } from "react";
import { timeAgo, formatDate } from "@/lib/utils";
import {
  Gauge, MapPin, Globe, Users, Eye, Activity, Clock, Building2,
  TrendingUp, Monitor, ArrowUpRight, ChevronDown, ChevronUp,
  Smartphone, Laptop, ExternalLink
} from "lucide-react";

export default function AdminPerformancePage() {
  const [activities, setActivities] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<"overview" | "users" | "activity" | "geo">("overview");
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  useEffect(() => { fetchData(); }, [page]);

  async function fetchData() {
    setLoading(true);
    try {
      const [actRes, usersRes, statsRes] = await Promise.all([
        fetch(`/api/activity?page=${page}&limit=50`),
        fetch("/api/admin/users?limit=100"),
        fetch("/api/admin/stats"),
      ]);
      const [actData, usersData, statsData] = await Promise.all([
        actRes.json(), usersRes.json(), statsRes.json(),
      ]);
      setActivities(actData.activities || []);
      setTotal(actData.total || 0);
      setUsers(usersData.users || []);
      setStats(statsData);
    } catch {}
    setLoading(false);
  }

  const geoUsers = users.filter((u) => u.latitude && u.longitude);
  const activeToday = activities.filter((a) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(a.createdAt) >= today;
  });
  const uniqueVisitorsToday = new Set(activeToday.filter((a) => a.userId).map((a) => a.userId)).size;
  const guestVisitsToday = activeToday.filter((a) => !a.userId).length;
  const geoLocatedActivities = activities.filter((a) => a.latitude);

  const pageCounts: Record<string, number> = {};
  activities.forEach((a) => {
    if (a.page) pageCounts[a.page] = (pageCounts[a.page] || 0) + 1;
  });
  const topPages = Object.entries(pageCounts).sort(([, a], [, b]) => b - a).slice(0, 10);

  const cityCounts: Record<string, number> = {};
  activities.forEach((a) => {
    if (a.city) cityCounts[a.city] = (cityCounts[a.city] || 0) + 1;
  });
  const topCities = Object.entries(cityCounts).sort(([, a], [, b]) => b - a).slice(0, 10);

  const deviceCounts = { mobile: 0, desktop: 0, other: 0 };
  activities.forEach((a) => {
    if (!a.userAgent) return;
    const ua = a.userAgent.toLowerCase();
    if (ua.includes("mobile") || ua.includes("android") || ua.includes("iphone")) {
      deviceCounts.mobile++;
    } else if (ua.includes("windows") || ua.includes("macintosh") || ua.includes("linux")) {
      deviceCounts.desktop++;
    } else {
      deviceCounts.other++;
    }
  });
  const totalDevices = deviceCounts.mobile + deviceCounts.desktop + deviceCounts.other || 1;

  const tabs = [
    { id: "overview", label: "Overview", icon: Gauge },
    { id: "users", label: "User Performance", icon: Users },
    { id: "geo", label: "Geo Locations", icon: Globe },
    { id: "activity", label: "Live Activity", icon: Activity },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
          <Gauge size={24} className="text-gold-500" /> Performance Monitor
        </h1>
        <p className="text-sm text-gray-500">Real-time platform performance, user behavior and geo-location tracking</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setViewMode(t.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
              viewMode === t.id
                ? "bg-navy-800 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-100 shadow-sm"
            }`}
          >
            <t.icon size={16} /> {t.label}
          </button>
        ))}
      </div>

      {/* ============== OVERVIEW ============== */}
      {viewMode === "overview" && (
        <div className="space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Activities</p>
                  <p className="text-2xl font-bold text-navy-900">{total.toLocaleString()}</p>
                </div>
                <div className="bg-blue-500 bg-opacity-10 w-11 h-11 rounded-xl flex items-center justify-center">
                  <Activity size={20} className="text-blue-500" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Users Today</p>
                  <p className="text-2xl font-bold text-navy-900">{uniqueVisitorsToday}</p>
                  <p className="text-xs text-green-600 flex items-center gap-0.5 mt-0.5">
                    <ArrowUpRight size={12} /> +{guestVisitsToday} guests
                  </p>
                </div>
                <div className="bg-green-500 bg-opacity-10 w-11 h-11 rounded-xl flex items-center justify-center">
                  <Users size={20} className="text-green-500" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Geo-Located Users</p>
                  <p className="text-2xl font-bold text-navy-900">{geoUsers.length}</p>
                  <p className="text-xs text-gray-400 mt-0.5">of {users.length} total</p>
                </div>
                <div className="bg-purple-500 bg-opacity-10 w-11 h-11 rounded-xl flex items-center justify-center">
                  <Globe size={20} className="text-purple-500" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Views</p>
                  <p className="text-2xl font-bold text-navy-900">{(stats?.stats?.totalViews || 0).toLocaleString()}</p>
                </div>
                <div className="bg-orange-500 bg-opacity-10 w-11 h-11 rounded-xl flex items-center justify-center">
                  <Eye size={20} className="text-orange-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Pages */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-base font-semibold text-navy-800 mb-4 flex items-center gap-2">
                <Monitor size={18} className="text-blue-500" /> Top Pages Visited
              </h3>
              <div className="space-y-2">
                {topPages.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4">No page data yet</p>
                ) : topPages.map(([pg, count], i) => (
                  <div key={pg} className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-navy-100 flex items-center justify-center text-navy-600 text-[10px] font-bold shrink-0">{i + 1}</span>
                      <span className="text-sm text-gray-700 truncate">{pg}</span>
                    </div>
                    <span className="text-sm font-semibold text-navy-800 shrink-0 ml-2">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Cities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-base font-semibold text-navy-800 mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-gold-500" /> Top Cities
              </h3>
              <div className="space-y-2">
                {topCities.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4">No geo data yet</p>
                ) : topCities.map(([city, count], i) => (
                  <div key={city} className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center text-gold-700 text-[10px] font-bold">{i + 1}</span>
                      <span className="text-sm text-gray-700">{city}</span>
                    </div>
                    <span className="text-sm font-semibold text-navy-800">{count} visits</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Device Breakdown */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-base font-semibold text-navy-800 mb-4 flex items-center gap-2">
                <Smartphone size={18} className="text-emerald-500" /> Device Breakdown
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-gray-600 flex items-center gap-1.5"><Smartphone size={14} /> Mobile</span>
                    <span className="text-sm font-semibold text-navy-800">{deviceCounts.mobile} ({Math.round(deviceCounts.mobile / totalDevices * 100)}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full">
                    <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${(deviceCounts.mobile / totalDevices) * 100}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-gray-600 flex items-center gap-1.5"><Laptop size={14} /> Desktop</span>
                    <span className="text-sm font-semibold text-navy-800">{deviceCounts.desktop} ({Math.round(deviceCounts.desktop / totalDevices * 100)}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full">
                    <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${(deviceCounts.desktop / totalDevices) * 100}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-gray-600 flex items-center gap-1.5"><Monitor size={14} /> Other</span>
                    <span className="text-sm font-semibold text-navy-800">{deviceCounts.other} ({Math.round(deviceCounts.other / totalDevices * 100)}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full">
                    <div className="h-full bg-gray-400 rounded-full transition-all" style={{ width: `${(deviceCounts.other / totalDevices) * 100}%` }} />
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">Based on {activities.length} tracked activities</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============== USER PERFORMANCE ============== */}
      {viewMode === "users" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-navy-800">All Users Performance</h3>
              <p className="text-xs text-gray-500 mt-0.5">Click a user to expand their activity details and geo-location</p>
            </div>
            <div className="divide-y divide-gray-50">
              {users.map((user) => {
                const isExpanded = expandedUser === user.id;
                const userActivities = activities.filter((a) => a.userId === user.id);
                return (
                  <div key={user.id}>
                    <button
                      onClick={() => setExpandedUser(isExpanded ? null : user.id)}
                      className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {user.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-navy-800">{user.name}</p>
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium capitalize ${
                            user.role === "admin" ? "bg-gold-100 text-gold-700" : "bg-gray-100 text-gray-600"
                          }`}>{user.role}</span>
                        </div>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                      <div className="hidden md:flex items-center gap-6 text-xs text-gray-500 shrink-0">
                        <span className="flex items-center gap-1" title="Properties"><Building2 size={13} /> {user._count?.properties || 0}</span>
                        <span className="flex items-center gap-1" title="Inquiries"><Eye size={13} /> {user._count?.inquiries || 0}</span>
                        <span className="flex items-center gap-1" title="Favorites"><TrendingUp size={13} /> {user._count?.favorites || 0}</span>
                        {user.city && (
                          <span className="flex items-center gap-1 text-gold-600"><MapPin size={13} /> {user.city}</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 shrink-0 text-right hidden sm:block">
                        {user.lastLoginAt ? timeAgo(user.lastLoginAt) : "Never"}
                      </div>
                      {isExpanded ? <ChevronUp size={16} className="text-gray-400 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 bg-gray-50">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                          <div className="bg-white rounded-lg p-3">
                            <p className="text-xs text-gray-500">Properties</p>
                            <p className="text-lg font-bold text-navy-900">{user._count?.properties || 0}</p>
                          </div>
                          <div className="bg-white rounded-lg p-3">
                            <p className="text-xs text-gray-500">Inquiries</p>
                            <p className="text-lg font-bold text-navy-900">{user._count?.inquiries || 0}</p>
                          </div>
                          <div className="bg-white rounded-lg p-3">
                            <p className="text-xs text-gray-500">Favorites</p>
                            <p className="text-lg font-bold text-navy-900">{user._count?.favorites || 0}</p>
                          </div>
                          <div className="bg-white rounded-lg p-3">
                            <p className="text-xs text-gray-500">Page Visits</p>
                            <p className="text-lg font-bold text-navy-900">{userActivities.length}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Geo Info */}
                          <div className="bg-white rounded-lg p-4">
                            <h4 className="text-sm font-semibold text-navy-800 mb-2 flex items-center gap-1.5">
                              <Globe size={14} className="text-purple-500" /> Geo-Location
                            </h4>
                            {user.latitude ? (
                              <div className="space-y-1.5 text-sm">
                                <p className="text-gray-600">
                                  <span className="text-gray-400">City:</span>{" "}
                                  <span className="font-medium">{user.city || "Unknown"}{user.state ? `, ${user.state}` : ""}</span>
                                </p>
                                <p className="text-gray-600">
                                  <span className="text-gray-400">Coordinates:</span>{" "}
                                  <span className="font-mono text-xs">{user.latitude.toFixed(6)}, {user.longitude.toFixed(6)}</span>
                                </p>
                                <a
                                  href={`https://www.google.com/maps?q=${user.latitude},${user.longitude}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs font-medium mt-1"
                                >
                                  <ExternalLink size={12} /> View on Google Maps
                                </a>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-400">Location not available</p>
                            )}
                          </div>

                          {/* Login Info */}
                          <div className="bg-white rounded-lg p-4">
                            <h4 className="text-sm font-semibold text-navy-800 mb-2 flex items-center gap-1.5">
                              <Clock size={14} className="text-blue-500" /> Login Details
                            </h4>
                            <div className="space-y-1.5 text-sm">
                              <p className="text-gray-600">
                                <span className="text-gray-400">Last Login:</span>{" "}
                                <span className="font-medium">{user.lastLoginAt ? formatDate(user.lastLoginAt) : "Never"}</span>
                              </p>
                              <p className="text-gray-600">
                                <span className="text-gray-400">Last IP:</span>{" "}
                                <span className="font-mono text-xs">{user.lastLoginIp || "N/A"}</span>
                              </p>
                              <p className="text-gray-600">
                                <span className="text-gray-400">Joined:</span>{" "}
                                <span className="font-medium">{formatDate(user.createdAt)}</span>
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Recent Activity for this user */}
                        {userActivities.length > 0 && (
                          <div className="mt-4 bg-white rounded-lg p-4">
                            <h4 className="text-sm font-semibold text-navy-800 mb-2">Recent Activity</h4>
                            <div className="space-y-1">
                              {userActivities.slice(0, 5).map((act) => (
                                <div key={act.id} className="flex items-center justify-between text-xs py-1.5 border-b border-gray-50 last:border-0">
                                  <div className="flex items-center gap-2">
                                    <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded">{act.action}</span>
                                    <span className="text-gray-500">{act.page}</span>
                                  </div>
                                  <div className="flex items-center gap-3 text-gray-400">
                                    {act.city && <span className="flex items-center gap-0.5"><MapPin size={10} /> {act.city}</span>}
                                    <span>{timeAgo(act.createdAt)}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============== GEO LOCATIONS ============== */}
      {viewMode === "geo" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 bg-opacity-10 w-10 h-10 rounded-lg flex items-center justify-center">
                  <MapPin size={20} className="text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Located Users</p>
                  <p className="text-xl font-bold text-navy-900">{geoUsers.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500 bg-opacity-10 w-10 h-10 rounded-lg flex items-center justify-center">
                  <Activity size={20} className="text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Geo-Located Visits</p>
                  <p className="text-xl font-bold text-navy-900">{geoLocatedActivities.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-gold-500 bg-opacity-10 w-10 h-10 rounded-lg flex items-center justify-center">
                  <Globe size={20} className="text-gold-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cities Detected</p>
                  <p className="text-xl font-bold text-navy-900">{Object.keys(cityCounts).length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* User Locations Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-navy-800">User Locations</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">City</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Coordinates</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Last Login</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Map</th>
                  </tr>
                </thead>
                <tbody>
                  {geoUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-navy-800 flex items-center justify-center text-white text-xs font-bold">
                            {user.name[0]}
                          </div>
                          <div>
                            <p className="font-medium text-navy-800 text-sm">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="flex items-center gap-1 text-gray-700">
                          <MapPin size={14} className="text-gold-500" />
                          {user.city || "Unknown"}{user.state ? `, ${user.state}` : ""}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-gray-500">
                        {user.latitude.toFixed(6)}, {user.longitude.toFixed(6)}
                      </td>
                      <td className="py-3 px-4 text-xs text-gray-400">
                        {user.lastLoginAt ? timeAgo(user.lastLoginAt) : "Never"}
                      </td>
                      <td className="py-3 px-4">
                        <a
                          href={`https://www.google.com/maps?q=${user.latitude},${user.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
                        >
                          <ExternalLink size={12} /> View
                        </a>
                      </td>
                    </tr>
                  ))}
                  {geoUsers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-400">
                        No geo-located users found. Location data is collected when users allow browser geolocation.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Locations */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-navy-800">Recent Geo-Located Activity</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Page</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">City</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Coordinates</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Time</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Map</th>
                  </tr>
                </thead>
                <tbody>
                  {geoLocatedActivities.slice(0, 20).map((a) => (
                    <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-2 px-4 text-navy-800">{a.user?.name || "Guest"}</td>
                      <td className="py-2 px-4 text-gray-500">{a.page}</td>
                      <td className="py-2 px-4">
                        {a.city ? (
                          <span className="flex items-center gap-1 text-gray-700"><MapPin size={12} className="text-gold-500" /> {a.city}</span>
                        ) : "-"}
                      </td>
                      <td className="py-2 px-4 font-mono text-xs text-gray-400">
                        {a.latitude.toFixed(4)}, {a.longitude.toFixed(4)}
                      </td>
                      <td className="py-2 px-4 text-xs text-gray-400">{timeAgo(a.createdAt)}</td>
                      <td className="py-2 px-4">
                        <a
                          href={`https://www.google.com/maps?q=${a.latitude},${a.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink size={14} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============== LIVE ACTIVITY ============== */}
      {viewMode === "activity" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
              <h3 className="font-semibold text-navy-800">All Platform Activity</h3>
              <span className="text-xs text-gray-400">{total} total events</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Action</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Page</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Location</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">IP</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Device</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((a) => {
                    const ua = (a.userAgent || "").toLowerCase();
                    const isMobile = ua.includes("mobile") || ua.includes("android") || ua.includes("iphone");
                    return (
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
                        <td className="py-2 px-4 text-gray-500 max-w-[150px] truncate">{a.page || "-"}</td>
                        <td className="py-2 px-4 text-xs">
                          {a.city ? (
                            <span className="flex items-center gap-1 text-gray-600"><MapPin size={11} className="text-gold-500" /> {a.city}</span>
                          ) : a.latitude ? (
                            <span className="text-gray-400 font-mono">{a.latitude.toFixed(2)}°, {a.longitude.toFixed(2)}°</span>
                          ) : <span className="text-gray-300">-</span>}
                        </td>
                        <td className="py-2 px-4 text-[10px] text-gray-400 font-mono">{a.ip?.split(",")[0] || "-"}</td>
                        <td className="py-2 px-4">
                          {isMobile ? (
                            <Smartphone size={14} className="text-emerald-500" />
                          ) : (
                            <Laptop size={14} className="text-blue-500" />
                          )}
                        </td>
                        <td className="py-2 px-4 text-xs text-gray-400 whitespace-nowrap">
                          {timeAgo(a.createdAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {activities.length === 0 && (
              <div className="p-12 text-center text-gray-500">No activity recorded yet</div>
            )}
            <div className="p-4 border-t flex justify-between items-center">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium disabled:opacity-50 transition-colors">
                Previous
              </button>
              <span className="text-sm text-gray-500">Page {page}</span>
              <button onClick={() => setPage(page + 1)} disabled={activities.length < 50}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium disabled:opacity-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
