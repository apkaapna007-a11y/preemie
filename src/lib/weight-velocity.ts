import { daysBetween, parseDate } from "./corrected-age.ts";

export interface WeightVelocityInput {
  previousDate: string;
  previousWeightKg: number;
  currentDate: string;
  currentWeightKg: number;
}

export interface WeightVelocityResult {
  intervalDays: number;
  totalGainG: number;
  gramsPerDay: number;
  gramsPerKgPerDay: number;
}

/**
 * Average weight gain using the average-weight method.
 * Returns null for malformed dates, non-positive weights, or non-positive intervals.
 */
export function calculateWeightVelocity(input: WeightVelocityInput): WeightVelocityResult | null {
  const previousDate = parseDate(input.previousDate);
  const currentDate = parseDate(input.currentDate);
  if (!previousDate || !currentDate) return null;

  const intervalDays = daysBetween(previousDate, currentDate);
  if (intervalDays <= 0) return null;
  if (
    !Number.isFinite(input.previousWeightKg) ||
    !Number.isFinite(input.currentWeightKg) ||
    input.previousWeightKg <= 0 ||
    input.currentWeightKg <= 0
  ) {
    return null;
  }

  const totalGainG = (input.currentWeightKg - input.previousWeightKg) * 1000;
  const averageWeightKg = (input.currentWeightKg + input.previousWeightKg) / 2;

  return {
    intervalDays,
    totalGainG,
    gramsPerDay: totalGainG / intervalDays,
    gramsPerKgPerDay: totalGainG / averageWeightKg / intervalDays,
  };
}
