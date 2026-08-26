# AdjustedAge — SEO Audit & Ranking Plan

**Audited:** 2026-08-26 · **Site:** https://preemie.vercel.app · **Branch:** `arena/01a03d57-preemie`
**Scope:** on-page SEO, structured data, crawl/index state, content gap analysis, authority plan, measurement.
**Method:** full codebase review (`src/routes`, `__root.tsx`, `vite.config.ts`, `public/`), live-SERP validation of the target keywords, and competitor teardown.

---

## 1. Executive summary

The site's foundations are **unusually strong for a 2-week-old YMYL tool**: true SSR, per-page titles/descriptions/canonicals, `MedicalWebPage` + `Physician` + `FAQPage` JSON-LD, a sitemap, `robots.txt`, `llm.txt`, and a named-credentialed author wired through every page. That part is done.

What's missing is the **compounding layer** — the things that turn "crawlable and credible" into "ranked":

| Priority | Theme | Expected impact |
|---|---|---|
| **P0** | Social/share layer broken (og:image = 4 KB favicon), real author photo not rendered, keyword/title misalignment on the milestones page | CTR, trust, shares, E-E-A-T |
| **P0** | Not in Google Search Console / Bing Webmaster Tools | No feedback loop = flying blind |
| **P1** | No growth-chart content (the single biggest preemie-parent demand; competitors are all anonymous tools) | Largest traffic unlock |
| **P1** | Synonym/long-tail pages already in the roadmap are unshipped | 3–5× more keyword surface |
| **P1** | Authority: zero backlinks, subdomain-only presence | Required to break into YMYL top 10 |
| **P2** | Distribution channels untapped (MCP directory, AI/LLM, offline PDF virality) | Compounding, cheap |

Realistic expectation: on a `.vercel.app` subdomain in a YMYL vertical, expect **3–6 months** to page-1 for long-tail terms and 6–12 months for the head term, *with* the P0/P1 work below. Without GSC and backlinks, it can take forever.

---

## 2. What is already done well (keep it)

Verified in code, not assumed:

1. **SSR confirmed.** Live fetch of `/` returns fully server-rendered HTML — content, H1/H2s, FAQ text, JSON-LD all present without JS. Crawlers and AI extractors see everything.
2. **Per-route meta + canonicals.** Every route sets unique title, meta description, OG/Twitter tags, `article:published_time`/`modified_time`, and a self-referencing canonical. All canonical URLs match the sitemap.
3. **Structured data hierarchy.** `MedicalWebPage` (with `lastReviewed`, `reviewedBy`, `MedicalAudience`, `specialty`) on tool pages; `Physician` + `Person` on `/about`; `Article` + `BreadcrumbList` on guides; `FAQPage` on four pages; `WebSite` + `Organization` + `Physician` sitewide from `__root.tsx`. The author is linked by `@id` everywhere — this is exactly the E-E-A-T wiring Google wants on health content.
4. **Safety-first content design** (no pass/fail verdicts, unconditional red flags, "contact your paediatrician today") — this is both ethically right and strategically differentiating vs. anonymous calculator farms.
5. **Sitemap + robots.txt** correct, all 8 routes listed; `/mcp`, `/.mcp/`, `/.well-known/` correctly disallowed; sitemap URL referenced from robots.txt.
6. **`llm.txt`** — ahead of 99% of sites for AI-crawler discovery.
7. **PWA + offline + print stylesheet** — real utility, retention, and a unique angle for link-building ("the tool that works in the NICU waiting room with no signal").
8. **Keyword-targeted internal anchors** ("premature baby milestone chart", "red flags that need medical attention", "corrected-age formula").
9. **Privacy stance** (no cookies/tracking, localStorage-only) is a genuine differentiator worth stating *on-page as a trust badge*, not just in `/privacy`.

---

## 3. P0 — Fixes to ship first (≈1–2 days of work)

### 3.1 The social layer is broken (og:image everywhere = `favicon.png`)

Every route sets `og:image` / `twitter:image` to `https://preemie.vercel.app/favicon.png` — a **4 KB icon**. Facebook, X, WhatsApp, iMessage, Pinterest, Slack and LinkedIn either refuse it or render a blown-up blob. Parent content spreads via WhatsApp/Pinterest/IG shares; every shared link currently advertises the site as unpolished, and a YMYL site pays double for looking unpolished.

**Fix**
- Generate a branded 1200×630 hero card per page-type (tool, milestones, red-flags, methodology, about). At minimum one master card + the tool card.
- Put them in `public/og/` and update `__root.tsx` + each route's `og:image`, `twitter:image`, `og:image:alt`, `twitter:image:alt`.
- Add `og:image:width=1200`, `og:image:height=630` meta.
- Homepage route (`index.tsx`) is missing `twitter:image:alt` while the root sets it — keep them consistent per-route.
- The `Organization.logo` and `Physician.image` in JSON-LD also point at the favicon — point them at the real logo/photo instead (see 3.2).

### 3.2 The author photo is never rendered (E-E-A-T signal wasted)

`src/assets/dr-zeeshan-islam.png.asset.json` shows a real 200 KB author photo exists in the Lovable asset store — but `/about` renders initials ("ZI") instead, and `Physician.image` in JSON-LD points to the favicon. On a YMYL site, a real, named, credentialed physician photo is one of the highest-leverage trust signals Google's quality raters and real visitors look for.

**Fix**
- Download the photo, commit it to `public/` (e.g. `public/dr-zeeshan-islam.jpg`, resized ~800px, WebP/JPEG).
- Render it on `/about` (replace the `AuthorMark` placeholder), in the `ReviewLine` on content pages, and optionally as a small avatar in the header trust-bar.
- Update `Physician.image` + `Person.image` JSON-LD to the real URL (with proper dimensions).
- Add a `sameAs` array to the `Physician` schema linking verifiable third-party profiles (PMCID/PubMed publications, LinkedIn, hospital/director page, Doximity equivalent in PK, Google Business Profile) — every verifiable identity anchor strengthens the E-E-A-T graph.

### 3.3 `/premature-baby-milestones` does not target its keyword

The cluster thesis is `premature baby milestones chart` (590/mo, per the README research), but:

- Title: "Premature Baby Milestones **by Corrected Age**" — the word **chart** is absent from title, H1, and meta description.
- The page has no actual *chart* artifact — the SERP intent is "give me a chart I can read/print/stick on the fridge". The current SERP is dominated by Enfamil, Pampers, PregnancyBirthBaby and Pathways.org — all showing tables/charts. AdjustedAge's chart exists as data but not as a deliverable.

**Fix**
- Title → `Premature Baby Milestones Chart by Corrected Age (2–36 Months) | AdjustedAge` (≈73 chars, acceptable; test shorter variant without the range).
- H1 → include "chart".
- Meta description → include "chart" + "printable" + the pediatrician-review hook.
- Add **downloadable/printable artifacts**: the print stylesheet already exists — add a "Print the chart" CTA, plus a CSV export of milestone rows (pattern already exists in the visit-record export) and a one-page A4 PDF via the existing `jsPDF` setup.
- Every milestone row should link to the tool with a query-string prefill (`/?ga=31&days=4&dob=…`) so the page hands users straight into *their* row — that interaction signal (tool use from the content page) is exactly what "zero tools in SERP" monetizes into engagement.

### 3.4 Get into Google Search Console + Bing Webmaster Tools (today)

No rank-tracking tool can see what GSC sees for free: exact queries, impressions, position, and — critically — which pages Google is *trying* to rank. Right now the team is blind.

**Fix**
- Verify in GSC (the `public/google076e3cd5eda37745.html` verification file already exists — verify with it).
- Add Bing WMT + submit sitemap. Bing powers Copilot/AI-answer citations and is the fastest indexer for new sites (IndexNow ping on every deploy — one line in a deploy hook).
- **No conflict with the privacy promise:** GSC/WMT use aggregate search data, not site-side tracking. State this in `/privacy` so the stance stays consistent.

### 3.5 Small technical cleanups

| Item | Where | Fix |
|---|---|---|
| Sitemap `lastmod` | `public/sitemap.xml` | Static dates lie to crawlers; regenerate `lastmod` from git `mtime` in a tiny build script, and add any new routes automatically. |
| `llms.txt` alias | `public/` | Many AI crawlers request `/llms.txt` specifically; the file is `/llm.txt`. Ship both (identical content, cross-referenced). |
| FAQ rich results | schema | Google deprecated FAQ rich results for most sites (Aug 2023) — keep the on-page Q&A content (it wins PAA/AI citations) but don't expect rich snippets; don't spend time "optimizing" the FAQPage schema. |
| `WebSite` schema | `__root.tsx` | Add `potentialAction` SearchAction + `inLanguage: "en"`. Cheap completeness. |
| Homepage `WebApplication` schema | `index.tsx` | Competitors (growthchartcalculator.org, kidgil, asqcalculator) all emit `SoftwareApplication`/`WebApplication` with `applicationCategory: HealthApplication`. Match them so you're not *missing* a schema they have. |
| Fonts render-blocking | `__root.tsx` | Google Fonts CSS is a render-blocking third-party request on LCP-critical pages. Self-host Newsreader + Public Sans (both OFL-licensed) via `@fontsource` and preload the LCP weight. Small CWV win, real on mobile. |
| Brand name in H1 | home | H1 is "Corrected age calculator for premature babies" — good. Consider testing title `Free Corrected Age Calculator for Premature Babies — Reviewed by a Paediatrician` (credentials-in-title is a proven YMYL CTR play). A/B via GSC data. |

---

## 4. P1 — Content expansion (the ranking engine)

### 4.1 The growth-chart page is the single biggest unlock

SERP check confirms the pattern: for "preemie growth chart / fenton percentile / preemie weight percentile", the front page is **PediTools, tinylog.app, kidgil.com, growthchartcalculator.org** — competent calculators, every one of them **anonymous**, none with a named reviewing pediatrician, none with serial visit memory. AdjustedAge already *collects* weight/length/head-circumference per visit in localStorage — the data model for the killer feature exists and sits unused.

**The opportunity:** "corrected age" pages feed straight into growth-chart questions (the #2 competitor's whole page is "corrected age → which growth chart"), and growth queries have 5–10× the volume of the current cluster. This is where the moat (named physician + serial data + no upload) is hardest to copy.

**Roadblock and how to clear it:** README blocks Fenton/INTERGROWTH plotting on redistribution terms. Clear it properly:
- **Fenton 2013** LMS tables were published in the open-access BMC Pediatrics paper (CC-BY) — request written confirmation of reuse-with-attribution (the README's "in writing" discipline is correct; execute it).
- **WHO 0–24m standards** are explicitly public-domain/freely usable by WHO — build the term-corrected WHO portion first with zero licensing risk.
- **INTERGROWTH-21st** publishes standards under CC BY-NC 4.0 — the site is non-commercial (no ads, no pharma), which fits the license; confirm and cite.
- **Fenton 2025** (3rd-gen charts) just shipped — PediTools already supports it. Cite it in methodology as "under review" even if not implemented; freshness matters on a clinical topic.

**Ship as:** `/preemie-growth-chart` — input birth date + GA + serial measurements (prefilled from localStorage visits) → z-scores/percentiles on Fenton→WHO with corrected age, trend lines, and the site's signature "trend matters more than one point, here's when to call" framing. Clinically reviewed, no verdicts, same guardrails.

### 4.2 Synonym & long-tail pages (already in the repo's Phase 4 plan — pull forward)

| Route | Keyword | Why now |
|---|---|---|
| `/adjusted-age-calculator` | adjusted age calculator (1,600/mo synonym) | Distinct query family; write it as a real page (adjusted vs corrected terminology, ASQ-3/screener usage) so it's not a thin duplicate; cross-link, do **not** duplicate the calculator wholesale. |
| `/pma-calculator` | postmenstrual age calculator (clinician entry point) | Clinicians link to clinician pages. Cheap authority magnet; the arithmetic already exists in `src/lib/corrected-age.ts`. |
| `/preemie-weight-gain` | preemie weight gain / weight velocity | `src/lib/weight-velocity.ts` + `followup.ts` already compute it. Content page: "how many grams a day should my preemie gain" — high-volume, high-anxiety parent question. |
| `/preemie-vaccines` | do preemies get vaccines by corrected age | Already answered in the homepage FAQ — expand into a full guide; vaccination timing is one of the top-3 corrected-age confusions. |
| `/when-can-my-preemie-start-solids` | corrected age solids | PregnancyBirthBaby.au ranks with exactly this; a pediatrician-reviewed answer can win the snippet. |
| `/preemie-sleep-safety` / `/nicu-discharge-checklist` | discharge + safe sleep (SIDS angle) | Discharge day is the peak search moment; capture it at the decision point. |
| `/twins-and-multiples` | twins corrected age | Different correction nuances (twins correct to their own GA); low competition, parent-community virality. |
| `/late-preterm-baby` | late preterm / 36 weeker | 36-weekers are the largest preterm cohort and the most confused ("is my baby even premature?"). |

Rule: every new page answers **one** question family, links to the tool and ≥2 other pages with keyword anchors, gets `Article` + `MedicalWebPage` schema + `reviewedBy` the physician, and is added to the sitemap. No thin-programmatic pages (the README's "no `/corrected-age-at-N-months`" instinct is right).

### 4.3 FAQ expansion (wins PAA + AI citations, not rich results)

Homepage has 3 FAQs; competitors publish 5–10. The SERP data shows exactly which questions Google surfaces for this cluster — add them (on-page, not just schema):

- "Should I use corrected age for growth charts?" *(the #1 bridging question — links to 4.1)*
- "My premature baby's percentile looks low — is that normal?"
- "Does corrected age apply to developmental milestones too?"
- "Do preemie vaccines use corrected age?"
- "What is the difference between chronological age and corrected age?"
- "When should I stop using corrected age?" (→ `/when-to-stop-correcting`)
- "How do I calculate corrected age without a calculator?" (worked example → `/how-to-calculate-corrected-age`)
- "My 36-weeker — is he premature?" (→ `/late-preterm-baby`)

### 4.4 Update page titles once the cluster ships

Current titles are decent but under-optimized for CTR: "When Do You Stop Correcting for Prematurity?" → test "When to Stop Using Corrected Age (What Paediatricians Actually Do)". "Preemie Red Flags: When to Call the Doctor" → add "0–36 Months" for specificity. Track CTR changes in GSC before/after.

---

## 5. P1 — Authority & off-page (the actual ranking constraint)

A new subdomain has zero authority in a vertical where Google heavily favors established health institutions. The on-page work only converts once links exist.

### 5.1 Own-domain strategy
`preemie.vercel.app` is fine for MVP, but all authority accrues to Vercel's domain, and any migration later resets equity. Decide within 90 days: register a brand domain (e.g. `adjustedage.com`) and migrate with 301s + GSC change-of-address **once traffic proves the concept** (≥ a few hundred clicks/month). Don't migrate before that.

### 5.2 Link/authority plan, in order of cost-per-link

1. **Physician identity graph (free, do first).** Google Business Profile for the practice, LinkedIn, medical directories (PK equivalents of PMC/Doximity), academic profiles, the practice's hospital page — all linking to the site, all cross-linked from `/about#drzeeshan` via `sameAs`. Every one strengthens the E-E-A-T graph.
2. **Community seeding (free, aligned with README's validation plan).** r/NICUParents, r/preemies, r/beyondthebump, NICU Facebook groups, WhatToExpect/BabyCenter preemie boards — answer corrected-age questions *helpfully* with the tool as evidence, no spam. These communities are also where the *next* content questions come from (the README's Day-4 validation, turned into a permanent feedback loop).
3. **Physician-facing placements.** The tool's serial visit record + one-tap PDF is a clinician workflow asset — pitch pediatric CME newsletters, residency resource lists, and NICU-follow-up clinic blogs ("free tool for your discharge pack"). Clinician links are the hardest to earn and the most valuable on YMYL.
4. **HARO/Qwoted-type quoting.** The author answers journalist queries on preemie topics with credentials — earns editorial links from parenting outlets.
5. **Content partnerships.** The printable milestones chart and discharge checklist are linkable assets ("free printable preemie milestone chart"); offer them to preemie-parent bloggers and photographers' resource pages.
6. **Real press.** One genuinely newsworthy angle exists: *a named pediatrician's free, offline-capable, no-tracking NICU follow-up tool* — pitch local health desks/med-tech newsletters. One real article outweighs fifty directory links.

### 5.3 Consistency
Everywhere the physician appears (directories, profiles, bios), the name, credentials, and site URL must be byte-identical. Decide once: "Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics), consultant paediatrician" + `https://preemie.vercel.app`.

---

## 6. P2 — Distribution & measurement

### 6.1 Exploit what's already built

- **The MCP server** (`src/lib/mcp`, `/[.mcp]` routes) is a genuine differentiator: "AdjustedAge for Claude/GPT — corrected age + follow-up schedule as tools." Submit to MCP directories/registries (mcp.so, awesome-mcp lists, Lovable's own directory) — a distribution channel competitors don't have, and it generates citations in AI answers.
- **`llm.txt`/`llms.txt`** — keep both updated as pages ship; AI crawlers are a growing share of discovery for how-to health queries.
- **PDF/print virality.** The visit-summary PDF and printable chart carry the URL off-page; make sure every export includes the domain + "clinically reviewed by" footer (check `visit-pdf.ts` does).
- **YouTube/shorts later:** "how to use corrected age at your NICU follow-up" in 60s — video results are unclaimed in this SERP. Phase 3, only if the author is comfortable on camera.

### 6.2 Measurement stack (all free, none violate the privacy promise)

1. **GSC + Bing WMT** — the core loop: impressions → clicks → iterate titles/FAQs.
2. **Keyword tracker** — export the README's 20-keyword cluster + the new long-tails into a sheet; check positions weekly for 12 weeks before judging anything.
3. **Backlink tracker** — GSC's Links report + a manual sheet for the 5.2 outreach list with statuses.
4. **Keep the privacy analytics** (`src/lib/analytics.ts`, localStorage counts) — it can't answer SEO questions, and shouldn't try. Optionally add Vercel's privacy-friendly analytics if aggregate *page* views are wanted; never add GA/cookies — the no-tracking promise is an asset, not a liability.

### 6.3 Success thresholds (borrow the README's discipline)

- 30 days: ≥6 new pages live, all indexed, GSC showing impressions on ≥10 keywords.
- 90 days: page-1 for ≥5 long-tails (adjusted age calculator, preemie weight gain, PMA calculator…); growth-chart page indexed and climbing.
- 180 days: top-5 for "corrected age calculator" or top-10 for "premature baby milestones chart"; ≥1 physician-identity or editorial backlink per month average.

---

## 7. 90-day roadmap

| Weeks | Work | Owner |
|---|---|---|
| 1–2 | **P0 sweep:** OG images, author photo live + `sameAs`, milestones title/H1 + printable chart, GSC/Bing verification, `llms.txt`, sitemap `lastmod` script, font self-hosting | Dev |
| 2–4 | **Licensing clearance** (Fenton 2013 LMS, WHO, INTERGROWTH) — the written confirmations the README demands; start WHO-based chart if Fenton lags | Physician + dev |
| 3–6 | `/adjusted-age-calculator`, `/pma-calculator`, `/preemie-weight-gain` + homepage FAQ expansion (8–10 Q) | Content + review |
| 5–8 | `/preemie-growth-chart` (z-scores from existing visit data) + `/preemie-vaccines` + `/when-can-my-preemie-start-solids` | Dev + physician |
| 6–10 | Identity graph build-out (5.2.1) + community seeding + first outreach batch | Marketing/physician |
| 10–12 | `/nicu-discharge-checklist`, `/twins-and-multiples`, `/late-preterm-baby`; title CTR experiments; domain decision | Content + dev |

**Guardrails for all new work (non-negotiable, from the existing design):**
1. No pass/fail verdicts, ever — including on growth charts (percentiles are descriptions, not verdicts).
2. Every new page: `reviewedBy` the physician, dated review line, disclaimer, red-flag cross-link.
3. No thin pages, no programmatic keyword spam, no auto-generated "medical" text.
4. Keep the no-tracking/no-upload promise intact across every feature.
5. Anything touching growth interpretation goes through the physician before publish.

---

## 8. Bottom line

The site does the hard part right: credible, safe, technically clean content with a named expert. Ranking will come from three compounding moves — **fix the share layer (P0)**, **ship the growth-chart + long-tail cluster (P1)**, and **build the physician identity graph (P1)** — measured weekly in Search Console. Ship P0 this week, clear the Fenton/WHO licensing next, and the site is positioned to own the "corrected age + preemie growth" SERP as the only credentialed tool in it.
