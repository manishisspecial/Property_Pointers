"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { formatPrice, timeAgo } from "@/lib/utils";
import {
  Building2, Heart, MessageCircle, Eye, Plus, Trash2,
  MapPin, CheckCircle, TrendingUp, Search, Calculator,
  BookOpen, ArrowRight, Clock, Home, Landmark, Star,
  Settings, Lock, AlertCircle, CheckCircle as CheckCircleIcon
} from "lucide-react";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [tab, setTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    const urlTab = searchParams.get("tab");
    if (urlTab) setTab(urlTab);
  }, [searchParams]);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        router.push("/auth/login");
        return;
      }
      const data = await res.json();
      setUser(data.user);
      await Promise.all([fetchProperties(data.user.userId), fetchFavorites(), fetchInquiries()]);
    } catch {
      router.push("/auth/login");
    }
    setLoading(false);
  }

  async function fetchProperties(userId: string) {
    try {
      const res = await fetch(`/api/properties?ownerId=${userId}&limit=50`);
      const data = await res.json();
      setProperties(data.properties || []);
    } catch {}
  }

  async function fetchFavorites() {
    try {
      const res = await fetch("/api/favorites");
      const data = await res.json();
      setFavorites(data.favorites || []);
    } catch {}
  }

  async function fetchInquiries() {
    try {
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      setInquiries(data.inquiries || []);
    } catch {}
  }

  async function deleteProperty(id: string) {
    if (!confirm("Are you sure you want to delete this property?")) return;
    try {
      await fetch(`/api/properties/${id}`, { method: "DELETE" });
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch {}
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordMsg(null);
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "New passwords do not match" });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMsg({ type: "error", text: "Password must be at least 6 characters" });
      return;
    }
    setChangingPassword(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPasswordMsg({ type: "error", text: data.error });
      } else {
        setPasswordMsg({ type: "success", text: "Password updated successfully!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch {
      setPasswordMsg({ type: "error", text: "Something went wrong" });
    }
    setChangingPassword(false);
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const totalViews = properties.reduce((acc, p) => acc + (p.views || 0), 0);
  const activeListings = properties.filter((p) => p.status === "active").length;
  const pendingInquiries = inquiries.filter((i: any) => i.status === "pending").length;

  const statCards = [
    { label: "My Properties", value: properties.length, icon: Building2, color: "bg-blue-500", href: "?tab=properties" },
    { label: "Active Listings", value: activeListings, icon: CheckCircle, color: "bg-green-500", href: "?tab=properties" },
    { label: "Total Views", value: totalViews, icon: Eye, color: "bg-purple-500", href: "?tab=properties" },
    { label: "Saved Properties", value: favorites.length, icon: Heart, color: "bg-red-500", href: "?tab=favorites" },
    { label: "Total Inquiries", value: inquiries.length, icon: MessageCircle, color: "bg-amber-500", href: "?tab=inquiries" },
    { label: "Pending Replies", value: pendingInquiries, icon: Clock, color: "bg-orange-500", href: "?tab=inquiries" },
  ];

  const quickActions = [
    { label: "Post New Property", icon: Plus, href: "/post-property", color: "bg-gold-500 hover:bg-gold-600 text-white", desc: "List your property for free" },
    { label: "Browse Properties", icon: Search, href: "/properties", color: "bg-navy-800 hover:bg-navy-700 text-white", desc: "Find your dream property" },
    { label: "New Projects", icon: Landmark, href: "/projects", color: "bg-emerald-600 hover:bg-emerald-700 text-white", desc: "Explore upcoming projects" },
    { label: "EMI Calculator", icon: Calculator, href: "/calculator", color: "bg-blue-600 hover:bg-blue-700 text-white", desc: "Plan your home loan" },
    { label: "Read Blog", icon: BookOpen, href: "/blog", color: "bg-purple-600 hover:bg-purple-700 text-white", desc: "Real estate tips & news" },
    { label: "Go to Home", icon: Home, href: "/", color: "bg-gray-700 hover:bg-gray-800 text-white", desc: "Visit the main website" },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "properties", label: "My Properties", icon: Building2, count: properties.length },
    { id: "favorites", label: "Favorites", icon: Heart, count: favorites.length },
    { id: "inquiries", label: "Inquiries", icon: MessageCircle, count: inquiries.length },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-navy-800 to-navy-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {user?.name?.[0] || "U"}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-navy-900">{user?.name}</h1>
                <p className="text-gray-500 text-sm">{user?.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-block px-2 py-0.5 bg-gold-100 text-gold-700 text-xs rounded-full font-medium capitalize">
                    {user?.role}
                  </span>
                  <span className="text-xs text-gray-400">
                    Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                  </span>
                </div>
              </div>
            </div>
            <Link href="/post-property" className="btn-primary flex items-center gap-2 w-fit">
              <Plus size={18} /> Post New Property
            </Link>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                tab === t.id
                  ? "bg-navy-800 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100 shadow-sm"
              }`}
            >
              <t.icon size={16} />
              {t.label}
              {t.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  tab === t.id ? "bg-white/20" : "bg-gray-100"
                }`}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {tab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {statCards.map((card) => (
                <Link
                  key={card.label}
                  href={card.href}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className={`${card.color} bg-opacity-10 w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <card.icon size={20} className={card.color.replace("bg-", "text-")} />
                  </div>
                  <p className="text-2xl font-bold text-navy-900">{(card.value || 0).toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-lg font-semibold text-navy-800 mb-4 flex items-center gap-2">
                <Star size={20} className="text-gold-500" /> Quick Actions
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className={`${action.color} rounded-xl p-4 transition-all group text-center`}
                  >
                    <action.icon size={24} className="mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-semibold">{action.label}</p>
                    <p className="text-[11px] opacity-75 mt-0.5 hidden sm:block">{action.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Properties & Inquiries Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Properties */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-navy-800 flex items-center gap-2">
                    <Building2 size={20} className="text-blue-500" /> Recent Properties
                  </h3>
                  {properties.length > 0 && (
                    <button onClick={() => setTab("properties")} className="text-sm text-gold-600 font-medium hover:text-gold-700 flex items-center gap-1">
                      View All <ArrowRight size={14} />
                    </button>
                  )}
                </div>
                {properties.length === 0 ? (
                  <div className="text-center py-8">
                    <Building2 size={36} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-sm text-gray-500 mb-3">No properties yet</p>
                    <Link href="/post-property" className="text-sm text-gold-600 font-medium hover:text-gold-700">
                      Post your first property
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {properties.slice(0, 4).map((p) => (
                      <Link key={p.id} href={`/properties/${p.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                          {JSON.parse(p.images || "[]")[0] ? (
                            <img src={JSON.parse(p.images)[0]} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center"><Building2 size={18} className="text-gray-400" /></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-navy-800 truncate">{p.title}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={10} /> {p.locality}, {p.city}</p>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-xs font-bold text-navy-800">{formatPrice(p.price)}</span>
                            <span className="text-xs text-gray-400 flex items-center gap-0.5"><Eye size={10} /> {p.views}</span>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium shrink-0 ${
                          p.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                        }`}>{p.status}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Inquiries */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-navy-800 flex items-center gap-2">
                    <MessageCircle size={20} className="text-amber-500" /> Recent Inquiries
                  </h3>
                  {inquiries.length > 0 && (
                    <button onClick={() => setTab("inquiries")} className="text-sm text-gold-600 font-medium hover:text-gold-700 flex items-center gap-1">
                      View All <ArrowRight size={14} />
                    </button>
                  )}
                </div>
                {inquiries.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle size={36} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-sm text-gray-500 mb-3">No inquiries yet</p>
                    <Link href="/properties" className="text-sm text-gold-600 font-medium hover:text-gold-700">
                      Browse properties
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {inquiries.slice(0, 5).map((inq: any) => (
                      <div key={inq.id} className="flex items-start justify-between gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="min-w-0">
                          <Link href={`/properties/${inq.propertyId}`} className="text-sm font-medium text-navy-800 hover:text-gold-600 truncate block">
                            {inq.property?.title || "Property"}
                          </Link>
                          <p className="text-xs text-gray-500 truncate mt-0.5">{inq.message}</p>
                          <p className="text-[10px] text-gray-400 mt-1">{timeAgo(inq.createdAt)}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium shrink-0 ${
                          inq.status === "pending" ? "bg-yellow-100 text-yellow-700" : inq.status === "responded" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                        }`}>{inq.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Saved Properties */}
            {favorites.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-navy-800 flex items-center gap-2">
                    <Heart size={20} className="text-red-500" /> Saved Properties
                  </h3>
                  <button onClick={() => setTab("favorites")} className="text-sm text-gold-600 font-medium hover:text-gold-700 flex items-center gap-1">
                    View All <ArrowRight size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {favorites.slice(0, 3).map((f: any) => (
                    <Link key={f.id} href={`/properties/${f.property.id}`} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-gold-200 hover:shadow-sm transition-all">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                        {JSON.parse(f.property.images || "[]")[0] && (
                          <img src={JSON.parse(f.property.images)[0]} alt="" className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-navy-800 truncate">{f.property.title}</p>
                        <p className="text-xs text-gray-500">{f.property.city}</p>
                        <p className="text-sm font-bold text-navy-800 mt-0.5">{formatPrice(f.property.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Properties Tab */}
        {tab === "properties" && (
          <div className="space-y-4">
            {properties.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <Building2 size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Properties Listed</h3>
                <p className="text-gray-500 mb-6">Start listing your properties to reach millions of buyers</p>
                <Link href="/post-property" className="btn-primary inline-flex items-center gap-2">
                  <Plus size={18} /> Post Your First Property
                </Link>
              </div>
            ) : (
              properties.map((p) => (
                <div key={p.id} className="bg-white rounded-xl shadow-sm p-4 flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                    {JSON.parse(p.images || "[]")[0] ? (
                      <img src={JSON.parse(p.images)[0]} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><Building2 size={32} className="text-gray-400" /></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link href={`/properties/${p.id}`} className="text-lg font-semibold text-navy-800 hover:text-gold-600">{p.title}</Link>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><MapPin size={14} /> {p.locality}, {p.city}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        p.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                      }`}>{p.status}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                      <span className="font-bold text-navy-800">{formatPrice(p.price)}</span>
                      <span className="flex items-center gap-1"><Eye size={14} /> {p.views} views</span>
                      <span>{timeAgo(p.createdAt)}</span>
                      {p.verified && <span className="flex items-center gap-1 text-green-600"><CheckCircle size={14} /> Verified</span>}
                    </div>
                  </div>
                  <div className="flex md:flex-col gap-2">
                    <button onClick={() => deleteProperty(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Favorites Tab */}
        {tab === "favorites" && (
          <div className="space-y-4">
            {favorites.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Favorites Yet</h3>
                <p className="text-gray-500 mb-6">Save properties you like while browsing</p>
                <Link href="/properties" className="btn-primary">Browse Properties</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favorites.map((f: any) => (
                  <Link key={f.id} href={`/properties/${f.property.id}`}
                    className="bg-white rounded-xl shadow-sm p-4 flex gap-4 hover:shadow-md transition-shadow">
                    <div className="w-28 h-24 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                      {JSON.parse(f.property.images || "[]")[0] && (
                        <img src={JSON.parse(f.property.images)[0]} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-navy-800 truncate">{f.property.title}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5"><MapPin size={12} /> {f.property.city}</p>
                      <p className="font-bold text-navy-800 mt-2">{formatPrice(f.property.price)}</p>
                      <p className="text-xs text-gray-400 mt-1 capitalize">{f.property.type} &middot; {f.property.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Inquiries Tab */}
        {tab === "inquiries" && (
          <div className="space-y-4">
            {inquiries.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <MessageCircle size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Inquiries Yet</h3>
                <p className="text-gray-500">Your sent inquiries will appear here</p>
              </div>
            ) : (
              inquiries.map((inq: any) => (
                <div key={inq.id} className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <Link href={`/properties/${inq.propertyId}`} className="font-semibold text-navy-800 hover:text-gold-600">
                        {inq.property?.title || "Property"}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">{inq.message}</p>
                      <p className="text-xs text-gray-400 mt-2 flex items-center gap-1"><Clock size={12} /> {timeAgo(inq.createdAt)}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium shrink-0 ${
                      inq.status === "pending" ? "bg-yellow-100 text-yellow-700" : inq.status === "responded" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                    }`}>{inq.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Settings Tab */}
        {tab === "settings" && (
          <div className="max-w-2xl space-y-6">
            {/* Change Password */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-navy-800 flex items-center gap-2 mb-4">
                <Lock size={20} className="text-gold-500" /> Change Password
              </h3>
              <form onSubmit={handleChangePassword} className="space-y-4">
                {passwordMsg && (
                  <div className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm ${
                    passwordMsg.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
                  }`}>
                    {passwordMsg.type === "success" ? <CheckCircleIcon size={16} /> : <AlertCircle size={16} />}
                    {passwordMsg.text}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="input-field"
                    placeholder="Enter current password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="input-field"
                    placeholder="Minimum 6 characters"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-field"
                    placeholder="Re-enter new password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={changingPassword}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  {changingPassword ? "Updating..." : "Update Password"}
                </button>
              </form>
            </div>

            {/* Account Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-navy-800 mb-4">Account Information</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Name</span>
                  <span className="text-sm font-medium text-navy-800">{user?.name}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Email</span>
                  <span className="text-sm font-medium text-navy-800">{user?.email}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Role</span>
                  <span className="text-sm font-medium text-navy-800 capitalize">{user?.role}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-500">Member Since</span>
                  <span className="text-sm font-medium text-navy-800">
                    {new Date(user?.createdAt || Date.now()).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
