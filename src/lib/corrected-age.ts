/**
 * Corrected (adjusted) age arithmetic for preterm infants.
 *
 * corrected age = chronological age - (40 weeks - gestational age at birth)
 * PMA (postmenstrual age) = gestational age at birth + chronological age
 *
 * Reviewed by Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics).
 */

export const MS_PER_DAY = 86_400_000;

export interface AgeInput {
  birthDate: string; // yyyy-mm-dd
  gaWeeks: number; // 22-40
  gaDays: number; // 0-6
  onDate: string; // yyyy-mm-dd
}

export interface AgeResult {
  chronologicalDays: number;
  correctedDays: number;
  pmaDays: number;
  prematurityDays: number;
  isTermEquivalentReached: boolean;
}

export function parseDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const parts = value.split("-");
  if (parts.length !== 3) return null;
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) return null;

  const dt = new Date(Date.UTC(year, month - 1, day));
  if (Number.isNaN(dt.getTime())) return null;
  if (dt.getUTCFullYear() !== year || dt.getUTCMonth() !== month - 1 || dt.getUTCDate() !== day) {
    return null;
  }
  return dt;
}

export function daysBetween(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / MS_PER_DAY);
}

export function computeAges(input: AgeInput): AgeResult | null {
  const birth = parseDate(input.birthDate);
  const on = parseDate(input.onDate);
  if (!birth || !on) return null;
  if (
    !Number.isInteger(input.gaWeeks) ||
    !Number.isInteger(input.gaDays) ||
    input.gaWeeks < 22 ||
    input.gaWeeks > 40 ||
    input.gaDays < 0 ||
    input.gaDays > 6
  ) {
    return null;
  }

  const gaTotalDays = input.gaWeeks * 7 + input.gaDays;
  const chronologicalDays = daysBetween(birth, on);
  if (chronologicalDays < 0) return null;

  const prematurityDays = Math.max(0, 280 - gaTotalDays);
  const correctedDays = chronologicalDays - prematurityDays;
  const pmaDays = gaTotalDays + chronologicalDays;

  return {
    chronologicalDays,
    correctedDays,
    pmaDays,
    prematurityDays,
    isTermEquivalentReached: pmaDays >= 280,
  };
}

/**
 * Convert a duration to a mean-month display approximation.
 * Milestone thresholds use the same convention through correctedMonths().
 */
export function daysToMonthsDays(days: number): { months: number; days: number } {
  if (days < 0) {
    const p = daysToMonthsDays(-days);
    return { months: -p.months, days: -p.days };
  }
  const months = Math.floor(days / 30.4375);
  return { months, days: Math.round(days - months * 30.4375) };
}

export function formatDuration(days: number): string {
  if (days < 0) {
    const weeks = Math.floor(-days / 7);
    const rem = -days % 7;
    return `${weeks} wk ${rem} d before term`;
  }
  if (days < 84) {
    const weeks = Math.floor(days / 7);
    return `${weeks} wk ${days % 7} d`;
  }
  const { months, days: rem } = daysToMonthsDays(days);
  if (months < 24) return `${months} mo ${rem} d`;
  const years = Math.floor(months / 12);
  return `${years} y ${months % 12} mo`;
}

export function formatPMA(days: number): string {
  return `${Math.floor(days / 7)} wk ${days % 7} d`;
}

export function correctedMonths(correctedDays: number): number {
  return correctedDays / 30.4375;
}

export function gaCategory(
  gaWeeks: number,
  gaDays: number,
): {
  label: string;
  detail: string;
} {
  const total = gaWeeks * 7 + gaDays;
  if (total < 28 * 7)
    return {
      label: "Extremely preterm",
      detail:
        "Born before 28 weeks. Correction is used through at least 24 months, and many follow-up programmes correct to 36 months for motor and language.",
    };
  if (total < 32 * 7)
    return {
      label: "Very preterm",
      detail:
        "Born 28 to 31+6 weeks. Correction is conventionally applied through 24 months corrected.",
    };
  if (total < 34 * 7)
    return {
      label: "Moderately preterm",
      detail:
        "Born 32 to 33+6 weeks. Correction usually matters most in the first 12 to 24 months.",
    };
  if (total < 37 * 7)
    return {
      label: "Late preterm",
      detail:
        "Born 34 to 36+6 weeks. Correction is still meaningful in the first year — the 2 to 3 week difference is large for a 4-month-old.",
    };
  return {
    label: "Term",
    detail: "Born 37 weeks or later. Correction is not usually applied at term gestation.",
  };
}

export function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}
