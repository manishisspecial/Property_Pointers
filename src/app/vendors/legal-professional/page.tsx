import VendorCategoryPageClient from "@/components/VendorCategoryPageClient";

export default function LegalProfessionalPage() {
  return (
    <VendorCategoryPageClient
      slug="legal-professional"
      title="Legal & Professional"
      description="Access legal and professional experts for compliance, documentation, and advisory needs."
      vendors={[
        { name: "RERA Legal Partners", city: "Delhi", specialty: "RERA & Property Compliance" },
        { name: "NCR Documentation Desk", city: "Ghaziabad", specialty: "Agreement & Registry Support" },
        { name: "TitleCheck Associates", city: "Pune", specialty: "Due Diligence & Verification" },
      ]}
    />
  );
}
