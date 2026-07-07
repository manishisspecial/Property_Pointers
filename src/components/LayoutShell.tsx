"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CityPickerModal from "@/components/CityPickerModal";
import LiveOnSiteFloat from "@/components/LiveOnSiteFloat";
import { CityProvider } from "@/context/CityContext";

/**
 * Routes that render their own header/footer and should not be wrapped by the
 * app-level Navbar/Footer. This includes:
 *  - Auth flows and admin/dashboard chrome (rendered standalone).
 *  - The client-provided "PP_ALL_PAGES_FINAL" pages in public/pp/*.html, which
 *    are served via rewrites (they include their own nav/footer inline) — and
 *    the dynamic React fallback at /localities/[slug] which renders the same
 *    client HTML content.
 */
const EXCLUDED_PREFIXES = ["/admin", "/dashboard", "/auth", "/localities"];

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showMainLayout = !EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (!showMainLayout) {
    return <>{children}</>;
  }

  return (
    <CityProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CityPickerModal />
      <LiveOnSiteFloat />
    </CityProvider>
  );
}
