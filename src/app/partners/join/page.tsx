"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle, Users, TrendingUp, Sparkles, Shield,
  ArrowLeft, Briefcase, Target, Award, Handshake, Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { MotionSection } from "@/components/MarketingMotion";
import FAQAccordion from "@/components/FAQAccordion";

const CATEGORIES = [
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

export default function JoinPartnerPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [step, setStep] = useState<1 | 2>(1);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      company: String(form.get("company") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      city: String(form.get("city") || ""),
      category: String(form.get("category") || ""),
      experience: String(form.get("experience") || ""),
      reraLicense: String(form.get("reraLicense") || ""),
      activeProjects: String(form.get("activeProjects") || ""),
      details: String(form.get("details") || ""),
    };
    if (!payload.name || !payload.email || !payload.phone || !payload.company) {
      setStatus({ ok: false, text: "Please fill all required fields." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "partner_join_request",
          page: "/partners/join",
          details: JSON.stringify(payload),
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      e.currentTarget.reset();
      setStep(1);
      setStatus({ ok: true, text: "Application submitted successfully! Our team will review and contact you within 24-48 hours." });
    } catch {
      setStatus({ ok: false, text: "Unable to submit right now. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-gold-500/15 blur-[120px] rounded-full" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-blue-500/8 blur-[120px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14 sm:pt-32 sm:pb-16">
          <Link href="/partners" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-6">
            <ArrowLeft size={14} /> Partner Network
          </Link>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-start gap-4">
              <span className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                <Handshake size={28} className="text-gold-400" />
              </span>
              <div>
                <p className="text-xs font-bold tracking-wider text-gold-400 uppercase">Partner Network</p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-1">
                  Join As a Partner
                </h1>
                <p className="text-gray-300 mt-3 max-w-2xl text-lg">
                  Become a part of India&apos;s fastest-growing real estate partner network. 
                  Get verified leads, premium tools, and brand visibility.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <MotionSection className="card p-6 sm:p-8">
              {/* Step Indicator */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setStep(1)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    step === 1
                      ? "bg-gold-50 text-gold-700 border border-gold-200"
                      : "bg-gray-50 text-gray-500 border border-gray-100"
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-gold-500 text-white text-xs flex items-center justify-center">1</span>
                  Basic Info
                </button>
                <div className="w-8 h-px bg-gray-200" />
                <button
                  onClick={() => setStep(2)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    step === 2
                      ? "bg-gold-50 text-gold-700 border border-gold-200"
                      : "bg-gray-50 text-gray-500 border border-gray-100"
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center ${step === 2 ? "bg-gold-500 text-white" : "bg-gray-200 text-gray-500"}`}>2</span>
                  Professional Details
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-navy-900">Basic Information</h3>
                    <p className="text-sm text-gray-500">Tell us about yourself and your company.</p>

                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1.5">Full Name *</label>
                        <input name="name" placeholder="Your full name" className="input-field" required />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1.5">Company Name *</label>
                        <input name="company" placeholder="Your company/firm name" className="input-field" required />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1.5">Email *</label>
                        <input name="email" type="email" placeholder="your@email.com" className="input-field" required />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1.5">Phone *</label>
                        <input name="phone" placeholder="+91 XXXXX XXXXX" className="input-field" required />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1.5">City</label>
                        <input name="city" placeholder="Your operating city" className="input-field" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1.5">Category</label>
                        <select name="category" className="input-field">
                          <option value="">Select category</option>
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <button type="button" onClick={() => setStep(2)} className="btn-primary inline-flex items-center gap-2">
                        Next: Professional Details <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-navy-900">Professional Details</h3>
                    <p className="text-sm text-gray-500">Help us understand your expertise and track record.</p>

                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1.5">Years of Experience</label>
                        <select name="experience" className="input-field">
                          <option value="">Select experience</option>
                          <option value="0-2">0-2 years</option>
                          <option value="2-5">2-5 years</option>
                          <option value="5-10">5-10 years</option>
                          <option value="10+">10+ years</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1.5">RERA License (if any)</label>
                        <input name="reraLicense" placeholder="RERA registration number" className="input-field" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-sm font-medium text-gray-700 block mb-1.5">Active Projects / Listings</label>
                        <input name="activeProjects" placeholder="Number of active projects you handle" className="input-field" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-sm font-medium text-gray-700 block mb-1.5">About Your Services</label>
                        <textarea
                          name="details"
                          placeholder="Tell us about your services, specialization, and what makes you stand out..."
                          className="input-field min-h-[120px]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <button type="button" onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-navy-700 flex items-center gap-1">
                        <ArrowLeft size={14} /> Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary inline-flex items-center gap-2 disabled:opacity-60"
                      >
                        {loading ? "Submitting..." : "Submit Application"}
                        {!loading && <CheckCircle size={16} />}
                      </button>
                    </div>
                  </div>
                )}
              </form>

              {status && (
                <div className={`mt-6 p-4 rounded-xl ${status.ok ? "bg-emerald-50 border border-emerald-200" : "bg-red-50 border border-red-200"}`}>
                  <p className={`text-sm font-medium ${status.ok ? "text-emerald-700" : "text-red-700"}`}>
                    {status.ok && <CheckCircle size={16} className="inline mr-1.5 -mt-0.5" />}
                    {status.text}
                  </p>
                </div>
              )}
            </MotionSection>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Benefits */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-navy-900 flex items-center gap-2">
                <Star size={18} className="text-gold-500" /> Partner Benefits
              </h3>
              <div className="mt-4 space-y-3">
                {[
                  { icon: <Target size={16} className="text-blue-500" />, text: "Pre-qualified buyer & investor leads" },
                  { icon: <Sparkles size={16} className="text-purple-500" />, text: "Premium partner badge & profile" },
                  { icon: <TrendingUp size={16} className="text-emerald-500" />, text: "Analytics & performance dashboard" },
                  { icon: <Shield size={16} className="text-gold-500" />, text: "Verified trust seal" },
                  { icon: <Users size={16} className="text-navy-500" />, text: "Developer network access" },
                  { icon: <Briefcase size={16} className="text-amber-500" />, text: "Marketing & co-branding support" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                      {item.icon}
                    </span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="card p-6 bg-navy-50 border-navy-100">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="text-gold-500 fill-gold-500" />
                ))}
              </div>
              <p className="text-sm text-navy-800 leading-relaxed italic">
                &ldquo;Joining Property Pointers partner network transformed our business. The lead quality is excellent, 
                and the platform tools help us close deals faster.&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-navy-800 flex items-center justify-center text-white text-xs font-bold">R</div>
                <div>
                  <p className="text-sm font-semibold text-navy-900">Rajesh K.</p>
                  <p className="text-xs text-gray-500">Channel Partner, Delhi NCR</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card p-6">
              <h3 className="text-sm font-bold text-navy-900 mb-3">Network Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "100+", label: "Active Partners" },
                  { value: "5000+", label: "Leads/Month" },
                  { value: "95%", label: "Satisfaction" },
                  { value: "24h", label: "Response Time" },
                ].map((s) => (
                  <div key={s.label} className="text-center bg-gray-50 border border-gray-100 rounded-lg p-3">
                    <p className="text-lg font-bold text-navy-900">{s.value}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* FAQ */}
        <div className="mt-10">
          <FAQAccordion
            title="Partner Application FAQ"
            items={[
              {
                question: "How long does the verification process take?",
                answer: "Our team typically reviews applications within 24-48 hours. You'll receive an email with the status and next steps.",
              },
              {
                question: "Do I need a RERA license to apply?",
                answer: "A RERA license is preferred but not mandatory. We evaluate partners based on experience, track record, and market reputation.",
              },
              {
                question: "Is there any joining fee?",
                answer: "No. Joining the partner network is completely free. Premium lead packages are available as optional add-ons.",
              },
              {
                question: "What cities are you active in?",
                answer: "We are currently active in Delhi NCR (Delhi, Noida, Gurugram, Ghaziabad, Greater Noida), Jaipur, and Pune. Expanding to more cities soon.",
              },
              {
                question: "Can I operate in multiple cities?",
                answer: "Yes. Multi-city partners can list their services across all operating cities for maximum lead coverage.",
              },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
