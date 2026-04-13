/**
 * ZOVI API Contract — all request / response shapes.
 * When a real backend exists, this file stays; only the fetch target changes.
 */

// ─── Common ──────────────────────────────────────────────
export type Bilingual = { en: string; zh: string };

export type PaginatedRequest = {
  page?: number;   // 1-based, default 1
  pageSize?: number; // default 20
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
};

// ─── Auth ────────────────────────────────────────────────
export type Role = "ceo" | "ops_lead" | "analyst" | "product_manager" | "douyin_lead";

export type LoginRequest = {
  role: Role;
};

export type User = {
  id: string;
  name: Bilingual;
  role: Role;
  avatar?: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

// ─── Metrics / Dashboard ─────────────────────────────────
export type MetricKey =
  | "gmv" | "orders" | "avgOrderValue" | "conversionRate"
  | "visitors" | "refundRate" | "roi" | "adSpend";

export type MetricOverview = {
  key: MetricKey;
  value: number;
  previousValue: number;
  changePercent: number;   // positive = up
  unit: string;            // "¥", "%", ""
};

export type TrendPoint = {
  date: string;            // "2025-03-01"
  metrics: Record<MetricKey, number>;
};

export type ChannelKey = "tmall" | "douyin" | "xiaohongshu" | "jd" | "pinduoduo" | "offline";

export type ChannelMetrics = {
  channel: ChannelKey;
  gmv: number;
  orders: number;
  visitors: number;
  conversionRate: number;
  roi: number;
  adSpend: number;
  refundRate: number;
};

export type ProductMetrics = {
  sku: string;
  name: Bilingual;
  gmv: number;
  orders: number;
  conversionRate: number;
  refundRate: number;
  avgOrderValue: number;
};

export type AnomalyItem = {
  id: string;
  metric: MetricKey;
  scope: Bilingual;       // e.g. "Douyin — Brightening Serum"
  severity: "high" | "medium" | "low";
  changePercent: number;
  description: Bilingual;
  detectedAt: string;
};

export type MetricsOverviewResponse = {
  period: { start: string; end: string };
  metrics: MetricOverview[];
};

export type MetricsTrendResponse = {
  period: { start: string; end: string };
  granularity: "daily" | "weekly";
  points: TrendPoint[];
};

export type MetricsChannelsResponse = {
  period: { start: string; end: string };
  channels: ChannelMetrics[];
};

export type MetricsProductsResponse = {
  period: { start: string; end: string };
  products: ProductMetrics[];
};

export type MetricsAnomaliesResponse = {
  period: { start: string; end: string };
  anomalies: AnomalyItem[];
};

// ─── Data Center ─────────────────────────────────────────
export type DataSourceType = "csv" | "excel" | "api" | "manual";

export type DataSource = {
  id: string;
  name: Bilingual;
  type: DataSourceType;
  channel: ChannelKey | "all";
  lastSync: string;
  recordCount: number;
  status: "active" | "error" | "pending";
};

export type FieldMapping = {
  sourceField: string;
  targetField: string;
  type: "string" | "number" | "date" | "enum";
  sample: string;
};

export type ImportRecord = {
  id: string;
  sourceId: string;
  sourceName: Bilingual;
  fileName: string;
  status: "success" | "failed" | "processing";
  recordCount: number;
  errors: number;
  importedAt: string;
};

export type DataUploadRequest = {
  file: File;
  sourceType: DataSourceType;
  channel: ChannelKey;
};

export type DataSourcesResponse = {
  sources: DataSource[];
};

export type ImportHistoryResponse = PaginatedResponse<ImportRecord>;

// ─── Knowledge Center ────────────────────────────────────
export type EnterpriseProfile = {
  companyName: Bilingual;
  industry: Bilingual;
  brandPositioning: Bilingual;
  coreCategories: Bilingual;
  businessModel: Bilingual;
  channels: Bilingual;
  teamStructure: Bilingual[];
};

export type ProductRecord = {
  sku: string;
  name: Bilingual;
  category: Bilingual;
  price: number;
  lifecycle: Bilingual;
  sellingPoints: Bilingual;
  competitors: Bilingual;
  launchDate: string;
  monthlySales?: number;
};

export type BizTarget = {
  id: string;
  metric: MetricKey;
  metricLabel: Bilingual;
  targetValue: string;
  currentValue: string;
  gap: string;
  period: Bilingual;
  deadline: string;
};

export type HistoricalCase = {
  id: string;
  name: Bilingual;
  period: Bilingual;
  outcome: "win" | "loss" | "mixed";
  summary: Bilingual;
  lessons: Bilingual;
  relatedProducts: string[]; // sku[]
};

export type PromptTemplate = {
  id: string;
  name: Bilingual;
  description: Bilingual;
  usedIn: ("diagnosis" | "report" | "agent")[];
  enabled: boolean;
  template: string;
  variables: string[];      // e.g. ["company_name", "time_range"]
};

// ─── Diagnosis ───────────────────────────────────────────
export type DiagnosisType = "weekly_review" | "campaign_retro" | "anomaly_deep_dive";

export type DiagnosisStatus = "running" | "completed" | "failed";

export type Hypothesis = {
  id: string;
  title: Bilingual;
  description: Bilingual;
  confidence: number;       // 0-1
  supportingData: Bilingual;
};

export type Recommendation = {
  id: string;
  title: Bilingual;
  description: Bilingual;
  priority: "high" | "medium" | "low";
  effort: Bilingual;
  expectedImpact: Bilingual;
};

export type DiagnosisResult = {
  id: string;
  type: DiagnosisType;
  title: Bilingual;
  status: DiagnosisStatus;
  timeRange: string;        // "2025-W10"
  createdAt: string;
  completedAt?: string;
  summary: Bilingual;
  anomalies: AnomalyItem[];
  hypotheses: Hypothesis[];
  risks: Bilingual[];
  recommendations: Recommendation[];
  pendingChecks: Bilingual[];
};

export type DiagnosisRunRequest = {
  type: DiagnosisType;
  timeRange: string;
  channels?: ChannelKey[];
  focusMetrics?: MetricKey[];
};

export type DiagnosisListResponse = PaginatedResponse<DiagnosisResult>;

// ─── Reports ─────────────────────────────────────────────
export type ReportType = "weekly" | "campaign" | "ceo_summary" | "action_list";

export type ReportStatus = "draft" | "in_progress" | "review" | "approved" | "rejected" | "archived";

export type StatusHistoryEntry = {
  from: ReportStatus;
  to: ReportStatus;
  changedBy: string;        // role key
  changedAt: string;
  note?: string;
};

export type VersionEntry = {
  version: number;
  createdAt: string;
  createdBy: string;
  note: Bilingual;
  isCurrent: boolean;
};

export type FeedbackEntry = {
  id: string;
  score: 1 | 2 | 3 | 4 | 5;
  comment: Bilingual;
  by: string;               // role key
  createdAt: string;
};

export type Report = {
  id: string;
  title: Bilingual;
  type: ReportType;
  status: ReportStatus;
  ownerKey: string;
  currentVersion: number;
  date: string;
  sourceDiagnosisId: string | null;
  markdown: Bilingual;
  statusHistory: StatusHistoryEntry[];
  versions: VersionEntry[];
  feedback: FeedbackEntry[];
};

export type ReportGenerateRequest = {
  diagnosisId: string;
  type: ReportType;
  audience: "ops" | "ceo" | "all";
};

export type ReportUpdateStatusRequest = {
  status: ReportStatus;
  note?: string;
};

export type ReportFeedbackRequest = {
  score: 1 | 2 | 3 | 4 | 5;
  comment: string;
};

export type ReportListResponse = PaginatedResponse<Omit<Report, "markdown">>;

// ─── Agents ──────────────────────────────────────────────
export type AgentFieldType = "select" | "date_range" | "text" | "multi_select" | "number";

export type AgentField = {
  key: string;
  label: Bilingual;
  type: AgentFieldType;
  required: boolean;
  options?: { value: string; label: Bilingual }[];
  placeholder?: Bilingual;
};

export type AgentDef = {
  id: string;
  name: Bilingual;
  description: Bilingual;
  icon: string;             // lucide icon name
  fields: AgentField[];
  estimatedDuration: Bilingual;
};

export type AgentRunStatus = "running" | "completed" | "failed";

export type AgentRun = {
  id: string;
  agentId: string;
  agentName: Bilingual;
  status: AgentRunStatus;
  input: Record<string, string>;
  startedAt: string;
  completedAt?: string;
  duration?: number;         // seconds
  structuredOutput?: Record<string, unknown>;
  markdownOutput?: Bilingual;
};

export type AgentRunRequest = {
  agentId: string;
  input: Record<string, string>;
};

export type AgentListResponse = {
  agents: AgentDef[];
};

export type AgentRunListResponse = PaginatedResponse<AgentRun>;

// ─── Workspace ───────────────────────────────────────────
export type PendingTask = {
  id: string;
  title: Bilingual;
  assignee: string;         // role key
  priority: "high" | "medium" | "low";
  dueDate: string;
  status: "pending" | "in_progress" | "completed";
};

export type WorkspaceResponse = {
  metricsSnapshot: MetricOverview[];
  recentAnomalies: AnomalyItem[];
  recentReports: Omit<Report, "markdown">[];
  recentAgentRuns: AgentRun[];
  pendingTasks: PendingTask[];
};
