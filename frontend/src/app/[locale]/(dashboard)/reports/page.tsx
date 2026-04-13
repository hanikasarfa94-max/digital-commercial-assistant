"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { FileText, Plus, Loader2, CheckCircle2, ArrowRight, Star } from "lucide-react";
import { reportsApi, diagnosisApi } from "@/lib/api-client";
import { useApi } from "@/lib/use-api";
import type { Locale } from "@/i18n/config";
import type { Bilingual } from "@/types/api";

function L(obj: Bilingual, locale: Locale) { return obj[locale] || obj.en; }

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  completed: "default",
  in_progress: "secondary",
  draft: "outline",
  review: "secondary",
  approved: "default",
  rejected: "destructive",
  archived: "outline",
};
const typeKeys: Record<string, string> = {
  weekly: "weeklyReport",
  campaign: "campaignRetro",
  ceo_summary: "ceoSummary",
  action_list: "actionList",
};

export default function ReportsPage() {
  const t = useTranslations("reports");
  const tst = useTranslations("status");
  const trl = useTranslations("roles");
  const locale = useLocale() as Locale;

  const [activeTab, setActiveTab] = useState("list");
  const [selectedDiagnosis, setSelectedDiagnosis] = useState("");
  const [reportType, setReportType] = useState("");
  const [audience, setAudience] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const { data: reportData, loading: reportsLoading } = useApi(() => reportsApi.list());
  const { data: diagData } = useApi(() => diagnosisApi.list());

  const completedDiagnoses = (diagData?.items ?? []).filter((d) => d.status === "completed");

  async function handleGenerate() {
    if (!selectedDiagnosis || !reportType) return;
    setGenerating(true);
    setGenerated(false);
    try {
      await reportsApi.generate({
        diagnosisId: selectedDiagnosis,
        type: reportType,
        audience: audience || "all",
      });
      setGenerated(true);
      // Refresh the list and switch to it after a brief delay
      setTimeout(() => {
        setActiveTab("list");
        // Trigger a re-render to pick up the new report
        window.location.reload();
      }, 1200);
    } catch {
      // Error handling — just stop the spinner
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list">{t("reportArchive")}</TabsTrigger>
          <TabsTrigger value="generate">
            <Plus className="h-3 w-3 mr-1" />
            {t("generateNew")}
          </TabsTrigger>
        </TabsList>

        {/* Report List */}
        <TabsContent value="list" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {t("reportArchive")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {reportsLoading ? (
                <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-muted-foreground">
                        <th className="text-left py-2 font-medium">{t("title")}</th>
                        <th className="text-left py-2 font-medium">{t("type")}</th>
                        <th className="text-left py-2 font-medium">{t("owner")}</th>
                        <th className="text-left py-2 font-medium">{t("version")}</th>
                        <th className="text-left py-2 font-medium">{t("status")}</th>
                        <th className="text-left py-2 font-medium">{t("feedbackScore")}</th>
                        <th className="text-left py-2 font-medium">{t("date")}</th>
                        <th className="text-right py-2 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {(reportData?.items ?? []).map((r) => {
                        const avgScore = r.feedback.length > 0
                          ? (r.feedback.reduce((s, f) => s + f.score, 0) / r.feedback.length).toFixed(1)
                          : null;
                        return (
                          <tr key={r.id} className="border-b last:border-0 hover:bg-muted/50">
                            <td className="py-2.5 font-medium">{L(r.title, locale)}</td>
                            <td className="py-2.5">{t(typeKeys[r.type] ?? r.type)}</td>
                            <td className="py-2.5">{trl(r.ownerKey)}</td>
                            <td className="py-2.5">v{r.currentVersion}</td>
                            <td className="py-2.5">
                              <Badge variant={statusVariant[r.status]} className="text-xs">
                                {tst(r.status)}
                              </Badge>
                            </td>
                            <td className="py-2.5">
                              {avgScore ? (
                                <span className="flex items-center gap-1 text-xs">
                                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" /> {avgScore}
                                </span>
                              ) : (
                                <span className="text-xs text-muted-foreground">—</span>
                              )}
                            </td>
                            <td className="py-2.5 text-muted-foreground">{r.date}</td>
                            <td className="py-2.5 text-right">
                              <Link href={`/reports/${r.id}`}>
                                <Button variant="ghost" size="sm" className="gap-1">
                                  {t("preview")} <ArrowRight className="h-3 w-3" />
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Generate New */}
        <TabsContent value="generate" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t("generateNew")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">{t("fromDiagnosis")}</label>
                <Select value={selectedDiagnosis} onValueChange={(v) => setSelectedDiagnosis(v ?? "")}>
                  <SelectTrigger className="w-full sm:w-96">
                    <SelectValue placeholder={t("selectDiagnosis")} />
                  </SelectTrigger>
                  <SelectContent>
                    {completedDiagnoses.map((d) => (
                      <SelectItem key={d.id} value={d.id}>
                        {L(d.title, locale)} — {d.timeRange}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">{t("reportType")}</label>
                <Select value={reportType} onValueChange={(v) => setReportType(v ?? "")}>
                  <SelectTrigger className="w-full sm:w-96">
                    <SelectValue placeholder={t("reportType")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">{t("weeklyReport")}</SelectItem>
                    <SelectItem value="campaign">{t("campaignRetro")}</SelectItem>
                    <SelectItem value="ceo_summary">{t("ceoSummary")}</SelectItem>
                    <SelectItem value="action_list">{t("actionList")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">{t("audience")}</label>
                <Select value={audience} onValueChange={(v) => setAudience(v ?? "")}>
                  <SelectTrigger className="w-full sm:w-96">
                    <SelectValue placeholder={t("audience")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ops">{t("audienceOps")}</SelectItem>
                    <SelectItem value="ceo">{t("audienceCeo")}</SelectItem>
                    <SelectItem value="all">{t("audienceAll")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={handleGenerate}
                  disabled={!selectedDiagnosis || !reportType || generating}
                  className="gap-2"
                >
                  {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
                  {generating ? t("generating") : t("generate")}
                </Button>
                {generated && (
                  <span className="flex items-center gap-1 text-sm text-green-600">
                    <CheckCircle2 className="h-4 w-4" /> {t("generated")}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
