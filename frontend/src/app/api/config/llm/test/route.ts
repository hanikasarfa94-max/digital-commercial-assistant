import { NextResponse } from "next/server";
import { getLLM } from "@/lib/llm";

export async function POST() {
  try {
    const llm = getLLM();

    if (llm.name === "mock") {
      return NextResponse.json({
        success: true,
        data: { provider: "mock", message: "Mock provider is always available." },
      });
    }

    // Send a minimal test message
    const result = await llm.complete(
      [{ role: "user", content: "Reply with exactly: OK" }],
      { maxTokens: 10, temperature: 0 },
    );

    return NextResponse.json({
      success: true,
      data: {
        provider: llm.name,
        message: result.content.trim(),
        tokens: result.usage,
      },
    });
  } catch (e) {
    return NextResponse.json(
      {
        success: false,
        error: e instanceof Error ? e.message : "Connection failed",
      },
      { status: 502 },
    );
  }
}
