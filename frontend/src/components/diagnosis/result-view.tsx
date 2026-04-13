"use client";

import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { DiagnosisResult as ApiDiagnosisResult, Bilingual } from "@/types/api";
import type { Locale } from "@/i18n/config";

const severityColor = {
  high: "destructive" as const,
  medium: "secondary" as const,
  low: "outline" as const,
};

function L(obj: Bilingual, locale: Locale) {
  return obj[locale] || obj.en;
}

export function DiagnosisResultView({ result }: { result: ApiDiagnosisResult }) {
  const t = useTranslations("diagnosis");
  const ts = useTranslations("severity");
  const locale = useLocale() as Locale;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{L(result.title, locale)}</h3>
          <p className="text-sm text-muted-foreground">{result.timeRange}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">{t("rerun")}</Button>
          <Button size="sm">{t("generateReport")}</Button>
        </div>
      </div>

      {/* Summary */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground">{t("summary")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{L(result.summary, locale)}</p>
        </CardContent>
      </Card>

      {/* Anomalies */}
      {result.anomalies.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">{t("anomalies")} ({result.anomalies.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {result.anomalies.map((a) => (
              <div key={a.id} className="flex items-center gap-3 rounded-lg border p-3">
                <Badge variant={severityColor[a.severity]} className="text-xs shrink-0">
                  {ts(a.severity)}
                </Badge>
                <div className="flex-1">
                  <span className="text-sm font-medium">{a.metric}</span>
                  <span className="text-muted-foreground text-sm"> / {L(a.scope, locale)}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{L(a.description, locale)}</p>
                </div>
                <span className="text-sm font-mono font-medium">
                  {a.changePercent > 0 ? "+" : ""}{a.changePercent}%
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Hypotheses */}
      {result.hypotheses.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">{t("hypotheses")} ({result.hypotheses.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {result.hypotheses.map((h) => (
              <div key={h.id} className="rounded-lg border p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{L(h.title, locale)}</p>
                    <p className="text-xs text-muted-foreground mt-1">{L(h.description, locale)}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0 text-xs font-mono">
                    {t("confidence")}: {(h.confidence * 100).toFixed(0)}%
                  </Badge>
                </div>
                <div className="mt-2">
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${h.confidence * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Risks */}
        {result.risks.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-red-600">{t("risks")} ({result.risks.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.risks.map((risk, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <span className="text-red-400 shrink-0">!</span>
                    {L(risk, locale)}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Recommendations */}
        {result.recommendations.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-green-600">
                {t("recommendations")} ({result.recommendations.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.recommendations.map((rec) => (
                  <li key={rec.id} className="text-sm">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={rec.priority === "high" ? "destructive" : rec.priority === "medium" ? "secondary" : "outline"}
                        className="text-[10px]"
                      >
                        {rec.priority}
                      </Badge>
                      <span className="font-medium">{L(rec.title, locale)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 ml-14">
                      {L(rec.description, locale)}
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pending Checks */}
      {result.pendingChecks.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">{t("pendingChecks")} ({result.pendingChecks.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.pendingChecks.map((check, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <input type="checkbox" className="mt-1 rounded" />
                  {L(check, locale)}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
