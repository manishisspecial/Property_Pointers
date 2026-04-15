import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | Property Pointers",
  description:
    "Property Pointers connects buyers, sellers, and developers with verified listings, trusted partners, and tools that make Indian real estate simpler and more transparent.",
};

export default function AboutPage() {
  return <AboutClient />;
}
