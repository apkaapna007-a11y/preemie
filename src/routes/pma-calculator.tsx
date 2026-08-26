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

export const Route = createFileRoute("/pma-calculator")({
  head: () => ({
    meta: [
      { title: "Postmenstrual Age (PMA) Calculator for Preterm Babies | AdjustedAge" },
      {
        name: "description",
        content:
          "Calculate postmenstrual age (PMA) for a preterm baby, plus corrected age and chronological age. Useful before the due date and early NICU follow-up. Reviewed by Dr. Zeeshan Islam.",
      },
      {
        property: "og:title",
        content: "Postmenstrual Age (PMA) Calculator for Preterm Babies | AdjustedAge",
      },
      {
        property: "og:description",
        content:
          "Calculate postmenstrual age (PMA) for a preterm baby, plus corrected age and chronological age. Useful before the due date and early NICU follow-up. Reviewed by Dr. Zeeshan Islam.",
      },
      { property: "og:url", content: "https://preemie.vercel.app/pma-calculator" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://preemie.vercel.app/og/og-pma.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "AdjustedAge" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Postmenstrual Age (PMA) Calculator for Preterm Babies | AdjustedAge",
      },
      {
        name: "twitter:description",
        content:
          "Calculate PMA for a preterm baby, plus corrected age and chronological age. Reviewed by Dr. Zeeshan Islam.",
      },
      { name: "twitter:image", content: "https://preemie.vercel.app/og/og-pma.png" },
      { name: "twitter:image:alt", content: "Postmenstrual age calculator for preterm babies" },
      { property: "og:image:alt", content: "Postmenstrual age calculator for preterm babies" },
    ],
    links: [{ rel: "canonical", href: "https://preemie.vercel.app/pma-calculator" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: "Postmenstrual Age (PMA) Calculator for Preterm Babies",
          description:
            "PMA calculator for preterm babies, showing postmenstrual age alongside corrected age and chronological age.",
          url: "https://preemie.vercel.app/pma-calculator",
          datePublished: "2026-08-26",
          dateModified: "2026-08-27",
          lastReviewed: "2026-08-27",
          audience: {
            "@type": "MedicalAudience",
            audienceType: "Parents and clinicians following preterm infants",
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
          "@type": "WebApplication",
          name: "AdjustedAge PMA Calculator",
          applicationCategory: "HealthApplication",
          operatingSystem: "Any",
          url: "https://preemie.vercel.app/pma-calculator",
          image: "https://preemie.vercel.app/og/og-pma.png",
          description:
            "Free PMA calculator for premature babies, with corrected age, chronological age and milestone follow-up support.",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          creator: { "@id": "https://preemie.vercel.app/about#drzeeshan" },
          reviewer: { "@id": "https://preemie.vercel.app/about#drzeeshan" },
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
              name: "What is postmenstrual age (PMA)?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Postmenstrual age is gestational age at birth plus the time since birth. It is especially useful before the original due date and in early neonatal follow-up.",
              },
            },
            {
              "@type": "Question",
              name: "Is PMA the same as corrected age?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Corrected age counts from the due date. PMA adds the baby's gestational age at birth to the time since birth.",
              },
            },
            {
              "@type": "Question",
              name: "When is PMA more useful than corrected age?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "PMA is often the more clinically useful number before term-equivalent age and in the earlier neonatal period.",
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
              name: "PMA Calculator",
              item: "https://preemie.vercel.app/pma-calculator",
            },
          ],
        }),
      },
    ],
  }),
  component: PmaCalculatorPage,
});

function PmaCalculatorPage() {
  return (
    <SiteLayout>
      <Breadcrumbs items={[{ to: "/", label: "Home" }, { label: "PMA calculator" }]} />

      <PageHeader
        eyebrow="Clinician-friendly age check"
        title="Postmenstrual age (PMA) calculator for preterm babies"
        intro="If your baby is still before the original due date, or you are checking an early NICU follow-up note, PMA is often the number clinicians really mean. This page calculates PMA alongside corrected age and chronological age so the terms do not get mixed up."
      />

      <div className="mt-10">
        <CorrectedAgeTool />
      </div>

      <KeyTakeaways
        items={[
          "PMA = gestational age at birth plus time since birth.",
          "Corrected age is different: it counts from the due date, not from conceptional age.",
          "Before term-equivalent age, PMA is often more useful than corrected age for clinical conversations.",
          "The tool on this page also shows corrected age and chronological age so you can compare all three numbers at once.",
        ]}
      />

      <Article>
        <h2>What PMA means</h2>
        <p>
          <strong>Postmenstrual age (PMA)</strong> is the baby&apos;s gestational age at birth plus
          the time that has passed since birth. So if a baby was born at 30 weeks and is now 4 weeks
          old by the calendar, the PMA is 34 weeks.
        </p>
        <p>
          PMA is especially useful in the NICU and early follow-up because many clinical decisions
          in very small babies are framed that way. Before the due date, corrected age is negative,
          while PMA still moves forward in a way that is easier for neonatal teams to use.
        </p>

        <h2>PMA vs corrected age vs chronological age</h2>
        <ul>
          <li>
            <strong>Chronological age:</strong> time since birth.
          </li>
          <li>
            <strong>Corrected age:</strong> chronological age minus the weeks of prematurity.
          </li>
          <li>
            <strong>PMA:</strong> gestational age at birth plus chronological age.
          </li>
        </ul>
        <p>
          These numbers answer different questions. PMA is common in early neonatal documentation.
          Corrected age becomes more intuitive after term when you are reading developmental
          milestones or discussing follow-up timing with parents.
        </p>

        <h2>When PMA matters most</h2>
        <p>
          PMA is most useful before <strong>term-equivalent age</strong> and in the earlier weeks
          after discharge. If your baby was born extremely or very preterm, you will often see PMA
          in clinic letters, scan timing, hearing follow-up and growth discussions.
        </p>
        <p>
          Once the baby is further past the due date, parents usually find corrected age easier to
          use for milestones and the <Link to="/premature-baby-milestones">milestone chart</Link>.
        </p>
        <p>
          If you want to see how PMA fits beside the other age labels, compare them on the{" "}
          <Link to="/adjusted-age-vs-chronological-age">
            adjusted age vs chronological age guide
          </Link>
          . If you are trying to understand where PMA appears in real follow-up, the{" "}
          <Link to="/nicu-follow-up-schedule">NICU follow-up schedule</Link> puts it into a typical
          clinic timeline.
        </p>

        <h2>Common PMA questions</h2>
        <h3>Is PMA the same as corrected age?</h3>
        <p>
          No. PMA and corrected age are linked, but they are not the same number. PMA looks forward
          from conceptional maturity; corrected age looks backward from the due date.
        </p>
        <h3>Why is corrected age negative before the due date?</h3>
        <p>
          Because corrected age is counting from term. If the baby has not yet reached the original
          due date, there are still weeks remaining before corrected age reaches zero.
        </p>
        <h3>Should parents track PMA at home?</h3>
        <p>
          Usually PMA matters most in earlier medical follow-up. For everyday developmental
          questions, corrected age is often the easier age to use once the due date has passed.
        </p>

        <h2>Use PMA with the rest of the follow-up toolkit</h2>
        <p>
          After you check PMA here, use the <Link to="/">main corrected age calculator</Link>, read
          the <Link to="/premature-baby-milestones">premature baby milestones chart</Link>, and
          review the <Link to="/red-flags">red flags</Link> that should always override the
          calendar.
        </p>
      </Article>

      <LinkGridSection
        title="Related preemie follow-up pages"
        links={[
          {
            to: "/",
            label: "Corrected age calculator",
            description: "See PMA, corrected age and chronological age together in the main tool.",
          },
          {
            to: "/adjusted-age-calculator",
            label: "Adjusted age calculator",
            description: "Same calculator for the adjusted-age search term and parent wording.",
          },
          {
            to: "/adjusted-age-vs-chronological-age",
            label: "Adjusted age vs chronological age",
            description: "Compare PMA, corrected age and chronological age on one reference page.",
          },
          {
            to: "/nicu-follow-up-schedule",
            label: "NICU follow-up schedule",
            description: "See where PMA and corrected age usually appear in a clinic timeline.",
          },
          {
            to: "/how-to-calculate-corrected-age",
            label: "How to calculate corrected age",
            description: "Review the full formulas and worked examples step by step.",
          },
          {
            to: "/preemie-weight-gain",
            label: "Preemie weight gain calculator",
            description: "Check grams per day and g/kg/day between two follow-up visits.",
          },
          {
            to: "/preemie-vaccines",
            label: "Preemie vaccines guide",
            description: "See why vaccine timing uses chronological age, not corrected age.",
          },
          {
            to: "/methodology",
            label: "Methodology and references",
            description: "See the definitions, formulas and limits behind the age calculations.",
          },
        ]}
      />
    </SiteLayout>
  );
}
