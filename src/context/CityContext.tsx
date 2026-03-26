"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export interface CityInfo {
  name: string;
  slug: string;
  state: string;
}

interface CityContextValue {
  selectedCity: CityInfo | null;
  setCity: (city: CityInfo | null) => void;
  clearCity: () => void;
  isPickerOpen: boolean;
  openPicker: () => void;
  closePicker: () => void;
  isLoaded: boolean;
}

const CityContext = createContext<CityContextValue | undefined>(undefined);

const STORAGE_KEY = "pp_selected_city";
const PICKER_SHOWN_KEY = "pp_picker_shown";

export function CityProvider({ children }: { children: ReactNode }) {
  const [selectedCity, setSelectedCity] = useState<CityInfo | null>(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSelectedCity(JSON.parse(stored));
      } else {
        const hasShownPicker = sessionStorage.getItem(PICKER_SHOWN_KEY);
        if (!hasShownPicker) {
          setIsPickerOpen(true);
          sessionStorage.setItem(PICKER_SHOWN_KEY, "true");
        }
      }
    } catch {
      // localStorage unavailable
    }
    setIsLoaded(true);
  }, []);

  const setCity = useCallback((city: CityInfo | null) => {
    setSelectedCity(city);
    try {
      if (city) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(city));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {}
    setIsPickerOpen(false);
  }, []);

  const clearCity = useCallback(() => {
    setSelectedCity(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  const openPicker = useCallback(() => setIsPickerOpen(true), []);
  const closePicker = useCallback(() => setIsPickerOpen(false), []);

  return (
    <CityContext.Provider
      value={{ selectedCity, setCity, clearCity, isPickerOpen, openPicker, closePicker, isLoaded }}
    >
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  const context = useContext(CityContext);
  if (!context) throw new Error("useCity must be used within CityProvider");
  return context;
}
