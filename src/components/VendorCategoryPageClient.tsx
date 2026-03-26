"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { MotionCard, MotionGrid, MotionSection } from "@/components/MarketingMotion";

type VendorProfile = {
  name: string;
  city: string;
  specialty: string;
};

type Props = {
  title: string;
  description: string;
  vendors: VendorProfile[];
  slug: string;
};

export default function VendorCategoryPageClient({ title, description, vendors, slug }: Props) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "");
    const phone = String(form.get("phone") || "");
    const requirement = String(form.get("requirement") || "");
    if (!name || !phone || !requirement) {
      setStatus({ ok: false, text: "Please complete all required fields." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "vendor_callback_request",
          page: `/vendors/${slug}`,
          details: JSON.stringify({ title, name, phone, requirement }),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      e.currentTarget.reset();
      setStatus({ ok: true, text: "Callback request submitted. A vendor expert will contact you soon." });
    } catch {
      setStatus({ ok: false, text: "Could not submit request. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <MotionSection className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-navy-900 to-navy-700 text-white p-7 sm:p-10 shadow-xl">
          <p className="text-xs font-semibold tracking-wider uppercase text-gold-300">Vendor Marketplace</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold">{title}</h1>
          <p className="mt-3 text-gray-200 max-w-2xl">{description}</p>
          <Link href="/vendors/join" className="btn-secondary mt-6 inline-flex">
            Join As a Vendor
          </Link>
        </div>
      </MotionSection>

      <MotionSection className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <h2 className="text-2xl font-bold text-navy-900 mb-4">Featured Vendors</h2>
        <MotionGrid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vendors.map((vendor) => (
            <MotionCard key={vendor.name} className="card p-5">
              <h3 className="font-semibold text-navy-900">{vendor.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{vendor.specialty}</p>
              <p className="text-sm text-gray-700 mt-2">{vendor.city}</p>
            </MotionCard>
          ))}
        </MotionGrid>
      </MotionSection>

      <MotionSection className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="card p-6">
          <h2 className="text-xl font-bold text-navy-900">Request a Callback</h2>
          <p className="text-sm text-gray-600 mt-1">Share your requirement and get matched with the right vendor.</p>
          <form className="mt-4 grid gap-3 sm:grid-cols-2" onSubmit={onSubmit}>
            <input name="name" placeholder="Your Name *" className="input-field" />
            <input name="phone" placeholder="Phone Number *" className="input-field" />
            <textarea name="requirement" placeholder="Requirement *" className="input-field sm:col-span-2 min-h-[110px]" />
            <button disabled={loading} className="btn-primary sm:col-span-2 justify-center disabled:opacity-60">
              {loading ? "Sending..." : "Request Callback"}
            </button>
          </form>
          {status && <p className={`mt-3 text-sm ${status.ok ? "text-emerald-600" : "text-red-600"}`}>{status.text}</p>}
        </div>
      </MotionSection>
    </main>
  );
}
