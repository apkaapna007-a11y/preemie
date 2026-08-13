import { createFileRoute } from "@tanstack/react-router";
import { Article, PageHeader, SiteLayout } from "@/components/SiteLayout";
import { ALWAYS_ACT_EARLY } from "@/lib/milestones";

export const Route = createFileRoute("/red-flags")({
  head: () => ({
    meta: [
      { title: "Preemie Red Flags: When to Call the Doctor | AdjustedAge" },
      {
        name: "description",
        content:
          "Developmental and clinical red flags in premature babies that need a same-week call, whatever the corrected age. Reviewed by Dr. Zeeshan Islam.",
      },
      { property: "og:title", content: "Preemie Red Flags: When to Call the Doctor | AdjustedAge" },
      {
        property: "og:description",
        content:
          "Developmental and clinical red flags in premature babies that need a same-week call, whatever the corrected age. Reviewed by Dr. Zeeshan Islam.",
      },
      { property: "og:url", content: "https://preemie.vercel.app/red-flags" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "https://preemie.vercel.app/og-image.png" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "AdjustedAge" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Preemie Red Flags: When to Call the Doctor | AdjustedAge" },
      {
        name: "twitter:description",
        content:
          "Developmental and clinical red flags in premature babies that need a same-week call, whatever the corrected age. Reviewed by Dr. Zeeshan Islam.",
      },
      { name: "twitter:image", content: "https://preemie.vercel.app/og-image.png" },
      { name: "article:published_time", content: "2026-08-11T00:00:00Z" },
      { name: "article:modified_time", content: "2026-08-12T00:00:00Z" },
    ],
    links: [
      { rel: "canonical", href: "https://preemie.vercel.app/red-flags" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: "Preemie Red Flags: When to Call the Doctor",
          description:
            "Emergency and same-week red flags for premature babies. CDC Act Early concerns that apply at every corrected age.",
          url: "https://preemie.vercel.app/red-flags",
          datePublished: "2026-08-11",
          dateModified: "2026-08-12",
          lastReviewed: "2026-08-12",
          audience: {
            "@type": "MedicalAudience",
            audienceType: "Parents of preterm infants",
          },
          author: {
            "@type": "Person",
            name: "Dr. Zeeshan Islam",
            honorificSuffix: "MBBS, MCPS (Pediatrics)",
            jobTitle: "Consultant Paediatrician",
            url: "https://preemie.vercel.app/about",
          },
          reviewedBy: {
            "@type": "Person",
            name: "Dr. Zeeshan Islam",
            honorificSuffix: "MBBS, MCPS (Pediatrics)",
            url: "https://preemie.vercel.app/about",
          },
          specialty: "Pediatrics",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://preemie.vercel.app/" },
            { "@type": "ListItem", position: 2, name: "Red Flags", item: "https://preemie.vercel.app/red-flags" },
          ],
        }),
      },
    ],
  }),
  component: RedFlagsPage,
});

function RedFlagsPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Safety page"
        title="Preemie red flags: when to call the doctor"
        intro="This site exists to stop parents from panicking about a delay that is only a calendar artefact. It must not become a reason to wait when waiting is wrong."
      />

      <div className="mx-auto max-w-3xl px-5">
        <div className="rounded-2xl bg-caution p-5 text-caution-foreground">
          <h2 className="font-display text-lg font-semibold">Call today — do not wait for the next visit</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {ALWAYS_ACT_EARLY.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <Article>
        <h2>Emergency — seek immediate care</h2>
        <ul>
          <li>Working hard to breathe: grunting, nostril flaring, chest pulling in, pauses in breathing</li>
          <li>Blue or grey colour around the lips or tongue</li>
          <li>A seizure, or unusual repetitive jerking or stiffening</li>
          <li>Unrousable, floppy, or very much less responsive than usual</li>
          <li>Fever in an infant under 3 months corrected, or any fever in a baby with a central line or shunt</li>
          <li>Repeated vomiting, a swollen abdomen, or blood in the stool</li>
        </ul>

        <h2>Same-week call to your paediatrician</h2>
        <ul>
          <li>Not gaining weight, or crossing downwards through growth centiles</li>
          <li>Feeding is taking longer and longer, with coughing or choking</li>
          <li>Persistently favouring one hand before 12 months corrected — early hand preference is a motor red flag, not a talent</li>
          <li>Stiff or arched posture, or a baby who feels floppy when picked up</li>
          <li>No response to your voice, or no babble by 9 months corrected</li>
          <li>No eye contact, or eyes that consistently turn in or out after 4 months corrected</li>
          <li>No pointing or showing by 18 months corrected</li>
          <li>Snoring with pauses, or noisy laboured breathing during sleep</li>
        </ul>

        <h2>Things that are usually not a problem</h2>
        <ul>
          <li>Sitting or walking &ldquo;late&rdquo; when the corrected age row says the child is on time</li>
          <li>A brief plateau during an illness, with recovery afterwards</li>
          <li>Being smaller than term-born peers of the same birthday, while following their own curve</li>
          <li>Preferring to be carried, disliking tummy time, or being sensitive to noise after a long NICU stay</li>
        </ul>

        <h2>A note on trusting yourself</h2>
        <p>
          Parental concern is one of the strongest predictors of a genuine developmental problem in
          the published literature. If something feels wrong and this page does not list it, that is
          not evidence that nothing is wrong. Call anyway. No paediatrician has ever resented being
          called about a NICU graduate.
        </p>
      </Article>
    </SiteLayout>
  );
}
