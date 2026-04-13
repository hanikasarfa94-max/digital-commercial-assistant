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

let _provider: ILLMProvider | null = null;

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

/** Set LLM config — persists to disk and recreates provider on next getLLM() */
export function setLLMConfig(config: LLMConfig): void {
  writeConfigToDisk(config);
  _provider = null; // force recreation
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

export function getLLM(): ILLMProvider {
  if (_provider) return _provider;

  const config = getLLMConfig();
  _provider = createProvider(config);

  console.log(`[LLM] Using provider: ${_provider.name}`);
  return _provider;
}

// Re-export everything for convenience
export type { ILLMProvider, Message, MessageRole, CompletionOpts, CompletionResult } from "./interfaces";
export { completeJSON } from "./interfaces";
export { MockLLMProvider } from "./mock";
export { DeepSeekProvider } from "./deepseek";
export { LocalLLMProvider } from "./local";
