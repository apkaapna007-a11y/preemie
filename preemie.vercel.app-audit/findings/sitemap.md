# Sitemap & Internal-Linking Audit — preemie.vercel.app

**Category:** XML sitemap, robots.txt wiring, sitemap ↔ route coverage, internal link graph, backlinks (Common Crawl tier)
**Audited:** 2026-09-28 · **Baseline:** `SEO-AUDIT.md` (2026-08-26)
**Method:** live fetch of `/sitemap.xml` + `/robots.txt` + all 16 sitemap URLs (raw HTTP, no JS), full anchor extraction with header/body/footer landmark splitting, route-file diff against `src/routes/`, `sitemap_discovery.py`, `backlinks_auth.py --check`, `commoncrawl_graph.py`.

---

## 1. Category score: **78 / 100**

| Sub-score | Weight | Earned | Notes |
| --- | ---: | ---: | --- |
| Sitemap format & validity | 15 | **15** | Correct `sitemaps.org/schemas/sitemap/0.9` namespace, XML declaration, 16 unique `<loc>`, served `200` / `application/xml` |
| Sitemap ↔ route coverage | 15 | **15** | 16 sitemap URLs = 16 page routes = 16 `llm.txt` pages. Zero unsitemapped indexable pages, zero dead sitemap entries |
| robots.txt wiring | 8 | **8** | `Sitemap:` line present, sitemap not disallowed, `/mcp`, `/.mcp/`, `/.well-known/`, `/~oauth/` disallowed |
| lastmod accuracy | 15 | **6** | All 16 `lastmod` are the same date and **contradict 9 of 16 pages' own `article:modified_time`**; 4 predate their own publication |
| priority / changefreq sanity | 7 | **5** | All values in range and ordered sensibly, but `0.78` is arbitrary and both tags are ignored by Google/Bing |
| Image / news sitemap opportunity | 5 | **4** | Only 1 crawlable content image sitewide — correctly omitted; news sitemap correctly absent |
| Internal link coverage | 15 | **13** | No orphans (every URL ≥16 inlinks), but 4 content pages sit on ≤5 body-link sources and `/privacy` has 0 |
| Anchor text quality | 10 | **9** | Zero generic anchors; a handful of off-target/boilerplate anchors |
| Link-architecture efficiency | 7 | **3** | Header covers only 6 of 16 pages; 59% of all anchors are header/footer boilerplate |
| Backlinks (Common Crawl tier) | 3 | **0** | Domain absent from the CC web graph — no PageRank, no harmonic centrality (§5) |
| **Total** | **100** | **78** | |

**Verdict:** the sitemap is technically near-flawless (valid, complete, canonical-consistent, robots-wired) and the link graph has no orphans — the loss comes from *stale `lastmod`* and *navigation equity that stops at the header's six links*.

---

## 2. Sitemap findings

### 2.1 What works (verified, keep it)

- **Valid, well-formed urlset.** `<?xml version="1.0" encoding="UTF-8"?>` + `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`. `sitemap_discovery.py` returns `kind: "urlset"`, `valid: true`, `status_code: 200`, `warnings: []`.
- **Declared and discoverable.** `robots.txt` line `Sitemap: https://preemie.vercel.app/sitemap.xml`; the sitemap returns 200 with `Content-Type: application/xml`, `Content-Length: 2960`. Alternate sitemap paths (`/sitemap_index.xml`, `/sitemap-index.xml`, `/wp-sitemap.xml`) correctly 404 — no stale declarations.
- **Complete coverage, both directions** (diffed programmatically):
  - sitemap → routes: `in sitemap not in routes: []`
  - routes → sitemap: only `/__root` (not a page). All 16 `.tsx` page routes are listed.
  - generator → sitemap: `scripts/generate-sitemap.mjs` `PAGES` array (16) is byte-identical to the shipped sitemap; all 16 referenced source files exist.
  - `/mcp` (a real route) is **correctly excluded** from the sitemap and `Disallow:`-ed.
- **Every URL returns 200, no redirects, no soft-404s.** `fetch_page.py` on all 16: `status_code: 200`, `redirect_chain: []`, `error: null`. HTTP→HTTPS is a `308`; `/about/` is a `307 → /about`.
- **Canonical ↔ sitemap agreement is exact** (SEO-AUDIT §2.2 still holds at 16 URLs): every page's self-canonical equals its `<loc>` byte-for-byte, including the trailing slash on `/`.
- **No index bloat:** `meta robots = "index, follow"` on all 16; no `X-Robots-Tag`; no `hreflang` rows (single-language site — correct to omit).
- **`llm.txt` and `llms.txt` are byte-identical** (4088 bytes each) and list the same 16 URLs with one-line descriptions — the AI-crawler mirror of the sitemap is in sync (SEO-AUDIT §3.5 `llms.txt` alias: **FIXED**).
- **Clean parameters:** no query-string, fragment or session URLs in the sitemap.
- **`robots.txt` still correct at 16 routes:** `User-agent: *` / `Allow: /` + `Disallow: /mcp`, `/.mcp/`, `/.well-known/`, `/~oauth/` + the `Sitemap:` line.

### 2.2 Findings

#### F1 — Sitemap `lastmod` is uniform and contradicts the pages' own modification dates
**Severity: 🟠 MEDIUM**

**Evidence**

| | |
| --- | --- |
| Sitemap `lastmod` values | `2026-08-26` on **all 16** URLs (single distinct value) |
| Pages declaring `article:modified_time = 2026-08-27` | **9 of 16**: `/adjusted-age-vs-chronological-age`, `/how-to-calculate-corrected-age`, `/late-preterm-baby`, `/methodology`, `/nicu-follow-up-schedule`, `/preemie-vaccines`, `/premature-baby-milestones`, `/when-can-my-preemie-start-solids`, `/when-to-stop-correcting` |
| Pages whose `article:published_time` (2026-08-27) is **later than** their sitemap `lastmod` | **4**: `/late-preterm-baby`, `/nicu-follow-up-schedule`, `/when-can-my-preemie-start-solids`, `/adjusted-age-vs-chronological-age` |

Four URLs are declared last-modified the day *before they were published*, and nine disagree with the on-page `modified_time` meta. The generator (`scripts/generate-sitemap.mjs`) takes `max(git log -1 --format=%cs, file mtime)`, which collapses to one coarse date for everything touched in the same commit window; `PAGES` is a hard-coded list rather than a route discovery; and because `public/` is copied verbatim nothing forces a re-run on deploy.

**Recommendation**

1. Treat `article:modified_time` as the single source of truth — have each route export its modified date (or read from one shared content manifest) and make `generate-sitemap.mjs` consume it instead of re-deriving from git/mtime.
2. Run the generator in CI on every deploy (`node scripts/generate-sitemap.mjs`, then fail the build if `git diff --exit-code public/sitemap.xml`) so `lastmod` can never lag a content deploy.
3. Derive `PAGES` from `src/routes/*.tsx` (excluding `__root`, `[.mcp]`, `[.well-known]`, `mcp`) so new spokes cannot be forgotten.

---

#### F2 — Header navigation exposes only 6 of 16 pages; 8 URLs have no main-nav presence
**Severity: 🟠 MEDIUM**

**Evidence** — the header signature is byte-identical on all 16 pages (8 anchors):

| In header nav | Not in header nav |
| --- | --- |
| `/` (logo + "Open the tool"), `/premature-baby-milestones`, `/how-to-calculate-corrected-age`, `/when-to-stop-correcting`, `/red-flags`, `/methodology`, `/about` | `/adjusted-age-calculator` (priority 0.9), `/pma-calculator`, `/preemie-weight-gain`, `/preemie-vaccines`, `/late-preterm-baby`, `/nicu-follow-up-schedule`, `/when-can-my-preemie-start-solids`, `/adjusted-age-vs-chronological-age` |

Those eight are the synonym/long-tail cluster SEO-AUDIT §4.2 shipped — the pages built to capture query volume are the ones a crawler and a user can only reach through body cross-links and the footer.

**Recommendation**

- Add a `Calculators` group to the header (`Adjusted age`, `PMA`, `Weight gain`) and a `Guides` group (`Late preterm`, `NICU follow-up`, `Solids`, `Vaccines`, `Adjusted vs chronological`) — dropdown or second link row.
- Minimum viable change this sprint: put `/adjusted-age-calculator` (0.9-priority synonym page) and `/preemie-vaccines` in the main nav.
- Re-run the crawl afterwards: target ≥1 header inlink for every sitemap URL.

---

#### F3 — Four content pages are near-orphans in body content; `/privacy` is footer-only
**Severity: 🟠 MEDIUM** (four content pages) / 🟡 LOW (`/privacy`)

**Evidence** — distinct pages linking to X *from body content only* (header/footer excluded):

| Target | Body-link sources | Body inlinks | Header | Footer | Verdict |
| --- | ---: | ---: | ---: | ---: | --- |
| `/preemie-vaccines` | **4** (`/`, `/adjusted-age-vs-chronological-age`, `/late-preterm-baby`, `/pma-calculator`) | 6 | 0 | 16 | near-orphan for a 0.8-priority guide |
| `/when-can-my-preemie-start-solids` | **4** (`/`, `/adjusted-age-vs-chronological-age`, `/preemie-weight-gain`, `/premature-baby-milestones`) | 10 | 0 | 16 | near-orphan |
| `/preemie-weight-gain` | **5** (`/`, `/late-preterm-baby`, `/nicu-follow-up-schedule`, `/pma-calculator`, `/when-can-my-preemie-start-solids`) | 8 | 0 | 16 | near-orphan for a calculator |
| `/pma-calculator` | **5** (`/`, `/adjusted-age-vs-chronological-age`, `/nicu-follow-up-schedule`, `/preemie-vaccines`, `/preemie-weight-gain`) | 14 | 0 | 16 | concentrated in 5 pages |
| `/privacy` | **0** | 0 | 0 | 16 | footer-only (acceptable for a legal page) |

For contrast `/methodology` is linked from **all 16** body regions, `/premature-baby-milestones` / `/about` / `/` from 15, `/red-flags` from 14. Equity is pooling on the trust pages and thinning on the conversion pages.

**Recommendation**

- One contextual in-body link per content page into the weakest spokes, with keyword anchors: `/premature-baby-milestones` and `/when-to-stop-correcting` → `/preemie-vaccines` (both already answer the "which age for vaccines" question); `/how-to-calculate-corrected-age` → `/preemie-weight-gain`; `/red-flags` → `/nicu-follow-up-schedule`.
- Ship a `<Related>` module rendered **inside `<main>`** (not the footer) on every guide — 3 links, unique anchors. Converts existing footer inventory into body-weight links without new copy.
- Add one in-body link to `/privacy` from `/about` ("no cookies, no tracking — see the privacy policy"); leave it out of the header.

---

#### F4 — 59% of all internal anchors are header/footer boilerplate; footer is a byte-identical 17-link block on every page
**Severity: 🟡 LOW**

**Evidence**

| Region | Anchor instances (16 pages) | Share |
| --- | ---: | ---: |
| Header (identical template, 8/page) | 128 | 18.9% |
| Footer (identical template, 17/page) | 272 | 40.2% |
| Body (real contextual links) | 277 | 40.9% |
| **Total** | **677** | 100% |

Worst per-page boilerplate ratios: `/about` 76% (8 body anchors of 33), `/privacy` 74%, `/red-flags` 74%. The footer **self-links** (every page links to itself) and links to `/about` **twice** ("Read the author's credentials and review policy" + "About the author").

**Recommendation**

- Trim the footer to 8–10 links (drop the duplicate `/about` and the current-page self-link), or move the 8-page "all guides" list out of the footer into a per-page related block in `<main>`.
- Keep the header at 8 until F2 is addressed, then re-measure; target <50% boilerplate sitewide.

---

#### F5 — Anchor text: no generic anchors, but several off-target or repeated boilerplate anchors
**Severity: 🟡 LOW**

**Evidence**

- Generic-anchor scan (`click here`, `read more`, `learn more`, `here`, `more info`, `details`, `continue`, …) across all 677 anchors: **zero matches**, zero empty-text anchors — genuinely good (SEO-AUDIT §2.8 still holds).
- Off-target anchors: `safety guidance` → `/red-flags` (on `/when-can-my-preemie-start-solids`), `weight gain` → `/preemie-weight-gain`, `milestones` → `/premature-baby-milestones`, `PMA` (3×) → `/pma-calculator`.
- Boilerplate repetition: `Formulas and sources` → `/methodology` on **15 of 16** pages; `Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics)` → `/about` on 15 of 16; `Home` → `/` 15×.
- Strong keyword anchors do dominate the body: `late preterm baby guide` (11×), `NICU follow-up schedule` (8×), `premature baby milestones chart` (6×), `adjusted age vs chronological age guide` (4×).

**Recommendation**

- Fix the two genuinely mismatched anchors (`safety guidance` → `preemie feeding safety`; `weight gain` → `preemie weight gain calculator`).
- Vary the sitewide `Formulas and sources` boilerplate by page context (on `/preemie-vaccines` → "how vaccine timing is derived").
- Leave `Home` / author anchors alone — navigational, not manipulative.

---

#### F6 — No internal link hands off to the tool with a query-string prefill (SEO-AUDIT §3.3 unimplemented)
**Severity: 🟠 MEDIUM** (it was an explicit audit recommendation)

**Evidence:** regex scan for `href="/…?…"` across all 16 rendered pages → **0 matches**. `/premature-baby-milestones` rows do not deep-link to `/?ga=31&days=4&dob=…`, so the highest-intent interaction signal the audit asked for (content page → tool) is not being collected, and the chart is a dead end.

**Recommendation:** implement prefill links on milestone rows, NICU follow-up rows and the red-flags table. This is a link-graph change, not just UX — it turns the chart into a hub.

---

#### F7 — Image / news sitemap: correctly omitted today, revisit when the chart ships
**Severity: 🟡 LOW / informational**

**Evidence**

- Crawlable `<img>` sitewide: exactly **one asset** — `/dr-zeeshan-islam.png` (709×585, correct descriptive `alt`, wrapped in `<picture>` with `srcSet="/dr-zeeshan-islam.webp"`), 2–3 instances per page. `img_noalt = 0` on all 16 pages.
- 11 branded cards live in `/og/*.png` (1200×630) but are referenced **only** as `og:image`/`twitter:image` — never as in-page images, so they are not part of the image graph.
- The milestones chart is an HTML table (good for content rankings, invisible to image search).

**Recommendation**

- **No image sitemap now** — it would only re-declare one repeated author photo.
- Add `<image:image>` entries (or a second sitemap referenced from `robots.txt`) **when** the printable chart PNG/PDF and any growth-chart figures ship; those are the assets worth image-SERP visibility.
- **No news sitemap** — the site is not a Google News publisher; correctly absent.

---

#### F8 — Case and duplicate-slash variants return 200 instead of redirecting
**Severity: 🟡 LOW**

**Evidence**

| URL | Result | Canonical returned |
| --- | --- | --- |
| `/RED-FLAGS` | 200 | `…/red-flags` ✔ |
| `/About` | 200 | `…/about` ✔ |
| `//red-flags` | 200 | `…/red-flags` ✔ |
| `/about/` | 307 → `/about` | — |
| `/index.html` | 404 ✔ | — |
| `/sitemap.xml/` | 200 | — |

Consolidation relies on the canonical tag rather than a redirect. Google will consolidate, but each variant serves a full duplicate HTML body.

**Recommendation:** add edge/middleware `308`s for case variants, double slashes and trailing slashes so only canonical URLs return 200. Low priority — canonicals are correct.

---

#### F9 — Sitemap hygiene nits (no action strictly required)
**Severity: ⚪ INFORMATIONAL**

- `priority` includes `0.78` — legal (0.0–1.0) but arbitrary; Google and Bing ignore `priority` entirely.
- `changefreq` `weekly`/`monthly` — also ignored by Google; harmless.
- Date-only `lastmod` (no timestamp) — valid; keep.
- No sitemap index — correct at 16 URLs (limits: 50,000 URLs / 50 MB).

---

## 3. Internal link graph

### 3.1 Full inlink table (all 16 sitemap URLs)

Region split: `header` = inside `</header>` (main nav), `footer` = after `<footer`, `body` = everything else (breadcrumbs, prose, related cards, FAQs).

| # | URL | Total inlinks | Body inlinks | Header | Footer | Distinct **body** sources | Body out-anchors (own page) | Rank by body inlinks | Boilerplate share of own outlinks |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: |
| 1 | `/` | 88 | 40 | 32 | 16 | 15 | 53 | 2= | 32% |
| 2 | `/adjusted-age-calculator` | 30 | 14 | 0 | 16 | 10 | 18 | 5= | 58% |
| 3 | `/pma-calculator` | 30 | 14 | 0 | 16 | 5 | 17 | 11= | 60% |
| 4 | `/preemie-weight-gain` | 24 | 8 | 0 | 16 | 5 | 20 | 11= | 56% |
| 5 | `/preemie-vaccines` | 22 | 6 | 0 | 16 | **4** | 16 | 13= | 61% |
| 6 | `/late-preterm-baby` | 37 | 21 | 0 | 16 | 9 | 14 | 7= | 64% |
| 7 | `/nicu-follow-up-schedule` | 35 | 19 | 0 | 16 | 9 | 13 | 7= | 66% |
| 8 | `/when-can-my-preemie-start-solids` | 26 | 10 | 0 | 16 | **4** | 14 | 13= | 64% |
| 9 | `/adjusted-age-vs-chronological-age` | 34 | 18 | 0 | 16 | 10 | 13 | 5= | 66% |
| 10 | `/premature-baby-milestones` | 59 | 27 | 16 | 16 | 15 | 19 | 2= | 57% |
| 11 | `/how-to-calculate-corrected-age` | 50 | 18 | 16 | 16 | 9 | 20 | 7= | 56% |
| 12 | `/when-to-stop-correcting` | 46 | 14 | 16 | 16 | 7 | 15 | 10 | 63% |
| 13 | `/red-flags` | 57 | 25 | 16 | 16 | 14 | 9 | 4 | 74% |
| 14 | `/methodology` | 58 | 26 | 16 | 16 | **16 (all)** | 19 | **1** | 57% |
| 15 | `/about` | 65 | 17 | 16 | **32** | 15 | 8 | 2= | **76%** |
| 16 | `/privacy` | 16 | **0** | 0 | 16 | **0** | 9 | **15** | 74% |

**Totals:** 677 internal anchor instances · 400 header/footer (59.1%) · 277 body (40.9%) · 16 pages, 16/16 with ≥16 inlinks → **zero orphans**.

**Outlink breadth per page (distinct body targets out of 15 possible):** `/` 14 · `/pma-calculator` 11 · `/preemie-vaccines` 11 · `/adjusted-age-calculator` 10 · `/late-preterm-baby` 10 · `/premature-baby-milestones` 10 · `/how-to-calculate-corrected-age` 10 · `/methodology` 9 · `/nicu-follow-up-schedule` 9 · `/preemie-weight-gain` 9 · `/when-to-stop-correcting` 9 · `/adjusted-age-vs-chronological-age` 8 · `/when-can-my-preemie-start-solids` 8 · `/red-flags` 7 · `/about` 6 · `/privacy` 6.

### 3.2 Click depth & crawl path

- Every sitemap URL is **≤2 clicks** from `/` (home body-links to 14 of the other 15 directly; `/privacy` is depth 2 via the footer).
- Every page is reachable from the header *or* the footer on all 16 pages — no page depends on a single path.
- **No broken links:** internal link targets outside the 16-URL set = **0**. Nothing links to `/mcp`, `/.mcp/`, a 404, or an asset path.
- **No orphan routes** and **no sitemap entries pointing at non-existent routes** (§2.1).
- Breadcrumbs are 2-level (`Home` → current page) on all 15 non-home pages — the breadcrumb supplies each page's only guaranteed body link to `/`.

### 3.3 Body vs footer — which spokes are only in the footer?

| Spoke group | Body-linked? | Header-linked? | Footer-linked? |
| --- | --- | --- | --- |
| Core guides (milestones, how-to, when-to-stop, red-flags, methodology, about) | ✔ 9–15 sources | ✔ | ✔ |
| Tool pages (adjusted-age, PMA, weight-gain) | ✔ 5–10 sources | ✘ | ✔ |
| Newest long-tail (vaccines, solids, late-preterm, NICU follow-up, adjusted-vs-chrono) | ✔ 4–10 sources | ✘ | ✔ |
| `/privacy` | ✘ | ✘ | ✔ only |

**Key-spoke verdict:** the hub→spoke leg exists (home's body links to 14 of 15 targets), but the money pages are **absent from the header** and thin on spoke→spoke body links. `/preemie-vaccines` and `/when-can-my-preemie-start-solids` are one hop from being footer-reliant.

### 3.4 Anchor text health

- Generic anchors (`click here` / `read more` / `more info` / empty): **0** across 677 anchors.
- Anchor-text diversity is healthy ( `/` 21 distinct anchors, `/red-flags` 21, `/premature-baby-milestones` 20 ) — no exact-match over-optimisation pattern.
- Weak spots are itemised in F5.

---

## 4. SEO-AUDIT.md (2026-08-26) reconciliation — sitemap & link items

| # | Audit item | Location | Status | Evidence |
| --- | --- | --- | --- | --- |
| 1 | "Sitemap + robots.txt correct, all 8 routes listed; `/mcp`, `/.mcp/`, `/.well-known/` correctly disallowed; sitemap URL referenced from robots.txt" | §2.5 | **FIXED** (now at 16 routes) | Live `robots.txt` still carries all 4 `Disallow` lines + `Sitemap:`; sitemap lists 16/16 page routes; `sitemap_discovery.py`: `valid: true`, no warnings |
| 2 | "All canonical URLs match the sitemap" | §2.2 | **FIXED** (verified at 16 URLs) | Every `rel=canonical` byte-matches its `<loc>`, incl. trailing slash on `/` |
| 3 | "Sitemap `lastmod` — regenerate from git mtime, add new routes automatically" (logged ✅ 2026-08-26) | §3.5 | **STILL-OPEN** | Mechanism shipped (`scripts/generate-sitemap.mjs`) but the output is wrong: 16/16 `lastmod` = `2026-08-26`, contradicting `article:modified_time = 2026-08-27` on 9 pages; 4 pages show `lastmod` **earlier than** their published date; `PAGES` is still hand-maintained → F1 |
| 4 | "`llms.txt` alias — ship both files" | §3.5 | **FIXED** | `/llm.txt` and `/llms.txt` both 200 and byte-identical, both listing all 16 URLs |
| 5 | "Keyword-targeted internal anchors" | §2.8 | **FIXED / STRENGTHENED** | 0 generic anchors in 677 links; keyword anchors dominate body links (`premature baby milestones chart` ×6, `late preterm baby guide` ×11, `NICU follow-up schedule` ×8) |
| 6 | "Homepage hero upgraded with … internal-link CTAs" (logged ✅ 2026-08-26) | progress log | **FIXED** | Home carries 53 body anchors to 14 distinct internal targets — the densest page on the site |
| 7 | "Every new page … is added to the sitemap" | §4.2 rule | **FIXED** | All post-audit pages (`/pma-calculator`, `/preemie-weight-gain`, `/preemie-vaccines`, `/late-preterm-baby`, `/nicu-follow-up-schedule`, `/when-can-my-preemie-start-solids`, `/adjusted-age-vs-chronological-age`) present in sitemap **and** `llm.txt` |
| 8 | "Every milestone row should link to the tool with a query-string prefill (`/?ga=…&dob=…`)" | §3.3 | **STILL-OPEN** | 0 internal `?`-links across all 16 rendered pages → F6 |
| 9 | "Authority: zero backlinks, subdomain-only presence" | §1 P1 | **STILL-OPEN (unverifiable at this tier)** | No Moz/Bing/PR key configured (Tier 0); Common Crawl web-graph query returned no usable data — see §5. No backlink metric is asserted |
| 10 | "Backlink tracker — GSC Links report" | §6.2.3 | **STILL-OPEN** | GSC still not connected per the progress log; nothing to query |
| 11 | *(not previously audited)* Main nav covers only 6/16 pages | new | **REGRESSED relative to growth** | Not a defect in August — the site had fewer pages. At 16 pages, eight — including the 0.9-priority `/adjusted-age-calculator` — have no header presence → F2 |
| 12 | *(not previously audited)* Footer is a fixed 17-link block repeated verbatim on all 16 pages | new | **STILL-OPEN (new finding)** | 272 identical footer anchors sitewide, duplicate `/about`, self-links → F4 |

---

## 5. Backlinks — Common Crawl tier (no credentials configured)

```
backlinks_auth.py --check
  Backlink Tier: 0 -- Basic (Common Crawl + Verify only)
  [MISSING] Moz Link Explorer API        (MOZ_API_KEY not set)
  [MISSING] Bing Webmaster Tools API     (BING_WEBMASTER_API_KEY not set)
  [MISSING] Keywords Everywhere (Open PageRank)
  [OK]      Common Crawl Web Graph       cached domains: 0
  [OK]      Backlink Verification Crawler
```

**Result: no backlink data returned.** `commoncrawl_graph.py preemie.vercel.app` was run twice — 300 s timeout, then 900 s — and completed neither time (no output, nothing written to `~/.cache/claude-seo/commoncrawl`; `--info` reports `Cached domains: 0`). The web-graph host file is too large to pull within this session's budget on this connection.

**Therefore no referring-domain count, no top-referrer list and no domain rank are reported for this site.** Rather than substitute a plausible-looking number, this audit records the gap. To obtain real backlink data:

1. **Free:** verify the site in Google Search Console and read *Links → Top linking sites* (SEO-AUDIT §3.4 / §6.2.3 — still blocked on the owner's account).
2. **Free key:** Bing Webmaster Tools unlocks tier-1 here (`BING_WEBMASTER_API_KEY`).
3. **Free tier:** Moz API, 2,500 rows/month (`MOZ_API_KEY`) for DA/PA + spam score.
4. Retry `commoncrawl_graph.py` on a wired connection or with a much larger timeout — it needs no credentials.

---

## 6. Prioritised action list

| # | Action | Impact | Effort |
| --- | --- | --- | --- |
| 1 | Fix `lastmod` — derive from `article:modified_time`, regenerate in CI on deploy (F1) | Medium — accurate crawl signals, faster re-crawl of updated YMYL content | S |
| 2 | Add `Calculators` / `Guides` groups to the header nav (F2) | Medium — puts 8 under-linked pages one click from every page | S–M |
| 3 | Add an in-`<main>` related-content block + 4 contextual links to `/preemie-vaccines`, `/when-can-my-preemie-start-solids`, `/preemie-weight-gain`, `/pma-calculator` (F3) | Medium — fixes the 4 near-orphans | S |
| 4 | Implement milestone-row → tool query-prefill links (F6) | Medium — engagement + hub behaviour | M |
| 5 | Trim/de-duplicate the footer, remove self-links (F4) | Low — cleaner equity flow | S |
| 6 | Fix 2 mismatched anchors + vary the `Formulas and sources` boilerplate (F5) | Low | S |
| 7 | `308` redirects for case / trailing-slash / double-slash variants (F8) | Low | S |
| 8 | Wire up GSC (+ Bing WMT) so backlinks and rank become measurable (§5) | High for measurement | S (owner action) |
| 9 | Defer the image sitemap until the printable chart / growth figures ship (F7) | None today | — |

---

*Artifacts: crawl cached at `%TEMP%\opencode\preemie-crawl\` — 16 × raw HTML, 16 × `fetch_page.py --json`, 16 × `parse_html.py --json`, `links.json`, `linkgraph.txt`, `linkdetail.txt`, `summary.txt`.*
