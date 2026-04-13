"use client";

import { use, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft, Download, Copy, FileText, Clock, GitBranch,
  Star, MessageSquare, ArrowRight, User, CheckCircle2, Loader2,
} from "lucide-react";
import { reportsApi } from "@/lib/api-client";
import { useApi } from "@/lib/use-api";
import type { Report, ReportStatus, Bilingual } from "@/types/api";
import type { Locale } from "@/i18n/config";

const statusTransitions: Record<ReportStatus, ReportStatus[]> = {
  draft: ["in_progress"],
  in_progress: ["review"],
  review: ["approved", "rejected"],
  approved: ["archived"],
  rejected: ["in_progress"],
  archived: [],
};

const ownerOptions = ["ops_lead", "ceo", "analyst", "product_manager", "douyin_lead"] as const;

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

function L(obj: Bilingual, locale: Locale) { return obj[locale] || obj.en; }

export default function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const t = useTranslations("reports");
  const tst = useTranslations("status");
  const trl = useTranslations("roles");
  const locale = useLocale() as Locale;

  const { data: report, loading } = useApi(() => reportsApi.get(id), [id]);

  const [tab, setTab] = useState("preview");
  const [localReport, setLocalReport] = useState<Report | null>(null);

  // Use localReport for mutations, fall back to fetched report
  const r = localReport ?? report;

  // Sync fetched data to local state when it arrives
  if (report && !localReport) {
    // Can't call setState during render, but this only runs once
    // Using a ref-like pattern via the null check
  }

  const [fbScore, setFbScore] = useState<number>(4);
  const [fbComment, setFbComment] = useState("");

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!r) {
    return (
      <div className="space-y-4">
        <Link href="/reports" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> {t("back")}
        </Link>
        <p className="text-muted-foreground">{t("noReports")}</p>
      </div>
    );
  }

  // Ensure we have a local copy for mutations
  const ensureLocal = (): Report => {
    if (localReport) return localReport;
    const copy = JSON.parse(JSON.stringify(r)) as Report;
    setLocalReport(copy);
    return copy;
  };

  const md = r.markdown[locale] || r.markdown.en;
  const currentStatus = r.status;
  const nextStatuses = statusTransitions[currentStatus] ?? [];

  function handleTransition(next: ReportStatus) {
    const local = ensureLocal();
    setLocalReport({
      ...local,
      status: next,
      statusHistory: [
        ...local.statusHistory,
        { from: currentStatus, to: next, changedBy: local.ownerKey, changedAt: new Date().toISOString().slice(0, 16).replace("T", " ") },
      ],
    });
  }

  function handleChangeOwner(newOwner: string) {
    const local = ensureLocal();
    setLocalReport({ ...local, ownerKey: newOwner });
  }

  function handleSubmitFeedback() {
    if (!fbComment.trim()) return;
    const local = ensureLocal();
    setLocalReport({
      ...local,
      feedback: [
        ...local.feedback,
        {
          id: `f${Date.now()}`,
          score: fbScore as 1 | 2 | 3 | 4 | 5,
          comment: { en: fbComment, zh: fbComment },
          by: local.ownerKey,
          createdAt: new Date().toISOString().slice(0, 16).replace("T", " "),
        },
      ],
    });
    setFbComment("");
    setFbScore(4);
  }

  function handleExportMd() {
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${L(r!.title, locale).replace(/\s+/g, "_")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleExportTxt() {
    const blob = new Blob([md], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${L(r!.title, locale).replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleCopy() {
    navigator.clipboard.writeText(md);
  }

  const avgScore = r.feedback.length > 0
    ? (r.feedback.reduce((s, f) => s + f.score, 0) / r.feedback.length).toFixed(1)
    : null;

  return (
    <div className="space-y-4">
      <Link href="/reports" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> {t("back")}
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-semibold">{L(r.title, locale)}</h2>
          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground flex-wrap">
            <Badge variant="secondary" className="text-xs">{t(typeKeys[r.type] ?? r.type)}</Badge>
            <Badge variant={statusVariant[currentStatus]} className="text-xs">{tst(currentStatus)}</Badge>
            {avgScore && (
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" /> {avgScore}
              </span>
            )}
            <span>v{r.currentVersion}</span>
            <span>&middot;</span>
            <span>{trl(r.ownerKey)}</span>
            <span>&middot;</span>
            <span>{r.date}</span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="gap-1" onClick={handleCopy}>
            <Copy className="h-3 w-3" /> {t("duplicate")}
          </Button>
          <Button variant="outline" size="sm" className="gap-1" onClick={handleExportMd}>
            <Download className="h-3 w-3" /> {t("exportMd")}
          </Button>
          <Button variant="outline" size="sm" className="gap-1" onClick={handleExportTxt}>
            <FileText className="h-3 w-3" /> {t("exportTxt")}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        {/* Left: Content */}
        <div className="space-y-4">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="preview">{t("markdownPreview")}</TabsTrigger>
              <TabsTrigger value="raw">{t("rawMarkdown")}</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="mt-4">
              <Card>
                <CardContent className="pt-6 prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown>{md}</ReactMarkdown>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="raw" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <pre className="text-xs bg-muted rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">{md}</pre>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right: Collaboration Panel */}
        <div className="space-y-4">
          {/* Status Workflow */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> {t("status")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={statusVariant[currentStatus]} className="text-xs">{tst(currentStatus)}</Badge>
                {nextStatuses.length > 0 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
                {nextStatuses.map((ns) => (
                  <Button key={ns} variant="outline" size="sm" className="text-xs h-7" onClick={() => handleTransition(ns)}>
                    {tst(ns)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Owner Assignment */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <User className="h-4 w-4" /> {t("assignOwner")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{t("currentOwner")}:</span>
                <Select value={r.ownerKey} onValueChange={(v) => handleChangeOwner(v ?? r.ownerKey)}>
                  <SelectTrigger className="w-40 h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {ownerOptions.map((o) => (
                      <SelectItem key={o} value={o} className="text-xs">{trl(o)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Version History */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <GitBranch className="h-4 w-4" /> {t("versionHistory")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {r.versions.slice().reverse().map((v) => (
                  <div key={v.version} className="flex items-start gap-3 text-xs">
                    <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${v.isCurrent ? "bg-green-500" : "bg-muted-foreground/40"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">v{v.version}</span>
                        {v.isCurrent && <Badge variant="default" className="text-[10px] h-4">{t("currentVersion")}</Badge>}
                        <span className="text-muted-foreground">{trl(v.createdBy)}</span>
                      </div>
                      <p className="text-muted-foreground mt-0.5">{L(v.note, locale)}</p>
                      <p className="text-muted-foreground/60 mt-0.5">{v.createdAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Status History Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="h-4 w-4" /> {t("statusHistory")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {r.statusHistory.length === 0 ? (
                <p className="text-xs text-muted-foreground">{t("noFeedback")}</p>
              ) : (
                <div className="space-y-3">
                  {r.statusHistory.slice().reverse().map((sh, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-medium">{trl(sh.changedBy)}</span>
                          <span className="text-muted-foreground">{t("changedTo")}</span>
                          <Badge variant={statusVariant[sh.to]} className="text-[10px] h-4">{tst(sh.to)}</Badge>
                        </div>
                        {sh.note && <p className="text-muted-foreground mt-0.5">{sh.note}</p>}
                        <p className="text-muted-foreground/60 mt-0.5">{sh.changedAt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Feedback & Scoring */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <MessageSquare className="h-4 w-4" /> {t("feedback")}
                {avgScore && (
                  <span className="ml-auto text-xs font-normal text-muted-foreground flex items-center gap-1">
                    {t("avgScore")}: <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" /> {avgScore}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {r.feedback.length === 0 ? (
                <p className="text-xs text-muted-foreground">{t("noFeedback")}</p>
              ) : (
                <div className="space-y-3">
                  {r.feedback.map((fb) => (
                    <div key={fb.id} className="border rounded-lg p-3 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium">{trl(fb.by)}</span>
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className={`h-3 w-3 ${s <= fb.score ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/30"}`} />
                            ))}
                          </div>
                          <span className="text-[10px] text-muted-foreground">{t(`score${fb.score}` as "score1")}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground">{fb.createdAt}</span>
                      </div>
                      <p className="text-xs">{L(fb.comment, locale)}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Add feedback form */}
              <div className="border-t pt-3 space-y-3">
                <p className="text-xs font-medium">{t("submitFeedback")}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{t("feedbackScore")}:</span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button key={s} onClick={() => setFbScore(s)} className="p-0.5">
                        <Star className={`h-4 w-4 transition-colors ${s <= fbScore ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/30 hover:text-yellow-300"}`} />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{t(`score${fbScore}` as "score1")}</span>
                </div>
                <Textarea
                  value={fbComment}
                  onChange={(e) => setFbComment(e.target.value)}
                  placeholder={t("feedbackPlaceholder")}
                  className="text-xs min-h-[60px]"
                />
                <Button size="sm" className="text-xs" onClick={handleSubmitFeedback} disabled={!fbComment.trim()}>
                  {t("submitFeedback")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
