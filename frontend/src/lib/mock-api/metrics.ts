import type {
  MetricOverview, TrendPoint, ChannelMetrics, AnomalyItem,
  MetricKey, ChannelKey,
} from "@/types/api";
import { bi, rand, randInt, dateOffset, BASE_DATE, pick } from "./helpers";

// ── Overview KPIs (current week snapshot) ────────────────
export const mockMetricsOverview: MetricOverview[] = [
  { key: "gmv",            value: 2870000, previousValue: 3120000, changePercent: -8.0,  unit: "¥" },
  { key: "orders",         value: 18420,   previousValue: 20100,   changePercent: -8.4,  unit: "" },
  { key: "avgOrderValue",  value: 155.8,   previousValue: 155.2,   changePercent: 0.4,   unit: "¥" },
  { key: "conversionRate", value: 4.78,    previousValue: 5.12,    changePercent: -6.6,  unit: "%" },
  { key: "visitors",       value: 385000,  previousValue: 392000,  changePercent: -1.8,  unit: "" },
  { key: "refundRate",     value: 6.2,     previousValue: 4.8,     changePercent: 29.2,  unit: "%" },
  { key: "roi",            value: 2.34,    previousValue: 2.72,    changePercent: -14.0, unit: "" },
  { key: "adSpend",        value: 1226000, previousValue: 1147000, changePercent: 6.9,   unit: "¥" },
];

// ── 12 weeks of daily trend data (84 days) ──────────────
function generateDailyTrend(): TrendPoint[] {
  const points: TrendPoint[] = [];
  const startDay = -83; // 84 days back from BASE_DATE

  // Base values with weekly seasonality
  let gmvBase = 380000;
  let ordersBase = 2500;

  for (let d = 0; d < 84; d++) {
    const date = dateOffset(BASE_DATE, startDay + d);
    const dow = new Date(date).getDay();

    // Weekend boost
    const weekendMult = (dow === 0 || dow === 6) ? 1.25 : 1.0;
    // Gradual trend (slight decline in recent weeks to match anomalies)
    const trendMult = d < 60 ? 1.0 + (d * 0.002) : 1.12 - ((d - 60) * 0.005);
    // Random noise
    const noise = 0.9 + rand(0, 0.2);

    const gmv = Math.round(gmvBase * weekendMult * trendMult * noise);
    const orders = Math.round(ordersBase * weekendMult * trendMult * noise);
    const visitors = Math.round(orders / (rand(3.8, 5.8) / 100));
    const conversionRate = Math.round((orders / visitors) * 10000) / 100;
    const avgOrderValue = Math.round((gmv / orders) * 100) / 100;
    const adSpend = Math.round(gmv / rand(2.0, 3.0));
    const roi = Math.round((gmv / adSpend) * 100) / 100;
    const refundRate = rand(3.0, 7.5);

    points.push({
      date,
      metrics: {
        gmv,
        orders,
        avgOrderValue,
        conversionRate,
        visitors,
        refundRate,
        roi,
        adSpend,
      },
    });
  }
  return points;
}

export const mockTrendPoints: TrendPoint[] = generateDailyTrend();

// ── Channel breakdown ────────────────────────────────────
export const mockChannelMetrics: ChannelMetrics[] = [
  {
    channel: "tmall",
    gmv: 1180000, orders: 7200, visitors: 152000,
    conversionRate: 4.74, roi: 2.8, adSpend: 421000, refundRate: 4.2,
  },
  {
    channel: "douyin",
    gmv: 920000, orders: 6100, visitors: 198000,
    conversionRate: 3.08, roi: 1.9, adSpend: 484000, refundRate: 7.8,
  },
  {
    channel: "xiaohongshu",
    gmv: 380000, orders: 2400, visitors: 68000,
    conversionRate: 3.53, roi: 3.2, adSpend: 119000, refundRate: 3.1,
  },
  {
    channel: "jd",
    gmv: 260000, orders: 1800, visitors: 42000,
    conversionRate: 4.29, roi: 2.6, adSpend: 100000, refundRate: 5.5,
  },
  {
    channel: "pinduoduo",
    gmv: 95000, orders: 720, visitors: 28000,
    conversionRate: 2.57, roi: 1.5, adSpend: 63000, refundRate: 9.2,
  },
  {
    channel: "offline",
    gmv: 35000, orders: 200, visitors: 3200,
    conversionRate: 6.25, roi: 0, adSpend: 0, refundRate: 2.0,
  },
];

// ── Anomalies ────────────────────────────────────────────
export const mockAnomalies: AnomalyItem[] = [
  {
    id: "a1",
    metric: "conversionRate",
    scope: bi("Douyin — Brightening Serum", "抖音 — 亮肤精华液"),
    severity: "high",
    changePercent: -18.3,
    description: bi(
      "Conversion rate dropped from 3.8% to 3.1% week-over-week. Likely caused by increased competition from Proya serum launch and audience fatigue on existing creatives.",
      "转化率从3.8%降至3.1%（环比）。可能由珀莱雅精华新品上市竞争加剧及现有素材审美疲劳导致。"
    ),
    detectedAt: "2025-03-09 06:00",
  },
  {
    id: "a2",
    metric: "refundRate",
    scope: bi("All Channels — Sunscreen Milk", "全渠道 — 轻薄防晒乳"),
    severity: "high",
    changePercent: 55.0,
    description: bi(
      "Refund rate spiked to 8.4% for the new sunscreen SKU. Customer complaints cite greasy texture inconsistent with 'lightweight' claim. Batch quality check recommended.",
      "新防晒SKU退款率飙升至8.4%。客户投诉质地油腻与「轻薄」宣称不符。建议进行批次质检。"
    ),
    detectedAt: "2025-03-08 18:00",
  },
  {
    id: "a3",
    metric: "roi",
    scope: bi("Douyin — Overall", "抖音 — 整体"),
    severity: "medium",
    changePercent: -14.0,
    description: bi(
      "Douyin ROI declined from 2.2 to 1.9. Ad spend increased 12% but GMV only grew 3%. Livestream slot efficiency dropped during evening peak.",
      "抖音ROI从2.2降至1.9。广告投放增加12%，但GMV仅增长3%。晚间高峰直播效率下降。"
    ),
    detectedAt: "2025-03-09 08:00",
  },
  {
    id: "a4",
    metric: "orders",
    scope: bi("Tmall — Repair Cream", "天猫 — 修护面霜"),
    severity: "medium",
    changePercent: -12.5,
    description: bi(
      "Order volume for Repair Cream dropped 12.5%. Competitor Winona launched a 20% off promotion. Consider defensive pricing or bundle.",
      "修护面霜订单量下降12.5%。竞品薇诺娜推出8折促销。建议防御性定价或组合销售。"
    ),
    detectedAt: "2025-03-08 12:00",
  },
  {
    id: "a5",
    metric: "visitors",
    scope: bi("Xiaohongshu — Organic Traffic", "小红书 — 自然流量"),
    severity: "low",
    changePercent: 22.0,
    description: bi(
      "Positive anomaly: organic visitors up 22% from Xiaohongshu KOC seeding campaign reaching tipping point. Conversion stable at 3.5%.",
      "正向异常：小红书KOC种草活动达到引爆点，自然访客增长22%。转化率稳定在3.5%。"
    ),
    detectedAt: "2025-03-09 10:00",
  },
  {
    id: "a6",
    metric: "avgOrderValue",
    scope: bi("Pinduoduo — All Products", "拼多多 — 全部产品"),
    severity: "low",
    changePercent: -8.2,
    description: bi(
      "AOV on Pinduoduo dropped to ¥132 from ¥144. Platform-wide coupon stacking reduced effective price. Monitor margin impact.",
      "拼多多客单价从¥144降至¥132。平台优惠券叠加降低了实际售价。需监控利润率影响。"
    ),
    detectedAt: "2025-03-07 14:00",
  },
  {
    id: "a7",
    metric: "gmv",
    scope: bi("Tmall — Hyaluronic Acid Toner", "天猫 — 玻尿酸爽肤水"),
    severity: "low",
    changePercent: 15.3,
    description: bi(
      "Positive anomaly: Toner GMV up 15% driven by top-ranking in Tmall 'hydration' search results after recent review boost.",
      "正向异常：爽肤水GMV增长15%，源于近期评价提升后在天猫「保湿」搜索结果中排名靠前。"
    ),
    detectedAt: "2025-03-09 09:00",
  },
];
