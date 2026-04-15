"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  ArrowRight,
  Building2,
  Store,
  HardHat,
  ExternalLink,
} from "lucide-react";
import { defaultDashboardHref } from "@/lib/role-dashboard";

type RoleKey = "partner" | "vendor" | "developer";

const META: Record<
  RoleKey,
  { title: string; description: string; icon: typeof Building2; accent: string }
> = {
  partner: {
    title: "Partner dashboard",
    description:
      "Manage your partner profile, leads, and tools. Use the full dashboard for saved listings and inquiries.",
    icon: Building2,
    accent: "from-amber-500/20 to-gold-500/10",
  },
  vendor: {
    title: "Vendor dashboard",
    description:
      "Your vendor workspace. Reach developers and builders; access property tools anytime from the full dashboard.",
    icon: Store,
    accent: "from-emerald-500/20 to-teal-500/10",
  },
  developer: {
    title: "Developer dashboard",
    description:
      "Showcase projects and manage your presence. Open the full dashboard for listings, favorites, and account settings.",
    icon: HardHat,
    accent: "from-blue-500/20 to-indigo-500/10",
  },
};

export function RoleHomeDashboard({ role }: { role: RoleKey }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/auth/login");
          return;
        }
        const data = await res.json();
        if (cancelled) return;
        setUser(data.user);
        if (data.user.role !== role) {
          router.replace(defaultDashboardHref(data.user.role));
        }
      } catch {
        router.push("/auth/login");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [role, router]);

  if (loading || !user || user.role !== role) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const m = META[role];
  const Icon = m.icon;

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className={`rounded-2xl border border-gray-100 bg-gradient-to-br ${m.accent} p-8 sm:p-10 mb-8 shadow-sm`}
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white shadow flex items-center justify-center shrink-0">
              <Icon className="text-navy-800" size={28} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gold-600">Welcome</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-navy-900 mt-1">{m.title}</h1>
              <p className="text-gray-600 mt-2 max-w-2xl">{m.description}</p>
              <p className="text-sm text-gray-500 mt-4">
                Signed in as <span className="font-medium text-navy-800">{user.name}</span> ({user.email})
              </p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/dashboard"
            className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:border-gold-200 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-navy-800 flex items-center justify-center">
                  <LayoutDashboard className="text-white" size={22} />
                </div>
                <div>
                  <p className="font-semibold text-navy-900">Full dashboard</p>
                  <p className="text-sm text-gray-500">Properties, favorites, inquiries, settings</p>
                </div>
              </div>
              <ArrowRight
                className="text-gray-400 group-hover:text-gold-500 shrink-0 transition-colors"
                size={20}
              />
            </div>
          </Link>

          {role === "partner" && (
            <Link
              href="/partners"
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:border-gold-200 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gold-100 flex items-center justify-center">
                    <Building2 className="text-gold-700" size={22} />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">Partner network</p>
                    <p className="text-sm text-gray-500">Explore the program and categories</p>
                  </div>
                </div>
                <ExternalLink
                  className="text-gray-400 group-hover:text-gold-500 shrink-0 transition-colors"
                  size={20}
                />
              </div>
            </Link>
          )}

          {role === "vendor" && (
            <Link
              href="/vendors"
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:border-gold-200 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Store className="text-emerald-700" size={22} />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">Vendor marketplace</p>
                    <p className="text-sm text-gray-500">Services and categories</p>
                  </div>
                </div>
                <ExternalLink
                  className="text-gray-400 group-hover:text-gold-500 shrink-0 transition-colors"
                  size={20}
                />
              </div>
            </Link>
          )}

          {role === "developer" && (
            <Link
              href="/developers"
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:border-gold-200 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                    <HardHat className="text-blue-700" size={22} />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">Developers</p>
                    <p className="text-sm text-gray-500">Browse builder profiles and projects</p>
                  </div>
                </div>
                <ExternalLink
                  className="text-gray-400 group-hover:text-gold-500 shrink-0 transition-colors"
                  size={20}
                />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
