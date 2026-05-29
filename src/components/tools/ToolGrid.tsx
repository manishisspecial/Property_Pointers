import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface ToolLink {
  title: string;
  desc: string;
  href: string;
  icon: string; // emoji or short label
}

export const ALL_TOOLS: ToolLink[] = [
  { title: "EMI Calculator", desc: "Monthly home loan EMI", href: "/tools/emi-calculator", icon: "🏦" },
  { title: "Home Loan Eligibility", desc: "How much loan can I get?", href: "/tools/home-loan-eligibility", icon: "📊" },
  { title: "Affordability", desc: "Can I afford this property?", href: "/tools/affordability", icon: "💡" },
  { title: "Stamp Duty", desc: "State-wise registration charges", href: "/tools/stamp-duty-calculator", icon: "📋" },
  { title: "ROI Calculator", desc: "Return on investment", href: "/tools/roi-calculator", icon: "📈" },
  { title: "Rental Yield", desc: "Rental income potential", href: "/tools/rental-yield-calculator", icon: "🔑" },
  { title: "Construction Cost", desc: "Estimate building cost", href: "/tools/construction-cost", icon: "🏗️" },
  { title: "Rent vs Buy", desc: "Which is better for you?", href: "/tools/rent-vs-buy", icon: "🏠" },
  { title: "AI Vastu Calculator", desc: "Upload floor plan — free score", href: "/tools/vastu-calculator", icon: "🧭" },
  { title: "RERA Check", desc: "Verify any project", href: "/tools/rera-check", icon: "✅" },
];

export function ToolGrid({ exclude }: { exclude?: string }) {
  const tools = ALL_TOOLS.filter((t) => t.href !== exclude);
  return (
    <div>
      <h3 className="text-lg font-bold text-navy-900">More free tools</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-sm transition-all px-4 py-3.5"
          >
            <span className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shrink-0 text-lg">
              {t.icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-navy-900 text-sm truncate">{t.title}</p>
              <p className="text-xs text-gray-500 truncate">{t.desc}</p>
            </div>
            <ArrowRight size={16} className="text-gray-400 group-hover:text-navy-800 transition-colors shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
