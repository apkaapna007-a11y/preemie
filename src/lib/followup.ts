import { parseDate, MS_PER_DAY } from "@/lib/corrected-age";

/**
 * NICU-graduate follow-up visit schedule, indexed to CORRECTED age.
 * Months chosen to match common high-risk infant follow-up programmes
 * (4, 8, 12, 18, 24 and 36 months corrected).
 */
export interface FollowUpVisit {
  correctedMonths: number;
  label: string;
  focus: string;
  dueDate: string; // yyyy-mm-dd
  status: "done" | "due" | "upcoming";
}

const SCHEDULE: { months: number; label: string; focus: string }[] = [
  { months: 4, label: "4 months corrected", focus: "Feeding, weight velocity, head growth, early motor symmetry" },
  { months: 8, label: "8 months corrected", focus: "Sitting, transfer of objects, babble, hearing check follow-up" },
  { months: 12, label: "12 months corrected", focus: "Pulling to stand, pincer grasp, first words, vision review" },
  { months: 18, label: "18 months corrected", focus: "Walking, single words, autism-specific surveillance" },
  { months: 24, label: "24 months corrected", focus: "Two-word phrases, formal developmental assessment, most correction stops here" },
  { months: 36, label: "36 months corrected", focus: "Pre-school readiness; motor and language correction ends" },
];

function addMonths(iso: string, months: number): string {
  const base = parseDate(iso);
  if (!base) return "";
  const d = new Date(base.getTime());
  d.setUTCMonth(d.getUTCMonth() + months);
  return d.toISOString().slice(0, 10);
}

export function followUpSchedule(
  birthDate: string,
  prematurityDays: number,
  today: string,
): FollowUpVisit[] {
  const termDate = new Date((parseDate(birthDate)?.getTime() ?? 0) + prematurityDays * MS_PER_DAY)
    .toISOString()
    .slice(0, 10);
  const now = parseDate(today)?.getTime() ?? 0;

  return SCHEDULE.map((s) => {
    const dueDate = addMonths(termDate, s.months);
    const due = parseDate(dueDate)?.getTime() ?? 0;
    const diffDays = (due - now) / MS_PER_DAY;
    const status: FollowUpVisit["status"] =
      diffDays < -30 ? "done" : diffDays <= 45 ? "due" : "upcoming";
    return { correctedMonths: s.months, label: s.label, focus: s.focus, dueDate, status };
  });
}
