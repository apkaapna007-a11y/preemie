import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Article,
  Breadcrumbs,
  KeyTakeaways,
  LinkGridSection,
  PageHeader,
  SiteLayout,
} from "@/components/SiteLayout";

export const Route = createFileRoute("/when-can-my-preemie-start-solids")({
  head: () => ({
    meta: [
      { title: "When Can My Preemie Start Solids? Corrected Age Guide | AdjustedAge" },
      {
        name: "description",
        content:
          "When can a preemie start solids? A corrected-age guide to readiness, timing, feeding safety and the questions to ask your clinician. Reviewed by Dr. Zeeshan Islam.",
      },
      {
        property: "og:title",
        content: "When Can My Preemie Start Solids? Corrected Age Guide | AdjustedAge",
      },
      {
        property: "og:description",
        content:
          "When can a preemie start solids? A corrected-age guide to readiness, timing, feeding safety and the questions to ask your clinician. Reviewed by Dr. Zeeshan Islam.",
      },
      {
        property: "og:url",
        content: "https://preemie.vercel.app/when-can-my-preemie-start-solids",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "https://preemie.vercel.app/og/og-solids.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "AdjustedAge" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "When Can My Preemie Start Solids? Corrected Age Guide | AdjustedAge",
      },
      {
        name: "twitter:description",
        content:
          "A corrected-age guide to starting solids in preterm babies, with readiness signs and safety questions. Reviewed by Dr. Zeeshan Islam.",
      },
      { name: "twitter:image", content: "https://preemie.vercel.app/og/og-solids.png" },
      { name: "twitter:image:alt", content: "When can my preemie start solids guide" },
      { property: "og:image:alt", content: "When can my preemie start solids guide" },
      { name: "article:published_time", content: "2026-08-27T00:00:00Z" },
      { name: "article:modified_time", content: "2026-08-27T00:00:00Z" },
    ],
    links: [
      { rel: "canonical", href: "https://preemie.vercel.app/when-can-my-preemie-start-solids" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: "When Can My Preemie Start Solids?",
          description:
            "Guide to starting solids in preterm babies, using corrected age together with developmental readiness and feeding safety.",
          url: "https://preemie.vercel.app/when-can-my-preemie-start-solids",
          image: "https://preemie.vercel.app/og/og-solids.png",
          datePublished: "2026-08-27",
          dateModified: "2026-08-27",
          lastReviewed: "2026-08-27",
          audience: {
            "@type": "MedicalAudience",
            audienceType: "Parents of preterm infants beginning complementary feeding",
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
              name: "Should preemies start solids by corrected age or chronological age?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Corrected age is often part of the discussion, but solids should not be decided by the calendar alone. Developmental readiness and the baby's own clinical history matter too.",
              },
            },
            {
              "@type": "Question",
              name: "What signs show a preterm baby may be ready for solids?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Useful signs include better head control, ability to stay supported upright, interest in food and reduced tongue-thrusting. A baby's clinician should confirm readiness if there are feeding or developmental concerns.",
              },
            },
            {
              "@type": "Question",
              name: "Can a preemie who looks interested in food start early?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Interest alone is not enough. Feeding safety, maturity, motor readiness and the baby's medical history all matter.",
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
              name: "When Can My Preemie Start Solids",
              item: "https://preemie.vercel.app/when-can-my-preemie-start-solids",
            },
          ],
        }),
      },
    ],
  }),
  component: PreemieSolidsPage,
});

function PreemieSolidsPage() {
  return (
    <SiteLayout>
      <Breadcrumbs
        items={[{ to: "/", label: "Home" }, { label: "When can my preemie start solids" }]}
      />

      <PageHeader
        eyebrow="Complementary feeding"
        title="When can my preemie start solids?"
        intro="This question sounds simple, but premature babies do not fit a one-number answer. Corrected age matters, developmental readiness matters, and feeding safety matters. The safest answer is to use all three together."
      />

      <KeyTakeaways
        items={[
          "Corrected age often matters when discussing solids in a preterm baby, but the calendar is not the whole decision.",
          "Head control, upright stability, interest in food and feeding safety matter as much as age.",
          "A baby with reflux, swallowing difficulty, chronic lung disease or major oral aversion may need a more individual plan.",
          "If you are unsure, ask your paediatrician or feeding team before introducing solids.",
        ]}
      />

      <Article>
        <h2>The short answer</h2>
        <p>
          Many preterm feeding decisions are discussed using <strong>corrected age</strong>, but
          solids should not be started by a date alone. The baby also needs the right developmental
          signs and enough feeding stability for solids to be introduced safely.
        </p>

        <h2>Why corrected age matters for solids</h2>
        <p>
          A baby born early may be several weeks behind a term-born baby of the same birthday in
          head control, trunk stability and oral-motor maturity. That is why corrected age is often
          more meaningful than chronological age when thinking about readiness for complementary
          feeding.
        </p>
        <p>
          Use the <Link to="/">corrected age calculator</Link> first if you are not sure which age
          you should be thinking in.
        </p>

        <h2>Readiness signs matter as much as the calendar</h2>
        <ul>
          <li>Good enough head control to stay upright safely</li>
          <li>Ability to sit with support and maintain position</li>
          <li>Interest in food and watching others eat</li>
          <li>Less tongue-thrusting of everything back out</li>
          <li>Reasonable feeding stability with milk feeds already established</li>
        </ul>
        <p>
          These signs do not replace medical advice, but they explain why two babies with the same
          corrected age may not be equally ready.
        </p>

        <h2>When the answer is more individual</h2>
        <p>
          Some preemies need more tailored advice: babies with swallowing difficulty, aspiration
          risk, significant reflux, chronic lung disease, tube feeding history or marked oral
          aversion. In those situations, the question is not simply &ldquo;when do solids
          start?&rdquo; but &ldquo;what is the safest feeding plan for this baby?&rdquo;
        </p>

        <h2>What parents should not do</h2>
        <ul>
          <li>Do not use interest in food alone as proof of readiness.</li>
          <li>
            Do not assume a late preterm baby should follow full-term advice without correction.
          </li>
          <li>Do not reduce milk feeds abruptly because solids have started.</li>
          <li>Do not ignore coughing, choking, wet-sounding feeds or distress with swallowing.</li>
        </ul>

        <h2>Questions parents often ask</h2>
        <h3>Should I use corrected age or chronological age?</h3>
        <p>
          Corrected age is often more useful in preterm feeding discussions, but solids should still
          be based on readiness and the baby&apos;s individual history as well.
        </p>
        <h3>My baby looks interested in food. Is that enough?</h3>
        <p>No. Interest helps, but head control, posture and safe swallowing matter too.</p>
        <h3>What if my baby was late preterm?</h3>
        <p>
          A late preterm baby may still need corrected-age thinking in the first year. See the
          <Link to="/late-preterm-baby">late preterm baby guide</Link>.
        </p>

        <h2>Use this page with the rest of the follow-up toolkit</h2>
        <p>
          Start with corrected age, then look at milestones, weight gain and any red flags. This is
          one reason the site keeps <Link to="/preemie-weight-gain">weight gain</Link>,
          <Link to="/premature-baby-milestones"> milestones</Link> and{" "}
          <Link to="/red-flags">safety guidance</Link> together instead of treating feeding as a
          separate topic.
        </p>
      </Article>

      <LinkGridSection
        title="Related feeding and development pages"
        links={[
          {
            to: "/",
            label: "Corrected age calculator",
            description: "Check corrected age before thinking about solids or milestones.",
          },
          {
            to: "/adjusted-age-vs-chronological-age",
            label: "Adjusted age vs chronological age",
            description:
              "See which age matters for feeding, vaccines and developmental expectations.",
          },
          {
            to: "/late-preterm-baby",
            label: "Late preterm baby guide",
            description:
              "Understand why a 35- or 36-week baby may still need corrected-age thinking.",
          },
          {
            to: "/preemie-weight-gain",
            label: "Preemie weight gain calculator",
            description: "Track interval growth if feeding quantity or efficiency is a concern.",
          },
          {
            to: "/premature-baby-milestones",
            label: "Premature baby milestones chart",
            description: "Check motor readiness in the wider developmental context.",
          },
          {
            to: "/red-flags",
            label: "Preemie red flags",
            description:
              "Know when coughing, choking or poor feeding should prompt medical review.",
          },
        ]}
      />
    </SiteLayout>
  );
}
