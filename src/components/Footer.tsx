"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";

interface Settings {
  address: string;
  contactPhone: string;
  contactEmail: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

const SOCIAL_ICONS = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
} as const;

export default function Footer() {
  const [s, setS] = useState<Settings | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => setS(data))
      .catch(() => {});
  }, []);

  const socials = s
    ? (Object.entries(SOCIAL_ICONS) as [keyof typeof SOCIAL_ICONS, typeof Facebook][])
        .filter(([key]) => s[key])
        .map(([key, Icon]) => ({ key, url: s[key], Icon }))
    : [];

  const phoneDigits = s?.contactPhone?.replace(/[^0-9]/g, "") || "";

  return (
    <footer className="gradient-navy text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="mb-4">
              <Logo variant="light" size="lg" />
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              India&apos;s most trusted real estate platform. Find your dream property with verified listings, virtual tours, and zero brokerage options.
            </p>
            {socials.length > 0 && (
              <div className="flex gap-3">
                {socials.map(({ key, url, Icon }) => (
                  <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={`Property Pointers on ${key}`}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold-500 transition-colors">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Careers", href: "/careers" },
                { label: "Blogs", href: "/insights" },
                { label: "Buy Property", href: "/properties?type=sale" },
                { label: "Rent Property", href: "/properties?type=rent" },
                { label: "Post Property", href: "/post-property" },
                { label: "Offices", href: "/properties?category=office" },
                { label: "Shops", href: "/properties?category=shop" },
                { label: "Studio Apartments", href: "/properties?category=studio" },
                { label: "Plots/Land", href: "/properties?category=plot" },
                { label: "EMI Calculator", href: "/calculator" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-gold-400 transition-colors flex items-center gap-1">
                    <ArrowRight size={12} /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Our Service Areas</h3>
            <ul className="space-y-3">
              {["Delhi", "Noida", "Greater Noida", "Gurugram", "Ghaziabad", "Jaipur", "Pune"].map((city) => (
                <li key={city}>
                  <Link href={`/properties?city=${city}`} className="text-sm hover:text-gold-400 transition-colors flex items-center gap-1">
                    <ArrowRight size={12} /> Properties in {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            {s ? (
              <ul className="space-y-4">
                {s.address && (
                  <li className="flex items-start gap-3">
                    <MapPin size={18} className="text-gold-400 mt-0.5 shrink-0" />
                    <span className="text-sm">{s.address}</span>
                  </li>
                )}
                {s.contactPhone && (
                  <li className="flex items-center gap-3">
                    <Phone size={18} className="text-gold-400 shrink-0" />
                    <a href={`tel:+${phoneDigits}`} className="text-sm hover:text-gold-400 transition-colors">{s.contactPhone}</a>
                  </li>
                )}
                {s.contactEmail && (
                  <li className="flex items-center gap-3">
                    <Mail size={18} className="text-gold-400 shrink-0" />
                    <a href={`mailto:${s.contactEmail}`} className="text-sm hover:text-gold-400 transition-colors">{s.contactEmail}</a>
                  </li>
                )}
              </ul>
            ) : (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-5 bg-white/5 rounded animate-pulse" />
                ))}
              </div>
            )}
            <div className="mt-6">
              <h4 className="text-white font-medium text-sm mb-2">Newsletter</h4>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/10 rounded-lg text-sm text-white placeholder-gray-400 border border-white/10 focus:border-gold-400 outline-none"
                />
                <button className="px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-lg text-sm font-medium transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Property Pointers. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
            <Link href="/disclaimer" className="hover:text-gold-400 transition-colors">
              Disclaimer
            </Link>
            <Link href="/privacy" className="hover:text-gold-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold-400 transition-colors">
              Terms of Service
            </Link>
            <a href="#" className="hover:text-gold-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
