/**
 * LLM Provider registry — returns the active provider.
 *
 * Config is persisted to .llm-config.json so it survives HMR and dev restarts.
 * Falls back to env vars if no saved config exists.
 *
 * Env vars (fallback only):
 *   NEXT_PUBLIC_LLM_PROVIDER = "mock" | "deepseek" | "local"
 *   DEEPSEEK_API_KEY, DEEPSEEK_BASE_URL, DEEPSEEK_MODEL
 *   LOCAL_LLM_BASE_URL, LOCAL_LLM_MODEL, LOCAL_LLM_API_KEY
 */

import fs from "fs";
import path from "path";
import type { ILLMProvider } from "./interfaces";
import { MockLLMProvider } from "./mock";
import { DeepSeekProvider } from "./deepseek";
import { LocalLLMProvider } from "./local";

export type LLMConfig = {
  provider: "mock" | "deepseek" | "local";
  apiKey?: string;
  baseUrl?: string;
  model?: string;
};

const CONFIG_PATH = path.join(process.cwd(), ".llm-config.json");

/** Read config from disk, falling back to env vars */
function readConfigFromDisk(): LLMConfig | null {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8")) as LLMConfig;
    }
  } catch {
    // ignore read errors
  }
  return null;
}

/** Write config to disk */
function writeConfigToDisk(config: LLMConfig): void {
  try {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");
  } catch (err) {
    console.warn("[LLM] Failed to write config file:", err);
  }
}

/** Get the current LLM config (file → env vars → defaults) */
export function getLLMConfig(): LLMConfig {
  const saved = readConfigFromDisk();
  if (saved) return saved;

  return {
    provider: (process.env.NEXT_PUBLIC_LLM_PROVIDER as LLMConfig["provider"]) ?? "mock",
    apiKey: process.env.DEEPSEEK_API_KEY ?? process.env.LOCAL_LLM_API_KEY ?? "",
    baseUrl: process.env.DEEPSEEK_BASE_URL ?? process.env.LOCAL_LLM_BASE_URL ?? "",
    model: process.env.DEEPSEEK_MODEL ?? process.env.LOCAL_LLM_MODEL ?? "",
  };
}

/** Set LLM config — persists to disk and invalidates cached provider */
export function setLLMConfig(config: LLMConfig): void {
  writeConfigToDisk(config);
  // Invalidate globalThis cache so next getLLM() creates a fresh provider
  globalThis.__ZOVI_LLM_PROVIDER__ = undefined;
  globalThis.__ZOVI_LLM_PROVIDER_CONFIG__ = undefined;
}

function createProvider(config: LLMConfig): ILLMProvider {
  switch (config.provider) {
    case "deepseek":
      return new DeepSeekProvider({
        apiKey: config.apiKey,
        baseUrl: config.baseUrl || undefined,
        model: config.model || undefined,
      });
    case "local":
      return new LocalLLMProvider({
        baseUrl: config.baseUrl || undefined,
        model: config.model || undefined,
        apiKey: config.apiKey || undefined,
      });
    case "mock":
    default:
      return new MockLLMProvider();
  }
}

declare global {
  // eslint-disable-next-line no-var
  var __ZOVI_LLM_PROVIDER__: ILLMProvider | undefined;
  // eslint-disable-next-line no-var
  var __ZOVI_LLM_PROVIDER_CONFIG__: string | undefined;
}

/**
 * Get the active LLM provider.
 *
 * Re-reads config from disk each time and only recreates the provider
 * if the config has changed. Uses globalThis so the cache survives
 * Turbopack HMR (module-level variables get wiped on re-evaluation).
 */
export function getLLM(): ILLMProvider {
  const config = getLLMConfig();
  const configKey = JSON.stringify(config);

  // Reuse cached provider only if config hasn't changed
  if (globalThis.__ZOVI_LLM_PROVIDER__ && globalThis.__ZOVI_LLM_PROVIDER_CONFIG__ === configKey) {
    return globalThis.__ZOVI_LLM_PROVIDER__;
  }

  const provider = createProvider(config);
  globalThis.__ZOVI_LLM_PROVIDER__ = provider;
  globalThis.__ZOVI_LLM_PROVIDER_CONFIG__ = configKey;

  console.log(`[LLM] Using provider: ${provider.name}`);
  return provider;
}

// Re-export everything for convenience
export type { ILLMProvider, Message, MessageRole, CompletionOpts, CompletionResult } from "./interfaces";
export { completeJSON } from "./interfaces";
export { MockLLMProvider } from "./mock";
export { DeepSeekProvider } from "./deepseek";
export { LocalLLMProvider } from "./local";
