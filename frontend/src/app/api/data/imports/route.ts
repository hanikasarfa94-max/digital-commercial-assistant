import { NextResponse } from "next/server";
import { getRepo } from "@/lib/repositories";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") ?? "20", 10);
  const data = await getRepo().dataCenter.getImportHistory({ page, pageSize });
  return NextResponse.json({ success: true, data });
}
