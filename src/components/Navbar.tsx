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
  Scale,
  Wrench,
  BarChart3,
  Map,
  BookOpen,
  Newspaper,
  Sprout,
} from "lucide-react";
import Logo from "@/components/Logo";
import { useCity } from "@/context/CityContext";

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
  {
    label: "Buy",
    href: "/properties?type=sale",
    mega: {
      items: [
        { label: "Apartments", href: "/properties?type=sale&category=apartment", icon: <Building2 size={16} className="text-blue-500" /> },
        { label: "Builder Floors", href: "/properties?type=sale&category=house", icon: <HomeIcon size={16} className="text-green-500" /> },
        { label: "Villas", href: "/properties?type=sale&category=villa", icon: <Landmark size={16} className="text-purple-500" /> },
        { label: "Commercial", href: "/properties?type=sale&category=commercial", icon: <Store size={16} className="text-orange-500" /> },
        { label: "Plots / Land", href: "/properties?type=sale&category=plot", icon: <TreePine size={16} className="text-emerald-500" /> },
        { label: "Ready to Move", href: "/properties?type=sale&furnished=furnished", icon: <Key size={16} className="text-orange-500" /> },
        { label: "Luxury Homes", href: "/properties?type=sale&sort=price_high", icon: <IndianRupee size={16} className="text-gold-500" /> },
      ],
      cities: {
        title: "Properties in India",
        links: [
          { name: "Properties in India", href: "/properties?type=sale" },
          { name: "Property in Delhi", href: "/properties?type=sale&city=Delhi" },
          { name: "Property in Noida", href: "/properties?type=sale&city=Noida" },
          { name: "Property in Gurugram", href: "/properties?type=sale&city=Gurugram" },
          { name: "Property in Ghaziabad", href: "/properties?type=sale&city=Ghaziabad" },
          { name: "Property in Greater Noida", href: "/properties?type=sale&city=Greater Noida" },
          { name: "Property in Jaipur", href: "/properties?type=sale&city=Jaipur" },
          { name: "Property in Pune", href: "/properties?type=sale&city=Pune" },
        ],
      },
      stats: [
        { label: "Active Listings", value: "100+" },
        { label: "Verified Listings", value: "20+" },
        { label: "Cities Covered", value: "5+" },
      ],
      highlight: {
        title: "Explore Verified Properties",
        description: "Shortlist listings with verified details and genuine owners.",
        href: "/properties?type=sale&verified=true",
        cta: "Explore",
        icon: <Shield size={20} className="text-gold-500" />,
      },
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
        title: "Properties in India",
        links: [
          { name: "Properties in India", href: "/properties?type=rent" },
          { name: "Property in Delhi", href: "/properties?type=rent&city=Delhi" },
          { name: "Property in Noida", href: "/properties?type=rent&city=Noida" },
          { name: "Property in Gurugram", href: "/properties?type=rent&city=Gurugram" },
          { name: "Property in Ghaziabad", href: "/properties?type=rent&city=Ghaziabad" },
          { name: "Property in Greater Noida", href: "/properties?type=rent&city=Greater Noida" },
          { name: "Property in Jaipur", href: "/properties?type=rent&city=Jaipur" },
          { name: "Property in Pune", href: "/properties?type=rent&city=Pune" },
        ],
      },
      stats: [
        { label: "Active Listings", value: "100+" },
        { label: "Verified Listings", value: "20+" },
        { label: "Cities Covered", value: "5+" },
      ],
      highlight: {
        title: "List Your Property",
        description: "Get genuine tenants fast. Zero brokerage, verified leads.",
        href: "/post-property",
        cta: "Post FREE",
        icon: <Plus size={20} className="text-gold-500" />,
      },
    },
  },
  {
    label: "Developers",
    href: "/developers",
    mega: {
      items: [
        { label: "All Developers", href: "/developers", icon: <Building2 size={16} className="text-blue-500" /> },
        { label: "Top Developers", href: "/developers/top", icon: <TrendingUp size={16} className="text-gold-500" /> },
        { label: "Explore by Builder", href: "/developers/explore", icon: <HomeIcon size={16} className="text-emerald-500" /> },
        { label: "Builder Reviews", href: "/developers/reviews", icon: <Store size={16} className="text-purple-500" /> },
      ],
      cities: {
        title: "Popular Builders",
        links: [
          { name: "Prestige Group", href: "/developers/prestige-group" },
          { name: "Godrej Properties", href: "/developers/godrej-properties" },
          { name: "DLF Limited", href: "/developers/dlf-limited" },
          { name: "Sobha Limited", href: "/developers/sobha-limited" },
          { name: "Browse All", href: "/developers/explore" },
        ],
      },
      stats: [
        { label: "Developers", value: "50+" },
        { label: "Projects", value: "200+" },
        { label: "Cities", value: "7+" },
      ],
      highlight: {
        title: "Discover Real Estate Brands",
        description: "Compare builders, read reviews, and find your trusted developer.",
        href: "/developers",
        cta: "Explore",
        icon: <Building2 size={20} className="text-gold-500" />,
      },
    },
  },
  {
    label: "Partner Network",
    href: "/partners",
    mega: {
      items: [
        { label: "All Partners", href: "/partners", icon: <Users size={16} className="text-blue-500" /> },
        { label: "Join As Partner", href: "/partners/join", icon: <Plus size={16} className="text-gold-500" /> },
      ],
      cities: {
        title: "Partner Categories",
        links: [
          { name: "Channel Partners", href: "/partners?category=Channel+Partner" },
          { name: "Project Sales", href: "/partners?category=Project+Sales" },
          { name: "Rental Services", href: "/partners?category=Rental+Services" },
          { name: "Investment Advisory", href: "/partners?category=Investment+Advisory" },
          { name: "View All", href: "/partners" },
        ],
      },
      stats: [
        { label: "Partners", value: "100+" },
        { label: "Verified", value: "50+" },
        { label: "Cities", value: "5+" },
      ],
      highlight: {
        title: "Become a Partner",
        description: "Join India's fastest-growing real estate partner network. Free to apply.",
        href: "/partners/join",
        cta: "Apply",
        icon: <Users size={20} className="text-gold-500" />,
      },
    },
  },
  {
    label: "Vendor Marketplace",
    href: "/vendors",
    mega: {
      items: [
        { label: "Marketing & Visibility", href: "/vendors/marketing-visibility", icon: <TrendingUp size={16} className="text-emerald-500" /> },
        { label: "Project Development & Design", href: "/vendors/project-development-design", icon: <Building2 size={16} className="text-blue-500" /> },
        { label: "Legal & Professional", href: "/vendors/legal-professional", icon: <Scale size={16} className="text-purple-500" /> },
        { label: "Project Support Services", href: "/vendors/project-support-services", icon: <Wrench size={16} className="text-gray-600" /> },
        { label: "Join As a Vendor", href: "/vendors/join", icon: <Plus size={16} className="text-gold-500" /> },
      ],
      cities: {
        title: "Popular Services",
        links: [
          { name: "Branding & PR", href: "/vendors/marketing-visibility" },
          { name: "Architectural Design", href: "/vendors/project-development-design" },
          { name: "Legal Advisory", href: "/vendors/legal-professional" },
          { name: "MEP & Construction", href: "/vendors/project-support-services" },
          { name: "Browse All", href: "/vendors" },
        ],
      },
      stats: [
        { label: "Vendors", value: "50+" },
        { label: "Categories", value: "4" },
        { label: "Verified", value: "30+" },
      ],
      highlight: {
        title: "Join As a Vendor",
        description: "List your services and reach thousands of developers and builders.",
        href: "/vendors/join",
        cta: "Apply",
        icon: <Store size={20} className="text-gold-500" />,
      },
    },
  },
  {
    label: "Insights",
    href: "/insights",
    mega: {
      items: [
        { label: "Market Trends", href: "/insights/market-trends", icon: <BarChart3 size={16} className="text-emerald-500" /> },
        { label: "City Reports", href: "/insights/city-reports", icon: <Map size={16} className="text-blue-500" /> },
        { label: "Investment Guides", href: "/insights/investment-guides", icon: <BookOpen size={16} className="text-purple-500" /> },
        { label: "Blogs", href: "/blog", icon: <Newspaper size={16} className="text-gray-600" /> },
        { label: "Media News", href: "/insights/media-news", icon: <Newspaper size={16} className="text-navy-700" /> },
        { label: "EMI", href: "/calculator?tool=emi", icon: <Calculator size={16} className="text-blue-500" /> },
        { label: "ROI", href: "/calculator?tool=roi", icon: <TrendingUp size={16} className="text-emerald-500" /> },
        { label: "Rental Yield", href: "/calculator?tool=rental-yield", icon: <IndianRupee size={16} className="text-gold-500" /> },
        { label: "Vastu", href: "/calculator?tool=vastu", icon: <Sprout size={16} className="text-green-500" /> },
      ],
      cities: {
        title: "Featured Reads",
        links: [
          { name: "Real estate market trends", href: "/insights/market-trends" },
          { name: "City-wise reports", href: "/insights/city-reports" },
          { name: "Investment basics", href: "/insights/investment-guides" },
          { name: "Latest blogs", href: "/blog" },
          { name: "RERA & legal guides", href: "/blog" },
          { name: "Interiors & Vastu", href: "/blog" },
        ],
      },
      stats: [
        { label: "Guides", value: "50+" },
        { label: "Reports", value: "20+" },
        { label: "Weekly Updates", value: "Yes" },
      ],
      highlight: {
        title: "Make Smarter Decisions",
        description: "Use insights, calculators, and verified data before you invest.",
        href: "/insights",
        cta: "Read",
        icon: <TrendingUp size={20} className="text-gold-500" />,
      },
    },
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<UserSession | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const { selectedCity, openPicker, isLoaded } = useCity();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setActiveDropdown(null);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    checkAuth();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-navy-900/95 backdrop-blur-md"
      }`}
    >
      <div className={`relative z-[60] max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 ${
        activeDropdown ? (scrolled ? "bg-white" : "bg-navy-900") : ""
      }`}>
        <div className="flex items-center justify-between h-16 lg:h-16">
          <div className="flex items-center gap-2">
            <Link href="/" className="shrink-0">
              <Logo variant={scrolled ? "dark" : "light"} size="sm" />
            </Link>

            {/* City Selector */}
            {isLoaded && (
              <button
                onClick={openPicker}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all border ${
                  scrolled
                    ? "border-gray-200 text-navy-700 hover:bg-gray-100 bg-gray-50"
                    : "border-white/20 text-white hover:bg-white/10 bg-white/5"
                }`}
              >
                <MapPin size={14} className={scrolled ? "text-gold-500" : "text-gold-400"} />
                <span className="max-w-[100px] truncate">
                  {selectedCity ? selectedCity.name : "All India"}
                </span>
                <ChevronDown size={12} className="opacity-60" />
              </button>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.mega && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {item.mega ? (
                  <button
                    type="button"
                    className={`flex items-center gap-1 text-[13px] font-medium px-2.5 py-2 rounded-lg transition-all ${
                      scrolled
                        ? "text-navy-700 hover:bg-gray-100 hover:text-navy-900"
                        : "text-gray-200 hover:bg-white/10 hover:text-white"
                    } ${activeDropdown === item.label ? (scrolled ? "bg-gray-100 text-navy-900" : "bg-white/10 text-white") : ""}`}
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 text-[13px] font-medium px-2.5 py-2 rounded-lg transition-all ${
                      scrolled
                        ? "text-navy-700 hover:bg-gray-100 hover:text-navy-900"
                        : "text-gray-200 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/post-property"
              className="flex items-center gap-1.5 bg-gold-500 hover:bg-gold-600 text-white font-semibold px-3.5 py-2 rounded-lg transition-all text-[13px] whitespace-nowrap"
            >
              <Plus size={16} />
              Post Property
              <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded font-bold ml-1 hidden xl:inline">
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
                  className={`text-[13px] font-medium px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
                    scrolled
                      ? "text-navy-800 hover:bg-gray-100"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="text-[13px] font-medium px-3 py-2 rounded-lg bg-navy-700 text-white hover:bg-navy-600 transition-all whitespace-nowrap"
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

      {/* Full-Width Mega Menu Panel */}
      {NAV_ITEMS.map((item) =>
        item.mega && activeDropdown === item.label ? (
          <div
            key={item.label}
            className="hidden lg:block absolute left-0 right-0 top-full z-50"
            onMouseEnter={() => handleMouseEnter(item.label)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] animate-mega-enter">
              <div className="h-[3px] bg-gradient-to-r from-gold-400 via-gold-500 to-navy-700" />
              <div className="max-w-[1400px] mx-auto px-8 py-8">
                <div className="grid grid-cols-12 gap-10">

                  {/* Column 1: Main category links
                     Layout: items<=6 → col-span-4, items>6 → col-span-5 (2-col grid)
                     Col2 (cities): 3 cols. Col3 (stats+cta): remaining.
                     No cities: Col1 + Col3 = 12 */}
                  <div className={item.mega.items.length > 6 ? "col-span-5" : "col-span-4"}>
                    <p className="text-[11px] font-bold text-navy-400 uppercase tracking-[0.15em] mb-5 flex items-center gap-2">
                      <span className="w-5 h-[2px] bg-gold-400 rounded-full" />
                      {item.label}
                    </p>
                    <div className={item.mega.items.length > 6 ? "grid grid-cols-2 gap-x-4 gap-y-0.5" : "space-y-0.5"}>
                      {item.mega.items.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-gray-600 hover:bg-gold-50 hover:text-navy-900 transition-all group"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-white group-hover:shadow-sm flex items-center justify-center transition-all shrink-0 border border-gray-100 group-hover:border-gold-200">
                            {subItem.icon}
                          </span>
                          <span className="font-medium">{subItem.label}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-[13px] text-gold-600 font-semibold hover:text-gold-700 hover:bg-gold-50 rounded-lg transition-all"
                        onClick={() => setActiveDropdown(null)}
                      >
                        View All {item.label} <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Column 2: Quick links / Cities */}
                  {item.mega.cities && (
                    <div className={`border-l border-gray-100 pl-8 ${item.mega.items.length > 6 ? "col-span-3" : "col-span-3"}`}>
                      <p className="text-[11px] font-bold text-navy-400 uppercase tracking-[0.15em] mb-5 flex items-center gap-2">
                        <MapPin size={12} className="text-gold-400" /> {item.mega.cities.title}
                      </p>
                      <div className="space-y-0.5">
                        {item.mega.cities.links.map((city) => (
                          <Link
                            key={city.name}
                            href={city.href}
                            className="flex items-center gap-2 text-[13px] text-gray-500 hover:text-navy-800 hover:bg-gray-50 px-3 py-2 rounded-lg transition-all"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                            {city.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Column 3: Stats + Highlight combined */}
                  {(item.mega.stats || item.mega.highlight) && (
                    <div className={`border-l border-gray-100 pl-8 ${
                      item.mega.cities
                        ? (item.mega.items.length > 6 ? "col-span-4" : "col-span-5")
                        : (item.mega.items.length > 6 ? "col-span-7" : "col-span-8")
                    }`}>
                      {item.mega.stats && (
                        <>
                          <p className="text-[11px] font-bold text-navy-400 uppercase tracking-[0.15em] mb-4">
                            Quick Facts
                          </p>
                          <div className="flex gap-3 mb-5">
                            {item.mega.stats.map((stat) => (
                              <div
                                key={stat.label}
                                className="flex-1 bg-gradient-to-b from-gray-50 to-white rounded-xl px-3 py-3 border border-gray-100 text-center"
                              >
                                <p className="text-lg font-bold text-navy-800">{stat.value}</p>
                                <p className="text-[10px] text-gray-400 font-medium mt-0.5">{stat.label}</p>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {item.mega.highlight && (
                        <Link
                          href={item.mega.highlight.href}
                          className="block p-4 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 rounded-2xl text-white hover:from-navy-700 hover:via-navy-800 hover:to-navy-900 transition-all group shadow-lg"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center shrink-0 mt-0.5">
                              {item.mega.highlight.icon}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold">{item.mega.highlight.title}</p>
                              <p className="text-xs text-gray-400 mt-1 leading-relaxed">{item.mega.highlight.description}</p>
                            </div>
                          </div>
                          <div className="mt-3 flex justify-end">
                            <span className="inline-flex items-center gap-1.5 text-xs bg-gold-500 text-navy-900 px-3.5 py-1.5 rounded-lg font-bold group-hover:bg-gold-400 transition-colors">
                              {item.mega.highlight.cta} <ArrowRight size={12} />
                            </span>
                          </div>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {/* Mobile City Selector */}
            {isLoaded && (
              <button
                onClick={() => { openPicker(); setIsOpen(false); }}
                className="flex items-center gap-2 w-full px-4 py-3 bg-gold-50 rounded-lg text-left mb-2"
              >
                <MapPin size={16} className="text-gold-500" />
                <span className="text-sm font-medium text-navy-800">
                  {selectedCity ? selectedCity.name : "Select City"}
                </span>
                <ChevronDown size={14} className="text-gray-400 ml-auto" />
              </button>
            )}

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
