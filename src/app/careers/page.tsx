import type { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers | Property Pointers",
  description:
    "Build the future of Indian real estate with Property Pointers. Explore open roles in engineering, design, growth, and partner success.",
};

export default function CareersPage() {
  return <CareersClient />;
}
