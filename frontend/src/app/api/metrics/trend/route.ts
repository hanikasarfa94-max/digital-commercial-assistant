import { NextResponse } from "next/server";
import { getRepo } from "@/lib/repositories";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const days = parseInt(searchParams.get("days") ?? "84", 10);
  const data = await getRepo().metrics.getTrend(days);
  return NextResponse.json({ success: true, data });
}
