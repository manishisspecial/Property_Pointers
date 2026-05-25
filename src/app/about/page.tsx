import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About PropertyPointers | India's Complete Real Estate Ecosystem",
  description:
    "Learn how PropertyPointers connects properties, developers, realty advisors, vendors, market insights and smart tools to simplify India's real estate journey.",
};

export default function AboutPage() {
  return <AboutClient />;
}
