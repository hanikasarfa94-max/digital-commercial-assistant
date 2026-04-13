/**
 * Repository registry — returns the active data-source implementation.
 *
 * Currently: mock data (in-memory).
 * To switch to a real database:
 *   1. Create implementations in ./postgres/ (or ./prisma/, ./drizzle/, etc.)
 *   2. Set NEXT_PUBLIC_DATA_SOURCE=postgres in .env
 *   3. Add a case below
 *
 * All API routes call `getRepo()` — they never know which backend is active.
 */

import type { IRepositories } from "./interfaces";
import {
  MockAuthRepository,
  MockMetricsRepository,
  MockDataCenterRepository,
  MockKnowledgeRepository,
  MockDiagnosisRepository,
  MockReportsRepository,
  MockAgentsRepository,
  MockWorkspaceRepository,
} from "./mock";

// Singleton instances — created once, reused across requests.
let _repos: IRepositories | null = null;

function createMockRepositories(): IRepositories {
  return {
    auth: new MockAuthRepository(),
    metrics: new MockMetricsRepository(),
    dataCenter: new MockDataCenterRepository(),
    knowledge: new MockKnowledgeRepository(),
    diagnosis: new MockDiagnosisRepository(),
    reports: new MockReportsRepository(),
    agents: new MockAgentsRepository(),
    workspace: new MockWorkspaceRepository(),
  };
}

/**
 * Get the repository registry.
 * Call this in every API route handler to access data.
 */
export function getRepo(): IRepositories {
  if (_repos) return _repos;

  const source = process.env.NEXT_PUBLIC_DATA_SOURCE ?? "mock";

  switch (source) {
    case "mock":
      _repos = createMockRepositories();
      break;
    // Future: case "postgres": _repos = createPostgresRepositories(); break;
    // Future: case "supabase": _repos = createSupabaseRepositories(); break;
    default:
      _repos = createMockRepositories();
  }

  return _repos;
}

// Re-export interfaces for convenience
export type {
  IRepositories,
  IAuthRepository,
  IMetricsRepository,
  IDataCenterRepository,
  IKnowledgeRepository,
  IDiagnosisRepository,
  IReportsRepository,
  IAgentsRepository,
  IWorkspaceRepository,
  PaginationOpts,
  PaginatedResult,
} from "./interfaces";
