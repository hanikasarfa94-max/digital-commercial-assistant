/**
 * LLM Provider abstraction.
 *
 * Same pattern as repositories: define an interface, implement it for each provider.
 * The rest of the system never knows which LLM is behind the scenes.
 *
 * Providers:
 *   - MockLLMProvider    → pre-written responses (offline dev/demo)
 *   - DeepSeekProvider   → DeepSeek API, OpenAI-compatible (testing)
 *   - LocalLLMProvider   → ollama / vLLM / local deployment (enterprise production)
 */

export type MessageRole = "system" | "user" | "assistant";

export type Message = {
  role: MessageRole;
  content: string;
};

export type CompletionOpts = {
  temperature?: number;     // 0-2, default 0.7
  maxTokens?: number;       // default 4096
  topP?: number;            // default 1
  /** If true, expect the response to be valid JSON */
  jsonMode?: boolean;
  /** Stop sequences */
  stop?: string[];
};

export type CompletionResult = {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  /** Provider-specific metadata */
  meta?: Record<string, unknown>;
};

export interface ILLMProvider {
  readonly name: string;

  /**
   * Single-turn completion.
   * Returns the full response after generation is done.
   */
  complete(messages: Message[], opts?: CompletionOpts): Promise<CompletionResult>;

  /**
   * Streaming completion.
   * Yields content chunks as they arrive.
   */
  stream(messages: Message[], opts?: CompletionOpts): AsyncGenerator<string, CompletionResult>;
}

// ── Structured output helpers ────────────────────────────

/** Strip markdown code fences and leading/trailing whitespace from LLM output */
function stripJsonFences(text: string): string {
  let s = text.trim();
  // Remove ```json ... ``` or ``` ... ```
  const fenceMatch = s.match(/^```(?:json)?\s*\n?([\s\S]*?)\n?\s*```$/);
  if (fenceMatch) s = fenceMatch[1].trim();
  return s;
}

/** Wrap a promise with a timeout */
function withTimeout<T>(promise: Promise<T>, ms: number, label = "LLM call"): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms / 1000}s`)), ms);
    promise.then(
      (v) => { clearTimeout(timer); resolve(v); },
      (e) => { clearTimeout(timer); reject(e); },
    );
  });
}

/**
 * Call the LLM and parse the response as JSON.
 * Strips markdown fences, retries once on parse failure.
 * Times out after 120s to avoid hanging forever.
 */
export async function completeJSON<T>(
  provider: ILLMProvider,
  messages: Message[],
  opts?: CompletionOpts
): Promise<T> {
  const timeoutMs = 120_000; // 2 minutes max

  const result = await withTimeout(
    provider.complete(messages, { ...opts, jsonMode: true }),
    timeoutMs,
    "LLM completion",
  );

  const cleaned = stripJsonFences(result.content);
  try {
    return JSON.parse(cleaned) as T;
  } catch {
    console.warn("[completeJSON] First parse failed, retrying...", cleaned.slice(0, 200));
    // Retry with repair prompt
    const retryMessages: Message[] = [
      ...messages,
      { role: "assistant", content: result.content },
      {
        role: "user",
        content: "Your response was not valid JSON. Please return ONLY a raw JSON object — no markdown fences, no explanation, no extra text. Start with { and end with }.",
      },
    ];
    const retry = await withTimeout(
      provider.complete(retryMessages, { ...opts, jsonMode: true }),
      timeoutMs,
      "LLM retry",
    );
    return JSON.parse(stripJsonFences(retry.content)) as T;
  }
}
