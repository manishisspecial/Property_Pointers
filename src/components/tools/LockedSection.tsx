"use client";

import Link from "next/link";
import { Lock, Check } from "lucide-react";
import { useAuthGate } from "./useAuthGate";

// Wraps premium/advanced content. The core calculation always stays free; only
// the children passed here are gated behind a free account.
export function LockedSection({
  title,
  subtitle,
  features,
  children,
}: {
  title: string;
  subtitle?: string;
  features: string[];
  children: React.ReactNode;
}) {
  const { loading, isLoggedIn } = useAuthGate();

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-400">
        Loading…
      </div>
    );
  }

  if (isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <div className="relative rounded-2xl border border-gray-100 bg-white overflow-hidden">
      <div className="pointer-events-none select-none blur-[6px] opacity-60 max-h-[260px] overflow-hidden p-6">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-white/40 to-white/90 p-6">
        <div className="max-w-md text-center">
          <div className="w-12 h-12 mx-auto rounded-xl bg-navy-900 flex items-center justify-center">
            <Lock size={20} className="text-gold-400" />
          </div>
          <h3 className="text-lg font-bold text-navy-900 mt-3">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          <ul className="mt-4 space-y-1.5 text-left inline-block">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                <Check size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col items-center gap-2">
            <Link
              href="/auth/register?ref=tool"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
            >
              Create Free Account
            </Link>
            <p className="text-xs text-gray-500">
              Already a member? <Link href="/auth/login" className="text-gold-600 font-semibold">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
