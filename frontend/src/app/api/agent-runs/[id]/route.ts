import { NextResponse } from "next/server";
import { getRepo } from "@/lib/repositories";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const run = await getRepo().agents.getRunById(id);
  if (!run) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: run });
}
