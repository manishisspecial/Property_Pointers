"use client";

import { useState } from "react";
import { Settings, Save, CheckCircle, Globe, Mail, Phone, MapPin } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "Property Pointers",
    siteDescription: "India's #1 Real Estate Platform",
    contactEmail: "info@propertypointers.com",
    contactPhone: "+91-9876543210",
    address: "Sector 62, Noida, Uttar Pradesh, India",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    maintenanceMode: false,
  });
  const [saved, setSaved] = useState(false);

  function update(field: string, value: string | boolean) {
    setSettings((prev) => ({ ...prev, [field]: value }));
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Site Settings</h1>
        <p className="text-sm text-gray-500">Manage your platform configuration</p>
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
          {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
            <div key={social}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 capitalize">{social}</label>
              <input type="url" value={(settings as any)[social]} onChange={(e) => update(social, e.target.value)}
                className="input-field" placeholder={`https://${social}.com/propertypointers`} />
            </div>
          ))}
        </div>
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
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <Save size={18} /> Save Settings
        </button>
        {saved && (
          <span className="flex items-center gap-1 text-green-600 text-sm">
            <CheckCircle size={16} /> Settings saved successfully!
          </span>
        )}
      </div>
    </div>
  );
}
