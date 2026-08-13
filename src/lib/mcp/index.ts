import { defineMcp, type AnyToolDefinition } from "@lovable.dev/mcp-js";
import correctedAgeTool from "./tools/corrected-age";
import milestonePromptsTool from "./tools/milestone-prompts";
import followupScheduleTool from "./tools/followup-schedule";
import weightVelocityTool from "./tools/weight-velocity";

export default defineMcp({
  name: "preemie-pathways",
  title: "Preemie Pathways",
  version: "0.1.0",
  instructions:
    "Corrected-age tooling for NICU graduates, clinically reviewed by Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics). Use `corrected_age` for corrected/chronological/postmenstrual age, `milestone_prompts` for CDC/AAP surveillance prompts at a corrected age, `followup_schedule` for high-risk infant visit dates, and `weight_velocity` for g/kg/day growth. All tools are stateless calculators: nothing is stored, and outputs are surveillance prompts and reference figures, never a diagnosis.",
  tools: [
    correctedAgeTool,
    milestonePromptsTool,
    followupScheduleTool,
    weightVelocityTool,
  ] as unknown as AnyToolDefinition[],
});
