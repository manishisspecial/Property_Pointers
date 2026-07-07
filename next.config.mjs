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

      // Legacy IA aliases referenced inside the client HTML pages
      { source: "/first-time-buyers", destination: "/first-home", permanent: false },
      { source: "/success-stories", destination: "/ghar-kahani", permanent: false },
      { source: "/most-delayed-projects", destination: "/developers/most-delayed", permanent: false },
      { source: "/rera-rights", destination: "/rera/rights", permanent: false },
      { source: "/rera-complaint", destination: "/rera/complaint", permanent: false },
      { source: "/documents-checklist", destination: "/guides/documents-checklist", permanent: false },
      { source: "/site-visit-checklist", destination: "/guides/site-visit-checklist", permanent: false },
      { source: "/glossary", destination: "/guides/glossary", permanent: false },
      { source: "/trust-safety", destination: "/trust-and-safety", permanent: false },
      { source: "/transparency-report", destination: "/trust-and-safety/transparency-report", permanent: false },
      { source: "/scam-reporter", destination: "/trust-and-safety/scam-reporter", permanent: false },
      { source: "/tools/should-i-buy-now", destination: "/tools/buy-now-advisor", permanent: false },
      { source: "/tools/tax-benefit-calculator", destination: "/tools/tax-benefit", permanent: false },
      { source: "/tools/negotiation-edge", destination: "/negotiation-edge", permanent: false },
      { source: "/tools/buyer-score", destination: "/buyer-score", permanent: false },
      { source: "/tools/city-match", destination: "/insights/city-match", permanent: false },
      { source: "/tools/home-loan-rates", destination: "/insights/home-loan-rates", permanent: false },
      { source: "/tools/floor-plans", destination: "/floor-plans", permanent: false },
    ];
  },
  async rewrites() {
    // beforeFiles ensures the client's PP_ALL_PAGES_FINAL design always wins
    // over any lingering React page.tsx at the same route (e.g. /about,
    // /careers, /privacy, /terms, /disclaimer, and the homepage /). This lets
    // us ship the client's approved design without deleting the old React
    // pages, so they remain available for future re-integration if needed.
    return {
      beforeFiles: [
        // --- Homepage ---
        { source: "/", destination: "/pp/PP_HOMEPAGE.html" },

        // --- Marketing / Company (11) ---
      { source: "/about", destination: "/pp/PP_ABOUT.html" },
      { source: "/contact", destination: "/pp/PP_CONTACT.html" },
      { source: "/pricing", destination: "/pp/PP_PRICING.html" },
      { source: "/sitemap", destination: "/pp/PP_SITEMAP.html" },
      { source: "/privacy", destination: "/pp/PP_PRIVACY.html" },
      { source: "/terms", destination: "/pp/PP_TERMS.html" },
      { source: "/disclaimer", destination: "/pp/PP_DISCLAIMER.html" },
      { source: "/careers", destination: "/pp/PP_CAREERS.html" },
      { source: "/careers/jobs", destination: "/pp/PP_JOBS.html" },
      { source: "/data-api", destination: "/pp/PP_DATA_API.html" },
      { source: "/vendors", destination: "/pp/PP_Vendors_Page.html" },

      // --- Property extras (2) — /properties and /properties/[id] stay React ---
      { source: "/properties/report-card", destination: "/pp/PP_PROPERTY_REPORT_CARD.html" },
      { source: "/floor-plans", destination: "/pp/PP_FLOOR_PLANS.html" },

      // --- Tools hub + calculators (14) ---
      { source: "/tools", destination: "/pp/PP_TOOLS_FINAL.html" },
      { source: "/tools/emi-calculator", destination: "/pp/PP_EMI_FINAL.html" },
      { source: "/tools/home-loan-eligibility", destination: "/pp/PP_Home_Loan_Eligibility.html" },
      { source: "/tools/affordability-calculator", destination: "/pp/PP_Affordability_Calculator.html" },
      { source: "/tools/stamp-duty-calculator", destination: "/pp/PP_Stamp_Duty_Calculator.html" },
      { source: "/tools/roi-calculator", destination: "/pp/PP_ROI_Calculator.html" },
      { source: "/tools/rental-yield-calculator", destination: "/pp/PP_Rental_Yield_Calculator.html" },
      { source: "/tools/rent-vs-buy", destination: "/pp/PP_Rent_vs_Buy.html" },
      { source: "/tools/construction-cost", destination: "/pp/PP_Construction_Cost.html" },
      { source: "/tools/rera-check", destination: "/pp/PP_RERA_Check.html" },
      { source: "/tools/area-converter", destination: "/pp/PP_Area_Converter.html" },
      { source: "/tools/vastu-calculator", destination: "/pp/PP_AI_Vastu.html" },
      { source: "/tools/ai-advisor", destination: "/pp/PP_AI_Advisor.html" },
      { source: "/tools/buy-now-advisor", destination: "/pp/PP_BUY_NOW_ADVISOR.html" },

      // --- Financial planning (5) ---
      { source: "/tools/property-vs-sip", destination: "/pp/PP_PROPERTY_VS_SIP.html" },
      { source: "/tools/resale-profit", destination: "/pp/PP_RESALE_PROFIT.html" },
      { source: "/tools/tax-benefit", destination: "/pp/PP_TAX_BENEFIT.html" },
      { source: "/tools/loan-switch", destination: "/pp/PP_LOAN_SWITCH.html" },
      { source: "/tools/maintenance-cost", destination: "/pp/PP_MAINTENANCE_COST.html" },

      // --- Insights hub + market intelligence (20) ---
      { source: "/insights", destination: "/pp/PP_INSIGHTS_FINAL.html" },
      { source: "/insights/market-trends", destination: "/pp/PP_MARKET_TRENDS.html" },
      { source: "/insights/market-news", destination: "/pp/PP_MARKET_NEWS.html" },
      { source: "/insights/city-reports", destination: "/pp/PP_CITY_REPORTS.html" },
      { source: "/insights/city-match", destination: "/pp/PP_CITY_MATCH.html" },
      { source: "/insights/investment-guides", destination: "/pp/PP_INVESTMENT_GUIDES.html" },
      { source: "/insights/ai-advisor", destination: "/pp/PP_AI_ADVISOR_INSIGHTS.html" },
      { source: "/insights/sentiment-index", destination: "/pp/PP_SENTIMENT_INDEX.html" },
      { source: "/insights/fear-index", destination: "/pp/PP_FEAR_INDEX.html" },
      { source: "/insights/livability-score", destination: "/pp/PP_LIVABILITY_SCORE.html" },
      { source: "/insights/commute-reality", destination: "/pp/PP_COMMUTE_REALITY.html" },
      { source: "/insights/infra-impact", destination: "/pp/PP_INFRA_IMPACT.html" },
      { source: "/insights/pincode-intelligence", destination: "/pp/PP_PINCODE_INTELLIGENCE.html" },
      { source: "/insights/time-machine", destination: "/pp/PP_TIME_MACHINE.html" },
      { source: "/insights/delay-cost", destination: "/pp/PP_DELAY_COST.html" },
      { source: "/insights/possession-probability", destination: "/pp/PP_POSSESSION_PROBABILITY.html" },
      { source: "/insights/possession-countdown", destination: "/pp/PP_POSSESSION_COUNTDOWN.html" },
      { source: "/insights/new-launch-radar", destination: "/pp/PP_NEW_LAUNCH_RADAR.html" },
      { source: "/insights/dom-tracker", destination: "/pp/PP_DOM_TRACKER.html" },
      { source: "/insights/home-loan-rates", destination: "/pp/PP_HOME_LOAN_RATES.html" },
      { source: "/insights/rera-updates", destination: "/pp/PP_RERA_UPDATES.html" },

      // Insights aliases (client HTML links to /insights/blog and /insights/nri-corner but real routes are /blog and /nri)
      { source: "/insights/blog", destination: "/pp/PP_BLOG.html" },
      { source: "/insights/nri-corner", destination: "/pp/PP_NRI_CORNER.html" },

      // --- Developers hub + subpages (12) — /developers/[slug] stays React ---
      { source: "/developers", destination: "/pp/PP_DEVELOPERS_FINAL.html" },
      { source: "/developers/compare", destination: "/pp/PP_DEV_COMPARE.html" },
      { source: "/developers/top", destination: "/pp/PP_DEV_TOP.html" },
      { source: "/developers/explore", destination: "/pp/PP_DEV_EXPLORE.html" },
      { source: "/developers/reviews", destination: "/pp/PP_DEV_REVIEWS.html" },
      { source: "/developers/rera-verified", destination: "/pp/PP_DEV_RERA_VERIFIED.html" },
      { source: "/developers/delivery-tracker", destination: "/pp/PP_DEV_DELIVERY_TRACKER.html" },
      { source: "/developers/join", destination: "/pp/PP_DEV_JOIN.html" },
      { source: "/developers/cibil", destination: "/pp/PP_BUILDER_CIBIL.html" },
      { source: "/developers/cibil/search", destination: "/pp/PP_BUILDER_CIBIL_SEARCH.html" },
      { source: "/developers/watchlist", destination: "/pp/PP_BUILDER_WATCHLIST.html" },
      { source: "/developers/most-delayed", destination: "/pp/PP_MOST_DELAYED.html" },

      // --- Realty Advisors (9) — /realty-advisors/[slug] added below as dynamic ---
      { source: "/realty-advisors", destination: "/pp/PP_ADVISORS_FINAL.html" },
      { source: "/realty-advisors/find", destination: "/pp/PP_RA_FIND.html" },
      { source: "/realty-advisors/compare", destination: "/pp/PP_RA_COMPARE.html" },
      { source: "/realty-advisors/top", destination: "/pp/PP_RA_TOP.html" },
      { source: "/realty-advisors/join", destination: "/pp/PP_RA_JOIN.html" },
      { source: "/realty-advisors/nri", destination: "/pp/PP_RA_NRI.html" },
      { source: "/realty-advisors/reviews", destination: "/pp/PP_RA_REVIEWS.html" },
      { source: "/realty-advisors/verified", destination: "/pp/PP_RA_VERIFIED.html" },
      { source: "/realty-advisors/profile", destination: "/pp/PP_ADVISOR_PROFILE.html" },

      // --- Localities (25) — Each named slug maps to its own PP_LOC_*.html.
      // Unknown slugs fall back to the shared PP_LOCALITY_TEMPLATE.html via
      // the dynamic React route in src/app/localities/[slug]/page.tsx. ---
      { source: "/localities", destination: "/pp/PP_LOCALITY_TEMPLATE.html" },
      { source: "/localities/baner-pune", destination: "/pp/PP_LOC_BANER_PUNE.html" },
      { source: "/localities/wakad-pune", destination: "/pp/PP_LOC_WAKAD_PUNE.html" },
      { source: "/localities/hinjewadi-pune", destination: "/pp/PP_LOC_HINJEWADI_PUNE.html" },
      { source: "/localities/kharadi-pune", destination: "/pp/PP_LOC_KHARADI_PUNE.html" },
      { source: "/localities/whitefield-bengaluru", destination: "/pp/PP_LOC_WHITEFIELD_BENGALURU.html" },
      { source: "/localities/electronic-city-bengaluru", destination: "/pp/PP_LOC_ELECTRONIC_CITY.html" },
      { source: "/localities/sarjapur-road-bengaluru", destination: "/pp/PP_LOC_SARJAPUR_ROAD.html" },
      { source: "/localities/gachibowli-hyderabad", destination: "/pp/PP_LOC_GACHIBOWLI_HYDERABAD.html" },
      { source: "/localities/kondapur-hyderabad", destination: "/pp/PP_LOC_KONDAPUR_HYDERABAD.html" },
      { source: "/localities/manikonda-hyderabad", destination: "/pp/PP_LOC_MANIKONDA_HYDERABAD.html" },
      { source: "/localities/sector-62-noida", destination: "/pp/PP_LOC_SECTOR_62_NOIDA.html" },
      { source: "/localities/sector-75-noida", destination: "/pp/PP_LOC_SECTOR_75_NOIDA.html" },
      { source: "/localities/sector-137-noida", destination: "/pp/PP_LOC_SECTOR_137_NOIDA.html" },
      { source: "/localities/sector-150-noida", destination: "/pp/PP_LOC_SECTOR_150_NOIDA.html" },
      { source: "/localities/greater-noida-west", destination: "/pp/PP_LOC_GREATER_NOIDA_WEST.html" },
      { source: "/localities/sohna-road-gurugram", destination: "/pp/PP_LOC_SOHNA_ROAD_GURUGRAM.html" },
      { source: "/localities/sector-67-gurugram", destination: "/pp/PP_LOC_SECTOR_67_GURUGRAM.html" },
      { source: "/localities/dwarka-expressway-gurugram", destination: "/pp/PP_LOC_DWARKA_EXPRESSWAY.html" },
      { source: "/localities/dwarka-delhi", destination: "/pp/PP_LOC_DWARKA_DELHI.html" },
      { source: "/localities/rohini-delhi", destination: "/pp/PP_LOC_ROHINI_DELHI.html" },
      { source: "/localities/thane-west-mumbai", destination: "/pp/PP_LOC_THANE_WEST_MUMBAI.html" },
      { source: "/localities/navi-mumbai", destination: "/pp/PP_LOC_NAVI_MUMBAI.html" },
      { source: "/localities/rajarhat-kolkata", destination: "/pp/PP_LOC_RAJARHAT_KOLKATA.html" },
      { source: "/localities/new-town-kolkata", destination: "/pp/PP_LOC_NEW_TOWN_KOLKATA.html" },
      { source: "/localities/zirakpur-chandigarh", destination: "/pp/PP_LOC_ZIRAKPUR_CHANDIGARH.html" },

      // --- Community / Trust & Safety (6) ---
      { source: "/community", destination: "/pp/PP_COMMUNITY_QA.html" },
      { source: "/community/society-reviews", destination: "/pp/PP_SOCIETY_REVIEWS.html" },
      { source: "/community/whatsapp", destination: "/pp/PP_WHATSAPP_COMMUNITY.html" },
      { source: "/trust-and-safety", destination: "/pp/PP_TRUST_SAFETY.html" },
      { source: "/trust-and-safety/transparency-report", destination: "/pp/PP_TRANSPARENCY_REPORT.html" },
      { source: "/trust-and-safety/scam-reporter", destination: "/pp/PP_SCAM_REPORTER.html" },

      // --- RERA / Legal / Education (6) ---
      { source: "/rera/rights", destination: "/pp/PP_RERA_RIGHTS.html" },
      { source: "/rera/complaint", destination: "/pp/PP_RERA_COMPLAINT.html" },
      { source: "/rera/updates", destination: "/pp/PP_RERA_UPDATES.html" },
      { source: "/guides/documents-checklist", destination: "/pp/PP_DOCUMENTS_CHECKLIST.html" },
      { source: "/guides/site-visit-checklist", destination: "/pp/PP_SITE_VISIT_CHECKLIST.html" },
      { source: "/guides/glossary", destination: "/pp/PP_GLOSSARY.html" },

      // --- NRI (2) ---
      { source: "/nri", destination: "/pp/PP_NRI_CORNER.html" },
      { source: "/nri/dashboard", destination: "/pp/PP_NRI_DASHBOARD.html" },

      // --- Buyer journey / UX helpers (7) ---
      { source: "/ghar-kahani", destination: "/pp/PP_GHAR_KAHANI.html" },
      { source: "/ghar-milaya", destination: "/pp/PP_GHAR_MILAYA.html" },
      { source: "/first-home", destination: "/pp/PP_MERA_PEHLA_GHAR.html" },
      { source: "/buyer-score", destination: "/pp/PP_BUYER_SCORE.html" },
      { source: "/buyer-readiness-quiz", destination: "/pp/PP_BUYER_READINESS_QUIZ.html" },
      { source: "/negotiation-edge", destination: "/pp/PP_NEGOTIATION_EDGE.html" },
      { source: "/voice-search", destination: "/pp/PP_VOICE_SEARCH.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
