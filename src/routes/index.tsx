import { createFileRoute } from "@tanstack/react-router";
import { CorrectedAgeTool } from "@/components/CorrectedAgeTool";
import { Article, PageHeader, SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Corrected Age Calculator for Premature Babies | AdjustedAge" },
      {
        name: "description",
        content:
          "Corrected age, milestones and follow-up tracking for NICU graduates, with CDC milestones re-indexed to corrected age. Reviewed by Dr. Zeeshan Islam.",
      },
      { property: "og:title", content: "Corrected Age Calculator for Premature Babies | AdjustedAge" },
      {
        property: "og:description",
        content:
          "Corrected age, milestones and follow-up tracking for NICU graduates, with CDC milestones re-indexed to corrected age. Reviewed by Dr. Zeeshan Islam.",
      },
      { property: "og:url", content: "https://preemie.vercel.app/" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://preemie.vercel.app/og-image.png" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "AdjustedAge" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Corrected Age Calculator for Premature Babies | AdjustedAge" },
      {
        name: "twitter:description",
        content:
          "Corrected age, milestones and follow-up tracking for NICU graduates, with CDC milestones re-indexed to corrected age. Reviewed by Dr. Zeeshan Islam.",
      },
      { name: "twitter:image", content: "https://preemie.vercel.app/og-image.png" },
    ],
    links: [
      { rel: "canonical", href: "https://preemie.vercel.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: "Corrected Age Calculator for Premature Babies",
          description:
            "Calculates corrected age, chronological age and postmenstrual age for preterm infants and re-indexes CDC developmental surveillance milestones to corrected age.",
          url: "https://preemie.vercel.app/",
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
          copyrightHolder: {
            "@type": "Person",
            name: "Dr. Zeeshan Islam",
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
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="For NICU graduates, birth to 3 years"
        title="Corrected age calculator for premature babies"
        intro="Enter the date of birth and gestational age once. AdjustedAge gives you corrected age, chronological age and postmenstrual age, re-indexes the developmental milestones to the corrected number, and remembers every follow-up visit."
      />

      <div className="mt-10">
        <CorrectedAgeTool />
      </div>

      <Article>
        <h2>Why corrected age exists</h2>
        <p>
          A baby born at 28 weeks has spent twelve fewer weeks growing inside than a baby born at
          term. Those twelve weeks do not disappear at birth — the brain finishes them outside. So
          when we judge whether a preterm baby is developing as expected, we compare them against
          where they would be if they had been born on their due date. That adjusted number is the{" "}
          <strong>corrected age</strong> (also called adjusted age).
        </p>
        <p>
          The arithmetic is simple, but it has to be redone at every single encounter, and every
          downstream judgement depends on it: which milestone list applies, which growth chart to
          plot on, which percentile, and when to stop correcting. Most tools do the date maths and
          stop there.
        </p>

        <h2>What this tool does differently</h2>
        <ul>
          <li>
            <strong>One input set, every answer.</strong> Corrected age, chronological age and
            postmenstrual age from the same two facts.
          </li>
          <li>
            <strong>Milestones are re-indexed automatically.</strong> The CDC/AAP surveillance
            prompts shown are the ones for the corrected age, not the birthday age.
          </li>
          <li>
            <strong>It remembers.</strong> Visits at 4, 8, 12, 18, 24 and 36 months corrected are
            kept as a serial record you can print or export.
          </li>
          <li>
            <strong>It never scores your baby.</strong> No pass, no fail, no reassuring verdict. The
            &ldquo;act early&rdquo; concerns are always visible.
          </li>
          <li>
            <strong>Your data stays on your device.</strong> No account, no server, no upload.
          </li>
        </ul>

        <h2>Corrected age is not used for everything</h2>
        <p>
          Two things in particular are <em>not</em> corrected: immunisations are given by
          chronological age, and the growth chart choice changes at term-equivalent age. The tool
          shows the chronological number alongside the corrected one for exactly this reason.
        </p>
      </Article>
    </SiteLayout>
  );
}
