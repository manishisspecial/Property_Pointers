import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { ToolHero } from "@/components/tools/ToolShell";
import JsonLd, { faqSchema } from "@/components/tools/JsonLd";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "AI Property Advisor India 2026 — Ask Any Real Estate Question Free | PropertyPointers",
  description:
    "Get clear, practical answers to common Indian real estate questions — buying, home loans, RERA, investment and more — and jump to the right free tool.",
  alternates: { canonical: "/insights/ai-advisor" },
};

const TOPICS = [
  { title: "Buying & Budget", q: "How much property can I afford?", href: "/tools/affordability" },
  { title: "Home Loans", q: "What EMI will I pay?", href: "/tools/emi-calculator" },
  { title: "Investment", q: "What return can I expect?", href: "/tools/roi-calculator" },
  { title: "Legal & RERA", q: "Is this project RERA-registered?", href: "/tools/rera-check" },
  { title: "Rent vs Buy", q: "Should I rent or buy?", href: "/tools/rent-vs-buy" },
  { title: "Construction", q: "What will it cost to build?", href: "/tools/construction-cost" },
];

const FAQ = [
  { question: "Is it a good time to buy property in India in 2026?", answer: "Timing depends more on your readiness than the market: stable income, a 6-month emergency fund, and a 7+ year horizon matter most. Use the Affordability and Rent vs Buy tools to pressure-test your specific numbers before deciding." },
  { question: "How much home loan can I get on my salary?", answer: "Lenders cap total EMIs at roughly 40-55% of income (the FOIR). On a ₹1 lakh monthly income with no other EMIs you can usually service ₹45,000-50,000, supporting a ₹50-60 lakh loan over 20 years. Check the Home Loan Eligibility tool for your figure." },
  { question: "What should I verify before paying a booking token?", answer: "Confirm the project's RERA registration and validity, the title and approvals, the builder's track record, and the carpet-vs-super area. Never pay before verifying RERA status on the official state portal." },
  { question: "How do I know if a property is a good investment?", answer: "Look at rental yield (income) and expected appreciation (capital growth) together, net of stamp duty, maintenance and taxes. The ROI and Rental Yield tools help you quantify both." },
  { question: "Should I buy under-construction or ready-to-move?", answer: "Ready-to-move avoids construction risk and rent overlap but costs more. Under-construction can be cheaper with payment flexibility but carries delay risk — only with a strong, RERA-registered developer." },
];

export default function AiAdvisorPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQ)} />
      <ToolHero
        eyebrow="Insights · Beta"
        title="AI Property Advisor"
        subtitle="Clear, practical answers to the most common Indian real-estate questions — and a direct path to the free tool that does the math for you."
        breadcrumb={false}
      />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-7">
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-2 text-gold-600">
              <Sparkles size={18} />
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase">Pick a topic</p>
            </div>
            <h2 className="text-xl font-bold text-navy-900 mt-2">What do you want help with?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
              {TOPICS.map((t) => (
                <Link
                  key={t.title}
                  href={t.href}
                  className="group rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-sm transition-all p-4"
                >
                  <p className="font-semibold text-navy-900 text-sm">{t.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{t.q}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-gold-600 mt-3">
                    Open tool <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <FAQAccordion title="Common questions, answered" items={FAQ} />

          <section className="gradient-navy rounded-2xl p-6 sm:p-8 text-white text-center">
            <h3 className="text-lg font-bold">Want a personalised answer?</h3>
            <p className="text-sm text-gray-300 mt-2 max-w-xl mx-auto">
              Create a free account to save your calculations and get tailored guidance based on your budget and city.
            </p>
            <Link
              href="/auth/register?ref=ai-advisor"
              className="inline-flex items-center gap-2 mt-5 bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
            >
              Create Free Account <ArrowRight size={16} />
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
