import { OnboardingGate } from "@/components/OnboardingGate";

export default function DeveloperDashboardLayout({ children }: { children: React.ReactNode }) {
  return <OnboardingGate>{children}</OnboardingGate>;
}
