import type { Metadata } from "next";
import ListServiceClient from "./ListServiceClient";

export const metadata: Metadata = {
  title: "List Your Service | PropertyPointers",
  description:
    "List your real estate services on PropertyPointers. Get a service profile, portfolio showcase, city/category visibility, lead enquiry forms and real estate audience reach.",
};

export default function ListServicePage() {
  return <ListServiceClient />;
}
