"use client";

import { ClipboardList, MapPinned, Sparkles, Store } from "lucide-react";
import { JoinRoleLanding } from "@/components/join/JoinRoleLanding";

export default function JoinVendorPage() {
  return (
    <JoinRoleLanding
      backHref="/vendors"
      backLabel="Vendors"
      theme="emerald"
      HeroIcon={Store}
      eyebrow="Vendors"
      heroTitle="Get discovered by serious property seekers—on their timeline"
      heroLead="List your services with PropertyPointers to connect demand to delivery: structured profiles, clearer opportunities, and tools that keep your business moving."
      trustStrip={[
        "Service-forward profiles",
        "City + category fit",
        "Operational dashboard",
        "Credibility signals",
      ]}
      pillars={[
        {
          title: "Demand you can serve",
          body: "We route interest toward vendors who match geography and service categories—so inquiries feel closer to real work.",
        },
        {
          title: "A storefront buyers understand",
          body: "Present packages, specialties, and proof points in a layout built for property journeys—not generic directories.",
        },
        {
          title: "Less admin, more delivery",
          body: "Keep your pipeline organized with a vendor workspace designed around follow-ups and repeatable workflows.",
        },
      ]}
      benefitBlocks={[
        {
          title: "Local relevance, by default",
          summary:
            "Property decisions are hyper-local. Your vendor presence is structured to align with how seekers search and compare.",
          pointers: [
            "Show up for the right neighborhoods and service types—without spraying irrelevant bids everywhere.",
            "Make it obvious what you deliver: interiors, legal, loans, inspections, movers, and more.",
            "Improve conversion with clearer expectations before the first conversation.",
            "Reduce wasted calls from mismatched requests and unclear scope.",
          ],
          icon: MapPinned,
        },
        {
          title: "Showcase that sells your craft",
          summary:
            "Go beyond a phone number—tell the story of your work with a profile that supports trust at a glance.",
          pointers: [
            "Highlight specialties, timelines, and what a great engagement looks like.",
            "Keep offerings readable: packages, add-ons, and differentiators—without a cluttered page.",
            "Build confidence with a presentation that matches PropertyPointers’ premium, calm UI.",
            "Make repeat business easier—buyers remember vendors who look credible.",
          ],
          icon: Sparkles,
        },
        {
          title: "Operational rhythm you can keep",
          summary:
            "Growth isn’t just leads—it’s follow-through. Your dashboard is built to help you respond consistently.",
          pointers: [
            "Track opportunities and statuses so nothing slips through busy weeks.",
            "Standardize next steps for faster responses and better customer experience.",
            "See what’s working and iterate with less guesswork.",
            "Spend more hours doing the work—and fewer hours chasing scattered threads.",
          ],
          icon: ClipboardList,
        },
      ]}
      registerHref="/auth/register?role=vendor"
      registerCta="Register as vendor"
      joinTitle="Join as a vendor"
      joinDescription="Create an account with your full name, email, phone, and password. After you sign in, you’ll land on your vendor dashboard where you can manage your profile, services, and opportunities."
    />
  );
}
