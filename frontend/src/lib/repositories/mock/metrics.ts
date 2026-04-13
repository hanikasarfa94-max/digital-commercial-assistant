import type { IMetricsRepository } from "../interfaces";
import { getStore } from "./store";
import { BASE_DATE } from "@/lib/mock-api/helpers";

export class MockMetricsRepository implements IMetricsRepository {
  private readonly period = { start: "2025-03-03", end: "2025-03-09" };

  async getOverview() {
    return { period: this.period, metrics: getStore().metricsOverview };
  }

  async getTrend(days?: number) {
    const store = getStore();
    const pts = days ? store.trendPoints.slice(-days) : store.trendPoints;
    const start = pts[0]?.date ?? BASE_DATE;
    const end = pts[pts.length - 1]?.date ?? BASE_DATE;
    return {
      period: { start, end },
      granularity: "daily" as const,
      points: pts,
    };
  }

  async getChannels() {
    return { period: this.period, channels: getStore().channelMetrics };
  }

  async getProducts() {
    return { period: this.period, products: getStore().productMetricsGenerator(this.period) };
  }

  async getAnomalies() {
    return { period: this.period, anomalies: getStore().anomalies };
  }
}
