"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LogOut, Home, Plus, ChevronDown, LayoutDashboard, Heart, Search,
  Building2,
} from "lucide-react";
import Logo from "@/components/Logo";
import { defaultDashboardHref } from "@/lib/role-dashboard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white z-50 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="shrink-0">
              <Logo variant="dark" size="md" />
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-navy-800 px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-1.5"
              >
                <Home size={14} /> Home
              </Link>
              <Link
                href="/properties"
                className="text-sm text-gray-600 hover:text-navy-800 px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-1.5"
              >
                <Search size={14} /> Properties
              </Link>
              <Link
                href="/projects"
                className="text-sm text-gray-600 hover:text-navy-800 px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-1.5"
              >
                <Building2 size={14} /> Projects
              </Link>
              <Link
                href="/blog"
                className="text-sm text-gray-600 hover:text-navy-800 px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-1.5"
              >
                Blog
              </Link>
              <Link
                href="/post-property"
                className="text-sm text-gold-600 font-medium px-3 py-2 rounded-lg hover:bg-gold-50 flex items-center gap-1.5"
              >
                <Plus size={14} /> Post Property
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>}
              </svg>
            </button>

            {user && (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-navy-800 to-navy-600 flex items-center justify-center text-white text-sm font-bold">
                    {user.name?.[0]}
                  </div>
                  <span className="text-sm font-medium text-navy-800 hidden sm:block max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown size={14} className="text-gray-400" />
                </button>

                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0" onClick={() => setDropdownOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-semibold text-navy-800">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link
                        href={user ? defaultDashboardHref(user.role) : "/dashboard"}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>
                      <Link
                        href="/dashboard?tab=favorites"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Heart size={16} /> Favorites
                      </Link>
                      <Link
                        href="/"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Home size={16} /> Go to Home
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gold-600 hover:bg-gold-50 font-medium"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <LayoutDashboard size={16} /> Admin Panel
                        </Link>
                      )}
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg px-4 py-3 space-y-1">
            <Link href="/" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
              <Home size={16} /> Home
            </Link>
            <Link href="/properties" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
              <Search size={16} /> Properties
            </Link>
            <Link href="/projects" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
              <Building2 size={16} /> Projects
            </Link>
            <Link href="/blog" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
              Blog
            </Link>
            <Link href="/post-property" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gold-600 font-medium hover:bg-gold-50" onClick={() => setMobileMenuOpen(false)}>
              <Plus size={16} /> Post Property
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="pt-16 flex-1">{children}</div>

      <footer className="border-t border-gray-200 bg-white py-4">
        <p className="text-center text-xs text-gray-500">
          All rights reserved © 2026 PropertyPointers
        </p>
      </footer>
    </div>
  );
}
