/**
 * In-memory store — mutable state that persists across requests during a server session.
 *
 * Seed data comes from mock-api modules. All CRUD operations mutate this store.
 * When a real database is connected, this entire file becomes irrelevant.
 */

import type {
  User,
  DiagnosisResult,
  Report,
  AgentDef,
  AgentRun,
  DataSource,
  ImportRecord,
  FieldMapping,
  EnterpriseProfile,
  ProductRecord,
  BizTarget,
  HistoricalCase,
  PromptTemplate,
  MetricOverview,
  TrendPoint,
  ChannelMetrics,
  AnomalyItem,
  PendingTask,
} from "@/types/api";

// Seed imports
import { mockMetricsOverview, mockTrendPoints, mockChannelMetrics, mockAnomalies } from "@/lib/mock-api/metrics";
import { mockProducts, generateProductMetrics } from "@/lib/mock-api/products";
import { mockEnterprise, mockBizTargets, mockCases, mockPromptTemplates } from "@/lib/mock-api/knowledge";
import { mockDiagnosisResults } from "@/lib/mock-api/diagnosis";
import { mockReports } from "@/lib/mock-api/reports";
import { mockAgentDefs, mockAgentRuns } from "@/lib/mock-api/agents";
import { mockDataSources, mockImportHistory, mockFieldMappings } from "@/lib/mock-api/data-center";
import { mockUsers, mockPendingTasks } from "@/lib/mock-api/workspace";

export class InMemoryStore {
  // Auth
  users: User[];

  // Metrics (read-only seed, but stored here for consistency)
  metricsOverview: MetricOverview[];
  trendPoints: TrendPoint[];
  channelMetrics: ChannelMetrics[];
  anomalies: AnomalyItem[];
  productMetricsGenerator: typeof generateProductMetrics;

  // Data Center
  dataSources: DataSource[];
  importHistory: ImportRecord[];
  fieldMappings: FieldMapping[];

  // Knowledge
  enterprise: EnterpriseProfile;
  products: ProductRecord[];
  bizTargets: BizTarget[];
  cases: HistoricalCase[];
  promptTemplates: PromptTemplate[];

  // Diagnosis
  diagnoses: Map<string, DiagnosisResult>;

  // Reports
  reports: Map<string, Report>;

  // Agents
  agentDefs: AgentDef[];
  agentRuns: Map<string, AgentRun>;

  // Workspace
  pendingTasks: PendingTask[];

  // ID counters
  private _idCounter = 0;

  constructor() {
    // Auth
    this.users = [...mockUsers];

    // Metrics
    this.metricsOverview = [...mockMetricsOverview];
    this.trendPoints = [...mockTrendPoints];
    this.channelMetrics = [...mockChannelMetrics];
    this.anomalies = [...mockAnomalies];
    this.productMetricsGenerator = generateProductMetrics;

    // Data Center
    this.dataSources = [...mockDataSources];
    this.importHistory = [...mockImportHistory];
    this.fieldMappings = [...mockFieldMappings];

    // Knowledge
    this.enterprise = { ...mockEnterprise };
    this.products = [...mockProducts];
    this.bizTargets = [...mockBizTargets];
    this.cases = [...mockCases];
    this.promptTemplates = [...mockPromptTemplates];

    // Diagnosis — deep copy into mutable map
    this.diagnoses = new Map();
    for (const d of mockDiagnosisResults) {
      this.diagnoses.set(d.id, structuredClone(d));
    }

    // Reports — deep copy into mutable map
    this.reports = new Map();
    for (const r of mockReports) {
      this.reports.set(r.id, structuredClone(r));
    }

    // Agents
    this.agentDefs = [...mockAgentDefs];
    this.agentRuns = new Map();
    for (const run of mockAgentRuns) {
      this.agentRuns.set(run.id, structuredClone(run));
    }

    // Workspace
    this.pendingTasks = [...mockPendingTasks];
  }

  /** Generate a unique ID with a prefix */
  nextId(prefix: string): string {
    this._idCounter++;
    return `${prefix}-${Date.now()}-${this._idCounter}`;
  }

  /** Current timestamp string */
  now(): string {
    return new Date().toISOString().slice(0, 16).replace("T", " ");
  }

  /** Current date string */
  today(): string {
    return new Date().toISOString().slice(0, 10);
  }
}

// ── Singleton ────────────────────────────────────────────
let _store: InMemoryStore | null = null;

export function getStore(): InMemoryStore {
  if (!_store) _store = new InMemoryStore();
  return _store;
}

/** Reset store to seed state (useful for testing) */
export function resetStore(): void {
  _store = new InMemoryStore();
}
