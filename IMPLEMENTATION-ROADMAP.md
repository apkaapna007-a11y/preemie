# Implementation Roadmap — 7 days

Fixed time, variable scope: the week ends on schedule; scope is what gets cut, not the date.
Every item is sequenced by **dependency** — nothing later blocks something earlier.

---

## Day 1 (Mon) — Measurement & blockers
**Nothing below can be judged without this day.**

- [ ] Verify **Google Search Console** (DNS or the existing `google076e3cd5eda37745.html` file), submit `https://preemie.vercel.app/sitemap.xml`
- [ ] Verify **Bing Webmaster Tools** (import from GSC — fastest path)
- [ ] Record baseline: indexed-page count, impressions, queries (screenshot or export)
- [ ] **Replace the broken favicon** — `public/favicon.png` is a committed Vercel 503 page served as `image/png`; add real 32×32 + 180×180 + `favicon.ico`; repoint `Organization.logo` / `WebSite.publisher.logo`
- [ ] **Wire `scripts/generate-sitemap.mjs` into `build`** so `lastmod` stops drifting
- [ ] Canonical-host decision written down (`SEO-STRATEGY.md` §1) — **decision only, no cutover this week**

*Dependency: days 2–7 all report into GSC, so verification must land first.*
*Leading indicator:* GSC shows "Discovered – not crawled" or "Indexed" for all 16 URLs by end of day.

## Day 2 (Tue) — Citation layer (highest YMYL leverage)
- [ ] Add **primary-source outbound links** across all 16 pages: CDC, AAP, WHO, Fenton, INTERGROWTH, PubMed/DOI for Fenton (PMID 23601190), Zubler 2022, the PMC 36-month age-correction paper
- [ ] Mirror them into JSON-LD as `citation` on `MedicalWebPage`/`Article`
- [ ] Unlink→link the `/methodology` Sources table
- [ ] Add **contact channel + corrections log** to `/about`

*Falsifiability:* re-crawl and grep for `href="http` outbound on each page; target ≥12/16 with ≥1 primary source.

## Day 3 (Wed) — Chart intent fix
- [ ] `/premature-baby-milestones`: render the 72 `<li>` as a **real `<table>`** (age bucket × domain, corrected-age rows like the NSW Health page)
- [ ] Add **CSV export / print stylesheet** so the artifact is downloadable
- [ ] Deep-link rows to the calculator with pre-filled state where possible

*Why today:* it is the only page where the format currently contradicts the query ("chart").

## Day 4 (Thu) — Metadata + thin-page pass (batch)
- [ ] Rewrite **7 titles >60ch**, **8 descriptions >160ch** (answer-first, not title-restating), restore `| AdjustedAge` on `/when-to-stop-correcting`
- [ ] Expand the three worst thin pages: **`/red-flags`** (166 prose words), **`/how-to-calculate-corrected-age`** (559), **`/nicu-follow-up-schedule`** (585) — source-backed depth, no filler
- [ ] Add `reviewedBy` + `lastReviewed` to the two `Article` schemas missing them

*Check:* `onpage_check.py` totals → `titles_over_60: 0`, `descs_over_160: 0`.

## Day 5 (Fri) — AI-readiness + security
- [ ] Regenerate **llms.txt / llm.txt** with `[Title](https://…)` absolute markdown links (16 URLs)
- [ ] Add `vercel.json` headers: `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `X-Frame-Options: DENY`, `Permissions-Policy`, CSP
- [ ] 404 route: own title + `meta robots noindex`
- [ ] Normalize case-variant URLs (`/About` → 308) and trailing-slash 307 → 308

## Day 6 (Sat) — Performance
- [ ] Dynamic-import **jsPDF** (print/export) and **Recharts** (charts) — currently ~398 KB gz on first load
- [ ] Self-host Google Fonts (removes render-blocking 3rd-party CSS on all 16 pages)
- [ ] Fix `fetchPriority="high"` on all three avatars (keep it on the LCP hero only)
- [ ] Re-measure lab LCP/INP; target LCP ≤2.5 s

*No field CrUX available (no API key) — record lab numbers as the baseline.*

## Day 7 (Sun) — Verify, document, decide
- [ ] Re-run `onpage_check.py` + full 16-URL crawl; confirm all fixes landed
- [ ] Inspect 3 key URLs in GSC → Request Indexing
- [ ] Refresh `SEO-AUDIT.md` change log; capture **drift baseline** so the next audit compares
- [ ] Physician sign-off on all day-2/day-4 copy (YMYL gate — cannot be skipped)
- [ ] Decide + schedule the **domain cutover** for a *future* week (prepared in `SITE-STRUCTURE.md`)

---

## Scope that gets cut if the week slips (in order)
1. JS split (day 6) — degrades INP but not rankings this week
2. Fonts self-hosting (day 6)
3. Security headers (day 5) — no ranking impact, real user-trust impact
4. Case-variant normalization (day 5) — canonicals already protect indexing

**Never cut:** GSC verification (day 1), citations (day 2), chart table (day 3), title/meta (day 4).

## Risk register

| Risk | Likelihood | Mitigation |
|---|---|---|
| Physician review slips → copy stalls | Medium | Batch all medical copy for one review session on day 4 evening |
| GSC verification blocked by DNS | Low | Fall back to HTML-file method (file already documented) |
| Indexing doesn't happen despite 200s | Medium | Authority problem, not on-page → submit via Bing, defer domain decision, do not ship more content |
| Domain cutover executed in haste | High-impact | Explicitly out of scope this week |

## KPI targets

| Metric | Baseline (day 1) | Day 7 |
|---|---|---|
| Verified properties | 0 | GSC + Bing |
| Indexed pages | measure | ≥14 / 16 |
| Pages with primary-source citations | 1 / 16 | ≥12 / 16 |
| Titles >60ch | 7 | 0 |
| Descriptions >160ch | 8 | 0 |
| Lab LCP on `/` | measure | ≤2.5 s |
| AI-citable URLs in llms.txt | 0 (syntax) | 16 |
