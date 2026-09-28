# Schema / Structured Data Audit — AdjustedAge (preemie.vercel.app)

**Audited:** 2026-09-28 · **Target:** https://preemie.vercel.app · **Scope:** JSON-LD on all 16 sitemap URLs
**Method:** full render + JSON-LD extraction of all 16 live URLs (`render_page.py --json --json-ld-output`), block-level parse/validation, `@id` graph resolution, markup↔visible-copy parity diff, image URL live checks, source review (`src/routes/__root.tsx` + 15 route files).
**Reference:** `~/.claude/skills/seo/references/schema-types.md` (2026-06-21) · schema.org V30.1.

---

## 1. Category score: **74 / 100**

| Dimension | Weight | Earned | Why |
|---|---:|---:|---|
| Coverage & syntax | 20 | **20** | 16/16 sitemap URLs emit JSON-LD; 82 blocks total, 82/82 parse-valid, 0 truncated, all `@context` https, all URLs absolute, all dates ISO-8601, no placeholder text |
| Property completeness | 20 | **14** | 9 page nodes missing `image` (7 `MedicalWebPage` + 2 `Article`), `/privacy` node missing `datePublished`/`lastReviewed`/`reviewedBy`, `WebSite.potentialAction` absent (no search feature) |
| Entity graph / `@id` integrity | 20 | **14** | Physician `@id` resolves on 16/16 pages (good), **but** `/about` defines it twice with conflicting fields; Organization exists only as 31 anonymous inline copies with no `@id` |
| Value validity (enums, image URLs) | 15 | **10** | `Organization.logo` → `favicon.png` is **not an image** (see F1); `"Pediatrics"` is not a `MedicalSpecialty` enum member (14 source occurrences) |
| Markup ↔ visible-content parity | 15 | **8** | Only 13/46 FAQ question strings and 5/46 answers appear verbatim on-page; 5 pages carry FAQPage with no visible Q&A section; breadcrumb labels differ in 13 places |
| YMYL medical depth | 10 | **8** | 12/16 pages carry a fully wired `MedicalWebPage` (`lastReviewed` + `reviewedBy` + `audience` + `specialty`); the 2 `Article` guide pages, `/privacy` and `/about` do not |

**Verdict:** architecture is well above average for a small YMYL tool (single physician entity graph, per-route review dates, breadcrumbs everywhere, `WebApplication` exactly on the 4 tool pages). It loses points on *validity defects that are cheap to fix*, not on missing markup.

---

## 2. Per-page schema inventory (16/16 sitemap URLs)

| # | URL | Blocks | Page-level node | FAQ Qs | Breadcrumb | Issues |
|---|---|---|---|---:|---|---|
| 1 | `/` | 6 | `MedicalWebPage` + `WebApplication` | 7 | `Home` (no visible breadcrumb) | F1, F4, F5, F6, F7, **F9** |
| 2 | `/adjusted-age-calculator` | 6 | `MedicalWebPage` + `WebApplication` | 4 | `Home / Adjusted Age Calculator` | F1, F4, F5, F6, F7, F8, **F9** |
| 3 | `/pma-calculator` | 6 | `MedicalWebPage` + `WebApplication` | 3 | `Home / PMA Calculator` | F1, F4, F5, F6, F7, F8, **F9** |
| 4 | `/preemie-weight-gain` | 6 | `MedicalWebPage` + `WebApplication` | 3 | `Home / Preemie Weight Gain` (visible: "Preemie weight gain") | F1, F4, F5, F6, F7, F8, **F9** |
| 5 | `/preemie-vaccines` | 5 | `MedicalWebPage` | 3 | `Home / Preemie Vaccines` (visible: "Preemie vaccines") | F1, F4, F5, F6, F7, F8, **F9** |
| 6 | `/late-preterm-baby` | 5 | `MedicalWebPage` | 3 | `Home / Late Preterm Baby` (visible: "Late preterm baby") | F1, F4, F5, F7, F8, **F9** |
| 7 | `/nicu-follow-up-schedule` | 5 | `MedicalWebPage` | 3 | `Home / NICU Follow-Up Schedule` | F1, F4, F5, F7, F8, **F9** |
| 8 | `/when-can-my-preemie-start-solids` | 5 | `MedicalWebPage` | 3 | `Home / When Can My Preemie Start Solids` | F1, F4, F5, F7, F8, **F9** |
| 9 | `/adjusted-age-vs-chronological-age` | 5 | `MedicalWebPage` | 3 | `Home / Adjusted Age vs Chronological Age` | F1, F4, F5, F7, F8, **F9** |
| 10 | `/premature-baby-milestones` | 5 | **`Article`** | 2 | `Home / Premature Baby Milestones` (visible: "Premature baby milestones chart") | F1, **F3**, F4, F5, F6, F7, F8, **F9**, F10 |
| 11 | `/how-to-calculate-corrected-age` | 6 | **`Article`** + **`HowTo`** | 3 (100% parity ✓) | `Home / How to Calculate Corrected Age` (visible: "How to calculate corrected age") | F1, **F3**, F4, F5, F6, F7, F8, F10, **F11** |
| 12 | `/when-to-stop-correcting` | 5 | `MedicalWebPage` | 4 | `Home / When to Stop Correcting` (visible: "When to stop correcting") | F1, F4, F5, F7, F8, **F9** |
| 13 | `/red-flags` | 4 | `MedicalWebPage` | 0 | `Home / Red Flags` (visible: "Preemie red flags") | F1, F4, F5, F6, F8 |
| 14 | `/methodology` | 5 | `MedicalWebPage` | 5 | `Home / Methodology` | F1, F4, F5, F7, **F9** |
| 15 | `/about` | 4 | **none** (2× `Physician`) | 0 | `Home / About` (visible: "About the author") | F1, **F2**, F4, F5, F8, F12 |
| 16 | `/privacy` | 4 | `MedicalWebPage` ⚠ | 0 | `Home / Privacy` | F1, F4, F5, F6, **F13** |

**Scope note (which findings are sitewide):** **F1, F4, F5** are listed on **all 16 rows** because their causes are in `__root.tsx`, which renders on every page (favicon logo, `medicalSpecialty: "Pediatrics"`, the anonymous `WebSite.publisher` Organization) — F4's *route-level* `specialty:` only exists on the 12 `MedicalWebPage` content/tool routes, but the root `medicalSpecialty` hits all 16 (14 source occurrences in total). **F2** appears only on row 15: the second `Physician` definition exists solely in `about.tsx`, so the two-node collision is a `/about`-only event. **F7** is on the **13 pages** whose schema dates read `2026-08-27` — excluded: `/red-flags` (08-26), `/privacy` (08-26), `/about` (no dates). **F6** appears only on the 7 `MedicalWebPage` + 2 `Article` nodes lacking `image`.

**Sitewide blocks (from `__root.tsx`):** `WebSite` (16/16) + `Physician` (16/16, `@id …/about#drzeeshan`).
**Totals:** 82 blocks · 46 FAQ questions across 13 pages · 16 `BreadcrumbList` · 4 `WebApplication` (exactly the 4 tool routes) · 2 `Article` · 1 `HowTo` · 0 unparseable.

**Cross-checks that pass:** every `MedicalWebPage.url`/`Article.url`/`WebApplication.url` equals the page's self-canonical · every `@id` reference resolves (`author`, `reviewedBy`, `copyrightHolder`, `creator`, `reviewer` → `about#drzeeshan`) · `Physician.image` claims 709×585 and the live PNG **is** 709×585 · all 11 `/og/*.png` URLs return 200 with real 1200×630 PNGs · breadcrumb structure matches the visible 2-level nav on 15/15 pages that show one · no `aggregateRating`/`Review` was fabricated · `WebApplication.applicationCategory: "HealthApplication"` and `offers price 0` are correct.

---

## 3. Validation findings

### F1 — 🔴 HIGH · `Organization.logo` points at a file that is not an image (16/16 pages)

`https://preemie.vercel.app/favicon.png` returns **HTTP 200, `Content-Type: image/png`, 447 bytes — but the body is an XHTML "503 first byte timeout" error page from a Varnish cache**, not a PNG. Confirmed live twice; SHA-256 is byte-identical to the file committed in `public/favicon.png` (`c676cab0…`), so the error page was saved into the repo and deployed. Every Google logo/organization validation against this URL fails, and `<link rel="icon">` sitewide is broken too.

- Used as `Organization.logo` in: `__root.tsx:152` (WebSite publisher) and the route publishers at `index.tsx:82`, `adjusted-age-calculator.tsx:80`, `pma-calculator.tsx:74`, `preemie-weight-gain.tsx:74`, `preemie-vaccines.tsx:75`, `late-preterm-baby.tsx:76`, `nicu-follow-up-schedule.tsx:105`, `when-can-my-preemie-start-solids.tsx:81`, `adjusted-age-vs-chronological-age.tsx:109`, `premature-baby-milestones.tsx:74`, `how-to-calculate-corrected-age.tsx:74`, `when-to-stop-correcting.tsx:114`, `red-flags.tsx:78`, `methodology.tsx:81`, plus `__root.tsx:131` (`rel="icon"`).
- **Fix:** regenerate `public/favicon.png` as a real PNG (first 8 bytes must be `89 50 4E 47 0D 0A 1A 0A`) and point `Organization.logo` at a proper logo asset — `public/icons/icon-192.png` already exists (verified 192×192, 32 KB, HTTP 200).

### F2 — 🟠 HIGH · Duplicate, conflicting `Physician` node on `/about` (same `@id`, different data)

`about.tsx:47–108` emits a second `Physician` with `@id: …/about#drzeeshan` — the same `@id` already defined by `__root.tsx:161–191` on every page. On `/about` both nodes render, so the graph contains **two full definitions of one entity**: different `description` (and the route copy adds `knowsAbout`, `hasCredential`, `identifier`, `worksFor`, `honorificPrefix` that the root copy lacks). JSON-LD merging makes scalar conflicts order-dependent/ambiguous.

**Fix (pick one):** fold the richer property set into the single `__root.tsx` node and delete the duplicate block in `about.tsx` (recommended — one definition, present everywhere), or emit the rich node only on `/about` and reduce the root node to a reference.

### F3 — 🟡 MEDIUM · Two guide pages use `Article` only — no medical/YMYL review wiring

`premature-baby-milestones.tsx:54–78` and `how-to-calculate-corrected-age.tsx:54–78` emit `Article` with `author` + `publisher` but **no `lastReviewed`, no `reviewedBy`, no `audience`, no `specialty`** — even though both pages carry a visible "Reviewed by Dr. Zeeshan Islam" line. This also violates the repo's own rule in `SEO-AUDIT.md` §4.2 ("every new page: `Article` **+** `MedicalWebPage` schema + `reviewedBy`"). `Article` also has no `image`.

### F4 — 🟡 MEDIUM · `specialty` / `medicalSpecialty` = `"Pediatrics"` is not a valid `MedicalSpecialty` member

schema.org's `MedicalSpecialty` enumeration member is **`Pediatric`** (verified on schema.org V30.1); `"Pediatrics"` is used as a schema value in **14 places in source** (and therefore renders on all 16 pages) — `__root.tsx:169` (`medicalSpecialty`, sitewide), `about.tsx:58` (`medicalSpecialty`), and `specialty:` in 12 route files (`index.tsx:88`, `pma-calculator.tsx:76`, `red-flags.tsx:81`, …). Enumerated properties should carry enum values (or the full URL `https://schema.org/Pediatric`). (The free-text `"Pediatrics"` inside `Physician.knowsAbout` at `about.tsx:80` is fine — that property takes plain text.)

### F5 — 🟡 MEDIUM · Organization exists only as anonymous inline copies

Each page emits inline `Organization` nodes with no `@id` at all — **31 nodes sitewide** (16 × `WebSite.publisher` + 14 route-level page `publisher`s — `/about` and `/privacy` emit no page publisher — plus `Physician.worksFor` on `/about`), all `@type`-only, `logo` = broken favicon (F1). They can never be referenced, merged or enriched (no `sameAs`, no `url` beyond the homepage). `MedicalWebPage.copyrightHolder` also points at the *physician* rather than the publisher, which is unusual for a site whose copy says the physician is the "sole editorial authority" but the publisher is the brand.

### F6 — 🟡 MEDIUM · `image` missing from 9 page nodes (7 `MedicalWebPage` + 2 `Article`)

`MedicalWebPage.image` missing on `/`, `/adjusted-age-calculator`, `/pma-calculator`, `/preemie-weight-gain`, `/preemie-vaccines`, `/red-flags`, `/privacy`; `Article.image` missing on `/premature-baby-milestones` and `/how-to-calculate-corrected-age` (see also F10). The OG card already exists for every one of them (`og-home`, `og-red-flags`, `og-milestones`, `og-guides`, `og-vaccines`, … all verified 200 / 1200×630) and is already in the `<meta og:image>` tags — the schema just doesn't reference it. Inconsistency between `og:image` and `image` is an easily closed gap.

### F7 — 🟢 LOW · Schema dates drift from sitemap `lastmod` (13 pages)

- `dateModified`/`lastReviewed` = **2026-08-27** on 13 pages (11 `MedicalWebPage` + the 2 `Article` guides) while `public/sitemap.xml` `lastmod` = **2026-08-26** for all 16 URLs — crawlers see two "current" dates. (`/red-flags` and `/privacy` already read 08-26 and match; `/about` carries no dates.) Sitemap is regenerated from git; schema dates are hand-set in routes.

### F8 — 🟢 LOW · Breadcrumb `name` differs from the visible label on 13/16 pages

Case-only differences on 10 pages (e.g. schema `PMA Calculator` vs visible `PMA calculator`, `When to Stop Correcting` vs `When to stop correcting`); **wording** differences on 3: `/premature-baby-milestones` ("Premature Baby Milestones" vs "Premature baby milestones chart"), `/red-flags` ("Red Flags" vs "Preemie red flags"), `/about` ("About" vs "About the author"). Only `/methodology` and `/privacy` match exactly; `/` shows no visible breadcrumb but still emits a 1-item list (harmless). Google's breadcrumb guidance is that names should reflect the visible text.

### F9 — 🔵 INFO · FAQPage markup does not match the visible copy (46 questions, 13 verbatim)

Per audit rules this is flagged **Info only**: Google retired FAQ rich results for all sites (2026-05-07), so there is **no SERP feature to win or lose**, and this is **not** a recommendation to remove FAQPage or to add more of it. It is recorded purely as markup↔content integrity (Google's structured-data policy requires marked-up content to be visible and represented honestly; extractors otherwise see two different texts):

| Parity state | Pages |
|---|---|
| Question **and** answer verbatim on page | `/how-to-calculate-corrected-age` (3/3 Q, 3/3 A) — the model to copy |
| Visible Q&A section exists, wording paraphrased in schema | `/` (4/7 Q, 2/7 A exact), `/adjusted-age-calculator` (3/4 Q, 0/4 A), `/adjusted-age-vs-chronological-age` (2/3 Q, 0/3 A), `/pma-calculator` (1/3 Q), `/when-can-my-preemie-start-solids` (0/3 — entirely different question set), `/nicu-follow-up-schedule` (0/3 — different set), `/preemie-vaccines` (0/3 — different set) |
| **FAQPage present but no visible Q&A section at all** | `/preemie-weight-gain` (3 Q), `/late-preterm-baby` (3 Q), `/premature-baby-milestones` (2 Q), `/when-to-stop-correcting` (4 Q), `/methodology` (5 Q) — schema questions paraphrase section headings (e.g. methodology h2 "Fenton versus INTERGROWTH-21st" → schema Q "Why does the site mention both Fenton and INTERGROWTH-21st?") |

**Fix direction (no removal, no new FAQPage):** make the JSON-LD strings byte-identical to the copy that is already on the page — or, where no Q&A is rendered, render the existing marked-up Q&A visibly in the page's "Quick answers"/section slots. Example for `/` (visible copy, `index.tsx:117–181`):

```json
{ "@type": "Question", "name": "What is PMA?",
  "acceptedAnswer": { "@type": "Answer", "text": "PMA means postmenstrual age. It is gestational age at birth plus the time since birth, and it is especially useful before the due date and in early neonatal follow-up. Use the PMA calculator when that is the number you need." } },
{ "@type": "Question", "name": "Should premature baby growth charts use corrected age?",
  "acceptedAnswer": { "@type": "Answer", "text": "In preterm follow-up, clinicians usually interpret early measurements against corrected age while also deciding which chart should be used at that stage. That is one reason the tool always shows corrected age and postmenstrual age side by side. Read the methodology for the growth-chart hand-off details." } },
{ "@type": "Question", "name": "My baby was born at 36 weeks. Do I still need corrected age?",
  "acceptedAnswer": { "@type": "Answer", "text": "Often yes, especially in the first year. For a four-month-old, even a two- to four-week difference changes which milestone row you should be reading. See the late preterm baby guide and the worked examples page." } }
```

### F10 — 🔵 INFO · `Article` nodes carry no `image` (2 pages)

Detail of F6 for the two `Article` pages: `Article.image` is a recommended property (needed for Article-rich-result eligibility and for image carving). Cards already exist: `/og/og-milestones.png`, `/og/og-guides.png`.

### F11 — 🔵 INFO · `HowTo` block on `/how-to-calculate-corrected-age` (`how-to-calculate-corrected-age.tsx:79–109`)

Google fully removed how-to rich results in **September 2023**; this block earns no SERP feature. The three steps are already rendered as visible copy, so the markup is honest — it just isn't useful. **Optional** cleanup only; do not add `HowTo` anywhere else. (Its `author` `@id` and step text are otherwise fine.)

### F12 — 🟠 HIGH · `/about` has no page-level schema node at all (pairs with F2)

`/about` emits only `WebSite`, two `Physician` copies and `BreadcrumbList` — no `WebPage`/`ProfilePage`, no dates, no `publisher`. For the page that carries all of the YMYL identity weight, that is the single biggest structural omission.

### F13 — 🟡 MEDIUM · `/privacy` is typed `MedicalWebPage`

`privacy.tsx:55–69` declares a privacy policy as `MedicalWebPage` with `name: "Privacy & Data Handling | AdjustedAge"`, no medical audience/specialty/reviewer, and only `dateModified`. A privacy policy is a `WebPage` (or `ProfilePage`-style info page). Type misuse, cheap to fix.

### Not-a-problem list (checked, passes)
No duplicate `FAQPage`/`BreadcrumbList`/`MedicalWebPage` per page · no http `@context` · no relative URLs · no placeholder text · no fabricated ratings/reviews · no `@id` dangling anywhere · `Physician` `sameAs` (3 URLs) all present · `Offer price "0"/priceCurrency "USD"` valid · no `MedicalCondition`/`Drug`/`ClinicalTrial` claims that would need substantiation.

---

## 4. Missing opportunities (ready-to-use JSON-LD)

### O1 — Canonical `Organization` + `WebSite` with `@id` (fixes F1 + F5) — emit once in `__root.tsx`

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://preemie.vercel.app/#organization",
  "name": "AdjustedAge",
  "alternateName": "Adjusted Age Calculator",
  "url": "https://preemie.vercel.app/",
  "logo": { "@type": "ImageObject", "url": "https://preemie.vercel.app/icons/icon-192.png", "width": 192, "height": 192 },
  "image": "https://preemie.vercel.app/og/og-brand.png",
  "description": "Corrected age calculator and preterm follow-up tool for NICU graduates, reviewed by a consultant paediatrician.",
  "founder": { "@id": "https://preemie.vercel.app/about#drzeeshan" }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://preemie.vercel.app/#website",
  "name": "AdjustedAge",
  "alternateName": "Adjusted Age Calculator",
  "url": "https://preemie.vercel.app",
  "inLanguage": "en",
  "image": "https://preemie.vercel.app/og/og-brand.png",
  "publisher": { "@id": "https://preemie.vercel.app/#organization" },
  "author": { "@id": "https://preemie.vercel.app/about#drzeeshan" }
}
```

Then replace **every** inline publisher with a reference (the 14 route files that emit a `publisher` — `/about` and `/privacy` currently emit none — plus `__root.tsx`):

```json
"publisher":        { "@id": "https://preemie.vercel.app/#organization" },
"copyrightHolder":  { "@id": "https://preemie.vercel.app/#organization" }
```

*(Add `sameAs` to the Organization only with URLs you actually control — e.g. a verified `https://x.com/AdjustedAge` if the handle exists; the `twitter:site` meta alone is not proof.)*

### O2 — `ProfilePage` on `/about` (fixes F12, pairs with F2 dedupe)

```json
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://preemie.vercel.app/about#page",
  "name": "About Dr. Zeeshan Islam | AdjustedAge",
  "url": "https://preemie.vercel.app/about",
  "datePublished": "2026-08-11",
  "dateModified": "2026-08-27",
  "inLanguage": "en",
  "mainEntity": { "@id": "https://preemie.vercel.app/about#drzeeshan" },
  "publisher": { "@id": "https://preemie.vercel.app/#organization" },
  "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://preemie.vercel.app/" },
    { "@type": "ListItem", "position": 2, "name": "About the author", "item": "https://preemie.vercel.app/about" }
  ]}
}
```

Keep **one** `Physician` definition (see F2). The richer `about.tsx` version is the one to keep — its `hasCredential`, `knowsAbout` and `identifier` are exactly the E-E-A-T properties worth having sitewide.

### O3 — `MedicalWebPage` alongside `Article` on the two guides (fixes F3, F6, F10)

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "@id": "https://preemie.vercel.app/premature-baby-milestones#medicalwebpage",
  "name": "Premature Baby Milestones Chart by Corrected Age",
  "url": "https://preemie.vercel.app/premature-baby-milestones",
  "datePublished": "2026-08-11",
  "dateModified": "2026-08-27",
  "lastReviewed": "2026-08-27",
  "specialty": "Pediatric",
  "image": "https://preemie.vercel.app/og/og-milestones.png",
  "audience": { "@type": "MedicalAudience", "audienceType": "Parents of preterm infants" },
  "author": { "@id": "https://preemie.vercel.app/about#drzeeshan" },
  "reviewedBy": { "@id": "https://preemie.vercel.app/about#drzeeshan" },
  "publisher": { "@id": "https://preemie.vercel.app/#organization" }
}
```

and add to the existing `Article` node:

```json
"image": "https://preemie.vercel.app/og/og-milestones.png",
"reviewedBy": { "@id": "https://preemie.vercel.app/about#drzeeshan" }
```

(Same pattern for `/how-to-calculate-corrected-age` with `og-guides.png`.)

### O4 — Fill `MedicalWebPage.image` on the 7 pages missing it (fixes F6)

One line each, values already in that page's `og:image` meta: `/` → `og/og-home.png`, `/adjusted-age-calculator` → `og/og-home.png`, `/pma-calculator` → `og/og-pma.png`, `/preemie-weight-gain` → `og/og-weight-gain.png`, `/preemie-vaccines` → `og/og-vaccines.png`, `/red-flags` → `og/og-red-flags.png`, `/privacy` → `og/og-brand.png`.

### O5 — Correct `/privacy` typing (fixes F13)

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://preemie.vercel.app/privacy#webpage",
  "name": "Privacy & Data Handling | AdjustedAge",
  "url": "https://preemie.vercel.app/privacy",
  "datePublished": "2026-08-11",
  "dateModified": "2026-08-26",
  "inLanguage": "en",
  "isPartOf": { "@id": "https://preemie.vercel.app/#website" },
  "publisher": { "@id": "https://preemie.vercel.app/#organization" }
}
```

### O6 — `WebSite.potentialAction` — conditional only

The site has **no search feature** (no `<input type=search>`, no results route found), so a `SearchAction` would mark up a function that doesn't exist — don't add it. If/when search ships:

```json
"potentialAction": {
  "@type": "SearchAction",
  "target": { "@type": "EntryPoint", "urlTemplate": "https://preemie.vercel.app/search?q={search_term_string}" },
  "query-input": "required name=search_term_string"
}
```
Note (per reference): this is machine-readable completeness only — Google removed the sitelinks search-box rich result, so there is no SERP benefit to chase.

### O7 — Minor entity/perf polish (optional)

- `Physician.image` → `https://preemie.vercel.app/dr-zeeshan-islam.webp` (31 KB vs 499 KB for the PNG; same 709×585 source), keeping `width`/`height`.
- Tool pages: add `"featureList"` / `"browserRequirements": "Requires a modern browser; works offline"` to the 4 `WebApplication` nodes — accurate for a PWA, and it differentiates the entity from competitor calculators.
- Breadcrumb `name` values → match visible labels exactly (F8).
- Regenerate sitemap `lastmod` to match schema `dateModified` (F7).

### Deliberately **not** recommended

| Type | Why not |
|---|---|
| `HowTo` | Google removed how-to rich results (Sept 2023). Existing single block = optional cleanup only; never add new ones. |
| `FAQPage` (new) | Rich results retired for all sites (2026-05-07); no Google SERP benefit. Existing blocks: Info priority, **not** recommended for removal either — fix parity (F9) instead. No claim is made about any AI/LLM citation benefit. |
| `QAPage` | Reserved for genuine user-submitted Q&A. This site has zero user-generated questions/answers, so it would be inaccurate. |
| `MedicalCondition` / `MedicalSign` / `MedicalSymptom` | The pages are about *age arithmetic and follow-up timing*, not a diagnosis; no condition-specific symptom/treatment content exists to mark up. Adding it would be unverifiable markup on a YMYL site. `red-flags` already reads as `MedicalWebPage` + CDC-informed prose, which is the right level. |
| `AggregateRating` / `Review` | No ratings data exists; fabricating it would violate Google's structured-data policy and the site's own guardrails. |
| `Speakable`, `VideoObject`, `Event`, `JobPosting` | No voice-search targets, videos, events or jobs on the site. |

---

## 5. `SEO-AUDIT.md` (2026-08-26) schema items — status

| Ref | Schema item from the audit | Status |
|---|---|---|
| §2.3 | "Structured data hierarchy — `MedicalWebPage` + `lastReviewed`/`reviewedBy`/`MedicalAudience`/`specialty`, `Physician`+`Person` on `/about`, `Article`+`BreadcrumbList` on guides, `FAQPage`, sitewide `WebSite`/`Organization`/`Physician`, author linked by `@id` everywhere" | ✅ **FIXED/HELD** — verified on all 16 live URLs, `@id` graph resolves 16/16. ⚠️ Two caveats now: the `Article` guides lack the `reviewedBy`/`lastReviewed` half of the claim (F3), and `/about` emits no page-level node (F12). |
| §3.1 | "`Organization.logo` and `Physician.image` in JSON-LD also point at the favicon — point them at the real logo/photo" | 🔴 **REGRESSED + STILL-OPEN** — `Physician.image` ✅ fixed (real 709×585 headshot). `Organization.logo` ❌ still the favicon, and `public/favicon.png` is now a **447-byte HTML 503 error page** deployed sitewide (F1). Highest-priority item in this audit. |
| §3.1 | OG/social cards + `og:image:width/height` + `twitter:image:alt` | ✅ **FIXED** — all 11 `/og/*.png` live, 1200×630, wired in meta. (Schema `image` not yet mirroring them: F6.) |
| §3.2 | Author photo rendered + `Physician.image` → real photo + `sameAs` array | ✅ **FIXED** — `dr-zeeshan-islam.png` (200, 709×585) in `Physician.image`, `sameAs` ×3 (identity card ×2 + LinkedIn), `identifier`/`hasCredential`/`knowsAbout` on `/about`. |
| §3.3 | "Article schema headline updated" for the milestones chart keyword | ✅ **FIXED** — `headline: "Premature Baby Milestones Chart by Corrected Age"`. |
| §3.5 | FAQ rich results row ("keep Q&A content, don't optimize FAQPage") | ℹ️ **INFO (superseded)** — FAQ rich results were retired for *all* sites on 2026-05-07 (the audit's Aug-2023 gov/health framing is out of date). Same conclusion, stronger basis: don't optimize FAQPage for SERP; don't remove it; don't claim AI-citation benefit. New related finding: text parity (F9). |
| §3.5 | `WebSite` schema: add `potentialAction` SearchAction + `inLanguage: "en"` | ⚠️ **PARTIALLY FIXED** — `inLanguage: "en"` ✅ present. SearchAction ⏳ still absent — and correctly so: there is no search feature on the site (O6). |
| §3.5 | "Homepage `WebApplication` schema with `applicationCategory: HealthApplication`" (match competitors) | ✅ **FIXED** — present on all 4 tool routes (`/`, `/adjusted-age-calculator`, `/pma-calculator`, `/preemie-weight-gain`) with `applicationCategory: "HealthApplication"`, `offers price 0`, `creator`/`reviewer` → physician. |
| §4.2 rule | "Every new page: `Article` + `MedicalWebPage` schema + `reviewedBy` the physician" | 🔴 **STILL-OPEN** — `/premature-baby-milestones` and `/how-to-calculate-corrected-age` ship `Article` only (F3); `/about` ships no page node (F12); `/privacy` has no `reviewedBy` (F13). |
| Progress log 2026-08-27 | "…each with canonicals, OG/Twitter images, FAQ schema, breadcrumbs and physician review wiring" | ✅ **FIXED (verified)** for `/late-preterm-baby`, `/nicu-follow-up-schedule`, `/when-can-my-preemie-start-solids`, `/adjusted-age-vs-chronological-age` — all four have `MedicalWebPage` with `lastReviewed`+`reviewedBy`, `FAQPage`, `BreadcrumbList`, matching canonicals. ⚠️ their FAQ text does not match the visible copy (F9). |
| — (new, not in audit) | Enum-correct `specialty`/`medicalSpecialty`, single `Organization` `@id`, `/about` `ProfilePage`, FAQ parity, breadcrumb label parity, sitemap-vs-schema dates | 🆕 **NEW findings** F4, F5, F8, F12, F7 — not covered by the 2026-08-26 audit. |

---

## 6. Fix order (schema-only, ~2–3 hours)

1. **F1** regenerate `public/favicon.png` + point `Organization.logo` at `icons/icon-192.png` (15 source files: `__root.tsx` + the 14 route publishers) — blocks logo validation everywhere today.
2. **F2/F12** one `Physician` definition + `ProfilePage` on `/about`.
3. **O1** single `@id`-keyed `Organization` + `WebSite`, replace the 30 anonymous publisher copies (31 Organization nodes total).
4. **F4** `"Pediatrics"` → `"Pediatric"` (14 source spots).
5. **F3/O3** `MedicalWebPage` + `Article.image` on the 2 guides.
6. **F13** `/privacy` → `WebPage`.
7. **F6/O4** `MedicalWebPage.image` on 7 pages.
8. **F9** regenerate FAQ JSON-LD strings from the visible copy (or render the marked-up Q&A visibly on the 5 pages that lack it) — Info priority, parity only.
9. **F8/F7** breadcrumb labels + sitemap `lastmod` alignment.
10. **F11** optional: drop the `HowTo` block.
