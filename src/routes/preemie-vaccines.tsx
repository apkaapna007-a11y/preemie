import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Article,
  Breadcrumbs,
  KeyTakeaways,
  LinkGridSection,
  PageHeader,
  SiteLayout,
} from "@/components/SiteLayout";

export const Route = createFileRoute("/preemie-vaccines")({
  head: () => ({
    meta: [
      { title: "Do Preemies Get Vaccines by Corrected Age? | AdjustedAge" },
      {
        name: "description",
        content:
          "Preemie vaccine timing usually follows chronological age, not corrected age. A clear guide for parents of premature babies, reviewed by Dr. Zeeshan Islam.",
      },
      {
        property: "og:title",
        content: "Do Preemies Get Vaccines by Corrected Age? | AdjustedAge",
      },
      {
        property: "og:description",
        content:
          "Preemie vaccine timing usually follows chronological age, not corrected age. A clear guide for parents of premature babies, reviewed by Dr. Zeeshan Islam.",
      },
      { property: "og:url", content: "https://preemie.vercel.app/preemie-vaccines" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "https://preemie.vercel.app/og/og-vaccines.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "AdjustedAge" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Do Preemies Get Vaccines by Corrected Age? | AdjustedAge",
      },
      {
        name: "twitter:description",
        content:
          "Preemie vaccine timing usually follows chronological age, not corrected age. Reviewed by Dr. Zeeshan Islam.",
      },
      { name: "twitter:image", content: "https://preemie.vercel.app/og/og-vaccines.png" },
      { name: "twitter:image:alt", content: "Preemie vaccine timing guide" },
      { property: "og:image:alt", content: "Preemie vaccine timing guide" },
      { name: "article:published_time", content: "2026-08-26T00:00:00Z" },
      { name: "article:modified_time", content: "2026-08-27T00:00:00Z" },
    ],
    links: [{ rel: "canonical", href: "https://preemie.vercel.app/preemie-vaccines" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: "Do Preemies Get Vaccines by Corrected Age?",
          description:
            "Guide to vaccine timing in premature babies, explaining why routine immunisations usually follow chronological age rather than corrected age.",
          url: "https://preemie.vercel.app/preemie-vaccines",
          datePublished: "2026-08-26",
          dateModified: "2026-08-27",
          lastReviewed: "2026-08-27",
          audience: {
            "@type": "MedicalAudience",
            audienceType: "Parents of preterm infants",
          },
          author: { "@id": "https://preemie.vercel.app/about#drzeeshan" },
          reviewedBy: { "@id": "https://preemie.vercel.app/about#drzeeshan" },
          publisher: {
            "@type": "Organization",
            name: "AdjustedAge",
            logo: { "@type": "ImageObject", url: "https://preemie.vercel.app/favicon.png" },
          },
          specialty: "Pediatrics",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Do premature babies get vaccines by corrected age?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Routine vaccines are usually scheduled by chronological age, not corrected age.",
              },
            },
            {
              "@type": "Question",
              name: "Why not use corrected age for vaccines?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Delaying routine immunisations leaves a premature baby unprotected for longer, so the usual rule is to follow the real age from birth.",
              },
            },
            {
              "@type": "Question",
              name: "Are there special vaccine considerations for NICU babies?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Some babies have NICU-specific or condition-specific questions, so the baby's own clinical team should confirm the exact plan. This page explains the usual age framework, not individual exceptions.",
              },
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://preemie.vercel.app/" },
            {
              "@type": "ListItem",
              position: 2,
              name: "Preemie Vaccines",
              item: "https://preemie.vercel.app/preemie-vaccines",
            },
          ],
        }),
      },
    ],
  }),
  component: PreemieVaccinesPage,
});

function PreemieVaccinesPage() {
  return (
    <SiteLayout>
      <Breadcrumbs items={[{ to: "/", label: "Home" }, { label: "Preemie vaccines" }]} />

      <PageHeader
        eyebrow="One of the most common corrected-age mistakes"
        title="Do preemies get vaccines by corrected age?"
        intro="Usually no. Routine immunisations are generally scheduled by chronological age, not corrected age. This page explains the difference in plain language so parents do not accidentally delay protection."
      />

      <KeyTakeaways
        items={[
          "Routine vaccines usually follow chronological age, not corrected age.",
          "Corrected age helps with milestones and some follow-up interpretation, but not the routine vaccine calendar.",
          "Premature babies are often more vulnerable to infection, which is one reason delaying routine vaccines is not the usual approach.",
          "If your baby has NICU-specific or complex medical issues, confirm the exact plan with your own clinical team.",
        ]}
      />

      <Article>
        <h2>The short answer</h2>
        <p>
          For most routine immunisations, <strong>use chronological age</strong> — the real age
          since birth. Do <strong>not</strong> shift the schedule forward by the number of weeks the
          baby was born early.
        </p>

        <h2>Why corrected age is not used for vaccines</h2>
        <p>
          Corrected age exists to make developmental comparison fair. A baby born early has had less
          time to mature before birth, so milestones are often interpreted against the due-date age.
          Vaccines are different. They protect against infections in the real world after the baby
          is born, so delaying routine protection because of prematurity is usually the wrong move.
        </p>
        <p>
          This is why the <Link to="/">main calculator</Link> always shows both corrected age and
          chronological age. They answer different clinical questions.
        </p>

        <h2>What parents often hear, and what it means</h2>
        <ul>
          <li>
            <strong>"Use corrected age for milestones"</strong> — yes, often true in early
            follow-up.
          </li>
          <li>
            <strong>"Use corrected age for vaccines"</strong> — usually no.
          </li>
          <li>
            <strong>"Ask your team about the exact plan"</strong> — always sensible if your baby has
            complex medical issues, ongoing admission, or a NICU-specific question.
          </li>
        </ul>

        <h2>Are there exceptions?</h2>
        <p>
          Some babies have extra considerations because of very low birth weight, prolonged
          admission, respiratory disease, immune issues, or other medical factors. Those details
          belong to the baby&apos;s own clinical team. This page explains the{" "}
          <em>usual age framework</em>, not a personalised vaccine schedule.
        </p>

        <h2>How to avoid the common mistake</h2>
        <p>
          If you are checking a preemie milestone, use corrected age. If you are checking the
          routine vaccine calendar, use chronological age. If you are checking an early NICU
          document,
          <Link to="/pma-calculator">PMA</Link> may be the number the team is using. If you want
          those labels separated clearly on one page, read the{" "}
          <Link to="/adjusted-age-vs-chronological-age">
            adjusted age vs chronological age guide
          </Link>
          . Mixing those three ages is what causes most confusion.
        </p>

        <h2>Related questions parents search</h2>
        <h3>Do preemies get vaccines later than term babies?</h3>
        <p>
          Usually no for routine vaccines. The schedule generally follows chronological age unless
          the baby&apos;s own team tells you otherwise.
        </p>
        <h3>Can corrected age delay vaccines?</h3>
        <p>Corrected age is not normally used to delay routine immunisations.</p>
        <h3>What age should I use for milestones instead?</h3>
        <p>
          For developmental follow-up, milestones are usually interpreted by corrected age in the
          early years. Use the{" "}
          <Link to="/premature-baby-milestones">premature baby milestones chart</Link> together with
          the calculator.
        </p>
        <h3>What if my baby was late preterm?</h3>
        <p>
          Even late preterm babies may still use corrected age for development while keeping
          vaccines on chronological age. See the{" "}
          <Link to="/late-preterm-baby">late preterm baby guide</Link>.
        </p>
      </Article>

      <LinkGridSection
        title="Pages that help with this confusion"
        links={[
          {
            to: "/",
            label: "Corrected age calculator",
            description:
              "See corrected age, chronological age and PMA together so the terms do not get mixed up.",
          },
          {
            to: "/adjusted-age-calculator",
            label: "Adjusted age calculator",
            description: "Same calculation for the adjusted-age wording many clinics use.",
          },
          {
            to: "/adjusted-age-vs-chronological-age",
            label: "Adjusted age vs chronological age",
            description: "See milestones, vaccines and PMA compared on one reference page.",
          },
          {
            to: "/pma-calculator",
            label: "PMA calculator",
            description: "Useful for early NICU follow-up and before the original due date.",
          },
          {
            to: "/nicu-follow-up-schedule",
            label: "NICU follow-up schedule",
            description: "See how age labels show up across typical corrected-age clinic reviews.",
          },
          {
            to: "/premature-baby-milestones",
            label: "Premature baby milestones chart",
            description:
              "Use corrected age here, not chronological age, when reading milestone rows.",
          },
          {
            to: "/how-to-calculate-corrected-age",
            label: "How to calculate corrected age",
            description: "Check the formula manually if you want to understand the age difference.",
          },
          {
            to: "/red-flags",
            label: "Preemie red flags",
            description: "Know when illness or poor feeding should prompt medical contact quickly.",
          },
        ]}
      />
    </SiteLayout>
  );
}
