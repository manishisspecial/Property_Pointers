"use client";

import Link from "next/link";
import { Heart, MapPin, Bed, Bath, Maximize, Eye, CheckCircle, Star, Building2 } from "lucide-react";
import { formatPrice, timeAgo } from "@/lib/utils";
import { PropertyType } from "@/types";
import { useState } from "react";

export default function PropertyCard({ property }: { property: PropertyType }) {
  const [liked, setLiked] = useState(false);
  const images: string[] = JSON.parse(property.images || "[]");

  async function toggleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId: property.id }),
      });
      setLiked(!liked);
    } catch {}
  }

  return (
    <Link href={`/properties/${property.id}`} className="card group block">
      <div className="relative h-52 bg-gray-200 overflow-hidden">
        {images.length > 0 ? (
          <img
            src={images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-100 to-navy-200">
            <Building2 size={48} className="text-navy-400" />
          </div>
        )}

        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2.5 py-1 rounded-md text-xs font-bold text-white ${
            property.type === "sale" ? "bg-green-500" : property.type === "rent" ? "bg-blue-500" : "bg-purple-500"
          }`}>
            {property.type === "sale" ? "FOR SALE" : property.type === "rent" ? "FOR RENT" : "PG"}
          </span>
          {property.featured && (
            <span className="px-2.5 py-1 rounded-md text-xs font-bold text-white bg-gold-500 flex items-center gap-1">
              <Star size={10} /> FEATURED
            </span>
          )}
        </div>

        <button
          onClick={toggleFavorite}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            liked ? "bg-red-500 text-white" : "bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white"
          }`}
        >
          <Heart size={16} fill={liked ? "white" : "none"} />
        </button>

        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          <Eye size={12} /> {property.views}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-navy-800 text-lg leading-tight group-hover:text-gold-600 transition-colors line-clamp-1">
            {property.title}
          </h3>
          {property.verified && (
            <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
          )}
        </div>

        <p className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <MapPin size={14} className="shrink-0" />
          <span className="truncate">{property.locality}, {property.city}</span>
        </p>

        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
          {property.bedrooms != null && (
            <span className="flex items-center gap-1">
              <Bed size={14} className="text-navy-400" /> {property.bedrooms} BHK
            </span>
          )}
          {property.bathrooms != null && (
            <span className="flex items-center gap-1">
              <Bath size={14} className="text-navy-400" /> {property.bathrooms} Bath
            </span>
          )}
          <span className="flex items-center gap-1">
            <Maximize size={14} className="text-navy-400" /> {property.area} {property.areaUnit}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-xl font-bold text-navy-900">{formatPrice(property.price)}</p>
            {property.type === "rent" && <span className="text-xs text-gray-500">/month</span>}
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">{timeAgo(property.createdAt)}</p>
            <p className="text-xs text-gray-500 capitalize">{property.ownerType}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
