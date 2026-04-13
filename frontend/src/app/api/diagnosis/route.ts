import { NextResponse } from "next/server";
import { getRepo } from "@/lib/repositories";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") ?? "20", 10);
  const type = searchParams.get("type") as import("@/types/api").DiagnosisType | undefined;
  const data = await getRepo().diagnosis.list({ page, pageSize, type: type || undefined });
  return NextResponse.json({ success: true, data });
}

export async function POST(req: Request) {
  const body = await req.json();
  const data = await getRepo().diagnosis.create(body);
  return NextResponse.json({ success: true, data });
}
