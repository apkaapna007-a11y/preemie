# Technical SEO Audit — `preemie.vercel.app` (AdjustedAge)

**Specialist:** `seo-technical` · **Date:** 2026-09-28 · **Target:** https://preemie.vercel.app/
**Evidence base:** live HTTP fetches of all 16 sitemap URLs + 30 edge-case URLs, raw response headers, repo source (`src/routes/__root.tsx`, `public/robots.txt`, `public/sitemap.xml`, `scripts/generate-sitemap.mjs`, `vite.config.ts`, `src/lib/pwa.ts`, `package.json`), and the prior `SEO-AUDIT.md` (2026-08-26).
**Method note:** real field/lab Core Web Vitals are **not** available — `pagespeed_check.py` returned `PSI rate limit exceeded (240 QPM / 25,000 QPD)` for both mobile and desktop, and `render_page.py` fell back to `mode_used: "raw"` (no browser engine). CWV section below therefore reports **risks inferred from code and payload sizes, not measured scores**. `consistency_check.py` requires a git repo and exited `128` (this checkout is not a git repo) — skipped.

---

## 1. Category scores

| # | Category | Score | One-line rationale |
|---|----------|------:|--------------------|
| 1 | Crawlability (robots.txt) | **92** | Correct `Allow`/`Disallow` set, sitemap declared, MCP + OAuth endpoints excluded; one prefix-match over-block. |
| 2 | Indexability (meta robots / noindex / canonical) | **88** | 16/16 `index, follow` + exact self-canonical; the 404 page also emits `index, follow`. |
| 3 | Sitemap referencing | **84** | Valid `urlset`, 16/16 URLs valid and matching routes & canonicals; `lastmod` uniformly stale and regeneration not wired to build. |
| 4 | URL structure | **89** | Clean lowercase hyphenated paths, no parameterised sitemap URLs; case-insensitive variants return 200. |
| 5 | Redirect chains | **91** | HTTP→HTTPS single `308`, slash/double-slash single-hop; no chain exceeds 1 hop anywhere. |
| 6 | HTTPS & security headers | **70** | HSTS with `preload` present everywhere; CSP, XCTO, Referrer-Policy, Permissions-Policy, XFO all absent. |
| 7 | Status codes | **90** | All 16 sitemap URLs `200`; unknown paths `404`; one asset (`favicon.png`) returns `200` with the wrong payload. |
| 8 | Duplicate / near-duplicate content | **91** | No true duplicates (max pairwise similarity 0.174, boilerplate-driven); all variants canonicalise. |
| 9 | Mobile viewport + CWV *potential* (code-level) | **71** | Viewport/lang/image-dimensions all correct; ~398 KB gz JS preloaded on `/` + un-self-hosted Google Fonts. |
| | **Overall** | **85** | Weighted equally across the 9 categories: 766 / 9 = 85.1. |

---

## 2. What works (evidence-backed)

1. **robots.txt is correct and complete.**
   Live `GET /robots.txt` → `200`, 147 bytes:
   ```
   User-agent: *
   Allow: /
   Disallow: /mcp
   Disallow: /.mcp/
   Disallow: /.well-known/
   Disallow: /~oauth/

   Sitemap: https://preemie.vercel.app/sitemap.xml
   ```
   No site content is blocked, and the machine endpoints are (`/.mcp/list-tools` → `200 application/json`, `/mcp` → `405`).
2. **Sitemap is declared, valid and reachable.** `sitemap_discovery.py` → `robots.txt`-declared `https://preemie.vercel.app/sitemap.xml`, `status_code: 200`, `kind: "urlset"`, `valid: true`, `warnings: []`. 16 `<loc>` entries, no `sitemap_index.xml` / `wp-sitemap.xml` ambiguity (both correctly `404`).
3. **Every sitemap URL returns 200 + exact self-canonical + indexable.** Verified programmatically:
   - `mismatches = 0 / 16` (each `<loc>` equals its rendered `<link rel="canonical">` byte-for-byte)
   - statuses: `200` on all 16 (`/`, `/adjusted-age-calculator`, `/pma-calculator`, `/preemie-weight-gain`, `/preemie-vaccines`, `/late-preterm-baby`, `/nicu-follow-up-schedule`, `/when-can-my-preemie-start-solids`, `/adjusted-age-vs-chronological-age`, `/premature-baby-milestones`, `/how-to-calculate-corrected-age`, `/when-to-stop-correcting`, `/red-flags`, `/methodology`, `/about`, `/privacy`)
   - `<meta name="robots" content="index, follow">` on all 16; `grep noindex` over `src/` → **0 matches**
   - **16 unique titles and 16 unique H1s** — no title/H1 duplication.
4. **Sitemap ↔ route inventory matches exactly.** `src/routes/*.tsx` contains 16 content routes; `scripts/generate-sitemap.mjs` `PAGES` array contains the same 16 paths; `public/sitemap.xml` lists the same 16. No orphan routes, no phantom sitemap URLs.
5. **HTTP→HTTPS is a single permanent hop.** `http://preemie.vercel.app/about` → `308 Location: https://preemie.vercel.app/about` (verified with redirects disabled). No intermediate hops.
6. **HSTS present with preload on every HTTPS response**, e.g. `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` observed on `/`, all 15 other pages, `/robots.txt`, `/sitemap.xml`, `/llm.txt`, `/manifest.webmanifest` and every 404.
7. **No parameter / hybrid URL variants are indexable.** Every variant tested returns 200 but self-canonicalises to the clean URL and sets `og:url` to the clean URL:
   | Variant | Status | Canonical returned |
   |---|---|---|
   | `/?utm_source=gsc` | 200 | `https://preemie.vercel.app/` |
   | `/about?ref=twitter` | 200 | `…/about` |
   | `/About` | 200 | `…/about` |
   | `/PREMATURE-BABY-MILESTONES` | 200 | `…/premature-baby-milestones` |
   | `/./about`, `/privacy/../about` | 200 | `…/about` |
   | `/about/`, `//about` | 307 / 308 → 200 | `…/about` |
   Visible-text hashes for the case/dot/double-slash variants are **identical** to the clean URL (`text_hash = -2687775339111809924` for all four `/about` variants) → canonical consolidation works.
8. **www / non-www handled without duplicate risk.** The apex `preemie.vercel.app` is the only host that serves; canonical, `og:url`, sitemap and robots.txt all reference the apex. `www.preemie.vercel.app` fails TLS (`certificate is not valid for 'www.preemie.vercel.app'`) rather than serving a duplicate — see F8.
9. **404 behaviour is status-correct.** `/this-page-does-not-exist-xyz`, `/foo/bar/baz`, `/index.html`, `/index`, `/home`, `/about%2F`, `/sitemap` all → **`404`** with a 5,517-byte "Page not found" body (correct status, see F5 for the meta/title nit).
10. **SSR verified from raw HTML.** With JS disabled the raw response already contains the `<h1>`, all FAQ text, and **6 valid JSON-LD blocks** (`WebSite`, `Physician`, `MedicalWebPage`, `WebApplication`, `FAQPage`, `BreadcrumbList` — all `valid: true`), plus `<html lang="en">`. `is_spa: false`.
11. **Mobile viewport correct on 16/16:** `<meta name="viewport" content="width=device-width, initial-scale=1">`.
12. **Zero CLS risk from images.** Across all 16 pages: `img_count` 2–3, **`img_no_dims_count = 0`** — every `<img>` carries explicit `width`/`height`. Author photo is served as `<picture>` with a `31,112 B` WebP source ahead of the `498,507 B` PNG.
13. **Social/OG layer healthy.** All 13 referenced cards return `200 image/png` at `1200×630`: `og-home`, `og-about`, `og-brand`, `og-milestones`, `og-guides`, `og-solids`, `og-red-flags`, `og-weight-gain`, `og-vaccines`, `og-pma`, `og-followup`, `og-age-difference`, `og-late-preterm`.
14. **`llm.txt` and `llms.txt` both live and byte-identical** (4,088 B, SHA-1 prefix `dcf8bf5d0744` for both) — the "ship both" item from the prior audit is done.
15. **Caching discipline on hashed assets is right:** `/assets/*` → `Cache-Control: public, max-age=31536000, immutable`. Scripts are `type="module"` (deferred by spec) with 5 `modulepreload` hints and **0 classic render-blocking `<script>`** in `<head>`.
16. **GSC verification file is deployed:** `/google076e3cd5eda37745.html` → `200`, 54 bytes.

---

## 3. Findings

### F1 — `public/favicon.png` is a committed Vercel "503 first byte timeout" error page served as `image/png`
**Severity: High**

**Evidence**
- `GET https://preemie.vercel.app/favicon.png` → `200`, `Content-Type: image/png`, `Content-Length: 447`.
- Decoded body: `<?xml version="1.0" encoding="utf-8"?> <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" … <title>503 first byte timeout</title> … <h1>Error 503 first byte timeout</h1>`.
- The repo file is byte-identical: `public/favicon.png` = **447 bytes**, same XHTML content (it was captured as an error page and committed).
- Referenced from `src/routes/__root.tsx:131` — `<link rel="icon" type="image/png" href="/favicon.png">` — and from the sitewide `WebSite` JSON-LD at `__root.tsx:152` — `"logo": { "@type": "ImageObject", "url": "https://preemie.vercel.app/favicon.png" }`.
- `GET /favicon.ico` → **404** (no fallback icon either).

**Why it matters (YMYL):** Google draws the sitelink/favicon from this file — an unrenderable favicon is a visible quality signal. `Organization.logo` pointing at a non-image can cause structured-data quality warnings and weakens the brand entity on a health site.

**Recommendation:** regenerate `public/favicon.png` from a real icon (or repoint `rel="icon"` and `WebSite.publisher.logo` at `/icons/icon-192.png`, which is a valid 192×192 PNG); add `public/favicon.ico` for legacy requests.

---

### F2 — Four standard security headers are absent (only HSTS is set)
**Severity: Medium**

**Evidence** — inspected on all 16 pages plus `robots.txt`/`sitemap.xml`; present: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, `Server: Vercel`, `Cache-Control`, `Content-Type`. Absent (null): `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`. No `vercel.json` exists in the repo root (root listing: `.lovable`, `public`, `scripts`, `src`, `tests`, config files only) → no custom header configuration anywhere.

**Why it matters:** on a YMYL site handling no user data, these are cheap hardening signals; `X-Content-Type-Options: nosniff` in particular would have stopped the browser rendering F1's HTML as an image. Missing `Referrer-Policy` also leaks full URLs (with any query strings) to third parties — which sits awkwardly next to the site's no-tracking promise.

**Recommendation:** add a `vercel.json` `headers` block:
```
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
X-Frame-Options: DENY  (or frame-ancestors 'none' via CSP)
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
```
(CSP must allow `fonts.googleapis.com`/`fonts.gstatic.com` until F3 lands.)

---

### F3 — Google Fonts is still a render-blocking third-party stylesheet (prior-audit item, unshipped)
**Severity: Medium** (CWV potential)

**Evidence**
- `src/routes/__root.tsx:125-130` emits `preconnect` to `fonts.googleapis.com` / `fonts.gstatic.com` plus `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader…&family=Public+Sans…&display=swap">`.
- That stylesheet is the **2nd render-blocking resource in `<head>` on all 16 pages**: `/assets/styles-DQ4i2EjI.css` then `https://fonts.googleapis.com/css2…` (verified per-page in the fetch output).
- Google Fonts CSS = 7,590 B; the returned CSS references **6 `.woff2` files totalling 298,876 B** from `fonts.gstatic.com` (Newsreader ×3, Public Sans ×3).
- `SEO-AUDIT.md:247` still lists *"Google Fonts self-hosting (CWV)"* as `⏳ P0 §3.5 remainder`.

**Why it matters:** two serialized round-trips (Google CSS → gstatic font files) on the LCP path of every page; the LCP element on `/` is the `<h1>`, which is set in `font-display` Newsreader → text invisible until the webfont resolves.

**Recommendation:** self-host via `@fontsource-variable/newsreader` + `@fontsource-variable/public-sans` (both OFL), preload only the LCP weight, drop both `preconnect`s. Cross-origin CSS also blocks the preload scanner from discovering anything behind it.

---

### F4 — The homepage preloads a 257 KB (gz) chunk containing jsPDF and Recharts
**Severity: Medium** (CWV / INP potential)

**Evidence**
- `/` HTML contains: `<link rel="modulepreload" href="/assets/CorrectedAgeTool-BlR0os1J.js">`.
- Measured transfer sizes (gzip): 
  | Asset | Raw | Transfer (gz) |
  |---|---:|---:|
  | `/assets/index-ZZrkWfoq.js` | 414,595 | **118,128** |
  | `/assets/CorrectedAgeTool-BlR0os1J.js` | 851,856 | **256,896** |
  | `/assets/routes-Dd24cvZZ.js` | 18,789 | 5,331 |
  | `/assets/SiteLayout-OgAXhYpm.js` | 13,270 | 4,239 |
  | `/assets/styles-DQ4i2EjI.css` | 78,854 | 13,584 |
  | **Total initial JS** | 1,298,510 | **≈ 397,875** |
- String scan of `CorrectedAgeTool-BlR0os1J.js` (decoded): `jsPDF` ×**86**, `recharts` ×**74**, `zod` ×318. `jspdf` and `recharts` are both in `package.json` dependencies.
- Inline hydration script + 852 KB raw module → `x` bytes of main-thread parse/compile before the calculator is interactive.

**Why it matters:** jsPDF (visit-summary export) and Recharts (weight chart) are needed only after a user action. Paying ~257 KB gz for them on first paint directly pressures **INP** on mid-range mobile — the exact device a parent uses at 3 a.m.

**Recommendation:** `const JsPdf = React.lazy(() => import("jspdf"))` behind the "Print / export PDF" button, and lazy-load the Recharts panel (or render it only once visit data exists). Keep the preloaded chunk under ~150 KB gz.

---

### F5 — The 404 page returns `index, follow` and inherits the homepage's title and `og:url`
**Severity: Low**

**Evidence** — `GET https://preemie.vercel.app/this-page-does-not-exist-xyz` → **`404`**, 5,517 B, body:
```
<meta name="robots" content="index, follow">
<title>AdjustedAge — Corrected Age Tool for Premature Babies</title>
og:url = https://preemie.vercel.app/
<h1>404</h1>  Page not found …
```
No `<link rel="canonical">` on the 404 page. Same for `/index.html`, `/home`, `/foo/bar/baz`. Source: `notFoundComponent` in `src/routes/__root.tsx:16-36` (no `head()` override, so it inherits the root `meta`).

**Why it matters:** Google will not index a 404, so the practical risk is low — but a soft-404-shaped title + `index, follow` is exactly what triggers "duplicate without user-selected canonical" confusion if a URL ever gets linked and re-crawled, and the shared title looks like a soft-404 pattern to other crawlers/AI fetchers.

**Recommendation:** add `head: () => ({ meta: [{ name: "robots", content: "noindex" }, { title: "Page not found | AdjustedAge" }] })` to the not-found route and drop `og:url`.

---

### F6 — Trailing-slash normalisation issues a `307` (temporary) instead of `308`
**Severity: Low**

**Evidence** (redirects disabled):
- `https://preemie.vercel.app/about/` → **`307` `Location: /about`**
- `https://preemie.vercel.app/red-flags/` → **`307` `Location: /red-flags`**
- `https://preemie.vercel.app//about` → **`308` `Location: /about`** (inconsistent with the slash case)
- `http://preemie.vercel.app/about` → **`308 Location: https://preemie.vercel.app/about`**

**Recommendation:** make trailing-slash stripping permanent (`308`) so intermediaries and crawlers cache it as permanent rather than re-validating each time. Also note `Location` is a *relative* path on the slash redirects while the scheme redirect is absolute — both are legal (RFC 9110) but absolute is safer with some legacy proxies.

---

### F7 — Case-insensitive URL variants return `200` with no redirect
**Severity: Low**

**Evidence**
- `https://preemie.vercel.app/About` → **`200`**, 27,798 B (vs 27,976 B for `/about`), title `About Dr. Zeeshan Islam | AdjustedAge`, `<link rel="canonical" href="https://preemie.vercel.app/about">`, `og:url = …/about`, `meta robots = index, follow`, identical visible-text hash.
- `https://preemie.vercel.app/PREMATURE-BABY-MILESTONES` → **`200`**, canonical → `…/premature-baby-milestones`.
- `https://preemie.vercel.app/RED-FLAGS` → **`200`**, no `Location`.

**Why it matters:** not a duplicate-content leak (canonical + `og:url` both point to the lowercase form), but it creates unbounded crawlable URL space (`/AboUT` etc.) and burns crawl budget / misattributes link equity if anyone ever links a badly-cased URL.

**Recommendation:** 308-redirect any path whose case differs from the route table (Vercel `redirects` or edge middleware), keeping canonical as the belt-and-braces.

---

### F8 — `www.preemie.vercel.app` has no certificate and no redirect
**Severity: Low**

**Evidence**
- `https://www.preemie.vercel.app/` → `URLError(SSLCertVerificationError: certificate is not valid for 'www.preemie.vercel.app')`
- `http://www.preemie.vercel.app/` → same TLS failure
- Apex `https://preemie.vercel.app/` → `200` (wildcard `*.vercel.app` covers only one label).

**Impact:** no SEO duplicate risk (the host simply never serves), but a visitor typing `www.` gets a hard browser certificate error with no path back to the site — and `HSTS includeSubDomains` on the apex means any future subdomain is forced to HTTPS whether or not it has a cert.

**Recommendation:** decide apex-only and document it, or add a dedicated cert for `www` plus a `308` to the apex. Nothing canonical-side needs changing — canonical, `og:url`, sitemap and robots.txt already agree on `preemie.vercel.app`.

---

### F9 — Sitemap `lastmod` is uniform and stale; regeneration is not wired into the build
**Severity: Medium**

**Evidence**
- Live `sitemap.xml`: **all 16 `<lastmod>` = `2026-08-26`** (`lastmod_unique: ["2026-08-26"]`).
- `SEO-AUDIT.md:244` records additional long-tail pages shipped on **2026-08-27** — so `lastmod` did not move with a content change.
- `scripts/generate-sitemap.mjs` does derive `lastmod` from `git log -1 --format=%cs` / `statSync().mtime`, but `package.json` `"build": "vite build"` has **no `prebuild` hook** — the script header itself says *"Run after merging content changes: `node scripts/generate-sitemap.mjs`"* (manual).

**Why it matters:** `lastmod` lying (or freezing) teaches crawlers to ignore the signal, and the manual step means a future route can ship without ever reaching the sitemap — this audit confirms the current state is in sync (16 routes ↔ 16 URLs) but only because someone ran it.

**Recommendation:** add `"prebuild": "node scripts/generate-sitemap.mjs"` to `package.json`, and add a test asserting `src/routes/*.tsx` ⊆ `PAGES` in `generate-sitemap.mjs` (the array is hand-maintained — a new route silently misses the sitemap otherwise).

---

### F10 — `Disallow: /mcp` is a prefix rule that over-blocks future paths
**Severity: Info**

**Evidence:** `robots.txt` line 3 `Disallow: /mcp` matches any path *beginning* with `/mcp` (per RFC 9309 prefix matching), e.g. a hypothetical `/mcp-directory`. Today: `/mcp` → `405`, `/mcp/` → `405`, `/.mcp/list-tools` → `200 application/json` (correctly blocked by `Disallow: /.mcp/`), `/.well-known/…` and `/~oauth/` → `404`. No content page is affected.

**Recommendation:** if a `/mcp-*` content page is ever added, use `Disallow: /mcp/` plus an exact `Disallow: /mcp$`. Otherwise leave as-is.

---

### F11 — Service worker is registered at `/sw.js`, which returns `404`
**Severity: Info** (not indexability — but it contradicts an on-page trust claim)

**Evidence**
- `src/lib/pwa.ts:5` → `const SW_URL = "/sw.js"`; registered at `pwa.ts:45` with the failure swallowed (`.catch(() => undefined)`).
- Live `GET https://preemie.vercel.app/sw.js` → **`404`**.
- `vite.config.ts:30` configures `VitePWA({ … outDir: ".output/public" … })` — the emitted worker never reaches the deployed `public/` output.
- The homepage badge row nonetheless advertises **"Works offline"**, and `SEO-AUDIT.md:38` cites offline/PWA as a differentiator.

**Why it matters:** SEO-neutral (Googlebot doesn't depend on it), but an unfulfilled capability claim on a YMYL trust surface, and the workbox `html-navigations` NetworkFirst cache never exists.

**Recommendation:** fix `outDir` so `sw.js` lands in the deployed public dir (verify with a production build), or remove the offline badge until it works.

---

### F12 — Three avatar images are `fetchPriority="high"` + `loading="eager"`, including the footer
**Severity: Info** (CWV potential)

**Evidence:** the homepage HTML renders the same `<picture>` three times, each with
`<img src="/dr-zeeshan-islam.png" … width="709" height="585" loading="eager" decoding="async" fetchPriority="high">`
— hero (rendered at `size-10` ≈ 40 px), sidebar (`h-24 w-20` ≈ 96 px) and **footer** (`size-16` ≈ 64 px, below the fold). WebP source (31,112 B) is correctly preferred over the 498,507 B PNG.

**Why it matters:** three `fetchpriority=high` images compete with the `<h1>` (the LCP candidate) for the limited-connection priority queue, and the footer image is eager-loaded for no benefit. `width`/`height` are present on all of them, so **there is no CLS risk** — this is purely bandwidth/priority hygiene.

**Recommendation:** `fetchPriority="high"` only on the above-the-fold hero avatar; `loading="lazy" fetchPriority="low"` for the sidebar/footer instances.

---

### F13 — Public images are served with `Cache-Control: max-age=0, must-revalidate`
**Severity: Info**

**Evidence:** `/dr-zeeshan-islam.png`, `/dr-zeeshan-islam.webp`, `/favicon.png`, `/icons/icon-192.png`, `/og/og-home.png`, `/manifest.webmanifest` → `Cache-Control: public, max-age=0, must-revalidate`, whereas hashed `/assets/*` → `public, max-age=31536000, immutable`.

**Recommendation:** give `public/` images a real TTL (e.g. `max-age=604800, stale-while-revalidate=86400`) so repeat visits don't revalidate the author photo and OG art on every load.

---

### F14 — Unused 498 KB duplicate asset with a space in its filename
**Severity: Info**

**Evidence:** `public/dr.zeeshan islam.png` (498,507 B, contains a literal space) sits alongside `public/dr-zeeshan-islam.png` (498,507 B). `grep "dr\.zeeshan islam"` over `src/` → **0 matches**; nothing links it.

**Recommendation:** delete it (it is deployed to production and would need percent-encoding if ever referenced).

---

## 4. Prior-audit (`SEO-AUDIT.md`, 2026-08-26) technical items — status

| # | Technical item (source line) | Status | Evidence |
|---|---|---|---|
| 1 | **OG/social cards = 4 KB favicon** (§3.1, line 48) | **FIXED** | All 13 `og/*.png` → `200 image/png`, PNG IHDR `1200×630`; `og:image:width/height = 1200/630` present; `twitter:image:alt` present (`__root.tsx:112`); no route references `favicon.png` as `og:image`. |
| 2 | **`favicon.png` itself** — was a *4 KB icon* at audit time (§3.1) | **REGRESSED** | It is now a **447-byte Vercel "503 first byte timeout" XHTML page** served as `image/png` (F1). The file got worse, not better. |
| 3 | **Author photo never rendered** (§3.2, lines 60-67) | **FIXED** | `public/dr-zeeshan-islam.webp` (31,112 B) + `.png` (709×585) rendered on `/`, sidebar and footer; `Physician.image` → `…/dr-zeeshan-islam.png` with `width: 709, height: 585` (`__root.tsx:171-176`); `sameAs` ×3 (`__root.tsx:178-182`). |
| 4 | **Milestones page keyword** (§3.3) | **FIXED** (observed) | Title `Premature Baby Milestones Chart by Corrected Age (2–36 Months) \| AdjustedAge`; H1 `Premature baby milestones chart, by corrected age` — "chart" present in both. |
| 5 | **GSC verification file** (§3.4, line 90) | **STILL-OPEN (owner action)** | `/google076e3cd5eda37745.html` → `200`, 54 B — the file is deployed; verification itself needs the owner's Google account. |
| 6 | **Sitemap `lastmod` from git** (§3.5 table, line 98) | **STILL-OPEN** (script exists, not automated) | `scripts/generate-sitemap.mjs` implements it, but `build` = `vite build` with no `prebuild`, and live `lastmod` is uniformly `2026-08-26` despite 08-27 content (F9). |
| 7 | **`llms.txt` alias** (§3.5 table, line 99) | **FIXED** | `/llms.txt` → `200`, byte-identical to `/llm.txt` (4,088 B, SHA-1 `dcf8bf5d0744…` both). |
| 8 | **`WebSite` schema `inLanguage`** (line 101) | **FIXED** | `__root.tsx:145` → `"inLanguage": "en"`. |
| 9 | **`WebSite` schema `potentialAction` SearchAction** (line 101) | **STILL-OPEN** | `WebSite` block (`__root.tsx:138-159`) contains `name/alternateName/url/description/inLanguage/image/publisher/author` — no `potentialAction`. |
| 10 | **Homepage `WebApplication` schema** (line 102) | **FIXED** | Live `/` JSON-LD block 4 parses as `WebApplication` + `Offer` (`size_bytes: 603`, `valid: true`). |
| 11 | **Fonts render-blocking / self-host** (line 103) | **STILL-OPEN** | Google Fonts CSS is still the 2nd render-blocking stylesheet on all 16 pages (F3). |
| 12 | **`WebSite`/`Organization` logo** (§3.1, line 56) | **REGRESSED** | `Organization.logo` still points at `favicon.png`, which is now an error page rather than a 4 KB icon (F1). |
| 13 | **New since audit: security headers** (not listed in SEO-AUDIT) | **NEW FINDING** | CSP / XCTO / Referrer-Policy / Permissions-Policy / XFO all absent; no `vercel.json` (F2). |
| 14 | **New since audit: service worker `404`** (not listed) | **NEW FINDING** | `/sw.js` → `404` while `pwa.ts` registers it (F11). |

---

## 5. Explicit checklist results

| Check | Result |
|---|---|
| robots.txt correctness | ✅ `Allow: /`, 4 targeted `Disallow`s, sitemap declared; one prefix over-block (F10) |
| sitemap.xml listed in robots.txt | ✅ `Sitemap: https://preemie.vercel.app/sitemap.xml` |
| sitemap.xml valid | ✅ `kind: "urlset"`, `valid: true`, `warnings: []`, 16 `<loc>`, well-formed XML |
| Every sitemap URL → 200 | ✅ 16 / 16 |
| Every sitemap URL → self-canonical | ✅ 0 mismatches / 16 |
| Every sitemap URL indexable | ✅ `index, follow` ×16, `noindex` absent from `src/` |
| No param / hybrid indexable variants | ✅ `?utm_*`, `?ref`, case, dot-segments, `//`, trailing slash all canonicalise (7) |
| HTTP → HTTPS | ✅ single `308` |
| www / non-www handling | ⚠️ apex-only; `www.` fails TLS with no redirect (F8) — no duplicate risk |
| 404 page behaviour | ⚠️ status `404` correct, but `index, follow` + inherited homepage title (F5) |
| Redirect chains > 1 hop | ✅ none found |

---

## 6. Top actions, in order

1. **F1** — replace `public/favicon.png` (it is a 503 error page) and repoint `Organization.logo`.
2. **F2** — add a `vercel.json` headers block (CSP, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `XFO`).
3. **F9** — `prebuild` the sitemap script so `lastmod` and route coverage stay honest.
4. **F3** — self-host Newsreader + Public Sans; drop both Google Fonts `<link>`s.
5. **F4** — lazy-load jsPDF and Recharts out of the homepage-preloaded chunk.
6. **F5 / F6 / F7** — `noindex` + proper title on the 404, `308` for trailing slashes, case-normalising redirects.
