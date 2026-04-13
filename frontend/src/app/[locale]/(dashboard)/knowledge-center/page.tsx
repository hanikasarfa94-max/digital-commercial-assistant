"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2, ShoppingBag, Target, History, FileCode, Search,
  ChevronDown, ChevronUp, ToggleLeft, ToggleRight, Loader2,
} from "lucide-react";
import { knowledgeApi } from "@/lib/api-client";
import { useApi } from "@/lib/use-api";
import type { Locale } from "@/i18n/config";
import type { Bilingual, EnterpriseProfile, ProductRecord, BizTarget, HistoricalCase, PromptTemplate } from "@/types/api";

function L(obj: Bilingual, locale: Locale) { return obj[locale] || obj.en; }

export default function KnowledgeCenterPage() {
  const t = useTranslations("knowledge");
  const tm = useTranslations("metrics");
  const locale = useLocale() as Locale;
  const [searchQuery, setSearchQuery] = useState("");

  const { data: enterprise, loading: l1 } = useApi(() => knowledgeApi.enterprise());
  const { data: productsData, loading: l2 } = useApi(() => knowledgeApi.products());
  const { data: targetsData, loading: l3 } = useApi(() => knowledgeApi.targets());
  const { data: casesData, loading: l4 } = useApi(() => knowledgeApi.cases());
  const { data: promptsData, loading: l5 } = useApi(() => knowledgeApi.prompts());

  const loading = l1 || l2 || l3 || l4 || l5;

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("search")}
          className="w-full rounded-md border bg-background pl-10 pr-4 py-2 text-sm"
        />
      </div>

      <Tabs defaultValue="enterprise">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="enterprise" className="gap-1.5"><Building2 className="h-3.5 w-3.5" />{t("enterpriseBg")}</TabsTrigger>
          <TabsTrigger value="products" className="gap-1.5"><ShoppingBag className="h-3.5 w-3.5" />{t("productRecords")}</TabsTrigger>
          <TabsTrigger value="targets" className="gap-1.5"><Target className="h-3.5 w-3.5" />{t("bizTargets")}</TabsTrigger>
          <TabsTrigger value="cases" className="gap-1.5"><History className="h-3.5 w-3.5" />{t("historicalCases")}</TabsTrigger>
          <TabsTrigger value="prompts" className="gap-1.5"><FileCode className="h-3.5 w-3.5" />{t("promptTemplates")}</TabsTrigger>
        </TabsList>

        <TabsContent value="enterprise" className="mt-4 space-y-4">
          {enterprise && <EnterpriseTab locale={locale} t={t} profile={enterprise} />}
        </TabsContent>
        <TabsContent value="products" className="mt-4 space-y-4">
          <ProductsTab locale={locale} t={t} products={productsData?.products ?? []} />
        </TabsContent>
        <TabsContent value="targets" className="mt-4 space-y-4">
          <TargetsTab locale={locale} t={t} tm={tm} targets={targetsData?.targets ?? []} />
        </TabsContent>
        <TabsContent value="cases" className="mt-4 space-y-4">
          <CasesTab locale={locale} t={t} cases={casesData?.cases ?? []} />
        </TabsContent>
        <TabsContent value="prompts" className="mt-4 space-y-4">
          <PromptsTab locale={locale} t={t} prompts={promptsData?.prompts ?? []} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function EnterpriseTab({ locale, t, profile }: { locale: Locale; t: any; profile: EnterpriseProfile }) {
  const fields = [
    { label: t("companyName"), value: L(profile.companyName, locale) },
    { label: t("industry"), value: L(profile.industry, locale) },
    { label: t("brandPositioning"), value: L(profile.brandPositioning, locale) },
    { label: t("coreCategories"), value: L(profile.coreCategories, locale) },
    { label: t("businessModel"), value: L(profile.businessModel, locale) },
    { label: t("channels"), value: L(profile.channels, locale) },
  ];
  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Building2 className="h-4 w-4" /> {t("enterpriseBg")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.label} className="space-y-1">
                <dt className="text-xs text-muted-foreground font-medium">{f.label}</dt>
                <dd className="text-sm">{f.value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-sm">{t("teamStructure")}</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {profile.teamStructure.map((role, i) => (
              <Badge key={i} variant="secondary" className="text-xs">{L(role, locale)}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function ProductsTab({ locale, t, products }: { locale: Locale; t: any; products: ProductRecord[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div className="space-y-3">
      {products.map((p) => (
        <Card key={p.sku}>
          <CardContent className="pt-4">
            <button className="w-full flex items-center justify-between text-left" onClick={() => setExpanded(expanded === p.sku ? null : p.sku)}>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted-foreground">{p.sku}</span>
                <span className="text-sm font-semibold">{L(p.name, locale)}</span>
                <Badge variant="secondary" className="text-xs">{L(p.category, locale)}</Badge>
                <Badge variant="outline" className="text-xs">{L(p.lifecycle, locale)}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">¥{p.price}</span>
                {expanded === p.sku ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </button>
            {expanded === p.sku && (
              <div className="mt-4 pt-4 border-t grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">{t("sellingPoints")}</p>
                  <p className="text-sm">{L(p.sellingPoints, locale)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">{t("competitors")}</p>
                  <p className="text-sm">{L(p.competitors, locale)}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function TargetsTab({ locale, t, tm, targets }: { locale: Locale; t: any; tm: any; targets: BizTarget[] }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Target className="h-4 w-4" /> {t("bizTargets")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="text-left py-2 font-medium">{t("targetMetric")}</th>
                <th className="text-right py-2 font-medium">{t("targetValue")}</th>
                <th className="text-right py-2 font-medium">{t("currentValue")}</th>
                <th className="text-right py-2 font-medium">{t("gap")}</th>
                <th className="text-left py-2 font-medium">{t("period")}</th>
              </tr>
            </thead>
            <tbody>
              {targets.map((bt) => {
                const isNeg = bt.gap.startsWith("-") || (bt.metric === "refundRate" && bt.gap.startsWith("+"));
                return (
                  <tr key={bt.id} className="border-b last:border-0">
                    <td className="py-2.5 font-medium">{L(bt.metricLabel, locale)}</td>
                    <td className="py-2.5 text-right">{bt.targetValue}</td>
                    <td className="py-2.5 text-right">{bt.currentValue}</td>
                    <td className={`py-2.5 text-right font-medium ${isNeg ? "text-red-600" : "text-green-600"}`}>{bt.gap}</td>
                    <td className="py-2.5 text-muted-foreground">{L(bt.period, locale)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function CasesTab({ locale, t, cases }: { locale: Locale; t: any; cases: HistoricalCase[] }) {
  const outcomeVariant = { win: "default" as const, loss: "destructive" as const, mixed: "secondary" as const };
  return (
    <div className="space-y-3">
      {cases.map((c) => (
        <Card key={c.id}>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold">{L(c.name, locale)}</h4>
                <Badge variant={outcomeVariant[c.outcome]} className="text-xs">{t(c.outcome)}</Badge>
              </div>
              <span className="text-xs text-muted-foreground">{L(c.period, locale)}</span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">{t("outcome")}</p>
              <p className="text-sm">{L(c.summary, locale)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">{t("lessonsLearned")}</p>
              <p className="text-sm">{L(c.lessons, locale)}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function PromptsTab({ locale, t, prompts: initialPrompts }: { locale: Locale; t: any; prompts: PromptTemplate[] }) {
  const [templates, setTemplates] = useState(initialPrompts);
  const [expanded, setExpanded] = useState<string | null>(null);

  function toggleEnabled(id: string) {
    setTemplates((prev) => prev.map((pt) => pt.id === id ? { ...pt, enabled: !pt.enabled } : pt));
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <FileCode className="h-4 w-4" /> {t("contextInjection")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">{t("contextInjectionDesc")}</p>
        </CardContent>
      </Card>

      {templates.map((pt) => (
        <Card key={pt.id} className={!pt.enabled ? "opacity-60" : ""}>
          <CardContent className="pt-4">
            <div className="flex items-start justify-between">
              <button className="flex-1 text-left" onClick={() => setExpanded(expanded === pt.id ? null : pt.id)}>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold">{L(pt.name, locale)}</h4>
                  {pt.enabled
                    ? <Badge variant="default" className="text-[10px]">{t("enabled")}</Badge>
                    : <Badge variant="outline" className="text-[10px]">{t("disabled")}</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">{L(pt.description, locale)}</p>
                <div className="flex gap-1.5 mt-2">
                  {pt.usedIn.map((ctx) => (
                    <Badge key={ctx} variant="secondary" className="text-[10px]">{t("usedIn")}: {ctx}</Badge>
                  ))}
                </div>
              </button>
              <Button variant="ghost" size="sm" onClick={() => toggleEnabled(pt.id)} className="shrink-0">
                {pt.enabled ? <ToggleRight className="h-5 w-5 text-green-500" /> : <ToggleLeft className="h-5 w-5 text-muted-foreground" />}
              </Button>
            </div>
            {expanded === pt.id && (
              <div className="mt-4 pt-4 border-t">
                <pre className="text-xs bg-muted rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">{pt.template}</pre>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
