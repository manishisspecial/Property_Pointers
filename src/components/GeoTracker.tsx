"use client";

import { useEffect } from "react";

export default function GeoTracker() {
  useEffect(() => {
    trackVisit();
  }, []);

  async function trackVisit() {
    try {
      let latitude: number | undefined;
      let longitude: number | undefined;

      if ("geolocation" in navigator) {
        try {
          const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: false,
              timeout: 5000,
              maximumAge: 300000,
            });
          });
          latitude = pos.coords.latitude;
          longitude = pos.coords.longitude;
        } catch {
          // User denied or unavailable
        }
      }

      await fetch("/api/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "page_visit",
          page: window.location.pathname,
          latitude,
          longitude,
        }),
      });
    } catch {
      // Silent fail
    }
  }

  return null;
}
