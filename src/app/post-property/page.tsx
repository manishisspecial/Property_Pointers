"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Building2, MapPin, IndianRupee, Bed, Bath, Maximize, ArrowRight, ArrowLeft,
  CheckCircle, Image as ImageIcon, Sparkles, Plus, X, Upload, Loader2
} from "lucide-react";

const AMENITIES = [
  "Parking", "Lift", "Security", "Power Backup", "Water Supply", "Gym",
  "Swimming Pool", "Club House", "Garden", "Children Play Area", "CCTV",
  "Fire Safety", "Intercom", "Gas Pipeline", "Rain Water Harvesting",
  "Waste Management", "Visitor Parking", "Jogging Track", "Indoor Games",
  "Meditation Area", "EV Charging", "Solar Panels", "Wi-Fi", "Air Conditioning",
];

const STEPS = [
  { title: "Basic Info", desc: "Property type & category" },
  { title: "Details", desc: "Rooms, area & features" },
  { title: "Location", desc: "Address & map" },
  { title: "Media", desc: "Images & amenities" },
  { title: "Review", desc: "Confirm & publish" },
];

export default function PostPropertyPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "", description: "", price: "", type: "sale", category: "apartment",
    bedrooms: "", bathrooms: "", balconies: "", area: "", areaUnit: "sqft",
    floor: "", totalFloors: "", facing: "", furnishing: "", age: "",
    address: "", locality: "", city: "", state: "", pincode: "",
    latitude: "", longitude: "", images: [] as string[], amenities: [] as string[],
    ownerType: "owner",
  });

  function update(field: string, value: string | string[]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleAmenity(amenity: string) {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  }

  function removeImage(index: number) {
    update("images", form.images.filter((_, i) => i !== index));
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/dashboard"), 2000);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to post property. Please login first.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-navy-900 mb-2">Property Listed Successfully!</h2>
          <p className="text-gray-500">Your property will be reviewed and published shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-navy-900 mb-2">Post Your Property</h1>
          <p className="text-gray-500">List your property for FREE and reach millions of buyers</p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  i <= step ? "bg-gold-500 text-white" : "bg-gray-200 text-gray-500"
                }`}>
                  {i < step ? <CheckCircle size={18} /> : i + 1}
                </div>
                <span className={`text-xs mt-1 hidden md:block ${i <= step ? "text-gold-600 font-medium" : "text-gray-400"}`}>{s.title}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-12 md:w-20 h-0.5 mx-1 ${i < step ? "bg-gold-500" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          {/* Step 0: Basic Info */}
          {step === 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-navy-800 mb-4">Basic Information</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">I want to</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "sale", label: "Sell" },
                    { value: "rent", label: "Rent / Lease" },
                    { value: "pg", label: "PG / Hostel" },
                  ].map((t) => (
                    <button key={t.value} type="button" onClick={() => update("type", t.value)}
                      className={`py-3 rounded-xl font-medium text-sm border-2 transition-all ${
                        form.type === t.value ? "border-gold-500 bg-gold-50 text-gold-700" : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Category</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: "apartment", label: "Apartment" },
                    { value: "house", label: "Independent House" },
                    { value: "villa", label: "Villa" },
                    { value: "plot", label: "Plot / Land" },
                    { value: "commercial", label: "Commercial" },
                    { value: "office", label: "Office Space" },
                    { value: "shop", label: "Shop / Retail" },
                    { value: "other", label: "Other" },
                  ].map((c) => (
                    <button key={c.value} type="button" onClick={() => update("category", c.value)}
                      className={`py-3 rounded-xl font-medium text-sm border-2 transition-all ${
                        form.category === c.value ? "border-gold-500 bg-gold-50 text-gold-700" : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}>
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">I am</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "owner", label: "Owner" },
                    { value: "agent", label: "Agent" },
                    { value: "builder", label: "Builder" },
                  ].map((r) => (
                    <button key={r.value} type="button" onClick={() => update("ownerType", r.value)}
                      className={`py-3 rounded-xl font-medium text-sm border-2 transition-all ${
                        form.ownerType === r.value ? "border-gold-500 bg-gold-50 text-gold-700" : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}>
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Property Title</label>
                <input type="text" value={form.title} onChange={(e) => update("title", e.target.value)} className="input-field" placeholder="e.g., 3BHK Apartment in Sector 150, Noida" />
              </div>
            </div>
          )}

          {/* Step 1: Details */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-navy-800 mb-4">Property Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Bedrooms</label>
                  <input type="number" value={form.bedrooms} onChange={(e) => update("bedrooms", e.target.value)} className="input-field" placeholder="e.g., 3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Bathrooms</label>
                  <input type="number" value={form.bathrooms} onChange={(e) => update("bathrooms", e.target.value)} className="input-field" placeholder="e.g., 2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Balconies</label>
                  <input type="number" value={form.balconies} onChange={(e) => update("balconies", e.target.value)} className="input-field" placeholder="e.g., 2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Area</label>
                  <input type="number" value={form.area} onChange={(e) => update("area", e.target.value)} className="input-field" placeholder="e.g., 1200" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Area Unit</label>
                  <select value={form.areaUnit} onChange={(e) => update("areaUnit", e.target.value)} className="input-field">
                    <option value="sqft">Sq. Ft.</option>
                    <option value="sqm">Sq. M.</option>
                    <option value="sqyd">Sq. Yd.</option>
                    <option value="acre">Acre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Price (₹)</label>
                  <input type="number" value={form.price} onChange={(e) => update("price", e.target.value)} className="input-field" placeholder="e.g., 7500000" />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Floor</label>
                  <input type="text" value={form.floor} onChange={(e) => update("floor", e.target.value)} className="input-field" placeholder="e.g., 5" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Total Floors</label>
                  <input type="text" value={form.totalFloors} onChange={(e) => update("totalFloors", e.target.value)} className="input-field" placeholder="e.g., 12" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Facing</label>
                  <select value={form.facing} onChange={(e) => update("facing", e.target.value)} className="input-field">
                    <option value="">Select</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                    <option value="North-East">North-East</option>
                    <option value="North-West">North-West</option>
                    <option value="South-East">South-East</option>
                    <option value="South-West">South-West</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Furnishing</label>
                  <select value={form.furnishing} onChange={(e) => update("furnishing", e.target.value)} className="input-field">
                    <option value="">Select</option>
                    <option value="furnished">Furnished</option>
                    <option value="semi-furnished">Semi-Furnished</option>
                    <option value="unfurnished">Unfurnished</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Property Age</label>
                  <select value={form.age} onChange={(e) => update("age", e.target.value)} className="input-field">
                    <option value="">Select</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="0-1 years">0-1 years</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5-10 years">5-10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea value={form.description} onChange={(e) => update("description", e.target.value)}
                  rows={4} className="input-field resize-none" placeholder="Describe your property in detail..." />
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-navy-800 mb-4">Location Details</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Address</label>
                <input type="text" value={form.address} onChange={(e) => update("address", e.target.value)} className="input-field" placeholder="House/Flat No., Street, Sector" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Locality / Area</label>
                  <input type="text" value={form.locality} onChange={(e) => update("locality", e.target.value)} className="input-field" placeholder="e.g., Sector 150" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                  <input type="text" value={form.city} onChange={(e) => update("city", e.target.value)} className="input-field" placeholder="e.g., Noida" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
                  <input type="text" value={form.state} onChange={(e) => update("state", e.target.value)} className="input-field" placeholder="e.g., Uttar Pradesh" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">PIN Code</label>
                  <input type="text" value={form.pincode} onChange={(e) => update("pincode", e.target.value)} className="input-field" placeholder="e.g., 201301" />
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-700 font-medium flex items-center gap-2">
                  <MapPin size={16} /> GPS coordinates will be auto-detected from your browser for map display.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Media */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-navy-800 mb-4">Photos & Amenities</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Photos</label>

                {form.images.length > 0 && (
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-3">
                    {form.images.map((img, i) => (
                      <div key={i} className="relative h-24 rounded-lg overflow-hidden bg-gray-100 group">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeImage(i)}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <X size={12} />
                        </button>
                        {i === 0 && (
                          <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-gold-500 text-white text-[10px] rounded font-bold">COVER</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <label
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={async (e) => {
                    e.preventDefault();
                    const files = e.dataTransfer.files;
                    if (!files.length) return;
                    setUploading(true);
                    const newImages = [...form.images];
                    for (let i = 0; i < files.length && newImages.length < 10; i++) {
                      if (!files[i].type.startsWith("image/")) continue;
                      const fd = new FormData();
                      fd.append("file", files[i]);
                      fd.append("folder", "properties");
                      try {
                        const res = await fetch("/api/upload", { method: "POST", body: fd });
                        const data = await res.json();
                        if (data.url) newImages.push(data.url);
                      } catch {}
                    }
                    update("images", newImages);
                    setUploading(false);
                  }}
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-gold-400 hover:bg-gray-50 transition-colors"
                >
                  {uploading ? (
                    <div className="flex flex-col items-center">
                      <Loader2 size={28} className="animate-spin text-gold-500 mb-2" />
                      <span className="text-sm text-gray-500">Uploading...</span>
                    </div>
                  ) : (
                    <>
                      <Upload size={28} className="text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600 font-medium">Click to upload or drag & drop</span>
                      <span className="text-xs text-gray-400 mt-1">{form.images.length}/10 images uploaded. Max 10MB each.</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    disabled={uploading}
                    onChange={async (e) => {
                      const files = e.target.files;
                      if (!files?.length) return;
                      setUploading(true);
                      const newImages = [...form.images];
                      for (let i = 0; i < files.length && newImages.length < 10; i++) {
                        if (!files[i].type.startsWith("image/")) continue;
                        const fd = new FormData();
                        fd.append("file", files[i]);
                        fd.append("folder", "properties");
                        try {
                          const res = await fetch("/api/upload", { method: "POST", body: fd });
                          const data = await res.json();
                          if (data.url) newImages.push(data.url);
                        } catch {}
                      }
                      update("images", newImages);
                      setUploading(false);
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {AMENITIES.map((amenity) => (
                    <button key={amenity} type="button" onClick={() => toggleAmenity(amenity)}
                      className={`px-3 py-2 rounded-lg text-sm text-left transition-all ${
                        form.amenities.includes(amenity) ? "bg-gold-100 text-gold-700 border-2 border-gold-400" : "bg-gray-50 text-gray-600 border-2 border-transparent hover:border-gray-200"
                      }`}>
                      {form.amenities.includes(amenity) ? "✓ " : ""}{amenity}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-navy-800 mb-4 flex items-center gap-2">
                <Sparkles size={22} className="text-gold-500" /> Review Your Listing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-semibold text-navy-800 mb-2">Basic Info</h3>
                    <p className="text-sm text-gray-600"><strong>Title:</strong> {form.title || "Not provided"}</p>
                    <p className="text-sm text-gray-600"><strong>Type:</strong> {form.type} | <strong>Category:</strong> {form.category}</p>
                    <p className="text-sm text-gray-600"><strong>Listed as:</strong> {form.ownerType}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-semibold text-navy-800 mb-2">Details</h3>
                    <p className="text-sm text-gray-600"><strong>Price:</strong> ₹{Number(form.price).toLocaleString("en-IN")}</p>
                    <p className="text-sm text-gray-600"><strong>Area:</strong> {form.area} {form.areaUnit}</p>
                    {form.bedrooms && <p className="text-sm text-gray-600"><strong>BHK:</strong> {form.bedrooms}</p>}
                    {form.furnishing && <p className="text-sm text-gray-600 capitalize"><strong>Furnishing:</strong> {form.furnishing}</p>}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-semibold text-navy-800 mb-2">Location</h3>
                    <p className="text-sm text-gray-600">{form.address}</p>
                    <p className="text-sm text-gray-600">{form.locality}, {form.city}, {form.state} - {form.pincode}</p>
                  </div>
                  {form.amenities.length > 0 && (
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <h3 className="font-semibold text-navy-800 mb-2">Amenities ({form.amenities.length})</h3>
                      <div className="flex flex-wrap gap-1">
                        {form.amenities.map((a) => (
                          <span key={a} className="px-2 py-1 bg-gold-100 text-gold-700 text-xs rounded">{a}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {form.images.length > 0 && (
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <h3 className="font-semibold text-navy-800 mb-2">Photos ({form.images.length})</h3>
                      <div className="flex gap-2 overflow-x-auto">
                        {form.images.map((img, i) => (
                          <img key={i} src={img} alt="" className="w-16 h-12 object-cover rounded" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            {step > 0 ? (
              <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-gray-600 hover:text-navy-800 font-medium">
                <ArrowLeft size={18} /> Previous
              </button>
            ) : <div />}

            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep(step + 1)} className="btn-primary flex items-center gap-2">
                Next <ArrowRight size={18} />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading} className="btn-primary flex items-center gap-2 disabled:opacity-50">
                {loading ? "Publishing..." : "Publish Property"} <CheckCircle size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
