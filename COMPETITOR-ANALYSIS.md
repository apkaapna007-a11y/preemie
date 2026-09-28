# Competitor Analysis — corrected age / preemie query space

Compiled 2026-09-28 from live SERP results. **No DataForSEO/Moz credentials configured**, so domain-authority figures are qualitative (authority class), not numeric. No DA numbers are invented.

---

## Tier 1 — Authority publishers (compete on the guide queries)

### 1. HealthyChildren.org — American Academy of Pages (AAP)
- **URLs:** `/Corrected-Age-For-Preemies.aspx` (2018), `/preemie-milestones.aspx` (2024)
- **Strengths:** AAP domain; owns "corrected age for preemies" and "preemie milestones"; example-table formatting; free PDF-feel; immense link equity.
- **Weaknesses:** No calculator (static worked example only); 2018 page is visibly dated; no updated review dates; no interactive artifact; UK/US spelling drift.
- **Our counter:** ship the calculator those pages lack, answer the same questions with 2026 dates, link to AAP as the source rather than competing on authority.

### 2. Pregnancy Birth & Baby (Healthdirect, Australian Government)
- **URL:** `/babies/premature-baby/corrected-gestational-age-for-premature-babies`
- **Strengths:** government domain, plain-language formulas, "or use this online calculator" hook (links out), bilingual health-system trust.
- **Weaknesses:** AU-centric terminology (SCN, Plunket-style advice), no chart/milestone artifact, no author entity.

### 3. Raising Children Network (Australia)
- **URL:** `/newborns/premature-babies-sick-babies/development/corrected-age` (2024)
- **Strengths:** excellent plain-English Q&A, addresses school-entry and preschool edge cases nobody else covers cleanly.
- **Weaknesses:** no tool, no clinician depth, no schema-heavy structure visible.

### 4. Sydney Children's Hospitals Network (NSW Health)
- **URL:** `/kids-health-hub/growth-and-development/premature-babies/corrected-age-and-milestones`
- **Strengths:** hospital domain; milestone-by-corrected-age list *by age bucket* — the exact structure our chart page should copy.
- **Weaknesses:** AU-local, no calculator, no citations to primary literature.

### 5. BabyCenter
- **URL:** `.../when-will-my-preemie-catch-up-in-height-and-weight_10304029`
- **Strengths:** commercial content machine, Fenton chart explanation, very good query coverage for growth/catch-up.
- **Weaknesses:** ad-heavy (CLS/interstitial risk), commercial intent, no clinical review by a named physician on-page.

## Tier 2 — Direct tool competitors (compete on the calculator queries)

| Competitor | What it does well | Exploitable weakness |
|---|---|---|
| **neonatal.rti.org** (NICHD Neonatal Research Network) | Institutional credibility; outputs 18/22/22.5/26.5-month adjusted-age dates — genuinely clinician-useful | Dated form UI, no mobile polish, no content cluster, no review dates, HTTP-era styling |
| **pedscalc.com** `/adjusted-age-preterm` | Closest analogue: modern, deep-links inputs, strong FAQ, clinician register | No named reviewer visible, no parent-facing content, no milestone/vaccine cross-links |
| **pemcalc.com** `correctedage.html` | Neat single-purpose page, explicit definitions | Minimal design, no authorship, no content around it |
| **starship.org.nz** | Clinical credibility (NZ pediatric hospital) | Form-only, no explanatory content, dated UI |
| **calculate.co.nz** | Long descriptive copy, twice-yearly review date, reviewer named | Reviewer is a **real-estate calculator site founder**, not a clinician — a YMYL credibility hole we can out-author |
| **enfamil.com** | Brand money, strong domain | Commercial formula brand — parents are wary; conflicts with medical neutrality |

## Tier 3 — Evidence sources (compete on AI citation, not clicks)

- **PMC** — `PMC12221983` *Preterm growth assessment: latest findings on age correction* (evidence for correction through **36 months**).
- **Nature Pediatric Research** (2024) — 656,986-child population study: standard age correction is sufficient for late/moderate preterm but **underestimates** delay in extreme/very preterm.
- **Emory School of Medicine** neonatology FAQ — "no consensus"; some clinics correct to 3 years.

**Strategic read:** the primary literature *disagrees* with the flat "until 24 months" answer most pages give. Our `/when-to-stop-correcting` page citing this evidence is the clearest **information-gain** opportunity in the whole set — it is exactly the kind of claim AI engines quote.

---

## Gap summary (what we do that nobody else does)

1. Calculator **and** clinically-reviewed guide cluster on one domain (Tier 1 has content, Tier 2 has tools — nobody has both).
2. Corrected age + chronological age + PMA shown side by side from one input set.
3. Offline, no-account, no-upload tool — quotable privacy fact.
4. Physician entity with `sameAs` on every page.

## Gaps competitors have and we don't (this week's work)

| Gap | Evidence | Owner page |
|---|---|---|
| Outbound citations to primary sources | 0 links on 15/16 pages | sitewide |
| Real milestone table + download | 0 `<table>` on site | `/premature-baby-milestones` |
| Contact + corrections channel | "contact via the about page" | `/about` |
| Numeric authority metrics | no Moz/GSC data configured | instrumentation |
| Own domain | hosted on shared `vercel.app` | decision this week |

## Keyword opportunities not yet covered

- **"corrected age for vaccines"** — covered partially on `/preemie-vaccines`; the *yes/no* answer-first format is under-used.
- **"how many weeks premature is 34/35/36 weeks"** — calculator-adjacent, high parent intent, no dedicated page (Phase 2).
- **"corrected age school entry / preschool cutoff"** — Raising Children owns it; emotionally charged parent query (Phase 2).
- **"age correction to 36 months"** — evidence-led query where our `/when-to-stop-correcting` can leapfrog dated pages (this week, via content update).
