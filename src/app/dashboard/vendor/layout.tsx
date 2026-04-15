import { OnboardingGate } from "@/components/OnboardingGate";

export default function VendorDashboardLayout({ children }: { children: React.ReactNode }) {
  return <OnboardingGate>{children}</OnboardingGate>;
}
