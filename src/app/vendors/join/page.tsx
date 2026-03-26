"use client";

import { FormEvent, useState } from "react";
import { MotionSection } from "@/components/MarketingMotion";

export default function JoinVendorPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    const form = new FormData(e.currentTarget);
    const payload = {
      business: String(form.get("business") || ""),
      category: String(form.get("category") || ""),
      city: String(form.get("city") || ""),
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      portfolio: String(form.get("portfolio") || ""),
      details: String(form.get("details") || ""),
    };
    if (!payload.business || !payload.category || !payload.name || !payload.phone) {
      setStatus({ ok: false, text: "Please complete all required fields." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "vendor_join_request",
          page: "/vendors/join",
          details: JSON.stringify(payload),
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      e.currentTarget.reset();
      setStatus({ ok: true, text: "Vendor request submitted successfully." });
    } catch {
      setStatus({ ok: false, text: "Could not submit at this moment. Please retry." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <MotionSection className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card p-6 sm:p-8">
          <p className="text-xs font-semibold tracking-wider uppercase text-gold-600">Vendor Marketplace</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-navy-900">Join As a Vendor</h1>
          <p className="mt-3 text-gray-600">
            Submit your business details to get listed and receive relevant project opportunities.
          </p>

          <form className="mt-6 grid gap-3 sm:grid-cols-2" onSubmit={onSubmit}>
            <input name="business" placeholder="Business Name *" className="input-field" />
            <input name="category" placeholder="Service Category *" className="input-field" />
            <input name="city" placeholder="Primary City" className="input-field" />
            <input name="name" placeholder="Contact Person *" className="input-field" />
            <input name="email" type="email" placeholder="Email" className="input-field" />
            <input name="phone" placeholder="Phone *" className="input-field" />
            <input name="portfolio" placeholder="Portfolio / Website URL" className="input-field sm:col-span-2" />
            <textarea name="details" placeholder="Brief about your services" className="input-field sm:col-span-2 min-h-[120px]" />
            <button disabled={loading} className="btn-primary sm:col-span-2 justify-center disabled:opacity-60">
              {loading ? "Submitting..." : "Submit Vendor Application"}
            </button>
          </form>
          {status && <p className={`mt-3 text-sm ${status.ok ? "text-emerald-600" : "text-red-600"}`}>{status.text}</p>}
        </div>
      </MotionSection>
    </main>
  );
}
