import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { calculateWeightVelocity } from "@/lib/weight-velocity";

export default defineTool({
  name: "weight_velocity",
  title: "Weight velocity (g/kg/day)",
  description:
    "Compute average daily weight gain in g/kg/day between two weighings, using the exponential (average-weight) method.",
  inputSchema: {
    previous_date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .describe("Earlier weighing date, yyyy-mm-dd."),
    previous_weight_kg: z.number().positive().max(30).describe("Earlier weight in kilograms."),
    current_date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .describe("Later weighing date, yyyy-mm-dd."),
    current_weight_kg: z.number().positive().max(30).describe("Later weight in kilograms."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ previous_date, previous_weight_kg, current_date, current_weight_kg }) => {
    const velocity = calculateWeightVelocity({
      previousDate: previous_date,
      previousWeightKg: previous_weight_kg,
      currentDate: current_date,
      currentWeightKg: current_weight_kg,
    });
    if (!velocity) {
      throw new ToolError(
        "Both dates must be valid, and the later weighing date must be after the earlier one.",
      );
    }

    const payload = {
      interval_days: velocity.intervalDays,
      total_gain_g: Math.round(velocity.totalGainG),
      g_per_day: Math.round(velocity.gramsPerDay),
      g_per_kg_per_day: Math.round(velocity.gramsPerKgPerDay * 10) / 10,
      note: "Reference only. Interpret alongside plotted growth charts and the clinical picture; discuss any concern with the treating paediatrician.",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
