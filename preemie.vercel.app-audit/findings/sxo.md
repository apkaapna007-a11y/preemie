# SXO Audit — AdjustedAge (https://preemie.vercel.app)

**Subagent:** `seo-sxo` (Search Experience Optimization)
**Audit date:** 2026-09-28 · **Method:** rendered fetch of all 16 sitemap URLs, `agent_ux_check.py` (Playwright a11y-tree + semantic-HTML scoring) on 4 representative pages, mobile screenshot of `/premature-baby-milestones`, DOM structure counts (tables/links/landmarks), persona walk-throughs. Raw evidence in `findings/raw/`.

---

## SXO SCORE: **79 / 100**

| Dimension | Weight | Score | Note |
|---|---|---|---|
| Intent ↔ page-type match | 25 | 20 | Every page is the right *kind* of page; the "chart" page isn't a chart |
| Answer visibility above the fold | 20 | 16 | Answer + reviewer + CTA in the first screen on guides; calculator itself is pushed below the hero on mobile |
| Scannability & information scent | 20 | 15 | Great H2/H3 ladder and "Quick answers"; homepage has 21 link-card blocks / 15 H2s — heavy |
| Navigation & internal linking | 10 | 8 | Breadcrumbs, skip link, footer index, 16 unique internal links/page (slightly over-linked) |
| Mobile usability & a11y | 15 | 13 | a11y score 94–100, 0 tap-target/CLC issues, but the primary CTA is hidden <640px |
| Intrusion / trust friction | 10 | 7 | No ads, no cookie wall, no interstitials — but visible SEO jargon in the footer |

---

## 5. Page-type ↔ search-intent match (all 16 URLs)

| URL | Likely primary intent | Page type shipped | Match | Note |
|---|---|---|---|---|
| `/` | "corrected age calculator" (**tool**) | Tool + explainer + FAQ | ✅ | Input form SSR'd with defaults (`max=today`, GA=30w), answer bullets above it |
| `/adjusted-age-calculator` | "adjusted age calculator" (**tool**) | Tool + synonym guide | ✅ | Deliberate differentiation ("Same clinical concept, different search phrase") — not a thin clone |
| `/pma-calculator` | "postmenstrual age calculator" (**tool**) | Tool + clinician explainer | ✅ | Correct clinician entry point |
| `/preemie-weight-gain` | "preemie weight gain g/day" (**tool**) | Tool + safety guide | ✅ | Includes "what parents should not do with the number" |
| `/preemie-vaccines` | "do preemies get vaccines by corrected age" (**answer**) | Answer-first guide | ✅ | H1 is literally the query; `The short answer` H2 |
| `/late-preterm-baby` | "late preterm 36 weeker" (**guide**) | Guide | ✅ | |
| `/nicu-follow-up-schedule` | "NICU follow-up schedule" (**list/schedule**) | Timetable guide (H3 per visit) | ✅ | 4/8/12/18/24/36 months as H3s — extractable as a list |
| `/when-can-my-preemie-start-solids` | "when can preemie start solids" (**answer**) | Answer-first guide | ✅ | |
| `/adjusted-age-vs-chronological-age` | "adjusted vs chronological age" (**comparison**) | Comparison guide | ✅ | "Which age should I use?" decision block |
| `/premature-baby-milestones` | "premature baby milestones **chart**" (**chart/table**) | Guide + print CTA, **0 `<table>`** | ⚠️ partial | Intent is a scannable/quotable grid; ships as H2+`<ul>` ×10 — see **S1** |
| `/how-to-calculate-corrected-age` | "how to calculate corrected age" (**how-to**) | `HowTo` + 3 worked examples | ✅ | Formula, then 28w/34+3w/25w examples — best-matched page on the site |
| `/when-to-stop-correcting` | "when to stop corrected age" (**answer**) | Opinionated guide | ✅ | `The short answer` + nuance; **title omits brand (G7 in geo.md)** |
| `/red-flags` | "preemie red flags when to call" (**safety list**) | Tiered list (Emergency / Today / Same-week) | ✅ | Correct urgency-first ordering |
| `/methodology` | "corrected age formula source" (**reference**) | Reference | ✅ | Sources listed but unlinked (geo.md G2) |
| `/about` | "who wrote this" (**E-E-A-T**) | Author bio | ✅ | Qualifications, editorial policy, COI, scope |
| `/privacy` | "does this upload my data" (**policy**) | Policy | ✅ | |

**No intent/page-type mismatches of the "blog post ranking for a tool keyword" kind.** The single mismatch is S1.

---

## 6. Personas — how well does the site serve each?

### P1 — "Priya", parent of a 29-weeker, on a phone at 2am — **9.0 / 10**
Query: *"corrected age calculator"* / *"is my baby 4 months or 3 months corrected"*.
Hits: hero states the promise in one sentence; 4 trust chips (`Free tool · No sign-up · No data upload · Works offline`) address the exact privacy anxiety; `Quick answers` block answers the next 4 questions before any scrolling; `Print this chart` and the offline PWA suit a tired, spooked user; unconditional red-flag language ("contact your paediatrician today — do not wait").
Gap: the actual inputs are below the fold on a 667px screen (**S2**), and the mobile header hides the `Open the tool` CTA.

### P2 — "Amara", NICU follow-up nurse preparing a discharge pack — **6.5 / 10**
Needs: a printable one-pager, a schedule she can hand over, and numbers she can trust.
Hits: `/nicu-follow-up-schedule` H3-per-visit structure; print CSS; visit-summary PDF + CSV export inside the tool; `Works offline` is a real clinic-room benefit; methodology page documents exact arithmetic.
Gaps: the milestones chart has no table/CSV/A4 artefact (**S1**); no "print this whole page as a handout" affordance on guides other than the chart; no clinician-oriented summary block she can copy into notes; nothing citable (no outbound sources) so she can't forward a reference.

### P3 — "Dr Okafor", GP seeing a preterm follow-up for the first time — **7.0 / 10**
Needs: the formula, the stopping rule, the exceptions, in under 60 seconds.
Hits: `/how-to-calculate-corrected-age` is exemplary — formula, three worked examples, "the mistakes that actually happen"; `/when-to-stop-correcting` handles the "24 months is a convention, not a rule" nuance; `/pma-calculator` is explicitly clinician-framed.
Gaps: no outbound references to AAP/CDC/WHO to verify against (**G2**); no `PMA`/`GA` quick-reference table; site-wide voice is parent-facing ("parents usually search these next") so a clinician must wade past parent copy.

### P4 — "Elena", health visitor / physiotherapist plotting milestones — **7.5 / 10**
Needs: a row-by-row chart keyed to corrected age, printable.
Hits: correct re-indexing to corrected age, 2–36 months, 2022 CDC/AAP provenance stated, print button above the fold, explicit "read the row that matches the corrected number" instruction.
Gaps: no grid (**S1**) — she must read 10 stacked lists instead of scanning columns; no CSV; no per-row link into the calculator with the age prefilled (the SEO-AUDIT §3.3 interaction idea, still unshipped).

### P5 — "Marcus", dad of a 36-weeker told "he's basically term" — **8.5 / 10**
Needs: validation + a concrete rule.
Hits: `/late-preterm-baby` + `/adjusted-age-vs-chronological-age` answer exactly this; homepage FAQ "Does a 36-week baby still need corrected age? — Often yes, especially in the first year"; non-judgemental tone; `Late preterm: 34–37 weeks` band defined in `llms.txt`.
Gap: none material — this is the site's best-served persona after P1.

**Weighted persona average ≈ 7.7.** The two personas the site under-serves (P2 clinician-handout, P3 clinician-verification) are precisely the ones that produce backlinks and citations.

---

## 7. UX signals that affect search

**Works:**
- **Answer visibility above the fold (guides):** mobile screenshot of `/premature-baby-milestones` shows, in one viewport: trust banner → brand + breadcrumb → eyebrow (`PRINTABLE MILESTONE CHART`) → H1 → the 3-sentence answer → reviewer card with real photo + "Last reviewed August 2026" → `Print this chart` CTA. That is a textbook answer-first above-the-fold.
- **Semantic HTML:** `agent_ux_check.py` scores — `/premature-baby-milestones` **100**, `/how-to-calculate-corrected-age` **100**, `/` **94**, `/adjusted-age-calculator` **94**. 7–18 semantic landmarks per page, 0 `div[onclick]` widgets, 0 unlabelled inputs, skip-to-content link on every page, `lang="en"`, single `<h1>` per page, no heading-level skips observed.
- **No intrusion:** 0 iframes, 0 ad slots, no cookie banner, no interstitial, no email gate. `/privacy` states "No advertising, no sponsorship". Zero CLS risk from embeds.
- **Navigation clarity:** header nav (6 links) + breadcrumbs (`Home > Premature baby milestones chart`) + footer "Popular SEO pages" index; every page links to **all 16 unique internal URLs**.
- **Mobile:** `viewport` meta present, single-column collapse, tap-sized buttons, PWA/offline fallback.

**Problems:** see findings S1–S5.

---

## Findings

### S1 — The "chart" page delivers a list, not a chart (intent ↔ artefact gap)
**Severity: High** · *Evidence:* `tables = 0` on `/premature-baby-milestones` (and `tables = 0` on `/`, `/how-to-calculate-corrected-age`, `/red-flags` too). DOM is `h2 "2 months corrected" → ul → … ×10`. Title/H1/description all promise a "chart"; the print CTA promises a fridge chart; the deliverable is 10 stacked bullet lists.
**Impact:** fails the "give me a chart I can read/print/stick on the fridge" SERP intent that the page itself targets; scannability for P4 (therapist) is poor; no table featured-snippet surface.
**Fix:** build the age band × developmental domain matrix as a real `<table>` (`<caption>`, `<th scope="row">`/`<th scope="col">`), keep the current print stylesheet, add a `Print this chart` → `window.print()` (already wired) and a CSV export from the existing `src/lib/milestones.ts` data. Optionally add per-row deep links `/?ga=29&days=…` so a reader lands on *their* row in the tool.

### S2 — On mobile, the calculator inputs sit below the hero, and the `Open the tool` CTA is hidden
**Severity: Medium** · *Evidence:* mobile screenshot of `/premature-baby-milestones` shows the entire first viewport consumed by banner + brand + breadcrumb + eyebrow + H1 + paragraph + reviewer card. On `/`, the same stack (trust banner ≈ 90px + header ≈ 64px + breadcrumb + eyebrow + 3-line H1 + intro paragraph + reviewer card + 4 trust chips + 4 pill links) precedes `Enter the birth details once`. The header CTA is `class="hidden … sm:inline-block"` → **it does not render below 640px**, so a phone user's only route to the tool is scrolling.
**Impact:** the #1 landing query is a *tool* query; delaying the input raises pogo-sticking risk on the money page.
**Fix:** on `< sm`, render the compact tool card immediately after the H1 (move trust chips + reviewer card below it), or make the `Open the tool` pill visible at all breakpoints as a sticky-header action.

### S3 — Homepage link/card bloat: 21 guide cards, 79 anchors, 15 `<h2>`s
**Severity: Medium** · *Evidence:* `/` contains **79 anchors (78 internal, 16 unique)**, **21** guide-card blocks, and **15 `<h2>`s** — including three near-duplicate link modules: `Parents usually search these next` (4 cards), `Featured follow-up guides` (4 cards), `Popular preemie follow-up guides` (12 cards), plus two footer link lists. Body copy section `Continue with the preterm follow-up guides` is a 12-link paragraph.
**Impact:** repeated internal links dilute anchor relevance and add ~3 screens of scrolling between the answer and the footer disclaimer; the module copy is also written for crawlers, not users (see S4).
**Fix:** keep one `Next questions` grid (4–6 cards) + one prose "continue with" paragraph + the footer index; delete the other two grids.

### S4 — SEO terminology is exposed in the UI
**Severity: Low** · *Evidence:* footer renders a visible heading **"Popular SEO pages"** above the 8-link grid on every page; homepage body copy reads "These supporting pages broaden the keyword coverage… make the calculator easier to trust and use" — meta-commentary about the site's own SEO, visible to patients and clinicians.
**Impact:** small but real trust cost on a YMYL page; quality raters do read page chrome.
**Fix:** relabel to `All guides` / `More preemie guides`; rewrite the intro line to describe reader benefit ("Answers to the questions parents ask next").

### S5 — Slightly over-linked pages + 2 unnamed interactive nodes
**Severity: Low** · *Evidence:* every page links to **all 16 internal URLs** (`unique_internal = 16` on `/`, `/premature-baby-milestones`, `/how-to-calculate-corrected-age`, `/red-flags`, `/methodology`); `agent_ux_check` reports `inputs_without_aria = 2` and `unnamed_interactive = 2` on `/` and `/adjusted-age-calculator` (the date inputs / GA selects), costing 6 points (94 vs 100).
**Impact:** contextual link relevance is flattened (a red-flags page linking to `/privacy` and `/methodology` equally); screen-reader users get 2 unnamed controls on the money page.
**Fix:** keep ~8–10 topically relevant in-body links per guide and let the footer carry the full index; add `aria-label="Date of birth"` / `aria-label="Gestational age at birth"` to the two controls.

### S6 — Guides lack a table of contents on 5k–9k-character pages
**Severity: Info** · *Evidence:* body text lengths — `/methodology` 8,903 chars (10 H2s), `/premature-baby-milestones` 7,994, `/` 11,613 (15 H2s), `/adjusted-age-calculator` 7,508, `/when-to-stop-correcting` 6,583. No in-page anchor list observed on any of them.
**Impact:** mild scroll-depth/engagement cost on the longest pages; also removes an easy `speakable`-style extraction target.
**Fix:** add a compact `On this page` anchor list on pages >6,000 chars (methodology, milestones, adjusted-age-calculator, home).

---

## SEO-AUDIT.md (2026-08-26) — SXO/UX-adjacent items

| # | Item | Status | Evidence |
|---|---|---|---|
| 1 | Milestones keyword + printable positioning (§3.3) | **FIXED** (title/H1/meta/CTA) | see geo.md #7 |
| 2 | Printable **artifact**: CSV + A4 PDF (§3.3) | **STILL-OPEN** | `CSV`/`jsPDF` absent from the page; **no `<table>`** (S1) |
| 3 | Milestone row → tool deep link with query-string prefill (§3.3) | **STILL-OPEN** | no `?ga=…&days=…` links found on the page |
| 4 | Homepage hero above-the-fold trust upgrade (§2/progress log) | **FIXED** | reviewer card + photo + trust chips + FAQ all above the fold (mobile screenshot) |
| 5 | Google Fonts self-hosting for LCP/CWV (§3.5) | **STILL-OPEN** | `fonts.googleapis.com/css2` still render-blocking in `<head>` |
| 6 | No-ads / privacy stance as on-page trust badge (§2.9) | **FIXED** | `Free tool · No sign-up · No data upload · Works offline` chips + `/privacy` §"No advertising, no sponsorship" |
| 7 | PWA + print stylesheet as usability moat (§2.7) | **FIXED** | `vite-plugin-pwa` with `NetworkFirst` HTML cache; `.no-print` classes on header/footer |
| 8 | Keyword-targeted internal anchors (§2.8) | **FIXED → drifting to over-linking** | 16 unique internal links on every page (S5) |
| 9 | Long-tail cluster pages shipped (§4.2) | **FIXED** | 8 of the 8 planned routes are in the sitemap except `/preemie-growth-chart`; `/when-to-stop-correcting`, `/red-flags`, `/adjusted-age-vs-chronological-age` all live |

**Nothing regressed.**

---

## Prioritised SXO fix order

1. **S1** — turn the milestones page into an actual `<table>` (+ CSV), the highest-leverage single change.
2. **S2** — put the calculator above the fold on mobile; unhide `Open the tool` <640px.
3. **S3 + S4** — collapse the three homepage link grids, rename `Popular SEO pages`.
4. **S5** — trim in-body links to the topically relevant subset, label the 2 unnamed inputs.
5. **S6** — `On this page` anchors on >6k-char guides.
