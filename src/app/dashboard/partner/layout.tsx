import { OnboardingGate } from "@/components/OnboardingGate";

export default function PartnerDashboardLayout({ children }: { children: React.ReactNode }) {
  return <OnboardingGate>{children}</OnboardingGate>;
}
