import { NextResponse } from "next/server";
import { getRepo } from "@/lib/repositories";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  try {
    const data = await getRepo().agents.createRun(id, body.input ?? {});
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: false, error: "Agent not found" }, { status: 404 });
  }
}
