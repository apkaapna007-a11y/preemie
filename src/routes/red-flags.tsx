import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  Article,
  Breadcrumbs,
  LinkGridSection,
  PageHeader,
  SiteLayout,
} from "@/components/SiteLayout";
import { ALWAYS_ACT_EARLY } from "@/lib/milestones";

const HEALTHDIRECT_SERIOUS_ILLNESS =
  "https://www.healthdirect.gov.au/symptoms-of-serious-illness-in-babies-and-children";
const AAP_FEVER =
  "https://www.healthychildren.org/English/health-issues/conditions/fever/Pages/When-to-Call-the-Pediatrician.aspx";
const CDC_MILESTONES = "https://www.cdc.gov/act-early/milestones/index.html";
const AAP_SLEEP_APNEA =
  "https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/Sleep-Apnea-Detection.aspx";
const GROWTH_AGE_CORRECTION = "https://pmc.ncbi.nlm.nih.gov/articles/PMC12221983/";
const HAND_PREFERENCE_AJGP =
  "https://www1.racgp.org.au/ajgp/2026/august/early-hand-preference-and-infantile-spasms";
const GLASCOE_PARENT_CONCERNS = "https://pubmed.ncbi.nlm.nih.gov/10759753/";

function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

/** One concern, written as: what you see · why it matters in a preterm baby · what to say. */
function ConcernBlock({
  title,
  observe,
  why,
  tell,
}: {
  title: string;
  observe: ReactNode;
  why: ReactNode;
  tell: ReactNode;
}) {
  return (
    <section className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-paper">
      <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-3">
        <strong>What you may see: </strong>
        {observe}
      </p>
      <p className="mt-3">
        <strong>Why it matters in a preterm baby: </strong>
        {why}
      </p>
      <p className="mt-3">
        <strong>What to tell your clinician: </strong>
        {tell}
      </p>
    </section>
  );
}

export const Route = createFileRoute("/red-flags")({
  head: () => ({
    meta: [
      { title: "Preemie Red Flags: When to Call the Doctor | AdjustedAge" },
      {
        name: "description",
        content:
          "Which preemie warning signs need a call today, which can wait until this week, and what to say to your clinician. Reviewed by Dr. Zeeshan Islam, paediatrician.",
      },
      { property: "og:title", content: "Preemie Red Flags: When to Call the Doctor | AdjustedAge" },
      {
        property: "og:description",
        content:
          "Which preemie warning signs need a call today, which can wait until this week, and what to say to your clinician. Reviewed by Dr. Zeeshan Islam, paediatrician.",
      },
      { property: "og:url", content: "https://preemie.vercel.app/red-flags" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "https://preemie.vercel.app/og/og-red-flags.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "AdjustedAge" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Preemie Red Flags: When to Call the Doctor | AdjustedAge",
      },
      {
        name: "twitter:description",
        content:
          "Which preemie warning signs need a call today, which can wait until this week, and what to say to your clinician. Reviewed by Dr. Zeeshan Islam, paediatrician.",
      },
      { name: "twitter:image", content: "https://preemie.vercel.app/og/og-red-flags.png" },
      { name: "twitter:image:alt", content: "Preemie red flags and when to call the doctor" },
      { property: "og:image:alt", content: "Preemie red flags and when to call the doctor" },
      { name: "article:published_time", content: "2026-08-11T00:00:00Z" },
      { name: "article:modified_time", content: "2026-08-26T00:00:00Z" },
    ],
    links: [{ rel: "canonical", href: "https://preemie.vercel.app/red-flags" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: "Preemie Red Flags: When to Call the Doctor",
          description:
            "Emergency, same-day and same-week red flags for premature babies, ordered by urgency, with what to report to the clinician. CDC Act Early concerns that apply at every corrected age.",
          url: "https://preemie.vercel.app/red-flags",
          image: {
            "@type": "ImageObject",
            url: "https://preemie.vercel.app/og/og-red-flags.png",
            width: 1200,
            height: 630,
          },
          datePublished: "2026-08-11",
          dateModified: "2026-08-26",
          lastReviewed: "2026-08-26",
          citation: [
            HEALTHDIRECT_SERIOUS_ILLNESS,
            AAP_FEVER,
            CDC_MILESTONES,
            AAP_SLEEP_APNEA,
            GROWTH_AGE_CORRECTION,
            HAND_PREFERENCE_AJGP,
            GLASCOE_PARENT_CONCERNS,
          ],
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
          publisher: { "@id": "https://preemie.vercel.app/#organization" },
          specialty: "Pediatric",
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
              name: "Preemie red flags",
              item: "https://preemie.vercel.app/red-flags",
            },
          ],
        }),
      },
    ],
  }),
  component: RedFlagsPage,
});

function RedFlagsPage() {
  return (
    <SiteLayout>
      <Breadcrumbs items={[{ to: "/", label: "Home" }, { label: "Preemie red flags" }]} />
      <PageHeader
        eyebrow="Safety page"
        title="Preemie red flags: when to call the doctor"
        intro="This site exists to stop parents from panicking about a delay that is only a calendar artefact. It must not become a reason to wait when waiting is wrong."
      />

      <Article>
        <p>
          Below, every sign is sorted by how quickly it needs a response: emergency care now, a call
          today, a call booked this week, or a routine question for the next visit. Corrected age
          does not change any of these rules. A sign is a sign at any age.
        </p>
        <p>
          This is an educational checklist, not a diagnostic tool. It cannot tell you what is wrong,
          and it cannot tell you that nothing is. If something here matches what you are seeing,
          contact your own clinician or your local emergency number. In Australia, healthdirect
          lists the emergency signs below as reasons to call an ambulance straight away:{" "}
          <SourceLink href={HEALTHDIRECT_SERIOUS_ILLNESS}>
            symptoms of serious illness in babies and children
          </SourceLink>
          .
        </p>

        <h2>Emergency — seek immediate care</h2>
        <p>
          Do not wait for a call back, and do not wait for the next clinic slot. Take your baby to
          an emergency department or call your emergency number.
        </p>
        <ul>
          <li>
            Working hard to breathe: grunting, nostril flaring, chest pulling in, pauses in
            breathing
          </li>
          <li>Blue or grey colour around the lips or tongue</li>
          <li>A seizure, or unusual repetitive jerking or stiffening</li>
          <li>Unrousable, floppy, or very much less responsive than usual</li>
          <li>
            Fever in an infant under 3 months corrected, or any fever in a baby with a central line
            or shunt
          </li>
          <li>Repeated vomiting, a swollen abdomen, or blood in the stool</li>
        </ul>

        <ConcernBlock
          title="Working hard to breathe, or a colour change"
          observe={
            <>
              Grunting at the end of each breath, nostrils flaring wide, the skin sucking in between
              the ribs or at the neck, long pauses between breaths, or a blue or grey tinge around
              the lips or tongue.
            </>
          }
          why={
            <>
              Lungs are the last organ system to finish before birth, so a baby born early starts
              with smaller airways and far less reserve than a term baby. Bronchopulmonary dysplasia
              and a recent viral illness are common in this group, and breathing that looks &ldquo;a
              bit fast&rdquo; can deteriorate within hours.
            </>
          }
          tell={
            <>
              Gestational age at birth, today&apos;s corrected age, when the work of breathing
              started, how feeds are going, and anything from the discharge summary about oxygen at
              36 weeks or home oxygen.
            </>
          }
        />

        <ConcernBlock
          title="A seizure, unusual jerking, or a baby who will not wake"
          observe={
            <>
              Repetitive jerking or stiffening, repeated odd postures or eye movements that stop on
              their own, or a baby who is unrousable, floppy, or clearly much less responsive than
              usual.
            </>
          }
          why={
            <>
              Seizures in young infants often look subtle: a freeze, a stare, or the same limb
              moving over and over rather than a full convulsion. Prematurity and the brain changes
              that can come with it lower the threshold for these events, so an abnormal repetitive
              movement is never a wait-and-see sign.
            </>
          }
          tell={
            <>
              What time it started, how long each episode lasted, and a video if you can take one
              safely. Say explicitly that your baby was born early — it changes which scans are
              offered first.
            </>
          }
        />

        <ConcernBlock
          title="Fever in a very young baby"
          observe={
            <>
              A temperature of 38&nbsp;°C (100.4&nbsp;°F) or higher in a baby under 3 months old, or
              any fever at all in a baby who still has a central line or a shunt.
            </>
          }
          why={
            <>
              A young infant can have a serious bacterial infection with almost nothing else to show
              for it — no rash, no cough, just the temperature. Premature babies are more likely to
              be in that group, and infections move faster in them.
            </>
          }
          tell={
            <>
              The exact temperature and how it was taken, the age in weeks since birth, how the baby
              is feeding and alerting, and whether any line or shunt is still in place. The
              AAP&apos;s advice on calling for fever is at{" "}
              <SourceLink href={AAP_FEVER}>Fever: when to call the pediatrician</SourceLink>.
            </>
          }
        />

        <ConcernBlock
          title="Repeated vomiting, a swollen belly, or blood in the stool"
          observe={
            <>
              Vomit that keeps coming back, an abdomen that is swollen and tense, green (bile-
              stained) vomit, blood in a nappy, or a baby who refuses feeds with a swollen tummy.
            </>
          }
          why={
            <>
              A preterm gut had to learn its job earlier than it should have, and babies who needed
              surgery for necrotising enterocolitis or for a bowel problem are at higher risk of
              later obstruction. Bilious vomit in any infant is an emergency.
            </>
          }
          tell={
            <>
              What the vomit looked like, how many nappies in the last 24 hours, the last few days
              of feeds, and any abdominal surgery in the NICU.
            </>
          }
        />

        <div className="not-prose mt-8 rounded-2xl bg-caution p-5 text-caution-foreground">
          <h2 className="font-display text-lg font-semibold">
            Call today — do not wait for the next visit
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {ALWAYS_ACT_EARLY.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <p>
          This list never gets downgraded to a routine question. CDC&apos;s Learn the Signs. Act
          Early. programme puts the same rule plainly: if a skill is lost, if a milestone is missed,
          or if you have another concern, act early and talk to your child&apos;s doctor rather than
          waiting for the next appointment — see{" "}
          <SourceLink href={CDC_MILESTONES}>CDC&apos;s developmental milestones</SourceLink>. Going
          backwards is the one pattern that is never a normal part of catching up.
        </p>

        <h2>Book this week — a same-week call to your paediatrician</h2>
        <p>
          These signs rarely become emergencies overnight, but they deserve an appointment in the
          next few days rather than at the next scheduled check. Write down what you have seen
          before you call; a short written account makes the consult faster and more useful.
        </p>
        <ul>
          <li>Not gaining weight, or crossing downwards through growth centiles</li>
          <li>Feeding is taking longer and longer, with coughing or choking</li>
          <li>
            Persistently favouring one hand before 12 months corrected — early hand preference is a
            motor red flag, not a talent
          </li>
          <li>Stiff or arched posture, or a baby who feels floppy when picked up</li>
          <li>No response to your voice, or no babble by 9 months corrected</li>
          <li>No eye contact, or eyes that consistently turn in or out after 4 months corrected</li>
          <li>No pointing or showing by 18 months corrected</li>
          <li>Snoring with pauses, or noisy laboured breathing during sleep</li>
        </ul>

        <ConcernBlock
          title="Weight that is not following its own curve"
          observe={
            <>
              Week after week of flat weight gain, or a point where the line crosses downwards
              through the centiles on the chart.
            </>
          }
          why={
            <>
              Preterm babies are judged on their own curve, plotted by corrected age, not on the
              shape other babies have. Read against chronological age instead, a healthy preterm
              baby can look growth-restricted: one study found up to 72.9% of very preterm babies
              were misclassified as stunted at term when chronological age was used —{" "}
              <SourceLink href={GROWTH_AGE_CORRECTION}>
                preterm growth assessment: the latest findings on age correction
              </SourceLink>
              . The point of the same-week call is to sort a chart-reading problem from a real one.
            </>
          }
          tell={
            <>
              Every weight with its date, the amounts and type of feed per 24 hours, wet nappies,
              and any vomiting or reflux. The{" "}
              <Link to="/preemie-weight-gain">preemie weight gain calculator</Link> turns those
              numbers into an interval rate you can hand over.
            </>
          }
        />

        <ConcernBlock
          title="Feeding that is getting harder, with coughing or choking"
          observe={
            <>
              Feeds that stretch longer and longer, coughing, spluttering or choking during a feed,
              wet nappies dropping off, or a baby who falls asleep exhausted at the breast or
              bottle.
            </>
          }
          why={
            <>
              Sucking, swallowing and breathing have to be coordinated, and preterm babies learn
              that coordination early and often imperfectly. Late feeding difficulty is also the
              first clue to reflux, airway problems or neurologic concerns, so it is treated as a
              feeding and a development question at the same time.
            </>
          }
          tell={
            <>
              Minutes per feed, what happens in the middle of a feed, the number of wet nappies, and
              whether choking happens with thin fluids only. Ask about a feeding review by a speech
              pathologist or occupational therapist if your clinic has one.
            </>
          }
        />

        <ConcernBlock
          title="Tone, asymmetry and early hand preference"
          observe={
            <>
              A posture that is always stiff or arched, a baby who feels floppy when lifted, hands
              that stay fisted, one side used far more than the other, or a clear preference for one
              hand before 12 months corrected.
            </>
          }
          why={
            <>
              Cerebral palsy is more common after preterm birth, and the earliest sign parents
              notice is often handedness — a preference that should not exist yet. Australian
              guidance calls persistent hand preference before 12 months a red flag:{" "}
              <SourceLink href={HAND_PREFERENCE_AJGP}>
                early hand preference and infantile spasms
              </SourceLink>
              . Physiotherapy started in the first year changes what the second year looks like.
            </>
          }
          tell={
            <>
              Which hand, since when, and what the other hand does during play. Bring the
              gestational age, any grade of intraventricular haemorrhage, and the discharge summary
              if you still have it.
            </>
          }
        />

        <ConcernBlock
          title="Hearing, vision and social communication"
          observe={
            <>
              No response to your voice or to sounds, no babble by 9 months corrected, no eye
              contact, eyes turning consistently in or out after 4 months corrected, or no pointing
              or showing by 18 months corrected.
            </>
          }
          why={
            <>
              Preterm babies are more likely to have a hearing difference, a vision screening
              history such as retinopathy of prematurity, or a squint — and each of those changes
              what &ldquo;no babble&rdquo; means. Corrected age sets a fair milestone row; it does
              not explain away an absent response.
            </>
          }
          tell={
            <>
              Whether the newborn hearing screen was passed, any ear infections or otoxic drugs in
              the NICU, the result of the last vision check, and which sounds or words your baby
              does respond to. Ask whether a formal screen is due at the ages the{" "}
              <SourceLink href={CDC_MILESTONES}>CDC milestone checklists</SourceLink> cover.
            </>
          }
        />

        <ConcernBlock
          title="Snoring with pauses, or laboured breathing in sleep"
          observe={
            <>
              Loud snoring most nights, pauses in breathing followed by a gasp, restless sleep, or
              breathing that looks like hard work once the baby is asleep.
            </>
          }
          why={
            <>
              Chronic lung disease of prematurity, a small airway and enlarged adenoids can combine
              to obstruct sleep in a toddler who cannot describe it. The AAP lists frequent snoring
              as a reason to tell your paediatrician straight away:{" "}
              <SourceLink href={AAP_SLEEP_APNEA}>sleep apnea in children</SourceLink>. Pauses in
              breathing during sleep are never part of normal catch-up.
            </>
          }
          tell={
            <>
              How many nights a week, whether you have heard an actual pause, a video recorded in
              the dark, and any oxygen or steroid history from the NICU. Ask whether a sleep study
              is appropriate.
            </>
          }
        />

        <h2>Routine — things that are usually not a problem</h2>
        <ul>
          <li>
            Sitting or walking &ldquo;late&rdquo; when the corrected age row says the child is on
            time
          </li>
          <li>A brief plateau during an illness, with recovery afterwards</li>
          <li>
            Being smaller than term-born peers of the same birthday, while following their own curve
          </li>
          <li>
            Preferring to be carried, disliking tummy time, or being sensitive to noise after a long
            NICU stay
          </li>
        </ul>
        <p>
          These belong at the routine tier: note them and raise them at the next scheduled visit
          rather than calling today. The distinction that matters is the curve, not the comparison.
          A child who stays on their own line while being smaller than birthday peers is doing what
          catch-up growth looks like, and the correction applied in{" "}
          <Link to="/how-to-calculate-corrected-age">the corrected-age worked examples</Link> is
          usually enough to read that line fairly. If the line itself is falling, move the concern
          up a tier.
        </p>
        <p>
          One exception cuts across this section: a skill that has been lost belongs in the call
          today list at every age. Plateaus recover; losses do not.
        </p>

        <h2>A note on trusting yourself</h2>
        <p>
          Parental concern is one of the strongest predictors of a genuine developmental problem in
          the published literature. In a study of 408 children, systematically elicited parental
          concerns identified 79% of the children with disabilities — close to the standard expected
          of a formal screening test (
          <SourceLink href={GLASCOE_PARENT_CONCERNS}>Glascoe, 2000</SourceLink>). If something feels
          wrong and this page does not list it, that is not evidence that nothing is wrong. Call
          anyway. No paediatrician has ever resented being called about a NICU graduate.
        </p>
        <p>
          What this page will not do is score your child. There is no pass mark here, no percentile
          of development, and no diagnosis behind any of these lists. Read the tier, act on the
          tier, and let the clinician do the part only a clinician can do.
        </p>
      </Article>

      <LinkGridSection
        title="Use this safety page with the rest of the tool"
        links={[
          {
            to: "/",
            label: "Corrected age calculator",
            description:
              "Check the corrected and chronological ages, then come back here if something still worries you.",
          },
          {
            to: "/adjusted-age-calculator",
            label: "Adjusted age calculator",
            description: "Same tool for parents who search using adjusted age terminology.",
          },
          {
            to: "/premature-baby-milestones",
            label: "Premature baby milestones chart",
            description: "Separate normal corrected-age timing from concerns that should not wait.",
          },
          {
            to: "/how-to-calculate-corrected-age",
            label: "How to calculate corrected age",
            description: "Check the arithmetic if a milestone concern may be a calendar issue.",
          },
          {
            to: "/when-to-stop-correcting",
            label: "When to stop correcting",
            description:
              "Learn when corrected age still applies and when a delay needs direct assessment.",
          },
          {
            to: "/methodology",
            label: "Methodology and references",
            description:
              "Review the source basis and safety limits behind the guidance on this site.",
          },
        ]}
      />
    </SiteLayout>
  );
}
