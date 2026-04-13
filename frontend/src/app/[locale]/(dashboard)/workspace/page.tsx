"use client";

import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import {
  AlertTriangle, TrendingDown, FileText, Bot, ClipboardList, ArrowRight, Loader2,
} from "lucide-react";
import { workspaceApi } from "@/lib/api-client";
import { useApi } from "@/lib/use-api";
import type { Locale } from "@/i18n/config";
import type { Bilingual } from "@/types/api";

function L(obj: Bilingual, locale: Locale) { return obj[locale] || obj.en; }

const severityColor = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  low: "bg-blue-100 text-blue-700 border-blue-200",
};
const statusBadge: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  completed: "default",
  in_progress: "secondary",
  running: "secondary",
  draft: "outline",
  pending: "outline",
  review: "secondary",
  approved: "default",
  rejected: "destructive",
  archived: "outline",
};

export default function WorkspacePage() {
  const t = useTranslations("workspace");
  const tm = useTranslations("metrics");
  const tc = useTranslations("common");
  const ts = useTranslations("severity");
  const tst = useTranslations("status");
  const tp = useTranslations("priority");
  const trl = useTranslations("roles");
  const locale = useLocale() as Locale;

  const { data, loading } = useApi(() => workspaceApi.get());

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const gmv = data.metricsSnapshot.find((m) => m.key === "gmv");
  const orders = data.metricsSnapshot.find((m) => m.key === "orders");
  const cvr = data.metricsSnapshot.find((m) => m.key === "conversionRate");
  const roi = data.metricsSnapshot.find((m) => m.key === "roi");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-3">{t("todaySummary")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gmv && <SummaryCard label={tm("weeklyGmv")} value={`¥${(gmv.value / 10000).toFixed(1)}${tm("wan")}`} change={gmv.changePercent} suffix={tc("vsLastWeek")} />}
          {orders && <SummaryCard label={tm("orders")} value={orders.value.toLocaleString()} change={orders.changePercent} suffix={tc("vsLastWeek")} />}
          {cvr && <SummaryCard label={tm("conversionRate")} value={`${cvr.value}%`} change={cvr.changePercent} suffix={tc("vsLastWeek")} />}
          {roi && <SummaryCard label={tm("roi")} value={roi.value.toFixed(2)} change={roi.changePercent} suffix={tc("vsLastWeek")} />}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Anomaly Alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              {t("anomalyAlerts")}
            </CardTitle>
            <Link href="/diagnosis" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
              {tc("viewAll")} <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.recentAnomalies.map((a) => (
              <div key={a.id} className={`rounded-lg border p-3 ${severityColor[a.severity]}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{tm(a.metric)} / {L(a.scope, locale)}</span>
                  <Badge variant="outline" className="text-xs">{a.changePercent > 0 ? "+" : ""}{a.changePercent}%</Badge>
                </div>
                <p className="text-xs opacity-80">{L(a.description, locale)}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-blue-500" />
              {t("pendingTasks")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.pendingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{L(task.title, locale)}</p>
                  <p className="text-xs text-muted-foreground">{trl(task.assignee)}</p>
                </div>
                <Badge variant={task.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                  {tp(task.priority)}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-green-500" />
              {t("recentReports")}
            </CardTitle>
            <Link href="/reports" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
              {tc("viewAll")} <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.recentReports.map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{L(r.title, locale)}</p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
                <Badge variant={statusBadge[r.status] ?? "outline"} className="text-xs">
                  {tst(r.status)}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Agent Runs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Bot className="h-4 w-4 text-purple-500" />
              {t("recentAgentRuns")}
            </CardTitle>
            <Link href="/agent-center" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
              {tc("viewAll")} <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.recentAgentRuns.map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{L(r.agentName, locale)}</p>
                  <p className="text-xs text-muted-foreground">{r.startedAt}</p>
                </div>
                <Badge variant={statusBadge[r.status] ?? "outline"} className="text-xs">
                  {tst(r.status)}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, change, suffix }: { label: string; value: string; change: number; suffix: string }) {
  const isNegative = change < 0;
  return (
    <Card>
      <CardContent className="pt-4">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
        <p className={`text-xs mt-1 flex items-center gap-1 ${isNegative ? "text-red-600" : "text-green-600"}`}>
          <TrendingDown className={`h-3 w-3 ${!isNegative ? "rotate-180" : ""}`} />
          {Math.abs(change).toFixed(1)}% {suffix}
        </p>
      </CardContent>
    </Card>
  );
}
