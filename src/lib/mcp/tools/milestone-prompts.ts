import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import {
  ALWAYS_ACT_EARLY,
  milestoneSetForCorrectedMonths,
  nextMilestoneSet,
} from "@/lib/milestones";

export default defineTool({
  name: "milestone_prompts",
  title: "Corrected-age milestone prompts",
  description:
    "Return CDC/AAP developmental surveillance prompts re-indexed to a corrected age in months, plus the always-act-early red flags. These are conversation prompts, never a pass/fail screen.",
  inputSchema: {
    corrected_months: z
      .number()
      .min(0)
      .max(60)
      .describe("Corrected age in months (may be fractional)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ corrected_months }) => {
    const current = milestoneSetForCorrectedMonths(corrected_months);
    const next = nextMilestoneSet(corrected_months);
    const payload = {
      corrected_months,
      current_set: current
        ? { label: current.label, items: current.items }
        : null,
      note: current
        ? "Surveillance prompts only — no score, no pass/fail."
        : "Corrected age is below the first surveillance set; feeding, weight gain and settling matter most.",
      next_set: next ? next.label : null,
      always_act_early: ALWAYS_ACT_EARLY,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
