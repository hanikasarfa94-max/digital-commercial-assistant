/**
 * Prompt builders for LLM-powered features.
 *
 * Each function builds the message array for a specific use case.
 * The prompt templates here mirror the ones stored in the knowledge center,
 * but are hardcoded for reliability. In production, these could be loaded
 * from the knowledge center's prompt template store.
 */

import type { Message } from "./interfaces";
import type {
  EnterpriseProfile,
  MetricOverview,
  AnomalyItem,
  BizTarget,
  DiagnosisType,
  ChannelKey,
  MetricKey,
} from "@/types/api";

// ── Business context builder ─────────────────────────────

function buildBusinessContext(enterprise: EnterpriseProfile, targets: BizTarget[]): string {
  const targetsText = targets
    .map((t) => `  - ${t.metricLabel.en}: target ${t.targetValue}, current ${t.currentValue} (gap: ${t.gap})`)
    .join("\n");

  return `## Enterprise Context
- Company: ${enterprise.companyName.en} (${enterprise.companyName.zh})
- Industry: ${enterprise.industry.en}
- Brand Positioning: ${enterprise.brandPositioning.en}
- Core Categories: ${enterprise.coreCategories.en}
- Channels: ${enterprise.channels.en}
- Business Model: ${enterprise.businessModel.en}

## Current Business Targets
${targetsText}`;
}

// ── Diagnosis prompts ────────────────────────────────────

export function buildDiagnosisPrompt(params: {
  type: DiagnosisType;
  timeRange: string;
  channels?: ChannelKey[];
  focusMetrics?: MetricKey[];
  enterprise: EnterpriseProfile;
  targets: BizTarget[];
  metrics: MetricOverview[];
  anomalies: AnomalyItem[];
}): Message[] {
  const { type, timeRange, channels, focusMetrics, enterprise, targets, metrics, anomalies } = params;

  const typeLabel: Record<DiagnosisType, string> = {
    weekly_review: "Weekly Operating Review",
    campaign_retro: "Campaign Retrospective",
    anomaly_deep_dive: "Anomaly Deep Dive",
  };

  const metricsText = metrics
    .map((m) => `  - ${m.key}: ${m.value}${m.unit} (prev: ${m.previousValue}${m.unit}, change: ${m.changePercent > 0 ? "+" : ""}${m.changePercent}%)`)
    .join("\n");

  const anomaliesText = anomalies.length > 0
    ? anomalies
        .map((a) => `  - [${a.severity.toUpperCase()}] ${a.metric} in ${a.scope.en}: ${a.changePercent > 0 ? "+" : ""}${a.changePercent}% — ${a.description.en}`)
        .join("\n")
    : "  No anomalies detected.";

  const system: Message = {
    role: "system",
    content: `You are a senior e-commerce business analyst for ${enterprise.companyName.en}.
Your task is to produce a structured ${typeLabel[type]} diagnosis.

${buildBusinessContext(enterprise, targets)}

## Output Requirements
Respond ONLY with a valid JSON object (no markdown fences) with this structure:
{
  "summary": { "en": "...", "zh": "..." },
  "anomalies": [{ "metric": "...", "scope": { "en": "...", "zh": "..." }, "severity": "high|medium|low", "changePercent": number, "description": { "en": "...", "zh": "..." } }],
  "hypotheses": [{ "title": { "en": "...", "zh": "..." }, "confidence": 0-1, "description": { "en": "...", "zh": "..." }, "supportingData": { "en": "...", "zh": "..." } }],
  "recommendations": [{ "title": { "en": "...", "zh": "..." }, "priority": "high|medium|low", "description": { "en": "...", "zh": "..." }, "effort": { "en": "...", "zh": "..." }, "expectedImpact": { "en": "...", "zh": "..." } }],
  "risks": [{ "en": "...", "zh": "..." }],
  "pendingChecks": [{ "en": "...", "zh": "..." }]
}

Separate known facts from inferred hypotheses. Rate confidence for each hypothesis.
Prioritize actionable recommendations over generic advice.
All text fields must be bilingual (en + zh).`,
  };

  const channelFilter = channels?.length ? `\nFocus channels: ${channels.join(", ")}` : "";
  const metricFilter = focusMetrics?.length ? `\nFocus metrics: ${focusMetrics.join(", ")}` : "";

  const user: Message = {
    role: "user",
    content: `Analyze the following data for period: ${timeRange}${channelFilter}${metricFilter}

## Current Metrics Snapshot
${metricsText}

## Detected Anomalies
${anomaliesText}

Produce your ${typeLabel[type]} diagnosis.`,
  };

  return [system, user];
}

// ── Report generation prompts ────────────────────────────

export function buildReportPrompt(params: {
  diagnosisSummary: string;
  reportType: string;
  audience: string;
  enterprise: EnterpriseProfile;
}): Message[] {
  const { diagnosisSummary, reportType, audience, enterprise } = params;

  const audienceInstruction: Record<string, string> = {
    ceo: "Keep the report under 300 words. Focus on conclusions, key risks, and decisions needed. No granular data.",
    ops: "Be detailed. Include data tables, root cause analysis, and specific action items with owners and deadlines.",
    all: "Balance detail and readability. Include an executive summary at the top, then detailed sections.",
  };

  const system: Message = {
    role: "system",
    content: `You are a professional business report writer for ${enterprise.companyName.en}.
Transform the structured diagnosis below into a polished ${reportType} report.

Target audience: ${audience} — ${audienceInstruction[audience] ?? audienceInstruction.all}

## Output Requirements
Respond ONLY with a valid JSON object (no markdown fences):
{
  "title": { "en": "...", "zh": "..." },
  "markdown": { "en": "full report in markdown", "zh": "完整中文报告 markdown" }
}

Use professional business language. Include data tables where appropriate.
Structure: Overall Conclusion → Key Anomalies → Cause Analysis → Action Suggestions → Risks.
All content must be bilingual.`,
  };

  const user: Message = {
    role: "user",
    content: `## Diagnosis Data
${diagnosisSummary}

Generate the ${reportType} report for ${audience} audience.`,
  };

  return [system, user];
}

// ── Agent task prompts ───────────────────────────────────

export function buildAgentPrompt(params: {
  agentType: string;
  input: Record<string, string>;
  enterprise: EnterpriseProfile;
  additionalContext?: string;
}): Message[] {
  const { agentType, input, enterprise, additionalContext } = params;

  const inputText = Object.entries(input)
    .map(([k, v]) => `  - ${k}: ${v}`)
    .join("\n");

  const system: Message = {
    role: "system",
    content: `You are an AI agent (${agentType}) working for ${enterprise.companyName.en}.
You execute specific business analysis tasks and return structured results.

Respond with a JSON object:
{
  "markdownOutput": { "en": "your analysis in markdown", "zh": "中文分析 markdown" },
  "structuredOutput": { ... relevant structured data ... }
}

Be specific, data-driven, and actionable. All text bilingual.
${additionalContext ?? ""}`,
  };

  const user: Message = {
    role: "user",
    content: `Execute the task with these inputs:
${inputText}`,
  };

  return [system, user];
}
