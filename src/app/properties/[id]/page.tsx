"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { PropertyType } from "@/types";
import { formatPrice, formatDate, timeAgo } from "@/lib/utils";
import {
  MapPin, Bed, Bath, Maximize, Building2, Calendar, Eye, Heart, Share2,
  Phone, Mail, MessageCircle, Star, CheckCircle, ArrowLeft, ChevronLeft,
  ChevronRight, Home, Compass, Layers, Sofa, Clock, Shield, User,
  Facebook, Twitter, Linkedin, Printer, Link2, X, ZoomIn, ArrowRight,
  Navigation, MapPinned, IndianRupee
} from "lucide-react";
import PropertyCard from "@/components/PropertyCard";

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [property, setProperty] = useState<PropertyType | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [showInquiry, setShowInquiry] = useState(false);
  const [inquiry, setInquiry] = useState({ message: "", phone: "" });
  const [inquirySent, setInquirySent] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [similarProperties, setSimilarProperties] = useState<PropertyType[]>([]);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  async function fetchProperty() {
    try {
      const res = await fetch(`/api/properties/${id}`);
      const data = await res.json();
      setProperty(data.property);

      if (data.property) {
        fetchSimilarProperties(data.property);
      }
    } catch {
      // Handle error
    }
    setLoading(false);
  }

  async function fetchSimilarProperties(prop: PropertyType) {
    try {
      const params = new URLSearchParams({
        type: prop.type,
        city: prop.city,
        limit: "4",
      });
      const res = await fetch(`/api/properties?${params.toString()}`);
      const data = await res.json();
      setSimilarProperties(
        (data.properties || []).filter((p: PropertyType) => p.id !== prop.id).slice(0, 4)
      );
    } catch {}
  }

  async function sendInquiry(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId: id, ...inquiry }),
      });
      if (res.ok) {
        setInquirySent(true);
        setTimeout(() => { setShowInquiry(false); setInquirySent(false); }, 3000);
      }
    } catch {}
  }

  function handleShare(platform: string) {
    const url = window.location.href;
    const text = property ? `Check out ${property.title} on Property Pointers` : "";
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);

    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      setShowShareMenu(false);
      return;
    }
    if (platform === "print") {
      window.print();
      setShowShareMenu(false);
      return;
    }

    window.open(urls[platform], "_blank", "noopener,noreferrer,width=600,height=400");
    setShowShareMenu(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <Building2 size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Property Not Found</h2>
          <p className="text-gray-500 mb-4">The property you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/properties" className="btn-primary inline-block mt-4">Browse Properties</Link>
        </div>
      </div>
    );
  }

  const images: string[] = JSON.parse(property.images || "[]");
  const amenities: string[] = JSON.parse(property.amenities || "[]");
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gold-500">Home</Link>
          <ChevronRight size={14} />
          <Link href="/properties" className="hover:text-gold-500">Properties</Link>
          <ChevronRight size={14} />
          <Link href={`/properties?type=${property.type}`} className="hover:text-gold-500 capitalize">
            {property.type === "sale" ? "Buy" : property.type === "rent" ? "Rent" : "PG"}
          </Link>
          <ChevronRight size={14} />
          <span className="text-navy-800 font-medium truncate max-w-[200px]">{property.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative h-[400px] md:h-[500px] bg-gray-200 cursor-pointer" onClick={() => images.length > 0 && setLightboxOpen(true)}>
                {images.length > 0 ? (
                  <img src={images[currentImage]} alt={property.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-100 to-navy-200">
                    <Building2 size={80} className="text-navy-400" />
                  </div>
                )}

                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); setCurrentImage((prev) => (prev - 1 + images.length) % images.length); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setCurrentImage((prev) => (prev + 1) % images.length); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
                      {currentImage + 1} / {images.length}
                    </div>
                  </>
                )}

                {images.length > 0 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setLightboxOpen(true); }}
                    className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 transition-colors"
                  >
                    <ZoomIn size={14} /> View All Photos
                  </button>
                )}

                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white ${
                    property.type === "sale" ? "bg-green-500" : property.type === "rent" ? "bg-blue-500" : "bg-purple-500"
                  }`}>
                    FOR {property.type.toUpperCase()}
                  </span>
                  {property.verified && (
                    <span className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-500 flex items-center gap-1">
                      <CheckCircle size={12} /> VERIFIED
                    </span>
                  )}
                  {property.featured && (
                    <span className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gold-500 flex items-center gap-1">
                      <Star size={12} /> FEATURED
                    </span>
                  )}
                </div>
              </div>

              {images.length > 1 && (
                <div className="p-3 flex gap-2 overflow-x-auto scrollbar-hide">
                  {images.map((img, i) => (
                    <button key={i} onClick={() => setCurrentImage(i)}
                      className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === currentImage ? "border-gold-500 ring-2 ring-gold-200" : "border-transparent opacity-70 hover:opacity-100"}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-navy-900">{property.title}</h1>
                  <p className="flex items-center gap-1.5 text-gray-500 mt-2">
                    <MapPin size={16} className="text-gold-500 shrink-0" />
                    {property.address}, {property.locality}, {property.city}, {property.state} - {property.pincode}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors">
                    <Heart size={18} />
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-50 hover:text-blue-500 transition-colors"
                    >
                      <Share2 size={18} />
                    </button>
                    {showShareMenu && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowShareMenu(false)} />
                        <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 w-52">
                          <p className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase">Share via</p>
                          <button onClick={() => handleShare("whatsapp")} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center"><MessageCircle size={14} className="text-green-600" /></div> WhatsApp
                          </button>
                          <button onClick={() => handleShare("facebook")} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center"><Facebook size={14} className="text-blue-600" /></div> Facebook
                          </button>
                          <button onClick={() => handleShare("twitter")} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                            <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center"><Twitter size={14} className="text-sky-500" /></div> Twitter
                          </button>
                          <button onClick={() => handleShare("linkedin")} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center"><Linkedin size={14} className="text-blue-700" /></div> LinkedIn
                          </button>
                          <hr className="my-1" />
                          <button onClick={() => handleShare("copy")} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><Link2 size={14} className="text-gray-600" /></div> Copy Link
                          </button>
                          <button onClick={() => handleShare("print")} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><Printer size={14} className="text-gray-600" /></div> Print
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Price Section */}
              <div className="flex items-baseline gap-2 mb-6 p-4 bg-gradient-to-r from-navy-50 to-white rounded-xl border border-navy-100">
                <IndianRupee size={24} className="text-navy-800" />
                <span className="text-3xl font-bold text-navy-900">{formatPrice(property.price)}</span>
                {property.type === "rent" && <span className="text-gray-500">/month</span>}
                {property.area > 0 && (
                  <span className="text-sm text-gray-400 ml-2 px-2 py-0.5 bg-gray-100 rounded">
                    {formatPrice(Math.round(property.price / property.area))}/sqft
                  </span>
                )}
              </div>

              {/* Key Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                {property.bedrooms != null && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-navy-100 flex items-center justify-center">
                      <Bed size={20} className="text-navy-600" />
                    </div>
                    <div><p className="text-sm font-semibold text-navy-800">{property.bedrooms} BHK</p><p className="text-xs text-gray-500">Bedrooms</p></div>
                  </div>
                )}
                {property.bathrooms != null && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-navy-100 flex items-center justify-center">
                      <Bath size={20} className="text-navy-600" />
                    </div>
                    <div><p className="text-sm font-semibold text-navy-800">{property.bathrooms}</p><p className="text-xs text-gray-500">Bathrooms</p></div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-navy-100 flex items-center justify-center">
                    <Maximize size={20} className="text-navy-600" />
                  </div>
                  <div><p className="text-sm font-semibold text-navy-800">{property.area} {property.areaUnit}</p><p className="text-xs text-gray-500">Area</p></div>
                </div>
                {property.facing && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-navy-100 flex items-center justify-center">
                      <Compass size={20} className="text-navy-600" />
                    </div>
                    <div><p className="text-sm font-semibold text-navy-800">{property.facing}</p><p className="text-xs text-gray-500">Facing</p></div>
                  </div>
                )}
              </div>

              {/* Property Details */}
              <h3 className="text-lg font-semibold text-navy-800 mb-4">Property Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 mb-6 pb-6 border-b border-gray-100">
                {property.floor && (
                  <div className="flex items-center gap-2 text-sm">
                    <Layers size={16} className="text-gray-400 shrink-0" />
                    <span className="text-gray-600">Floor: <strong className="text-navy-800">{property.floor}{property.totalFloors ? ` of ${property.totalFloors}` : ""}</strong></span>
                  </div>
                )}
                {property.furnishing && (
                  <div className="flex items-center gap-2 text-sm">
                    <Sofa size={16} className="text-gray-400 shrink-0" />
                    <span className="text-gray-600">Furnishing: <strong className="text-navy-800 capitalize">{property.furnishing}</strong></span>
                  </div>
                )}
                {property.age && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} className="text-gray-400 shrink-0" />
                    <span className="text-gray-600">Age: <strong className="text-navy-800">{property.age}</strong></span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Eye size={16} className="text-gray-400 shrink-0" />
                  <span className="text-gray-600">Views: <strong className="text-navy-800">{property.views}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar size={16} className="text-gray-400 shrink-0" />
                  <span className="text-gray-600">Posted: <strong className="text-navy-800">{timeAgo(property.createdAt)}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Home size={16} className="text-gray-400 shrink-0" />
                  <span className="text-gray-600">Category: <strong className="text-navy-800 capitalize">{property.category}</strong></span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-navy-800 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>

            {/* Amenities */}
            {amenities.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-navy-800 mb-4">Amenities & Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2.5 text-sm text-gray-600 p-2.5 rounded-lg bg-gray-50">
                      <CheckCircle size={16} className="text-green-500 shrink-0" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-navy-800 mb-4 flex items-center gap-2">
                <MapPinned size={20} className="text-gold-500" />
                Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-gold-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-navy-800">Full Address</p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {property.address}, {property.locality}, {property.city}, {property.state} - {property.pincode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Navigation size={18} className="text-gold-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-navy-800">Locality</p>
                      <p className="text-sm text-gray-500 mt-0.5">{property.locality}, {property.city}</p>
                    </div>
                  </div>
                </div>
                <div className="h-48 md:h-auto rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden min-h-[200px]">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.address}, ${property.locality}, ${property.city}, ${property.state} ${property.pincode}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 text-gray-400 hover:text-gold-500 transition-colors"
                  >
                    <MapPin size={32} />
                    <span className="text-sm font-medium">View on Google Maps</span>
                    <span className="text-xs">{property.city}, {property.state}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Similar Properties */}
            {similarProperties.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-navy-900">Similar Properties</h3>
                  <Link
                    href={`/properties?type=${property.type}&city=${property.city}`}
                    className="text-gold-500 hover:text-gold-600 text-sm font-semibold flex items-center gap-1"
                  >
                    View All <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {similarProperties.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Owner Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-navy-800 flex items-center justify-center text-white font-bold text-xl">
                  {property.owner?.name?.[0] || "O"}
                </div>
                <div>
                  <h3 className="font-semibold text-navy-800">{property.owner?.name}</h3>
                  <p className="text-sm text-gray-500 capitalize flex items-center gap-1">
                    <Shield size={12} className="text-gold-500" />
                    {property.ownerType}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <a href={`tel:${property.owner?.phone || ""}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors">
                  <Phone size={18} /> Contact Owner
                </a>
                <button
                  onClick={() => setShowInquiry(!showInquiry)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-navy-800 hover:bg-navy-700 text-white rounded-xl font-medium transition-colors">
                  <MessageCircle size={18} /> Send Inquiry
                </button>
                <a href={`mailto:${property.owner?.email}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors">
                  <Mail size={18} /> Email Owner
                </a>
              </div>

              {showInquiry && (
                <div className="border-t pt-4">
                  {inquirySent ? (
                    <div className="text-center py-4">
                      <CheckCircle size={40} className="mx-auto text-green-500 mb-2" />
                      <p className="font-semibold text-green-700">Inquiry Sent!</p>
                      <p className="text-sm text-gray-500">The owner will contact you soon.</p>
                    </div>
                  ) : (
                    <form onSubmit={sendInquiry} className="space-y-3">
                      <input type="tel" value={inquiry.phone} onChange={(e) => setInquiry((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="Your phone number" className="input-field text-sm" />
                      <textarea value={inquiry.message} onChange={(e) => setInquiry((prev) => ({ ...prev, message: e.target.value }))}
                        placeholder="I'm interested in this property..."
                        rows={3} className="input-field text-sm resize-none" required />
                      <button type="submit" className="btn-primary w-full text-sm py-2.5">Send Inquiry</button>
                    </form>
                  )}
                </div>
              )}

              <div className="mt-6 p-4 bg-gold-50 rounded-xl border border-gold-100">
                <p className="text-sm font-medium text-gold-800 mb-1">Need Home Loan?</p>
                <p className="text-xs text-gold-600 mb-3">Calculate your EMI for this property</p>
                <Link href="/calculator" className="text-sm text-gold-600 font-semibold hover:text-gold-700 flex items-center gap-1">
                  EMI Calculator <ArrowRight size={14} />
                </Link>
              </div>

              {/* Property Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Property ID</span>
                  <span className="text-navy-800 font-medium text-xs bg-gray-100 px-2 py-0.5 rounded">{property.id.slice(0, 12)}...</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Listed</span>
                  <span className="text-navy-800 font-medium">{formatDate(property.createdAt)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Total Views</span>
                  <span className="text-navy-800 font-medium">{property.views}</span>
                </div>
                {property.verified && (
                  <div className="flex items-center gap-1.5 text-sm text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg">
                    <CheckCircle size={14} />
                    <span className="font-medium">Verified Property</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && images.length > 0 && (
        <div className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="absolute top-6 left-6 text-white/70 text-sm z-10">
            {currentImage + 1} / {images.length}
          </div>

          <button
            onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
          >
            <ChevronRight size={24} />
          </button>

          <img
            src={images[currentImage]}
            alt={`${property.title} - Image ${currentImage + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain"
          />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentImage ? "bg-gold-500 scale-125" : "bg-white/40 hover:bg-white/60"}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
