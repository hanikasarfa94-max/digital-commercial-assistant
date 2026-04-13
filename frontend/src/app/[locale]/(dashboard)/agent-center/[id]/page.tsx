"use client";

import { use, useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
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
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft, Play, Loader2, CheckCircle2, Clock, Copy, FileText,
  BarChart3, Target, Search, Eye, AlertCircle,
} from "lucide-react";
import { agentsApi } from "@/lib/api-client";
import { useApi, usePolling } from "@/lib/use-api";
import type { Locale } from "@/i18n/config";
import type { AgentDef, AgentField, AgentRun, Bilingual } from "@/types/api";

function L(obj: Bilingual, locale: Locale) { return obj[locale] || obj.en; }

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BarChart3, FileText, Target, Search, Eye,
};

function formatDuration(seconds?: number): string {
  if (!seconds) return "—";
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

/** Dynamic form field renderer */
function AgentFieldInput({
  field, value, onChange, locale,
}: {
  field: AgentField;
  value: string;
  onChange: (v: string) => void;
  locale: Locale;
}) {
  switch (field.type) {
    case "text":
      return (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder ? L(field.placeholder, locale) : ""}
          rows={3}
          className="resize-none"
        />
      );
    case "number":
      return (
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder ? L(field.placeholder, locale) : ""}
          className="block rounded-md border px-3 py-1.5 text-sm bg-background w-full sm:w-60"
        />
      );
    case "date_range":
      return (
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="text-xs text-muted-foreground">Start</label>
            <input
              type="date"
              value={value.split("~")[0]?.trim() ?? "2025-03-03"}
              onChange={(e) => {
                const end = value.split("~")[1]?.trim() ?? "2025-03-09";
                onChange(`${e.target.value} ~ ${end}`);
              }}
              className="block mt-1 rounded-md border px-3 py-1.5 text-sm bg-background"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">End</label>
            <input
              type="date"
              value={value.split("~")[1]?.trim() ?? "2025-03-09"}
              onChange={(e) => {
                const start = value.split("~")[0]?.trim() ?? "2025-03-03";
                onChange(`${start} ~ ${e.target.value}`);
              }}
              className="block mt-1 rounded-md border px-3 py-1.5 text-sm bg-background"
            />
          </div>
        </div>
      );
    case "select":
      return (
        <Select value={value} onValueChange={(v) => onChange(v ?? "")}>
          <SelectTrigger className="w-full sm:w-96">
            <SelectValue placeholder={L(field.label, locale)} />
          </SelectTrigger>
          <SelectContent>
            {(field.options ?? []).map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {L(opt.label, locale)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case "multi_select":
      return (
        <div className="flex flex-wrap gap-2">
          {(field.options ?? []).map((opt) => {
            const selected = value.split(",").filter(Boolean).includes(opt.value);
            return (
              <Button
                key={opt.value}
                variant={selected ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  const vals = value.split(",").filter(Boolean);
                  const next = selected
                    ? vals.filter((v) => v !== opt.value)
                    : [...vals, opt.value];
                  onChange(next.join(","));
                }}
              >
                {L(opt.label, locale)}
              </Button>
            );
          })}
        </div>
      );
    default:
      return null;
  }
}

export default function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const t = useTranslations("agents");
  const tst = useTranslations("status");
  const locale = useLocale() as Locale;
  const searchParams = useSearchParams();
  const runParam = searchParams.get("run");

  // Fetch agent list + runs
  const { data: agentsData, loading: agentsLoading, refetch: refetchAgents } = useApi(
    () => agentsApi.listWithRuns(),
  );

  const agent: AgentDef | undefined = (agentsData?.agents ?? []).find((a) => a.id === id);
  const agentRuns: AgentRun[] = (agentsData?.runs?.items ?? []).filter((r) => r.agentId === id);

  const [activeTab, setActiveTab] = useState("new");
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [runningId, setRunningId] = useState<string | null>(null);
  const [viewingRun, setViewingRun] = useState<AgentRun | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize field defaults
  useEffect(() => {
    if (agent && Object.keys(fieldValues).length === 0) {
      const defaults: Record<string, string> = {};
      for (const f of agent.fields) {
        if (f.type === "date_range") defaults[f.key] = "2025-03-03 ~ 2025-03-09";
        else defaults[f.key] = "";
      }
      setFieldValues(defaults);
    }
  }, [agent, fieldValues]);

  // Handle ?run= query param
  useEffect(() => {
    if (runParam && agentsData) {
      const run = (agentsData.runs?.items ?? []).find((r) => r.id === runParam);
      if (run) {
        setViewingRun(run);
        setActiveTab("result");
      }
    }
  }, [runParam, agentsData]);

  // Poll for running agent
  usePolling(
    () => agentsApi.getRun(runningId!),
    (d) => {
      if (d.status === "completed" || d.status === "failed") {
        setIsRunning(false);
        setViewingRun(d);
        setActiveTab("result");
        refetchAgents();
        return true;
      }
      return false;
    },
    2000,
    [runningId],
  );

  function setField(key: string, value: string) {
    setFieldValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleRun() {
    setIsRunning(true);
    setViewingRun(null);
    setError(null);

    // Build input from field values — filter out empty
    const input: Record<string, string> = {};
    for (const [k, v] of Object.entries(fieldValues)) {
      if (v) input[k] = v;
    }

    try {
      const result = await agentsApi.run(id, input);
      setRunningId(result.id);
    } catch (e) {
      setIsRunning(false);
      setError(e instanceof Error ? e.message : "Failed to start agent");
    }
  }

  function handleCopy() {
    if (!viewingRun) return;
    const text = viewingRun.markdownOutput
      ? L(viewingRun.markdownOutput, locale)
      : JSON.stringify(viewingRun.structuredOutput, null, 2);
    navigator.clipboard.writeText(text);
  }

  const steps = [t("step1"), t("step2"), t("step3"), t("step4")];
  const progressEstimate = isRunning ? (runningId ? 60 : 20) : (viewingRun ? 100 : 0);

  if (agentsLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!agent) {
    return (
      <div>
        <Link href="/agent-center" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> {t("back")}
        </Link>
        <p className="text-muted-foreground mt-4">{t("noRuns")}</p>
      </div>
    );
  }

  const Icon = iconMap[agent.icon] ?? BarChart3;

  // Check if all required fields have values
  const requiredFilled = agent.fields
    .filter((f) => f.required)
    .every((f) => fieldValues[f.key]?.trim());

  return (
    <div className="space-y-6">
      <Link href="/agent-center" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> {t("back")}
      </Link>

      {/* Agent Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-md bg-muted p-3">
          <Icon className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{L(agent.name, locale)}</h2>
          <p className="text-sm text-muted-foreground">{L(agent.description, locale)}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{L(agent.estimatedDuration, locale)}</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="new">{t("newRun")}</TabsTrigger>
          <TabsTrigger value="history">{t("runHistory")}</TabsTrigger>
          {viewingRun && <TabsTrigger value="result">{t("result")}</TabsTrigger>}
        </TabsList>

        {/* New Run — Dynamic fields */}
        <TabsContent value="new" className="space-y-4 mt-4">
          {agent.fields.map((field) => (
            <Card key={field.key}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">
                  {L(field.label, locale)}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AgentFieldInput
                  field={field}
                  value={fieldValues[field.key] ?? ""}
                  onChange={(v) => setField(field.key, v)}
                  locale={locale}
                />
              </CardContent>
            </Card>
          ))}

          {/* Run button + progress */}
          <div className="space-y-4">
            <Button size="lg" onClick={handleRun} disabled={isRunning || !requiredFilled} className="gap-2">
              {isRunning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              {isRunning ? t("running") : t("run")}
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
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* History */}
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardContent className="pt-4">
              {agentRuns.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t("noRuns")}</p>
              ) : (
                <div className="space-y-2">
                  {agentRuns.map((run) => (
                    <button
                      key={run.id}
                      onClick={() => { setViewingRun(run); setActiveTab("result"); }}
                      className="w-full flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors text-left"
                    >
                      <div>
                        <p className="text-sm font-medium">{L(run.agentName, locale)}</p>
                        <p className="text-xs text-muted-foreground">
                          {run.startedAt} &middot; {formatDuration(run.duration)}
                        </p>
                      </div>
                      <Badge
                        variant={run.status === "completed" ? "default" : run.status === "running" ? "secondary" : "destructive"}
                        className="text-xs"
                      >
                        {tst(run.status)}
                      </Badge>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Result */}
        {viewingRun && (
          <TabsContent value="result" className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold">{t("result")}</h3>
                <p className="text-xs text-muted-foreground">
                  {viewingRun.startedAt} &middot; {formatDuration(viewingRun.duration)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1" onClick={handleCopy}>
                  <Copy className="h-3 w-3" /> {t("copyOutput")}
                </Button>
                <Link href="/reports">
                  <Button size="sm" className="gap-1">
                    <FileText className="h-3 w-3" /> {t("convertToReport")}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Structured Output */}
            {viewingRun.structuredOutput && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{t("structuredOutput")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(viewingRun.structuredOutput, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            )}

            {/* Markdown Output */}
            {viewingRun.markdownOutput && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{t("markdownOutput")}</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown>
                    {L(viewingRun.markdownOutput, locale)}
                  </ReactMarkdown>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
