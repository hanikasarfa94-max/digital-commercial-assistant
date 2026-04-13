import { NextResponse } from "next/server";
import { getRepo } from "@/lib/repositories";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = await getRepo().reports.getById(id);
  if (!report) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: report });
}
