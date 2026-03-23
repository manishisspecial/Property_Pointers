"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EXCLUDED_PREFIXES = ["/admin", "/dashboard", "/auth"];

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showMainLayout = !EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (!showMainLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
