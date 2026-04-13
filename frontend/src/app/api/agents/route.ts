import { NextResponse } from "next/server";
import { getRepo } from "@/lib/repositories";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const includeRuns = searchParams.get("includeRuns") === "true";
  const repo = getRepo().agents;
  const { agents } = await repo.listAgents();
  const response: Record<string, unknown> = { agents };
  if (includeRuns) {
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") ?? "20", 10);
    response.runs = await repo.listRuns({ page, pageSize });
  }
  return NextResponse.json({ success: true, data: response });
}
