# Superseded Content Archive — 2026-07-07

This folder contains earlier revisions of the site that have been replaced by
the client's final approved design (`PP_ALL_PAGES_FINAL`, now living at
`public/pp/`). They are archived here rather than deleted so nothing is
permanently lost.

## What's inside

| Folder | Origin | Status |
|---|---|---|
| `PP_ALL_PAGES_FINAL/` | The exact bundle the client delivered as their approved final design. The **129 HTML files inside were already copied to `public/pp/`** and are served from there — this folder is now just the source-of-truth reference copy. | Referenced only; not served |
| `client_edit/` | First client edit batch (Vastu Calculator prototype and Affordability draft) | Superseded |
| `client_edit_2/` | Second client edit batch (EMI, ROI, Vastu content refresh) | Superseded |
| `client_edit_01_Insight_Pages/` | Insight-pages redesign draft | Superseded |
| `client_edit_02_Tool_Pages/` | Tool-pages redesign draft | Superseded |
| `June_pp_new/` | June 2026 iteration (advisors, developers, vendors sections) | Superseded |
| `static-pages/` | Was `public/static-pages/`. The original static HTML mirrors of the tool / developer / advisor / insight sections. Rewrites in `next.config.mjs` previously pointed here; they now point to `public/pp/` instead. | Dead — safe to delete once client sign-off is complete |

## Do NOT reintroduce these into the app

Rewrites in `next.config.mjs` deliberately point at `public/pp/` only. If you
need to bring back an older design for comparison, copy it out to a scratch
folder — don't restore in place.

## Restoration

Everything here is a plain folder move — restoring is a simple `mv` (or
`git mv`) back to the repo root or into `public/`.
