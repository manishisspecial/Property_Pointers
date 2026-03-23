"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Heart,
  Plus,
  Building2,
  Home as HomeIcon,
  MapPin,
  TrendingUp,
  IndianRupee,
  ArrowRight,
  Landmark,
  Store,
  TreePine,
  Key,
  Users,
  Shield,
  Calculator,
} from "lucide-react";
import Logo from "@/components/Logo";

interface UserSession {
  userId: string;
  name: string;
  email: string;
  role: string;
}

interface DropdownItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface CityLink {
  name: string;
  href: string;
}

interface MegaMenuData {
  items: DropdownItem[];
  cities?: { title: string; links: CityLink[] };
  highlight?: { title: string; description: string; href: string; cta: string; icon: React.ReactNode };
  stats?: { label: string; value: string }[];
}

interface NavItemConfig {
  label: string;
  href: string;
  mega?: MegaMenuData;
}

const NAV_ITEMS: NavItemConfig[] = [
  { label: "Home", href: "/" },
  {
    label: "Buy",
    href: "/properties?type=sale",
    mega: {
      items: [
        { label: "Apartments", href: "/properties?type=sale&category=apartment", icon: <Building2 size={16} className="text-blue-500" /> },
        { label: "Builder Floors", href: "/properties?type=sale&category=house", icon: <HomeIcon size={16} className="text-green-500" /> },
        { label: "Villas", href: "/properties?type=sale&category=villa", icon: <Landmark size={16} className="text-purple-500" /> },
        { label: "Plots / Land", href: "/properties?type=sale&category=plot", icon: <TreePine size={16} className="text-emerald-500" /> },
        { label: "Ready to Move", href: "/properties?type=sale&furnished=furnished", icon: <Key size={16} className="text-orange-500" /> },
        { label: "Luxury Homes", href: "/properties?type=sale&sort=price_high", icon: <IndianRupee size={16} className="text-gold-500" /> },
      ],
      cities: {
        title: "Properties in India",
        links: [
          { name: "Property in New Delhi", href: "/properties?type=sale&city=Delhi" },
          { name: "Property in Mumbai", href: "/properties?type=sale&city=Mumbai" },
          { name: "Property in Noida", href: "/properties?type=sale&city=Noida" },
          { name: "Property in Gurgaon", href: "/properties?type=sale&city=Gurgaon" },
          { name: "Property in Bangalore", href: "/properties?type=sale&city=Bangalore" },
        ],
      },
      stats: [
        { label: "Active Listings", value: "10,000+" },
        { label: "Verified Properties", value: "8,500+" },
        { label: "Cities Covered", value: "50+" },
      ],
    },
  },
  {
    label: "Rent",
    href: "/properties?type=rent",
    mega: {
      items: [
        { label: "Flats for Rent", href: "/properties?type=rent&category=apartment", icon: <Building2 size={16} className="text-blue-500" /> },
        { label: "House for Rent", href: "/properties?type=rent&category=house", icon: <HomeIcon size={16} className="text-green-500" /> },
        { label: "Commercial Rent", href: "/properties?type=rent&category=commercial", icon: <Store size={16} className="text-orange-500" /> },
        { label: "PG / Co-living", href: "/properties?type=pg", icon: <Users size={16} className="text-purple-500" /> },
        { label: "Owner Properties", href: "/properties?type=rent", icon: <Shield size={16} className="text-emerald-500" /> },
      ],
      cities: {
        title: "Rentals in India",
        links: [
          { name: "Rent in New Delhi", href: "/properties?type=rent&city=Delhi" },
          { name: "Rent in Mumbai", href: "/properties?type=rent&city=Mumbai" },
          { name: "Rent in Noida", href: "/properties?type=rent&city=Noida" },
          { name: "Rent in Bangalore", href: "/properties?type=rent&city=Bangalore" },
          { name: "Rent in Hyderabad", href: "/properties?type=rent&city=Hyderabad" },
        ],
      },
      highlight: {
        title: "List Your Property",
        description: "Get genuine tenants fast. Zero brokerage, 100% verified leads.",
        href: "/post-property",
        cta: "Post FREE",
        icon: <Plus size={20} className="text-gold-500" />,
      },
    },
  },
  {
    label: "Commercial",
    href: "/properties?category=commercial",
    mega: {
      items: [
        { label: "Office Space", href: "/properties?category=office", icon: <Building2 size={16} className="text-blue-500" /> },
        { label: "Shops", href: "/properties?category=shop", icon: <Store size={16} className="text-orange-500" /> },
        { label: "Showrooms", href: "/properties?category=commercial", icon: <Landmark size={16} className="text-purple-500" /> },
        { label: "Warehouses", href: "/properties?category=commercial", icon: <Building2 size={16} className="text-emerald-500" /> },
        { label: "Commercial Land", href: "/properties?category=plot&type=sale", icon: <TreePine size={16} className="text-green-500" /> },
      ],
      cities: {
        title: "Commercial Hubs",
        links: [
          { name: "Commercial in Delhi", href: "/properties?category=commercial&city=Delhi" },
          { name: "Commercial in Mumbai", href: "/properties?category=commercial&city=Mumbai" },
          { name: "Commercial in Noida", href: "/properties?category=commercial&city=Noida" },
          { name: "Commercial in Gurgaon", href: "/properties?category=commercial&city=Gurgaon" },
        ],
      },
      stats: [
        { label: "Office Spaces", value: "2,500+" },
        { label: "Retail Shops", value: "1,800+" },
        { label: "Avg. ROI", value: "8-12%" },
      ],
    },
  },
  {
    label: "Plots/Land",
    href: "/properties?category=plot",
    mega: {
      items: [
        { label: "Residential Plots", href: "/properties?category=plot&type=sale", icon: <HomeIcon size={16} className="text-green-500" /> },
        { label: "Commercial Land", href: "/properties?category=plot", icon: <Building2 size={16} className="text-blue-500" /> },
        { label: "Agricultural Land", href: "/properties?category=plot", icon: <TreePine size={16} className="text-emerald-500" /> },
        { label: "Industrial Land", href: "/properties?category=plot", icon: <Landmark size={16} className="text-purple-500" /> },
      ],
      cities: {
        title: "Plots in India",
        links: [
          { name: "Plots in Noida", href: "/properties?category=plot&city=Noida" },
          { name: "Plots in Greater Noida", href: "/properties?category=plot&city=Greater Noida" },
          { name: "Plots in Gurgaon", href: "/properties?category=plot&city=Gurgaon" },
          { name: "Plots in Lucknow", href: "/properties?category=plot&city=Lucknow" },
        ],
      },
      highlight: {
        title: "Investment Calculator",
        description: "Calculate EMI, ROI and plan your land investment smartly.",
        href: "/calculator",
        cta: "Calculate Now",
        icon: <Calculator size={20} className="text-gold-500" />,
      },
    },
  },
  { label: "New Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<UserSession | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    checkAuth();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function checkAuth() {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch {}
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setUserDropdownOpen(false);
    window.location.href = "/";
  }

  function handleMouseEnter(label: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 200);
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-navy-900/95 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <Link href="/" className="shrink-0">
            <Logo variant={scrolled ? "dark" : "light"} size="md" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.mega && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg transition-all ${
                    scrolled
                      ? "text-navy-700 hover:bg-gray-100 hover:text-navy-900"
                      : "text-gray-200 hover:bg-white/10 hover:text-white"
                  } ${activeDropdown === item.label ? (scrolled ? "bg-gray-100 text-navy-900" : "bg-white/10 text-white") : ""}`}
                >
                  {item.label}
                  {item.mega && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180" : ""}`}
                    />
                  )}
                </Link>

                {/* Mega Dropdown */}
                {item.mega && activeDropdown === item.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden" style={{ minWidth: "580px" }}>
                      {/* Top accent bar */}
                      <div className="h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-navy-800" />

                      <div className="grid grid-cols-12 divide-x divide-gray-100">
                        {/* Left: Sub-category links */}
                        <div className="col-span-5 p-4">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{item.label}</p>
                          <div className="space-y-0.5">
                            {item.mega.items.map((subItem) => (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-navy-50 hover:text-navy-800 transition-colors group"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <span className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-white flex items-center justify-center transition-colors">
                                  {subItem.icon}
                                </span>
                                <span className="font-medium">{subItem.label}</span>
                              </Link>
                            ))}
                          </div>
                          <Link
                            href={item.href}
                            className="flex items-center gap-1 mt-3 px-3 py-2 text-sm text-gold-600 font-semibold hover:text-gold-700"
                            onClick={() => setActiveDropdown(null)}
                          >
                            View All {item.label} <ArrowRight size={14} />
                          </Link>
                        </div>

                        {/* Right: Cities + Extra */}
                        <div className="col-span-7 p-4 bg-gray-50/50">
                          {/* Cities */}
                          {item.mega.cities && (
                            <div className="mb-4">
                              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                <MapPin size={12} /> {item.mega.cities.title}
                              </p>
                              <div className="grid grid-cols-2 gap-1">
                                {item.mega.cities.links.map((city) => (
                                  <Link
                                    key={city.name}
                                    href={city.href}
                                    className="text-sm text-gray-600 hover:text-navy-800 hover:bg-white px-2.5 py-1.5 rounded-md transition-colors"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    {city.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Stats */}
                          {item.mega.stats && (
                            <div className="grid grid-cols-3 gap-2 mb-4">
                              {item.mega.stats.map((stat) => (
                                <div key={stat.label} className="bg-white rounded-lg p-2.5 text-center border border-gray-100">
                                  <p className="text-base font-bold text-navy-900">{stat.value}</p>
                                  <p className="text-[10px] text-gray-500 mt-0.5">{stat.label}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Highlight CTA */}
                          {item.mega.highlight && (
                            <Link
                              href={item.mega.highlight.href}
                              className="flex items-center gap-3 p-3 bg-gradient-to-r from-navy-800 to-navy-900 rounded-xl text-white hover:from-navy-700 hover:to-navy-800 transition-all group"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                                {item.mega.highlight.icon}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold">{item.mega.highlight.title}</p>
                                <p className="text-xs text-gray-300 line-clamp-1">{item.mega.highlight.description}</p>
                              </div>
                              <span className="shrink-0 text-xs bg-gold-500 px-2.5 py-1 rounded-md font-bold group-hover:bg-gold-400 transition-colors">
                                {item.mega.highlight.cta}
                              </span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/post-property"
              className="flex items-center gap-1.5 bg-gold-500 hover:bg-gold-600 text-white font-semibold px-4 py-2 rounded-lg transition-all text-sm"
            >
              <Plus size={16} />
              Post Property
              <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded font-bold ml-1">
                FREE
              </span>
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    scrolled
                      ? "text-navy-800 hover:bg-gray-100"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-white text-sm font-bold">
                    {user.name[0]}
                  </div>
                  <span className="text-sm font-medium max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown size={14} />
                </button>

                {userDropdownOpen && (
                  <>
                    <div className="fixed inset-0" onClick={() => setUserDropdownOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-semibold text-navy-800">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <LayoutDashboard size={16} />
                        My Dashboard
                      </Link>
                      <Link
                        href="/dashboard?tab=favorites"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <Heart size={16} />
                        My Favorites
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gold-600 hover:bg-gold-50 font-medium"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <LayoutDashboard size={16} />
                          Admin Panel
                        </Link>
                      )}
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${
                    scrolled
                      ? "text-navy-800 hover:bg-gray-100"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="text-sm font-medium px-4 py-2 rounded-lg bg-navy-700 text-white hover:bg-navy-600 transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg ${
              scrolled ? "text-navy-800" : "text-white"
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                {item.mega ? (
                  <>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`text-gray-400 transition-transform duration-200 ${mobileExpanded === item.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {mobileExpanded === item.label && (
                      <div className="ml-4 pl-4 border-l-2 border-gold-200 space-y-0.5 mb-2">
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-2.5 text-sm text-gold-600 font-medium hover:bg-gold-50 rounded-lg"
                        >
                          All {item.label}
                        </Link>
                        {item.mega.items.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                          >
                            {subItem.icon}
                            {subItem.label}
                          </Link>
                        ))}
                        {item.mega.cities && (
                          <>
                            <p className="px-4 pt-3 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                              {item.mega.cities.title}
                            </p>
                            {item.mega.cities.links.slice(0, 3).map((city) => (
                              <Link
                                key={city.name}
                                href={city.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-lg"
                              >
                                <MapPin size={12} className="text-gray-400" />
                                {city.name}
                              </Link>
                            ))}
                          </>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            <hr className="my-2" />
            <Link
              href="/post-property"
              className="flex items-center justify-center gap-2 bg-gold-500 text-white font-semibold px-4 py-3 rounded-lg w-full"
              onClick={() => setIsOpen(false)}
            >
              <Plus size={16} />
              Post Property FREE
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium">
                  My Dashboard
                </Link>
                {user.role === "admin" && (
                  <Link href="/admin" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium">
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-3 text-red-600 font-medium"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-2">
                <Link href="/auth/login" className="flex-1 text-center py-3 rounded-lg border border-navy-800 text-navy-800 font-medium" onClick={() => setIsOpen(false)}>Login</Link>
                <Link href="/auth/register" className="flex-1 text-center py-3 rounded-lg bg-navy-800 text-white font-medium" onClick={() => setIsOpen(false)}>Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
