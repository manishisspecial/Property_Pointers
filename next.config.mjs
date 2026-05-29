/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  async redirects() {
    return [
      // Insights: standardize media-news -> market-news
      { source: "/insights/media-news", destination: "/insights/market-news", permanent: true },
      // Tools migration: /calculator?tool=x -> dedicated SEO routes
      {
        source: "/calculator",
        has: [{ type: "query", key: "tool", value: "emi" }],
        destination: "/tools/emi-calculator",
        permanent: true,
      },
      {
        source: "/calculator",
        has: [{ type: "query", key: "tool", value: "roi" }],
        destination: "/tools/roi-calculator",
        permanent: true,
      },
      {
        source: "/calculator",
        has: [{ type: "query", key: "tool", value: "rental-yield" }],
        destination: "/tools/rental-yield-calculator",
        permanent: true,
      },
      { source: "/calculator", destination: "/tools", permanent: true },
      // Legacy signup alias used by client-provided pages
      { source: "/auth/signup", destination: "/auth/register", permanent: true },
    ];
  },
};

export default nextConfig;
