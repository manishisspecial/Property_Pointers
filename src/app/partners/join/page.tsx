"use client";

import { Handshake, Megaphone, Radar, Users } from "lucide-react";
import { JoinRoleLanding } from "@/components/join/JoinRoleLanding";

export default function JoinPartnerPage() {
  return (
    <JoinRoleLanding
      backHref="/partners"
      backLabel="Partners"
      theme="amber"
      HeroIcon={Handshake}
      eyebrow="Partner network"
      heroTitle="Scale referrals with a platform buyers already trust"
      heroLead="Partner with PropertyPointers to turn relationships into qualified introductions—supported by tools, visibility, and a clear pipeline you can actually manage."
      trustStrip={[
        "City-first discovery",
        "Verified ecosystem",
        "Dashboard + follow-ups",
        "Insights-aligned positioning",
      ]}
      pillars={[
        {
          title: "Qualified conversations",
          body: "We focus on intent-rich discovery so your outreach stays relevant—less cold volume, more meaningful threads.",
        },
        {
          title: "Credibility by design",
          body: "Your partner presence sits alongside curated listings and editorial insights, reinforcing trust before the first call.",
        },
        {
          title: "Operational clarity",
          body: "A partner workspace helps you track momentum, stay consistent, and keep next steps obvious for every lead.",
        },
      ]}
      benefitBlocks={[
        {
          title: "Warm introductions, not random leads",
          summary:
            "PropertyPointers is built around people actively exploring property decisions—so your time goes toward conversations that can convert.",
          pointers: [
            "Access demand signals aligned with your strengths (segment, geography, and buyer intent).",
            "Keep follow-ups structured with a partner-friendly workflow—notes, status, and next actions in one place.",
            "Reduce back-and-forth with clearer context on what the seeker is trying to solve.",
            "Spend less energy chasing cold outreach and more energy closing well-qualified opportunities.",
          ],
          icon: Radar,
        },
        {
          title: "Visibility where it matters",
          summary:
            "Show up alongside listings and content seekers already browse—so your brand feels native to the journey, not bolted on.",
          pointers: [
            "Cohesive placement across partner touchpoints that match the PropertyPointers experience.",
            "Messaging room to explain your niche: investment advisory, second homes, relocation, and more.",
            "A cleaner story arc from discovery → trust → contact—supported by editorial context on the platform.",
            "More repeatable brand recall as seekers return for inventory, calculators, and insights.",
          ],
          icon: Megaphone,
        },
        {
          title: "Network effects that compound",
          summary:
            "Partnership here is relational: you benefit as the marketplace becomes more useful for buyers, developers, and vendors alike.",
          pointers: [
            "Cross-ecosystem visibility with developers and vendors where it helps your pipeline (without noisy overlap).",
            "A partner narrative that fits PropertyPointers’ positioning: practical, transparent, and city-aware.",
            "Room to collaborate on campaigns, launches, and seasonal demand cycles.",
            "Long-term leverage: your reputation compounds as the network grows.",
          ],
          icon: Users,
        },
      ]}
      registerHref="/auth/register?role=partner"
      registerCta="Register as partner"
      joinTitle="Join as a partner"
      joinDescription="Create an account with your full name, email, phone, and password. After you sign in, you’ll land on your partner dashboard for leads, tools, and network visibility."
    />
  );
}
