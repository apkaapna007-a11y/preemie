# GEO Audit — AdjustedAge (https://preemie.vercel.app)

**Subagent:** `seo-geo` (Generative Engine Optimization / AI-search readiness)
**Audit date:** 2026-09-28 · **Method:** live fetches of `/robots.txt`, `/llm.txt`, `/llms.txt`, `/sitemap.xml`, HTTP headers, per-UA crawler probes, and full HTML/JSON-LD extraction of all 16 sitemap URLs (raw evidence in `findings/raw/`).
**Repo source:** `D:\Downloads\Compressed\preemie-main\preemie-main` (TanStack Start SSR on Vercel).

---

## GEO SCORE: **76 / 100**

| Dimension | Weight | Score | Note |
|---|---|---|---|
| AI crawler access & non-cloaking | 20 | 19 | Permissive robots, no `X-Robots-Tag`, byte-identical body for every AI UA |
| llms.txt / discovery files | 15 | 9 | Both files live + full coverage, but **non-conformant link syntax** |
| Citability (answer-first, extractable) | 25 | 19 | Excellent answer blocks + FAQ, but no tables and almost no verifiable sources |
| Claim attribution / source linking | 15 | 7 | **Zero outbound links to any authoritative source on the whole site** |
| Entity & brand consistency | 15 | 13 | Strong `Physician`/`sameAs` graph; logo + 1 title drift, favicon still in schema |
| Structured-data freshness signals | 10 | 9 | `datePublished`/`dateModified`/`lastReviewed` on 14/16 pages; sitemap `lastmod` disagrees |

---

## What works (keep it)

1. **Nothing is blocked and nothing is cloaked.** Probed 10 crawler UAs — `GPTBot`, `ClaudeBot`, `Claude-Web`, `PerplexityBot`, `Google-Extended`, `CCBot`, `bingbot`, `msnbot`, `OAI-SearchBot` plus generic — **all returned HTTP 200 with a byte-identical 55,643-byte body** and **no `X-Robots-Tag` header**. Verified no `vercel.json` / `_headers` / `netlify.toml` in the repo, so no header-level blocking exists either.
2. **`robots.txt` is AI-safe.** Single `User-agent: *` / `Allow: /` with only `/mcp`, `/.mcp/`, `/.well-known/`, `/~oauth/` disallowed and the sitemap declared. Correct: the MCP transport is deliberately de-indexed while the HTML remains fully open.
3. **`llm.txt` *and* `llms.txt` both exist and are byte-identical** (4,088 bytes each, `text/plain; charset=utf-8`, HTTP 200). The `llms.txt` alias called out in SEO-AUDIT §3.5 has shipped.
4. **llms.txt covers 16/16 sitemap URLs** — every route in `public/sitemap.xml` has a one-line description, plus an `About`, `Key Concepts` (corrected age / PMA / GA bands), `Safety` and `Technical` section. That is a genuinely extractable "what this site is" brief.
5. **True SSR for AI extractors.** Raw HTML carries the full H1/H2 outline, the full article prose, and 4–6 JSON-LD blocks with no JS execution required.
6. **Answer-first formatting is excellent.** Every guide opens with a `Quick answers` / `The short answer` H2 within the first screenful; homepage has `Quick answers parents usually need first` as a 4-bullet block. FAQ questions are phrased as real questions and each `FAQPage` answer is a self-contained 1–3 sentence extract.
7. **Entity graph is real.** `Physician` (Dr. Zeeshan Islam, MBBS, MCPS) linked by `@id` as both `author` and `reviewedBy`, with `sameAs` → `drzeeshanislam.blog`, `linkedin.com/in/dr-zeeshan-islam-b81b0b373`, `drzeewrites.com` on **all 16 pages**; `Organization` publisher named `AdjustedAge`; real headshot `dr-zeeshan-islam.png` (709×585) in schema and in the rendered review card.
8. **Freshness metadata present:** `datePublished`, `dateModified`, `lastReviewed` on 14/16 pages (missing only on `/about`, and `datePublished` missing on `/privacy`), mirrored by `article:published_time`/`article:modified_time` OG tags.
9. **Consistent canonical URL family:** `og:url` == `rel=canonical` == `sitemap <loc>` on all 16 URLs, all `https://preemie.vercel.app`, all `robots: index, follow`.
10. **Safety framing is quotable and refusal-free:** the site states what it *won't* do ("no pass/fail verdict") — LLMs can quote that verbatim without misrepresenting it.

---

## Findings

### G1 — `llms.txt` does not use markdown links, so most parsers will extract **zero URLs**
**Severity: High** · *Evidence:* both files render page entries as:

```
- **/** — Corrected age calculator (primary tool). Enter date of birth and gestational age;…
- **/adjusted-age-calculator** — Adjusted age calculator. …
```

The llms.txt convention (`llmstxt.org`) is `- [Title](https://host/path): description`. Every entry here is a **bold relative path**, not a link, and no path is absolute. Retrieval pipelines that scrape `href`s from the file (Kagi, Perplexity-style llms.txt readers, several open-source loaders) will get an empty URL set and only the prose. Coverage we measured (16/16) is therefore invisible to link-extracting consumers.

**Fix:** rewrite every entry as `- [Corrected age calculator](https://preemie.vercel.app/): …`, keep relative paths out, keep `public/llm.txt` and `public/llms.txt` byte-identical (add a one-line generator in `scripts/` so they can't drift), and regenerate from `src/routes` when routes ship.

### G2 — **Zero outbound citations anywhere on the site**: claims are named, never linked
**Severity: High** · *Evidence:* scanned rendered text of all 16 pages — **no `http(s)://` link to any external site appears in the visible content of any page** (the only external URLs in the whole HTML are `fonts.googleapis.com`, `schema.org`, `w3.org`, and the author's own `sameAs` profiles). Source names appear as bare text: `/methodology` → `CDC ×1, AAP ×3, WHO ×1, Fenton ×5, INTERGROWTH ×4`; `/about` → 4 mentions; `/` and `/premature-baby-milestones` → `CDC ×2, AAP ×2`. **12 of 16 pages contain no authoritative source name at all** (e.g. `/preemie-vaccines`, `/when-to-stop-correcting`, `/red-flags`, `/late-preterm-baby`, `/how-to-calculate-corrected-age`, `/nicu-follow-up-schedule`, all report `0` for CDC/AAP/WHO).

On a YMYL topic this is the single biggest GEO gap: answer engines weight claims that carry a verifiable, resolvable source, and Google's quality raters look for "supported by reliable sources" on medical content. A model asked *"do preemies get vaccines by corrected age?"* can lift the site's answer but has nothing to cite it *against*.

**Fix:** (a) make every entry in `/methodology → Sources` a real outbound link (CDC 2022 AAP milestone tables, AAP schedule, WHO standards, Fenton/INTERGROWTH papers — with DOI/PMID where possible); (b) add a 2–4 item `Sources` mini-block with links at the bottom of each clinical guide; (c) link the CDC/AAP source inline where the claim first appears on `/` and `/premature-baby-milestones`.

### G3 — The flagship "chart" has **no `<table>`**, so it is unextractable as a chart
**Severity: Medium** · *Evidence:* `/premature-baby-milestones` renders 0 `<table>` elements (`tables=0`, `ul=10`). The deliverable is `H2 "2 months corrected" → <ul>` repeated 10×. Headline schema says `Premature Baby Milestones Chart by Corrected Age`, and the `<h1>` says "chart", but the machine-readable artefact is a list of lists.

Neither AI extractors nor Google's table/featured-snippet surfaces can read row = corrected age × column = milestone domain. This is also the SEO-AUDIT §3.3 "chart as a deliverable" item half-done.

**Fix:** render each age band (or the whole 2–36 month span) as `<table>` with `<caption>Premature baby milestones by corrected age (CDC/AAP 2022)</caption>`, `<th scope="col">`, `<th scope="row">`; keep the existing print stylesheet. Optionally add `Dataset` JSON-LD with the same rows.

### G4 — `Article` schema on the two highest-value guides **drops the reviewer signal**
**Severity: Medium** · *Evidence:* JSON-LD type inventory —

| Page | Types | `reviewedBy` | `lastReviewed` |
|---|---|---|---|
| `/` `/adjusted-age-calculator` `/pma-calculator` `/preemie-weight-gain` and 7 more | `MedicalWebPage` | ✅ | ✅ |
| `/premature-baby-milestones` | `WebSite, Physician, Article, FAQPage, BreadcrumbList` | ❌ | ❌ |
| `/how-to-calculate-corrected-age` | `… Article, HowTo, FAQPage …` | ❌ | ❌ |
| `/red-flags`, `/privacy`, `/about` | no `reviewedBy` | ❌ | ❌ |

The two pages most likely to be cited (the chart and the formula) are the two where the machine-readable physician review is absent — even though the on-page card *does* say "Medically reviewed by Dr. Zeeshan Islam… Last reviewed August 2026". Schema and page disagree.

**Fix:** add `reviewedBy` (with `@id` → the site-wide `Physician`) and `lastReviewed` to `Article` blocks; add `dateModified` to `/about`.

### G5 — `Organization.logo` still points at a **447-byte favicon** (SEO-AUDIT §3.1 residue)
**Severity: Medium** · *Evidence:* on all 16 pages: `"publisher":{"@type":"Organization","name":"AdjustedAge","logo":{"@type":"ImageObject","url":"https://preemie.vercel.app/favicon.png"}}` — and `HEAD /favicon.png → image/png, 447 bytes`. `Physician.image` was fixed to the real 709×585 headshot, but the Organization logo was not.

**Fix:** ship `public/og/og-brand.png` (or a square logo) as `Organization.logo` with `width`/`height`, ideally a dedicated 1200×1200 wordmark; point `WebSite`-level `image` at it too.

### G6 — Sitemap `lastmod` contradicts page-level `dateModified` (freshness signal is noise)
**Severity: Medium** · *Evidence:* all 16 `<lastmod>2026-08-26</lastmod>` in `public/sitemap.xml`, while JSON-LD reports `dateModified: 2026-08-27` on 8 pages (`/`, `/adjusted-age-calculator`, `/pma-calculator`, `/preemie-weight-gain`, `/preemie-vaccines`, `/late-preterm-baby`, `/nicu-follow-up-schedule`, `/when-can-my-preemie-start-solids`, `/adjusted-age-vs-chronological-age`, `/methodology`, `/when-to-stop-correcting`). `scripts/generate-sitemap.mjs` exists but is **not wired into the build** — `package.json` → `"build": "vite build"` and `vite.config.ts` registers no sitemap plugin.

**Fix:** add `"build": "node scripts/generate-sitemap.mjs && vite build"` (or a Vite `closeBundle` hook) so `lastmod` comes from git `mtime` per route and new routes are appended automatically.

### G7 — Brand-name drift on one title
**Severity: Low** · *Evidence:* 15/16 titles end in `| AdjustedAge`; `/when-to-stop-correcting` = `"When to Stop Correcting Age for a Preemie | Milestones, Growth & Vaccines"` — no brand. `og:site_name=AdjustedAge` is consistent everywhere, and `og:url`/canonical are byte-identical across all pages.

**Fix:** append `| AdjustedAge` (or restructure to `… | AdjustedAge` within the 60-char budget).

### G8 — No claim-level "statistic/definition" blocks for extraction
**Severity: Low** · *Evidence:* definitions exist in prose (`Corrected age is chronological age minus the weeks of prematurity…`) and there is a `Key Concepts` section in `llms.txt`, but on-page there is no bulleted key-fact list, no `Q/A` one-liner at the very top of guides, and no numeric epidemiology (`~1 in 10 births preterm worldwide`, `280 days = 40 weeks`, `correction through 24 months`) presented as an extractable stat. Pages carry only 5–6 generic citation tokens each (mostly the year `2026`).

**Fix:** add a 3–5 bullet `At a glance` block (definition, the formula, the 24-month convention, the chronological-age-for-vaccines rule) with dates and sources at the top of each clinical guide, and one validated statistic with a link where relevant.

### G9 — No `speakable`, no `SearchAction`, no explicit AI-crawler directives
**Severity: Info** · *Evidence:* `"SearchAction" in home HTML = False`, `"speakable" = False`. `inLanguage: "en"` **is** present (SEO-AUDIT §3.5 item shipped). `WebApplication` schema present on `/`, `/adjusted-age-calculator`, `/pma-calculator`, `/preemie-weight-gain`.

**Fix (optional, cheap):** add `WebSite.potentialAction: SearchAction` (there is no site search today — only add it if one ships), and add explicit `Allow:` lines for `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `OAI-SearchBot` in `robots.txt` for documentation value. Neither is required for indexing today.

### G10 — MCP endpoints correctly de-indexed, but the MCP surface is an untapped citation channel
**Severity: Info** · *Evidence:* `robots.txt` disallows `/mcp`, `/.mcp/`; MCP tools (`corrected-age`, `weight-velocity`, `followup-schedule`, `milestone-prompts`) are reachable only by direct tool call.

**Fix:** unchanged robots behaviour; submit the MCP server to registries (SEO-AUDIT §6.1) — this is the cheapest way to have the site *answer inside* an assistant rather than only be cited by it.

---

## SEO-AUDIT.md (2026-08-26) — GEO-item status

| # | Item (SEO-AUDIT §) | Status | Evidence |
|---|---|---|---|
| 1 | **`llms.txt` alias — ship both files** (§3.5) | **FIXED** | `/llm.txt` and `/llms.txt` both 200, `text/plain`, byte-identical (4,088 B) |
| 2 | **Keep `llm.txt`/`llms.txt` updated as pages ship** (§6.1) | **FIXED** *(coverage)* / **STILL-OPEN** *(format)* | 16/16 sitemap URLs described — but non-standard bold-path syntax, no absolute URLs (finding G1) |
| 3 | **`llms.txt` ahead of 99% of sites** (§2.6) | **FIXED** | verified live |
| 4 | **OG cards 1200×630 per page-type** (§3.1) | **FIXED** | `og/og-home|pma|weight-gain|vaccines|late-preterm|followup|solids|age-difference|milestones|guides|red-flags|about|brand.png`; `og:image:width/height` + `og:image:alt` + `twitter:image:alt` present on `/` and `/premature-baby-milestones` |
| 5 | **`Organization.logo` / `Physician.image` off the favicon** (§3.1) | **STILL-OPEN** *(part)* / **FIXED** *(part)* | `Physician.image` = `dr-zeeshan-islam.png` 709×585 ✅; `Organization.logo` = `favicon.png` (447 B) on all 16 pages ❌ (finding G5) |
| 6 | **Author photo rendered + `sameAs` identity graph** (§3.2) | **FIXED** | `<img src="/dr-zeeshan-islam.png">` + `webp` source in header card, aside and footer; `sameAs` ×3 on all 16 pages |
| 7 | **Milestones title/H1/meta target "chart"** (§3.3) | **FIXED** | title `…Chart by Corrected Age (2–36 Months)`, h1 `…chart, by corrected age`, meta `Printable premature baby milestones chart…` |
| 8 | **Printable/deliverable chart artifact (CSV + A4 PDF)** (§3.3) | **STILL-OPEN** | Print CTA ✅ (`Print this chart` button); `CSV` absent, `jsPDF` absent on the page; and the chart is still not a `<table>` (finding G3) |
| 9 | **Sitemap `lastmod` from git mtime, auto-add routes** (§3.5) | **STILL-OPEN** | all 16 `lastmod=2026-08-26`; `generate-sitemap.mjs` never invoked by `npm run build` (finding G6) |
| 10 | **Brand + URL byte-identical everywhere** (§5.3) | **STILL-OPEN** *(1 page)* | `/when-to-stop-correcting` title omits `AdjustedAge` (finding G7) |
| 11 | **`WebSite` `inLanguage`** (§3.5) | **FIXED** | `"inLanguage":"en"` on all pages |
| 12 | **`WebSite` SearchAction** (§3.5) | **STILL-OPEN** | `SearchAction = False` (no site search exists — see G9) |
| 13 | **Homepage `WebApplication` schema** (§3.5) | **FIXED** | `WebApplication` on `/`, `/adjusted-age-calculator`, `/pma-calculator`, `/preemie-weight-gain` |
| 14 | **Homepage FAQ expansion to 8–10 Q** (§4.3) | **FIXED** *(7 shipped)* | 7 `Question` nodes live (corrected age, adjusted vs corrected, PMA, vaccines, growth charts, 36-weeker, when it stops) — includes 3 of the 4 bridging questions listed |
| 15 | **Claim attribution to authoritative sources (implicit in §4/§6 GEO play)** | **STILL-OPEN** | zero outbound source links sitewide (finding G2) |
| 16 | **GSC + Bing WMT verification** (§3.4) | **STILL-OPEN** *(owner action)* | `public/google076e3cd5eda37745.html` present; cannot be confirmed from code — blocks Bing/Copilot citation tracking |
| 17 | **Growth-chart page as the AI-citation bridge** (§4.1) | **STILL-OPEN** | no `/preemie-growth-chart` in sitemap |
| 18 | **Google Fonts self-hosting** (§3.5) | **STILL-OPEN** | `fonts.googleapis.com/css2?family=Newsreader…` still render-blocking in `<head>` |

**No GEO items regressed.** Nothing that previously worked has broken: AI crawlers all fetch full content, `llms.txt`/`llm.txt` both live, schema graph intact, OG layer fixed.

---

## Prioritised GEO fix order

1. **G2** outbound source links (biggest YMYL citation lift, ~half a day).
2. **G1** llms.txt markdown-link rewrite + build-time generator.
3. **G4** `reviewedBy`/`lastReviewed` on `Article` pages + **G5** `Organization.logo`.
4. **G3** real `<table>` on the milestones chart.
5. **G6** sitemap `lastmod` wired into `build`.
6. **G7** title fix, **G8** "At a glance" blocks, **G9** optional schema extras.
