/**
 * DeepSeek LLM Provider — OpenAI-compatible API.
 *
 * Great for testing: cheap, strong Chinese language, fast.
 * API: https://api.deepseek.com/v1/chat/completions
 *
 * Set env vars:
 *   DEEPSEEK_API_KEY=sk-...
 *   DEEPSEEK_BASE_URL=https://api.deepseek.com/v1  (default)
 *   DEEPSEEK_MODEL=deepseek-chat  (default)
 */

import type { ILLMProvider, Message, CompletionOpts, CompletionResult } from "./interfaces";

type OpenAIMessage = { role: string; content: string };
type OpenAIChoice = { message: { content: string }; finish_reason: string };
type OpenAIResponse = {
  choices: OpenAIChoice[];
  usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
};
type OpenAIStreamDelta = { choices: { delta: { content?: string }; finish_reason: string | null }[] };

export class DeepSeekProvider implements ILLMProvider {
  readonly name = "deepseek";

  private apiKey: string;
  private baseUrl: string;
  private model: string;

  constructor(opts?: { apiKey?: string; baseUrl?: string; model?: string }) {
    this.apiKey = opts?.apiKey ?? process.env.DEEPSEEK_API_KEY ?? "";
    this.baseUrl = opts?.baseUrl ?? process.env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com/v1";
    this.model = opts?.model ?? process.env.DEEPSEEK_MODEL ?? "deepseek-chat";

    if (!this.apiKey) {
      console.warn("[DeepSeekProvider] No API key configured. Set DEEPSEEK_API_KEY env var.");
    }
  }

  async complete(messages: Message[], opts?: CompletionOpts): Promise<CompletionResult> {
    const body = this.buildRequestBody(messages, opts, false);
    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`DeepSeek API error ${res.status}: ${err}`);
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
      meta: { provider: "deepseek", model: this.model },
    };
  }

  async *stream(messages: Message[], opts?: CompletionOpts): AsyncGenerator<string, CompletionResult> {
    const body = this.buildRequestBody(messages, opts, true);
    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`DeepSeek API error ${res.status}: ${err}`);
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
      meta: { provider: "deepseek", model: this.model, streamed: true },
    };
  }

  private buildRequestBody(messages: Message[], opts?: CompletionOpts, stream = false) {
    const body: Record<string, unknown> = {
      model: this.model,
      messages: messages.map((m): OpenAIMessage => ({ role: m.role, content: m.content })),
      temperature: opts?.temperature ?? 0.7,
      max_tokens: opts?.maxTokens ?? 4096,
      top_p: opts?.topP ?? 1,
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
