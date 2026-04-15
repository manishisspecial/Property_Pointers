"use client";

import { Building2, FileStack, LineChart, Presentation } from "lucide-react";
import { JoinRoleLanding } from "@/components/join/JoinRoleLanding";

export default function JoinDeveloperPage() {
  return (
    <JoinRoleLanding
      backHref="/developers"
      backLabel="Developers"
      theme="blue"
      HeroIcon={Building2}
      eyebrow="Developers"
      heroTitle="Launch projects with storytelling, assets, and reach—together"
      heroLead="PropertyPointers helps developers present inventory with clarity: strong project pages, practical tools, and visibility aligned to how buyers research in 2026."
      trustStrip={[
        "Project-first presentation",
        "Brochure-ready workflows",
        "Insights-friendly positioning",
        "Dashboard control",
      ]}
      pillars={[
        {
          title: "Premium project presentation",
          body: "Put launches in a layout built for discovery—clear hierarchy, credible details, and a buyer-friendly narrative.",
        },
        {
          title: "Sales-enablement built in",
          body: "Keep collateral and updates organized so teams can respond faster with consistent messaging.",
        },
        {
          title: "Market visibility that makes sense",
          body: "Align with seekers browsing listings and content—without turning your brand into spammy noise.",
        },
      ]}
      benefitBlocks={[
        {
          title: "A developer profile buyers actually read",
          summary:
            "Your brand deserves more than a logo row. Present authority, delivery track record, and what makes your developments distinct.",
          pointers: [
            "Tell a coherent story: ethos, execution standards, and what customers can expect on site.",
            "Support trust with structured project facts buyers compare across options.",
            "Make it easy to navigate multiple launches without losing brand continuity.",
            "Reduce repetitive explanations—let the profile answer the first wave of questions.",
          ],
          icon: Presentation,
        },
        {
          title: "Collateral that keeps pace with inventory",
          summary:
            "From brochures to updates, buyers expect accuracy. Centralize assets so your team isn’t hunting files at the last minute.",
          pointers: [
            "Keep documents discoverable where seekers already evaluate your project.",
            "Update messaging as inventory shifts—so your funnel reflects reality.",
            "Improve partner and channel conversations with consistent materials.",
            "Fewer mismatches between what’s advertised and what’s available.",
          ],
          icon: FileStack,
        },
        {
          title: "Visibility tied to real demand signals",
          summary:
            "Show up where research happens—alongside listings and insights—so interest is closer to decision-making.",
          pointers: [
            "Align launches with city-first discovery patterns seekers already use on PropertyPointers.",
            "Benefit from a platform experience designed to feel premium, not cluttered.",
            "Improve the quality of inbound by reducing random clicks and increasing context.",
            "Measure momentum with dashboard workflows that support continuous improvement.",
          ],
          icon: LineChart,
        },
      ]}
      registerHref="/auth/register?role=developer"
      registerCta="Register as developer"
      joinTitle="Join as a developer"
      joinDescription="Create an account with your full name, email, phone, and password. After you sign in, you’ll land on your developer dashboard and can use the full dashboard for listings and settings."
    />
  );
}
