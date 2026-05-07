import type { Metadata } from "next";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import GeoTracker from "@/components/GeoTracker";

export const metadata: Metadata = {
  title: "Property Pointers - India's #1 Real Estate Platform",
  description:
    "Find your dream property with Property Pointers. Buy, sell, or rent residential and commercial properties with verified listings, virtual tours, and zero brokerage.",
  keywords:
    "real estate, property, buy, sell, rent, apartment, house, villa, commercial, India, Noida, Delhi NCR",
  verification: {
    google: "Y2q6CDereTjf1FW6F3D-B3sRZUk_6gdowaQid9UV0fs",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-8LQN9CSJZT"
        ></script>
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-8LQN9CSJZT');`
        }} />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <LayoutShell>{children}</LayoutShell>
        <WhatsAppFloat />
        <GeoTracker />
      </body>
    </html>
  );
}
