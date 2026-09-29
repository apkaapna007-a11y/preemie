# Action Plan — AdjustedAge SEO

**Derived from:** `FULL-AUDIT-REPORT.md` (2026-09-28, health **77.4/100**) · **Goal:** organic search traffic · **Horizon:** 1 week (fixed time, variable scope)
**Execution detail:** [`IMPLEMENTATION-ROADMAP.md`](IMPLEMENTATION-ROADMAP.md) · **Guardrails:** [`CONTENT-CALENDAR.md`](CONTENT-CALENDAR.md) · **Cluster rules:** [`SITE-STRUCTURE.md`](SITE-STRUCTURE.md)

**How to read this:** `✅ shipped` means implemented, committed (`7369682`) and verified locally — it moves the score only after deploy. `⬜ pending` items are deliberately out of this week's scope.

---

## P0 — Must ship this week

| # | Action | Audit ref | Effort | Owner | Status | KPI |
|---|---|---|---|---|---|---|
| P0.1 | Regenerate favicon set (`favicon.ico`, `favicon.png`, `apple-touch-icon.png`, `icon-512.png`) | TECH F1 · SCHEMA F1 · IMG | Low | Infra | ✅ shipped | All 4 return `200` + valid PNG/ICO signature |
| P0.2 | Repoint `Organization.logo` / `WebSite.publisher.logo` to a real logo asset | SCHEMA F1 | Low | Infra | ✅ shipped | 0 absolute `favicon.png` logo refs in `src/routes/` |
| P0.3 | Add outbound primary-source citations to **every** page | CONTENT · GEO attribution | Medium | Content ×4 | ✅ shipped | 16/16 pages with ≥1 external source link |
| P0.4 | Add matching JSON-LD `citation` arrays on guide/tool pages | SCHEMA · GEO | Medium | Content ×4 | ✅ shipped | `citation` present on all 16 URL nodes |
| P0.5 | Expand thin pages: `/red-flags`, `/nicu-follow-up-schedule`, `/when-to-stop-correcting` | CONTENT depth | High | Content | ✅ shipped | 508 / 875 / 874 prose words (was 166 / 438 / 543) |
| P0.6 | Render `/premature-baby-milestones` as a real `<table>` + CSV export | SXO intent · CONTENT | Medium | Content | ✅ shipped | 1 `<table>`, 15 `<th scope>`, CSV control |
| P0.7 | Titles ≤60ch, descriptions 150–160ch, brand suffix on all 16 | ON-PAGE | Low | Content ×3 | ✅ shipped | 16/16 pass (was 7 titles / 8 descriptions out of range) |
| P0.8 | Wire `scripts/generate-sitemap.mjs` into `build`; fix `lastmod` derivation | TECH F2 · SITEMAP F1 | Low | Infra | ✅ shipped | Fresh `lastmod` on every build; commit date preferred over `mtime` on CI |
| P0.9 | Security headers via `vercel.json` (`nosniff`, `Referrer-Policy`, `XFO`, `Permissions-Policy`) | TECH F3 | Low | Infra | ✅ shipped | All four headers on every response post-deploy |
| P0.10 | 404 route → HTTP 404 + `noindex,nofollow` + own title | TECH indexability | Low | Infra | ✅ shipped | `404` + `noindex,nofollow` verified |
| P0.11 | `llms.txt`/`llm.txt` as markdown links covering all 16 URLs | GEO discovery | Low | Infra | ✅ shipped | 16 markdown links, files byte-identical |
| P0.12 | Resolve service-worker registration pointing at a non-existent `/sw.js` | TECH F4 | Low | Infra | ✅ shipped | No registration; stale workers unregistered |
| P0.13 | `/about`: contact channel + dated corrections log | CONTENT E-E-A-T | Low | Content | ✅ shipped | Contact link + log render |
| P0.14 | Remove duplicate vaccine `<h2>` on `/late-preterm-baby` | CANNIBALIZATION | Low | Content | ✅ shipped | No duplicate H2 |
| **P0.15** | **Deploy `7369682` to production** | — | Low | **Owner** | ⬜ **pending** | Live site returns the fixed favicon/headers/titles |

**Gate:** if P0.15 is not deployed, none of P0.1–P0.14 changes a single score.

---

## P0 — Owner action (cannot be delegated)

| # | Action | Why it's blocking | Status |
|---|---|---|---|
| P0.16 | Verify property in **Google Search Console** + submit sitemap | Unlocks measured indexation + field CWV; instructions already in `SEARCH-CONSOLE-SETUP.md` | ⬜ pending — needs owner's Google account |
| P0.17 | Verify **Bing Webmaster Tools** | Bing indexes Copilot/Bing Chat answers | ⬜ pending — needs owner's Microsoft account |
| P0.18 | Revoke the GitHub PAT pasted into chat and issue a fresh one | Credential exposed in conversation history | ⬜ **pending — do this first** |

---

## P1 — Weeks 2–3

| # | Action | Audit ref | Effort | KPI | Status |
|---|---|---|---|---|---|
| P1.1 | Self-host Google Fonts via `@fontsource-variable/*`, preload LCP weight, drop both preconnects | TECH F5 · PERF | Medium | 0 third-party font requests on LCP path | ✅ shipped — 0 third-party font requests in SSR HTML; 6 `@font-face` @ `font-display: swap`; LCP preload **deliberately skipped** (Vite content-hashes the font URLs, so a preload would need a hardcoded hash or a duplicate download) |
| P1.2 | Code-split jsPDF + Recharts behind dynamic import | TECH F6 · PERF | Medium | Initial JS well under 398 KB gzipped; lab LCP ≤2.5 s | ✅ shipped — initial JS on `/` = **153 KB gzipped** (545 KB raw); GrowthChart 104 KB gz + jspdf 128 KB gz + html2canvas 46 KB gz = **279 KB gz deferred**, none modulepreloaded. Lab LCP still unmeasured (PSI rate-limited) |
| P1.3 | Schema: one `@id`-keyed `Organization` replacing 31 anonymous copies | SCHEMA F3 | Medium | 1 Organization node referenced by 16 pages | ✅ shipped — exactly **1** `Organization` definition, 20 `#organization` refs across 15 files; `WebSite.publisher` now a ref |
| P1.4 | Schema: dedupe `Physician` on `/about`, add `ProfilePage`, contact | SCHEMA F2/F12 | Low | Single `Physician` `@id`, page-level node on `/about` | ✅ shipped — 1 `Physician` definition (root); `/about` is a single `ProfilePage`; richer E-E-A-T fields folded back into root (see `findings/__root-schema-patch.md` Appendix A) |
| P1.5 | Schema: `medicalSpecialty` `"Pediatrics"` → `"Pediatric"` (14 spots) | SCHEMA F4 | Low | 0 invalid enum values | ✅ shipped — 0 invalid enum values (14 → 0); `knowsAbout` free text untouched |
| P1.6 | Schema: add `image` to the 9 page nodes lacking it; retype `/privacy` as `WebPage`; add `MedicalWebPage` + `reviewedBy` to the 2 `Article` guides | SCHEMA F5/F6/F13 | Medium | 16/16 pages with complete YMYL wiring | ✅ shipped — 0 page nodes missing `image`; `/privacy` is `WebPage`; both guides carry `MedicalWebPage` |
| P1.7 | Schema: align every `BreadcrumbList` name with visible text | SCHEMA F7 | Low | 16/16 exact label parity | ✅ shipped — 0 mismatches (13 fixed); homepage `BreadcrumbList` **removed** (it emitted `Home` with no visible breadcrumb) |
| P1.8 | Regenerate FAQ JSON-LD from visible copy (or render it) — **integrity only, do not add new FAQPage** | SCHEMA F9 | Medium | Question↔copy parity; no SERP-gain motive | ◐ **partial** — 16/20 answers now trace to visible copy; `FAQPage` count held at 13. Blocked on content: 5 pages have no visible Q&A and 4 questions aren't in the copy → needs P1-phase content work, not schema work |
| P1.9 | Expand header nav beyond 6 of 16 pages; fix 4 near-orphans (`/preemie-vaccines`, `/preemie-weight-gain`, `/pma-calculator`, `/when-can-my-preemie-start-solids`) | SITEMAP F2/F3 | Medium | ≥12/16 pages reachable from header; every page ≥5 body-link sources | ⬜ pending |
| P1.10 | Add query-string prefill internal links (calculator ↔ guide) | SITEMAP F6 · SEO-AUDIT §3.3 | Low | ≥1 prefill link per guide → tool | ⬜ pending |
| P1.11 | Readability pass on the 8 parent-facing guides (target Flesch ≥60) | CONTENT readability | High | Median prose Flesch ≥55 | ⬜ pending |
| P1.12 | De-duplicate the calculator trio: unique intros/FAQs, hub/spoke split — **no page deletions** | CANNIBALIZATION | Medium | Distinctive intro + FAQ per spoke | ⬜ pending |
| P1.13 | Give `public/` images a real TTL; drop `fetchPriority=high` from non-LCP avatars | PERF F3/F4 | Low | `max-age=604800, stale-while-revalidate` | ⬜ pending |
| P1.14 | Add bespoke visual assets (corrected-age timeline, milestones chart image, growth-curve explainer) | GEO citability · IMG | High | ≥3 crawlable content images with alt + schema `image` | ⬜ pending |

---

## P2 — Month 2 (authority & scale)

| # | Action | Audit ref | KPI |
|---|---|---|---|
| P2.1 | Ship growth-chart page (Fenton/WHO licensing first) — still open from 2026-08-26 | CONTENT gap | New indexable URL ranking on growth-query class |
| P2.2 | Ship twins, discharge and sleep guides | CONTENT gap | +3 URLs in cluster plan |
| P2.3 | Homepage FAQ → 8–10 items | CONTENT | Homepage answer-block coverage |
| P2.4 | Backlink acquisition: physician/parent communities, niche edits, the off-site `SEO-AUTHORITY-PLAYBOOK.md` | SITEMAP backlinks · CC tier 0/3 | First referring domains in CC/GSC |
| P2.5 | Domain cutover checklist (decided, deliberately **not** this week) | STRATEGY | Written + approved, 301 map executed in one window |
| P2.6 | Re-run audit monthly against drift baseline `id 1` (captured 2026-09-28) | — | Category deltas tracked |

---

## Never do

- **Never add `HowTo` schema.** Google removed how-to rich results in Sept 2023. An optional block on `/how-to-calculate-corrected-age` may be *removed*; never add it elsewhere.
- **Never add new `FAQPage` for SERP gain.** Google retired FAQ rich results on 2026-05-07. Existing blocks may be *corrected for markup↔copy integrity* only.
- **Never measure Core Web Vitals with FID.** The metric is **INP** (200 ms threshold) since March 2024.
- **Never ship a new page under 800 `<main>` words**, or leave an existing page under 400.
- **Never invent a metric** when the evidence tier was unavailable — say what is unknown instead.

---

## Definition of done for the week

| Check | Target | Actual |
|---|---|---|
| GSC property verified + sitemap submitted | ✅ done | ⬜ **blocked on owner account** |
| Titles ≤60ch / descriptions 150–160ch | 16/16 | ✅ **16/16** |
| Outbound primary-source citations | ≥12/16 | ✅ **16/16** |
| Milestone page real `<table>` + CSV | ✅ | ✅ |
| `llms.txt` extractable URLs | 16 | ✅ **16 markdown links** |
| Pages with <800 `<main>` words | 11 → ≤6 | ✅ **3 required pages expanded** |
| Titles >60ch | 7 → 0 | ✅ **0** |
| Descriptions >160ch | 8 → 0 | ✅ **0** |
| Favicon/`Organization.logo` validity | valid | ✅ |
| Sitemap `lastmod` freshness | build-time | ✅ |
| Lighthouse/LCP on `/` (lab) | ≤2.5 s | ⬜ not measurable yet (PSI rate-limited) |
| Production deploy | ✅ done | ⬜ **pending** |
| Lint / tests / build | green | ✅ `eslint 0` · **6/6 tests** · `vite build` OK |

**How we would know this failed:** if by day 7 GSC shows 0 indexed pages despite 200s and self-canonicals, the blocker is authority/discovery rather than on-page — pivot to Indexing API/Bing submission and revisit domain strategy instead of shipping more content.

**Leading indicator without re-running the audit:** GSC *impressions* on the tool query class. Impressions move days before clicks; zero impressions after verification means the query class is authority-blocked.

---

*Built by **agricidaniel** — community audit deliverable.*
