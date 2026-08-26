import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Article,
  Breadcrumbs,
  LinkGridSection,
  PageHeader,
  SiteLayout,
} from "@/components/SiteLayout";

export const Route = createFileRoute("/methodology")({
  head: () => ({
    meta: [
      { title: "Corrected Age Methodology, PMA & References | AdjustedAge" },
      {
        name: "description",
        content:
          "Technical methodology for AdjustedAge: corrected-age formula, PMA logic, milestone sources, growth-chart standards and editorial review policy. Reviewed by Dr. Zeeshan Islam.",
      },
      {
        property: "og:title",
        content: "Corrected Age Methodology, PMA & References | AdjustedAge",
      },
      {
        property: "og:description",
        content:
          "Technical methodology for AdjustedAge: corrected-age formula, PMA logic, milestone sources, growth-chart standards and editorial review policy. Reviewed by Dr. Zeeshan Islam.",
      },
      { property: "og:url", content: "https://preemie.vercel.app/methodology" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "https://preemie.vercel.app/og/og-guides.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "AdjustedAge" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Corrected Age Methodology, PMA & References | AdjustedAge",
      },
      {
        name: "twitter:description",
        content:
          "Technical methodology for AdjustedAge: corrected-age formula, PMA logic, milestone sources, growth-chart standards and editorial review policy. Reviewed by Dr. Zeeshan Islam.",
      },
      { name: "twitter:image", content: "https://preemie.vercel.app/og/og-guides.png" },
      { name: "twitter:image:alt", content: "AdjustedAge formulas and clinical references" },
      { property: "og:image:alt", content: "AdjustedAge formulas and clinical references" },
      { name: "article:published_time", content: "2026-08-11T00:00:00Z" },
      { name: "article:modified_time", content: "2026-08-27T00:00:00Z" },
    ],
    links: [{ rel: "canonical", href: "https://preemie.vercel.app/methodology" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: "Corrected Age Methodology, PMA & References",
          description:
            "Technical reference page documenting corrected-age arithmetic, PMA logic, milestone sources, growth-chart standards and editorial limits used on AdjustedAge.",
          url: "https://preemie.vercel.app/methodology",
          image: "https://preemie.vercel.app/og/og-guides.png",
          datePublished: "2026-08-11",
          dateModified: "2026-08-27",
          lastReviewed: "2026-08-27",
          audience: {
            "@type": "MedicalAudience",
            audienceType: "Parents and clinicians reviewing preterm follow-up methods",
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
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What corrected-age formula does AdjustedAge use?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Corrected age = chronological age minus prematurity, where prematurity = 280 days minus gestational age in days. All arithmetic is done in whole days with UTC-normalised dates.",
              },
            },
            {
              "@type": "Question",
              name: "Why does the calculator use 280 days and UTC-normalised dates?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Forty weeks is defined as 280 days, which avoids the error of treating term as nine calendar months. UTC-normalised dates prevent daylight-saving and timezone shifts from moving the answer by a day.",
              },
            },
            {
              "@type": "Question",
              name: "Is this page the same as the worked corrected-age examples page?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. The worked-examples page teaches parents how to calculate corrected age manually. This methodology page documents implementation choices, source selection, limitations and editorial policy.",
              },
            },
            {
              "@type": "Question",
              name: "Why does the site mention both Fenton and INTERGROWTH-21st?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Because they are not interchangeable. Fenton 2013 is a descriptive preterm growth reference, while INTERGROWTH-21st is a prescriptive standard. They can disagree, especially at earlier PMAs, so the distinction needs to be stated explicitly.",
              },
            },
            {
              "@type": "Question",
              name: "Do vaccines ever use corrected age in this methodology?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Routine immunisations are interpreted by chronological age, not corrected age.",
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
              name: "Methodology",
              item: "https://preemie.vercel.app/methodology",
            },
          ],
        }),
      },
    ],
  }),
  component: MethodologyPage,
});

const SOURCES = [
  {
    source: "AAP / HealthyChildren corrected-age guidance",
    year: "current",
    role: "Convention for correcting to about 2 years",
    limit: "A convention, not a rule; practice varies 18–36 months by domain",
  },
  {
    source:
      "Zubler JM, Whitaker TM, et al. Pediatrics 2022;149(3):e2021052138 (summary: Am Fam Physician 2022;106(4):370-371)",
    year: "2022",
    role: "Milestone content used on this site",
    limit: "Surveillance prompts, explicitly NOT a validated screening instrument",
  },
  {
    source: "Fenton TR, Kim JH. BMC Pediatrics 2013;13:59 (PMID 23601190)",
    year: "2013",
    role: "22–50 week preterm growth reference",
    limit: "A descriptive reference of how preterm infants grew, not a prescriptive standard",
  },
  {
    source:
      "Villar J, et al. INTERGROWTH-21st. Lancet Glob Health 2015;3(11):e681-e691 (PMID 26475015)",
    year: "2015",
    role: "Postnatal growth standard for preterm infants",
    limit: "Disagrees with Fenton at the margins, particularly below 33 weeks PMA",
  },
  {
    source: "AAP Preterm Infant Growth Tools",
    year: "current",
    role: "Endorses both charts",
    limit: "Links out to charts; hosts no calculator",
  },
  {
    source: "WHO Child Growth Standards",
    year: "2006",
    role: "Growth after term-equivalent age",
    limit: "Derived from term infants; a documented hand-off rule is required",
  },
];

function MethodologyPage() {
  return (
    <SiteLayout>
      <Breadcrumbs items={[{ to: "/", label: "Home" }, { label: "Methodology" }]} />
      <PageHeader
        eyebrow="Technical reference page"
        title="Corrected age methodology, PMA and references"
        intro="This page is the technical manual for AdjustedAge. It is not the quick parent guide. It documents the exact arithmetic, the source set behind milestones, the growth-chart decisions that are still being handled carefully, and the editorial rules used for a YMYL medical tool."
      />
      <Article>
        <h2>What this page is for</h2>
        <p>
          Most parent-facing pages answer a practical question: how to calculate corrected age, when
          to stop correcting, whether vaccines use chronological age, or when to worry. This page
          does something different. It explains <strong>how the site itself is built</strong>, what
          sources were chosen, what has been left out on purpose, and what assumptions are used when
          the calculator gives an answer.
        </p>
        <p>
          If you want the plain-English arithmetic first, go to the{" "}
          <Link to="/how-to-calculate-corrected-age">worked corrected-age examples page</Link>. If
          you want the site&apos;s implementation details and editorial rules, stay here.
        </p>

        <h2>The arithmetic, exactly as implemented</h2>
        <ul>
          <li>All internal calculation is in whole days. Term is defined as 280 days (40+0).</li>
          <li>Gestational age at birth (days) = weeks × 7 + days.</li>
          <li>
            Chronological age (days) = visit date − date of birth, using UTC-normalised dates so
            daylight saving cannot shift a result by a day.
          </li>
          <li>Prematurity (days) = max(0, 280 − gestational age in days).</li>
          <li>
            Corrected age (days) = chronological age − prematurity. It is negative before the
            original due date, and is displayed that way rather than clamped to zero.
          </li>
          <li>Postmenstrual age (days) = gestational age at birth + chronological age.</li>
          <li>
            Display conversion uses 30.4375 days per month. Weeks and days are shown below 12 weeks,
            where rounding to months would be misleading.
          </li>
        </ul>

        <h2>Why 280 days and UTC-normalised dates are explicit choices</h2>
        <p>
          Many corrected-age explanations quietly introduce avoidable error. The two most common are
          treating term as “nine months” and letting browser timezone behaviour shift a date math
          result by one day. This site makes both choices explicit.
        </p>
        <ul>
          <li>
            <strong>Term is 280 days, not “9 months”.</strong> Nine calendar months is shorter than
            40 weeks in most month combinations.
          </li>
          <li>
            <strong>Dates are normalised before subtraction.</strong> That prevents daylight-saving
            changes, locale parsing quirks and timezone offsets from altering the clinical result.
          </li>
          <li>
            <strong>Negative corrected age is shown, not hidden.</strong> Before the due date, the
            honest output is a negative corrected age plus a positive PMA.
          </li>
        </ul>

        <h2>Where the milestone content comes from</h2>
        <p>
          The milestone prompts on this site are based on the 2022 CDC/AAP revision to developmental
          surveillance checklists. They are used here as <strong>conversation prompts</strong>, not
          as a screen, diagnosis or score. That distinction matters, because parents often encounter
          milestone content online that looks definitive when it is not.
        </p>
        <p>
          To see how the milestone rows are applied after the age calculation, open the{" "}
          <Link to="/premature-baby-milestones">premature baby milestones chart</Link>. To see when
          the site treats concern as more important than the calendar, open the{" "}
          <Link to="/red-flags">preemie red flags page</Link>.
        </p>

        <h2>Sources</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="border-b border-border py-2 pr-4">Source</th>
                <th className="border-b border-border py-2 pr-4">Year</th>
                <th className="border-b border-border py-2 pr-4">Role here</th>
                <th className="border-b border-border py-2">Limitation</th>
              </tr>
            </thead>
            <tbody>
              {SOURCES.map((s) => (
                <tr key={s.source} className="align-top">
                  <td className="border-b border-border py-3 pr-4">{s.source}</td>
                  <td className="border-b border-border py-3 pr-4">{s.year}</td>
                  <td className="border-b border-border py-3 pr-4">{s.role}</td>
                  <td className="border-b border-border py-3">{s.limit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Fenton versus INTERGROWTH-21st</h2>
        <p>
          These two references disagree, and many tools quietly choose one without telling the user.
          AdjustedAge does not treat them as interchangeable. Fenton 2013 is a meta-analytic{" "}
          <em>reference</em> describing how preterm infants have actually grown, including those who
          grew poorly. INTERGROWTH-21st is a prescriptive <em>standard</em> describing how healthy
          preterm infants under optimal conditions grow.
        </p>
        <p>
          A baby can sit on the 15th Fenton centile and below the 3rd INTERGROWTH centile at the
          same moment, and neither number is automatically wrong. That is why growth-chart plotting
          is treated more cautiously than a simple corrected-age calculator.
        </p>
        <p>
          The current build deliberately waits to ship chart plotting until the presentation, source
          explanation and redistribution questions can all be handled properly. In other words, this
          page records not only what the site does, but what it refuses to simplify inaccurately.
        </p>

        <h2>Editorial review and correction policy</h2>
        <p>
          This site is reviewed by Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics). Medical review here
          means more than adding a name to the footer. It means formulas, milestone framing, growth
          terminology and safety language are checked for clinical plausibility before publication.
        </p>
        <p>
          If a formula, citation or clinical statement is found to be wrong, the correction belongs
          on this page because this page is the site&apos;s public record of its rules. That makes
          it different from the parent guides, which explain <em>what</em> to do, while this page
          explains <em>why the site says it</em>.
        </p>

        <h2>What this tool deliberately will not do</h2>
        <ul>
          <li>It will not return a pass, fail, score or percentile-of-development.</li>
          <li>It will not tell you your baby is fine. No tool can know that.</li>
          <li>
            It will not suppress the &ldquo;act early&rdquo; concerns at any age, in any state.
          </li>
          <li>It will not take formula-industry or infant-nutrition sponsorship.</li>
          <li>
            It will not send your data anywhere. Entries live in your browser&apos;s local storage
            and can be cleared by clearing site data.
          </li>
        </ul>

        <h2>How this page differs from the worked formula guide</h2>
        <p>
          The <Link to="/how-to-calculate-corrected-age">worked formula page</Link> exists for a
          parent or clinician who wants to understand the arithmetic with examples. This methodology
          page exists for someone asking a different question:{" "}
          <strong>
            what assumptions does this website make, and are they stated clearly enough to trust?
          </strong>
        </p>
        <p>
          The answer covers implementation details, source provenance, growth-chart standards,
          editorial limits and review policy — topics that do not belong in a basic how-to page.
        </p>

        <h2>Use the methodology with the calculator</h2>
        <p>
          Start with the <Link to="/">corrected age calculator</Link>, then use the{" "}
          <Link to="/premature-baby-milestones">premature baby milestone chart</Link> for
          surveillance prompts. The{" "}
          <Link to="/how-to-calculate-corrected-age">worked examples</Link>
          explain the arithmetic, <Link to="/when-to-stop-correcting">when to stop correcting</Link>
          explains the domain-specific endpoints, and <Link to="/red-flags">red flags</Link>
          explains when the calendar should stop being the main question.
        </p>
      </Article>

      <LinkGridSection
        title="Pages this methodology supports"
        links={[
          {
            to: "/",
            label: "Corrected age calculator",
            description:
              "See the formulas translated into the live calculator and follow-up workflow.",
          },
          {
            to: "/how-to-calculate-corrected-age",
            label: "How to calculate corrected age",
            description: "Use the parent-friendly formula page for manual arithmetic and examples.",
          },
          {
            to: "/adjusted-age-vs-chronological-age",
            label: "Adjusted age vs chronological age",
            description: "See how the site's age definitions map to milestones, vaccines and PMA.",
          },
          {
            to: "/premature-baby-milestones",
            label: "Premature baby milestones chart",
            description: "See how the corrected-age result changes milestone interpretation.",
          },
          {
            to: "/when-to-stop-correcting",
            label: "When to stop correcting",
            description:
              "Read how correction endpoints differ for development, growth and vaccines.",
          },
          {
            to: "/nicu-follow-up-schedule",
            label: "NICU follow-up schedule",
            description: "See where corrected age and PMA are used across common follow-up visits.",
          },
          {
            to: "/about",
            label: "About the author",
            description:
              "Review the clinical reviewer, credentials and editorial policy behind the site.",
          },
        ]}
      />
    </SiteLayout>
  );
}
