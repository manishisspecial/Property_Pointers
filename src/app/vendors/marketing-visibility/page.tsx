import VendorCategoryPageClient from "@/components/VendorCategoryPageClient";

export default function MarketingVisibilityPage() {
  return (
    <VendorCategoryPageClient
      slug="marketing-visibility"
      title="Marketing & Visibility"
      description="Connect with marketing experts for branding, campaigns, paid media, and lead generation."
      vendors={[
        { name: "GrowthEdge Media", city: "Delhi", specialty: "Performance Ads & Funnels" },
        { name: "Skyline Reach", city: "Noida", specialty: "Social Media & Creative" },
        { name: "MarketPulse Realty", city: "Pune", specialty: "Real Estate Lead Campaigns" },
      ]}
    />
  );
}
