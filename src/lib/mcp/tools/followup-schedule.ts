import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { computeAges, todayISO } from "@/lib/corrected-age";
import { followUpSchedule } from "@/lib/followup";

export default defineTool({
  name: "followup_schedule",
  title: "NICU follow-up visit schedule",
  description:
    "Generate the high-risk infant follow-up visit schedule (4, 8, 12, 18, 24 and 36 months corrected) with calendar due dates derived from the original due date.",
  inputSchema: {
    birth_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("Date of birth, yyyy-mm-dd."),
    ga_weeks: z.number().int().min(22).max(42).describe("Completed weeks of gestation at birth."),
    ga_days: z.number().int().min(0).max(6).default(0).describe("Extra days of gestation (0-6)."),
    on_date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional()
      .describe("Reference date used to mark visits done/due/upcoming. Defaults to today."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ birth_date, ga_weeks, ga_days, on_date }) => {
    const onDate = on_date ?? todayISO();
    const ages = computeAges({ birthDate: birth_date, gaWeeks: ga_weeks, gaDays: ga_days, onDate });
    if (!ages) {
      throw new ToolError("Invalid dates: the reference date must be on or after the date of birth.");
    }
    const visits = followUpSchedule(birth_date, ages.prematurityDays, onDate);
    const payload = {
      reference_date: onDate,
      prematurity_days: ages.prematurityDays,
      visits,
      note: "Indicative timing only. The family's own NICU follow-up clinic schedule always takes precedence.",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
