# `__root.tsx` schema patch — apply by the parent agent

**Why this file exists:** the SCHEMA subagent is forbidden from editing `src/routes/__root.tsx`.
All 14 route-level inline `Organization` publishers were converted to
`{ "@id": "https://preemie.vercel.app/#organization" }` references, but the node that
those references point at is **not defined yet**. Until Step 1 below is applied,
every route page's `publisher` is a dangling `@id`. Steps 2–3 close the remaining
root-owned findings (F1/F5 residue, F4 root occurrence).

Line numbers below are as of 2026-09-29 in the working tree; the anchor text blocks
are the authoritative match keys (they are unique in the file).

---

## Step 1 — DEFINE the canonical `Organization` node (required)

Insert a new script entry **between** the `WebSite` entry and the `Physician` entry
in the `scripts: [` array.

### Exact block to insert

```tsx
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://preemie.vercel.app/#organization",
            name: "AdjustedAge",
            alternateName: "Adjusted Age Calculator",
            url: "https://preemie.vercel.app/",
            logo: {
              "@type": "ImageObject",
              url: "https://preemie.vercel.app/icon-512.png",
              width: 512,
              height: 512,
            },
            image: "https://preemie.vercel.app/og/og-brand.png",
            description:
              "Corrected age calculator and preemie follow-up tool for NICU graduates.",
            sameAs: ["https://preemie.vercel.app/"],
            founder: { "@id": "https://preemie.vercel.app/about#drzeeshan" },
          }),
        },
```

Asset checks performed before writing this patch: `public/icon-512.png` is a real
PNG (magic bytes `89 50 4E 47 0D 0A 1A 0A`, 512×512, 37,022 bytes) — valid `logo`
per F1's fix direction; `public/og/og-brand.png` exists and is the site-wide OG card.

### Insertion context — anchor on the canonical `WebSite` node

Current code (`src/routes/__root.tsx:154`–`179`), showing exactly where the new
entry goes (`<— INSERT HERE`):

```tsx
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "AdjustedAge",
            alternateName: "Adjusted Age Calculator",
            url: "https://preemie.vercel.app",
            description: "Corrected age calculator and preemie follow-up tool for NICU graduates.",
            inLanguage: "en",
            image: "https://preemie.vercel.app/og/og-brand.png",
            publisher: {
              "@type": "Organization",
              name: "AdjustedAge",
              logo: {
                "@type": "ImageObject",
                url: "https://preemie.vercel.app/icon-512.png",
              },
            },
            author: {
              "@id": "https://preemie.vercel.app/about#drzeeshan",
            },
          }),
        },
        {                                    // <— INSERT THE ORGANIZATION ENTRY IMMEDIATELY AFTER THE LINE ABOVE
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Physician",
            "@id": "https://preemie.vercel.app/about#drzeeshan",
            …
```

In terms of unique match text: insert after the `WebSite` entry's closing
`          }),` + `        },` (currently `__root.tsx:177`–`178`) and before the
`        {` that starts the `"@type": "Physician"` entry (currently `__root.tsx:179`).

---

## Step 2 — Replace the remaining inline `WebSite.publisher` (closes F1/F5 on 16/16 pages)

The `WebSite` node still carries an **anonymous inline `Organization`** — the last
one in the codebase. Replace this block (currently `__root.tsx:166`–`173`):

```tsx
            publisher: {
              "@type": "Organization",
              name: "AdjustedAge",
              logo: {
                "@type": "ImageObject",
                url: "https://preemie.vercel.app/icon-512.png",
              },
            },
```

with:

```tsx
            publisher: { "@id": "https://preemie.vercel.app/#organization" },
```

Do this **after** Step 1 so the reference resolves. After Steps 1+2 the graph has
exactly one `Organization` definition, referenced from 16 `WebSite.publisher`s
(merged from root) and 14 route page `publisher`s.

---

## Step 3 — F4 root occurrence: `medicalSpecialty` enum value

`src/routes/__root.tsx:188` (inside the root `Physician` node):

```tsx
            medicalSpecialty: "Pediatrics",
```

→

```tsx
            medicalSpecialty: "Pediatric",
```

`Pediatric` is the schema.org `MedicalSpecialty` enum member (`Pediatrics` is not).
This was the only one of the 14 audited occurrences the subagent could not touch.
Free-text `knowsAbout` entries must stay as-is (they are not enum-valued).

---

## Appendix A — `Physician` fields dropped from `/about` by the dedupe (T6)

`about.tsx`'s duplicate `Physician` block (old `about.tsx:47`–`108`) was deleted and
replaced with a single `ProfilePage` that references
`{ "@id": "https://preemie.vercel.app/about#drzeeshan" }`. The **root** `Physician`
(`__root.tsx:179`–`210`) is now the only definition, and it is **missing** the richer
E-E-A-T fields that only the `/about` copy had. They are reproduced verbatim below
(recovered from the live deploy, which still renders the pre-dedupe markup) so they
are not lost. Fold them into the root `Physician` node:

```tsx
            honorificPrefix: "Dr.",
            identifier: {
              "@type": "PropertyValue",
              propertyID: "Gravatar",
              value: "50c92b77e1d7a4a9ee98b970f50188f88806b7b02c9c8e5004ee52a1ff4c861c",
            },
            description:
              "Dr. Zeeshan Islam is the author and clinical reviewer of AdjustedAge. He is a pediatrician, medical writer and digital health creator focused on evidence-based child health and preterm infant developmental follow-up.",
            knowsAbout: [
              "Pediatrics",
              "Neonatology",
              "Preterm infant follow-up",
              "Developmental surveillance",
              "Corrected age",
            ],
            hasCredential: [
              {
                "@type": "EducationalOccupationalCredential",
                credentialCategory: "degree",
                name: "MBBS (Bachelor of Medicine, Bachelor of Surgery)",
              },
              {
                "@type": "EducationalOccupationalCredential",
                credentialCategory: "postgraduate certification",
                name: "MCPS in Paediatrics, College of Physicians and Surgeons Pakistan",
              },
            ],
            worksFor: { "@id": "https://preemie.vercel.app/#organization" },
```

Notes for whoever applies this:

- **Choose one `description`.** The root copy says *"…specializing in neonatal
  follow-up and corrected age development."*; the `/about` copy says *"…author and
  clinical reviewer of AdjustedAge… focused on evidence-based child health and
  preterm infant developmental follow-up."* They conflicted before the dedupe
  (that conflict was finding F2) — keep only one. The `/about` wording is the one
  the audit recommended keeping.
- `worksFor` is deliberately written as an `@id` reference to the Step 1 node
  instead of the old inline `{ "@type": "Organization", name, url }`, which was one
  of the 31 anonymous Organization copies counted in F5.
- `honorificSuffix`, `jobTitle`, `url`, `image`, `alternateName`, `sameAs`,
  `inLanguage` and `address` already exist on the root node — do not duplicate them.
- The `/about` copy's `medicalSpecialty: "Pediatrics"` must **not** be carried over;
  apply Step 3's `"Pediatric"` value instead.

---

## Appendix B — `sameAs` policy for the Organization

The audit's rule (schema.md O1) is: *add `sameAs` only with URLs you actually
control.* Checked on 2026-09-29: `https://x.com/AdjustedAge` returns **404** — the
`twitter:site`/`twitter:creator` `@AdjustedAge` metas in `__root.tsx:134`–`135` are
not proof of a real account, and no search result corroborates it. No other
Organization-level profile (no Mastodon/Bluesky/GitHub/LinkedIn *org* page) exists.

So Step 1 ships `sameAs: ["https://preemie.vercel.app/"]` — a self-controlled,
unambiguous identity URL. When a verified external profile exists, append it there;
do not add the physician's personal `sameAs` trio (`drzeeshanislam.blog`, LinkedIn,
`drzeewrites.com`) to the **Organization** — those belong to the `Physician` node
and already sit there.

---

## Verification checklist after applying (parent's responsibility)

1. `grep -c '"@type": "Organization"'` across `src/` → exactly **1** (Step 1 entry;
   Step 2 removes the inline `WebSite.publisher` copy).
2. No string `"Pediatrics"` remains in any `specialty`/`medicalSpecialty` value → 0.
3. Every route `publisher: { "@id": "…#organization" }` resolves to a node present
   in the same document (root scripts render on all pages).
4. Validate one rendered page's JSON-LD (e.g. Rich Results test on `/`) — expect no
   "dangling reference" warnings.
