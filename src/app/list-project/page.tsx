import type { Metadata } from "next";
import ListProjectClient from "./ListProjectClient";

export const metadata: Metadata = {
  title: "List Your Project | PropertyPointers",
  description:
    "Showcase your real estate project on PropertyPointers. Get professional developer profiles, project microsites, buyer enquiry forms, city visibility and market report opportunities.",
};

export default function ListProjectPage() {
  return <ListProjectClient />;
}
