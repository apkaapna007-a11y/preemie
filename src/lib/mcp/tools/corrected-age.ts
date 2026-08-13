import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import {
  computeAges,
  formatDuration,
  formatPMA,
  gaCategory,
  todayISO,
} from "@/lib/corrected-age";

export default defineTool({
  name: "corrected_age",
  title: "Corrected age calculator",
  description:
    "Calculate corrected (adjusted) age, chronological age and postmenstrual age for a preterm infant from date of birth and gestational age at birth.",
  inputSchema: {
    birth_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("Date of birth, yyyy-mm-dd."),
    ga_weeks: z.number().int().min(22).max(42).describe("Completed weeks of gestation at birth."),
    ga_days: z.number().int().min(0).max(6).default(0).describe("Extra days of gestation (0-6)."),
    on_date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional()
      .describe("Date to calculate for, yyyy-mm-dd. Defaults to today."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ birth_date, ga_weeks, ga_days, on_date }) => {
    const onDate = on_date ?? todayISO();
    const result = computeAges({ birthDate: birth_date, gaWeeks: ga_weeks, gaDays: ga_days, onDate });
    if (!result) {
      throw new ToolError("Invalid dates: the visit date must be on or after the date of birth.");
    }
    const category = gaCategory(ga_weeks, ga_days);
    const payload = {
      corrected_age: formatDuration(result.correctedDays),
      corrected_age_days: result.correctedDays,
      chronological_age: formatDuration(result.chronologicalDays),
      chronological_age_days: result.chronologicalDays,
      postmenstrual_age: formatPMA(result.pmaDays),
      prematurity_days: result.prematurityDays,
      term_equivalent_reached: result.isTermEquivalentReached,
      gestational_category: category.label,
      guidance: `${category.detail} Use corrected age for milestones and growth charts, and chronological age for immunisations.`,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
