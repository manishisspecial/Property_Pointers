import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer | Property Pointers",
  description:
    "Legal disclaimer for Property Pointers: platform role, third-party content, due diligence, and limitations of liability.",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-navy-950 text-gray-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300 transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-8">
          Disclaimer
        </h1>
        <div className="text-sm sm:text-base leading-relaxed space-y-6 text-gray-400">
          <p>
            Property Pointers operates as an online discovery and marketing platform for real
            estate. Information on this website—including property listings, project descriptions,
            specifications, amenities, floor plans, pricing, availability, photographs, videos, maps,
            developer profiles, and locality details—is supplied by sellers, developers, channel
            partners, advertisers, and other third parties. We do not independently verify every
            field, figure, or claim; such information may be incomplete, outdated, or amended
            without notice. Nothing herein constitutes an offer, solicitation, or binding commitment
            to sell, lease, or finance any property.
          </p>
          <p>
            You should treat all content as general information only. Before making any decision to
            visit, book, pay, or enter an agreement, you must conduct your own due diligence,
            inspect the property and documents in person, and confirm facts—including title,
            encumbrances, approvals, possession timelines, carpet vs super area, charges, taxes, and
            RERA registration and compliance—with qualified professionals and the relevant
            authorities. Where applicable, refer to the project&apos;s RERA registration details and
            promotional material issued under law.
          </p>
          <p>
            Tools and calculators (including EMI, affordability, or design-related features),
            articles, insights, and any automated or informational outputs are illustrative and
            educational. They are not financial, tax, legal, investment, or architectural advice,
            and they rely on assumptions that may not match your situation. Results are estimates
            only; actual terms depend on lenders, regulators, contracts, and market conditions.
          </p>
          <p>
            Property Pointers, its affiliates, directors, employees, and partners shall not be
            liable for any direct or indirect loss, claim, or damage arising from reliance on this
            website, third-party content, delays or errors in transmission, or links to external
            sites. Third-party names, trademarks, and links are shown for convenience and do not
            imply endorsement unless expressly stated.
          </p>
          <p>
            By using this site you acknowledge that you have read this disclaimer and agree that
            your use is at your sole risk, subject to our Terms of Service and Privacy Policy where
            published. For material concerns about a listing or project, please contact us through
            the channels shown in the footer so we can review and take appropriate action where
            possible.
          </p>
        </div>
      </div>
    </div>
  );
}
