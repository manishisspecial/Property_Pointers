"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { roleNeedsProfileOnboarding } from "@/lib/role-dashboard";

/**
 * Ensures partner/vendor/developer users complete /onboarding before seeing role dashboards.
 */
export function OnboardingGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) return;
        const u = data?.user;
        if (!u) {
          router.replace("/auth/login");
          return;
        }
        if (roleNeedsProfileOnboarding(u.role) && u.onboardingComplete !== true) {
          router.replace("/onboarding");
          return;
        }
        setAllowed(true);
      })
      .catch(() => {
        if (!cancelled) router.replace("/auth/login");
      });
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (!allowed) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-500 text-sm">
        Loading…
      </div>
    );
  }

  return <>{children}</>;
}
