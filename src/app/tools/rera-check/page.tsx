import type { Metadata } from "next";
import { Suspense } from "react";
import { ToolHero } from "@/components/tools/ToolShell";
import JsonLd, { faqSchema } from "@/components/tools/JsonLd";
import ReraCheckTool from "@/components/tools/calculators/ReraCheckTool";
import { RERA_FAQ } from "@/components/tools/calculators/faqs";

export const metadata: Metadata = {
  title: "Free RERA Check Tool India 2026 — Verify Any Project Instantly | PropertyPointers",
  description:
    "Check RERA registration status for any property project and get direct links to official state RERA portals (UP-RERA, MahaRERA, K-RERA and more). 100% free.",
  alternates: { canonical: "/tools/rera-check" },
};

const reraSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "PropertyPointers RERA Check Tool",
  url: "https://www.propertypointers.com/tools/rera-check",
  applicationCategory: "RealEstateApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
};

export default function ReraCheckPage() {
  return (
    <>
      <JsonLd data={[reraSchema, faqSchema(RERA_FAQ)]} />
      <ToolHero
        eyebrow="Free Tool"
        title="RERA Check"
        subtitle="Verify a project's RERA registration status and jump straight to the official state portal — before you pay any token."
      />
      <Suspense>
        <ReraCheckTool />
      </Suspense>
    </>
  );
}
