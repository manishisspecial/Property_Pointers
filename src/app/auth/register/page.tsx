"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, AlertCircle } from "lucide-react";
import Logo from "@/components/Logo";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", role: "user" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateForm(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }

      window.location.href = "/dashboard";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 gradient-navy items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="relative text-center">
          <div className="mb-8">
            <Logo variant="light" size="xl" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Join Property Pointers</h2>
          <p className="text-gray-300 text-lg max-w-md">
            Create your free account and start exploring thousands of verified properties across India.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-xs mx-auto">
            <div className="text-center">
              <p className="text-2xl font-bold text-gold-400">10K+</p>
              <p className="text-xs text-gray-400">Properties</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gold-400">50K+</p>
              <p className="text-xs text-gray-400">Users</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gold-400">50+</p>
              <p className="text-xs text-gray-400">Cities</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <Logo variant="dark" size="lg" />
          </div>

          <h1 className="text-3xl font-bold text-navy-900 mb-2">Create Account</h1>
          <p className="text-gray-500 mb-8">Start your property journey with us</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <AlertCircle size={18} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" value={form.name} onChange={(e) => updateForm("name", e.target.value)} className="input-field pl-10" placeholder="John Doe" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={form.email} onChange={(e) => updateForm("email", e.target.value)} className="input-field pl-10" placeholder="you@example.com" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="tel" value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} className="input-field pl-10" placeholder="+91 9876543210" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">I am a</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "user", label: "Buyer/Tenant" },
                  { value: "owner", label: "Owner" },
                  { value: "agent", label: "Agent" },
                ].map((r) => (
                  <button key={r.value} type="button" onClick={() => updateForm("role", r.value)}
                    className={`py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
                      form.role === r.value
                        ? "border-gold-500 bg-gold-50 text-gold-700"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => updateForm("password", e.target.value)}
                  className="input-field pl-10 pr-10"
                  placeholder="Minimum 6 characters"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? "Creating Account..." : "Create Account"} <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-gold-500 font-semibold hover:text-gold-600">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
