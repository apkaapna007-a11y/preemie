# AdjustedAge — Cross-Property Authority Playbook

**Date:** 2026-08-26 · **Companion to:** `SEO-AUDIT.md` (§5.2 authority plan, made concrete)
**Properties owned by Dr. Zeeshan Islam:**

| Property | What it actually is | Age | Current links |
|---|---|---|---|
| `preemie.vercel.app` | The corrected-age tool (AdjustedAge) | ~2 weeks | → none outbound; no `sameAs` |
| `drzeewrites.com` | Medical-writing business + **real blog** ("Dr Zee") | new; 3 posts | → none to preemie |
| `drzeeshanislam.blog` | **Gravatar profile** on a custom domain (not a blog) | 4 days | → LinkedIn only |
| `linkedin.com/in/dr-zeeshan-islam-b81b0b373` | LinkedIn profile | verified by Gravatar | — |

**The single most important fact:** these four properties currently form **zero links between each other**. For Google, "Dr. Zeeshan Islam" on the tool site and "Dr. Zeeshan Islam" on the writing business are two unconnected entities. On a YMYL topic, entity resolution is the difference between "anonymous calculator site" and "a physician's tool". This playbook connects them — the cheapest authority work available, because the assets already exist.

---

## 1. What each property is good for (set expectations)

- **drzeeshanislam.blog** — an identity hub, *not* a blog. It's a Gravatar profile; external links from it are `nofollow` and it has zero authority. It cannot "rank" anything and will not pass link equity. Its real value: (a) a canonical, verified person-entity page, (b) `rel="me"` identity verification, (c) consistent avatar/name/credentials that syndicate across Gravatar's network. **Do not invest in it as a blog.** (If a personal blog is wanted later, repoint the domain — but don't run two blogs.)
- **drzeewrites.com/blog** — the actual owned media asset. It's topical to *medical writing + E-E-A-T*, an audience (SEO leads, agencies, health-tech content teams) that links and shares. Its posts are dated, author-attributed, and well-written. This is where case-study and guest-style content about the tool lives.
- **preemie.vercel.app** — the ranking target. Everything below exists to strengthen *it*.
- **LinkedIn** — the highest-trust verifiable profile in Pakistan's context; supports website links (add both domains).

---

## 2. Step 1 — Connect the entity graph (do this week, ~1 hour)

### 2.1 On drzeeshanislam.blog (Gravatar)
1. Add **verified accounts** for both `https://drzeewrites.com` and `https://preemie.vercel.app` (Gravatar supports multiple verified websites).
2. Fix the bio so the identity is **byte-identical** everywhere (audit §5.3):
   - Current: "Pediatrician | Medical & Healthcare Content Writer, DrZeeWrites"
   - Target: "**Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics)** — consultant paediatrician, medical writer (DrZeeWrites), and creator of AdjustedAge, the corrected-age tool for NICU graduates."
3. Add `preemie.vercel.app` to the profile's visible link field; keep LinkedIn verified.

### 2.2 On preemie.vercel.app (code changes)
1. **`Physician` + `Person` JSON-LD** (`src/routes/about.tsx`, `src/routes/__root.tsx`): add a `sameAs` array:
   ```json
   "sameAs": [
     "https://www.linkedin.com/in/dr-zeeshan-islam-b81b0b373",
     "https://drzeewrites.com",
     "https://drzeeshanislam.blog"
   ]
   ```
2. **`/about` visible links**: add a short "Elsewhere" block linking the three properties with plain, honest anchor text (e.g. "Dr. Islam's medical-writing practice", "LinkedIn profile", "Gravatar identity page").
3. **Disclosure sentence** in the same block (E-E-A-T protection, see §4): "Dr. Islam runs an independent medical-writing practice. AdjustedAge receives no sponsorship or advertising, and the practice has no editorial role in this tool."
4. Use the Gravatar avatar URL (`https://www.gravatar.com/avatar/50c92b77…?size=512`) as a stop-gap author image until the full-resolution photo from the asset store is committed (audit P0 §3.2), and point `Physician.image` at whichever ends up on the site.

### 2.3 On drzeewrites.com
1. Add AdjustedAge to the **portfolio** ("Featured portfolio" — it is the single best case study the business has: a shipped, live, E-E-A-T-correct YMYL tool).
2. Footer/about: link to `preemie.vercel.app` as "My clinical tool for NICU parents".
3. Contact page / LinkedIn: add both domains as websites.

### 2.4 On LinkedIn
- Add both `preemie.vercel.app` and `drzeewrites.com` as website links.
- Update the headline to include the tool: "…creator of AdjustedAge, a corrected-age calculator for NICU graduates" — with a link in the featured section. LinkedIn posts about the tool are also the fastest zero-budget traffic source (parents + clinicians are both there).

**Result:** Google can now resolve one person-entity across four properties — the foundation of E-E-A-T on a YMYL site.

---

## 3. Step 2 — The link content plan (drzeewrites.com/blog → preemie)

The blog already publishes E-E-A-T-themed pieces (its 2026-08-11 post "Why Google's E-E-A-T Is a Clinical Standard" was written the same day the tool launched — the story is already there, it's just not connected).

| # | Post on drzeewrites.com/blog | Anchor → target | Why it works |
|---|---|---|---|
| 1 | **"Inside AdjustedAge: shipping a corrected-age calculator for NICU parents"** (case study) | "corrected age calculator for premature babies" → `/` | The definitive cross-link. B2B audience (agencies, health-tech content leads) is exactly the audience who links and shares case studies. Also demonstrates the business's core claim ("Medical SEO Writing" on E-E-A-T principles) with a live artifact. |
| 2 | **"What NICU parents search for: a paediatrician's keyword reality check"** | "premature baby milestones chart" → `/premature-baby-milestones` | Content-marketing audience loves real SERP research; links the highest-value content page. |
| 3 | **"Safety rails for medical calculators: no verdicts, always red flags"** | "the tool's methodology" → `/methodology` | Differentiates the business's product philosophy; earns trust-links from digital-health founders. |
| 4 | **"How I review paediatric content: the correction-first checklist"** | "when to stop correcting for prematurity" → `/when-to-stop-correcting` | Naturally cites the clinical convention; second contextual link into the cluster. |

Rules: max 1–2 links per post; anchors keyword-relevant but sentence-natural; never link all four properties in one post (that reads as a link network). Space posts 2–3 weeks apart.

### 3.1 Cross-links back (preemie → drzeewrites)
Only two, both contextual: the `/about` "Elsewhere" block (§2.2) and one line in `/methodology` ("the editorial standards applied here follow the author's published writing practice — see drzeewrites.com"). Everything else stays clean.

### 3.2 Guest amplification (borrowed authority)
The blog's topic gives access to audiences the tool alone can't reach: pitch the case-study (post #1) as a guest article to medical-content/SEO newsletters and digital-health communities ("how a paediatrician built a no-tracking YMYL tool"). Each republication or newsletter mention is a second-generation link to both properties.

---

## 4. The one risk to manage: commercial-interest disclosure

drzeewrites.com serves pharma and health-tech clients. The tool's trust position is "no pharma sponsorship, no ads, no tracking" — a statement that must remain *true and visibly true* once the properties connect.

- **Never** put drzeewrites.com promotional content or links on the tool's clinical pages (homepage, milestones, red-flags). `/about` + `/methodology` only.
- **Disclose plainly** (the §2.2 sentence). Hidden commercial relationships between a health tool and a pharma-serving content business is precisely the pattern Google's quality raters look for; a visible, one-line disclosure converts it from a risk into an E-E-A-T plus ("this tool is independent even though the author has commercial interests elsewhere").
- Keep the preemie site free of ads/affiliate links regardless — the audit's funding statement is a ranking asset.

---

## 5. What NOT to do

- **Don't build a second blog on drzeeshanislam.blog.** Split content = split authority. It's an identity hub; keep it that way.
- **Don't interlink aggressively** (sitewide footer links in both directions, or every post linking the tool). 2–3 well-placed contextual links beat 20 footer links, and aggressive cross-linking between same-owner sites gets discounted or flagged.
- **Don't expect quick wins from these links alone.** drzeewrites.com is also new — its authority must grow in parallel (its own topical consistency, its own social sharing). The graph matters for *entity resolution* immediately; link equity compounds later.
- **Don't hide the relationship.** No-following the links is fine and prudent on the *commercial* side (drzeewrites), but the identity links (`sameAs`, LinkedIn, Gravatar verification) should be genuine and visible.

---

## 6. Execution checklist (next 30 days)

- [ ] Gravatar: add both sites as verified accounts; rewrite bio with full credentials (done in an hour)
- [ ] LinkedIn: add both sites; headline mentions AdjustedAge; one launch post
- [x] preemie `/about`: `sameAs` array + "Elsewhere" links + disclosure sentence (code PR — done 2026-08-26)
- [x] preemie `__root.tsx`: `sameAs` on the root `Physician` block (code PR — done 2026-08-26)
- [x] preemie: `identifier` (Gravatar hash) + `alternateName` ("Dr Zee") on the `/about` Physician schema
- [x] preemie: `llm.txt` mentions the identity card and practice; `llms.txt` alias added
- [ ] preemie: author photo live (from asset store or Gravatar URL) + `Physician.image` fixed (audit P0 §3.2)
- [ ] drzeewrites.com: portfolio entry for AdjustedAge + footer link
- [ ] drzeewrites.com/blog: case-study post #1 published with anchor "corrected age calculator for premature babies"
- [ ] GSC verified for **both** domains (audit P0 §3.4); submit both sitemaps
- [ ] 60 days later: posts #2–#4 on the schedule above

**Success measure:** within 90 days, GSC on preemie shows the first impressions from queries containing the physician's name / "Dr Zee" variations (proof the entity is resolved), plus a measurable uptick in clicks from LinkedIn referral traffic.
