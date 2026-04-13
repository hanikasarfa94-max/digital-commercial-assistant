import type { IWorkspaceRepository } from "../interfaces";
import { getStore } from "./store";

export class MockWorkspaceRepository implements IWorkspaceRepository {
  async getWorkspace() {
    const store = getStore();

    const recentReports = Array.from(store.reports.values())
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 5)
      .map(({ markdown: _md, ...rest }) => rest);

    const recentRuns = Array.from(store.agentRuns.values())
      .sort((a, b) => b.startedAt.localeCompare(a.startedAt))
      .slice(0, 5);

    const recentAnomalies = store.anomalies
      .filter((a) => a.severity === "high" || a.severity === "medium")
      .slice(0, 5);

    return {
      metricsSnapshot: store.metricsOverview,
      recentAnomalies,
      recentReports,
      recentAgentRuns: recentRuns,
      pendingTasks: store.pendingTasks,
    };
  }
}
