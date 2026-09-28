import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Article,
  Breadcrumbs,
  LinkGridSection,
  PageHeader,
  SiteLayout,
} from "@/components/SiteLayout";

export const Route = createFileRoute("/how-to-calculate-corrected-age")({
  head: () => ({
    meta: [
      { title: "How to Calculate Corrected Age for a Preemie | AdjustedAge" },
      {
        name: "description",
        content:
          "Corrected age = chronological age minus weeks of prematurity, worked through for 28, 34 and 36 weeks plus the usual mistakes. Reviewed by Dr. Zeeshan Islam.",
      },
      {
        property: "og:title",
        content: "How to Calculate Corrected Age for a Preemie | AdjustedAge",
      },
      {
        property: "og:description",
        content:
          "Corrected age = chronological age minus weeks of prematurity, worked through for 28, 34 and 36 weeks plus the usual mistakes. Reviewed by Dr. Zeeshan Islam.",
      },
      { property: "og:url", content: "https://preemie.vercel.app/how-to-calculate-corrected-age" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "https://preemie.vercel.app/og/og-guides.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "AdjustedAge" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "How to Calculate Corrected Age for a Preemie | AdjustedAge",
      },
      {
        name: "twitter:description",
        content:
          "Corrected age = chronological age minus weeks of prematurity, worked through for 28, 34 and 36 weeks plus the usual mistakes. Reviewed by Dr. Zeeshan Islam.",
      },
      { name: "twitter:image", content: "https://preemie.vercel.app/og/og-guides.png" },
      { name: "twitter:image:alt", content: "Corrected age formula for premature babies" },
      { property: "og:image:alt", content: "Corrected age formula for premature babies" },
      { name: "article:published_time", content: "2026-08-11T00:00:00Z" },
      { name: "article:modified_time", content: "2026-08-27T00:00:00Z" },
    ],
    links: [
      { rel: "canonical", href: "https://preemie.vercel.app/how-to-calculate-corrected-age" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "How to Calculate Corrected Age for Premature Babies",
          description:
            "The corrected age formula with four worked examples and the common mistakes clinicians and parents make.",
          url: "https://preemie.vercel.app/how-to-calculate-corrected-age",
          datePublished: "2026-08-11",
          dateModified: "2026-08-27",
          author: {
            "@id": "https://preemie.vercel.app/about#drzeeshan",
          },
          publisher: {
            "@type": "Organization",
            name: "AdjustedAge",
            logo: {
              "@type": "ImageObject",
              url: "https://preemie.vercel.app/icon-512.png",
            },
          },
          citation: [
            {
              "@type": "WebPage",
              name: "Preterm birth — World Health Organization",
              url: "https://www.who.int/news-room/fact-sheets/detail/preterm-birth",
            },
            {
              "@type": "WebPage",
              name: "Learn the Signs. Act Early. — CDC developmental milestones",
              url: "https://www.cdc.gov/actearly/",
            },
            {
              "@type": "Article",
              name: "Evidence-Informed Milestones for Developmental Surveillance Tools (Zubler et al., 2022)",
              url: "https://doi.org/10.1542/peds.2021-052138",
            },
            {
              "@type": "WebPage",
              name: "Child and Adolescent Immunization Schedule by Age — CDC",
              url: "https://www.cdc.gov/vaccines/hcp/imz-schedules/",
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to Calculate Corrected Age",
          description:
            "Corrected age = chronological age minus weeks of prematurity. Four worked examples.",
          totalTime: "PT2M",
          step: [
            {
              "@type": "HowToStep",
              name: "Calculate weeks of prematurity",
              text: "Subtract gestational age at birth from 40 weeks. Example: 40 − 28 = 12 weeks premature.",
            },
            {
              "@type": "HowToStep",
              name: "Subtract from chronological age",
              text: "Corrected age = chronological age − weeks of prematurity. Example: 6 months − 12 weeks = 3 months corrected.",
            },
            {
              "@type": "HowToStep",
              name: "Use corrected age for milestones",
              text: "Read the CDC milestone row matching the corrected age, not the birthday age.",
            },
          ],
          author: {
            "@id": "https://preemie.vercel.app/about#drzeeshan",
          },
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
              name: "Do you correct a premature baby’s vaccine schedule?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Immunisations are scheduled by chronological age. Corrected age is used for many developmental conversations, not to delay vaccines.",
              },
            },
            {
              "@type": "Question",
              name: "What if corrected age is negative?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Before the original due date, corrected age can be below zero. The tool displays that value and also shows postmenstrual age.",
              },
            },
            {
              "@type": "Question",
              name: "When should corrected-age calculations stop?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Developmental correction is commonly used until about 24 months, with domain-specific variation.",
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
              name: "How to Calculate Corrected Age",
              item: "https://preemie.vercel.app/how-to-calculate-corrected-age",
            },
          ],
        }),
      },
    ],
  }),
  component: HowToPage,
});

function HowToPage() {
  return (
    <SiteLayout>
      <Breadcrumbs
        items={[{ to: "/", label: "Home" }, { label: "How to calculate corrected age" }]}
      />
      <PageHeader
        eyebrow="Worked examples"
        title="How to calculate corrected age"
        intro="The arithmetic in full, so you can check the tool rather than trust it."
      />
      <Article>
        <h2>The formula</h2>
        <p>
          <strong>Weeks of prematurity = 40 weeks − gestational age at birth.</strong>
          <br />
          <strong>Corrected age = chronological age − weeks of prematurity.</strong>
        </p>
        <p>
          Stated in one line:{" "}
          <strong>corrected age = chronological age − (40 weeks − gestational age at birth)</strong>
          . Forty weeks is 280 days, and it is the reference length of a full-term pregnancy;
          anything before 37 completed weeks counts as preterm under the{" "}
          <a
            href="https://www.who.int/news-room/fact-sheets/detail/preterm-birth"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4"
          >
            World Health Organization&apos;s preterm birth definition
          </a>
          . The gap between those numbers — 40 weeks minus the gestational age the baby actually
          reached — is the fixed amount you subtract for the whole of the child&apos;s early
          follow-up. It never changes; only the chronological age keeps moving.
        </p>
        <p>
          Everything below is worked out in days and converted at the end, which avoids the rounding
          errors you get from working in whole months.
        </p>

        <h3>Worked example 1 — 28 weeks, now 6 months old</h3>
        <ul>
          <li>
            Prematurity: 280 − (28 × 7) = 280 − 196 = <strong>84 days (12 weeks)</strong>
          </li>
          <li>Chronological age: 6 months = about 183 days</li>
          <li>
            Corrected age: 183 − 84 = 99 days = <strong>about 3 months 8 days</strong>
          </li>
        </ul>
        <p>
          This baby&apos;s first birthday cake is six months away, but developmentally you should be
          reading the{" "}
          <a
            href="https://www.cdc.gov/actearly/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4"
          >
            4-month milestone row
          </a>{" "}
          soon, not the 6-month row — and that milestone set itself comes from the{" "}
          <a
            href="https://doi.org/10.1542/peds.2021-052138"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4"
          >
            2022 evidence-informed milestones review in Pediatrics
          </a>
          .
        </p>

        <h3>Worked example 2 — 34+3 weeks, now 10 weeks old</h3>
        <ul>
          <li>GA in days: (34 × 7) + 3 = 241</li>
          <li>
            Prematurity: 280 − 241 = <strong>39 days</strong>
          </li>
          <li>Chronological: 70 days</li>
          <li>
            Corrected: 70 − 39 = <strong>31 days, about 4½ weeks</strong>
          </li>
        </ul>
        <p>
          Late preterm correction is the one most often skipped. At this age it more than halves the
          expected developmental age — which is exactly why the{" "}
          <Link to="/late-preterm-baby">late preterm baby guide</Link> exists and why{" "}
          <Link to="/when-to-stop-correcting">stopping too early</Link> causes unnecessary
          referrals.
        </p>

        <h3>Worked example 3 — 25 weeks, still before the due date</h3>
        <ul>
          <li>
            Prematurity: 280 − 175 = <strong>105 days</strong>
          </li>
          <li>Chronological: 60 days</li>
          <li>
            Corrected: 60 − 105 = <strong>−45 days</strong>, i.e. 6 weeks 3 days before term
          </li>
          <li>
            Postmenstrual age: 25 weeks + 60 days = <strong>33+4 weeks PMA</strong>
          </li>
        </ul>
        <p>
          Before term-equivalent age, corrected age is negative and PMA is the number clinicians
          actually use. The tool shows both. The same two inputs read a discharge note in reverse: a
          baby born at 29+2 weeks who is 5 weeks old today is 29+2 + 5 weeks ={" "}
          <strong>34+2 weeks PMA</strong>, and that is the figure the clinic will quote at that
          visit.
        </p>

        <h3>Worked example 4 — 36 weeks, now 12 weeks old</h3>
        <ul>
          <li>GA in days: 36 × 7 = 252</li>
          <li>
            Prematurity: 280 − 252 = <strong>28 days (4 weeks)</strong>
          </li>
          <li>Chronological: 12 weeks = 84 days</li>
          <li>
            Corrected: 84 − 28 = <strong>56 days = 8 weeks corrected</strong>
          </li>
        </ul>
        <p>
          A 36-week birth sits in the{" "}
          <a
            href="https://www.who.int/news-room/fact-sheets/detail/preterm-birth"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4"
          >
            moderate to late preterm band
          </a>{" "}
          — the case most often dismissed, because the baby looks term at birth. Twelve weeks after
          delivery the four-week gap is still a third of the baby&apos;s life, so the milestone row
          you should read is the 2-month one, not the row implied by 12 weeks of calendar age.
          Skipping this example is how a healthy late-preterm baby gets compared with the wrong
          calendar.
        </p>

        <h2>Common questions about corrected age</h2>
        <h3>Do you correct a premature baby’s vaccine schedule?</h3>
        <p>
          No. Immunisations are scheduled by chronological age. Corrected age is used for many
          developmental conversations, not to delay vaccines.
        </p>
        <h3>What if corrected age is negative?</h3>
        <p>
          Before the original due date, corrected age can be below zero. The tool displays that
          value and also shows postmenstrual age, which is the clinically useful age before
          term-equivalent age.
        </p>
        <h3>When should corrected-age calculations stop?</h3>
        <p>
          Developmental correction is commonly used until about 24 months, with domain-specific
          variation. See <Link to="/when-to-stop-correcting">when to stop correcting</Link> for the
          full explanation.
        </p>

        <h2>The mistakes that actually happen</h2>
        <ul>
          <li>
            <strong>Using 9 months instead of 40 weeks.</strong> Nine calendar months is 273–276
            days depending on the months involved. Use 280.
          </li>
          <li>
            <strong>Using 37 weeks as the reference.</strong> 37 weeks is the threshold below which
            a birth counts as{" "}
            <a
              href="https://www.who.int/news-room/fact-sheets/detail/preterm-birth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              preterm
            </a>
            , not the length of a full-term pregnancy. Subtracting 37 instead of 40 under-corrects
            by three weeks every single time.
          </li>
          <li>
            <strong>Correcting immunisations.</strong> Vaccines are given by chronological age, as
            the{" "}
            <a
              href="https://www.cdc.gov/vaccines/hcp/imz-schedules/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              CDC immunization schedule by age
            </a>{" "}
            makes explicit. Correcting delays protection in the most vulnerable infants.
          </li>
          <li>
            <strong>Swapping PMA for corrected age.</strong> PMA starts at gestational age at birth
            and only ever rises; corrected age starts negative and reaches zero at the due date.
            They answer different questions — see the{" "}
            <Link to="/pma-calculator">PMA calculator</Link> for the distinction.
          </li>
          <li>
            <strong>Rounding gestational age down to whole weeks.</strong> 34+6 is nearly a week
            different from 34+0.
          </li>
          <li>
            <strong>Forgetting to recalculate.</strong> The gap in weeks is fixed; the proportion of
            the child&apos;s life it represents shrinks every month, which is exactly why{" "}
            <Link to="/when-to-stop-correcting">correction stops being used</Link> later on.
          </li>
        </ul>
        <p>
          A quick check on your own answer: corrected age must always be smaller than chronological
          age for a baby born early, and the difference between the two must equal exactly (40 weeks
          − gestational age at birth) for ever. If a clinic&apos;s number differs from yours by more
          than a few days, the usual causes are a rounded gestational age, a due date recalculated
          from an early scan, or arithmetic done in months instead of days — all three are worth
          asking about rather than assuming the tool is wrong.
        </p>

        <h2>Related preterm follow-up guides</h2>
        <p>
          Use the <Link to="/">corrected age calculator</Link> for a date-specific result, compare{" "}
          <Link to="/adjusted-age-vs-chronological-age">adjusted age vs chronological age</Link>,
          review a typical <Link to="/nicu-follow-up-schedule">NICU follow-up schedule</Link>, read
          the <Link to="/late-preterm-baby">late preterm baby guide</Link>, review{" "}
          <Link to="/red-flags">red flags</Link>, or inspect the{" "}
          <Link to="/methodology">methodology and sources</Link>.
        </p>
      </Article>

      <LinkGridSection
        title="Continue with the calculator and follow-up pages"
        links={[
          {
            to: "/",
            label: "Corrected age calculator",
            description:
              "Run the dates through the calculator and keep the follow-up record locally.",
          },
          {
            to: "/adjusted-age-calculator",
            label: "Adjusted age calculator",
            description:
              "Same calculation, explained using the adjusted-age terminology many parents search for.",
          },
          {
            to: "/adjusted-age-vs-chronological-age",
            label: "Adjusted age vs chronological age",
            description: "See the most common age labels separated clearly on one page.",
          },
          {
            to: "/late-preterm-baby",
            label: "Late preterm baby guide",
            description: "Use this when a 34- to 36-week baby seems only slightly early on paper.",
          },
          {
            to: "/nicu-follow-up-schedule",
            label: "NICU follow-up schedule",
            description: "See how corrected age gets used across common clinic checkpoints.",
          },
          {
            to: "/premature-baby-milestones",
            label: "Premature baby milestones chart",
            description: "See the printable milestone rows matched to corrected age.",
          },
          {
            to: "/when-to-stop-correcting",
            label: "When to stop correcting",
            description: "Understand when 24 months applies and where the exceptions sit.",
          },
          {
            to: "/red-flags",
            label: "Preemie red flags",
            description: "Know what should trigger a same-day or same-week call.",
          },
        ]}
      />
    </SiteLayout>
  );
}
