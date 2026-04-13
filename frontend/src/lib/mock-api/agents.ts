import type { AgentDef, AgentRun } from "@/types/api";
import { bi } from "./helpers";

export const mockAgentDefs: AgentDef[] = [
  {
    id: "agent-biz-analyst",
    name: bi("Business Analyst", "业务分析师"),
    description: bi(
      "Generate weekly business diagnosis from selected time range and data.",
      "根据选定时间范围和数据生成周度业务诊断。"
    ),
    icon: "BarChart3",
    fields: [
      {
        key: "timeRange",
        label: bi("Time Range", "时间范围"),
        type: "date_range",
        required: true,
      },
      {
        key: "channels",
        label: bi("Channels", "渠道"),
        type: "multi_select",
        required: false,
        options: [
          { value: "tmall", label: bi("Tmall", "天猫") },
          { value: "douyin", label: bi("Douyin", "抖音") },
          { value: "xiaohongshu", label: bi("Xiaohongshu", "小红书") },
          { value: "jd", label: bi("JD", "京东") },
          { value: "pinduoduo", label: bi("Pinduoduo", "拼多多") },
        ],
      },
      {
        key: "focusArea",
        label: bi("Focus Area", "关注领域"),
        type: "select",
        required: false,
        options: [
          { value: "overall", label: bi("Overall Performance", "整体表现") },
          { value: "conversion", label: bi("Conversion & Traffic", "转化与流量") },
          { value: "profitability", label: bi("Profitability & ROI", "盈利与ROI") },
          { value: "product", label: bi("Product Performance", "产品表现") },
        ],
      },
    ],
    estimatedDuration: bi("2-3 minutes", "2-3分钟"),
  },
  {
    id: "agent-report-writer",
    name: bi("Weekly Report Writer", "周报撰写助手"),
    description: bi(
      "Transform structured diagnosis into a polished report draft.",
      "将结构化诊断结果转换为精美报告草稿。"
    ),
    icon: "FileText",
    fields: [
      {
        key: "diagnosisId",
        label: bi("Source Diagnosis", "来源诊断"),
        type: "select",
        required: true,
        options: [
          { value: "d1", label: bi("W10 Operating Diagnosis", "第10周经营诊断") },
          { value: "d2", label: bi("Sunscreen Launch Retro", "防晒上市复盘") },
          { value: "d3", label: bi("Douyin Conversion Deep Dive", "抖音转化率深度分析") },
          { value: "d4", label: bi("W9 Operating Diagnosis", "第9周经营诊断") },
        ],
      },
      {
        key: "reportType",
        label: bi("Report Type", "报告类型"),
        type: "select",
        required: true,
        options: [
          { value: "weekly", label: bi("Weekly Report", "周报") },
          { value: "campaign", label: bi("Campaign Retro", "活动复盘") },
          { value: "ceo_summary", label: bi("CEO Summary", "CEO摘要") },
          { value: "action_list", label: bi("Action List", "行动清单") },
        ],
      },
      {
        key: "audience",
        label: bi("Target Audience", "目标受众"),
        type: "select",
        required: true,
        options: [
          { value: "ops", label: bi("Operations Team", "运营团队") },
          { value: "ceo", label: bi("CEO / Management", "CEO / 管理层") },
          { value: "all", label: bi("All Stakeholders", "所有相关方") },
        ],
      },
      {
        key: "additionalNotes",
        label: bi("Additional Notes", "补充说明"),
        type: "text",
        required: false,
        placeholder: bi("Any specific points to emphasize...", "需要重点强调的内容..."),
      },
    ],
    estimatedDuration: bi("1-2 minutes", "1-2分钟"),
  },
  {
    id: "agent-campaign-reviewer",
    name: bi("Campaign Reviewer", "活动评审员"),
    description: bi(
      "Analyze campaign performance data and generate a structured retrospective.",
      "分析活动效果数据并生成结构化复盘报告。"
    ),
    icon: "Target",
    fields: [
      {
        key: "campaignName",
        label: bi("Campaign Name", "活动名称"),
        type: "text",
        required: true,
        placeholder: bi("e.g., Sunscreen Launch Q1", "例如：Q1防晒上市"),
      },
      {
        key: "timeRange",
        label: bi("Campaign Period", "活动周期"),
        type: "date_range",
        required: true,
      },
      {
        key: "channels",
        label: bi("Channels", "渠道"),
        type: "multi_select",
        required: true,
        options: [
          { value: "tmall", label: bi("Tmall", "天猫") },
          { value: "douyin", label: bi("Douyin", "抖音") },
          { value: "xiaohongshu", label: bi("Xiaohongshu", "小红书") },
          { value: "jd", label: bi("JD", "京东") },
          { value: "pinduoduo", label: bi("Pinduoduo", "拼多多") },
        ],
      },
      {
        key: "targetGmv",
        label: bi("Target GMV (¥)", "目标GMV（¥）"),
        type: "number",
        required: false,
      },
    ],
    estimatedDuration: bi("2-4 minutes", "2-4分钟"),
  },
  {
    id: "agent-anomaly-investigator",
    name: bi("Anomaly Investigator", "异常调查员"),
    description: bi(
      "Deep-dive into a specific metric anomaly with root cause analysis.",
      "对特定指标异常进行深度调查和根因分析。"
    ),
    icon: "Search",
    fields: [
      {
        key: "anomalyId",
        label: bi("Anomaly", "异常项"),
        type: "select",
        required: true,
        options: [
          { value: "a1", label: bi("Douyin CVR -18%", "抖音转化率 -18%") },
          { value: "a2", label: bi("Sunscreen Refund +55%", "防晒退款率 +55%") },
          { value: "a3", label: bi("Douyin ROI -14%", "抖音ROI -14%") },
          { value: "a4", label: bi("Repair Cream Orders -12.5%", "修护面霜订单 -12.5%") },
        ],
      },
      {
        key: "depth",
        label: bi("Analysis Depth", "分析深度"),
        type: "select",
        required: false,
        options: [
          { value: "quick", label: bi("Quick Scan", "快速扫描") },
          { value: "standard", label: bi("Standard Analysis", "标准分析") },
          { value: "deep", label: bi("Deep Investigation", "深度调查") },
        ],
      },
    ],
    estimatedDuration: bi("1-3 minutes", "1-3分钟"),
  },
  {
    id: "agent-competitor-watcher",
    name: bi("Competitor Intelligence", "竞品监控"),
    description: bi(
      "Monitor and analyze competitor pricing, promotions, and market positioning changes.",
      "监控和分析竞品定价、促销和市场定位变化。"
    ),
    icon: "Eye",
    fields: [
      {
        key: "competitor",
        label: bi("Competitor", "竞品"),
        type: "select",
        required: true,
        options: [
          { value: "proya", label: bi("Proya (珀莱雅)", "珀莱雅") },
          { value: "winona", label: bi("Winona (薇诺娜)", "薇诺娜") },
          { value: "olay", label: bi("OLAY", "OLAY") },
          { value: "lrp", label: bi("La Roche-Posay (理肤泉)", "理肤泉") },
        ],
      },
      {
        key: "scope",
        label: bi("Analysis Scope", "分析范围"),
        type: "multi_select",
        required: false,
        options: [
          { value: "pricing", label: bi("Pricing Changes", "定价变化") },
          { value: "promotions", label: bi("Promotions", "促销活动") },
          { value: "new_products", label: bi("New Product Launches", "新品上市") },
          { value: "content", label: bi("Content Strategy", "内容策略") },
        ],
      },
    ],
    estimatedDuration: bi("2-3 minutes", "2-3分钟"),
  },
];

export const mockAgentRuns: AgentRun[] = [
  {
    id: "run1",
    agentId: "agent-biz-analyst",
    agentName: bi("Business Analyst", "业务分析师"),
    status: "completed",
    input: { timeRange: "2025-W10", channels: "tmall,douyin,xiaohongshu", focusArea: "overall" },
    startedAt: "2025-03-09 09:00",
    completedAt: "2025-03-09 09:03",
    duration: 180,
    markdownOutput: bi(
      "## W10 Business Analysis\n\nGMV declined 8% WoW to ¥2.87M. Key drivers: Douyin CVR -18% (creative fatigue + Proya competition), sunscreen refund spike to 8.4%. Bright spot: XHS organic +22%.\n\n### Recommended Actions\n1. Urgent creative refresh on Douyin\n2. Pause sunscreen ads pending QC\n3. Scale XHS KOC program",
      "## 第10周业务分析\n\nGMV环比下降8%至¥287万。关键驱动：抖音转化率-18%（素材疲劳+珀莱雅竞争），防晒退款率飙升至8.4%。亮点：小红书自然流量+22%。\n\n### 建议行动\n1. 紧急更新抖音素材\n2. 暂停防晒投放待质检\n3. 扩大小红书KOC项目"
    ),
    structuredOutput: { diagnosisId: "d1", anomalyCount: 5, recommendationCount: 4 },
  },
  {
    id: "run2",
    agentId: "agent-report-writer",
    agentName: bi("Weekly Report Writer", "周报撰写助手"),
    status: "completed",
    input: { diagnosisId: "d1", reportType: "weekly", audience: "ops" },
    startedAt: "2025-03-09 09:30",
    completedAt: "2025-03-09 09:32",
    duration: 120,
    markdownOutput: bi(
      "Generated **Week 10 Operating Review** report (2,400 words). Includes anomaly table, root cause analysis, and prioritized action plan. Ready for review.",
      "已生成**第10周经营复盘**报告（2400字）。包含异常表格、根因分析和优先级行动计划。可供审核。"
    ),
    structuredOutput: { reportId: "r1", wordCount: 2400, sections: 5 },
  },
  {
    id: "run3",
    agentId: "agent-report-writer",
    agentName: bi("Weekly Report Writer", "周报撰写助手"),
    status: "completed",
    input: { diagnosisId: "d1", reportType: "ceo_summary", audience: "ceo" },
    startedAt: "2025-03-09 09:35",
    completedAt: "2025-03-09 09:36",
    duration: 65,
    markdownOutput: bi(
      "Generated **CEO Weekly Brief — W10** (180 words). Highlights 2 urgent issues and 2 decisions needed. Concise format.",
      "已生成**CEO周报简报 — 第10周**（180字）。突出2个紧急问题和2项需要决策。简洁格式。"
    ),
    structuredOutput: { reportId: "r3", wordCount: 180, sections: 3 },
  },
  {
    id: "run4",
    agentId: "agent-anomaly-investigator",
    agentName: bi("Anomaly Investigator", "异常调查员"),
    status: "completed",
    input: { anomalyId: "a1", depth: "deep" },
    startedAt: "2025-03-09 11:00",
    completedAt: "2025-03-09 11:02",
    duration: 145,
    markdownOutput: bi(
      "## Douyin CVR Deep Dive\n\nMulti-causal decline: creative fatigue (40%), Proya competition (35%), algorithm shift (25%). Top 3 creatives exceeded 14-day effective lifespan. Proya serum at ¥169 entered top 10.\n\n**Recommendation**: A/B test 3 new creative angles immediately.",
      "## 抖音转化率深度分析\n\n多因素下降：素材疲劳（40%）、珀莱雅竞争（35%）、算法调整（25%）。头部3条素材超过14天有效生命周期。珀莱雅精华¥169进入TOP10。\n\n**建议**：立即A/B测试3种新素材角度。"
    ),
    structuredOutput: { diagnosisId: "d3", rootCauses: 3, confidence: 0.85 },
  },
  {
    id: "run5",
    agentId: "agent-campaign-reviewer",
    agentName: bi("Campaign Reviewer", "活动评审员"),
    status: "completed",
    input: { campaignName: "Sunscreen Launch", timeRange: "2025-02-20 ~ 2025-03-08", channels: "tmall,douyin,xiaohongshu,jd", targetGmv: "640000" },
    startedAt: "2025-03-08 16:00",
    completedAt: "2025-03-08 16:04",
    duration: 240,
    markdownOutput: bi(
      "## Sunscreen Launch Retrospective\n\nAchieved 72% of GMV target (¥460K/¥640K). Tmall strong (102% of channel target), Douyin weak (65%). Critical issue: 8.4% refund rate requires immediate resolution.\n\nROI by channel: Tmall 3.1x, XHS 2.8x, JD 2.4x, Douyin 1.4x.",
      "## 防晒上市复盘\n\n达成GMV目标72%（¥46万/¥64万）。天猫强劲（渠道目标102%），抖音疲弱（65%）。关键问题：8.4%退款率需立即解决。\n\n渠道ROI：天猫3.1x、小红书2.8x、京东2.4x、抖音1.4x。"
    ),
    structuredOutput: { diagnosisId: "d2", gmvActual: 460000, gmvTarget: 640000, achievementRate: 0.72 },
  },
  {
    id: "run6",
    agentId: "agent-competitor-watcher",
    agentName: bi("Competitor Intelligence", "竞品监控"),
    status: "completed",
    input: { competitor: "proya", scope: "pricing,new_products" },
    startedAt: "2025-03-09 10:00",
    completedAt: "2025-03-09 10:03",
    duration: 175,
    markdownOutput: bi(
      "## Proya Competitive Intelligence\n\n**New Launch**: Proya Double Serum (Niacinamide + VC) at ¥169 (vs our ¥199). Entered Douyin top 10 on March 5.\n\n**Pricing Strategy**: Aggressive launch pricing with ¥30 first-order coupon, effective price ¥139.\n\n**Risk Assessment**: Direct competitor to our SKU001. Recommend value bundle response rather than price matching.",
      "## 珀莱雅竞品情报\n\n**新品上市**: 珀莱雅双效精华（烟酰胺+VC）定价¥169（vs 我们¥199）。3月5日进入抖音TOP10。\n\n**定价策略**: 激进的上市定价，首单券¥30，实际价格¥139。\n\n**风险评估**: 直接竞争我们SKU001。建议以价值组合应对，而非价格匹配。"
    ),
    structuredOutput: { competitorName: "Proya", newProductCount: 1, pricingThreat: "high" },
  },
  {
    id: "run7",
    agentId: "agent-biz-analyst",
    agentName: bi("Business Analyst", "业务分析师"),
    status: "completed",
    input: { timeRange: "2025-W09", channels: "tmall,douyin,xiaohongshu,jd", focusArea: "overall" },
    startedAt: "2025-03-02 09:00",
    completedAt: "2025-03-02 09:03",
    duration: 185,
    markdownOutput: bi(
      "## W9 Business Analysis\n\nSolid week. GMV ¥3.12M (+3.2%). All channels positive except minor Pinduoduo AOV pressure. Sunscreen pre-launch buzz strong on XHS. Watch: Douyin creative fatigue emerging.",
      "## 第9周业务分析\n\n稳健一周。GMV ¥312万（+3.2%）。除拼多多客单价略有压力外所有渠道正增长。防晒预上市在小红书热度强劲。关注：抖音素材疲劳初现。"
    ),
    structuredOutput: { diagnosisId: "d4", anomalyCount: 1, recommendationCount: 1 },
  },
  {
    id: "run8",
    agentId: "agent-report-writer",
    agentName: bi("Weekly Report Writer", "周报撰写助手"),
    status: "completed",
    input: { diagnosisId: "d4", reportType: "weekly", audience: "ops" },
    startedAt: "2025-03-02 09:30",
    completedAt: "2025-03-02 09:32",
    duration: 110,
    markdownOutput: bi(
      "Generated **Week 9 Operating Review** (1,800 words). Positive tone. Highlights KOC spillover and pre-launch momentum.",
      "已生成**第9周经营复盘**（1800字）。正面基调。突出KOC外溢和预上市势头。"
    ),
    structuredOutput: { reportId: "r4", wordCount: 1800, sections: 4 },
  },
  {
    id: "run9",
    agentId: "agent-anomaly-investigator",
    agentName: bi("Anomaly Investigator", "异常调查员"),
    status: "completed",
    input: { anomalyId: "a2", depth: "standard" },
    startedAt: "2025-03-08 18:30",
    completedAt: "2025-03-08 18:32",
    duration: 130,
    markdownOutput: bi(
      "## Sunscreen Refund Analysis\n\nRefund rate 8.4% (category avg 3.5%). NLP of reviews: 68% 'greasy/heavy', 22% 'white cast'. Concentrated in Feb 28-Mar 3 batch. Later batches normal → likely batch-specific issue.",
      "## 防晒退款分析\n\n退款率8.4%（品类均值3.5%）。差评NLP：68%提到'油腻/厚重'，22%提到'假白'。集中在2月28日-3月3日批次。后续批次正常→可能是批次特定问题。"
    ),
    structuredOutput: { anomalyId: "a2", rootCause: "batch_quality", confidence: 0.7 },
  },
  {
    id: "run10",
    agentId: "agent-biz-analyst",
    agentName: bi("Business Analyst", "业务分析师"),
    status: "running",
    input: { timeRange: "2025-W10", channels: "douyin", focusArea: "conversion" },
    startedAt: "2025-03-09 16:00",
    duration: undefined,
  },
];
