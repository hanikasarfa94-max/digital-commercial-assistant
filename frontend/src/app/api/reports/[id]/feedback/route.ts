import { NextResponse } from "next/server";
import { getRepo } from "@/lib/repositories";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const data = await getRepo().reports.addFeedback(id, body);
  return NextResponse.json({ success: true, data: { ...data, reportId: id } });
}
