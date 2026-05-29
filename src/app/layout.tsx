import type { Metadata } from "next";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import GeoTracker from "@/components/GeoTracker";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.propertypointers.com"),
  title: "PropertyPointers — Beyond Listings. India's Complete Real Estate Ecosystem",
  description:
    "Discover properties, compare developers, connect with realty advisors, explore real estate vendors, and make smarter property decisions with insights and tools.",
  keywords:
    "real estate ecosystem, property, buy, sell, rent, developers, realty advisors, vendors, tools, insights, India, Noida, Delhi NCR, Gurugram, Jaipur, Pune",
  verification: {
    google: "Y2q6CDereTjf1FW6F3D-B3sRZUk_6gdowaQid9UV0fs",
  },
  openGraph: {
    title: "PropertyPointers — Beyond Listings. India's Complete Real Estate Ecosystem",
    description: "Discover properties, compare developers, connect with realty advisors, explore real estate vendors, and make smarter property decisions with insights and tools.",
    siteName: "PropertyPointers",
    type: "website",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PropertyPointers",
  url: "https://propertypointers.com",
  logo: "https://propertypointers.com/logo.png",
  description: "India's complete real estate ecosystem — properties, developers, realty advisors, vendors, tools, and insights.",
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PropertyPointers",
  url: "https://propertypointers.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://propertypointers.com/properties?q={search_term_string}",
    "query-input": "required name=search_term_string",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <LayoutShell>{children}</LayoutShell>
        <WhatsAppFloat />
        <GeoTracker />
      </body>
    </html>
  );
}
