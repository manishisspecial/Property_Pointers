"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPrice, timeAgo } from "@/lib/utils";
import {
  Building2, Heart, MessageCircle, Eye, Plus, Edit, Trash2,
  MapPin, AlertCircle, CheckCircle, User, Settings, LogOut
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [tab, setTab] = useState("properties");
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const tabs = [
    { id: "properties", label: "My Properties", icon: Building2, count: properties.length },
    { id: "favorites", label: "Favorites", icon: Heart, count: favorites.length },
    { id: "inquiries", label: "Inquiries", icon: MessageCircle, count: inquiries.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-navy-800 to-navy-600 flex items-center justify-center text-white text-2xl font-bold">
                {user?.name?.[0] || "U"}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-navy-900">{user?.name}</h1>
                <p className="text-gray-500 text-sm">{user?.email}</p>
                <span className="inline-block px-2 py-0.5 bg-gold-100 text-gold-700 text-xs rounded-full font-medium mt-1 capitalize">{user?.role}</span>
              </div>
            </div>
            <Link href="/post-property" className="btn-primary flex items-center gap-2 w-fit">
              <Plus size={18} /> Post New Property
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all ${
                  tab === t.id ? "bg-navy-800 text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}>
                <t.icon size={16} /> {t.label} <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{t.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
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
              favorites.map((f: any) => (
                <Link key={f.id} href={`/properties/${f.property.id}`}
                  className="bg-white rounded-xl shadow-sm p-4 flex gap-4 hover:shadow-md transition-shadow block">
                  <div className="w-24 h-20 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                    {JSON.parse(f.property.images || "[]")[0] && (
                      <img src={JSON.parse(f.property.images)[0]} alt="" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-800">{f.property.title}</h3>
                    <p className="text-sm text-gray-500">{f.property.city}</p>
                    <p className="font-bold text-navy-800 mt-1">{formatPrice(f.property.price)}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}

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
                    <div>
                      <Link href={`/properties/${inq.propertyId}`} className="font-semibold text-navy-800 hover:text-gold-600">
                        {inq.property?.title || "Property"}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">{inq.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{timeAgo(inq.createdAt)}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      inq.status === "pending" ? "bg-yellow-100 text-yellow-700" : inq.status === "responded" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                    }`}>{inq.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
