import type { Metadata } from "next";
import JoinAdvisorClient from "./JoinAdvisorClient";

export const metadata: Metadata = {
  title: "Join as Realty Advisor | PropertyPointers",
  description:
    "Build your professional digital identity on PropertyPointers. Get locality expert positioning, active listing visibility, buyer enquiries, reviews and category-based discovery.",
};

export default function JoinAdvisorPage() {
  return <JoinAdvisorClient />;
}
