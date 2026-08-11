/**
 * Developmental surveillance prompts, indexed to CORRECTED age.
 *
 * Adapted from the CDC/AAP revised developmental milestone checklists
 * (Zubler JM, Whitaker TM, et al. Evidence-Informed Milestones for Developmental
 * Surveillance Tools. Pediatrics. 2022;149(3):e2021052138 — summarised in
 * Am Fam Physician 2022;106(4):370-371).
 *
 * These are SURVEILLANCE PROMPTS, not a validated developmental screen.
 * They never produce a pass/fail result.
 */

export type Domain = "Social/Emotional" | "Language" | "Cognitive" | "Movement";

export interface MilestoneSet {
  month: number;
  label: string;
  items: { domain: Domain; text: string }[];
}

export const MILESTONES: MilestoneSet[] = [
  {
    month: 2,
    label: "2 months corrected",
    items: [
      { domain: "Social/Emotional", text: "Calms down when spoken to or picked up" },
      { domain: "Social/Emotional", text: "Looks at your face" },
      { domain: "Social/Emotional", text: "Smiles when you talk to or smile at them" },
      { domain: "Language", text: "Makes sounds other than crying" },
      { domain: "Language", text: "Reacts to loud sounds" },
      { domain: "Cognitive", text: "Watches you as you move" },
      { domain: "Movement", text: "Holds head up when on tummy" },
      { domain: "Movement", text: "Moves both arms and both legs" },
    ],
  },
  {
    month: 4,
    label: "4 months corrected",
    items: [
      { domain: "Social/Emotional", text: "Smiles on their own to get your attention" },
      { domain: "Social/Emotional", text: "Chuckles when you try to make them laugh" },
      { domain: "Language", text: "Makes cooing sounds like oooo, aahh" },
      { domain: "Language", text: "Turns head towards the sound of your voice" },
      { domain: "Cognitive", text: "Opens mouth when they see the breast or bottle" },
      { domain: "Movement", text: "Holds head steady without support when held" },
      { domain: "Movement", text: "Brings hands to mouth" },
      { domain: "Movement", text: "Pushes up on elbows when on tummy" },
    ],
  },
  {
    month: 6,
    label: "6 months corrected",
    items: [
      { domain: "Social/Emotional", text: "Knows familiar people" },
      { domain: "Social/Emotional", text: "Likes to look at self in a mirror" },
      { domain: "Language", text: "Takes turns making sounds with you" },
      { domain: "Language", text: "Blows raspberries" },
      { domain: "Cognitive", text: "Puts things in their mouth to explore them" },
      { domain: "Movement", text: "Rolls from tummy to back" },
      { domain: "Movement", text: "Pushes up with straight arms on tummy" },
      { domain: "Movement", text: "Leans on hands for support when sitting" },
    ],
  },
  {
    month: 9,
    label: "9 months corrected",
    items: [
      { domain: "Social/Emotional", text: "Is shy, clingy or fearful around strangers" },
      { domain: "Social/Emotional", text: "Reacts when you leave" },
      { domain: "Language", text: "Makes different sounds like mamamama, babababa" },
      { domain: "Cognitive", text: "Looks for objects when dropped out of sight" },
      { domain: "Movement", text: "Gets to a sitting position without help" },
      { domain: "Movement", text: "Sits without support" },
      { domain: "Movement", text: "Moves things from one hand to the other" },
    ],
  },
  {
    month: 12,
    label: "12 months corrected",
    items: [
      { domain: "Social/Emotional", text: "Plays games with you, like pat-a-cake" },
      { domain: "Language", text: "Waves bye-bye" },
      { domain: "Language", text: "Calls a parent mama, dada or another special name" },
      { domain: "Cognitive", text: "Puts something in a container" },
      { domain: "Movement", text: "Pulls up to stand" },
      { domain: "Movement", text: "Walks holding on to furniture" },
      { domain: "Movement", text: "Picks things up between thumb and finger" },
    ],
  },
  {
    month: 15,
    label: "15 months corrected",
    items: [
      { domain: "Social/Emotional", text: "Claps when excited" },
      { domain: "Social/Emotional", text: "Shows you an object they like" },
      { domain: "Language", text: "Tries to say one or two words besides mama or dada" },
      { domain: "Cognitive", text: "Tries to use things the right way, like a cup or phone" },
      { domain: "Movement", text: "Takes a few steps on their own" },
      { domain: "Movement", text: "Uses fingers to feed themselves" },
    ],
  },
  {
    month: 18,
    label: "18 months corrected",
    items: [
      { domain: "Social/Emotional", text: "Moves away from you but looks to make sure you are close" },
      { domain: "Social/Emotional", text: "Points to show you something interesting" },
      { domain: "Language", text: "Tries to say three or more words besides mama or dada" },
      { domain: "Language", text: "Follows one-step directions without gestures" },
      { domain: "Cognitive", text: "Scribbles" },
      { domain: "Movement", text: "Walks without holding on to anyone" },
      { domain: "Movement", text: "Drinks from a cup without a lid, with some spilling" },
    ],
  },
  {
    month: 24,
    label: "24 months corrected",
    items: [
      { domain: "Social/Emotional", text: "Notices when others are hurt or upset" },
      { domain: "Language", text: "Says at least two words together, like more milk" },
      { domain: "Language", text: "Points to at least two body parts when asked" },
      { domain: "Cognitive", text: "Uses switches, knobs or buttons on a toy" },
      { domain: "Movement", text: "Kicks a ball" },
      { domain: "Movement", text: "Runs" },
      { domain: "Movement", text: "Walks up a few stairs with or without help" },
    ],
  },
  {
    month: 30,
    label: "30 months corrected",
    items: [
      { domain: "Social/Emotional", text: "Plays next to other children, sometimes with them" },
      { domain: "Language", text: "Says about 50 words" },
      { domain: "Language", text: "Names things in a book when you point and ask" },
      { domain: "Cognitive", text: "Shows simple problem solving, like standing on a stool to reach" },
      { domain: "Movement", text: "Twists things with their hands, like a lid" },
      { domain: "Movement", text: "Jumps off the ground with both feet" },
    ],
  },
  {
    month: 36,
    label: "36 months corrected",
    items: [
      { domain: "Social/Emotional", text: "Calms within 10 minutes after you leave, at childcare for example" },
      { domain: "Language", text: "Talks with you in conversation using at least two back-and-forth exchanges" },
      { domain: "Language", text: "Says their first name when asked" },
      { domain: "Cognitive", text: "Draws a circle when you show them how" },
      { domain: "Movement", text: "Strings items together, like large beads" },
      { domain: "Movement", text: "Puts on some clothes by themselves" },
    ],
  },
];

/** CDC "act early" concerns that must surface at every age, without exception. */
export const ALWAYS_ACT_EARLY = [
  "Loses skills they once had — at any age, this always needs a same-week call",
  "Does not respond to sound, or you are worried about hearing",
  "Stiffness, floppiness, or persistently using only one side of the body",
  "Feeding difficulty, choking, or poor weight gain",
  "Eyes that do not follow, or that consistently turn in or out after 4 months corrected",
  "Any worry that will not settle — a parent's concern is clinical data",
];

export function milestoneSetForCorrectedMonths(months: number): MilestoneSet | null {
  if (months < 1) return null;
  let chosen: MilestoneSet | null = null;
  for (const set of MILESTONES) {
    if (months >= set.month - 0.5) chosen = set;
  }
  return chosen;
}

export function nextMilestoneSet(months: number): MilestoneSet | null {
  return MILESTONES.find((s) => months < s.month - 0.5) ?? null;
}
