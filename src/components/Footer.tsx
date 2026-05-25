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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1 min-w-0">
            <div className="mb-4">
              <Logo variant="light" size="md" />
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              PropertyPointers is a real estate ecosystem platform helping users discover properties, compare developers, connect with realty advisors, explore real estate vendors and make informed property decisions with tools and insights.
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

          {/* Property Search */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Property Search</h3>
            <ul className="space-y-3">
              {[
                { label: "Buy Property", href: "/properties?type=sale" },
                { label: "Rent Property", href: "/properties?type=rent" },
                { label: "Commercial Property", href: "/properties?category=office" },
                { label: "New Launch Projects", href: "/properties?type=sale&new_launch=true" },
                { label: "Plots & Land", href: "/properties?category=plot" },
                { label: "Post Property", href: "/post-property" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-gold-400 transition-colors flex items-center gap-1">
                    <ArrowRight size={12} /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Ecosystem</h3>
            <ul className="space-y-3">
              {[
                { label: "Developers", href: "/developers" },
                { label: "List Your Project", href: "/developers/join" },
                { label: "Realty Advisors", href: "/realty-advisors" },
                { label: "Join Advisor Network", href: "/realty-advisors/join" },
                { label: "Vendors", href: "/vendors" },
                { label: "List Your Service", href: "/vendors/join" },
                { label: "Early Partner Program", href: "/partners/early-partner-program" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-gold-400 transition-colors flex items-center gap-1">
                    <ArrowRight size={12} /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              {[
                { label: "Blog & Insights", href: "/blog" },
                { label: "Market Reports", href: "/insights/market-trends" },
                { label: "EMI Calculator", href: "/calculator?tool=emi" },
                { label: "ROI Calculator", href: "/calculator?tool=roi" },
                { label: "Vastu Guide", href: "/insights/vastu" },
                { label: "Trust & Safety", href: "/trust-and-safety" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-gold-400 transition-colors flex items-center gap-1">
                    <ArrowRight size={12} /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3 mb-6">
              {[
                { label: "About Us", href: "/about" },
                { label: "Careers", href: "/careers" },
                { label: "Pricing", href: "/pricing" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-gold-400 transition-colors flex items-center gap-1">
                    <ArrowRight size={12} /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {s ? (
              <ul className="space-y-3">
                {s.address && (
                  <li className="flex items-start gap-3">
                    <MapPin size={16} className="text-gold-400 mt-0.5 shrink-0" />
                    <span className="text-xs">{s.address}</span>
                  </li>
                )}
                {s.contactPhone && (
                  <li className="flex items-center gap-3">
                    <Phone size={16} className="text-gold-400 shrink-0" />
                    <a href={`tel:+${phoneDigits}`} className="text-xs hover:text-gold-400 transition-colors">{s.contactPhone}</a>
                  </li>
                )}
                {s.contactEmail && (
                  <li className="flex items-center gap-3">
                    <Mail size={16} className="text-gold-400 shrink-0" />
                    <a href={`mailto:${s.contactEmail}`} className="text-xs hover:text-gold-400 transition-colors">{s.contactEmail}</a>
                  </li>
                )}
              </ul>
            ) : (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-4 bg-white/5 rounded animate-pulse" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} PropertyPointers. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
            <Link href="/disclaimer" className="hover:text-gold-400 transition-colors">Disclaimer</Link>
            <Link href="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold-400 transition-colors">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-gold-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
