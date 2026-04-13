import type { PendingTask, User } from "@/types/api";
import { bi } from "./helpers";

export const mockUsers: User[] = [
  { id: "u1", name: bi("Chen Wei", "陈伟"), role: "ceo", avatar: undefined },
  { id: "u2", name: bi("Liu Xiaoming", "刘小明"), role: "ops_lead", avatar: undefined },
  { id: "u3", name: bi("Zhang Hui", "张慧"), role: "analyst", avatar: undefined },
  { id: "u4", name: bi("Wang Li", "王丽"), role: "product_manager", avatar: undefined },
  { id: "u5", name: bi("Zhao Jun", "赵军"), role: "douyin_lead", avatar: undefined },
];

export const mockPendingTasks: PendingTask[] = [
  {
    id: "t1",
    title: bi("Refresh Douyin creatives (3-5 new videos)", "更新抖音素材（3-5条新视频）"),
    assignee: "douyin_lead",
    priority: "high",
    dueDate: "2025-03-12",
    status: "in_progress",
  },
  {
    id: "t2",
    title: bi("Investigate sunscreen batch quality issue", "调查防晒批次质量问题"),
    assignee: "product_manager",
    priority: "high",
    dueDate: "2025-03-11",
    status: "in_progress",
  },
  {
    id: "t3",
    title: bi("Contact affected sunscreen customers (420 orders)", "联系受影响的防晒客户（420单）"),
    assignee: "ops_lead",
    priority: "high",
    dueDate: "2025-03-11",
    status: "in_progress",
  },
  {
    id: "t4",
    title: bi("Set up Serum + Toner bundle on Douyin", "在抖音搭建精华+化妆水组合"),
    assignee: "ops_lead",
    priority: "medium",
    dueDate: "2025-03-13",
    status: "pending",
  },
  {
    id: "t5",
    title: bi("Increase Xiaohongshu KOC budget by 30%", "小红书KOC预算增加30%"),
    assignee: "ops_lead",
    priority: "medium",
    dueDate: "2025-03-14",
    status: "pending",
  },
  {
    id: "t6",
    title: bi("Review Proya competitive pricing intelligence", "查看珀莱雅竞品定价情报"),
    assignee: "analyst",
    priority: "medium",
    dueDate: "2025-03-12",
    status: "pending",
  },
  {
    id: "t7",
    title: bi("Prepare Repair Cream contingency bundle", "准备修护面霜应急组合方案"),
    assignee: "ops_lead",
    priority: "low",
    dueDate: "2025-03-14",
    status: "pending",
  },
  {
    id: "t8",
    title: bi("Monitor Douyin organic reach daily (algorithm impact)", "每日监控抖音自然触达（算法影响）"),
    assignee: "douyin_lead",
    priority: "medium",
    dueDate: "2025-03-16",
    status: "in_progress",
  },
  {
    id: "t9",
    title: bi("Factory audit for sunscreen production line", "防晒生产线工厂审计"),
    assignee: "product_manager",
    priority: "high",
    dueDate: "2025-03-11",
    status: "pending",
  },
  {
    id: "t10",
    title: bi("Finalize Q2 KOC expansion proposal (80 KOCs, ¥140K/month)", "敲定Q2 KOC扩展方案（80位KOC，月预算¥14万）"),
    assignee: "analyst",
    priority: "low",
    dueDate: "2025-03-21",
    status: "pending",
  },
];
