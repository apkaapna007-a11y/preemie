# Google Search Console & Bing Webmaster Tools — Setup Guide

**Owner:** site owner (requires the Google/Bing account) · **Time:** ~20 minutes
No site code changes needed — everything here is already in place.

---

## 1. Google Search Console

1. Go to https://search.google.com/search-console and sign in with the Google account that will own the property.
2. **Add property → URL prefix** → `https://preemie.vercel.app` (exactly, no trailing slash).
3. Choose **HTML file** verification. The file `google076e3cd5eda37745.html` **already exists in `public/`**, so the file Google asks for is already live at
   `https://preemie.vercel.app/google076e3cd5eda37745.html`.
   - If Google shows a different filename, download it and drop it into `public/` — same mechanism.
4. Click **Verify**. You're in.
5. **Submit the sitemap**: in the left sidebar → **Sitemaps** → paste `https://preemie.vercel.app/sitemap.xml` → **Submit**.
6. **Request indexing** of the homepage (URL Inspection → `https://preemie.vercel.app/` → Request Indexing). Do the same for `/premature-baby-milestones` after the retitle deploys.
7. (Recommended) Add `preemie.vercel.app` to **Removals → no**. Nothing to remove — skip.

### What to watch weekly
- **Performance → Queries**: impressions first (weeks 1–4), then clicks. Any query containing "dr" + "zeeshan"/"zee" proves the physician entity is resolved.
- **Pages → Not indexed**: anything with "Crawled – currently not indexed" on a clinical page needs a look.
- **Enhancements**: Physician/MedicalWebPage structured data errors, if any.

### Privacy consistency
GSC uses Google's *aggregate search data*; it places no cookies or tracking code on the site. It does **not** conflict with the "no tracking on our pages" promise — the `/privacy` page statement remains true.

---

## 2. Bing Webmaster Tools (feeds Copilot/AI citations + IndexNow)

1. Go to https://www.bing.com/webmasters → sign in (a Microsoft account works).
2. **Add site** → `https://preemie.vercel.app`.
3. Verify via the **HTML tag** or **CNAME** method (either works; the HTML file method above only works for GSC).
4. **Sitemaps** → submit `https://preemie.vercel.app/sitemap.xml`.
5. Enable **IndexNow** (Settings → IndexNow) — Bing then re-crawls within hours of each deploy instead of days.

---

## 3. After every deploy (can be automated later)

- GSC → **Sitemaps** → click the sitemap → "Submitted" shows new date. If not, resubmit.
- URL Inspection on any new route (e.g. future `/adjusted-age-calculator`).

---

## 4. What happens after setup

You stop flying blind: exact query list, position, CTR, and coverage. The audit's success thresholds (§6.3 of `SEO-AUDIT.md`) are all measured from these two dashboards:

- **30 days:** ≥10 keywords showing impressions.
- **90 days:** page-1 for ≥5 long-tails.
- **180 days:** top-5 "corrected age calculator" or top-10 "premature baby milestones chart".
