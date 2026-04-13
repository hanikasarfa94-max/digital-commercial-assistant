/**
 * MockLLMProvider — returns pre-written responses with simulated latency.
 *
 * Used for offline development and demos. No external API calls.
 * Responses are context-aware: different prompts trigger different templates.
 */

import type { ILLMProvider, Message, CompletionOpts, CompletionResult } from "./interfaces";

const SIMULATED_DELAY_MS = 800;

export class MockLLMProvider implements ILLMProvider {
  readonly name = "mock";

  async complete(messages: Message[], opts?: CompletionOpts): Promise<CompletionResult> {
    await sleep(SIMULATED_DELAY_MS);
    const content = generateMockResponse(messages, opts);
    return {
      content,
      usage: { promptTokens: 500, completionTokens: 300, totalTokens: 800 },
      meta: { provider: "mock", simulated: true },
    };
  }

  async *stream(messages: Message[], opts?: CompletionOpts): AsyncGenerator<string, CompletionResult> {
    const content = generateMockResponse(messages, opts);
    const words = content.split(" ");
    let emitted = "";
    for (const word of words) {
      await sleep(30);
      const chunk = (emitted ? " " : "") + word;
      emitted += chunk;
      yield chunk;
    }
    return {
      content,
      usage: { promptTokens: 500, completionTokens: 300, totalTokens: 800 },
      meta: { provider: "mock", simulated: true },
    };
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Route the mock response based on message content.
 * Looks for keywords in the last user message to decide which template to use.
 */
function generateMockResponse(messages: Message[], opts?: CompletionOpts): string {
  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  const lower = lastUser.toLowerCase();

  if (opts?.jsonMode) {
    return generateJSONResponse(lower);
  }

  if (lower.includes("diagnosis") || lower.includes("诊断") || lower.includes("anomaly") || lower.includes("异常")) {
    return DIAGNOSIS_RESPONSE;
  }
  if (lower.includes("report") || lower.includes("报告") || lower.includes("weekly") || lower.includes("周报")) {
    return REPORT_RESPONSE;
  }
  if (lower.includes("competitor") || lower.includes("竞品")) {
    return COMPETITOR_RESPONSE;
  }
  if (lower.includes("campaign") || lower.includes("活动") || lower.includes("retro") || lower.includes("复盘")) {
    return CAMPAIGN_RESPONSE;
  }
  return GENERIC_RESPONSE;
}

function generateJSONResponse(context: string): string {
  if (context.includes("diagnosis") || context.includes("诊断")) {
    return JSON.stringify({
      summary: {
        en: "Overall performance under pressure this period. Key issues identified in conversion rate and refund metrics. Positive organic growth on content platforms provides an opportunity for rebalancing channel mix.",
        zh: "本期整体经营承压。转化率和退款指标发现关键问题。内容平台自然增长为渠道组合再平衡提供了机会。",
      },
      anomalies: [
        {
          metric: "conversionRate",
          scope: { en: "Douyin — Core Products", zh: "抖音 — 核心产品" },
          severity: "high",
          changePercent: -15.2,
          description: {
            en: "Conversion rate declined significantly, likely due to creative fatigue and increased competition.",
            zh: "转化率显著下降，可能由素材疲劳和竞争加剧导致。",
          },
        },
      ],
      hypotheses: [
        {
          title: { en: "Creative lifecycle exhaustion", zh: "素材生命周期耗尽" },
          confidence: 0.82,
          description: {
            en: "Top-performing creatives have exceeded their effective lifespan.",
            zh: "高表现素材已超过有效生命周期。",
          },
        },
      ],
      recommendations: [
        {
          title: { en: "Urgent creative refresh", zh: "紧急更新素材" },
          priority: "high",
          description: {
            en: "Produce 3-5 new short video creatives with fresh angles.",
            zh: "制作3-5条新短视频素材，采用全新角度。",
          },
          effort: { en: "2-3 days", zh: "2-3天" },
          expectedImpact: { en: "Recover conversion by 8-12%", zh: "恢复转化率8-12%" },
        },
      ],
      risks: [
        {
          en: "Without intervention, monthly target gap may widen to -20%.",
          zh: "若不干预，月度目标差距可能扩大至-20%。",
        },
      ],
      pendingChecks: [
        { en: "Verify batch quality for recent shipments", zh: "验证近期发货批次质量" },
      ],
    });
  }

  if (context.includes("report") || context.includes("报告")) {
    return JSON.stringify({
      title: { en: "Weekly Operating Review", zh: "周度经营复盘" },
      markdown: {
        en: "# Weekly Operating Review\n\n## Overall Conclusion\nPerformance was under pressure this period...\n\n## Key Anomalies\n| Metric | Change | Severity |\n|--------|--------|----------|\n| CVR | -15% | High |\n\n## Recommendations\n1. Refresh creatives urgently\n2. Investigate quality issues\n3. Scale organic channels",
        zh: "# 周度经营复盘\n\n## 总体结论\n本期经营承压...\n\n## 关键异常\n| 指标 | 变化 | 严重性 |\n|------|------|--------|\n| 转化率 | -15% | 高 |\n\n## 建议\n1. 紧急更新素材\n2. 调查质量问题\n3. 扩大自然流量渠道",
      },
    });
  }

  return JSON.stringify({
    result: "Analysis complete.",
    summary: {
      en: "The analysis has been completed successfully.",
      zh: "分析已成功完成。",
    },
  });
}

const DIAGNOSIS_RESPONSE = `## Operating Diagnosis Summary

**Overall Assessment:** Performance under pressure this period.

### Key Findings
1. **Conversion Rate Decline** — Down 15% on primary e-commerce channels, driven by creative fatigue and increased competition from new product launches by competitors.
2. **Refund Rate Spike** — New product SKU showing 8%+ refund rate, concentrated in early shipment batches. Customer complaints cite texture inconsistency.
3. **Organic Growth Bright Spot** — Content platform seeding campaign reaching tipping point with 22% organic visitor increase.

### Hypotheses
- Creative lifecycle exhaustion (confidence: 82%) — Top creatives exceeded 14-day effective lifespan
- Batch quality inconsistency (confidence: 65%) — Concentrated in specific shipment dates
- Competitor pricing pressure (confidence: 78%) — New competitor entry at 15% lower price point

### Recommended Actions
1. 🔴 **Urgent**: Refresh creatives within 48 hours
2. 🔴 **Urgent**: Pause ads for affected SKU, initiate quality check
3. 🟡 **This week**: Launch value bundle to counter competitor pricing
4. 🟡 **This week**: Double down on organic content channel momentum`;

const REPORT_RESPONSE = `# Weekly Operating Review

## Overall Conclusion
Overall performance was under pressure this period, with GMV declining 8% week-over-week. The primary drivers were conversion rate drops on paid channels and a quality-related refund spike on a newly launched SKU. However, organic growth on content platforms provides a positive signal for rebalancing.

## Key Metrics
| Metric | Current | Previous | Change |
|--------|---------|----------|--------|
| GMV | ¥2.87M | ¥3.12M | -8.0% |
| Orders | 18,420 | 20,100 | -8.4% |
| Conversion Rate | 4.78% | 5.12% | -6.6% |
| Refund Rate | 6.2% | 4.8% | +29.2% |
| ROI | 2.34 | 2.72 | -14.0% |

## Root Cause Analysis
1. **Creative fatigue** on primary paid channel — top 3 creatives exceeded effective lifespan
2. **Competitor entry** with aggressive pricing diverted traffic
3. **Batch quality issue** caused refund spike on new product launch

## Action Plan
- 🔴 Urgent: Creative refresh (3-5 new videos by end of week)
- 🔴 Urgent: Pause affected SKU advertising pending quality resolution
- 🟡 This week: Launch value bundle to counter competitor pricing
- 🟡 This week: Increase organic content budget by 30%

## Risk Watch
- Monthly GMV gap may widen to -25% without recovery on paid channels
- Platform quality warnings possible within 7 days if refund rate not addressed`;

const COMPETITOR_RESPONSE = `## Competitive Intelligence Report

### Recent Competitor Activity
1. **Primary Competitor** launched a directly competing product at 15% lower price point
   - Entered platform top 10 within 5 days
   - Aggressive first-order coupon (additional ¥30 off)
   - Effective price ~30% below our SKU

### Pricing Analysis
| Brand | Product | List Price | Effective Price |
|-------|---------|-----------|-----------------|
| Ours | Core SKU | ¥199 | ¥199 |
| Competitor | New Launch | ¥169 | ¥139 (with coupon) |

### Risk Assessment
- Direct competition to our hero product
- Price gap significant enough to divert traffic
- Competitor content strategy focusing on similar ingredients

### Recommended Response
- Value bundle (product + complementary item) rather than direct price matching
- Differentiate on ingredients and brand story
- Accelerate content seeding to maintain organic mindshare`;

const CAMPAIGN_RESPONSE = `## Campaign Retrospective

### Performance Summary
Campaign achieved 72% of GMV target. Strong performance on marketplace channels but underperformance on short-video platforms.

### Channel Breakdown
| Channel | Target | Actual | Achievement |
|---------|--------|--------|-------------|
| Marketplace A | ¥280K | ¥286K | 102% |
| Short Video | ¥200K | ¥130K | 65% |
| Content Platform | ¥100K | ¥88K | 88% |
| Others | ¥60K | ¥56K | 93% |

### Key Learnings
1. Short-video budget scaling beyond 2x requires audience segmentation adjustment
2. Incremental scaling (50% per week) is safer than aggressive burst
3. Content platform provides best ROI but limited scale

### Recommendations for Next Campaign
1. Cap short-video budget increase at 50% per week
2. Pre-seed content platform 2 weeks before launch
3. Prepare contingency bundles for competitive response`;

const GENERIC_RESPONSE = `## Analysis Complete

Based on the provided data and business context, here are the key observations:

1. **Performance Trend**: The overall trajectory shows signs of pressure from multiple factors including competitive dynamics and operational challenges.

2. **Key Opportunities**: Organic growth channels showing strong momentum that can be leveraged for more cost-effective growth.

3. **Risk Areas**: Quality control and creative refresh cadence need attention to prevent further metric decline.

4. **Recommended Next Steps**:
   - Address urgent operational issues first
   - Optimize channel mix toward higher-ROI channels
   - Invest in content and brand-building for sustainable growth`;
