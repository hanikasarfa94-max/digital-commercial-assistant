import type { IDiagnosisRepository, PaginationOpts, PaginatedResult } from "../interfaces";
import type { DiagnosisResult, DiagnosisType, ChannelKey, MetricKey } from "@/types/api";
import { getStore } from "./store";
import { getLLM, completeJSON } from "@/lib/llm";
import { buildDiagnosisPrompt } from "@/lib/llm/prompts";

type DiagnosisLLMOutput = {
  summary: { en: string; zh: string };
  anomalies: Array<{
    metric: string;
    scope: { en: string; zh: string };
    severity: "high" | "medium" | "low";
    changePercent: number;
    description: { en: string; zh: string };
  }>;
  hypotheses: Array<{
    title: { en: string; zh: string };
    confidence: number;
    description: { en: string; zh: string };
    supportingData?: { en: string; zh: string };
  }>;
  recommendations: Array<{
    title: { en: string; zh: string };
    priority: "high" | "medium" | "low";
    description: { en: string; zh: string };
    effort: { en: string; zh: string };
    expectedImpact: { en: string; zh: string };
  }>;
  risks: Array<{ en: string; zh: string }>;
  pendingChecks: Array<{ en: string; zh: string }>;
};

export class MockDiagnosisRepository implements IDiagnosisRepository {
  async list(
    opts?: PaginationOpts & { type?: DiagnosisType }
  ): Promise<PaginatedResult<DiagnosisResult>> {
    const store = getStore();
    const page = opts?.page ?? 1;
    const pageSize = opts?.pageSize ?? 20;
    let items = Array.from(store.diagnoses.values());
    // Sort newest first
    items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    if (opts?.type) items = items.filter((d) => d.type === opts.type);
    const total = items.length;
    const start = (page - 1) * pageSize;
    return {
      items: items.slice(start, start + pageSize),
      total,
      page,
      pageSize,
    };
  }

  async getById(id: string): Promise<DiagnosisResult | null> {
    return getStore().diagnoses.get(id) ?? null;
  }

  async create(data: {
    type: DiagnosisType;
    timeRange: string;
    channels?: ChannelKey[];
    focusMetrics?: MetricKey[];
  }): Promise<DiagnosisResult> {
    const store = getStore();
    const id = store.nextId("d");
    const now = store.now();

    // Create the diagnosis in "running" state
    const diagnosis: DiagnosisResult = {
      id,
      type: data.type,
      title: {
        en: `${data.type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} — ${data.timeRange}`,
        zh: getDiagnosisTypeZh(data.type) + " — " + data.timeRange,
      },
      status: "running",
      timeRange: data.timeRange,
      createdAt: now,
      summary: { en: "", zh: "" },
      anomalies: [],
      hypotheses: [],
      risks: [],
      recommendations: [],
      pendingChecks: [],
    };

    store.diagnoses.set(id, diagnosis);

    // Run LLM in background (non-blocking)
    this.runDiagnosisLLM(id, data).catch((err) => {
      console.error(`[Diagnosis] LLM failed for ${id}:`, err);
      const d = store.diagnoses.get(id);
      if (d) {
        d.status = "failed";
        d.summary = {
          en: `Diagnosis failed: ${err.message}`,
          zh: `诊断失败: ${err.message}`,
        };
      }
    });

    return diagnosis;
  }

  private async runDiagnosisLLM(
    id: string,
    data: {
      type: DiagnosisType;
      timeRange: string;
      channels?: ChannelKey[];
      focusMetrics?: MetricKey[];
    }
  ): Promise<void> {
    const store = getStore();
    const llm = getLLM();

    // Gather context from the store
    const messages = buildDiagnosisPrompt({
      type: data.type,
      timeRange: data.timeRange,
      channels: data.channels,
      focusMetrics: data.focusMetrics,
      enterprise: store.enterprise,
      targets: store.bizTargets,
      metrics: store.metricsOverview,
      anomalies: store.anomalies,
    });

    // Call LLM
    const result = await completeJSON<DiagnosisLLMOutput>(llm, messages, {
      temperature: 0.5,
      maxTokens: 4096,
    });

    // Update the diagnosis record with LLM output
    const diagnosis = store.diagnoses.get(id);
    if (!diagnosis) return;

    diagnosis.status = "completed";
    diagnosis.completedAt = store.now();
    diagnosis.summary = result.summary;
    diagnosis.anomalies = result.anomalies.map((a, i) => ({
      id: `${id}-a${i + 1}`,
      metric: a.metric as MetricKey,
      scope: a.scope,
      severity: a.severity,
      changePercent: a.changePercent,
      description: a.description,
      detectedAt: store.now(),
    }));
    diagnosis.hypotheses = result.hypotheses.map((h, i) => ({
      id: `${id}-h${i + 1}`,
      title: h.title,
      description: h.description,
      confidence: h.confidence,
      supportingData: h.supportingData ?? { en: "", zh: "" },
    }));
    diagnosis.recommendations = result.recommendations.map((r, i) => ({
      id: `${id}-rec${i + 1}`,
      title: r.title,
      priority: r.priority,
      description: r.description,
      effort: r.effort,
      expectedImpact: r.expectedImpact,
    }));
    diagnosis.risks = result.risks;
    diagnosis.pendingChecks = result.pendingChecks;
  }
}

function getDiagnosisTypeZh(type: DiagnosisType): string {
  const map: Record<DiagnosisType, string> = {
    weekly_review: "周度经营诊断",
    campaign_retro: "活动复盘",
    anomaly_deep_dive: "异常深度分析",
  };
  return map[type] ?? type;
}
