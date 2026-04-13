import { NextResponse } from "next/server";
import { getLLMConfig, setLLMConfig, type LLMConfig } from "@/lib/llm";

export async function GET() {
  const config = getLLMConfig();
  // Mask key but indicate whether one is saved
  const safe = {
    ...config,
    apiKey: config.apiKey ? `${config.apiKey.slice(0, 6)}${"*".repeat(Math.max(0, config.apiKey.length - 6))}` : "",
    hasApiKey: !!config.apiKey,
  };
  return NextResponse.json({ success: true, data: safe });
}

export async function PUT(req: Request) {
  const body = (await req.json()) as Partial<LLMConfig> & { keepExistingKey?: boolean };

  if (!body.provider || !["mock", "deepseek", "local"].includes(body.provider)) {
    return NextResponse.json(
      { success: false, error: "Invalid provider" },
      { status: 400 },
    );
  }

  // If the frontend didn't send a new key, preserve the existing one
  let apiKey = body.apiKey ?? "";
  if (body.keepExistingKey) {
    const existing = getLLMConfig();
    apiKey = existing.apiKey ?? "";
  }

  setLLMConfig({
    provider: body.provider,
    apiKey,
    baseUrl: body.baseUrl ?? "",
    model: body.model ?? "",
  });

  return NextResponse.json({ success: true, data: { provider: body.provider } });
}
