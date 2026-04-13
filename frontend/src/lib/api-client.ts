/**
 * API client — thin wrapper around fetch.
 *
 * In demo mode, calls Next.js route handlers at /api/...
 * When a real backend exists, change API_BASE to the backend URL.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "/api";

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
};

export async function api<T>(path: string, opts: FetchOptions = {}): Promise<T> {
  const { method = "GET", body, params, headers = {} } = opts;

  let url = `${API_BASE}${path}`;
  if (params) {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined) sp.set(k, String(v));
    }
    const qs = sp.toString();
    if (qs) url += `?${qs}`;
  }

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? `API error ${res.status}`);
  }

  const json = await res.json();
  return json.data as T;
}

// ── Typed endpoint helpers ───────────────────────────────
import type {
  MetricsOverviewResponse,
  MetricsTrendResponse,
  MetricsChannelsResponse,
  MetricsProductsResponse,
  MetricsAnomaliesResponse,
  DataSourcesResponse,
  ImportHistoryResponse,
  EnterpriseProfile,
  ProductRecord,
  BizTarget,
  HistoricalCase,
  PromptTemplate,
  DiagnosisResult,
  DiagnosisListResponse,
  DiagnosisRunRequest,
  Report,
  ReportListResponse,
  AgentListResponse,
  AgentRun,
  AgentRunListResponse,
  WorkspaceResponse,
  LoginRequest,
  LoginResponse,
  User,
} from "@/types/api";

// Auth
export const authApi = {
  login: (data: LoginRequest) => api<LoginResponse>("/auth/login", { method: "POST", body: data }),
  me: () => api<User>("/auth/me"),
};

// Metrics
export const metricsApi = {
  overview: () => api<MetricsOverviewResponse>("/metrics/overview"),
  trend: (days?: number) => api<MetricsTrendResponse>("/metrics/trend", { params: { days } }),
  channels: () => api<MetricsChannelsResponse>("/metrics/channels"),
  products: () => api<MetricsProductsResponse>("/metrics/products"),
  anomalies: () => api<MetricsAnomaliesResponse>("/metrics/anomalies"),
};

// Data Center
export const dataApi = {
  sources: () => api<DataSourcesResponse>("/data/sources"),
  imports: (page?: number, pageSize?: number) => api<ImportHistoryResponse>("/data/imports", { params: { page, pageSize } }),
};

// Knowledge
export const knowledgeApi = {
  enterprise: () => api<EnterpriseProfile>("/knowledge/enterprise"),
  updateEnterprise: (data: Partial<EnterpriseProfile>) => api<EnterpriseProfile>("/knowledge/enterprise", { method: "PUT", body: data }),
  products: () => api<{ products: ProductRecord[] }>("/knowledge/products"),
  targets: () => api<{ targets: BizTarget[] }>("/knowledge/targets"),
  cases: () => api<{ cases: HistoricalCase[] }>("/knowledge/cases"),
  prompts: () => api<{ prompts: PromptTemplate[] }>("/knowledge/prompts"),
};

// Diagnosis
export const diagnosisApi = {
  list: (page?: number, type?: string) => api<DiagnosisListResponse>("/diagnosis", { params: { page, type } }),
  get: (id: string) => api<DiagnosisResult>(`/diagnosis/${id}`),
  run: (data: DiagnosisRunRequest) => api<DiagnosisResult>("/diagnosis", { method: "POST", body: data }),
};

// Reports
export const reportsApi = {
  list: (page?: number, status?: string, type?: string) => api<ReportListResponse>("/reports", { params: { page, status, type } }),
  get: (id: string) => api<Report>(`/reports/${id}`),
  generate: (data: { diagnosisId: string; type: string; audience: string }) => api<Report>("/reports", { method: "POST", body: data }),
  updateStatus: (id: string, data: { status: string; currentStatus?: string; note?: string }) => api<unknown>(`/reports/${id}/status`, { method: "PATCH", body: data }),
  addFeedback: (id: string, data: { score: number; comment: string }) => api<unknown>(`/reports/${id}/feedback`, { method: "POST", body: data }),
};

// Agents
export const agentsApi = {
  list: (includeRuns = false) => api<AgentListResponse>("/agents", { params: { includeRuns } }),
  listWithRuns: (page?: number) => api<AgentListResponse & { runs: AgentRunListResponse }>("/agents", { params: { includeRuns: true, page } }),
  run: (agentId: string, input: Record<string, string>) => api<AgentRun>(`/agents/${agentId}/run`, { method: "POST", body: { input } }),
  getRun: (runId: string) => api<AgentRun>(`/agent-runs/${runId}`),
};

// Workspace
export const workspaceApi = {
  get: () => api<WorkspaceResponse>("/workspace"),
};
