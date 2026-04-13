import { NextResponse } from "next/server";
import { getRepo } from "@/lib/repositories";
import type { ReportStatus, ReportType } from "@/types/api";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") ?? "20", 10);
  const status = (searchParams.get("status") ?? undefined) as ReportStatus | undefined;
  const type = (searchParams.get("type") ?? undefined) as ReportType | undefined;
  const data = await getRepo().reports.list({ page, pageSize, status, type });
  return NextResponse.json({ success: true, data });
}

export async function POST(req: Request) {
  const body = await req.json();
  const data = await getRepo().reports.create(body);
  return NextResponse.json({ success: true, data });
}
