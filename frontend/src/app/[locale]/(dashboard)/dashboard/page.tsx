"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingDown, TrendingUp, AlertTriangle, Filter, Loader2 } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";
import { metricsApi } from "@/lib/api-client";
import { useApi } from "@/lib/use-api";
import type { Locale } from "@/i18n/config";
import type { Bilingual, MetricKey } from "@/types/api";

function L(obj: Bilingual, locale: Locale) { return obj[locale] || obj.en; }

const metricKeysList: MetricKey[] = [
  "gmv", "orders", "visitors", "conversionRate", "avgOrderValue", "roi", "adSpend", "refundRate",
];

// Map API metric keys to display i18n keys
const metricI18nKey: Record<MetricKey, string> = {
  gmv: "gmv",
  orders: "orders",
  visitors: "uv",
  conversionRate: "conversionRate",
  avgOrderValue: "aov",
  roi: "roi",
  adSpend: "spend",
  refundRate: "refundRate",
};

const metricFormat: Record<MetricKey, (v: number, wan: string) => string> = {
  gmv: (v, wan) => `¥${(v / 10000).toFixed(1)}${wan}`,
  orders: (v) => v.toLocaleString(),
  visitors: (v, wan) => `${(v / 10000).toFixed(1)}${wan}`,
  conversionRate: (v) => `${v}%`,
  avgOrderValue: (v) => `¥${v.toFixed(0)}`,
  roi: (v) => v.toFixed(2),
  adSpend: (v, wan) => `¥${(v / 10000).toFixed(1)}${wan}`,
  refundRate: (v) => `${v}%`,
};

const dateRangeKeys = ["thisWeek", "lastWeek", "last30Days"] as const;
const channelFilterKeys = ["tmall", "douyin", "xiaohongshu"] as const;

const severityVariant = {
  high: "destructive" as const,
  medium: "secondary" as const,
  low: "outline" as const,
};

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const tm = useTranslations("metrics");
  const ts = useTranslations("severity");
  const tc = useTranslations("common");
  const tch = useTranslations("channels");
  const locale = useLocale() as Locale;

  const [dateRange, setDateRange] = useState("thisWeek");
  const [channelFilter, setChannelFilter] = useState("all");

  const { data: overviewData, loading: overviewLoading } = useApi(() => metricsApi.overview());
  const { data: trendData, loading: trendLoading } = useApi(() => metricsApi.trend(7));
  const { data: channelsData, loading: channelsLoading } = useApi(() => metricsApi.channels());
  const { data: productsData } = useApi(() => metricsApi.products());
  const { data: anomaliesData } = useApi(() => metricsApi.anomalies());

  // Map API overview to keyed object for display
  const metricsMap = new Map(
    (overviewData?.metrics ?? []).map((m) => [m.key, m])
  );

  // Channel filtering
  const allChannels = channelsData?.channels ?? [];
  const filteredChannels = channelFilter === "all"
    ? allChannels
    : allChannels.filter((c) => c.channel === channelFilter);

  const chartChannelData = filteredChannels.map((c) => ({
    ...c,
    channelLabel: tch(c.channel),
  }));

  // Trend chart data
  const trendChartData = (trendData?.points ?? []).map((p) => ({
    date: p.date.slice(5), // "03-03"
    gmv: p.metrics.gmv,
    orders: p.metrics.orders,
    visitors: p.metrics.visitors,
  }));

  if (overviewLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{t("dateRange")}:</span>
          {dateRangeKeys.map((key) => (
            <Button key={key} variant={dateRange === key ? "default" : "outline"} size="sm" onClick={() => setDateRange(key)}>
              {t(key)}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{t("filterChannel")}:</span>
          <Button variant={channelFilter === "all" ? "default" : "outline"} size="sm" onClick={() => setChannelFilter("all")}>
            {t("allChannels")}
          </Button>
          {channelFilterKeys.map((ch) => (
            <Button key={ch} variant={channelFilter === ch ? "default" : "outline"} size="sm" onClick={() => setChannelFilter(ch)}>
              {tch(ch)}
            </Button>
          ))}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {metricKeysList.map((key) => {
          const data = metricsMap.get(key);
          if (!data) return null;
          const isNeg = data.changePercent < 0;
          const isInverse = key === "refundRate" || key === "adSpend";
          const badColor = isInverse ? !isNeg : isNeg;
          return (
            <Card key={key}>
              <CardContent className="pt-4 pb-3">
                <p className="text-xs text-muted-foreground">{tm(metricI18nKey[key])}</p>
                <p className="text-xl font-bold mt-1">{metricFormat[key](data.value, tm("wan"))}</p>
                <p className={`text-xs mt-1 flex items-center gap-1 ${badColor ? "text-red-600" : "text-green-600"}`}>
                  {isNeg ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                  {Math.abs(data.changePercent)}% {tc("wow")}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t("gmvTrend")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              {trendLoading ? (
                <div className="flex items-center justify-center h-full"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 10000).toFixed(0)}${tm("wan")}`} />
                    <Tooltip formatter={(v) => [`¥${Number(v).toLocaleString()}`, tm("gmv")]} />
                    <Line type="monotone" dataKey="gmv" stroke="#18181b" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t("channelGmv")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              {channelsLoading ? (
                <div className="flex items-center justify-center h-full"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartChannelData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="channelLabel" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 10000).toFixed(0)}${tm("wan")}`} />
                    <Tooltip formatter={(v) => [`¥${Number(v).toLocaleString()}`, tm("gmv")]} />
                    <Bar dataKey="gmv" fill="#18181b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Channel Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{t("channelPerf")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="text-left py-2 font-medium">{t("channel")}</th>
                  <th className="text-right py-2 font-medium">{tm("gmv")}</th>
                  <th className="text-right py-2 font-medium">{t("orders")}</th>
                  <th className="text-right py-2 font-medium">{tm("conversionRate")}</th>
                  <th className="text-right py-2 font-medium">{tm("roi")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredChannels.map((ch) => (
                  <tr key={ch.channel} className="border-b last:border-0">
                    <td className="py-2.5 font-medium">{tch(ch.channel)}</td>
                    <td className="py-2.5 text-right">¥{(ch.gmv / 10000).toFixed(1)}{tm("wan")}</td>
                    <td className="py-2.5 text-right">{ch.orders.toLocaleString()}</td>
                    <td className="py-2.5 text-right">{ch.conversionRate}%</td>
                    <td className="py-2.5 text-right">{ch.roi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Products */}
      {productsData && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t("productLines")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="text-left py-2 font-medium">{t("sku")}</th>
                    <th className="text-left py-2 font-medium">{t("product")}</th>
                    <th className="text-right py-2 font-medium">{tm("gmv")}</th>
                    <th className="text-right py-2 font-medium">{t("orders")}</th>
                    <th className="text-right py-2 font-medium">{tm("conversionRate")}</th>
                    <th className="text-right py-2 font-medium">{tm("refundRate")}</th>
                  </tr>
                </thead>
                <tbody>
                  {productsData.products.map((p) => (
                    <tr key={p.sku} className="border-b last:border-0">
                      <td className="py-2.5 font-mono text-xs">{p.sku}</td>
                      <td className="py-2.5 font-medium">{L(p.name, locale)}</td>
                      <td className="py-2.5 text-right">¥{(p.gmv / 10000).toFixed(1)}{tm("wan")}</td>
                      <td className="py-2.5 text-right">{p.orders.toLocaleString()}</td>
                      <td className="py-2.5 text-right">{p.conversionRate}%</td>
                      <td className="py-2.5 text-right">{p.refundRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Anomalies */}
      {anomaliesData && anomaliesData.anomalies.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              {t("activeAnomalies")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {anomaliesData.anomalies.map((a) => (
              <div key={a.id} className="flex items-start gap-3 rounded-lg border p-3">
                <Badge variant={severityVariant[a.severity]} className="mt-0.5 text-xs shrink-0">
                  {ts(a.severity)}
                </Badge>
                <div>
                  <p className="text-sm font-medium">
                    {tm(metricI18nKey[a.metric] ?? a.metric)} ({L(a.scope, locale)}) {a.changePercent > 0 ? "+" : ""}{a.changePercent}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{L(a.description, locale)}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
