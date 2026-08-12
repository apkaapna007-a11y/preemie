import { createFileRoute, Link } from "@tanstack/react-router";
import { Article, PageHeader, SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/when-to-stop-correcting")({
  head: () => ({
    meta: [
      { title: "When Do You Stop Correcting for Prematurity? | AdjustedAge" },
      {
        name: "description",
        content:
          "Correction is conventionally stopped at 24 months, but the convention varies by domain. What the evidence supports, reviewed by Dr. Zeeshan Islam.",
      },
      { property: "og:title", content: "When Do You Stop Correcting for Prematurity?" },
      {
        property: "og:description",
        content:
          "Two years is a convention, not a rule. Here is what changes at 12, 24 and 36 months corrected, and why growth and development stop at different points.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StopPage,
});

function StopPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="The question nobody answers properly"
        title="When do you stop correcting for prematurity?"
        intro="The usual answer is two years. That answer is a convention, not a finding — and it is applied to domains where it does not fit."
      />
      <Article>
        <h2>The short answer</h2>
        <p>
          For most purposes, correction is applied until <strong>24 months corrected</strong>. By
          then the fixed gap — at most 18 weeks even for an extremely preterm infant — is a small
          enough fraction of the child's life that it stops changing the interpretation.
        </p>

        <h2>Why that is not the whole answer</h2>
        <p>
          The 24-month figure is a practical convention adopted because most developmental
          assessment tools are normed and reported that way. In practice, different things stop at
          different times:
        </p>
        <ul>
          <li>
            <strong>Head circumference:</strong> typically corrected to about 18 months. Head growth
            catches up earliest.
          </li>
          <li>
            <strong>Weight:</strong> commonly corrected to about 24 months.
          </li>
          <li>
            <strong>Length and height:</strong> often corrected to about 36–40 months.
          </li>
          <li>
            <strong>Development:</strong> conventionally 24 months, but many NICU follow-up
            programmes continue correcting motor and language outcomes to 36 months for infants born
            before 28 weeks.
          </li>
          <li>
            <strong>Immunisations:</strong> never corrected. Chronological age, always.
          </li>
        </ul>
        <p>
          If your clinic follows a protocol that differs from these, follow the clinic. The point is
          that &ldquo;we stopped correcting&rdquo; is a decision someone made, not a biological
          event, and it is reasonable to ask which convention is being used.
        </p>

        <h2>Late preterm babies get shortchanged</h2>
        <p>
          A baby born at 35 weeks is &ldquo;only&rdquo; five weeks early, so correction is often
          dropped immediately. But at a four-month visit those five weeks are more than a quarter of
          the child's post-term life. Correct through the first year at minimum. See the{" "}
          <Link to="/how-to-calculate-corrected-age">worked late-preterm example</Link>.
        </p>

        <h2>Stopping correction is not the same as expecting catch-up</h2>
        <p>
          A child who is still behind at 24 months corrected has not failed a deadline — they have a
          finding that deserves assessment on its own terms rather than being explained away by
          prematurity. Attributing a persistent delay to &ldquo;he was a preemie&rdquo; past this
          point is the single most common way real diagnoses get delayed.
        </p>
      </Article>
    </SiteLayout>
  );
}
