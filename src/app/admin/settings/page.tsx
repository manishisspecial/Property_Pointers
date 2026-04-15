"use client";

import { useEffect, useState } from "react";
import { Save, CheckCircle, Globe, Mail, Phone, MapPin, Loader2, Users } from "lucide-react";

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  maintenanceMode: boolean;
  activeVisitorsDisplay: "exact" | "manual";
  manualActiveVisitors: number;
}

const EMPTY: SiteSettings = {
  siteName: "",
  siteDescription: "",
  contactEmail: "",
  contactPhone: "",
  address: "",
  facebook: "",
  twitter: "",
  instagram: "",
  linkedin: "",
  maintenanceMode: false,
  activeVisitorsDisplay: "exact",
  manualActiveVisitors: 20,
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings({
          siteName: data.siteName ?? "",
          siteDescription: data.siteDescription ?? "",
          contactEmail: data.contactEmail ?? "",
          contactPhone: data.contactPhone ?? "",
          address: data.address ?? "",
          facebook: data.facebook ?? "",
          twitter: data.twitter ?? "",
          instagram: data.instagram ?? "",
          linkedin: data.linkedin ?? "",
          maintenanceMode: data.maintenanceMode ?? false,
          activeVisitorsDisplay: data.activeVisitorsDisplay === "manual" ? "manual" : "exact",
          manualActiveVisitors:
            typeof data.manualActiveVisitors === "number" && !Number.isNaN(data.manualActiveVisitors)
              ? data.manualActiveVisitors
              : 20,
        });
      })
      .catch(() => setStatus({ ok: false, text: "Failed to load settings" }))
      .finally(() => setLoading(false));
  }, []);

  function update(field: keyof SiteSettings, value: string | boolean | number) {
    setSettings((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Save failed");
      }
      setStatus({ ok: true, text: "Settings saved successfully!" });
      setTimeout(() => setStatus(null), 4000);
    } catch (e: unknown) {
      setStatus({ ok: false, text: e instanceof Error ? e.message : "Save failed" });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400 gap-2">
        <Loader2 size={20} className="animate-spin" /> Loading settings…
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Site Settings</h1>
        <p className="text-sm text-gray-500">Manage your platform configuration — changes are saved to the database</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-navy-800 flex items-center gap-2">
          <Globe size={20} className="text-gold-500" /> General Settings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Site Name</label>
            <input type="text" value={settings.siteName} onChange={(e) => update("siteName", e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Site Description</label>
            <input type="text" value={settings.siteDescription} onChange={(e) => update("siteDescription", e.target.value)} className="input-field" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1"><Mail size={14} /> Contact Email</label>
            <input type="email" value={settings.contactEmail} onChange={(e) => update("contactEmail", e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1"><Phone size={14} /> Contact Phone</label>
            <input type="tel" value={settings.contactPhone} onChange={(e) => update("contactPhone", e.target.value)} className="input-field" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1"><MapPin size={14} /> Office Address</label>
          <input type="text" value={settings.address} onChange={(e) => update("address", e.target.value)} className="input-field" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-semibold text-navy-800">Social Media</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(["facebook", "twitter", "instagram", "linkedin"] as const).map((social) => (
            <div key={social}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 capitalize">{social}</label>
              <input type="url" value={settings[social]} onChange={(e) => update(social, e.target.value)}
                className="input-field" placeholder={`https://${social}.com/propertypointers`} />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
        <h3 className="text-lg font-semibold text-navy-800 flex items-center gap-2">
          <Users size={20} className="text-gold-500" /> Home page — “Browsing right now”
        </h3>
        <p className="text-sm text-gray-500">
          Controls the number shown in the hero stats on the public home page (unique visitors in the last 15 minutes, or a number you set).
        </p>
        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="radio"
              name="activeVisitorsDisplay"
              className="mt-1"
              checked={settings.activeVisitorsDisplay === "exact"}
              onChange={() => update("activeVisitorsDisplay", "exact")}
            />
            <span>
              <span className="font-medium text-navy-800 group-hover:text-navy-900">Exact count</span>
              <span className="block text-sm text-gray-500">
                Show the real-time unique visitor count from activity logs (last 15 minutes). Optional env{" "}
                <code className="text-xs bg-gray-100 px-1 rounded">ACTIVE_VISITORS_FLOOR</code> still applies as a minimum when traffic is low.
              </span>
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="radio"
              name="activeVisitorsDisplay"
              className="mt-1"
              checked={settings.activeVisitorsDisplay === "manual"}
              onChange={() => update("activeVisitorsDisplay", "manual")}
            />
            <span>
              <span className="font-medium text-navy-800 group-hover:text-navy-900">Manual number</span>
              <span className="block text-sm text-gray-500">
                Always show the number you enter below (e.g. 20). Ignores live traffic and the floor env variable.
              </span>
            </span>
          </label>
        </div>
        {settings.activeVisitorsDisplay === "manual" && (
          <div className="pl-7 pt-1">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Displayed count</label>
            <input
              type="number"
              min={0}
              max={9999999}
              value={settings.manualActiveVisitors}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                update("manualActiveVisitors", Number.isFinite(v) ? Math.min(9_999_999, Math.max(0, v)) : 0);
              }}
              className="input-field max-w-xs"
            />
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-semibold text-navy-800">System</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-navy-800">Maintenance Mode</p>
            <p className="text-sm text-gray-500">Temporarily disable the site for users</p>
          </div>
          <button
            onClick={() => update("maintenanceMode", !settings.maintenanceMode)}
            className={`relative w-14 h-7 rounded-full transition-colors ${
              settings.maintenanceMode ? "bg-red-500" : "bg-gray-300"
            }`}
          >
            <span className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
              settings.maintenanceMode ? "translate-x-7" : "translate-x-0.5"
            }`} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2">
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {saving ? "Saving…" : "Save Settings"}
        </button>
        {status && (
          <span className={`flex items-center gap-1 text-sm ${status.ok ? "text-green-600" : "text-red-600"}`}>
            {status.ok && <CheckCircle size={16} />} {status.text}
          </span>
        )}
      </div>
    </div>
  );
}
