"use client";

import { useState, useEffect } from "react";
import { formatDate, timeAgo } from "@/lib/utils";
import { Users, MapPin, Shield, Building2, Heart, MessageCircle, Clock, Globe } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState("");

  useEffect(() => { fetchUsers(); }, [roleFilter]);

  async function fetchUsers() {
    setLoading(true);
    const params = new URLSearchParams();
    if (roleFilter) params.set("role", roleFilter);

    try {
      const res = await fetch(`/api/admin/users?${params.toString()}`);
      const data = await res.json();
      setUsers(data.users || []);
      setTotal(data.total || 0);
    } catch {}
    setLoading(false);
  }

  async function updateUser(id: string, updates: Record<string, unknown>) {
    try {
      await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });
      fetchUsers();
    } catch {}
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Manage Users</h1>
          <p className="text-sm text-gray-500">{total} registered users</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 flex gap-3">
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
          <option value="">All Roles</option>
          <option value="user">Users</option>
          <option value="owner">Owners</option>
          <option value="agent">Agents</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Location</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Activity</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Last Login</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Joined</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-navy-800 flex items-center justify-center text-white text-sm font-bold">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-navy-800">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                        {user.phone && <p className="text-xs text-gray-400">{user.phone}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${
                      user.role === "admin" ? "bg-gold-100 text-gold-700" :
                      user.role === "owner" ? "bg-blue-100 text-blue-700" :
                      user.role === "agent" ? "bg-purple-100 text-purple-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>{user.role}</span>
                    {user.verified && <Shield size={12} className="inline text-green-500 ml-1" />}
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-xs">
                    {user.city ? (
                      <span className="flex items-center gap-1"><MapPin size={12} /> {user.city}, {user.state}</span>
                    ) : user.latitude ? (
                      <span className="flex items-center gap-1"><Globe size={12} /> {user.latitude.toFixed(2)}°, {user.longitude.toFixed(2)}°</span>
                    ) : "-"}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1" title="Properties"><Building2 size={12} /> {user._count?.properties || 0}</span>
                      <span className="flex items-center gap-1" title="Inquiries"><MessageCircle size={12} /> {user._count?.inquiries || 0}</span>
                      <span className="flex items-center gap-1" title="Favorites"><Heart size={12} /> {user._count?.favorites || 0}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-400">
                    {user.lastLoginAt ? (
                      <div>
                        <p>{timeAgo(user.lastLoginAt)}</p>
                        {user.lastLoginIp && <p className="text-[10px]">IP: {user.lastLoginIp}</p>}
                      </div>
                    ) : "Never"}
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-400">{formatDate(user.createdAt)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <select
                        value={user.role}
                        onChange={(e) => updateUser(user.id, { role: e.target.value })}
                        className="px-2 py-1 border border-gray-200 rounded text-xs"
                      >
                        <option value="user">User</option>
                        <option value="owner">Owner</option>
                        <option value="agent">Agent</option>
                        <option value="admin">Admin</option>
                      </select>
                      <button
                        onClick={() => updateUser(user.id, { verified: !user.verified })}
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          user.verified ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                        }`}
                      >
                        {user.verified ? "Unverify" : "Verify"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {users.length === 0 && !loading && (
          <div className="p-12 text-center text-gray-500">No users found</div>
        )}
      </div>
    </div>
  );
}
