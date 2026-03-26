import VendorCategoryPageClient from "@/components/VendorCategoryPageClient";

export default function ProjectSupportServicesPage() {
  return (
    <VendorCategoryPageClient
      slug="project-support-services"
      title="Project Support Services"
      description="Work with reliable providers for project operations, maintenance, and post-handover support."
      vendors={[
        { name: "BuildOps Assist", city: "Noida", specialty: "Facility & Operations Support" },
        { name: "Maintena Hub", city: "Gurugram", specialty: "Site Maintenance & Services" },
        { name: "ServiceCore Projects", city: "Delhi", specialty: "Project Execution Support" },
      ]}
    />
  );
}
