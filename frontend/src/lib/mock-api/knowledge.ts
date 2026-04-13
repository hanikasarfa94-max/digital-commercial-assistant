import type { EnterpriseProfile, BizTarget, HistoricalCase, PromptTemplate } from "@/types/api";
import { bi } from "./helpers";

export const mockEnterprise: EnterpriseProfile = {
  companyName: bi("QingLan Beauty Co., Ltd.", "青岚美妆有限公司"),
  industry: bi("Domestic Skincare", "国货护肤"),
  brandPositioning: bi(
    "Affordable premium domestic skincare for 25-35 year olds, focusing on ingredient transparency and gentle formulas.",
    "面向 25-35 岁用户的性价比国货护肤品牌，主打成分透明与温和配方。"
  ),
  coreCategories: bi("Serum, Cream, Sunscreen, Cleanser, Toner, Eye Care, Body Care, Treatment", "精华、面霜、防晒、洁面、化妆水、眼霜、身体护理、功效护理"),
  businessModel: bi("DTC + Marketplace E-commerce", "DTC + 平台电商"),
  channels: bi("Tmall Flagship, Douyin Flagship, Xiaohongshu Content Seeding, JD, Pinduoduo", "天猫旗舰店、抖音旗舰店、小红书内容种草、京东、拼多多"),
  teamStructure: [
    bi("CEO / Brand Lead", "CEO / 品牌负责人"),
    bi("E-commerce Operations Lead", "电商运营负责人"),
    bi("Douyin Performance Lead", "抖音投放负责人"),
    bi("Tmall Store Operator", "天猫店铺运营"),
    bi("JD Channel Manager", "京东渠道经理"),
    bi("Product Manager", "产品经理"),
    bi("Data Analyst", "数据分析师"),
    bi("Content Marketing Specialist", "内容营销专员"),
  ],
};

export const mockBizTargets: BizTarget[] = [
  { id: "bt1", metric: "gmv", metricLabel: bi("GMV", "GMV"), targetValue: "¥3,500,000", currentValue: "¥2,870,000", gap: "-18%", period: bi("March 2025", "2025年3月"), deadline: "2025-03-31" },
  { id: "bt2", metric: "roi", metricLabel: bi("ROI", "ROI"), targetValue: "2.8", currentValue: "2.34", gap: "-16%", period: bi("March 2025", "2025年3月"), deadline: "2025-03-31" },
  { id: "bt3", metric: "conversionRate", metricLabel: bi("Conversion Rate", "转化率"), targetValue: "5.5%", currentValue: "4.78%", gap: "-13%", period: bi("March 2025", "2025年3月"), deadline: "2025-03-31" },
  { id: "bt4", metric: "refundRate", metricLabel: bi("Refund Rate", "退款率"), targetValue: "<4%", currentValue: "6.2%", gap: "+55%", period: bi("March 2025", "2025年3月"), deadline: "2025-03-31" },
  { id: "bt5", metric: "orders", metricLabel: bi("Orders", "订单数"), targetValue: "22,000", currentValue: "18,420", gap: "-16%", period: bi("March 2025", "2025年3月"), deadline: "2025-03-31" },
  { id: "bt6", metric: "visitors", metricLabel: bi("Visitors", "访客数"), targetValue: "450,000", currentValue: "385,000", gap: "-14%", period: bi("March 2025", "2025年3月"), deadline: "2025-03-31" },
];

export const mockCases: HistoricalCase[] = [
  {
    id: "c1",
    name: bi("Double 11 Serum Promotion", "双11精华促销"),
    period: bi("November 2024", "2024年11月"),
    outcome: "win",
    summary: bi("Brightening Serum achieved 180% of GMV target with buy-2-get-1 bundle. AOV increased 35%.", "亮肤精华通过买二送一组合达成 GMV 目标的 180%，客单价提升 35%。"),
    lessons: bi("Bundle strategies significantly boost AOV for hero products. Pre-seeding on Xiaohongshu 2 weeks before is critical for organic lift.", "组合装策略对明星产品的客单价提升显著。提前 2 周在小红书种草对自然流量提升至关重要。"),
    relatedProducts: ["SKU001"],
  },
  {
    id: "c2",
    name: bi("Douyin Livestream Scaling (Jan)", "抖音直播放量（1月）"),
    period: bi("January 2025", "2025年1月"),
    outcome: "loss",
    summary: bi("Attempted 3x livestream budget increase. ROI dropped from 2.5 to 1.2 due to audience dilution.", "尝试直播预算 3 倍扩量，因人群稀释 ROI 从 2.5 降至 1.2。"),
    lessons: bi("Budget scaling beyond 2x on Douyin livestream requires audience segmentation adjustment. Incremental scaling (50% per week) is safer.", "抖音直播预算超过 2 倍扩量需调整人群分层。逐步扩量（每周 50%）更安全。"),
    relatedProducts: [],
  },
  {
    id: "c3",
    name: bi("Cleanser Price War Response", "洁面价格战应对"),
    period: bi("February 2025", "2025年2月"),
    outcome: "mixed",
    summary: bi("Competitor dropped cleanser price to ¥59. We responded with a ¥79 trial pack. Maintained share but margin declined 12%.", "竞品将洁面降价至 ¥59，我们推出 ¥79 试用装应对。市场份额维持但利润率下降 12%。"),
    lessons: bi("Price wars on commodity categories erode margins. Better to differentiate on ingredients and bundle with higher-margin products.", "大众品类的价格战会侵蚀利润。更好的策略是通过成分差异化并与高毛利产品组合销售。"),
    relatedProducts: ["SKU004"],
  },
  {
    id: "c4",
    name: bi("Xiaohongshu KOC Seeding Campaign", "小红书 KOC 种草计划"),
    period: bi("February 2025", "2025年2月"),
    outcome: "win",
    summary: bi("Engaged 50 KOCs for Repair Cream reviews. Organic search volume increased 40%, Tmall conversion +8%.", "邀请 50 位 KOC 评测修护面霜。自然搜索量提升 40%，天猫转化率 +8%。"),
    lessons: bi("KOC authenticity drives higher trust than KOL for skincare. Batch 10 posts/week for sustained visibility.", "KOC 真实感在护肤品类比 KOL 更受信任。每周分批发布 10 篇优于一次性集中发布。"),
    relatedProducts: ["SKU002"],
  },
  {
    id: "c5",
    name: bi("JD 618 Eye Cream Launch", "京东618眼霜首发"),
    period: bi("June 2024", "2024年6月"),
    outcome: "win",
    summary: bi("Centella Eye Cream launched exclusively on JD during 618. Achieved top 3 in eye care category. 4,200 units sold in 3 days.", "积雪草眼霜京东618独家首发，进入眼霜品类前3，3天售出4200件。"),
    lessons: bi("JD's strong logistics and male-skewing audience appreciates functional claims. Platform exclusivity boosts initial ranking.", "京东物流优势和偏男性用户群体更看重功效宣称。平台独家有助初期排名提升。"),
    relatedProducts: ["SKU007"],
  },
  {
    id: "c6",
    name: bi("Pinduoduo Body Lotion Volume Test", "拼多多身体乳放量测试"),
    period: bi("December 2024", "2024年12月"),
    outcome: "mixed",
    summary: bi("Body Lotion on Pinduoduo hit 22,000 units but AOV dropped to ¥68. Coupon stacking eroded margins to 8%.", "身体乳在拼多多达到22000件，但客单价降至¥68。优惠券叠加使利润率降至8%。"),
    lessons: bi("Pinduoduo drives volume but margin control requires limiting coupon participation. Use it for traffic, cross-sell on DTC.", "拼多多能带来销量但利润控制需限制优惠券参与。利用其引流，在DTC渠道进行交叉销售。"),
    relatedProducts: ["SKU009"],
  },
];

export const mockPromptTemplates: PromptTemplate[] = [
  {
    id: "pt1",
    name: bi("Weekly Diagnosis System Prompt", "周度诊断系统提示词"),
    description: bi("System prompt for the weekly operating diagnosis task.", "周度经营诊断任务的系统提示词。"),
    usedIn: ["diagnosis", "agent"],
    enabled: true,
    template: `You are a senior e-commerce business analyst for {{company_name}}.
Analyze the provided metrics for the period {{time_range}}.
Output a structured JSON with: summary, anomalies, hypotheses, risks, recommendations, pending_checks.
Separate known facts from inferred hypotheses. Rate confidence for each hypothesis.
Prioritize actionable recommendations over generic advice.`,
    variables: ["company_name", "time_range"],
  },
  {
    id: "pt2",
    name: bi("Report Generation Template", "报告生成模板"),
    description: bi("Template for generating polished weekly/campaign reports.", "用于生成精美周报/活动报告的模板。"),
    usedIn: ["report", "agent"],
    enabled: true,
    template: `Transform the following structured diagnosis result into a polished {{report_type}} report.
Target audience: {{audience}}.
Use professional business language. Include data tables where appropriate.
Structure: Overall Conclusion → Key Anomalies → Cause Analysis → Action Suggestions → Risks.
Keep the CEO version under 200 words. Operations version can be detailed.`,
    variables: ["report_type", "audience"],
  },
  {
    id: "pt3",
    name: bi("Business Context Injection", "业务上下文注入"),
    description: bi("Enterprise background and knowledge context injected before analysis.", "分析前注入的企业背景与知识上下文。"),
    usedIn: ["diagnosis", "report", "agent"],
    enabled: true,
    template: `Enterprise Context:
- Company: {{company_name}} ({{industry}})
- Brand: {{brand_positioning}}
- Core Categories: {{categories}}
- Channels: {{channels}}
- Current Business Targets: {{targets}}
- Recent Events: {{events}}
Use this context to ground your analysis in the company's specific situation.`,
    variables: ["company_name", "industry", "brand_positioning", "categories", "channels", "targets", "events"],
  },
  {
    id: "pt4",
    name: bi("Anomaly Deep Dive Prompt", "异常深度分析提示词"),
    description: bi("Prompt for deep-diving into a specific metric anomaly.", "用于对特定指标异常进行深度分析的提示词。"),
    usedIn: ["diagnosis"],
    enabled: true,
    template: `Investigate the anomaly in {{metric_name}} for {{scope}}.
Current value: {{current_value}}, Previous: {{previous_value}}, Change: {{change_pct}}.
Historical context: {{historical_data}}.
Consider: seasonality, competitor actions, campaign changes, product issues, platform algorithm shifts.
Output: root_cause (with confidence), contributing_factors, recommended_actions, data_gaps.`,
    variables: ["metric_name", "scope", "current_value", "previous_value", "change_pct", "historical_data"],
  },
];
