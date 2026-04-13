/**
 * Local LLM Provider — for enterprise customers running their own models.
 *
 * Supports any OpenAI-compatible local server:
 *   - ollama (http://localhost:11434/v1)
 *   - vLLM (http://localhost:8000/v1)
 *   - llama.cpp server
 *   - LocalAI
 *   - any OpenAI-compatible endpoint
 *
 * Set env vars:
 *   LOCAL_LLM_BASE_URL=http://localhost:11434/v1  (default: ollama)
 *   LOCAL_LLM_MODEL=qwen2.5:14b  (default)
 *   LOCAL_LLM_API_KEY=  (optional, most local servers don't need one)
 */

import type { ILLMProvider, Message, CompletionOpts, CompletionResult } from "./interfaces";

type OpenAIMessage = { role: string; content: string };
type OpenAIChoice = { message: { content: string }; finish_reason: string };
type OpenAIResponse = {
  choices: OpenAIChoice[];
  usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
};
type OpenAIStreamDelta = { choices: { delta: { content?: string }; finish_reason: string | null }[] };

export class LocalLLMProvider implements ILLMProvider {
  readonly name = "local";

  private baseUrl: string;
  private model: string;
  private apiKey: string;

  constructor(opts?: { baseUrl?: string; model?: string; apiKey?: string }) {
    this.baseUrl = opts?.baseUrl ?? process.env.LOCAL_LLM_BASE_URL ?? "http://localhost:11434/v1";
    this.model = opts?.model ?? process.env.LOCAL_LLM_MODEL ?? "qwen2.5:14b";
    this.apiKey = opts?.apiKey ?? process.env.LOCAL_LLM_API_KEY ?? "no-key";
  }

  async complete(messages: Message[], opts?: CompletionOpts): Promise<CompletionResult> {
    const body = this.buildRequestBody(messages, opts, false);
    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(this.apiKey !== "no-key" ? { Authorization: `Bearer ${this.apiKey}` } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Local LLM error ${res.status}: ${err}`);
    }

    const data: OpenAIResponse = await res.json();
    const content = data.choices[0]?.message?.content ?? "";

    return {
      content,
      usage: data.usage
        ? {
            promptTokens: data.usage.prompt_tokens,
            completionTokens: data.usage.completion_tokens,
            totalTokens: data.usage.total_tokens,
          }
        : undefined,
      meta: { provider: "local", model: this.model, baseUrl: this.baseUrl },
    };
  }

  async *stream(messages: Message[], opts?: CompletionOpts): AsyncGenerator<string, CompletionResult> {
    const body = this.buildRequestBody(messages, opts, true);
    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(this.apiKey !== "no-key" ? { Authorization: `Bearer ${this.apiKey}` } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Local LLM error ${res.status}: ${err}`);
    }

    const reader = res.body?.getReader();
    if (!reader) throw new Error("No response body");

    const decoder = new TextDecoder();
    let fullContent = "";
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith("data: ")) continue;
        const payload = trimmed.slice(6);
        if (payload === "[DONE]") continue;

        try {
          const chunk: OpenAIStreamDelta = JSON.parse(payload);
          const delta = chunk.choices[0]?.delta?.content;
          if (delta) {
            fullContent += delta;
            yield delta;
          }
        } catch {
          // skip malformed chunks
        }
      }
    }

    return {
      content: fullContent,
      meta: { provider: "local", model: this.model, streamed: true },
    };
  }

  private buildRequestBody(messages: Message[], opts?: CompletionOpts, stream = false) {
    const body: Record<string, unknown> = {
      model: this.model,
      messages: messages.map((m): OpenAIMessage => ({ role: m.role, content: m.content })),
      temperature: opts?.temperature ?? 0.7,
      max_tokens: opts?.maxTokens ?? 4096,
      stream,
    };
    if (opts?.jsonMode) {
      body.response_format = { type: "json_object" };
    }
    if (opts?.stop) {
      body.stop = opts.stop;
    }
    return body;
  }
}
