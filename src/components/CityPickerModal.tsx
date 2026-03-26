"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Search, X, Navigation, Building2, Loader2 } from "lucide-react";
import { useCity, CityInfo } from "@/context/CityContext";

interface CityData {
  id: string;
  name: string;
  slug: string;
  state: string;
  isPopular: boolean;
  imageUrl: string | null;
}

const CITY_IMAGES: Record<string, string> = {
  Delhi: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop",
  Noida: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop",
  "Greater Noida": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
  Gurugram: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=300&fit=crop",
  Ghaziabad: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
  Jaipur: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&h=300&fit=crop",
  Pune: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=300&fit=crop",
};

const CITY_MATCH_MAP: Record<string, string> = {
  "new delhi": "Delhi",
  delhi: "Delhi",
  noida: "Noida",
  "greater noida": "Greater Noida",
  gurugram: "Gurugram",
  gurgaon: "Gurugram",
  ghaziabad: "Ghaziabad",
  jaipur: "Jaipur",
  pune: "Pune",
};

function getCityImageSrc(city: CityData): string {
  const fallback = CITY_IMAGES[city.name] || CITY_IMAGES.Delhi;
  const apiImage = city.imageUrl?.trim();
  return apiImage || fallback;
}

export default function CityPickerModal() {
  const { isPickerOpen, closePicker, setCity, selectedCity } = useCity();
  const [cities, setCities] = useState<CityData[]>([]);
  const [search, setSearch] = useState("");
  const [detecting, setDetecting] = useState(false);
  const [detectError, setDetectError] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (isPickerOpen && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  }, [isPickerOpen]);

  useEffect(() => {
    if (isPickerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isPickerOpen]);

  async function fetchCities() {
    try {
      const res = await fetch("/api/cities");
      const data = await res.json();
      setCities(data.cities || []);
    } catch {}
  }

  function handleSelectCity(city: CityData) {
    setCity({ name: city.name, slug: city.slug, state: city.state });
  }

  function handleBrowseAll() {
    setCity(null);
    closePicker();
  }

  async function detectLocation() {
    setDetecting(true);
    setDetectError("");

    if (!("geolocation" in navigator)) {
      setDetectError("Geolocation is not supported by your browser");
      setDetecting(false);
      return;
    }

    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000,
        });
      });

      const { latitude, longitude } = pos.coords;
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
        { headers: { "User-Agent": "PropertyPointers/1.0" } }
      );
      const geo = await res.json();
      const detectedCity =
        geo?.address?.city ||
        geo?.address?.town ||
        geo?.address?.village ||
        geo?.address?.state_district ||
        "";

      const normalized = detectedCity.toLowerCase().trim();
      const matchedName = CITY_MATCH_MAP[normalized];

      if (matchedName) {
        const matchedCity = cities.find((c) => c.name === matchedName);
        if (matchedCity) {
          handleSelectCity(matchedCity);
          setDetecting(false);
          return;
        }
      }

      for (const city of cities) {
        if (
          normalized.includes(city.name.toLowerCase()) ||
          city.name.toLowerCase().includes(normalized)
        ) {
          handleSelectCity(city);
          setDetecting(false);
          return;
        }
      }

      setDetectError(
        `We detected "${detectedCity}" but we currently serve only Delhi NCR, Jaipur & Pune. Please select a city.`
      );
    } catch {
      setDetectError("Unable to detect location. Please allow location access or select a city manually.");
    }
    setDetecting(false);
  }

  const popularCities = cities.filter((c) => c.isPopular);
  const filteredCities = search
    ? cities.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.state.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  if (!isPickerOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={selectedCity ? closePicker : undefined}
      />

      <div className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-navy-900 to-navy-800 px-6 py-8 text-center">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-8 w-20 h-20 bg-gold-500 rounded-full blur-2xl" />
            <div className="absolute bottom-4 right-8 w-16 h-16 bg-blue-500 rounded-full blur-2xl" />
          </div>
          {selectedCity && (
            <button
              onClick={closePicker}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X size={18} />
            </button>
          )}
          <div className="relative">
            <div className="w-14 h-14 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Building2 size={28} className="text-gold-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">
              Where are you looking for properties?
            </h2>
            <p className="text-gray-400 text-sm">
              We serve Delhi NCR, Jaipur & Pune regions
            </p>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Detect Location */}
          <button
            onClick={detectLocation}
            disabled={detecting}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold rounded-xl transition-all disabled:opacity-70 shadow-lg shadow-gold-500/20"
          >
            {detecting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Navigation size={18} />
            )}
            {detecting ? "Detecting your location..." : "Detect My Location"}
          </button>
          {detectError && (
            <p className="text-xs text-red-500 text-center -mt-2">{detectError}</p>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              or select a city
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a city..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all"
            />
          </div>

          {/* Search Results */}
          {search && filteredCities.length > 0 && (
            <div className="max-h-40 overflow-y-auto space-y-1">
              {filteredCities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleSelectCity(city)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left hover:bg-gold-50 transition-colors group"
                >
                  <MapPin
                    size={16}
                    className="text-gray-400 group-hover:text-gold-500 shrink-0"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{city.name}</p>
                    <p className="text-xs text-gray-400">{city.state}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {search && filteredCities.length === 0 && (
            <p className="text-center text-sm text-gray-400 py-2">
              No matching cities found. We currently serve Delhi NCR, Jaipur & Pune.
            </p>
          )}

          {/* Popular Cities Grid */}
          {!search && popularCities.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {popularCities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleSelectCity(city)}
                  className="group relative overflow-hidden rounded-xl aspect-square border-2 border-transparent hover:border-gold-400 transition-all"
                >
                  <img
                    src={getCityImageSrc(city)}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const img = e.currentTarget;
                      const fallback = CITY_IMAGES[city.name] || CITY_IMAGES.Delhi;
                      if (img.src !== fallback) {
                        img.src = fallback;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white font-semibold text-xs leading-tight">
                      {city.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Browse All */}
          <button
            onClick={handleBrowseAll}
            className="w-full text-center text-sm text-gray-500 hover:text-navy-800 font-medium py-2 transition-colors"
          >
            Browse All India &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
