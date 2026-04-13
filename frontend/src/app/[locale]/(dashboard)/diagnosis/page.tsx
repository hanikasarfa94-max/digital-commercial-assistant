"use client";

import { useState, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Stethoscope, Calendar, Megaphone, TrendingDown, Play, Loader2, CheckCircle2, Clock, ArrowRight, AlertCircle,
} from "lucide-react";
import { diagnosisApi, metricsApi } from "@/lib/api-client";
import { useApi, usePolling } from "@/lib/use-api";
import { DiagnosisResultView } from "@/components/diagnosis/result-view";
import type { DiagnosisResult, DiagnosisType, Bilingual } from "@/types/api";
import type { Locale } from "@/i18n/config";

function L(obj: Bilingual, locale: Locale) { return obj[locale] || obj.en; }

const channelOptions = ["tmall", "douyin", "xiaohongshu", "jd", "pinduoduo"] as const;

const typeMap: Record<string, DiagnosisType> = {
  weekly_review: "weekly_review",
  campaign_retro: "campaign_retro",
  single_metric: "anomaly_deep_dive",
};

export default function DiagnosisPage() {
  const t = useTranslations("diagnosis");
  const tst = useTranslations("status");
  const tch = useTranslations("channels");
  const locale = useLocale() as Locale;

  const [activeTab, setActiveTab] = useState("new");
  const [taskType, setTaskType] = useState<"weekly_review" | "campaign_retro" | "single_metric">("weekly_review");
  const [startDate, setStartDate] = useState("2025-03-03");
  const [endDate, setEndDate] = useState("2025-03-09");
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [selectedMetric, setSelectedMetric] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [runningId, setRunningId] = useState<string | null>(null);
  const [completedResult, setCompletedResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch history + anomalies for metric selector
  const { data: historyData, loading: historyLoading, refetch: refetchHistory } = useApi(
    () => diagnosisApi.list(),
  );
  const { data: anomaliesData } = useApi(() => metricsApi.anomalies());

  // Poll for running diagnosis
  const { data: polledResult } = usePolling(
    () => diagnosisApi.get(runningId!),
    (d) => {
      if (d.status === "completed" || d.status === "failed") {
        setIsRunning(false);
        setCompletedResult(d);
        setActiveTab("result");
        refetchHistory();
        return true; // stop polling
      }
      return false;
    },
    2000,
    [runningId],
  );

  // Override: if we have a polled result that's done, use it
  const displayResult = completedResult;

  function toggleChannel(ch: string) {
    setSelectedChannels((prev) => prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]);
  }

  async function handleRun() {
    setIsRunning(true);
    setCompletedResult(null);
    setError(null);

    try {
      const result = await diagnosisApi.run({
        type: typeMap[taskType],
        timeRange: `${startDate} ~ ${endDate}`,
        channels: selectedChannels.length > 0 ? selectedChannels as typeof channelOptions[number][] : undefined,
      });
      setRunningId(result.id);
    } catch (e) {
      setIsRunning(false);
      setError(e instanceof Error ? e.message : "Failed to start diagnosis");
    }
  }

  const steps = [t("step1"), t("step2"), t("step3"), t("step4")];
  // Estimate progress from polling
  const progressEstimate = isRunning
    ? (polledResult?.status === "completed" ? 100 : runningId ? 60 : 20)
    : (completedResult ? 100 : 0);

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="new">{t("newTask")}</TabsTrigger>
          <TabsTrigger value="history">{t("taskHistory")}</TabsTrigger>
          {displayResult && <TabsTrigger value="result">{t("result")}</TabsTrigger>}
        </TabsList>

        {/* New Task */}
        <TabsContent value="new" className="space-y-6 mt-4">
          <div>
            <h3 className="text-sm font-medium mb-3">{t("taskType")}</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {([
                { type: "weekly_review" as const, icon: Calendar, titleKey: "weeklyReview", descKey: "weeklyReviewDesc" },
                { type: "campaign_retro" as const, icon: Megaphone, titleKey: "campaignRetro", descKey: "campaignRetroDesc" },
                { type: "single_metric" as const, icon: TrendingDown, titleKey: "singleMetric", descKey: "singleMetricDesc" },
              ]).map((item) => (
                <Card
                  key={item.type}
                  className={`cursor-pointer transition-colors ${taskType === item.type ? "border-primary bg-primary/5" : "hover:border-primary/30"}`}
                  onClick={() => setTaskType(item.type)}
                >
                  <CardContent className="pt-4 pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      {item.type === "weekly_review" && <Badge variant="secondary" className="text-[10px]">{t("mostUsed")}</Badge>}
                    </div>
                    <p className="text-sm font-medium">{t(item.titleKey)}</p>
                    <p className="text-xs text-muted-foreground mt-1">{t(item.descKey)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{t("timeRange")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="text-xs text-muted-foreground">{t("startDate")}</label>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="block mt-1 rounded-md border px-3 py-1.5 text-sm bg-background" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">{t("endDate")}</label>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="block mt-1 rounded-md border px-3 py-1.5 text-sm bg-background" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Channel filter for weekly review & campaign retro */}
          {(taskType === "weekly_review" || taskType === "campaign_retro") && (
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-sm">{t("selectChannels")}</CardTitle></CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {channelOptions.map((ch) => (
                  <Button key={ch} variant={selectedChannels.includes(ch) ? "default" : "outline"} size="sm" onClick={() => toggleChannel(ch)}>
                    {tch(ch)}
                  </Button>
                ))}
                {selectedChannels.length === 0 && <span className="text-xs text-muted-foreground">{t("allChannels")}</span>}
              </CardContent>
            </Card>
          )}

          {/* Campaign selector for campaign retro */}
          {taskType === "campaign_retro" && (
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-sm">{t("campaign")}</CardTitle></CardHeader>
              <CardContent>
                <Select value={selectedCampaign} onValueChange={(v) => setSelectedCampaign(v ?? "")}>
                  <SelectTrigger className="w-full sm:w-96">
                    <SelectValue placeholder={t("selectCampaign")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sunscreen_launch">{t("sunscreenLaunch")}</SelectItem>
                    <SelectItem value="influencer_expansion">{t("midMonthInfluencer")}</SelectItem>
                    <SelectItem value="tmall_promo">{t("endMonthPromo")}</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          )}

          {/* Metric/anomaly selector for single metric deep dive */}
          {taskType === "single_metric" && (
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-sm">{t("metric")}</CardTitle></CardHeader>
              <CardContent>
                <Select value={selectedMetric} onValueChange={(v) => setSelectedMetric(v ?? "")}>
                  <SelectTrigger className="w-full sm:w-96">
                    <SelectValue placeholder={t("selectMetric")} />
                  </SelectTrigger>
                  <SelectContent>
                    {(anomaliesData?.anomalies ?? []).map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.metric} ({L(a.scope, locale)}) {a.changePercent > 0 ? "+" : ""}{a.changePercent}%
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          )}

          {/* Run button + progress */}
          <div className="space-y-4">
            <Button size="lg" onClick={handleRun} disabled={isRunning} className="gap-2">
              {isRunning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              {isRunning ? t("running") : t("runDiagnosis")}
            </Button>

            {error && (
              <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950">
                <CardContent className="pt-4 flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </CardContent>
              </Card>
            )}

            {isRunning && (
              <Card>
                <CardContent className="pt-4 space-y-3">
                  <Progress value={progressEstimate} className="h-2" />
                  <div className="space-y-2">
                    {steps.map((step, i) => {
                      const stepDone = progressEstimate > (i + 1) * 25;
                      const stepActive = !stepDone && progressEstimate >= i * 25;
                      return (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          {stepDone ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : stepActive ? <Loader2 className="h-4 w-4 animate-spin text-primary" /> : <Clock className="h-4 w-4 text-muted-foreground" />}
                          <span className={stepDone || stepActive ? "text-foreground" : "text-muted-foreground"}>{step}</span>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t("running")}... LLM is analyzing your business data.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* History */}
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                {t("taskHistory")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {historyLoading ? (
                <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
              ) : (
                (historyData?.items ?? []).map((d) => (
                  <Link key={d.id} href={`/diagnosis/${d.id}`} className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium">{L(d.title, locale)}</p>
                        <Badge variant="secondary" className="text-[10px]">
                          {t(d.type === "weekly_review" ? "weeklyReview" : d.type === "campaign_retro" ? "campaignRetro" : "singleMetric")}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{d.timeRange} &middot; {d.createdAt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={d.status === "completed" ? "default" : d.status === "running" ? "secondary" : "destructive"}
                        className="text-xs"
                      >
                        {tst(d.status)}
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inline Result */}
        {displayResult && (
          <TabsContent value="result" className="mt-4">
            <DiagnosisResultView result={displayResult} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
