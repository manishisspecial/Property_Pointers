"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, Handshake, Store } from "lucide-react";
import Logo from "@/components/Logo";
import { defaultDashboardHref, roleNeedsProfileOnboarding } from "@/lib/role-dashboard";

const PARTNER_CATEGORIES = [
  "Channel Partner",
  "Resale Specialist",
  "Project Sales",
  "Rental Services",
  "Land Consultant",
  "Investment Advisory",
  "NRI Services",
  "Commercial Specialist",
  "Legal & Documentation",
  "Other",
];

type MeUser = {
  role: string;
  name: string;
  email: string;
  onboardingComplete?: boolean;
  profileMeta?: Record<string, string> | null;
};

export default function OnboardingPage() {
  const router = useRouter();
  const [user, setUser] = useState<MeUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Partner
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [experience, setExperience] = useState("");
  const [reraLicense, setReraLicense] = useState("");
  const [pDetails, setPDetails] = useState("");

  // Vendor
  const [businessName, setBusinessName] = useState("");
  const [vCategory, setVCategory] = useState("");
  const [vCity, setVCity] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [vDetails, setVDetails] = useState("");

  // Developer
  const [companyName, setCompanyName] = useState("");
  const [dCity, setDCity] = useState("");
  const [website, setWebsite] = useState("");
  const [reraNumber, setReraNumber] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const u = data?.user as MeUser | undefined;
        if (!u) {
          router.replace("/auth/login");
          return;
        }
        if (!roleNeedsProfileOnboarding(u.role)) {
          router.replace(defaultDashboardHref(u.role));
          return;
        }
        if (u.onboardingComplete === true) {
          router.replace(defaultDashboardHref(u.role));
          return;
        }
        setUser(u);
        const m = u.profileMeta;
        if (m && typeof m === "object") {
          setCompany(String(m.company ?? ""));
          setCity(String(m.city ?? ""));
          setCategory(String(m.category ?? ""));
          setExperience(String(m.experience ?? ""));
          setReraLicense(String(m.reraLicense ?? ""));
          setPDetails(String(m.details ?? ""));
          setBusinessName(String(m.businessName ?? ""));
          setVCategory(String(m.category ?? ""));
          setVCity(String(m.city ?? ""));
          setPortfolio(String(m.portfolio ?? ""));
          setVDetails(String(m.details ?? ""));
          setCompanyName(String(m.companyName ?? ""));
          setDCity(String(m.city ?? ""));
          setWebsite(String(m.website ?? ""));
          setReraNumber(String(m.reraNumber ?? ""));
          setAbout(String(m.about ?? ""));
        }
      })
      .finally(() => setLoading(false));
  }, [router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/user/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          user?.role === "partner"
            ? { company, city, category, experience, reraLicense, details: pDetails }
            : user?.role === "vendor"
              ? { businessName, category: vCategory, city: vCity, portfolio, details: vDetails }
              : { companyName, city: dCity, website, reraNumber, about }
        ),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Could not save. Try again.");
        return;
      }
      if (user) {
        window.location.href = defaultDashboardHref(user.role);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500 text-sm">
        Loading…
      </div>
    );
  }

  const role = user.role;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <Logo variant="dark" size="md" />
          </Link>
          <h1 className="text-2xl font-bold text-navy-900">Complete your profile</h1>
          <p className="text-gray-600 text-sm mt-2">
            A few details help us set up your {role === "partner" ? "partner" : role === "vendor" ? "vendor" : "developer"}{" "}
            experience. You only do this once.
          </p>
        </div>

        <form onSubmit={onSubmit} className="card p-6 sm:p-8 space-y-4">
          {role === "partner" && (
            <>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-xl bg-navy-800 flex items-center justify-center shrink-0">
                  <Handshake className="text-gold-400" size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gold-600">Partner</p>
                  <p className="text-sm text-gray-600">Business information</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Company / firm name *</label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="input-field mt-1"
                  placeholder="Your company or firm name"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-field mt-1"
                  required
                >
                  <option value="">Select category</option>
                  {PARTNER_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Primary city</label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="input-field mt-1"
                  placeholder="e.g. Delhi NCR"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Years of experience</label>
                <select value={experience} onChange={(e) => setExperience(e.target.value)} className="input-field mt-1">
                  <option value="">Select</option>
                  <option value="0-2">0–2 years</option>
                  <option value="2-5">2–5 years</option>
                  <option value="5-10">5–10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">RERA license (if any)</label>
                <input
                  value={reraLicense}
                  onChange={(e) => setReraLicense(e.target.value)}
                  className="input-field mt-1"
                  placeholder="Registration number"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">About your services</label>
                <textarea
                  value={pDetails}
                  onChange={(e) => setPDetails(e.target.value)}
                  className="input-field mt-1 min-h-[100px]"
                  placeholder="Brief description (optional)"
                />
              </div>
            </>
          )}

          {role === "vendor" && (
            <>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-xl bg-navy-800 flex items-center justify-center shrink-0">
                  <Store className="text-gold-400" size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gold-600">Vendor</p>
                  <p className="text-sm text-gray-600">Business & services</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Business name *</label>
                <input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="input-field mt-1"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Service category *</label>
                <input
                  value={vCategory}
                  onChange={(e) => setVCategory(e.target.value)}
                  className="input-field mt-1"
                  placeholder="e.g. Legal, MEP, Branding"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Primary city</label>
                <input
                  value={vCity}
                  onChange={(e) => setVCity(e.target.value)}
                  className="input-field mt-1"
                  placeholder="City you operate from"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Portfolio / website</label>
                <input
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  className="input-field mt-1"
                  placeholder="https://"
                  type="url"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">About your services</label>
                <textarea
                  value={vDetails}
                  onChange={(e) => setVDetails(e.target.value)}
                  className="input-field mt-1 min-h-[100px]"
                  placeholder="Optional"
                />
              </div>
            </>
          )}

          {role === "developer" && (
            <>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-xl bg-navy-800 flex items-center justify-center shrink-0">
                  <Building2 className="text-gold-400" size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gold-600">Developer</p>
                  <p className="text-sm text-gray-600">Organization details</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Organization / brand name *</label>
                <input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="input-field mt-1"
                  placeholder="As registered or marketed"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Primary city *</label>
                <input
                  value={dCity}
                  onChange={(e) => setDCity(e.target.value)}
                  className="input-field mt-1"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Website</label>
                <input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="input-field mt-1"
                  placeholder="https://"
                  type="url"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">RERA / registration (if any)</label>
                <input
                  value={reraNumber}
                  onChange={(e) => setReraNumber(e.target.value)}
                  className="input-field mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">About your projects</label>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="input-field mt-1 min-h-[100px]"
                  placeholder="Short overview (optional)"
                />
              </div>
            </>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-60">
            {submitting ? "Saving…" : "Continue to dashboard"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Signed in as {user.email}.{" "}
          <button
            type="button"
            className="text-gold-600 font-medium hover:underline"
            onClick={() => {
              fetch("/api/auth/logout", { method: "POST" }).then(() => {
                window.location.href = "/auth/login";
              });
            }}
          >
            Sign out
          </button>
        </p>
      </div>
    </div>
  );
}
