import type { Report } from "@/types/api";
import { bi } from "./helpers";

export const mockReports: Report[] = [
  {
    id: "r1",
    title: bi("Week 10 Operating Review", "第10周经营复盘"),
    type: "weekly",
    status: "approved",
    ownerKey: "ops_lead",
    currentVersion: 2,
    date: "2025-03-09",
    sourceDiagnosisId: "d1",
    markdown: {
      en: `# Week 10 Operating Review
## QingLan Beauty — 2025-03-03 to 2025-03-09

### Overall Conclusion
Overall performance was under pressure this week, mainly due to a **decline in Douyin conversion rate (-18%)** and weak payback from the sunscreen launch campaign. Tmall remained stable but refund rate rose to 6.2%.

### Key Anomalies & Highlights
| Metric | Scope | Change | Severity |
|--------|-------|--------|----------|
| Conversion Rate | Douyin — Brightening Serum | -18.3% | 🔴 High |
| Refund Rate | All Channels — Sunscreen Milk | +55.0% | 🔴 High |
| ROI | Douyin Overall | -14.0% | 🟡 Medium |
| Orders | Tmall — Repair Cream | -12.5% | 🟡 Medium |
| Organic Visitors | Xiaohongshu | +22.0% | 🟢 Positive |

### Root Cause Analysis
1. **Douyin Creative Fatigue** — Top creatives running 3+ weeks without refresh. CTR dropped from 4.2% to 2.8%.
2. **Proya Competition** — New serum launch at ¥169 diverted Douyin traffic. Our ranking dropped from #3 to #7.
3. **Sunscreen Batch Issue** — Refund complaints concentrated in Feb 28–Mar 3 shipment batch. Likely formulation inconsistency.

### Action Plan
- 🔴 **Urgent**: Refresh Douyin creatives (3-5 new videos by March 12)
- 🔴 **Urgent**: Pause sunscreen ads, investigate batch quality
- 🟡 **This week**: Launch Serum + Toner bundle at ¥268 on Douyin
- 🟡 **This week**: Increase Xiaohongshu KOC budget 30%

### Risk Watch
- March GMV gap may widen to -25% without Douyin recovery
- Sunscreen platform quality warning risk within 7 days`,
      zh: `# 第10周经营复盘
## 青岚美妆 — 2025-03-03 至 2025-03-09

### 总体结论
本周整体经营承压，主要因**抖音转化率下降(-18%)**及防晒上市活动回报不佳。天猫保持稳定但退款率升至6.2%。

### 关键异常与亮点
| 指标 | 范围 | 变化 | 严重程度 |
|------|------|------|----------|
| 转化率 | 抖音 — 亮肤精华液 | -18.3% | 🔴 高 |
| 退款率 | 全渠道 — 轻薄防晒乳 | +55.0% | 🔴 高 |
| ROI | 抖音整体 | -14.0% | 🟡 中 |
| 订单数 | 天猫 — 修护面霜 | -12.5% | 🟡 中 |
| 自然访客 | 小红书 | +22.0% | 🟢 正向 |

### 根因分析
1. **抖音素材疲劳** — 头部素材运行3周以上未更新。CTR从4.2%降至2.8%。
2. **珀莱雅竞争** — 新精华¥169上市分流抖音流量。排名从#3降至#7。
3. **防晒批次问题** — 退款投诉集中在2月28日-3月3日发货批次。可能是配方不一致。

### 行动计划
- 🔴 **紧急**: 更新抖音素材（3月12日前制作3-5条新视频）
- 🔴 **紧急**: 暂停防晒投放，调查批次质量
- 🟡 **本周**: 在抖音推出精华+化妆水组合装¥268
- 🟡 **本周**: 小红书KOC预算增加30%

### 风险关注
- 若抖音不恢复，3月GMV差距可能扩大至-25%
- 防晒7天内有平台质量预警风险`,
    },
    statusHistory: [
      { from: "draft", to: "in_progress", changedBy: "ops_lead", changedAt: "2025-03-09 10:00" },
      { from: "in_progress", to: "review", changedBy: "ops_lead", changedAt: "2025-03-09 14:30" },
      { from: "review", to: "rejected", changedBy: "ceo", changedAt: "2025-03-09 15:00", note: "Need more detail on Douyin root causes" },
      { from: "rejected", to: "in_progress", changedBy: "ops_lead", changedAt: "2025-03-09 15:30" },
      { from: "in_progress", to: "review", changedBy: "ops_lead", changedAt: "2025-03-09 16:00" },
      { from: "review", to: "approved", changedBy: "ceo", changedAt: "2025-03-09 16:30" },
    ],
    versions: [
      { version: 1, createdAt: "2025-03-09 14:30", createdBy: "ops_lead", note: bi("Initial draft generated from W10 diagnosis", "基于第10周诊断生成初稿"), isCurrent: false },
      { version: 2, createdAt: "2025-03-09 16:00", createdBy: "ops_lead", note: bi("Added detailed Douyin root cause analysis per CEO feedback", "根据CEO反馈补充抖音根因详细分析"), isCurrent: true },
    ],
    feedback: [
      { id: "f1", score: 3, comment: bi("Good overall structure but Douyin section needs more depth. Add CTR data.", "整体结构好，但抖音部分需要更深入。请补充CTR数据。"), by: "ceo", createdAt: "2025-03-09 15:00" },
      { id: "f2", score: 4, comment: bi("v2 is much better. Root cause analysis is actionable now. Approve.", "v2好多了。根因分析现在可执行。批准。"), by: "ceo", createdAt: "2025-03-09 16:30" },
      { id: "f3", score: 4, comment: bi("Anomaly detection is accurate. Recommendations align with our budget priorities.", "异常检测准确，建议与预算优先级一致。"), by: "analyst", createdAt: "2025-03-09 17:00" },
    ],
  },
  {
    id: "r2",
    title: bi("Sunscreen Launch Campaign Report", "防晒上市活动报告"),
    type: "campaign",
    status: "in_progress",
    ownerKey: "ops_lead",
    currentVersion: 1,
    date: "2025-03-08",
    sourceDiagnosisId: "d2",
    markdown: {
      en: `# Sunscreen Launch Campaign Report
## QingLan Beauty — Lightweight Sunscreen Milk (SKU003)
## Campaign Period: 2025-02-20 to 2025-03-08

### Campaign Summary
The Lightweight Sunscreen Milk launch achieved **72% of first-month GMV target** (¥460K actual vs ¥640K target). 3,200 units sold across all channels.

### Channel Performance
| Channel | Units | GMV | CVR | Notes |
|---------|-------|-----|-----|-------|
| Tmall | 1,400 | ¥194K | 5.2% | Strong, above avg |
| Douyin | 980 | ¥136K | 2.8% | Below target |
| Xiaohongshu | 520 | ¥72K | 3.1% | Seeding effect |
| JD | 300 | ¥42K | 4.0% | Steady |

### Key Issues
1. **Refund Rate Crisis**: 8.4% refund rate vs 3.5% category average
2. **Douyin Underperformance**: Livestream conversion 40% below forecast
3. **Positive Signal**: Xiaohongshu organic mentions growing rapidly

### Next Steps
- Investigate and resolve batch quality issue (Priority 1)
- Proactive customer outreach for affected orders
- Prepare reformulated batch for production`,
      zh: `# 防晒上市活动报告
## 青岚美妆 — 轻薄防晒乳 (SKU003)
## 活动周期: 2025-02-20 至 2025-03-08

### 活动总结
轻薄防晒乳上市达成**首月GMV目标的72%**（实际¥46万 vs 目标¥64万）。全渠道售出3,200件。

### 渠道表现
| 渠道 | 销量 | GMV | 转化率 | 备注 |
|------|------|-----|--------|------|
| 天猫 | 1,400 | ¥19.4万 | 5.2% | 强劲，高于均值 |
| 抖音 | 980 | ¥13.6万 | 2.8% | 低于目标 |
| 小红书 | 520 | ¥7.2万 | 3.1% | 种草效应 |
| 京东 | 300 | ¥4.2万 | 4.0% | 平稳 |

### 关键问题
1. **退款率危机**: 退款率8.4%，品类平均3.5%
2. **抖音表现不佳**: 直播转化低于预测40%
3. **正向信号**: 小红书自然提及快速增长

### 后续步骤
- 调查并解决批次质量问题（优先级1）
- 对受影响订单进行主动客户沟通
- 准备改良批次投产`,
    },
    statusHistory: [
      { from: "draft", to: "in_progress", changedBy: "ops_lead", changedAt: "2025-03-08 14:00" },
    ],
    versions: [
      { version: 1, createdAt: "2025-03-08 14:00", createdBy: "ops_lead", note: bi("Initial draft from sunscreen launch diagnosis", "基于防晒上市诊断生成初稿"), isCurrent: true },
    ],
    feedback: [],
  },
  {
    id: "r3",
    title: bi("CEO Weekly Brief — W10", "CEO周报简报 — 第10周"),
    type: "ceo_summary",
    status: "draft",
    ownerKey: "ceo",
    currentVersion: 1,
    date: "2025-03-09",
    sourceDiagnosisId: "d1",
    markdown: {
      en: `# CEO Weekly Brief — Week 10
## QingLan Beauty — March 3-9, 2025

**Bottom Line**: GMV down 8% to ¥2.87M. Two urgent issues require your attention.

### Must-Know
1. 🔴 **Sunscreen quality issue** — 8.4% refund rate on new SKU. Batch investigation underway. Ads paused.
2. 🔴 **Douyin declining** — Conversion -18% from creative fatigue + Proya competition. New creatives in production.
3. 🟢 **Xiaohongshu momentum** — KOC campaign driving +22% organic traffic. Expanding budget.

### Key Numbers
- GMV: ¥2.87M (target ¥3.5M, gap -18%)
- ROI: 2.34 (target 2.8)
- Refund Rate: 6.2% (target <4%)

### Decisions Needed
- Approve sunscreen ad pause (est. ¥45K/day revenue impact)
- Approve 30% KOC budget increase (¥35K additional)`,
      zh: `# CEO周报简报 — 第10周
## 青岚美妆 — 2025年3月3-9日

**核心结论**: GMV环比下降8%至¥287万。两个紧急问题需要您关注。

### 必知事项
1. 🔴 **防晒质量问题** — 新SKU退款率8.4%。批次调查中。投放已暂停。
2. 🔴 **抖音下滑** — 素材疲劳+珀莱雅竞争导致转化率-18%。新素材制作中。
3. 🟢 **小红书势头** — KOC活动带动自然流量+22%。扩大预算中。

### 关键数字
- GMV: ¥287万（目标¥350万，差距-18%）
- ROI: 2.34（目标2.8）
- 退款率: 6.2%（目标<4%）

### 需要决策
- 批准暂停防晒投放（预计每日¥4.5万收入影响）
- 批准KOC预算增加30%（额外¥3.5万）`,
    },
    statusHistory: [],
    versions: [
      { version: 1, createdAt: "2025-03-09 09:30", createdBy: "ops_lead", note: bi("Auto-generated CEO brief from W10 data", "基于第10周数据自动生成CEO简报"), isCurrent: true },
    ],
    feedback: [],
  },
  {
    id: "r4",
    title: bi("Week 9 Operating Review", "第9周经营复盘"),
    type: "weekly",
    status: "approved",
    ownerKey: "ops_lead",
    currentVersion: 1,
    date: "2025-03-02",
    sourceDiagnosisId: "d4",
    markdown: {
      en: `# Week 9 Operating Review
## QingLan Beauty — 2025-02-24 to 2025-03-02

### Overall Conclusion
Solid week with GMV on track at **¥3,120,000**. Tmall driving 42% of volume. Sunscreen pre-launch buzz generating strong Xiaohongshu engagement. Early signs of Douyin creative fatigue noted.

### Key Metrics
| Metric | Value | WoW Change |
|--------|-------|------------|
| GMV | ¥3,120,000 | +3.2% |
| Orders | 20,100 | +2.8% |
| CVR | 5.12% | +0.15pp |
| ROI | 2.72 | +0.04 |
| Refund Rate | 4.8% | -0.3pp |

### Highlights
- Tmall Repair Cream sales up 12% driven by KOC campaign spillover
- Xiaohongshu brand mentions +65% (sunscreen pre-launch content)
- JD maintaining steady 8% contribution

### Watch Items
- Douyin top creatives showing early fatigue signals (CTR -15%)
- Recommend creative refresh pipeline preparation for W10`,
      zh: `# 第9周经营复盘
## 青岚美妆 — 2025-02-24 至 2025-03-02

### 总体结论
稳健一周，GMV达**¥312万**处于目标轨道。天猫贡献42%销量。防晒预上市热度带动小红书强互动。注意到抖音素材疲劳早期信号。

### 关键指标
| 指标 | 数值 | 环比变化 |
|------|------|----------|
| GMV | ¥312万 | +3.2% |
| 订单数 | 20,100 | +2.8% |
| 转化率 | 5.12% | +0.15pp |
| ROI | 2.72 | +0.04 |
| 退款率 | 4.8% | -0.3pp |

### 亮点
- 天猫修护面霜销售增长12%，受益于KOC活动外溢
- 小红书品牌提及+65%（防晒预上市内容）
- 京东维持稳定8%贡献

### 关注事项
- 抖音头部素材初显疲劳信号（CTR -15%）
- 建议为第10周准备素材更新管线`,
    },
    statusHistory: [
      { from: "draft", to: "in_progress", changedBy: "ops_lead", changedAt: "2025-03-02 10:00" },
      { from: "in_progress", to: "review", changedBy: "ops_lead", changedAt: "2025-03-02 14:00" },
      { from: "review", to: "approved", changedBy: "ceo", changedAt: "2025-03-02 15:30" },
    ],
    versions: [
      { version: 1, createdAt: "2025-03-02 14:00", createdBy: "ops_lead", note: bi("Generated from W9 diagnosis", "基于第9周诊断生成"), isCurrent: true },
    ],
    feedback: [
      { id: "f4", score: 5, comment: bi("Clean and well-structured. Good early warning on Douyin creative fatigue.", "清晰且结构良好。对抖音素材疲劳的早期预警很好。"), by: "ceo", createdAt: "2025-03-02 15:30" },
    ],
  },
  {
    id: "r5",
    title: bi("Week 8 Operating Review", "第8周经营复盘"),
    type: "weekly",
    status: "approved",
    ownerKey: "ops_lead",
    currentVersion: 1,
    date: "2025-02-23",
    sourceDiagnosisId: "d5",
    markdown: {
      en: `# Week 8 Operating Review
## QingLan Beauty — 2025-02-17 to 2025-02-23

### Overall Conclusion
Strong recovery week. GMV hit **¥3,280,000** boosted by Repair Cream KOC campaign spillover. All channels positive except Pinduoduo.

### Key Metrics
| Metric | Value | WoW Change |
|--------|-------|------------|
| GMV | ¥3,280,000 | +8.5% |
| Orders | 21,200 | +7.2% |
| CVR | 4.97% | +0.22pp |
| ROI | 2.68 | +0.12 |

### Highlights
- KOC campaign for Repair Cream exceeded expectations: organic search +40%
- Tmall conversion rate at 3-month high
- Post-CNY traffic fully recovered

### Watch Items
- Pinduoduo AOV declining from coupon stacking (-6.5%)
- Recommend setting coupon participation limits`,
      zh: `# 第8周经营复盘
## 青岚美妆 — 2025-02-17 至 2025-02-23

### 总体结论
强劲复苏周。修护面霜KOC活动外溢效应推动GMV达**¥328万**。除拼多多外所有渠道正增长。

### 关键指标
| 指标 | 数值 | 环比变化 |
|------|------|----------|
| GMV | ¥328万 | +8.5% |
| 订单数 | 21,200 | +7.2% |
| 转化率 | 4.97% | +0.22pp |
| ROI | 2.68 | +0.12 |

### 亮点
- 修护面霜KOC活动超预期：自然搜索+40%
- 天猫转化率达3个月新高
- 春节后流量完全恢复

### 关注事项
- 拼多多客单价因优惠券叠加下降(-6.5%)
- 建议设置优惠券参与限制`,
    },
    statusHistory: [
      { from: "draft", to: "in_progress", changedBy: "ops_lead", changedAt: "2025-02-23 10:00" },
      { from: "in_progress", to: "review", changedBy: "ops_lead", changedAt: "2025-02-23 14:00" },
      { from: "review", to: "approved", changedBy: "ceo", changedAt: "2025-02-23 16:00" },
    ],
    versions: [
      { version: 1, createdAt: "2025-02-23 14:00", createdBy: "ops_lead", note: bi("Generated from W8 diagnosis", "基于第8周诊断生成"), isCurrent: true },
    ],
    feedback: [
      { id: "f5", score: 4, comment: bi("Good recovery analysis. Pinduoduo issue noted.", "好的恢复分析。拼多多问题已关注。"), by: "ceo", createdAt: "2025-02-23 16:00" },
    ],
  },
  {
    id: "r6",
    title: bi("CNY Gift Set Campaign Retro", "春节礼盒活动复盘"),
    type: "campaign",
    status: "archived",
    ownerKey: "ops_lead",
    currentVersion: 1,
    date: "2025-02-06",
    sourceDiagnosisId: "d8",
    markdown: {
      en: `# CNY Gift Set Campaign Retrospective
## QingLan Beauty — Jan 15 to Feb 5, 2025

### Campaign Result
Achieved **95% of GMV target**. Total campaign GMV: ¥4.2M across all channels.

### Channel Breakdown
| Channel | GMV | % of Total | vs Target |
|---------|-----|-----------|-----------|
| Tmall | ¥1.85M | 44% | 102% |
| JD | ¥0.95M | 23% | 110% |
| Douyin | ¥0.82M | 20% | 72% |
| Xiaohongshu | ¥0.38M | 9% | 95% |
| Others | ¥0.20M | 5% | 88% |

### Key Learnings
- Tmall and JD gift set bundles outperformed expectations
- Douyin livestream scaling issue (from Jan case study) repeated — need process guardrails
- JD male-skewing audience responded well to gift set positioning

### Action Items for Next Campaign
- Implement incremental Douyin scaling cap (50%/week max)
- Start JD exclusive bundles earlier (2 weeks pre-campaign)`,
      zh: `# 春节礼盒活动复盘
## 青岚美妆 — 2025年1月15日至2月5日

### 活动结果
达成**GMV目标的95%**。活动总GMV: 全渠道¥420万。

### 渠道分解
| 渠道 | GMV | 占比 | vs 目标 |
|------|-----|------|---------|
| 天猫 | ¥185万 | 44% | 102% |
| 京东 | ¥95万 | 23% | 110% |
| 抖音 | ¥82万 | 20% | 72% |
| 小红书 | ¥38万 | 9% | 95% |
| 其他 | ¥20万 | 5% | 88% |

### 关键经验
- 天猫和京东礼盒组合超预期
- 抖音直播放量问题（1月案例）再次出现——需要流程保障
- 京东偏男性用户对礼盒定位响应良好

### 下次活动待办
- 实施抖音渐进式放量上限（每周最多50%）
- 京东独家套装提前启动（活动前2周）`,
    },
    statusHistory: [
      { from: "draft", to: "in_progress", changedBy: "ops_lead", changedAt: "2025-02-06 10:00" },
      { from: "in_progress", to: "review", changedBy: "ops_lead", changedAt: "2025-02-06 14:00" },
      { from: "review", to: "approved", changedBy: "ceo", changedAt: "2025-02-06 16:00" },
      { from: "approved", to: "archived", changedBy: "ops_lead", changedAt: "2025-02-10 09:00" },
    ],
    versions: [
      { version: 1, createdAt: "2025-02-06 14:00", createdBy: "ops_lead", note: bi("CNY campaign retro from diagnosis results", "基于诊断结果的春节活动复盘"), isCurrent: true },
    ],
    feedback: [
      { id: "f6", score: 4, comment: bi("Thorough retro. Douyin scaling guardrail is critical — let's formalize it.", "复盘详尽。抖音放量护栏很关键——需要制度化。"), by: "ceo", createdAt: "2025-02-06 16:00" },
      { id: "f7", score: 5, comment: bi("Excellent data-driven analysis. JD insight is actionable for Q2 planning.", "优秀的数据驱动分析。京东洞察对Q2规划有参考价值。"), by: "analyst", createdAt: "2025-02-07 10:00" },
    ],
  },
  {
    id: "r7",
    title: bi("Douyin Conversion Action List", "抖音转化率行动清单"),
    type: "action_list",
    status: "review",
    ownerKey: "douyin_lead",
    currentVersion: 1,
    date: "2025-03-09",
    sourceDiagnosisId: "d3",
    markdown: {
      en: `# Douyin Conversion Recovery — Action List
## Owner: Douyin Performance Lead
## Timeline: March 10-21, 2025

### Immediate Actions (March 10-12)
- [ ] Brief creative team on 3 new video angles (ingredient education, UGC testimonial, comparison)
- [ ] Set up A/B test framework for new creatives
- [ ] Reduce bid on fatigued creatives by 30% (don't pause — maintain baseline)
- [ ] Prepare Serum + Toner bundle listing for Douyin shop

### Short-term (March 13-17)
- [ ] Launch A/B test with ¥20K daily budget per variant
- [ ] Monitor Douyin organic reach daily (algorithm impact assessment)
- [ ] Review Proya competitive intelligence (pricing, promotion calendar)
- [ ] Evaluate audience segmentation adjustment for scaled campaigns

### Medium-term (March 18-21)
- [ ] Scale winning creative to 80% of budget
- [ ] Implement weekly creative refresh SOP (max 14-day lifecycle)
- [ ] Report results and updated forecast to CEO

### Success Criteria
- Recover CVR to ≥3.5% by March 17
- Achieve ROI ≥2.2 on new creatives
- Establish sustainable creative pipeline (2 new videos/week)`,
      zh: `# 抖音转化率恢复 — 行动清单
## 负责人: 抖音投放负责人
## 时间线: 2025年3月10-21日

### 立即行动 (3月10-12日)
- [ ] 向创意团队下达3种新视频角度（成分教育、UGC证言、对比）
- [ ] 搭建新素材A/B测试框架
- [ ] 疲劳素材出价降低30%（不暂停——维持基准）
- [ ] 准备精华+化妆水组合在抖音店铺上架

### 短期 (3月13-17日)
- [ ] 启动A/B测试，每个变体每日预算¥2万
- [ ] 每日监控抖音自然触达（算法影响评估）
- [ ] 查看珀莱雅竞品情报（定价、促销日历）
- [ ] 评估放量活动的人群分层调整

### 中期 (3月18-21日)
- [ ] 将优胜素材放量至预算的80%
- [ ] 建立每周素材更新SOP（最长14天生命周期）
- [ ] 向CEO汇报结果和更新预测

### 成功标准
- 3月17日前转化率恢复至≥3.5%
- 新素材ROI≥2.2
- 建立可持续素材管线（每周2条新视频）`,
    },
    statusHistory: [
      { from: "draft", to: "in_progress", changedBy: "douyin_lead", changedAt: "2025-03-09 12:00" },
      { from: "in_progress", to: "review", changedBy: "douyin_lead", changedAt: "2025-03-09 15:00" },
    ],
    versions: [
      { version: 1, createdAt: "2025-03-09 15:00", createdBy: "douyin_lead", note: bi("Action plan from Douyin deep dive diagnosis", "基于抖音深度分析诊断的行动计划"), isCurrent: true },
    ],
    feedback: [],
  },
  {
    id: "r8",
    title: bi("CEO Weekly Brief — W9", "CEO周报简报 — 第9周"),
    type: "ceo_summary",
    status: "approved",
    ownerKey: "ceo",
    currentVersion: 1,
    date: "2025-03-02",
    sourceDiagnosisId: "d4",
    markdown: {
      en: `# CEO Weekly Brief — Week 9

**Bottom Line**: On track. GMV ¥3.12M (+3.2% WoW). All systems go for sunscreen launch next week.

### Key Updates
1. 🟢 GMV and orders trending above plan
2. 🟢 Xiaohongshu pre-launch buzz strong (brand mentions +65%)
3. 🟡 Douyin creatives showing early fatigue — refresh planned for W10

### No Decisions Needed This Week
Operations team has all actions in hand.`,
      zh: `# CEO周报简报 — 第9周

**核心结论**: 在轨。GMV ¥312万（环比+3.2%）。防晒下周上市一切就绪。

### 关键更新
1. 🟢 GMV和订单量趋势高于计划
2. 🟢 小红书预上市热度强劲（品牌提及+65%）
3. 🟡 抖音素材初显疲劳——第10周计划更新

### 本周无需决策
运营团队所有行动在控。`,
    },
    statusHistory: [
      { from: "draft", to: "in_progress", changedBy: "ops_lead", changedAt: "2025-03-02 09:30" },
      { from: "in_progress", to: "review", changedBy: "ops_lead", changedAt: "2025-03-02 10:00" },
      { from: "review", to: "approved", changedBy: "ceo", changedAt: "2025-03-02 11:00" },
    ],
    versions: [
      { version: 1, createdAt: "2025-03-02 10:00", createdBy: "ops_lead", note: bi("W9 CEO brief", "第9周CEO简报"), isCurrent: true },
    ],
    feedback: [
      { id: "f8", score: 5, comment: bi("Perfect. Concise and actionable.", "完美。简洁且可执行。"), by: "ceo", createdAt: "2025-03-02 11:00" },
    ],
  },
  {
    id: "r9",
    title: bi("Sunscreen Quality Issue Escalation Report", "防晒质量问题升级报告"),
    type: "action_list",
    status: "in_progress",
    ownerKey: "product_manager",
    currentVersion: 2,
    date: "2025-03-09",
    sourceDiagnosisId: "d2",
    markdown: {
      en: `# Sunscreen Quality Issue — Escalation Report
## Owner: Product Manager
## Severity: HIGH | Date: 2025-03-09

### Issue Summary
Lightweight Sunscreen Milk (SKU003) batch shipped Feb 28-Mar 3 has 8.4% refund rate (vs 3.5% category avg). Customer complaints primarily about greasy texture inconsistent with "lightweight" positioning.

### Root Cause Investigation
- **Confirmed**: Feb 28 batch used higher emollient ratio than approved formula
- **Under investigation**: Whether production line changeover caused contamination
- **Timeline**: QC results expected by March 11

### Impact Assessment
- 420 affected orders (of 3,200 total)
- Estimated refund cost: ¥58,800
- Brand reputation risk: 47 negative reviews posted (23 on Tmall, 15 on Douyin, 9 on JD)

### Actions Taken
1. ✅ Paused all paid advertising for SKU003
2. ✅ Flagged batch in warehouse system to prevent further shipment
3. 🔄 Customer outreach in progress (280/420 contacted)
4. ⬜ Factory audit scheduled for March 11

### Pending Decisions
- Full voluntary recall vs targeted replacement (cost difference: ¥120K)
- Resume advertising timeline after QC clearance`,
      zh: `# 防晒质量问题 — 升级报告
## 负责人: 产品经理
## 严重程度: 高 | 日期: 2025-03-09

### 问题摘要
轻薄防晒乳(SKU003) 2月28日-3月3日发货批次退款率8.4%（品类平均3.5%）。客户投诉主要集中在质地油腻，与"轻薄"定位不符。

### 根因调查
- **已确认**: 2月28日批次使用的润肤剂比例高于批准配方
- **调查中**: 生产线切换是否导致交叉污染
- **时间线**: 质检结果预计3月11日出

### 影响评估
- 受影响订单420单（总计3,200单）
- 预估退款成本: ¥58,800
- 品牌声誉风险: 已发布47条差评（天猫23条、抖音15条、京东9条）

### 已采取行动
1. ✅ 暂停SKU003所有付费投放
2. ✅ 仓库系统标记该批次，阻止继续发货
3. 🔄 客户沟通进行中（已联系280/420）
4. ⬜ 工厂审计安排在3月11日

### 待决事项
- 全面自愿召回 vs 定向换货（成本差异: ¥12万）
- 质检通过后恢复投放时间线`,
    },
    statusHistory: [
      { from: "draft", to: "in_progress", changedBy: "product_manager", changedAt: "2025-03-09 08:00" },
    ],
    versions: [
      { version: 1, createdAt: "2025-03-09 08:00", createdBy: "product_manager", note: bi("Initial escalation report", "初始升级报告"), isCurrent: false },
      { version: 2, createdAt: "2025-03-09 14:00", createdBy: "product_manager", note: bi("Updated with root cause confirmation and customer outreach progress", "更新根因确认和客户沟通进展"), isCurrent: true },
    ],
    feedback: [
      { id: "f9", score: 3, comment: bi("Good tracking. Need cost comparison for recall vs replacement ASAP.", "跟踪良好。尽快提供召回vs换货的成本比较。"), by: "ceo", createdAt: "2025-03-09 10:00" },
    ],
  },
  {
    id: "r10",
    title: bi("Xiaohongshu KOC Performance Report", "小红书KOC效果报告"),
    type: "campaign",
    status: "approved",
    ownerKey: "analyst",
    currentVersion: 1,
    date: "2025-03-07",
    sourceDiagnosisId: null,
    markdown: {
      en: `# Xiaohongshu KOC Seeding — Performance Report
## Campaign: Repair Cream KOC Program (Feb 2025)

### Results Summary
50 KOCs engaged over 4 weeks. Total investment: ¥85,000.

### Performance Metrics
| Metric | Result | Benchmark |
|--------|--------|-----------|
| Total Posts | 156 | 150 (target) |
| Total Engagement | 42,800 | 30,000 |
| Organic Search Lift | +40% | +25% |
| Tmall CVR Impact | +8% | +5% |
| Estimated Attributable GMV | ¥320,000 | ¥200,000 |
| ROI | 3.76x | 2.5x |

### Key Learnings
- KOCs with 5K-20K followers outperformed larger accounts on engagement rate
- "Before/after" content format drove 3x more saves than product-only posts
- Posting cadence of 10/week sustained visibility better than front-loading

### Recommendation
Scale program to 80 KOCs for Q2. Expand to Eye Cream and Toner. Budget request: ¥140,000/month.`,
      zh: `# 小红书KOC种草 — 效果报告
## 活动: 修护面霜KOC计划（2025年2月）

### 结果摘要
4周内合作50位KOC。总投入: ¥85,000。

### 效果指标
| 指标 | 结果 | 基准 |
|------|------|------|
| 总帖数 | 156 | 150（目标）|
| 总互动量 | 42,800 | 30,000 |
| 自然搜索提升 | +40% | +25% |
| 天猫转化率影响 | +8% | +5% |
| 预估归因GMV | ¥320,000 | ¥200,000 |
| ROI | 3.76倍 | 2.5倍 |

### 关键经验
- 5K-20K粉丝的KOC在互动率上优于更大的账号
- "使用前后对比"内容格式的收藏量是纯产品帖的3倍
- 每周10篇的发布节奏比集中发布更能维持可见度

### 建议
Q2扩大至80位KOC。扩展到眼霜和化妆水。月预算申请: ¥140,000。`,
    },
    statusHistory: [
      { from: "draft", to: "in_progress", changedBy: "analyst", changedAt: "2025-03-06 10:00" },
      { from: "in_progress", to: "review", changedBy: "analyst", changedAt: "2025-03-07 11:00" },
      { from: "review", to: "approved", changedBy: "ops_lead", changedAt: "2025-03-07 14:00" },
    ],
    versions: [
      { version: 1, createdAt: "2025-03-07 11:00", createdBy: "analyst", note: bi("KOC program analysis with full metrics", "KOC项目分析含完整指标"), isCurrent: true },
    ],
    feedback: [
      { id: "f10", score: 5, comment: bi("Outstanding ROI. Approve Q2 expansion. Share with CEO.", "ROI出色。批准Q2扩展。分享给CEO。"), by: "ops_lead", createdAt: "2025-03-07 14:00" },
      { id: "f11", score: 5, comment: bi("Best performing marketing initiative this quarter. Great data.", "本季度最佳营销举措。数据扎实。"), by: "ceo", createdAt: "2025-03-07 16:00" },
    ],
  },
];
