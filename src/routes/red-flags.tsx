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
      { property: "og:title", content: "Preemie Red Flags: When to Call the Doctor" },
      {
        property: "og:description",
        content:
          "Corrected age explains a lot of delay. It does not explain everything. These findings need a call today, not at the next visit.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
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
