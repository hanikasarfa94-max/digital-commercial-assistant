/**
 * Repository interfaces — the contracts every data source must implement.
 *
 * When a real backend/database is ready, create a new implementation
 * (e.g. PostgresMetricsRepository) that satisfies the same interface,
 * then swap it in the registry. All route handlers stay unchanged.
 */

import type {
  // Auth
  User,
  Role,
  LoginResponse,
  // Metrics
  MetricOverview,
  TrendPoint,
  ChannelMetrics,
  ProductMetrics,
  AnomalyItem,
  // Data Center
  DataSource,
  ImportRecord,
  FieldMapping,
  // Knowledge
  EnterpriseProfile,
  ProductRecord,
  BizTarget,
  HistoricalCase,
  PromptTemplate,
  // Diagnosis
  DiagnosisResult,
  DiagnosisType,
  ChannelKey,
  MetricKey,
  // Reports
  Report,
  ReportType,
  ReportStatus,
  StatusHistoryEntry,
  FeedbackEntry,
  // Agents
  AgentDef,
  AgentRun,
  // Workspace
  PendingTask,
} from "@/types/api";

// ─── Pagination helper ──────────────────────────────────
export type PaginationOpts = {
  page?: number;
  pageSize?: number;
};

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

// ─── Auth ────────────────────────────────────────────────
export interface IAuthRepository {
  login(role: Role): Promise<LoginResponse>;
  getUserByToken(token: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
}

// ─── Metrics ─────────────────────────────────────────────
export interface IMetricsRepository {
  getOverview(): Promise<{
    period: { start: string; end: string };
    metrics: MetricOverview[];
  }>;
  getTrend(days?: number): Promise<{
    period: { start: string; end: string };
    granularity: "daily" | "weekly";
    points: TrendPoint[];
  }>;
  getChannels(): Promise<{
    period: { start: string; end: string };
    channels: ChannelMetrics[];
  }>;
  getProducts(): Promise<{
    period: { start: string; end: string };
    products: ProductMetrics[];
  }>;
  getAnomalies(): Promise<{
    period: { start: string; end: string };
    anomalies: AnomalyItem[];
  }>;
}

// ─── Data Center ─────────────────────────────────────────
export interface IDataCenterRepository {
  getSources(): Promise<{ sources: DataSource[] }>;
  getImportHistory(opts?: PaginationOpts): Promise<PaginatedResult<ImportRecord>>;
  getFieldMappings(): Promise<FieldMapping[]>;
}

// ─── Knowledge ───────────────────────────────────────────
export interface IKnowledgeRepository {
  getEnterprise(): Promise<EnterpriseProfile>;
  updateEnterprise(data: Partial<EnterpriseProfile>): Promise<EnterpriseProfile>;
  getProducts(): Promise<{ products: ProductRecord[] }>;
  getTargets(): Promise<{ targets: BizTarget[] }>;
  getCases(): Promise<{ cases: HistoricalCase[] }>;
  getPrompts(): Promise<{ prompts: PromptTemplate[] }>;
}

// ─── Diagnosis ───────────────────────────────────────────
export interface IDiagnosisRepository {
  list(opts?: PaginationOpts & { type?: DiagnosisType }): Promise<PaginatedResult<DiagnosisResult>>;
  getById(id: string): Promise<DiagnosisResult | null>;
  create(data: {
    type: DiagnosisType;
    timeRange: string;
    channels?: ChannelKey[];
    focusMetrics?: MetricKey[];
  }): Promise<DiagnosisResult>;
}

// ─── Reports ─────────────────────────────────────────────
export interface IReportsRepository {
  list(opts?: PaginationOpts & {
    status?: ReportStatus;
    type?: ReportType;
  }): Promise<PaginatedResult<Omit<Report, "markdown">>>;
  getById(id: string): Promise<Report | null>;
  create(data: {
    diagnosisId: string;
    type: ReportType;
    audience: string;
  }): Promise<Report>;
  updateStatus(id: string, data: {
    status: ReportStatus;
    currentStatus?: string;
    note?: string;
  }): Promise<StatusHistoryEntry>;
  addFeedback(id: string, data: {
    score: number;
    comment: string;
  }): Promise<FeedbackEntry>;
}

// ─── Agents ──────────────────────────────────────────────
export interface IAgentsRepository {
  listAgents(): Promise<{ agents: AgentDef[] }>;
  listRuns(opts?: PaginationOpts): Promise<PaginatedResult<AgentRun>>;
  getAgentById(id: string): Promise<AgentDef | null>;
  getRunById(id: string): Promise<AgentRun | null>;
  createRun(agentId: string, input: Record<string, string>): Promise<AgentRun>;
}

// ─── Workspace ───────────────────────────────────────────
export interface IWorkspaceRepository {
  getWorkspace(): Promise<{
    metricsSnapshot: MetricOverview[];
    recentAnomalies: AnomalyItem[];
    recentReports: Omit<Report, "markdown">[];
    recentAgentRuns: AgentRun[];
    pendingTasks: PendingTask[];
  }>;
}

// ─── Combined registry type ─────────────────────────────
export interface IRepositories {
  auth: IAuthRepository;
  metrics: IMetricsRepository;
  dataCenter: IDataCenterRepository;
  knowledge: IKnowledgeRepository;
  diagnosis: IDiagnosisRepository;
  reports: IReportsRepository;
  agents: IAgentsRepository;
  workspace: IWorkspaceRepository;
}
