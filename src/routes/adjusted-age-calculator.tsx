import { createFileRoute, Link } from "@tanstack/react-router";
import { CorrectedAgeTool } from "@/components/CorrectedAgeTool";
import {
  Article,
  Breadcrumbs,
  KeyTakeaways,
  LinkGridSection,
  PageHeader,
  SiteLayout,
} from "@/components/SiteLayout";

export const Route = createFileRoute("/adjusted-age-calculator")({
  head: () => ({
    meta: [
      { title: "Adjusted Age Calculator for Premature Babies | AdjustedAge" },
      {
        name: "description",
        content:
          "Use this adjusted age calculator for premature babies. Adjusted age and corrected age mean the same thing. Includes PMA, milestones and follow-up planning, reviewed by Dr. Zeeshan Islam.",
      },
      {
        property: "og:title",
        content: "Adjusted Age Calculator for Premature Babies | AdjustedAge",
      },
      {
        property: "og:description",
        content:
          "Use this adjusted age calculator for premature babies. Adjusted age and corrected age mean the same thing. Includes PMA, milestones and follow-up planning, reviewed by Dr. Zeeshan Islam.",
      },
      { property: "og:url", content: "https://preemie.vercel.app/adjusted-age-calculator" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://preemie.vercel.app/og/og-home.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "AdjustedAge" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Adjusted Age Calculator for Premature Babies | AdjustedAge",
      },
      {
        name: "twitter:description",
        content:
          "Use this adjusted age calculator for premature babies. Adjusted age and corrected age mean the same thing. Includes PMA, milestones and follow-up planning, reviewed by Dr. Zeeshan Islam.",
      },
      { name: "twitter:image", content: "https://preemie.vercel.app/og/og-home.png" },
      { name: "twitter:image:alt", content: "Adjusted age calculator for premature babies" },
      { property: "og:image:alt", content: "Adjusted age calculator for premature babies" },
    ],
    links: [{ rel: "canonical", href: "https://preemie.vercel.app/adjusted-age-calculator" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: "Adjusted Age Calculator for Premature Babies",
          description:
            "Adjusted age calculator for premature babies. Adjusted age and corrected age are equivalent terms in preterm follow-up.",
          url: "https://preemie.vercel.app/adjusted-age-calculator",
          datePublished: "2026-08-26",
          dateModified: "2026-08-27",
          lastReviewed: "2026-08-27",
          audience: {
            "@type": "MedicalAudience",
            audienceType: "Parents of preterm infants",
          },
          author: {
            "@id": "https://preemie.vercel.app/about#drzeeshan",
          },
          reviewedBy: {
            "@id": "https://preemie.vercel.app/about#drzeeshan",
          },
          publisher: {
            "@type": "Organization",
            name: "AdjustedAge",
            logo: {
              "@type": "ImageObject",
              url: "https://preemie.vercel.app/favicon.png",
            },
          },
          specialty: "Pediatrics",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "AdjustedAge Adjusted Age Calculator",
          applicationCategory: "HealthApplication",
          operatingSystem: "Any",
          url: "https://preemie.vercel.app/adjusted-age-calculator",
          image: "https://preemie.vercel.app/og/og-home.png",
          description:
            "Free adjusted age calculator for premature babies, with postmenstrual age, milestones and local follow-up visit tracking.",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          creator: {
            "@id": "https://preemie.vercel.app/about#drzeeshan",
          },
          reviewer: {
            "@id": "https://preemie.vercel.app/about#drzeeshan",
          },
          inLanguage: "en",
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
              name: "Is adjusted age the same as corrected age?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Adjusted age and corrected age are two names for the same calculation in preterm follow-up.",
              },
            },
            {
              "@type": "Question",
              name: "How do you calculate adjusted age?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Work out the weeks of prematurity from 40 weeks, then subtract that gap from chronological age. The calculator on this page does the arithmetic in days to avoid rounding errors.",
              },
            },
            {
              "@type": "Question",
              name: "Should I use adjusted age for milestones?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "For early developmental follow-up, milestones are usually interpreted by adjusted age rather than birthday age.",
              },
            },
            {
              "@type": "Question",
              name: "Should vaccines use adjusted age?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Vaccines are scheduled by chronological age.",
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
              name: "Adjusted Age Calculator",
              item: "https://preemie.vercel.app/adjusted-age-calculator",
            },
          ],
        }),
      },
    ],
  }),
  component: AdjustedAgeCalculatorPage,
});

function AdjustedAgeCalculatorPage() {
  return (
    <SiteLayout>
      <Breadcrumbs items={[{ to: "/", label: "Home" }, { label: "Adjusted age calculator" }]} />

      <PageHeader
        eyebrow="Same clinical concept, different search phrase"
        title="Adjusted age calculator for premature babies"
        intro="Parents, therapists and clinics often say adjusted age instead of corrected age. They mean the same thing. This page uses the same calculator and explains when adjusted age matters, when it does not, and how it relates to PMA and milestones."
      />

      <div className="mt-10">
        <CorrectedAgeTool />
      </div>

      <KeyTakeaways
        items={[
          "Adjusted age and corrected age are two names for the same number.",
          "Use adjusted age for early milestone follow-up, not for vaccine timing.",
          "The calculator on this page also shows chronological age and postmenstrual age so the terms do not get mixed up.",
          "Late preterm babies can still need adjusted age in the first year, even when they look only a few weeks early on paper.",
        ]}
      />

      <Article>
        <h2>What adjusted age means</h2>
        <p>
          <strong>Adjusted age</strong> is age counted from the original due date rather than from
          the birthday. In neonatal follow-up, it is the same idea as <strong>corrected age</strong>
          . If a baby was born eight weeks early and is now sixteen weeks old by the calendar, the
          adjusted age is about eight weeks.
        </p>
        <p>
          Many parents search for an adjusted age calculator because that is the language used by a
          therapist, NICU team or developmental clinic. Other clinicians prefer the phrase corrected
          age. The arithmetic is identical either way.
        </p>

        <h2>Adjusted age vs corrected age vs chronological age</h2>
        <ul>
          <li>
            <strong>Adjusted age:</strong> time since the due date.
          </li>
          <li>
            <strong>Corrected age:</strong> the same thing, just a different label.
          </li>
          <li>
            <strong>Chronological age:</strong> time since birth.
          </li>
          <li>
            <strong>Postmenstrual age (PMA):</strong> gestational age at birth plus days since
            birth.
          </li>
        </ul>
        <p>
          The confusion happens because all four numbers can matter in the same appointment. This is
          why the calculator shows them side by side instead of hiding the "other" ages.
        </p>
        <p>
          If you want the labels compared side by side, read the{" "}
          <Link to="/adjusted-age-vs-chronological-age">
            adjusted age vs chronological age guide
          </Link>
          .
        </p>

        <h2>How to calculate adjusted age</h2>
        <p>
          First calculate the gap between 40 weeks and the gestational age at birth. That gives the
          weeks of prematurity. Then subtract that gap from the baby&apos;s chronological age.
        </p>
        <p>
          If you want to check the arithmetic yourself, go to the{" "}
          <Link to="/how-to-calculate-corrected-age">worked formula page</Link>. The calculator on
          this site performs the calculation in <strong>days</strong>, which avoids rounding errors
          from switching back and forth between weeks and months.
        </p>

        <h2>When should adjusted age be used?</h2>
        <p>
          Adjusted age usually matters most for developmental follow-up in the first two years, and
          especially in the first year. It is the age you normally use when reading milestone guides
          for a preterm baby. That is why this calculator links directly into the{" "}
          <Link to="/premature-baby-milestones">premature baby milestones chart</Link>.
        </p>
        <p>
          Before term-equivalent age, <strong>PMA</strong> is often the more clinically useful
          number. After the due date, adjusted age becomes easier for parents to use in day-to-day
          follow-up.
        </p>
        <p>
          This also applies to babies who were only a few weeks early. The{" "}
          <Link to="/late-preterm-baby">late preterm baby guide</Link> explains why 35- and 36-week
          babies can still shift milestone expectations, and the{" "}
          <Link to="/nicu-follow-up-schedule">NICU follow-up schedule</Link> shows how clinics often
          organise corrected-age visits around the same logic.
        </p>

        <h2>When should adjusted age not be used?</h2>
        <p>
          Adjusted age is <strong>not</strong> how vaccine timing is scheduled. Immunisations follow
          chronological age. This is one of the most common mistakes parents encounter online, so
          the site keeps both ages visible in the result.
        </p>
        <p>
          Adjusted age is also not a promise of catch-up. It is a tool for fair comparison, not a
          guarantee that every milestone will happen by a deadline.
        </p>

        <h2>Adjusted age questions parents ask most often</h2>
        <h3>Is adjusted age the same as corrected age?</h3>
        <p>Yes. They are two names for the same concept in preterm follow-up.</p>
        <h3>Should I use adjusted age for milestones?</h3>
        <p>
          Usually yes, in the early years. Read the milestone row that matches the adjusted or
          corrected age rather than the birthday age.
        </p>
        <h3>Should vaccines use adjusted age?</h3>
        <p>No. Vaccines are scheduled by chronological age, not adjusted age.</p>
        <h3>Does a 35- or 36-week baby still need adjusted age?</h3>
        <p>
          Often yes, particularly in the first year. The difference may look small, but for a young
          baby it can still change which milestone row applies.
        </p>
        <h3>When do you stop using adjusted age?</h3>
        <p>
          Many clinics stop correcting development at about 24 months, but the exact endpoint varies
          by domain. Read <Link to="/when-to-stop-correcting">when to stop correcting</Link> for the
          fuller explanation.
        </p>

        <h2>Use the adjusted age result safely</h2>
        <p>
          The purpose of adjusted age is to avoid misreading a preterm baby as delayed simply
          because the wrong calendar was used. It should never be used to explain away a genuine
          concern for too long. If you are worried about your baby’s feeding, breathing, growth or
          loss of a skill, go straight to the <Link to="/red-flags">red flags page</Link> and
          contact your clinician.
        </p>
      </Article>

      <LinkGridSection
        title="Keep going with the preemie follow-up hub"
        intro="This adjusted-age page is stronger when it routes parents into the deeper guides they usually need next."
        links={[
          {
            to: "/",
            label: "Main corrected age calculator",
            description:
              "Use the original calculator hub for corrected age, PMA, milestones and serial visit tracking.",
          },
          {
            to: "/adjusted-age-vs-chronological-age",
            label: "Adjusted age vs chronological age",
            description:
              "Compare the age labels side by side for milestones, vaccines and early NICU notes.",
          },
          {
            to: "/how-to-calculate-corrected-age",
            label: "Worked formula and examples",
            description:
              "Check the arithmetic manually with late-preterm and very-preterm examples.",
          },
          {
            to: "/premature-baby-milestones",
            label: "Premature baby milestones chart",
            description: "Printable milestone chart indexed to corrected or adjusted age.",
          },
          {
            to: "/late-preterm-baby",
            label: "Late preterm baby guide",
            description:
              "See why 34- to 36-week babies may still need correction in the first year.",
          },
          {
            to: "/nicu-follow-up-schedule",
            label: "NICU follow-up schedule",
            description:
              "Understand the corrected-age checkpoints many clinics use across follow-up.",
          },
          {
            to: "/when-to-stop-correcting",
            label: "When to stop correcting",
            description:
              "Understand why many clinics stop at 24 months and where the exceptions sit.",
          },
          {
            to: "/red-flags",
            label: "Red flags that need medical advice",
            description: "Know when a concern should trigger a same-day or same-week call.",
          },
        ]}
      />
    </SiteLayout>
  );
}
