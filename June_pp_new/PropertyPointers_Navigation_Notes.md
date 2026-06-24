# PropertyPointers — Navigation & File Notes
**For: Manish Kumar Shah | propertypointers.com**
**Date: June 2026**

---

## Summary

- **5 main menus**, **36 submenu links**, **39 unique HTML files** delivered
- Every page rebuilt on one shared design system (mobile menu, Sign Up + Login, consistent footer with disclaimer, responsive on mobile/tablet/desktop)
- All files are in the outputs folder, ready to upload to the live site

---

## 1. TOOLS — 12 submenu links

| # | Menu Label | URL Route | File Name |
|---|---|---|---|
| Hub | Tools | `/tools` | `PP_TOOLS_FINAL.html` |
| 1 | EMI Calculator | `/tools/emi-calculator` | `PP_EMI_FINAL.html` |
| 2 | Loan Eligibility | `/tools/home-loan-eligibility` | `PP_Home_Loan_Eligibility.html` |
| 3 | Affordability Calculator | `/tools/affordability-calculator` | `PP_Affordability_Calculator.html` |
| 4 | Stamp Duty | `/tools/stamp-duty-calculator` | `PP_Stamp_Duty_Calculator.html` |
| 5 | ROI Calculator | `/tools/roi-calculator` | `PP_ROI_Calculator.html` |
| 6 | Rental Yield | `/tools/rental-yield-calculator` | `PP_Rental_Yield_Calculator.html` |
| 7 | Rent vs Buy | `/tools/rent-vs-buy` | `PP_Rent_vs_Buy.html` |
| 8 | Construction Cost | `/tools/construction-cost` | `PP_Construction_Cost.html` |
| 9 | RERA Check | `/tools/rera-check` | `PP_RERA_Check.html` |
| 10 | Area Converter | `/tools/area-converter` | `PP_Area_Converter.html` |
| 11 | AI Vastu | `/tools/vastu-calculator` | `PP_AI_Vastu.html` |
| 12 | AI Advisor | `/tools/ai-advisor` | `PP_AI_Advisor.html` |

---

## 2. INSIGHTS — 8 submenu links

| # | Menu Label | URL Route | File Name |
|---|---|---|---|
| Hub | Insights | `/insights` | `PP_INSIGHTS_FINAL.html` |
| 1 | Market Trends | `/insights/market-trends` | `PP_MARKET_TRENDS.html` |
| 2 | City Reports | `/insights/city-reports` | `PP_CITY_REPORTS.html` |
| 3 | Market News | `/insights/market-news` | `PP_MARKET_NEWS.html` |
| 4 | RERA Updates | `/insights/rera-updates` | `PP_RERA_UPDATES.html` |
| 5 | Investment Guides | `/insights/investment-guides` | `PP_INVESTMENT_GUIDES.html` |
| 6 | Blog | `/insights/blog` | `PP_BLOG.html` |
| 7 | NRI Corner | `/insights/nri-corner` | `PP_NRI_CORNER.html` |
| 8 | AI Advisor | `/insights/ai-advisor` | `PP_AI_ADVISOR_INSIGHTS.html` |

---

## 3. DEVELOPERS — 8 submenu links (1 = hub itself)

| # | Menu Label | URL Route | File Name |
|---|---|---|---|
| 1 | All Developers (hub) | `/developers` | `PP_DEVELOPERS_FINAL.html` |
| 2 | Top Rated | `/developers/top` | `PP_DEV_TOP.html` |
| 3 | RERA Verified Only | `/developers/rera-verified` | `PP_DEV_RERA_VERIFIED.html` |
| 4 | Explore & Filter | `/developers/explore` | `PP_DEV_EXPLORE.html` |
| 5 | Compare Builders | `/developers/compare` | `PP_DEV_COMPARE.html` |
| 6 | Buyer Reviews | `/developers/reviews` | `PP_DEV_REVIEWS.html` |
| 7 | Delivery Tracker | `/developers/delivery-tracker` | `PP_DEV_DELIVERY_TRACKER.html` |
| 8 | List Your Project | `/developers/join` | `PP_DEV_JOIN.html` |

*Plus 1 sample profile page template: `PP_DEV_PROFILE.html` (e.g. Tata Housing) — use as the template for all individual builder profile pages.*

---

## 4. REALTY ADVISORS — 8 submenu links (1 = hub itself)

| # | Menu Label | URL Route | File Name |
|---|---|---|---|
| 1 | All Advisors (hub) | `/realty-advisors` | `PP_ADVISORS_FINAL.html` |
| 2 | Top Rated | `/realty-advisors/top` | `PP_RA_TOP.html` |
| 3 | RERA Verified | `/realty-advisors/verified` | `PP_RA_VERIFIED.html` |
| 4 | NRI Specialists | `/realty-advisors/nri` | `PP_RA_NRI.html` |
| 5 | Find by City | `/realty-advisors/find` | `PP_RA_FIND.html` |
| 6 | Compare Advisors | `/realty-advisors/compare` | `PP_RA_COMPARE.html` |
| 7 | Reviews | `/realty-advisors/reviews` | `PP_RA_REVIEWS.html` |
| 8 | Join as Advisor | `/realty-advisors/join` | `PP_RA_JOIN.html` |

*Plus 1 sample profile page template: `PP_ADVISOR_PROFILE.html` (e.g. Rahul Sharma) — use as the template for all individual advisor profile pages.*

---

## 5. VENDORS — direct link, no submenu

| Menu Label | URL Route | File Name |
|---|---|---|
| Vendors | `/vendors` | `PP_Vendors_Page.html` |

---

## Other core pages (outside the main nav menus)

| Page | URL Route | File Name |
|---|---|---|
| Homepage | `/` | `PP_HOMEPAGE.html` |
| Disclaimer | `/disclaimer` | `PP_DISCLAIMER.html` |

---

## What was fixed in this QA round

- **Mobile menu** — every page now has a working hamburger menu with a slide-in drawer (accordion for Tools/Insights/Developers/Advisors). Earlier, on several pages the menu simply disappeared on mobile with nothing to replace it.
- **Account creation** — "Sign Up" added next to "Login" in the nav (desktop + mobile) on every page.
- **Footer** — same footer, same disclaimer text, on all 39 pages.
- **Disclaimer** — present in the footer on every page, plus a page-specific disclaimer box on content pages.
- **Menus & submenus** — Tools / Insights / Developers / Advisors mega-menus (desktop) and accordion menus (mobile) are now identical and fully linked on every page.
- **Responsive** — checked at desktop, tablet (1024px) and mobile (768px/560px) breakpoints across all pages.
- **Calculators untouched** — for the 12 Tools pages, the EMI/ROI/etc. calculation logic (sliders, math, results) was not touched — only the nav and footer were swapped in, so nothing that was already working is at risk of breaking.

## Known pending items (not part of this round — flag if needed)

- Old/duplicate draft files still sitting in the folder from earlier iterations (e.g. `PP_RA_Profile.html`, `PP_RA_v3_Profile.html`, `PP_Insights_MarketTrends.html` and similar older versions) — these are superseded by the files listed above and can be deleted before final upload.
- Individual builder/advisor profile pages exist only as **one template each** (Tata Housing / Rahul Sharma) — remaining profiles for the other 7 developers and 7 advisors still need to be generated from this template if required.
