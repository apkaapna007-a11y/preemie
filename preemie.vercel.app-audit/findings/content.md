# Content, E-E-A-T & AI-Citation Audit — AdjustedAge (https://preemie.vercel.app)

**Audited:** 2026-09-28 · **Specialist:** seo-content · **Scope:** E-E-A-T/YMYL signals, content depth vs. thin-content thresholds, readability (Flesch), keyword coverage & intent match, duplication/cannibalization, freshness, internal linking, AI-citation readiness.
**Method:** live crawl of all **16 sitemap URLs** (`public/sitemap.xml` / live `/sitemap.xml`), SSR HTML only (what Googlebot and AI crawlers see), with per-page word counts, heading structure, outbound/inbound link graphs, JSON-LD inspection, sentence-level and TF-IDF similarity analysis, and Flesch/Flesch-Kincaid computed separately on (a) all `<main>` text and (b) `<p>` prose only. Frameworks: `references/eeat-framework.md`, `references/quality-gates.md`. Prior audit `SEO-AUDIT.md` (2026-08-26) reviewed item-by-item at the end.

---

## Category score: **70 / 100**

| Sub-dimension | Score | One-line rationale |
|---|---|---|
| E-E-A-T / YMYL signals | 82 | Named credentialed physician on every page, dated review line, editorial/funding/conflict policy, real photo, `Physician`+`sameAs` schema — but **zero outbound citations** and no direct contact channel. |
| Content depth vs. thresholds | 58 | 11 of 16 pages under the 800-word feature/guide floor; 6 pages under 600; prose-only word counts as low as 166. |
| Readability | 48 | Median prose Flesch ≈ 46; **15 of 16 pages below Flesch 60**; prose grade level 8.3–11.5 for a lay-parent audience. |
| Keyword coverage / intent match | 70 | Titles/H1s match query intent well and answer-first; growth-chart cluster still unshipped, 7 titles over 60 chars. |
| Cannibalization control | 60 | Four overlapping clusters (calculator trio, age-comparison, vaccine timing, when-to-stop); exact-duplicate text is minimal but topic overlap is real. |
| Freshness signals | 65 | Visible "Last reviewed August 2026" everywhere, but sitemap `lastmod` is identical/stale on all 16 URLs and disagrees with `dateModified`. |
| Internal linking | 84 | No orphans, keyword-anchored hub-and-spoke, every page cross-links `/red-flags`; `/privacy` only linked from the footer. |
| AI-citation readiness | 74 | `llms.txt`+`llm.txt` (16/16 pages listed), "Quick answers" definitional blocks, FAQPage on 13 pages — undercut by no external source links and almost no tables. |

---

## What works (keep — this is above average for a new YMYL site)

1. **Byline + review metadata on 16/16 pages.** `<main>` contains "Medically reviewed by Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics) · Last reviewed August 2026 · Formulas and sources" on every URL; the same string appears in a persistent header trust bar and footer with a real WebP headshot (`/dr-zeeshan-islam.webp`).
2. **JSON-LD E-E-A-T wiring is complete and cross-referenced.** `MedicalWebPage` + `Physician` (`@id` → `/about#drzeeshan`) + `MedicalAudience`/`specialty` on tool pages, `Article`+`Author` on guides, `lastReviewed: 2026-08-27`, `reviewedBy`, and `sameAs` (drzeeshanislam.blog, LinkedIn, drzeewrites.com) on all 16. `Physician.image` now points at the real 709×585 headshot, not the favicon.
3. **Editorial-policy depth most YMYL sites lack.** `/about` carries credentials (MBBS, MCPS), first-hand experience narrative, editorial policy, identity-card disclosure, funding/COI ("takes no sponsorship from infant formula manufacturers… and it will not"), and scope limits. `/methodology` publishes the full formula set, a 4-column **Sources table** (AAP/HealthyChildren; Zubler 2022 *Pediatrics* 149(3):e2021052138; Fenton 2013 PMID 23601190; INTERGROWTH-21st 2015 PMID 26475015), limitations, and a public corrections record.
4. **Safety-first content design held.** Disclaimers sitewide, `/red-flags` split into "Emergency — seek immediate care" vs "Same-week call", unconditional red-flag cross-links present on **16/16 pages** (2–6 links each), and a hard "no pass/fail, no percentile-of-development" stance stated in schema and copy.
5. **Answer-first structure is consistent.** 14/16 pages open their first substantive paragraph with the direct answer (e.g. `/preemie-vaccines`: "Usually no. Routine immunisations are generally scheduled by chronological age, not corrected age."); 8 pages carry a verbatim **"Quick answers"** block plus the homepage's "Quick answers parents usually need first", and 3 further pages open with a "The short answer" H2; FAQPage schema on 13 pages.
6. **Internal linking is genuinely good.** 6–14 unique in-content internal links per page plus a keyword-anchored footer hub; inbound link counts from `<main>`: `/` 40, `/premature-baby-milestones` 27, `/red-flags` 25, `/methodology` 26, `/late-preterm-baby` 21 — no orphan pages.
7. **`llms.txt` and `llm.txt` both live**, identical, and list **all 16 pages** with one-line intent summaries plus author/identity pointers — ahead of nearly all competitor tool sites.
8. **Low literal duplication.** Only 6 sentences of >60 characters are shared between any two pages, and the largest is 3-page tool-UI boilerplate; exact 5-gram Jaccard never exceeds 0.090.

---

## Findings

### A. E-E-A-T / YMYL

**A1 — No page cites an external source by link. Severity: High.**
Evidence: outbound link count from `<main>` = **0 on 15 of 16 URLs**; `/about` has exactly 3 (identity card, LinkedIn, drzeewrites.com). `/methodology` names journals, PMIDs and AAP guidance in its Sources table — as **plain text only** (0 `<a>` tags). A YMYL page that says "Zubler JM… Pediatrics 2022;149(3):e2021052138" gives Google, Bing and ChatGPT no resolvable entity to corroborate the claim with.
Recommendation: hyperlink every source to PubMed/DOI/AAP (PMID → `https://pubmed.ncbi.nlm.nih.gov/23601190/`), and add `citation`/`mainEntity` references to `MedicalWebPage`/`Article` JSON-LD on the guide pages. This is the single cheapest E-E-A-T upgrade left.

**A2 — No direct contact channel. Severity: Medium.**
Evidence: `/privacy` "Contact" section reads *"go to Dr. Zeeshan Islam… via the about page"*; `/about` shows no email/form; `Physician.address` is only `{"addressCountry":"PK"}` (no city, no `email`, no `contactPoint`).
Recommendation: publish a contact email or form on `/about`, add `email`/`contactPoint` to `Physician`, and mirror it in the footer. QRG trust criteria explicitly look for "how to contact the site".

**A3 — Two `Article` pages omit reviewer fields in schema. Severity: Medium.**
Evidence: `/premature-baby-milestones` and `/how-to-calculate-corrected-age` emit `Article` with `author` + `datePublished/dateModified` but **no `lastReviewed` / `reviewedBy`**, unlike the 11 `MedicalWebPage` URLs (the on-page review line *is* present). All three `/…` pages plus `/about` and `/privacy` also lack `datePublished`.
Recommendation: add `reviewedBy` (Physician `@id`) and `lastReviewed` to the Article blocks; add `datePublished` to `/about`.

**A4 — Author authority is asserted, not externally corroborated on-site. Severity: Medium.**
Evidence: `sameAs` = 3 self-owned/LinkedIn profiles; no PMCID/PubMed publication list, hospital/department page, medical-directory entry or licensure identifier anywhere on the site (`EducationalOccupationalCredential` on `/about` records the qualification name only, no issuer URL).
Recommendation: add 1–2 verifiable third-party anchors (PubMed author page, hospital bio, PMDC/PMC registration, Google Business Profile) to `sameAs` and to the `/about` "Identity card" section.

**A5 — No visible corrections/version history. Severity: Low.**
Evidence: `/methodology` promises *"the correction belongs on this page"* but shows no dated corrections log; every page shows only a month-granular "Last reviewed August 2026".
Recommendation: add a dated "Change log" (even 3 entries) to `/methodology` and expose `dateModified` visually — it strengthens both E-E-A-T and freshness.

**A6 — Disclaimer lives only in the footer. Severity: Info.**
Evidence: the medical disclaimer text exists on all 16 pages but sits outside `<main>`; `disclaimer_in_main = false` for 16/16.
Recommendation: repeat a one-line "Educational tool, not medical advice" note inside the `<main>` content block on tool and red-flag pages (AI extractors and raters often scope to the article body).

### B. Content depth / thin content

**B1 — 11 of 16 pages fall below the 800-word feature/guide floor. Severity: High.**
Evidence (words inside `<main>`, incl. UI labels and link lists):

| URL | `<main>` words | `<p>` prose words | Verdict (800-word gate) |
|---|---:|---:|---|
| `/` | 1588 | 1072 | PASS |
| `/methodology` | 1135 | 673 | PASS |
| `/premature-baby-milestones` | 1098 | 456 | PASS (structure-heavy) |
| `/adjusted-age-calculator` | 1010 | 736 | PASS |
| `/when-to-stop-correcting` | 827 | 543 | marginal PASS |
| `/pma-calculator` | 739 | 522 | **FAIL** |
| `/preemie-weight-gain` | 680 | 485 | **FAIL** |
| `/preemie-vaccines` | 636 | 428 | **FAIL** |
| `/when-can-my-preemie-start-solids` | 625 | 366 | **FAIL** |
| `/about` | 602 | 382 | **FAIL** (About gate: 400 → passes prose gate, fails feature gate) |
| `/adjusted-age-vs-chronological-age` | 597 | 357 | **FAIL** |
| `/late-preterm-baby` | 593 | 375 | **FAIL** |
| `/nicu-follow-up-schedule` | 585 | 438 | **FAIL** |
| `/how-to-calculate-corrected-age` | 559 | 340 | **FAIL** |
| `/red-flags` | 526 | **166** | **FAIL** (most extreme) |
| `/privacy` | 392 | 332 | acceptable for a policy page |

Median `<main>` word count = **630**. Measured as blog/guide content (1,500-word gate) **all 14 editorial pages fail**. `/red-flags` in particular is 166 words of prose + 26 bullets: for a query family where competitor pages run 2,000+ words it is functionally a listicle.
Recommendation: raise `/red-flags`, `/how-to-calculate-corrected-age`, `/late-preterm-baby`, `/nicu-follow-up-schedule`, `/adjusted-age-vs-chronological-age` and `/when-can-my-preemie-start-solids` to 900–1,200 words with clinician context (what the sign means, what the clinician will do, what it is *not*), keeping the answer-first opener. Do **not** pad the calculator pages' shared UI block — add unique explanatory prose instead.

**B2 — FAQ coverage is thin versus the PAA/AI question surface. Severity: Medium.**
Evidence: `FAQPage` question counts — `/` **7**, `/methodology` 5, `/adjusted-age-calculator` 4, `/when-to-stop-correcting` 4, and **3 on each** of the other 8 FAQ pages; `/red-flags`, `/about`, `/privacy` have 0. The 2026-08-26 audit asked for 8–10 on the homepage; only two of its eight suggested questions were added (growth-chart question is still answered only in a 2-sentence FAQ with no dedicated target).
Recommendation: 6–8 questions per money page, each answer ≤ 45 words (snippet-sized), and definitely add "Should I use corrected age for growth charts?" → gateway to the growth-chart page once shipped.

**B3 — The "chart" intent on `/premature-baby-milestones` is served as headings + bullets, not a chart/table. Severity: Medium.**
Evidence: 12 H2s ("2 months corrected" … "36 months corrected"), **72 `<li>`, 0 `<table>`**; "Print this chart" CTA exists (print CSS only) — no CSV/PDF artifact as the audit specified. The live SERP for "premature baby milestones chart" is dominated by real tabular/printable charts.
Recommendation: render the milestone rows as a real `<table>` (age | milestone | source) for extractability, add the CSV export (pattern already exists in `visit-pdf.ts`/CSV export) and an A4 PDF.

**B4 — Homepage is a hub, not a definition. Severity: Low.**
Evidence: the first substantive paragraph on `/` describes the tool ("Enter the date of birth and gestational age once…") rather than defining corrected age; the definition arrives ~600 words later under "Why corrected age exists". For the head query and for AI answer extraction the definitional sentence should be paragraph 1.
Recommendation: lead with "Corrected age is chronological age minus the weeks born early — it is the age you use for milestones…" then the product sentence.

### C. Readability

**C1 — 15 of 16 pages score below Flesch 60 (hard-to-read) for a lay-parent audience. Severity: High.**
Evidence (prose-only Flesch / Flesch-Kincaid grade, `<p>` text):

| Page | Flesch | FKGL |
|---|---:|---:|
| `/premature-baby-milestones` | 61.5 | 8.3 |
| `/preemie-weight-gain` | 56.6 | 9.4 |
| `/adjusted-age-calculator` | 54.1 | 9.0 |
| `/late-preterm-baby` | 53.9 | 9.3 |
| `/pma-calculator` | 52.6 | 9.6 |
| `/red-flags` | 51.6 | 9.5 |
| `/when-to-stop-correcting` | 50.6 | 10.4 |
| `/adjusted-age-vs-chronological-age` | 50.3 | 9.3 |
| `/privacy` | 46.7 | 10.3 |
| `/` | 45.2 | 10.8 |
| `/when-can-my-preemie-start-solids` | 44.8 | 11.0 |
| `/how-to-calculate-corrected-age` | 44.5 | 10.3 |
| `/about` | 42.3 | 11.5 |
| `/methodology` | 42.1 | 11.3 |
| `/preemie-vaccines` | 41.2 | 10.5 |
| `/nicu-follow-up-schedule` | 41.1 | 11.0 |

Whole-`<main>` figures are worse (`/nicu-follow-up-schedule` 38.9, `/red-flags` 29.5, `/premature-baby-milestones` 38.5) because list/table text fragments are read as long sentences.
Analysis: median prose Flesch ≈ **46.8** (≈ grade 10). Content is well-*organized* but sentence architecture is dense — heavy nominalisation ("developmental interpretation", "complementary feeding"), long subordinated clauses, and clinical vocabulary used without an inline gloss.
Recommendation: target Flesch ≥ 60 / FKGL ≤ 8 on the eight parent-facing guides; split sentences over ~22 words; gloss clinical terms on first use (PMA, z-score, term-equivalent). `/methodology` (42.1) is legitimately technical and can stay harder; `/about` at 42.3 and `/red-flags` at 51.6 are the two where difficulty costs most.

### D. Keyword coverage & intent match

**D1 — Titles over the 60-character truncation limit on 7 of 16 pages. Severity: Medium.**
Evidence: `/premature-baby-milestones` **76**, `/when-to-stop-correcting` **73**, `/late-preterm-baby` **69**, `/pma-calculator` **67**, `/when-can-my-preemie-start-solids` **67**, `/how-to-calculate-corrected-age` **65**, `/preemie-weight-gain` **63** (quality-gates max = 60). Brand suffix is also missing from `/when-to-stop-correcting` (ends "…Milestones, Growth & Vaccines") while all other 15 titles end "| AdjustedAge".
Recommendation: trim to ≤60 with the primary keyword in the first 40 chars; restore the `| AdjustedAge` suffix for CTR consistency.

**D2 — Meta descriptions over 160 characters on 8 of 16 pages. Severity: Medium.**
Evidence: `/when-to-stop-correcting` **188**, `/adjusted-age-calculator` **186**, `/nicu-follow-up-schedule` **185**, `/pma-calculator` **179**, `/` **176**, `/methodology` **174**, `/adjusted-age-vs-chronological-age` **174**, `/when-can-my-preemie-start-solids` **163**. (Gate: 120–160.)
Recommendation: rewrite to 145–158 chars, keep "Reviewed by Dr. Zeeshan Islam" as the differentiator (it currently sits at the tail that gets cut).

**D3 — Roadmap keyword gaps still unshipped. Severity: High (opportunity).**
Evidence: sitemap contains no page for `preemie growth chart` / `fenton percentile` (the audit's #1 unlock), `twins corrected age`, `nicu discharge checklist`, `preemie sleep safety`. `/methodology` explicitly states growth-chart plotting is deferred.
Recommendation: `/preemie-growth-chart` remains the largest traffic lever; twins/multiples and discharge checklist are cheap, low-competition and would extend coverage of the "corrected age" modifier space.

**D4 — Intent match is otherwise strong. Info.**
Evidence: primary query terms present in both title and H1 on 16/16 (e.g. "Postmenstrual Age (PMA) Calculator" ↔ "Postmenstrual age (PMA) calculator for preterm babies"); question-form titles match PAA-style queries on `/preemie-vaccines` ("Do Preemies Get Vaccines by Corrected Age?") and `/when-can-my-preemie-start-solids`.

### E. Cannibalization map

Measured overlap = TF-IDF cosine (unigram+bigram) over `<main>` text, plus exact-sentence sharing.

| Cluster | Pages (cosine) | Risk | Action |
|---|---|---|---|
| **C1 — Calculator trio** (identical tool UI, identical H2 "Enter the birth details once" ×3, identical input labels) | `/` ↔ `/adjusted-age-calculator` **0.643**; `/` ↔ `/pma-calculator` **0.636**; `/adjusted-age-calculator` ↔ `/pma-calculator` **0.576** | **High** — three URLs offering the same widget with the same boilerplate; Google may filter two of them for "adjusted age calculator"/"PMA calculator" | Keep all three (distinct query families) but **make the copy differ**: `/` = definition + hub (drop the third full comparison block), `/adjusted-age-calculator` = terminology/ASQ framing, `/pma-calculator` = clinician/PMA-first mode (default the widget to PMA, add a discharge-note worked example). Give each a unique intro paragraph and unique FAQ set. |
| **C2 — Age-comparison / definitions** (4 pages answer "what's the difference between X and Y") | `/` H2 "Corrected age, adjusted age and chronological age — what is the difference?" vs `/adjusted-age-calculator` H2 "Adjusted age vs corrected age vs chronological age" vs `/adjusted-age-vs-chronological-age` (whole page) vs `/pma-calculator` H2 "PMA vs corrected age vs chronological age"; cosines: `/`↔`/adjusted-age-vs-chronological-age` **0.554**, `/adjusted-age-calculator`↔`/adjusted-age-vs-chronological-age` **0.515**, `/pma-calculator`↔`/adjusted-age-vs-chronological-age` **0.489** | **High** | `/adjusted-age-vs-chronological-age` must own the comparison query. Replace the full comparison sections on `/`, `/adjusted-age-calculator` and `/pma-calculator` with a 2–3 sentence summary + keyword link. |
| **C3 — Vaccine timing** | `/preemie-vaccines` (18 vaccine mentions, H2 "The short answer") ↔ `/adjusted-age-vs-chronological-age` (9 mentions, cosine **0.521**); also covered on `/late-preterm-baby` ("What age should I use for vaccines?"), `/when-to-stop-correcting` (8), `/` FAQ, `/how-to-calculate-corrected-age` (5) | **Medium** | `/preemie-vaccines` owns "do preemies get vaccines by corrected age". Everywhere else: one sentence + link. Drop the H2 from `/late-preterm-baby`. |
| **C4 — When to stop correcting** | `/when-to-stop-correcting` (10 mentions, 4 FAQ Qs) vs `/adjusted-age-calculator` (7) vs `/` (7) vs `/late-preterm-baby` | **Medium** | `/when-to-stop-correcting` owns it; trim `/adjusted-age-calculator`'s stopping section to a paragraph + link; keep one homepage FAQ. |
| **C5 — Formula/how-to** (well handled) | `/how-to-calculate-corrected-age` ↔ `/methodology` **0.311** | **Low** | Already explicitly differentiated on-page (methodology H2 "How this page differs from the worked formula guide"). Model for the other clusters. |

No page should be deleted; the fix is **differentiation by section trimming**, not consolidation — except that C1's shared widget copy should be templated once with per-route overrides rather than three hand-copied blocks.

### F. Freshness

**F1 — Sitemap `lastmod` is identical on all 16 URLs and disagrees with schema. Severity: Medium.**
Evidence: live `/sitemap.xml` returns `lastmod = 2026-08-26` for **16/16** URLs, while `dateModified = 2026-08-27` on 15 pages (and `datePublished` ranges 2026-08-11 → 2026-08-27). A build-time script is supposed to derive `lastmod` from git; the output is a single static date, i.e. the value currently carries no per-page information and is one day out of phase with the structured data.
Recommendation: regenerate `lastmod` per route from the last commit touching that route's file and assert equality with `dateModified` in a build check.

**F2 — Review dates are month-granular and now ~1 month stale. Severity: Low.**
Evidence: 16/16 pages render "Last reviewed August 2026"; today is 2026-09-28; `/about` promises review "at least annually and immediately when a source guideline changes".
Recommendation: show exact dates ("Last reviewed 27 August 2026") and roll the display to September once re-reviewed; exact dates read as fresher and match `lastReviewed`.

### G. Internal linking

**G1 — `/privacy` has zero in-content inbound links. Severity: Low.**
Evidence: inbound from `<main>` across all 16 pages = 0 for `/privacy` (it is linked only from the shared footer, which is outside `<main>`); every other page has 6–40.
Recommendation: link it from `/about` ("Funding… no tracking") and `/methodology` (editorial/data policy).

**G2 — Anchor-text repetition is heavy but on-brand. Info.**
Evidence: sitewide shared headings/anchors — "premature baby milestones chart" appears as a link heading on 15 pages, "corrected age calculator" on 14, "preemie red flags" on 12. This is deliberate hub architecture and matches the target queries; because the surrounding copy differs per page it does not read as boilerplate spam. No change needed beyond varying a few anchors.

### H. AI-citation readiness

**H1 — Strong baseline.** `llms.txt` (and `llm.txt`) list all 16 pages with intent summaries and author/identity pointers; definitional "Quick answers" blocks; answer-first openers; FAQPage on 13 pages; clean SSR with all content in the initial HTML (no JS dependency).
**H2 — Two gaps prevent top-tier citability. Severity: Medium.**
Evidence: (a) **0 outbound source links** (see A1) — answer engines that cite with references cannot anchor to this site's evidence; (b) only **3 `<table>` elements sitewide** (`/methodology`, `/when-to-stop-correcting`, `/adjusted-age-vs-chronological-age`) — the milestone "chart", follow-up schedule and red-flag lists are all `<ul>`, which extract less cleanly than tables for AI answer surfaces.
Recommendation: tables for the milestone chart, NICU follow-up schedule (age | visit | what it checks) and red-flag tiers; add `llms.txt` "## Sources" section mirroring `/methodology`.
**H3 — `llms.txt` is slightly out of date vs. the page. Severity: Info.** Descriptions still describe `/red-flags` as "CDC 'Act Early' concerns" while the live page has been restructured into Emergency / Same-week tiers; refresh wording on every content ship.

---

## Per-page measurement appendix (live crawl, 2026-09-28)

| URL | Status | `<main>` words | H1 | H2 | Unique internal links (in `<main>`) | Outbound links | FAQ Q | Visible review line | Disclaimer | Flesch (main) |
|---|---|---:|---|---:|---:|---:|---:|---|---|---:|
| `/` | 200 | 1588 | 1 | 15 | 14 | 0 | 7 | Aug 2026 | footer | 46.9 |
| `/adjusted-age-calculator` | 200 | 1010 | 1 | 10 | 10 | 0 | 4 | Aug 2026 | footer | 55.1 |
| `/pma-calculator` | 200 | 739 | 1 | 8 | 11 | 0 | 3 | Aug 2026 | footer | 51.9 |
| `/preemie-weight-gain` | 200 | 680 | 1 | 8 | 9 | 0 | 3 | Aug 2026 | footer | 53.3 |
| `/preemie-vaccines` | 200 | 636 | 1 | 8 | 11 | 0 | 3 | Aug 2026 | footer | 40.4 |
| `/late-preterm-baby` | 200 | 593 | 1 | 8 | 10 | 0 | 3 | Aug 2026 | footer | 50.2 |
| `/nicu-follow-up-schedule` | 200 | 585 | 1 | 7 | 9 | 0 | 3 | Aug 2026 | footer | 38.9 |
| `/when-can-my-preemie-start-solids` | 200 | 625 | 1 | 9 | 8 | 0 | 3 | Aug 2026 | footer | 45.2 |
| `/adjusted-age-vs-chronological-age` | 200 | 597 | 1 | 7 | 8 | 0 | 3 | Aug 2026 | footer | 45.3 |
| `/premature-baby-milestones` | 200 | 1098 | 1 | 12 | 10 | 0 | 2 | Aug 2026 | footer | 38.5 |
| `/how-to-calculate-corrected-age` | 200 | 559 | 1 | 5 | 10 | 0 | 3 | Aug 2026 | footer | 42.3 |
| `/when-to-stop-correcting` | 200 | 827 | 1 | 8 | 9 | 0 | 4 | Aug 2026 | footer | 44.0 |
| `/red-flags` | 200 | 526 | 1 | 6 | 7 | 0 | 0 | Aug 2026 | footer | 29.5 |
| `/methodology` | 200 | 1135 | 1 | 11 | 9 | 0 | 5 | Aug 2026 | footer | 41.6 |
| `/about` | 200 | 602 | 1 | 7 | 6 | 3 | 0 | Aug 2026 | footer | 39.7 |
| `/privacy` | 200 | 392 | 1 | 6 | 6 | 0 | 0 | Aug 2026 | footer | 41.9 |

All 16: 1 unique H1, images all have alt text (0 missing), canonical self-referencing, `Physician`/`Person` author wiring, red-flag cross-link present.

---

## `SEO-AUDIT.md` (2026-08-26) — content-item status

| # | Item (section) | Status | Evidence |
|---|---|---|---|
| 1 | §3.1 Social/share layer: branded OG cards, width/height, `twitter:image:alt` | **FIXED** | `og/og-milestones.png` etc. with `og:image:width=1200`, `og:image:height=630`, `twitter:image:alt` present on `/premature-baby-milestones`; 13 cards in `public/og/`. |
| 2 | §3.2 Author photo rendered, `Physician.image` real URL | **FIXED** | `<img src="/dr-zeeshan-islam.webp">` in header review card, sidebar, footer; schema `image.url = /dr-zeeshan-islam.png`, 709×585. |
| 3 | §3.2 `sameAs` identity graph | **FIXED (on-site) / STILL-OPEN (off-site)** | `sameAs` = drzeeshanislam.blog, LinkedIn, drzeewrites.com sitewide; no medical-directory/hospital/GBP profiles yet (A4). |
| 4 | §3.3 Milestones keyword fix ("chart" in title/H1/description, print CTA) | **FIXED** | Title 76 ch contains "Chart by Corrected Age (2–36 Months)"; H1 "Premature baby milestones chart, by corrected age"; "Print this chart" CTA live. |
| 5 | §3.3 Milestones CSV export + one-page A4 PDF | **STILL-OPEN** | Only print CSS exists; no CSV/PDF artifact (B3). |
| 6 | §3.3 Milestone rows deep-link into the tool with query-string prefill | **STILL-OPEN** | No `/?ga=…&dob=…` prefill links found on the milestone rows. |
| 7 | §3.4 GSC + Bing WMT verification | **STILL-OPEN** | `public/google076e3cd5eda37745.html` present; requires owner account (per progress log). |
| 8 | §3.5 Sitemap `lastmod` from git, auto-add routes | **REGRESSED** | All 16 `lastmod` = 2026-08-26, `dateModified` = 2026-08-27 → static and out of phase (F1). |
| 9 | §3.5 `llms.txt` alias alongside `llm.txt` | **FIXED** | Both live, identical, 16/16 pages listed. |
| 10 | §3.5 `WebApplication` schema on `/` | **FIXED** | `WebApplication` present in homepage JSON-LD. |
| 11 | §3.5 Google Fonts self-hosting (CWV) | **STILL-OPEN** | No `@fontsource`/self-hosted font in `package.json` (out of content scope, noted). |
| 12 | §4.1 Growth-chart page (`/preemie-growth-chart`) | **STILL-OPEN** | Not in sitemap; `/methodology` states plotting is deliberately deferred (D3). |
| 13 | §4.2 Long-tail cluster (`/adjusted-age-calculator`, `/pma-calculator`, `/preemie-weight-gain`, `/preemie-vaccines`, `/when-can-my-preemie-start-solids`, `/late-preterm-baby`) | **FIXED** | All six live with canonicals, OG, FAQ schema, physician review. |
| 14 | §4.2 `/preemie-sleep-safety`, `/nicu-discharge-checklist`, `/twins-and-multiples` | **STILL-OPEN** | Absent from sitemap (`/nicu-follow-up-schedule` partially covers #2). |
| 15 | §4.3 Homepage FAQ expansion to 8–10 questions | **STILL-OPEN (partial)** | 7 FAQPage questions live; growth-chart question and "does corrected age apply to developmental milestones" still missing as distinct entries (B2). |
| 16 | §4.4 Title CTR experiments (red flags "0–36 Months"; when-to-stop retitle) | **PARTIAL / STILL-OPEN** | `/when-to-stop-correcting` rebranded to "When to Stop Correcting Age for a Preemie | Milestones, Growth & Vaccines" (73 ch, brand dropped); `/red-flags` title unchanged — still no age range (D1). |
| 17 | §5.2.1 Physician identity graph / consistency of name+credentials | **FIXED (on-site)** | Byte-identical "Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics), consultant paediatrician" in header, footer, bylines, schema, `llms.txt`. |
| 18 | §6.1 Keep `llm.txt`/`llms.txt` updated as pages ship | **FIXED** | 16/16 pages listed; wording drift on `/red-flags` (H3). |
| 19 | Guardrail 2 — every page: `reviewedBy`, dated review line, disclaimer, red-flag cross-link | **FIXED** | 16/16 review line, 16/16 disclaimer, 16/16 red-flag links; caveat: 2 `Article` JSON-LD blocks lack `reviewedBy` (A3). |
| 20 | Guardrail 3 — no thin/programmatic pages | **AT RISK** | 11/16 pages under 800 words; three pages share a near-identical widget block (B1, C1). |

---

## Top findings

- **Score 70/100.** E-E-A-T wiring and answer-first structure are genuinely strong; depth, readability and evidence-linking are the gaps.
- **No outbound citation links on any of 16 pages** — `/methodology`'s Sources table (Fenton, INTERGROWTH, Zubler 2022) is plain text; highest-leverage YMYL fix.
- **11/16 pages under 800 words** (`/red-flags` 526 total / **166 prose**, `/how-to-calculate-corrected-age` 559, `/nicu-follow-up-schedule` 585).
- **15/16 pages below Flesch 60** (median prose ≈ 46.8, grade 9–11) for a lay-parent audience.
- **Cannibalization:** calculator trio cosine 0.58–0.64; 4 pages answer "adjusted vs corrected vs chronological"; vaccines covered on 6 pages; stop-correcting on 4.
- **Freshness:** sitemap `lastmod` = 2026-08-26 on all 16 URLs vs `dateModified` 2026-08-27; review dates month-granular.
- **Metadata:** 7 titles >60 chars, 8 descriptions >160 chars, brand suffix missing on one title.
- **Still unshipped from the roadmap:** growth-chart page, twins/multiples, discharge checklist, sleep safety, milestones CSV/PDF.
- **AI readiness:** `llms.txt` complete, but only 3 tables sitewide — milestone chart, follow-up schedule and red flags should be tabular.
