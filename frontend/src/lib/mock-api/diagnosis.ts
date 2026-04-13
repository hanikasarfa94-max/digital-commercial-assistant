import type { DiagnosisResult } from "@/types/api";
import { bi } from "./helpers";

export const mockDiagnosisResults: DiagnosisResult[] = [
  {
    id: "d1",
    type: "weekly_review",
    title: bi("Week 10 Operating Diagnosis", "第10周经营诊断"),
    status: "completed",
    timeRange: "2025-W10",
    createdAt: "2025-03-09 09:00",
    completedAt: "2025-03-09 09:03",
    summary: bi(
      "Overall performance under pressure. GMV declined 8% WoW driven by Douyin conversion drop (-18%) and sunscreen launch quality issues. Tmall stable but refund rate elevated. Xiaohongshu organic growth is a bright spot (+22% visitors).",
      "整体经营承压。GMV环比下降8%，主要因抖音转化率下降(-18%)和防晒新品质量问题。天猫稳定但退款率偏高。小红书自然增长是亮点（访客+22%）。"
    ),
    anomalies: [
      {
        id: "a1", metric: "conversionRate",
        scope: bi("Douyin — Brightening Serum", "抖音 — 亮肤精华液"),
        severity: "high", changePercent: -18.3,
        description: bi("Conversion rate dropped from 3.8% to 3.1% WoW. Competition from Proya serum launch and creative fatigue.", "转化率从3.8%降至3.1%。珀莱雅精华新品竞争及素材疲劳。"),
        detectedAt: "2025-03-09 06:00",
      },
      {
        id: "a2", metric: "refundRate",
        scope: bi("All Channels — Sunscreen Milk", "全渠道 — 轻薄防晒乳"),
        severity: "high", changePercent: 55.0,
        description: bi("Refund rate spiked to 8.4% for new sunscreen. Complaints cite greasy texture.", "新防晒退款率飙升至8.4%。投诉称质地油腻。"),
        detectedAt: "2025-03-08 18:00",
      },
      {
        id: "a3", metric: "roi",
        scope: bi("Douyin — Overall", "抖音 — 整体"),
        severity: "medium", changePercent: -14.0,
        description: bi("Douyin ROI declined from 2.2 to 1.9. Ad spend +12% but GMV only +3%.", "抖音ROI从2.2降至1.9。广告投放+12%但GMV仅+3%。"),
        detectedAt: "2025-03-09 08:00",
      },
    ],
    hypotheses: [
      {
        id: "h1",
        title: bi("Proya competition impact", "珀莱雅竞品影响"),
        description: bi("Proya launched a competing serum with aggressive pricing (¥169 vs our ¥199), diverting Douyin traffic.", "珀莱雅推出竞品精华，定价激进（¥169 vs 我们¥199），分流抖音流量。"),
        confidence: 0.8,
        supportingData: bi("Proya serum appeared in Douyin top 10 since March 5. Our serum dropped from #3 to #7.", "珀莱雅精华自3月5日进入抖音TOP10。我们精华从#3降至#7。"),
      },
      {
        id: "h2",
        title: bi("Sunscreen batch quality issue", "防晒批次质量问题"),
        description: bi("The high refund rate may stem from a batch formulation inconsistency rather than the product design.", "高退款率可能源于批次配方不一致，而非产品设计问题。"),
        confidence: 0.65,
        supportingData: bi("Refunds concentrated in orders from Feb 28-Mar 3 shipment batch. Later batches show normal rates.", "退款集中在2月28日-3月3日发货批次。后续批次退款率正常。"),
      },
      {
        id: "h3",
        title: bi("Creative fatigue on Douyin", "抖音素材审美疲劳"),
        description: bi("Main Douyin creatives have been running for 3+ weeks without refresh, causing CTR decline.", "主力抖音素材已运行3周以上未更新，导致点击率下降。"),
        confidence: 0.75,
        supportingData: bi("Top 3 creatives CTR dropped from 4.2% to 2.8% over past 2 weeks.", "TOP3素材CTR在过去2周从4.2%降至2.8%。"),
      },
    ],
    risks: [
      bi("If Douyin conversion continues declining, March GMV target gap will widen to -25%.", "若抖音转化率继续下降，3月GMV目标差距将扩大至-25%。"),
      bi("Sunscreen refund issue may trigger platform quality warnings if not resolved within 7 days.", "防晒退款问题若7天内未解决，可能触发平台质量预警。"),
      bi("Aggressive discounting to recover volume may damage brand positioning.", "为恢复销量的激进打折可能损害品牌定位。"),
    ],
    recommendations: [
      {
        id: "rec1",
        title: bi("Refresh Douyin creatives urgently", "紧急更新抖音素材"),
        description: bi("Produce 3-5 new short video creatives highlighting ingredient story and before/after results.", "制作3-5条新短视频素材，突出成分故事和使用前后对比效果。"),
        priority: "high",
        effort: bi("2-3 days", "2-3天"),
        expectedImpact: bi("Recover CTR by 1-1.5pp, potentially +8% conversion", "恢复CTR 1-1.5个百分点，预计转化率+8%"),
      },
      {
        id: "rec2",
        title: bi("Investigate sunscreen batch and pause ads", "调查防晒批次并暂停投放"),
        description: bi("Pull samples from the problematic batch for QC testing. Pause paid ads for sunscreen until resolved.", "从问题批次抽样进行质检。暂停防晒付费投放直至解决。"),
        priority: "high",
        effort: bi("1-2 days", "1-2天"),
        expectedImpact: bi("Prevent further refund escalation and platform penalty risk", "防止退款进一步恶化和平台处罚风险"),
      },
      {
        id: "rec3",
        title: bi("Launch serum value bundle on Douyin", "在抖音推出精华价值组合"),
        description: bi("Create a Serum + Toner bundle at ¥268 (vs ¥318 separate) to compete with Proya on value perception.", "推出精华+化妆水组合装¥268（单买¥318），在价值感知上与珀莱雅竞争。"),
        priority: "medium",
        effort: bi("1 day setup", "1天搭建"),
        expectedImpact: bi("+15% AOV on serum orders, defend market share", "精华订单客单价+15%，守住市场份额"),
      },
      {
        id: "rec4",
        title: bi("Double down on Xiaohongshu KOC", "加大小红书KOC投入"),
        description: bi("Increase KOC budget 30% to capitalize on organic momentum. Focus on Repair Cream and Eye Cream.", "KOC预算增加30%，利用自然增长势头。重点推修护面霜和眼霜。"),
        priority: "medium",
        effort: bi("Ongoing", "持续"),
        expectedImpact: bi("Sustain +20% organic traffic growth for 4+ weeks", "维持自然流量增长20%以上持续4周"),
      },
    ],
    pendingChecks: [
      bi("Confirm sunscreen batch QC results by March 11", "3月11日前确认防晒批次质检结果"),
      bi("Review Proya pricing and promotion calendar for March", "查看珀莱雅3月定价和促销日历"),
      bi("Check if Douyin algorithm change affected organic reach", "检查抖音算法变化是否影响了自然触达"),
    ],
  },
  {
    id: "d2",
    type: "campaign_retro",
    title: bi("Sunscreen Launch Campaign Retrospective", "防晒上市活动复盘"),
    status: "completed",
    timeRange: "2025-02-20 ~ 2025-03-08",
    createdAt: "2025-03-08 16:00",
    completedAt: "2025-03-08 16:04",
    summary: bi(
      "Sunscreen launch achieved 72% of first-month GMV target. Strong initial sell-through on Tmall but Douyin underperformed. Refund rate is the primary concern requiring immediate action.",
      "防晒上市达到首月GMV目标的72%。天猫初期销售强劲但抖音表现不及预期。退款率是需要立即处理的主要问题。"
    ),
    anomalies: [
      {
        id: "a2", metric: "refundRate",
        scope: bi("All Channels — Sunscreen Milk", "全渠道 — 轻薄防晒乳"),
        severity: "high", changePercent: 55.0,
        description: bi("Refund rate 8.4% vs 3.5% category average.", "退款率8.4%，品类平均3.5%。"),
        detectedAt: "2025-03-08 18:00",
      },
    ],
    hypotheses: [
      {
        id: "h4",
        title: bi("Product-market messaging mismatch", "产品与市场宣传不匹配"),
        description: bi("Marketing emphasizes 'lightweight' but early batch has a slightly heavier formula than final sample.", "营销强调「轻薄」但早期批次配方略比最终样品厚重。"),
        confidence: 0.7,
        supportingData: bi("NLP analysis of negative reviews: 68% mention 'greasy' or 'heavy', 22% mention 'white cast'.", "差评NLP分析：68%提到「油腻」或「厚重」，22%提到「假白」。"),
      },
    ],
    risks: [
      bi("Sustained high refund rate may trigger Tmall quality flag.", "持续高退款率可能触发天猫质量标记。"),
      bi("Negative reviews could damage brand trust for future SPF launches.", "差评可能损害未来防晒新品的品牌信任。"),
    ],
    recommendations: [
      {
        id: "rec5",
        title: bi("Rush reformulated batch to production", "加急改良批次投产"),
        description: bi("Work with factory to align production batch with the approved lightweight formula sample.", "与工厂合作，确保生产批次与批准的轻薄配方样品一致。"),
        priority: "high",
        effort: bi("5-7 days", "5-7天"),
        expectedImpact: bi("Resolve root cause of refund spike", "解决退款飙升的根本原因"),
      },
      {
        id: "rec6",
        title: bi("Proactive customer outreach for affected orders", "对受影响订单进行主动客户沟通"),
        description: bi("Contact customers from Feb 28-Mar 3 batch with an apology and free replacement offer.", "联系2月28日-3月3日批次客户，致歉并提供免费换货。"),
        priority: "high",
        effort: bi("2 days", "2天"),
        expectedImpact: bi("Convert potential negative reviews to positive sentiment", "将潜在差评转化为正面情绪"),
      },
    ],
    pendingChecks: [
      bi("Factory confirmation on revised batch timeline", "工厂确认改良批次时间线"),
      bi("Legal review of recall vs voluntary replacement approach", "法务审核召回vs主动换货方案"),
    ],
  },
  {
    id: "d3",
    type: "anomaly_deep_dive",
    title: bi("Douyin Conversion Deep Dive", "抖音转化率深度分析"),
    status: "completed",
    timeRange: "2025-W09 ~ W10",
    createdAt: "2025-03-09 11:00",
    completedAt: "2025-03-09 11:02",
    summary: bi(
      "Douyin conversion rate decline is multi-causal: creative fatigue (40% attribution), competitor entry (35%), and minor algorithm shift reducing organic reach (25%).",
      "抖音转化率下降是多因素的：素材疲劳（40%归因）、竞品进入（35%）、以及轻微算法调整降低自然触达（25%）。"
    ),
    anomalies: [
      {
        id: "a1", metric: "conversionRate",
        scope: bi("Douyin — Brightening Serum", "抖音 — 亮肤精华液"),
        severity: "high", changePercent: -18.3,
        description: bi("CVR 3.8% → 3.1%", "转化率 3.8% → 3.1%"),
        detectedAt: "2025-03-09 06:00",
      },
    ],
    hypotheses: [
      {
        id: "h5",
        title: bi("Creative lifecycle exhaustion", "素材生命周期耗尽"),
        description: bi("Top-performing creatives have exceeded their effective lifespan of ~14 days.", "高表现素材已超过约14天的有效生命周期。"),
        confidence: 0.85,
        supportingData: bi("Creative A: day 1-7 CTR 4.5%, day 14-21 CTR 2.6%. Industry benchmark: refresh at day 10-14.", "素材A：第1-7天CTR 4.5%，第14-21天CTR 2.6%。行业基准：10-14天更换。"),
      },
      {
        id: "h6",
        title: bi("Douyin algorithm update (Mar 3)", "抖音算法更新（3月3日）"),
        description: bi("Douyin rolled out a feed ranking update on March 3 that may have reduced organic exposure for beauty category.", "抖音3月3日推出信息流排序更新，可能降低了美妆品类的自然曝光。"),
        confidence: 0.5,
        supportingData: bi("Industry forums report 10-15% organic reach decline for beauty brands post March 3.", "行业论坛报告3月3日后美妆品牌自然触达下降10-15%。"),
      },
    ],
    risks: [
      bi("Without creative refresh, conversion may decline another 10% next week.", "若不更新素材，下周转化率可能再降10%。"),
    ],
    recommendations: [
      {
        id: "rec7",
        title: bi("A/B test new creative angles", "A/B测试新素材角度"),
        description: bi("Test 3 new angles: ingredient education, user testimonial, comparison format.", "测试3种新角度：成分教育、用户证言、对比形式。"),
        priority: "high",
        effort: bi("3 days", "3天"),
        expectedImpact: bi("Identify winning creative within 72 hours", "72小时内找到优胜素材"),
      },
    ],
    pendingChecks: [
      bi("Monitor Douyin organic reach metrics daily for algorithm impact assessment", "每日监控抖音自然触达指标以评估算法影响"),
    ],
  },
  {
    id: "d4",
    type: "weekly_review",
    title: bi("Week 9 Operating Diagnosis", "第9周经营诊断"),
    status: "completed",
    timeRange: "2025-W09",
    createdAt: "2025-03-02 09:00",
    completedAt: "2025-03-02 09:03",
    summary: bi(
      "Solid week with GMV on track at ¥3,120,000. Tmall driving 42% of volume. Sunscreen pre-launch buzz generating strong Xiaohongshu engagement. Douyin showing early signs of creative fatigue.",
      "表现稳健，GMV达¥3,120,000处于目标轨道。天猫贡献42%的销量。防晒预上市热度带动小红书强互动。抖音初显素材疲劳迹象。"
    ),
    anomalies: [],
    hypotheses: [
      {
        id: "h7",
        title: bi("Pre-launch hype driving XHS traffic", "预上市热度推动小红书流量"),
        description: bi("Sunscreen teaser content on Xiaohongshu is generating organic buzz ahead of launch.", "小红书上防晒预热内容在上市前产生自然热度。"),
        confidence: 0.9,
        supportingData: bi("Brand mention volume on XHS up 65% in W9. Sunscreen-related posts account for 78%.", "小红书品牌提及量在第9周增长65%。防晒相关帖子占78%。"),
      },
    ],
    risks: [
      bi("Douyin top creatives showing 15% CTR decline — refresh needed within 1 week.", "抖音头部素材CTR下降15%——需在1周内更新。"),
    ],
    recommendations: [
      {
        id: "rec8",
        title: bi("Prepare Douyin creative refresh pipeline", "准备抖音素材更新管线"),
        description: bi("Brief creative team to have 5 new videos ready by W10.", "安排创意团队在第10周前准备好5条新视频。"),
        priority: "medium",
        effort: bi("5 days", "5天"),
        expectedImpact: bi("Prevent conversion decline in W10", "防止第10周转化率下降"),
      },
    ],
    pendingChecks: [
      bi("Sunscreen launch logistics readiness check", "防晒上市物流准备检查"),
    ],
  },
  {
    id: "d5",
    type: "weekly_review",
    title: bi("Week 8 Operating Diagnosis", "第8周经营诊断"),
    status: "completed",
    timeRange: "2025-W08",
    createdAt: "2025-02-23 09:00",
    completedAt: "2025-02-23 09:03",
    summary: bi(
      "Strong recovery week. GMV hit ¥3,280,000 boosted by Repair Cream KOC campaign spillover. All channels positive except Pinduoduo (AOV pressure).",
      "强劲复苏周。修护面霜KOC活动外溢效应推动GMV达¥3,280,000。除拼多多（客单价承压）外所有渠道正增长。"
    ),
    anomalies: [
      {
        id: "a8", metric: "avgOrderValue",
        scope: bi("Pinduoduo — All Products", "拼多多 — 全部产品"),
        severity: "low", changePercent: -6.5,
        description: bi("Pinduoduo AOV declining due to coupon stacking.", "拼多多客单价因优惠券叠加下降。"),
        detectedAt: "2025-02-23 08:00",
      },
    ],
    hypotheses: [],
    risks: [
      bi("Pinduoduo margin erosion may make the channel unprofitable if AOV drops below ¥125.", "若客单价低于¥125，拼多多渠道可能亏损。"),
    ],
    recommendations: [
      {
        id: "rec9",
        title: bi("Set Pinduoduo coupon participation limits", "设置拼多多优惠券参与限制"),
        description: bi("Opt out of platform-wide coupon stacking for SKUs with margin below 15%.", "对利润率低于15%的SKU退出平台优惠券叠加活动。"),
        priority: "low",
        effort: bi("1 day", "1天"),
        expectedImpact: bi("Protect margins, minor volume impact expected", "保护利润率，预计对销量影响较小"),
      },
    ],
    pendingChecks: [],
  },
  {
    id: "d6",
    type: "anomaly_deep_dive",
    title: bi("Repair Cream Tmall Order Drop Analysis", "修护面霜天猫订单下降分析"),
    status: "completed",
    timeRange: "2025-W10",
    createdAt: "2025-03-09 14:00",
    completedAt: "2025-03-09 14:02",
    summary: bi(
      "Repair Cream order decline on Tmall directly tied to Winona's 20% off flash sale. Impact likely temporary (3-5 days). No action needed beyond monitoring.",
      "修护面霜天猫订单下降直接关联薇诺娜8折限时促销。影响可能是暂时的（3-5天）。除监控外无需行动。"
    ),
    anomalies: [
      {
        id: "a4", metric: "orders",
        scope: bi("Tmall — Repair Cream", "天猫 — 修护面霜"),
        severity: "medium", changePercent: -12.5,
        description: bi("Order volume dropped 12.5% coinciding with competitor promo.", "订单量下降12.5%，与竞品促销时间吻合。"),
        detectedAt: "2025-03-08 12:00",
      },
    ],
    hypotheses: [
      {
        id: "h8",
        title: bi("Temporary Winona promotion effect", "薇诺娜促销临时效应"),
        description: bi("Winona's flash sale is a 5-day event. Historical data shows our volume recovers within 2 days after competitor promos end.", "薇诺娜限时促销为5天活动。历史数据显示竞品促销结束后我们销量在2天内恢复。"),
        confidence: 0.85,
        supportingData: bi("Similar pattern in Nov 2024: Winona promo caused 10% dip, full recovery in 48 hours.", "2024年11月类似情况：薇诺娜促销导致10%下降，48小时内完全恢复。"),
      },
    ],
    risks: [
      bi("If Winona makes the discount permanent, we need a strategic response.", "若薇诺娜将折扣常态化，我们需要战略性应对。"),
    ],
    recommendations: [
      {
        id: "rec10",
        title: bi("Monitor and prepare contingency bundle", "监控并准备应急组合方案"),
        description: bi("No immediate action. Prepare a Repair Cream + Toner bundle at 10% off as contingency if volume doesn't recover by March 14.", "暂不行动。准备修护面霜+化妆水组合9折方案，若3月14日前销量未恢复则启用。"),
        priority: "low",
        effort: bi("0.5 day prep", "0.5天准备"),
        expectedImpact: bi("Insurance against prolonged competitor pressure", "应对竞品持续压力的保险方案"),
      },
    ],
    pendingChecks: [
      bi("Check Winona promotion end date", "确认薇诺娜促销结束日期"),
      bi("Monitor Repair Cream daily orders through March 14", "监控修护面霜每日订单至3月14日"),
    ],
  },
  {
    id: "d7",
    type: "weekly_review",
    title: bi("Week 7 Operating Diagnosis", "第7周经营诊断"),
    status: "completed",
    timeRange: "2025-W07",
    createdAt: "2025-02-16 09:00",
    completedAt: "2025-02-16 09:03",
    summary: bi(
      "Post-CNY recovery in progress. Traffic returning to normal levels. Cleanser price war concluded with mixed results. Preparing for sunscreen launch in W08-W09.",
      "春节后恢复中。流量恢复至正常水平。洁面价格战以混合结果告终。准备在第8-9周推出防晒。"
    ),
    anomalies: [],
    hypotheses: [],
    risks: [],
    recommendations: [],
    pendingChecks: [
      bi("Finalize sunscreen launch marketing plan", "敲定防晒上市营销方案"),
    ],
  },
  {
    id: "d8",
    type: "campaign_retro",
    title: bi("CNY Gift Set Campaign Retro", "春节礼盒活动复盘"),
    status: "completed",
    timeRange: "2025-01-15 ~ 2025-02-05",
    createdAt: "2025-02-06 10:00",
    completedAt: "2025-02-06 10:04",
    summary: bi(
      "CNY gift set campaign achieved 95% of GMV target. Tmall and JD performed well. Douyin underperformed due to livestream scaling issues identified in January case study.",
      "春节礼盒活动达成GMV目标的95%。天猫和京东表现良好。抖音因1月案例中发现的直播放量问题表现不及预期。"
    ),
    anomalies: [],
    hypotheses: [],
    risks: [],
    recommendations: [
      {
        id: "rec11",
        title: bi("Apply incremental Douyin scaling for next campaign", "下次活动对抖音采用渐进式放量"),
        description: bi("Based on January learnings, cap Douyin budget increase at 50% per week for any future campaigns.", "基于1月经验，任何未来活动的抖音预算增幅限制在每周50%。"),
        priority: "medium",
        effort: bi("Process change", "流程变更"),
        expectedImpact: bi("Maintain ROI above 2.0 during scaling", "放量期间维持ROI在2.0以上"),
      },
    ],
    pendingChecks: [],
  },
];
