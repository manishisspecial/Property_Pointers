"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
  Heart,
  Building2,
  Home,
  Search,
  Plus,
} from "lucide-react";
import Logo from "@/components/Logo";

interface UserSession {
  userId: string;
  name: string;
  email: string;
  role: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<UserSession | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    setDropdownOpen(false);
    window.location.href = "/";
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

          <div className="hidden lg:flex items-center gap-1">
            <NavLink href="/" scrolled={scrolled}>
              <Home size={16} />
              Home
            </NavLink>
            <NavLink href="/properties?type=sale" scrolled={scrolled}>
              <Building2 size={16} />
              Buy
            </NavLink>
            <NavLink href="/properties?type=rent" scrolled={scrolled}>
              <Building2 size={16} />
              Rent
            </NavLink>
            <NavLink href="/properties?category=commercial" scrolled={scrolled}>
              <Building2 size={16} />
              Commercial
            </NavLink>
            <NavLink href="/properties?category=plot" scrolled={scrolled}>
              <Building2 size={16} />
              Plots/Land
            </NavLink>
            <NavLink href="/blog" scrolled={scrolled}>
              Blog
            </NavLink>
            <NavLink href="/calculator" scrolled={scrolled}>
              EMI Calculator
            </NavLink>
          </div>

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
                  onClick={() => setDropdownOpen(!dropdownOpen)}
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

                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0" onClick={() => setDropdownOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-semibold text-navy-800">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <LayoutDashboard size={16} />
                        My Dashboard
                      </Link>
                      <Link
                        href="/dashboard?tab=favorites"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Heart size={16} />
                        My Favorites
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gold-600 hover:bg-gold-50 font-medium"
                          onClick={() => setDropdownOpen(false)}
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

      {isOpen && (
        <div className="lg:hidden bg-white border-t shadow-xl">
          <div className="px-4 py-4 space-y-1">
            <MobileLink href="/" onClick={() => setIsOpen(false)}>Home</MobileLink>
            <MobileLink href="/properties?type=sale" onClick={() => setIsOpen(false)}>Buy Property</MobileLink>
            <MobileLink href="/properties?type=rent" onClick={() => setIsOpen(false)}>Rent Property</MobileLink>
            <MobileLink href="/properties?category=commercial" onClick={() => setIsOpen(false)}>Commercial</MobileLink>
            <MobileLink href="/properties?category=plot" onClick={() => setIsOpen(false)}>Plots/Land</MobileLink>
            <MobileLink href="/blog" onClick={() => setIsOpen(false)}>Blog</MobileLink>
            <MobileLink href="/calculator" onClick={() => setIsOpen(false)}>EMI Calculator</MobileLink>
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
                <MobileLink href="/dashboard" onClick={() => setIsOpen(false)}>My Dashboard</MobileLink>
                {user.role === "admin" && (
                  <MobileLink href="/admin" onClick={() => setIsOpen(false)}>Admin Panel</MobileLink>
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

function NavLink({ href, scrolled, children }: { href: string; scrolled: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg transition-all ${
        scrolled ? "text-navy-700 hover:bg-gray-100 hover:text-navy-900" : "text-gray-200 hover:bg-white/10 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link href={href} onClick={onClick} className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium">
      {children}
    </Link>
  );
}
