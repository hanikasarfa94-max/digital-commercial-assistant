import { NextResponse } from "next/server";
import { getRepo } from "@/lib/repositories";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const data = await getRepo().reports.updateStatus(id, body);
  return NextResponse.json({ success: true, data: { reportId: id, newStatus: body.status, transition: data } });
}
