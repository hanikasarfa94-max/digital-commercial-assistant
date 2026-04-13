"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Settings, Building2, Users, Key, Loader2, CheckCircle2, XCircle, Eye, EyeOff,
} from "lucide-react";
import { api } from "@/lib/api-client";

type LLMConfig = {
  provider: "mock" | "deepseek" | "local";
  apiKey: string;
  baseUrl: string;
  model: string;
  hasApiKey?: boolean;
};

const providerDefaults: Record<string, { baseUrl: string; model: string }> = {
  mock: { baseUrl: "", model: "" },
  deepseek: { baseUrl: "https://api.deepseek.com/v1", model: "deepseek-chat" },
  local: { baseUrl: "http://localhost:11434/v1", model: "qwen2.5:14b" },
};

export default function SettingsPage() {
  const t = useTranslations("settings");

  const [provider, setProvider] = useState<LLMConfig["provider"]>("mock");
  const [apiKey, setApiKey] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [model, setModel] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [hasExistingKey, setHasExistingKey] = useState(false);
  const [keyTouched, setKeyTouched] = useState(false);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [loadingConfig, setLoadingConfig] = useState(true);

  // Load current config on mount
  useEffect(() => {
    api<LLMConfig>("/config/llm")
      .then((cfg) => {
        setProvider(cfg.provider);
        setHasExistingKey(!!cfg.hasApiKey);
        setApiKey(""); // don't show masked key; user enters fresh or leaves blank to keep existing
        setKeyTouched(false);
        setBaseUrl(cfg.baseUrl || providerDefaults[cfg.provider]?.baseUrl || "");
        setModel(cfg.model || providerDefaults[cfg.provider]?.model || "");
      })
      .catch(() => {})
      .finally(() => setLoadingConfig(false));
  }, []);

  function handleProviderChange(v: string) {
    const p = v as LLMConfig["provider"];
    setProvider(p);
    setBaseUrl(providerDefaults[p]?.baseUrl || "");
    setModel(providerDefaults[p]?.model || "");
    setApiKey("");
    setKeyTouched(false);
    setHasExistingKey(false);
    setTestResult(null);
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setTestResult(null);
    try {
      // If user didn't touch the key field and there's an existing key, tell server to keep it
      const keepExistingKey = !keyTouched && hasExistingKey;
      await api("/config/llm", {
        method: "PUT",
        body: {
          provider,
          apiKey: keyTouched ? apiKey : "",
          baseUrl,
          model,
          keepExistingKey,
        },
      });
      setSaved(true);
      if (keyTouched && apiKey) {
        setHasExistingKey(true);
        setKeyTouched(false);
        setApiKey("");
      }
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // ignored
    } finally {
      setSaving(false);
    }
  }

  async function handleTest() {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/config/llm/test", { method: "POST" });
      const json = await res.json();
      if (json.success) {
        setTestResult({ ok: true, msg: t("testSuccess") });
      } else {
        setTestResult({ ok: false, msg: json.error || t("testFailed") });
      }
    } catch {
      setTestResult({ ok: false, msg: t("testFailed") });
    } finally {
      setTesting(false);
    }
  }

  const items = [
    { icon: Building2, titleKey: "enterpriseProfile", descKey: "enterpriseProfileDesc" },
    { icon: Users, titleKey: "teamRoles", descKey: "teamRolesDesc" },
    { icon: Key, titleKey: "apiIntegrations", descKey: "apiIntegrationsDesc" },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Overview cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <Card key={item.titleKey}>
            <CardContent className="pt-5">
              <div className="rounded-md bg-muted p-2 w-fit mb-3">
                <item.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-semibold">{t(item.titleKey)}</p>
              <p className="text-xs text-muted-foreground mt-1">{t(item.descKey)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* LLM Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Settings className="h-4 w-4" />
            {t("llmConfig")}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{t("llmConfigDesc")}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {loadingConfig ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              {/* Provider Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">{t("llmProvider")}</label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {([
                    { key: "mock", titleKey: "providerMock", descKey: "providerMockDesc" },
                    { key: "deepseek", titleKey: "providerDeepseek", descKey: "providerDeepseekDesc" },
                    { key: "local", titleKey: "providerLocal", descKey: "providerLocalDesc" },
                  ] as const).map((p) => (
                    <Card
                      key={p.key}
                      className={`cursor-pointer transition-colors ${provider === p.key ? "border-primary bg-primary/5" : "hover:border-primary/30"}`}
                      onClick={() => handleProviderChange(p.key)}
                    >
                      <CardContent className="pt-4 pb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium">{t(p.titleKey)}</p>
                          {provider === p.key && (
                            <Badge variant="default" className="text-[10px]">{t("currentProvider")}</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{t(p.descKey)}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Provider-specific fields */}
              {provider !== "mock" && (
                <div className="space-y-4 rounded-lg border p-4">
                  {/* API Key — only for deepseek (local is optional) */}
                  {(provider === "deepseek" || provider === "local") && (
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        {t("apiKey")}
                        {provider === "local" && (
                          <span className="text-xs text-muted-foreground ml-2">(optional)</span>
                        )}
                      </label>
                      <div className="relative">
                        <input
                          type={showKey ? "text" : "password"}
                          value={apiKey}
                          onChange={(e) => { setApiKey(e.target.value); setKeyTouched(true); }}
                          placeholder={hasExistingKey && !keyTouched ? "••••••••••••  (saved)" : t("apiKeyPlaceholder")}
                          className="block w-full sm:w-96 rounded-md border px-3 py-1.5 text-sm bg-background pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowKey(!showKey)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {hasExistingKey && !keyTouched && (
                        <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> API key is saved. Leave blank to keep it.
                        </p>
                      )}
                    </div>
                  )}

                  {/* Base URL */}
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">{t("baseUrl")}</label>
                    <input
                      type="text"
                      value={baseUrl}
                      onChange={(e) => setBaseUrl(e.target.value)}
                      placeholder={providerDefaults[provider]?.baseUrl}
                      className="block w-full sm:w-96 rounded-md border px-3 py-1.5 text-sm bg-background"
                    />
                  </div>

                  {/* Model */}
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">{t("model")}</label>
                    {provider === "deepseek" ? (
                      <Select value={model} onValueChange={(v) => setModel(v ?? "")}>
                        <SelectTrigger className="w-full sm:w-96">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="deepseek-chat">deepseek-chat</SelectItem>
                          <SelectItem value="deepseek-reasoner">deepseek-reasoner</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder={providerDefaults[provider]?.model}
                        className="block w-full sm:w-96 rounded-md border px-3 py-1.5 text-sm bg-background"
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={handleSave} disabled={saving} className="gap-2">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Key className="h-4 w-4" />}
                  {t("saveConfig")}
                </Button>

                {provider !== "mock" && (
                  <Button variant="outline" onClick={handleTest} disabled={testing} className="gap-2">
                    {testing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Settings className="h-4 w-4" />}
                    {testing ? t("testing") : t("testConnection")}
                  </Button>
                )}

                {saved && (
                  <span className="flex items-center gap-1 text-sm text-green-600">
                    <CheckCircle2 className="h-4 w-4" /> {t("saved")}
                  </span>
                )}

                {testResult && (
                  <span className={`flex items-center gap-1 text-sm ${testResult.ok ? "text-green-600" : "text-red-600"}`}>
                    {testResult.ok ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    {testResult.msg}
                  </span>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Note */}
      <Card>
        <CardContent className="pt-5">
          <p className="text-sm text-muted-foreground">{t("note")}</p>
        </CardContent>
      </Card>
    </div>
  );
}
