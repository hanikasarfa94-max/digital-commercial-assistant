"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3, FileText, Target, Search, Eye, ArrowRight, Clock, Loader2,
} from "lucide-react";
import { agentsApi } from "@/lib/api-client";
import { useApi } from "@/lib/use-api";
import type { Locale } from "@/i18n/config";
import type { Bilingual } from "@/types/api";

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

export default function AgentCenterPage() {
  const t = useTranslations("agents");
  const tc = useTranslations("common");
  const tst = useTranslations("status");
  const locale = useLocale() as Locale;

  const { data, loading } = useApi(() => agentsApi.listWithRuns());

  const agents = data?.agents ?? [];
  const runs = data?.runs?.items ?? [];

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Agent Cards */}
      <div>
        <h2 className="text-lg font-semibold mb-1">{t("availableAgents")}</h2>
        <p className="text-sm text-muted-foreground mb-4">{t("selectAgent")}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {agents.map((a) => {
          const Icon = iconMap[a.icon] ?? BarChart3;
          const lastRun = runs.find((r) => r.agentId === a.id);
          return (
            <Link key={a.id} href={`/agent-center/${a.id}`}>
              <Card className="cursor-pointer hover:border-primary/30 transition-colors h-full">
                <CardContent className="pt-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="rounded-md bg-muted p-2">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <Badge variant="secondary" className="text-xs">{tc("ready")}</Badge>
                  </div>
                  <p className="text-sm font-semibold">{L(a.name, locale)}</p>
                  <p className="text-xs text-muted-foreground mt-1">{L(a.description, locale)}</p>
                  {lastRun && (
                    <div className="mt-3 pt-3 border-t flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{lastRun.startedAt}</span>
                      <Badge variant="outline" className="text-[10px]">{tst(lastRun.status)}</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Run History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">{t("runHistory")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {runs.map((run) => {
              const agent = agents.find((a) => a.id === run.agentId);
              if (!agent) return null;
              return (
                <Link
                  key={run.id}
                  href={`/agent-center/${run.agentId}?run=${run.id}`}
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{L(agent.name, locale)}</p>
                      <Badge variant="outline" className="text-[10px]">{tst(run.status)}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {run.startedAt} &middot; {formatDuration(run.duration)}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
