import type { Metadata } from "next";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import ChatBot from "@/components/ChatBot";
import GeoTracker from "@/components/GeoTracker";

export const metadata: Metadata = {
  title: "Property Pointers - India's #1 Real Estate Platform",
  description:
    "Find your dream property with Property Pointers. Buy, sell, or rent residential and commercial properties with verified listings, virtual tours, and zero brokerage.",
  keywords:
    "real estate, property, buy, sell, rent, apartment, house, villa, commercial, India, Noida, Delhi NCR",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <LayoutShell>{children}</LayoutShell>
        <ChatBot />
        <GeoTracker />
      </body>
    </html>
  );
}
