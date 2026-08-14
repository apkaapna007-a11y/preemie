# AdjustedAge - Project Plan

A corrected-age follow-up tool for NICU graduates, built on clinical workflows and authority.

## Plan Rules
- **No visual text in banner**: The banner remains "Clinically reviewed by Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics)".
- **Privacy-first**: No server storage. LocalStorage only.
- **Authority**: All clinical claims trace to sources.

## Implementation Details

### 1. Author Credentials Page
- **Path**: `src/routes/about.tsx` (already exists, but needs verification of headshot and layout).
- **Headshot**: Uses `dr-zeeshan-islam.png`.

### 2. Clinical Follow-up Tracker
- **Logic**: `src/lib/followup.ts` defines the visit schedule (4, 8, 12, 18, 24, 36 months corrected).
- **UI**: `src/components/CorrectedAgeTool.tsx` handles the serial visit record.
- **Charts**: Implementation of a growth/date trajectory visualization in the serial record section.

### 3. Visit Summaries (PDF)
- **Library**: `jspdf` via `src/lib/visit-pdf.ts`.
- **Content**: Patient demographics (GA, corrected age), measurements, milestones, and medical disclaimer.

### 4. SEO & E-E-A-T
- **Sitemap**: `public/sitemap.xml`.
- **Structured Data**: `MedicalWebPage`, `Physician`, `BreadcrumbList` on every route.
- **Authority Linking**: Every page footer and header links to `/about`.

## Technical Specs
- **Date Logic**: UTC-normalized to avoid DST offsets.
- **Analytics**: Privacy-preserving local counts in `localStorage`.
- **PWA**: Offline reliable via `vite-plugin-pwa`.
