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
      // Auth aliases referenced by the new client-provided HTML pages
      { source: "/login", destination: "/auth/login", permanent: false },
      { source: "/signup", destination: "/auth/register", permanent: false },
      { source: "/auth/signup", destination: "/auth/register", permanent: true },
      // Legacy affordability route -> new client-aligned route
      { source: "/tools/affordability", destination: "/tools/affordability-calculator", permanent: true },
    ];
  },
  async rewrites() {
    return [
      // Phase 1: TOOLS (12 sub-routes + hub)
      { source: "/tools", destination: "/static-pages/tools.html" },
      { source: "/tools/emi-calculator", destination: "/static-pages/tools/emi-calculator.html" },
      { source: "/tools/home-loan-eligibility", destination: "/static-pages/tools/home-loan-eligibility.html" },
      { source: "/tools/affordability-calculator", destination: "/static-pages/tools/affordability-calculator.html" },
      { source: "/tools/stamp-duty-calculator", destination: "/static-pages/tools/stamp-duty-calculator.html" },
      { source: "/tools/roi-calculator", destination: "/static-pages/tools/roi-calculator.html" },
      { source: "/tools/rental-yield-calculator", destination: "/static-pages/tools/rental-yield-calculator.html" },
      { source: "/tools/rent-vs-buy", destination: "/static-pages/tools/rent-vs-buy.html" },
      { source: "/tools/construction-cost", destination: "/static-pages/tools/construction-cost.html" },
      { source: "/tools/rera-check", destination: "/static-pages/tools/rera-check.html" },
      { source: "/tools/area-converter", destination: "/static-pages/tools/area-converter.html" },
      { source: "/tools/vastu-calculator", destination: "/static-pages/tools/vastu-calculator.html" },
      { source: "/tools/ai-advisor", destination: "/static-pages/tools/ai-advisor.html" },

      // Phase 2: INSIGHTS (8 sub-routes + hub)
      { source: "/insights", destination: "/static-pages/insights.html" },
      { source: "/insights/market-trends", destination: "/static-pages/insights/market-trends.html" },
      { source: "/insights/city-reports", destination: "/static-pages/insights/city-reports.html" },
      { source: "/insights/market-news", destination: "/static-pages/insights/market-news.html" },
      { source: "/insights/rera-updates", destination: "/static-pages/insights/rera-updates.html" },
      { source: "/insights/investment-guides", destination: "/static-pages/insights/investment-guides.html" },
      { source: "/insights/blog", destination: "/static-pages/insights/blog.html" },
      { source: "/insights/nri-corner", destination: "/static-pages/insights/nri-corner.html" },
      { source: "/insights/ai-advisor", destination: "/static-pages/insights/ai-advisor.html" },

      // Phase 3: DEVELOPERS (8 sub-routes incl. hub)
      // NOTE: /developers/[slug] dynamic route still handled by App Router for individual builder profiles
      { source: "/developers", destination: "/static-pages/developers.html" },
      { source: "/developers/top", destination: "/static-pages/developers/top.html" },
      { source: "/developers/rera-verified", destination: "/static-pages/developers/rera-verified.html" },
      { source: "/developers/explore", destination: "/static-pages/developers/explore.html" },
      { source: "/developers/compare", destination: "/static-pages/developers/compare.html" },
      { source: "/developers/reviews", destination: "/static-pages/developers/reviews.html" },
      { source: "/developers/delivery-tracker", destination: "/static-pages/developers/delivery-tracker.html" },
      { source: "/developers/join", destination: "/static-pages/developers/join.html" },

      // Phase 4: REALTY ADVISORS (8 sub-routes incl. hub) - entirely new section
      { source: "/realty-advisors", destination: "/static-pages/realty-advisors.html" },
      { source: "/realty-advisors/top", destination: "/static-pages/realty-advisors/top.html" },
      { source: "/realty-advisors/verified", destination: "/static-pages/realty-advisors/verified.html" },
      { source: "/realty-advisors/nri", destination: "/static-pages/realty-advisors/nri.html" },
      { source: "/realty-advisors/find", destination: "/static-pages/realty-advisors/find.html" },
      { source: "/realty-advisors/compare", destination: "/static-pages/realty-advisors/compare.html" },
      { source: "/realty-advisors/reviews", destination: "/static-pages/realty-advisors/reviews.html" },
      { source: "/realty-advisors/join", destination: "/static-pages/realty-advisors/join.html" },

      // Phase 5: VENDORS (single page; subcategory pages remain in App Router)
      { source: "/vendors", destination: "/static-pages/vendors.html" },
    ];
  },
};

export default nextConfig;
