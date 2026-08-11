import { createFileRoute } from "@tanstack/react-router";
import { Article, PageHeader, SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/methodology")({
  head: () => ({
    meta: [
      { title: "Methodology, Formulas and References | AdjustedAge" },
      {
        name: "description",
        content:
          "Every formula, source and limitation behind the AdjustedAge corrected age tool, including the Fenton versus INTERGROWTH-21st question. Reviewed by Dr. Zeeshan Islam, MBBS, MCPS.",
      },
      { property: "og:title", content: "Methodology, Formulas and References" },
      {
        property: "og:description",
        content:
          "The arithmetic, the primary sources, the limitations, and what this tool deliberately refuses to do.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
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
    source: "Zubler JM, Whitaker TM, et al. Pediatrics 2022;149(3):e2021052138 (summary: Am Fam Physician 2022;106(4):370-371)",
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
    source: "Villar J, et al. INTERGROWTH-21st. Lancet Glob Health 2015;3(11):e681-e691 (PMID 26475015)",
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
      <PageHeader
        eyebrow="Trust page"
        title="Methodology, formulas and references"
        intro="If you are going to use a number from this site in a clinical note or a conversation with your child's doctor, you should be able to see exactly where it came from."
      />
      <Article>
        <h2>The arithmetic, exactly as implemented</h2>
        <ul>
          <li>All internal calculation is in whole days. Term is defined as 280 days (40+0).</li>
          <li>Gestational age at birth (days) = weeks × 7 + days.</li>
          <li>Chronological age (days) = visit date − date of birth, using UTC-normalised dates so daylight saving cannot shift a result by a day.</li>
          <li>Prematurity (days) = max(0, 280 − gestational age in days).</li>
          <li>Corrected age (days) = chronological age − prematurity. It is negative before the original due date, and is displayed that way rather than clamped to zero.</li>
          <li>Postmenstrual age (days) = gestational age at birth + chronological age.</li>
          <li>Display conversion uses 30.4375 days per month. Weeks and days are shown below 12 weeks, where rounding to months would be misleading.</li>
        </ul>

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
          These two references disagree, and most tools quietly pick one and never mention it.
          Fenton 2013 is a meta-analytic <em>reference</em> describing how preterm infants have
          actually grown, including those who grew poorly. INTERGROWTH-21st is a prescriptive{" "}
          <em>standard</em> describing how healthy preterm infants under optimal conditions grow. A
          baby can sit on the 15th Fenton centile and below the 3rd INTERGROWTH centile at the same
          moment, and neither number is wrong.
        </p>
        <p>
          Growth-chart plotting is on the build roadmap rather than in this release, precisely
          because it must ship showing both curves with that divergence explained, and because the
          redistribution terms for the published LMS coefficient tables must be confirmed in writing
          before the tables are embedded. That confirmation is not yet complete, and shipping the
          feature without it would be the wrong trade.
        </p>

        <h2>What this tool deliberately will not do</h2>
        <ul>
          <li>It will not return a pass, fail, score or percentile-of-development.</li>
          <li>It will not tell you your baby is fine. No tool can know that.</li>
          <li>It will not suppress the &ldquo;act early&rdquo; concerns at any age, in any state.</li>
          <li>It will not take formula-industry or infant-nutrition sponsorship.</li>
          <li>It will not send your data anywhere. Entries live in your browser's local storage and can be cleared by clearing site data.</li>
        </ul>

        <h2>Corrections</h2>
        <p>
          If you find an error in a formula, a citation or a milestone item, it will be corrected and
          the change dated on this page. Clinical accuracy takes precedence over everything else on
          this site.
        </p>
        <p>Last full clinical review: August 2026, by Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics).</p>
      </Article>
    </SiteLayout>
  );
}
