import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { daysBetween, parseDate } from "@/lib/corrected-age";

export default defineTool({
  name: "weight_velocity",
  title: "Weight velocity (g/kg/day)",
  description:
    "Compute average daily weight gain in g/kg/day between two weighings, using the exponential (average-weight) method.",
  inputSchema: {
    previous_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("Earlier weighing date, yyyy-mm-dd."),
    previous_weight_kg: z.number().positive().max(30).describe("Earlier weight in kilograms."),
    current_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("Later weighing date, yyyy-mm-dd."),
    current_weight_kg: z.number().positive().max(30).describe("Later weight in kilograms."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ previous_date, previous_weight_kg, current_date, current_weight_kg }) => {
    const from = parseDate(previous_date);
    const to = parseDate(current_date);
    if (!from || !to) throw new ToolError("Both dates must be valid yyyy-mm-dd values.");
    const days = daysBetween(from, to);
    if (days <= 0) throw new ToolError("The later weighing date must be after the earlier one.");

    const gainG = (current_weight_kg - previous_weight_kg) * 1000;
    const meanKg = (current_weight_kg + previous_weight_kg) / 2;
    const gPerKgPerDay = gainG / meanKg / days;
    const payload = {
      interval_days: days,
      total_gain_g: Math.round(gainG),
      g_per_day: Math.round(gainG / days),
      g_per_kg_per_day: Math.round(gPerKgPerDay * 10) / 10,
      note: "Reference only. Interpret alongside plotted growth charts and the clinical picture; discuss any concern with the treating paediatrician.",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
