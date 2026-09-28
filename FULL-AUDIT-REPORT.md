# Full SEO Audit Report — AdjustedAge (https://preemie.vercel.app)

**Audited:** 2026-09-28 · **Scope:** all 16 sitemap URLs · **Baseline:** `SEO-AUDIT.md` (2026-08-26)
**Runtime:** bundled `seo` skill scripts (`runtime.py`), seven specialist passes, one shared crawl
**Machine-readable envelope:** [`preemie.vercel.app-audit/audit-data.json`](preemie.vercel.app-audit/audit-data.json)
**HTML report:** [`preemie.vercel.app-audit/Google-SEO-Report-preemie.vercel.app-full.html`](preemie.vercel.app-audit/Google-SEO-Report-preemie.vercel.app-full.html)
**Detailed findings:** [`preemie.vercel.app-audit/findings/`](preemie.vercel.app-audit/findings/) — `technical.md`, `content.md`, `on-page` (this report), `schema.md`, `geo.md`, `sxo.md`, `sitemap.md`

---

## 1. Health score: **77.4 / 100**

| # | Category | Score | Weight | Contribution | One-line verdict |
|---|----------|------:|-------:|-------------:|------------------|
| 1 | Content Quality (E-E-A-T / YMYL) | **70** | 0.23 | 16.10 | Real credentialed physician, dated review lines, editorial policy — undercut by thin pages and no citations. |
| 2 | Technical SEO | **85** | 0.22 | 18.70 | Clean indexability, canonicals, redirect discipline and SSR; the losses are a broken favicon and absent security headers. |
| 3 | On-Page SEO | **85** | 0.20 | 17.00 | 16/16 `200` + exact self-canonical + `index,follow`; unique titles and H1s sitewide. |
| 4 | Schema / Structured Data | **74** | 0.10 | 7.40 | 82/82 JSON-LD blocks parse-valid and a real physician graph — held back by validity defects, not missing markup. |
| 5 | Performance (CWV) | **71** | 0.10 | 7.10 | Structurally sound; render-blocking Google Fonts plus a ~398 KB gzipped initial JS payload are the INP/LCP risks. |
| 6 | AI Search Readiness (GEO) | **76** | 0.10 | 7.60 | Nothing blocked, byte-identical bodies for every AI crawler, full `llms.txt` coverage — but zero source attribution at audit time. |
| 7 | Images | **70** | 0.05 | 3.50 | Perfect alt text and intrinsic dimensions; a favicon that was not an image and one content image site-wide. |
| | **Weighted total** | | **1.00** | **77.40** | |

Scores reflect the **live site as crawled on 2026-09-28, before this week's fixes.** Week 1 is implemented in the repository and verified locally (see §6) but is not yet reflected in these numbers until deploy.

**Reading the number:** 77.4 is mid-market for a small YMYL tool. Nothing here is structurally broken — no orphan pages, no redirect chains, no blocked crawlers, no duplicate content. Every point lost is a *cheap* point: a favicon, a header, a title length, a missing sentence-level citation. That is the defining characteristic of this audit, and it is why the one-week plan is executable rather than aspirational.

---

## 2. Method, and what could not be measured

| Evidence tier | Status | Consequence |
|---|---|---|
| Live HTTP + raw HTML of 16 URLs, plus 30 edge-case URLs | ✅ used | Crawlability, indexability, canonicals, on-page, sitemap all evidence-backed |
| Full JSON-LD extraction and block-by-block validation (82 blocks) | ✅ used | Schema scored against schema.org V30.1 |
| Playwright a11y-tree scoring + mobile screenshot on 4 pages | ✅ used | SXO usability dimensions are measured, not inferred |
| PageSpeed Insights / lab CWV | ❌ rate-limited (`240 QPM / 25,000 QPD`) | **Performance 71 is code-level inference, not measured LCP/INP/CLS** |
| Google Search Console / CrUX / GA4 | ❌ no credentials configured | No indexation status, no field CWV, no traffic baseline |
| Backlink profile | ❌ Common Crawl only, domain absent from graph | **Backlinks scored 0/3 — absence of evidence in CC, not a measured zero** |
| Moz / Bing / Keywords Everywhere | ❌ keys not configured | No third-party authority metrics |
| PDF report | ❌ WeasyPrint GTK/Pango missing on this host | HTML report generated instead |

Nothing in this report is a fabricated metric. Where a tier was unavailable, the score either says so in its rationale or was deliberately given a low weight (backlinks = 3%).

---

## 3. What is genuinely working

1. **Indexability is clean.** 16/16 URLs return `200` with an exact self-canonical and `index, follow`; no `noindex` anywhere in `src/`; HTTP→HTTPS is a single `308`; no redirect chain exceeds one hop on any tested URL.
2. **True SSR.** With JavaScript disabled the raw response already contains the `<h1>`, all FAQ prose and 4–6 valid JSON-LD blocks. Googlebot and AI crawlers see the finished page, not a shell.
3. **The E-E-A-T scaffolding is real, not decorative.** A named, credentialed physician (`Physician` JSON-LD with `sameAs`) anchors `author` *and* `reviewedBy` on all 16 pages, with dated review lines, a funding/conflict policy and a real headshot.
4. **AI crawlers are unobstructed.** Nine crawler UAs (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `CCBot`, `bingbot`, `OAI-SearchBot`, …) all returned HTTP 200 with a byte-identical body and no `X-Robots-Tag` — no cloaking, no UA-specific blocks.
5. **Answer-first formatting is excellent.** Every guide opens with `Quick answers` / `The short answer` above the fold, and FAQ answers are self-contained 1–3 sentence extracts — the format AI answer engines lift verbatim.
6. **No duplicates, no orphans.** Exact-duplicate text is minimal across the site, and every sitemap URL has ≥16 inlinks.
7. **No CLS from images.** Across all 16 pages `img_no_dims_count = 0`; every `<img>` carries explicit `width`/`height`.
8. **Breadcrumbs on every page** with a matching `BreadcrumbList` node, plus a skip link, `main` landmark, visible focus states and `aria-live` result updates (a11y 94–100).

---

## 4. Category findings

### 4.1 Technical SEO — **85/100** · `findings/technical.md`

Crawlability 92 · Indexability 88 · URL structure 89 · Redirects 91 · Sitemap referencing 84 · Security headers 70 · CWV potential 71.

- **P0 — `public/favicon.png` was a committed Vercel "503 first byte timeout" XHTML page served as `image/png`** (447 bytes), referenced by `rel=icon` *and* by `WebSite.publisher.logo`. `/favicon.ico` returned 404. Every logo validation failed sitewide.
- **P1 — no security headers at all:** no CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` or `X-Frame-Options` on any response (HSTS was correct).
- **P1 — sitemap `lastmod` frozen at 2026-08-26** and `scripts/generate-sitemap.mjs` was not wired into the build, so dates drifted from the pages' own `article:modified_time`.
- **P2 — ~398 KB gzipped initial JS** (jsPDF 86 refs + Recharts 74 refs in the preloaded homepage chunk) is the INP risk on mid-range mobile.
- **P2 — Google Fonts render-blocking third-party CSS** on all 16 pages; the homepage `<h1>` is set in a webfont, so LCP text waits on two serialized round-trips.

### 4.2 Content, E-E-A-T & YMYL — **70/100** · `findings/content.md`

E-E-A-T 82 · Depth 58 · Readability 48 · Keyword/intent 70 · Cannibalization 60 · Freshness 60 · Internal links 66.

- **P0 — zero outbound citations on the entire site.** 15 of 16 pages named authority (`CDC`, `AAP`, `WHO`) without linking a single source. For a YMYL health publisher this is the single largest credibility gap in the audit.
- **P0 — thin pages:** 11 of 16 pages sat under the 800-word floor, 6 under 600, with prose-only counts as low as **166 words** (`/red-flags`).
- **P1 — readability:** median prose Flesch ≈ 46, with 15 of 16 pages below 60, at grade 8.3–11.5 for a lay-parent audience.
- **P1 — four overlapping clusters** (calculator trio, age comparison, vaccine timing, when-to-stop) risk cannibalization.
- **P1 — no direct contact channel** and no corrections log on `/about`.

### 4.3 On-Page SEO — **85/100**

16/16 `200` + exact self-canonical + `index,follow` · 16 unique titles and H1s · brand suffix present · descriptions in range after Week 1 · 16/16 `h1` count of exactly 1 · OG/Twitter card coverage 13/16.

- Titles >60ch: **7** at audit time (all now ≤60, see §6).
- Descriptions >160ch: **8** at audit time (all now 150–160).
- `/when-to-stop-correcting` had lost its `| AdjustedAge` suffix entirely.

### 4.4 Schema / Structured Data — **74/100** · `findings/schema.md`

Coverage/syntax **20/20** · property completeness 14/20 · entity graph 14/20 · value validity 10/15 · markup↔content parity 8/15 · YMYL medical depth 8/10.

- **82 JSON-LD blocks across 16 URLs, 82/82 parse-valid**, 0 truncated, all `@context` https, all URLs absolute, all dates ISO-8601, no placeholder text. `Physician @id` resolves on 16/16; all 11 `og/*.png` URLs in schema return real 1200×630 PNGs.
- **`Organization.logo` pointed at a file that was not an image** — the same favicon defect, replicated into 14 route publishers plus `__root`.
- **Duplicate, conflicting `Physician` node on `/about`** (same `@id`, different fields) making JSON-LD merge order-dependent; `/about` had **no page-level schema node at all**.
- **31 anonymous inline `Organization` copies** with no `@id`, so they can never be referenced or merged.
- **`medicalSpecialty: "Pediatrics"`** is not a `MedicalSpecialty` enum member (correct value: `Pediatric`) — 14 source locations, rendering on all 16 pages.
- **`image` missing from 9 page nodes** although every one already has a live OG card.
- **FAQ↔copy parity:** 13 of 46 questions appear verbatim on-page; 5 pages carry `FAQPage` with no visible Q&A. Recorded as *integrity only* — Google retired FAQ rich results on 2026-05-07, so this is explicitly **not** a recommendation to add or remove `FAQPage`.
- **A `HowTo` block on `/how-to-calculate-corrected-age` earns nothing** (how-to rich results ended Sept 2023): optional removal, and **never add `HowTo` anywhere else**.

### 4.5 Performance / Core Web Vitals — **71/100** ⚠️ *inferred, not measured*

- Strengths: viewport/lang/image dimensions correct on all 16; module scripts + `modulepreload`; hashed assets served `immutable`; SSR means LCP is server-delivered HTML; zero image-driven CLS.
- Risks: render-blocking Google Fonts; ~398 KB gzipped initial JS (INP); three `fetchPriority=high` avatars competing with the LCP element, one of them below the fold; `Cache-Control: max-age=0` on all public images.
- **No field Core Web Vitals exist.** Until GSC/CrUX are configured, INP and LCP cannot be confirmed against the 2.5 s / 200 ms thresholds.

### 4.6 AI Search Readiness (GEO) — **76/100** · `findings/geo.md`

Crawler access 19/20 · discovery files 9/15 · citability 19/25 · attribution 7/15 · entity consistency 13/15 · freshness signals 9/10.

- `llm.txt` **and** `llms.txt` both live, byte-identical, covering **16/16** sitemap URLs — but with **non-conformant link syntax** (plain URLs rather than markdown `[title](url)` links), which cuts extractable URL coverage.
- Strongest citability asset: answer-first blocks, extractable FAQ, full SSR prose. Weakest: **claim attribution — 7/15 at audit time because there was nothing to attribute to.**

### 4.7 SXO (Search Experience) — **79/100** · `findings/sxo.md`

Intent match 20/25 · answer visibility 16/20 · scannability 15/20 · navigation 8/10 · mobile/a11y 13/15 · intrusion/trust 7/10.

- Every URL is the right *kind* of page for its query — **except the "chart" page, which was not a chart** (no `<table>` at all).
- Primary CTA pushed below the hero on mobile (<640px) and hidden there.
- Homepage is heavy: 21 link-card blocks and 15 `<h2>`s; 59% of all anchors site-wide are header/footer boilerplate.
- Visible SEO jargon in the footer is a small trust cost.

### 4.8 Sitemap & Internal Linking — **78/100** · `findings/sitemap.md`

Format 15/15 · coverage 15/15 · robots wiring 8/8 · **lastmod 6/15** · priority 5/7 · images 4/5 · internal coverage 13/15 · anchors 9/10 · architecture 3/7 · backlinks 0/3.

- Sitemap is technically near-flawless: valid namespace, 16 unique `<loc>` = 16 routes = 16 `llm.txt` entries, declared in `robots.txt`.
- **All 16 `lastmod` were identical and contradicted 9 of 16 pages' own `article:modified_time`; 4 predated their own `datePublished`.**
- **Header navigation exposed only 6 of 16 pages**; 4 content pages had <5 body-link sources; `/privacy` had 0 inlinks.
- No query-string prefill internal links (the pattern proposed in `SEO-AUDIT.md` §3.3) existed.
- Domain absent from the Common Crawl web graph → no PageRank/harmonic-centrality data at any tier available here.

---

## 5. Top 10 issues by expected impact

| # | Issue | Category | Severity | Effort |
|---|---|---|---|---|
| 1 | Zero outbound primary-source citations sitewide | Content / GEO | 🔴 Critical | Medium |
| 2 | Thin pages (166–543 prose words on money/guide pages) | Content | 🔴 Critical | High |
| 3 | `favicon.png` = Vercel error page; `/favicon.ico` 404 | Technical / Schema / Images | 🔴 Critical | Low |
| 4 | Sitemap `lastmod` frozen + generator not in the build | Technical / Sitemap | 🟠 High | Low |
| 5 | No security headers | Technical | 🟠 High | Low |
| 6 | 7 titles >60ch, 8 descriptions >160ch, 1 lost brand suffix | On-Page | 🟠 High | Low |
| 7 | `/premature-baby-milestones` is not a table | SXO / Content | 🟠 High | Medium |
| 8 | 31 anonymous `Organization` copies + duplicate `Physician` on `/about` | Schema | 🟠 High | Medium |
| 9 | Render-blocking Google Fonts + 398 KB initial JS | Performance | 🟡 Medium | Medium |
| 10 | Header nav covers 6 of 16 pages; 4 near-orphan routes | Sitemap / SXO | 🟡 Medium | Medium |

---

## 6. Week 1 implementation — shipped and verified

Fifteen files of fixes were dispatched to five agents with disjoint file ownership, integrated centrally, and committed as **`7369682`** (on top of `e5836e9`).

| Fix | Evidence |
|---|---|
| Icon set regenerated: `favicon.ico` (6,008 B), `favicon.png` (1,908 B valid PNG), `apple-touch-icon.png` (11,319 B), `icon-512.png` (37,022 B) | all `200`, PNG signature verified |
| `Organization.logo` repointed to `icon-512.png` in `__root` + all 14 route publishers | 0 absolute `favicon.png` logo refs remain |
| `scripts/generate-sitemap.mjs` wired into `build`; `lastmod` now prefers the last commit date, `mtime` only for uncommitted edits (not `max()`, which would stamp every URL with the build date on CI) | `wrote public/sitemap.xml (16 urls)` on every build; `lastmod` 2026-09-28 |
| `vercel.json` security headers: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` | file present; CSP deliberately deferred rather than shipping one that could break SSR |
| 404 route returns HTTP 404 + `noindex,nofollow` + its own title | verified live locally |
| `llm.txt`/`llms.txt` byte-identical, **16 markdown links** | hash equality + link count |
| Service-worker registration removed (it pointed at a `/sw.js` that never shipped) + unregister of stale workers | `pwa.ts` documents why; registration gone |
| Outbound citations + JSON-LD `citation` on **16/16 pages** | WHO, CDC, AAP, ACOG, CPS, PubMed, PMC, Nature, doi.org |
| Thin-page expansion: `/red-flags` 166→508, `/nicu-follow-up-schedule` 438→875, `/when-to-stop-correcting` 543→874 | 3 required evidence sources verified live (PMC12221983, Nature `s41390-024-03449-0`, Emory) |
| Milestones → real semantic `<table>` (10 age rows × 5 columns, `<th scope>`), `overflow-x-auto`, CSV export via `milestonesToCsv()` | 1 `<table>`, 15 `<th scope>`, 11 `<tr>`, CSV control present |
| Titles ≤60 and descriptions 150–160 on all 16 URLs; brand suffix restored | **16/16 pass, exit code 0** |
| `/about` gained a contact channel and a dated corrections log | rendered |
| `late-preterm-baby` duplicate vaccine `<h2>` removed | rendered |

**Integration gates:** `eslint` exit 0 · `node --test` **6/6 pass** · `vite build` exit 0 in 9.77 s · post-change crawl of all 16 routes + 8 assets + the 404 → **0 issues**.

> **Local-only caveat:** this host could not build until two environment defects were worked around — (a) `@lovable.dev/mcp-js`'s `assertContains` compares a forward-slash Vite `root` against a backslash `resolve()` result, so it always throws on Windows; (b) four entries in bun's global cache (`react-dom@19.2.8`, `nitro`, `h3`, `@radix-ui/react-aspect-ratio`) held zero-filled `package.json` files after an interrupted install. Both were fixed **inside `node_modules` / the bun cache only** — gitignored, never committed, and irrelevant to Vercel's Linux build. Re-verify with a fresh `bun install` on a clean machine before trusting a local build.

---

## 7. Recommendation

**The audit is complete and the one-week plan is fully executed in code.** The remaining work is *deployment and measurement*, not more on-page changes:

1. **Deploy** `7369682` — the scores above will not move until the fixes are live.
2. **Verify the property in Google Search Console and Bing Webmaster Tools** (`SEARCH-CONSOLE-SETUP.md` is written; only the owner's account is missing). This unlocks the first *measured* indexation and field-CWV data, closing the largest evidence gap in this report.
3. **Re-run this audit after deploy** and diff against baseline `id 1` (captured 2026-09-28).

Full prioritised task list → [`ACTION-PLAN.md`](ACTION-PLAN.md) · Day-by-day execution detail → [`IMPLEMENTATION-ROADMAP.md`](IMPLEMENTATION-ROADMAP.md).

---

*Built by **agricidaniel** — community audit deliverable. Verified with the bundled `seo` skill runtime; no metrics were invented where an evidence tier was unavailable.*
