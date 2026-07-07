# `public/pp/` — Client-Provided Final Design (PP_ALL_PAGES_FINAL)

This folder contains the **129 static HTML pages** delivered by the client as
their final approved design (originally dropped into `PP_ALL_PAGES_FINAL/` at
the repo root).

## How they're wired into the app

All files here are served through Next.js **rewrites** configured in
`next.config.mjs`. Every rewrite lives in the `beforeFiles` array so the
client's design always wins over any legacy React `page.tsx` at the same URL.

Examples:

| Public URL | File served |
|---|---|
| `/` | `PP_HOMEPAGE.html` |
| `/tools/emi-calculator` | `PP_EMI_FINAL.html` |
| `/insights/market-trends` | `PP_MARKET_TRENDS.html` |
| `/localities/baner-pune` | `PP_LOC_BANER_PUNE.html` |
| `/developers/cibil` | `PP_BUILDER_CIBIL.html` |

Because these are **static files**, requests bypass the React app router
entirely. They render with the client's own embedded nav / footer / analytics
/ WhatsApp float. The app-level `LayoutShell` (Navbar + Footer) does **not**
wrap them.

## Routes that stay as React (intentionally not rewritten)

Some routes require live data or authenticated state, so they stay as React
pages and are NOT overridden here:

- `/properties`, `/properties/[id]` — DB-backed listings
- `/post-property` — form submission
- `/blog`, `/blog/[slug]`, `/blog/category/[category]` — CMS
- `/developers/[slug]` — dynamic profile from Prisma
- `/projects/[slug]` — dynamic project pages
- `/auth/*` — login/register with API session
- `/admin/*`, `/dashboard/*` — auth-gated
- `/api/*` — API endpoints
- `/list-project`, `/list-service`, `/join-advisor`, `/onboarding`
- `/services/*`, `/vendors/*` (sub-routes only)
- `/insights/vastu` — legacy interactive Vastu tool
- `/calculator` — legacy calculators (superseded by `/tools/*` client HTML)
- `/localities/[slug]` — dynamic fallback that serves
  `PP_LOCALITY_TEMPLATE.html` for slugs not explicitly listed in the rewrites

## Placeholder values that were auto-patched

When the client HTML was copied into this folder, the following placeholders
were bulk-replaced with real values sourced from the existing app config:

- `917XXXXXXXXX` → `919217434838` (WhatsApp)
- `G-XXXXXXXXXX` → `G-8LQN9CSJZT` (Google Analytics 4 ID)

## Known limitations of the static-serve approach

1. **Auth state is not reflected** in the nav on client HTML pages. The Login
   / Register buttons in the client's HTML always show even when the user is
   signed in via the React auth flow.
2. **City picker context** is not shared with the client HTML pages (each PP
   file has its own city drop-down, if any).
3. **CMS-driven content** (blog posts, site settings, contact info) shown on
   the client HTML pages is hard-coded in the HTML — updating it requires
   editing the HTML directly.

These are all addressable by later re-implementing individual pages as React
components (Phase 7+), which lets us mix client design tokens with live data.

## Editing / re-deploying

Just edit the HTML files here. No build step is required for the pages
themselves — Next.js serves them straight from `public/pp/`. Changes take
effect immediately after redeploy.

If you add a new PP_XXX.html file, you also need to add a corresponding
rewrite in `next.config.mjs` under the `beforeFiles` array.
