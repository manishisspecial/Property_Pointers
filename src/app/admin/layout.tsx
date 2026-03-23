"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Building2, Users, BarChart3, MessageCircle, Settings,
  Activity, ChevronRight, LogOut, Menu, X, Shield, BookOpen, Landmark, ExternalLink, Gauge
} from "lucide-react";
import Logo from "@/components/Logo";

const SIDEBAR_ITEMS = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/properties", icon: Building2, label: "Properties" },
  { href: "/admin/projects", icon: Landmark, label: "Projects" },
  { href: "/admin/users", icon: Users, label: "Users" },
  { href: "/admin/inquiries", icon: MessageCircle, label: "Inquiries" },
  { href: "/admin/blog", icon: BookOpen, label: "Blog" },
  { href: "/admin/performance", icon: Gauge, label: "Performance" },
  { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        router.push("/auth/login");
        return;
      }
      const data = await res.json();
      if (data.user.role !== "admin") {
        router.push("/dashboard");
        return;
      }
      setUser(data.user);
    } catch {
      router.push("/auth/login");
    }
    setLoading(false);
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  return (
    <>
      {/* Admin Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-navy-900 border-b border-white/10 z-50 flex items-center px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link href="/admin" className="shrink-0">
            <Logo variant="light" size="md" />
          </Link>
          <span className="hidden sm:inline text-gray-500 text-sm font-medium ml-1 pl-3 border-l border-white/10">
            Admin Panel
          </span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-sm text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink size={14} />
            <span className="hidden sm:inline">View Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1.5 transition-colors"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Logout</span>
          </button>
          <div className="flex items-center gap-2 pl-3 border-l border-white/10">
            <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.[0] || "A"}
            </div>
            <div className="hidden sm:block">
              <p className="text-white text-sm font-medium leading-tight">{user?.name || "Admin"}</p>
              <p className="text-gray-400 text-[11px] leading-tight flex items-center gap-1">
                <Shield size={9} /> Admin
              </p>
            </div>
          </div>
        </div>
      </header>

      {loading ? (
        <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-100">
          <div className="animate-spin w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 flex pt-16">
          {/* Sidebar Overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}

          {/* Sidebar */}
          <aside className={`fixed top-16 left-0 bottom-0 w-64 bg-navy-900 z-40 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}>
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-white font-bold">
                    {user?.name?.[0] || "A"}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{user?.name}</p>
                    <p className="text-gray-400 text-xs flex items-center gap-1">
                      <Shield size={10} /> Admin
                    </p>
                  </div>
                </div>
              </div>

              <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {SIDEBAR_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-gold-500/10 text-gold-400"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <item.icon size={18} />
                      {item.label}
                      {isActive && <ChevronRight size={14} className="ml-auto" />}
                    </Link>
                  );
                })}
              </nav>

              <div className="p-3 border-t border-white/10">
                <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all">
                  <Activity size={18} /> View Site
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 w-full transition-all">
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 lg:ml-64">
            <div className="p-4 md:p-6 lg:p-8">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
