import VendorCategoryPageClient from "@/components/VendorCategoryPageClient";

export default function ProjectDevelopmentDesignPage() {
  return (
    <VendorCategoryPageClient
      slug="project-development-design"
      title="Project Development & Design"
      description="Find architects, planners, and design consultants to support planning and execution."
      vendors={[
        { name: "UrbanDraft Studio", city: "Gurugram", specialty: "Architecture & Master Planning" },
        { name: "DesignGrid Partners", city: "Noida", specialty: "Interior & Facade Design" },
        { name: "BuildVision Labs", city: "Jaipur", specialty: "Project Development Support" },
      ]}
    />
  );
}
